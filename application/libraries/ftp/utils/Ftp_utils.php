<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ftp_utils {

	function deleteRecursive($directory){	    
	    if( !(@ftp_rmdir($handle, $directory) || @ftp_delete($handle, $directory)) ){	        
	        $filelist = @ftp_nlist($handle, $directory);	        
	        foreach($filelist as $file){
	            recursiveDelete($file);
	        }	      
	        recursiveDelete($directory);
	    }
	}


}