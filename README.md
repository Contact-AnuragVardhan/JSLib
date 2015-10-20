function NSPinTip(component,option)
{
	this.POS_TOP = "top";
	this.POS_BOTTOM = "bottom";
	this.POS_LEFT = "left";
	this.POS_RIGHT = "right";
	this.POS_TOPLEFT = "top-left";
	this.POS_TOPRIGHT = "top-right";
	this.POS_BOTTOMLEFT = "bottom-left";
	this.POS_BOTTOMRIGHT = "bottom-right";
	this.SIZE_LARGE = "large";
	this.SIZE_MEDIUM = "medium";
	this.SIZE_LOW = "low";
	
	this.__component = component;
	this.__position = option["position"];
	this.__size = option["size"];
	this.__showOnMouseHover = option["showOnMouseHover"];
	this.__text = option["text"];
	this.__templateID = option["template"];
	this.__extraStyle = option["style"];
	this.__id = null;
	this.__divTipContainer = null;
	this.__divTip = null;
	this.__divTipArrow = null;
	this.__itemRenderer = null;
	this.__currentPosition = null;
	this.__isVisible = false;
	this.__styleSuffix = "nsPinTip";
	
	this.util = new NSUtil();
	this.__componentMouseOverRef = null;
	this.__componentMouseOutRef = null;
	this.__windowResizeRef = null;
	this.__windowScrollRef = null;
	this.__initialize();
};

NSPinTip.prototype.show = function(text)
{
	if(text)
	{
		this.__text = text;
	}
	if(this.__text || this.__templateID)
	{
		if(!this.__divTipContainer)
		{
			this.__currentPosition = this.__position;
			this.__createTip(this.__position);
		}
		var objPinTip = this;
		this.util.fadeIn(this.__divTipContainer,null,function(component)
		{
			objPinTip.__isVisible = false;
		});
		this.__addContent();
		this.__placeTip(this.__position);
	}
};

NSPinTip.prototype.remove = function()
{
	var objPinTip = this;
	this.util.fadeOut(this.__divTipContainer,function(component)
	{
		if(this.__divTipContainer)
		{
			document.body.removeChild(objPinTip.__divTipContainer);
			objPinTip.__divTipContainer = null;
			objPinTip.__isVisible = false;
		}
	});
};

NSPinTip.prototype.hide = function()
{
	var objPinTip = this;
	this.util.fadeOut(this.__divTipContainer,function(component)
	{
		objPinTip.__isVisible = false;
	});
};

NSPinTip.prototype.destroyObject =  function(styleName)
{
	if(this.__componentMouseOverRef)
	{
		this.util.removeEvent(this.__component,"mouseover",this.__componentMouseOverRef);
		this.__componentMouseOverRef = null;
	}
	if(this.__componentMouseOutRef)
	{
		this.util.removeEvent(this.__component,"mouseout",this.__componentMouseOutRef);
		this.__componentMouseOutRef = null;
	}
	if(this.__windowResizeRef)
	{
		this.util.removeEvent(window,"resize",this.__windowResizeRef);
		this.__windowResizeRef = null;
	}
	if(this.__windowScrollRef)
	{
		this.util.removeEvent(window,"scroll",this.__windowScrollRef);
		this.__windowScrollRef = null;
	}
};

NSPinTip.prototype.isVisible = function()
{
	return this.__isVisible;
};

NSPinTip.prototype.__initialize = function(properties)
{
	
	if(!this.__position)
	{
		this.__position = this.POS_BOTTOM;
	}
	if(!this.__size)
	{
		this.__size = this.SIZE_MEDIUM;
	}
	this.__position = this.__position.toLowerCase();
	this.__size = this.__size.toLowerCase();
	if(Boolean.parse(this.__showOnMouseHover))
	{
		this.__componentMouseOverRef = this.__componentMouseOverHandler.bind(this);
		this.__componentMouseOutRef = this.__componentMouseOutHandler.bind(this);
		this.util.addEvent(this.__component,"mouseover",this.__componentMouseOverRef);
		this.util.addEvent(this.__component,"mouseout",this.__componentMouseOutRef);
	}
	this.__windowResizeRef = this.__windowScrollResizeHandler.bind(this);
	this.__windowScrollRef = this.__windowScrollResizeHandler.bind(this);
	this.util.addEvent(window,"resize",this.__windowResizeRef);
	this.util.addEvent(window,"scroll",this.__windowScrollRef);
};

