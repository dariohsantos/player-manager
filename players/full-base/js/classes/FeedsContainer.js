/*
* Feeds Container
*/
var FeedsContainer = function(config) {

	var feeds;
	var feedsElement;
	var buttonsElement;
	var buttons;
	var resizer;

	this.init = function(config){
		this.feedsElement = $(".feeds-container");
		this.buttonsElement = $(".feed-buttons");
		this.feeds = new Array();
		this.buttons = new Array();

		this.initFeeds(config.feeds);
		this.initInfo(config.info);
		amplify.subscribe("feedLoaded", this, this.resize);
		this.resizer = new Resizer();
		
	}

	this.resize = function(){
		this.resizer.resizeFeeds();
	}

	this.initFeeds = function(feedsConfig){
		for(configKey in feedsConfig){
			var feedConfig = feedsConfig[configKey];			
			var button = this.initButton(feedConfig);
			this.buttonsElement.append(button);
			this.buttons[feedConfig.name] = button;

			var feed = new Feed(feedConfig); 
			this.feedsElement.append(feed.element);
			this.feeds[feedConfig.name] = feed;
			if(feedConfig.init){
				feed.element.show();
				button.addClass('active');
			}
		};	
	}

	this.initInfo = function(infoTabsConfig){
		for(infoKey in infoTabsConfig){
			var infoConfig = infoTabsConfig[infoKey];		
			var button = this.initButton(infoConfig);
			this.buttonsElement.append(button);
			this.buttons[infoConfig.name] = button;

			var info = new Info(infoConfig); 
			this.feedsElement.append(info.element);
			this.feeds[infoConfig.name] = info;
			if(infoConfig.init){
				info.element.show();
				button.addClass('active');
			}
		};	
	}

	this.initButton = function(feedConfig){
		var buttonNname = feedConfig.name;
        var button = this.createButton(buttonNname);       
        button.click({container : this, feedName : buttonNname}, this.changeFeedEvent);
        return button;
    }

    this.createButton = function(name){
       	var source   = $("#feed-button-template").html();
        var template = Handlebars.compile(source);
        var context = {feedName: name};
        var button = $(template(context));  
        return button; 
    }

    this.changeFeedEvent = function(event){
    	var container = event.data.container;
    	var feedName = event.data.feedName;
		container.hideFeeds();
		console.log(container.feeds);
        container.feeds[feedName].element.show();       
        container.buttons[feedName].addClass('active');        
    }

    this.hideFeeds = function(){    
		for(feedName in this.feeds){		
			this.feeds[feedName].element.hide();
			this.buttons[feedName].removeClass('active');
		}
	}

	this.init(config);

}