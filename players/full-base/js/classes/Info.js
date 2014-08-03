/*
* Info
* info tab
*/
var Info = function(infoConfig) {    
    var element;

    this.init = function(infoConfig) {
        this.element = this.initElement(infoConfig);               
        this.element.append(infoConfig.data);
    };


    this.initElement = function(infoConfig){
        var source   = $("#feed-info-template").html();
        var template = Handlebars.compile(source);
        var context = {feedName: infoConfig.name};
        return $(template(context));
    }

    this.init(infoConfig);
}