NSPinTip.prototype.__createTip = function(position)
{
	if(!this.__divTipContainer)
	{
		this.__divTipContainer = this.util.createDiv(this.__getID() + "#nsTipContainer",null);
		this.__setTipStyle(position);
		document.body.appendChild(this.__divTipContainer);
		this.__divTipArrow = this.util.createDiv(this.__getID() + "#nsTipArrow", this.__getStyleName("arrow"));
		this.__divTipContainer.appendChild(this.__divTipArrow);
		this.__divTip = this.util.createDiv(this.__getID() + "#nsTip",this.__getStyleName("content"));
		this.__divTipContainer.appendChild(this.__divTip);
		this.__applyExtraStyle();
	}
};

NSPinTip.prototype.__placeTip = function(position)
{
	var offset = this.__getOffset(position);
	var newPosition = this.__getSuggestedPosition(position, offset);
	if (newPosition && newPosition !== position) 
	{
		position = newPosition;
		offset = this.__getOffset(position);
	}
	this.__currentPosition = position;
	this.__setTipStyle(position);
	this.__divTipContainer.style.top = offset.top + "px";
	this.__divTipContainer.style.left = offset.left + "px";
};

NSPinTip.prototype.__addContent = function()
{
	this.util.removeAllChildren(this.__divTip);
	if(this.__templateID)
	{
		if(!this.__itemRenderer)
		{
			this.__itemRenderer = this.util.getTemplate(this.__templateID);
		}
		if(this.__itemRenderer)
		{
			this.__divTip.appendChild(this.__itemRenderer.cloneNode(true));
		}
	}
	if(this.__divTip.childNodes.length === 0 && this.__text && this.util.isString(this.__text))
	{
		this.__divTip.appendChild(document.createTextNode(this.__text));
	}
};

NSPinTip.prototype.__applyExtraStyle = function()
{
	if(this.__extraStyle && this.util.isString(this.__extraStyle) && this.__extraStyle != "")
	{
		var arrStyles = this.__extraStyle.split(";");
		for(var count = 0; count < arrStyles.length;count++)
		{
			var arrStyle =  arrStyles[count].split(":");
			if(arrStyle && arrStyle.length === 2)
			{
				var styleProp = this.util.convertCSSPropToJS(arrStyle[0]);
				var styleValue = arrStyle[1];
				if(styleProp === "backgroundColor")
				{
					var propPos = null;
					if(this.__currentPosition.indexOf(this.POS_TOP) > -1)
					{
						propPos = this.POS_TOP;
					}
					else if(this.__currentPosition.indexOf(this.POS_BOTTOM) > -1)
					{
						propPos = this.POS_BOTTOM;
					}
					else if(this.__currentPosition.indexOf(this.POS_LEFT) > -1)
					{
						propPos = this.POS_LEFT;
					}
					else if(this.__currentPosition.indexOf(this.POS_RIGHT) > -1)
					{
						propPos = this.POS_RIGHT;
					}
					if(propPos)
					{
						propPos = propPos[0].toUpperCase() + propPos.slice(1);
					}
					this.__divTipArrow.style["border" + propPos + "Color"] = styleValue;
				}
				this.__divTip.style[styleProp] = styleValue;
			}
		}
	}
};

NSPinTip.prototype.__getOffset = function(position)
{
	  var pad = 15;
	  var rectTip = this.__divTipContainer.getBoundingClientRect();
	  var rectComponent = this.__component.getBoundingClientRect();
	  var item = {top: 0,left:0};
	  if(rectTip && rectComponent)
	  {
		  var tipWidth = rectTip.width;
		  var tipHeight = rectTip.height;
		  var componentWidth = rectComponent.width;
		  var componentHeight = rectComponent.height;
		  var componentOffset = this.util.getOffSetForElementRectangle(rectComponent);
		  switch(position) 
		  {
			case this.POS_TOP:
				item.top = componentOffset.top - tipHeight;
				item.left = componentOffset.left + componentWidth / 2 - tipWidth / 2;
				break;
			case this.POS_BOTTOM:
				item.top = componentOffset.top + componentHeight;
				item.left = componentOffset.left + componentWidth / 2 - tipWidth / 2;
				break;
			case this.POS_LEFT:
				item.top =  componentOffset.top + componentHeight / 2 - tipHeight / 2;
				item.left = componentOffset.left - tipWidth;
				break;
			case this.POS_RIGHT:
				item.top =  componentOffset.top + componentHeight / 2 - tipHeight / 2,
				item.left = componentOffset.left + componentWidth;
				break;
			case this.POS_TOPLEFT:
				item.top =  componentOffset.top - tipHeight;
				item.left = componentOffset.left + componentWidth / 2 - tipWidth + pad;
				break;
			case this.POS_TOPRIGHT:
				item.top =  componentOffset.top - tipHeight;
				item.left = componentOffset.left + componentWidth / 2 - pad;
				break;
			case this.POS_BOTTOMLEFT:
				item.top =  componentOffset.top + componentHeight;
				item.left = componentOffset.left + componentWidth / 2 - tipWidth + pad;
				break;
			case this.POS_BOTTOMRIGHT:
				item.top =  componentOffset.top + componentHeight;
				item.left = componentOffset.left + componentWidth / 2 - pad;
				break;
		  }
	  }
	  return item;
};

