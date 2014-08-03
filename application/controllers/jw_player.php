<?php

include_once('player.php');

class Jw_Player extends Player {

	protected function getFileServiceName(){
		return "file/Jw_file_service";
	}

	protected function getFtpServiceName(){
		return "ftp/Jw_ftp_service";
	}

	protected function getPlayerModelName(){
		return "jw_player_model";
	}

	protected function getPlayerViewPrefix(){
		return "player/jwplayer";
	}

	protected function getPlayerControllerPrefix(){
		return "jw_player";
	}

	protected function initData(){
		$data = array();		
		return $data;
	}
	
	public function setValidations(){
		$this->form_validation->set_rules('name', 'nombre', 'required');		
		$this->form_validation->set_rules('width', 'ancho', 'required|integer');				
		$this->form_validation->set_rules('height', 'alto', 'required|integer');		
		$this->form_validation->set_rules('video_url', 'video url', 'required');				
	}
}