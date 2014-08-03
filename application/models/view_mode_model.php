<?php
include_once('db_model.php');

class View_Mode_model extends DB_model {

	public $dbEntityName = "view_mode";

	protected function getDbEntityName(){
		return $this->dbEntityName;
	}

}