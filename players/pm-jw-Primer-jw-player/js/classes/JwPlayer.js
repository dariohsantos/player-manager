var JwPlayer = function(config) {    
    
    var videoContainer;

    this.init = function(config) {
        this.videoContainer = $(".video-container");
        this.createPlayer(config);
    };

    this.createPlayer = function(config){
        var source   = $("#player-template").html();
        var template = Handlebars.compile(source);
        var context = {video: config.video};
        this.videoContainer.html($(template(context))); 

        this.videoContainer.css('width', config.size.width);
        this.videoContainer.css('height', config.size.height);

        jwplayer("video").setup({
            file: config.video,
            width: "100%",
            height: "100%",
            autostart: "true",
            primary: "html5",
            fallback: false
        });       
    }

    this.init(config);
}