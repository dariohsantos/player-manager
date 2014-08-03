<?php
include_once('player_model.php');

class Full_Player_model extends Player_model {

	public $dbEntityName = "player";

	protected function getDbEntityName(){
		return $this->dbEntityName;
	}

	public function get($id){
		$player = parent::get($id);
		$player['available_view_modes'] = $this->getViewModes($player['id']);
		$player['feeds'] = $this->getFeeds($player['id']);
		$player['info_items'] = $this->getInfoItems($player['id']);
		$player['graphic_positions'] = $this->getGraphicPositions($player['id']);
		$player['graphic_images'] = $this->getGraphicImages($player['id']);
		return $player;
	}

	public function delete($playerId){
		$this->db->delete('player_view_mode', array('player_id' => $playerId)); 
		$this->db->delete('feed', array('player_id' => $playerId)); 
		$this->db->delete('player', array('id' => $playerId)); 
	}

	public function setPlayer(){

			$version = 1;
			if($this->input->post('version')){
				$version = $this->input->post('version') +1;
			}
		
		$data = array(

			
			'name' => $this->input->post('name'),
			'description' => $this->input->post('description'),
			'height' => $this->input->post('height'),
			'width' => $this->input->post('width'),
			'initial_view_mode' => $this->input->post('initial_view_mode'),
			'show_right_controller' => $this->input->post('show_right_controller'),
			'upload_state' => $this->input->post('upload_state')?$this->input->post('upload_state'):null,
			'update_date' => $this->currentDate(),
			'version' => $version
 		);		
		$id = $this->input->post('id');
		if($id){
			$this->db->where('id', $id);
			$this->db->update('player', $data); 			
		}
		else{
			$data['creation_date'] = $this->currentDate();
			$this->db->insert('player', $data); 
			$id = $this->db->insert_id();	
		}	
		$this->setViewModes($id);
		$this->setFeeds($id);
		$this->setInfoItems($id);
		$this->setGraphicPositions($id);
		return $id;
	}

	public function getViewModes($playerId){
		$this->db->select('view_mode.*');
		$this->db->from('player_view_mode');
		$this->db->join('view_mode', 'player_view_mode.view_mode_id = view_mode.id');
		$this->db->where('player_view_mode.player_id', $playerId); 
		$query = $this->db->get();
		return $query->result_array();
	}

	public function setGraphicPositions($playerId){
		$this->db->delete('graphic_position', array('player_id' => $playerId)); 
		$graphicPositions = $this->input->post('graphic_position');
		foreach($graphicPositions as $graphicPosition){
			$data = array(
				'player_id' => $playerId,
				'name' => $graphicPosition['name'],
				'x-position' => $graphicPosition['x-position'],
				'y-position' => $graphicPosition['y-position'],
				'width' => $graphicPosition['width'],
				'height' => $graphicPosition['height'],
				'graphic_image_id' => $graphicPosition['graphic_image_id'],
			);
			$this->db->insert('graphic_position', $data); 
		}
	}

	public function setViewModes($playerId){
		$this->db->delete('player_view_mode', array('player_id' => $playerId)); 
		$viewModes = $this->input->post('available_view_modes');
		foreach($viewModes as $viewMode){
			$data = array(
				'player_id' => $playerId,
				'view_mode_id' => $viewMode['id']
			);
			$this->db->insert('player_view_mode', $data); 
		}		
	}

	public function getFeeds($playerId){
		$query = $this->db->get_where('feed', array('player_id' => $playerId));
		return $query->result_array();
	}

	public function getInfoItems($playerId){
		$query = $this->db->get_where('info_item', array('player_id' => $playerId));
		return $query->result_array();
	}

	public function getGraphicPositions($playerId){
		$query = $this->db->get_where('graphic_position', array('player_id' => $playerId));
		return $query->result_array();
	}

	public function getGraphicImages($playerId){		
		$query = $this->db
	    ->select('image.*, position.name graphic_position_name')
	    ->from('graphic_image as image')
	    ->join('graphic_position as position', 'position.graphic_image_id = image.id', 'left')
	    ->where('image.player_id', $playerId)
	    ->get(); 
		return $query->result_array();
	}

	public function setFeeds($playerId){
		$this->db->delete('feed', array('player_id' => $playerId)); 
		$feeds = $this->input->post('feeds');
		foreach($feeds as $feed){
			$data = array(
				'player_id' => $playerId,
				'name' => $feed['name'],
				'url' => $feed['url'],
				'init' => isset($feed['init'])?$feed['init']:0
			);
			$this->db->insert('feed', $data); 
		}		
	}

	public function setInfoItems($playerId){
		$this->db->delete('info_item', array('player_id' => $playerId)); 
		$items = $this->input->post('info_items');
		if($items){
			foreach($items as $item){
				$data = array(
					'player_id' => $playerId,
					'name' => $item['name'],
					'data' => $item['data'],
					'init' => isset($item['init'])?$item['init']:0
				);
				$this->db->insert('info_item', $data); 
			}	
		}	
	}

}