<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

abstract class CI_File_service {

	private	$playersFolder = 'players';
	var $ci;

	abstract protected function getJsonForConfig($player);
	abstract protected function getPlayerPrefix();
	abstract protected function getBasePlayerFolder();
	abstract protected function getConfigFilePath($player);

	protected function getPlayerFolder($player){
		return FCPATH . $this->playersFolder . '/' . $this->getPlayerPrefix() . url_title($player['name']);
	}

	public function delete($player){
		$this->recursive_delete($this->getPlayerFolder($player));
	}

	public function getPlayerUrl($player){		
		return site_url() . $this->playersFolder . '/' . $this->getPlayerPrefix() . url_title($player['name']) . '/player.html';
	}

	public function createOrUpdate($player){
		$this->ci = & get_instance();
		$this->ci->load->helper('path');
		$this->ci->load->helper('url');
		$this->ci->load->model('view_mode_model');
		$currentPlayerFolder = $this->getPlayerFolder($player);
		if(is_dir($currentPlayerFolder)){
			$this->update($player);
		}
		else{			
			$this->create($player);
		}		
	}

	private function create($player){
		$this->recurse_copy($this->getBasePlayerFolder(), $this->getPlayerFolder($player));
		$json = $this->updateConfigFile($player);
	}

	private function update($player){
		$json = $this->updateConfigFile($player);
	}

	private function updateConfigFile($player){
		$playerFolder = $this->getPlayerFolder($player);
		$configFilePath = $this->getConfigFilePath($player);			
		$configFile = fopen($configFilePath, "w");

		$data = "config = " . $this->getJsonForConfig($player);

		fwrite($configFile, $data);
		fclose($configFile);		
	}

	private function recurse_copy($src,$dst) { 
	    $dir = opendir($src); 
	    mkdir($dst); 
	    while(false !== ( $file = readdir($dir)) ) { 
	        if (( $file != '.' ) && ( $file != '..' )) { 
	            if ( is_dir($src . '/' . $file) ) { 
	                $this->recurse_copy($src . '/' . $file,$dst . '/' . $file); 
	            } 
	            else { 
	                copy($src . '/' . $file,$dst . '/' . $file); 
	            } 
	        } 
	    } 
	    closedir($dir); 
	} 

	private function recursive_delete($str){
        if(is_file($str)){
            return @unlink($str);
        }
        elseif(is_dir($str)){
            $scan = glob(rtrim($str,'/').'/*');
            foreach($scan as $index=>$path){
                $this->recursive_delete($path);
            }
            return @rmdir($str);
        }
    }

}