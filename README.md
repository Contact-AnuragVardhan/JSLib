http://blog.topdevs.net/demo/simple-css-html-tooltips/
Line 557:
NSUtil.prototype.preventDefaultForScrollKeys = function(event)
{
	// left: 37, up: 38, right: 39, down: 40,
	var objKeys = {37: 1, 38: 1, 39: 1, 40: 1};
	event = this.getEvent(event);
	if (objKeys[event.keyCode]) 
	{
        this.util.preventDefault(event);
        return false;
    }
};

.nsDataGridContainer
{
	background-color: #DDDDDD;
}

nsDataGridHeaderContainer to nsDataGridHeaderCellContainer 

.nsGridScrollerCause
{
	width: 1px; 
	position: relative; 
	margin: 0; 
	padding: 0;
	top: 0px; 
	left: 0px;
}
