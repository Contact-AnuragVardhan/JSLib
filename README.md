ns-grid::shadow .dataGrid
{
    width: 100%;
	background-color: #EEE;
	border: 0px;
	margin: 0px;
	padding: 0px;
	background-color: #F6F6F6;
	border-collapse: collapse;
}

ns-grid::shadow .dataGridTitleBar
{
    background-color: #eee;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    color: #333;
    font-weight: bold;
    text-shadow: 1px 1px 0 white;
}

ns-grid::shadow .dataGridHeader
{
  background-color: #888888;
  color: White;
  line-height: 1.8em;
  margin: 0px;
  white-space: nowrap;
  border-left: 1px solid #000000;
  padding: 4px 6px 2px;
  border-collapse: collapse;
}

ns-grid::shadow .dataGridOddRow
{
    background-color: white;
	color: black;
}

ns-grid::shadow .dataGridEvenRow  
{
    background-color: #E0E0E0;
	color: black; 
}

ns-grid::shadow .dataGridCell
{
    border-bottom : buttonshadow 1px solid;
    border-top : buttonshadow 1px solid;
    border-left : buttonshadow 1px solid;
    border-right : buttonshadow 1px solid;
    cursor : default;
    padding:7px;
    text-align:left;
    font-weight:normal;
     vertical-align:middle;
     color:#000000;
}

ns-grid::shadow .dataGridHover
{
    background-color: #CCCCCC;
}

ns-grid::shadow .dataGridSelection
{
    background-color: #b0bed9;
}

ns-grid::shadow .hbox 
{
  overflow-x:auto;
}

ns-grid::shadow .hbox > * 
{
  display: inline-block;
  padding: 3px;
}

ns-grid::shadow .arrow-down 
{
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 10px 5px 0 5px;
	border-color: #1f1c1c transparent transparent transparent;
}

ns-grid::shadow .arrow-right 
{
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 4px 0 4px 10px;
	border-color: transparent transparent transparent #1f1c1c;
}

ns-grid::shadow .resize-handle-active
{
	cursor: e-resize;
}

.resize-handle 
{
	cursor: e-resize;
	width: 2px;
	border-right: 1px dashed #1E90FF;
	position:absolute;
	top:0;
	left:0;
}

-----------------------------------------------------------------------------------------------------------------------
https://vaadin.com/home?utm_source=components-redirect
https://github.com/vaadin/components-examples
