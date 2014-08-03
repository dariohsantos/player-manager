<nav class="navbar navbar-default" role="navigation">   
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<div class="container">
			<ul class="nav navbar-nav">
				<li class="dropdown">					
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">players <b class="caret"></b></a>
					<ul  class="dropdown-menu">
						<li><a href="<?=base_url('full_player')?>">full controller</a></li>
						<li><a href="<?=base_url('countdown_player')?>">count down</a></li>
						<li><a href="<?=base_url('jw_player')?>">jw</a></li>
					</ul>
				</li>				
				<li><a href="<?=base_url('user')?>">usuarios</a></li>
			</ul> 
			<ul class="nav navbar-nav navbar-right">
		        <li><a href="<?=base_url('login/logout')?>">logout</a></li>		    
	      	</ul>
		</div>
	</div>
</nav>