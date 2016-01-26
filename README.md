 "use strict"; 
function NSGroupingGrid(nsGrid,nsUtil) 
{
	this.__nsGrid = nsGrid;
	this.util = nsUtil;
	
	this.__groupCollection = null;
	this.__groupSource = null;
	this.__fieldColNameArrow = this.__nsGrid.getID() + "_arrow_field";
	this.__rowCounter = -1;
}
 /********************************Common Functions for Grid ****************************************/
NSGroupingGrid.prototype.__initialize = function ()
{
};

NSGroupingGrid.prototype.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	var attributeName = attrName.toLowerCase();
	if(attributeName === "groupbyfield")
	{
		this.__nsGrid.__groupByField = this.__nsGrid.getAttribute("groupByField");
		this.__nsGrid.dataSource(this.__nsGrid.__dataSource);
	}
};

NSGroupingGrid.prototype.dataSource = function(source)
{
	if(this.__nsGrid.__groupByField && this.__nsGrid.__groupByField.length > 0)
	{
		var arrGroupField = this.__nsGrid.__groupByField.split(",");
		if(!this.__groupCollection)
		{
			this.__groupCollection = new this.util.groupCollection(this.__nsGrid.__dataSource,this.__nsGrid.__childField);
		}
		this.__groupSource = this.__groupCollection.groupBy(arrGroupField);
		if(this.__groupSource)
		{
			this.__nsGrid.__arrWrapper = this.__groupSource.slice(0);
			this.__setWrapperSource(this.__nsGrid.__arrWrapper,-1,0);
		}
		else
		{
			this.__nsGrid.__arrWrapper = [];
		}
		this.__nsGrid.__arrInternalSource = this.__nsGrid.__arrWrapper.slice(0);
		this.__nsGrid.__updateTotalRecords();
	}
};

NSGroupingGrid.prototype.__createBody = function()
{
};

NSGroupingGrid.prototype.__createBodyBody= function(dataSet,startIndex,endIndex)
{
    if(dataSet && dataSet.length > 0)
    {
    	 for (var rowIndex = startIndex; rowIndex < endIndex; rowIndex++)
	     {
    		var item = dataSet[rowIndex];
    		var row = item[this.__nsGrid.__fieldRowHtml];
    		this.__nsGrid.__tblBodyBody.appendChild(row);
    		if(item[this.__nsGrid.__fieldHasChild])
    		{
    			this.__createBodyBody(item[this.__nsGrid.__childField], startIndex, item[this.__nsGrid.__childField].length);
    		}
	     }
    }
};

NSGroupingGrid.prototype.__checkForAdditionalColumns = function()
{
	var colArrow = {};
	colArrow.headerText = "";
	colArrow.dataField = this.__fieldColNameArrow;
	colArrow.width = "50px";
	colArrow.sortable = false;
	colArrow.sortDescending = true;
	colArrow.draggable = false;
	colArrow.resizable = false;
	colArrow.isExportable = false;
	
	this.__nsGrid.__columns.splice(0, 0, colArrow);
};

NSGroupingGrid.prototype.__setMeasurement = function()
{
};

NSGroupingGrid.prototype.__addSVGInPage = function(objSVG)
{
	var plusID = "svgPlus";
	var groupPlus = objSVG.createGroup(plusID + "group");
	var circle = objSVG.createCircle(plusID + "circle",8,8,8);
	groupPlus.appendChild(circle);
	var horizontalLine = objSVG.createLine(plusID + "horizontalLine",2,7.5,14,7.5,"nsGridGroupIcon");
	groupPlus.appendChild(horizontalLine);
	var verticalLine = objSVG.createLine(plusID + "verticalLine",8,2,8,14,"nsGridGroupIcon");
	groupPlus.appendChild(verticalLine);
	objSVG.addElementInSymbol(plusID,"0 0 16 16",groupPlus);
	var minusID = "svgMinus";
	var groupMinus = objSVG.createGroup(minusID + "group");
	circle = objSVG.createCircle(minusID + "circle",8,8,8);
	groupMinus.appendChild(circle);
	horizontalLine = objSVG.createLine(minusID + "horizontalLine",2,7.5,14,7.5,"nsGridGroupIcon");
	groupMinus.appendChild(horizontalLine);
	objSVG.addElementInSymbol(minusID,"0 0 16 16",groupMinus);
};

