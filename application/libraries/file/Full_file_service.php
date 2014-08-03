<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('File_service.php');

class Full_file_service extends CI_File_service{
	
	private $basePlayerFolder = 'players/full-base';
	private $playerPrefix = 'pm-fl-';

	protected function getConfigFilePath($player){
		return $this->getPlayerFolder($player) . "/js/classes/Config.js";			
	}

	protected function getPlayerPrefix(){
		return $this->playerPrefix;
	}

	function getBasePlayerFolder(){
		return FCPATH . $this->basePlayerFolder;
	}

	function getJsonForConfig($player){
		$result = array();
		$result['version'] = $player['version'];
		$result['initialViewMode'] = $this->getViewModeName($player['initial_view_mode']);
		foreach($player['available_view_modes'] as $viewMode){
			$result['availableViewModes'][] = $viewMode['name'];
		}
		$result['showRightController'] = $player['show_right_controller']?TRUE:FALSE;
		$result['size']['height'] = $player['height'];
		$result['size']['width'] = $player['width'];
		foreach($player['feeds'] as $feed){
			$result['feeds'][] = $this->getJsonFeedForConfig($feed);
 		}
 		foreach($player['info_items'] as $feed){
			$result['info'][] = $this->getJsonInfoForConfig($feed);
 		}
		return json_encode($result);
	}

	function getJsonFeedForConfig($feed){
		$result['name'] = $feed['name'];
		$result['url'] = $feed['url'];
		$result['init'] = $feed['init']?TRUE:FALSE;
		return $result;
	}

	function getJsonInfoForConfig($item){
		$result['name'] = $item['name'];
		$result['data'] = $item['data'];
		$result['init'] = $item['init']?TRUE:FALSE;
		return $result;
	}

	function getViewModeName($viewModeId){
		$viewMode = $this->ci->view_mode_model->get($viewModeId);
		return $viewMode['name'];
	}

}