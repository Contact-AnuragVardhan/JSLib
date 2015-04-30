var nsUIComponent = Object.create(HTMLDivElement.prototype);

nsUIComponent.INITIALIZE = "initialize";
nsUIComponent.CREATION_COMPLETE = "creationComplete";
nsUIComponent.PROPERTY_CHANGE = "propertyChange";
nsUIComponent.REMOVE = "remove";

/*start of private variables */
nsUIComponent.base = null;
nsUIComponent.__setProperty = true; 
/*end of private variables */

/*start of functions */
nsUIComponent.__setBase = function() 
{
	if(this.__proto__ && this.__proto__.__proto__)
	{
		this.base = this.__proto__.__proto__;
	}
};
nsUIComponent.createdCallback = function() 
{
	console.log("In Parent createdCallback");
	this.__setBase();
	this.initializeComponent();
	this.dispatchCustomEvent(this.INITIALIZE);
};
nsUIComponent.attachedCallback = function()
{
	console.log("In attachedCallback");
	this.setComponentProperties();
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