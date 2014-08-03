var GraphicsManager = function(config) {   

	var graphicsContainers;

	this.init = function(config){		
		this.graphicsContainers = $('.graphics-container');	
		//this.verifyGraphics(config.version);	
		this.initEvents();	
	}

	this.initEvents = function(){		
		amplify.subscribe("configVersionUpdate", this, this.verifyGraphicsEvent);
	}

	this, this.verifyGraphicsEvent = function(data){
		this.verifyGraphics(data.version)
	}

	this.verifyGraphics = function(version){			
		var manager = this;		
		$.ajax({
	        type: "GET",
	        dataType: "json",
	        url: manager.getGraphicsConfigFile(version),	        
			success:function(result){												
	    		manager.updateGraphics(result.positions);
			}
	    });
	}

	this.updateGraphics = function(positions){
		var manager = this;
		var source   = $("#graphic-position-template").html();
		var template = Handlebars.compile(source);		
		this.graphicsContainers.each(function(){
			var container = $(this);
			container.html("");							
			for (var i = 0; i < positions.length; i++) {								
			    var position = positions[i];	       
		        var context = {"src": position.image,"width":position.width,"height":position.height,"x_position":position.x_position,"y_position":position.y_position};
		        var html = template(context);  		   
		        container.append(html);
			}
		});
	}

	this.getGraphicsConfigFile = function(version){
		return 'versioned-data/' + version + '/graphics/graphics-config.json';
	}

	this.init(config);

}
