<div id="graphics">
	<? $this->load->view('common/message_modal.php'); ?>
	<div id="graphics-positions">
		<div class="panel panel-default">
	  		<div class="panel-heading">
	  			<h3>Posiciones</h3>
	  		</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-lg-3">													
						<input type="text" name="graphic-name" value="" class="form-control" placeholder="nombre..."/>													
					</div>
					<div class="col-lg-3">						
						<div class="input-group">								
							<input type="text" name="graphic-width" value="" class="form-control" placeholder="ancho..."/>
							<div class="input-group-addon">px</div>
						</div>						
					</div>
					<div class="col-lg-3">											
						<div class="input-group">								
							<input type="text" name="graphic-height" value="" class="form-control" placeholder="alto..."/>
							<div class="input-group-addon">px</div>
						</div>
					</div>					
					<div class="col-lg-3">											
						<input type="button" name="graphic-add" value="agregar posicion" class="btn btn-primary">						
					</div>				
				</div>
				<br/>
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
							<span class="label label-default position-label"><?=value(@$graphicPosition,'name')?></span>
							<div class="graphic-position-bar">
								<a href="#remove" class="remove-graphic-position remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>								
								
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
			<div class="graphic-position-bar">
				<a href="#remove" class="remove-graphic-position remove-button pull-right"><span class="glyphicon glyphicon-remove"></span></a>
				<p class="graphic-position-name pull-left">{{name}}</p>
			</div>			
			<div class="image-container">				
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

	<script type="text/javascript" src="<?php echo base_url();?>/assets/js/graphics-manager.js" ></script>

	<script>		
		var baseUrl = '<?php echo base_url(); ?>';
		var playerId = '<?=value(@$player, "id")?>';
		var graphicsManager = new GraphicsManager();
		var fileManager = new FileManager(baseUrl, playerId);
		var filePositionChangeHandler = new filePositionChangeHandler();
		filePositionChangeHandler.updateImagesInBox();	
	</script>
</div>