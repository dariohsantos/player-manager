<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('File_service.php');

class Jw_file_service extends CI_File_service{
	
	private $basePlayerFolder = 'players/jwplayer-base';
	private $playerPrefix = 'pm-jw-';
	
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
		$result['video'] = $player['video_url'];		
		$result['size']['height'] = $player['height'];
		$result['size']['width'] = $player['width'];	
		return json_encode($result);
	}


}