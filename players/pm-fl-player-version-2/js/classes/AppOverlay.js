/*
* APP OVERLAY
* for now only view button
*/
var AppOverlay = function(layout) {
	var element;
	var ver;
    

	this.init = function(){
		var source   = $("#overlay-show-app").html();
		var template = Handlebars.compile(source);
		var html = template();
	    	layout.append(html);

		this.element = $("#overlay-show-app");
    	this.ver = new VerButton(this.element);
	}

	this.init();
	
}
