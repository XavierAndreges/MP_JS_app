function HtmlSliderReduceScreen (divName, nameSlider, sliderSize, itemArray, itemWidth, itemHeight, _type, _BaseItem, _onTour)
{
	var self = this;
	
	this.tabDiapo = itemArray;
	
	this.intClickNext = 0;
	
	var intNumberOfImage;
	
	if (isMobile)
		intNumberOfImage = 1;
	else
		intNumberOfImage = 1;
	
	var timeTransition = 300;
	
	this.alreadyLaunched = false;
	
	var pictureWidth = 800;
	var pictureHeight = 600;
	var xSize, ySize, ySizePagin;
	
	var heavyImage;
	var nameImage;
	
	var crasyFuckingBug = 11;

	this.dirFolderName;
	
	//log("itemHeight 2 : " + itemHeight + " _type / " + _type + " / itemArray : " + itemArray.length);
	
	var className;
	var itemDelta;
	
	if (_type == "Home")
	{
		className = "itemHome";
		itemDelta = 0;
	}
	else
	{
		className = "optionItem";
		itemDelta = 40;
	}
	
	
	if (/IE/i.test(navigator.userAgent)) 
	{
		window.attachEvent("onresize", function(){
			resizeForCenter();
		});
		
		window.attachEvent("orientationchange", function(){
			actionsWhenOrientationChanged();
		});
	}
	else
	{
		window.addEventListener("resize", function(){
			resizeForCenter();
		}, false);
		
		window.addEventListener("orientationchange", function(){
			self.actionsWhenOrientationChanged();
		}, false);	
	}
	
	this.init = function (){
		//alert ("navigator.userAgent : " + navigator.userAgent);
		
		$("#" + divName).html(
		'<img src="Assets/arrow_left.png" id="' + divName + '_arrow_left" onclick="' + nameSlider  + '.showPrevDiapo()">' +
		'<img src="Assets/arrow_right.png" id="' + divName + '_arrow_right" onclick="' + nameSlider  + '.showNextDiapo()">' +
							  '<div id="distanceItems' + divName + '" style="width:98%; height: 15px; padding:5px 2% 5px 0px; border-bottom:grey solid 1px;" class="cornerTop color' + _type + '"></div>' +
							  '<div id="' + divName + '_slider">' +
			'<div id="' + divName + '_thumbnails">' +
				'<div id="' + divName + '_thumbCenterBlock">' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div id="' + divName + '_pagin"></div>'
		);
		
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.setAttribute('id', 'test');
		document.getElementsByTagName("head")[0].appendChild(s);

		var myCssText  =
		'#' + divName + ' {width:' + sliderSize + 'px; min-width: 0px; height: ' + itemHeight + 'px; background-color:#f1f1f1; clear: both; text-align:center; border:#cccccc solid 1px;}'+
		'#' + divName + '_slider {width:' + itemWidth*intNumberOfImage + 'px; height:' + (itemHeight - 25) + 'px; overflow: hidden; display: inline-block; text-align: left;}' +
		'#' + divName + '_thumbnails {width:600%; height: ' + (itemHeight - 25) + 'px; text-align:left; display:inline-block;}' +
		'#' + divName + ' .' + className + ' {width:' + (itemWidth - itemDelta) + 'px; height:' + ((itemHeight - 25) - itemDelta) + 'px;}' +
		'#' + divName + '_arrow_left {width:15px; height:25px; position : relative; float:left;}' +
		'#' + divName + '_arrow_right {width:15px; height:25px; position : relative; float:left;}';
		
		//'#' + divName + '_pagin {position: absolute; left:0px; width:100%; display: inline-block; text-align: center;}'		
		
		/*
		+'@media screen and (max-width:640px){'
		+'#' + divName + ' { min-width: 0px;}'
		+'#' + divName + '_slider {width:200px;height:100px;overflow: hidden;display:inline-block;text-align:left;background-color: black;}'
		+'#' + divName + '_thumbnails {width:700%;height: 100px;text-align:left;display:inline-block;background-color: black;}'	
		+'#' + divName + '_thumbCenterBlock {display: inline-block;position:relative;text-align:center;overflow: hidden;background-color: black;}'
		+'#' + divName + '_imgThumbnailsH {width:0px;}'	
		+'#' + divName + '_imgThumbnailsV {height:0px;}}'
		;
		*/
		if (s.styleSheet) {// IE
			s.styleSheet.cssText = myCssText;
		} else {// w3c
			s.innerHTML = myCssText;
		} 
		
		$("#" + divName + "_arrow_left").css("visibility", "hidden");
		$("#" + divName + "_arrow_right").css("visibility", "hidden");
		
		//alert("isMobile : " + isMobile + " / window.orientation :" + window.orientation);
		
		
		//*******************  timeOut needed for Android ******************
		setTimeout(function(){
			self.resetOrInit();
			eventTouch();
		}, 200);
	}
	
	
	this.resetOrInit = function ()
	{
		//log ("resetOrInit self.intClickNext " + self.intClickNext);
		
		setDocumentBodyHeight();
		
		//setNumberOfImage();
		

		if (/Opera Mini/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent)) 
			var todo;
		else 
			//adjustMarginTopAndLeftForSlider();
		
		//alert ("intNumberOfImage  " + intNumberOfImage);
		
		setInnerHTMLForDiapo();
		
		if (self.intClickNext > 0) {
			insertPictureToDiapo();
			$("#" + divName + "_arrow_left").css("visibility", "visible");
		} else {
			$("#" + divName + "_arrow_left").css("visibility", "hidden");
		}
		
		if (self.intClickNext + intNumberOfImage >= self.tabDiapo.length)
			$("#" + divName + "_arrow_right").css("visibility", "hidden");
		else
			$("#" + divName + "_arrow_right").css("visibility", "visible");
		
		setTimeout(function(){
			//$("#" + divName + "_arrow_right").css("visibility", "visible");
			setArrowPosition();
			//setPaginMark();
		}, 200);
	}
	
	
	function setDocumentBodyHeight()
	{
		xSize = $("#" + divName).width();
		ySize = itemHeight;
		
		//log("xSize" + xSize);
		//alert ("xSize : " + xSize + " ySize : " + ySize);
		
		pictureWidth = itemWidth;
		pictureHeight = itemHeight;
	}
	
	
	function  setNumberOfImage ()
	{
	  	var slideSize = $("#" + divName).width() - 2 * $("#" + divName + "_arrow_right").width();
	  	intNumberOfImage = slideSize/pictureWidth - (slideSize/pictureWidth)%1;
	  	//intNumberOfImage = 3;
	  	$("#" + divName + "_slider").css("width", (intNumberOfImage * pictureWidth) + "px");
	  	//alert("intNumberOfImage " + intNumberOfImage);
		
	}
	
	
	function setDiaporamaSize(){
		$("#" + divName).css("width", xSize + "px");
		$("#" + divName).css("height", ySize + "px");
	}
		
	
	function adjustMarginTopAndLeftForSlider(){
		//*********** width **************
		
		var xBlocMedia = $("#" + divName + "_slider").width();
		var xMargin = (xSize / 2) - (xBlocMedia / 2) - 2 * $("#" + divName + "_arrow_right").width();
		
		//log("xMargin : " + xMargin);
		
		//*********** height **************   
		
		var yBlocMedia = $("#" + divName + "_slider").height();
		
		//log("ySize : " + ySize + " / yBlocMedia : " + yBlocMedia);
		
		var yMargin = (ySize / 2) - (yBlocMedia / 2);
		
		alert("slider height : " + $("#" + divName + "slider").height() + " / yMargin : " + yMargin + " / slider width : " + $("#" + divName + "_slider").width() + " / xMargin : " + xMargin);
		
		//*********** CSS **************
		
		$("#" + divName + "_slider").css("margin-left", xMargin + "px");
		$("#" + divName + "_slider").css("margin-top", yMargin + "px");
	}
	
	
	function resizeForCenter()
	{
		if (isMobile == false)
		 {
			self.resetOrInit();
		}
	}
	
	
	function setPaginMark(){
		document.getElementById(divName + "_pagin").innerHTML = "";
		
		for (var nb = 0; nb < self.tabDiapo.length; nb++) 
			document.getElementById(divName + "_pagin").innerHTML += '<img src="Assets/screens_pagin_white.png" style="margin-right:10px;">';
		
		setCurrentPagin("init");
		
		setPaginPosition();
	}
	
	
	function setPaginPosition(){
		if (isMobile == false) {
			$("#" + divName + "_pagin").css("top", ySize - 60 + "px");
		}
		else {
			var yBlocMedia = $("#" + divName + "_slider").height();
			var yMargin = (ySize / 2) - (yBlocMedia / 2);
			var h = yMargin + yBlocMedia - 20;
			
			$("#" + divName + "_pagin").css("top", h + "px");
		}
	}
	
	
	function setCurrentPagin(dir){
		var pagin = document.getElementById(divName + "_pagin");
		var paginArray = pagin.getElementsByTagName("img");
		
		paginArray[self.intClickNext].setAttribute("src", "Assets/screens_pagin_black.png");
		
		if (dir == "next") 
			paginArray[self.intClickNext - 1].setAttribute("src", "Assets/screens_pagin_white.png");
		
		if (dir == "prev") 
			paginArray[self.intClickNext + 1].setAttribute("src", "Assets/screens_pagin_white.png");
	}
	
	
	function setArrowPosition(){		
		$("#" + divName + "_arrow_right").css("left", (xSize - 2 * $("#" + divName + "_arrow_right").width())  + "px");
		$("#" + divName + "_arrow_left").css("left", "0px");
		
		var h = (ySize - $("#" + divName + "_arrow_left").height()) / 2 + "px";
		$("#" + divName + "_arrow_left").css("top", h);
		$("#" + divName + "_arrow_right").css("top", h);
		
		$("#" + divName + "_arrow_left").css("z-index", "10");
		$("#" + divName + "_arrow_right").css("z-index", "10");
	}
	

	
	function setInnerHTMLForDiapo()
    {
		//alert("document : " + document + " / thumbnails : " + document.getElementById(divName + "_thumbnails"));
        
		if (document.getElementById(divName + "_thumbnails") != undefined)
			document.getElementById(divName + "_thumbnails").innerHTML = "";
		
		//log ("setInnerHTMLForDiapo self.intClickNext " + self.intClickNext);
		//log ("_type " + _type);
		
        setDistanceBetweenItems(itemArray[self.intClickNext]);
		
		for (var intImg = self.intClickNext; (intImg <= (intNumberOfImage + self.intClickNext)) && intImg < self.tabDiapo.length; intImg++)
		{			
			//log ("self.intClickNext " + self.intClickNext);
			
			$("#"+ divName + "_thumbnails").append(htmlForOptionCell(itemArray[intImg], _type, intImg, _onTour));
			
			if (_type == "MP2013")
				ajdustOptionTitleIfTooLarge(itemArray[intImg]);
		}
	}
	
	function ajdustOptionTitleIfTooLarge(_item)
	{
		var dateText = $("#optionTitleMP2013" + _item.idRepName);
		
		//log("$(dateText).outerHeight() : " + $(dateText).outerHeight());
		
		while ($(dateText).outerHeight() > 40)
		{
			$(dateText).text(function (index, text)
							 {
							 return text.replace(/\W*\s(\S)*$/, '...');
							 });
		}
	}	
	
	
	function setDistanceBetweenItems(_item)
	{
		//log("lat : " + _item.latitude + " / long : " + _item.longitude);
		
		//log("distance : " + d);
		
		var stringDistance = "";
		
        var d = calculDistanceBetweenItems(_item, _BaseItem);
        
        stringDistance = setDistance(d*1000);
        
        if (_onTour != null)
        {
            var lWalkTime = d *1000 * 60 / 4000;
            stringDistance = '<img src="Assets/WalkOnTourWhite.png" width="11" style="padding-right:5px; margin-top:-3px;" /> ' + Math.round(lWalkTime) + "mn"
        }
        
		var lDate = "";
		
		if (_item.type == "MP2013")
			lDate = '<a href="javascript:showPopUpDatePickerOption()" id="dateOptionLabel" style="color:#2E2A2A; text-decoration:underline;">le ' + getLocaleShortDateString(currentDate) + '</a>';
        
        var lTimeString = "";
        
        var lMargin = "";
        
        $("#distanceItems" + divName).html('<div style="float:left; font-weight:bold;' + lMargin + '">' + lTimeString + (self.intClickNext + 1) + '/' + itemArray.length  + ' ' + optionLabel[currentLang][_type] + ' ' + lDate + '</div>' +
											   '<div style="float:right; padding-right:15px;"><strong>' + stringDistance + '</strong></div>');
	}
	
	
	function createImageElement(image, thumbCenterBlock, loaderImage){
		//alert ("image.width : " + image.width+ " / image.height : " + image.height );
		
		if (image.width > image.height) {
			image.style.width = pictureWidth + "px";
			
			if (/IE/i.test(navigator.userAgent)) 
				image.style.height = (pictureWidth * image.height) / image.width + "px";
			
			ajustTopAndBottomMarginForPicture(image);
		}
		else {
			image.style.height = pictureHeight + "px";
			
			if (/IE/i.test(navigator.userAgent)) 
				image.style.width = (pictureHeight * image.width) / image.height + "px";
		}
		
		thumbCenterBlock.replaceChild(image, loaderImage);
		
		//alert ("pictureWidth : " + pictureWidth+ " / pictureHeight : " + pictureHeight );
	}
	
	
	function ajustTopAndBottomMarginForPicture(newImage){
		var newHeight = (pictureWidth * newImage.height) / newImage.width;
		//log("pictureWidth : " + $("#" + divName + "_slider").width() + " / newImage.height : " + newImage.height + " / newImage.width : " + newImage.width);
		
		var diffY = (pictureHeight - newHeight) / 2;
		//log("diffY : " + diffY);
		
		$(newImage).css("margin-top", diffY + "px");
		$(newImage).css("margin-bottom", diffY + "px");
	}
	
	
	
	this.showNextDiapo = function ()
	{
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
		
		log("sliderArray : " + sliderArray.length);
		
		if (self.intClickNext == self.tabDiapo.length - intNumberOfImage) 
		{
			return;
		}
		
		self.intClickNext++;
		
		if (sliderArray.length == intNumberOfImage + 2)
		{
			$(sliderArray[0]).remove();
		}
		
		for (var i = 0; i < sliderArray.length; i++)
		{
			sliderArray[i].style.left = "0px";
			
			$(sliderArray[i]).animate(
			{
				left: "-" + pictureWidth + "px"
			},
				timeTransition, 'linear', function(){
			});
		}
		
		
		setTimeout(function(){
			//setCurrentPagin("next")
			setDistanceBetweenItems(itemArray[self.intClickNext]);
		}, timeTransition + 50);
		
		
		if (self.intClickNext == self.tabDiapo.length - intNumberOfImage)
		{
			setTimeout(function()
			{
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				$("#" + divName + "_arrow_right").css("visibility", "hidden");
			}, (timeTransition + 50));
			
			return;
		}
		else
		{
			setTimeout(function()
			{
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				addPictureToDiapo();
			}, (timeTransition + 50));
		}
	}
	
	
	function addPictureToDiapo()
    {
		
		//*********** create and add node **************
		
		//log ("addPictureToDiapo self.intClickNext " + self.intClickNext);
		
		
		$("#"+ divName + "_thumbnails").append(htmlForOptionCell(itemArray[self.intClickNext + intNumberOfImage], _type, self.intClickNext +1, _onTour));
		
		if (_type == "MP2013")
			ajdustOptionTitleIfTooLarge(itemArray[self.intClickNext + intNumberOfImage]);
		
		//*********** set left property by negative pictureWidth **************
		
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
			
		sliderArray[sliderArray.length - 1].style.left = "-" + pictureWidth + "px";
	}
	
	
	this.showPrevDiapo = function ()
	{
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
		
		//log("slider : " + sliderArray.length);
		
		//log("showPrevDiapo1 self.intClickNext : " + self.intClickNext);
		
		if (self.intClickNext == 0) 
		{
			return;
		}
		
		self.intClickNext--;
		
		//log("showPrevDiapo2 self.intClickNext : " + self.intClickNext);
		
		for (var i = 0; i < sliderArray.length; i++)
		{
			$(sliderArray[i]).animate({
				left: "0px"
			}, timeTransition, 'linear', function(){
			});
		}
		
		setTimeout(function(){
			//setCurrentPagin("prev")
			setDistanceBetweenItems(itemArray[self.intClickNext]);
		}, timeTransition + 50);
		
		
		var sliderArray2 = $("#" + divName + "_thumbnails ." + className);
		
		
		if (sliderArray2.length > intNumberOfImage + 1) 
		{
			setTimeout(removePictureToDiapo, timeTransition + 50);
		}
		
		if (self.intClickNext == 0)
		{
			setTimeout(function()
			{
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				$("#" + divName + "_arrow_left").css("visibility", "hidden");
			}, (timeTransition + 50));
			return;
		}
		else
		{
			setTimeout(function()
			{
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				insertPictureToDiapo();
			}, (timeTransition + 50));
		}
		
		
	}
	
		
	function removePictureToDiapo()
	{
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
		
		$(sliderArray[sliderArray.length - 1]).remove();
	}
	
	
	function insertPictureToDiapo()
	{		
		//nameImage = self.dirFolderName + "/" + self.tabDiapo[(self.intClickNext - 1)];
		
		log ("insertPictureToDiapo self.intClickNext " + self.intClickNext);
		
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
		
		var item = htmlForOptionCell(itemArray[self.intClickNext - intNumberOfImage], _type, self.intClickNext - 1, _onTour);
		
		$(item).insertBefore(sliderArray[0]);
		
		if (_type == "MP2013")
			ajdustOptionTitleIfTooLarge(itemArray[self.intClickNext - intNumberOfImage]);
		
		//***********set left propertu **************
		
		var sliderArray = $("#" + divName + "_thumbnails ." + className);
		
		for (var t = 0; t < sliderArray.length; t++)
		{
			sliderArray[t].style.left = "-" + pictureWidth + "px";
		}
	}
	
	
	function eventTouch()
	{	
		var sliderHammer = document.getElementById(divName + '_slider');
		
        /*
		var hammerSlider = new Hammer(sliderHammer, {
								drag_min_distance: 0,
								drag_horizontal: true,
								drag_vertical: false,
								transform: false,
								hold: false,
								prevent_default: !isMobile
								});
		*/
        
        var hammerSlider = new Hammer(sliderHammer, {
                                      drag_min_distance: 0,
                                      drag_block_horizontal: true,
                                      drag_block_vertical: false,
                                      transform: false,
                                      hold: false,
                                      prevent_default: false
                                      });
        
        hammerSlider = Hammer(sliderHammer).on("drag", function(ev)
                                               {
                                               //alert ("Type: " + ev.type + ", Fingers: " + ev.gesture.touches.length + ", Direction: " + ev.gesture.direction + "<br/>");
                                               if (ev.type == "swipe") {
                                               // if (event.direction == "left" && isNextImageReady == true)
                                               if (ev.gesture.direction == "left")
                                               self.showNextDiapo();
                                               
                                               if (ev.gesture.direction == "right")
                                               self.showPrevDiapo();
                                               }
                                               
                                               });
        
		hammerSlider = Hammer(sliderHammer).on("swipe", function(ev)
		{
			//alert ("Type: " + ev.type + ", Fingers: " + ev.gesture.touches.length + ", Direction: " + ev.gesture.direction + "<br/>");
			
			if (ev.type == "swipe") {
				// if (event.direction == "left" && isNextImageReady == true)
				if (ev.gesture.direction == "left")
					self.showNextDiapo();
				
				if (ev.gesture.direction == "right")
					self.showPrevDiapo();
			}
                                               });
	}
	
	
	 this.actionsWhenOrientationChanged = function() {
		//alert("reduce slider orientation" + window.orientation);
		
		//********** word for all devices except iPhone - so we make document at null before *********************
		window.scrollTo(0, 0);
		
		
		setTimeout(function(){
			self.resetOrInit();
			
			if (self.intClickNext > 0) 
				insertPictureToDiapo();
		}, 600);
	}
	
	
	function getSize()
	{
		//$('#output').prepend ("document width : " + $(document).width() + " / document height : " +
		//$(document).height() + " / window width : " + $(window).width() + " / window height : " + $(window).height());
		
		//log ("window.innerWidth : " + window.innerWidth + " window.innerHeight : " + window.innerHeight);
		
		/*
		 log ("A document.width : " + document.width + " / window.outerwidth : " +  window.outerWidth + " / window.width : " +  window.width
		 + " / window.innerWidth : " + window.innerWidth + " / screen.availWidth : " + screen.availWidth);
		 
		 log ("document.height : " + document.height + " / window.outerHeight : " +  window.outerHeight + " / window.height : " +  window.height
		 + " / window.innerHeight : " + window.innerHeight + " / screen.availHeight : " + screen.availHeight);
		 */
		alert("1 document.height : " + document.height + " / window.outerHeight : " + window.outerHeight + " / window.height : " + window.height +
		" / window.innerHeight : " +
		window.innerHeight +
		" / screen.availHeight : " +
		screen.availHeight);
		
		alert("A document.width : " + document.width + " / window.outerwidth : " + window.outerWidth + " / window.width : " + window.width +
		" / window.innerWidth : " +
		window.innerWidth +
		" / screen.availWidth : " +
		screen.availWidth);
		
		//$('#output').prepend ("sliderArray.length : " + sliderArray.length + " / self.intClickNext : " + intClickNext);
	}
}