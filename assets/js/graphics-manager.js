var GraphicPosition = function(name){

	var variablesContainer;
	var position;
	var removeButton;
	var name;

	this.init = function(name){
		this.initElements(name);
		this.initEvents();
	}

	this.initElements = function(name){
		this.variablesContainer = $("#graphic-position-variables-" + name);
		this.position = $("#graphic-position-" + name);
		this.removeButton = this.position.find(".remove-graphic-position");
		this.name = name;
	}

	this.initEvents = function(){
		this.removeButton.click({element: this},this.removeGraphicEvent);
	}

	this.removeGraphicEvent = function(event){
		var element = event.data.element;
		graphicsManager.removeGraphicPosition(element);
		element.variablesContainer.remove();
		element.position.remove();		
	}
	this.init(name);

}

var GraphicsManager = function(){

	var addButton;
	var name;
	var width;
	var height;
	var layout;
	var graphicPositions;

	this.init = function(){				
		this.initElements();	
		this.initEvents();
		this.initCurrentGraphicPositions();
	}

	this.initCurrentGraphicPositions = function(){
		var manager = this;
		$(".graphic-box").each(function(){
			console.log($(this));
			var name = $(this).attr("name");
			var graphicPosition = new GraphicPosition(name);	
			manager.graphicPositions.push(name);			
			manager.makeDraggable($(this).attr("id"));					
		})

		
	}
	
	this.initElements = function(){
		this.addButton = $("input[name=graphic-add]");
		this.name = $("input[name=graphic-name]");
		this.width = $("input[name=graphic-width]");
		this.height = $("input[name=graphic-height]");
		this.layout = $("#graphic-layout");	
		this.graphicPositions = new Array();		
	}

	this.initEvents = function(){
		this.addButton.click({manager:this},this.addGraphicEvent);
	}


	this.addGraphicEvent = function(event){
		var manager = event.data.manager;

		var context = {name: manager.name.val(), width: manager.width.val(), height: manager.height.val()};
		if(manager.validatePosition(context)){
			var source   = $("#graphic-position-template").html();
			var template = Handlebars.compile(source);
			
			var html    = template(context);
			$("#graphics-position-list").append(html);

			var source   = $("#graphic-box-position-template").html();
			var template = Handlebars.compile(source);				
			var html    = template(context);
			manager.layout.append(html);
						
			var graphicPosition = new GraphicPosition(manager.name.val());				
			manager.makeDraggable($(html).attr("id"));	
			manager.addPositionOption(manager.name.val());
			manager.clearInputs();			
		}
	}

	this.clearInputs = function(){
		this.name.val("");
		this.width.val("");
		this.height.val("");
	}

	this.validatePosition = function(context){
		console.log(graphicsManager.graphicPositions);
		if(context.width > 100 || context.width < 10 || context.height > 100 || context.height < 10){
			modalManager.showModalMessage(messages.validation.graphicsPositionSize);
			return false;
		}
		if(graphicsManager.graphicPositions.indexOf(context.name) > -1){
			modalManager.showModalMessage(messages.validation.graphicsPositionDuplicatedName);
			return false;	
		}
		return true;
	}

	this.makeDraggable = function(id){
		var manager = this;		
		$("#" + id)
			.draggable({ 
				cursor : "move",
				containment: "parent", 
				drag : manager.dragEvent,    					
			})
			.resizable(
			{
				containment: "parent", 
				resize : manager.sizeChangeEvent
			}
		);
		$("#" + id).css("position", "absolute");
	}

	this.dragEvent = function(  ) {
		var context = $(this).context;				
		var name = $(context).attr("name");	
		var layout = $('#graphic-layout');
		var layoutHeight = layout.height();
		var layoutWidth = layout.width();
	  	var relativeX = context.offsetLeft * 100 / layoutWidth;
	  	var relativeY = context.offsetTop * 100 / layoutHeight;		  			
		$("input[name='graphic_position[" + name +"][x-position]']").val(relativeX);
		$("input[name='graphic_position[" + name +"][y-position]']").val(relativeY);
		}

	this.sizeChangeEvent =	function( ) {
		var context = $(this).context;				
	  	var name = $(context).attr("name");	
	  	var layout = $('#graphic-layout');  	
	  	var layoutHeight = layout.height();
		var layoutWidth = layout.width();	
	  	var relativeWidth = context.offsetWidth * 100 / layoutHeight;
	  	var relativeHeight = context.offsetHeight * 100 / layoutWidth;
		$("input[name='graphic_position[" + name +"][width]']").val(relativeWidth);
		$("input[name='graphic_position[" + name +"][height]']").val(relativeHeight);			
	}		


	this.addPositionOption = function(name){
		var source   = $("#graphic-position-option-template").html();
		var template = Handlebars.compile(source);
		var context = {value: name, description: name};
		var html    = template(context);
		$(".graphic-position-select").each(function(){
			$(this).append(html);
		});
		this.graphicPositions.push(name);
	
	}

	this.removeGraphicPosition = function(graphicPosition){
		this.removeGraphicPositionFromArray(graphicPosition);
		this.removeGraphicPositionFromSelects(graphicPosition);
	}

	this.removeGraphicPositionFromArray = function(graphicPosition){
		var index = this.graphicPositions.indexOf(graphicPosition.name);
		if (index > -1) {
			this.graphicPositions.splice(index, 1);
		}							
	}

	this.removeGraphicPositionFromSelects = function(graphicPosition){
		$(".graphic-position-select option[value='" + graphicPosition.name + "']").each(function() {
		    $(this).remove();
		});
	}

	this.init();
	
}

