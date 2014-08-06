<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ftp_utils {

	function deleteRecursive($conn_id, $directory){		
		 if (@ftp_delete ($conn_id, $directory) === false) {	 	
		    if ($children = ftp_nlist ($conn_id, $directory)) {	    	
		      foreach ($children as $p)
		        $this->deleteRecursive ($conn_id,  $p);
		    }
	    	ftp_rmdir ($conn_id, $directory);
  		}
	}


}