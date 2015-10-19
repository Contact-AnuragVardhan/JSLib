var nsTextBox = Object.create(nsUIComponent);

nsTextBox.initializeComponent = function() 
{
	this.base.initializeComponent();
	this.ITEM_SELECTED = "itemSelected";
	this.ITEM_UNSELECTED = "itemUnselected";
	this.TYPE_AUTOTEXT = "text";
	this.TYPE_AUTOCOMPLETE = "autocomplete";
	this.TYPE_EMAIL = "email";
	this.TYPE_NUMBER = "number";
	this.TYPE_PASSWORD = "password";
	this.TYPE_URL = "url";
	
	this.__outerContainer = null;
	this.__textBox = null;
	this.__list = null;
	this.__renderer =  null;
	this.__itemRenderer = null;
	
	this.__dataProvider = null;
	this.__type = "text";
	this.__enableAutoComplete = false;
	this.__matchStartsWith = false;
	this.__minChars = -1;
	this.__maxChars = -1;
	this.__minSearchStartChars = 1;
	this.__caseSensitive = true;
	this.__required = false;
	this.__placeholder = null;
	this.__displayAsPassword = false;
	this.__delay = 150;
	this.__listWidth = -1;
	this.__maxListHeight = 300;
	this.__noRecordsFoundMessage = "No Records Found";
	//can be [a-zA-Z0-9,-]
	this.__restrict = null;
	this.__pattern = null;
	
	this.__labelField = "label";
	this.__labelFunction = null;
	this.__templateID = null;
	this.__setDataCallBack = null;
	this.__clearDataCallBack = null;
	this.__enableKeyboardNavigation = false;
	this.__enableMultipleSelection = false;
	this.__multiSelectionSeparator = ";";
	this.__customScrollerRequired = false;
	
	this.__selectedItem = null;
	this.__selectedItems = new Array();	
	this.__timerInstance = null;
	this.__componentMeasurement = {};
	
	this.__keyUpRef = null;
	this.__keyPressedRef = null;
	this.__itemNavigationRef = null;
	this.__itemSelectRef = null;
	this.__itemUnSelectRef = null;
	this.__pasteRef = null;
	this.__focusInRef = null;
	this.__documentClickRef = null;
	this.__documentKeyUpRef = null;
	this.__textBoxFocusOutRef = null;
};

nsTextBox.setText = function(text)
{
	if(this.__textBox)
	{
		if(this.__maxChars > -1 && text.length > this.__maxChars)
		{
			text = text.substring(0, this.__maxChars);
		}
		this.__textBox.value = text;
	}
};

nsTextBox.getText = function()
{
	if(this.__textBox)
	{
		return this.__textBox.value;
	}
	return null;
};

nsTextBox.getNoMessage = function()
{
	return this.__noRecordsFoundMessage;
};

//commenting this as selectedIndex will be relative to filtered dataSource
/*nsTextBox.getSelectedIndex = function()
{
	if(this.__list)
	{
		return this.__list.getSelectedIndex();
	}
	return -1;
};*/

nsTextBox.getSelectedItem = function()
{
	return this.__selectedItem;
};

/*nsTextBox.getSelectedIndexes = function()
{
	if(this.__list)
	{
		return this.__list.getSelectedIndexes();
	}
	return null;
};*/

nsTextBox.getSelectedItems = function()
{
	return this.__selectedItems;
};

