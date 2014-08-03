<?php

include_once('player.php');

class Countdown_Player extends Player {

	protected function getFileServiceName(){
		return "file/Countdown_file_service";
	}

	protected function getFtpServiceName(){
		return "ftp/Countdown_ftp_service";
	}

	protected function getPlayerModelName(){
		return "countdown_player_model";
	}

	protected function getPlayerViewPrefix(){
		return "player/countdown";
	}

	protected function getPlayerControllerPrefix(){
		return "countdown_player";
	}

	protected function initData(){
		$data = array();		
		return $data;
	}
	
	public function setValidations(){
		$this->form_validation->set_rules('name', 'nombre', 'required');		
		$this->form_validation->set_rules('width', 'ancho', 'required|integer');				
		$this->form_validation->set_rules('height', 'alto', 'required|integer');		
		$this->form_validation->set_rules('release_url', 'release url', 'required');		
		$this->form_validation->set_rules('countdown_date', 'fecha de inicio', 'required');		
	}
}