NSGroupingGrid.prototype.__setWrapperSource = function(source,offset,parentIndex,level)
{
	if(source)
	{
		if(!offset)
		{
			offset = 0;
		}
		var length = source.length;
		for (var count = 0; count < length; count++) 
		{
			var item = source[count];
			var row = document.createElement("TR");
			item[this.__nsGrid.__fieldRowHtml] = row;
			var index = ++this.__rowCounter + offset;
			row.setAttribute("index",index);
			this.__setBodyRowProperty(row,item,parentIndex,level);
			var colLength = this.__nsGrid.__columns.length;
			for (var colIndex = 0; colIndex < colLength; colIndex++)
	        {
	        	var colItem = this.__nsGrid.__columns[colIndex];
	        	var cell =  row.insertCell(-1);
	        	this.util.addStyleClass(cell , "nsDataGridCell");
	            var cellDiv = this.util.createDiv(null);
	            cell.appendChild(cellDiv);
	            this.__setBodyCellProperty(row,cell,item,index,colItem,colIndex,parentIndex,level);
	        }
		}
	}
};
/********************************End of Common Functions for Grid ****************************************/
NSGroupingGrid.prototype.__setBodyRowProperty = function(row,item,parentIndex,level)
{
	if(row && item)
	{
		var totalRowCount = this.__rowCounter;
		this.__nsGrid.__setBodyRowProperty(row,item,totalRowCount);
		item[this.__nsGrid.__fieldIndex] = totalRowCount;
		var hasChild = false;
		if(item.hasOwnProperty(this.__nsGrid.__childField) && item[this.__nsGrid.__childField] && item[this.__nsGrid.__childField].length > 0)
	    {
	    	hasChild = true;
	    	this.__setWrapperSource(item[this.__nsGrid.__childField],0,totalRowCount,level + 1);
	    }
		item[this.__nsGrid.__fieldParentIndex] = parentIndex;
		if(parentIndex > -1)
	    {
			item[this.__nsGrid.__fieldHasParent] = true;
			row.setAttribute("parent-index",parentIndex);
	    }
		else
		{
			item[this.__nsGrid.__fieldHasParent] = false;
		}
		item[this.__nsGrid.__fieldHasChild] = hasChild;
		item[this.__nsGrid.__fieldRowVisible] = false;
		item[this.__nsGrid.__fieldIsCollapsed] = false;
	}
};

NSGroupingGrid.prototype.__setBodyCellProperty = function(row,cell,item,currentIndex,colItem,colIndex,parentIndex,level)
{
	var hierarchicalPadding = 0;
	if(colItem && colItem.hasOwnProperty("dataField") && colItem["dataField"])
	{
		var cellDiv = cell.firstChild;
        if(colIndex == 0 && item.hasOwnProperty(this.__nsGrid.__childField) && item[this.__nsGrid.__childField]  && item[this.__nsGrid.__childField].length > 0)
        {
        	this.util.addStyleClass(cellDiv,this.__nsGrid.__CLASS_GROUP_CELL);
        	this.__nsGrid.__createArrow(currentIndex,cellDiv,false);
        	var cellText = this.util.createDiv(null,this.__nsGrid.__CLASS_CELL_CHILD);
        	cellText.style.verticalAlign = "top";
        	this.__nsGrid.__addCellText(row,item,cellText,colItem,colIndex);
        	cellDiv.appendChild(cellText);
        }
        else
        {
        	this.util.addStyleClass(cellDiv,this.__nsGrid.__CLASS_CELL_CHILD);
        	this.__nsGrid.__addCellText(row,item,cellDiv,colItem,colIndex);
        	//24 = 16(Arrow Width) + 6(Arrow Parent Padding) + 2(cellDiv horizontalGap between elements shown in debugger)
        	hierarchicalPadding = 24;
        }
        if(colIndex == 0 && level === 0)
        {
    		cell.style.paddingLeft = "1px";
        }
	}
	this.__nsGrid.__addPriorityClassInCell(cell,colItem);
};

NSGroupingGrid.prototype.__createArrow = function(compArrow,objSVG,arrowID)
{
	 var svg = objSVG.addSVG(compArrow,arrowID + "svg","nsGridGroupSVG",null,null,null,null,null,null,true);
	 objSVG.addUse(svg,arrowID + "use",null,"#svgMinus");
};

NSGroupingGrid.prototype.__setArrowDirection = function(objSVG,useID,isCollapsed)
{
	if(isCollapsed)
	{
		objSVG.changeUseHref(useID,"#svgPlus");
	}
	else
	{
		objSVG.changeUseHref(useID,"#svgMinus");
	}
};


