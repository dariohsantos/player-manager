<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

abstract class Ftp_service {

	protected $ci;
	private $akamaiServer;
	private $akamaiBaseUrl;
	private $akamaiUser;
	private $akamaiPass;
	private $playersFolder = 'players';
	
	protected abstract function getConfigFileLocation();
	protected abstract function getPlayerPrefix();
	protected abstract function getPlayerModelName();
	protected abstract function update($player, $conn_id);


	public function __construct(){		
		$this->ci = & get_instance();
		$this->ci->load->config('ftp');
		$this->ci->load->helper('url');
		$this->ci->load->library('ftp/utils/Akamai_utils', array(), 'akamai_utils');		
		$this->ci->load->model($this->getPlayerModelName(), 'player_model');	

		$this->akamaiServer = $this->ci->config->item('akamai_server');
		$this->akamaiUser = $this->ci->config->item('akamai_user');
		$this->akamaiPass = $this->ci->config->item('akamai_pass');
		$this->akamaiBaseDir = $this->ci->config->item('akamai_base_dir');		
		$this->akamaiBaseUrl = $this->ci->config->item('akamai_base_url');		
	}

	public function getPlayerUrl($player){
		return $this->akamaiBaseUrl . '/' . $this->getPlayerPrefix() . url_title($player['name']) . '/player.html';
	}

	public function prepareUpload($player){		
		$this->ci->load->model($this->getPlayerModelName(), 'player_model');
		$this->ci->player_model->prepareUpload($player['id']);	
	}

	public function createOrUpdate($player){				
		$playerDir = $this->getDestPath($player);

		$conn_id = ftp_connect($this->akamaiServer); 
		
		ftp_login($conn_id, $this->akamaiUser, $this->akamaiPass );
		ftp_pasv($conn_id, true);
		
		$resutl = array();
		if (!@ftp_chdir($conn_id, $playerDir)) {
			$result = $this->create($player, $conn_id);
		} else {
			$result = $this->update($player, $conn_id);
		}
		ftp_close($conn_id);	
		return $result;			
	}

	private function create($player, $conn_id){
		$srcDir =  $this->getSourcePath($player);
		$dstDir = $this->getDestPath($player);	
		$fileCount = $this->getFileCount($srcDir);
		$this->ci->player_model->initUpload($player['id'], $fileCount);	
		$this->uploadRecursive($conn_id, $player, $srcDir, $dstDir);		
		$this->ci->player_model->finalizeUpload($player['id']);
		return $result['state'] = 'ok';
	}

	protected function getSourcePath($player){		
		return  FCPATH . $this->playersFolder . '/' . $this->getPlayerPrefix() . url_title($player['name']);
	}

	protected function getDestPath($player){		
		return $this->akamaiBaseDir . '/' . $this->getPlayerPrefix() . url_title($player['name']);
	}


	protected function getConfigFileSoure($player){
		return $this->getSourcePath($player) . "/" . $this->getConfigFileLocation();
	}

	protected function getConfigFileDest($player){
		return $this->getDestPath($player) . "/" . $this->getConfigFileLocation();
	}

	protected function uploadRecursive($conn_id, $player, $src_dir, $dst_dir) {		
	    $d = dir($src_dir);
	    ftp_mkdir($conn_id, $dst_dir);
	    $uploadedFiles = array();
	    while($file = $d->read()) { 
	        if ($file != "." && $file != "..") { 
	            if (is_dir($src_dir."/".$file)) { 
	                if (!@ftp_chdir($conn_id, $dst_dir."/".$file)) {
	                    ftp_mkdir($conn_id, $dst_dir."/".$file); 
	                }
	                $result = $this->uploadRecursive($conn_id, $player, $src_dir."/".$file, $dst_dir."/".$file);
	                $uploadedFiles = array_merge($uploadedFiles, $result);
	            } else {
	            	$srcFile = $src_dir."/".$file;
	            	$dstFile = $dst_dir."/".$file;
	                $upload = ftp_put($conn_id, $dstFile, $srcFile, FTP_BINARY);
	                $this->ci->player_model->incrementCounter($player['id']);		                
	                array_push($uploadedFiles, $dstFile);	                
	            }
	        }
	    }	  
	    $d->close();	    	    	   
	    return $uploadedFiles;
	}

	protected function getFileCount($path){
	    $size = 0;
	    $ignore = array('.','..','cgi-bin','.DS_Store');
	    $files = scandir($path);

	    foreach($files as $t) {
	        if(in_array($t, $ignore)) continue;
	        if (is_dir(rtrim($path, '/') . '/' . $t)) {
	            $size += $this->getFileCount(rtrim($path, '/') . '/' . $t);
	        } else {
	            $size++;
	        }   
	    }
    	return $size;
	}

	protected function getFilesList($path){		
		$size = 0;
	    $ignore = array('.','..','cgi-bin','.DS_Store');
	    $files = scandir($path);
 	    $list = array();
	    foreach($files as $t) {
	        if(in_array($t, $ignore)) continue;
	        array_push($list, rtrim($path, '/') . '/' . $t);
	        if (is_dir(rtrim($path, '/') . '/' . $t)) {
	        	$list = array_merge($list, $this->getFilesList(rtrim($path, '/') . '/' . $t));	            
	        }  
	    }
    	return $list;
	}

}