 $(document).ready(function() {

    $('select.multiselect').multiselect({ numberDisplayed: 100, buttonContainer: '<div class="multiselect btn-group" />'}); 

    $("[data-toggle='tooltip']").tooltip(); 

    $(".fancybox").fancybox({fitToView:true, autoSize:true,	closeClick:false, openEffect:'none', closeEffect	: 'none'});

	$(".upload").click(uploadToAkamai);
	$(".uploading").each(function(){checkUpload($(this));});
    
 });


function uploadToAkamai(e){
	e.preventDefault();
	var uploadUrl = $(this).attr("href");		
	

	var uploadedStateUrl = $(this).parents('tr').find('.upload_state').attr('href');
	var initUploadUrl = $(this).parents('tr').find('.init_upload').attr('href');
	var uploadedStateTd = $(this).parents('tr').find('td.current_state');		
	
	$.get(initUploadUrl, function(){
		$.get(uploadUrl);
		checkUploadStateInterval(uploadedStateUrl, uploadedStateTd);		
	});					
}

function checkUpload(element){
	var uploadedStateUrl = element.parents('tr').find('.upload_state').attr('href');
	var uploadedStateTd = element.parents('tr').find('td.current_state');	
	checkUploadStateInterval(uploadedStateUrl, uploadedStateTd);	
}

function  checkUploadStateInterval(uploadedStateUrl, uploadedStateTd){
	var uploadIntervalId = setInterval(function(){
		checkUploadState(uploadedStateUrl, uploadedStateTd, uploadIntervalId);
	}, 1000);
}

function checkUploadState(uploadedStateUrl, uploadedStateTd, uploadIntervalId){			
	$.get(
		uploadedStateUrl,
		function(data){
			var htmlState = '';
			if(data.state < 100){
				htmlState = progressBarTemplate(data.state);	    							
			} else {
				htmlState = uploadFinishedTemplate();	    			
				clearInterval(uploadIntervalId);
			}
			uploadedStateTd.html(htmlState);
		}
	);
}

function progressBarTemplate(perc){
	var context = {progress: perc}
    var source   = $("#progress-bar-template").html();
    var template = Handlebars.compile(source);   
    return template(context);
}

function uploadFinishedTemplate(){
    var source   = $("#uploaded-finished-template").html();
    var template = Handlebars.compile(source);   
    return template();
}

