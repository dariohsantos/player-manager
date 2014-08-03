	<div id="aditional_info">
		<div class="panel panel-default">
  		<div class="panel-heading">
  			<h3>Informaci&oacute;n adicional</h3>
  		</div>
		<div class="panel-body">
			<div class="form-group row col-sm-12">
  				<a href="#add-info-item">agregar item</a>
  			</div>	  			
  			<div  id="info-items" class="col-sm-12">
          <? $items = @$player['info_items']?$player['info_items']:array(); ?>
          <?php foreach ($items as $itemIndex => $item): ?>
            <div class="info-item-row">
              <div class="form-group">
                <label for="info_items[name]" class="col-sm-1 control-label">Nombre: </label>
                <div class="col-sm-2">
                    <input name="info_items[<?=$itemIndex?>][name]" type="text" class="form-control" id="height" placeholder="nombre" value="<?=value(@$item, 'name')?>">
                </div>
              </div>
              <div class="form-group">
                <label for="info_items[data]" class="col-sm-1 control-label">Texto: </label>
                <div class="col-sm-8">                
                    <textarea name="info_items[<?=$itemIndex?>][data]" class="form-control tinymce" rows="5"><?=value(@$item,'data')?></textarea>
                </div>
                <div class="col-sm-2">
                  <a href="#remove-info-item" class="btn btn-danger pull-right">eliminar</a>
                </div>
              </div>
              <hr/>
            </div>
        <?php endforeach ?>
  		</div>
		</div>
	</div>
</div>


<script id="info-item-row" type="text/x-handlebars-template">
  <div class="info-item-row">
    <div class="form-group">
      <label for="info_items[][name]" class="col-sm-1 control-label">Nombre: </label>
      <div class="col-sm-2">
          <input name="info_items[{{infoIndex}}-n][name]" type="text" class="form-control" id="height" placeholder="nombre" value="">
      </div>
    </div>
    <div class="form-group">
      <label for="info_items[][data]" class="col-sm-1 control-label">Texto: </label>
      <div class="col-sm-8">          
          <textarea name="info_items[{{infoIndex}}-n][data]" class="form-control tinymce" rows="5"></textarea>
      </div>  
      <div class="col-sm-2">
        <a href="#remove-info-item" class="btn btn-danger  pull-right">eliminar</a>
      </div>
    </div>
    <hr/>
  </div>
</script>
<script>
  var infoIndex = 0;

  $(document).ready(function(){
    $("a[href='#add-info-item']").on("click", addInfoItemRow);  

    $(document).on("click","a[href='#remove-info-item']", removeInfoItemRow);
                    
  })

  function addInfoItemRow(){
    var context = {infoIndex: infoIndex}
    var source   = $("#info-item-row").html();
    var template = Handlebars.compile(source);    
    $("#info-items").prepend(template(context));
    infoIndex++;
  }

  function removeInfoItemRow(){    
    $(this).parents(".info-item-row").remove();
  }


</script>