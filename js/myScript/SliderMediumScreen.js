function MyMediumScreenSlider(divName, nameSlider, sliderSize, nameFullSlider)
{
	var self = this;
	
	this.tabDiapo;
    
    this.numberOfImages;
	
	this.intClickNext = 0;
	var intNumberOfImage = 3;
	var timeTransition = 300;
	
	this.alreadyLaunched = false;
	
	var pictureWidth;
	var pictureHeight;
	var xSize, ySize, ySizePagin;
	
	var heavyImage;
	var nameImage;
	
	var crasyFuckingBug = 11;

	this.dirFolderName;
	//log("reduce / self.dirFolderName" + self.dirFolderName);
	
	
	var sliderTimeOut = -1;
	
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
		window.addEventListener("resize", function() {
								
			clearTimeout(sliderTimeOut);
			sliderTimeOut = setTimeout(resizeForCenter, 500);
								 
								//resizeForCenter();
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
		'<div id="' + divName + '_slider"><div id="' + divName + '_thumbnails"><div id="' + divName + '_thumbCenterBlock"></div></div></div>' +
		'<div id="' + divName + '_pagin"></div>'
		);
		
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.setAttribute('id', 'test');
		document.getElementsByTagName("head")[0].appendChild(s);

		var myCssText  =
		'#' + divName + '_slider {width:' + $('#' + divName).width() + 'px; height:' + $('#' + divName).height() + 'px; overflow: hidden; background-color: #2E2A2A; display: inline-block; text-align: left;}' +
		'#' + divName + '_thumbnails {width:300%; height: ' + $('#' + divName).height() + 'px; text-align:left; display:inline-block;}' +
		'#' + divName + '_thumbCenterBlock {display: inline-block; position:relative; width:' + $('#' + divName).width() + 'px; height:' + $('#' + divName).height() + 'px; text-align:center; overflow: hidden;}' +
		'#' + divName + '_imgThumbnailsH { width: ' + $('#' + divName).width() + 'px; }' +
		'#' + divName + '_imgThumbnailsV {height: ' + $('#' + divName).height() + 'px;}' +
		'#' + divName + ' {width:' + $('#' + divName).width() + '; min-width: 0px; height: ' + $('#' + divName).height() + 'px; background-color:#2E2A2A; clear: both;}'+
		'#' + divName + '_arrow_left {width:15px; height:25px; position : relative; float:left;}' +
		'#' + divName + '_arrow_right {width:15px; height:25px; position : relative; float:left;}' 
		//'#' + divName + '_pagin {position: absolute; left:0px; width:100%; display: inline-block; text-align: center;}'		
		+'@media screen and (max-width:640px){'
		+'#' + divName + ' { min-width: 0px;}'
		+'#' + divName + '_slider {width:294px;height:220px;overflow: hidden;display:inline-block;text-align:left;background-color: black;}'
		+'#' + divName + '_thumbnails {width:300%;height: 220px;text-align:left;display:inline-block;background-color: black;}'	
		+'#' + divName + '_thumbCenterBlock {display: inline-block;position:relative;text-align:center;overflow: hidden;background-color: black;}'
		+'#' + divName + '_imgThumbnailsH {width:294px;}'	
		+'#' + divName + '_imgThumbnailsV {height:220px;}'
		;
		
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
		
		setNumberOfImage();
		
        /*
		if (isMobile == true) {
			hideAddressBar();
		}
		*/
		if (/Opera Mini/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent)) 
			var todo;
		else 
			adjustMarginTopAndLeftForSlider();
		
		//alert ("intNumberOfImage  " + intNumberOfImage);
		
		setInnerHTMLForDiapo();
		
		if (self.intClickNext > 0) {
			insertPictureToDiapo();
			$("#" + divName + "_arrow_left").css("visibility", "visible");
		} else {
			$("#" + divName + "_arrow_left").css("visibility", "hidden");
		}
		
		if (self.intClickNext + intNumberOfImage >= self.numberOfImages)
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
		if (isMobile == false)
		{
			xSize = $("#" + divName).width();
			ySize = $('#' + divName).height();
			
			pictureWidth = $("#" + divName).width();
			pictureHeight = $('#' + divName).height();
		}
		
		else
		{
			xSize = $("#" + divName).width();
			ySize = 220;
			
			pictureWidth = 294;
			pictureHeight = 220;
		}
		//log("xSize" + xSize);
		//alert ("xSize : " + xSize + " ySize : " + ySize);	
	}
	
	
	function  setNumberOfImage ()
	{
	  	var slideSize = $("#" + divName).width() - 2 * $("#" + divName + "_arrow_right").width();
	  	intNumberOfImage = slideSize/pictureWidth - (slideSize/pictureWidth)%1;
	  	intNumberOfImage = 1;
	  	$("#" + divName + "_slider").css("width", (intNumberOfImage * pictureWidth) + "px");
	  	//alert("intNumberOfImage " + intNumberOfImage);
		
	}
	
	
	function hideAddressBar(){
		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 200);
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
		
		//alert("slider height : " + $("#" + divName + "slider").height() + " / yMargin : " + yMargin + " / slider width : " + $("#" + divName + "_slider").width() + " / xMargin : " + xMargin);
		
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
		
		for (var nb = 0; nb < self.numberOfImages; nb++)
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
	

	
	function setInnerHTMLForDiapo(){
		//alert("document : " + document + " / thumbnails : " + document.getElementById(divName + "_thumbnails"));
		if (document.getElementById(divName + "_thumbnails") != undefined)
			document.getElementById(divName + "_thumbnails").innerHTML = "";
		
		//log ("setInnerHTMLForDiapo self.intClickNext " + self.intClickNext);
		
		for (var intImg = self.intClickNext; (intImg <= (intNumberOfImage + self.intClickNext)) && intImg < self.numberOfImages; intImg++)
        {
            if (currentItemDetail != -1 && listItems[currentItemDetail].fromUpdate == true)
            {
                log("fromUpdate");
                
                switch (intImg)
                {
                    case 0 : nameImage = window[listItems[currentItemDetail].idRepName + "_image"].src; break;
                    case 1 : nameImage = window[listItems[currentItemDetail].idRepName + "_image2"].src; break;
                    case 2 : nameImage = window[listItems[currentItemDetail].idRepName + "_image3"].src; break;
                }
            }
            else
                nameImage = self.dirFolderName + "/" + self.tabDiapo[intImg];
			
			//log ("nameImage " + nameImage + " / self.intClickNext " + self.intClickNext);
			
			var newThumbCenterBlock = createThumbCenterBlock(nameImage, intImg);
			
			if (document.getElementById(divName + "_thumbnails") != undefined)
				document.getElementById(divName + "_thumbnails").appendChild(newThumbCenterBlock);
		}
	}
	
	
	function createThumbCenterBlock(nameImage, index)
	{
		var thumbCenterBlock = document.createElement("div");
		thumbCenterBlock.setAttribute("id", divName + "_thumbCenterBlock");
		thumbCenterBlock.setAttribute("onclick",  "javascript:" + nameFullSlider + ".showFullScreenSlider(" + index + ")");
		
		thumbCenterBlock.style.width = pictureWidth + "px";
		thumbCenterBlock.style.height = pictureHeight + "px";
		
		var loaderImage = new Image();
		loaderImage.src = "Assets/loader.gif";
		loaderImage.style.marginTop = loaderImage.style.marginBottom = (pictureHeight - loaderImage.height) / 2 + "px";
		thumbCenterBlock.appendChild(loaderImage);
		
		var heavyImage = new Image();
		
		heavyImage.onload = function(){
			createImageElement(heavyImage, thumbCenterBlock, loaderImage);
		}
		heavyImage.src = nameImage;
		
		return thumbCenterBlock;
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
	
	
	
	this.showNextDiapo = function (){
		var slider = document.getElementById(divName + "_thumbnails");
		var sliderArray = slider.getElementsByTagName("div");
		
		//log("pictureWidth : " + pictureWidth);
		
		if (self.intClickNext == self.numberOfImages - intNumberOfImage)
			return;
		
		self.intClickNext++;
		
		if (sliderArray.length == intNumberOfImage + 2) {
			slider.removeChild(sliderArray[0]);
		}
		
		for (var i = 0; i < sliderArray.length; i++) {
			sliderArray[i].style.left = "0px";
			
			$(sliderArray[i]).animate({
				left: "-" + pictureWidth + "px"
			}, timeTransition, 'linear', function(){
			});
		}
		
		setTimeout(function(){
			//setCurrentPagin("next")
		}, timeTransition + 50);
		
		if (self.intClickNext == self.numberOfImages - intNumberOfImage) {
			setTimeout(function(){
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				$("#" + divName + "_arrow_right").css("visibility", "hidden");
			}, (timeTransition + 50));
			return;
		}
		else {
			setTimeout(function(){
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				addPictureToDiapo();
			}, (timeTransition + 50));
		}
	}
	
	
	function addPictureToDiapo(){
		
		//*********** create and add node **************
		
        if (listItems[currentItemDetail].fromUpdate == true)
        {
            switch (intNumberOfImage + self.intClickNext)
            {
                case 0 : nameImage = window[listItems[currentItemDetail].idRepName + "_image"].src; break;
                case 1 : nameImage = window[listItems[currentItemDetail].idRepName + "_image2"].src; break;
                case 2 : nameImage = window[listItems[currentItemDetail].idRepName + "_image3"].src; break;
            }
        }
        else
            nameImage = self.dirFolderName + "/" + self.tabDiapo[intNumberOfImage + self.intClickNext];
		
		//log ("addPictureToDiapo nameImage " + nameImage + " / self.intClickNext " + self.intClickNext);
		
		var newThumbCenterBlock = createThumbCenterBlock(nameImage, self.intClickNext + intNumberOfImage);
		
		document.getElementById(divName + "_thumbnails").appendChild(newThumbCenterBlock);
		
		
		//*********** set left property by negative pictureWidth **************
		
		var slider2 = document.getElementById(divName + "_thumbnails");
		var sliderArray2 = slider2.getElementsByTagName("div");
		
		sliderArray2[sliderArray2.length - 1].style.left = "-" + pictureWidth + "px";
	}
	
	
	this.showPrevDiapo = function (){
		var slider = document.getElementById(divName + "_thumbnails");
		var sliderArray = slider.getElementsByTagName("div");
		
		//log("slider : " + sliderArray.length);
		
		//log("showPrevDiapo1 self.intClickNext : " + self.intClickNext);
		
		if (self.intClickNext == 0) 
			return;
		
		self.intClickNext--;
		
		//log("showPrevDiapo2 self.intClickNext : " + self.intClickNext);
		
		for (var i = 0; i < sliderArray.length; i++) {
			$(sliderArray[i]).animate({
				left: "0px"
			}, timeTransition, 'linear', function(){
			});
		}
		
		setTimeout(function(){
			//setCurrentPagin("prev")
		}, timeTransition + 50);
		
		var slider2 = document.getElementById(divName + "_thumbnails");
		var sliderArray2 = slider2.getElementsByTagName("div");
		
		if (sliderArray2.length > intNumberOfImage + 1) 
			setTimeout(removePictureToDiapo, timeTransition + 50);
		
		if (self.intClickNext == 0) {
			setTimeout(function(){
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				$("#" + divName + "_arrow_left").css("visibility", "hidden");
			}, (timeTransition + 50));
			return;
		}
		else {
			setTimeout(function(){
				$("#" + divName + "_arrow_right").css("visibility", "visible");
				$("#" + divName + "_arrow_left").css("visibility", "visible");
				insertPictureToDiapo();
			}, (timeTransition + 50));
		}
	}
	
		
	function removePictureToDiapo(){
		var slider = document.getElementById(divName + "_thumbnails");
		var sliderArray = slider.getElementsByTagName("div");
		
		slider.removeChild(sliderArray[sliderArray.length - 1]);
	}
	
	
	function insertPictureToDiapo()
    {
		//*********** create div and ima **************
		
        if (listItems[currentItemDetail].fromUpdate == true)
        {
            switch (self.intClickNext - 1)
            {
                case 0 : nameImage = window[listItems[currentItemDetail].idRepName + "_image"].src; break;
                case 1 : nameImage = window[listItems[currentItemDetail].idRepName + "_image2"].src; break;
                case 2 : nameImage = window[listItems[currentItemDetail].idRepName + "_image3"].src; break;
            }
        }
        else
            nameImage = self.dirFolderName + "/" + self.tabDiapo[(self.intClickNext - 1)];
		
		//log ("insertPictureToDiapo nameImage " + nameImage + " / self.intClickNext " + self.intClickNext);
		
		var newThumbCenterBlock = createThumbCenterBlock(nameImage, self.intClickNext - intNumberOfImage);
		
		//*********** insert div **************
		
		var slider = document.getElementById(divName + "_thumbnails");
		var sliderArray = slider.getElementsByTagName("div");
		
		slider.insertBefore(newThumbCenterBlock, sliderArray[0]);
		
		//***********set left propertu **************
		
		for (var t = 0; t < sliderArray.length; t++) {
			sliderArray[t].style.left = "-" + pictureWidth + "px";
		}
	}
	
	
	function eventTouch()
	{
        var sliderHammer = $('#' + divName + '_slider');
		
        var hammerSlider = new Hammer(sliderHammer, {
                                      drag_min_distance: 0,
                                      drag_block_horizontal: true,
                                      drag_block_vertical: false,
                                      transform: false,
                                      hold: false,
                                      prevent_default: false,
                                      });
        
        
        hammerSlider = Hammer(sliderHammer).on("drag", function(ev)
                                               {
                                               if (ev.type == "swipe")
                                               {
                                               if (ev.gesture.direction == "left")
                                               self.showNextDiapo();
                                               
                                               if (ev.gesture.direction == "right")
                                               self.showPrevDiapo();
                                               
                                               }
                                               
                                               });
        
		hammerSlider = Hammer(sliderHammer).on("swipe", function(ev)
                                               {
                                               if (ev.type == "swipe")
                                               {
                                               if (ev.gesture.direction == "left")
                                               self.showNextDiapo();
                                               
                                               if (ev.gesture.direction == "right")
                                               self.showPrevDiapo();
                                               
                                               }
                                               });
        
        /*
		var sliderHammer = document.getElementById(divName + '_slider');
		
		var hammerSlider = new Hammer(sliderHammer, {
									  drag_min_distance: 0,
									  drag_horizontal: true,
									  drag_vertical: false,
									  transform: false,
									  hold: false,
									  prevent_default: !isMobile
									  });
		
		hammerSlider.onswipe = function(ev)
		{
			log("Type: " + ev.type + ", Fingers: " + ev.touches.length + ", Direction: " + ev.direction + "<br/>");
			
			if (ev.type == "swipe") {
				// if (event.direction == "left" && isNextImageReady == true)
				if (ev.direction == "left") 
					self.showNextDiapo();
				
				if (ev.direction == "right") 
					self.showPrevDiapo();
			}
		}
         */
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