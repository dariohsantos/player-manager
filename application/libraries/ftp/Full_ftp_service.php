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

	private function getDestVersionFile($player){
		return $this->getDestPath($player) . '/versioned-data/version-' . $player['version'];
	}

	private function getSourceDataPath($player){
		return $this->getSourcePath($player) . '/versioned-data/' . $player['version'];
	}

	private function getDestDataPath($player){
		return $this->getDestPath($player) . '/versioned-data/' . $player['version'];
	}

	protected function update($player, $conn_id){		
		$srcDataPath = $this->getSourceDataPath($player);
		$destDataPath = $this->getDestDataPath($player);
		$srcFile =  $this->getConfigFileSoure($player);
		$dstFile = $this->getConfigFileDest($player);

		$srcVersionFile =  $this->getSourceVersionFile($player);
		$dstVersionFile = $this->getDestVersionFile($player);

		$dataFilesCount = $this->getFileCount($srcDataPath);
		$totalFilesCount = $dataFilesCount + 3; // Config + Refresh + Version

		$this->ci->player_model->initUpload($player['id'], $totalFilesCount);

		ftp_put($conn_id, $dstFile, $srcFile, FTP_ASCII);
		$this->ci->player_model->incrementCounter($player['id']);	

		$uploadedFiles = $this->uploadRecursive($conn_id, $player, $srcDataPath, $destDataPath);					

		ftp_put($conn_id, $dstVersionFile, $srcVersionFile, FTP_ASCII);
		$this->ci->player_model->incrementCounter($player['id']);	

		$purgeResult = $this->ci->akamai_utils->purgeCache($uploadedFiles);		
		$this->ci->player_model->incrementCounter($player['id']);	
		$this->ci->player_model->finalizeUpload($player['id']);
		if($purgeResult){
			$result['state'] = 'ok';
			$result['akamaiRefreshTime'] = $purgeResult;
		}
		else{
			$result['state'] = 'error';	
		}
		return $result;
	}	

}