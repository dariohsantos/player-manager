<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('Ftp_service.php');

class Jw_ftp_service extends Ftp_service{


	private $configFileLocation = 'js/Config.js';
	private $playerPrefix = 'pm-jw-';

	protected function getConfigFileLocation(){
		return $this->configFileLocation;
	}

	protected function getPlayerPrefix(){
		return $this->playerPrefix;
	}

	protected function getPlayerModelName(){
		return "js_player_model";
	}

	protected function update($player, $conn_id){			
		$this->initUpload($player, $conn_id);	
		$this->updateConfigFile($player, $conn_id);
		$this->purgeAkamai($player, $conn_id);
		$this->ci->player_model->finalizeUpload($player['id']);
		return $result['state'] = 'ok';
	}


	protected function initUpload($player, $conn_id){		
		$this->ci->player_model->initUpload($player['id'], 2); // config file + purge
	}

	protected function updateConfigFile($player, $conn_id){
		$srcFile =  $this->getConfigFileSoure($player);
		$dstFile = $this->getConfigFileDest($player);
		ftp_put($conn_id, $dstFile, $srcFile, FTP_ASCII);
		$this->ci->player_model->incrementCounter($player['id']);
	}

	protected function purgeAkamai($player, $conn_id){		
		$pathsToPurge = array();
		array_push($pathsToPurge, $this->getConfigFileSoure($player));			
		$this->ci->akamai_utils->purgeCache($pathsToPurge);		
		$this->ci->player_model->incrementCounter($player['id']);			
	}

}