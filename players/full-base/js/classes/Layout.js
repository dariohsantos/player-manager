/*
* LAYOUT 
* container of app and players
*/
var Layout = function(config) {

	var player1;
	var player2;
	var player3;
	var player4;
    var playerMap;
    var customController;
	var element;
	var appOverlay;
    var currentPlayerId;
    var fullScreen = false;
    var pdkEventHandler;
    var playerContainer;
    var rightController;
    var graphicsManager;
    var versionManager;
    var tpContainer;
    var resizer;

    this.init = function(config){
        this.initSize(config.size);
        this.element = $("#playerLayout");                
        this.playerMap = new Object();
        this.appOverlay = new AppOverlay(this.element);
        this.playerContainer = this.element.find("#playerContainer");
        this.createPlayers();
        this.customController = new CustomController(this);
        this.subscribeEvents();
        this.initEvents();
        this.player1.current();        
        this.rightController = new RightController(config);   
        try{
           $pdk.initialize(); 
        } catch(err){
            console.log("Error intializing");
        }
        this.pdkEventHandler = new PdkEventHandler();

        if(config.showRightController){         
            amplify.publish( "showVerTab" );
        } 
        this.resizer = new Resizer();
        this.resizer.resizeAll();         
        this.graphicsManager = new GraphicsManager(config);
        this.versionManager = new VersionManager(config.version);      
    }  

    this.initSize = function(sizeConfig){
        this.tpContainer = $(".tpContainer");
        this.tpContainer.width(sizeConfig.width);
        this.tpContainer.height(sizeConfig.height);
    }

    this.createPlayers = function(){
        this.player1 = this.createPlayer("player1");
        this.playerMap[this.player1.getId()] = this.player1;
        this.player2 = this.createPlayer("player2");
        this.playerMap[this.player2.getId()] = this.player2;
        this.player3 = this.createPlayer("player3");
        this.playerMap[this.player3.getId()] = this.player3;
        this.player4 = this.createPlayer("player4");
        this.playerMap[this.player4.getId()] = this.player4;
    }

    this.createPlayer = function(playerId){
        return new PlayerElement(playerId, this.playerContainer);
    }

    this.reduceWidth = function(){
    	this.animate({"width": "70%"});
    }

    this.fullWidth = function(){
    	this.animate({"width": "100%"});
    }

    this.split4 = function(){
    	this.player1.split4();
    	this.player2.split4();
    	this.player3.split4();
    	this.player4.split4();        
    }

    this.split2 = function(){
    	this.player1.split2();
    	this.player2.split2();
    	this.player3.hide();
    	this.player4.hide();
        if(this.currentPlayerId == this.player3.getId() || this.currentPlayerId == this.player4.getId()){
            this.player1.current();
        }        
    }

    this.full = function(){
    	this.player1.full();
    	this.player2.hide();
    	this.player3.hide();
    	this.player4.hide();
        if( this.currentPlayerId != this.player1.getId()){
            this.player1.current();
        }
    }


    this.picture = function(){
    	this.player1.fullWithPicture(this.player2);
    	this.player2.picture();
    	this.player3.hide();
    	this.player4.hide();
        if(this.currentPlayerId == this.player3.getId() || this.currentPlayerId == this.player4.getId()){
            this.player1.current();
        }        
    }

    this.switchPicturePlayer = function(){
        var aux = this.player1;
        this.player1 = this.player2;
        this.player2 = aux;
        this.picture();        
    }

    this.unique = function(data){
        $.each(this.playerMap, function (playerId, player) {
            if(data.playerId == playerId){
                player.fullTemp();
            }
            else{
                player.hideTemp();
            }
        });  
    }

    this.checkCurrent = function(data){
        if(this.currentPlayerId != null && this.currentPlayerId != data.playerId){
            $pdk.controller.mute(true, [data.playerId]);
        }
        else{
            this.currentPlayerId = data.playerId;
        }
    }

    this.subscribeEvents = function(){
    	amplify.subscribe( "showVerTab", this.element, this.reduceWidth);
    	amplify.subscribe("closeApp", this.element, this.fullWidth);
    	amplify.subscribe("change-view-split4", this, this.split4);
    	amplify.subscribe("change-view-split2", this, this.split2);
    	amplify.subscribe("change-view-full", this, this.full);
    	amplify.subscribe("change-view-picture", this, this.picture);
        amplify.subscribe("current", this, this.setCurrentPlayer);
        amplify.subscribe("playPlayer", this, this.checkCurrent);
        amplify.subscribe("releaseListLoaded", this, this.playRelease);
        amplify.subscribe("switchPicturePlayer", this, this.switchPicturePlayer);            
        amplify.subscribe("unique", this, this.unique);  
    }

    this.setCurrentPlayer = function(data){        
        this.currentPlayerId = data.playerId;        
        this.customController.setCurrentPlayer(this.playerMap[this.currentPlayerId]);
    }

    this.playRelease = function(data){
        var player = this.playerMap[data.player];
        if(player.viewMode != "hide"){            
            player.playVideo(data.videoUrl);        
        }
    }  	

    this.initEvents = function(){
        $(window).bind("fullscreen-off", this.fullScreenOff);
    }

    this.fullScreenOff = function (e) {
        amplify.publish("resetSizes");
    };

    this.init(config); 
};