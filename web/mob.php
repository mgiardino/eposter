<!DOCTYPE html> 
<html>
<head>
	<title>Page Title</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.css" />
	<link rel="stylesheet" type="text/css" href="/css/mainm.css">
	<script src="/js/jquery-1.11.0.min.js"></script>
	<script src="/js/jquery.mobile-1.4.0.min.js"></script>
	<script src="/js/jqindex.js"></script>
	<style>
	#custom-border-radius .ui-btn-icon-notext.ui-corner-all {
    -webkit-border-radius: .3125em;
    border-radius: .3125em;
	}
	</style>
</head>

<body>
<div data-role="page">
<div data-role="panel" id="bar">
    <!-- panel content goes here -->
</div><!-- /panel -->
	<div data-role="header"><h1>Page Title</h1></div>
	<div role="main" class="ui-content"><div id='text'></div></div>
	<div data-role="footer">
		<div id="custom-border-radius">
			<a href="#bar" class="ui-btn ui-shadow ui-icon-bars ui-corner-all ui-btn-inline ui-btn-icon-left">Navigation Panel</a>
		</div>
</div>
</div>
</body>
</html>