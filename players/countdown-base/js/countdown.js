var initSeconds = 0;
(function($) {
	$.fn.countdown = function(options, callback) {



		
		//array of custom settings
		var settings = { 
			'date': null,
			'format': null
		};

		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}

		var serverDateTime = 0;
		var initLocalSeconds = 0;
		var count = 0;
		var maxOffSet = 5;
		var eventDate = Date.parse(settings['date']) / 1000;
		var sincronizing = false;
		var interval;


		//custom 'this' selector
		thisEl = $(this);


		
		//main countdown function
		function countdown_proc() {
			sincronizeServerTime();
			currentDate = serverDateTime + count;
			//currentDate = Math.floor($.now() / 1000);
			
			if(eventDate <= currentDate) {
				callback.call(this);
				clearInterval(interval);
			}
			
			seconds = eventDate - currentDate;
			
			days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
			seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed
			
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed
			
			minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60; //update the seconds variable with no. of minutes removed
			
			//conditional Ss
			if (days == 1) { thisEl.find(".timeRefDays").text("d\u00eda"); } else { thisEl.find(".timeRefDays").text("d\u00edas"); }
			if (hours == 1) { thisEl.find(".timeRefHours").text("hora"); } else { thisEl.find(".timeRefHours").text("horas"); }
			if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minuto"); } else { thisEl.find(".timeRefMinutes").text("minutos"); }
			if (seconds == 1) { thisEl.find(".timeRefSeconds").text("segundo"); } else { thisEl.find(".timeRefSeconds").text("segundos"); }
			
			//logic for the two_digits ON setting
			if(settings['format'] == "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
			}
			
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds);
			} else { 
				alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
				clearInterval(interval); 
			}
		}
		
		function callCountDown(){
			countdown_proc();
			interval = setInterval(function(){
				countdown_proc();
			}, 1000);
		}

		function sincronizeServerTime(){
			count++;
			if(mustSincronize()){
				sincronizing = true;
				$.ajax({
				    type: 'GET',
				    url: config.localTimeUrl,
				    success: function(data){
					serverDateTime =  parseInt(data) ;	
					initLocalSeconds = new Date().getTime() / 1000;	
					count = 0;
					sincronizing = false;
				    },
				    error: function(){
					sincronizing = false;
				    }
				});
			}			
		}
		function init(){
			$.ajax({
			    type: 'GET',
			    url: config.localTimeUrl,
			    success: function(data){
				serverDateTime =  parseInt(data);
				initLocalSeconds = new Date().getTime() / 1000;
				if(eventDate > serverDateTime) {
					$(".timer-area").show();
					resizeText();
					callCountDown();
				}
				else{
					callback.call(this);
				}

				
			    },
	         	    timeout: 10000
			});
		}
		
		function mustSincronize(){	
			var actualLocalSeconds = new Date().getTime() / 1000;
			//console.log(Math.abs(actualLocalSeconds - count - initLocalSeconds));
			return (Math.abs(actualLocalSeconds - count - initLocalSeconds) > maxOffSet) && !sincronizing;
		}

		function resizeText(){
			jQuery(".resize1").fitText(0.2);
			jQuery(".resize2").fitText(0.5);
			jQuery("#title.resize").fitText(2);
			jQuery("#subtitle.resize").fitText(2.5);
		}

		init();
		
	}
}) (jQuery);
