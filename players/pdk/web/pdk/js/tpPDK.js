(function(){var a=false,b=/xyz/.test(function(){xyz
})?/\b_super\b/:/.*/;
this.Class=function(){};
Class.extend=function(g){var f=this.prototype;
a=true;
var e=new this();
a=false;
for(var d in g){e[d]=typeof g[d]=="function"&&typeof f[d]=="function"&&b.test(g[d])?(function(h,i){return function(){var l=this._super;
this._super=f[h];
var k=i.apply(this,arguments);
this._super=l;
return k
}
})(d,g[d]):g[d]
}function c(){if(!a&&this.init){this.init.apply(this,arguments)
}this.instanceOf=function(k){for(var i in k){if(typeof k[i]==="function"&&typeof this[i]!="function"){return false
}return true
}};
if(this["implements"]&&this["implements"].length>0){for(var h=0;
h<this["implements"].length;
h++){if(!this.instanceOf(this["implements"][h])){throw new Error("Interface not fully implemented")
}}}}c.prototype=e;
c.constructor=c;
c.extend=arguments.callee;
return c
}
})();
EventDispatcher=Class.extend({buildListenerChain:function(){if(!this.listenerChain){this.listenerChain={}
}},addEventListener:function(a,b){if(!b instanceof Function){throw {message:"Listener isn't a function"}
}this.buildListenerChain();
if(!this.listenerChain[a]){this.listenerChain[a]=[b]
}else{this.listenerChain[a].push(b)
}},hasEventListener:function(a){if(this.listenerChain){return(typeof this.listenerChain[a]!="undefined")
}else{return false
}},removeEventListener:function(b,c){if(!this.hasEventListener(b)){return false
}for(var a=0;
a<this.listenerChain[b].length;
a++){if(this.listenerChain[b][a]==c){this.listenerChain[b].splice(a,1)
}}},dispatchEvent:function(c,a){this.buildListenerChain();
if(!this.hasEventListener(c)){return false
}for(var b=0;
b<this.listenerChain[c].length;
b++){var d=this.listenerChain[c][b];
if(d.call){d.call(this,a)
}}}});
PDKComponent=Class.extend({_generateExportedMarkup:function(){return'<div id="'+this.id+'"></div>'
},write:function(){document.write(this._generateExportedMarkup(this.id));
try{var a=document.getElementById(this.id);
return this._bindElement(a)
}catch(b){}},bind:function(d){try{var c=document.getElementById(d);
c.innerHTML=this._generateExportedMarkup();
var a=document.getElementById(this.id);
return this._bindElement(a)
}catch(b){}},_bindElement:function(a){return this.container=a
},init:function(){},doPluginStuff:function(){this.pluginManager=new PlugInManager(this.controller);
for(prop in this){if(!prop.toLowerCase().match(/plugin|wrapper/)){continue
}var o=this[prop];
if(typeof o!="string"){continue
}var d;
if(prop.toLowerCase().indexOf("plugin")==0){d=prop.substr(6)
}else{if(prop.toLowerCase().indexOf("wrapper")==0){d=prop.substr(7)
}}var m;
var n=Number.MAX_VALUE;
var a;
var h;
var f;
var k=new Object();
var c=o.split("|");
for(var g=0;
g<c.length;
g++){var e=c[g];
if(e.indexOf("=")==-1){continue
}var b=[e.substr(0,e.indexOf("=")),e.substr(e.indexOf("=")+1)];
var l=b[0];
var p=b[1];
p=unescape(p);
switch(l.toLowerCase()){case"type":m=p;
break;
case"priority":n=parseInt(p);
break;
case"url":a=p;
break;
case"suburl":h=p;
break;
case"runtime":f=p;
break;
default:k[l]=p;
break
}}if(!a){return null
}this.pluginManager.addPlugIn(d,m,n,a,h,k,null,f)
}this.pluginManager.ready()
},ready:function(){this.controller.registerFunction("getComponentSize",this,this.getComponentSize);
this.controller.registerFunction("addChild",this,this.addChild);
var a=this;
setTimeout(function(){a.doPluginStuff()
},1)
},getComponentSize:function(){return{width:this.container.offsetWidth,height:this.container.offsetHeight,id:this.id}
},addChild:function(a){if(this.pluginLayer){this.pluginLayer.appendChild(a)
}else{if(this.container){this.container.appendChild(a)
}}},addPlugIn:function(h,c,b,a,g,f,e){if(!this.plugins){this.plugins=new Array()
}var d={id:h,type:c,priority:b,url:a,subUrl:g,vars:f,plugIn:e};
this.pluginManager.addPlugIn(d)
}});
oldController=EventDispatcher.extend({init:function(){this.functions=new Object();
this.objects=new Object();
this.pluginQueue=new Array();
this.pluginScopes=new Array();
this.waitingForPlugIn=false
},dispatchEvent:function(b,a){this._super(b,{type:b,data:a})
},doDispatchEvent:function(a){this.dispatchEvent(a.type,a.data)
},removeEventListener:function(a,b){this._super(a,b)
},addEventListener:function(a,b){this._super(a,b)
},loadPlugIn:function(b,a){b.controller=a;
this.pluginQueue.push(b);
this.pluginScopes.push(a.componentId);
if(this.waitingForPlugIn){return
}this.loadNextPlugIn()
},loadNextPlugIn:function(){this.currentPlugIn=this.pluginQueue.shift();
if(!this.queuedControllers){this.queuedControllers=[]
}if(this.currentPlugIn){this.waitingForPlugIn=true;
tpDebug("Trying to load plugin at "+this.currentPlugIn.url);
var b=document.getElementsByTagName("head")[0];
var c=document.createElement("script");
c.type="text/javascript";
c.src=this.currentPlugIn.url;
b.appendChild(c)
}else{var d=0;
var a=this.queuedControllers.length;
for(;
d<a;
d++){this.queuedControllers[d].dispatchEvent(PdkEvent.OnPlugInsComplete,null,this.pluginScopes)
}this.dispatchEvent(PdkEvent.OnPlugInsComplete,null,this.pluginScopes);
if(tpController){tpController.ready()
}var d=0;
for(;
d<a;
d++){this.queuedControllers[d].initializePlayback()
}var e=this;
setTimeout(function(){e.initializePlayback()
},1)
}},addChild:function(b,a){return this.callFunction("addChild",[b],a)
},plugInLoaded:function(c,d){if(!this.queuedControllers){this.queuedControllers=[]
}var b=false;
for(var a in this.queuedControllers){if(this.currentPlugIn.controller.id==a.id){b=true;
break
}}if(b){this.queuedControllers.push(this.currentPlugIn.controller)
}c.initialize({controller:this.currentPlugIn.controller,vars:this.currentPlugIn.vars,priority:this.currentPlugIn.priority});
if(d){this.addChild(d)
}this.dispatchEvent(PdkEvent.OnPlugInLoaded,c,[this.currentPlugIn.controller.componentId]);
this.waitingForPlugIn=false;
this.loadNextPlugIn()
},clickPlayButton:function(a){return this.callFunction("clickPlayButton",[],a)
},clickPlayButtonNative:function(a){return this.callFunction("clickPlayButtonNative",[],a)
},doParsePlaylist:function(a,c,b){return this.callFunction("doParsePlaylist",[a,c],b)
},firstRange:function(b,a){this.callFunction("firstRange",[b],a)
},getCurrentRange:function(a){this.callFunction("getCurrentRange",[],a)
},getRelease:function(a,c,b){return this.callFunction("getRelease",[a,c],b)
},getSubtitleLanguage:function(a,b){this.callFunction("getSubtitleLanguage",[a],b)
},loadRelease:function(a,b,c){a=this.modRelease(a);
return this.callFunction("loadRelease",[a,b],c)
},loadReleaseURL:function(a,b,c){return this.callFunction("loadReleaseURL",[a,b],c)
},loadReleaseURLNative:function(a,b,c){return this.callFunction("loadReleaseURLNative",[a,b],c)
},parseRelease:function(c,a,b,d){return this.callFunction("parseRelease",[c,a,b],d)
},loadJSON:function(a,d,b,c){return this.callFunction("loadJSON",[a,d,b],c)
},supportsFullScreen:function(a){return this.callFunction("supportsFullScreen",[],a)
},supportsSeek:function(a){return this.callFunction("supportsSeek",[],a)
},supportsMute:function(a){return this.callFunction("supportsMute",[],a)
},supportsVolume:function(a){return this.callFunction("supportsVolume",[],a)
},mute:function(b,a){return this.callFunction(PdkFunctions.mute,[b],a)
},setVolume:function(b,a){return this.callFunction(PdkFunctions.setVolume,[b],a)
},nextClip:function(a){return this.callFunction(PdkFunctions.nextClip,[],a)
},nextRange:function(b,a){this.callFunction("nextRange",[b],a)
},tryWritePlayer:function(a){return this.callFunction("tryWritePlayer",[],a)
},pause:function(b,a){return this.callFunction("pause",[b],a)
},pauseNative:function(b,a){return this.callFunction("pauseNative",[b],a)
},playNext:function(c,a,b){return this.callFunction("playNext",[c,a],b)
},playPrevious:function(b,a){this.callFunction("playPrevious",[b],a)
},sendError:function(a,b){this.callFunction("sendError",[a],b)
},previousClip:function(a){return this.callFunction(PdkFunctions.previousClip,[],a)
},previousRange:function(b,a){this.callFunction("previousRange",[b],a)
},refreshReleaseModel:function(a,i,c,d,b,g,h,e,f){if(c){c.globalDataType=this.getDataTypeName("Sort")
}if(d){d.globalDataType=this.getDataTypeName("Range")
}return this.callFunction("refreshReleaseModel",[a,i,c,d,b,g,e,f],h)
},seekToPercentage:function(a,b){return this.callFunction("seekToPercentage",[a],b)
},seekToPosition:function(a,b){return this.callFunction("seekToPosition",[a],b)
},playPlaylist:function(b,a){return this.callFunction("playPlaylist",[b],a)
},setRelease:function(a,b,c){a=this.modRelease(a);
return this.callFunction("setRelease",[a,b],c)
},setReleaseURL:function(a,b,c){return this.callFunction("setReleaseURL",[a,b],c)
},setReleaseURLNative:function(a,b,c){return this.callFunction("setReleaseURLNative",[a,b],c)
},setShowSubtitles:function(a,b){this.callFunction("setShowSubtitles",[a],b)
},setSmil:function(a,b){this.callFunction("setSmil",[a],b)
},setSubtitleLanguage:function(b,a){this.callFunction("setSubtitleLanguage",[b],a)
},setToken:function(a,c,b){this.callFunction("setToken",[a,c],b)
},showFullScreen:function(b,a){return this.callFunction(PdkFunctions.showFullScreen,[b],a)
},endRelease:function(a){return this.callFunction("endRelease",[],a)
},getMediaArea:function(){var a=null;
return this.callFunction("getMediaArea",[],a)
},setMediaArea:function(b,a){this.callFunction("setMediaArea",[b],a)
},getOverlayArea:function(a){return this.callFunction("getOverlayArea",[],a)
},setOverlayArea:function(b,a){this.callFunction("setOverlayArea",[b],a)
},getReleaseState:function(){return this.callFunction(PlayerFunctions.getReleaseState,[])
},getTimeSinceLastAd:function(a){return this.callFunction("getTimeSinceLastAd",[],a)
},injectPlaylist:function(b,a){return this.callFunction("injectPlaylist",[b],a)
},insertPlaylist:function(b,a){return this.callFunction("insertPlaylist",[b],a)
},insertClip:function(b,a){return this.callFunction("insertClip",[b],a)
},registerAdPlugIn:function(b){var a=null;
return this.callFunction("registerAdPlugIn",[b],a)
},registerClipWrapperPlugIn:function(b){var a=null;
return this.callFunction("registerClipWrapperPlugIn",[b],a)
},registerMetadataUrlPlugIn:function(c,a,b){return this.callFunction("registerMetadataUrlPlugIn",[c,a],b)
},registerURLPlugIn:function(d,c,a){var b=null;
return this.callFunction("registerURLPlugIn",[d,c,a],b)
},setAds:function(b,a){return this.callFunction("setAds",[b],a)
},addPlayerCard:function(d,h,b,g,a,f,c,e){this.callFunction("addPlayerCard",[d,h,b,g,a,f,c,e],e)
},showPlayerCard:function(b,e,a,d,c){return this.callFunction("showPlayerCard",[b,e,a,d],c)
},hidePlayerCard:function(a,c,b){this.callFunction("hidePlayerCard",[a,c],b)
},showMenuCard:function(a,b){return this.callFunction("showMenuCard",[a],b)
},checkIfEndCardExists:function(a){return this.callFunction("checkIfEndCardExists",[],a)
},setClip:function(b){var a=null;
return this.callFunction("setClip",[b],a)
},setMetadataUrl:function(a,b){return this.callFunction("setMetadataUrl",[a],b)
},setOverlayArea:function(b,a){return this.callFunction("setOverlayArea",[b],a)
},setClipWrapper:function(a,b){return this.callFunction("setClipWrapper",[a],b)
},wrapClip:function(c,b,a){return this.callFunction("wrapClip",[c,b],a)
},initializePlayback:function(a){return this.callFunction("initializePlayback",[],a)
},endMedia:function(a,b){return this.callFunction("endMedia",[a,b])
},getVideoProxy:function(a){return this.callFunction(PdkFunctions.getVideoProxy,[],a)
},isFlashPlayer:function(b){var a=this.callFunction("isFlashPlayer",[],b);
if(a===undefined){return true
}else{return a
}},isStandbyMode:function(){return this.callFunction("isStandbyMode",[])
},isPrefetch:function(){return this.callFunction("isPrefetch",[])
},markOffset:function(c,a,b){return this.callFunction("markOffset",[c,a,b])
},resetRelease:function(a){return this.callFunction("resetRelease",[],a)
},updateMediaTime:function(a,b){this.callFunction("updateMediaTime",[a],b)
},updateClip:function(b,a){this.callFunction("updateClip",[b],a)
},updatePlaylist:function(b,a){this.callFunction("updatePlaylist",[b],a)
},writePlayer:function(b,a,c){return this.callFunction("writePlayer",[b,a],c)
},setShowControls:function(b,c,a){this.callFunction("setShowControls",[b,c],a)
},getDataTypeName:function(a){switch(a){case"AdPattern":return"com.theplatform.pdk.data::AdPattern";
case"Banner":return"com.theplatform.pdk.data::Banner";
case"BaseClip":return"com.theplatform.pdk.data::BaseClip";
case"CallInfo":return"com.theplatform.pdk.communication::CallInfo";
case"CategoryInfo":return"com.theplatform.pdk.data::CategoryInfo";
case"Clip":return"com.theplatform.pdk.data::Clip";
case"CommInfo":return"com.theplatform.pdk.communication::CommInfo";
case"CustomData":return"com.theplatform.pdk.data::CustomData";
case"CustomValue":return"com.theplatform.pdk.data::CustomValue";
case"DispatchInfo":return"com.theplatform.pdk.communication::DispatchInfo";
case"FunctionInfo":return"com.theplatform.pdk.communication::FunctionInfo";
case"HandlerInfo":return"com.theplatform.pdk.communication::HandlerInfo";
case"HyperLink":return"com.theplatform.pdk.data::HyperLink";
case"MediaClick":return"com.theplatform.pdk.data::MediaClick";
case"MediaFile":return"com.theplatform.pdk.data::MediaFile";
case"MessageInfo":return"com.theplatform.pdk.communication::MessageInfo";
case"MetricInfo":return"com.theplatform.pdk.data::MetricInfo";
case"Overlay":return"com.theplatform.pdk.data::Overlay";
case"PdkEvent":return"com.theplatform.pdk.events::PdkEvent";
case"ProviderInfo":return"com.theplatform.pdk.data::ProviderInfo";
case"Range":return"com.theplatform.pdk.data::Range";
case"Rating":return"com.theplatform.pdk.data::Rating";
case"Release":return"com.theplatform.pdk.data::Release";
case"ReleaseInfo":return"com.theplatform.pdk.data::ReleaseInfo";
case"ScopeInfo":return"com.theplatform.pdk.communication::ScopeInfo";
case"Sort":return"com.theplatform.pdk.data::Sort";
case"Subtitles":return"com.theplatform.pdk.data::Subtitles";
case"TrackingUrl":return"com.theplatform.pdk.data::TrackingUrl";
case"BandwidthPreferences":return"com.theplatform.pdk.data::BandwidthPreferences";
case"Annotation":return"com.theplatform.pdk.data::Annotation"
}},ready:function(){this.isHTML5Loading=false;
this.checkMessageQueue()
},callFunction:function(b,e,c,d){if(c==null&&this.scopes!=undefined){c=this.scopes.concat()
}var a=this.functions[b];
if(a){return this.functions[b].apply(this.objects[b],e)
}else{if(tpController&&!d){return tpController.callFunction(b,e,c)
}else{return null
}}},doCallFunction:function(a){this.callFunction(a.name,a.args,a.scope)
},registerFunction:function(b,a,d){var c=this.functions[b]===undefined;
this.functions[b]=d;
this.objects[b]=a;
if(tpController){tpController.registerFunction(b,function(){return d.apply(a,arguments)
},(this.scopes?this.scopes.concat():undefined),c)
}},modRelease:function(a){if(a){a.globalDataType=this.getDataTypeName("Release");
if(a.categories){a.categories=this.modCategories(a.categories)
}if(a.thumbnails){for(var b=0;
b<a.thumbnails.length;
b++){a.thumbnails[b].globalDataType=this.getDataTypeName("MediaFile");
if(a.thumbnails[b].customValues){a.thumbnails[b].customValues=this.modCustomValues(a.thumbnails[b].customValues)
}}}if(a.customValues){a.customValues=this.modCustomValues(a.customValues)
}if(a.metrics){for(var b=0;
b<a.metrics.length;
b++){a.metrics[b].globalDataType=this.getDataTypeName("MetricInfo")
}}if(a.provider){a.provider.globalDataType=this.getDataTypeName("ProviderInfo");
if(a.provider.customValues){a.provider.customValues=this.modCustomValues(a.provider.customValues)
}}if(a.ratings){for(var b=0;
b<a.ratings.length;
b++){a.ratings[b].globalDataType=this.getDataTypeName("Rating")
}}if(a.URL){a.url=a.URL
}}return a
},modCustomValues:function(a){for(var b=0;
b<a.length;
b++){a[b].globalDataType=this.getDataTypeName("CustomValue")
}return a
},modCategories:function(a){for(var b=0;
b<a.length;
b++){a[b].globalDataType=this.getDataTypeName("CategoryInfo")
}return a
},modClip:function(a){if(a){a.globalDataType=this.getDataTypeName("Clip");
var b=a.baseClip;
if(!b){b=new Object()
}if(a.banners){b.banners=a.banners
}if(a.overlays){b.overlays=a.overlays
}a.baseClip=this.modBaseClip(b);
if(a.chapter){a.chapter.globalDataType=this.getDataTypeName("Chapter")
}}return a
},modBaseClip:function(b){if(!b){b=new Object()
}b.globalDataType=this.getDataTypeName("BaseClip");
if(b.moreInfo){b.moreInfo.globalDataType=this.getDataTypeName("HyperLink");
if(b.moreInfo.clickTrackingUrls){b.moreInfo.clickTrackingUrls=this.modTracking(b.moreInfo.clickTrackingUrls)
}}if(b.banners){for(var a=0;
a<b.banners.length;
a++){b.banners[a].globalDataType=this.getDataTypeName("Banner");
if(b.banners[a].clickTrackingUrls){b.banners[a].clickTrackingUrls=this.modTracking(b.banners[a].clickTrackingUrls)
}}}if(b.overlays){for(var a=0;
a<b.overlays.length;
a++){b.overlays[a].globalDataType=this.getDataTypeName("Overlay");
if(b.overlays[a].clickTrackingUrls){b.overlays[a].clickTrackingUrls=this.modTracking(b.overlays[a].clickTrackingUrls)
}}}if(b.availableSubtitles){for(var a=0;
a<b.availableSubtitles;
a++){b.availableSubtitles[a].globalDataType=this.getDataTypeName("Subtitles")
}}if(b.categories){b.categories=this.modCategories(b.categories)
}if(b.adPattern){b.adPattern.globalDataType=this.getDataTypeName("AdPattern")
}if(b.trackingURLs){b.trackingURLs=this.modTracking(b.trackingURLs)
}if(b.contentCustomData){b.contentCustomData.globalDataType=this.getDataTypeName("CustomData")
}if(b.ownerCustomData){b.ownerCustomData.globalDataType=this.getDataTypeName("CustomData")
}if(b.outletCustomData){b.outletCustomData.globalDataType=this.getDataTypeName("CustomData")
}return b
},modTracking:function(a){for(var b=0;
b<a.length;
b++){a.globalDataType=this.getDataTypeName("TrackingUrl")
}return a
}});
if(window.tpController===undefined){tpController=new oldController()
}else{var tempController=tpController;
tpController=new oldController();
for(var prop in tempController){tpController[prop]=tempController[prop]
}if(window["$pdk"]!==undefined){$pdk.controller=tpController
}}ComponentController=oldController.extend({init:function(c,a,b){this.id=c;
this.component=a;
this.widgetId=this.component&&this.component.widgetId?this.component.widgetId:this.id;
if(typeof(b)==="object"){this.scopes=[c].concat(b)
}else{if(typeof(b)==="string"){this.scopes=[c,b]
}else{this.scopes=[c,"default"]
}}this._super()
},getComponentSize:function(a){return this.callFunction("getComponentSize",[],a)
},dispatchEvent:function(b,a){if(this.scopes&&this.scopes.length){tpController.dispatchEvent(b,a,this.scopes.concat(),this.widgetId)
}else{tpController.dispatchEvent(b,a,null,this.widgetId)
}},removeEventListener:function(a,b){if(this.scopes&&this.scopes.length){tpController.removeEventListener(a,b,this.scopes.concat())
}else{tpController.removeEventListener(a,b)
}},addEventListener:function(a,b){if(this.scopes&&this.scopes.length){tpController.addEventListener(a,b,this.scopes.concat())
}else{tpController.addEventListener(a,b)
}},getProperty:function(b){var a=this.component[b];
if(a===undefined){a=this.component[b.toLowerCase()]
}return a
},setProperty:function(a,b){this.component[a]=b
}});
function printStackTrace(){var l=[];
var c=false;
try{d.dont.exist+=0
}catch(g){if(g.stack){var m=g.stack.split("\n");
for(var d=0,f=m.length;
d<f;
d++){if(m[d].match(/^\s*[A-Za-z0-9\-_\$]+\(/)){l.push(m[d])
}}l.shift();
c=true
}else{if(window.opera&&g.message){var m=g.message.split("\n");
for(var d=0,f=m.length;
d<f;
d++){if(m[d].match(/^\s*[A-Za-z0-9\-_\$]+\(/)){var k=m[d];
if(m[d+1]){k+="at"+m[d+1];
d++
}l.push(k)
}}l.shift();
c=true
}}}if(!c){var b=arguments.callee.caller;
while(b){var h=b.toString();
var a=h.substring(h.indexOf("function")+8,h.indexOf("("))||"anonymous";
l.push(a);
b=b.caller
}}output(l)
}function output(a){alert(a.join("\n\n"))
}ViewController=ComponentController.extend({init:function(b,c,a){this._super(c,a)
},instantiateCard:function(a){return this.callFunction(PdkFunctions.instantiateCard,[a])
},showCard:function(c,e,f,b,d,a){this.callFunction(PdkFunctions.showCard,[c,e,f,b,d,a])
},hideCard:function(a,b){this.callFunction(PdkFunctions.hideCard,[a,b])
},getCard:function(a,b){return this.callFunction(PdkFunctions.getCard,[a,b])
},getCurrentCard:function(a){return this.callFunction(PdkFunctions.getCurrentCard,[a])
}});
PlayerController=ViewController.extend({init:function(b,a){this._super(ComponentTypes.PLAYER,b,a)
},getReleaseState:function(){return this.callFunction(PlayerFunctions.getReleaseState,[])
},getMuteState:function(){return this.callFunction(PlayerFunctions.getMuteState,[])
},getFullScreenState:function(){return this.callFunction(PlayerFunctions.getFullScreenState,[])
},loadLayer:function(c,e,b,d,a){return this.callFunction("loadLayer",[c,e,b])
},callLayerFunction:function(c,a,b){return this.callFunction("callLayerFunction",[c,a,b])
}});
Card=Class.extend({init:function(b,a){this._controller=a;
this._localDispatcher=new EventDispatcher();
this._cardDispatcher=null;
this._cardFunctions={};
this._area=null;
this._isActive=false;
this._isCreating=false;
this._layout=null;
this._startUp=true;
this._initVars=null;
this.id=b;
this.deckId="";
this.container=null;
this._dom=null;
this.priority=1;
this.initialized=false
},instantiate:function(b,a){if(this._isActive||this._isCreating){throw new Error("a Card cannot be instantiated when it is already active")
}this._isActive=this._layout?true:false;
this._isCreating=true;
this._area=b;
this._parent=a;
if(!this.container){this.container=new CssObject(this.id)
}this.container.percentHeight(100);
this.container.percentWidth(100);
this._localDispatcher.dispatchEvent(CardEvent.OnCardCreationStart,this);
if(!this._isActive){this._cleanUp();
this._localDispatcher.dispatchEvent(CardEvent.OnCardDestroyed,this);
return null
}this._dom=this._controller.instantiateCard(this);
return this._dom
},call:function(a,b){return this._callFunction(a,b)
},hasFunction:function(a){if(this._cardFunctions){return(this._cardFunctions[a]?true:false)
}else{return false
}},_callFunction:function(b,c){if(!this._isActive){throw new Error("cannot call a Card function on an inactive Card")
}if(this._cardFunctions){var a=this._cardFunctions[b];
if(!a){return null
}else{return a.func.apply(a.object,c)
}}else{throw new Error("a Card function: "+b+" was called that doesn't exist")
}},registerFunction:function(b,a,c){if(!this._isActive){throw new Error("cannot register a Card function on an inactive Card")
}var d={name:b,object:a,func:c};
if(!this._cardFunctions){this._cardFunctions={}
}this._cardFunctions[b]=d
},unRegisterFunction:function(a){delete this._cardFunctions[a]
},destroy:function(){delete this._layout;
delete this._localDispatcher;
this._cleanUp()
},_cleanUp:function(){delete this._area;
this._isCreating=false;
delete this._initVars;
if(this._cardFunctions){for(var a in this._cardFunctions){delete this._cardFunctions[a]
}delete this._cardFunctions
}if(this._cardDispatcher){delete this._cardDispatcher
}if(this.container){while(this.container.numChildren>0){this.container.removeChildAt(0)
}}},uninstantiate:function(){this._isActive=false;
this._localDispatcher.dispatchEvent(CardEvent.OnCardDestroyStart,this);
if(this._dom){this._dom.destroy()
}this._localDispatcher.dispatchEvent(CardEvent.OnCardDestroyed,this);
this._cleanUp()
},area:function(a){if(this._area!=undefined){this._area=a;
this._localDispatcher.dispatchEvent(CardEvent.OnCardAreaChanged,this._area)
}return this._area
},dom:function(){return this._dom
},isActive:function(a){if(a!=undefined){if(this._isCreating){this._isActive=a
}else{throw new Error("isActive can only be set inside the OnCardCreationStart event handler")
}}return this._isActive
},initVars:function(b){if(b!=undefined){if(this._initVars){for(var a in b){this._initVars[a]=b[a]
}}else{this._initVars=b
}}return this._initVars
},layout:function(a){if(a!=undefined){if(this._isActive&&!this._isCreating){throw new Error("layout cannot be set while the Card is active")
}this._layout=a
}if(this._layout){return this._layout
}},addEventListener:function(a,b){if(!this._localDispatcher){return
}if(this._isLocalEvent(a)){this._localDispatcher.addEventListener(a,b)
}else{if(!this._isActive){throw new Error("Card events cannot be added to an inactive Card")
}else{if(!this._cardDispatcher){this._cardDispatcher=new EventDispatcher()
}this._cardDispatcher.addEventListener(a,b)
}}},_isLocalEvent:function(a){switch(a){case CardEvent.OnCardAreaChanged:case CardEvent.OnCardCreated:case CardEvent.OnCardCreationStart:case CardEvent.OnCardDestroyed:case CardEvent.OnCardDestroyStart:case CardEvent.OnCardEnabled:case CardEvent.OnCardVisible:case CardEvent.OnDeckCreated:return true;
default:return false
}},removeEventListener:function(a,b){if(!this._localDispatcher){return
}if(this._isLocalEvent(a)){this._localDispatcher.removeEventListener(a,b)
}else{if(this._cardDispatcher){this._cardDispatcher.removeEventListener(a,b)
}}},dispatchEvent:function(a,b){if(!this._localDispatcher){return false
}if(this._isLocalEvent(a)){return this._localDispatcher.dispatchEvent(a,b)
}if(!this._isActive){throw new Error("cannot dispatch an event on an inactive Card")
}if(this._cardDispatcher){return this._cardDispatcher.dispatchEvent(a,b)
}return false
},hasEventListener:function(a){if(!this._localDispatcher){return false
}if(this._isLocalEvent(a)){return this._localDispatcher.hasEventListener(a)
}if(!this._isActive){throw new Error("cannot check an event on an inactive Card")
}if(this._cardDispatcher){return this._cardDispatcher.hasEventListener(a)
}return false
}});
CssObject=EventDispatcher.extend({init:function(a){this._id=a;
this._x=0;
this._y=0;
this._height=0;
this._width=0;
this._top=0;
this._bottom=0;
this._left=0;
this._right=0;
this._position="relative";
this._display="none";
this._float="";
this._units="px";
this._overflow="hidden";
this._backgroundColor="";
this._color="";
this._opacity="";
this._elementType="div";
this._enabled=false;
this._visible=false;
this._percentHeight=-1;
this._percentWidth=-1;
this.write()
},getView:function(){if(!this.element){return null
}else{return this.element
}},setView:function(a){this.element=a
},contains:function(a){for(var b in this.element.children){if(this.element.children[b]==a.element){return true
}}return false
},width:function(b,a){if(b==undefined){return this._width
}else{if(a!=undefined){this._width=b;
this.element.style.width=b+a
}else{this._width=b;
this.element.style.width=b+this._units
}}},height:function(b,a){if(b==undefined){return this._height
}else{if(a!=undefined){this._height=b;
this.element.style.height=b+a
}else{this._height=b;
this.element.style.height=b+this._units
}}},fontSize:function(b,a){if(b==undefined){return this._fontSize
}else{if(a!=undefined){this._fontSize=b;
this.element.style.fontSize=b+a
}else{this._height=b;
this.element.style.fontSize=b+this._units
}}},left:function(b,a){if(b==undefined){return this._left
}else{if(a!=undefined){this._left=b;
this.element.style.left=b+a
}else{this._left=b;
this.element.style.left=b+this._units
}}},right:function(b,a){if(b==undefined){return this._right
}else{if(a!=undefined){this._right=b;
this.element.style.right=b+a
}else{this._right=b;
this.element.style.right=b+this._units
}}},bottom:function(b,a){if(b==undefined){return this._bottom
}else{if(a!=undefined){this._bottom=b;
this.element.style.bottom=b+a
}else{this._bottom=b;
this.element.style.bottom=b+this._units
}}},top:function(b,a){if(b==undefined){return this._top
}else{if(a!=undefined){this._top=b;
this.element.style.top=b+a
}else{this._top=b;
this.element.style.top=b+this._units
}}},x:function(a){this.left(a,"px")
},y:function(a){this.top(a,"px")
},percentWidth:function(a){if(a==undefined){return this._percentWidth
}else{this._percentWidth=a;
this._width=-1;
this.element.style.width=a+"%"
}},percentHeight:function(a){if(a==undefined){return this._percentHeight
}else{this._percentHeight=a;
this._height=-1;
this.element.style.height=a+"%"
}},visible:function(a){if(a==undefined){return this._visible
}else{if(a==true){this._visible=true;
this.element.style.visibility="visible"
}else{this._visible=false;
this.element.style.visibility="hidden"
}}},cssFloat:function(a){if(a==undefined){return this._float
}else{this._float=a;
this.element.style["float"]=a;
this.element.style.cssFloat=a
}},units:function(a){if(a==undefined){return this._units
}else{this._units=a
}},display:function(a){if(a==undefined){return this._display
}else{this._display=a;
this.element.style.display=a
}},alpha:function(a){if(a!=undefined){this.opacity(a)
}else{return this.opacity(a)
}},opacity:function(a){if(a==undefined){return this._opacity
}else{this._opacity=a;
this.element.style.opacity=a;
this.element.style["-moz-opacity"]=a;
this.element.style.filter="alpha(opacity="+(a*100)+")"
}},backgroundColor:function(a){if(a==undefined){return this._backgroundColor
}else{this._backgroundColor=a;
this.element.style.backgroundColor=a
}},color:function(a){if(a==undefined){return this._color
}else{this._color=a;
this.element.style.color=a
}},position:function(a){if(a==undefined){return this._position
}else{this._position=a;
this.element.style.position=a
}},overflow:function(a){if(a==undefined){return this._overflow
}else{this._overflow=a;
this.element.style.overflow=a
}},enabled:function(a){if(a==undefined){return this._enabled
}else{if(a==true){this._enabled=true
}else{this._enabled=false
}}},offsetHeight:function(){return this.getView().offsetHeight
},offsetWidth:function(){return this.getView().offsetWidth
},offsetLeft:function(){return this.getView().offsetLeft
},offsetTop:function(){return this.getView().offsetTop
},write:function(){if(!this.element){this.element=document.createElement(this._elementType)
}if(this._id){this.element.id=this._id
}},validateLayout:function(){},invalidateLayout:function(){}});
var CardEvent=new Object();
CardEvent.OnCardAreaChanged="OnCardAreaChanged";
CardEvent.OnCardCreationStart="OnCardCreationStart";
CardEvent.OnCardCreated="OnCardCreated";
CardEvent.OnCardDestroyStart="OnCardDestroyStart";
CardEvent.OnCardDestroyed="OnCardDestroyed";
CardEvent.OnCardEnabled="OnCardEnabled";
CardEvent.OnCardVisible="OnCardVisible";
CardEvent.OnDeckCreated="OnDeckCreated";
var PlayerEvent=new Object();
PlayerEvent.OnUpdateOverlays="OnUpdateOverlays";
PlayerEvent.OnCheckAdFailed="OnCheckAdFailed";
PlayerEvent.OnStandbyRelease="OnStandbyRelease";
PlayerEvent.OnMediaAreaChanged="OnMediaAreaChanged";
PlayerEvent.onContentAreaChanged="onContentAreaChanged";
PlayerEvent.OnOverlayAreaChanged="OnOverlayAreaChanged";
PlayerEvent.OnReleaseStop="OnReleaseStop";
PlayerEvent.OnBandwidthPreferencesSet="OnBandwidthPreferencesSet";
PlayerEvent.OnFormShown="OnFormShown";
PlayerEvent.OnFlashFullScreen="OnPlayerFullScreen";
PlayerEvent.OnExternalFullScreen="OnExternalFullScreen";
PlayerEvent.OnPlayerPause="OnPlayerPause";
PlayerEvent.OnPlayerUnPause="OnPlayerUnPause";
PlayerEvent.OnNetConnectionClosed="OnNetConnectionClosed";
PlayerEvent.OnTrackActivated="OnTrackActivated";
PlayerEvent.OnPlugInsAboveControlsChanged="OnPlugInsAboveControlsChanged";
PlayerEvent.OnDebug="OnDebug";
PlayerEvent.OnVideoSized="OnVideoSized";
PlayerEvent.OnRelatedContentIdsReceived="OnRelatedContentIdsReceived";
Interface=Class.extend({init:function(){},isInstanceOf:function(b){for(var a in b){if(typeof b[a]==="function"){if(typeof this[a]!="function"){return false
}}}return true
}});
SampleCard=EventDispatcher.extend({init:function(d,b,a){var c=this;
this.id=d;
this.controller=a;
this.write()
},write:function(){if(this.view){this.view.innerHTML=""
}this.view=document.createElement("div");
this.view.id=this.id;
this.view.className="cardOverlay";
this.view.style.position="absolute";
this.view.style.top="0px";
this.view.style.left="0px";
this.view.style.height="100%";
this.view.style.width="100%";
this.view.style.background="";
this.view.style.zIndex="300";
this.view.style.display="none";
if(parent){this.parent=parent
}},cardClicked:function(){},getView:function(){return this.view
},showCard:function(a){if(a){this.view.style.display=""
}else{this.view.style.display="none"
}}});
if($pdk.bootloaderVersion!==null&&typeof($pdk.bootloaderVersion)==="object"){if("5"!=$pdk.bootloaderVersion.major||"5"!=$pdk.bootloaderVersion.minor||"1"!=$pdk.bootloaderVersion.revision){alert("Error: Bootloader Version and PDK-JS Version do not match.\n\nSomething is seriously wrong.")
}}var PdkFunctions=new Object();
PdkFunctions.getCommandChain="getCommandChain";
PdkFunctions.insertCommand="insertCommand";
PdkFunctions.setRelease="setRelease";
PdkFunctions.setReleaseURL="setReleaseURL";
PdkFunctions.loadRelease="loadRelease";
PdkFunctions.loadReleaseURL="loadReleaseURL";
PdkFunctions.fetchReleaseData="fetchReleaseData";
PdkFunctions.loadSmil="loadSmil";
PdkFunctions.setSmil="setSmil";
PdkFunctions.resetPlayer="resetPlayer";
PdkFunctions.setCurrentReleaseList="setCurrentReleaseList";
PdkFunctions.nextClip="nextClip";
PdkFunctions.previousClip="previousClip";
PdkFunctions.seekToPosition="seekToPosition";
PdkFunctions.seekToPercentage="seekToPercentage";
PdkFunctions.pause="pause";
PdkFunctions.mute="mute";
PdkFunctions.setVolume="setVolume";
PdkFunctions.setPlayerMessage="setPlayerMessage";
PdkFunctions.clearPlayerMessage="clearPlayerMessage";
PdkFunctions.disablePlayerControls="disablePlayerControls";
PdkFunctions.setPreviewImageUrl="setPreviewImageUrl";
PdkFunctions.showFullScreen="showFullScreen";
PdkFunctions.showEmailForm="showEmailForm";
PdkFunctions.showLinkForm="showLinkForm";
PdkFunctions.getSubtitleLanguage="getSubtitleLanguage";
PdkFunctions.setSubtitleLanguage="setSubtitleLanguage";
PdkFunctions.useDefaultEmailForm="useDefaultEmailForm";
PdkFunctions.submitForm="submitForm";
PdkFunctions.setFormSubmission="setFormSubmission";
PdkFunctions.useDefaultLinkForm="useDefaultLinkForm";
PdkFunctions.getPlayerVariables="getPlayerVariables";
PdkFunctions.useDefaultPlayOverlay="useDefaultPlayOverlay";
PdkFunctions.getUseDefaultPlayOverlay="getUseDefaultPlayOverlay";
PdkFunctions.showPlayOverlay="showPlayOverlay";
PdkFunctions.clickPlayButton="clickPlayButton";
PdkFunctions.clearAdCookie="clearAdCookie";
PdkFunctions.hidePlayerRegions="hidePlayerRegions";
PdkFunctions.setBandwidthPreferences="setBandwidthPreferences";
PdkFunctions.getBandwidthPreferences="getBandwidthPreferences";
PdkFunctions.setVideoScalingMethod="setVideoScalingMethod";
PdkFunctions.setExpandVideo="setExpandVideo";
PdkFunctions.showPlayerCard="showPlayerCard";
PdkFunctions.hidePlayerCard="hidePlayerCard";
PdkFunctions.registerControlPlugIn="registerControlPlugIn";
PdkFunctions.registerViewFactory="registerViewFactory";
PdkFunctions.createConcreteControl="createConcreteControl";
PdkFunctions.refreshCategoryModel="refreshCategoryModel";
PdkFunctions.clearCategorySelection="clearCategorySelection";
PdkFunctions.refreshReleaseModel="refreshReleaseModel";
PdkFunctions.setClipInfo="setClipInfo";
PdkFunctions.nextRange="nextRange";
PdkFunctions.previousRange="previousRange";
PdkFunctions.firstRange="firstRange";
PdkFunctions.playPrevious="playPrevious";
PdkFunctions.playNext="playNext";
PdkFunctions.suspendPlayAll="suspendPlayAll";
PdkFunctions.loadSkin="loadSkin";
PdkFunctions.getAsset="getAsset";
PdkFunctions.getImageAsset="getImageAsset";
PdkFunctions.getFont="getFont";
PdkFunctions.getTextFormat="getTextFormat";
PdkFunctions.getTextFieldAttributes="getTextFieldAttributes";
PdkFunctions.getDefaultStyles="getDefaultStyles";
PdkFunctions.getSkinProperties="getSkinProperties";
PdkFunctions.getComponentSize="getComponentSize";
PdkFunctions.localToGlobal="localToGlobal";
PdkFunctions.globalToLocal="globalToLocal";
PdkFunctions.colorizeAsset="colorizeAsset";
PdkFunctions.setColor="setColor";
PdkFunctions.getBackgroundPadding="getBackgroundPadding";
PdkFunctions.getStage="getStage";
PdkFunctions.getImageLoaderAsset="getImageLoaderAsset";
PdkFunctions.createITextField="createITextField";
PdkFunctions.createILabel="createILabel";
PdkFunctions.registerMetadataUrlPlugIn="registerMetadataUrlPlugIn";
PdkFunctions.processMetadataUrl="processMetadataUrl";
PdkFunctions.setMetadataUrl="setMetadataUrl";
PdkFunctions.instantiateCard="instantiateCard";
PdkFunctions.addCard="addCard";
PdkFunctions.showCard="showCard";
PdkFunctions.hideCard="hideCard";
PdkFunctions.getCard="getCard";
PdkFunctions.getCurrentCard="getCurrentCard";
PdkFunctions.addMediator="addMediator";
PdkFunctions.addItem="addItem";
PdkFunctions.getMediator="getMediator";
PdkFunctions.getItem="getItem";
PdkFunctions.setDefaultFont="setDefaultFont";
PdkFunctions.registerTextField="registerTextField";
PdkFunctions.setText="setText";
PdkFunctions.setHtmlText="setHtmlText";
PdkFunctions.getColorFromString="getColorFromString";
PdkFunctions.setDefaultStyle="setDefaultStyle";
PdkFunctions.setPreferredStyle="setPreferredStyle";
PdkFunctions.setFont="setFont";
PdkFunctions.setStyleParameter="setStyleParameter";
PdkFunctions.showTooltip="showTooltip";
PdkFunctions.registerCompanionAdPlugIn="registerCompanionAdPlugIn";
PdkFunctions.setCompanionAd="setCompanionAd";
PdkFunctions.getAnimationManager="getAnimationManager";
ComponentTypes=new Object();
ComponentTypes.CATEGORY_LIST="categoryList";
ComponentTypes.CATEGORY_MODEL="categoryModel";
ComponentTypes.CLIP_INFO="clipInfo";
ComponentTypes.COMM_MANAGER="commManager";
ComponentTypes.HEADER="header";
ComponentTypes.JAVASCRIPT="javascript";
ComponentTypes.NAVIGATION="navigation";
ComponentTypes.PLAYER="player";
ComponentTypes.RELEASE_LIST="releaseList";
ComponentTypes.RELEASE_MODEL="releaseModel";
ComponentTypes.SEARCH="search";
ComponentTypes.EXTERNAL="external";
ComponentTypes.LOCAL_ALL="localAll";
ComponentTypes.GLOBAL_ALL="globalAll";
Rectangle=Class.extend({init:function(b,d,c,a){this._x=b?b:0;
this._y=d?d:0;
this._width=c?c:0;
this._height=a?a:0;
this._top=this._y;
this._bottom=this._y+this._height;
this._left=this._x;
this._right=this._x+this._width
},clone:function(){return new Rectangle(this._x,this._y,this._width,this._height)
},x:function(a){if(a!=undefined){if(a<0){a=0
}this._x=a;
this._left=a;
this._right=a+this._width
}return this._x
},y:function(a){if(a!=undefined){if(a<0){a=0
}this._y=a;
this._top=a;
this._bottom=a+this._height
}return this._y
},width:function(a){if(a!=undefined){if(a<0){a=0
}this._width=a;
this._right=a+this._x
}return this._width
},height:function(a){if(a!=undefined){if(a<0){a=0
}this._height=a;
this._bottom=a+this._y
}return this._height
},top:function(a){if(a!=undefined){if(a<0){a=0
}if(a<this._y){this._height=0
}else{this._height=this._bottom-a
}this._top=this._y=a
}return this._top
},left:function(a){if(a!=undefined){if(a<0){a=0
}if(a<this._x){this._width=0
}else{this._width=this._right-a
}this._left=this._x=a
}return this._left
},bottom:function(a){if(a!=undefined){if(a<0){a=0
}if(a<this._y){this._bottom=this._y=a;
this._height=0
}else{this._bottom=a;
this._height=a-this._y
}}return this._bottom
},right:function(a){if(a!=undefined){if(a<0){a=0
}if(a<this._x){this._right=this._x=a;
this._width=0
}else{this._right=a;
this._width=a-this._x
}}return this._right
}});
var CardEvent=new Object();
CardEvent.OnCardAreaChanged="OnCardAreaChanged";
CardEvent.OnCardCreationStart="OnCardCreationStart";
CardEvent.OnCardCreated="OnCardCreated";
CardEvent.OnCardDestroyStart="OnCardDestroyStart";
CardEvent.OnCardDestroyed="OnCardDestroyed";
CardEvent.OnCardEnabled="OnCardEnabled";
CardEvent.OnCardVisible="OnCardVisible";
CardEvent.OnDeckCreated="OnDeckCreated";
var PlayerEvent=new Object();
PlayerEvent.OnUpdateOverlays="OnUpdateOverlays";
PlayerEvent.OnCheckAdFailed="OnCheckAdFailed";
PlayerEvent.OnStandbyRelease="OnStandbyRelease";
PlayerEvent.OnMediaAreaChanged="OnMediaAreaChanged";
PlayerEvent.onContentAreaChanged="onContentAreaChanged";
PlayerEvent.OnOverlayAreaChanged="OnOverlayAreaChanged";
PlayerEvent.OnReleaseStop="OnReleaseStop";
PlayerEvent.OnBandwidthPreferencesSet="OnBandwidthPreferencesSet";
PlayerEvent.OnFormShown="OnFormShown";
PlayerEvent.OnFlashFullScreen="OnPlayerFullScreen";
PlayerEvent.OnExternalFullScreen="OnExternalFullScreen";
PlayerEvent.OnPlayerPause="OnPlayerPause";
PlayerEvent.OnPlayerUnPause="OnPlayerUnPause";
PlayerEvent.OnNetConnectionClosed="OnNetConnectionClosed";
PlayerEvent.OnTrackActivated="OnTrackActivated";
PlayerEvent.OnPlugInsAboveControlsChanged="OnPlugInsAboveControlsChanged";
PlayerEvent.OnDebug="OnDebug";
PlayerEvent.OnVideoSized="OnVideoSized";
PlayerEvent.OnRelatedContentIdsReceived="OnRelatedContentIdsReceived";
var PlayerFunctions=new Object();
PlayerFunctions.getContentArea="getContentArea";
PlayerFunctions.getMediaArea="getMediaArea";
PlayerFunctions.setMediaArea="setMediaArea";
PlayerFunctions.setMediaPadding="setMediaPadding";
PlayerFunctions.getMediaPadding="getMediaPadding";
PlayerFunctions.setOverlayArea="setOverlayArea";
PlayerFunctions.getOverlayArea="getOverlayArea";
PlayerFunctions.getNetStreamData="getNetStreamData";
PlayerFunctions.addNetStreamClient="addNetStreamClient";
PlayerFunctions.removeNetStreamClient="removeNetStreamClient";
PlayerFunctions.attachNetStream="attachNetStream";
PlayerFunctions.removeOverlay="removeOverlay";
PlayerFunctions.endRelease="endRelease";
PlayerFunctions.getUsingPlayOverlay="getUsingPlayOverlay";
PlayerFunctions.getReleaseState="getReleaseState";
PlayerFunctions.getCurrentRelease="getCurrentRelease";
PlayerFunctions.getCurrentPlaylist="getCurrentPlaylist";
PlayerFunctions.getCurrentClip="getCurrentClip";
PlayerFunctions.getPreviousClip="getPreviousClip";
PlayerFunctions.getCurrentPosition="getCurrentPosition";
PlayerFunctions.hideMedia="hideMedia";
PlayerFunctions.setFlashFullScreen="setFlashFullScreen";
PlayerFunctions.getFullScreenState="getFullScreenState";
PlayerFunctions.createClipFromBaseClip="createClipFromBaseClip";
PlayerFunctions.getPlugInsAboveControls="getPlugInsAboveControls";
PlayerFunctions.setPlugInsAboveControls="setPlugInsAboveControls";
PlayerFunctions.restartCurrentClip="restartCurrentClip";
PlayerFunctions.addExpandee="addExpandee";
PlayerFunctions.removeExpandee="removeExpandee";
PlayerFunctions.addPopUp="addPopUp";
PlayerFunctions.removePopUp="removePopUp";
PlayerFunctions.validateItemId="validateItemId";
PlayerFunctions.getMuteState="getMuteState";
PlayerFunctions.getSoundLevel="getSoundLevel";
PlayerFunctions.getPauseState="getPauseState";
PlayerFunctions.setPauseState="setPauseState";
PlayerFunctions.setVideoVisible="setVideoVisible";
PlayerFunctions.sizeVideo="sizeVideo";
PlayerFunctions.injectPlaylist="injectPlaylist";
PlayerFunctions.insertClip="insertClip";
PlayerFunctions.setMediaHyperlink="setMediaHyperlink";
PlayerFunctions.getCurrentBandwidthPreferences="getCurrentBandwidthPreferences ";
PlayerFunctions.getActiveTrack="getActiveTrack";
PlayerFunctions.setActiveTrack="setActiveTrack";
PlayerFunctions.setPrimaryMediaWrapper="setPrimaryMediaWrapper";
PlayerFunctions.getPrimaryMediaWrapper="getPrimaryMediaWrapper";
PlayerFunctions.registerNetConnectionPlugIn="registerNetConnectionPlugIn";
PlayerFunctions.registerClipWrapperPlugIn="registerClipWrapperPlugIn";
PlayerFunctions.setClipWrapper="setClipWrapper";
PlayerFunctions.wrapClip="wrapClip";
PlayerFunctions.registerAdPlugIn="registerAdComponent";
PlayerFunctions.getTimeSinceLastAd="getTimeSinceLastAd";
PlayerFunctions.getContentSinceLastAd="getContentSinceLastAd";
PlayerFunctions.setAds="setAds";
PlayerFunctions.registerRelatedItemsPlugIn="registerRelatedItemsPlugIn";
PlayerFunctions.setRelatedContentIds="setRelatedContentIds";
PlayerFunctions.checkRelatedContentIds="checkRelatedContentIds";
PlayerFunctions.registerURLPlugIn="registerURLPlugIn";
PlayerFunctions.setClip="setClip";
PlayerFunctions.parseReleaseXML="parseReleaseXml";
PlayerFunctions.parseSmil="parseSmil";
PlayerFunctions.registerFormSubmitPlugIn="registerFormSubmitPlugIn";
PlayerFunctions.addSharingSite="addSharingSite";
PlayerFunctions.getSharingSite="getSharingSite";
PlayerFunctions.postSharingSite="postSharingSite";
var RegionFunctions=new Object();
RegionFunctions.setHideState="setHideState";
RegionFunctions.setDefaultInitialHideDelay="setDefaultInitialHideDelay";
RegionFunctions.setDefaultAutoHideDelay="setDefaultAutoHideDelay";
RegionFunctions.registerRegionFullScreen="registerRegionFullScreen";
RegionFunctions.unRegisterRegionFullScreen="unRegisterRegionFullScreen";
RegionFunctions.disableRegionFullScreen="disableRegionFullScreen";
FullScreenManager=Class.extend({init:function(b,a){this._controller=b;
this._pbm=a;
this._controller.registerFunction(PdkFunctions.showFullScreen,this,this.doShowFullScreen);
this._controller.registerFunction(PlayerFunctions.getFullScreenState,this,this.getFullScreenState);
var c=this;
this.flashFullScreenListener=function(d){c.flashFullScreen(d)
};
this._controller.addEventListener(PlayerEvent.OnFlashFullScreen,this.flashFullScreenListener);
this._controller.addEventListener("OnReleaseStart",function(d){c.onReleaseStart(d)
});
this._controller.addEventListener("OnMediaError",function(){c.doShowFullScreen(false)
});
this._controller.addEventListener("OnMediaAreaChanged",function(){c.onMediaArea(false)
});
window.addEventListener("keydown",function(d){if(d.keyCode===27&&c._isFullWindow){c.doShowFullScreen(false)
}},false);
this._isFullScreen=false;
this._enableFullWindow=false;
this._allowFullScreen=this._controller.getProperty("allowFullScreen")=="false"?false:true
},onReleaseStart:function(a){if(tpIsIOS()&&(this._pbm.videoEngine)&&(this._pbm.videoEngine.isFullScreen()!=this._isFullScreen)){this._isFullScreen=this._pbm.videoEngine.isFullScreen();
this.sendEvt()
}},onMediaArea:function(a){if(this._isFullScreen!=this.isFullScreen()){this._isFullScreen=this.isFullScreen();
this.sendEvt()
}},doShowFullScreen:function(a){if(!this._allowFullScreen&&a){return
}if(this.isFullScreen()!=a){this._isFullScreen=a;
var b=new Object();
b.data=this._isFullScreen;
tpDebug("Going fullscreen");
this.setWebkitFullScreen(b)
}},isFullScreen:function(){var a=this._pbm.video;
var b=a.parentNode.parentNode;
if(this._isFullWindow||document.webkitIsFullScreen||b.webkitDisplayingFullscreen||a.webkitDisplayingFullscreen||document.mozFullScreen){return true
}else{return this._pbm.videoEngine.isFullScreen()
}},fullscreenChange:function(a){if(!a.isFullScreen){this._isFullScreen=false;
this.sendEvt()
}},setWebkitFullScreen:function(i){var c=i.data;
this._isFullScreen=c;
tpDebug("Trying to set fullscreen to "+c);
var a=(navigator.userAgent.indexOf("Windows")>-1&&navigator.userAgent.indexOf("AppleWebKit")>-1&&navigator.userAgent.toLowerCase().indexOf("chrome")===-1);
var f=this._pbm.video;
var h=this._pbm.videoEngine;
var g=f.parentNode.parentNode;
if(g.webkitRequestFullScreen&&!a){tpDebug("WebKit fullscreen API is apparently supported");
if((document.webkitIsFullScreen||g.webkitDisplayingFullscreen)&&!c){document.webkitCancelFullScreen()
}else{if(c){try{this.handlerFired=false;
if(!this.fsChangeHandler){this.fsChangeHandler=function(){d._isFullScreen=(document.webkitIsFullScreen||f.webkitDisplayingFullscreen||g.webkitDisplayingFullscreen)==true;
tpDebug("got webkitfullscreenchange event, isFullscreen is "+d._isFullScreen);
if(!d._isFullScreen){g.removeEventListener("webkitfullscreenchange",this.fsChangeHandler)
}d.sendEvt()
}
}var d=this;
g.removeEventListener("webkitfullscreenchange",this.fsChangeHandler);
g.addEventListener("webkitfullscreenchange",this.fsChangeHandler);
setTimeout(this.fsChangeHandler,3000);
g.webkitRequestFullScreen();
d.sendEvt()
}catch(i){g.removeChild(blocker);
tpDebug("Switching to full screen from Javascript is not supported in this browser unless it's initiated by a user click.",this.controller.id,"FullScreenManager","error");
return
}}}return
}else{if(g.mozRequestFullScreen){tpDebug("Moz fullscreen API is apparently supported");
if(document.mozFullScreen&&!c){try{document.mozCancelFullScreen()
}finally{if(document.mozFullScreen){tpDebug("Couldn't exit with mozCancelFullScreen trying to hack the DOM");
var b=g.parentNode;
b.removeChild(g);
b.appendChild(g);
tpDebug("Done trying to hack DOM");
document.removeEventListener("mozfullscreenchange",this.callback);
this.callback=undefined;
this.sendEvt()
}}}else{if(c){try{g.mozRequestFullScreen()
}catch(i){tpDebug("Switching to full screen from Javascript is not supported in this browser unless it's initiated by a user click.",this.controller.id,"FullScreenManager","error");
return
}this.sendEvt();
var d=this;
document.removeEventListener("mozfullscreenchange",this.callback);
this.callback=function(){d._isFullScreen=document.mozFullScreen;
if(!d._isFullScreen){document.removeEventListener("mozfullscreenchange",d.callback);
d.callback=undefined
}d.sendEvt()
};
document.addEventListener("mozfullscreenchange",this.callback)
}}return
}}if(g.msRequestFullScreen){tpDebug("MS fullscreen API is apparently supported");
if((document.msIsFullScreen||g.msDisplayingFullscreen)&&!c){document.msCancelFullScreen()
}else{if(c){try{this.handlerFired=false;
if(!this.fsChangeHandler){this.fsChangeHandler=function(){d._isFullScreen=(document.msIsFullScreen||f.msDisplayingFullscreen||g.msDisplayingFullscreen)==true;
tpDebug("got msfullscreenchange event, isFullscreen is "+d._isFullScreen);
if(!d._isFullScreen){g.removeEventListener("msfullscreenchange",this.fsChangeHandler)
}d.sendEvt()
}
}var d=this;
g.removeEventListener("msfullscreenchange",this.fsChangeHandler);
g.addEventListener("msfullscreenchange",this.fsChangeHandler);
setTimeout(this.fsChangeHandler,3000);
g.msRequestFullScreen();
d.sendEvt()
}catch(i){g.removeChild(blocker);
tpDebug("Switching to full screen from Javascript is not supported in this browser unless it's initiated by a user click.",this.controller.id,"FullScreenManager","error");
return
}}}return
}else{if(this._enableFullWindow){tpDebug("No fullscreen API available, using full window");
if(!this.playerContainerStyle){this.playerContainerStyle={}
}this._isFullWindow=false;
if(c){this.playerContainerStyle.position=g.style.position;
this.playerContainerStyle.top=g.style.top;
this.playerContainerStyle.left=g.style.left;
this.playerContainerStyle.bottom=g.style.bottom;
this.playerContainerStyle.right=g.style.right;
this.playerContainerStyle.marginTop=g.style.marginTop;
this.playerContainerStyle.marginLeft=g.style.marginLeft;
this.playerContainerStyle.marginBottom=g.style.marginBottom;
this.playerContainerStyle.marginRight=g.style.marginRight;
this.playerContainerStyle.zIndex=$pdk.jQuery(g).parents(".tpPlayer")[0].style.zIndex;
this.playerContainerStyle.overflowX=$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowX;
this.playerContainerStyle.overflowY=$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowY;
$pdk.jQuery(g).parents(".tpPlayer")[0].style.zIndex=10000;
g.style.position="fixed";
g.style.top="0px";
g.style.left="0px";
g.style.bottom="0px";
g.style.right="0px";
g.style.marginTop="0px";
g.style.marginLeft="0px";
g.style.marginBottom="0px";
g.style.marginRight="0px";
$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowX="visible";
$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowY="visible";
this._isFullWindow=true
}else{g.style.position=this.playerContainerStyle.position;
g.style.top=this.playerContainerStyle.top;
g.style.left=this.playerContainerStyle.left;
g.style.bottom=this.playerContainerStyle.bottom;
g.style.right=this.playerContainerStyle.right;
g.style.marginTop=this.playerContainerStyle.marginTop;
g.style.marginLeft=this.playerContainerStyle.marginLeft;
g.style.marginBottom=this.playerContainerStyle.marginBottom;
g.style.marginRight=this.playerContainerStyle.marginRight;
g.style.zIndex=this.playerContainerStyle.zIndex;
$pdk.jQuery(g).parents(".tpPlayer")[0].style.zIndex=this.playerContainerStyle.zIndex;
$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowX=this.playerContainerStyle.overflowX;
$pdk.jQuery(g).parents(".tpPlayer")[0].style.overflowY=this.playerContainerStyle.overflowY
}this._isFullScreen=c;
var d=this;
setTimeout(function(){d.sendEvt()
},10);
return
}else{try{tpDebug("Trying to set VideoEngine fullscreen to "+c);
if(!this.changeListener){var d=this;
this.changeListener=function(k){d.fullscreenChange(k)
};
this._pbm.videoEngine.addEventListener("FULLSCREEN",this.changeListener)
}h.setFullScreen(c)
}catch(i){tpDebug("VideoEngine won't support fullscreen");
return
}}}this.sendEvt()
},sendEvt:function(){tpDebug("FullScreen is now:"+this._isFullScreen);
this._controller.dispatchEvent(PdkEvent.OnShowFullScreen,this._isFullScreen)
},getFullScreenState:function(){var a;
if(tpIsAndroid()||this._pbm.video.webkitDisplayingFullscreen||this._isFullWindow){a=true
}else{a=false
}if(a!=this._isFullScreen){this._isFullScreen=a;
this.sendEvt()
}return this._isFullScreen
}});
var PlayerStyleFactory=new Object();
PlayerStyleFactory.PLAYER_COUNTDOWN_FONT="PlayerCountdownFont";
PlayerStyleFactory.PLAYER_CONTROL_LABEL_FONT="PlayerControlLabelFont";
PlayerStyleFactory.PLAYER_CONTROL_LANGUAGE_FONT="PlayerControlLanguageFont";
PlayerStyleFactory.PLAYER_CONTROL_TOOLTIP_FONT="PlayerControlTooltipFont";
PlayerStyleFactory.PLAYER_FORM_TITLE_FONT="PlayerFormTitleFont";
PlayerStyleFactory.PLAYER_FORM_BUTTON_FONT="PlayerFormButtonFont";
PlayerStyleFactory.PLAYER_FORM_INPUT_FONT="PlayerFormInputFont";
PlayerStyleFactory.PLAYER_FORM_LABEL_FONT="PlayerFormLabelFont";
PlayerStyleFactory.PLAYER_FORM_MESSAGE_FONT="PlayerFormMessageFont";
PlayerStyleFactory.PLAYER_FORM_DESCRIPTION_FONT="PlayerFormDescriptionFont";
PlayerStyleFactory.PLAYER_MESSAGE_FONT="PlayerMessageFont";
PlayerStyleFactory.PLAYER_SUBTITLE_FONT="PlayerSubtitleFont";
PlayerStyleFactory.PLAYER_TITLE_FONT="PlayerTitleFont";
PlayerStyleFactory.DEFAULT_FONT="PlayerControlLabelFont";
$pdk.ns("$pdk.plugin");
$pdk.plugin.MetadataUrlManager=$pdk.extend(function(){},{constructor:function(a){this._plugins=[];
this._currentQueue=[];
this._context={complete:false,found:false};
this._controller=a;
this._controller.registerFunction("registerMetadataUrlPlugIn",this,this.registerMetadataUrlPlugIn);
this._controller.registerFunction("setMetadataUrl",this,this.setMetadataUrl);
this._controller.registerFunction("setUrl",this,this.setUrl)
},setUrl:function(c,a,b){this._context={releaseUrl:c,isPreview:a,callback:b,complete:false,found:false};
this._currentQueue=this._plugins.concat();
if(this._currentQueue.length===0){b(c);
return true
}else{if(!this._processNextPlugin()){b(c);
return true
}else{return false
}}},setMetadataUrl:function(a){if(this._currentQueue.length===0){if(!this._context.complete){this._context.releaseUrl=a;
this._context.callback(a);
this._context.complete=true
}}else{this._context.releaseUrl=a;
if(!this._processNextPlugin()){this._context.callback(this._context.releaseUrl);
this._context.complete=true
}}},registerMetadataUrlPlugIn:function(b,a){if(typeof(b.rewriteMetadataUrl)!=="function"){throw new Error('Attempt to register MetadataUrlPlugIn with non-conforming interface (plugin method "rewriteMetadataUrl" does not exist or is not a real method)')
}else{if(b.rewriteMetadataUrl.length!==2){throw new Error('Attempt to register MetadataUrlPlugIn with non-conforming interface ("rewriteMetadataUrl" method does not take 2 parameters)')
}}this._plugins.push({plugin:b,priority:Number(a)});
this._plugins=this._sortPluginsByPriority(this._plugins)
},_processNextPlugin:function(){var b=false,a;
while(!b&&this._currentQueue.length>0){a=this._currentQueue.shift();
b=a.plugin.rewriteMetadataUrl(this._context.releaseUrl,this._context.isPreview)
}this._context.found=b?true:this._context.found;
return b
},_sortPluginsByPriority:function(a){return a.sort(function(d,c){return d.priority-c.priority
})
}});
AdManager=Class.extend({init:function(a){this.controller=a;
a.registerFunction("setAds",this,this.setAds);
a.registerFunction("registerAdPlugIn",this,this.registerAdPlugIn);
a.registerFunction("getTimeSinceLastAd",this,this.getTimeSinceLastAd);
this.timeSinceLastAd=0;
this.plugins=new Array()
},setAds:function(a){if(a&&(tpIsIOS()||tpIsAndroid()&&this.controller.isPrefetch())){a.isAd=true
}this.controller.insertPlaylist(a)
},registerAdPlugIn:function(a,b,c){this.plugins.push({adPlugIn:a,adType:b,priority:c});
function d(f,e){if(f.priority<e.priority){return -1
}else{if(f.priority>e.priority){return 1
}else{return 0
}}}this.plugins.sort(d)
},getTimeSinceLastAd:function(){return this.timeSinceLastAd
},isAd:function(b){if(b.baseClip.isAd){return true
}else{var a=this.adPlugInsIsAd(b);
b.baseClip.isAd=a;
return a
}},checkAd:function(b){tpDebug("We have "+this.plugins.length+" ad plugins to check");
for(var a=0;
a<this.plugins.length;
a++){var c=this.plugins[a].adPlugIn.checkAd.apply(this.plugins[a].adPlugIn,[b]);
if(c){return true
}}return false
},adPlugInsIsAd:function(b){for(var a=0;
a<this.plugins.length;
a++){if(this.plugins[a].adPlugIn.isAd(b)){return true
}}return false
},validateAd:function(a){if(a.hasPlayed){return false
}return true
}});
oldCardMediator=Class.extend({init:function(g,b,c,f){this.controller=b;
var d=this;
this.cardID=g;
var a=document.getElementById(b.id);
this.standby=document.getElementById(b.id+".standby");
if(!this.standby){this.standby=document.createElement("div");
this.id=b.id+".standby";
this.style.width="100%";
this.style.height="100%";
this.style.pointerEvents="none";
a.appendChild(standby)
}var e;
if(e){this.setItem(e)
}this.controller.registerFunction("showCard",this,this.doShowCard);
this.controller.addEventListener("OnMediaStart",function(h){d.releaseSelected=false;
d.showCard(false)
});
this.controller.addEventListener("OnReleaseEnd",function(h){if(d.releaseSelected==false){d.showCard(true)
}});
this.controller.addEventListener("OnReleaseSelected",function(h){d.releaseSelected=true
});
this.controller.addEventListener("OnLoadRelease",function(h){d.showCard(false)
});
this.controller.addEventListener("OnLoadReleaseUrl",function(h){});
this.controller.addEventListener("OnMediaComplete",function(h){d.handleMediaComplete(h)
})
},setItem:function(a){if(this.card){if(this.card.parentNode){this.card.parentNode.innerHTML=""
}this.card=undefined
}this.div=a.getView();
this.card=a;
this.cardID=a.id;
var b=this;
this.card.view.addEventListener("click",function(){tpDebug("got click on card");
b.controller.showCard("forms",b.cardID,"Disable");
b.controller.playNext(false,true)
},false)
},doShowCard:function(d,f,c,b,e,a){if(f==this.cardID){if(c=="Enable"){this.showCard(true);
this.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,true);
this.controller.dispatchEvent(PdkEvent.OnShowPlayButtonOverlay,false)
}else{this.showCard(false);
this.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,true)
}}else{}},showCard:function(a){if(this.card){this.card.showCard(a);
this.controller.dispatchEvent("OnShowCard",a);
this.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,a)
}},handleMediaComplete:function(a){this.card.clipinfotext=a.data.baseClip.title
}});
ClipWrapperManager=Class.extend({init:function(a){this.controller=a;
this.initialize()
},initialize:function(){this.controller.registerFunction("registerClipWrapperPlugIn",this,this.registerCWPlugin);
this.controller.registerFunction("setClipWrapper",this,this.setClipWrapper)
},registerCWPlugin:function(d,b){if(!b){b=0
}if(!this.plugIns){this.plugIns=new Array()
}var f={plugin:d,priority:b};
var c=false;
for(var a=0;
a<this.plugIns.length;
a++){var e=this.plugIns[a];
if(f.priority<=e.priority){this.plugIns.splice(a,0,f);
c=true;
break
}}if(!c){this.plugIns.push(f)
}},processClip:function(b){if(this.currentClip){throw"the clipWrapperManager did not complete wrapping one clip before another was started"
}if(b.isWrappingClip||!this.plugIns){return false
}if(b.wasWrapped){b.wasWrapped=false;
return false
}var d=false;
var e={clip:b};
this.currentClip=b;
for(var a=0;
a<this.plugIns.length;
a++){var c=this.plugIns[a];
if(c.plugin.wrapClip(e)){d=true;
break
}}if(!d){this.currentClip=null
}return d
},setClipWrapper:function(a){if(this.currentClip){this.currentClip.wasWrapped=true;
this.currentClip=null;
this.controller.wrapClip(a.preRolls,a.postRolls)
}}});
ControlsManager=EventDispatcher.extend({init:function(a,b,c){this.controller=a;
this._controllerDeferred=b;
this.controlsManager=c;
this.releaseStarted=false;
this._buildListeners()
},initialize:function(b,c){this.successCallback=b;
this.errorCallback=c;
var h=this.controller.getProperty("skinUrl");
if(h&&(h.indexOf(location.hostname)!=-1||h.indexOf("http")!=-1)){this.skinUrl=h
}else{this.skinUrl=h?$pdk.scriptRoot+h:$pdk.scriptRoot+"/../../pdk/skins/cinematic/cinematic.json"
}this.parentNode=document.getElementById(this.controller.id+".controls");
this.isPreview=true;
var g=this;
this.endCardID=this.controller.getProperty("endCard");
var d=this.controller.getProperty("layoutUrl");
var e=this.controller.getProperty("layout");
var a=this.controller.getProperty("useNativeControls")=="true";
var f=this.controller.getProperty("useDefaultPlayOverlay")=="true"||this.controller.getProperty("showControlsBeforeVideo")=="false";
if(f&&!a){setTimeout(function(){c(false,a)
},1)
}if(!a){setTimeout(function(){g.parseMetaLayout(d,e)
},1)
}else{setTimeout(function(){c(false,true)
},1)
}},_buildListeners:function(){this.listeners={};
var a=this;
this.listeners.end=function(b){a.onMediaEnd(b)
};
this.listeners.fullscreen=function(b){a.onShowFullScreen(b)
};
this.listeners.getlanguage=function(b){a.onGetSubtitleLanguage(b)
};
this.listeners.loadStart=function(b){a.onMediaLoadStart(b)
};
this.listeners.loading=function(b){a.onMediaLoading(b)
};
this.listeners.loadrelease=function(b){a.onLoadRelease(b)
};
this.listeners.loadreleaseurl=function(b){a.onLoadRelease(b)
};
this.listeners.mute=function(b){a.onMute(b)
};
this.listeners.paused=function(b){a.onMediaPause(b)
};
this.listeners.playing=function(b){a.onMediaPlaying(b)
};
this.listeners.releaseend=function(b){a.onReleaseEnd(b)
};
this.listeners.releasestart=function(b){a.onReleaseStart(b)
};
this.listeners.resize=function(b){a.onResize(b)
};
this.listeners.seek=function(b){a.onMediaSeek(b)
};
this.listeners.setreleaseurl=function(b){a.onSetReleaseURL(b)
};
this.listeners.showcard=function(b){a.onShowCard(b)
};
this.listeners.hidecard=function(b){a.onHideCard(b)
};
this.listeners.showplayoverlay=function(b){a.onShowPlayOverlay(b)
};
this.listeners.start=function(b){a.onMediaStart(b)
};
this.listeners.unpaused=function(b){a.onMediaUnpause(b)
};
this.listeners.volumechange=function(b){a.onVolumeChange(b)
};
this.listeners.setShowControls=function(b,c){a.setShowControls(b,c)
};
this._controllerDeferred.addEventListener("OnGetSubtitleLanguage",this.listeners.getlanguage);
this._controllerDeferred.addEventListener("OnLoadRelease",this.listeners.loadrelease);
this._controllerDeferred.addEventListener("OnLoadReleaseUrl",this.listeners.loadreleaseurl);
this._controllerDeferred.addEventListener("OnMediaEnd",this.listeners.end);
this._controllerDeferred.addEventListener("OnMediaLoadStart",this.listeners.loadStart);
this._controllerDeferred.addEventListener("OnMediaLoading",this.listeners.loading);
this._controllerDeferred.addEventListener("OnMediaPause",this.listeners.paused);
this._controllerDeferred.addEventListener("OnMediaPlaying",this.listeners.playing);
this._controllerDeferred.addEventListener("OnMediaSeek",this.listeners.seek);
this._controllerDeferred.addEventListener("OnMediaStart",this.listeners.start);
this._controllerDeferred.addEventListener("OnMediaUnpause",this.listeners.unpaused);
this._controllerDeferred.addEventListener("OnMute",this.listeners.mute);
this._controllerDeferred.addEventListener("OnReleaseEnd",this.listeners.releaseend);
this._controllerDeferred.addEventListener("OnClearCurrentRelease",this.listeners.releaseend);
this._controllerDeferred.addEventListener("OnReleaseStart",this.listeners.releasestart);
this._controllerDeferred.addEventListener("OnResize",this.listeners.resize);
this._controllerDeferred.addEventListener("OnSetReleaseUrl",this.listeners.setreleaseurl);
this._controllerDeferred.addEventListener("OnShowCard",this.listeners.showcard);
this._controllerDeferred.addEventListener("OnHideCard",this.listeners.hidecard);
this._controllerDeferred.addEventListener("OnShowFullScreen",this.listeners.fullscreen);
this._controllerDeferred.addEventListener("OnShowPlayOverlay",this.listeners.showplayoverlay);
this._controllerDeferred.addEventListener("OnVolumeChange",this.listeners.volumechange);
this._controllerDeferred.registerFunction("setShowControls",this,this.listeners.setShowControls)
},addListeners:function(){var a=this;
this.controller.addEventListener("OnGetSubtitleLanguage",this.listeners.getlanguage);
this.controller.addEventListener("OnLoadRelease",this.listeners.loadrelease);
this.controller.addEventListener("OnLoadReleaseUrl",this.listeners.loadreleaseurl);
this.controller.addEventListener("OnMediaEnd",this.listeners.end);
this.controller.addEventListener("OnMediaLoadStart",this.listeners.loadStart);
this.controller.addEventListener("OnMediaLoading",this.listeners.loading);
this.controller.addEventListener("OnMediaPause",this.listeners.paused);
this.controller.addEventListener("OnMediaPlaying",this.listeners.playing);
this.controller.addEventListener("OnMediaSeek",this.listeners.seek);
this.controller.addEventListener("OnMediaStart",this.listeners.start);
this.controller.addEventListener("OnMediaUnpause",this.listeners.unpaused);
this.controller.addEventListener("OnMute",this.listeners.mute);
this.controller.addEventListener("OnReleaseEnd",this.listeners.releaseend);
this.controller.addEventListener("OnClearCurrentRelease",this.listeners.releaseend);
this.controller.addEventListener("OnReleaseStart",this.listeners.releasestart);
this.controller.addEventListener("OnResize",this.listeners.resize);
this.controller.addEventListener("OnSetReleaseUrl",this.listeners.setreleaseurl);
this.controller.addEventListener("OnShowCard",this.listeners.showcard);
this.controller.addEventListener("OnHideCard",this.listeners.hidecard);
this.controller.addEventListener("OnShowFullScreen",this.listeners.fullscreen);
this.controller.addEventListener("OnShowPlayOverlay",this.listeners.showplayoverlay);
this.controller.addEventListener("OnVolumeChange",this.listeners.volumechange);
this.controller.registerFunction("setShowControls",this,this.listeners.setShowControls)
},parseMetaLayout:function(c,d){var g=this;
if(this.skinUrl.indexOf(".swf")!=-1){tpDebug("You're trying to use a swf skin with an HTML5 player, this won't work. Use a JSON skin",this.controller.id,"ControlsManager",tpConsts.WARN);
this.errorCallback();
return
}g.addListeners();
tpDebug("Parsed metalayout, controls should appear");
var a=g.controller.supportsFullScreen()!=false&&g.controller.getProperty("allowFullScreen")!="false";
var f=g.controller.supportsMute()!=false;
var e=g.controller.supportsVolume()!=false;
var h=g.controller.checkIfEndCardExists()!=false;
tpDebug("SupportsFullScreen is "+a);
g.controller.hidePlayerCard("none");
g.controlsManager.supportsMute(f);
g.controlsManager.supportsVolume(e);
g.controlsManager.supportsFullScreen(a);
g.controlsManager.supportsMenuCard(h);
g.controlsManager.setIsFullScreen(false);
g.controlsManager.setIsPreview(g.isPreview);
g.controlsManager.setFullScreen(false);
g.controlsManager.hasCC(false);
var b=this.releaseStarted;
g.controlsManager.releaseStarted(b);
g.controlsManager.syncState();
g.releaseStarted=b;
g.controller.getSubtitleLanguage();
g.successCallback()
},onSetReleaseURL:function(a){this.releaseStarted=false;
this.controlsManager.releaseStarted(false);
this.controlsManager.hasCC(false);
this.controlsManager.releaseLoaded()
},onLoadRelease:function(c){this.releaseStarted=false;
this.controlsManager.releaseStarted(false);
this.controlsManager.releaseLoaded();
this.setTimes(0,c.data.duration);
this.controlsManager.setPercentLoaded(0);
this.controlsManager.setClipTitle(c.data.title);
if(c.data&&c.data.captions&&c.data.captions.length>0){var b=c.data.captions;
var f=[];
for(var a=0;
a<b.length;
a++){var d=b[a].lang?b[a].lang:b[a].language;
if(d){f.push(d)
}}if(f.length){this.controlsManager.setSubtitleLanguages(f)
}}},onShowPlayOverlay:function(a){if(!this.releaseStarted){this.controlsManager.releaseStarted(false);
tpDebug("onShowPlayOverlay Setting isPreview "+a.data);
this.controlsManager.setIsPreview(a.data);
this.isPreview=a.data
}},onHideCard:function(b){var a=b.data;
this.controlsManager.cardShowing(false,a.card,a.deck)
},onShowCard:function(b){var a=b.data;
this.controlsManager.cardShowing(true,a.card,a.deck)
},onReleaseStart:function(d){var a=d.data;
if(!a){return
}this.releaseStarted=true;
this.releaseLength=a.chapters.aggregateLength;
var c=[];
for(var b=1;
b<a.chapters.chapters.length;
b++){c.push(a.chapters.chapters[b].aggregateStartTime/this.releaseLength)
}this.currentChapters=c;
this.controlsManager.setPercentLoaded(0);
this.controlsManager.releaseStarted(true);
if(a.clips&&a.clips.length>0){if(a.clips.isAd){this.controlsManager.setClipTitle("")
}else{this.controlsManager.setClipTitle(a.clips[0].title)
}}tpDebug("Setting isPreview false");
this.controlsManager.setIsPreview(false);
this.isPreview=false
},onReleaseEnd:function(a){this.controlsManager.clearImageTracks();
this.releaseStarted=false;
this.controlsManager.setSubtitleLanguages([]);
this.controlsManager.setPercentLoaded(0);
this.setTimes(0,1);
this.controlsManager.releaseStarted(false);
this.controlsManager.pause();
this.controlsManager.hasCC(false);
this.controlsManager.setChapterPoints([]);
this.currentChapters=[]
},onMediaLoadStart:function(d){var c=d.data;
this.controlsManager.mediaNoSkip(c.baseClip.noSkip);
this.controlsManager.setIsAd(c.baseClip.isAd);
this.controlsManager.isAd(c.baseClip.isAd);
if(c.baseClip.isAd){this.controlsManager.setClipTitle("")
}else{this.controlsManager.setClipTitle(c.title)
}if(c.chapter&&c.chapter.chapters){this.setTimes(c.chapter.aggregateStartTime+c.offset,c.chapter.chapters.aggregateLength);
if(!c.baseClip.isAd&&!c.baseClip.noSkip&&this.controller.supportsSeek()){this.controlsManager.setChapterPoints(!this.currentChapters?[]:this.currentChapters)
}else{this.controlsManager.setChapterPoints([])
}}else{if(c.baseClip.trueLength>0){this.setTimes(c.startTime+c.offset,c.baseClip.trueLength)
}else{if(c.baseClip.isAd){this.setTimes(0,c.length)
}else{this.setTimes(c.startTime+c.offset,this.releaseLength)
}}this.controlsManager.setChapterPoints([])
}if(c.baseClip.availableImageTracks&&typeof(c.baseClip.availableImageTracks)&&c.baseClip.availableImageTracks.length>0&&!c.baseClip.isAd){for(var a=0;
a<c.baseClip.availableImageTracks.length;
a++){var b=c.baseClip.availableImageTracks[a]
}this.controlsManager.setAvailableImageTracks(c.baseClip.availableImageTracks)
}if(c.baseClip.isAd){this.controlsManager.setPercentLoaded(0)
}this.controlsManager.syncState()
},onMediaStart:function(g){tpDebug("Setting isPreview false");
this.controlsManager.setIsPreview(false);
this.isPreview=false;
var d=g.data;
var c=d.baseClip.availableSubtitles!==null&&typeof(d.baseClip.availableSubtitles)&&d.baseClip.availableSubtitles.length>0;
this.controlsManager.setIsAd(d.baseClip.isAd);
var a=this.controller.supportsFullScreen();
this.controlsManager.supportsFullScreen(a);
this.controlsManager.hasCC(c);
this.controlsManager.mediaStarted();
this.controlsManager.mediaNoSkip(d.baseClip.noSkip);
this.controlsManager.isAd(d.baseClip.isAd);
if(d.baseClip.isAd){this.controlsManager.setClipTitle("")
}else{this.controlsManager.setClipTitle(d.title)
}if(!d.baseClip.isAd&&!d.baseClip.noSkip&&this.controller.supportsSeek()){this.controlsManager.setChapterPoints(!this.currentChapters?[]:this.currentChapters)
}var f=d.baseClip.availableSubtitles;
var h=[];
for(var b=0;
b<f.length;
b++){h.push(f[b].language)
}this.controlsManager.setSubtitleLanguages(h)
},onMediaSeek:function(a){this.isPlaying=false;
if(a.data.end.durationAggregate){this.setTimes(a.data.end.currentTimeAggregate,a.data.end.durationAggregate)
}else{if(a.data.clip.chapter){this.setTimes(a.data.end.currentTimeAggregate,a.data.clip.chapter.chapters.aggregateLength)
}else{this.setTimes(a.data.end.currentTimeAggregate,this.releaseLength)
}}},setTimes:function(b,a){this.controlsManager.setTimes(b,a)
},onMediaLoading:function(a){this.controlsManager.setPercentLoaded(a.data.ratioLoaded)
},onMediaEnd:function(c){var b=c.data;
if((b.baseClip.isAd||b.baseClip.noSkip)&&b.currentMediaTime>0){this.setTimes(0,0)
}this.isPlaying=false;
var a=this;
setTimeout(function(){if(!a.isPlaying){a.controlsManager.pause()
}},600);
this.controlsManager.clearImageTracks()
},onMediaPlaying:function(a){if(!this.releaseStarted){this.releaseStarted=true;
this.controlsManager.releaseStarted(false);
this.controlsManager.releaseStarted(this.releaseStarted)
}this.controlsManager.setIsPreview(false);
if(!this.isPlaying){this.isPlaying=true;
this.controlsManager.play()
}if(a.data.currentTimeAggregate!==undefined){if(a.data.durationAggregate>0){this.setTimes(a.data.currentTimeAggregate,a.data.durationAggregate)
}else{this.setTimes(a.data.currentTimeAggregate,this.releaseLength)
}}else{if(a.data.duration>0){this.setTimes(a.data.currentTime,a.data.duration)
}else{this.setTimes(a.data.currentTime,this.releaseLength)
}}},onMediaPause:function(a){this.isPlaying=false;
this.controlsManager.pause()
},onMediaUnpause:function(a){this.isPlaying=true;
this.controlsManager.play()
},onMute:function(a){this.controlsManager.mute(a.data)
},onVolumeChange:function(a){this.controlsManager.setVolume(a.data/100)
},onShowFullScreen:function(a){this.controlsManager.setIsFullScreen(a.data);
this.controlsManager.setFullScreen(a.data)
},onGetSubtitleLanguage:function(a){var b=a.data.langCode;
this.controlsManager.setSubtitleLanguage(b)
},onResize:function(a){this.controlsManager.setSize(a.data.width+"px",a.data.height+"px")
},setShowControls:function(a,b){this.controller.dispatchEvent("OnShowControls",{visible:a,regionId:b})
}});
ErrorHolder=Class.extend({init:function(a){},handleMediaError:function(b){this.started=false;
var a=this;
setTimeout(function(){if(!a.started&&!a.ended){a.errorHolder.style.display=""
}},3000)
},handleReleaseEnd:function(a){this.started=false;
this.ended=true
},handleMediaStart:function(a){this.started=true;
this.ended=false;
this.errorHolder.style.display="none"
},handleOnMediaAreaChanged:function(a){this.standby.width=a.data.width;
this.standby.height=a.data.height;
this.errorHolder.width=this.standby.width;
this.errorHolder.height=this.standby.height
}});
ErrorManager=Class.extend({init:function(a,b){this.controller=a;
this.player=b;
this.controller.registerFunction("sendError",this,this.sendError)
},sendError:function(b){var e=b.clip;
if(e&&e.baseClip.failOverClips.length>0){var d=e.baseClip.failOverClips[0];
var c=com.theplatform.pdk.SelectorExported.clipFromBaseClip(d);
if(e.baseClip.failOverClips.length>1){var a=e.baseClip.failOverClips;
a.splice(0,1);
c.baseClip.failOverClips=a
}else{c.baseClip.failOverClips=[]
}var f=$.extend(true,{},e);
f.URL=c.URL;
f.baseClip=c.baseClip;
f.id=c.id;
this.player.doMediaLoadStart(f)
}else{this.controller.dispatchEvent("OnMediaError",b)
}}});
var tpJsonContexts=new Object();
function tpRegisterJsonContext(b){var a=(((1+Math.random())*65536)|0).toString(16).substring(1);
tpJsonContexts[a]=b;
return a
}function tpJSONLoaderCallback(b,a){tpJsonContexts[a](b)
}JSONLoader=Class.extend({init:function(){},load:function(a,i,b,g,e,f){if(!b){b="callback"
}if(!e){e="context"
}if(!g){g="tpJSONLoaderCallback"
}var c=tpRegisterJsonContext(function(){i(arguments[0],a)
});
if(a.indexOf("?")>=0){a+="&"+b+"="+g+"&"+e+"="+c
}else{a+="?"+b+"="+g+"&"+e+"="+c
}var d=document.getElementsByTagName("head")[0];
var h=document.createElement("script");
h.type="text/javascript";
h.src=a;
h.onerror=function(k){tpDebug("Failed to load "+h.src);
if(typeof(f)==="function"){f(k)
}};
d.appendChild(h)
}});
LoadingIndicatorHolder=Class.extend({init:function(b){this.controller=b;
var d=this;
b.addEventListener("OnShowPlayOverlay",function(){d.hide(true)
});
b.addEventListener("OnSetReleaseUrl",function(){d.handleSetReleaseUrl.apply(d,arguments)
});
b.addEventListener("OnReleaseStart",function(){d.handleSetReleaseUrl.apply(d,arguments)
});
b.addEventListener("OnMediaError",function(){d.handleMediaStart.apply(d,arguments)
});
b.addEventListener("OnMediaStart",function(){d.handleMediaStart.apply(d,arguments)
});
b.addEventListener("OnMediaSeek",function(){d.handleMediaStart.apply(d,arguments)
});
b.addEventListener("OnMediaEnd",function(){d.handleMediaEnd.apply(d,arguments)
});
b.addEventListener("OnMediaAreaChanged",function(){d.handleOnMediaAreaChanged.apply(d,arguments)
});
this.playingListener=function(){d.hide(true)
};
var a=document.getElementById(b.id);
var c=document.getElementById(b.id+".standby");
console.error("LoadingIndicatorHolder");
if(!c){c=document.createElement("div");
c.id=b.id+".standby";
c.style.width="100%";
c.style.height="100%";
c.style.pointerEvents="none";
c.style.position="absolute";
a.insertBefore(c,document.getElementById(b.id+".subtitles"))
}this.standby=c;
c.width=this.controller.getMediaArea().width;
c.height=this.controller.getMediaArea().height;
var e=document.createElement("div");
var d=this;
e.innerHTML="Loading...";
e.className="loadingIndicator";
e.style.position="absolute";
e.style.top="50%";
e.style.left="50%";
e.style.zIndex=500;
e.style.textAlign="center";
e.style.display="none";
c.appendChild(e);
this.div=e
},handleSetReleaseUrl:function(b){tpDebug(b.type+" fired, setting timer");
this.started=false;
var a=this;
this.timer=setTimeout(function(){if(!a.started){tpDebug(b.type+" Got timer should be showing loading indicator");
a.div.style.display=""
}},300)
},handleMediaStart:function(a){this.controller.removeEventListener("OnMediaPlaying",this.playingListener);
this.controller.addEventListener("OnMediaPlaying",this.playingListener);
tpDebug(a.type+" Got call should be hiding loading indicator");
this.started=true;
this.div.style.display="none"
},hide:function(a){tpDebug("Got hide call should be hiding loading indicator");
this.started=a;
a?this.div.style.display="none":this.div.style.display="";
this.controller.removeEventListener("OnMediaPlaying",this.playingListener)
},handleMediaEnd:function(a){tpDebug(a.type+" Got call should be hiding loading indicator");
this.started=false;
this.div.style.display="none";
this.controller.removeEventListener("OnMediaPlaying",this.playingListener);
this.controller.addEventListener("OnMediaPlaying",this.playingListener)
},handleOnMediaAreaChanged:function(a){this.standby.width=a.data.width;
this.standby.height=a.data.height
}});
OverlayManager=Class.extend({init:function(a,b){this.controller=a;
this.playerElement=b;
var c=this;
this.controller.registerFunction("getOverlayArea",this,this.getOverlayArea);
this.controller.registerFunction("setOverlayArea",this,this.setOverlayArea);
this.controller.addEventListener("OnMediaAreaChanged",function(d){c.mediaAreaChanged(d)
})
},getBrowserOffset:function(){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){return 32
}if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){return 42
}if(tpIsIOS()){return 54
}if(navigator.userAgent.toLowerCase().indexOf("safari")>-1){return 24
}if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){return 28
}return 35
},setOverlayArea:function(a){this.useNativeDefaults=false;
this.overlayArea=a;
this.controller.dispatchEvent("OnOverlayAreaChanged",this.getOverlayArea())
},getOverlayArea:function(b){if(this.overlayArea){return this.overlayArea
}var a={};
var c=!this.useNativeDefaults?this.getBrowserOffset():0;
a.height=this.playerElement.clientHeight-c;
a.width=this.playerElement.clientWidth;
a.top=this.playerElement.clientTop;
a.left=this.playerElement.clientLeft;
a.bottom=a.top+a.height;
a.right=a.left+a.width;
a.topLeft={x:a.left,y:a.top};
a.bottomRight={x:a.right,y:a.bottom};
a.size={x:a.width,y:a.height};
a.x=a.left;
a.y=a.top;
if(b){a.x+=$pdk.jQuery(this.playerElement).offset().left;
a.y+=$pdk.jQuery(this.playerElement).offset().top
}return a
},mediaAreaChanged:function(a){}});
var PdkEvent=new Object();
PdkEvent.OnPlayerLoaded="OnPlayerLoaded";
PdkEvent.OnResetPlayer="OnResetPlayer";
PdkEvent.OnPlayerShutdown="OnPlayerShutdown";
PdkEvent.OnCommandChainComplete="OnCommandChainComplete";
PdkEvent.OnPlugInLoaded="OnPlugInLoaded";
PdkEvent.OnPlugInsComplete="OnPlugInsComplete";
PdkEvent.OnPropertiesChanged="OnPropertiesChanged";
PdkEvent.OnBackgroundPadding="OnBackgroundPadding";
PdkEvent.OnControlsRefreshed="OnControlsRefreshed";
PdkEvent.OnSetVideoScalingMethod="OnSetVideoScalingMethod";
PdkEvent.OnSetExpandVideo="OnSetExpandVideo";
PdkEvent.OnMediaLoadStart="OnMediaLoadStart";
PdkEvent.OnMediaPlay="OnMediaPlay";
PdkEvent.OnMediaClick="OnMediaClick";
PdkEvent.OnMediaRollOver="OnMediaRollOver";
PdkEvent.OnMediaRollOut="OnMediaRollOut";
PdkEvent.OnMediaBuffer="OnMediaBuffer";
PdkEvent.OnMediaEnd="OnMediaEnd";
PdkEvent.OnMediaError="OnMediaError";
PdkEvent.OnMediaComplete="OnMediaComplete";
PdkEvent.OnMediaLoading="OnMediaLoading";
PdkEvent.OnMediaPause="OnMediaPause";
PdkEvent.OnMediaTime="OnMediaTime";
PdkEvent.OnMediaPlaying="OnMediaPlaying";
PdkEvent.OnMediaStart="OnMediaStart";
PdkEvent.OnMediaUnpause="OnMediaUnpause";
PdkEvent.OnReleaseEnd="OnReleaseEnd";
PdkEvent.OnReleaseStart="OnReleaseStart";
PdkEvent.OnReleaseSelected="OnReleaseSelected";
PdkEvent.OnSetCurrentReleaseList="OnSetCurrentReleaseList";
PdkEvent.OnVersionError="OnVersionError";
PdkEvent.OnMediaSeek="OnMediaSeek";
PdkEvent.OnMute="OnMute";
PdkEvent.OnSetVolume="OnSetVolume";
PdkEvent.OnSetRelease="OnSetRelease";
PdkEvent.OnSetReleaseUrl="OnSetReleaseUrl";
PdkEvent.OnFetchReleaseData="OnFetchReleaseData";
PdkEvent.OnLoadRelease="OnLoadRelease";
PdkEvent.OnLoadReleaseUrl="OnLoadReleaseUrl";
PdkEvent.OnSetSmil="OnSetSmil";
PdkEvent.OnLoadSmil="OnLoadSmil";
PdkEvent.OnSetPlayerMessage="OnSetPlayerMessage";
PdkEvent.OnClearPlayerMessage="OnClearPlayerMessage";
PdkEvent.OnShowEmailForm="OnShowEmailForm";
PdkEvent.OnShowFullScreen="OnShowFullScreen";
PdkEvent.OnShowLinkForm="OnShowLinkForm";
PdkEvent.OnUseDefaultEmailForm="OnUseDefaultEmailForm";
PdkEvent.OnUseDefaultLinkForm="OnUseDefaultLinkForm";
PdkEvent.OnUseDefaultPlayOverlay="OnUseDefaultPlayOverlay";
PdkEvent.OnShowPlayOverlay="OnShowPlayOverlay";
PdkEvent.OnShowPreviewImageOverlay="OnShowPreviewImageOverlay";
PdkEvent.OnGetPlayerVariables="OnGetPlayerVariables";
PdkEvent.OnDisablePlayerControls="OnDisablePlayerControls";
PdkEvent.OnShowControls="OnShowControls";
PdkEvent.OnHidePlayerRegions="OnHidePlayerRegions";
PdkEvent.OnStreamSwitched="OnStreamSwitched";
PdkEvent.OnGetBandwidthPreferences="OnGetBandwidthPreferences";
PdkEvent.OnGetSubtitleLanguage="OnGetSubtitleLanguage";
PdkEvent.OnSubtitleCuePoint="OnSubtitleCuePoint";
PdkEvent.OnRefreshCategoryModel="OnRefreshCategoryModel";
PdkEvent.OnRefreshReleaseModel="OnRefreshReleaseModel";
PdkEvent.OnLoadReleaseModel="OnLoadReleaseModel";
PdkEvent.OnSearchComponentsRegistered="OnSearchComponentsRegistered";
PdkEvent.OnRefreshReleaseModelStarted="OnRefreshReleaseModelStarted";
PdkEvent.OnCategorySelected="OnCategorySelected";
PdkEvent.OnSearch="OnSearch";
PdkEvent.OnClipInfoLoaded="OnClipInfoLoaded";
PdkEvent.OnJavascriptLoaded="OnJavascriptLoaded";
PdkEvent.OnSkinComplete="OnSkinComplete";
PdkEvent.OnComponentSized="OnComponentSized";
PdkEvent.OnImageLoaded="OnImageLoaded";
PdkEvent.OnFontChanged="OnFontChanged";
PdkEvent.OnPost="OnPost";
PdkEvent.OnEmail="OnEmail";
PdkEvent.OnEmbedCopy="OnEmbedCopy";
PdkEvent.OnLinkCopy="OnLinkCopy";
PdkEvent.OnRssCopy="OnRssCopy";
PdkEvent.OnAddRating="OnAddRating";
PdkEvent.OnSignIn="OnSignIn";
PdkEvent.OnSignOut="OnSignOut";
PdkEvent.OnUserProfileLoaded="OnUserProfileLoaded";
PdkEvent.OnAddComment="OnAddComment";
PdkEvent.OnDeleteComment="OnDeleteComment";
PdkEvent.OnAddFavorite="OnAddFavorite";
PdkEvent.OnDeleteFavorite="OnDeleteFavorite";
PdkEvent.OnAddTag="OnAddTag";
PdkEvent.OnDeleteTag="OnDeleteTag";
PlaybackManager=Class.extend({init:function(c,b){this.player=c;
this.controller=b;
var h={fontFamily:"Calibri, Helvetica, Arial",fontColor:"white",textAlign:"left",textAlignVertical:"top"};
var g={fontFamily:"Calibri, Helvetica, Arial",fontColor:"white",fontEdge:"dropshadow",textAlign:"center",textAlignVertical:"bottom"};
var f="tp_subtitles_settings";
this.subtitlesLoader=new $pdk.queue.deferred.loader.Subtitles(this.controller,this.controller.getOverlayArea(),document.getElementById(this.controller.id+".subtitles"),f,20,h,g,true,this.controller.getProperty("enableDynamicSubtitleFonts"));
this.subtitlesSettingsManagerLoader=new $pdk.queue.deferred.loader.SubtitlesSettingsManager(this.controller,f);
var e=this;
b.addEventListener("OnLoadReleaseUrl",function(){e.handleLoadReleaseUrl.apply(e,arguments)
});
this.mediaSeekHandler=function(){e.handleMediaSeek.apply(e,arguments)
};
b.addEventListener("OnMediaSeek",this.mediaSeekHandler);
this.mediaErrorHandler=function(){e.handleMediaError.apply(e,arguments)
};
b.addEventListener("OnMediaError",this.mediaErrorHandler);
this.mediaStartHandler=function(){e.handleMediaStart.apply(e,arguments)
};
b.addEventListener("OnMediaStart",this.mediaStartHandler);
this.releaseSelectedHandler=function(){e.handleReleaseSelected.apply(e,arguments)
};
b.addEventListener("OnReleaseSelected",this.releaseSelectedHandler);
this._metadataUrlManager=new $pdk.plugin.MetadataUrlManager(this.controller);
this.urlManager=new UrlManager(this.controller);
this.errorManager=new ErrorManager(this.controller,this.player);
var a=this.controller.getProperty("useNativeControls")=="true";
var d=this.controller.getProperty("useDefaultPlayOverlay")=="true"||this.controller.getProperty("showControlsBeforeVideo")=="false";
if(d||a){setTimeout(function(){e.controlsLoaded=true;
e.player.controlsLoaded(false,a)
},1)
}if(!a){this.controlsLoader=new $pdk.queue.deferred.loader.ControlsLoader(this.controller,document.getElementById(this.controller.id).parentElement.id,function(){e.controlsLoaded=true;
e.player.controlsLoaded(true,false);
if(e.controlsLoadedCallback){e.controlsLoadedCallback()
}},function(k,i){e.controlsLoaded=true;
e.player.controlsLoaded(k,i)
})
}this.releaseUrl=this.player.releaseUrl;
this.useFormats=true;
this.tokenManager=new TokenManager(this.controller);
this.overlayManager=new OverlayManager(this.controller,this.player.container);
if(self.StandbyManager){this.standbyManager=new StandbyManager(this.controller,this)
}this.plugins=new Array();
this.pluginsComplete=false;
b.addEventListener("OnPlugInsComplete",function(){e.pluginsComplete=true
});
b.registerFunction("setRelease",this,this.setRelease);
b.registerFunction("setReleaseURL",this,this.setReleaseURL);
b.registerFunction("doParsePlaylist",this,this.doParsePlaylist);
b.registerFunction("tryWritePlayer",this,this.tryWritePlayer);
b.registerFunction("pause",this,this.pause);
b.registerFunction("endRelease",this,this.endRelease);
b.registerFunction("endCurrentRelease",this,this.endRelease);
b.registerFunction("clearCurrentRelease",this,this.clearCurrentRelease);
b.registerFunction("resetRelease",this,this.resetRelease);
b.registerFunction("getCurrentRelease",this,this.getCurrentRelease);
b.registerFunction("injectPlaylist",this,this.injectPlaylist);
b.registerFunction("insertPlaylist",this,this.insertPlaylist);
b.registerFunction("wrapClip",this,this.wrapClip);
b.registerFunction("insertClip",this,this.insertClip);
b.registerFunction(PdkFunctions.mute,this,this.doMute);
b.registerFunction("setVolume",this,this.setVolume);
b.registerFunction("setSmil",this,this.setSmil);
b.registerFunction("updateMediaTime",this,this.updateMediaTime);
b.registerFunction("updateClip",this,this.updateClip);
b.registerFunction("updatePlaylist",this,this.updatePlaylist);
b.registerFunction("endMedia",this,this.endMedia);
b.registerFunction("markOffset",this,this.markOffset);
b.registerFunction("playPlaylist",this,this.playPlaylist);
b.registerFunction("loadReleaseURL",this,this.loadReleaseURL);
b.registerFunction("loadRelease",this,this.loadRelease);
b.registerFunction(PdkFunctions.nextClip,this,this.nextClip);
b.registerFunction(PdkFunctions.previousClip,this,this.previousClip);
var e=this;
b.registerFunction("initializePlayback",this,this.initializePlayback);
this.adManager=new AdManager(b);
this.clipWrapperManager=new ClipWrapperManager(b);
this.fullScreenManager=new FullScreenManager(b,this)
},handleReleaseSelected:function(a){if(a.originator.controlId!=this.controller.componentId){this.currentReleaseList=a.originator.controlId
}this.tryingToAdvance=false
},initializePlayback:function(){this.pluginsComplete=true;
if(this.waitReleaseCall){if(this.waitReleaseCall.url){this.setReleaseURL(this.waitReleaseCall.url,this.waitReleaseCall.replaceDefault)
}else{if(this.waitReleaseCall.release){this.setRelease(this.waitReleaseCall.release,this.waitReleaseCall.replaceDefault)
}}this.waitReleaseCall=null
}else{if(this.waitSmil){this.setSmil(this.waitSmil);
this.waitSmil=null
}}},handleMediaStart:function(b){var a=b.data;
a.offset=0;
this.clipStarted=true;
this.updateClip(a)
},handleLoadReleaseUrl:function(a){this.tryingToAdvance=false;
if(this.releaseProcess&&this.playlist){this.endRelease();
this.destroyReleaseProcess(this.releaseProcess);
this.releaseProcess=undefined;
this.playlist=undefined
}if(!this.currentRelease||this.currentRelease.pid!=a.data.pid){this.currentRelease=this.convertRawRelease(a.data)
}else{this.appendRawDataToRelease(this.currentRelease,a.data)
}if((tpIsIOS()||tpIsAndroid())&&this.isPrefetch()){release.url=this.releaseUrl;
this.setRelease(release)
}},convertRawRelease:function(a){if(a.pubDate){a.airdate=new Date(a.pubDate)
}return a
},appendRawDataToRelease:function(a,b){if(b.captions){a.captions=b.captions
}if(b.categories){a.categories=b.categories
}if(b.chapters){a.chapters=b.chapters
}if(b.copyright){a.copyright=b.copyright
}if(b.provider){a.provider=b.provider
}},isPrefetch:function(){return this.controller.isPrefetch()
},setCurrentReleaseUrl:function(a){if(!this.releaseUrl||this.releaseUrl.indexOf(a)!=0){this.useFormats=true
}this.releaseUrl=a
},getCurrentRelease:function(){return this.currentRelease
},getChapterFromOffset:function(b,d){if(d<=b.aggregateLength){for(var a=0;
a<b.chapters.length;
a++){var e=b.chapters[a];
if(e.aggregateStartTime+e.length>=d){e.offset=d-e.aggregateStartTime;
return e
}}}if(b.chapters.length==1){return b.chapters[0]
}return null
},markOffset:function(e,a,b){if(b===undefined){b=true
}var c=this.getChapterFromOffset(e.chapters,a);
var d;
if(!c||c.contentIndex==e.currentIndex){}else{e.currentIndex=c.contentIndex
}d=e.clips[e.currentIndex];
if(c){d.offset=c.offset;
if(c.adIndex>=0&&b){e.currentIndex=c.adIndex
}}else{if(a<d.length){d.offset=a
}else{d.offset=d.length
}}},playCurrentRelease:function(){if(this.playlist&&this.playlist.releaseURL==this.releaseUrl){this.playlist.currentClipIndex=-1;
this.clipEnded=false;
this.player.videoEngine.play();
this.controller.dispatchEvent("OnReleaseStart",this.playlist);
this.releaseProcess.setPlaylist(this.playlist)
}else{if(this.playlist&&this.playlist.isAd===true&&this.isPrefetch()&&(tpIsIOS()||tpIsAndroid())){tpDebug("playCurrentRelease.isAd");
this.nextClip();
this.clipEnded=false
}else{if(this.releaseUrl){if(!this.clipEnded){this.videoEngine.unload()
}this.currentClip=undefined;
this.playlist=undefined;
this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:this.releaseUrl,userInitiated:true});
if(this.useFormats){this.setReleaseURL(this.releaseUrl)
}else{this.setRelease({url:this.releaseUrl})
}}else{tpDebug("ERROR: No release to play!","PlaybackManager",tpConsts.ERROR)
}}}},setRelease:function(a,b){if(!this.pluginsComplete){this.waitReleaseCall={url:null,release:a,replaceDefault:b};
return
}var d=this;
if(this.isNoSkipPlaying()||this.defaultBlocksPlayback(b)){return
}if(this.currentClip&&!this.clipEnded){this.controller.dispatchEvent("OnMediaEnd",this.currentClip)
}var c={};
$pdk.apply(c,a);
this.currentRelease=c;
d.currentRelease.url=c.url;
this.tryingToAdvance=false;
d.controller.callFunction("setReleaseGwt",[c]);
return
},setReleaseURL:function(b,a){if(!this.pluginsComplete){this.waitReleaseCall={url:b,release:null,replaceDefault:a};
return
}if(this.isNoSkipPlaying()||this.defaultBlocksPlayback(a)){return
}this.currentRelease=null;
this.tryingToAdvance=false;
this.controller.callFunction("setReleaseURLGwt",[b]);
return
},loadReleaseURL:function(b,a){if(!b){tpDebug("This release has no URL","LoadReleaseManager",tpConsts.ERROR);
return
}if(a===false){var c=this.controller.getProperty("releaseUrl");
if(c!==undefined){return
}}this.currentRelease=null;
this.controller.callFunction("loadReleaseUrlGwt",[b])
},loadRelease:function(a,b){var c=a.url;
if(!c){tpDebug("This release has no URL","LoadReleaseManager",tpConsts.ERROR);
return
}if(b===false){var d=this.controller.getProperty("releaseUrl");
if(d!==undefined){return
}}this.currentRelease=a;
this.controller.callFunction("loadReleaseGwt",[c])
},tryWritePlayer:function(){if((tpIsIOS()||tpIsAndroid())){tpDebug("doSetReleaseUrl: calling writePlayer()");
this.controller.writePlayer("",true)
}},isNoSkipPlaying:function(){return this.currentClip&&this.currentClip.baseClip&&this.currentClip.baseClip.noSkip
},defaultBlocksPlayback:function(a){if(a===false&&this.player.releaseUrl){return true
}return false
},qs:function(a){return a.indexOf("?")>=0?"&":"?"
},dispatchReleaseError:function(b,a){tpDebug("Error loading SMIL XML");
this.controller.dispatchEvent("OnReleaseError",a)
},setSmil:function(a){if(!this.player.iOSEnabled){if(this.pluginsComplete===false){var b=this;
this.waitSmil=a;
setTimeout(function(){if(b.pluginsComplete){return
}b.pluginsComplete=true;
b.setSmil(a)
},2000);
return
}}if((this.currentClip&&this.currentClip.baseClip&&this.currentClip.baseClip.noSkip)||this.pluginsComplete===false){return
}if(this.playlist){this.endRelease()
}this.doParseSelector(a)
},pause:function(a){if(this.video){if(a){this.doPauseVideo()
}else{this.doUnPauseVideo()
}}},doPauseVideo:function(){if(this.currentClip&&this.currentClip.streamType==="empty"){if(!this.isNoopClip(this.currentClip)){this.controller.getVideoProxy().pause()
}this.controller.dispatchEvent(PlayerEvent.OnPlayerPause)
}else{if(this.videoEngine.isPaused()==false){this.videoEngine.pause();
this.controller.dispatchEvent(PlayerEvent.OnPlayerPause)
}}},doUnPauseVideo:function(){this.play();
this.controller.dispatchEvent(PlayerEvent.OnPlayerUnPause);
if(this.clipStarted){this.player.onPlay()
}},play:function(){if(this.isNoopClip(this.currentClip)){return
}if(this.currentClip&&this.currentClip.streamType==="empty"){this.controller.getVideoProxy().play()
}else{tpDebug("PBM calling play!");
this.videoEngine.play()
}},setVolume:function(a){this.videoEngine.setVolume(a/100);
this.controller.dispatchEvent("OnVolumeChange",a);
this._oldVolume=a
},doMute:function(a){if(this._isMuted==undefined){this._isMuted=false
}if(a!=this._isMuted){this._isMuted=a;
this.videoEngine.mute(this._isMuted);
if(this._isMuted){this._oldVolume=this.videoEngine.getVolume();
this.videoEngine.setVolume(0)
}else{if(this._oldVolume){if(this._oldVolume>=0){this.videoEngine.setVolume(this._oldVolume)
}this.oldVolume=undefined
}}this.controller.dispatchEvent(PdkEvent.OnMute,this._isMuted)
}},selector:function(a){this.doParseSelector(a)
},stripM3U:function(d){var a=0;
var e=0;
var c;
var b=false;
for(;
a<d.clips.length;
a++){if(!d.clips[a].isAd&&d.baseClips[a].URL.indexOf("m3u")!=-1){if(!b){b=true;
e=a;
c=d.baseClips[a].URL;
d.clips[a].endTime=d.clips[a].mediaLength;
d.chapters.chapters=[d.chapters.chapters[0]];
d.chapters.chapters[0].length=d.clips[0].mediaLength
}else{if(d.baseClips[a].URL==c){d.baseClips.splice(a,1);
d.clips.splice(a,1);
a--
}}}else{if(b&&d.baseClips[a].URL!=c&&a>0&&a<(d.clips.length-1)){d.baseClips.splice(a,1);
d.clips.splice(a,1);
a--
}else{if(b){d.clips[a].clipIndex=a
}}}}},doParseSelector:function(a,c){var b=this.doParsePlaylist(a,c);
this.playPlaylist(b)
},doParsePlaylist:function(a,d){tpDebug("selector: parsing smil");
if(d){this.releaseUrl=d
}var c=com.theplatform.pdk.SelectorExported.getInstance(this.controller.scopes.toString());
var b=c.parsePlaylist(a,this.releaseUrl);
return b
},playPlaylist:function(b){if(this.releaseProcess){this.controller.dispatchEvent("OnReleaseEnd",this.playlist);
this.destroyReleaseProcess(this.releaseProcess);
this.releaseProcess=undefined;
var a=this;
setTimeout(function(){a.playPlaylist(b)
},1);
return
}if(!b||b.isError){this.dispatchReleaseError(null,this.releaseUrl);
return
}if(tpIsAndroid()){this.stripM3U(b)
}this.releaseProcess=this.createReleaseProcess();
this.playlist=b;
if(!(this.isPrefetch()&&(tpIsIOS()||tpIsAndroid()))){tpDebug("selector: playing current release");
if(this.currentRelease){b.release=this.currentRelease
}else{b.release=this.getReleaseFromPlaylist(b)
}this.controller.dispatchEvent("OnReleaseStart",b);
this.releaseProcess.setPlaylist(b)
}else{this.player.videoEngine.pause();
this.player.videoEngine.load(this.playlist.baseClips[0].URL,0);
this.player.currentURL=this.playlist.baseClips[0].URL
}},getReleaseFromPlaylist:function(f){if(f.release){return f.release
}var b;
var c=0;
var a=f.baseClips.length;
var e;
var d;
for(;
c<a;
c++){if(!f.baseClips[c].isAd){e=f.baseClips[c];
d=f.clips[c];
break
}}if(!e){return undefined
}b={globalDataType:"com.theplatform.pdk.data::Release",title:f.title?f.title:e.title,author:e.author,duration:e.releaseLength,length:e.releaseLength,bitrate:e.bitrate,description:e.description,categories:e.categories,copyright:e.copyright,countries:[f.countryCode],keywords:e.keywords,link:e.moreInfo,pid:f.releasePID,provider:e.provider,ratings:e.ratings,text:e.description,chapters:d.chapter?d.chapter.chapters:[],url:f.releaseURL};
return b
},createReleaseProcess:function(){var a=com.theplatform.pdk.ReleaseProcessExported.getReleaseProcess(this.controller.id,this.controller.scopes.toString());
a.addEventListener("OnClipFromPlaylist",this,this.clipFromPlaylist);
return a
},destroyReleaseProcess:function(a){if(a){a.removeEventListener("OnClipFromPlaylist",this.clipFromPlaylist);
a.destroy()
}},clipFromPlaylist:function(c){var b=c.data;
if(!b){if(!this.clipEnded&&this.currentClip){this.doEndMedia(this.currentClip)
}this.endRelease();
this.playlist=undefined;
if(true||!this.standbyManager.checkIfEndCardExists()){var a=this.currentReleaseList?[this.currentReleaseList]:null;
if(!this.wantPrevious){this.advanceToNextRelease(false,true,a)
}else{this.wantPrevious=false;
this.controller.playPrevious(false,a)
}}}else{if(this.currentClip&&!this.currentClip.baseClip.isAd){this.currentClip.offset=0;
this.releaseProcess.updateClip(this.currentClip)
}this.wantPrevious=false;
tpDebug("release process is telling us to play clip with clipIndex "+b.clipIndex+" and src:"+b.URL);
this.processClip(b)
}},advanceToNextRelease:function(c,a,b){this.tryingToAdvance=true;
this.controller.playNext(c,a,b);
var d=this;
setTimeout(function(){if(d.tryingToAdvance){d.tryingToAdvance=false;
d.controller.loadReleaseURL(d.releaseUrl)
}},300)
},endRelease:function(){if(!this.player.videoEngine.isPaused()){this.player.videoEngine.pause(true)
}if(tpIsAndroidLegacy()){this.controller.showFullScreen(false)
}this.controller.dispatchEvent("OnReleaseEnd",this.playlist);
this.releaseProcess=undefined;
this.currentClip=null
},clearCurrentRelease:function(){if(this.releaseProcess){this.destroyReleaseProcess(this.releaseProcess)
}this.endRelease();
this.controller.dispatchEvent("OnClearCurrentRelease")
},resetRelease:function(){var a=this.player.resetVideoElement();
this.video=a.video;
this.videoEngine=a.videoEngine;
this.endRelease()
},handleMediaError:function(a){var b=a.data;
this.wasError=true;
if(b&&b.endRelease){this.endRelease();
this.advanceToNextRelease(false,true)
}else{if(this.releaseProcess){this.releaseProcess.nextClip()
}}},handleMediaSeek:function(d){var c=d.data;
tpDebug("Got OnMediaSeek");
if(!this.currentClip){tpDebug("PBM ignoring seek");
return
}var a=c.end.mediaTime;
tpDebug("Seek time is:"+a);
if(a>=this.currentClip.endTime||a<(this.currentClip.startTime-500)){tpDebug("Telling releaseProcess to seek to "+c.end.currentTimeAggregate);
if(this.releaseProcess.seekToPosition(c.end.currentTimeAggregate)){tpDebug("ReleaseProcess is providing a new clip")
}else{tpDebug("releaseProcess.seekToPosition returned false");
tpDebug("Endtime is "+this.currentClip.endTime+" duration is "+this.currentClip.duration);
if(this.currentClip.duration>1){this.endMedia()
}else{tpDebug("Continuing to play because we don't know the duration")
}}}else{if(a<=this.currentClip.startTime&&Math.abs(this.videoEngine.getCurrentTime()-this.currentClip.startTime)>300){var b=this;
tpDebug("targetTime is "+a+", need to seek to "+this.currentClip.startTime);
setTimeout(function(){b.controller.seekToPosition(b.currentClip.startTime)
},1)
}else{tpDebug("seekObj was within clip boundaries: "+this.currentClip.startTime+"<"+c.end.mediaTime+"<"+this.currentClip.endTime)
}}},nextClip:function(){if(this.releaseProcess){tpDebug("PBM calling releaseProcess.nextClip");
this.releaseProcess.nextClip()
}else{this.advanceToNextRelease(false,false)
}},previousClip:function(){this.wantPrevious=true;
if(this.releaseProcess){tpDebug("PBM calling releaseProcess.nextClip");
this.releaseProcess.previousClip()
}else{this.controller.playPrevious(false)
}},processClip:function(g,a){var c=this.adManager.isAd(g);
var h=false;
if(c){if(!this.adManager.validateAd(g)){this.nextClip();
return
}h=this.adManager.checkAd(g);
g.hasPlayed=true;
this.updateClip(g);
this.lastAdClip=g;
tpDebug("CheckAd returns "+h)
}var d=false;
if(this.currentClip){d=g.clipIndex<this.currentClip.clipIndex
}this.currentClip=g;
if(!h){var b=false;
if(!d){b=this.clipWrapperManager.processClip(g)
}var e=false;
var f=this;
e=this.urlManager.checkClip(g,function(i){if(g.id===i.id){if(!b&&a!==true){tpDebug("processClip.!wrapped: "+g.URL);
f.urlRewritten(i)
}}});
g.wasProcessed=true
}},urlRewritten:function(a){this.updateClip(a);
if(a.baseClip.type!=="application/vast+xml"&&a.baseClip.type!=="text/plain"){if(a.baseClip.isAd){this.lastAdClip=a
}this.clipStarted=false;
tpDebug("urlreWrtten for clip with URL:"+a.URL);
this.player.doMediaLoadStart(a);
this.releaseProcess.updateClip(a)
}else{this.endMedia(a)
}},insertPlaylist:function(a){if(this.releaseProcess){this.releaseProcess.insertPlaylist(a)
}},insertClip:function(a){if(this.releaseProcess){this.releaseProcess.insertClip(a)
}},injectPlaylist:function(b){if(this.releaseProcess){var a=this.currentClip.currentMediaTime==0&&this.currentClip.startTime>0?this.currentClip.startTime:this.currentClip.currentMediaTime;
this.releaseProcess.injectPlaylist(b,a)
}},updateMediaTime:function(a){if(this.releaseProcess){this.releaseProcess.updateMediaTime(a)
}},updateClip:function(a){if(this.releaseProcess){this.releaseProcess.updateClip(a)
}},updatePlaylist:function(a){if(this.releaseProcess){this.releaseProcess.updatePlaylist(a)
}},endMedia:function(b,c){if(!b){b=this.currentClip
}b.offset=0;
this.releaseProcess.updateClip(b);
if(b&&b.mediaLength-1000<=b.currentMediaTime){var a=b
}this.doEndMedia(b);
if(a){this.controller.dispatchEvent("OnMediaComplete",a)
}if(this.releaseProcess&&!c){tpDebug("Media ended, PBM calling nextClip()");
this.releaseProcess.nextClip()
}},doEndMedia:function(a){this.currentClip=null;
if(!this.wasError){tpDebug("doEndMedia dispatching OnMediaEnd for clip:"+a.baseClip.URL);
this.controller.dispatchEvent("OnMediaEnd",a)
}this.wasError=false
},wrapClip:function(b,a){this.releaseProcess.wrapClip(b,a)
},executeCurrentRelease:function(){},isNoopClip:function(a){if(!a){return false
}return(a.URL==""&&a.baseClip.isAd&&a.streamType=="empty")
}});
tpPlayer=PDKComponent.extend({_generateExportedMarkup:function(){var a="";
a+='<div id="'+this.id+'" >';
a+='  <div id="'+this.id+'.player" ></div>';
a+='  <div id="'+this.id+'.controlBlocker" ></div>';
a+='  <div id="'+this.id+'.blocker" ></div>';
a+='  <div id="'+this.id+'.plugins" ></div>';
a+='  <div id="'+this.id+'.subtitles" class="tpSubtitles" style="pointer-events:none" ></div>';
a+='  <div id="'+this.id+'.cards" style="pointer-events:none;z-index:802;-webkit-touch-callout: text;-webkit-user-select: text;-khtml-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;left:0px;top:0px" ></div>';
a+="</div>";
a+='  <div id="'+this.id+'.overlays" style="z-index:801;top:0px;left:0px;pointer-events:none;position:absolute" ></div>';
a+='  <div id="'+this.id+'.controls" style="z-index:800;top:0px;left:0px;pointer-events:none;position:absolute" ></div>';
return a
},init:function(f,b,a,d,e){var c=this;
this.id=f;
this._resizeTimout=0;
this._tryResizeAttempts=0;
this.pluginsComplete=false;
this.videoEngine=e;
if(d===undefined){d=f
}this.widgetId=d;
this.controller=new PlayerController(f,this);
this.unloaded=true;
this.controller.addEventListener("OnMediaAreaChanged",function(){c.handleOnMediaAreaChanged.apply(c,arguments)
})
},setProperty:function(a,b){if(this.controller){this.controller.setProperty(a,b)
}},getProperty:function(a){if(this.controller){return this.controller.getProperty(a)
}else{return null
}},attach:function(a){this.initialize();
this.video=document.getElementById(a);
this.ready()
},setSeekHandler:function(){if(this.seekHandler){this.seekHandler.destroy()
}this.seekHandler=new SeekHandler(this.videoEngine);
var a=this;
this.userSeekedListener=function(b){a.userSeeked(b)
};
this.seekErrorListener=function(b){a.seekFailed(b)
};
this.seekHandler.addEventListener(SeekEvents.USERSEEKED,this.userSeekedListener);
this.seekHandler.addEventListener(SeekEvents.SEEKFAILED,this.seekErrorListener)
},seekFailed:function(a){this.onError(a)
},userSeeked:function(a){if(this.currentClip.baseClip.noSkip&&!tpIsIOS()){this.seekHandler.doSeek(this.currentClip.startTime/1000)
}else{if(this.currentClip.baseClip.noSkip&&tpIsIOS()){}else{tpDebug("got userSeeked: showing controls");
this.showControls(true);
this.onSeeked()
}}},progSeeked:function(a){tpDebug("progSeeked fired");
this.onSeeked()
},resetVideoElement:function(){var a=document.createElement("div");
a.setAttribute("id",this.video.getAttribute("id"));
a.setAttribute("class",this.video.getAttribute("class"));
a.setAttribute("style",this.video.getAttribute("style"));
a.setAttribute("x-webkit-airplay","allow");
this.video.parentNode.replaceChild(a,this.video);
this.video=a;
this.videoEngine.setParentElement(this.video);
if(this.videoengineruntime&&this.videoengineruntime.toLowerCase()==="flash"){this.videoEngine.setRuntime("FLASH")
}else{this.videoEngine.setRuntime("HTML5")
}this.startedPlaying=false;
this.currentClip=undefined;
this.attachListeners();
return{video:this.video,videoEngine:this.videoEngine}
},createContainer:function(c){var e=this.framecolor?this.framecolor:"#000000";
var b=this.backgroundcolor?this.backgroundcolor:"#ffffff";
this.bdcolor=e.replace("0x","#");
this.bgcolor=b.replace("0x","#");
var a="";
a+="<div class='tpBackground' style=\"background-color: "+this.bgcolor+"; border-color: "+this.bdcolor+'"></div>';
a+='<div id="'+this.id+'" >';
a+='  <div id="'+this.id+'.player" ></div>';
a+='  <div id="'+this.id+'.controlBlocker" ></div>';
a+='  <div id="'+this.id+'.blocker" ></div>';
a+='  <div id="'+this.id+'.plugins" ></div>';
a+='  <div id="'+this.id+'.subtitles" class="tpSubtitles" style="pointer-events:none" ></div>';
a+='  <div id="'+this.id+'.cards" style="pointer-events:none;z-index:802;-webkit-touch-callout: text;-webkit-user-select: text;-khtml-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;" ></div>';
a+='  <div id="'+this.id+'.overlays" style="z-index:801;top:0px;left:0px;pointer-events:none;position:absolute" ></div>';
a+='  <div id="'+this.id+'.controls" style="z-index:800;top:0px;left:0px;pointer-events:none;position:absolute" ></div>';
a+="</div>";
if(c){c.innerHTML=a
}else{document.write(a)
}this.container=document.getElementById(this.id);
this.pluginLayer=document.getElementById(this.id+".plugins");
this.player=document.getElementById(this.id+".player");
this.controlBlocker=document.getElementById(this.id+".controlBlocker");
var f=this;
var h=function(k){if(!f.clipStarted){return false
}var i=f.videoClicked(k);
if(i){if(!k){var k=window.event
}k.cancelBubble=true;
if(k.stopPropagation){k.stopPropagation()
}if(k.preventDefault){k.preventDefault()
}}return false
};
if($pdk.isIE){this.player.onclick=h
}else{anchor=document.createElement("a");
anchor.style.width="100%";
anchor.style.height="100%";
anchor.style.background="transparent";
anchor.style.display="block";
anchor.style.cursor="default";
anchor.href="#";
anchor.onclick=h;
this.controlBlocker.appendChild(anchor)
}this.blocker=document.getElementById(this.id+".blocker");
var d=this.backgroundcolor;
if(d){idx=d.indexOf("0x");
if(idx!==-1){d=d.substring(idx+2);
d="#"+d
}this.blocker.style.backgroundColor=d
}else{this.blocker.style.backgroundColor="black"
}this.blocker.style.position="absolute";
this.blocker.top=0;
this.blocker.left=0;
this.blocker.style.display="";
this.blocker.style.overflow="hidden";
this.blocker.style.height="100%";
this.blocker.style.width="100%";
this.blocker.style.display="none";
this.controlsLayer=document.getElementById(this.id+".controls");
this.controlsLayer.className="controlsLayer";
this.controlsLayer.style.backgroundColor="transparent";
this.controlsLayer.style.cssFloat="left";
this.controlsLayer.style["float"]="left";
this.controlsLayer.style.left="0px";
this.controlsLayer.style.top="0px";
this.controlBlocker.style.position="absolute";
this.controlBlocker.style.display="none";
this.blocker.top=0;
this.blocker.left=0;
this.controlBlocker.style.backgroundColor="transparent";
this.controlBlocker.style.height="100%";
this.controlBlocker.style.width="100%";
this.controlBlocker.style.overflow="hidden";
this.player.style.width="100%";
this.player.style.height="100%";
this.player.style.position="absolute";
this.player.style.overflow="hidden";
this.pluginLayer.style.width="100%";
this.pluginLayer.style.position="absolute";
this.controlsLayer.style.width="100%";
this.controlsLayer.style.height="100%";
this.container.className="player";
if($pdk._phase1Controllers===null||typeof($pdk._phase1Controllers)!=="object"){$pdk._phase1Controllers={}
}var g=document.getElementById(this.controller.id).parentElement.id;
this.controller.componentId=g;
$pdk._phase1Controllers[g]=this.controller;
return c
},isStandbyMode:function(){return this.standbyMode||(tpIsAndroid&&!tpIsChrome())
},isPrefetch:function(){return !this.standbyMode&&(tpIsIOS()||tpIsAndroid())
},isFlashPlayer:function(){return false
},writePlayer:function(b,a){if(b===""&&a&&this.iOSEnabled){return
}var g=b;
if(!a){tpDebug("writePlayer calling pause()");
this.videoEngine.pause(true);
tpDebug("writing player src="+b+"&format=redirect");
tpDebug("writePlayer original url:"+b);
var e=g.indexOf("format=");
tpDebug("formatIndex="+e);
if(e>=0){tpDebug("found a format in original");
var c=g.substring(e+7,g.length);
var f="format=";
var d=c.indexOf("&");
if(d>=0){tpDebug("found & at index:"+d);
c=c.substring(0,d)
}f=f+c;
tpDebug("target="+f);
g=g.replace(f,"format=redirect")
}else{if(g.indexOf("?")>=0){g=g+"&format=redirect"
}else{g=g+"?format=redirect"
}}}tpDebug("writePlayer newUrl:"+g);
this.ignoreErrors=g==="";
this.videoEngine.load(g,0);
if(!this.iOSEnabled){this.iOSEnabled=true
}},createVideo:function(){if(this.video){this.destroyVideo()
}this.video=document.createElement("div");
this._hideNativeControls=this.controller.getProperty("overrideNativeControls")=="true"||(this.controller.getProperty("skinUrl")!=null&&this.controller.getProperty("skinUrl").indexOf(".swf")==-1);
this._useDefaultPlayOverlay=this.controller.getProperty("useDefaultPlayOverlay");
if(this._useDefaultPlayOverlay===undefined){this._useDefaultPlayOverlay=false;
this.controller.setProperty("useDefaultPlayOverlay",this._useDefaultPlayOverlay.toString())
}else{this._useDefaultPlayOverlay=this._useDefaultPlayOverlay=="true"
}this._showControlsBeforeVideo=this.controller.getProperty("showControlsBeforeVideo");
if(this._showControlsBeforeVideo===undefined){this._showControlsBeforeVideo=true;
this.controller.setProperty("showControlsBeforeVideo",this._showControlsBeforeVideo.toString())
}else{this._showControlsBeforeVideo=this._showControlsBeforeVideo=="true"
}this.video.id=this.id+".content";
this.video.style.width="100%";
this.video.style.height="100%";
if(this.backgroundcolor){this.video.style.backgroundColor="#"+this.backgroundcolor.substr(2)
}this.player.appendChild(this.video);
this.videoLayer=this.controller.getProperty("videoLayer");
if(!this.videoLayer){this.videoLayer="test-context"
}this.videoEngine.setParentElement(this.video);
if(tpIsAndroid()){tpDebug("showing controls");
this.showControls(true)
}if(this._hideNativeControls){this.showControls(false)
}},getVideoProxy:function(){return new $pdk.connection.VideoProxy(this.videoEngine)
},loadLayer:function(c,e,b,d,a){if(this.videoEngine){return this.videoEngine.loadLayer(c,e,b)
}else{tpDebug("Trying to call loadLayer without a VideoEngine")
}},callLayerFunction:function(c,b,a){if(this.videoEngine){return this.videoEngine.callLayerFunction(c,b,a)
}else{tpDebug("Trying to call callLayerFunction without a VideoEngine")
}},destroyVideo:function(){if(this.video){this.videoEngine.unload();
this.player.removeChild(this.video);
this.video=null
}},videoClicked:function(g){if(this.currentClip&&this.currentClip.baseClip.moreInfo){if(this.currentClip.baseClip.moreInfo.href){window.open(this.currentClip.baseClip.moreInfo.href,"_blank");
this.controller.pause(true);
this.paused=true
}var f=$(this.container).parent().offset();
var d=g.pageX-f.left;
var c=g.pageY-f.top;
this.controller.dispatchEvent("OnMediaClick",{ctrlKey:g.ctrlKey,shiftKey:g.shiftKey,localX:d,localY:c,stageX:g.pageX,stageY:g.pageY,position:this.currentClip.currentMediaTime});
var h=this.currentClip.baseClip.moreInfo.clickTrackingUrls;
if(h){var b=0;
var a=h.length;
for(;
b<a;
b++){this.track(h[b])
}}return true
}return false
},track:function(b){var c=this,a=new Image();
tpDebug("Tracking click: "+b);
a.src=b
},attachListeners:function(){if(!this.listeners){this.listeners=new Object()
}var a=this;
if($pdk.jQuery.isIE){this.video.addEventListener("click",this.listeners.clickHandler=function(c){var b=a.videoClicked(c);
if(b){if(!c){var c=window.event
}c.cancelBubble=true;
if(c.stopPropagation){c.stopPropagation()
}if(c.preventDefault){c.preventDefault()
}return false
}},false)
}this.videoEngine.addEventListener("LAYER_LOADED",this.listeners.layerLoaded=function(b){tpDebug("Video tag dispatched "+b.type+" with "+b.data);
alert("layer loaded: "+b.data)
},false);
this.videoEngine.addEventListener("MEDIA_LOAD_START",this.listeners.loadstart=function(b){tpDebug("Video tag dispatched "+b.type+" with "+b.media.url)
},false);
this.videoEngine.addEventListener("MEDIA_START",this.listeners.start=function(b){tpDebug("Video tag dispatched "+b.type);
a.onMediaStart(b)
},false);
this.videoEngine.addEventListener("MEDIA_SEEKED",this.listeners.seeked=function(b){tpDebug("Video tag dispatched "+b.type);
a.onSeeked(b)
},false);
this.videoEngine.addEventListener("MEDIA_END",this.listeners.ended=function(b){tpDebug("Video tag dispatched "+b.type);
a.onEnded(b)
},false);
this.videoEngine.addEventListener("MEDIA_UNPAUSED",this.listeners.unpause=function(b){tpDebug("Video tag dispatched "+b.type);
a.onPlay(b)
},false);
this.videoEngine.addEventListener("MEDIA_PAUSED",this.listeners.pause=function(b){tpDebug("Video tag dispatched "+b.type);
a.onPause(b)
},false);
this.videoEngine.addEventListener("MUTE",this.listeners.mute=function(b){tpDebug("Video tag dispatched "+b.type);
a.onMuteChange(b)
},false);
this.videoEngine.addEventListener("MEDIA_PLAYING",this.listeners.playing=function(b){},false);
this.videoEngine.addEventListener("MEDIA_LOADING",this.listeners.progress=function(b){tpDebug("Video tag dispatched "+b.type);
a.onProgress(b)
},false);
this.videoEngine.addEventListener("MEDIA_ERROR",this.listeners.error=function(b){tpDebug("Video tag dispatched "+b.type);
a.onError(b)
},false);
this.videoEngine.addEventListener("PLAYBACK_ERROR",this.listeners.playbackerror=function(b){tpDebug("Video tag dispatched "+b.type);
a.onPlaybackError(b)
},false);
this.videoEngine.addEventListener("MEDIA_UNLOADED",this.listeners.unloaded=function(b){tpDebug("Video tag dispatched "+b.type);
a.unloaded=true
},false)
},removeListeners:function(){var a=this;
this.videoEngine.removeEventListener("MEDIA_LOAD_START",this.listeners.loadstart);
this.videoEngine.removeEventListener("MEDIA_START",this.listeners.start);
this.videoEngine.removeEventListener("MEDIA_SEEKED",this.listeners.seeked);
this.videoEngine.removeEventListener("MEDIA_END",this.listeners.ended);
this.videoEngine.removeEventListener("MEDIA_UNPAUSED",this.listeners.unpause);
this.videoEngine.removeEventListener("MEDIA_PAUSED",this.listeners.pause);
this.videoEngine.removeEventListener("MEDIA_ERROR",this.listeners.error);
this.videoEngine.removeEventListener("PLAYBACK_ERROR",this.listeners.playbackerror);
this.videoEngine.removeEventListener("MEDIA_UNLOADED",this.listeners.unloaded);
this.videoEngine.removeEventListener("MEDIA_PLAYING",this.listeners.playing);
this.videoEngine.removeEventListener("MEDIA_LOADING",this.listeners.progress);
this.videoEngine.removeEventListener("MUTE",this.listeners.mute)
},_bindElement:function(a){this.createContainer(a);
this.createVideo();
this.hideVideo();
this.attachListeners();
var b=this;
window.onresize=function(){b.onResize()
};
this.ready()
},write:function(a){this.createContainer(a);
this.createVideo();
this.attachListeners();
var b=this;
window.onresize=function(){b.onResize()
};
this.initialize();
var b=this;
this.ready()
},initialize:function(){if(this.scopes){this.controller.scopes=[this.controller.componentId].concat(this.scopes.split(","))
}else{this.controller.scopes=[this.controller.componentId,"default"]
}this.standbyMode=this.standbymode;
if(this.standbyMode==="true"||tpIsAndroid()){this.controller.setProperty("standbyMode",true);
this.standbyMode=true
}else{if(this.standbyMode==="prefetch"){this.controller.setProperty("standbyMode","prefetch");
this.prefetch=true;
this.standbyMode=false
}else{if(tpIsIOS()||tpIsAndroid()){this.controller.setProperty("standbyMode",true);
this.standbyMode=true
}else{this.controller.setProperty("standbyMode",false);
this.standbyMode=false
}}}var a=this;
this.controller.addEventListener("OnPluginsComplete",function(){a.pluginsComplete=true;
a.controller.removeEventListener("OnPluginsComplete",this)
});
this.playbackManager=new PlaybackManager(this,this.controller);
this.controller.registerFunction("getMediaArea",this,this.getMediaArea);
this.controller.registerFunction("setMediaArea",this,this.setMediaArea);
this.controller.registerFunction("writePlayer",this,this.writePlayer);
this.controller.registerFunction("isPrefetch",this,this.isPrefetch);
this.controller.registerFunction("isStandbyMode",this,this.isStandbyMode);
this.controller.registerFunction("isFlashPlayer",this,this.isFlashPlayer);
this.controller.registerFunction("supportsFullScreen",this,this.supportsFullScreen);
this.controller.registerFunction("supportsSeek",this,this.supportsSeek);
this.controller.registerFunction("supportsMute",this,this.supportsMute);
this.controller.registerFunction("supportsVolume",this,this.supportsVolume);
this.controller.registerFunction(PdkFunctions.getVideoProxy,this,this.getVideoProxy);
this.controller.registerFunction("loadLayer",this,this.loadLayer);
this.controller.registerFunction("callLayerFunction",this,this.callLayerFunction)
},ready:function(){this._super();
this.playbackManager.video=this.video;
this.playbackManager.videoEngine=this.videoEngine;
if(this.layout||this.layoutUrl){this.controls=document.createElement("div");
this.controls.className="controlLayoutArea";
this.controls.style.height="40px";
this.controls.style.width="100%";
this.controls.style.background="#555555"
}this.video.style.padding="0";
this.video.style.margin="0";
var a=this.controller.getProperty("endCard");
if(self.CardMediator&&a=="HelloWorldEndCard"){this.cardHolder=new oldCardMediator(a,this.controller)
}if(this.controller.getProperty("overlayImageURL")){var d=this;
setTimeout(function(){d.controller.addPlayerCard("overlays","tpOverlayCard","<div class='tpOverlayCard'><img style='position: absolute; bottom: 5px; right: 5px'/></div>","urn:theplatform:pdk:area:overlay",{},{show:function(e){$pdk.jQuery(e.card).find("img")[0].src=e.player.overlayimageurl
},hide:function(){}});
d.controller.showPlayerCard("overlays","tpOverlayCard")
},1)
}if(this.controller.getProperty("relatedItemsURL")){}this.errorHolder=new ErrorHolder(this.controller);
var d=this;
this.controller.addEventListener("OnPlayerLoaded",function(){d.handlePlayerLoaded.apply(d,arguments)
});
this.controller.addEventListener("OnShowFullScreen",function(){d.onShowFullScreen.apply(d,arguments)
});
this.controller.addEventListener("OnMediaPlaying",function(){d.showVideo();
d.showBlocker(false)
});
this.controller.addEventListener("OnSetRelease",function(){d.handleSetRelease.apply(d,arguments)
});
this.controller.addEventListener("OnReleaseSelected",function(){d.handleSetRelease.apply(d,arguments)
});
this.controller.addEventListener("OnSetReleaseUrl",function(){d.handleSetReleaseUrl.apply(d,arguments)
});
this.controller.addEventListener("OnLoadReleaseUrl",function(){d.handleLoadRelease.apply(d,arguments)
});
this.controller.addEventListener("OnMediaLoadStart",function(){});
this.controller.addEventListener("OnMediaStart",function(){d.showVideo()
});
this.controller.addEventListener("OnReleaseStart",function(){d.handleReleaseStart.apply(d,arguments)
});
this.controller.addEventListener("OnReleaseEnd",function(){d.handleReleaseEnd.apply(d,arguments)
});
this.controller.addEventListener("OnClearCurrentRelease",function(){d.handleClearCurrentRelease.apply(d,arguments)
});
this.controller.addEventListener("OnShowCard",function(){d.onShowCard.apply(d,arguments)
});
this.controller.addEventListener("OnHideCard",function(){d.onHideCard.apply(d,arguments)
});
this.controller.registerFunction("seekToPosition",this,this.seekToPosition);
this.controller.registerFunction("seekToPercentage",this,this.seekToPercentage);
if(this.pluginsComplete===false){var c=d;
var b=function(){if(c.pluginsComplete){return
}c.pluginsComplete=true;
c.controller.removeEventListener("OnPlugInsComplete",b);
c.controller.dispatchEvent("OnPlayerLoaded",[c.id])
};
this.controller.addEventListener("OnPlugInsComplete",b);
return
}else{this.controller.dispatchEvent("OnPlayerLoaded",[this.id])
}},handleShowPlayOverlay:function(a){if(a.data){if(this.videoEngine&&this.videoEngine.isFullScreen()){tpDebug("Exiting fullscreen");
this.controller.showFullScreen(false)
}}},onShowCard:function(a){if(tpIsIPhone()){this.player.style.left="-10000px"
}},onHideCard:function(a){if(tpIsIPhone()){this.player.style.left="0px"
}},handlePlayerLoaded:function(a){if(!this.releaseUrl){return
}if(this.autoPlay&&!(tpIsIOS()||tpIsAndroid())){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:this.releaseUrl,userInitiated:false});
tpDebug("Autoplaying releaseUrl:"+this.releaseUrl);
this.controller.setReleaseURL(this.releaseUrl)
}else{this.hideVideo();
this.controller.loadReleaseURL(this.releaseUrl)
}},onShowFullScreen:function(a){if(a.data){this.container.style.backgroundColor=this.bgcolor
}else{this.container.style.backgroundColor=""
}this.onResize()
},supportsFullScreen:function(){try{var a=this.allowfullscreen==="true"&&(this.videoEngine.isFullScreenSupported()||typeof(this.container.webkitRequestFullScreen)==="function"||typeof(this.container.mozRequestFullScreen)==="function"||typeof(this.container.msRequestFullScreen)==="function");
return a
}catch(b){return false
}},supportsSeek:function(){return this.videoEngine.isSeekSupported()
},supportsMute:function(){return this.videoEngine.isMuteSupported()
},supportsVolume:function(){return this.videoEngine.isSetVolumeSupported()
},seekToPosition:function(a){this.doSeek(a)
},controlsLoaded:function(b,a){if(!b){if(a){this._hideNativeControls=this.controller.getProperty("overrideNativeControls")=="true";
this.videoEngine.setUseNativeControls(!this._hideNativeControls)
}}},doSeek:function(a){if(this.currentClip){var b=this;
this.seekTimeObject=this.createCurrentTimeObject();
if(!this.currentClip.chapter||!this.currentClip.chapter.chapters.isAggregate){this.isSeeking=true;
setTimeout(function(){b.videoEngine.seek(a)
},1)
}else{if(this.currentClip.chapter.aggregateStartTime<a&&this.currentClip.chapter.aggregateStartTime+this.currentClip.length>a){this.isSeeking=true;
var c=this.getClipTime(a);
setTimeout(function(){b.videoEngine.seek(c)
},1)
}else{clearInterval(this.timeUpdateTimer);
this.controller.dispatchEvent("OnMediaEnd",this.currentClip);
if(!this.playbackManager.releaseProcess.seekToPosition(a)){this.videoEngine.end()
}}}}},getClipTime:function(a){var e=this.playlist.chapters.chapters;
var f=0;
var d=a;
for(var b=0;
b<e.length;
b++){var g=e[b];
if(g.aggregateStartTime+g.length>d){f=g.startTime+d;
break
}d-=g.length
}return f
},seekToPercentage:function(b){if(!this.currentClip){return
}b=isNaN(b)?0:b;
b=b<0?0:b;
b=b>100?100:b;
var c=this.videoEngine.getTotalTime();
if(this.currentClip.chapter&&this.currentClip.chapter.chapters){c=this.currentClip.chapter.chapters.aggregateLength
}if(isNaN(c)&&this.currentClip){return this.doSeek(this.currentClip.baseClip.trueLength*(b/100))
}else{if(!isNaN(c)){var a=c*(b/100);
return this.doSeek(a)
}else{this.delaySeekPercentage=b;
return false
}}},handleLoadRelease:function(b){clearTimeout(this.nextClipTimerId);
this.clipEnded=false;
var a=b.data;
this.currentReleaseUrl=a.url;
this.loadPoster(this.currentReleaseUrl);
this.controller.showFullScreen(false);
if(tpIsIOS()){this.hideVideo()
}},handleSetRelease:function(c){if(tpIsAndroid()&&(tpIsChrome()||true)&&!this._androidReady){var b=this;
this._fixAndroidChrome(function(){b.handleSetRelease(c)
})
}var a=c.data;
this.currentReleaseUrl=a.url;
this.loadPoster(this.currentReleaseUrl);
this.releaseSet=true;
clearTimeout(this.nextClipTimerId);
tpDebug("handleSetRelease setting release with url "+a.url)
},handleSetReleaseUrl:function(b){var a=b.data;
tpDebug("handleSetReleaseUrl setting release url to "+a);
clearInterval(this.timeUpdateTimer);
this.currentReleaseUrl=a;
this.loadPoster(this.currentReleaseUrl)
},handleReleaseStart:function(a){this.newRelease=true;
this.currentVideoTime=0;
this.wasPaused=false;
this.percentLoaded=0;
this.playlist=a.data
},doMediaLoadStart:function(d){tpDebug("doMediaLoadStart called for for url "+d.URL);
this.clipEnded=false;
this.startedPlaying=false;
this.percentLoaded=0;
clearTimeout(this.nextClipTimerId);
clearInterval(this.timeUpdateTimer);
this.jumpTime=undefined;
this.needsJump=false;
this.startedBuffer=false;
tpDebug("handleMediaLoadStart fired, newRelease="+this.newRelease);
this.wasPaused=(this.currentClip&&this.currentClip.streamType!="empty"&&!this.currentClip.baseClip.isAd)&&this.paused&&this.newRelease==false;
this.currentClip=d;
if(d.URL.toLowerCase().indexOf("mp3")==-1){this.videoEngine.setPoster("")
}this.removeListeners();
if((this.currentURL!=d.URL||this.newRelease||this.hasError)&&d.streamType!=="empty"){this.isSeeking=false;
tpDebug("Calling pause then unload");
this.suppressPause=true;
var c=this;
var b=d.startTime+d.offset;
var a=function(){c.videoEngine.removeEventListener("MEDIA_UNLOADED",a);
c.hasError=false;
c.ignoreErrors=false;
c.isComplete=false;
c.newRelease=false;
c.attachListeners();
tpDebug("Starting clip #"+d.clipIndex+" with src:"+d.URL+" at offset:"+(b));
setTimeout(function(){if(d.streamType!=="empty"){c.unloaded=false;
c.loading=true;
tpDebug("Doing ve.load() for "+d.URL+" to offset "+b);
c.videoEngine.load(d.URL,b);
c.loading=false;
c.releaseSet=false
}else{c.showBlocker(false)
}if(!c.wasPaused||d.baseClip.noSkip){tpDebug("Calling play again because it was paused");
c.videoEngine.play()
}},1);
c.clipEnded=false;
c.currentURL=d.URL;
if(d.baseClip.noSkip){c.showControls(false)
}else{tpDebug("showing controls");
c.showControls(true)
}setTimeout(function(){tpDebug("Firing OnMediaLoadStart");
c.controller.dispatchEvent("OnMediaLoadStart",d)
},1)
};
this.isComplete=false;
a();
return
}else{if(this.playbackManager.isNoopClip(d)){tpDebug("NoOp case");
this.isSeeking=false;
var c=this;
var a=function(){c.videoEngine.removeEventListener("MEDIA_UNLOADED",a);
if(d.baseClip.noSkip===true){c.showControls(false)
}setTimeout(function(){c.unloaded=false;
tpDebug("Firing OnMediaLoadStart");
c.controller.dispatchEvent("OnMediaLoadStart",d);
c.showBlocker(false)
},1)
};
if(!this.unloaded){tpDebug("Was not unloaded, we need to unload before loading empty clip");
this.videoEngine.addEventListener("MEDIA_UNLOADED",a);
this.videoEngine.unload()
}else{tpDebug("Was unloaded, we don't need to unload before loading empty clip");
a()
}return
}else{if(d.streamType==="empty"){this.isSeeking=false;
var c=this;
var a=function(){c.videoEngine.removeEventListener("MEDIA_UNLOADED",a);
if(d.baseClip.noSkip===true){c.showControls(false)
}setTimeout(function(){c.unloaded=false;
tpDebug("Firing OnMediaLoadStart");
c.controller.dispatchEvent("OnMediaLoadStart",d);
c.showBlocker(false)
},1)
};
if(!this.unloaded){tpDebug("Was not unloaded, we need to unload before loading empty clip");
if(!tpIsAndroidLegacy()){tpDebug("This is not a legacy android so calling ve.play()");
this.videoEngine.play()
}this.videoEngine.addEventListener("MEDIA_UNLOADED",a);
this.videoEngine.unload()
}else{tpDebug("Was unloaded, we don't need to unload before loading empty clip");
a()
}return
}else{this.clipEnded=true;
this.suppressPause=true
}}}this.newRelease=false;
this.attachListeners();
tpDebug("Starting clip #"+d.clipIndex+" with src:"+d.URL+" at offset:"+(d.startTime+d.offset));
if(d.streamType!=="empty"){this.videoEngine.load(d.URL,d.startTime+d.offset)
}else{this.showBlocker(false)
}this.clipEnded=false;
this.currentURL=d.URL;
if(!this.wasPaused&&!this.paused){this.controller.dispatchEvent("OnMediaPlay",this.currentClip);
this.videoEngine.play()
}var c=this;
if(d.baseClip.noSkip){c.showControls(false)
}else{tpDebug("showing controls");
c.showControls(true)
}setTimeout(function(){tpDebug("Firing OnMediaLoadStart");
c.controller.dispatchEvent("OnMediaLoadStart",d)
},1)
},handleReleaseEnd:function(c){var b=c.data;
var a=this;
this.clipEnded=true;
if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}this.videoEngine.unload();
this.showBlocker(true);
var e;
if(b){e=b.releaseURL
}function d(){tpDebug("Exiting fullscreen");
a.controller.showFullScreen(false);
if(e&&e===a.currentReleaseUrl){a.controller.loadReleaseURL(a.currentReleaseUrl)
}}this.nextClipTimerId=setTimeout(function(){d()
},1000);
this.hideVideo();
this.currentClip=null
},handleClearCurrentRelease:function(){clearTimeout(this.nextClipTimerId)
},showControls:function(a){if(tpIsSafari()&&!tpIsIOS()){this.showControlBlocker(!a)
}else{this.showControlBlocker(!a)
}},onResize:function(){var a=this;
if(!this._tryResize()){if(this._resizeTimout<=0&&this._tryResizeAttempts<20){this._resizeTimout=setTimeout(function(){a._resizeTimout=0;
a.onResize()
},100)
}}},_tryResize:function(){if(this.container){if(this._containerWidth!==this.container.offsetWidth||this._containerHeight!==this.container.offsetHeight){this._tryResizeAttempts=0;
this._containerWidth=this.container.offsetWidth;
this._containerHeight=this.container.offsetHeight;
this.controller.dispatchEvent("OnResize",{width:this._containerWidth,height:this._containerHeight});
this.controller.dispatchEvent("OnPlayerComponentAreaChanged",{width:this._containerWidth,height:this._containerHeight});
return true
}}this._tryResizeAttempts++;
return false
},setTimer:function(){tpDebug("Setting timeUpdateTimer");
if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}var a=this;
this.timeUpdateTimer=setInterval(function(){a.onTimeUpdate()
},250)
},onMediaStart:function(a){this.clipStarted=true;
this.showVideo();
if(!this.videoEngine.isPaused()){this.suppressPause=false;
this.videoEngine.play();
this.setTimer()
}else{this.startedPlaying=false;
this.controller.dispatchEvent("OnMediaStart",this.currentClip)
}},onPlay:function(b){if(!this.currentClip||this.currentClip.streamType=="empty"){return
}if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}var a=this;
this.suppressPause=false;
if(this.paused){if(this.currentClip.baseClip.isAd&&tpIsIOS()){this.showControls(false)
}this.paused=false;
if(!this.suppressPause){this.controller.dispatchEvent("OnMediaUnpause",{globalDataType:"com.theplatform.pdk.data::MediaPause",clip:this.currentClip,userInitiated:false})
}else{this.suppressPause=false
}}tpDebug("onPlay calling setTimer");
this.setTimer()
},onPlaying:function(a){if(!this.currentClip){return
}if(this.needsJump){}else{if(this.currentClip&&this.currentClip.baseClip.isAd==false){this.showVideo()
}else{if(this.currentClip&&this.currentClip.streamType=="empty"){this.showVideo()
}}}},onPause:function(a){if(!this.currentClip||(this.currentClip.endTime>0&&Math.abs(this.videoEngine.getCurrentTime()-this.currentClip.endTime)<300)||this.suppressPause){tpDebug("Ignoring native pause event suppressPause:"+this.suppressPause);
if(this.clipStarted&&!this.isSeeking&&this.suppressPause){this.videoEngine.play();
this.suppressPause=false
}return
}this.paused=true;
if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}tpDebug("Dispatching OnMediaPause");
this.controller.dispatchEvent("OnMediaPause",{globalDataType:"com.theplatform.pdk.data::MediaPause",clip:this.currentClip,userInitiated:false});
tpDebug("isAd:"+this.currentClip.baseClip.isAd);
if(this.currentClip.baseClip.isAd&&(tpIsIOS()||tpIsAndroid())){this.controller.dispatchEvent("OnShowPlayOverlay",true)
}},onMuteChange:function(a){this.controller.dispatchEvent("OnMute",a.isMute)
},onVolumeChange:function(a){his.controller.dispatchEvent("OnVolumeChange",a.volume)
},onSeeked:function(c){if(!this.isSeeking&&(!tpIsIPhone()&&tpIsIOS())&&!this.videoEngine.isFullScreen()&&!this.videoEngine.isPaused()){tpDebug("this is a bogus seek, ignoring");
return
}this.isSeeking=false;
if(!this.currentClip||this.currentClip.streamType=="empty"||this.currentClip.baseClip.noSkip){tpDebug("Ignoring seek!");
return
}if(!this.seekTimeObject&&this.currentTimeObject&&this.currentTimeObject.currentTime!=this.videoEngine.getTotalTime()){this.seekTimeObject=this.cloneTimeObject(this.currentTimeObject)
}var b={globalDataType:"com.theplatform.pdk.data::SeekObject"};
b.end=this.createCurrentTimeObject();
if(b.end!=undefined&&this.seekTimeObject!=undefined&&b.end.currentTime!=this.seekTimeObject.currentTime){b.start=this.seekTimeObject
}else{var a=this.previousTime;
var f=b.end.duration;
b.start={globalDataType:"com.theplatform.pdk.data::TimeObject",mediaTime:a,currentTime:a,currentTimeAggregate:a,duration:b.end.duration,durationAggregate:b.end.durationAggregate,percentComplete:(a/f)*100,percentCompleteAggregate:(a/f)*100,isAggregate:false,isLive:false}
}b.clip=this.currentClip;
b.clip.currentMediaTime=b.end.mediaTime;
b.clip.mediaTime=b.end.mediaTime;
this.controller.dispatchEvent("OnMediaSeek",b);
this.seekTimeObject=undefined;
if(!this.paused){this.videoEngine.play()
}},onSeeking:function(a){if(!this.currentClip||this.currentClip.streamType=="empty"){return
}this.seekTimeObject=this.cloneTimeObject(this.currentTimeObject)
},onProgress:function(c){if(!this.currentClip||this.currentClip.streamType=="empty"){return
}if(!this.startedBuffer){this.startedBuffer=true;
this.controller.dispatchEvent("OnMediaBuffering",this.currentClip)
}var b=c.percentLoaded;
var a=b*this.videoEngine.getTotalTime();
if(b>=1){clearInterval(this.progressUpdateTimer)
}this.controller.dispatchEvent("OnMediaLoading",{ratioLoaded:b,isLoadComplete:b>=1,globalDataType:"com.theplatform.pdk.data::LoadMediaData",loadedMilliseconds:-1,bytesLoaded:-1,bytesTotal:-1})
},onEnded:function(b){if(b){tpDebug("MEDIA_END event for "+b.media.url);
if(this.currentClip&&b.media.url!==this.currentClip.URL){tpDebug("This was a stale onEnded event, we'll ignore it");
return
}}if(!this.currentClip||this.currentClip.streamType=="empty"||this.clipEnded===true){return
}if(this.currentClip.baseClip.isAd){this.currentClip.hasPlayed=true;
this.playbackManager.updateClip(this.currentClip)
}tpDebug("onEnded called for for url "+this.currentClip.URL);
tpDebug("Clearing timeUpdateTimer");
if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}this.jumpTime=undefined;
this.needsJump=false;
this.currentVideoTime=undefined;
var a=this.videoEngine.getCurrentTime();
tpDebug("Dispatching OnMediaEnd at "+a+" for src:"+this.currentClip.URL);
if(this.startedPlaying&&!this.clipEnded){tpDebug("Calling endMedia()");
this.endMedia()
}else{tpDebug("Never started Playing or clipEnded is already true");
if(!this.releaseSet&&!this.loading){this.playbackManager.nextClip()
}}this.releaseSet=false
},endMedia:function(){this.clipEnded=true;
this.playbackManager.endMedia(this.currentClip);
if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}},onTimeUpdate:function(f){if(this.currentClip===undefined){return
}if(this.isSeeking){tpDebug("We're still seeking so we'll suppress onTimeUpdate");
return
}if(this.clipEnded){tpDebug("onTimeUpdate fired somehow even though clipEnded is true");
clearInterval(this.timeUpdateTimer);
return
}if(this.currentClip&&!this.startedPlaying){this.startedPlaying=true;
var b=tpGetPid(this.currentReleaseUrl);
this.currentClip.releasePID=b;
this.currentClip.trueLength=Math.floor(this.videoEngine.getTotalTime());
this.currentClip.baseClip.loadTime=0;
if(this.currentClip.baseClip.isAd){this.currentClip.mediaLength=this.currentClip.trueLength;
this.currentClip.length=this.currentClip.trueLength;
this.currentClip.baseClip.trueLength=this.currentClip.trueLength
}this.currentClip.currentMediaTime=this.videoEngine.getCurrentTime();
this.currentClip.mediaTime=this.currentClip.currentMediaTime;
this.previousTime=this.currentClip.currentMediaTime;
tpDebug("Player dispatching OnMediaStart paused="+this.videoEngine.isPaused()+" for clip with index "+this.currentClip.clipIndex+" and url "+this.currentClip.URL);
this.suppressPause=false;
this.startedPlaying=true;
this.controller.dispatchEvent("OnMediaStart",this.currentClip)
}if(this.jumpTime){}else{if(this.delaySeek){if(this.doSeek(this.delaySeek)){this.delaySeek=undefined;
this.delaySeekPercentage=undefined
}}else{if(this.delaySeekPercentage){if(this.seekToPercentage(this.delaySeekPercentage)){this.delaySeekPercentage=undefined
}}else{if(this.currentVideoTime&&Math.abs(this.currentVideoTime-(this.videoEngine.getCurrentTime()))<250){}else{if(!this.clipEnded){var a=true;
if(this.currentClip&&!this.currentClip.isAd){a=false
}if(!this.videoEngine.isPaused()){this.showBlocker(false)
}else{if(this.blockerShowing===true){this.showBlocker(false)
}}if(this.videoEngine.getCurrentTime()===0&&this.currentClip&&this.currentClip.currentMediaTime>0&&Math.abs(this.currentClip.currentMediaTime-this.currentClip.endTime)<1000){this.onEnded();
return
}else{if(this.videoEngine.getCurrentTime()===0){return
}}this.currentTimeObject=this.createCurrentTimeObject();
if(this.currentClip){this.currentClip.currentMediaTime=Math.floor(this.videoEngine.getCurrentTime());
this.currentClip.mediaTime=this.currentClip.currentMediaTime;
this.currentClip.mediaLength=!isNaN(this.videoEngine.getTotalTime())?Math.round(this.videoEngine.getTotalTime()):this.currentClip.mediaLength;
if(!this.currentClip.chapter||!this.currentClip.chapter.chapters.isAggregate){this.currentClip.endTime=!isNaN(this.videoEngine.getTotalTime())?Math.round(this.videoEngine.getTotalTime()):this.currentClip.mediaLength;
this.currentClip.mediaLength=!isNaN(this.videoEngine.getTotalTime())?Math.round(this.videoEngine.getTotalTime()):this.currentClip.mediaLength;
if(this.currentClip.chapter){this.currentClip.chapter.chapters.aggregateLength=!isNaN(this.videoEngine.getTotalTime())?Math.round(this.videoEngine.getTotalTime()):this.currentClip.mediaLength
}}this.controller.updateMediaTime(this.currentClip.currentMediaTime)
}if(this.percentLoaded<1&&this.percentLoaded!=this.videoEngine.getPercentLoaded()){this.percentLoaded=this.videoEngine.getPercentLoaded();
this.onProgress({percentLoaded:this.percentLoaded})
}this.controller.dispatchEvent("OnMediaPlaying",this.currentTimeObject);
this.showVideo();
this.showBlocker(false);
var d=this.videoEngine.getCurrentTime();
if(this.currentVideoTime){d=this.currentVideoTime
}this.currentVideoTime=undefined;
var c=this.videoEngine.getTotalTime();
if(this.currentClip&&this.currentClip.endTime&&this.currentClip.endTime>0&&Math.abs(d-this.currentClip.endTime)<300&&Math.abs(d-c)>1000){this.currentVideoTime=this.videoEngine.getCurrentTime();
if(this.currentClip.baseClip.isAd){this.currentClip.hasPlayed=true
}this.playbackManager.updateClip(this.currentClip);
tpDebug("Calling onEnded() at "+this.videoEngine.getCurrentTime());
this.onEnded()
}else{if(this.currentClip.endTime>0&&d>this.currentClip.endTime||d<(this.currentClip.startTime-1)){tpDebug("We're outside of the clip boundaries for clipIndex "+this.currentClip.clipIndex+" of "+this.currentClip.startTime+" to "+this.currentClip.endTime+" , so sending a seek event at currentTime:"+d)
}}this.previousTime=d
}}}}}},createCurrentTimeObject:function(){if(!this.video){return undefined
}var f=Math.round(this.videoEngine.getCurrentTime());
var a=this.currentClip.chapter;
var g=false;
if(a&&!this.currentClip.baseClip.isAd&&(f<a.startTime||f>a.endTime)){var c=0;
var h=this.playlist.chapters.chapters.length;
for(;
c<h;
c++){var l=this.playlist.chapters.chapters[c];
var e=this.playlist.chapters.chapters[c+1];
if(l&&f>=l.startTime&&f<=l.endTime){tpDebug("selecting chapter "+c);
g=true;
a=l;
break
}else{if(e&&f>=l.endTime&&f<=e.startTime){g=true;
tpDebug("selecting chapter "+(c+1));
a=e;
f=a.startTime;
break
}}}}if(a&&a.chapters&&(a.chapters.isAggregate||a.chapters.isRelative)){var b={globalDataType:"com.theplatform.pdk.data::TimeObject"};
b.mediaTime=f;
b.currentTime=f-a.startTime;
b.currentTimeAggregate=a.aggregateStartTime+b.currentTime;
b.duration=a.length;
b.durationAggregate=a.chapters.aggregateLength;
b.percentComplete=(b.currentTime/a.length)*100;
b.percentCompleteAggregate=(b.currentTimeAggregate/b.durationAggregate)*100,b.isAggregate=a.chapters.isAggregate,b.isLive=false;
return b
}else{var m=Math.round(this.videoEngine.getCurrentTime());
var k=Math.round(this.videoEngine.getTotalTime());
return{globalDataType:"com.theplatform.pdk.data::TimeObject",mediaTime:m,currentTime:m,currentTimeAggregate:m,duration:k,durationAggregate:k,percentComplete:(m/k)*100,percentCompleteAggregate:(m/k)*100,isAggregate:false,isLive:false}
}},cloneTimeObject:function(a){return a?{globalDataType:"com.theplatform.pdk.data::TimeObject",mediaTime:a.mediaTime,currentTime:a.currentTime,currentTimeAggregate:a.currentTimeAggregate,duration:a.duration,durationAggregate:a.durationAggregate,percentComplete:a.percentComplete,percentCompleteAggregate:a.percentCompleteAggregate,isAggregate:a.isAggregate,isLive:a.isLive}:undefined
},onPlaybackError:function(a){if(this.ignoreErrors||!this.currentClip||this.currentClip.streamType=="empty"){tpDebug("Ignoring playback error");
return
}tpDebug("Got a playback error from the video engine, the call to play media must not have orginated from a user click.");
if(this.currentReleaseUrl){tpDebug("Calling loadReleaseUrl for "+this.currentReleaseUrl);
this.controller.loadReleaseURL(this.currentReleaseUrl)
}else{tpDebug("We don't have a releaseurl to load")
}},onError:function(a){if(this.ignoreErrors||!this.currentClip||this.currentClip.streamType=="empty"){return
}clearTimeout(this.nextClipTimerId);
this.showControls(false);
this.showBlocker(true);
if(true){if(this.timeUpdateTimer){clearInterval(this.timeUpdateTimer)
}if(true){this.hasError=true;
var b={location:this.id,context:null,clip:this.currentClip,endRelease:!this.currentClip.baseClip.isAd,message:"The media cannot be played",friendlyMessage:"The media cannot be played",globalDataType:"com.theplatform.pdk.data::PlaybackError"};
if(this.currentClip.baseClip.isAd){this.currentClip.hasPlayed=true;
this.playbackManager.updateClip(this.currentClip)
}this.suppressPause=false;
this.controller.sendError(b)
}}else{tpDebug("But it's an ignorable error!")
}},showVideo:function(){if(this.isShowing){return
}if(this.waitToShowVideoFunction){tpDebug("showVideo triggered by timeout");
clearTimeout(this.waitToShowVideoFunction);
this.waitToShowVideoFunction=undefined
}tpDebug("showing main video");
this.player.style.marginLeft="";
this.player.style.display="";
this.player.style.zIndex="auto";
this.player.style.width="100%";
this.player.style.height="100%";
this.videoEngine.show(true);
this.waitforcanplay=false;
if(!tpIsIOS()){this.controller.dispatchEvent("OnForceShowVideo",null)
}this.isShowing=true
},hideVideo:function(){if(this.isShowing===false){return
}tpDebug("hiding video");
if(tpIsIOS()){this.player.style.marginLeft="-10000px"
}else{this.player.style.top="10px";
this.player.style.width="1px";
this.player.style.height="8px";
this.player.style.zIndex="8888"
}this.isShowing=false
},loadPoster:function(b){if(!b||(b.toLowerCase().indexOf("mp3")==-1)){return
}if(!this.standby){this.standby=document.getElementById(this.id+".standby")
}var a=b.split("?")[0]+"?format=poster&width="+this.standby.offsetWidth+"&height="+this.standby.offsetHeight;
this.videoEngine.setPoster(a)
},simulateClick:function(d){tpDebug("simulateClick");
var c=document.createElement("a");
c.id="clickSimulator";
c.href="#";
document.body.appendChild(c);
c.addEventListener("click",function(a){a.preventDefault();
d()
},false);
var b;
if(document.createEvent){b=document.createEvent("MouseEvents");
if(b.initMouseEvent){b.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
c.dispatchEvent(b)
}}document.body.removeChild(c)
},setMediaArea:function(a){if(a.width>0&&a.height>0){this._mediaArea=a;
this.controller.dispatchEvent("OnMediaAreaChanged",this.getMediaArea())
}},getMediaArea:function(a){if(!this.standby){this.standby=document.getElementById(this.id+".standby")
}if(this._mediaArea===null||typeof(this._mediaArea)!=="object"){return{top:0,left:0,x:0,y:0,width:this.standby.offsetWidth,height:this.standby.offsetHeight}
}return{top:this._mediaArea.y,left:this._mediaArea.x,x:this._mediaArea.x,y:this._mediaArea.y,width:this._mediaArea.width,height:this._mediaArea.height}
},getComponentSize:function(){return tpGetComponentSize(this.container)
},_fixAndroidChrome:function(d){if(this._androidReady){d();
return
}this.removeListeners();
this.videoEngine.load("",0);
this.videoEngine.play();
this._androidReady=true;
var a=this;
var c=false;
var b=function(f){if(c){return
}a.videoEngine.removeEventListener("MEDIA_ERROR",b);
if(f){a.videoEngine.unload();
d()
}c=true
};
this.videoEngine.addEventListener("MEDIA_ERROR",b);
setTimeout(b,1000)
},showControlBlocker:function(a){this.controlBlockerShowing=a;
a?this.controlBlocker.style.display="":this.controlBlocker.style.display="none"
},showBlocker:function(a){this.blockerShowing=a;
a?this.blocker.style.display="":this.blocker.style.display="none"
},handleOnMediaAreaChanged:function(a){this.video.style.top=a.data.y+"px";
this.video.style.left=a.data.x+"px";
this.video.style.width=a.data.width+"px";
this.video.style.height=a.data.height+"px";
this.video.style.position="absolute";
this.blocker.style.top=a.data.y+"px";
this.blocker.style.left=a.data.x+"px";
this.blocker.style.width=a.data.width+"px";
this.blocker.style.height=a.data.height+"px";
this.blocker.style.position="absolute"
}});
if(typeof(Player)==="undefined"){Player=tpPlayer
}PlugInManager=Class.extend({init:function(a){this.controller=a;
this.plugins=new Array()
},addPlugIn:function(b,h,i,a,e,f,g,c){if((c==undefined&&a.indexOf(".swf")<0)||(c&&c.toLowerCase().indexOf("html")>=0)){var d={id:b,type:h,priority:i,url:a,subUrl:e,vars:f,plugIn:g};
this.plugins.push(d)
}},ready:function(){if(!this.plugins||this.plugins.length===0){var b=this;
setTimeout(function(){b.controller.dispatchEvent(PdkEvent.OnPlugInsComplete,null)
},1)
}for(var a=0;
a<this.plugins.length;
a++){tpController.loadPlugIn(this.plugins[a],this.controller)
}}});
ReleaseFeedParser=Class.extend({_namespaces:new Object(),processFeed:function(c,e){var d=new Object();
d.globalDataType="com.theplatform.pdk.data::ReleaseFeed";
d.entries=new Array();
if(!c){d.isError=true;
d.error=c.toString();
return d
}this.processNamespaces(c);
if(c.entries){for(var b=0;
b<c.entries.length;
b++){a=new Object();
a.globalDataType="com.theplatform.pdk.data::Release";
this.processEntry(c.entries[b],a,e);
d.entries.push(a)
}d.range=new Object();
d.range.globalDataType="com.theplatform.pdk.data::Range";
d.range.startIndex=-1;
d.range.endIndex=-1;
if(c.startIndex){d.range.startIndex=c.startIndex
}if(c.entryCount){d.range.endIndex=d.range.startIndex+c.entryCount-1
}if(c.entryCount){d.range.itemCount=c.entryCount
}else{d.range.itemCount=d.entries.length
}if(c.totalResults){d.range.totalCount=c.totalResults
}}else{if(c.isException&&c.responseCode==404){d.range.startIndex=0;
d.range.endIndex=0;
d.range.itemCount=0;
d.range.totalCount=0
}else{if(c.hasOwnProperty("entryCount")&&c.entryCount==0){d.range.startIndex=0;
d.range.endIndex=0;
d.range.itemCount=0;
d.range.totalCount=0
}else{if(c.isException){d.isError=true;
d.error="["+c.responseCode+"] "+c.title+": "+c.description;
d.range=new Object();
d.range.globalDataType="com.theplatform.pdk.data::Range";
d.range.startIndex=0;
d.range.endIndex=0;
d.range.itemCount=0;
d.range.totalCount=0
}else{var a=new Object();
this.processEntry(c,a,e);
d.entries.push(a);
d.range=new Object();
d.range.globalDataType="com.theplatform.pdk.data::Range";
d.range.startIndex=1;
d.range.endIndex=1;
d.range.itemCount=1;
d.range.totalCount=1
}}}}return d
},processEntry:function(o,l,n){this.processNamespaceEntry(o,l);
var k=l;
if(o.pubDate!=null){k.airdate=new Date(o.pubDate)
}if(o.plmedia$approved!=null){k.approved=o.plmedia$approved
}if(o.media$thumbnails!=null){k.thumbnails=new Array(o.media$thumbnails.length);
for(f=0;
f<o.media$thumbnails.length;
f++){var e=o.media$thumbnails[f];
var a=new Object();
if(e.assetType&&e.assetType.length>0){a.assetTypes=new Array(1);
a.assetTypes[0]=e.assetType
}a.height=e.height;
a.url=e.url;
a.width=e.width;
k.thumbnails[f]=a
}}if(!o.media$content){o.media$content=new Array();
o.media$content[0]=new Object()
}var h;
if(o.media$content.length>1&&n&&n.length>0){for(var m in n){for(var f=0;
f<o.media$content.length;
f++){if(o.media$content[f].plfile$format.toLowerCase()==n[m].toLowerCase()){if(h&&o.media$content[f].plfile$isDefault){h=o.media$content[f]
}else{if(!h){h=o.media$content[f]
}}}}if(h!==undefined){break
}}}if(!h){h=o.media$content[0]
}if(h.plfile$assetTypes!=null){k.assetTypes=new Array();
for(f=0;
f<h.plfile$assetTypes.length;
f++){k.assetTypes.push(h.plfile$assetTypes[f])
}}if(h.plfile$assetTypeIds!=null){k.assetTypeIds=new Array();
for(f=0;
f<h.plfile$assetTypeIds.length;
f++){k.assetTypeIds.push(h.plfile$assetTypeIds[f])
}}if(o.availableDate){k.availableDate=new Date(o.availableDate)
}if(o.author!=null){k.author=o.author
}if(h.plfile$bitrate!=null){k.bitrate=h.plfile$bitrate
}if(o.media$categories!=null){k.categories=new Array();
for(j=0;
j<o.media$categories.length;
j++){category=new Object();
if(o.media$categories[j].media$scheme){category.scheme=o.media$categories[j].media$scheme
}if(o.media$categories[j].media$label){category.label=o.media$categories[j].media$label
}if(o.media$categories[j].media$name){category.name=o.media$categories[j].media$name
}k.categories[j]=category
}}if(o.plmedia$categoryIds!=null){k.categoryIds=new Array(o.plmedia$categoryIds.length);
for(f=0;
f<o.plmedia$categoryIds.length;
f++){k.categoryIds[f]=o.plmedia$categoryIds[f]
}}if(h.plfile$contentType!=null){k.contentType=h.plfile$contentType.toLowerCase()
}if(o.media$copyright!=null){k.copyright=o.media$copyright
}if(h.plfile$releases){if(h.plfile$releases[0].plrelease$delivery!=null){k.delivery=h.plfile$releases[0].plrelease$delivery.toLowerCase()
}}if(o.description!=null){k.description=o.description
}if(h.plfile$transformId!=null){k.transformId=h.plfile$transformId
}if(o.media$excludeCountries!=null){k.excludeCountries=o.media$excludeCountries
}if(o.media$expirationDate!=null){k.expirationDate=new Date(o.media$expirationDate)
}if(h.plfile$format!=null){k.format=h.plfile$format
}if(h.plfile$height!=null){k.height=h.plfile$height
}if(o.media$keywords!=null){k.keywords=o.media$keywords
}if(h.plfile$language!=null){k.language=h.plfile$language
}if(h.plfile$duration!=null){k.length=h.plfile$duration*1000
}if(o.link!=null){k.link=o.link
}if(h.plfile$releases&&h.plfile$releases[0].plrelease$pid!=null){k.pid=h.plfile$releases[0].plrelease$pid
}else{k.pid=this.getPIDFromUrl(h.plfile$url)
}if(h.plfile$playerUrl!=null){k.playerUrl=h.plfile$playerUrl
}if(h.plfile$isProtected!=null){k.isProtected=Boolean(h.plfile$isProtected)
}if(o.media$ratings!=null){k.ratings=o.media$ratings;
var f=0;
var g=k.ratings.length;
for(;
f<g;
f++){k.ratings[f].globalDataType="com.theplatform.pdk.data::Rating"
}}if(o.media$credits!=null){k.credits=new Array();
for(f=0;
f<o.media$credits.length;
f++){var d=o.media$credits[f];
var b=new Object();
b.role=d.media$role;
b.scheme=d.media$scheme;
b.value=d.media$value;
k.credits.push(b)
}}if(o.requestCount!=null){var c=new Object();
c.type="viewCount";
c.value=o.requestCount
}if(o.serverID!=null){k.serverId="http://mps.theplatform.com/data/Server/"+o.serverID
}if(h.plfile$fileSize!=null){k.fileSize=h.plfile$fileSize
}if(o.media$countries!=null){k.countries=new Array(o.media$countries.length);
for(f=0;
f<o.media$countries.length;
f++){k.countries[f]=o.media$countries[f].toString()
}}if(o.plmedia$defaultThumbnailUrl!=null){k.defaultThumbnailUrl=o.plmedia$defaultThumbnailUrl
}if(o.title!=null){k.title=o.title
}if(o.text!=null){k.text=o.text
}if(h.plfile$url!=null){k.url=h.plfile$url
}if(h.plfile$width!=null){k.width=h.plfile$width
}return k
},getPIDFromUrl:function(b){if(!b){return null
}var f=b.split("?")[1];
var g=f.split("&");
for(var c=0;
c<g.length;
c++){var h=g[c].split("=");
if(h[0]=="pid"){return h[1]
}}var d=/.*?\/?[^\/]+\/[^\/]+\/[^\/]+\/([a-zA-Z0-9_]+)/;
var e=b.match(d);
var a;
if(e&&e.length>1){return e[1]
}else{return null
}},processNamespaces:function(a){this._namespaces=new Object();
if(a.$xmlns){for(var b in a.$xmlns){this._namespaces[b]=a.$xmlns[b];
if(this._namespaces[b].toString().charAt(this._namespaces[b].toString().length-1)!="/"){this._namespaces[b]=this._namespaces[b].toString()+"/"
}}}},processNamespaceEntry:function(c,f){if(c.added!=null){f.added=new Date(c.added)
}if(c.guid!=null){f.guid=c.guid
}if(c.id!=null){f.id=c.id
}if(c.updated!=null){f.updated=new Date(c.updated)
}var a=c["$xmlns"];
for(var e in c){if(e.indexOf("$")>0){var d=e.split("$")[0];
var g=this._namespaces[d];
if(!g&&a){g=a[d]
}if(g!="http://search.yahoo.com/mrss/"&&g!="http://purl.org/dc/terms/"&&g!="http://xml.theplatform.com/data/object/admin/"&&g!="http://xml.theplatform.com/media/data/MediaFile/"&&g!="http://xml.theplatform.com/media/data/Media/"&&g!="http://xml.theplatform.com/media/data/Release/"&&g!="http://xml.theplatform.com/media/data/Category/"){var b=new Object();
if(g){b.namespaceUri=g;
b.fieldName=e.split("$")[1]
}else{b.namespaceUri="";
b.fieldName=e
}b.value=c[e];
if(f.customValues==undefined){f.customValues=new Array()
}f.customValues.push(b)
}}}}});
tpReleaseList=PDKComponent.extend({_generateExportedMarkup:function(){return'<div id="'+this.id+'" class="releaseList"></div>'
},init:function(c,b,a){this.width=b;
this.height=a;
this.id=c;
this.pretty=!navigator.userAgent.match(/MSIE 8/)&&!navigator.userAgent.match(/MSIE 7/)&&!navigator.userAgent.match(/MSIE 6/);
if($pdk._isDevMode){this.pretty=false
}this.controller=new ComponentController(c);
this.deferredController=$pdk.shell.Registry.getInstance().getShells().get(c)._deferredController;
this.hasAutoPlayed=false;
this.hasAutoLoaded=false;
this.eventQueue=[];
this.playing=false
},initialize:function(){var a=this;
if(this.scopes){this.controller.scopes=[this.id].concat(this.scopes.split(","))
}else{this.controller.scopes=[this.id,"default"]
}this.deferredController.addEventListener("OnRefreshReleaseModelStarted",function(){a.handleRefreshStarted.apply(a,arguments)
});
this.deferredController.addEventListener("OnRefreshReleaseModel",function(){a.handleReleaseModelRefreshed.apply(a,arguments)
});
this.deferredController.addEventListener("OnLoadRelease",function(){a.handleLoadRelease.apply(a,arguments)
});
this.deferredController.addEventListener("OnLoadReleaseUrl",function(){a.handleLoadRelease.apply(a,arguments)
});
this.deferredController.addEventListener("OnFetchReleaseData",function(){a.handleLoadRelease.apply(a,arguments)
});
this.controller.addEventListener("OnRefreshReleaseModelStarted",function(){a.handleRefreshStarted.apply(a,arguments)
});
this.controller.addEventListener("OnRefreshReleaseModel",function(){a.handleReleaseModelRefreshed.apply(a,arguments)
});
this.controller.addEventListener("OnSetReleaseUrl",function(){a.handleSetReleaseUrl.apply(a,arguments)
});
this.controller.addEventListener("OnReleaseSelected",function(){a.handleOnReleaseSelected.apply(a,arguments)
});
this.controller.addEventListener("OnLoadRelease",function(){a.handleLoadRelease.apply(a,arguments)
});
this.controller.addEventListener("OnLoadReleaseUrl",function(){a.handleLoadRelease.apply(a,arguments)
});
this.controller.addEventListener("OnFetchReleaseData",function(){a.handleLoadRelease.apply(a,arguments)
});
this.controller.addEventListener("OnReleaseStart",function(){a.handleReleaseStart.apply(a,arguments)
});
this.controller.addEventListener("OnReleaseEnd",function(){a.handleReleaseEnd.apply(a,arguments)
});
this.controller.addEventListener("OnMediaStart",function(){a.handleMediaStart.apply(a,arguments)
});
this.controller.addEventListener("OnMediaEnd",function(){a.handleMediaEnd.apply(a,arguments)
});
this.controller.registerFunction("playNext",this,this.playNext);
this.controller.registerFunction("playPrevious",this,this.playPrevious);
this.currentIndex=-1;
this.createdThumbnailStyles=false;
if(this.showtitle===undefined){this.showtitle=true
}if(this.showdescription===undefined){this.showdescription=true
}if(this.showlength===undefined){this.showlength=true
}if(this.showthumbnail===undefined){this.showthumbnail=true
}if(this.defaultthumbnailheight===undefined){this.defaultthumbnailheight=100
}if(this.thumbnailwidth===undefined){this.thumbnailwidth=160
}if(this.thumbnailheight===undefined){this.thumbnailheight=90
}if(this.showtitle==="false"){this.showtitle=false
}if(this.showdescription==="false"){this.showdescription=false
}if(this.showlength==="false"){this.showlength=false
}if(this.showthumbnail==="false"){this.showthumbnail=false
}this.showTitle=this.showtitle;
this.showDescription=this.showdescription;
this.showLength=this.showlength;
this.showThumbnail=this.showthumbnail;
this.thumbnailWidth=this.thumbnailwidth;
this.thumbnailHeight=this.thumbnailheight;
this.defaultThumbnailHeight=this.defaultthumbnailheight
},write:function(b){if(this.autoLoad===undefined){this.autoLoad=true
}if(this.autoPlay===undefined&&!(tpIsAndroid()||tpIsIOS())){this.autoPlay=true
}else{if(tpIsAndroid()||tpIsIOS()){this.autoPlay=false;
if(this.autoLoad==false){this.autoLoad=true
}}}if(this.playAll===undefined){this.playAll=true
}if(!this.columns){this.columns=2
}else{this.columns=parseInt(this.columns)
}if(!this.rows&&this.itemsPerPage!==undefined){this.rows=this.itemsPerPage/this.columns
}else{if(!this.rows){this.rows=2
}}if(tpIsIOS()){}if(b){this.container=b
}else{document.write('<div id="'+this.id+'" class="releaseList"></div>');
this.container=document.getElementById(this.id);
this.container.style.width=this.width;
this.container.style.height=this.height
}this.style=document.createElement("style");
var a=document.getElementsByTagName("head")[0];
this.style.setAttribute("type","text/css");
a.appendChild(this.style);
this.initialize()
},_bindElement:function(a){if(this.autoLoad==null){this.autoLoad=true
}if(this.autoPlay===undefined&&!(tpIsAndroid()||tpIsIOS())){this.autoPlay=true
}else{if(tpIsAndroid()||tpIsIOS()){this.autoPlay=false
}}if(this.playAll==null){this.playAll=true
}this.container=a;
this.container.style.width=this.width;
this.container.style.height=this.height;
tpController.ready();
return this.container
},handleReleaseStart:function(b){var c;
for(var a=0;
a<b.data.baseClips.length;
a++){if(!b.data.baseClips[a].isAd){c=b.data.baseClips[a].contentID;
break
}}this.doSelectTile(c,b.data.releaseURL)
},setCurrentReleaseUrl:function(a){if(!a){return
}var b=a.search(/[\?\&]format=/);
if(b>0){a=a.substring(0,b)
}this.currentReleaseUrl=a
},handleReleaseEnd:function(a){this.currentClip=undefined;
this.enable()
},getCurrentIndex:function(){var a=-1;
var b=this.currentReleaseUrl;
for(var c=0;
c<this.feed.entries.length;
c++){if(typeof(b)==="string"&&this.releaseUrlsAreEqual(b,this.feed.entries[c].url,this.feed.entries[c].pid)){a=c
}}return a
},playNext:function(c,a){this.currentIndex=this.getCurrentIndex();
this.currentIndex++;
if(this["feed"]===undefined||this.feed.entries.length<=0){if(typeof(this.currentReleaseUrl)==="string"){this.controller.loadReleaseURL(this.currentReleaseUrl,true)
}return
}var b=this.feed.entries[this.currentIndex];
if(c==undefined){c=false
}if(a==undefined){a=false
}this.wasSetByReleaseList=true;
if(a==false||this.playAll){if(b){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:b.url,userInitiated:false});
this.controller.setRelease(b,true);
return
}else{this.controller.loadReleaseURL(this.currentReleaseUrl,true)
}}else{if(b){var d=this.currentClip;
if(!this.playing||a||!d||!(d.noSkip||(d.baseClip&&d.baseClip.noSkip))){if(this.playing===true){this.controller.pause(true);
this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:b.url,userInitiated:true});
this.controller.setRelease(b,true);
return
}else{if((tpIsIOS()||tpIsAndroid())||this.playAll===false&&a===false){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:b.url,userInitiated:false});
this.controller.loadReleaseURL(b.url,true);
return
}else{if(this.playAll===true&&a===false){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:b.url,userInitiated:false});
this.controller.setRelease(b,true);
return
}else{if(this.playAll===true&&a===true){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:b.url,userInitiated:false});
this.controller.loadReleaseURL(b.url,true);
return
}else{if(typeof(this.currentReleaseUrl)==="string"){this.controller.loadReleaseURL(this.currentReleaseUrl,true)
}}}}}this.wasSetByReleaseList=true
}else{return
}}else{this.currentIndex--;
this.controller.loadReleaseURL(this.feed.entries[this.currentIndex].url,true)
}}},playPrevious:function(a){if(this.currentIndex>0){this.currentIndex--
}else{if(this.currentIndex==0&&a){this.currentIndex=this.feed.entries.length-1
}}var c=this.feed.entries[this.currentIndex];
if(!c){return
}if(this.autoPlay){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:c.url,userInitiated:false});
this.controller.setRelease(c,true);
return
}else{var b=this.currentClip;
if(!this.playing||!b||!(b.noSkip||(b.baseClip&&b.baseClip.noSkip))){if(this.controller.isPrefetch()){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:c.url,userInitiated:false});
this.controller.setRelease(c,true);
return
}else{if(this.controller.isFlashPlayer()){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:c.url,userInitiated:false});
this.controller.setRelease(c,true);
return
}else{if(true){this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:c.url,userInitiated:false});
this.controller.setRelease(c,true)
}}}}else{return
}}},handleLoadRelease:function(a){this.doSelectTile(a.data.id,a.data.url)
},releaseUrlsAreEqual:function(b,a,c){b=b?b.replace(/(.*)\?.*/,"$1"):null;
a=a?a.replace(/(.*)\?.*/,"$1"):null;
return b===a||(b!=null?b.indexOf(c)>=0:false)
},doSelectTile:function(b,a){this.setCurrentReleaseUrl(a);
if(!this.feed){this.currentMediaId=b;
this.currentReleaseUrl=a;
this.currentIndex=-1;
return
}this.currentIndex=-1;
if(b){this.currentIndex=this.setTileSelectedMediaId(b)
}if(this.currentIndex==-1){this.currentIndex=this.setTileSelectedReleasePid(a)
}},setTileSelected:function(a){},setTileSelectedMediaId:function(e){var a=-1;
if(e.indexOf("/")>=0){e=e.split("/").pop()
}var c;
for(var b=0;
b<this.feed.entries.length;
b++){c=this.feed.entries[b].id;
if(c&&c.indexOf("/")>=0){c=c.split("/").pop()
}if(e==c){a=b;
var d=this.items[b];
if(d!==undefined){d.className="tpRelease tpReleaseSelected"
}}else{var d=this.items[b];
if(d!==undefined){d.className="tpRelease"
}}}return a
},setTileSelectedReleasePid:function(b){var a=-1;
for(var c=0;
c<this.feed.entries.length;
c++){if(this.releaseUrlsAreEqual(b,this.feed.entries[c].url,this.feed.entries[c].pid)){a=c;
var d=this.items[c];
if(d!==undefined){d.className="tpRelease tpReleaseSelected"
}}else{var d=this.items[c];
if(d!==undefined){d.className="tpRelease"
}}}return a
},handleOnReleaseSelected:function(b){var a=b.data.releaseUrl;
if(this["feed"]===undefined){return
}this.setCurrentReleaseUrl(a);
this.currentIndex=null;
if(b.data.id){this.currentIndex=this.setTileSelectedMediaId(b.data.id)
}if(this.currentIndex==null){this.currentIndex=this.setTileSelectedReleasePid(b.data.url)
}},handleSetReleaseUrl:function(b){var a=b.data;
this.setCurrentReleaseUrl(a)
},handleRefreshStarted:function(b){if(this.loading||this.paging){return
}var a=this;
this.loading=true;
if(!this.feed){this.refresh()
}if(this.pretty){setTimeout(function(){if(a.loading&&!a.loadingIndicator){a.loadingIndicator=document.createElement("div");
a.loadingIndicator.className="tpFeedLoadingIndicator";
a.container.appendChild(a.loadingIndicator);
$pdk.jQuery(a.loadingIndicator).animate({rotation:720},{easing:"linear",step:function(c,d){$(this).css("transform","rotate("+c+"deg)");
$(this).css("-ms-transform","rotate("+c+"deg)");
$(this).css("-webkit-transform","rotate("+c+"deg)")
},complete:function(){$pdk.jQuery(a.loadingIndicator).remove();
a.loadingIndicator=null
},duration:4000})
}},1000)
}},refresh:function(){var d=document.createElement("div");
var c=document.createElement("div");
var b=this.framecolor?this.framecolor:"#000000";
var a=this.backgroundcolor?this.backgroundcolor:"#ffffff";
b=b.replace("0x","#");
a=a.replace("0x","#");
d.className="tpBackground";
d.style.backgroundColor=a;
d.style.borderColor=b;
c.className="tpBackgroundShine tpGradient";
this.container.innerHTML="";
this.container.appendChild(d);
this.container.appendChild(c)
},isPrefetch:function(){return this.controller.isPrefetch()
},handleReleaseModelRefreshed:function(O){if(this.paging){this.eventQueue.push(O);
return
}this.loading=false;
$pdk.jQuery(this.loadingIndicator).stop();
$pdk.jQuery(this.loadingIndicator).remove();
var k=O.data;
var F=(this.feed&&this.feed.search!==k.search?true:false);
var g;
var f;
var e;
var u;
var B;
var z;
var N;
if(this.feed&&this.feed.range&&k&&k.range){if(k.entries.length>0){this.paging=true
}if(this.feed.range.startIndex<k.range.startIndex){this.animateForward=true
}else{if(this.feed.range.startIndex>k.range.startIndex){this.animateForward=false
}}}else{this.animateForward=false
}this.feed=k;
this.loadedTiles=[];
this.numTiles=k.entries.length;
if(!this.currentPage||F||!this.pretty){this.refresh();
this.currentPage=null;
this.previousPage=null
}var c=-1;
var L=-1;
var y=0;
if(this.hasoverlay=="true"){var b=document.createElement("div");
b.className="tpReleaseListOverlay";
this.container.appendChild(b);
y=b.clientHeight
}var s=document.createElement("ul");
s.className="tpGrid";
this.container.appendChild(s);
$pdk.jQuery(s).css("margin-top",parseInt($pdk.jQuery(s).css("margin-top"))+y);
s.ontouchstart=function(a){this.startX=a.changedTouches[0].pageX;
this.startY=a.changedTouches[0].pageY
};
s.ontouchend=function(a){if(this.startX&&((this.startX-a.changedTouches[0].pageX)>100)){$pdk.controller.nextRange()
}else{if(this.startX&&((a.changedTouches[0].pageX-this.startX)>100)){$pdk.controller.previousRange()
}}};
this.items=[];
var v,d,N,K,G,I,l,r,z,o,e;
var D=($pdk.jQuery(s).innerWidth())/this.columns;
var J=($pdk.jQuery(s).innerHeight())/this.rows;
var C,x,t,n;
var E=16/9;
if(this.allowscrolling=="true"){$(s).append("<li class='tpRelease'><a href='#'><div class='tpInfo'><div class='tpThumbnail'><img></div><div class='tpMetadata'></div></div></a></li>");
J=parseInt(this.thumbnailheight)+parseInt($(s).find(".tpRelease").css("margin-top"))+parseInt($(s).find(".tpRelease").css("margin-bottom"))+parseInt($(s).find(".tpRelease").css("padding-top"))+parseInt($(s).find(".tpRelease").css("padding-bottom"))+parseInt($(s).find(".tpRelease").css("border-top-width"))+parseInt($(s).find(".tpRelease").css("border-bottom-width"))+parseInt($(s).find("a").css("margin-top"))+parseInt($(s).find("a").css("margin-bottom"))+parseInt($(s).find("a").css("border-top-width"))+parseInt($(s).find("a").css("border-bottom-width"))+parseInt($(s).find("a").css("padding-top"))+parseInt($(s).find("a").css("padding-bottom"))+parseInt($(s).find(".tpThumbnail").css("margin-top"))+parseInt($(s).find(".tpThumbnail").css("margin-bottom"))+parseInt($(s).find(".tpThumbnail").css("border-top-width"))+parseInt($(s).find(".tpThumbnail").css("border-bottom-width"))+parseInt($(s).find(".tpThumbnail").css("padding-top"))+parseInt($(s).find(".tpThumbnail").css("padding-bottom"))+parseInt($(s).find(".tpThumbnail img").css("margin-top"))+parseInt($(s).find(".tpThumbnail img").css("margin-bottom"))+parseInt($(s).find(".tpThumbnail img").css("border-top-width"))+parseInt($(s).find(".tpThumbnail img").css("border-bottom-width"))+parseInt($(s).find(".tpThumbnail img").css("padding-top"))+parseInt($(s).find(".tpThumbnail img").css("padding-bottom"));
$(s).children().first().remove();
D-=10;
$pdk.jQuery(s).css("overflow-y","auto")
}if(this.thumbnailwidth&&this.thumbnailheight){E=this.thumbnailwidth/this.thumbnailheight
}for(var H=0;
H<k.entries.length;
H++){v=document.createElement("li");
d=document.createElement("div");
N=document.createElement("a");
K=document.createElement("div");
G=document.createElement("div");
I=document.createElement("div");
l=document.createElement("div");
r=document.createElement("div");
z=document.createElement("h2");
v.className="tpRelease";
if(this.pretty){d.className="tpShine"
}K.className="tpInfo";
G.className="tpThumbnail";
I.className="tpThumbnailOverlay";
l.className="tpMetadata";
r.className="tpGroup";
z.className="tpTitle";
v.appendChild(d);
v.appendChild(N);
N.appendChild(K);
if(this.showThumbnail){K.appendChild(G);
G.appendChild(I)
}else{C=0
}if(this.showTitle||this.showDescription||this.showLength){this.showMetadata=true;
K.appendChild(l);
l.appendChild(r);
r.appendChild(z)
}else{n=0
}s.appendChild(v);
this.items.push(v);
v.style.width=((H+1)%this.columns==0?Math.ceil(D):Math.floor(D))+"px";
v.style.height=((Math.floor(H/this.columns)+1)%this.rows==0?Math.floor(J):Math.ceil(J))+"px";
if((H+1)%this.columns!=0){N.style.borderRightWidth="0px"
}if((Math.floor(H/this.columns)+1)%this.rows!=0){N.style.borderBottomWidth="0px"
}if(this.showThumbnail&&!C){C=$(v).find("a").innerHeight()-($(G).outerHeight(true)-$(G).innerHeight())-($(K).outerHeight(true)-$(K).innerHeight());
if(!this.showMetadata){x=Math.min(Math.floor(C*E),$(v).find(".tpInfo").innerWidth()-parseInt($(v).find(".tpThumbnail").css("border-left-width"))-parseInt($(v).find(".tpThumbnail").css("border-right-width")));
$(G).css("margin-right","0px")
}}if(this.showMetadata&&!n){n=$(v).find("a").innerWidth()-($(G).outerWidth(true)-$(G).innerWidth()+(C*E))-($(l).outerWidth(true)-$(l).innerWidth())-($(K).outerWidth(true)-$(K).innerWidth())-1;
if(!this.showThumbnail){t=$(v).find(".tpInfo").innerHeight()-parseInt($(v).find(".tpMetadata").css("border-top-width"))-parseInt($(v).find(".tpMetadata").css("border-top-width"))
}}C=Math.max(0,C);
x=Math.max(0,x);
t=Math.max(0,t);
n=Math.max(0,n);
if(K){G.style.height=C+"px";
if(this.showMetadata){G.style.width=(C*E)+"px"
}else{G.style.width=(x)+"px"
}l.style.width=n+"px";
if(this.showThumbnail){l.style.height=C+"px"
}else{l.style.height=t+"px"
}}N.href="#";
N.release=k.entries[H];
N.index=H;
var p=this;
var m=document.createElement("canvas");
if(!this.createdThumbnailStyles){var I=$pdk.jQuery(N).find(".tpThumbnailOverlay")[0];
this.createdThumbnailStyles=true;
tpCreateColorizedStateStyles(I,".tpReleaseList .tpRelease{state} .tpThumbnail .tpThumbnailOverlay { background-image: {url}; }",p.thumbnailframecolor,this.thumbnailhighlightselectedcolor,this.thumbnailhighlighthovercolor,this.style,"Selected")
}N.onclick=function(){if(p.currentClip&&p.currentClip.baseClip&&p.currentClip.baseClip.noSkip){return
}p.wasSetByReleaseList=true;
p.currentIndex=this.index;
if(p.isPrefetch()){p.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:this.release.url,userInitiated:true});
p.controller.loadReleaseURL(this.release.url,true)
}else{p.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:this.release.url,userInitiated:true});
p.controller.setRelease(this.release,true)
}return false
};
if(this.showTitle){z.innerHTML+=k.entries[H].title
}if(this.showLength){var q=k.entries[H].length;
if(q>0){z.innerHTML+='<span class="tpDuration"> ('+tpMillisToStr(q)+")</span>"
}}if(this.showDescription){o=document.createElement("p");
o.innerHTML=k.entries[H].description;
r.appendChild(o)
}if(this.showThumbnail){e=document.createElement("img");
e.style.display="none";
e.style.visibility="hidden";
e.tile=v;
e.onload=e.onerror=function(U){this.style.display="";
this.style.visibility="visible";
var V=$pdk.jQuery(G).width();
var Z=$pdk.jQuery(G).height();
var Q=parseInt($pdk.jQuery(this).css("margin-left"));
var P=parseInt($pdk.jQuery(this).css("margin-right"));
var a=parseInt($pdk.jQuery(this).css("margin-top"));
var X=parseInt($pdk.jQuery(this).css("margin-bottom"));
Q=(Q?Q:0);
P=(Q?Q:0);
a=(Q?Q:0);
X=(Q?Q:0);
var Y=V-Q-P;
var T=Z-a-X;
if(U!==true){tpScaleImage(this,Y,T);
var W=this.newWidth;
var S=this.newHeight;
if(!W){W=Y
}if(!S){S=T
}}else{W=0;
S=0;
this.style.display="none"
}var R=(T-S)/2;
var i=(Y-W)/2;
if(W<Y){this.style.paddingLeft=Math.floor(i)+"px";
this.style.paddingRight=Math.floor(i)+"px"
}else{if(S<T){this.style.paddingTop=Math.floor(R)+"px";
this.style.paddingBottom=Math.floor(R)+"px"
}}p.handleTileLoaded(this.tile)
};
e.tile.style.display="none";
G.appendChild(e);
if(k.entries[H].media$thumbnails&&k.entries[H].media$thumbnails.length==1){e.src=k.entries[H].media$thumbnails[0].plfile$url
}if(k.entries[H].defaultThumbnailUrl){e.src=k.entries[H].defaultThumbnailUrl
}else{e.onload(true)
}}else{this.handleTileLoaded(v)
}}if(this.currentPage){this.previousPage=this.currentPage;
var D=$pdk.jQuery(s).width();
if(this.animateForward){$pdk.jQuery(s).find(".tpRelease").css("left",D+"px")
}else{$pdk.jQuery(s).find(".tpRelease").css("left",(-D)+"px")
}}this.currentPage=s;
var p=this;
setTimeout(function(){p.doInitialLoad(k)
},1);
if(this.style&&!this.createdColorizationStyles){this.createdColorizationStyles=true;
var M="";
if(this.itembackgroundcolor){M+="#"+this.id+".tpReleaseList>ul .tpRelease a, ul#"+this.id+".tpReleaseList .tpRelease a { background-color: #"+this.itembackgroundcolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList>ul .tpRelease a .tpMetadata, ul#"+this.id+".tpReleaseList .tpRelease a .tpMetadata { background-color: #"+this.itembackgroundcolor.substr(2)+"; }"
}if(this.itemframecolor){M+="#"+this.id+".tpReleaseList .tpRelease a { border-color: #"+this.itemframecolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpRelease .tpShine { background-color: #"+this.itemframecolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpRelease .tpShine { border-color: #"+this.itemframecolor.substr(2)+"; }"
}if(this.textframecolor){M+="#"+this.id+".tpReleaseList .tpRelease .tpMetadata { border-color: #"+this.textframecolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpRelease a .tpMetadata .tpGroup { border-color: #"+this.textframecolor.substr(2)+"; }"
}if(this.textcolor){M+="#"+this.id+".tpReleaseList .tpRelease a { color: #"+this.textcolor.substr(2)+"; }"
}if(this.thumbnailframecolor){M+="#"+this.id+".tpReleaseList .tpRelease .tpThumbnail { border-color: #"+this.thumbnailframecolor.substr(2)+"; }"
}if(this.thumbnailbackgroundcolor){M+="#"+this.id+".tpReleaseList .tpRelease .tpThumbnail { background-color: #"+this.thumbnailbackgroundcolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpRelease .tpThumbnail img { background-color: #"+this.thumbnailbackgroundcolor.substr(2)+"; }"
}if(this.thumbnailpaddingcolor){M+="#"+this.id+".tpReleaseList .tpRelease .tpThumbnail { background-color: #"+this.thumbnailpaddingcolor.substr(2)+"; }"
}if(this.framecolor){M+="#"+this.id+".tpReleaseList { border-color: #"+this.framecolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList ul { border-color: #"+this.framecolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList ol { border-color: #"+this.framecolor.substr(2)+"; }"
}if(this.texthighlighthovercolor){M+="#"+this.id+".tpReleaseList .tpRelease:hover .tpShine { background-color: #"+this.texthighlighthovercolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpRelease:hover .tpShine { border-color: #"+this.texthighlighthovercolor.substr(2)+"; }"
}if(this.texthovercolor){M+="#"+this.id+".tpReleaseList .tpRelease:hover a { color: #"+this.texthovercolor.substr(2)+"; }"
}if(this.texthighlighthovercolor){M+="#"+this.id+".tpReleaseList .tpRelease:hover a .tpMetadata .tpGroup { border-color: #"+this.texthighlighthovercolor.substr(2)+" !important; }"
}if(this.thumbnailhighlighthovercolor){M+="#"+this.id+".tpReleaseList .tpRelease:hover a .tpThumbnail { border-color: #"+this.thumbnailhighlighthovercolor.substr(2)+" !important; }"
}if(this.itemshineselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected .tpShine { background-color: #"+this.itemshineselectedcolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpReleaseSelected .tpShine { border-color: #"+this.itemshineselectedcolor.substr(2)+"; }"
}if(this.textselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected a { color: #"+this.textselectedcolor.substr(2)+"; }"
}if(this.texthighlightselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected a .tpMetadata .tpGroup { border-color: #"+this.texthighlightselectedcolor.substr(2)+" !important; }"
}if(this.thumbnailhighlightselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected a .tpThumbnail { border-color: #"+this.thumbnailhighlightselectedcolor.substr(2)+" !important; }"
}if(this.itemshineselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected:hover .tpShine { background-color: #"+this.itemshineselectedcolor.substr(2)+"; }";
M+="#"+this.id+".tpReleaseList .tpReleaseSelected:hover .tpShine { border-color: #"+this.itemshineselectedcolor.substr(2)+"; }"
}if(this.textselectedcolor){M+="#"+this.id+".tpReleaseList .tpReleaseSelected:hover a { color: #"+this.textselectedcolor.substr(2)+"; }"
}if(this.backgroundcolor&&this.itembackgroundcolor&&this.framecolor){M+=".tpReleaseList ::-webkit-scrollbar                     { background-color: #"+this.backgroundcolor.substr(2)+"}\n";
M+=".tpReleaseList ::-webkit-scrollbar-track               { background-color: #"+this.backgroundcolor.substr(2)+"}\n";
M+=".tpReleaseList ::-webkit-scrollbar-thumb               { background-color: #"+this.itembackgroundcolor.substr(2)+"; border-color: #"+this.framecolor.substr(2)+"}\n";
M+=".tpReleaseList ::-moz-scrollbar                     { background-color: #"+this.backgroundcolor.substr(2)+"}\n";
M+=".tpReleaseList ::-moz-scrollbar-track               { background-color: #"+this.backgroundcolor.substr(2)+"}\n";
M+=".tpReleaseList ::-moz-scrollbar-thumb               { background-color: #"+this.itembackgroundcolor.substr(2)+"; border-color: #"+this.framecolor.substr(2)+"}\n"
}if(this.style.styleSheet){this.style.styleSheet.cssText=M
}else{this.style.appendChild(document.createTextNode(M))
}}if(this.currentReleaseUrl||this.currentMediaId){this.doSelectTile(this.currentMediaId,this.currentReleaseUrl)
}var A=this.currentClip;
if(A&&(A.baseClip&&(A.baseClip.noSkip))){this.disable()
}else{if(this.blocker){this.enable()
}}},handleTileLoaded:function(c){var b=this;
this.loadedTiles.push(c);
if(this.loadedTiles.length==this.numTiles){if(!this.pretty){$pdk.jQuery(this.container).find(".tpRelease").css("display","");
$pdk.jQuery(b.previousPage).remove()
}else{if(this.previousPage){this.paging=true;
var a=$pdk.jQuery(this.currentPage).width();
if(this.animateForward){$pdk.jQuery(this.container).find(".tpRelease").css("display","").css("-webkit-filter","blur(1px)").css("filter","blur(2px)");
$pdk.jQuery(this.container).find(".tpGrid .tpRelease").animate({left:"-="+a},600,function(){$pdk.jQuery(b.previousPage).remove();
b.paging=false;
$pdk.jQuery(b.container).find(".tpRelease").css("-webkit-filter","").css("filter","");
if(b.eventQueue&&b.eventQueue.length){b.handleReleaseModelRefreshed(b.eventQueue.shift())
}})
}else{$pdk.jQuery(this.container).find(".tpRelease").css("display","").css("-webkit-filter","blur(1px)").css("filter","blur(2px)");
$pdk.jQuery(this.container).find(".tpGrid .tpRelease").animate({left:"+="+a},600,function(){$pdk.jQuery(b.previousPage).remove();
b.paging=false;
$pdk.jQuery(b.container).find(".tpRelease").css("-webkit-filter","").css("filter","");
if(b.eventQueue&&b.eventQueue.length){b.handleReleaseModelRefreshed(b.eventQueue.shift())
}})
}}else{$pdk.jQuery(this.container).find(".tpRelease").fadeIn(400,function(){b.paging=false
})
}}if(this.showDescription){setTimeout(function(f){for(var d=0;
d<b.loadedTiles.length;
d++){tpEllipsis($pdk.jQuery(b.loadedTiles[d]).find(".tpGroup")[0],$pdk.jQuery(b.loadedTiles[d]).find(".tpGroup p")[0])
}},1)
}}},doInitialLoad:function(a){if(!a.entries||a.entries.length<=0){return
}tpDebug("doInitialLoad called");
if(!this.currentReleaseUrl&&this.autoPlay&&!this.hasAutoPlayed){tpDebug("doInitialLoad firing OnReleaseSelected");
this.controller.dispatchEvent("OnReleaseSelected",{releaseUrl:a.entries[0].url,userInitiated:false});
this.controller.setRelease(a.entries[0],false);
this.wasSetByReleaseList=true
}else{if(!this.currentReleaseUrl&&this.autoLoad&&!this.hasAutoLoaded){this.hasAutoLoaded=true;
this.controller.loadRelease(a.entries[0],false);
this.wasSetByReleaseList=true
}}},handleMediaStart:function(b){this.playing=true;
var a=b.data;
if(a.baseClip&&(a.baseClip.noSkip)){this.disable()
}else{if(this.blocker){this.enable()
}}this.currentClip=a
},disable:function(){if(tpIsIPhone()||tpIsAndroid()){return
}if(!this.blocker){this.blocker=document.createElement("div");
this.blocker.style.width="100%";
this.blocker.style.height="100%";
this.blocker.style.position="absolute";
this.blocker.style.top="0";
this.blocker.style.left="0";
this.blocker.style.background="black";
this.blocker.style.opacity="0.75";
this.blocker.style.filter="alpha(opacity=75)";
this.blocker.innerHTML="&nbsp;";
this.blocker.style.zIndex="500";
this.container.appendChild(this.blocker)
}this.blocker.style.display="";
var a=this.container.childNodes;
for(child in a){if(child.style){child.style.opacity="0.75";
child.style.filter="alpha(opacity=75)"
}}},enable:function(){tpDebug("Doing enable");
try{if(this.blocker){this.blocker.style.display="none"
}var b=this.container.childNodes;
for(child in b){if(child.style){child.style.opacity="";
child.style.filter=""
}}}catch(a){tpDebug("enabled() threw an error with "+a.message+" on "+a.lineNumber)
}},handleMediaEnd:function(a){this.playing=false;
tpDebug("Enabling releaseList");
this.enable()
},output:function(b){var a="";
for(prop in b){a+=prop+": "+b[prop]+"\n"
}alert(a)
}});
ReleaseList=tpReleaseList;
tpReleaseModel=PDKComponent.extend({init:function(a){this.id=a;
this.controller=new ComponentController(a);
this.parser=new ReleaseFeedParser();
if($pdk._phase1Controllers===null||typeof($pdk._phase1Controllers)!=="object"){$pdk._phase1Controllers={}
}$pdk._phase1Controllers[a]=this.controller;
tpDebug("ReleaseModel instantiated with id:"+a)
},write:function(){var c=$pdk.env.Detect.getInstance().getConfigSet("usehtmlreleasemodel");
var a=(c&&c.contains("true"))?true:false;
var b=this;
if(this.scopes){this.controller.scopes=this.scopes.split(",")
}if(a){tpDebug("[write] Release Model id: "+this.id);
tpDebug("Using HTML Release Model");
return
}this.controller.registerFunction("refreshReleaseModel",this,this.refreshReleaseModel);
this.controller.registerFunction("getRelease",this,this.getRelease);
this.playerReady=false;
this.doInitialLoad();
tpDebug("ReleaseModel written with id:"+this.controller.id)
},doInitialLoad:function(){if(!this.feedsServiceUrl&&this.feedsserviceurl){this.feedsServiceUrl=this.feedserviceurl;
delete this.feedserviceurl
}if(this.startIndex===undefined&&this["startindex"]!==undefined){this.startIndex=this.startindex;
delete this.startindex
}if(this.endIndex===undefined&&this["endindex"]!==undefined){this.endIndex=this.endindex;
delete this.endindex
}this.defaultFeedsUrl=this.feedsServiceUrl;
this.currentFeedsUrl=this.feedsServiceUrl;
var c;
var b;
var f;
var e;
var a;
if(this.sortField||this.sortDescending){c=new Object()
}if(this.startIndex||this.endIndex){b=new Object()
}if(this.params){f=this.params.split("&")
}if(this.secondaryParams){e=this.secondaryParams.split("&")
}if(this.mediaIds){a=this.mediaIds.split(",")
}if(this.sortField){c.field=this.sortField
}if(this.sortDescending){c.descending=this.sortDescending
}if(this.startIndex){b.startIndex=parseInt(this.startIndex)
}if(this.endIndex){b.endIndex=parseInt(this.endIndex)
}if(this.currentFeedsUrl&&!this._wasLoaded){tpDebug("Calling refreshReleaseModel");
var d=this;
setTimeout(function(){if(!d._wasLoaded){d.refreshReleaseModel(d.category,d.search,c,b,f,e,a)
}},1)
}},_bindElement:function(a){var b=this;
this.container=a;
var b=this;
setTimeout(function(){b.doInitialLoad()
},1);
tpDebug("ReleaseModel bound with id:"+this.controller.id);
return a
},callback:function(b,a){var c=this.parser.processFeed(b,this.preferredFormats);
c.requestUrl=a;
c.search=this.search;
if(this.shuffle==="true"&&!this.sortField){c.entries.sort(function(){return 0.5-Math.random()
})
}this.controller.dispatchEvent("OnRefreshReleaseModel",c)
},getReleaseCallback:function(b,a){var c=this.parser.processFeed(b,this.preferredFormats);
if(c&&c.entries&&c.entries.length==1){this.controller.dispatchEvent("OnGetRelease",c.entries[0])
}else{this.controller.dispatchEvent("OnGetRelease",null)
}},refreshReleaseModel:function(a,k,c,d,b,i,e,f){this._wasLoaded=true;
this.updateCurrentFeedsUrl(f);
if(!b&&this.params){b=this.params.split("&")
}if(!i&&this.secondaryParams){i=this.secondaryParams.split("&")
}if((d&&this.search!==undefined)||k){this.category=undefined
}if(!d){d={startIndex:this.startIndex,endIndex:this.endIndex}
}if(c&&this.search!==undefined){this.search=undefined
}if((a===null||a===undefined)&&this.category&&k){a=this.category
}this.category=a;
if(k===null||k==undefined){k=this.search
}this.search=k;
this.lastRequestUrl=this.constructUrl(a,k,c,d,b,i,e,this.currentFeedsUrl,this.fields);
this.controller.dispatchEvent("OnRefreshReleaseModelStarted",null);
var g=this;
var h=new JSONLoader();
h.load(this.lastRequestUrl,function(){g.callback.apply(g,arguments)
},null,null,null,function(){tpDebug("Got no release feed data");
g.controller.dispatchEvent("OnRefreshReleaseModel",{entries:[],globalDataType:"com.theplatform.pdk.data::ReleaseFeed"})
})
},getRelease:function(g,d){var h=this;
h.controller.dispatchEvent("OnGetReleaseStarted",null);
if(this.defaultFeedsUrl){var b=["byReleasePid="+g];
if(d&&d.length>0){var k="params=";
var f=true;
for(var e=0;
e<d.length;
e++){var c=d[e];
if(!f){k+="%26"
}f=false;
k+=encodeURI(c).replace("=","%3D")
}b.push(k)
}var l=new JSONLoader();
var a=this.constructUrl(null,null,null,null,b,null,null,this.defaultFeedsUrl,null);
l.load(a,function(){h.getReleaseCallback.apply(h,arguments)
},null,null,null,function(){h.controller.dispatchEvent("OnGetRelease",null)
})
}else{h.controller.dispatchEvent("OnGetRelease",null)
}},checkPreferredFormats:function(b,c){if(b=="byContent"){if(c.indexOf("byFormat")>=0){var a=c.substring(c.indexOf("byFormat%3D")+11,c.length);
this.preferredFormats=a.split("|")
}}},constructUrl:function(b,q,k,l,e,p,m,n,h){var d=new Object();
var g=n;
var f;
g=this.parseUrlParams(g,d);
g=this.addStandardMercuryParams(g,d);
if(e){for(f=0;
f<e.length;
f++){var a=e[f].split("=")[0];
var o=e[f].split("=")[1];
this.mergeMercuryParameter(d,a,o);
this.checkPreferredFormats(a,o)
}}if(p){for(f=0;
f<p.length;
f++){var a=p[f].split("=")[0];
var o=p[f].split("=")[1];
this.mergeMercuryParameter(d,a,o);
this.checkPreferredFormats(a,o)
}}if(!d.fields){this.mergeMercuryParameter(d,"fields","author,content,defaultThumbnailUrl,description,pubDate,title")
}if(!d.fileFields){this.mergeMercuryParameter(d,"fileFields","bitrate,duration,format,url")
}if(m&&m.length){g+=m.join(",")+"/"
}else{if(m){g+="0,0/"
}}this.mergeMercuryParameter(d,"count","true");
if(b&&b!="Most Popular"){this.mergeMercuryParameter(d,"byCategories",b)
}if(q&&m==null){this.mergeMercuryParameter(d,"q",encodeURIComponent(q))
}if(k&&k.field){var c=k.field;
if(k.descending){c+="|desc"
}if(k.field=="RequestCount"){c="metrics.viewCount.lastDay|desc"
}this.mergeMercuryParameter(d,"sort",c)
}if(l){if(l.startIndex&&l.endIndex){this.mergeMercuryParameter(d,"range",l.startIndex+"-"+l.endIndex)
}else{if(l.endIndex){this.mergeMercuryParameter(d,"range","-"+l.endIndex)
}else{if(l.startIndex){this.mergeMercuryParameter(d,"range",l.startIndex+"-")
}}}}if(h){h=h.replace(":","%3A");
this.mergeMercuryParameter(d,"fields",h)
}g=this.addUrlParamsToConstructedUrl(g,d);
return g
},parseUrlParams:function(e,b){var a;
if(e.indexOf("?")!=-1){a=e.split("?")[1];
e=e.split("?")[0];
var d=a.split("&");
for(var c=0;
c<d.length;
c++){this.mergeMercuryParameter(b,d[c].split("=")[0],d[c].split("=")[1])
}}return e
},addStandardMercuryParams:function(b,a){this.mergeMercuryParameter(a,"form","json");
this.mergeMercuryParameter(a,"validFeed","false");
this.mergeMercuryParameter(a,"types","none");
if(b.charAt(b.length-1)!="/"){b+="/"
}return b
},mergeMercuryParameter:function(c,a,l){if(c[a]){if(a=="byContent"||a=="contentFilter"||a=="thumbnailFilter"){var g=c[a].split("%26");
var k=l.split("%26");
var d;
var m;
var h;
var b;
var n;
for(var e=0;
e<k.length;
e++){n=false;
for(var f=0;
f<g.length;
f++){d=g[f].toString().split("%3D")[0];
h=k[e].toString().split("%3D")[0];
if(d==h){n=true;
m=g[f].toString().split("%3D")[1];
b=k[e].toString().split("%3D")[1];
m+=","+b;
g[f]=d+"%3D"+m
}}if(!n){g.push(k[e])
}}c[a]=g.join("%26")
}else{if(a.indexOf("by")==0||a=="q"){c[a]+=","+l
}else{c[a]=l
}}}else{c[a]=l
}},addUrlParamsToConstructedUrl:function(d,a){var b="?";
for(var c in a){d+=b+c+"="+a[c];
b="&"
}return d
},updateCurrentFeedsUrl:function(a){if(a==""){this.currentFeedsUrl=this.defaultFeedsUrl
}else{if(a){this.currentFeedsUrl=a
}}}});
SampleCard=EventDispatcher.extend({init:function(d,b,a){var c=this;
this.id=d;
this.controller=a;
this.write()
},write:function(){if(this.view){this.view.innerHTML=""
}this.view=document.createElement("div");
this.view.id=this.id;
this.view.className="cardOverlay";
this.view.style.position="absolute";
this.view.style.top="0px";
this.view.style.left="0px";
this.view.style.height="100%";
this.view.style.width="100%";
this.view.style.background="";
this.view.style.zIndex="300";
this.view.style.display="none";
if(parent){this.parent=parent
}},cardClicked:function(){},getView:function(){return this.view
},showCard:function(a){if(a){this.view.style.display=""
}else{this.view.style.display="none"
}}});
var SeekEvents={USERSEEKED:"userseeked",PROGRAMATICALLYSEEKED:"programaticallyseeked",SEEKFAILED:"seekfailed"};
var SeekStates={PAUSED:"paused",PLAYING:"playing",USERSEEKING:"userseeking",PROGRAMATICALLYSEEKING:"programaticallyseeking",ERROR:"error"};
SeekHandler=EventDispatcher.extend({init:function(a){this.videoEngine=a;
this.seekInterval=350;
this.seekState=this.videoEngine.isPaused()?SeekStates.PAUSED:SeekStates.PLAYING;
var b=this;
if(!tpIsIOS()){}else{}this.videoEngine.addEventListener("MEDIA_SEEKED",function(c){b.onSeeked(c)
});
this.lastTime=this.videoEngine.getCurrentTime()/1000
},stopTimer:function(){clearInterval(this.seekTimer)
},startTimer:function(){var a=this;
this.lastTime=0;
this.seekTimer=setInterval(function(){a.onTimer()
},this.seekInterval)
},onSeeked:function(b){tpDebug("got seeked event from "+this.lastTime+" to"+this.videoEngine.getCurrentTime());
this.lastTime=this.video.getCurrentTime()/1000;
if(false&&this.seeking&&Math.abs(this.videoEngine.getCurrentTime()/1000-this.seekingTo)<=300){}else{tpDebug("This was a user seek");
var a=this;
setTimeout(function(){a.dispatchEvent(SeekEvents.USERSEEKED,a.lastTime)
},1)
}this.seekState=this.videoEngine.isPaused()?SeekStates.PAUSED:SeekStates.PLAYING
},onSeeking:function(a){},onTimer:function(){},doSeek:function(b,a,c){},removeProgressListeners:function(){clearInterval(this.progTimer);
this.progTimer=undefined
},checkPlayable:function(){return this.video.readyState>=3
},checkSeekable:function(a){return false
},checkBuffered:function(a){return false
},destroy:function(){this.buildListenerChain();
this.removeProgressListeners();
clearInterval(this.seekTimer)
}});
var RELEASE_WAIT_TIME=1000;
var STANDBY_WAIT_TIME=250;
StandbyManager=Class.extend({init:function(b,a){this.controller=b;
this.pbm=a;
var c=this;
this.controller.registerFunction("showMenuCard",this,this.showMenuCard);
this.controller.registerFunction("checkIfEndCardExists",this,this.checkIfEndCardExists);
this.controller.addEventListener("OnLoadRelease",function(f){c.checkStandby(f)
});
this.controller.addEventListener("OnLoadReleaseUrl",function(f){c.checkStandby(f)
});
this.controller.addEventListener("OnReleaseSelected",function(f){c.checkStandbyRS(f)
});
this.controller.addEventListener("OnPlugInsComplete",function(f){});
this.controller.addEventListener("OnLoadSmil",function(f){c.checkStandby(f)
});
this.controller.addEventListener("OnMediaEnd",function(f){c.playing=false
});
this.controller.addEventListener("OnMediaStart",function(f){c.playing=true
});
this.controller.addEventListener("OnReleaseEnd",function(f){tpDebug("StandbyManager got "+f.type);
c.playing=false;
c.checkStandbyRE(f)
});
this.controller.addEventListener("OnClearCurrentRelease",function(f){tpDebug("StandbyManager got "+f.type);
c.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,false);
c.controller.dispatchEvent(PdkEvent.OnShowPlayOverlay,false);
c.endStandby(f)
});
this.controller.addEventListener("OnSetReleaseUrl",function(f){c.endStandby(f)
});
this.controller.addEventListener("OnSetRelease",function(f){c.endStandby(f)
});
this.controller.addEventListener("OnResetPlayer",function(f){c.endStandby(f)
});
this.timerdelay=RELEASE_WAIT_TIME;
var c=this;
var e=function(){c.controller.removeEventListener("OnPlayerLoaded",e);
c.timerrunning=true;
c.startTimer()
};
this.controller.addEventListener("OnPlayerLoaded",e);
this.releaseEnded=false;
this.lastClip=null;
var d=this.controller.getProperty("endCard");
if(d){this.endCardID=d
}else{this.endCardID="forms:tpMenuCard"
}},showMenuCard:function(a){if(a){this.controller.showPlayerCard("forms","tpMenuCard");
this.cardShowing=true
}else{this.controller.hidePlayerCard("forms");
this.cardShowing=false
}},checkStandby:function(a){this.toWarm=false;
this.stopTimer();
this.timerdelay=STANDBY_WAIT_TIME;
tpDebug("Starting standby timer for "+a.type);
this.startTimer();
this.setStandby(true)
},checkStandbyRS:function(a){tpDebug("release selected "+a);
this.stopTimer()
},checkStandbyRE:function(a){this.lastClip=a.data;
this.toWarm=true;
this.releaseEnded=true;
this.stopTimer();
var b=true;
if(!b){this.timerdelay=RELEASE_WAIT_TIME;
tpDebug("Starting timer for "+a.type);
this.startTimer();
this.setStandby(true)
}},endStandby:function(a){this.toWarm=false;
this.releaseEnded=false;
this.setStandby(false)
},startTimer:function(){var a=this;
if(!this.timerrunning){this.timerrunning=true;
this.timer=setTimeout(function(){a.standbyTick()
},this.timerdelay)
}},stopTimer:function(){clearTimeout(this.timer);
this.timerrunning=false
},setStandby:function(a){if(a){if(!this.timerrunning){tpDebug("Starting timer because it was running");
this.startTimer()
}}else{this.doRemoveStandby()
}},checkIfEndCardExists:function(b){var a=this.controller.getProperty("endCard");
if(a){this.endCardID=a
}else{this.endCardID="tpMenuCard"
}return true
},doStartStandby:function(){tpDebug("doing startStandby");
if(this.playing==true){return
}this.isStandBy=true;
var h=this.controller.getProperty("endCard");
if(h){this.endCardID=h
}var a=true||(this.controller.getProperty("relateditemsURL")!=null||h!=null);
var g=true;
if(!this.releaseEnded||!a||!g){tpDebug("dispatching OnShowPlayOverlay true");
this.controller.dispatchEvent(PdkEvent.OnShowPlayOverlay,true);
this.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,true)
}else{this.controller.dispatchEvent(PdkEvent.OnShowPreviewImageOverlay,true);
this.controller.dispatchEvent(PdkEvent.OnShowPlayOverlay,true);
tpDebug("call to show card");
if(this.endCardID.indexOf(":")!=-1){var d=this.endCardID.split(":");
var b=d[0];
var c=d[1];
this.controller.showPlayerCard(b,c)
}else{this.controller.showPlayerCard("forms",this.endCardID)
}this.cardShowing=true;
if(tpIsIOS()){this.controller.showFullScreen(false)
}}var e;
var f=this;
this.playingListener=function(i){f.controller.removeEventListener("OnMediaPlaying",f.playingListener);
if(f.isStandBy){tpDebug("playingListener hiding overlay");
f.isStandBy=false
}};
this.controller.addEventListener("OnMediaPlaying",this.playingListener,true)
},doShowCard:function(d,f,c,b,e,a){if(f==this.cardID&&c!="Enable"){this.controller.dispatchEvent(PdkEvent.OnShowPlayOverlay,true)
}},doRemoveStandby:function(){if(this.timerrunning){this.stopTimer()
}if(this.isStandby){this.isStandby=false;
this.controller.dispatchEvent("OnShowPlayOverlay",false)
}},standbyTick:function(){if(tpIsIOS()){var a=this;
setTimeout(function(){a.doStartStandby()
},1)
}else{this.doStartStandby()
}},clickPlayButton:function(){this.pbm.executeCurrentRelease()
}});
TokenManager=Class.extend({init:function(a){this.controller=a;
this.pluginsLoaded=false;
this.waitTokens=[];
var b=this;
this.controller.registerFunction("setToken",this,this.setToken);
this.plugInsCompleteHandler=function(c){b.plugInsComplete.apply(b,arguments)
};
this.controller.addEventListener("OnPlugInsComplete",this.plugInsCompleteHandler)
},plugInsComplete:function(a){this.controller.removeEventListener("OnPlugInsComplete",this.plugInsCompleteHandler);
this.pluginsLoaded=true;
if(this.waitTokens.length>0){while(this.waitTokens.length>0){this._doSetToken(this.waitTokens.shift())
}}},setToken:function(b,c){var a={token:b,type:c,globalDataType:"com.theplatform.pdk.data::TokenInfo"};
if(this.pluginsLoaded){this._doSetToken(a)
}else{this.waitTokens.push(a)
}},_doSetToken:function(a){this.controller.dispatchEvent("OnSetToken",a)
}});
UrlManager=Class.extend({init:function(a){this.controller=a;
this.plugins=[];
this._currentQueue=[];
this.totalUrlPluginsRegistered=0;
this.totalUrlPluginsLoaded=0;
this.controller.registerFunction("registerURLPlugIn",this,this.registerURLPlugIn);
this.controller.registerFunction("setClip",this,this.setClip)
},checkClip:function(a,b){this._context={clip:a,callback:b,complete:false,found:false};
this._currentQueue=this.plugins.concat();
if(this._currentQueue.length===0){b(a);
return true
}else{if(!this._processNextPlugin()){b(a)
}return false
}},_processNextPlugin:function(){var b=false,a;
while(!b&&this._currentQueue.length>0){a=this._currentQueue.shift();
b=a.component.rewriteURL(this._context.clip)
}this._context.found=b?true:this._context.found;
return this._context.found
},registerURLPlugIn:function(b,c,a){a=parseInt(a);
this.plugins.push({component:b,urlType:c,priority:(isNaN(a)?1000:a)});
this.totalUrlPluginsRegistered++;
this.plugins.sort(this.compare)
},setClip:function(a){if(this._currentQueue.length===0){if(!this._context.complete){this._context.clip=a;
this._context.callback(a);
this._context.complete=true
}}else{this._context.clip=a;
if(!this._processNextPlugin()){this.setClip(a)
}}},compare:function(d,c){return d.priority-c.priority
}});
function tpGetPreferredFormat(){var b="MPEG4";
var a=document.createElement("video");
if(!a.canPlayType){b="FLV"
}else{if(a.canPlayType("video/mp4")){b="MPEG4"
}else{if(a.canPlayType("video/ogg")){b="Ogg"
}}}return b
}function tpIsAndroid(){if(navigator.userAgent.match(/iPhone/i)){return false
}else{if(navigator.userAgent.match(/Android/i)){return true
}else{return false
}}}function tpIsWindowsPhone(){if(navigator.userAgent.toLowerCase().indexOf("windows phone")!=-1){return true
}else{return false
}}function tpIsChrome(){if(navigator.userAgent.toLowerCase().match(/chrome/i)){return true
}else{return false
}}function tpIsAndroidLegacy(){if(!navigator.userAgent.match(/Android/i)){return false
}else{if(navigator.userAgent.toLowerCase().indexOf("android 1.")!=-1){return true
}else{if(navigator.userAgent.toLowerCase().indexOf("android 2.")!=-1){return true
}else{if(navigator.userAgent.toLowerCase().indexOf("android 3.0")!=-1){return true
}else{if(navigator.userAgent.toLowerCase().indexOf("silk")!=-1){return true
}else{return false
}}}}}}function tpIsIOS(){if(navigator.userAgent.match(/iPad/i)){return true
}if(navigator.userAgent.match(/iPhone/i)){return true
}else{return false
}}function tpIsIPhone(){if(navigator.userAgent.match(/iPhone/i)){return true
}else{return false
}}function tpIsIOS4(){if(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/4_/i)){return true
}else{return false
}}function tpGetPid(b){var c=b;
if(c&&c.indexOf("pid=")==-1){c=c.substring(c.lastIndexOf("/")+1);
var a=c.indexOf("?");
if(a>0){c=c.substring(0,a)
}}else{if(c){c=c.substring(c.indexOf("pid=")+4);
var a=c.indexOf("&");
if(a>0){c=c.substring(0,a)
}}}return c
}function tpGetInstanceID(){if(window.tpInstanceID!==undefined){return tpInstanceID
}else{return""
}}function tpIsRegistered(b){for(var a=0;
a<registeredIDs.length;
a++){if(registeredIDs[a]==b){return true
}}return false
}function tpHasReleaseList(){if($pdk!==undefined){var b=$pdk.shell.Registry.getInstance().getShells().toArray();
for(var a=0;
a<b.length;
a++){if(b[a].getName()==="ReleaseList"){return true
}}}if(tpIsRegistered("releaselist")){return true
}return false
}tpControllerClass=$pdk.queue.Controller;
function tpScaleImage(c,g,h){var a=parseInt(c.naturalWidth);
var i=parseInt(c.naturalHeight);
var b=i/a;
c.originalHeight=i;
c.originalWidth=i;
var f=h/g;
var e=g/a;
var d=h/i;
if((e-d)>0){c.height=(h);
c.style.width="auto";
c.newHeight=h;
c.newWidth=h/b
}else{if((e-d)<0){c.width=(g);
c.style.height="auto";
c.newWidth=g;
c.newHeight=g*b
}else{c.height=h;
c.width=g;
c.newHeight=h;
c.newWidth=g
}}}function tpIsChrome(){return(navigator.userAgent.toLowerCase().indexOf("chrome")>-1)
}function tpIsWebKit(){return(navigator.userAgent.toLowerCase().indexOf("webkit")>-1)
}function tpIsSafari(){return(navigator.userAgent.toLowerCase().indexOf("safari")>-1)
}function tpIsFirefox(){return(navigator.userAgent.toLowerCase().indexOf("firefox")>-1)
}function tpGetRectangle(c){var d=document.getElementById(c);
var b=d.offsetLeft;
var f=d.offsetTop;
var e=d.offsetWidth;
var a=d.offsetHeight;
return new Rectangle(b,f,e,a)
}function tpGetYRelativeTo(c,a){var b=0;
if(c==a){return 0
}else{if(c.offsetParent){b=c.offsetLeft+tpGetXRelativeTo(c.offsetParent,a);
return b
}else{tpDebug(a.id+" is not an ancestor of "+c.id);
return 0
}}}function tpGetXRelativeTo(c,a){var b=0;
if(c==a){return 0
}else{if(c.offsetParent){b=c.offsetLeft+tpGetXRelativeTo(c.offsetParent,a);
return b
}else{tpDebug(a.id+" is not an ancestor of "+c.id);
return 0
}}}function tpGetXYRelativeTo(d,b){var a=new Point(0,0);
if(d==b){return a
}else{if(d.offsetParent){var c=tpGetXYRelativeTo(d.offsetParent,b);
a.x=d.offsetLeft+c.x;
a.y=d.offsetTop+c.y;
return a
}else{throw new Error(b.id+" is not an ancestor of "+d.id)
}}}function tpLocalToGlobal(a){return tpGetXYRelativeTo(a,document.body)
}function tpGetElementById(a){return document.getElementById(a)
}function tpParseXml(b){var a=null;
if(window.DOMParser){var c=new DOMParser();
a=c.parseFromString(b,"text/xml")
}else{a=new ActiveXObject("Microsoft.XMLDOM");
a.async="false";
a.loadXML(b)
}tpRemoveWhiteSpace(a);
return a
}function tpRemoveWhiteSpace(b){var a=/\S/;
for(var c=0;
c<b.childNodes.length;
c++){var d=b.childNodes[c];
if(d.nodeType==3&&(!(a.test(d.nodeValue)))){b.removeChild(d);
c--
}else{if(d.nodeType==1){tpRemoveWhiteSpace(d)
}}}}function tpTimeToMillis(d){var a=0;
if(d){if(d.indexOf("ms")>0){a=d.substr(0,d.indexOf("ms"))
}else{var c=d.split(":");
while(c.length>0){var b=c.shift();
if(c.length==2){a+=((b)*1000*60*60)
}if(c.length==1){a+=((b)*1000*60)
}if(c.length==0){if(b.indexOf(".")){a+=((b)*1000)
}else{a+=(b)*1000
}}}}}return a
}function tpSendUrl(a){var b=document.createElement("img");
b.src=a;
b.style.display="none";
b.width=1;
b.height=1;
b.left=-1111;
b.src=a;
document.body.appendChild(b);
tpDebug("sent tracking/impressiong to  "+a);
document.body.removeChild(b)
}function tpGetIEVersion(){var c=9999;
if(navigator.appName=="Microsoft Internet Explorer"){var a=navigator.userAgent;
var b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
if(b.exec(a)!=null){c=parseFloat(RegExp.$1)
}}return c
}function tpGetComponentSize(b){var c=false;
var d=b.style.height;
var a=b.style.width;
if(d==="100%"&&b.style.width==="100%"||(!d&&!a)){c=true
}if(c&&b.parentNode&&(b.offsetHeight==0&&b.offsetWidth==0)){return tpGetComponentSize(b.parentNode)
}else{if(!c){d=d.replace("px","");
a=a.replace("px","");
return{width:parseInt(a),height:parseInt(d)}
}}return{width:b.offsetWidth,height:b.offsetHeight}
}function tpGetComponentSize(b){var c=false;
var d=b.style.height;
var a=b.style.width;
if(d==="100%"&&b.style.width==="100%"||(!d&&!a)){c=true
}if(c&&b.parentNode&&(b.offsetHeight==0&&b.offsetWidth==0)){return tpGetComponentSize(b.parentNode)
}else{if(!c){d=d.replace("px","");
a=a.replace("px","");
return{width:parseInt(a),height:parseInt(d)}
}}return{width:b.offsetWidth,height:b.offsetHeight}
}function tpGetScriptPath(b){if(b===undefined&&tpScriptPath!==undefined){return tpScriptPath
}var a=document.getElementsByTagName("script");
var d;
if(b!==undefined){for(var c=0;
c<a.length;
c++){if(a[c].src.indexOf(b)>=0){d=a[c].src;
break
}}}else{d=a[a.length-1].src
}if(!d){d=a[a.length-1].src
}if(d.indexOf("/")==-1){return""
}d=d.substring(0,d.lastIndexOf("/"));
return d
}function tpMillisToStr(d){var c=d/1000;
var a=Math.floor(c/(60*60));
c=c-(a*(60*60));
var b=Math.floor(c/60);
var e=Math.floor(c)%60;
var f="";
if(a>0){f=a.toString()+":";
if(b<10){f+="0"
}}f+=b+":";
if(e<10){f+="0"
}f+=e.toString();
return f
}function tpEllipsis(h,m){var a=false;
var c=0;
var g=m.innerHTML;
var e=m.innerHTML.length;
var k=m.innerHTML.length;
var d=0;
var b=h.clientHeight>=h.scrollHeight;
var l;
var f;
while(!b){l=$pdk.jQuery(h).height();
f=h.scrollHeight;
if(tpIsFirefox()){f=0;
$pdk.jQuery(h).children().each(function(n){f+=$pdk.jQuery(h).children().eq(n).outerHeight()
})
}if((k-d)<=1){if(f>l){m.innerHTML="";
a=false
}b=true
}else{if(l>=f){d=e;
e=Math.floor((e+k)/2);
m.innerHTML=g.substr(0,e)+"&hellip;";
a=g.substr(e-1,2).match(/^[a-zA-Z]+$/)
}else{if(l<f){k=e;
e=Math.floor((e+d)/2);
m.innerHTML=g.substr(0,e)+"&hellip;";
a=g.substr(e-1,2).match(/^[a-zA-Z]+$/)
}}}c++;
if(c>100){break
}}if(m.innerHTML.substr(0,e).match(/[\W]+$/)){m.innerHTML=m.innerHTML.substr(0,e).replace(/[\W]+$/g,"")+"&hellip;"
}if(a){m.innerHTML=g.substr(0,e);
m.innerHTML=m.innerHTML.replace(/[\W]+[\w]+$/g,"");
m.innerHTML+="&hellip;"
}}function tpCreateColorizedStateStyles(h,o,k,f,i,b,m){var c=document.createElement("canvas");
var l=this;
if(c.getContext&&c.getContext("2d")){var g=$pdk.jQuery(h).css("background-image");
var d="";
if(g&&g!=="none"){if(g.indexOf('url("')==0||g.indexOf("url('")==0){g=g.substr(5,g.length-7)
}else{if(g.indexOf("url(")==0){g=g.substr(4,g.length-5)
}}var e=new Image();
e.onload=function(){var r=document.createElement("canvas");
var p=r.getContext("2d");
r.style.borderColor="#"+i.substr(2);
var q=$pdk.jQuery(r).css("border-color");
q=q.substr(4,q.length-5).split(", ");
r.width=this.width;
r.height=this.height;
p.drawImage(this,0,0,this.width,this.height);
tpColorize(p,q[0],q[1],q[2]);
d=o.replace(/\{url\}/g,"url("+r.toDataURL()+")").replace(/\{state\}/g,":hover");
if(b.styleSheet){b.styleSheet.cssText=d+b.styleSheet.cssText
}else{b.insertBefore(document.createTextNode(d),b.firstChild)
}};
e.src=g;
var n=new Image();
n.onload=function(){var r=document.createElement("canvas");
var p=r.getContext("2d");
r.style.borderColor="#"+f.substr(2);
var q=$pdk.jQuery(r).css("border-color");
q=q.substr(4,q.length-5).split(", ");
r.width=this.width;
r.height=this.height;
p.drawImage(this,0,0,this.width,this.height);
tpColorize(p,q[0],q[1],q[2]);
d=o.replace(/\{url\}/g,"url("+r.toDataURL()+")").replace(/\{state\}/g,(m?m:":active"));
if(b.styleSheet){b.styleSheet.cssText+=d
}else{b.appendChild(document.createTextNode(d))
}};
n.src=g;
var a=new Image();
a.onload=function(){var r=document.createElement("canvas");
var p=r.getContext("2d");
r.style.borderColor="#"+k.substr(2);
var q=$pdk.jQuery(r).css("border-color");
q=q.substr(4,q.length-5).split(", ");
r.width=this.width;
r.height=this.height;
p.drawImage(this,0,0,this.width,this.height);
tpColorize(p,q[0],q[1],q[2]);
d=o.replace(/\{url\}/g,"url("+r.toDataURL()+")").replace(/\{state\}/g,"");
if(b.styleSheet){b.styleSheet.cssText+=d
}else{b.appendChild(document.createTextNode(d))
}};
a.src=g
}}}function tpColorize(a,f,q,z){var D={r:f,g:q,b:z};
function k(I,H,G){var I=I/360,H=H/100,G=G/100,K,J,i;
if(H==0){K=J=i=G
}else{m=I*6;
l=Math.floor(m);
y=G*(1-H);
x=G*(1-H*(m-l));
u=G*(1-H*(1-(m-l)));
if(l==0){K=G;
J=u;
i=y
}else{if(l==1){K=x;
J=G;
i=y
}else{if(l==2){K=y;
J=G;
i=u
}else{if(l==3){K=y;
J=x;
i=G
}else{if(l==4){K=u;
J=y;
i=G
}else{K=G;
J=y;
i=x
}}}}}}return{r:Math.round(K*255),g:Math.round(J*255),b:Math.round(i*255)}
}function e(h,G,H){h=h/255;
G=G/255;
H=H/255;
var K=Math.min(h,G,H),L=Math.max(h,G,H),J=L-K,s={};
s.v=L;
if(J==0){s.h=0;
s.s=0
}else{s.s=J/L;
var I=(((L-h)/6)+(J/2))/J;
var i=(((L-G)/6)+(J/2))/J;
var v=(((L-H)/6)+(J/2))/J;
if(h==L){s.h=v-i
}else{if(G==L){s.h=(1/3)+I-v
}else{if(H==L){s.h=(2/3)+i-I
}}}if(s.h<0){s.h+=1
}if(s.h>1){s.h-=1
}}return{h:(s.h*360),s:(s.s*100),v:(s.v*100)}
}var p;
if(a.hasOwnProperty("canvas")||a.canvas){p=a
}if(a.hasOwnProperty("width")||a.width){p=a.getContext("2d")
}if(!p){console.error("Trying to colorize non-canvas");
return
}var o=p.getImageData(0,0,p.canvas.width,p.canvas.height);
var F=e(D.r,D.g,D.b);
var B=F.h/360;
var t=F.s/100;
var m=B*6;
var l=Math.floor(m);
var c=F.v*2.55;
for(var A=0;
A<o.data.length;
A+=4){if(o[A+3]==0){continue
}var n=Math.max(o.data[A]/2.55,o.data[A+1]/2.55,o.data[A+2]/2.55);
var d=n/100,w,C,E;
if(t==0){w=C=E=d
}else{var y=d*(1-t);
if(l==0||l==2||l==4){var u=d*(1-t*(1-(m-l)));
if(l==0){w=d;
C=u;
E=y
}else{if(l==2){w=y;
C=d;
E=u
}else{if(l==4){w=u;
C=y;
E=d
}}}}else{var x=d*(1-t*(m-l));
if(l==1){w=x;
C=d;
E=y
}else{if(l==3){w=y;
C=x;
E=d
}else{w=d;
C=y;
E=x
}}}}o.data[A]=w*(c);
o.data[A+1]=C*(c);
o.data[A+2]=E*(c)
}p.putImageData(o,0,0)
}var tpScriptPath;
if(window["$pdk"]===undefined){tpScriptPath=tpGetScriptPath()
}else{tpScriptPath=$pdk.scriptRoot+"/js"
}XMLLoader=Class.extend({init:function(a){this._requestContentType=a
},load:function(a,h,c){var g;
if(typeof XDomainRequest!=="undefined"&&a.indexOf(document.domain)<0){g=true
}if(typeof XMLHttpRequest==="undefined"){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")
}catch(k){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")
}catch(k){}try{return new ActiveXObject("Msxml2.XMLHTTP")
}catch(k){}throw new Error("This browser does not support XMLHttpRequest.")
}
}var i;
if(g){i=new XDomainRequest();
if(typeof(f._requestContentType)==="string"){i.setRequestHeader("Content-Type",this._requestContentType)
}}else{i=new XMLHttpRequest()
}var f=this;
var d=false;
var e=function(k){d=true;
tpDebug("Error getting SMIL");
c(k)
};
var b=function(){if(this.readyState===4&&this.status===200&&!d){d=true;
var k=i.responseXML;
if(k==null||typeof(k)!=="string"){k=i.responseText
}if(typeof(h)==="function"){h(k)
}}else{if(this.readyState===4&&this.status===404&&!d){d=true;
e()
}else{if(g&&!d){d=true;
if(typeof(h)==="function"){tpDebug("Got SMIL");
h(i.responseText);
tpDebug("Called SMIL callback")
}}}}};
i.onreadystatechange=b;
i.onload=b;
i.onerror=e;
i.ontimeout=e;
setTimeout(function(){try{tpDebug("Trying to download SMIL from "+a);
i.open("GET",a);
i.send();
setTimeout(function(){if(!d){if(typeof(c)==="function"){c()
}}},5000)
}catch(k){tpDebug(k.message);
if(typeof(c)==="function"){c(k)
}}},1)
}});
Positioning=new (Class.extend({init:function(){this.TOP_RIGHT="topRight";
this.TOP_LEFT="topLeft";
this.ABOVE="above";
this.LEFT="left";
this.RIGHT="right";
this.BELOW="below";
this.AUTO_VERTICAL="autoVertical";
this.AUTO_HORIZONTAL="autoHorizontal";
this.VERTICAL="vertical";
this.HORIZONTAL="horizontal";
this.BOTTOM_RIGHT="bottomRight";
this.BOTTOM_LEFT="bottomLeft";
this.AUTO="auto";
this.MANUAL="manual"
},applyPad:function(d,a){var c=d.clone();
for(var b=0;
b<a.length;
b++){var e=a[b];
c.x()+=e.left;
c.y()+=e.top;
c.right()-=e.right+e.left;
c.bottom()-=e.bottom+e.top
}return c
},getBounds:function(a,d){var b=tpGetXYRelativeTo(a,d);
var c=new Point(a.offsetWidth,a.offsetHeight);
var e=new Rectangle();
e.x(b.x);
e.y(b.y);
e.width(a.offsetWidth);
e.height(a.offsetHeight);
return e
},alignBottom:function(d,c,b){var a=(c.width()-d.width())/2;
var e=this.BELOW;
if(d.x()-a<0){e=this.BOTTOM_RIGHT
}else{if((d.x()+d.width()+a)>b.width()){e=this.BOTTOM_LEFT
}}return e
},alignTop:function(d,c,b){var a=(c.width()-d.width())/2;
var e=this.ABOVE;
if(d.x()-a<0){e=this.TOP_RIGHT
}else{if((d.x()+d.width()+a)>b.width()){e=this.TOP_LEFT
}}return e
},calculatePopUpAlignment:function(d,c,b,a,e){if(e==this.AUTO_VERTICAL){if(d.x()<=b.width()/2){e=this.RIGHT
}else{e=this.LEFT
}}else{if(e==this.AUTO_HORIZONTAL){if(d.y()<=b.height()/2){e=this.alignBottom(d,c,b)
}else{e=this.alignTop(d,c,b)
}}else{if(e==this.ABOVE){e=this.alignTop(d,c,b)
}else{if(e==this.BELOW){e=this.alignBottom(d,c,b)
}}}}return e
},calculatePopUpLocation:function(f,d,i,e,a,g){if(!e){e=this.AUTO_HORIZONTAL
}e=this.calculatePopUpAlignment(f,d,i,false,e);
var c="below";
var b="right";
switch(e){case this.TOP_LEFT:d.x(f.x()-d.width()+f.width());
d.y(f.y()-d.height()-4);
c="above";
break;
case this.ABOVE:d.x(f.x()-(d.width()/2)+(f.width()/2));
d.y(f.y()-d.height()-4);
c="above";
break;
case this.BELOW:d.x(f.x()-(d.width()/2)+(f.width()/2));
d.y(f.y()+f.height()+3);
break;
case this.TOP_RIGHT:d.x(f.x());
d.y(f.y()-d.height()-4);
c="above";
break;
case this.LEFT:d.x(f.x()-d.width());
d.y(f.y()+(f.height()/2)-(d.height()/2));
break;
case this.RIGHT:d.x(f.x()+f.width());
d.y(f.y()+(f.height()/2)-(d.height()/2));
break;
case this.BOTTOM_LEFT:d.x(f.x()-d.width()+f.width());
d.y(f.y()+f.height()+3);
break;
case this.BOTTOM_RIGHT:d.x(f.x());
d.y(f.y()+f.height()+3);
break;
case this.MANUAL:if(a==null){throw new Error("if the alignment is set to MANUAL you must provide a point")
}d.x(a.x());
d.y(a.y());
break
}var h=new Point(d.x(),d.y());
h.verticalalign=c;
return h
}}));
if(window.tpPhase1PDKLoaded){if(window.tpDoInitGwtCommManager){tpDoInitGwtCommManager()
}tpPhase1PDKLoaded()
};