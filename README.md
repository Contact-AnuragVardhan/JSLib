------------nsUtil.js

NSUtil.prototype.defaultRenderer = function()
{
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
		if(renderer && item && item[labelField])
		{
			renderer.rendererBody.rendererLabel.innerHTML = item[labelField];
			//renderer.rendererBody.rendererLabel.appendChild(document.createTextNode(item[labelField]));
		}
	};
	
	this.__createComponents = function()
	{
		this.divItemRenderer = this.util.createDiv(null,"imageHolder"); 
		this.divItemRenderer.style.height = 20 + "px";
		this.divItemRenderer.setAttribute("accessor-name","rendererBody"); 
		var lblItemRenderer = document.createElement("LABEL");
		lblItemRenderer.setAttribute("accessor-name","rendererLabel");
		this.divItemRenderer.appendChild(lblItemRenderer);
	};
};

-------------------------------------SmoothBigList.css
.itemRendererTemplate {
	height: 20px;
	font: 12px;
	padding: 4px;
}
