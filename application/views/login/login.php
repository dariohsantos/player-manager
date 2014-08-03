<html>
<head>
	<title>Player manager</title>
	<?php Assets::css(array('bootstrap.css', 'style.css', 'fancybox/fancybox.css', 'bootstrap-multiselect.css', 'bootstrap-datetimepicker.css'));?>
	<?php Assets::js(array('jquery.js', 'bootstrap.js','handlebars.js', 'fancybox.js', 'ckeditor/ckeditor.js', 'bootstrap-multiselect.js', 'moment.js', 'bootstrap-datetimepicker.js',  'init.js'));?>
</head>
<body>	
	<? $this->load->view('templates/header.php'); ?>		
	<div class="content">
		<div class="container col-sm-4 col-sm-offset-4">			
			<div class="login panel panel-default">
				<div class="panel-heading">
					<h2>Player manager</h2>
				</div>
				<div class="panel-body">
					<? if(isset($error) and $error): ?>
						<div class="alert alert-danger alert-dismissable">
						  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
						  <?php echo validation_errors(); ?>
						</div>
					<? endif ?>
					<form class="form-horizontal" action="<?=site_url('login/check')?>" method="POST">						
						<div class="form-group">
					    	<label for="username" class="col-sm-2 control-label">Usuario: </label>
					    	<div class="col-sm-10">        
					      		<input name="username" type="text" class="form-control" id="username" placeholder="nombre de usuario" value="<?=set_value('username')?>">
					   	 	</div>	   	 	
					  	</div>
					  	<div class="form-group">
					    	<label for="password" class="col-sm-2 control-label">Clave: </label>
					    	<div class="col-sm-10">        
					      		<input name="password" type="password" class="form-control" id="password" placeholder="contrase&ntilde;a" value="">
					   	 	</div>	   	 	
					  	</div>
					  	<input type="submit" class="btn btn-primary" value="Ingresar" name="ingresar" >
					</form>

				</div>
			</div>
		</div>
	</div>
		<? $this->load->view('templates/footer.php'); ?>	
	</body>
</html>