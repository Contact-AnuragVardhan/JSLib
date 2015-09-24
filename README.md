var nsList = Object.create(nsContainerBase);

nsList.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.ITEM_SELECTED = "itemSelected";
	this.ITEM_UNSELECTED = "itemUnselected";
	this.NAVIGATION_UP = "up";
	this.NAVIGATION_DOWN = "down";
	
	this.__resuableRenderRequired = false;
	this.__dataProvider = null;
	this.__labelField = "label";
	this.__labelFunction = null;
	this.__templateID = null;
	this.__itemRenderer = null;
	this.__setDataCallBack = null;
	this.__clearDataCallBack = null;
	this.__currentIndex = -1;
	this.__selectedIndex = -1;
	this.__navigationIndex = -1;
	this.__selectedItem = null;
	this.__enableKeyboardNavigation = false;
	this.__enableMultipleSelection = false;
	this.__customScrollerRequired = false;
	this.__selectedItems = new Array();	
	this.__selectedIndexes = new Array();
	
	this.__arrWrapper = null;
	
	this.__outerContainer = null;
	this.__parentContainer = null;
	this.__childContainer = null;
	this.__listContainer = null;
	this.__scroller = null;
	this.__lastNavigationDirection = null;
	
	this.__availableHeight = 0;
	this.__scrollHeight = 0;
	this.__listItemHeight = 0;
	this.__rowCount = 0;
	this.__maxRows = 0;
	this.__visibleRows = 0;
	this.__hiddenRows = 0;
	this.__availableRows = 0;
	this.__topHiddenRows = 0;
	this.__bottomHiddenRows = 0;
	this.__maxCount = 0;
	this.__startArrayElement = -1;
	this.__scrollOffset = 0;
	this.__targetDimensionOffset = 140;
	this.__pageSize = 0;
	this.__scrollTarget = null;
	
	this.__positionX = 0;
	this.__positionY = 0;
	this.__changeX = 0;
	this.__changeY = 0;
	
	//this.setComponentProperties();
};

nsList.setComponentProperties = function() 
{
	if(this.hasAttribute("resuableRenderRequired"))
	{
		this.__resuableRenderRequired =  Boolean.parse(this.getAttribute("resuableRenderRequired"));
	}
	if(this.hasAttribute("labelField"))
	{
		this.__labelField = this.getAttribute("labelField");
	}
	if(this.hasAttribute("labelFunction"))
	{
		this.__labelFunction = this.getAttribute("labelFunction");
	}
	if(this.hasAttribute("template"))
	{
		this.__templateID = this.getAttribute("template");
	}
	if(this.hasAttribute("setDataCallBack"))
	{
		this.__setDataCallBack = this.getAttribute("setDataCallBack");
	}
	if(this.hasAttribute("clearDataCallBack"))
	{
		this.__clearDataCallBack  = this.getAttribute("clearDataCallBack");
	}
	if(this.hasAttribute("enableMultipleSelection"))
	{
		this.__enableMultipleSelection =  Boolean.parse(this.getAttribute("enableMultipleSelection"));
	}
	if(this.hasAttribute("customScrollerRequired"))
	{
		this.__customScrollerRequired =  Boolean.parse(this.getAttribute("customScrollerRequired"));
	}
	if(this.hasAttribute("enableKeyboardNavigation"))
	{
		this.__enableKeyboardNavigation =  Boolean.parse(this.getAttribute("enableKeyboardNavigation"));
	}
	this.__setTemplate();
	this.__addListenerForBody();
	this.base.setComponentProperties();
	if(this.__dataProvider && this.__dataProvider.length > 0)
	{
		this.setDataProvider(this.__dataProvider);
	}
};

