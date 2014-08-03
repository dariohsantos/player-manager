<form class="form-horizontal" action="<?=site_url('jw_player/save')?>" method="POST">
	<input type="hidden" name="id" value="<?=value(@$player, 'id')?>" />
  <input type="hidden" name="upload_state" value="<?=@$player['upload_state']?MODIFIED:''?>" />
	 <div class="form-group">
    	<label for="name" class="col-sm-2 control-label">Nombre: </label>
    	<div class="col-sm-10">        
      		<input name="name" type="text" class="form-control" id="name" placeholder="nombre de player" value="<?=value(@$player, 'name')?>">
   	 	</div>	   	 	
  	</div>
 
    <div class="form-group">
      <label for="video_url" class="col-sm-2 control-label">Video url: </label>
      <div class="col-sm-10">        
          <input name="video_url" type="text" class="form-control" id="video_url" placeholder="url del video" value="<?=value(@$player, 'video_url')?>">
      </div>        
    </div>
  	<div class="form-group">
    	<label for="width" class="col-sm-2 control-label">Ancho(px): </label>
    	<div class="col-sm-4">
      		<input name="width" type="text" class="form-control" id="width" placeholder="ancho en px" value="<?=value(@$player, 'width')?>">
   	 	</div>
   	 	<label for="height" class="col-sm-2 control-label">Alto(px): </label>
    	<div class="col-sm-4">
      		<input name="height" type="text" class="form-control" id="height" placeholder="alto en px" value="<?=value(@$player, 'height')?>">
   	 	</div>
  	</div>

    <input type="submit" name="submit" value="guardar" class="pull-right btn btn-primary"/>
</form>        