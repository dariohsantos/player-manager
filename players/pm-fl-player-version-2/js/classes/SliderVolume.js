 /*
* Multiple Controller
*/
var SliderVolume = function(controller) {

    var volumeButton;
    var volumeBar;
    var volumeControl;
    var volumeValue;
    var controller;
    var isMouseDown;
    var muteButton;
    var unmuteButton;
    var volumeBeforeMute;

    this.init = function(controller){
        this.isMouseDown = false;
    	this.controller = controller;
        this.volumeBar = controller.element.find(".volume .bar");
        this.volumeButton = controller.element.find(".volume .button");
        this.volumeControl = controller.element.find(".volume");
        this.muteButton = controller.element.find(".mute");
        this.unmuteButton = controller.element.find(".unmute");    
        this.unmuteButton.hide();
        this.volumeValue = 100;
        this.initVolume();        
		this.initEvents();
    }

    this.initEvents = function(){
    	this.volumeControl.click({"volumeSlider" : this}, this.volSeek);
        this.volumeControl.mousemove({"volumeSlider" : this}, this.mouseSlide);
        this.volumeControl.mousedown({"volumeSlider" : this}, this.mouseDown);
        this.volumeControl.mouseleave({"volumeSlider" : this}, this.mouseUp);
        this.volumeControl.mouseup({"volumeSlider" : this}, this.mouseUp);
        this.muteButton.click({"volumeSlider" : this}, this.mute);
        this.unmuteButton.click({"volumeSlider" : this}, this.unmute);
    }

    this.mouseDown = function(event){
    	event.preventDefault();
		event.data.volumeSlider.isMouseDown = true;
    }

    this.mouseUp = function(event){
    	event.preventDefault();
        event.data.volumeSlider.isMouseDown = false;
    }

    this.mouseSlide = function(event){
        event.preventDefault();
        var volumeSlider = event.data.volumeSlider;
        if(volumeSlider.isMouseDown){
            volumeSlider.volSeek(event);
        }
    }

    this.volSeek = function(event){

        var volumeSlider = event.data.volumeSlider;
        volumeSlider.unmute(event);
        var volumeBar = volumeSlider.volumeBar;
        var volume = volumeSlider.volumeControl;
        var volumeButton = volumeSlider.volumeButton;
        var x = event.pageX - volume.offset().left;
        var newVolume = x / volume.width() * 100;
        volumeBar.css({'max-width': volume.width()-volumeButton.width()})
        volumeBar.css({'width':x});
        volumeSlider.volumeValue = newVolume;
        volumeSlider.controller.currentPlayer.setVolume(newVolume);        
    }

    this.mute = function(event){
        var volumeSlider = event.data.volumeSlider;
        var volumeBar = volumeSlider.volumeBar;
        volumeSlider.volumeBeforeMute = volumeSlider.volumeValue;        
        volumeBar.css({'width':0});
        volumeSlider.volumeValue = 0;        
        volumeSlider.controller.currentPlayer.setVolume(0);     
        volumeSlider.muteButton.hide();   
        volumeSlider.unmuteButton.show();   
    }

    this.unmute = function(event){
        var volumeSlider = event.data.volumeSlider;
        var volumeBar = volumeSlider.volumeBar;                 
        volumeBar.css({'width':volumeSlider.volumeControl.width() * volumeSlider.volumeBeforeMute / 100});
        volumeSlider.volumeValue = volumeSlider.volumeBeforeMute;
        volumeSlider.controller.currentPlayer.setVolume(volumeSlider.volumeBeforeMute);        
        volumeSlider.unmuteButton.hide();
        volumeSlider.muteButton.show();   
    }

    this.initVolume = function(){
        amplify.publish("setVolume", {newVolume : this.volumeValue});        
    }

    this.init(controller);

}