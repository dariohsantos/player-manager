/*
* Right Control 
* view modes and release list
*/

var RightController = function(config) {

	var closeButton;
	var viewModes;
	var element;
	var feedsContainer;     	

	this.showVerTab = function(){
		this.element.animate({"width": "auto"});
		this.element.show();		
	}

	this.close = function(){
		this.element.hide();
	}

	this.subscribeEvents = function(){
		this.closeButton.click(function(){amplify.publish("closeApp")});
		amplify.subscribe("showVerTab", this, this.showVerTab);
		amplify.subscribe("closeApp", this, this.close);
	}

	this.init = function(config){		
		this.element = $("#app");
		this.closeButton = this.element.find("#close");
		this.subscribeEvents();		
		this.viewModes = new ViewModes(config);		
		this.feedsContainer = new FeedsContainer(config);				
	}
	this.init(config);
}
