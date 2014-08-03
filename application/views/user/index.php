<div class="panel panel-default row">
	<div class="panel-heading">
		<h2>Listado de usuarios</h2>
	</div>		
	<div class="panel-body">
		<a href="<?=base_url('user/create')?>" class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span> agregar</a>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Usuario</th>					
					<th></th>
				</tr>	
			</thead>
			<?php foreach ($users as $user_item): ?>
				<tr>
					<td><?=$user_item['name']?></td>
					<td><?=$user_item['username']?></td>		
					<td class="text-right">
						<a href="<?=base_url("user/edit/" . $user_item['id'])?>" class="action-button" data-toggle="tooltip" data-placement="top" title="" data-original-title="editar">
							<span class="glyphicon glyphicon-pencil green"></span>
						</a>
						<a href="<?=base_url("user/delete/" . $user_item['id'])?>" class="action-button" data-toggle="tooltip" data-placement="top" title="" data-original-title="eliminar"><span class="glyphicon glyphicon-trash red"></span></a>					
					</td>
				</tr>
			<?php endforeach ?>
		</table>
	</div>
</div>
<script>
$(function () { 
    $("[data-toggle='tooltip']").tooltip(); 
});
</script>