<?php
include_once('db_model.php');

abstract Class Player_model extends DB_model{      

  public function __construct(){
    $this->load->database();
  }

 public function prepareUpload($playerId){
    $data = array(
      'upload_state' => INIT,
      'total_files' => 0,
      'uploaded_files' => 0
    );
    $this->db->where('id', $playerId);
    $this->db->update($this->getDbEntityName(), $data);
  }

  public function initUpload($playerId, $totalFiles){
    $data = array(
      'upload_state' => UPLOADING,
      'total_files' => $totalFiles,
      'uploaded_files' => 0
    );
    $this->db->where('id', $playerId);
    $this->db->update($this->getDbEntityName(), $data);
  }

  public function incrementCounter($playerId){
    $player = $this->get($playerId);
    $uploadedFiles = $player['uploaded_files'] + 1;
    $data = array(     
      'uploaded_files' => $uploadedFiles
    );
    $this->db->where('id', $playerId);
    $this->db->update($this->getDbEntityName(), $data);       
  }

  public function finalizeUpload($playerId){
    $player = $this->get($playerId);
    $data = array(     
      'upload_state' => FINISHED
    );

    $this->db->where('id', $playerId);
    $this->db->update($this->getDbEntityName(), $data);    
  }

 
}
?>