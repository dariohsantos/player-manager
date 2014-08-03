<html>
<head>
	<title><?php echo isset($title)?$title:'Player manager' ?></title>
	<?php Assets::css(array('bootstrap.css', 'style.css', 'fancybox/fancybox.css', 'bootstrap-multiselect.css', 'bootstrap-datetimepicker.css','jquery-ui.min.css','uploadify.css'));?>
	<?php Assets::js(array('jquery.js', 'bootstrap.js','handlebars.js', 'fancybox.js', 'ckeditor/ckeditor.js', 'bootstrap-multiselect.js', 'moment.js', 'bootstrap-datetimepicker.js',  'init.js', 'handlebars-v1.3.0.js', 'jquery-ui.min.js', 'uploadify/jquery.uploadify.min.js', 'messages.js'));?>
</head>
<body>
	<? $this->load->view('templates/header.php'); ?>	
	<? $this->load->view('templates/menu.php'); ?>
	<div class="content">
		<div class="container">			
			<? $this->load->view($view); ?>
		</div>
	</div>
		<? $this->load->view('templates/footer.php'); ?>	
	</body>
</html>