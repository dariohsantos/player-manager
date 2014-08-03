	<div class="panel-body">
	<a href="<?=site_url($base_url . '/create')?>" class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span> agregar</a>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Ancho</th>
				<th>Alto</th>
				<th>Ultima modificaci&oacute;n</th>
				<th>Estado Akamai</th>
				<th></th>
			</tr>	
		</thead>
		<?php foreach ($players as $player_item): ?>
			<tr>
				<td><?=$player_item['name']?></td>
				<td><?=$player_item['width']?></td>
				<td><?=$player_item['height']?></td>
				<td><?=$player_item['update_date']?></td>	
				<td class="current_state">
					<?if($player_item['upload_state'] == FINISHED){ ?>
						<span class="label label-success">subido</span>
					<? } else if($player_item['upload_state'] == UPLOADING || $player_item['upload_state'] == INIT){ ?>
						<span class="label label-default uploading"></span>
					<? } else if($player_item['upload_state'] == MODIFIED){ ?>
						<span class="label label-danger">modificado</span>
					<? } else { ?>							
						<span class="label label-warning">pendiente</span>
					<? } ?>
				</td>					
				<td class="text-right">
					<a href="<?=site_url($base_url . '/edit/' . $player_item['id'])?>" class="action-button" data-toggle="tooltip" data-placement="top" title="" data-original-title="editar">
						<span class="glyphicon glyphicon-pencil green"></span>
					</a>
					<a href="<?=site_url($base_url . '/delete/' . $player_item['id'])?>" class="action-button" data-toggle="tooltip" data-placement="top" title="" data-original-title="eliminar"><span class="glyphicon glyphicon-trash red"></span></a>
					<a href="<?=site_url($base_url . '/upload/' . $player_item['id'])?>" class="action-button upload" data-toggle="tooltip" data-placement="top" title="" data-original-title="subir a akamai"><span class="glyphicon glyphicon-arrow-up orange"></span></a>
					<a href="<?=site_url($base_url . '/upload_state/' . $player_item['id'])?>" class="action-button upload_state hidden" ></a>
					<a href="<?=site_url($base_url . '/init_upload/' . $player_item['id'])?>" class="action-button init_upload hidden" ></a>
					<a href="<?=$player_item['local_url']?>" data-fancybox-type="iframe" class="action-button fancybox" data-toggle="tooltip" data-placement="top" title="" data-original-title="previsualizar"><span class="glyphicon glyphicon-eye-open black"></span></a>
					<a href="<?=$player_item['akamai_url']?>?>" data-fancybox-type="iframe" class="action-button fancybox" data-toggle="tooltip" data-placement="top" title="" data-original-title="ver en akamai"><span class="glyphicon glyphicon-paperclip black"></span></a>
					<a href="<?=site_url($base_url . '/iframe_code/' . $player_item['id'])?>" data-fancybox-type="iframe" class="action-button fancybox" data-toggle="tooltip" data-placement="top" title="" data-original-title="codigo iframe"><span class="glyphicon glyphicon glyphicon-chevron-left black"></span><span class="glyphicon glyphicon glyphicon-chevron-right black"></span></a>
				</td>
			</tr>
		<?php endforeach ?>
	</table>
</div>

<script id="progress-bar-template" type="text/x-handlebars-template">
	<div class="progress progress-striped">
	  <div class="progress-bar progress-bar-success text-center" role="progressbar" aria-valuenow="{{progress}}" aria-valuemin="0" aria-valuemax="100" style="width: {{progress}}%">	
	  </div>
	</div>
</script>

<script id="uploaded-finished-template" type="text/x-handlebars-template">
	<span class="label label-success">subido</span>
</script>