nsList.setDataProvider = function(dataProvider)
{
	this.__dataProvider = dataProvider;
	if(this.__dataProvider && this.__dataProvider.length > 0 && this.__isCreationCompleted)
	{
		this.__calculateComponentParameters();
		this.__createComponents();
		if(this.__resuableRenderRequired)
		{
			this.__createWrapperObject();
			this.__createReusableRendererComponents();
			this.__calculateDimensions();
			this.__renderList(0,false);
			this.__setPosition(0,0);
		}
		else
		{
			this.__createNonreusableRendererComponents();
			this.__startArrayElement = 0;
		}
		if(!this.__scroller)
		{
			this.__scrollTarget = this.__outerContainer;
			if(this.__customScrollerRequired)
			{
				this.__outerContainer.style.overflow = "hidden";
				this.__scroller = new NSScroller(this.__parentContainer);
				this.__scrollTarget = this.__scroller.getChildContainer();
			}
		}
	}
};

nsList.setSelectedIndex = function(selectedIndex,animationRequired)
{
	if(selectedIndex > -1 && this.__arrWrapper && selectedIndex < this.__arrWrapper.length)
	{
		var targetDimension = (parseInt(selectedIndex) * this.__listItemHeight);
		//for non resusable we need to add the offset 
		if(!this.__resuableRenderRequired)
		{
			targetDimension += this.__targetDimensionOffset;
		}
		if(animationRequired)
		{
			var animation = new this.util.animation(this.__scrollTarget,[
       	  	    {
       	  	      time: 1,
       	  	      property:"scrollTop",
       	  	      target: targetDimension,
       	  	    }
       	  	]);
   	  	  	animation.animate();
		}
		else
		{
			this.__scrollTarget.scrollTop = targetDimension;
		}
	}
};

nsList.getSelectedIndex = function()
{
	return this.__selectedIndex;
};

nsList.getSelectedItem = function()
{
	return this.__selectedItem;
};

nsList.getSelectedIndexes = function()
{
	return this.__selectedIndexes;
};

nsList.getSelectedItems = function()
{
	return this.__selectedItems;
};

nsList.deselectAll = function()
{
	this.__clearAllRowSelection(true);
};

nsList.__setTemplate = function()
{
	if(this.__templateID)
	{
		this.__itemRenderer = this.util.getTemplate(this.__templateID);
	}
	else
	{
		var renderer = new this.util.defaultRenderer();
		this.__itemRenderer = renderer.getRenderer();
		this.__setDataCallBack = renderer.setData.bind(renderer);
		this.__clearDataCallBack = renderer.clearData.bind(renderer);
	}
};

nsList.__createWrapperObject = function()
{
	this.__arrWrapper = new Array();
	if(this.__dataProvider)
	{
		var dataItem = null;
		for(var count = 0; count < this.__dataProvider.length; count++) 
		{
			dataItem = this.__dataProvider[count];
			this.__createWrapperItem(dataItem,count);
		}
	}
};

nsList.__createWrapperItem = function(dataItem,count)
{
	var item = new Object();
	item.data = dataItem;
	item.selected = false;
	item.index = count;
	this.__arrWrapper[count] = item;
};

nsList.__createComponents = function()
{
	if(!this.__outerContainer)
	{
		this.__outerContainer = this.util.createDiv(this.getID() + "#container","nsListOuterContainer");
		this.__outerContainer.style.height = this.__availableHeight + "px";
		this.addChild(this.__outerContainer);
		this.__parentContainer = this.util.createDiv(this.getID() + "#parentContainer","nsListParentContainer");
		this.__outerContainer.appendChild(this.__parentContainer);
		this.__childContainer = this.util.createDiv(this.getID() + "#childContainer",null);
		this.__parentContainer.appendChild(this.__childContainer);
		this.__listContainer = document.createElement("ul");
		this.util.addStyleClass(this.__listContainer,"nsListContainer");
		//this.__parentContainer.appendChild(this.__listContainer);
		this.__childContainer.appendChild(this.__listContainer);
	}
};