nsTextBox.setComponentProperties = function() 
{
	if(this.hasAttribute("type"))
	{
		this.__type =  this.getAttribute("type");
	}
	if(this.hasAttribute("matchStartsWith"))
	{
		this.__matchStartsWith =  Boolean.parse(this.getAttribute("matchStartsWith"));
	}
	if(this.hasAttribute("maxChars"))
	{
		this.__maxChars =  parseInt(this.getAttribute("maxChars"));
	}
	if(this.hasAttribute("minChars"))
	{
		this.__minChars =  parseInt(this.getAttribute("minChars"));
	}
	if(this.hasAttribute("minSearchStartChars"))
	{
		this.__minSearchStartChars =  parseInt(this.getAttribute("minSearchStartChars"));
	}
	if(this.hasAttribute("caseSensitive"))
	{
		this.__caseSensitive = Boolean.parse(this.getAttribute("caseSensitive"));
	}
	if(this.hasAttribute("required"))
	{
		this.__required = Boolean.parse(this.getAttribute("required"));
	}
	if(this.hasAttribute("placeholder"))
	{
		this.__placeholder = this.getAttribute("placeholder");
	}
	if(this.hasAttribute("displayAsPassword"))
	{
		this.__displayAsPassword = Boolean.parse(this.getAttribute("displayAsPassword"));
	}
	if(this.hasAttribute("delay"))
	{
		this.__delay =  parseInt(this.getAttribute("delay"));
	}
	if(this.hasAttribute("maxListHeight"))
	{
		this.__maxListHeight =  parseInt(this.getAttribute("maxListHeight"));
	}
	if(this.hasAttribute("listWidth"))
	{
		this.__listWidth =  parseInt(this.getAttribute("listWidth"));
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
	if(this.hasAttribute("noRecordsFoundMessage"))
	{
		this.__noRecordsFoundMessage =  this.getAttribute("noRecordsFoundMessage");
	}
	if(this.hasAttribute("multiSelectionSeparator"))
	{
		this.__multiSelectionSeparator =  this.getAttribute("multiSelectionSeparator");
	}
	if(this.hasAttribute("pattern"))
	{
		this.__pattern =  this.getAttribute("pattern");
	}
	if(this.hasAttribute("restrict"))
	{
		this.__restrict =  this.getAttribute("restrict");
		if(this.__restrict)
		{
			this.__restrict = "[" + this.__restrict + "]";
		}
	}
	this.__createComponents();
	this.__setTextBoxProperty();
	this.__coreElement = this.__textBox;
	this.base.setComponentProperties();
};

nsTextBox.propertyChange = function(attrName, oldVal, newVal, setProperty)
{
	var callTextProperty = false;
	var attributeName = attrName.toLowerCase();
	if(attributeName === "matchStartsWith")
	{
		this.__matchStartsWith =  Boolean.parse(this.getAttribute("matchStartsWith"));
	}
	if(attributeName === "maxChars")
	{
		this.__maxChars =  parseInt(this.getAttribute("maxChars"));
		callTextProperty = true;
	}
	if(attributeName === "minChars")
	{
		this.__minChars =  parseInt(this.getAttribute("minChars"));
	}
	if(attributeName === "minSearchStartChars")
	{
		this.__minSearchStartChars =  parseInt(this.getAttribute("minSearchStartChars"));
	}
	if(attributeName === "caseSensitive")
	{
		this.__caseSensitive = Boolean.parse(this.getAttribute("caseSensitive"));
	}
	if(attributeName === "required")
	{
		this.__required = Boolean.parse(this.getAttribute("required"));
		callTextProperty = true;
	}
	if(attributeName === "placeholder")
	{
		this.__placeholder = this.getAttribute("placeholder");
		callTextProperty = true;
	}
	if(attributeName === "delay")
	{
		this.__delay =  parseInt(this.getAttribute("delay"));
	}
	if(attributeName === "maxListHeight")
	{
		this.__maxListHeight =  parseInt(this.getAttribute("maxListHeight"));
	}
	if(attributeName === "listWidth")
	{
		this.__listWidth =  parseInt(this.getAttribute("listWidth"));
	}
	if(attributeName === "labelField")
	{
		this.__labelField = this.getAttribute("labelField");
	}
	if(attributeName === "labelFunction")
	{
		this.__labelFunction = this.getAttribute("labelFunction");
	}
	if(attributeName === "enableMultipleSelection")
	{
		this.__enableMultipleSelection =  Boolean.parse(this.getAttribute("enableMultipleSelection"));
	}
	if(attributeName === "enableKeyboardNavigation")
	{
		this.__enableKeyboardNavigation =  Boolean.parse(this.getAttribute("enableKeyboardNavigation"));
	}
	if(attributeName === "noRecordsFoundMessage")
	{
		this.__noRecordsFoundMessage =  this.getAttribute("noRecordsFoundMessage");
	}
	if(attributeName === "multiSelectionSeparator")
	{
		this.__multiSelectionSeparator =  this.getAttribute("multiSelectionSeparator");
	}
	if(attributeName === "pattern")
	{
		this.__pattern =  this.getAttribute("pattern");
		callTextProperty = true;
	}
	if(attributeName === "restrict")
	{
		this.__restrict =  this.getAttribute("restrict");
		if(this.util.isValueNull(this.__restrict))
		{
			this.__restrict = null;
		}
		else
		{
			this.__restrict = "[" + this.__restrict + "]";
		}
		callTextProperty = true;
	}
	if(callTextProperty)
	{
		this.__setTextBoxProperty();
	}
	this.base.propertyChange(attrName, oldVal, newVal, setProperty);
};

nsTextBox.removeComponent = function() 
{
	if(this.__documentClickRef)
	{
		this.util.removeEvent(document,"click",this.__documentClickRef);
		this.__documentClickRef = null;
	}
	if(this.__documentKeyUpRef)
	{
		this.util.removeEvent(document.body,"keyup",this.__documentKeyUpRef);
		this.__documentKeyUpRef = null;
	}
};

nsTextBox.setDataProvider = function(dataProvider)
{
	this.__dataProvider = dataProvider;
	if(this.__enableAutoComplete && this.__dataProvider && this.__dataProvider.length > 0 && this.__isCreationCompleted)
	{
		this.__renderer = new this.defaultSearchRenderer();
		this.__renderer.parentControl = this;
		this.__itemRenderer = this.__renderer.getRenderer();
		var rect = this.getBoundingClientRect();
		this.__componentMeasurement.top = rect.top + this.__textBox.offsetHeight + 5;
		this.__componentMeasurement.left = rect.left;
		this.__componentMeasurement.width = this.__textBox.offsetWidth;
		if(!this.__keyUpRef)
		{
			this.__keyUpRef = this.__keyUpHandler.bind(this);
			this.util.addEvent(this.__textBox,"keyup",this.__keyUpRef);
		}
		if(this.__enableAutoComplete)
		{
			if(!this.__documentClickRef)
			{
				this.__documentClickRef = this.__documentClickHandler.bind(this);
				this.util.addEvent(document,"click",this.__documentClickRef);
			}
			if(!this.__documentKeyUpRef)
			{
				this.__documentKeyUpRef = this.__documentKeyUpHandler.bind(this);
				this.util.addEvent(document.body,"keyup",this.__documentKeyUpRef);
			}
		}
	}
};

nsTextBox.__createComponents = function() 
{
	if(!this.__outerContainer)
	{
		this.__applyTipToCoreComp = true;
		this.__outerContainer = this.util.createDiv(this.getID() + "#container","nsTextBoxContainer");
		this.addChild(this.__outerContainer);
		this.__textBox = document.createElement("INPUT");
		var preferredWidth = this.util.getDimensionAsNumber(this,this.style.width);
		if(preferredWidth > 0)
		{
			this.__outerContainer.style.width = preferredWidth + "px";
		}
		this.__textBox.setAttribute("type", this.__getType());
		if(!this.__textBoxFocusOutRef)
		{
			this.__textBoxFocusOutRef = this.__textBoxFocusOutHandler.bind(this);
			this.util.addEvent(this.__textBox,"blur",this.__textBoxFocusOutRef);
		}
		if(!this.__focusInRef)
		{
			this.__focusInRef = this.__focusInHandler.bind(this);
			this.util.addEvent(this.__textBox,"focusin",this.__focusInRef);
		}
		this.__outerContainer.appendChild(this.__textBox);
	}
};

nsTextBox.__getType = function()
{
	var textBoxType = "text";
	if(this.__type)
	{
		if(this.__type ===  this.TYPE_AUTOCOMPLETE)
		{
			textBoxType = "text";
			this.__enableAutoComplete = true;
		}
		else if(this.__displayAsPassword)
		{
			textBoxType = "password";
		}
		else if(this.__type ===  this.TYPE_AUTOTEXT || this.__type ===  this.TYPE_EMAIL || this.__type ===  this.TYPE_NUMBER || this.__type ===  this.TYPE_PASSWORD || this.__type ===  this.TYPE_URL)
		{
			textBoxType = this.__type;
		}
	}
	return textBoxType;
};


nsTextBox.__setTextBoxProperty = function() 
{
	if(this.__textBox)
	{
		if(this.__required)
		{
			this.__textBox.setAttribute("required", "");
		}
		else
		{
			this.__textBox.removeAttribute("required");   
		}
		if(this.__placeholder && this.__placeholder.length > 0)
		{
			this.__textBox.setAttribute("placeholder", this.__placeholder);
		}
		else
		{
			this.__textBox.removeAttribute("placeholder");
		}
		if(this.__maxChars > -1)
		{
			this.__textBox.setAttribute("maxLength", this.__maxChars);
		}
		if(this.__pattern)
		{
			this.__textBox.setAttribute("pattern", this.__pattern);
		}
		else
		{
			this.__textBox.removeAttribute("pattern");
		}
		if(this.__restrict)
		{
			if(!this.__keyPressedRef)
			{
				this.__keyPressedRef = this.__keyPressHandler.bind(this);
				this.util.addEvent(this.__textBox,"keypress",this.__keyPressedRef);
			}
			if(!this.__pasteRef)
			{
				this.__pasteRef = this.__pasteHandler.bind(this);
				this.util.addEvent(this.__textBox,"paste",this.__pasteRef);
			}
		}
		else
		{
			if(this.__keyPressedRef)
			{
				this.util.removeEvent(this.__textBox,"keypress",this.__keyPressedRef);
				this.__keyPressedRef = null;
			}
			if(this.__pasteRef)
			{
				this.util.removeEvent(this.__textBox,"paste",this.__pasteRef);
				this.__pasteRef = null;
			}
		}
	}
};

nsTextBox.__documentKeyUpHandler = function(event)
{
	event = this.util.getEvent(event);
	var isShiftCtrlPressed = event.shiftKey || event.ctrlKey;
	var keyCode = this.util.getKeyUnicode(event);
	if(this.__enableMultipleSelection && (keyCode == this.util.KEYCODE.SHIFT || keyCode == this.util.KEYCODE.CTRL))
	{
		this.__multiSelectHandler();
		this.__removeListControl();
	}
};

nsTextBox.__keyUpHandler = function(event)
{
	event = this.util.getEvent(event);
	var isShiftCtrlPressed = event.shiftKey || event.ctrlKey;
	var keyCode = this.util.getKeyUnicode(event);
	if (keyCode == this.util.KEYCODE.ESC) 
	{
		this.__removeListControl();
	}
	else if(this.__enableMultipleSelection && (keyCode == this.util.KEYCODE.SHIFT || keyCode == this.util.KEYCODE.CTRL))
	{
		this.__multiSelectHandler();
		this.__removeListControl();
	}
	
	//key Up
	/*if(keyCode === this.util.KEYCODE.UP && isShiftCtrlPressed && this.__enableMultipleSelection)
	{
	}
	//key down
	else if(keyCode === this.util.KEYCODE.DOWN && isShiftCtrlPressed && this.__enableMultipleSelection)
	{
	}*/
	else if (!(keyCode == this.util.KEYCODE.UP || keyCode == this.util.KEYCODE.DOWN || keyCode == this.util.KEYCODE.ENTER || keyCode == this.util.KEYCODE.SHIFT || keyCode == this.util.KEYCODE.CTRL)) 
	{
		if(!this.__textBox.value || this.__textBox.value == "" || this.__textBox.value.length < this.__minSearchStartChars)
		{
			this.__removeListControl();
		}
		else
		{
			if(this.__timerInstance)
			{
				clearTimeout(this.__timerInstance);
			}
			var compRef = this;
			this.__timerInstance = setTimeout(
			function()
			{ 
				compRef.__searchText(compRef.__textBox.value);
			},this.__delay);
		}
	}
	else
	{
		event.preventDefault();
	}
};

nsTextBox.__keyPressHandler = function(event)
{
	event = this.util.getEvent(event);
	var keyCode = this.util.getKeyUnicode(event);
	var keyPressed = String.fromCharCode(keyCode);
	if(!this.util.checkRegexValue(this.__restrict,keyPressed))
	{
		event.preventDefault();
	}
};

nsTextBox.__documentClickHandler = function(event)
{
	var closeList = true;
	var target = this.util.getTarget(event);
	if(target && target === this.__textBox)
	{
		closeList = false;
	}
	else
	{
		var targetList = this.util.findParent(target,"ns-list");
		//checking nodeName as while this.__list is null after selecting an item
		if(targetList && targetList.nodeName === "NS-LIST")
		{
			closeList = false;
		}
	}
	if(closeList)
	{
		this.__removeListControl();
	}
};

nsTextBox.__pasteHandler = function(event)
{
	event = this.util.getEvent(event);
	var pastedText = undefined;
	var text = "";
	if (window.clipboardData && window.clipboardData.getData) 
	{ // IE
	    pastedText = window.clipboardData.getData("Text");
	} 
	else if (event.clipboardData && event.clipboardData.getData) 
	{
	    pastedText = event.clipboardData.getData("text/plain");
	}
	var pastedTextLength = pastedText.length;
	for (var count = 0; count < pastedTextLength; count++) 
	{
		var char = pastedText.charAt(count);
        if(this.util.checkRegexValue(this.__restrict,char))
    	{
        	text += char;
    	}
    }
	this.__textBox.value += text;
	event.preventDefault();
};

nsTextBox.__focusInHandler = function(event)
{
	if(this.nsTip)
	{
		this.nsTip.remove();
	}
	if(this.__enableAutoComplete)
	{
		if(!this.__list && this.__dataProvider && this.__dataProvider.length > 0)
		{
			//this.__createListControl("");
			//this.__list.setDataProvider(this.__dataProvider);
		}
	}
};

nsTextBox.__textBoxFocusOutHandler = function(event)
{
	if(this.__minChars > -1 && this.__textBox.value && this.__textBox.value.length < this.__minChars)
	{
		this.__textBox.setCustomValidity("Please enter atleast " + this.__minChars  + " characters.");
	}
	else 
	{
		this.__textBox.setCustomValidity("");
	}
};

nsTextBox.__searchText = function(searchString)
{
	this.__removeListControl();
	this.__createListControl(searchString);
	var compRef = this;
	var dataSource = this.__dataProvider.filter(
	function (item)
	{
		var compareString = searchString;
		if(item)
		{
			if(compRef.__matchStartsWith)
			{
				return compRef.util.startsWith(item[compRef.__labelField],compareString,compRef.__caseSensitive);
			}
			else
			{
				return compRef.util.contains(item[compRef.__labelField],compareString,0,compRef.__caseSensitive);
			}
		}
		return false;
	});
	if(dataSource.length === 0)
	{
		var item = {};
		item[compRef.__labelField] = compRef.__noRecordsFoundMessage;
		dataSource[0] = item;
	}
	compRef.__list.setDataProvider(dataSource);
	var suggestedHeight = (dataSource.length * compRef.__list.__listItemHeight) + 5;
	suggestedHeight = (compRef.__maxListHeight > suggestedHeight) ? suggestedHeight:compRef.__maxListHeight;
	compRef.__list.style.height = suggestedHeight + "px";
};

nsTextBox.__createListControl = function(searchString)
{
	if(!this.__list)
	{
		this.__list = document.createElement("ns-list");
		this.util.addStyleClass(this.__list,"nsTextBoxList");
		this.__list.style.top = this.__componentMeasurement.top + "px";
		this.__list.style.left = this.__componentMeasurement.left + "px";
		if(this.__listWidth > 0)
		{
			this.__list.style.width =this.__listWidth + "px";
		}
		else
		{
			this.__list.style.width =this.__componentMeasurement.width + "px";
		}
		this.__list.style.height = this.__maxListHeight + "px";
		this.__list.setAttribute("labelField",this.__labelField);
		if(this.__templateID)
		{
			this.__list.setAttribute("template",this.__templateID);
			this.__list.setAttribute("setDataCallBack",this.__setDataCallBack);
			this.__list.setAttribute("clearDataCallBack",this.__clearDataCallBack);
			this.__list.setAttribute("setDataParam",searchString);
		}
		else
		{
			this.__list.__itemRenderer = this.__itemRenderer;
			this.__list.__setDataCallBack = this.__renderer.setData.bind(this.__renderer);
			this.__list.__clearDataCallBack = this.__renderer.clearData.bind(this.__renderer);
			this.__renderer.searchString = searchString;
		}
		
		this.__list.setAttribute("resuableRenderRequired",false);
		this.__list.setAttribute("enableMultipleSelection",this.__enableMultipleSelection);
		this.__list.setAttribute("enableKeyboardNavigation",this.__enableKeyboardNavigation);
		this.__list.setAttribute("customScrollerRequired",this.__customScrollerRequired);
		this.__itemNavigationRef = this.__itemNavigationHandler.bind(this);
		this.__itemSelectRef = this.__itemSelectHandler.bind(this);
		this.__itemUnSelectRef = this.__itemUnSelectHandler.bind(this);
		this.util.addEvent(this.__list,this.__list.ITEM_NAVIGATED,this.__itemNavigationRef);
		this.util.addEvent(this.__list,this.__list.ITEM_SELECTED,this.__itemSelectRef);
		this.util.addEvent(this.__list,this.__list.ITEM_UNSELECTED,this.__itemUnSelectRef);
		this.__outerContainer.appendChild(this.__list);
	}
};

nsTextBox.__removeListControl = function()
{
	if(this.__list)
	{
		this.__selectedItems = this.__list.getSelectedItems();
		this.__outerContainer.removeChild(this.__list);
		this.__list = null;
	}
};

nsTextBox.__itemNavigationHandler = function(event)
{
	if(event && event.detail)
	{
		var navigatedItem = event.detail;
		if(!this.__enableMultipleSelection)
		{
			this.__textBox.value = navigatedItem[this.__labelField];
		}
	}
};

nsTextBox.__itemSelectHandler = function(event)
{
	if(event && event.detail)
	{
		this.__selectedItem = event.detail;
		this.__textBox.value = this.__selectedItem[this.__labelField];
		if(!this.__enableMultipleSelection)
		{
			this.__removeListControl();
			this.util.dispatchEvent(this,this.ITEM_SELECTED,event.detail,{index:event.index});
		}
	}
};

nsTextBox.__itemUnSelectHandler = function(event)
{
	if(!this.__enableMultipleSelection)
	{
		this.util.dispatchEvent(this,this.ITEM_UNSELECTED,event.detail,{index:event.index});
	}
};

nsTextBox.__multiSelectHandler = function()
{
	if(this.__list && this.__list.getSelectedItems() && this.__list.getSelectedItems().length > 0)
	{
		this.__selectedItems = this.__list.getSelectedItems();
		var setText = "";
		for(var count = 0;count < this.__selectedItems.length;count++)
		{
			setText += this.__multiSelectionSeparator + this.__selectedItems[count][this.__labelField];
		}
		if(setText && setText.length > 0)
		{
			this.__textBox.value = setText.substring(1,setText.length);
		}
	}
};

nsTextBox.defaultSearchRenderer = function()
{
	this.parentControl = null;
	this.searchString = null;
	this.util = new NSUtil();
	this.divItemRenderer = null;
	
	this.getRenderer = function()
	{
		if(!this.divItemRenderer)
		{
			this.__createComponents();
		}
		return this.divItemRenderer;
	};
	
	this.setData = function(renderer,item,labelField)
	{
		if(renderer)
		{
			if(item && item[labelField])
			{
				var htmlText = item[labelField];
				if(htmlText != this.parentControl.getNoMessage())
				{
					if (this.searchString) 
					{
					      var words = '(' +
					      		this.searchString.split(/\ /).join(' |').split(/\(/).join('\\(').split(/\)/).join('\\)') + '|' +
					      		this.searchString.split(/\ /).join('|').split(/\(/).join('\\(').split(/\)/).join('\\)') +
					          ')',
					          exp = new RegExp(words, 'gi');
					      if (words.length) 
					      {
					    	  htmlText = htmlText.replace(exp, "<span class=\"nsTextHighlight\">$1</span>");
					      }
					}
				}
				renderer.rendererBody.rendererLabel.innerHTML = htmlText;
				//renderer.rendererBody.rendererLabel.appendChild(document.createTextNode(item[labelField]));
			}
			else
			{
				this.clearData(renderer);
			}
		}
		
	};
	
	this.clearData = function(renderer)
	{
		if(renderer)
		{
			renderer.rendererBody.rendererLabel.innerHTML = "";
		}
	};
	
	this.__createComponents = function()
	{
		this.divItemRenderer = this.util.createDiv(null,"imageHolder"); 
		this.divItemRenderer.style.height = 20 + "px";
		this.divItemRenderer.style.padding = 4 + "px";
		this.divItemRenderer.setAttribute("accessor-name","rendererBody"); 
		var lblItemRenderer = document.createElement("LABEL");
		lblItemRenderer.setAttribute("accessor-name","rendererLabel");
		this.divItemRenderer.appendChild(lblItemRenderer);
	};
};

document.registerElement("ns-textBox", {prototype: nsTextBox});
