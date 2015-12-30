//CSS Property "transition","-o-transition","-ms-transition","-moz-transition","webkit-transition"
	 //Javascript Equivalent "transition","OTransition","msTransition","MozTransition","WebkitTransition"
	 this.getSupportedCSSPropertyName = function(arrPropertyNames)
	 {
		 if(arrPropertyNames && arrPropertyNames.length > 0)
		 {
			 var root = document.documentElement;
			 for (var count=0; count < arrPropertyNames.length; count++)
		 	 {
			 	 //if property exists on element (value will be string, empty string if not set)
				 if (arrPropertyNames[count] in root.style)
		 		 { 
					 return arrPropertyNames[count];
		 		 }
		 	 }
		 }
		 return null;
	 };
	 
	 this.toggleStyleClass = function (element,styleClass)
	 {
	     if(element && styleClass && styleClass.length > 0)
	     {
	    	 this.hasStyleClass(element,styleClass) ? this.removeStyleClass(element,styleClass) : this.addStyleClass(element,styleClass); 
	     }
	 };
