<?php
class Login extends CI_Controller {

	public function index(){
		$this->load->helper('form');
		$this->load->view('login/login');			
	}

	public function check(){
   		$this->load->library('form_validation');
   		$this->form_validation->set_rules('username', 'usuario', 'trim|required');
   		$this->form_validation->set_rules('password', 'clave', 'trim|required|callback_check_database');

   		if($this->form_validation->run() == FALSE){
        $data['error'] = TRUE;
     		$this->load->view('login/login', $data);
     	} else {
     		redirect('full_player', 'refresh');
   		}
 	}

 	public function check_database($password){
   		$this->load->model('user_model');	
   		$username = $this->input->post('username');
   		$result = $this->user_model->login($username, $password);
   		if($result){ 
   			$sess_array = array(
     			'id' => $result['id'],
     			'username' => $result['username']
   			);
       	$this->session->set_userdata('logged_in', $sess_array);
     		return TRUE;
   		} else {
     		$this->form_validation->set_message('check_database', 'Usuario o clave incorrecta.');
     		return false;
   		}
 	}

 	public function logout(){
   		$this->session->unset_userdata('logged_in');   		      
      print 123;
   		redirect('', 'refresh');
 	}

}