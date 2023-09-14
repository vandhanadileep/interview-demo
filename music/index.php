<?php 
/* 
  Code written by Vandhana

*/ 

$app = explode('/',$_SERVER['REQUEST_URI'])[1];
require_once( $_SERVER['DOCUMENT_ROOT'].'/'.$app.'/includes/_define.php' );
require_once(CLASS_PATH.'users.php');

 
if(isset($_POST['submit']))
{ 
    $emailobj = $_POST['email'];
    $passwordobj = $_POST['password'];
      
    $usr = new User();
    $forSuccess=$usr->login( $emailobj, $passwordobj );
    if($forSuccess == TRUE)
    {  
           
        header("location:dashboard.php");  
        // echo "Login";               
    }
    // else
    // {
    //     echo "<script type='text/javascript'>
    //              $('#invalidUser').show();
    //            </script>";
    // }
}  
?>

<!DOCTYPE html>
<html lang="en" >
	<head>
	 	<meta charset="UTF-8">
	 	<title>Login Page in HTML with CSS Code Example</title>
	  	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link href="<?php echo APP_PATH?>assets/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<link rel="stylesheet" href="assets/css/style.css">
		<script src="<?php echo APP_PATH?>assets/js/jquery.min.js"></script>
	</head>
	<body>
	<!-- partial:index.partial.html -->
		<div class="box-form">
			<div class="left">
				<div class="overlay">
					<h1>Parinata Music Services</h1>
					<!-- <span>
						<p>login with social media</p>
						<a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
						<a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
						<a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
					</span> -->
				</div>
			</div>
			
			<form id="login"  name="login" method="POST" target="_SELF">
			    <div class="right" id="rightpartlogin">
					<h5>Login</h5>
					<p>Don't have an account? <a href="registration.php" id="signup">Creat Your Account</a> it takes less than a minute</p>
					<div class="inputs">
						<input type="text" name="email" placeholder="Email" required>
						<br>
						<input type="password" name="password" placeholder="password" required>
					</div>
					<br><br>
					<div id="invalidUser" class="invalid" style="display:none;">
						<strong>Email or Password Invalid</strong>
					</div>
					<!-- <div class="remember-me--forget-password"> -->
				    <!-- Angular -->
			       <!--  <label>
					   	<input type="checkbox" name="item" checked/>
						<span class="text-checkbox">Remember me</span>
				    </label>
						<p>forget password?</p>
					</div> -->
						
					<br>
					<input type="submit" value="Login"  name="submit"/>
				</div>
		    </form>	
		</div>
	<!-- partial --> 
	</body>
</html>
