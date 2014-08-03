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
		$srcFile =  $this->getConfigFileSoure($player);
		$dstFile = $this->getConfigFileDest($player);
		$this->ci->player_model->initUpload($player['id'], 1);
		ftp_put($conn_id, $dstFile, $srcFile, FTP_ASCII);
		$this->ci->player_model->incrementCounter($player['id']);	
		$this->ci->player_model->finalizeUpload($player['id']);
		return $result['state'] = 'ok';
	}

}