NSPinTip.prototype.__getSuggestedPosition = function(position,offset)
{
	  var tipWidth = this.__divTipContainer.clientWidth;
	  var tipHeight = this.__divTipContainer.clientHeight;
	  var top = window.scrollY;
	  var left = window.scrollX;
	  var totalWidth = window.innerWidth;
	  var totalHeight = window.innerHeight;
	
	  var objPosition = {};
	  objPosition[this.POS_TOP] = true;
	  objPosition[this.POS_BOTTOM] = true;
	  objPosition[this.POS_LEFT] = true;
	  objPosition[this.POS_RIGHT] = true;
	  
	  if (offset.top < top) 
	  {
		  objPosition[this.POS_TOP] = false;
	  }
	  if (offset.top + tipHeight > top + totalHeight) 
	  {
		  objPosition[this.POS_BOTTOM] = false;
	  }
	  if (offset.left < left)
	  {
		  objPosition[this.POS_LEFT] = false;
	  }
	  if (offset.left + tipWidth > left + totalWidth) 
	  {
		  objPosition[this.POS_RIGHT] = false;
	  }
	
	  var positions = position.split("-");
	  //below loop tries to give favourable position like bottom-right so if position has bottom and right both true it returns that position
	  for (var count = 0; count < positions.length; count++) 
	  {
		if (!objPosition[positions[count]]) 
		{
			break;
		}
		if (count === positions.length - 1) 
		{
		  return position;
		}
	  }
	  //below loop tries to give one favourable position like in bottom-right if bottom is true or right is true it gets returned
	  for (var count = 0; count < positions.length; count++) 
	  {
		if (objPosition[positions[count]]) 
		{
			return positions[count];
		}
	  }
	  if (objPosition[position]) 
	  {
		  return position;
	  }
	  for(var tmpPosition in objPosition)
	  {
		  if (objPosition[tmpPosition]) 
		  {
			  return tmpPosition;
		  }
	  }
};

NSPinTip.prototype.__componentMouseOverHandler = function(event)
{
	 this.show(this.__text);
};

NSPinTip.prototype.__componentMouseOutHandler = function(event)
{
	this.remove();
};

NSPinTip.prototype.__windowScrollResizeHandler = function(event)
{
	console.log("In __windowScrollResizeHandler");
	 this.show(this.__text);
};

NSPinTip.prototype.__setTipStyle = function(position)
{
	var classname = this.__styleSuffix;
	var posStyle = this.__getStyleName(position.toLowerCase());
	if(!posStyle)
	{
		posStyle = this.__getStyleName("top");
	}
	classname += " " + posStyle;
	if(!this.__size)
	{
		this.__size = "medium";
	}
	classname += " " + this.__getStyleName(this.__size);
	this.__divTipContainer.setAttribute("class", classname);
};

NSPinTip.prototype.__getStyleName =  function(styleName)
{
	return this.__styleSuffix + "-" + styleName;
};

NSPinTip.prototype.__getID = function()
{
	if(!this.__id)
	{
		if(this.__component.hasAttribute("id"))
		{
			this.__id = this.__component.getAttribute("id");
		}
		else if(this.__component.hasAttribute("name"))
		{
			this.__id = this.__component.getAttribute("name");
		}
		else
		{
			this.__id = "comp" + this.util.getUniqueId();
		}
	}
	
	return this.__id;
};
