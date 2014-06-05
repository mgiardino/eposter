<?php
session_start();
require_once 'functions/Mobile_Detect.php';
$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'computer');
$scriptVersion = $detect->getScriptVersion();
if ($deviceType == 'computer'){
	include('pc.php');
}else{
	include('mob.php');
}

?>