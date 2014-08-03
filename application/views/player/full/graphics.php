<div id="graphics">
	<? $this->load->view('common/message_modal.php'); ?>
	<div id="graphics-positions">
		<div class="panel panel-default">
	  		<div class="panel-heading">
	  			<h3>Posiciones</h3>
	  		</div>
			<div class="panel-body">
				<div>
					<label>Nombre</label>
					<input type="text" name="graphic-name" value=""/>
					<label>Ancho</label>
					<input type="number" name="graphic-width" value="0"/><span>%</span>
					<label>Alto</label>
					<input type="number" name="graphic-height" value="0"/><span>%</span>
					<input type="button" name="graphic-add" value="agregar posicion">
				</div>
				<div id="graphics-position-list"> 
					<? $graphicPositions = @$player['graphic_positions']?$player['graphic_positions']:array(); ?>
	          		<?php foreach ($graphicPositions as $graphicPositionIndex => $graphicPosition): ?>
						<div class="graphic-position" id="graphic-position-variables-<?=value(@$graphicPosition,'name')?>">	
							<input type="hidden" name="graphic_position[<?=value(@$graphicPosition,'name')?>][name]" value="<?=value(@$graphicPosition,'name')?>"/>
						  	<input type="hidden" name="graphic_position[<?=value(@$graphicPosition,'name')?>][width]" value="<?=value(@$graphicPosition,'width')?>"/>
							<input type="hidden" name="graphic_position[<?=value(@$graphicPosition,'name')?>][height]" value="<?=value(@$graphicPosition,'height')?>"/>
							<input type="hidden" name="graphic_position[<?=value(@$graphicPosition,'name')?>][x-position]" value="<?=value(@$graphicPosition,'x-position')?>"/>
							<input type="hidden" name="graphic_position[<?=value(@$graphicPosition,'name')?>][y-position]" value="<?=value(@$graphicPosition,'y-position')?>"/>
							<input type="hidden" class="graphic_position_image_id" name="graphic_position[<?=value(@$graphicPosition,'name')?>][graphic_image_id]" value="<?=value(@$graphicPosition,'graphic_image_id')?>"/>
						</div>
					<?php endforeach ?>
				</div>
				<div style="width:<?=value(@$player, 'width')?>px;height:<?=value(@$player, 'height')?>px;z-index:100" class="graphic-layout" id="graphic-layout">
					<? $graphicPositions = @$player['graphic_positions']?$player['graphic_positions']:array(); ?>
	          		<?php foreach ($graphicPositions as $graphicPositionIndex => $graphicPosition): ?>
						<div class="graphic-box" id="graphic-position-<?=value(@$graphicPosition,'name')?>" name="<?=value(@$graphicPosition,'name')?>" style="width:<?=value(@$graphicPosition,'width')?>%;height:<?=value(@$graphicPosition,'height')?>%;left:<?=value(@$graphicPosition,'x-position')?>%;top:<?=value(@$graphicPosition,'y-position')?>%">						
							<div class="graphic-position-bar">
								<a href="#remove" class="remove-graphic-position remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>
								<p class="graphic-position-name pull-left"><?=value(@$graphicPosition,'name')?></p>
							</div>
							<div class="image-container">
								
							</div>
						</div>
					<?php endforeach ?>
				</div>	
			</div>
		</div>
	</div>
	
	<div id="graphics-files">
		<div class="panel panel-default">
	  		<div class="panel-heading">
	  			<h3>Imagenes</h3>
	  		</div>
			<div class="panel-body">
				<div id="file-upload"></div>
				<div id="uploaded-files" class="row">
					<? $graphicImages = @$player['graphic_images']?$player['graphic_images']:array(); ?>
	          		<?php foreach ($graphicImages as $graphicImageIndex => $graphicImage): ?>
						<div class="col-lg-4 thumbnail-container">
							<div class="thumbnail">	
								<div class="row">
									<div class="col-lg-12">
										<a href="<?=site_url('uploadify/do_delete/' . $graphicImage['id'])?>" class="delete-graphic-image remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>		
									</div>	
								</div>
								<img src="<?=uploaded_graphic_image_url($graphicImage)?>" class="height-4"/>									
								
								<div class="caption">				
									<label>Posicion:</label>								
									<select for-file="<?=$graphicImage['id']?>" class="graphic-position-select form-control" >
										<option value="">seleccionar</option>
										<?php foreach ($graphicPositions as $graphicPositionIndex => $graphicPosition): ?>
											<option value="<?=value(@$graphicPosition,'name')?>" <?=$graphicPosition['name'] == $graphicImage['graphic_position_name']?'selected':''?>><?=value(@$graphicPosition,'name')?></option>
										<?php endforeach ?>
									</select>				
								</div>
							</div>
						</div>
					<?php endforeach ?>
				</div>
			</div>	
		</div>
	</div>
	


	<script id="graphic-position-template" type="text/x-handlebars-template">
		<div class="graphic-position" id="graphic-position-variables-{{name}}">	
			<input type="hidden" name="graphic_position[{{name}}][name]" value="{{name}}"/>
		  	<input type="hidden" name="graphic_position[{{name}}][width]" value="{{width}}"/>
			<input type="hidden" name="graphic_position[{{name}}][height]" value="{{height}}"/>
			<input type="hidden" name="graphic_position[{{name}}][x-position]" value="0"/>
			<input type="hidden" name="graphic_position[{{name}}][y-position]" value="0"/>
			<input type="hidden" name="graphic_position[{{name}}][graphic_image_id]" value=""/>
		</div>
	</script>

	<script id="graphic-box-position-template" type="text/x-handlebars-template">
		<div class="graphic-box" id="graphic-position-{{name}}" name="{{name}}" style="width:{{width}}%;height:{{height}}%">
			<a href="#remove" class="remove-graphic-position remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>
			<div class="image-container">
				<p class="graphic-position-name">{{name}}</p>
			</div>
		</div>
	</script>

	<script id="uploaded-file-template" type="text/x-handlebars-template">	
		<div class="col-lg-4 thumbnail-container">
			<div class="thumbnail">
				<div class="row">
					<div class="col-lg-12">
						<a href="<?=site_url('uploadify/do_delete/{{fileId}}')?>" class="delete-graphic-image remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>		
					</div>	
				</div>			
				<img src="{{fileLocation}}" class="height-4"/>		
				<div class="caption">				
					<label>Posicion:</label>
					<select for-file="{{fileId}}" class="graphic-position-select form-control" >
						<option value="">seleccionar</option>
						{{#each positions}}
							<option value="{{this}}">{{this}}</option>
						{{/each}}
					</select>				
				</div>
			</div>
		</div>	
	</script>

	<script id="graphic-position-option-template" type="text/x-handlebars-template">
		<option value="{{value}}">{{description}}</option>
	</script>


	<script>
		
		var base_url = '<?php echo base_url(); ?>';

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
				}
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
				$("#" + id)
    				.draggable({ 
    					cursor : "move",
    					containment: "parent", 
    					drag : onDragMove,    					
    				})
    				.resizable(
    				{
    					containment: "parent", 
    					resize : onSizeChange
    				}
    			);
    			$("#" + id).css("position", "absolute");
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

		var FileManager = function(){	

			this.init = function(){
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
					swf           	: base_url + '/assets/js/uploadify/uploadify.swf',
					uploader      	: base_url + '/uploadify/do_upload',			
					fileObjName		:'userfile',
					fileTypeExts	:'*.png;',
		            fileTypeDesc	:'Image Files (.png)',
		            buttonText	  	:'Seleccionar imagenes',	
		            width			: 180,
		 			formData  : {playerId:<?=value(@$player, 'id')?>},
		            onUploadSuccess : this.addUploadedFile,
		            multi			: true
				});							
			}

			this.addUploadedFile = function(file, data, response){				
				var jsonData = JSON.parse(data);				
				var source   = $("#uploaded-file-template").html();
				var template = Handlebars.compile(source);
				var context = {fileLocation: base_url + jsonData.image_location, positions: graphicsManager.graphicPositions, fileId: jsonData.file_id};
				var html    = template(context);						
				$("#uploaded-files").append(html);					
			}

			this.init();
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
				$(".graphic-box[name=" + selectedPosition + "]").addClass("active");
				$(".graphic-box[name=" + selectedPosition + "] .image-container").append(imageCopy);			
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
					$(this).find("[value=" + selectedPosition +"]").attr("selected", false);
				});	

				$(".graphic_position_image_id[value=" + fileId + "]").val("");				
			}
			this.init();
		}

		var graphicsManager = new GraphicsManager();
		var fileManager = new FileManager();
		var filePositionChangeHandler = new filePositionChangeHandler();
		filePositionChangeHandler.updateImagesInBox();

		function onDragMove(  ) {
			var context = $(this).context;				
			var name = $(context).attr("name");						
		  	var relativeX = context.offsetLeft * 100 / 800;
		  	var relativeY = context.offsetTop * 100 / 500;		  	
			console.log(name);
			$("input[name='graphic_position[" + name +"][x-position]']").val(relativeX);
			$("input[name='graphic_position[" + name +"][y-position]']").val(relativeY);
		}

		function onSizeChange(  ) {
			var context = $(this).context;				
		  	var name = $(context).attr("name");		
		  	var relativeWidth = context.offsetWidth * 100 / 800;
		  	var relativeHeight = context.offsetHeight * 100 / 500;

			$("input[name='graphic_position[" + name +"][width]']").val(relativeWidth);
			$("input[name='graphic_position[" + name +"][height]']").val(relativeHeight);			
		}		


		
	</script>
</div>