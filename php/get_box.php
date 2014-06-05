<?php
require 'eposter_lib.php';
$_GET = array_change_key_case( $_GET, CASE_UPPER );
switch( array_shift(array_keys($_GET)) ){
   case "BID": 
         $error = false; 
         $sql = "select * from get_box(".$_GET["BID"].")";  
      break;
   case "BSN": 
         $error = false; 
         $sql = "select * from get_box('".$_GET["BSN"]."')";   
      break;
   default:
      $msg = "_GET parameter unknown";
      $error = true;
   break;
}
if( !$error ){ 
   list( $msg, $error, $result ) = execute_query( $sql ); 
}
$r[ "response" ] = $result; 
$r[ "message"  ] = $msg;
$r[ "error"    ] = $error;
echo json_encode($r);
?>
