function MyFullScreenSlider(divName, nameSlider, container, reduceSlider)
{
	var self = this;

	this.tabDiapo;
	
	this.intClickNext = 0;
	var intNumberOfImage = 1;
	var timeTransition = 300;
	//var isMobile = false;
	
	this.alreadyLaunched = false;
	
	var pictureWidth = 800;
	var pictureHeight = 600;
	var xSize, ySize, ySizePagin;
	
	var heavyImage;
	var nameImage;
	
	var crasyFuckingBug = 11;
	
	this.dirFolderName;
	//log("full / self.dirFolderName : " + self.dirFolderName);
	
	
	
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
			actionsWhenOrientationChanged();
		}, false);	
	}	
	
	this.init = function (){
		//alert ("navigator.userAgent : " + navigator.userAgent);
		
		$("#" + divName).html(
		'<a href="javascript:' + nameSlider  + '.closeDiapo()" id="' + divName + '_croix_off"><img src="Assets/croix_off.png" ></a>' +
		'<img src="Assets/arrow_left.png" id="' + divName + '_arrow_left" onclick="' + nameSlider  + '.showPrevDiapo()">' +
		'<img src="Assets/arrow_right.png" id="' + divName + '_arrow_right" onclick="' + nameSlider  + '.showNextDiapo()">' +
		'<div id="' + divName + '_slider"><div id="' + divName + '_thumbnails"><div id="' + divName + '_thumbCenterBlock"></div></div></div>' +
		'<div id="' + divName + '_pagin"></div>'
		);
		
		
		/*
		 var imgTest = new Image();
		 imgTest.src = "arrow_left.png";
		 imgTest.setAttribute("id", "arrow_left");
		 document.getElementById(divName).appendChild(imgTest);
		 
		 
		 $("#" + divName).html('<img src="arrow_right.png" id="arrow_right" onclick="showPrevDiapo()">');
		 $("#" + divName).append('<img src="arrow_left.png" id="' + divName + '_arrow_left" onclick="showPrevDiapo()">');
		 */
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		
		var myCssText =
		'#' + divName + '_slider {width:800px;height:600px;overflow: hidden;background-color: black; display:inline-block;text-align:left;}' +
		'#' + divName + '_thumbnails {width:700%; height: 600px; text-align:left; display:inline-block;}' +
		'#' + divName + '_thumbCenterBlock {display: inline-block; position:relative; width:800px; height:600px; text-align:center; overflow: hidden;}' +
		'#' + divName + '_imgThumbnailsH { width: 800px; }' +
		'#' + divName + '_imgThumbnailsV {height: 600px;}' +
		'#' + divName + ' {position: absolute; left:0px; top:0px; background-color: black; display:inline-block; z-index:5001;}'+
		'#' + divName + '_arrow_left {width:15px; height:25px; position : absolute; }' +
		'#' + divName + '_arrow_right {width:15px; height:25px; position : absolute;}' +
		'#' + divName + '_croix_off {width:30px; height:30px; position : absolute; top:0px; left:0px; padding:5px; z-index:5002;}' +
		'#' + divName + '_pagin {position: absolute; left:0px; width:100%; display: inline-block; text-align: center;}'		
		+'@media screen and (max-width:640px){'
		+'#' + divName + '_slider {width:200px;height:100px;overflow: hidden;display:inline-block;text-align:left;background-color: black;}'
		+'#' + divName + '_thumbnails {width:700%;height: 100px;text-align:left;display:inline-block;background-color: black;}'	
		+'#' + divName + '_thumbCenterBlock {display: inline-block;position:relative;text-align:center;overflow: hidden;background-color: black;}'
		+'#' + divName + '_imgThumbnailsH {width:0px;}'	
		+'#' + divName + '_imgThumbnailsV {height:0px;}}'
		;
		
		if (s.styleSheet) {// IE
			s.styleSheet.cssText = myCssText;
		} else {// w3c
			s.innerHTML = myCssText;
		}
		
		document.getElementsByTagName("head")[0].appendChild(s);
		
		/*
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mobi|Opera Mini|IEMobile/i.test(navigator.userAgent)) {
			isMobile = true;
		}
		*/
		
		$("#" + divName + "_croix_off").css("display", "none");
		$("#" + divName + "_arrow_left").css("display", "none");
		$("#" + divName + "_arrow_right").css("display", "none");
		
		//alert("isMobile : " + isMobile + " / window.orientation :" + window.orientation);
		
        /*
		if (isLikeMobile == true)
			resetDOMCSStoNull ();
		 */
        
		//*******************  timeOut needed for Android ******************
		setTimeout(function()
		{			
			self.resetOrInit();
			eventTouch();
		}, 300);
        
	}
	
	
	function resetDOMCSStoNull ()
	{
		$("#" + divName).css("width", "Opx");
		$("#" + divName).css("height", "0px");
		
		$("#" + divName + "_slider").css("width", "Opx");
		$("#" + divName + "_slider").css("height", "0px");
		
		$("#" + divName + "_thumbnails").css("width", "Opx");
		$("#" + divName + "_thumbnails").css("height", "0px");
		
		document.getElementById(divName + "_pagin").innerHTML = "";
		
		document.body.style.height = "0px";
		
		//********** work for all devices except iPhone - so we make document at null before *********************
		window.scrollTo(0, 0);
	}
	
	
	this.resetOrInit = function ()
	{
		setDocumentBodyHeight();
		
		setDiaporamaSize();
		
		if (isLikeMobile == true) {
			//hideAddressBar();
			resetCSSvalue();
		}
		
		//if (/Opera Mini/i.test(navigator.userAgent) && /iPhone|iPad|iPod/i.test(navigator.userAgent)) 
		if (isMobile == true) 
			var todo;
		else 
			adjustMarginTopAndLeftForSlider();
		
		//log("resetOrInit / self.intClickNext : " + self.intClickNext + " self.tabDiapo : " + self.tabDiapo);
		
		setInnerHTMLForDiapo();
		
		if (self.intClickNext > 0)
		{
			insertPictureToDiapo();
			$("#" + divName + "_arrow_left").css("display", "block");
		}
		else
		{
			$("#" + divName + "_arrow_left").css("display", "none");
		}
		
		if (self.intClickNext < self.tabDiapo.length - 1)
			$("#" + divName + "_arrow_right").css("display", "block");
		else
			$("#" + divName + "_arrow_right").css("display", "none");
			
		
		setTimeout(function()
		{		
			$("#" + divName + "_croix_off").css("display", "block");
			setArrowPosition();
			setPaginMark();
		}, 200);
		
	}
	
	
	function setDocumentBodyHeight()
	{
		if (/IE/i.test(navigator.userAgent)) 
			xSize = document.documentElement.offsetWidth;
		else
			xSize = window.innerWidth;
		
		//alert ("window.innerWidth :  " + window.innerWidth);
		//alert ("window.innerHeight :  " + window.innerHeight);
		//alert (window.pageYOffset);
		
		if (isMobile == true) 
		{
			if (/CriOS/i.test(navigator.userAgent) || /IEMobile/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) 
				ySize = window.innerHeight;
			else
			 {
				 
				 if (window.pageYOffset == 0)
					 ySize = $(window).height() + 60;
				 else
					 ySize = $(window).height() + window.pageYOffset;
				 
				 /*
				if (window.pageYOffset != 1)
					ySize = (window.innerHeight + 60);
				else
					ySize = window.innerHeight;
				  */
			}
            
            
            if (/Android/i.test(navigator.userAgent))
                if (window.pageYOffset == 0)
                    ySize = $(window).height() + 4;
                else
                    ySize = $(window).height() + window.pageYOffset;
			
            /*
			if (/Android/i.test(navigator.userAgent) && /Nexus/i.test(navigator.userAgent)) 
				if (window.pageYOffset != 1)
					ySize = (window.innerHeight + 89);
				else
					ySize = window.innerHeight;
             */
		}
		else 
		{
			if (/IE/i.test(navigator.userAgent)) 
				ySize = document.documentElement.offsetHeight;
			else
				ySize = window.innerHeight;
		}
		//alert ("xSize : " + xSize + " ySize : " + ySize);
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
	
	
	function resetCSSvalue(){
		pictureWidth = xSize;
		pictureHeight = ySize;
		
		$("#" + divName + "_slider").css("width", pictureWidth + "px");
		$("#" + divName + "_slider").css("height", pictureHeight + "px");
		
		//alert("pictureWidth : " + pictureWidth + " / slider width : " + $("#" + divName + "_ slider").width());
		//alert("pictureHeight : " + pictureHeight + " / slider height : " + $("#" + divName + "_ slider").height());
		
		$("#" + divName + "_thumbnails").css("height", pictureHeight + "px");
		
		$("#" + divName + "_thumbCenterBlock").css("width", pictureWidth + "px");
		$("#" + divName + "_thumbCenterBlock").css("height", pictureHeight + "px");
	}
	
	
	function adjustMarginTopAndLeftForSlider(){
		//*********** width **************
		
		var xBlocMedia = $("#" + divName + "_slider").width();
		var xMargin = (xSize / 2) - (xBlocMedia / 2);
		
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
	
	
	function resizeForCenter(){
		if (isMobile == false) {
			//log("resize");
			setDocumentBodyHeight()
			setDiaporamaSize();
			adjustMarginTopAndLeftForSlider();
			setPaginPosition();
			setArrowPosition();
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
	
	
	function setArrowPosition()
	{
		if (isLikeMobile == false)
		{
			var xBlocMedia = $("#" + divName + "_slider").width();
			var xMargin = (xSize / 2) - (xBlocMedia / 2);
			$("#" + divName + "_arrow_left").css("left", xMargin - 60 + "px");
			$("#" + divName + "_arrow_right").css("left", xMargin + xBlocMedia + 60 + "px");
		}
		else
		{
			var xBlocMedia = $("#" + divName).width();
			var xMargin = (xSize / 2) - (xBlocMedia / 2);
			$("#" + divName + "_arrow_left").css("left", xMargin + "px");
			$("#" + divName + "_arrow_right").css("left", xMargin + xBlocMedia - $("#" + divName + "_arrow_right").width() + "px");
		}
		
		var h = (ySize - $("#" + divName + "_arrow_left").height()) / 2 - crasyFuckingBug + "px";
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
			
		for (var intImg = self.intClickNext; (intImg <= (intNumberOfImage + self.intClickNext)) && intImg < self.tabDiapo.length; intImg++)
			{
				nameImage = self.dirFolderName + "/" + self.tabDiapo[intImg];
				
				//log ("nameImage : " + nameImage + " / self.intClickNext " + self.intClickNext);
				
				var newThumbCenterBlock = createThumbCenterBlock(nameImage);
				
				if (document.getElementById(divName + "_thumbnails") != undefined)
					document.getElementById(divName + "_thumbnails").appendChild(newThumbCenterBlock);
			}
	}
	
	
	function createThumbCenterBlock(nameImage)
    {
		var thumbCenterBlock = document.createElement("div");
		thumbCenterBlock.setAttribute("id", divName + "_thumbCenterBlock");
		
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
		
		if (self.intClickNext == self.tabDiapo.length - intNumberOfImage) 
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
			setCurrentPagin("next")
		}, timeTransition + 50);
		
		if (self.intClickNext == self.tabDiapo.length - intNumberOfImage) {
			setTimeout(function(){
				$("#" + divName + "_arrow_left").css("display", "block");
				$("#" + divName + "_arrow_right").css("display", "none");
			}, (timeTransition + 50));
			return;
		}
		else {
			setTimeout(function(){
				$("#" + divName + "_arrow_left").css("display", "block");
				$("#" + divName + "_arrow_right").css("display", "block");
				addPictureToDiapo();
			}, (timeTransition + 50));
		}
	}
	
	
	function addPictureToDiapo(){
		//*********** create and add node **************
		
		nameImage = self.dirFolderName + "/" + self.tabDiapo[intNumberOfImage + self.intClickNext];
		
		var newThumbCenterBlock = createThumbCenterBlock(nameImage);
		
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
		
		//log("self.intClickNext : " + self.intClickNext);
		
		if (self.intClickNext == 0) 
			return;
		
		self.intClickNext--;
		
		//log("self.intClickNext : " + self.intClickNext);
		
		for (var i = 0; i < sliderArray.length; i++) {
			$(sliderArray[i]).animate({
				left: "0px"
			}, timeTransition, 'linear', function(){
			});
		}
		
		setTimeout(function(){
			setCurrentPagin("prev")
		}, timeTransition + 50);
		
		var slider2 = document.getElementById(divName + "_thumbnails");
		var sliderArray2 = slider2.getElementsByTagName("div");
		
		if (sliderArray2.length > intNumberOfImage + 1) 
			setTimeout(removePictureToDiapo, timeTransition + 50);
		
		if (self.intClickNext == 0) {
			setTimeout(function(){
				$("#" + divName + "_arrow_right").css("display", "block");
				$("#" + divName + "_arrow_left").css("display", "none");
			}, (timeTransition + 50));
			return;
		}
		else {
			setTimeout(function(){
				$("#" + divName + "_arrow_right").css("display", "block");
				$("#" + divName + "_arrow_left").css("display", "block");
				insertPictureToDiapo();
			}, (timeTransition + 50));
		}
	}
	
		
	function removePictureToDiapo(){
		var slider = document.getElementById(divName + "_thumbnails");
		var sliderArray = slider.getElementsByTagName("div");
		
		slider.removeChild(sliderArray[sliderArray.length - 1]);
	}
	
	
	function insertPictureToDiapo(){
		//*********** create div and ima **************
		
		nameImage = self.dirFolderName + "/" + self.tabDiapo[(self.intClickNext - 1)];
		
		var newThumbCenterBlock = createThumbCenterBlock(nameImage);
		
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
                                      prevent_default: false
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
		var $sw = $('#' + divName + '_slider'), $output = $('#output');
		
		$sw.on('swipe', function(event){
			event.preventDefault();
			
			if (event.type == "swipe") {
				// if (event.direction == "left" && isNextImageReady == true)
				if (event.direction == "left") 
					self.showNextDiapo();
				
				if (event.direction == "right") 
					self.showPrevDiapo();
				
				//$output.prepend("Type: " + event.type + ", Fingers: " + event.touches.length + ", Direction: " + event.direction + "<br/>");
			}
			//log("Type: " + event.type + ", Fingers: " + event.touches.length + ", Direction: " + event.direction + "<br/>");
		});
		*/		
		
	}
	
	
	function actionsWhenOrientationChanged()
	{
		//alert("orientation" + window.orientation);	
		//resetDOMCSStoNull ();
		
		//********** word for all devices except iPhone - so we make document at null before *********************
		window.scrollTo(0, 0);
		
		setTimeout(function()
		{
			self.resetOrInit();
			
			if (self.intClickNext > 0) 
				insertPictureToDiapo();
		}, 300);
	}
	
    
	this.closeDiapo = function ()
    {
		$("#mainContainer").css("display", "inline-block");
        
        if (isModalPopUp)
        {
            $("#popUp").css("display", "inline-block");
            
            if (!isAppScreen)
                $("#popUpBtn").css("display", "inline-block");
        }
		
		$("#" + divName).css("display", "none");
        
		reduceSlider.resetOrInit();
        
        $("body").animate({scrollTop:currentYoffset}, 200, 'linear');
	}
	
	
	this.showFullScreenSlider = function (index)
	{
        currentYoffset = window.pageYOffset;
        
        $("#mainContainer").css("display", "none");
        
        log("showFullScreenSlider -> isModalPopUp : " + isModalPopUp);
        
        if (isModalPopUp)
        {
            $("#popUp").css("display", "none");
            $("#popUpBtn").css("display", "none");
        }
        
        $("#" + divName).css("display", "block");
		
		self.intClickNext = index;
		
		//log("showFullScreenSlider index : " + index);
		
		if (self.alreadyLaunched == false)
		{
			self.init();
			self.alreadyLaunched = true;
		}
		else
		{
			setTimeout(function()
			{
				self.resetOrInit();
			}, 200);
		}
	}   
	
	
	function getSize(){
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
		
		//$('#output').prepend ("sliderArray.length : " + sliderArray.length + " / self.intClickNext : " + self.intClickNext);
	}
}