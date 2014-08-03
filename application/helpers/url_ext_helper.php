<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('uploaded_graphic_image_url')){
	function uploaded_graphic_image_url($graphicImage){
		$result = base_url() . 'assets/uploads/graphics/' . $graphicImage["player_id"] . "/" . $graphicImage['id'] . ".png";	
		return $result;
	}
}