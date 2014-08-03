<?php
abstract class Player extends CI_Controller {

	protected abstract function getPlayerModelName();
	protected abstract function getFileServiceName();
	protected abstract function getFtpServiceName();
	protected abstract function initData();
	protected abstract function getPlayerViewPrefix();
	protected abstract function getPlayerControllerPrefix();
	protected abstract function setValidations();


	protected function getFileGraphicsServiceName(){
		return "file/graphics/Graphics_file_service";
	}

	public function __construct(){
		parent::__construct();
		if(!$this->session->userdata('logged_in')){
			redirect('login', 'refresh');
		}

		$this->load->model($this->getPlayerModelName(), 'player_model');				
	}

	public function index(){
		$players = $this->player_model->getAll();	
		$data['players'] = $this->decoratePlayers($players);		
		$data['view'] =$this->getView('index');		
		$data['base_url'] =$this->getBaseUrl();
		$this->load->view('templates/layout', $data);		
	}

	public function edit($id){		
		$this->load->helper('form');
		$this->load->library('form_validation');
		$data = $this->initData();		
		$data['player'] = $this->player_model->get($id);		
		$data['view'] = $this->getView('edit');
		$data['base_url'] =$this->getBaseUrl();
		$this->load->view('templates/layout', $data);		
	}

	public function create(){		
		$this->load->helper('form');
		$this->load->library('form_validation');			
		$data = $this->initData();
		$data['view'] = $this->getView('save');
		$data['base_url'] =$this->getBaseUrl();				
		$this->load->view('templates/layout', $data);		
	}

	public function save(){		
		$this->load->helper('form');
		$this->load->library('form_validation');		
		$this->load->library($this->getFileServiceName(), array(), 'file_service');
		$this->load->library($this->getFileGraphicsServiceName(), array(), 'file_graphics_service');

		$data = $this->initData();

		$this->setValidations();		

		if ($this->form_validation->run() === FALSE){
			$data['error'] = TRUE;
			$data['player'] = $_POST;
			$data['base_url'] =$this->getBaseUrl();			
			$data['view'] =$this->getView('save');		
		}else{
			$playerId = $this->player_model->setPlayer();
			$this->file_service->createOrUpdate($this->player_model->get($playerId));
			$this->file_graphics_service->createOrUpdate($this->player_model->get($playerId));
			redirect($this->getBaseUrl());		
		}
		$this->load->view('templates/layout', $data);		
	}

	public function delete($id){		
		$this->load->library($this->getFileServiceName(), array(), 'file_service');
		$this->file_service->delete($this->player_model->get($id));
		$this->player_model->delete($id);
		redirect($this->getBaseUrl());				
	}

	public function upload($id){
		$this->load->library($this->getFtpServiceName(), array(), 'ftp_service');
		$result = $this->ftp_service->createOrUpdate($this->player_model->get($id));			
		echo json_encode($result);				
	}

	public function upload_state($id){
		$player = $this->player_model->get($id);		
		if($player['upload_state'] == INIT || $player['uploaded_files'] == 0){
			$result['state'] = 0;
		} else {
			$perc = $player['uploaded_files'] / $player['total_files'] * 100;
			$result['state'] = number_format ($perc, 2);		
		}
		header('Content-Type: application/json');
		echo json_encode($result);
	}

	public function init_upload($id){
 		$this->load->library($this->getFtpServiceName(), array(), 'ftp_service');
		$this->ftp_service->prepareUpload($this->player_model->get($id));		
		$result['state'] = "OK";		
		header('Content-Type: application/json');
		echo json_encode($result);
	}

	public function iframe_code($id){	
		$this->load->library($this->getFtpServiceName(), array(), 'ftp_service');			
 		$player = $this->player_model->get($id);
 		$iframeTemplate = '<iframe src=":url" frameBorder="0" width=":widthpx" height=":heightpx" scrolling="no" AllowFullScreen="true"/>';
 		$url = $this->ftp_service->getPlayerUrl($player);
 		$result = str_replace(':url', $url, $iframeTemplate);
 		$result = str_replace(':width', $player['width'], $result);
 		$result = str_replace(':height',  $player['height'], $result);
 		$result = '<code>' . htmlentities($result) . '</code>';
		echo $result;
	}

	private function getView($view){
		return $this->getPlayerViewPrefix() . "/" . $view;
	}

	private function getBaseUrl(){
		return $this->getPlayerControllerPrefix();
	}

	private function decoratePlayers($players){
		$result = array();
		$this->load->library($this->getFileServiceName(), array(), 'file_service');
		$this->load->library($this->getFtpServiceName(), array(), 'ftp_service');
		foreach($players as $player){
			$player['local_url'] = $this->file_service->getPlayerUrl($player);
			$player['akamai_url'] = $this->ftp_service->getPlayerUrl($player);
			$result[] = $player;
		}
		return $result;
	}

}