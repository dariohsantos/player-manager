var Resizer = function(config){

	this.resizeAll = function(){		
		var resizer = this;
		$(".resizeable").each(function(){
			resizer.resize($(this), 0.03125);						
		});
		$(".resizeable-sm").each(function(){			
			resizer.resize($(this), 0.015);						
		});		
		$(".resizeable-md").each(function(){			
			resizer.resize($(this), 0.020);						
		});		
		this.resizeMenu();
	}

	this.resizeMenu = function(){		
		var height = $(".app-controller").height() -$(".menu").height(); 					
		$("#feeds").css("height", height);
	}

	this.resize = function(element, coef){		
		var width = element.css("font-size");
	    var contWidth = $('.tpContainer').width();	        
	    element.css("font-size", (contWidth*coef));
	}

	this.resizeFeeds = function(){		
		$(".feed-item .resizeable").each(function(){		
			var element = $(this);				
			var width = element.css("font-size");
		    var contWidth = $('.tpContainer').width();	        
		    element.css("font-size", (contWidth*0.02));
		});
	}

}