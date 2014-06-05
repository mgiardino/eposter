<?php
require 'eposter_lib.php';
$_GET = array_change_key_case( $_GET, CASE_UPPER );
switch( array_shift(array_keys($_GET)) ){
   case "PID": 
         $error = false; 
         $sql =   "select * from get_poster_toc(".$_GET["PID"].
                  ") as (title text, short_name text, level smallint, bid integer)"; 
      break;
   case "PSN": 
         $error = false; 
         $sql =   "select * from get_poster_toc('".$_GET["PSN"].
                  "') as (title text, short_name text, level smallint, bid integer)"; 
      break;
   case "BID": 
         $error = false; 
         $sql =   "select * from get_box_toc(".$_GET["BID"].
                  ") as (title text, short_name text, level smallint, bid integer)"; 
      break;
   case "BSN": 
         $error = false; 
         $sql =   "select * from get_box_toc('".$_GET["BSN"].
                  "') as (title text, short_name text, level smallint, bid integer)"; 
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
