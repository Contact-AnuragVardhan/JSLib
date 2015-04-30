var nsCheckBox = Object.create(nsUIComponent);

nsCheckBox.CHANGE = "change";

nsCheckBox.LayoutDirection_LTR = "ltr";
nsCheckBox.LayoutDirection_RTL = "rtl";

nsCheckBox.checkbox = null;
nsCheckBox.label = null;
nsCheckBox.textNode = null;

nsCheckBox.initializeComponent = function() 
{
	this.base.initializeComponent();
	console.log("In nsCheckBox initializeComponent");
	this.checkbox = document.createElement('input');
	this.checkbox.type = "checkbox";
	//this.checkbox.addEventListener("onChange",this.selectionChangeHandler);
	this.checkbox.onchange = this.selectionChangeHandler.bind(this);
	
	this.label = document.createElement('label');
	this.label.onclick = this.labelClickHandler.bind(this);
	
	this.textNode = document.createTextNode("");
	this.label.appendChild(this.textNode);

	this.appendChild(this.checkbox);
	this.appendChild(this.label);
};

nsCheckBox.setComponentProperties = function() 
{
	console.log("In child setComponentProperties");
	this.setLabel();
	this.setLayoutDirection();
	this.base.setComponentProperties();
};

nsCheckBox.propertyChange = function(attrName, oldVal, newVal, setProperty)
{
	console.log("In child propertyChange");
	var attributeName = attrName.toLowerCase();
	if(attributeName === "label")
	{
		this.setLabel();
	}
	else if(attributeName === "selected")
	{
		this.setSelected(setProperty);
	}
	else if(attributeName === "layoutdirection")
	{
		this.setLayoutDirection();
	}
};

nsCheckBox.getLabel = function()
{
	var textToSet = null;
	if (this.hasAttribute("label")) 
	{
		textToSet = this.getAttribute("label");
	}
	return textToSet;
};

nsCheckBox.setLabel = function()
{
	var textToSet = this.getLabel();
	if(textToSet)
	{
		this.textNode.nodeValue = textToSet;
	}
};

nsCheckBox.getSelected = function()
{
	if (this.hasAttribute("selected")) 
	{
		return Boolean.parse(this.getAttribute("selected"));
	}
	return false;
};

nsCheckBox.setSelected = function(setProperty)
{
	if(setProperty)
	{
		this.checkbox.checked = this.getSelected();
	}
	this.dispatchCustomEvent(nsCheckBox.CHANGE,this.checkbox.checked);
};

nsCheckBox.getLayoutDirection = function()
{
	if (this.hasAttribute("layoutdirection")) 
	{
		return this.getAttribute("layoutdirection");
	}
	return this.LayoutDirection_LTR;
};

nsCheckBox.setLayoutDirection = function()
{
	var attributeValue = this.getLayoutDirection();
	if(attributeValue === this.LayoutDirection_RTL)
	{
		this.checkbox.parentNode.insertBefore(this.label, this.checkbox);
	}
	else
	{
		this.checkbox.parentNode.insertBefore(this.checkbox,this.label);
	}
};

nsCheckBox.selectionChangeHandler = function(event)
{
	this.__setProperty = false;
	this.setAttribute("selected",this.checkbox.checked);
	event.stopImmediatePropagation();
};

nsCheckBox.labelClickHandler = function(event)
{
	this.setAttribute("selected",!this.checkbox.checked);
};


document.registerElement("ns-checkBox", {prototype: nsCheckBox});