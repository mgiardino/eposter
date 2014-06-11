<?php
require 'eposter_lib.php';
$_GET = array_change_key_case( $_GET, CASE_UPPER );
switch( array_shift(array_keys($_GET)) ){
   case "PID": 
         $error = false; 
         list( $msg, $error, $result ) = execute_query( "select * from get_poster(".$_GET["PID"].")" ); 
         if( !$error ){
            $sql = "select * from get_authors(".$_GET["PID"].")";  
            list( $msg_authors, $error_authors, $result_authors ) = execute_query( $sql ); 
            if( $error_authors ){
               $msg     = $msg_authors;
               $error   = $error_authors;
            } else { $result[0]["authors"] = $result_authors; }

            $sql = "select * from get_authorities(".$_GET["PID"].")";  
            list( $msg_authorities, $error_authorities, $result_authorities ) = execute_query( $sql ); 
            if( $error_authorities ){
               $msg     = $msg_authorities;
               $error   = $error_authorities;
            } else { $result[0]["authorities"] = $result_authorities; }
            
            $sql = "select * from get_keywords(".$_GET["PID"].")";  
            list( $msg_keys, $error_keys, $result_keys ) = execute_query( $sql ); 
            if( $error_keys ){
               $msg     = $msg_keys;
               $error   = $error_keys;
            } else { $result[0]["keys"] = $result_keys; }
            
            $sql = "select * from get_roles()";  
            list( $msg_roles, $error_roles, $result_roles ) = execute_query( $sql ); 
            if( $error_roles ){
               $msg     = $msg_roles;
               $error   = $error_roles;
            } else { $result[0]["roles"] = $result_roles; }
            $result[0]["link"] = $link;
         }
      break;
   case "PSN": 
         $error = false; 
         list( $msg, $error, $result ) = execute_query( "select * from get_poster('".$_GET["PSN"]."')" ); 
         if( !$error ){
            $sql = "select * from get_authors('".$_GET["PSN"]."')";  
            list( $msg_authors, $error_authors, $result_authors ) = execute_query( $sql ); 
            if( $error_authors ){
               $msg     = $msg_authors;
               $error   = $error_authors;
            } else { $result[0]["authors"] = $result_authors; }

            $sql = "select * from get_authorities('".$_GET["PSN"]."')";  
            list( $msg_authorities, $error_authorities, $result_authorities ) = execute_query( $sql ); 
            if( $error_authorities ){
               $msg     = $msg_authorities;
               $error   = $error_authorities;
            } else { $result[0]["authorities"] = $result_authorities; }
            
            $sql = "select * from get_keywords('".$_GET["PSN"]."')";  
            list( $msg_keys, $error_keys, $result_keys ) = execute_query( $sql ); 
            if( $error_keys ){
               $msg     = $msg_keys;
               $error   = $error_keys;
            } else { $result[0]["keys"] = $result_keys; }
            
            $sql = "select * from get_roles()";  
            list( $msg_roles, $error_roles, $result_roles ) = execute_query( $sql ); 
            if( $error_roles ){
               $msg     = $msg_roles;
               $error   = $error_roles;
            } else { $result[0]["roles"] = $result_roles; }
            $result[0]["link"] = $link;
         }
      break;
   case "BID": 
         $error = false; 
         $sql = "select * from get_box(".$_GET["BID"].")";  
         list( $msg, $error, $result ) = execute_query( $sql ); 
      break;
   case "BSN": 
         $error = false; 
         $sql = "select * from get_box('".$_GET["BSN"]."')";   
         list( $msg, $error, $result ) = execute_query( $sql ); 
      break;
   default:
      $msg = "_GET parameter unknown";
      $error = true;
   break;
}
$r[ "response" ] = $result; 
$r[ "message"  ] = $msg;
$r[ "error"    ] = $error;
echo json_encode($r);
?>


