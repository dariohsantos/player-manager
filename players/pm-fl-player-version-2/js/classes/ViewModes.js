/*
* VIEW MODES
* split2, split4, full, split
*/
var ViewModes = function(config){
	var viewModesMap;
	var container;

	this.init = function(config){
		this.container = $("#view-modes");
		this.viewModesMap = new Array();
		this.createButtons(config.availableViewModes);		
		this.initialViewMode(config.initialViewMode);
		amplify.subscribe("change-view-full", this, this.full);
	}

	this.full = function(){
		toggleActive(this.viewModesMap["full"]);
	}


  	this.initialViewMode = function(viewMode){
  		this.viewModesMap[viewMode].click();        
    }

    this.createButtons = function(availableViewModes){		
		for (index = 0; index < availableViewModes.length; ++index) {
			this.createButton(availableViewModes[index]);
		}
    }


	this.createButton = function(viewMode){		
		var source   = $("#view-mode-button-template").html();
        var template = Handlebars.compile(source);
        var context = {viewMode: viewMode};
        var button = $(template(context)); 
        this.container.append(button); 
        this.viewModesMap[viewMode] = button;        
        button.click(function(){toggleActive(button);amplify.publish( "change-view-" + viewMode );});
        /*
        var width = button.find("span").css("font-size");
        var contWidth = $('.tpContainer').width();
        alert(width);
        button.find("span").css("font-size", (contWidth*0.03125));
        */
        return button; 
	}

	function toggleActive(selected){
		$('.view-mode').removeClass('active');
		selected.find('.view-mode').addClass('active');
	}

	this.init(config);


}