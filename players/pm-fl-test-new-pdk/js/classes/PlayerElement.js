
    /*
    * PLAYER
    */
var PlayerElement = function(playerId, playerContainer) {

	var element;
	var pdkPlayer;
	var overlay;
	var playerContainer;
	var container;
    var innerPicture;
    var viewMode;
    var status;
    var playerMenu;
    var uniqueView;

	this.init = function(playerId, playerContainer){
		this.createPlayer(playerId, playerContainer);
		this.pdkPlayer = new Player(playerId);            
        this.initEvents();
        this.subscribeEvents();
		this.playerContainer = playerContainer;
        this.uniqueView = false;
        this.container.draggable({
            cursor: "crosshair", 
            containment: "parent", 
            start: function(){
                $(this).find(".player-overlay").addClass('noclick');
                $(this).css({"right" : "auto", "top" :"auto"});
            }
        });  
        this.container.draggable("disable");
        this.viewMode = "hide";
        this.status = new PlayerStatus();
        this.playerMenu = new PlayerMenu(this);
	}

	this.split4 = function(){
        this.changeMode("split4", null, 50, 50, false);
	}

	this.split2 = function(){
        this.changeMode("split2", null, 80, 50, false);
	}

    this.hideTemp = function(){
        this.changeMode("hide", null, 0, 0, false, true);
        this.pause(true);
    }

	this.full = function(){
        this.changeMode("full", null, 100, 100, false);
	}

    this.fullTemp = function(){
        this.uniqueView = true;
        this.changeMode("full", null, 100, 100, false, true);        
    }

    this.fullWithPicture = function(picture){
        this.changeMode("full", picture, 100, 100, false);
    }

	this.picture = function(){
        this.changeMode("picture", null, 30, 30, true);
        this.container.css("right", 0);
        this.container.css("left", "auto");
	} 

    this.changeMode = function(modeName, picture, width, height, draggable, temp){
        if (temp === undefined) temp = false;
        this.innerPicture = picture;
        this.show();
        this.resetMode();            
        if(!temp){
            this.viewMode = modeName;
        }   
        if(modeName == "full" && temp){
            this.uniqueView = true;
        }            
        this.container.addClass("container-" + modeName);
        this.container.animate({"width": width+"%", "height": height + "%"});
        if(draggable){
            this.container.draggable("enable");                     
        } else{
            this.container.draggable("disable");                     
        }
        this.playerMenu.refreshButtons();
    }

    this.resetMode = function(){
        this.container.removeClass("container-split2");
        this.container.removeClass("container-split4");
        this.container.removeClass("container-picture");
        this.container.removeClass("container-full");
        this.container.removeClass("container-unique");
        this.container.removeClass("container-hide");
        this.container.css("top", 0);
        this.container.css("left", 0);
        this.uniqueView = false;
    }

    this.hide = function(){
        this.changeMode("hide", null, 0, 0, false, false);        
        this.stop();
    }

    this.show = function(){
        this.container.css('display', 'block');
    }

    this.mute = function(){
        $pdk.controller.mute(true,  [this.getId()]);
    }

    this.pause = function(temp){
        $pdk.controller.pause(true,  [this.getId()]);
        if (temp === undefined) temp = false;
        if(!temp){
            this.status.pause();
        }
    }

    this.stop = function(){
        $pdk.controller.resetPlayer([this.getId()]);
        this.overlay.css("opacity", "1");
    }

    this.setVolume = function(newVolume){ 
        $pdk.controller.setVolume(newVolume,  [this.getId()]);
    }

    function showFullScreen(element) {
        if (fullScreenApi.supportsFullScreen) {			
				fullScreenApi.requestFullScreen(element);
		}			
    }


    this.play = function(temp){
        this.status.play();
        $pdk.controller.pause(false, [this.getId()]);
    }

    this.playFromDrag = function(data){    
        var url =  data.ui.draggable.attr('href'); 
        if(data.playerId == this.getId() && (url != null)){
            if(this.innerPicture != null && this.overPicture(data.ui)){
                this.innerPicture.playVideo(url);
            }
            else{
                this.playVideo(url);
            }
        }
    }

    this.playFromClick = function(data){
        var url =  data.link.attr('href');
        if(this.status.current){ 
            this.playVideo(url);    
        }
    }

    this.playVideo = function(url){
        this.overlay.css("opacity", "0");
		this.status.url = url;
        this.status.play();
        $pdk.controller.setReleaseURL(url, true,  [this.getId()]);
		this.markCurrentVideo();
    }

    this.unmute = function(data){
        if(data.playerId == this.getId()){
            $pdk.controller.mute(false,  [this.getId()]);
        }
    }

    this.resetStatus = function(){
        this.container.removeClass("container-full-screen");
        this.uniqueView = false;
        if(this.viewMode == 'full' || this.viewMode == 'picture' || this.viewMode == 'split2' || this.viewMode == 'split4' || this.viewMode == 'hide' ){                
            var funcObj = this[this.viewMode];
            funcObj.apply(this);
        }
        if(this.status.isPlaying()){
            this.play();
        }
    }

	this.createPlayer = function(playerId, container){
		var containerId = "container-" + playerId;
		var source   = $("#player-template").html();
		var template = Handlebars.compile(source);
		var context = {playerId: playerId, containerId: containerId};
		var html = template(context);
			container.append(html);
			this.container = $("#" + containerId);
			this.element = this.container.find(".tpPlayer");
			this.overlay = this.container.find(".player-overlay");
	}

    this.drop = function(event, ui){    
        var playerId =  $(this).attr("rel");
        amplify.publish("playPlayer", {"ui" : ui, "playerId" : playerId});
    }

    this.initEvents = function(){
        this.container.droppable( {drop: this.drop});
        this.overlay.click(this.click);
        this.container.mouseover({"player" : this},this.showMenu);
        this.container.mouseout({"player" : this},this.hideMenu);
        this.overlay.dblclick({"player" : this},this.dblclick);
    }

    this.dblclick = function(event){
        event.data.player.playerMenu.uniqueButton.click();
    }

    this.showMenu = function(event){
        var player =event.data.player;
        if((player.viewMode != 'full') && (!player.container.hasClass("container-full-screen"))){ 
            player.playerMenu.show();
        }
    }

    this.hideMenu = function(event){
        event.data.player.playerMenu.hide();
    }

    this.click = function(){   
        if ($(this).hasClass('noclick')) {
            $(this).removeClass('noclick');
        }
        else{
            var playerId =  $(this).attr("rel");
            amplify.publish("muteAll");
            amplify.publish("unmute", {playerId : playerId});
            amplify.publish("current", {playerId : playerId});
        }
    }

    this.showFullScreen = function(event){    
        var elem = document.getElementById(this.container.attr('id'));
        this.container.addClass("container-full-screen");
        this.container.css("width","100%");
        this.container.css("height","100%");
        showFullScreen(elem);
        //$pdk.controller.showFullScreen(true,  [this.getId()]);
    }

    this.current = function(){
        var playerId =  this.getId();
        amplify.publish("muteAll");
        amplify.publish("unmute", {playerId : playerId});
        amplify.publish("current", {playerId : playerId});
    }

    this.subscribeEvents = function(){
        amplify.subscribe("playPlayer", this, this.playFromDrag);
        amplify.subscribe("playFromClick", this, this.playFromClick);
        amplify.subscribe("muteAll", this, this.mute);
        amplify.subscribe("unmute", this, this.unmute);
        amplify.subscribe("resetSizes", this, this.resetStatus);
        amplify.subscribe("current", this, this.changeCurrent);
        amplify.subscribe("mediaStart", this, this.setBitrates);        
    }

    this.setBitrates = function(data){
        var playerId = data.playerId;
        if(playerId == this.getId()){
            var bitrates = [];

            var files = data.possibleFiles;
            if(files != null){
                $.each(files, function(i, file){
                    bitrates.push(file.bitrate);
                });
            } 
            this.status.setPosibleBitrares(bitrates);
            if(data.currentFile != null){
                this.status.currentBitrate = data.currentFile.bitrate;
            }
            else{
                this.status.currentBitrate = null;   
            }
            amplify.publish("bitratesLoaded", {"playerId" : playerId});
        }
    }

    this.changeCurrent = function(data){
        if(this.getId() == data.playerId){
            this.container.addClass("current");
            this.status.current = true;
        }
        else{
            this.container.removeClass("current");
            this.status.current = false;
        }
    }

    this.overPicture = function(ui){
        var draggable = ui.draggable;
        var top = this.innerPicture.container.position().top;
        var bottom = this.innerPicture.container.height() + top;
        var position = ui.offset.top;   
        return position < bottom && position > top;
    }

	this.getId = function(){
		return this.element.attr("id");
	}

	this.markCurrentVideo = function(){        
        if(this.status.current){
        var url =  this.status.url;

        $(".feeds-container a").removeClass("active");
        var item = $(".feeds-container").find("[href='" + url +"']");
        item.addClass("active");
        }
    }
	
	this.init(playerId, playerContainer);
	
}
