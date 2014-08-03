<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('File_service.php');

class Countdown_file_service extends CI_File_service{
	
	private $basePlayerFolder = 'players/countdown-base';
	private $playerPrefix = 'pm-cd-';
	
	protected function getConfigFilePath($player){
		return $this->getPlayerFolder($player) . "/js/Config.js";			
	}

	protected function getPlayerPrefix(){
		return $this->playerPrefix;
	}

	protected function getBasePlayerFolder(){
		return FCPATH . $this->basePlayerFolder;
	}

	protected function getJsonForConfig($player){
		$result = array();
		$result['title1'] = $player['title1'];
		$result['title2'] = $player['title2'];
		$result['date'] = date('d M Y H:i:s', strtotime($player['countdown_date']));
		$result['releaseUrl'] = $player['release_url'];
		$result['localTimeUrl'] = site_url($this->basePlayerFolder . '/date.php');		
		$result['size']['height'] = $player['height'];
		$result['size']['width'] = $player['width'];	
		return json_encode($result);
	}


}