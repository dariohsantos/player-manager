<?php
	include_once('db_model.php');

	Class Graphic_Image_model extends DB_model{

		public $dbEntityName = "graphic_image";

  		protected function getDbEntityName(){
    		return $this->dbEntityName;
  		}

  		public function __construct(){
    		$this->load->database();
  		}

		public function add(){
			$data = array(
				'player_id' => $this->input->post('playerId'),
			);		
						
			$this->db->insert($this->dbEntityName, $data); 
			$id = $this->db->insert_id();								
			return $id;
		}

		public function delete($fileId){
			$this->db->delete($this->dbEntityName , array('id' => $fileId)); 	
		}


	}
?>