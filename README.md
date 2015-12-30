.nsPanel, .nsPanelCollapsed 
{
	position: absolute;
	width: 45%;
	height: 45%;
	margin: 0;
	padding: 0;
	z-index: 99;
	border: 2px solid grey;
	background: #F6F6F6;
}

.nsPanelContainer
{
	width:100%;
	height:100%;
    font-size:12px;
	border: 0px;
	margin: 0px;
	padding: 0px;
	background-color: #F6F6F6;
}

.nsPanelTitleBar
{
   padding: .3em .2em .2em .3em; 
   font-size: 12px;
   text-align: left;
   background: #848484; 
   color: #ffffff; 
   font-weight: bold; 
   height: 8%;
   min-height:20px; 
   max-height:20px; 
}

/* donot give padding */
.nsPanelBody
{
	overflow:auto;
	height:91%;
}

.nsPanelBodyToggled 
{
    /*overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
    height: 0;
    border-width: 0;*/
}

.nsHiddenDiv {
	background: #999;
	opacity: 0;
	position: absolute;
	margin: 0;
	padding: 0;
	z-index: 98;
	-webkit-transition: all 0.25s ease-in-out;
	-moz-transition: all 0.25s ease-in-out;
	-ms-transition: all 0.25s ease-in-out;
	-o-transition: all 0.25s ease-in-out;
	transition: all 0.25s ease-in-out;
}
