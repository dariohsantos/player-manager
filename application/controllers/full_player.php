<?php

include_once('player.php');

class Full_Player extends Player {

	public function __construct(){
		parent::__construct();
		$this->load->model('view_mode_model');		
	}

	protected function getFileServiceName(){
		return "file/Full_file_service";
	}

	protected function getFtpServiceName(){
		return "ftp/Full_ftp_service";
	}

	protected function getPlayerModelName(){
		return "full_player_model";
	}

	protected function getPlayerViewPrefix(){
		return "player/full";
	}

	protected function getPlayerControllerPrefix(){
		return "full_player";
	}

	protected function initData(){
		$data = array();
		$data['viewModes'] = $this->view_mode_model->getAll();
		return $data;
	}

	protected function setValidations(){
		$this->form_validation->set_rules('name', 'nombre', 'required');		
		$this->form_validation->set_rules('width', 'ancho', 'required|integer');				
		$this->form_validation->set_rules('height', 'alto', 'required|integer');		
		$this->form_validation->set_rules('initial_view_mode', 'vista inicial', 'required');		
		$this->form_validation->set_rules('available_view_modes', 'vistas disponibles', 'required');
		$this->form_validation->set_rules('feeds', 'feeds', 'required');
	}

}