<?php 
/* 
  
  Code written by Vandhana
  For logout

*/ 
$app = explode('/',$_SERVER['REQUEST_URI'])[1];
require_once( $_SERVER['DOCUMENT_ROOT'].'/'.$app.'/includes/_define.php' );
require_once(CLASS_PATH.'users.php');

$logout=new User();
$logOut=$logout->logout();
    if($logOut == TRUE)
     {
      
      header('location:index.php');

     }
     else{
          echo "false";
     }
?>