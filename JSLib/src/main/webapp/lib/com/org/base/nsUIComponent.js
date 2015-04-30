var nsUIComponent = Object.create(HTMLDivElement.prototype);

nsUIComponent.INITIALIZE = "initialize";
nsUIComponent.CREATION_COMPLETE = "creationComplete";
nsUIComponent.PROPERTY_CHANGE = "propertyChange";
nsUIComponent.REMOVE = "remove";

/*start of private variables */
nsUIComponent.base = null;
nsUIComponent.__setProperty = true; 
nsUIComponent.__id = null;
/*end of private variables */

/*start of functions */
nsUIComponent.__setBase = function() 
{
	if(this.__proto__ && this.__proto__.__proto__)
	{
		this.base = this.__proto__.__proto__;
	}
};

nsUIComponent.__setID = function()
{
	if(this.getAttribute("id"))
	{
		this.__id = this.getAttribute("id");
	}
	else if(this.getAttribute("name"))
	{
		this.__id = this.getAttribute("name");
	}
	else
	{
		this.__id = "comp" + getUniqueId();
	}
};

nsUIComponent.createdCallback = function() 
{
	console.log("In Parent createdCallback");
	this.__setBase();
	this.__setID();
	this.initializeComponent();
	this.dispatchCustomEvent(this.INITIALIZE);
};
nsUIComponent.attachedCallback = function()
{
	console.log("In attachedCallback");
	this.setComponentProperties();
	this.checkForToolTip();
	this.dispatchCustomEvent(this.CREATION_COMPLETE);
};
nsUIComponent.attributeChangedCallback = function(attrName, oldVal, newVal)
{
	console.log("attrName::" + attrName + " oldVal::" + oldVal + " newVal::" + newVal);
	var data = {};
	data.propertyName = attrName;
	data.oldValue = oldVal;
	data.newValue = newVal;
	this.dispatchCustomEvent(this.PROPERTY_CHANGE,data);
	var attributeName = attrName.toLowerCase();
	if(attributeName === "tooltip")
	{
		this.checkForToolTip();
	}
	if(attributeName === "tooltiptype")
	{
		this.checkForToolTip();
	}
	this.propertyChange(attrName, oldVal, newVal, this.__setProperty);
	this.__setProperty = true;
};
nsUIComponent.detachedCallback = function()
{
	console.log("In detachedCallback");
	this.dispatchCustomEvent(this.REMOVE);
};

nsUIComponent.initializeComponent = function() 
{
	console.log("In Parent initializeComponent");
};
nsUIComponent.setComponentProperties = function() 
{
	console.log("In Parent setComponentProperties");
};
nsUIComponent.propertyChange = function(attrName, oldVal, newVal, setProperty) 
{
	console.log("In Parent setComponentProperties");
};

nsUIComponent.getID = function() 
{
	return this.__id;
};

nsUIComponent.checkForToolTip = function() 
{
	if(this.getAttribute("toolTip"))
	{
		var message = this.getAttribute("toolTip");
		var type = "";
		if(this.getAttribute("toolTipType"))
		{
			type = this.getAttribute("toolTipType");
		}
		this.addToolTip(type,message);
	}
	else
	{
		this.removeToolTip();
	}
};

nsUIComponent.addToolTip = function(type,message) 
{
	console.log("In Parent addToolTip");
	this.removeToolTip();
	addStyleClass(this,"nsTooltip");
	var title = "";
	var toolTipClass = "nsTooltipClassic";
	switch(type)
	{
		case "critical":
			title = "Critical";
			toolTipClass = "nsTooltipCritical";
		break;
		case "help":
			title = "Help";
			toolTipClass = "nsTooltipHelp";
		break;
		case "info":
			title = "Information";
			toolTipClass = "nsTooltipInfo";
		break;
		case "warning":
			title = "Warning";
			toolTipClass = "nsTooltipWarning";
		break;
	}
	var toolTip = document.createElement("SPAN");
	toolTip.setAttribute("id",this.getID() + "#toolTip");
	if(title && title != "")
	{
		compTitle = document.createElement("em");
		compTitle.appendChild(document.createTextNode(title));
		toolTip.appendChild(compTitle);
		addStyleClass(toolTip,"nsTooltipCustom");
	}
	addStyleClass(toolTip,toolTipClass);
	var toolTipText = document.createTextNode(message);
	toolTip.appendChild(toolTipText);
	this.appendChild(toolTip);
};

nsUIComponent.removeToolTip = function()
{
	var toolTip = document.getElementById(this.getID() + "#toolTip");
	if(toolTip)
	{
		this.removeChild(toolTip);
		removeStyleClass(this,"nsTooltip");
	}
};

nsUIComponent.dispatchCustomEvent = function(eventType,data,bubbles,cancelable) 
{
	console.log("In Parent dispatchCustomEvent");
	if(isUndefined(data))
	{
		data = null;
	}
	if(typeof bubbles == "undefined")
	{
		bubbles = true;
	}
	if(typeof cancelable == "undefined")
	{
		cancelable = true;
	}
	var event = new CustomEvent(eventType, 
	{
		detail: data,
		bubbles: bubbles,
		cancelable: cancelable
	});
	if (this.hasAttribute(eventType)) 
	{
		var attributeValue = this.getAttribute(eventType);
		if(attributeValue)
		{
			callFunctionFromString(attributeValue,function(paramValue){
				if(paramValue === 'true' || paramValue === 'false')
				{
					return Boolean.parse(paramValue);
				}
				else if(paramValue === 'this')
				{
					return this;
				}
				else if(paramValue === 'event')
				{
					return event;
				}
				return paramValue;
			});
		}
	}
	this.dispatchEvent(event);
};
/*end of functions */

document.registerElement('ns-uicomponent', {prototype: nsUIComponent});