nsList.__createNonreusableRendererComponents = function()
{
	this.__arrWrapper = new Array();
	if(this.__outerContainer && this.__dataProvider.length > 0)
	{
		var dataItem = null;
		for(var count = 0; count < this.__dataProvider.length; count++) 
		{
			var listItem = this.__createItem();
			dataItem = this.__dataProvider[count];
			listItem.index = count;
			this.__setDataInItem(listItem,dataItem);
			this.__createWrapperItem(dataItem,count);
		}
		//5 is offset for number of rows
		this.__pageSize = (this.__outerContainer.clientHeight/this.__listContainer.children[0].offsetHeight) - 5;
	}
};

nsList.__createReusableRendererComponents = function()
{
	if(this.__outerContainer)
	{
		var target = null;
		if(this.__customScrollerRequired)
		{
			target = this.__parentContainer;
			this.__childContainer.style.maxHeight = this.__scrollHeight + "px";
			this.__childContainer.style.height = this.__scrollHeight + "px";
		}
		else
		{
			target = this.__outerContainer;
			var divHeight = this.util.createDiv(null,"nsListScrollerCause");
			divHeight.style.maxHeight = this.__scrollHeight + "px";
			divHeight.style.height = this.__scrollHeight + "px";
			this.__outerContainer.appendChild(divHeight);
		}
		for(var count = 0; count <= this.__rowCount; count++) 
		{
			var listItem = this.__createItem();
		}
		this.util.addEvent(target,"scroll",this.__scrollHandler.reference(this));
	}
};

nsList.__setDataInItem = function(listItem,data)
{
	if(listItem)
	{
		this.__setRendererInData(listItem,data);
		//IE bug
		listItem.data = data;
		if(this.util.isFunction(this.__setDataCallBack))
	    {
			var list = this;
	    	if(this.util.isString(this.__setDataCallBack))
	    	{
	    		this.util.callFunctionFromString(this.__setDataCallBack + "(listItem,data,labelField)",function(paramValue){
					if(paramValue === "listItem")
					{
						return listItem;
					}
					if(paramValue === "data")
					{
						return data;
					}
					if(paramValue === "labelField")
					{
						return list.__labelField;
					}
					return paramValue;
				});
	    	}
	    	else
	    	{
	    		this.__setDataCallBack(listItem,data,this.__labelField);
	    	}
	    }
	}
};

nsList.__createItem = function()
{
	 var listItem = document.createElement("li");
	 this.util.addStyleClass(listItem,"nsListItem");
	 listItem.style.height = this.__listItemHeight + "px";
	 this.util.addEvent(listItem,"click",this.__itemClickHandler.reference(this));
	 this.util.addEvent(listItem,"mouseover",this.__itemMouseOverHandler.reference(this));
	 this.util.addEvent(listItem,"mouseout",this.__itemMouseOutHandler.reference(this));
	 listItem.onfocus = this.__itemFocusHandler.reference(this);
	 listItem.appendChild(this.__itemRenderer.cloneNode(true));
	 this.__setRendererProperties(listItem);
	 this.__listContainer.appendChild(listItem);
	 
	 return listItem;
};

nsList.__itemFocusHandler = function(event)
{
	this.__focused = true;
};

nsList.__itemBlurHandler = function(event)
{
	this.__focused = false;
};


nsList.__itemClickHandler = function(event)
{
	event = this.util.getEvent(event);
    var target = this.util.getTarget(event);
    target = this.util.findParent(target,"li");
    //Multiselection Check
    if (event.shiftKey && this.__enableMultipleSelection)
    {
    	this.__multiSectionHandler(target.index);
    }
    else if(event.ctrlKey && this.__enableMultipleSelection)
    {
      if(this.__isRowSelected(target.index))
      {
    	  this.__markRowUnselected(target.index);
      }
      else
      {
    	  this.__markRowSelected(target.index);
      }
    }
    else
    {
    	this.__clearAllRowSelection(false);
    	this.__markRowSelected(target.index);
    } 
    this.__lastNavigationDirection = null;
};

