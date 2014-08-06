<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('Ftp_service.php');

class Full_ftp_service extends Ftp_service{

	private $configFileLocation = 'js/classes/Config.js';
	private $playerPrefix = 'pm-fl-';

	protected function getConfigFileLocation(){
		return $this->configFileLocation;
	}	

	protected function getPlayerPrefix(){
		return $this->playerPrefix;
	}

	protected function getPlayerModelName(){
		return "full_player_model";
	}

	private function getSourceVersionFile($player){
		return $this->getSourcePath($player) . '/versioned-data/version-' . $player['version'];
	}

	private function getPreviousSourceVersionFile($player){
		$previousVersion = $player['last_uploaded_version'];
		return $this->getSourcePath($player) . '/versioned-data/version-' . $previousVersion;
	}

	private function getDestVersionFile($player){
		return $this->getDestPath($player) . '/versioned-data/version-' . $player['version'];
	}

	private function getPreviousSourceDataPath($player){
		$previousVersion = $player['last_uploaded_version'];
		return $this->getSourcePath($player) . '/versioned-data/' . $previousVersion;
	}

	private function getSourceDataPath($player){
		return $this->getSourcePath($player) . '/versioned-data/' . $player['version'];
	}

	private function getDestDataPath($player){
		return $this->getDestPath($player) . '/versioned-data/' . $player['version'];
	}

	protected function update($player, $conn_id){	
		$this->initUpload($player, $conn_id);
		$this->updateVersionData($player, $conn_id);
		$this->updateConfigFile($player, $conn_id);
		$this->updateVersionFile($player, $conn_id);	
		$this->purgeAkamai($player, $conn_id);
		$this->ci->player_model->finalizeUpload($player['id']);
		$result['state'] = 'ok';	
		return $result;
	}	

	protected function initUpload($player, $conn_id){		
		$srcDataPath = $this->getSourceDataPath($player);		
		$dataFilesCount = $this->getFileCount($srcDataPath);
		$totalFilesCount = $dataFilesCount + 3; // Config + Refresh + Version
		$this->ci->player_model->initUpload($player['id'], $totalFilesCount);
	}

	protected function updateVersionData($player, $conn_id){
		$srcDataPath = $this->getSourceDataPath($player);
		$destDataPath = $this->getDestDataPath($player);
		$this->uploadRecursive($conn_id, $player, $srcDataPath, $destDataPath);					
	}

	protected function updateConfigFile($player, $conn_id){
		$srcFile =  $this->getConfigFileSoure($player);
		$dstFile = $this->getConfigFileDest($player);
		ftp_put($conn_id, $dstFile, $srcFile, FTP_BINARY);		
		$this->ci->player_model->incrementCounter($player['id']);	
	}

	protected function updateVersionFile($player, $conn_id){
		$srcVersionFile =  $this->getSourceVersionFile($player);
		$dstVersionFile = $this->getDestVersionFile($player);
		ftp_put($conn_id, $dstVersionFile, $srcVersionFile, FTP_BINARY);
		$this->ci->player_model->incrementCounter($player['id']);	
	}

	protected function purgeAkamai($player, $conn_id){		
		$previousDir = $this->getPreviousSourceDataPath($player);
		$previousFileVersion = $this->getPreviousSourceVersionFile($player);
		$this->ci->akamai_utils->remove($conn_id, $previousDir);
		$this->ci->akamai_utils->remove($conn_id, $previousFileVersion);

		$pathsToPurge = $this->getFilesList($previousDir);
		array_push($pathsToPurge, $previousFileVersion);	
		array_push($pathsToPurge, $this->getConfigFileSoure($player));		
		$this->ci->akamai_utils->purgeCache($pathsToPurge);		
		$this->ci->player_model->incrementCounter($player['id']);			
	}
}