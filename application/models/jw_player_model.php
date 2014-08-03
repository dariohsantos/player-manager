<?php
include_once('player_model.php');

class Jw_player_model extends Player_model {

	public $dbEntityName = "jw_player";

	protected function getDbEntityName(){
		return $this->dbEntityName;
	}

	public function get($id){
		$player = parent::get($id);		
		return $player;
	}

	public function delete($playerId){		
		$this->db->delete($this->getDbEntityName(), array('id' => $playerId)); 
	}

	public function setPlayer(){
		$data = array(
			'name' => $this->input->post('name'),			
			'video_url' => $this->input->post('video_url'),			
			'height' => $this->input->post('height'),
			'width' => $this->input->post('width'),		
			'upload_state' => $this->input->post('upload_state')?$this->input->post('upload_state'):null,
			'update_date' => $this->currentDate()
		);		
		$id = $this->input->post('id');
		if($id){
			$this->db->where('id', $id);
			$this->db->update($this->getDbEntityName(), $data); 			
		}
		else{
			$data['creation_date'] = $this->currentDate();
			$this->db->insert($this->getDbEntityName(), $data); 
			$id = $this->db->insert_id();	
		}	
		return $id;
	}

}