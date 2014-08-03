<?php
class User extends CI_Controller {

	public function __construct(){
		parent::__construct();
		if(!$this->session->userdata('logged_in')){
			redirect('login', 'refresh');
		}
		$this->load->model('user_model');		
	}

	public function index(){
		$data['users'] = $this->user_model->getAll();		
		$data['view'] = 'user/index';
		$data['title'] = 'users';
		$this->load->view('templates/layout', $data);		
	}

	public function edit($id){		
		$this->load->helper('form');
		$this->load->library('form_validation');
		$data['user'] = $this->user_model->get($id);
		$data['view'] = 'user/edit';				
		$this->load->view('templates/layout', $data);		
	}

	public function create(){		
		$this->load->helper('form');
		$this->load->library('form_validation');			
		$data['view'] = 'user/save';				
		$this->load->view('templates/layout', $data);		
	}

	public function save(){		
		$this->load->helper('form');
		$this->load->library('form_validation');				

		$this->setValidations();		

		if ($this->form_validation->run() === FALSE){
			$data['error'] = TRUE;
			$data['user'] = $_POST;
			$data['view'] = 'user/save';		
		}else{
			$userId = $this->user_model->setUser();		
			redirect('/user');		
		}
		$this->load->view('templates/layout', $data);		
	}

	public function delete($id){		
		$this->load->library('file_service');		
		$this->user_model->delete($id);
		redirect('/user');		
	}

	 public function check_confirm($passwordConfirm){
   		$this->load->model('user_model');	
   		$password = $this->input->post('password');   		
   		if($password == $passwordConfirm){
   			return true;
   		} else {
     		$this->form_validation->set_message('check_confirm', 'La clave y la confirmacion no coinciden.');
     		return false;
   		}
 	}

 	public function check_unique_user($username){
   		$this->load->model('user_model');	
   		$user = $this->user_model->getByUsername($username);   		
   		$id = @$this->input->post('id');
   		if(!$user || $user['id'] == $id){
   			true;   			
   		} else {
     		$this->form_validation->set_message('check_unique_user', 'Ya existe el usuario: ' . $username . ".");
     		return false;   			
   		}
 	}

	public function setValidations(){
		$this->form_validation->set_rules('name', 'nombre', 'required');		
		$this->form_validation->set_rules('username', 'nombre de usuario', 'required|callback_check_unique_user');
		if($this->input->post('id')){			
			$this->form_validation->set_rules('password_confirm', 'confirmacion de clave', 'callback_check_confirm');						
		}
		else{
			$this->form_validation->set_rules('password', 'clave', 'required');		
			$this->form_validation->set_rules('password_confirm', 'confirmacion de clave', 'required|callback_check_confirm');						
		}
		
	}
}