var FileManager = function(baseUrl, playerId){	

	var baseUrl;
	var playerId;

	this.init = function(baseUrl, playerId){
		this.baseUrl = baseUrl;
		this.playerId = playerId;
		this.initUploader();
		this.initEvents();
	}

	this.initEvents = function(){
		var manager = this;
		$(document).on("click", ".thumbnail-container .delete-graphic-image", function(event){
			event.preventDefault();
			manager.deleteEvent($(this));
		});			
	}

	this.deleteEvent = function(link){			
		var url = link.attr("href");	
		var thumbnailContainer = link.parents(".thumbnail-container");				
		var currentPositionSelect = thumbnailContainer.find('.graphic-position-select');

		if(currentPositionSelect.val() != ''){
			modalManager.showModalMessage(messages.validation.graphicsDeleteFileError);
		}
		else{
			$.ajax({
			    url: url,
			    type: 'DELETE',
			    success: function(result) {
			        link.parents(".thumbnail-container").remove();
			    }
			});			
		}
		
	}

	this.initUploader = function(){		
		$("#file-upload").uploadify({
			swf           	: this.baseUrl + '/assets/js/uploadify/uploadify.swf',
			uploader      	: this.baseUrl + '/uploadify/do_upload',			
			fileObjName		:'userfile',
			fileTypeExts	:'*.png;',
            fileTypeDesc	:'Image Files (.png)',
            buttonText	  	:'Seleccionar imagenes',	
            width			: 180,
 			formData  		: {playerId:this.playerId},
            onUploadSuccess : this.addUploadedFile,
            multi			: true
		});							
	}

	this.addUploadedFile = function(file, data, response){				
		var jsonData = JSON.parse(data);				
		var source   = $("#uploaded-file-template").html();
		var template = Handlebars.compile(source);
		var context = {fileLocation: jsonData.image_location, positions: graphicsManager.graphicPositions, fileId: jsonData.file_id};
		var html    = template(context);						
		$("#uploaded-files").append(html);					
	}

	this.init(baseUrl,playerId);
} 

var filePositionChangeHandler = function(){	

	this.init = function(){
		var handler = this;

		$(document).on("change", ".graphic-position-select", function(){
			var currentSelect = this;					
			handler.unselectPositions(currentSelect);	
			handler.setImageToPosition(currentSelect);
			handler.updateImagesInBox();
		});
	}

	this.updateImagesInBox = function(){
		$(".graphic-box .image-container img").remove();
		$(".graphic-box").removeClass("active");
		var handler = this;
		$('.graphic-position-select').each(function(){					
			handler.updateImageInBox(this);
		});
	}

	this.updateImageInBox = function(currentSelect){				
		var imageCopy = $(currentSelect).parents(".thumbnail").find("img").clone();					
		var selectedPosition = currentSelect.value;	
		imageCopy.css("width","100%");
		imageCopy.css("height","100%");
		imageCopy.css("position","absolute");											
		$(".graphic-box[name='" + selectedPosition + "']").addClass("active");
		$(".graphic-box[name='" + selectedPosition + "'] .image-container").append(imageCopy);			
	}

	this.setImageToPosition = function(currentSelect){
		var fileId = $(currentSelect).attr("for-file");
		var selectedPosition = currentSelect.value;							
		$("input[name='graphic_position[" + selectedPosition +"][graphic_image_id]']").val(fileId);
	}

	this.unselectPositions = function(currentSelect){
		var selectedPosition = currentSelect.value;				
		var fileId = $(currentSelect).attr("for-file");
		var otherSelects = $(".graphic-position-select").not("[for-file=" + fileId +"]");
		otherSelects.each(function(){										
			$(this).find("[value='" + selectedPosition +"']").attr("selected", false);
		});	

		$(".graphic_position_image_id[value='" + fileId + "']").val("");				
	}
	this.init();
}	