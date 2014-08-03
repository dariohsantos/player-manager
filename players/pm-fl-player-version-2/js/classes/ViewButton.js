    /*
    * VIEW BUTTON
    * displays app
    */
    var VerButton = function(element){
		var element;
		this.element = element;
	
		this.click = function(event){
    		event.preventDefault();
    		element.hide();
    		amplify.publish( "showVerTab" );
	    };

	    this.hide = function(){	    	
	    	this.hide();
	    }

	    this.show = function(){
	    	this.show('slow');
	    }

	    this.subscribeEvents = function(){
        	amplify.subscribe( "showVerTab", this.element, this.hide);
        	amplify.subscribe("closeApp", this.element, this.show);
        }


		this.subscribeEvents();
		this.element.bind("click", this.click);
    }