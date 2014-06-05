<?php

function execute_query( $sql ){
   $host       = "127.0.0.1";
   $password   = "***";
   $user       = "***";

   $db = @pg_connect("dbname=eposter user=".$user." host=".$host." password=".$password );
   if( !$db ){ 
      $msg = "Impossible to open the DB"; 
      $error = true; 
   } else { 
      $result = pg_query( $db, $sql );
      if( !$result ){ 
         $msg = "Impossible to perform the query"; 
         $error = true; 
      } else {
         $msg = "No errors found"; 
         $error = false;
      } 
   }
   return array( $msg, $error, pg_fetch_all($result) );
}
?>
