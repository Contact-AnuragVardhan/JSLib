<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="Generator" content="EditPlus®">
  <meta name="Author" content="">
  <meta name="Keywords" content="">
  <meta name="Description" content="">
  <title>Document</title>
  <style>
	.class1 div
	{
		background:black;
		width:600;
	}
  </style>
 </head>
 <body onload="loadhandler()">
	<div id="div1">
	</div>
	<button onclick="readJson()">Click me</button>
	<script>
		function loadhandler()
		{
			var div1 = document.querySelector("#div1");
			var item = {"name":"Anurag","id":"1"};
			var htmlText =  "<div id='divTest'> aaaa </div>";
			div1.innerHTML = htmlText;
			var divTest = document.querySelector("#divTest");
			divTest.setAttribute("val",JSON.stringify(item));
		}
		
		function readJson() 
		{
			var divTest = document.querySelector("#divTest");
			var strVal = JSON.parse(divTest.getAttribute("val"));
			console.log(strVal.name);
		}
	</script>
 </body>
</html>
