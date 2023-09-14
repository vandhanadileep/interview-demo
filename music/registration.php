<?php 
/* 
  
  Code written by Vandhana
  For registration of new users

*/  

$app = explode('/',$_SERVER['REQUEST_URI'])[1];
require_once( $_SERVER['DOCUMENT_ROOT'].'/music/includes/_define.php' );
require_once(CLASS_PATH.'users.php');

  if(isset($_POST['submit']))

    { 
        $nameobj=$_POST['name'];
        $emailobj=$_POST['email'];
        $passwordobj=$_POST['password'];
        $addressobj=$_POST['address'];
        $phoneobj=$_POST['phone'];

         $addusr = new User();
         $forSuccess=$addusr->userRegister($nameobj, $emailobj, $passwordobj, $addressobj, $phoneobj);
             if($forSuccess == TRUE)
             {
                echo "success :)";
                header("location:index.php");
             }
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
		<div class="box-form" style="width:40% !important;"> 
			<div class="right" id="rightpartsignup" >
				 <form id="adduser" name="adduser" method="POST" target="_SELF">	
					<h4>SignUp</h4>
					<p>Already have a account? <a href="index.php" id="login">Click here</a> to go back and login to your account...</p>
				
					<div class="inputs">
						<input type="text" placeholder="Name" name="name" required>
						<br>
						<input type="text" placeholder="Email" name="email" required>
						<br>
						<input type="password" placeholder="password" name="password" required>
						<br>
						<input type="text" placeholder="Address" name="address" required>
						<br>
						<input type="text" placeholder="Phone number" name="phone" required>
					</div>
					<br><br>
					<br>
					<input type="submit" value="SignUp"  name="submit"/>
				</form>
			</div>
		</div>
	</body>
</html>	