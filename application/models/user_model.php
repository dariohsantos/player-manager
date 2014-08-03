<?php
include_once('db_model.php');

Class User_model extends DB_model{
  
  public $dbEntityName = "user";

  protected function getDbEntityName(){
    return $this->dbEntityName;
  }


  public function __construct(){
    $this->load->database();
  }

  function login($username, $password){
    $filters =  array(
      'username' => $username, 
      'password' => MD5($password)
    );
    $query = $this->db->get_where('user', $filters);
    if($query -> num_rows() == 1){
      return $query->row_array(); 
    } else {
      return false;
    }
  }

  public function getByUsername($username){
    $query = $this->db->get_where($this->getDbEntityName(), array('username' => $username));
    return $query->row_array();
  }

  public function setUser(){
    $data = array(
      'name' => $this->input->post('name'),
      'username' => $this->input->post('username')
      
    );    
    $id = $this->input->post('id');
    if($id){
      if($this->input->post('password')){
        $data['password'] = md5($this->input->post('password'));
      }      
      $this->db->where('id', $id);
      $this->db->update('user', $data);       
    }
    else{
      $data['password'] = md5($this->input->post('password'));
      $this->db->insert('user', $data); 
      $id = $this->db->insert_id(); 
    } 
    return $id;
  }

  public function delete($userId){    
    $this->db->delete('user', array('id' => $userId)); 
  }

}
?>