<?php
abstract class DB_model extends CI_Model {

	public function __construct(){
		$this->load->database();
	}

	public function getAll(){
		$query = $this->db->get($this->getDbEntityName());
		return $query->result_array();
	}

	public function get($id){
		$query = $this->db->get_where($this->getDbEntityName(), array('id' => $id));
		return $query->row_array();
	}

	protected function currentDate(){
		return date('Y-n-j G:i:s');
	}

	abstract protected function getDbEntityName();

}