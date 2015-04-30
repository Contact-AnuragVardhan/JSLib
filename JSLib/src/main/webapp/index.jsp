<!DOCTYPE html>
<html>

<head>

 <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.6.1/CustomElements.js"></script>
 <script src="lib/com/org/util/nsUtil.js"></script>
 <script src="lib/com/org/base/nsUIComponent.js"></script>
 <script src="lib/com/org/containers/nsGroup.js"></script>
 <script src="lib/com/org/components/nsCheckBox.js"></script>
 
</head>

<body onload="onload()">

	<ns-checkBox id="chkBox" label="Check" change="selectionChange(event)"></ns-checkBox>
	<input type="button" value="Change Label" onclick="changeText()">
	</input>
	<input type="button" value="Change Layout" onclick="changeLayout()">
	</input>
	<script>
	var count = 0;
	var layoutDirection = nsCheckBox.LayoutDirection_LTR;
	function onload()
	{
		var checkBox  = document.getElementById("chkBox");
		//checkBox.addEventListener("change", selectionChange);
	}
	function changeText()
	{
		count++;
		var checkBox  = document.getElementById("chkBox");
		chkBox.setAttribute("label",("Check" + count));
	}
	function changeLayout()
	{
		var checkBox  = document.getElementById("chkBox");
		if(layoutDirection === nsCheckBox.LayoutDirection_LTR)
		{
			layoutDirection = nsCheckBox.LayoutDirection_RTL;
		}
		else
		{
			layoutDirection = nsCheckBox.LayoutDirection_LTR;
		}
		chkBox.setAttribute("layoutdirection",layoutDirection);
	}
	function selectionChange(event)
	{
		alert("Selection Change " + event.detail);		
	}
	// 	var checkBox = document.createElement("ns-checkBox");
	// 	checkBox.text = "Check";
	// 	document.body.appendChild(checkBox);     
	</script>

</body>

</html>