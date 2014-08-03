<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CI_Graphics_file_service {

	private function getPlayerFolder($player){		
		return FCPATH  . 'players/pm-fl-' . url_title($player['name']);
	}

	private function getGraphicsFolderPath($player){				
		return $this->getPlayerFolder($player) . "/versioned-data/" . $player['version'] . "/graphics";			
	}

	private function getConfigFilePath($player){		
		return $this-> getGraphicsFolderPath($player) . "/graphics-config.json";
	}

	private function getVersionFilePath($player){		
		return $this->getPlayerFolder($player) . "/versioned-data/version-" . $player['version'];
	}

	private function getDestinationGraphicFolder($player){			
		return $this->getPlayerFolder($player) . "/versioned-data/" . $player['version'] ."/graphics/image";
	}

	private function getDestinationGraphicFilePath($player,  $fileId){
		return $this->getDestinationGraphicFolder($player, $fileId) . "/" . $fileId . '.png';
	}

	private function getPlayerGraphicUrl($player,  $fileId){
		return 'versioned-data/' . $player['version'] .'/graphics/image/' . $fileId . '.png';
	}

	private function getOriginalGraphicFilePath($playerId, $fileId){
		return FCPATH . 'assets/uploads/graphics/' . $playerId . '/' . $fileId . '.png';
	}

	public function createOrUpdate($player){		
		$this->ci = & get_instance();
		$this->ci->load->helper('path');
		$this->ci->load->helper('url');
		$this->ci->load->model('view_mode_model');
		$dataFolderPath = $this->getGraphicsFolderPath($player);
		if(is_dir($dataFolderPath)){
			$this->removeGraphicsFolder($player);
		}	
		$this->createGraphicsData($player);		
	}

	private function removeGraphicsFolder($player){
		$folder = $this->getGraphicsFolderPath($player);
		$this->recursiveRemove($folder);
		rmdir($folder);
	}

	
	public function recursiveRemove($dir){
	    $iterator = new RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS), \RecursiveIteratorIterator::CHILD_FIRST);
	    foreach ($iterator as $filename => $fileInfo) {
	        if ($fileInfo->isDir()) {
	            rmdir($filename);
	        } else {
	            unlink($filename);
	        }
	    }
	}


	private function createGraphicsData($player){							
		mkdir($this->getGraphicsFolderPath($player), 0777, true);	
		$this->createFileVersion($player);	
		$this->createGraphicsConfig($player);
		$this->copyImages($player);
	}

private function createFileVersion($player){
	$fileName = $this->getVersionFilePath($player);	
	$file = fopen($fileName, 'w');
	fclose($file);	
}


	private function createGraphicsConfig($player){	
		
		$configFilePath = $this->getConfigFilePath($player);			
		$configFile = fopen($configFilePath, "w");
		$data = $this->getJsonForConfig($player);

		fwrite($configFile, $data);
		fclose($configFile);		
	}

	private function copyImages($player){
		$graphicPositions = $player['graphic_positions'];
		$playerId = $player['id'];		
		if(isset($graphicPositions) && sizeof($graphicPositions) > 0){			
			$destinationFolder = $this->getDestinationGraphicFolder($player);
			if(!is_dir($destinationFolder)){
				mkdir($destinationFolder);
			}
			foreach($graphicPositions as $graphicPosition){				
				$fileId = $graphicPosition['graphic_image_id'];
				$original = $this->getOriginalGraphicFilePath($playerId, $fileId);
				$destination = $this->getDestinationGraphicFilePath($player, $fileId);				
				copy($original, $destination);
			}			

		}		
	}

	function getJsonForConfig($player){
		$result = array();		
		foreach($player['graphic_positions'] as $graphicPosition){
			$position = array();
			$position['name'] = $graphicPosition['name'];
			$position['width'] = $graphicPosition['width'];
			$position['height'] = $graphicPosition['height'];
			$position['x_position'] = $graphicPosition['x-position'];
			$position['y_position'] = $graphicPosition['y-position'];
			$position['image'] = $this->getPlayerGraphicUrl($player,   $graphicPosition['graphic_image_id']);
			$result['positions'][] = $position;
		}		
		return json_encode($result);
	}

}