nsList.__itemMouseOverHandler = function(event)
{
	 var target = this.util.getTarget(event);
     target = this.util.findParent(target,"li");
     if(target && target.index > -1)
     {
    	 this.util.addStyleClass(target,"itemHover");
    	 this.__navigationIndex = target.index;
     }
};

nsList.__itemMouseOutHandler = function(event)
{
	 var target = this.util.getTarget(event);
     target = this.util.findParent(target,"li");
     if(target)
     {
    	 this.util.removeStyleClass(target,"itemHover");
     }
};

nsList.__isRowSelected= function(index)
{
    if(index > -1 && index < this.__arrWrapper.length)
    {
        return this.__arrWrapper[index].selected;
    }   
    return false;
};

nsList.__markRowSelected= function(index)
{
	if(index > -1 && index < this.__arrWrapper.length)
    {
        if(!this.__isRowSelected(index))
        {
        	this.__setMultiSelectedVars(index,true);
            this.__setValuesForSelectedRow(index);
        	if(this.__resuableRenderRequired)
        	{
        		this.__setReusableRowSelection();
        	}
        	else
        	{
        		var row = this.__listContainer.children[index];
            	this.util.addStyleClass(row,"selected"); 
        	}
        }
    }
};

nsList.__markRowUnselected= function(index)
{
    if(this.__isRowSelected(index))
    {
    	var isUnselected = this.__setMultiSelectedVars(index,false);
        if(isUnselected)
        {
        	this.__setValuesForUnselectedRow(index);
        }
        if(this.__resuableRenderRequired)
    	{
    		this.__setReusableRowSelection();
    	}
    	else
    	{
    		var row = this.__listContainer.children[index];
    		this.util.removeStyleClass(row,"selected");
    	}
    }
};

nsList.__setValuesForSelectedRow= function(index)
{
	if(index > -1 && index < this.__arrWrapper.length)
	{
		this.__arrWrapper[index].selected = true;
	    this.__selectedIndex = index;
	    this.__navigationIndex = index;
	    this.util.dispatchEvent(this,this.ITEM_SELECTED,this.__arrWrapper[index].data,{index:index});
	}
};

nsList.__setValuesForUnselectedRow= function(index)
{
	if(index > -1 && index < this.__arrWrapper.length)
	{
		this.__arrWrapper[index].selected = false;
    	this.util.dispatchEvent(this,this.ITEM_UNSELECTED,this.__arrWrapper[index].data,{index:index});
	}
};

nsList.__clearAllRowSelection= function(setIndexVariables)
{
	var size = this.__selectedIndexes.length;
    for (var count = size - 1; count >= 0 ; count--)
    {
    	var index = this.__selectedIndexes[count];
        this.__markRowUnselected(index);
    }
    this.__setMultiSelectedVars(-1,true);
    if(setIndexVariables)
    {
    	this.__selectedIndex = -1;
        this.__navigationIndex = -1;
    }
};

nsList.__multiSectionHandler= function(lastIndex)
{
	 if(lastIndex < 0)
	 {
		 return;
	 }
	 if (this.__selectedIndexes.length === 0)
	 {
		 this.__isRowSelected(lastIndex);
	     return;
	 }
	 var firstIndex = this.__selectedIndexes[this.__selectedIndexes.length - 1];
	 if(lastIndex === firstIndex)
	 {
		 this.__markRowUnselected(lastIndex);
		 return;
	 }
	 var isDown = lastIndex > firstIndex;
	 var isSelection = !this.__isRowSelected(lastIndex);
	 var counter = firstIndex;
	 do
	 {
		  counter = isDown ? (counter + 1) : (counter - 1);
		  if (isSelection)
		  {
			  this.__markRowSelected(counter);
		  }
		  else
		  {
			  this.__markRowUnselected(counter);
		  }
	 }
	 while(counter != lastIndex);	 
};

