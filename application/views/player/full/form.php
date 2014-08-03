<form class="form-horizontal" action="<?=site_url($base_url . '/save')?>" method="POST">

  <ul id="tabs" class="nav nav-tabs" role="tablist">
    <li class="active"><a href="#data">Data</a></li>
    <? if(isset($player)): ?>
      <li><a href="#graphics">Graficas</a></li>    
    <? endif ?>
  </ul>

  <div class="tab-content">

    <div class="tab-pane fade active in" id="data">
      <input type="hidden" name="id" value="<?=value(@$player, 'id')?>" />
      <input type="hidden" name="version" value="<?=value(@$player, 'version')?>" />
      <input type="hidden" name="upload_state" value="<?=@$player['upload_state']?MODIFIED:''?>" />
      <div class="form-group">
          <label for="name" class="col-sm-2 control-label">Nombre: </label>
          <div class="col-sm-10">        
              <input name="name" type="text" class="form-control" id="name" placeholder="Ingresa un nombre" value="<?=value(@$player, 'name')?>">
          </div>        
        </div>
        <div class="form-group">
          <label for="description" class="col-sm-2 control-label">Descripci&oacute;n: </label>
          <div class="col-sm-10">
              <textarea name="description" class="form-control" rows="3"><?=value(@$player,'description')?></textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="width" class="col-sm-2 control-label">Ancho(px): </label>
          <div class="col-sm-4">
              <input name="width" type="text" class="form-control" id="width" placeholder="Ingresa el ancho en px" value="<?=value(@$player, 'width')?>">
          </div>
          <label for="height" class="col-sm-2 control-label">Alto(px): </label>
          <div class="col-sm-4">
              <input name="height" type="text" class="form-control" id="height" placeholder="Ingresa el alto en px" value="<?=value(@$player, 'height')?>">
          </div>
        </div>

      <div class="form-group">
          <label for="show_right_controller" class="col-sm-2 control-label">Mostrar menu lateral: </label>
          <div class="col-sm-10">
              <input type="checkbox" name="show_right_controller" value="1" <?=check(@$player, 'show_right_controller')?> />
          </div>
        </div>

        <div class="form-group">
          <label for="initial_view_mode" class="col-sm-2 control-label">Vista inicial: </label>
          <div class="col-sm-4">
              <select name="initial_view_mode" class="form-control multiselect">
                <?php foreach ($viewModes as $viewMode): ?>
                  <option value="<?=$viewMode['id']?>" <?=select(@$player, 'initial_view_mode', $viewMode)?> ><?=$viewMode['name']?></option>
                <?php endforeach ?>
              </select>
          </div>
        </div>
        <div class="form-group">
          <label for="available_view_modes" class="col-sm-2 control-label">Vistas disponibles: </label>
          <div class="col-sm-4">          
              <select name="available_view_modes[][id]" class="form-control multiselect" multiple>
                <?php foreach ($viewModes as $viewMode): ?>
                  <option value="<?=$viewMode['id']?>"<?=select_multiple(@$player, 'available_view_modes', $viewMode)?> ><?=$viewMode['name']?></option>
                <?php endforeach ?>
              </select>
          </div>
        </div>
        <? $this->load->view('player/full/feeds.php'); ?>
        <? $this->load->view('player/full/info_items.php'); ?>
      
    </div>
    <div class="tab-pane fade" id="graphics">
       <? $this->load->view('player/full/graphics.php'); ?>
    </div>
    <input type="submit" name="submit" value="guardar" class="pull-right btn btn-primary"  />
  </div>
	
</form>
<script>
$('#tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

</script>