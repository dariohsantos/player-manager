<?php
include_once('player_model.php');

class Countdown_player_model extends Player_model {

	public $dbEntityName = "countdown_player";

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
			'description' => $this->input->post('description'),
			'title1' => $this->input->post('title1'),
			'title2' => $this->input->post('title2'),
			'release_url' => $this->input->post('release_url'),
			'countdown_date' => $this->input->post('countdown_date'),
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