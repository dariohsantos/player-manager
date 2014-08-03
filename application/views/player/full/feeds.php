	<div id="feeds">
		<div class="panel panel-default">
  		<div class="panel-heading">
  			<h3>Feeds</h3>
  		</div>
		<div class="panel-body">
			<div class="form-group row col-sm-12">
  				<a href="#add-feed">agregar feed</a>
  			</div>	  			
  			<div  id="feed-items" class="col-sm-12">
          <? $feeds = @$player['feeds']?$player['feeds']:array(); ?>
          <?php foreach ($feeds as $feedIndex => $feed): ?>
            <div class="form-group feed-row">
              <label for="feeds[name]" class="col-sm-1 control-label">Nombre: </label>
              <div class="col-sm-2">
                  <input name="feeds[<?=$feedIndex?>][name]" type="text" class="form-control" id="height" placeholder="nombre" value="<?=value(@$feed, 'name')?>">
              </div>
              <label for="feeds[url]" class="col-sm-1 control-label">Url: </label>
              <div class="col-sm-4">
                  <input name="feeds[<?=$feedIndex?>][url]" type="text" class="form-control" id="width" placeholder="url" value="<?=value(@$feed, 'url')?>">
              </div>
              <label for="feeds[init]" class="col-sm-1 control-label">Default: </label>
              <div class="col-sm-1">
                <input type="checkbox" name="feeds[<?=$feedIndex?>][init]" class="default-feed-check" value="1" <?=check(@$feed, 'init')?> />
              </div>
              <div class="col-sm-2">
                <a href="#remove-feed" class="btn btn-danger ">eliminar</a>
              </div>
            </div>
        <?php endforeach ?>
  		</div>
		</div>
	</div>
</div>


<script id="feed-row" type="text/x-handlebars-template">
  <div class="form-group feed-row">
      <label for="feeds[][name]" class="col-sm-1 control-label">Nombre: </label>
      <div class="col-sm-2">
          <input name="feeds[{{feedIndex}}-n][name]" type="text" class="form-control" id="height" placeholder="nombre" value="">
      </div>
      <label for="feeds[][url]" class="col-sm-1 control-label">Url: </label>
      <div class="col-sm-4">
          <input name="feeds[{{feedIndex}}-n][url]" type="text" class="form-control" id="width" placeholder="url" value="">
      </div>
      <label for="feeds[][init]" class="col-sm-1 control-label">Default: </label>
      <div class="col-sm-1">
        <input type="checkbox" name="feeds[{{feedIndex}}-n][init]" class="default-feed-check" value="1" />
      </div>
      <div class="col-sm-2">
        <a href="#remove-feed" class="btn btn-danger">eliminar</a>
      </div>
    </div>
</script>
<script>
  var feedIndex = 0;

  $(document).ready(function(){
    $("a[href='#add-feed']").on("click", addFeedRow);    
  })

  $(document).on("click","a[href='#remove-feed']", removeFeedRow);
  $(document).on("change",".default-feed-check", setDefaultFeed);

  function addFeedRow(){

    var context = {feedIndex: feedIndex}
    var source   = $("#feed-row").html();
    var template = Handlebars.compile(source);    
    $("#feed-items").prepend(template(context));
    feedIndex++;
  }

  function removeFeedRow(){    
    $(this).parents(".feed-row").remove();
  }

  function setDefaultFeed(e){    
    $(".default-feed-check").attr("checked", false);
    e.currentTarget.checked = true;
  }
</script>