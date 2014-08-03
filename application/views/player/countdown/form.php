<form class="form-horizontal" action="<?=site_url('countdown_player/save')?>" method="POST">
	<input type="hidden" name="id" value="<?=value(@$player, 'id')?>" />
  <input type="hidden" name="upload_state" value="<?=@$player['upload_state']?MODIFIED:''?>" />
	 <div class="form-group">
    	<label for="name" class="col-sm-2 control-label">Nombre: </label>
    	<div class="col-sm-10">        
      		<input name="name" type="text" class="form-control" id="name" placeholder="nombre de player" value="<?=value(@$player, 'name')?>">
   	 	</div>	   	 	
  	</div>
  	<div class="form-group">
    	<label for="description" class="col-sm-2 control-label">Descripci&oacute;n: </label>
    	<div class="col-sm-10">
      		<textarea name="description" class="form-control" rows="3"><?=value(@$player,'description')?></textarea>
   	 	</div>
  	</div>

    <div class="form-group">
      <label for="title1" class="col-sm-2 control-label">Titulo 1: </label>
      <div class="col-sm-10">        
          <input name="title1" type="text" class="form-control" id="title1" placeholder="titulo principal" value="<?=value(@$player, 'title1')?>">
      </div>        
    </div>
    <div class="form-group">
      <label for="title2" class="col-sm-2 control-label">Titulo 2: </label>
      <div class="col-sm-10">        
          <input name="title2" type="text" class="form-control" id="title2" placeholder="titulo secundario" value="<?=value(@$player, 'title2')?>">
      </div>        
    </div>
    <div class="form-group">
      <label for="release_url" class="col-sm-2 control-label">Release url: </label>
      <div class="col-sm-10">        
          <input name="release_url" type="text" class="form-control" id="release_url" placeholder="url del release" value="<?=value(@$player, 'release_url')?>">
      </div>        
    </div>
    <div class="form-group">
        <label for="width" class="col-sm-2 control-label">Fecha de inicio: </label>
      <div class="col-sm-4">
        <div class='input-group date' id='countdown_datepicker' data-date-format="YYYY-MM-DD HH:mm:00">
          <input type='text' class="form-control" placeholder="fecha de inicio" name="countdown_date" value="<?=value(@$player, 'countdown_date')?>"/>
          <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
        </div>
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
<script>
  $(function () {
      $('#countdown_datepicker').datetimepicker();
  });
</script>          