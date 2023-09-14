<?php 
/* 
  
  Code written by Vandhana
  Database Connection

*/  
?>  
<?php
class DBConnection 
{
	private $localhost  = '127.0.0.1';
  private $username   = 'root';
  private $password   = '';
  private $database   = 'test';

        /*
        	* connecting to database
        */	 	 	
	 	public function connectionDb()
	 	{

	 	 	$conn = mysqli_connect( $this->localhost,$this->username,$this->password,$this->database );

	 	 		if (!$conn){

           			 die ("<h1>Database Connection Failed</h1>". mysqli_connect_error());
        			}
       				//echo "Database Connected Successfully";

        			return $this->conn = $conn;
   	 	}
        /*
        	* performs a query against a database
        */
   	 	public function query( $sql)
		{
			$query = mysqli_query($this->conn,$sql) or die(mysqli_error($this->conn));
			
			return $query;
			       

		}
		
        /*
        	* for inserting data
        */
		public function insertData( $tableName, $data ) 
        {  
        	
        	$insertQry  = "INSERT INTO ".$tableName."(";            
            $insertQry.= implode(",", array_keys($data)) . ') VALUES (';            
            $insertQry .= "'" . implode("','", array_values($data)) . "');";  
           	// echo "error".mysqli_error($conn);
            
           	return $insertQry;

            
        } 

        /*
        
          *for updating data

        */
        public function updateData( $tableName, $data, $id)
        {
        	 $cols = array();
        	 foreach($data as $key=>$val) {
       		 $cols[] = "$key = '$val'";
   			 }
        	$updateQry = "UPDATE $tableName SET " . implode(', ', $cols) . " WHERE id =". $id.";";
        	
        	return $updateQry;
        }
         public function updateBranchData( $tableName, $data, $id)
        {
        	 $cols = array();
        	 foreach($data as $key=>$val) {
       		 $cols[] = "$key = '$val'";
   			 }
        	$updateQry = "UPDATE $tableName SET " . implode(', ', $cols) . " WHERE branch_id =". $id.";";
        	
        	return $updateQry;
        }

 		/*
 			* for fetch data from 
 		*/
	  	public function fetchData( $result )
    	{     

          	$array =mysqli_fetch_assoc( $result );

           	return ($array);
    	}
    	public function fetchRow( $result )
    	{     

          	$array =mysqli_fetch_Row( $result );

           	return ($array);
    	}

		/*
			* closing database
		*/
		public function closeDb()
 		{
 			return mysqli_close($this->conn);
    	}

}

?>