nsList.__setMultiSelectedVars= function(index,add)
{
	if(index === -1)
	{
		this.__selectedItems = new Array();	
		this.__selectedIndexes = new Array();	
	}
	else if(add)
	{
		var data = this.__dataProvider[index];
		this.__selectedItems.push(data);
		this.__selectedIndexes.push(index);
	}
	else
	{
		var isUnselected = false;
		for (var count= 0; count < this.__selectedIndexes.length ; count++)
        {
            if (this.__selectedIndexes[count] === index)
            {
                this.__selectedItems.splice(count,1);
                this.__selectedIndexes.splice(count,1);
                isUnselected = true;
                break;
            }
        }
		return isUnselected;
	}
	
	return true;
};


nsList.__calculateComponentParameters = function()
{
	if(this.hasAttribute("nsHeight"))
	{
		this.__availableHeight = this.util.getDimensionAsNumber(this,this.getAttribute("nsHeight"));
	}
	else if(this.style.height != "")
	{
		this.__availableHeight  = this.util.getDimensionAsNumber(this,this.style.height);
	}
	else
	{
		this.__availableHeight  = this.offsetHeight;
	}
	var tempRenderer = this.__itemRenderer.cloneNode(true);
	tempRenderer.removeAttribute("id");
	this.addChild(tempRenderer);
	this.__listItemHeight = tempRenderer.offsetHeight;
	if(this.__listItemHeight <= 0)
	{
		this.__listItemHeight = this.util.getDimensionAsNumber(tempRenderer,tempRenderer.style.height);
	}
	
	this.__rowCount = Math.round(this.__availableHeight/this.__listItemHeight) * 2;
	this.__scrollHeight = ((this.__dataProvider.length) * this.__listItemHeight);
	this.deleteChild(tempRenderer);
};

nsList.__calculateDimensions = function()
{
	if(this.__listContainer.children)
	{
		this.__maxRows = (this.__listContainer.offsetHeight - this.__availableHeight) / this.__listItemHeight;
		this.__availableRows = this.__listContainer.children.length;
		this.__visibleRows = (this.__availableHeight / this.__listItemHeight);
		this.__pageSize = this.__visibleRows - 5;
		this.__hiddenRows = this.__availableRows - this.__visibleRows;
		this.__topHiddenRows = Math.floor(this.__hiddenRows / 2);
		this.__bottomHiddenRows = this.__topHiddenRows + (this.__hiddenRows % 2);
		this.__maxCount = Math.max(0,this.__arrWrapper.length - this.__visibleRows);
		for(var count = 0; count < this.__listContainer.children.length; count++) 
		{
			this.__listContainer.children[count].originalOrder = count;
		}
	}
};

