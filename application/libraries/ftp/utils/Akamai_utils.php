<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Akamai_utils {
	
	const AKAMAI_SUCCESS_CODE      = 201;
	const AKAMAI_RESERVED_CODE     = 200;

	protected $ci;
	protected $akamaiPurgeEndpoint;
	protected $akamaiUser;
	protected $akamaiPass;
	protected $akamaiBaseDir;
	protected $localBaseDir;
	protected $akamaiBaseUrl;


	public function __construct(){		
		$this->ci = & get_instance();
		$this->ci->load->config('ftp');	

		$this->akamaiPurgeEndpoint = $this->ci->config->item('akamai_purge_endpoint');
		$this->akamaiUser = $this->ci->config->item('akamai_purge_user');
		$this->akamaiPass = $this->ci->config->item('akamai_purge_password');		
		$this->localBaseDir = $this->ci->config->item('local_base_dir');	
		$this->akamaiBaseDir = $this->ci->config->item('akamai_base_dir');	
		$this->akamaiBaseUrl = $this->ci->config->item('akamai_base_url');	
		$this->ci->load->library('ftp/utils/Ftp_utils', array(), 'ftp_utils');			
	}	

	public function remove($conn_id, $path){
		
		$ftpPath = $this->processPathToFtp($path);
		$this->ci->ftp_utils->deleteRecursive($conn_id, $ftpPath);
		
	}

	public function purgeCache($filesToClear){	
		
		$curlOpts = array(CURLOPT_USERPWD => $this->akamaiUser . ":" . $this->akamaiPass);		
		$headers = array("Content-Type:application/json");		
		$options = array();
		$filesToClear = $this->processFilesPathsToPurge($filesToClear);
		$options['objects'] = $filesToClear;	
		$ccuResponse = $this->curlRequest($this->akamaiPurgeEndpoint, $options, $headers, $curlOpts);		
		$response = json_decode($ccuResponse);

		return $this->processAkamaiResponse($response);

	}

	private function processFilesPathsToPurge($filePaths){
		$result = array();
		foreach ($filePaths as $filePath) {
			$result[] = str_replace($this->localBaseDir, $this->akamaiBaseUrl, $filePath);
		}
		return $result;
	}

	private function processPathsToFtp($filePaths){
		$result = array();
		foreach ($filePaths as $filePath) {
			$result[] = $this->processFilePathToFtp($filePath);
		}
		return $result;
	}

	private function processPathToFtp($filePath){
		return str_replace($this->localBaseDir, $this->akamaiBaseDir, $filePath);
	}

	private function processAkamaiResponse($response){		
		switch($response->httpStatus){
			case self::AKAMAI_SUCCESS_CODE:
			case self::AKAMAI_RESERVED_CODE:				
				return $response->estimatedSeconds;
				break;
			default:
				throw new Exception('Akamai Cache Clear error: '.$response->detail);
				break;
		}
	}

	private function curlRequest($url, $dataBody = null, $headers = null, $options = null){
		$_ch = curl_init();
		
		curl_setopt($_ch, CURLOPT_URL, $url);
		curl_setopt($_ch, CURLOPT_RETURNTRANSFER, true);		
		curl_setopt($_ch, CURLOPT_SSL_VERIFYPEER, false);

		if (!is_null($dataBody)) {
			if (is_array($dataBody)) {
				$dataBody = json_encode($dataBody);				
			}
			curl_setopt($_ch, CURLOPT_POSTFIELDS, $dataBody);
		}

		if (!is_null($headers)) {
			curl_setopt($_ch, CURLOPT_HTTPHEADER, $headers);
		}

		if (!is_null($options)) {
			foreach ($options as $_option => $_value) {
				curl_setopt($_ch, $_option, $_value);
			}
		}
	
		return curl_exec($_ch);
	}

}