<?php 
/* 
  
  Code written by Vandhana
 

*/  
?>
<?php
	$app = explode('/',$_SERVER['REQUEST_URI'])[1];
	define('BASE_PATH',  $_SERVER['DOCUMENT_ROOT'].'/'.$app.'/');
	define('CLASS_PATH', BASE_PATH.'class/');
	define('APP_PATH', 'http://localhost/'.$app.'/');
?>