nsList.__renderList = function(value,forceRender)
{
	var currentIndex = this.__currentIndex;
	if(value < 0)
	{
		value = 0;
	}
	else if(value > this.__maxCount)
	{
		value = this.__maxCount;
	}
	
	if(this.__currentIndex != value)
	{
		this.__currentIndex = value;
		currentIndex = value;
		var topOffset = 0;
		var minBottomRows = Math.min(this.__bottomHiddenRows,this.__maxCount - this.__currentIndex);
		var minTopRows = Math.min(this.__currentIndex,this.__topHiddenRows);
		topOffset = this.__listContainer.children[0].originalOrder;
		var rowsOnTop = (this.__currentIndex - topOffset % this.__availableRows) % this.__availableRows;
		var rowsOnBottom = this.__availableRows - this.__visibleRows - rowsOnTop;
		var toMove = 0;
		if(this.__currentIndex > currentIndex)
		{
			minTopRows--;
		}
		else if(this.__currentIndex < currentIndex)
		{
			minBottomRows--;
		}
		while(rowsOnBottom < minBottomRows)
		{
			toMove = this.__listContainer.children[0];
			this.__listContainer.removeChild(toMove);
			this.__listContainer.appendChild(toMove);
			rowsOnBottom++;
			rowsOnTop--;
		}
		
		while(rowsOnTop < minTopRows) 
		{
			toMove = this.__listContainer.children[this.__listContainer.children.length - 1];
			this.__listContainer.removeChild(toMove);
			this.__listContainer.insertBefore(toMove,this.__listContainer.children[0]);
			rowsOnTop++;
			rowsOnBottom--;
		}
		rowsOnTop = this.__availableRows - this.__visibleRows - rowsOnBottom; 
		if(rowsOnTop < 0)
		{
			rowsOnTop = 0;
		}
		topOffset = Math.max(0,Math.floor(this.__currentIndex - rowsOnTop));
       	var start = Math.ceil(this.__currentIndex) - Math.ceil(rowsOnTop);
		if(start != this.__startArrayElement)
		{
			var end = start + this.__availableRows;
			if(start < 0)
			{
				start = 0;
			}
			
			if(end > this.__arrWrapper.length)
			{
				end = this.__arrWrapper.length;
			}
			var visibleData = this.__arrWrapper.slice(start, end);
			var listItem = null;
			var dataItem = null;
			for(var count = 0; count < visibleData.length; count++) 
			{
				if(forceRender || (this.__listContainer.children[count].data != visibleData[count].data)) 
				{
					dataItem = visibleData[count].data;
					listItem = this.__listContainer.children[count];
					listItem.index = start + count;
					if(visibleData[count].selected)
					{
						//DONOT REPLACE WITH __markRowSelected
						this.util.addStyleClass(listItem,"selected"); 
					}
					else
					{
						//DONOT REPLACE WITH __markRowUnselected
						this.util.removeStyleClass(listItem,"selected");
					}
					this.__setDataInItem(listItem,dataItem);
				}
			}
			if(this.__listContainer.children.length > visibleData.length)
			{
				var childCount = this.__listContainer.children.length;
				var visibleCount = visibleData.length;
				for(var count = childCount - 1;count > visibleCount - 1;count--)
				{
					listItem = this.__listContainer.children[count];
					listItem.index = -1;
					if(this.util.isFunction(this.__clearDataCallBack))
		            {
		            	if(this.util.isString(this.__clearDataCallBack))
		            	{
		            		this.util.callFunctionFromString(this.__clearDataCallBack + "(listItem)",function(paramValue){
		        				if(paramValue === "listItem")
		        				{
		        					return listItem;
		        				}
		        				return paramValue;
		        			});
		            	}
		            	else
		            	{
		            		this.__clearDataCallBack(listItem);
		            	}
		            }
				}
			}
			this.__startArrayElement = start;
		}
		var listTop = this.__scrollOffset - ((this.__currentIndex - topOffset) * this.__listItemHeight);
		this.__listContainer.style.top = Math.max(0,listTop) + "px";
		
	}
};

nsList.__setReusableRowSelection = function()
{
	if(this.__listContainer.children && this.__listContainer.children.length > 0)
	{
		var listItem = null;
		for(var count = 0; count < this.__listContainer.children.length; count++) 
		{
			listItem = this.__listContainer.children[count];
			var item = this.__arrWrapper[listItem.index];
			if(item)
			{
				if(item.selected)
				{
					//DONOT REPLACE WITH __markRowSelected
					this.util.addStyleClass(listItem,"selected"); 
				}
				else
				{
					//DONOT REPLACE WITH __markRowUnselected
					this.util.removeStyleClass(listItem,"selected");
				}
			}
		}
	}
};

nsList.__setPosition= function(posX,posY)
{
	this.__positionX = posX;
	this.__positionY = posY;
};

nsList.__setChange= function(changeX,changeY)
{
	this.__changeX = this.__positionX - changeX;
	this.__changeY = this.__positionY - changeY;
};

