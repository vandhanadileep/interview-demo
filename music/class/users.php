<?php 
/* 
  
  Code written by Vandhana
  User Class

*/ 
?>
<?php 

session_start(); 
require_once( $_SERVER['DOCUMENT_ROOT'].'/music/includes/_define.php' );
require_once(CLASS_PATH.'ConManager.php');

/*

* class for login & logout

*/
class User
{
   protected $usrObj;

   public function __construct() 
   {  
              
            $this->usrObj = new DBConnection();;
            $this->usrObj->connectionDb();;                
     }
    

     /*

       * Function for Register
     */
     public function userRegister( $name,  $email, $password, $address, $phone )
     {
      if(empty($name)||empty($email)||empty($password)||empty($address) ||empty($phone)){    

        return false; 
      }

      else{ 

        $encrptPass=md5( $password );
        $insert_data = array ('user_name'=>mysqli_real_escape_string($this->usrObj->conn,$name),
                                'user_email_id'=>mysqli_real_escape_string($this->usrObj->conn,$email),
                                'user_password'=>mysqli_real_escape_string($this->usrObj->conn,$encrptPass),
                                'user_address'=>mysqli_real_escape_string($this->usrObj->conn,$address),
                                'user_phone'=>mysqli_real_escape_string($this->usrObj->conn,$phone));


        $query= $this->usrObj->insertData( 'users' , $insert_data );

          if($this->usrObj->query( $query )){

            //echo "success";
            
            return true;
          }

      

        // echo "files are required";

        
      }
      
     }

  

     /*

      * Function for login

     */
   public function login( $email, $password )
   {
    // echo "hii";
    // die();
    $this->email = $email;
    $this->password = $password;
    $query= " SELECT  user_name FROM `users` where  user_email_id='$email' AND user_password = '".md5($password)."' limit 1";
    $result = $this->usrObj->query( $query );
    $userData=$this->usrObj->fetchData( $result );
    //print_r($userData);
    $noRows = mysqli_num_rows( $result ); 
    

    if( $noRows==1 ){

      
      $id = $userData[ 'user_name' ];
      // echo "success";
      return $id;

    }
    else{


            return false;
    }
   }

 
      /*

        * function for change password

      */

      public function changePsw( $id, $userName, $nPassword )
      {

        $password = md5($nPassword);

           $updateData = array ('password'=>mysqli_real_escape_string($this->usrObj->conn,$password));
            $query= $this->usrObj->updateData( 'users', $updateData ,$id);
           
                if($this->usrObj->query( $query ))
                {
                    //echo "success";      
                    return true;
                }
                else
                {
                  return false;
                }
       
             
      }



   /*

      * Function for logout

     */
   public function logout()
   {
    session_destroy();
    //$this->usrObj->closeDb();

    return true;
   }

   public function __destruct(){
    
      $this->usrObj->closeDb();
    }

   
 }

?>