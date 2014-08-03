/*
* Feed
* list of videos
*/
var Feed = function(feedConfig) {    
    var element;

    this.init = function(feedConfig) {
        this.element = this.initElement(feedConfig);               
        var self = this;        
        $.ajax({
            url : feedConfig.url,
            dataType:'xml',
            type:'GET',	
            success:function(xml) { 
                var feedData = self.parseXml(xml);                
                self.createItems(feedData, feedConfig);
                self.initEvents();
                amplify.publish("feedLoaded");
            },
            link:function() {
                console.log("I am sorry, But I can't fetch that feed");
            }
        });
    };

    this.parseXml = function(xmlData){
        var feedData = new Array();
        var self = this;
        $(xmlData).find('item').each(function(index) {
             var itemData = self.getItemData($(this));
             feedData.push(itemData);
        });
        return feedData;
    }

    this.getItemData = function(xmlElement){
        var itemData = new Object();        
        itemData.title = xmlElement.find("title").text();
        itemData.videoUrl = xmlElement.find("[nodeName=media\\:content]").attr("url");
        itemData.thumbUrl = xmlElement.find("[nodeName=media\\:thumbnail]").attr("url");
        return itemData;
    }

    this.createItems = function(feedData, feedConfig){
        for(var feedKey in feedData){
            var itemData = feedData[feedKey];
            var html = this.createItem(itemData);
            this.element.append(html);  
            if(feedKey < 4 && feedConfig.init){
                var playerNumber = parseInt(feedKey) + 1;
                var playerId = "player" + playerNumber;                
                amplify.publish("releaseListLoaded", {"videoUrl" : itemData.videoUrl, "player" : playerId});
            }
        }
    }

    this.createItem = function(itemData){
        var source   = $("#feed-item-template").html();
        var template = Handlebars.compile(source);
        var context = {title: itemData.title, videoUrl: itemData.videoUrl, thumbUrl : itemData.thumbUrl};
        return template(context);
    }

    this.initElement = function(feedConfig){
        var source   = $("#feed-template").html();
        var template = Handlebars.compile(source);
        var context = {feedName: feedConfig.name};
        return $(template(context));
    }

    this.initEvents = function(){
        $('.link-movie').draggable({revert: true,  appendTo: 'body',containment: 'window',scroll: false,helper: 'clone', cursor: "move"});                 
        $('.link-movie').click(function(e){
            e.preventDefault();
            amplify.publish("playFromClick", {"link" : $(this)});
        });
    }

    this.init(feedConfig);
}