nsList.__scrollHandler = function(event)
{
	var targetScrollTop = this.__outerContainer.scrollTop;
	var targetScrollLeft = this.__outerContainer.scrollLeft;
	if(this.__customScrollerRequired)
	{
		targetScrollTop = event.scrollTop;
		targetScrollLeft = event.scrollLeft;
	}
	if(targetScrollTop == this.__scrollOffset) 
	{
		return;
	}
	if(!this.__arrWrapper || !this.__arrWrapper.length) 
	{
		return;
	}
	this.__scrollOffset = Math.max(0,targetScrollTop);
	this.__scrollOffset = Math.min(this.__scrollOffset, this.__scrollHeight);
	
	
	this.__setChange(targetScrollLeft, this.__scrollOffset);
	this.__renderList(this.__currentIndex - this.__changeY / this.__listItemHeight, false);
	this.__setPosition(targetScrollLeft, this.__scrollOffset);
};

nsList.__setRendererProperties = function(listItem)
{
	if(listItem)
	{
		var compChild = null;
		for(var count = 0; count < listItem.children.length; count++) 
		{
			compChild = listItem.children[count];
			var list = this;
			Array.prototype.slice.call(compChild.attributes).forEach(function(attribute) 
			{
		        if(list.util.isFunction(attribute.value))
		        {
		        	var newValue = attribute.value + "(this)";
		        	compChild.removeAttribute(attribute.name);
					compChild.setAttribute(attribute.name,newValue);
		        }
			});
			if(compChild)
			{
				if(compChild.hasAttribute("accessor-name"))
				{
					listItem[compChild.getAttribute("accessor-name")] = compChild;
				}
			}
			this.__setRendererProperties(compChild);
		}
	}
};

nsList.__setRendererInData = function(listItem,item)
{
	if(listItem)
	{
		var compChild = null;
		for(var count = 0; count < listItem.children.length; count++) 
		{
			compChild = listItem.children[count];
			if(compChild)
			{
				compChild.data = item;
			}
			//IE 9 Bug,you got to assign it back
			//listItem.children[count] = compChild;
			this.__setRendererInData(compChild,item);
		}
	}
};

nsList.__addListenerForBody = function()
{
	//if(this.__enableMultipleSelection)
	//{
		this.util.addEvent(document.body,"keydown",this.__keyDownHandler.reference(this));
		this.util.addEvent(document.body,"keyup",this.__keyUpHandler.reference(this));
	//}
	
};

nsList.__keyDownHandler = function(event)
{
	console.log("here");
	event = this.util.getEvent(event);
	var isShiftCtrlPressed = event.shiftKey || event.ctrlKey;
	var keyCode = this.util.getKeyUnicode(event);
	
	if(this.__enableKeyboardNavigation)
	{
		//key Up
		if(keyCode === this.util.KEYCODE.UP && isShiftCtrlPressed && this.__enableMultipleSelection)
		{
			if(this.__lastNavigationDirection && this.__lastNavigationDirection === this.NAVIGATION_DOWN)
			{
				return this.__keyBoardSelectionHandler(event,this.NAVIGATION_UP);
			}
			if(this.__selectedIndex != 0)
			{
				this.__selectedIndex--;
				this.__navigationIndex--;
				return this.__keyBoardSelectionHandler(event,this.NAVIGATION_UP);
			}
		}
		//key down
		else if(keyCode === this.util.KEYCODE.DOWN && isShiftCtrlPressed && this.__enableMultipleSelection)
		{
			if(this.__lastNavigationDirection && this.__lastNavigationDirection === this.NAVIGATION_UP)
			{
				return this.__keyBoardSelectionHandler(event,this.NAVIGATION_DOWN);
			}
			if(this.__selectedIndex != this.__arrWrapper.length - 1)
			{
				this.__selectedIndex++;
				this.__navigationIndex++;
				return this.__keyBoardSelectionHandler(event,this.NAVIGATION_DOWN);
			}
		}
		else if(keyCode === this.util.KEYCODE.UP)
		{
			if(this.__navigationIndex === -1)
			{
				this.__navigationIndex = this.__arrWrapper.length - 1;
			}
			if(this.__navigationIndex > 0)
			{
				return this.__keyBoardNavigationHandler(event,this.NAVIGATION_UP);
			}
		}
		else if(keyCode === this.util.KEYCODE.DOWN)
		{
			if(this.__navigationIndex === -1)
			{
				this.__navigationIndex = 0;
			}
			if(this.__navigationIndex < this.__arrWrapper.length - 1)
			{
				return this.__keyBoardNavigationHandler(event,this.NAVIGATION_DOWN);
			}
		}
		else if(keyCode === this.util.KEYCODE.ENTER)
		{
			this.__clearAllRowSelection(false);
			this.__markRowSelected(this.__navigationIndex);
		}
	}
	if(keyCode === this.util.KEYCODE.SHIFT)
	{
		this.util.addStyleClass(document.body,"nsUnselectable");
	}
};

