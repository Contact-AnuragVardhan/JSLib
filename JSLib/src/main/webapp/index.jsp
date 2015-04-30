<!DOCTYPE html>
<html>

<head>

 <link href="lib/css/com/org/component.css" rel="stylesheet">

 <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.6.1/CustomElements.js"></script>
 <script src="lib/com/org/util/nsUtil.js"></script>
 <script src="lib/com/org/base/nsUIComponent.js"></script>
 <script src="lib/com/org/containers/nsGroup.js"></script>
 <script src="lib/com/org/components/nsCheckBox.js"></script>
 
 <style>
 

 input.radio{
  display:block;
  margin:4px 0 0 0;
  padding:0;
  width:13px;
  height:13px;
}




 </style>
 
</head>

<body onload="onload()">
	<div>
		<input id="check1" type="checkbox" name="check" >
		<label class="choice" for="check1">Checkbox No. 1</label>
		<br>
		<input id="check2" type="checkbox" name="check" value="check2">
		<label class="choice" for="check2">Checkbox No. 2</label>
	</div>
	<ns-checkBox id="chkBox" label="Check" change="selectionChange(event)" toolTip="This is Test" toolTipType="info"></ns-checkBox>
	<input type="button" value="Change Label" onclick="changeText()">
	</input>
	<input type="button" class="" value="Change Layout" onclick="changeLayout()">
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
		checkBox.setAttribute("toolTip","Current Direction is " + layoutDirection);
		if(layoutDirection === nsCheckBox.LayoutDirection_LTR)
		{
			layoutDirection = nsCheckBox.LayoutDirection_RTL;
			checkBox.setAttribute("toolTipType","warning");
		}
		else
		{
			layoutDirection = nsCheckBox.LayoutDirection_LTR;
			checkBox.setAttribute("toolTipType","critical");
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
