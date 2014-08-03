<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('select_multiple')){
	function select_multiple($post, $property, $value){
		$selectedItems = '';
		if(@$post[$property]){
			$selectedItems = $post[$property];
		} 
		if($selectedItems){
			foreach ($selectedItems as $selectedItem ) {
				if($selectedItem['id'] == $value['id']){
					return 'selected';
				}
			}
		}
		return '';
	}
}

if ( ! function_exists('check')){
	function check($post, $property){
		$result = '';
		if($post){
			$result = @$post[$property]?'checked':'';
		}
		return $result;
	}
}

if ( ! function_exists('select')){
	function select($post, $property, $value){
		$result = '';
		if($post){
			$result = @$post[$property]==$value['id']?'selected':'';
		}
		return $result;
	}
}

if ( ! function_exists('value')){
	function value($post, $property){		
		$result = '';
		if($post){
			$result = $post[$property];
		}
		return $result;
	}
}
