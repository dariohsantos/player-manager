<form class="form-horizontal" action="<?=base_url('user/save')?>" method="POST">
	<input type="hidden" name="id" value="<?=value(@$user, 'id')?>" />
	<div class="form-group">
    	<label for="name" class="col-sm-2 control-label">Nombre: </label>
    	<div class="col-sm-10">        
      		<input name="name" type="text" class="form-control" id="name" placeholder="Ingresa un nombre" value="<?=value(@$user, 'name')?>">
   	 	</div>	   	 	
  	</div>
  	<div class="form-group">
    	<label for="username" class="col-sm-2 control-label">Usuario: </label>
    	<div class="col-sm-10">
      		<input name="username" type="text" class="form-control" id="username" placeholder="nombre de usuario" value="<?=value(@$user, 'username')?>">
   	 	</div>
  	</div>
  	<div class="form-group">
    	<label for="password" class="col-sm-2 control-label">Clave:</label>
    	<div class="col-sm-10">
      		<input name="password" type="password" class="form-control" id="password" placeholder="" value="">
   	 	</div>
  	</div>
    <div class="form-group">
      <label for="password_confirm" class="col-sm-2 control-label">Confirmar clave:</label>
      <div class="col-sm-10">
          <input name="password_confirm" type="password" class="form-control" id="password_confirm" placeholder="" value="">
      </div>
    </div>

	

    <input type="submit" name="submit" value="guardar" class="pull-right btn btn-primary"/>
	</div>
</form>