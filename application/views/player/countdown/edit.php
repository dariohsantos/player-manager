<div class="panel panel-default row">
	<div class="panel-heading"><h2>Editar <?=$player['name']?></h2></div>
  	<div class="panel-body">
  		<div class="col-sm-12">
  			<a href="<?=site_url('player')?>" class="pull-right">volver</a>
  		</div>
		<div class="col-sm-10">
			<? if(isset($error) and $error): ?>
				<div class="alert alert-danger alert-dismissable">
				  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
				  <?php echo validation_errors(); ?>
				</div>
			<? endif ?>

			<? $this->load->view('player/countdown/form.php'); ?>
		</div>
	</div>
</div>