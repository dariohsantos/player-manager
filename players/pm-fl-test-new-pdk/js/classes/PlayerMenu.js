/*
* Player Menu
*/
var PlayerMenu = function(player) {

    var element;
    var uniqueButton;
    var resetButton;
    var switchButton;
    var closeButton;
    var player;

    this.init = function(player){
        this.player = player;
        var source   = $("#player-menu").html();
        var template = Handlebars.compile(source);
        var html = template();
        this.player.container.append(html);
        this.initElements();
        this.initEvents();
    }

    this.initElements = function(){
        this.element = $("#container-" + this.player.getId() + " .player-menu");
        this.uniqueButton = this.element.find(".unique");
        this.resetButton = this.element.find(".reset");
        this.switchButton = this.element.find(".switch");
        this.closeButton = this.element.find(".close");
        this.refreshButtons();
    }

    this.initEvents = function(){
        this.uniqueButton.click({"menu" : this}, this.unique);
        this.resetButton.click({"menu" : this}, this.reset);
        this.switchButton.click({"controller" : this}, this.switchPlayer);
        this.closeButton.click({"controller" : this}, this.close);
    }

    this.unique = function(event){
        var playerId = event.data.menu.player.getId();
        event.data.menu.player.uniqueView = true;        
        amplify.publish("unique", {playerId : playerId});
        amplify.publish("muteAll");
        amplify.publish("unmute", {playerId : playerId});
        amplify.publish("current", {playerId : playerId});                
    }

    this.reset = function(event){
        amplify.publish("resetSizes");        
        event.data.menu.refreshButtons();
    }

    this.show = function(){
        this.element.show();        
    }

    this.hide = function(){
        this.element.hide();
    }

    this.close = function(event){        
        amplify.publish("change-view-full");          
    }

    this.refreshButtons = function(){
        if(this.player.viewMode == 'picture' && !this.player.uniqueView){
            this.pictureLayout();
        }
        else if(this.player.uniqueView){            
            this.uniqueLayout();   
        }
        else{
            this.commonLayout();
        }
    }

    this.pictureLayout = function(){
        this.switchButton.show();
        this.closeButton.show();
        this.resetButton.hide();
        this.uniqueButton.show();
    }

    this.uniqueLayout = function(){
        this.switchButton.hide();   
        this.closeButton.hide();
        this.resetButton.show();            
        this.uniqueButton.hide();
    }

    this.commonLayout = function(){
        this.switchButton.hide();
        this.closeButton.hide();
        this.resetButton.hide();
        this.uniqueButton.show(); 
    }

    this.switchPlayer = function(){
        amplify.publish("switchPicturePlayer");
    }

    this.init(player);
    
}