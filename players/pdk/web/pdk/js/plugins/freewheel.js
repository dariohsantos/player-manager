ThePlatformPDKPlugin = Class.extend({
    version:"VERSION_UNKNOWN",

    init:function ()
    {
        this.am = null;
        this.amError = false;
        this.setAdsWaiting = false;
        this.requestPending = false;
        this.requestSubmitted = false;
        this.currentAd = null;
        this.fallbackSiteSectionId = 0;
        this.fallbackVideoAssetId = 0;
        this.context = null;
        this.prerollSlots = [];
        //Use objcet to store non-empty midroll slots
        this.midrollSlots = {};
        this.postrollSlots = [];
        this.currentVideo = null;
        this.parameters = null;
        this.bannerScriptName = null;
        this.controller = null;
        this.cuePointManager = this.getCuePointManager();
        this.currentClip = null;
        this.chapters = null;
        this.testCustomValue = null;
        this.initVideoDisplayBase();

        // a flag to indicate whether OnLoadReleaseUrl event is dispatched to make a distinguish about autoplay non-autoplay mode.
        this.isOnLoadReleaseUrlInvoked = false;

        //  Consider the two cases:
        //      1. non-autoplay, player is loaded, then click the play button to start the content video.
        //      2. non-autoplay, player is loaded, then click on another release in the release list to start another content video
        //  The event orders are: onLoadReleaseUrl, onReleaseStart. These two cases are the same.
        //  After looking through the PDK document and some local tests, there is no special event to indicate the release is changed.
        //  This property is used to check whether the release has changed in "OnReleaseStart" event.
        this.releaseUrl = null;
    },

    initVideoDisplayBase:function ()
    {
        // This video display base is located above Video Player.
        // Currently, it has two use cases:
        // 1. created as display base of Overlay ad.
        // 2. interactive element when playing preroll/midroll/postroll, it will be responsible for capturing "click" event.
        this.videoDisplayBase = document.createElement("div");
        this.videoDisplayBase.id = "fw-pdk-plugin-video-display-base";
        this.videoDisplayBase.style.display = "none";
        //this.videoDisplayBase.style.position = "absolute";
        //this.videoDisplayBase.style.top = "0px";
        //this.videoDisplayBase.style.left = "0px";
        //this.videoDisplayBase.style.zIndex = 100;
    },

    initialize:function (loadObj)
    {
        this.controller = loadObj.controller;
        this.controller.registerAdPlugIn(this);
        this.loadVars = loadObj.vars;
        this.log("FreeWheel plug-in created");

        if (loadObj.vars['adManagerUrl'])
        {
            loadObj.vars['adManagerUrl'] = loadObj.vars['adManagerUrl'].replace('{ext}', 'js').replace('{runtime}', 'html5');
        }

        if (loadObj.vars['playerProfile'])
        {
            loadObj.vars['playerProfile'] = loadObj.vars['playerProfile'].replace('{ext}', 'js').replace('{runtime}', 'html5');
        }

        if (loadObj.vars['playerProfileHTML5'])
        {
            loadObj.vars['playerProfile'] = loadObj.vars['playerProfileHTML5'];
        }

        if (loadObj.vars['bannerScriptName'])
        {
            this.bannerScriptName = loadObj.vars['bannerScriptName'];
        }

        if (loadObj.vars['fallbackVideoAssetId'])
        {
            this.fallbackVideoAssetId = parseInt(loadObj.vars['fallbackVideoAssetId']);
        }

        if (loadObj.vars['fallbackSiteSectionId'])
        {
            this.fallbackSiteSectionId = parseInt(loadObj.vars['fallbackSiteSectionId']);
        }

        this.parameters = this.getParameters(window.fw_config ? window.fw_config() : null, this.loadVars);

        if (loadObj.vars["testCustomValue"])
        {
            this.testCustomValue = loadObj.vars["testCustomValue"];            
        }

        var overlayArea = this.controller.getOverlayArea(); // return value should be a object which have x, y, height and width
        this.log("initialize overlayArea width:" + overlayArea.width + " height:" + overlayArea.height);
        if (overlayArea)
        {
            this.videoDisplayBase.style.width = overlayArea.width + "px";
            this.videoDisplayBase.style.height = overlayArea.height + "px";
        }

        var me = this;      
        this.pausedListener = function() { me.onPaused(); };
        this.playListener = function() { me.onProxyPlay()};

        this.controller.addEventListener("OnLoadReleaseUrl", this.bind(this, this.onLoadReleaseUrl));
        this.controller.addEventListener("OnSetReleaseUrl", this.bind(this, this.onSetReleaseUrl));
        this.controller.addEventListener("OnReleaseStart", this.bind(this, this.onReleaseStart));
        this.controller.addEventListener("OnReleaseEnd", this.bind(this, this.onReleaseEnd));
        this.loadAdManager();
    },

    loadAdManager:function ()
    {
        this.log("loadAdManager()");
        tpLoadScript(this.parameters.adManagerUrl, this.bind(this, this.onAdManagerLoaded));
    },

    onAdManagerLoaded:function (event)
    {
        if (typeof tv == "undefined" || typeof tv.freewheel == "undefined" || typeof tv.freewheel.SDK == "undefined" || typeof tv.freewheel.SDK.AdManager == "undefined")
        {
            this.log("onAdManagerLoaded(), failed to load");
            this.amError = true;
            if (this.setAdsWaiting)
            {
                this.controller.setAds(null);//no ads
            }
            return;
        }
        if (this.parameters.isDebug)
        {
            tv.freewheel.SDK.setLogLevel(tv.freewheel.SDK.LOG_LEVEL_DEBUG);
        }
        else
        {
            tv.freewheel.SDK.setLogLevel(tv.freewheel.SDK.LOG_LEVEL_QUIET);
        }

        this.log("AdManager successfully loaded.", tpConsts.INFO);
        this.am = new tv.freewheel.SDK.AdManager();
        this.am.setServer(this.parameters.serverUrl);
        this.am.setNetwork(this.parameters.networkId);

        this.controller.addEventListener("OnMediaLoadStart", this.bind(this, this.onMediaLoadStart));
        this.controller.addEventListener("OnMediaStart", this.bind(this, this.onMediaStart));
        this.controller.addEventListener("OnMediaPlaying", this.bind(this, this.onMediaPlaying));
        this.controller.addEventListener("OnMediaEnd", this.bind(this, this.onMediaEnd));
        this.controller.addEventListener("OnOverlayAreaChanged", this.bind(this, this.onOverlayAreaChanged));

        if (this.requestPending)
        {
            this.submitRequest();
        }
    },

    getReleaseUrl:function (releaseUrl)
    {
        var quoteIndex = releaseUrl.indexOf("?");
        if (quoteIndex > 0)
        {
            releaseUrl = releaseUrl.substr(0, quoteIndex);
        }
        return releaseUrl;
    },

    resetDataForNewRelease:function ()
    {
        this.log("resetDataForNewRelease()");
        this.isOnLoadReleaseUrlInvoked = false;
        this.midrollSlots = {};
        this.prerollSlots = [];
        this.postrollSlots = [];
    },

    onOverlayAreaChanged:function ()
    {
        var overlayArea = this.controller.getOverlayArea(); // return value should be a object which have x, y, height and width
        this.log("onOverlayAreaChanged() width:" + overlayArea.width + " height:" + overlayArea.height);
        if (overlayArea)
        {
            this.videoDisplayBase.style.width = overlayArea.width + "px";
            this.videoDisplayBase.style.height = overlayArea.height + "px";
        }
    },

    onSetReleaseUrl:function (event)
    {

        if (this.amError) return;//do nothing, it's an error

        if (this.hasPrebuffered)
            this.submitRequest();
        else
            this.hasPrebuffered = true;

        this.log("onSetReleaseUrl():" + this.releaseUrl);
    },

    onLoadReleaseUrl:function (event)
    {

        if (this.amError) return;//do nothing, it's an error

        this.log("onLoadReleaseUrl():" + this.releaseUrl);
        this.isOnLoadReleaseUrlInvoked = true;
        var release = event.data;
        var release_url = this.getReleaseUrl(release.url);
        if (release_url == this.releaseUrl)
        {
            this.log("onLoadReleaseUrl invoked after onReleaseStart, do not send request");
            this.isOnLoadReleaseUrlInvoked = false;
            this.releaseUrl = null;
            return;
        }
        this.releaseUrl = release_url;
        this.log("release url:" + this.releaseUrl);

        this.chapters = release.chapters;
        var videoAssetCustomId = null;
        if (release && this.parameters.customVideoAssetIdField)
        {
            for (field in release)
            {
                if (field.indexOf("$" > 1))
                {
                    if (field.split("$")[1] == this.parameters.customVideoAssetIdField)
                    {
                        videoAssetCustomId = release[field];
                    }
                }
            }
            this.log("Trying to get VideoAssetCustomId from release['" + this.parameters.customVideoAssetIdField + "']: " + videoAssetCustomId);
        }

        if (!videoAssetCustomId && this.testCustomValue)
        {
            videoAssetCustomId = this.testCustomValue;
        }

        if (!videoAssetCustomId && release && release.id)
        {
            videoAssetCustomId = release.id.substr(release.id.lastIndexOf("/") + 1);
            this.log("Use release.id for videoAssetCustomId:" + videoAssetCustomId);
        }

        var keyValues = null;
        if (release && this.parameters.keyValuesField)
        {
            for (field in release)
            {
                if (field.indexOf("$" > 1))
                {
                    if (field.split("$")[1] == this.parameters.keyValuesField)
                    {
                        keyValues = release[field];
                    }
                }
            }
            this.log("Getting keyValues from Media ['" + this.parameters.keyValuesField + "']: " + keyValues);
        }

        this.buildCurrentVideoInfo(videoAssetCustomId, null, keyValues);
        if (!this.hasPrebuffered)
        {
            this.submitRequest();            
        }
    },

    onReleaseStart:function (event)
    {
        if (this.amError) return;//we can do nothing
        this.log("onReleaseStart()");
        //this.midRoll
        var playList = event.data;
        var releaseUrl = this.getReleaseUrl(playList.releaseURL);
        this.chapters = playList.chapters.chapters;
        if (this.isOnLoadReleaseUrlInvoked)
        {
            this.log("OnLoadReleaseUrl() has been invoked before");
            if (releaseUrl == this.releaseUrl)
            {
                this.log("return since it's the same release");
                return;
            }
            this.resetDataForNewRelease();
        }
        this.releaseUrl = releaseUrl;
        this.log("chapters.length:" + this.chapters.length);
        var baseClip = this.getFirstContent(playList);
        var videoAssetCustomId = null;
        var keyValues = null;
        var videoAssetURL = null;
        if (baseClip)
        {
            videoAssetURL = baseClip.URL;
            if (this.parameters.customVideoAssetIdField && baseClip && baseClip.contentCustomData)
            {
                videoAssetCustomId = baseClip.contentCustomData[this.parameters.customVideoAssetIdField];
                if (!videoAssetCustomId && this.parameters.customVideoAssetIdField.indexOf('$') > -1)
                {
                    videoAssetCustomId = baseClip.contentCustomData[this.parameters.customVideoAssetIdField.split('$')[1]];
                }
                this.log("get videoAssetCustomId:" + videoAssetCustomId + " from customIdField:" + this.parameters.customVideoAssetIdField, tpConsts.INFO);
            }
            if (!videoAssetCustomId && this.testCustomValue)
            {
                videoAssetCustomId = this.testCustomValue;
            }
            if (!videoAssetCustomId && baseClip)
            {
                videoAssetCustomId = baseClip.contentID;
                this.log("get videoAssetCustomId:" + videoAssetCustomId + " from clip.baseClip.contentID");
            }

            if (this.parameters.keyValuesField && baseClip && baseClip.contentCustomData)
            {
                keyValues = baseClip.contentCustomData[this.parameters.keyValuesField];
                if (!keyValues && this.parameters.keyValuesField.indexOf('$') > -1)
                {
                    keyValues = baseClip.contentCustomData[this.parameters.keyValuesField.split('$')[1]];
                }
                this.log("Getting keyValues from Media ['" + this.parameters.keyValuesField + "']: " + keyValues);
            }

        }
        this.buildCurrentVideoInfo(videoAssetCustomId, videoAssetURL, keyValues);
        this.submitRequest();
    },

    getFirstContent:function (playlist)
    {
        if (!playlist.baseClips) return null;
        var bcs = playlist.baseClips;
        for (var i = 0; i < bcs.length; i++)
        {
            var bc = bcs[i];
            if (!bc.isAd)
            {
                return bc;
            }
        }
    },

    onProxyPlay: function(e) {
        this.videoProxy.removeEventListener("play",this.playListener);
        this.playListenerAdded = false;

        if (!this.currentClip||!this.currentClip.baseClip.isAd)
            return;

        this.controller.dispatchEvent("OnMediaUnpause", {globalDataType:"com.theplatform.pdk.data::MediaPause",clip:this.currentClip,userInitiated:true});
        this.startProgressTimer();
    },

    onPaused:function(event){


        if (!this.currentClip||!this.currentClip.baseClip.isAd)
            return;

        if (isNaN(this.videoProxy.duration))//chrome will do this, and not always send an end event
        {
            return;
        }
        
        if (this.videoProxy.ended||Math.abs(this.videoProxy.currentTime-this.videoProxy.duration)<0.25)
        {
            return;            
        }
    
        this.controller.dispatchEvent("OnMediaPause", {globalDataType:"com.theplatform.pdk.data::MediaPause",clip:this.currentClip,userInitiated:false});
        
        this.stopProgressTimer();

        if (!this.playListenerAdded)
        {
            this.videoProxy.addEventListener("play", this.playListener);
            this.playListenerAdded = true;
        }
    },

    onReleaseEnd:function (event)
    {
        this.log("onReleaseEnd()");
        this.resetDataForNewRelease();
    },

    isAd:function (clip)
    {
        return this.isFreeWheelUrl(clip.URL);
    },

    checkAd:function (clip)
    {
        if (!this.isFreeWheelUrl(clip.URL))
        {
            this.log("checkAd(), return false for AdManger is null");
            return false;
        }
        if (this.amError)
        {
            this.log("checkAd(), return false for AdManger failed to load");
            return false;
        }
        if (!this.checkParameters())
        {
            this.log("checkAd() return false for required parameters are missed");
            return false;
        }
        this.log("checkAd()");
        this.currentAd = clip;
        var me = this
        setTimeout(function () {me.doSetAds()}, 1);
        return true;
    },

    doSetAds:function ()
    {
        if (this.amError)
        {
            this.controller.setAds(null);
            return;
        }
        else if (!this.am || this.requestSubmitted)
        {
            this.setAdsWaiting = true;
            return;
        }
        var chapterPosition = this.getChapterPositionFromAd(this.chapters, this.currentAd);

        var retPlaylist;
        if (chapterPosition == 0)
        {
            this.log("setAds(), create prerolls length:" + this.prerollSlots.length, tpConsts.INFO);
            retPlaylist = this.createPlayList(this.prerollSlots);
        }
        else if (chapterPosition == this.chapters.length)
        {
            this.log("setAds(), create postrolls length:" + this.postrollSlots.length, tpConsts.INFO);
            retPlaylist = this.createPlayList(this.postrollSlots);
        }
        else if (chapterPosition > 0)
        {
            this.log("setAds(), insert midroll slot for chapter " + chapterPosition, tpConsts.INFO);
            retPlaylist = this.createPlayList(this.midrollSlots[this.generateMidrollCustomId(chapterPosition)]);
        }
        this.setAdsWaiting = false;
        this.controller.setAds(retPlaylist);
    },

    getChapterPositionFromAd : function(chapters, ad)
    {
        if (!chapters || chapters.length == 0)
        {
            return -1;
        }
        for (var i = 0; i < chapters.length; i++)
        {
            var chapter = chapters[i];
            if (chapter.adIndex == ad.clipIndex || chapter.contentIndex > ad.clipIndex)
            {
                return i;
            }
        }
        return chapters.length;
    }
    ,

    isFreeWheelUrl:function (url)
    {
        return (url.indexOf("freewheel.tv") >= 0);
    },

    checkParameters:function ()
    {
        if (!this.parameters.adManagerUrl)
        {
            this.log("adManagerUrl is required, return false", tpConsts.WARN);
            return false;
        }
        if (!this.parameters.serverUrl)
        {
            this.log("serverUrl is required, return false", tpConsts.WARN);
            return false;
        }
        if (isNaN(this.parameters.networkId) || this.parameters.networkId < 0)
        {
            this.log("networkId is required, return false", tpConsts.WARN);
            return false;
        }
        if (!this.parameters.playerProfile)
        {
            this.log("playerProfile is required, return false", tpConsts.WARN);
            return false;
        }
        return true;
    },

    buildCurrentVideoInfo:function (videoAssetCustomId, videoAssetUrl, keyValues)
    {
        this.log("buildCurrentVideoInfo()");

        this.currentVideo = {};
        this.currentVideo.customId = videoAssetCustomId;
        this.currentVideo.location = videoAssetUrl;
        this.currentVideo.duration = 0;
        this.currentVideo.keyValues = keyValues;
        for (var i = 0; i < this.chapters.length; i++)
        {
            var chapter = this.chapters[i];
            this.currentVideo.duration += chapter.length / 1000;
        }
        this.currentVideo.networkId = this.parameters.videoAssetNetworkId;
        switch (this.parameters.autoPlayType)
        {
            case "attended":
                this.currentVideo.autoPlayType = tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_ATTENDED;
                break;
            case "unattended":
                this.currentVideo.autoPlayType = tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_UNATTENDED;
                break;
            case "nonAutoPlay":
                this.currentVideo.autoPlayType = tv.freewheel.SDK.VIDEO_ASSET_AUTO_PLAY_TYPE_NON_AUTO_PLAY;
                break;
        }
        this.logObj("currentVideo", this.currentVideo);
    },

    generateMidrollCustomId:function (index)
    {
        return "fw_tp_midroll_" + index;
    },

    submitRequest:function ()
    {
        this.log("Requesting ads", tpConsts.INFO);
        if (this.amError) return;
        if (!this.am)
        {
            this.requestPending = true;
            return;
        }
        // in case the slot ended event is not dispatched when switch the video content.
        this.hideVideoDisplayBase();
        if (this.context)
        {
            this.log("submitRequest() dispose last context");
            this.context.dispose();
        }
        this.context = this.am.newContext();

        this.parameters = this.getParameters(window.fw_config ? window.fw_config() : null, this.loadVars);

        for (var key in this.parameters.keyValues)
        {
            this.context.addKeyValue(key, this.parameters.keyValues[key]);
        }

        if (this.currentVideo.keyValues)
        {
            var keys = this.currentVideo.keyValues.split("&");
            for (var i = 0; i < keys.length; i++)
            {
                var keyValuePair = keys[i].split("=");
                this.context.addKeyValue(keyValuePair[0], keyValuePair[1]);
            }
        }
    
        var videoProxy = this.controller.getVideoProxy();
        videoProxy.parentNode = this.videoDisplayBase;
        this.videoProxy = videoProxy;

        this.context.setContentVideoElement(videoProxy);
        this.context.setProfile(this.parameters.playerProfile);
        this.context.setSiteSection(this.parameters.siteSectionId,
                                    this.parameters.siteSectionNetworkId,
                                    Math.floor(Math.random() * 9999),
                                    0,
                                    this.fallbackSiteSectionId);

        this.context.setVideoAsset( this.currentVideo.customId,
                                    this.currentVideo.duration,
                                    this.currentVideo.networkId,
                                    this.currentVideo.location,
                                    this.currentVideo.autoPlayType,
                                    Math.floor(Math.random() * 9999),
                                    0,
                                    this.fallbackVideoAssetId);

        this.context.setVisitor(this.getCustomVisitorId());
        this.context.setParameter("wrapperVersion", "ThePlatformJS-" + this.version);

        if (this.bannerScriptName)
        {
            this.context.setParameter("renderer.html.coadScriptName", this.bannerScriptName, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
        }

        this.context.setParameter(tv.freewheel.SDK.PARAMETER_RENDERER_VIDEO_DISPLAY_CONTROLS_WHEN_PAUSE, false, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
        this.context.setParameter(tv.freewheel.SDK.PARAMETER_EXTENSION_CONTENT_VIDEO_ENABLED, false, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
        this.context.setParameter(tv.freewheel.SDK.PARAMETER_EXTENSION_AD_CONTROL_CLICK_ELEMENT, this.videoDisplayBase.id, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
        this.context.setParameter(tv.freewheel.SDK.PARAMETER_PLAY_MIDROLL_BY_CURRENT_VIDEO_ELEMENT, true, tv.freewheel.SDK.PARAMETER_LEVEL_GLOBAL);
        this.context.addEventListener(tv.freewheel.SDK.EVENT_REQUEST_COMPLETE, this.bind(this, this.onRequestComplete));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_SLOT_STARTED, this.bind(this, this.onSlotStarted));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_SLOT_ENDED, this.bind(this, this.onSlotEnded));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_CONTENT_VIDEO_PAUSE_REQUEST, this.bind(this, this.onContentVideoPauseRequest));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_CONTENT_VIDEO_RESUME_REQUEST, this.bind(this, this.onContentVideoResumeRequest));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_CONTENT_VIDEO_ATTACH, this.bind(this, this.onContentVideoAttach));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_CONTENT_VIDEO_DETACH, this.bind(this, this.onContentVideoDetach));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_AD_CLICK, this.bind(this, this.onAdClicked));
        this.context.addEventListener(tv.freewheel.SDK.EVENT_AD_IMPRESSION, this.bind(this, this.onAdImpression));

        //Inserting midroll with the startTime of each chapter, except the first chapter
        for (var i = 1; i < this.chapters.length; i++)
        {
            this.log("chapters[" + i + "]: (" + this.chapters[i].startTime + "," + this.chapters[i].endTime + ")");
            this.context.addTemporalSlot(this.generateMidrollCustomId(i), tv.freewheel.SDK.ADUNIT_MIDROLL, this.chapters[i].startTime / 1000);
        }

        for (var key in this.parameters.renderers)
        {
            this.log("renderer(" + key + "):" + this.parameters.renderers[key]);
            this.context._rendererManifest[key] = this.parameters.renderers[key];
        }
        this.resize();
        this.requestSubmitted = true;
        this.context.submitRequest();
    },

    getCustomVisitorId:function ()
    {
        if (!this.parameters.externalCustomVisitor)
        {
            return null;
        }
        var customVisitorId = null;
        try
        {
            customVisitorId = eval("window." + this.parameters.externalCustomVisitor + "()");
        } catch (error)
        {
            this.log("warning: get an error when try to get externalCustomVisitor, message:" + error.message, tpConsts.WARN);
        }
        if (!customVisitorId)
        {
            this.log("warning: js function " + this.parameters.externalCustomVisitor + "() returns null or empty string", tpConsts.WARN);
        }
        this.log("getCustomVisitorId(), return:" + customVisitorId);
        return customVisitorId;
    },

    onRequestComplete:function (event)
    {
        this.requestSubmitted = false;
        this.log("Ads request complete", tpConsts.INFO);
        this.cuePointManager.refresh();
        var slots = this.context.getTemporalSlots();
        
        for (var i = 0; i < slots.length; i++)
        {
            var slot = slots[i];
            switch (slot.getTimePositionClass())
            {
                case tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL:
                    if (slot.getCustomId() != "_fw_empty_preroll_slot")
                    {
                        this.log("adding preroll slot:" + slot.getCustomId() + " to position:" + this.prerollSlots.length, tpConsts.DEBUG);
                        this.prerollSlots.push(slot);
                    }
                    break;
                case tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL:
                    this.log("adding postroll slot:" + slot.getCustomId() + " to position:" + this.postrollSlots.length, tpConsts.DEBUG);
                    this.postrollSlots.push(slot);
                    break;
                case tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL:
                    if (slot.getAdCount())
                    {
                        this.log("adding midroll ads id:" + slot.getCustomId() + " num ads:" + slot.getAdCount(), tpConsts.DEBUG);
                        this.midrollSlots[slot.getCustomId()] = [slot];
                    }
                    else
                    {//Empty midroll async play, not adding to the playlist
                        this.log("adding temporal midpoint slot to cuePointManager")
                        this.cuePointManager.addTemporalSlot(slot);
                    }
                    break;
                case tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY:
                    // MRM-22015 Overlay is disabled until we can correctly render them.
                    //this.cuePointManager.addTemporalSlot(slot);
                    break;
            }
        }
        if (this.setAdsWaiting)
        {
            this.doSetAds();
        }
    },


    onMediaLoadStart:function (event)
    {
        this.videoProxy.addEventListener("pause", this.pausedListener);

        this.stopProgressTimer();

        this.currentClip = null;

        var clip = event.data;
        this.log("onMediaLoadStart() clip.streamType = " + clip.streamType + " url:" + clip.URL);
        if (clip.streamType == "empty" && clip.URL)
        {
            var slot = this.context.getSlotByCustomId(clip.URL);
            if (slot)
            {
                this.currentClip = clip;
                this.playSlot(slot);
            }
            else
            {
                this.controller.endMedia(this.currentClip);
            }
        }
    },

    onMediaStart:function (event)
    {
        this.log("onMediaStart");
        if (this.context && event.data && event.data.baseClip.isAd == false && event.data.chapter && event.data.chapter.index == 0)
        {
            this.context.setVideoState(tv.freewheel.SDK.VIDEO_STATE_PLAYING);
        }
    },

    onMediaPlaying:function (event)
    {
        //this.log("onMediaPlaying(): timePosition:" + event.data.currentTimeAggregate);
        var clip = event.data;
        if (this.am && !clip.isAd)
        {
            var slot = this.cuePointManager.getPlayableSlot(event.data.currentTimeAggregate / 1000);
            if (slot)
            {
                this.playSlot(slot);
            }
        }
    },

    onMediaEnd:function (event)
    {
        this.log("onMediaEnd");
        this.stopProgressTimer();
    },

    playSlot:function (slot)
    {
        this.log("Playing ad slot:" + slot.getCustomId(), tpConsts.INFO);
        slot.play();
    },

    onSlotStarted:function (event)
    {
        this.log("Ad slot started", tpConsts.INFO);
        if (this.isSlotMappedToCurrentClip(event.slot))
        {
            // to avoid a bug that the clip icons aren't disabled when playing postrolls
            setTimeout(this.bind(this, function ()
            {
                this.log("onSlotStarted() dispatch OnMediaStart event");
                this.controller.dispatchEvent("OnMediaStart", this.currentClip);
                this._hasStarted = true;
            }), 200);
        }
        if (this.isTemporalSlot(event.slot))
        {
            this.showVideoDisplayBase();
            this.startProgressTimer();
        }
    },

    onSlotEnded:function (event)
    {
        this.log("Ad slot ended", tpConsts.INFO);
        this._hasStarted = false;
        if (this.isSlotMappedToCurrentClip(event.slot))
        {
            // to avoid empty slot dispatch "OnMediaEnd" event before "OnMediaStart" event.
            setTimeout(this.bind(this, function ()
            {
                this.log("onSlotEnded() endMedia()");
                this.controller.endMedia(this.currentClip);
            }), 250);
        }
        if (this.isTemporalSlot(event.slot))
        {
            this.hideVideoDisplayBase();
            this.stopProgressTimer();
        }
    },

    startProgressTimer:function()
    {
        var me = this;
        this.stopProgressTimer();
        this.progressTimerId = setInterval(function() { me.doProgressTimer(); }, 167);
    },

    stopProgressTimer:function()
    {
        clearInterval(this.progressTimerId);
    },

    doProgressTimer:function()
    {

        if (!this._hasStarted)
            return;

        var slot = this.context.getSlotByCustomId(this.currentClip.URL);
        this.controller.dispatchEvent("OnMediaPlaying", {currentTime: slot.getPlayheadTime() * 1000, duration: slot.getTotalDuration() * 1000})
    },

    onContentVideoPauseRequest:function (event)
    {
        this.log("this.onContentVideoPauseRequest()");
        //this.controller.pause(true);
    },

    onContentVideoResumeRequest:function (event)
    {
        this.log("this.onContentVideoResumeRequest()");
        //this.controller.pause(false);
    },

    onContentVideoAttach:function (event)
    {
        this.log("onContentVideoAttach()");
    },

    onContentVideoDetach:function (event)
    {
        this.log("onContentVideoDetach()");
    },

    onAdClicked:function (event)
    {
        this.log("onAdClicked()");
        this.controller.dispatchEvent("OnAdvertisementClick", {data:new Object()});
    },

    onAdImpression:function (event)
    {
        this.log("onAdImpression()");
        var slot = this.context.getSlotByCustomId(this.currentClip.URL);
        var ad;
        var ads = slot.getAdInstances(false);

        for (var i=0; i<ads.length; i++)
        {
            ad = ads[i];
            if (ad["getAdId"]() == event.adInstance.getAdId())
            {
                if (ad["getCompanionAdInstances"])
                {
                    var companions = ad["getCompanionAdInstances"]();
                    var companion;
                    if (companions && companions.length > 0)
                    {
                        for (var j=0; j<companions.length; j++)
                        {
                            companion = companions[j];
                            if (companion["isRequiredToShow"] && companion["isRequiredToShow"]())
                            {
                                // exit fullscreen
                                this.controller.showFullScreen(false);
                                break;
                            }
                        }
                    }
                }
            }            
        }

    },

    isSlotMappedToCurrentClip:function (slot)
    {
        if (this.currentClip && this.currentClip.baseClip.isAd && this.currentClip.URL == slot.getCustomId())
        {
            return true;
        }
        return false;
    },

    isTemporalSlot:function (slot)
    {
        if (slot)
        {
            return [tv.freewheel.SDK.TIME_POSITION_CLASS_PREROLL,
                tv.freewheel.SDK.TIME_POSITION_CLASS_MIDROLL,
                tv.freewheel.SDK.TIME_POSITION_CLASS_OVERLAY,
                tv.freewheel.SDK.TIME_POSITION_CLASS_POSTROLL].indexOf(slot.getTimePositionClass()) > -1;
        }
        return false;
    },

    resize:function ()
    {
        var mediaArea = this.controller.getMediaArea();
        if (this.context && mediaArea)
        {
            this.logObj("resize() mediaArea", mediaArea);

            var videoDisplaySize = this.context.getVideoDisplaySize();
            this.context.setVideoDisplaySize(videoDisplaySize.left, videoDisplaySize.top, mediaArea.width, mediaArea.height, videoDisplaySize.position);
            //this.videoDisplayBase.style.width = mediaArea.width + "px";
            //this.videoDisplayBase.style.height = mediaArea.height + "px";
        }
    },

    showVideoDisplayBase:function ()
    {
        this.log("showVideoDisplayBase");
        this.videoDisplayBase.style.display = "";
    },

    hideVideoDisplayBase:function ()
    {
        this.log("hideVideoDisplayBase");
        this.videoDisplayBase.style.display = "none";
    },

    createPlayList:function (slots)
    {

        if (!slots)
            return null;

        this.log("createPlayList()");

        var playlist = new Object();
        playlist.globalDataType = "com.theplatform.pdk.data::Playlist";
        playlist.baseClips = new Array();
        playlist.clips = new Array();



        for (var i = 0; i < slots.length; i++)
        {
            var slot = slots[i];

            var baseClip = new Object();
            baseClip.URL = slot.getCustomId();
            baseClip.id = slot.getCustomId();
            baseClip.title = "";
            baseClip.isAd = true;
            baseClip.noSkip = this.currentAd && this.currentAd.baseClip ? this.currentAd.baseClip.noSkip : true;
            baseClip.globalDataType = "com.theplatform.pdk.data::BaseClip";

            var adClip = com.theplatform.pdk.SelectorExported.getInstance(this.controller.scopes.toString()).parseClip(baseClip);
            adClip.streamType = "empty";
            adClip.title = "";

            this.log("createPlayList(); create one ad clip:" + slot.getCustomId());
            playlist.baseClips.push(baseClip);
            playlist.clips.push(adClip);
        }
        return playlist;
    },

    getParameters:function (jsConfig, loadVars)
    {
        this.log("getParameters()");

        if (!jsConfig)
        {
            jsConfig = {};
        }
        if (!loadVars)
        {
            loadVars = {};
        }
        this.logObj("jsConfig", jsConfig);
        this.logObj("loadVars", loadVars);

        var getValue = function (name, defaultValue)
        {
            if (name)
            {
                return jsConfig[name] ? jsConfig[name] : (loadVars[name] ? loadVars[name] : defaultValue);
            }
            return null;
        };

        var parameters = new Object();
        var debug = tpLogLevel == "debug" ? true : false;
        parameters.isDebug = getValue("isDebug", debug);
        parameters.adManagerUrl = getValue("adManagerUrl");
        parameters.serverUrl = getValue("serverUrl");
        parameters.networkId = Number(getValue("networkId"));
        parameters.playerProfile = getValue("playerProfile");
        parameters.videoAssetNetworkId = Number(getValue("videoAssetNetworkId"));
        parameters.siteSectionNetworkId = Number(getValue("siteSectionNetworkId"));
        parameters.siteSectionId = getValue("siteSectionId");
        parameters.autoPlayType = getValue("autoPlayType");
        parameters.customVideoAssetIdField = getValue("customVideoAssetIdField");
        parameters.keyValuesField = getValue("keyValuesField");
        parameters.renderers = getValue("renderers");
        parameters.externalCustomVisitor = getValue("externalCustomVisitor");
        parameters.keyValues = {};
        var keyValues = getValue("keyValues");
        if (keyValues)
        {
            var pairs = keyValues.split("&");
            for (var i = 0; i < pairs.length; i++)
            {
                var pair = pairs[i].split("=");
                if (pair.length == 2)
                {
                    parameters.keyValues[unescape(pair[0])] = unescape(pair[1]);
                }
            }
        }
        this.logObj("parameters", parameters);
        return parameters;
    },

    getCuePointManager:function ()
    {
        CuePointManager = Class.extend({
            init:function ()
            {
                this.slots = [];
            },

            addTemporalSlot:function (slot)
            {
                this.slots.push({target:slot});
            },

            getPlayableSlot:function (timePosition)
            {
                var result = null;
                for (var i = 0; i < this.slots.length; i++)
                {
                    var wrapSlot = this.slots[i];
                    if (!wrapSlot.isPlayed && Math.abs(wrapSlot.target.getTimePosition() - timePosition) < 1)
                    {
                        wrapSlot.isPlayed = true;
                        result = wrapSlot.target;
                    } else if (wrapSlot.isPlayed && Math.abs(wrapSlot.target.getTimePosition() - timePosition) > 5)
                    {
                        wrapSlot.isPlayed = false;
                    }
                }
                return result;
            },

            refresh:function ()
            {
                this.init();
            }
        });
        return new CuePointManager();
    },

    bind:function (scope, method)
    {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        method = args.shift();
        return function ()
        {
            return method.apply(scope, args.concat(Array.prototype.slice.call(arguments)));
        };
    },

    logObj:function (objName, obj)
    {
        for (var i in obj)
        {
            this.log(objName + ": " + i + " = " + obj[i]);
        }
    },

    log:function (msg, level)
    {
        if (!level)
        {
            level = tpConsts.DEBUG;
        }

        tpDebug(msg, this.controller.id, "FreeWheel", level);
    }
});

var thePlatformPDKPlugin = new ThePlatformPDKPlugin();
tpController.plugInLoaded(thePlatformPDKPlugin, thePlatformPDKPlugin.videoDisplayBase);

