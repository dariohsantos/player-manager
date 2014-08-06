$(document).ready(function(){
	$(".tpContainer").width(config.size.width);
	$(".tpContainer").height(config.size.height);
	createTimer();
	$("#countdown").countdown({
		date: config.date,
		format: "on"
		},			
		function() {			
			$(".timer-area").hide();
			createPlayer();
			$pdk.controller.setReleaseURL(config.releaseUrl, true,  ["player"]);
			$pdk.initialize();
		}
	);

	$pdk.controller.addEventListener("OnPlayerLoaded", function(){
		$pdk.controller.clickPlayButton();
	});

});


function createTimer(){
	var source   = $("#timer-template").html();
	var template = Handlebars.compile(source);
	var context = {title1: config.title1, title2: config.title2};
	var html = template(context);

	$(".tpContainer").append(html);
}

function createPlayer(){
	var source   = $("#player-template").html();
	var template = Handlebars.compile(source);
	var html = template();
	$(".tpContainer").append(html);
}