nsList.__keyUpHandler = function(event)
{
	//unicode for shift key is 16
	if(this.util.getKeyUnicode(event) === this.util.KEYCODE.SHIFT)
	{
		this.util.removeStyleClass(document.body,"nsUnselectable");
	}
};

nsList.__keyBoardNavigationHandler = function(event,direction)
{
	var row = this.__listContainer.children[this.__navigationIndex - this.__startArrayElement];
	this.util.removeStyleClass(row,"itemHover");
	(direction === this.NAVIGATION_UP) ? this.__navigationIndex--:this.__navigationIndex++;
	row = this.__listContainer.children[this.__navigationIndex - this.__startArrayElement];
	this.util.addStyleClass(row,"itemHover");
	if(direction === this.NAVIGATION_DOWN)
	{
		if(this.__resuableRenderRequired)
		{
			this.setSelectedIndex(this.__navigationIndex,false);
		}
		else if(Math.floor(this.__navigationIndex % this.__pageSize) === 0)
		{
			var rowOffset = this.util.getPosition(row);
			this.__scrollTarget.scrollTop = rowOffset.top;
		}
	}
	else if(direction === this.NAVIGATION_UP)
	{
		if(this.__resuableRenderRequired)
		{
			this.setSelectedIndex(this.__navigationIndex,false);
		}
		else
		{
			var rowOffset = this.util.getPosition(row);
			this.__scrollTarget.scrollTop = rowOffset.top;
		}
	}
	this.__lastNavigationDirection = null;
	event.preventDefault();
	return false;
};

nsList.__keyBoardSelectionHandler = function(event,direction)
{
	if(this.__isRowSelected(this.__selectedIndex))
	{
		this.__markRowUnselected(this.__selectedIndex);
	}
	else
	{
		this.__markRowSelected(this.__selectedIndex);
	}
	if(direction === this.NAVIGATION_DOWN)
	{
		if(this.__resuableRenderRequired)
		{
			this.setSelectedIndex(this.__selectedIndex,false);
		}
		else if(Math.floor(this.__selectedIndex % this.__pageSize) === 0)
		{
			var row = this.__listContainer.children[this.__selectedIndex];
			var rowOffset = this.util.getPosition(row);
			this.__scrollTarget.scrollTop = rowOffset.top;
		}
	}
	else if(direction === this.NAVIGATION_UP)
	{
		if(this.__resuableRenderRequired)
		{
			this.setSelectedIndex(this.__selectedIndex,false);
		}
		else
		{
			var row = this.__listContainer.children[this.__selectedIndex];
			var rowOffset = this.util.getPosition(row);
			this.__scrollTarget.scrollTop = rowOffset.top;
		}
	}
	this.__lastNavigationDirection = direction;
	event.preventDefault();
	return false;
};

nsList.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	this.base.propertyChange(attrName, oldVal, newVal, setProperty);
};


document.registerElement("ns-list", {prototype: nsList});
