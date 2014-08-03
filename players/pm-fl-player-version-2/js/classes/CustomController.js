 /*
* Multiple Controller
*/
var CustomController = function(layout) {

    var element;
    var pauseButton;
    var playButton;
    var volume;
    var fullButton;
    var bitrateButton;
    var bitrateGroup;
    var layout;
    var currentPlayer;
    var isFullScreen;

    this.init = function(layout){
        this.layout = layout;
        var source   = $("#custom-controller-template").html();
        var template = Handlebars.compile(source);
        var html = template();
        this.isFullScreen = false;        
        this.layout.element.parent().append(html);
        this.initElements();
        this.initEvents();
    }

    this.initElements = function(){
        this.element = $("#custom-controller");
        this.pauseButton = this.element.find(".pause");
        this.playButton = this.element.find(".play");
        this.fullButton = this.element.find(".full");
        this.bitrateButton = this.element.find(".bitrate");
        this.bitrateGroup = this.element.find(".bitrate-group");
        this.playButton.hide();
        this.volume = new SliderVolume(this);
        this.checkFullScreenSupport();
    }

    this.checkFullScreenSupport = function(){
        if(!window.fullScreenApi.supportsFullScreen){
            this.fullButton.hide();
        }   
    }

    this.initEvents = function(){
        this.pauseButton.click({"controller" : this}, this.pause);
        this.playButton.click({"controller" : this}, this.play);
        this.fullButton.click({"controller" : this}, this.fullScreen);
        this.bitrateButton.click({"controller" : this}, this.nextBitrate);
        amplify.subscribe("bitratesLoaded", this, this.initBitrates);
        amplify.subscribe("streamSwitched", this, this.streamSwitched);
        this.linkCancelFullScreen();
    }

    this.initBitrates = function(data){
        if(data.playerId == this.currentPlayer.getId()){
            this.setBitrateFromStatus();
        }
    }

    this.streamSwitched = function(event){
        console.log(event.bitrate);
        var newBitrate = event.bitrate;
        this.currentPlayer.status.currentBitrate = newBitrate;        
        this.updateBandwidthPreferences();
        this.setBitrateFromStatus();
    }

    this.setBitrateFromStatus = function(){
        var currentBitrate = this.currentPlayer.status.currentBitrate;
        if(currentBitrate != null){
            var formatedBitrate = this.formatBitrate(this.currentPlayer.status.currentBitrate);
            this.bitrateButton.html(formatedBitrate);
            this.bitrateGroup.show();
        }
        else{
            this.bitrateGroup.hide();   
        }
    }

    this.nextBitrate = function(event){

        var controller = event.data.controller;
        controller.currentPlayer.status.nextBitrate();        
        controller.updateBandwidthPreferences();
        controller.setBitrateFromStatus();
    }

    this.updateBandwidthPreferences = function(){
        var bitrateRange = this.currentPlayer.status.getCurrentBitrateRange();
        var playerId =  this.currentPlayer.getId();
        $pdk.controller.setBandwidthPreferences(
            { 
                globalDataType:"com.theplatform.pdk.data::BandwidthPreferences", 
                minBitrate: bitrateRange.min, maxBitrate: bitrateRange.max
            }, 
            [playerId]
        );
    }

    this.formatBitrate = function(bitrate){
        return bitrate / 1000 + 'K';
    }

    this.pause = function(event){
        event.data.controller.currentPlayer.pause();
        event.data.controller.pauseButton.toggle();
        event.data.controller.playButton.toggle();
    }

    this.play = function(event){
        event.data.controller.currentPlayer.play();
        event.data.controller.pauseButton.toggle();
        event.data.controller.playButton.toggle();
    }


    this.fullScreen = function(event){
        event.data.controller.currentPlayer.showFullScreen();
    }

    this.linkCancelFullScreen = function(){
        $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange',{controller: this}, function(event){ 
            event.data.controller.isFullScreen = !event.data.controller.isFullScreen;
            if(!event.data.controller.isFullScreen){
                amplify.publish("resetSizes");
            }
        });
    }

    this.hide = function(){
        this.element.fadeOut();
    }

    this.show = function(){
        this.element.fadeIn();
    }

    this.setCurrentPlayer = function(player){
        this.currentPlayer = player;
        if(this.currentPlayer.status.isPlaying()){
            this.playButton.hide();
        }
        else{
            this.playButton.show();
        }
        if(this.currentPlayer.status.isPaused()){
            this.pauseButton.hide();
        }
        else{
            this.pauseButton.show();
        }
        this.setBitrateFromStatus();
        this.currentPlayer.setVolume(this.volume.volumeValue);           
        this.currentPlayer.markCurrentVideo();        
    }

    this.init(layout);
    
}