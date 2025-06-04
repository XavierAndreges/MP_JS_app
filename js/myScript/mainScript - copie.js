function log()
{
    if (typeof(console) !== "undefined" && console.log !== undefined && !isProd && !isProdWeb)
    {
        try
        {
            console.log.apply(console, arguments);
        }
        catch (e)
        {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
        }
    }
}


function getYsizeForHomeBtn()
{
    var ySize;
    
    if (isLikeMobile == true)
    {
        if (/CriOS/i.test(navigator.userAgent) || /IEMobile/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent))
        {
            ySize = window.innerHeight;
        }
        else
        {
			if (window.pageYOffset == 0)
                ySize = window.innerHeight;
			else
			{
                ySize = window.innerHeight + window.pageYOffset;
                /*
				if (window.innerHeight >= 356)
					ySize = 416;
				else
					ySize = 268;
                 */
			}
        }
        
        if (/Android/i.test(navigator.userAgent))
            if (window.pageYOffset == 0)
                ySize = $(window).height();
            else
                ySize = $(window).height() + window.pageYOffset;
                
        
            /*
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
    
    return ySize;
}

function getYsize()
{
    var ySize;
    
    if (/IE/i.test(navigator.userAgent))
        ySize = document.documentElement.offsetHeight;
    else
        ySize = window.innerHeight;
    
    //alert("getYsize : " + ySize);
    
    return ySize;
}


function getXsize()
{
    var xSize;
    
    if (/IE/i.test(navigator.userAgent))
        xSize = document.documentElement.offsetWidth;
    else
        xSize = window.innerWidth;
    
    return xSize;
}


function setPrimaryVarWithUserAgentAndxSize()
{
    log("getXsize : " + getXsize() + " / getYsize() : " + getYsize());
    
	isMobile = false;
	isIpad = false;
	
	/*
	if (getXsize() < 946)
		isLikeMobile = true;
	else
    {
		isLikeMobile = false;
    }
     */
	
    isLikeMobile = true;
    
    //************************* userAgent **********************************
    
    log(navigator.userAgent);
    
    if (/Android/i.test(navigator.userAgent))
        isAndroid = true;
    
    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
		isIOS = true;
		//alert("isMobile : " + isMobile);
	}
    
	if (/Android|webOS|iPhone|iPod|BlackBerry|Opera Mobi|Opera Mini|IEMobile/i.test(navigator.userAgent)) {
		isMobile = true;
		//alert("isMobile : " + isMobile);
	}
	
	if (/iPad/i.test(navigator.userAgent) || /Nexus 7/i.test(navigator.userAgent) || /Nexus 10/i.test(navigator.userAgent)
        || (isAndroid && getXsize() >= 768))
    {
		isIpad = true;
		//alert("isIpad : " + isIpad);
	}
    
    if (/Android/i.test(navigator.userAgent) && /Gingerbread|Honeycomb|Froyo|Eclair|Donut|Android 2.2/i.test(navigator.userAgent))
    {
        isRestrictedAndroid = true;
        log("isRestrictedAndroid = true");
    }
    
    
    
    //************************* config **********************************

    if (isIpad)
        isMobile = true;
    
    if (isMobile && !isMobileWeb)
    {
        isApp = true;
        isAppScreen = true;
    }
   
    //isIpad = true;
    
    if (isDemoWeb)
    {
        isApp = false;
    }
    
    if (!isMobile)
    {
        isNetWorkAvalaible = true;
        isGoogleSelected = false;
    }
    
    if (isMobileWeb)
        isAppScreen = true;
    
    
    log("setPrimaryVarWithUserAgentAndxSize -> isApp : " + isApp + " / isIpad : " + isIpad + " / isAppScreen : " +isAppScreen + " / isLikeMobile : " + isLikeMobile + " / isMobile : " + isMobile + " isRestrictedAndroid : " + isRestrictedAndroid + " / currentTable : " + currentTable);
    
    //************************* tiles & URL **********************************
    
    
    tilesURL = isMobile ? "file:" : ipAdress;
    
    log("setPrimaryVarWithUserAgentAndxSize -> tilesURL : " + tilesURL);
    
    
    //************************* localStorage **********************************
    
    localstorageToRetrieveAtStart()
    
    //************************* PhotoSwipe **********************************

    if (currentTable == "Home" || currentTable == "Circuit" || currentTable == "PrivateSpace"
        || currentTable == "Restaurants")
        lPhotoSwipe = window.Code.PhotoSwipe;
    
    
    //isIpad = true;
    
    /*
    isDemoWeb = false;
    isMobileWeb = false;
    isMobile = false;
    isAppScreen = true;
    isApp = false;
    */
}


function localstorageToRetrieveAtStart()
{
    //************************* isGoogleSelected **********************************
    
    if (localStorage.isGoogleSelected)
    {
        switch (localStorage.isGoogleSelected)
        {
            case 'true' : isGoogleSelected = true; break;
            case 'false' : isGoogleSelected = false; break;
        }
    }
    else
        isMobile ? isGoogleSelected = false : isGoogleSelected = true;
    
    log("TTTTTTTTT setGlobalMap -> isGoogleSelected : " + isGoogleSelected);
    
    //************************* myRestoArray **********************************
    
    if (!localStorage.myRestoArray)
        localStorage.myRestoArray = JSON.stringify(myRestoArray);
    else
        myRestoArray = jQuery.parseJSON(localStorage.myRestoArray);
    
    //************************* closeLinkArray **********************************
    
    if (localStorage.closeLinkArray)
        closeLinkArray = jQuery.parseJSON(localStorage.closeLinkArray);
}


function myOrientationchange() {
    
}

if (/IE/i.test(navigator.userAgent))
{	
	window.attachEvent("orientationchange", function()
                       {
                       setOrientationChange();
					   });
	
	window.attachEvent("onresize", function()
					   {
                       if (!isMobile && !isIpad)
                       {
                       clearTimeout(refreshAllTimeOut);
                       refreshAllTimeOut = setTimeout(launchResize, 500);
                       }
					   });
}
else
{
	window.addEventListener("orientationchange", function()
                            {
                            setOrientationChange();
                            /*
                            resetVarAsInit();
                            onBodyLoad('Home');
                             */
                            
							}, false);	
	
	window.addEventListener("resize", function()
                            {
                            if (!isMobile && !isIpad)
                            {
							clearTimeout(refreshAllTimeOut);
							refreshAllTimeOut = setTimeout(launchResize, 500);
                            }                            
                            }, false);
}


function setOrientationChange()
{
    launchResize();
}


function setLinkAndBgColorToMainSelectionItemTitle()
{
    if (!isAppScreen)
    {
        $("#activityHome").removeClass("bgMP2013Gradient");
        $("#cityHome").removeClass("bgRestaurantsGradient");
        $("#transportHome").removeClass("bgHotelsGradient");
        $("#timeHome").removeClass("bgServicesGradient");
        
        $("#activityHome").addClass("bgMP2013HorizontalGradient");
        $("#cityHome").addClass("bgRestaurantsHorizontalGradient");
        $("#transportHome").addClass("bgHotelsHorizontalGradient");
        $("#timeHome").addClass("bgServicesHorizontalGradient");
        
        $("#activityHome").attr("onclick", "");
        $("#cityHome").attr("onclick", "");
        $("#transportHome").attr("onclick", "");
        $("#timeHome").attr("onclick", "");
    }
    else
    {
        $("#activityHome").removeClass("bgMP2013HorizontalGradient");
        $("#cityHome").removeClass("bgRestaurantsHorizontalGradient");
        $("#transportHome").removeClass("bgHotelsHorizontalGradient");
        $("#timeHome").removeClass("bgServicesHorizontalGradient");
        
        $("#activityHome").addClass("bgMP2013Gradient");
        $("#cityHome").addClass("bgRestaurantsGradient");
        $("#transportHome").addClass("bgHotelsGradient");
        $("#timeHome").addClass("bgServicesGradient");
        
        $("#activityHome").attr("onclick", "showModalPopUp('activityHome')");
        $("#cityHome").attr("onclick", "showModalPopUp('cityHome')");
        $("#transportHome").attr("onclick", "showModalPopUp('transportHome')");
        $("#timeHome").attr("onclick", "showModalPopUp('timeHome')");
    }
}


function setSizeForBgImage()
{
    if (getYsize() >= 945)
        $("#bgImage").css("height", "580px");
    else
        if (getYsize() >= 768)
            $("#bgImage").css("height", "480px");
        else
            if (getYsize() >= 548 && getYsize() < 768)
                $("#bgImage").css("height", "240px");
            else
                if (getYsize() < 548 && getYsize() >= 460)
                    $("#bgImage").css("height", "230px");
                else
                    if (getYsize() < 460 && getYsize() > 416)
                        $("#bgImage").css("height", "220px");
                    else
                        $("#bgImage").css("height", "210px");
    
    //******************* bgImage **************************
    
    /*
     if (getYsize() >= 945)
     $("#bgImage").css("height", "580px");
     else
     if (getYsize() >= 768)
     $("#bgImage").css("height", "480px");
     else
     if (getYsize() >= 548 && getYsize() < 768)
     $("#bgImage").css("height", "238px");
     else
     if (getYsize() < 548 && getYsize() >= 460)
     $("#bgImage").css("height", "200px");
     else
     if (getYsize() < 460)
     {
     $("#bgImage").css("height", "180px");
     $(".mainHomeTitle").css("line-height", "100%");
     }
     */
}


function setSizeForMainSelectionItemTitle()
{
    //******************* mainHomeTitle **************************
    
    //var lHeight = (getYsize() - $("#mobileTitle2").outerHeight() - $("#bgImage").outerHeight())/2;
    
    var lHeight = (getYsize() - $("#bgImage").outerHeight())/2;
    
    if (lHeight < 59)
        lHeight = 80;
    
    //log("^^^^^^ setSizeForMainSelectionItemTitle -> getYsize() : " + getYsize() + " / $(#mobileTitle2).outerHeight() : " + $("#mobileTitle2").outerHeight() + " /  $(#bgImage).outerHeight() : " + $("#bgImage").outerHeight());
    
    var lArray = $("#leftHomeSelectionBlock .mainHomeTitle");
    
    for (var i = 0; i < lArray.length; i++)
    {
        $(lArray[i]).css("padding-top", "0px");
        
        var lTextHeight = $("#" + $(lArray[i]).attr("id") + " p").outerHeight();
        
        var lPaddingTop = Math.round((lHeight - lTextHeight) / 2);
        
        $(lArray[i]).css("padding-top", lPaddingTop + "px");
        
        var pixel = 0;
        
        if (isMobile)
            pixel = 1;

        $(lArray[i]).css("height", (pixel + lHeight - lPaddingTop) + "px");
    }
    
    
    log("setSizeForMainSelectionItemTitle -> lHeight : " + lHeight);
    
    
    //******************* checkResultBtnHome **************************
    
    if (((currentActivity != -1 || currentCity != -1) && listItems.length > 0) || currentTable == "Circuit")
    {
        $("#checkResultBtnHome").css("display", "inline-block");
        
        $("#checkResultBtnHome").css("top", lHeight - 25 + "px");
        
        $("#checkResultBtnHome").css("left", (getXsize() / 2) - 25 + "px");
    }
    else
    {
        $("#checkResultBtnHome").css("display", "none");
    }
    
    
}


function resetMainHomeTitleCSS()
{
    $("#mobileTitle2").css("font-size", "1.3em");
    $("#mobileTitle2").css("margin-top", "-4px");
    
    var lArray = $("#leftHomeSelectionBlock .mainHomeTitle");
    
    for (var i = 0; i < lArray.length; i++)
    {
        $(lArray[i]).css("padding-top", "5px");
        $(lArray[i]).css("height", "26px");
    }
    
    animateOpacityWithType("activityHome", "fast", "in");
    animateOpacityWithType("cityHome", "fast", "in");
    animateOpacityWithType("transportHome", "slow", "in");
    animateOpacityWithType("timeHome", "slow", "in");
    
    //use to set the hover style
    resetActiveBtnWithArrayAndType(activityBtnArray, currentActivity);
    resetActiveBtnWithArrayAndType(cityBtnArray, cityBtnArray[currentCity]);
    resetActiveBtnWithArrayAndType(transportBtnArray, currentTransport);
    
    if (currentTransport != -1)
        resetActiveBtnWithArrayAndType(timeBtnArray, currentTime);
    
    $("#bgImage").css("height", "280px");
}



function launchResize()
{
    log ("launchResize");
    
    log("getXsize : " + getXsize() + " / getYsize() : " + getYsize());
    
    
    hasBeenResized = true;
    

    //*********** bug fixed, also in show detail *****************
    
    fixedIosBugForTextDetailFontSize();
    
    if (homeStatus == "List")
    {
        if (getXsize() <= 400)
        {
            $("#itemList").css("width", "92%");
            $("#itemList").css("margin-left", "4%");
            $("#itemList").css("margin-right", "4%");
        }
        else
        {
            $("#itemList").css("width", "auto");
            $("#itemList").css("margin-left", "0%");
            $("#itemList").css("margin-right", "0%");
        }
    }
    //************************************************************
    
    if (homeStatus == "Close" && !isMapVisible)
    {
        $("#leftHomeOptionBlock").css("display", "none");
    }
    
    bugScrollPositionFixed();
    
    setTimeout(function(){
               
               if (isLikeMobile && !isRestrictedAndroid && !isIpad)
               {
                    $("#listMainMenu").css("height", (getYsize() - 30) + "px");
               }
               
               if (menuIsOpened)
               {
                    var lNewSize = getYsize() - $("#mobileTitle2").outerHeight() - $("#bgImage").height();
                    $("#mainContainer").css("height", lNewSize + "px");
               }
               
               $("#mobileTitle2").css('width', getXsize() + 'px');
               
               /*
               if (isLikeMobile && currentTable == "Home" && homeStatus == "Home")
               {
                    setSizeForBgImage();
               
                    setTimeout(setSizeForMainSelectionItemTitle,1000);
               }
               */
               if (currentTable == "Home" && homeStatus == "List" && !isModalPopUp)
                    setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
               else
                    setAndAdjustTitleLabel($("#mobileTitle2Label").html(), mCurrentBgColor);
               
               //******************************  resize block text itemList *********************************
               
               setSizeToItemBlockText();
               
               setSizeAndMarginForList();
               
               var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
               
               if (isMapVisible)
               {
                    $("#mapList").css("height", lHeight + "px");
                    $("#mainContainer").css("height", lHeight + "px");
               }
               else
               if (isModalPopUp && isLikeMobile)
               {
                    $("#modalPopUp").css("height", lHeight + "px");
               }
               else
               if (homeStatus == "Close" && !isMapVisible)
               {
                    $("#leftHomeOptionBlock").css("display", "inline-block");
                    resetAllOptionSlider();
                    setAllOptionItemsSlider();
               }
               
               }, 1000);
}

function gaTrackPage(_page)
{
    if (isProd)
        gaPlugin.trackPage(gaPluginSuccess, gaPluginError, _page);
}


function gaTrackEvent(_category, _action, _label, _value)
{
    if (isProd)
        gaPlugin.trackEvent(gaPluginSuccess, gaPluginError, _category, _action, _label, _value);
    else
        _gaq.push(['_trackEvent', _category, _action, _label, _value]);
}


function gaPluginSuccess(e)
{
    log("gaPluginSuccess -> e : " + e);
    //log(e);
}


function gaPluginError()
{
    log("gaPluginError -> e : " + e);
    //log(e);
}


function setGAtrackEventForMail(_type)
{
    if (_type)
        log("setGAtrackEventForMail -> raisonsociale : " + tempSelectedItem.raisonsociale + " / ville : " + tempSelectedItem.ville);
    else
        log("setGAtrackEventForMail -> idRepName : " + listItems[currentItemDetail].idRepName + " / table : " + listItems[currentItemDetail].table);
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('mailSent');
        
        if (_type)
            gaTrackEvent('mailSent', 'raisonsociale : ' + tempSelectedItem.raisonsociale + ' / ville : ' + tempSelectedItem.ville, 'currentTable : ' + currentTable, 0);
        else
            gaTrackEvent('mailSent', listItems[currentItemDetail].idRepName + ' / ' + listItems[currentItemDetail].table, 'currentTable : ' + currentTable, 0);
    }
}


function setGAtrackEventForPhoneCall(_type)
{
    if (_type)
        log('setGAtrackEventForPhoneCall -> raisonsociale : ' + tempSelectedItem.raisonsociale + ' / ville : ' + tempSelectedItem.ville);
    else
        log('setGAtrackEventForPhoneCall -> idRepName : ' + listItems[currentItemDetail].idRepName + ' / table : ' + listItems[currentItemDetail].table);
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('phoneCall');
        
        if (_type)
            gaTrackEvent('phoneCall', 'raisonsociale : ' + tempSelectedItem.raisonsociale + ' / ville : ' + tempSelectedItem.ville, 'currentTable : ' + currentTable, 0);
        else
            gaTrackEvent('phoneCall', listItems[currentItemDetail].idRepName + ' / ' + listItems[currentItemDetail].table, 'currentTable : ' + currentTable, 0);
    }
}


function setGAtrackEventForWebSite(_link)
{
    log("setGAtrackEventForWebSite -> _link : " + _link);
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('webSite');
        
        gaTrackEvent('webSite', _link, 'currentTable : ' + currentTable, 0);
    }
}


function checkHomePopUp()
{
    if (localStorage.checkHomePopUp == "never")
        return;
    
    if (localStorage.checkHomePopUp == undefined || localStorage.checkHomePopUp == "false")
    {
        localStorage.checkHomePopUp = "0";
        
        if (isLittleModalPopUp)
            showLittleModalPopUp();
        
        showLittleModalPopUp("openSettingsOnHome");
        
        return;
    }
    
    log("checkHomePopUp -> " + localStorage.checkHomePopUp);
    
    var lNb = parseInt(localStorage.checkHomePopUp) + 1;
    
    localStorage.checkHomePopUp = lNb;
    
    if (lNb%nbTimesToOpenSettingsOnHome == 0)
    {
        /************* 2nd condition to avoid conflict withh checkUpdate ***************/
        
        if (isLittleModalPopUp)
            showLittleModalPopUp();
        
        showLittleModalPopUp("openSettingsOnHome");
    }
}


function checkUpdate()
{
    var lVersionItemsToPush = localStorage.versionItemsToPush ? localStorage.versionItemsToPush : "0";
    
    log("checkUpdate -> lVersionItemsToPush : " + lVersionItemsToPush);
    
    var lUrl = ( (isProd || isMobileTest) ? urlWeb : ipAdress ) + 'API/getUpdate.php?version=' + version + '&versionItemsToPush=' + lVersionItemsToPush;

    log("checkUpdate -> lUrl : " + lUrl);
    
    $.ajax(
           {
           
           url: lUrl,
           
           success: 	function(data, textStatus, request) {
           
               log(data);
               
               var s = document.createElement('script');
               s.setAttribute('type', 'text/javascript');
               s.text = data;
               document.getElementsByTagName("head")[0].appendChild(s);

               //************* ModalPopUp LastVersion ***********
           
               if (updateData.version > version)
               {
                   log("nbTimesForLastVersion : " + localStorage.nbTimesForLastVersion);
                   
                   if (localStorage.nbTimesForLastVersion === undefined || localStorage.nbTimesForLastVersion == "false")
                   {
                        localStorage.nbTimesForLastVersion = "0";
           
                        showLittleModalPopUp("updateApp");
                   }
                   else
                   {
                        var lNb = parseInt(localStorage.nbTimesForLastVersion) + 1;
                   
                        localStorage.nbTimesForLastVersion = lNb;
                   
                        if (lNb%nbTimesToUpdate == 0)
                            showLittleModalPopUp("updateApp");
                    }
               }
           
               //************* itemsToPush ***********
               
               if (currentTable == "Home")
                    checkUpdateForItemsToPush();
               else
               if (currentTable == "Contact")
               {
                    if (updateData.isBDRT == true)
                    {
                        $("#partenariatBDRT").css("display", "inline-block");
                        localStorage.partenariatBDRT = "true";
                    }
                    else
                    {
                        $("#partenariatBDRT").css("display", "none");
                        localStorage.partenariatBDRT = "false";
                    }
               }
           
               //******************* orderItemsArray ********************
               
               if (updateData.orderItemsArray)
               {
                    localStorage.orderItemsArray = JSON.stringify(updateData.orderItemsArray);
               }
           
                //******************* myRestoArray ********************
           
                if (updateData.myRestoArray)
                {
                    myRestoArray = updateData.myRestoArray
                    localStorage.myRestoArray = JSON.stringify(myRestoArray);
                }
           
            //******************* myRestoArray ********************
           
                if (updateData.closeLinkArray)
                {
                    closeLinkArray = updateData.closeLinkArray
                    localStorage.closeLinkArray = JSON.stringify(closeLinkArray);
                }
           
           }
    });
}


function checkUpdateForItemsToPush()
{
    if (updateData.itemsToPush && updateData.itemsToPush.length > 0)
    {
        log("checkUpdateForItemsToPush -> ok");
        
        var lItemArray = updateData.itemsToPush;

        //************* remove and add item in listItems ***********
        
        for (var i = 0; i < lItemArray.length; i++)
        {
            // because updated item can already been in listItem
            removeItemFromDataList(lItemArray[i].idRepName, lItemArray[i].table);
            
            log("checkUpdateForItemsToPush -> lItemArray[i] : " + JSON.stringify(lItemArray[i].table));
            
            log("checkUpdateForItemsToPush -> window[listItems + lItemArray[i].table] : " + window["listItems" + lItemArray[i].table].length);
            
            window["listItems" + lItemArray[i].table].push(lItemArray[i]);
        }
        
        //************* items to save in localstorage ***********
        
        if (localStorage.itemsToPush && localStorage.itemsToPush != "false")
        {
            var lStorageArray = jQuery.parseJSON(localStorage.itemsToPush);
            
            //******** we search for an existing item to replace it *******
            
            var lIndexToRemove = -1;
            
            for (var n = 0; n < lItemArray.length; n++)
            {
                for (var t = 0; t < lStorageArray.length; t++)
                {
                    if (lStorageArray[t].idRepName == lItemArray[n].idRepName)
                        lIndexToRemove = t;
                }
            }
            
            if (lIndexToRemove != -1)
            {
                log("checkUpdateForItemsToPush -> we remove at index : " + lIndexToRemove);
                lStorageArray.remove(lIndexToRemove);
            }
        
            //******** then we save all items in localstorage *******
            
            localStorage.itemsToPush = JSON.stringify(lStorageArray.concat(lItemArray));
        }
        else
            localStorage.itemsToPush = JSON.stringify(lItemArray);
        
        //************* versionItemsToPush ***********
        
        localStorage.versionItemsToPush = parseInt(updateData.versionItemsToPush);
        
        log("checkUpdateForItemsToPush -> localStorage.versionItemsToPush : " + localStorage.versionItemsToPush);
        
        //************* pop up ***********
        
        setTimeout(function()
                   {
                        if (!isLittleModalPopUp && localStorage.startApp == "ok")
                            showLittleModalPopUp('updatedItems', null, updateData.itemsToPush.length);
                   
                   }, 500);
    }
}


function onBodyLoad(table)
{
    //******************** NEW VERSION ****************
    

    if (version > 1.2 && localStorage.version1_3 == undefined)
    {
        localStorage.versionItemsToPush = "0";
        localStorage.itemsToPush = "false";
        localStorage.nbTimesForLastVersion = "false";
        
        localStorage.version1_3 = "installed";
    }

    
    //******************** VAR ****************
    
    currentTable = table;
    
    if (currentTable == "OfficesTourisme" || currentTable == "Guides" || currentTable == "ParcAccro"
        || currentTable == "AgencesReceptives" || currentTable == "MoniteursEscalade" || currentTable == "Campings"
        || currentTable == "LocationVelo" || currentTable == "MetroTram" || currentTable == "Parkings"
        || currentTable == "Massifs" || currentTable == "Restaurants" || currentTable == "Hebergements")
    {
        isTablePracticalLink = true;
    }
    
    setPrimaryVarWithUserAgentAndxSize();
    
    if (isIpad && !isAndroid)
    {
        $("#splashScreen img").attr("src", "Assets/myScreen_iPad.png");
    }
    
    if (isMobile)
        setLoadingAnimation(0, 'home');
    
    //******************** mTimeLoad1 ****************
    
    var d = new Date();
    mTimeLoad1 = d.getTime();
    
    log("onBodyLoad / mTimeLoad1 : " + mTimeLoad1);
    
    //******************** isDemoWeb ****************
    
    var lDuration = 0;
    
    if (isDemoWeb)
    {
        $("#splashScreen").css("height", "480px");
        $("#splashScreen").css("overflow", "hidden");
        
        $("body").css("overflow", "no-scroll");
        
        lDuration = 1000;
    }
    
    //******************** deviceready ****************
    
    setTimeout(function() {
    
        $("body").css("overflow", "auto");
        
        if (isApp && isMobile)
            document.addEventListener('deviceready', onDeviceReady, false);
        else
            $( document ).ready(function() {
                                $("body").animate({scrollTop:1}, 200, 'linear', onDeviceReady);
                                });
               }, lDuration);
}




   
function onDeviceReady()
{
    log("onDeviceReady");
    

    if (isAndroid && isApp && currentTable == "Home")
        navigator.splashscreen.show();
    
    /*
    if (/MSIE/i.test(navigator.userAgent) &&  !/IEMobile/i.test(navigator.userAgent) && typeof(Storage) !== "undefined")
    {
        if (localStorage.neverShowPopUpBrowserIncompatibleAgain != "true")
             showPopUpBrowserIncompatible();
    }
    */
        
    if (isApp)
    {
        if (!isMobileWeb)
        {
            //******************* open and copy Db *********************
            
            if (isIOS)
                openSpatialDb();
            
            // isAndroid will open spatial in launchSpatialRequest by jsqliteplugin.java
            
            openTilesDb();
            
            //localStorage.isSmallSQLiteForSpatialiteInstalled = "false";
            //localStorage.isFullSQLiteForSpatialiteInstalled = "false";
            
            
            /*
            localStorage["pacaTiles_8_9.db"] = false;
            localStorage["MarseilleCustom_10_12"] = false;
            localStorage["MarseilleCustom_13"] = false;
            localStorage["MarseilleCustom_14"] = false;
            localStorage["MarseilleCustom_15"] = false;
            localStorage["MarseilleCustom_16"] = false;
            localStorage["MarseilleCustom_17"] = false;
            localStorage["MarseilleCustom_18"] = false;
            */

            for (var i = 0; i < mTilesToCopyArray.length; i++)
            {  
                if(localStorage[mTilesToCopyArray[i]] == "true" || isAndroid)
                {
                    var lName = mTilesToCopyArray[i].replace(".db", "");
                    window[lName] = window.sqlitePlugin.openDatabase({name: lName});
                }
                else
                    copyAndOpenCustomTile(mTilesToCopyArray[i]);
            }

            
            /*
            localStorage.checkHomePopUp = "false";
            localStorage.tipMenu = "false";
            localStorage.tipGoogle = "false";
            localStorage.tipRandoMap = "false";
            localStorage.tipFavorite = "false";
            
            
            localStorage.bibemusZola_13_17 = "false";
            localStorage.grotteChampignons_13_17 = "false";
            localStorage.sentierDansaires_13_17 = "false";
             localStorage.randoRocquefavour_13_17 = "false";
            */
            
            /*
            localStorage.calanques_13_17 = "false";
            localStorage.garlaban_13_17 = "false";
            localStorage.sainteVictoire_13_17 = "false";
            localStorage.sainteBaume_13_17 = "false";
            localStorage.etoile_13_17 = "false";
            localStorage.coteBleue_13_17 = "false";
            localStorage.capCanaille_13_17 = "false";
            */
            
             //******************* Google analytics *********************
            
            
            gaPlugin = window.plugins.gaPlugin;
            gaPlugin.init(gaPluginSuccess, gaPluginError, "UA-39619730-2", 10);
            
            gaTrackPage("currentTable : " + currentTable);
            
  
        }
        
        //********************** connection and background ***********************
        
        checkConnection();
        
        //log("onDeviceReady");
        
        document.addEventListener("resume", giveOpinionOnAppStore, false);
        
        document.addEventListener("online", function(){
                                  isNetWorkAvalaible = true;
                                  log("addEventListener online -> isNetWorkAvalaible : " + isNetWorkAvalaible);
                                  }, false);
        
        document.addEventListener("offline", function(){
                                  isNetWorkAvalaible = false;
                                  log("addEventListener offline -> isNetWorkAvalaible : " + isNetWorkAvalaible);
                                  }, false);
        
        if (isAndroid)
            document.addEventListener("backbutton", function() {
                                      
                                      if (currentTable == "Home" && homeStatus == "Home")
                                        navigator.app.exitApp();
                                      else
                                      if ((isTablePracticalLink && homeStatus == "List")
                                          || (currentTable == "PrivateSpace" && homeStatus == "List")
                                          || homeStatus == "Home")
                                        showLittleModalPopUp('exitApp', null, 'killApp');
                                      else
                                        back();
                                      
                                      log("backbutton -> Android");
                                      
                                      }, false);
    }
    
    //************* URL FOR LANG *****************
    
    
    var urlPart = window.location.href.toString().split("#");
    
    if (urlPart[1] != undefined && urlPart[1] != "")
    {
        var urlArray = urlPart[1].split("&");
        
        if (urlArray[0] != undefined)
        {
            currentLang = urlArray[0];
        }
    }
    else
    {
        window.location.href = urlPart[0] + "#" + currentLang;
    }

    //log("window.location.href : " +  window.location.href + " / currentLang : " + currentLang);
	
        //************* HEAD AND LOCALIZED *****************
    
    setTitleAndMetaInHead2();
    
	firstStepOfLocalizedItems();

	 //******************** DISPLAY ****************

    //log("rut1");
    
    if (currentTable == "Home")
        setLinkAndBgColorToMainSelectionItemTitle();
    
    setSizeForBgImage();
    
    if (currentTable == "Contact")
    {
        if (localStorage.partenariatBDRT = "true")
            $("#partenariatBDRT").css("display", "inline-block");
        else
            $("#partenariatBDRT").css("display", "none");
    }
    
    //log("rut1b");
    
    //******************** BG Image / DIAPO *********************
    

    if (isLikeMobile
        && (currentTable == "Home" || currentTable == "Circuit" || currentTable == "PrivateSpace"
            || currentTable == "Restaurants")
        )
    {
        if (currentTable != "PrivateSpace")
            setHomePicturesSlider();
        else
            $("#bgImage").css("display", "none");
    }
    else
    if (isTablePracticalLink || currentTable == "Contact")
    {
        setBgImage(currentTable);
    }

    
    //log("rut1c");
    
    //****************************************************

	$("#blockMap").css("display", "none");
	
	if (currentTable == "Home" || currentTable == "Circuit" || currentTable == "Contact"
        || currentTable == "routingMap" || currentTable == "randoMap")
	{
		$("#showMapBtn").css("display", "none");
	}
    
    if (currentTable == "Home")
    {
        if (!isAppScreen)
            $(".mainHomeTitle").addClass("corner");
    }
    
    
    if (currentTable == "Restaurants")
    {
        var lUrl = "javascript:window.location.href = 'index.html#" + currentLang + "&Restos'";
        $("#InfosDetailInHome").attr("onclick", lUrl);
    }

	 //******************** DATA ****************
    
    //log("rut2");

	if ((isTablePracticalLink)
        || currentTable == "PrivateSpace"
        || currentTable == "Circuit" || currentTable == "Contact"
        || currentTable == "routingMap" || currentTable == "randoMap"
        || (currentTable == "Home" && (isApp || isIpad))
        || currentTable == "Home"
        //&& !isMobileWeb
        )
	{
		launchItemsWithData();
	}
	else
	{
        log("@@@@@@ onDeviceReady -> getHomeTest");
        
		$.ajax(
			   {
			   url: ( (isApp) ? ipAdress : "" ) + 'API/getHomeTest.php',
			   success: 	function(data, textStatus, request)
               {
                    //log("data : " + data);
                    //log(request.getAllResponseHeaders());
                    launchItemsWithData(data);
               }
			   });
	}
}	


function launchItemsWithData(data)
{
    log("launchItemsWithData");
    
	if (currentTable == "Home")
	{
		homeClass = "itemHome";
	}
	else
	{
		homeClass = "item";
	}
    
    //********* DATA **********
	
	//log (data);
    
	setListItemsFromData(data);
    
    //************** DISPLAY **********
			
	if (currentTable == "Home")
	{
        if (!isAppScreen)
        {
            $("#itemListOptionsBtn").css("display", "none");
            
            animateOpacityWithType("activityHome", "fast", "in");
            animateOpacityWithType("cityHome", "fast", "in");
            animateOpacityWithType("transportHome", "slow", "in");
            animateOpacityWithType("timeHome", "slow", "in");
            
            //use to set the hover style
            resetActiveBtnWithArrayAndType(activityBtnArray, "");
            resetActiveBtnWithArrayAndType(cityBtnArray, "");
            resetActiveBtnWithArrayAndType(transportBtnArray, "");
            resetActiveBtnWithArrayAndType(timeBtnArray, "");
        }
				
		//************* URL TO RETRIEVE CATEFORY OR ITEMS **********************
		
		launchScenarioFromUrlValues();
	}
    else
    if (currentTable == "Circuit")
    {
        if (!isAppScreen)
            setMainSelectionItemsList('VieuxPortRD');
        else
        {
            $("#checkResultBtnHome").fadeIn(0);
            $("#checkResultBtnHome").html(commonLabel[currentLang].startVisit);
        }
    }
    else
    if (currentTable == "routingMap" || currentTable == "randoMap")
    {
        var lArg = currentTable == "randoMap" ? "IGN" : "";
        
        showMap(lArg);
        
        setTimeout(function(){
                   $("#mainMenu").fadeIn(1000);
                   }, 500);
    }
	else
	{
        if (isTablePracticalLink)
        {
            $("#itemListOptions").css("display", "inline-block");
            
            if (currentTable == "LocationVelo" || currentTable == "MoniteursEscalade" || currentTable == "MetroTram" || currentTable == "Parkings")
            {
                setItemListMenuBtnWithPosition(0);
            }
            else
            {
                if (isLikeMobile)
                    setNextResultForItemList();
                else
                    setItemList();
            }
            
            homeStatus = "List";
        }
        else
        if (currentTable == "PrivateSpace")
        {
            if (isLikeMobile)
                setNextResultForItemList();
            else
                setItemList();
            
            homeStatus = "List";
        }
        
        if (currentTable == "Home")
            $("#mainContainer").css("min-height", getYsize() - $("#mobileTitle2").outerHeight() + "px");
                
            
        $("#itemList").css("display", "inline-block");

	}
    
    
    //**************************** massif ********************************
    
    if (currentTable == "Home")
        getMassifsData();
    else
    if (currentTable == "Massifs")
        getMassifsData("Massifs");
    
    
    //************** SCROLL **********

    $("body").animate({scrollTop:1}, 0, 'linear', function()
                      {
                      
                          if (currentTable == "Home" && isAppScreen)
                            setSizeForMainSelectionItemTitle();
                      
                      var d = new Date();
                      mTimeLoad2 = d.getTime();
                      
                      //log("mTimeLoad2 : " + mTimeLoad2 + " / diff : " + (mTimeLoad2 - mTimeLoad1));
                      
                      var lTimeToWait = 200;
                      
                      if (isProd || isMobileTest)
                         //lTimeToWait = 3000 - (mTimeLoad2 - mTimeLoad1) + 1000;
                            lTimeToWait = 1000;
                      
                          setTimeout(function()
                          {
                             $("#splashScreen").fadeOut(1000, actionsWhenEverythingLaunched);
                          }
                          ,lTimeToWait);
                      
                      }
    );


    //************** MAIN MENU **********
    
    setTimeout(function() {

               if (isLikeMobile && !isRestrictedAndroid && !isIpad)
               {
                    $("#listMainMenu").css("height", (getYsize() - 30) + "px");
                    $("#listMainMenu").css("overflow", "scroll");
               }
               
               
               }, 500);
    

    //************** PERMANENT SCROLL **********
    
    /*
    if (isMobile)
    {
        $(window).scroll(function()
                     {
                         if (scrollTimer)
                         {
                            clearTimeout(scrollTimer);   // clear any previous pending timer
                         }
                     
                         scrollTimer = setTimeout(function()
                                                  {
                                                  if (window.pageYOffset == 0)
                                                  {
                                                    //alert("$(window).scroll");
                                                      $("body").animate({scrollTop:1}, 200, 'linear');
                                                  }                                                  
                                                  }
                                                  , 1000);
                     
                     });
    }
*/
    
    //************** ROLL OVER LINK HOME **********
    
    if (currentTable == "Home")
    {
        $('#linkHomeVieuxPortRD').prepend('<span class="linkHome corner"></span>');
        
        $('#linkHomeVieuxPortRD').mouseenter(function(e) {
                                                  $(this).children('span').fadeIn(400);
                                                  }).mouseleave(function(e) {
                                                                $(this).children('span').fadeOut(300);
          
                                                                
        });
    }
    
    //******************** UPDATE NEW VERSION ***************

    
    if (currentTable == "Home" || currentTable == "Contact")
        checkUpdate();
    
    //*******************************************************
    
    log("Everything fine at launch");
}


function setListItemsFromData(data)
{
    //clearLocalStorage();
	//getLocalStorage();
    
    if (isTablePracticalLink)
	{
        if (currentTable == "Hebergements")
        {
            listItems = listItemsHotels.concat(listItemsChambreHote, listItemsLocationDeVacancesClassees, listItemsResidencesDeTourisme, listItemsResidencesHoteliere);
            
            listItems = listItems.sort(function() {return 0.5 - Math.random()});
        }
        else
        {
            listItems = window["listItems" + currentTable];
            
            putMyItemsInFirst();
        }
        
        if (currentTable == "Massifs")
        {
            listItems.sort(function (a,b) { return (parseInt(a.position) <= parseInt(b.position) ? -1 : 1)});
        }
	}
	else
    if (currentTable == "PrivateSpace")
    {
        if(typeof(Storage) !== "undefined")
        {
            if (localStorage.favoritesItems == undefined)
                favoritesItemsArray = [];
            else
                favoritesItemsArray = jQuery.parseJSON(localStorage.favoritesItems);
        }
        
        for (var f = 0; f < favoritesItemsArray.length; f++)
        {
            if (favoritesItemsArray[f] != -1)
                listItems.push(favoritesItemsArray[f]);
        }
    }
    else
    if (currentTable == "Contact")
    {
        $("#address").html('<a href="mailto:contact@marseilleprovence.net">contact@marseilleprovence.net</a>');
    }
    else
    {
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.text = data;
        document.getElementsByTagName("head")[0].appendChild(s);
        
        //********************** complete listItems with localStorage from update ******************
        
        if (localStorage.itemsToPush && localStorage.itemsToPush != "false")
        {
            var lItemArray = jQuery.parseJSON(localStorage.itemsToPush);
            
            for (var i = 0; i < lItemArray.length; i++)
            {
                // because updated item can alreay been in listItem
                removeItemFromDataList(lItemArray[i].idRepName, lItemArray[i].table);
                
                window["listItems" + lItemArray[i].table].push(lItemArray[i]);
            }
            
            //log(listItemsMonuments);
        }
    }
}


function actionsWhenEverythingLaunched()
{
    if (isMobile)
        removeLoadingAnimation();
    
    if (!localStorage.startApp)
    {
        setTimeout(function(){
                   
                   if (isLittleModalPopUp)
                        showLittleModalPopUp();
                   
                   showLittleModalPopUp("startApp");
                   
                   }, 500);
    }
    
    if (isApp)
    {
        if (isAndroid && currentTable == "Home")
            navigator.splashscreen.hide();
        
        if (currentTable == "PrivateSpace")
        {
            setTimeout(function(){
                       if ((localStorage.tipFavorite == undefined || localStorage.tipFavorite == "false") && listItems.length > 0)
                       showLittleModalPopUp("tipFavorite");
                       }, 500);
        }
        else
        if (localStorage.startApp == "ok")
            setTimeout(checkHomePopUp, 1000);
            
        
        if (currentTable == "LocationVelo" || currentTable == "Massifs")
            testConnectionForPopUp();
    }

}


function launchScenarioFromUrlValues()
{
    // currentCity is a number because use to set time from data
    
    var urlPart = window.location.href.toString().split("#");
    
    if (urlPart[1] != undefined && urlPart[1] != "")
    {
        var urlArray = urlPart[1].split("&");
        
        var tempCurrentActivity = -1;
        var tempCurrentCity = -1;
        var tempIdRepName = -1;
        
        if (urlArray[1] != undefined)
        {
            if (activityBtnArray.indexOf(urlArray[1]) != -1)
                tempCurrentActivity = urlArray[1];
            else
				if (cityBtnArray.indexOf(urlArray[1]) != -1)
					tempCurrentCity = cityBtnArray.indexOf(urlArray[1]);
				else
					tempIdRepName = urlArray[1];
            
            //log ("url1 : " + urlArray[1]);
        }
        
        if (urlArray[2] != undefined && (urlArray[2] != "Geoloc" && urlArray[2] != "ChoosePosition"))
        {
            if (activityBtnArray.indexOf(urlArray[2]) != -1)
                tempCurrentActivity = urlArray[2];
            else
				if (cityBtnArray.indexOf(urlArray[2]) != -1)
					tempCurrentCity = cityBtnArray.indexOf(urlArray[2]);
				else
					tempIdRepName = urlArray[2];
            
            //log ("url2 : " + urlArray[2]);
        }
        
        if (urlArray[3] != undefined)
        {
            tempIdRepName = urlArray[3];
            
            //log ("url3 : " + urlArray[3]);
        }
    }
    
    
    //************* ACTIONS **********************
    
    if (tempCurrentActivity != -1)
    {
        if (tempCurrentCity != -1)
            currentCity = tempCurrentCity;
        
        setMainSelectionItemsList(tempCurrentActivity);
    }
    else
        if (tempCurrentActivity == -1 && tempCurrentCity != -1)
		{
			setMainSelectionItemsList(cityBtnArray[tempCurrentCity]);
		}
		else
            window.location.href = urlPart[0] + "#" + currentLang;
    
    
    if (tempIdRepName != -1)
    {
        $("#leftHomeSelectionBlock").css("display", "none");
        $("#itemList").css("display", "none");
        
        for (var i = 0; i < listItems.length; i++)
        {
            if (tempIdRepName == listItems[i].idRepName)
                currentItemDetail = i;
        }
        
        showDetail(currentItemDetail);
    }
}



function setContainerHomeForBtnAtBottom()
{
    if (currentTable == "Home" && isMobile
		&& !isRestrictedAndroid
        && getYsizeForHomeBtn() < ($("#mobileTitle2").height() + $("#bgImage").height() + $("#leftHomeSelectionBlock").height()))
    {
        isOnModeHomeBtnAtBottom = true;
        
        var lHtml = '<div id="containerHome" style="width:100%; height:' + (getYsizeForHomeBtn() - 60) + 'px; overflow:scroll; margin-top:-4px; position:relative; left:0px; display:inline-block;">' +
        //'<div id="scollContainerHome"  style="width:100%; height:' + (getYsizeForHomeBtn() - $("#mobileTitle2").height()) + 'px; overflow: scroll; display:inline-block;">' +
        //'</div>' +
        '</div>';
        
        $(lHtml).insertBefore("#bgImage");
        
        $("#containerHome").append($("#bgImage"));
        $("#containerHome").append($("#leftHomeSelectionBlock"));
        $("#leftHomeSelectionBlock").append($('<div style="display:inline-block; width:100%; height:15px;"></div>'));
        
        if (homeStatus == "List" || homeStatus == "Detail")
            $("#containerHome").css('display', 'none');
    }
}



function animateOpacityWithType (_type, _speed, inOrOut)
{
	if (inOrOut == "in")
	{
		$("#" + _type).animate({ opacity: 1.0 }, _speed);  
		$("#" + _type + "Items").animate({ opacity: 1.0 }, _speed);
	}
	else
	{
		$("#" + _type).animate({ opacity: 0.0 }, _speed);  
		$("#" + _type + "Items").animate({ opacity: 0.0 }, _speed);
	}
	  
	/*
	$("#" + _type).hover(function ()
						 {
						 if ($("#" + _type + "Items").css('opacity') == "0")
						 {
							$("#" + _type + "Items").animate({ opacity: 1.0 }, _speed);  
						 }						 
						 
						 }); 
	 */
}


function resetActiveBtnWithArrayAndType(_array, _type)
{
    var lBgSelectedColor = isLikeMobile ? "bgWhiteToGrayLight" : "bgGrayLightToGray";
    
    var lBgColor;
    
    switch (_array)
    {
        case activityBtnArray :     lBgColor = "bgMP2013Gradient"; break;
        case cityBtnArray :         lBgColor = "bgRestaurantsGradient"; break;
        case transportBtnArray :    lBgColor = "bgHotelsGradient"; break;
        case timeBtnArray :         lBgColor = "bgServicesGradient"; break;
    }
    
    
	for (var t = 0; t < _array.length; t++)
	{
		if (_array[t] == _type)
		{
            if (!isMobile)
            {
                $('#' + _array[t] +  'Btn').removeClass(lBgColor);
                $('#' + _array[t] +  'Btn').removeClass(lBgSelectedColor);
                $('#' + _array[t] +  'Btn').addClass(lBgSelectedColor);
                
                $("#" + _array[t] + "Btn").mouseenter(function(){
                                                      $(this).removeClass(lBgColor);
                                                      $(this).removeClass(lBgSelectedColor);
                                                      $(this).addClass(lBgSelectedColor);
                                                      }).mouseleave(function(){
                                                                    $(this).removeClass(lBgColor);
                                                                    $(this).removeClass(lBgSelectedColor);
                                                                    $(this).addClass(lBgSelectedColor);
                                                                    });
            }
            else
            {
                $('#' + _array[t] +  'BtnMobile').removeClass(lBgColor);
                $('#' + _array[t] +  'BtnMobile').removeClass(lBgSelectedColor);
                $('#' + _array[t] +  'BtnMobile').addClass(lBgSelectedColor);
            }
			 
		}
		else
		{
            if (!isMobile)
            {
                $('#' + _array[t] +  'Btn').removeClass(lBgColor);
                $('#' + _array[t] +  'Btn').removeClass(lBgSelectedColor);
                $('#' + _array[t] +  'Btn').addClass(lBgColor);
                
                $("#" + _array[t] + "Btn").mouseenter(function(){
                                                      $(this).removeClass(lBgColor);
                                                      $(this).addClass(lBgSelectedColor);
                                                      }).mouseleave(function(){
                                                                    $(this).removeClass(lBgSelectedColor);
                                                                    $(this).addClass(lBgColor);
                                                                    });
            }
            else
            {
                $('#' + _array[t] +  'BtnMobile').removeClass(lBgColor);
                $('#' + _array[t] +  'BtnMobile').removeClass(lBgSelectedColor);
                $('#' + _array[t] +  'BtnMobile').addClass(lBgColor);
            }
		}
	}
}


function resetDisabledBtnWithArrayAndType(_array)
{
    var lBgSelectedColor = "bgGrayLightToGray";
    
    var lBgColor;
    
    switch (_array)
    {
        case activityBtnArray :     lBgColor = "bgMP2013Gradient"; break;
        case cityBtnArray :         lBgColor = "bgRestaurantsGradient"; break;
        case transportBtnArray :    lBgColor = "bgHotelsGradient"; break;
        case timeBtnArray :         lBgColor = "bgServicesGradient"; break;
    }
    
    
	for (var t = 0; t < _array.length; t++)
	{
        if (!isLikeMobile)
        {
            $('#' + _array[t] +  'Btn').removeClass(lBgColor);
            $('#' + _array[t] +  'Btn').removeClass(lBgSelectedColor);
            $('#' + _array[t] +  'Btn').addClass(lBgColor);
        }
        else
        {
            $('#' + _array[t] +  'BtnMobile').removeClass(lBgColor);
            $('#' + _array[t] +  'BtnMobile').removeClass(lBgSelectedColor);
            $('#' + _array[t] +  'BtnMobile').addClass(lBgColor);
        }
	}

    
}


function testIfPrevSelectionIsActiveWithArray (_array)
{
	for (var t = 0; t < _array.length; t++)
	{
		//log("background-color" + $("#" + _array[t] + "Btn").css('background-color'));
		
		if($("#" + _array[t] + "Btn").css('background-color') == "rgb(0, 0, 0)")
		{
			return true;
		}
	}
	
	return true;
}


function footTimeComparator (a,b)
{
	return (parseInt((a.pied.split(", "))[currentCity]) <= parseInt((b.pied.split(", "))[currentCity])) ? -1 : 1;
}



function testTimeOutSpatialiteDb()
{
    log("testTimeOutSpatialiteDb -> fullSpatialiteDb : " + fullSpatialiteDb);
    
    if (isIOS && (!smallSpatialiteDb || (localStorage.isFullSQLiteForSpatialiteInstalled == "true" && !fullSpatialiteDb)))
    {
        setTimeout(testTimeOutSpatialiteDb, 500);
    }
    else
    {
        var lNodeNetWork;
        
        if (currentTransport == "pied" || currentTransport == "velo")
            lNodeNetWork = 'walks_nodes';
        else
            lNodeNetWork = 'roads_nodes';
        
        
        nodeFrom = null;
        
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        getCloserNodeFromSpatialDb(lNodeNetWork, lUserPosition.latitude, lUserPosition.longitude, 'nodeFrom');
        

        //******************* php spatialite **************
        
        if (spatialiteToPhp)
        {
            for (var i = 0; i < tempBaseActivityItemsList.length; i++)
            {
                var lLat;
                var lLon;
                
                if (tempBaseActivityItemsList[i].latitudeRouting != null)
                {
                    lLat = tempBaseActivityItemsList[i].latitudeRouting;
                    lLon = tempBaseActivityItemsList[i].longitudeRouting;
                }
                else
                {
                    lLat = tempBaseActivityItemsList[i].latitude;
                    lLon = tempBaseActivityItemsList[i].longitude;
                }
                
                getCloserNodeFromSpatialDb(lNodeNetWork, parseFloat(lLat), parseFloat(lLon), i);
            }
        }

      
        testTimeOutGetCloserNode(lNodeNetWork);
    }
}


function testTimeOutGetCloserNode(_nodeNetWork)
{
    var suffix;
    
    //******************* php spatialite **************
    
    var lNode;
    
    if (spatialiteToPhp)
    {
        suffix = getSuffixForRightDb(tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1]);
        
        lNode = _nodeNetWork == 'roads_nodes' ? tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1][suffix + 'NodeCar'] : tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1][suffix + 'NodeWalk'];
    }
    else
       lNode = nodeFrom;
    
    
    if (!lNode)
    {
        setTimeout(function(){testTimeOutGetCloserNode(_nodeNetWork)}, 500);
    }
    else
    {
        log("testTimeOutGetCloserNode -> nodeFrom : " + nodeFrom + " | previousNodeFrom : " + previousNodeFrom);
        
        var lSpatialNetWork;
        
        var lCostType;
        
        if (currentTransport == "pied" || currentTransport == "velo")
        {
            lSpatialNetWork = 'roads_walk';
            lCostType = 'costWalk';
        }
        else
        {
            lSpatialNetWork = 'roads_car';
            lCostType = 'costCar';
        }
        
        var lCost = tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1][lCostType];
        
        if (!lCost || previousNodeFrom != nodeFrom)
        {
            log("testTimeOutGetCloserNode -> tempBaseActivityItemsList.length : " + tempBaseActivityItemsList.length);
            
            setTimeout(function(){
            
                for (var l = 0; l < tempBaseActivityItemsList.length; l++)
                {
                    suffix = getSuffixForRightDb(tempBaseActivityItemsList[l]);
                    
                    lNode = lSpatialNetWork == 'roads_walk' ? tempBaseActivityItemsList[l][suffix + 'NodeWalk'] : tempBaseActivityItemsList[l][suffix + 'NodeCar'];
                    
                    log("testTimeOutGetCloserNode -> lNode : " + lNode);
                    
                    if (lNode == null)
                        lNode = -1;
                    
                    getCostForSpatialDbRouting(lSpatialNetWork, nodeFrom, lNode, l);
                }
                       
            }, 500);
        }
        
        testTimeOutCostRouting(lCostType);
    }
}


function testTimeOutCostRouting(_costType)
{
    log("testTimeOutCostRouting -> tempBaseActivityItemsList : ");
    log(tempBaseActivityItemsList);
    
    var lCost = tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1][_costType];
    
    log("testTimeOutCostRouting -> lCost : " + JSON.stringify(lCost));
    
    if (!lCost)
    {
        setTimeout(function(){testTimeOutCostRouting(_costType)}, 500);
    }
    else
    {
        log("testTimeOutCostRouting -> cost : " + tempBaseActivityItemsList[tempBaseActivityItemsList.length - 1][_costType]);
        
        log("testTimeOutCostRouting -> item : " + JSON.stringify(tempBaseActivityItemsList[0]));
        
        previousNodeFrom = nodeFrom;
        
        isCellShowTime = true;
        filterListItemsByTransport(_costType);
        
        removeLoadingAnimation();
        
        setTimeout(function(){
                   
                   if (isLittleModalPopUp)
                        showLittleModalPopUp();
                   
                   setListItemAndScrollBar();
                   
                   
                   }, 500);
            
    }
}


function setMainSelectionForGeolocOrChoosePosition(_type)
{
    log("setMainSelectionForGeolocOrChoosePosition 1 -> currentCity : " + currentCity + " / currentTransport : " + currentTransport + " currentTime : " + currentTime);
    
    if (_type != "bus")
    {
        //********************** data **************************
        
        var lList;
        
        if(currentActivity == "NoIdea")
            lList = getFullConcatListItems();
        else
            lList = window["listItems" + currentActivity];
        
        
        tempBaseActivityItemsList = [];
        
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        tempBaseActivityItemsList = getArrayForCloseItemsFromList(lList, lUserPosition);
        
        
        //*********************** transport or time ********************
        
        if (transportBtnArray.indexOf(_type) != -1)
        {
            if (_type == currentTransport)
            {
                currentTransport = -1;
                currentTime = -1;
                resetActiveBtnWithArrayAndType(timeBtnArray, "");
                resetActiveBtnWithArrayAndType(transportBtnArray, "");
                
                isCellShowTime = false;
                listItems = tempBaseActivityItemsList;
                setListItemAndScrollBar();
                
                return -1;
            }
            else
            {
                currentTransport = _type;
                resetActiveBtnWithArrayAndType(transportBtnArray, _type);
            }
        }
        
        if (timeBtnArray.indexOf(_type) != -1)
        {
            if (_type == currentTime)
            {
                currentTime = -1;
                currentTransport = -1;
                resetActiveBtnWithArrayAndType(transportBtnArray, "");
                resetActiveBtnWithArrayAndType(timeBtnArray, "");
                
                isCellShowTime = false;
                listItems = tempBaseActivityItemsList;
                setListItemAndScrollBar();
                
                return -1;
            }
            else
            {
                currentTime = _type;
                resetActiveBtnWithArrayAndType(timeBtnArray, _type);
            }
        }
        
        //********************** var & animation ***********************
        
        
        if (currentTransport == -1)
        {
            currentTransport = "pied";
            resetActiveBtnWithArrayAndType(transportBtnArray, currentTransport);
        }
        
        if (currentTime == -1)
        {
            currentTime = kDefaultCurrentTime;
            resetActiveBtnWithArrayAndType(timeBtnArray, currentTime);
        }
        
        if (isModalPopUp)
            showModalPopUp();
        
        
        //******************* spatial request already done ******************
        
        
        if ((currentTransport == "pied" || currentTransport == "velo")
            && tempBaseActivityItemsList.length > 0 && tempBaseActivityItemsList[0].costWalk)
        {
            var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
            
            if (isNetWorkAvalaible)
            {
                isCellShowTime = true;
                filterListItemsByTransport('costWalk');
                setListItemAndScrollBar();
            }
            else
                if (isApp && !isRestrictedAndroid && currentActivity != "NoIdea"
                    && (localStorage.isFullSQLiteForSpatialiteInstalled && localStorage.isFullSQLiteForSpatialiteInstalled == "true")
                    && getInsideBound(boundBoxMarseille_10_12, lUserPosition.latitude, lUserPosition.longitude, 0))
                {
                    testTimeOutSpatialiteDb();
                }
            
            return -1;
        }
        
        if ((currentTransport == "moto" || currentTransport == "auto")
            && tempBaseActivityItemsList.length > 0 && tempBaseActivityItemsList[0].costCar)
        {
            var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
            
            if (isNetWorkAvalaible)
            {
                isCellShowTime = true;
                filterListItemsByTransport('costCar');
                setListItemAndScrollBar();
            }
            else
            if (isApp && !isRestrictedAndroid && currentActivity != "NoIdea"
                && (localStorage.isFullSQLiteForSpatialiteInstalled && localStorage.isFullSQLiteForSpatialiteInstalled == "true")
                && getInsideBound(boundBoxMarseille_10_12, lUserPosition.latitude, lUserPosition.longitude, 0))
            {
                testTimeOutSpatialiteDb();
            }
            
            return -1;
        }

        
        //*****************************************************

        
        log("setMainSelectionForGeolocOrChoosePosition 2 -> cityBtnArray[currentCity] : " + cityBtnArray[currentCity] + " / currentTransport : " + currentTransport + " currentTime : " + currentTime);
        
        //log("setMainSelectionForGeolocOrChoosePosition -> localStorage.isFullSQLiteForSpatialiteInstalled : " + localStorage.isFullSQLiteForSpatialiteInstalled);
        
        log("++++++++++++ setMainSelectionForGeolocOrChoosePosition 3 -> userChoosePosition : " + JSON.stringify(userChoosePosition) + " / userLocation : " + JSON.stringify(userLocation));
        
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        
        if (isNetWorkAvalaible && !spatialiteToPhp)
        {
            if (isGoogleMapAPIalreadyLaunched == false)
            {
                setGoogleMapAPI();
            }
            else
            {
                launchDistanceMatrixServiceRequest();
            }
        }
        else
        if (isApp && !isRestrictedAndroid && (currentActivity != "NoIdea" || spatialiteToPhp)
            && (localStorage.isFullSQLiteForSpatialiteInstalled && localStorage.isFullSQLiteForSpatialiteInstalled == "true")
            && getInsideBound(boundBoxMarseille_10_12, lUserPosition.latitude, lUserPosition.longitude, 0))
        {
            
            if (isIOS)
            {
                openSpatialDb();
                
                showLittleModalPopUp("progressBar", commonLabel[currentLang].loader, "noCancelBtn");
            }
            else
                setLoadingAnimation(0.5);
                
            
            testTimeOutSpatialiteDb();
        }
    }
    else
        showLittleModalPopUp();
}


function clearItemList()
{
    $("#itemList").html('');
	listItems = [];
    indexItemList = 0;
    lastIndexItemList = 0;
    $("#itemListOptions").css("display", "none");
    $("#itemListBottomBtn").css("display", "none");
    $("#searchForm").val(commonLabel[currentLang].Research + "...");
}


function setMainSelectionItemsList(_type, _arg)
{	
	log("setMainSelectionItemsList / _type : " + _type);
    
    /******************** bus exception ***********************/
    
    if (_type == "bus" && (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition"))
    {
        if (!_arg)
        {
            if (isModalPopUp)
                showModalPopUp();
        
            showLittleModalPopUp("busOnGeoloc");
        }
        else
        {
            if (isLittleModalPopUp)
                showLittleModalPopUp();
            
            currentTransport = "bus";
            
            if (currentTime == -1)
                currentTime = kDefaultCurrentTime;
            
            setMainSelectionItemsList(_arg);
            
            setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
        }
        
        return;
    }
    
     /******************** init ***********************/
    
    if (isLikeMobile && homeStatus == "List")
        setLoadingAnimation(0);
    
    /******************** :: important :: clear ::***********************/
    
    clearItemList();
    
    if ((cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition") && cityBtnArray.indexOf(_type) != -1)
        resetItemListRouting();
    
    if (isTrierOptionsOpened || isTrierOptionsActivated)
        resetTrierOptions();
    
    /************************************ GEOLOC & ChoosePosition *******************************************/
    
    if ((cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
        && (transportBtnArray.indexOf(_type) != -1 || timeBtnArray.indexOf(_type) != -1))
    {
        setMainSelectionForGeolocOrChoosePosition(_type);
        return;
    }
	
	/************************************ ACTIVITY *******************************************/
	
	if (activityBtnArray.indexOf(_type) != -1 || _type == "VieuxPortRD")
	{
		if (currentActivity != -1 && currentActivity == _type)
		{
			currentActivity = -1;
            
            if (isLikeMobile)
                removeLoadingAnimation();
            
			//resetActiveBtnWithArrayAndType(activityBtnArray, "");

			if (currentCity != -1)
			{
                if (cityBtnArray[currentCity] == "Geoloc")
                {
                    getLocationForMainSelectionList('retry');
                    return;
                }
                else
                {
                    lTempCity = currentCity;
                    currentCity = -1;
                    setMainSelectionItemsList(cityBtnArray[lTempCity]);
                    return;
                }
			}
		}
		else
		{
			currentActivity = _type;
            
			setBaseActivityItemsList(_type);
            
            //*****************************
			
			if (currentCity != -1)
			{
				if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
				{
                    var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
					listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
					
                    currentTransport = -1;
					//resetActiveBtnWithArrayAndType(transportBtnArray, "");
                    
                    currentTime = -1;
					//resetActiveBtnWithArrayAndType(timeBtnArray, "");
					
					isCellShowTime = false;
					
				}
				else
				{
                    listItems = getArrayForCloseItemsFromList(baseActivityItemsList, cityGeoLoc[cityBtnArray[currentCity]]);
					
					if (currentTransport != -1)
					{
						setAndOrderListItems();
						
						isCellShowTime = true;
					}
					else
					{
						isCellShowTime = false;
					}
				}
				
				//resetActiveBtnWithArrayAndType(cityBtnArray, cityBtnArray[currentCity]);
			}
			else
			{
                
                if (currentActivity != "VieuxPortRD")
					listItems = baseActivityItemsList.sort(function() {return 0.5 - Math.random()});
                    //listItems = baseActivityItemsList.reverse();
				else
					listItems = baseActivityItemsList;
                
                if (currentTransport == -1)
                {
                    isCellShowTime = false;
                }
				else
                {
                    currentCity = 0;
                    //resetActiveBtnWithArrayAndType(cityBtnArray, cityBtnArray[0]);
                    setAndOrderListItems();
                }
			}
			
			//resetActiveBtnWithArrayAndType(activityBtnArray, _type);
		}
	}
	
	/************************************ CITY *******************************************/
	
	if (_type == "Marseille" || _type == "Aix" || _type == "Arles" || _type == "Geoloc" || _type == "ChoosePosition")
	{
        //************************
        
        if (cityBtnArray[currentCity] == "ChoosePosition")
            userChoosePosition = null;
        
        if (cityBtnArray[currentCity] == "Geoloc")
            userLocation = null;
        
        //************************
        
		if (currentCity != -1 && cityBtnArray[currentCity] == _type)
		{
			currentCity = -1;
			currentTransport = -1;
            
            if (isAppScreen)
                currentTime = -1;
			
			resetActiveBtnWithArrayAndType(cityBtnArray, "");
			resetActiveBtnWithArrayAndType(transportBtnArray, "");
			resetActiveBtnWithArrayAndType(timeBtnArray, "");
			
			if (currentActivity != -1)
			{
				listItems = baseActivityItemsList;
                listItems = baseActivityItemsList.sort(function() {return 0.5 - Math.random()});
                
				isCellShowTime = false;
			}
		}
		else
		{
			currentCity = _type;
			
			//use to set the hover style
			resetActiveBtnWithArrayAndType(cityBtnArray, _type);
			
			switch (_type)
			{
				case "Marseille":       currentCity = 0; break;
				case "Aix":             currentCity = 1; break;
				case "Arles":           currentCity = 2; break;
                case "Geoloc":          currentCity = 3; break;
                case "ChoosePosition":  currentCity = 4; break;
			}
            
            if (currentActivity == -1)
            {
                currentActivity = "NoIdea";
                resetActiveBtnWithArrayAndType(activityBtnArray, currentActivity);
                
                baseActivityItemsList = getFullConcatListItems();
            }
			         
			if (_type == "Geoloc" || _type == "ChoosePosition")
			{
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
				listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);

				isCellShowTime = false;
                
                currentTransport = -1;
                
                if (isAppScreen)
                    currentTime = -1;
                
                resetActiveBtnWithArrayAndType(transportBtnArray, "");
                resetActiveBtnWithArrayAndType(timeBtnArray, "");
			}
			else
			{
				if (currentTransport != -1)
				{
                    setAndOrderListItems();
					
					isCellShowTime = true;
				}
				else
				{
                    filtrerListParVille();
                    
					isCellShowTime = false;
				}
			}
		}
	}
	
	/************************************ LEVEL 3 *******************************************/

	
	if (_type == "pied" || _type == "velo" || _type == "moto" || _type == "auto" || _type == "bus")
	{
        if (currentTransport != -1 && currentTransport == _type)
		{
            currentTransport = -1;
            currentTime = -1;
            
            resetActiveBtnWithArrayAndType(transportBtnArray, "");
            resetActiveBtnWithArrayAndType(timeBtnArray, "");
            
            isCellShowTime = false;
            
            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
			{
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
				listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
			}
			else
			{
                filtrerListParVille();
            }
        }
        else
        {
            currentTransport = _type;
            
            resetActiveBtnWithArrayAndType(transportBtnArray, _type);
            
            resetActiveBtnWithArrayAndType(timeBtnArray, currentTime);
            
            if(currentActivity == -1)
            {
                currentActivity = "NoIdea";
                resetActiveBtnWithArrayAndType(activityBtnArray, currentActivity);
                
                baseActivityItemsList = getFullConcatListItems();
            }
            
            if(currentCity == -1)
            {
                currentCity = 0;
                resetActiveBtnWithArrayAndType(cityBtnArray, cityBtnArray[0]);
            }
            
            if (currentTime == -1)
            {
                currentTime = kDefaultCurrentTime;
                resetActiveBtnWithArrayAndType(timeBtnArray, currentTime);
            }
            
            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
			{
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
				listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
			}
			else
			{
                listItems = getArrayForCloseItemsFromList(baseActivityItemsList, cityGeoLoc[cityBtnArray[currentCity]]);
            }
            
            isCellShowTime = true;

            if (cityBtnArray[currentCity] != "Geoloc" && cityBtnArray[currentCity] != "ChoosePosition")
                setAndOrderListItems();
        }
	}
	
	
	/************************************ LEVEL 4 *******************************************/
	
	
	if (_type == "60" || _type == "120" || _type == "240" || _type == "18000")
	{
        if (currentTime != -1 && currentTime == _type)
		{
            currentTransport = -1;
            currentTime = -1;
            
            resetActiveBtnWithArrayAndType(transportBtnArray, "");
            resetActiveBtnWithArrayAndType(timeBtnArray, "");
            
            isCellShowTime = false;
            
            log("setMainSelectionItemsList -> baseActivityItemsList : " + baseActivityItemsList.length);

            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
			{
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
				listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
			}
			else
			{
                filtrerListParVille();
            }
        }
        else
        {
            currentTime = _type;
            
            if(currentActivity == -1)
            {
                currentActivity = "NoIdea";
                resetActiveBtnWithArrayAndType(activityBtnArray, currentActivity);
                
                baseActivityItemsList = getFullConcatListItems();
            }
            
            if(currentCity == -1)
            {
                currentCity = 0;
                resetActiveBtnWithArrayAndType(cityBtnArray, cityBtnArray[0]);
            }
            
            if (currentTransport == -1)
            {
                currentTransport = "bus";
                resetActiveBtnWithArrayAndType(transportBtnArray, currentTransport);
            }
            
            resetActiveBtnWithArrayAndType(timeBtnArray, _type);
            
            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
			{
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
				listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
			}
			else
			{
                listItems = getArrayForCloseItemsFromList(baseActivityItemsList, cityGeoLoc[cityBtnArray[currentCity]]);
            }
            
            isCellShowTime = true;
            
            setAndOrderListItems();
        }
	}
    
    
    //**************** orderMyItemsFromUpdate *************
    
    if (currentTransport == -1 && localStorage.orderItemsArray)
    {
        var orderItemsArray = jQuery.parseJSON(localStorage.orderItemsArray);
        
        //log("setAndOrderListItems -> orderItemsArray : " + JSON.stringify(orderItemsArray));
        
        for (var prop in orderItemsArray)
        {
            if (orderItemsArray.hasOwnProperty(prop) && prop == currentActivity && orderItemsArray[prop].length > 0)
            {
                orderMyItemsFromUpdate(prop, orderItemsArray[prop]);
            }
        }
    }
    
    //log("setMainSelectionItemsList -> listItems : " + JSON.stringify(listItems));
    
    //************** RESULTS *****************
    
	setListItemAndScrollBar();
    
    currentActivityItemList = listItems;
}


function setListItemAndScrollBar()
{
    log("setListItemAndScrollBar -> setListItemAndScrollBar -> listItems.length : " + listItems.length);
    
	if ((isLikeMobile == false && (currentActivity != -1 || currentCity != -1)) || currentTable == "Circuit")
	{	
		setItemList();

		$("#showMapBtn").fadeIn(100);

		$("#itemList").fadeIn(200);
		homeStatus = "List";
		
        if (listItems.length > 0)
            $("#itemListOptions").fadeIn(0);
        else
            $("#itemListOptions").fadeOut(0);
	}
	
    
    //************** MOBILE *****************
    
    if (isLikeMobile)
    {
        if (isAppScreen)
        {
            setTextForMainSelectionItemTitle();
            
            setTimeout(function(){
                       setSizeForMainSelectionItemTitle();
                       }, 50);
            
            if (isModalPopUp)
            {
                showModalPopUp();
            }
            
            setTimeout(function(){
                       
                       if (currentTable == "Circuit"
                           || (homeStatus == "Home" && isMobileWeb)
                           )
                       {
                            showResultsHome();
                       }
                       else if (homeStatus == "List")
                       {
                            setNextResultForItemList();
                            $("#itemListOptions").css("display", "inline-block");
                       }
                       else
                       if (currentTable == "Home" && listItems.length == 0)
                       {
                           var text = noResultsLabel[currentLang] + "<br><br>" + noTimeTransportLabel[currentLang].modifyCriteria;
                       
                            showLittleModalPopUp(null, text, null);
                       }
                       
                       }, 1000);
        }
        else
        {
            if (currentActivity != -1 || currentCity != -1)
            {
                $("#checkResultBtnHome").fadeIn(500);
            }
        }
    }

    //**************************************************************
    
    if (currentTable != "Circuit")
        setHomeBgImage(currentActivity);
	
    //if (!isMobile)
    {
        var lActivity = currentActivity != -1 ? "&" + currentActivity : "";
        var lCity = currentCity != -1 ? "&" + cityBtnArray [currentCity] : "";			
        window.location.href = window.location.href.toString().split("#")[0] + "#" + currentLang + lActivity + lCity;
    }
    
    setTitleAndMetaInHead2();
}


function setAndOrderListItems ()
{
    listItems = filtrerListParTranche(baseActivityItemsList);
    
    tempArrayForSearchList = listItems;
}


function filtrerListParTranche (_listItems)
{
    var lTempArray = [];
    var lTempArrayHigh = [];
    var lTempArrayLow = [];
    
    var lLimitTime;
    

    switch (parseInt(currentTime))
    {
        case 60 :     lLimitTime = 0; break;
        case 120 :    lLimitTime = 60; break;
        case 240 :    lLimitTime = 110; break;
        case 18000 :  lLimitTime = 240; break;
    }
    
    log("filtrerListParTranche -> currentTime : " + currentTime);
    log("filtrerListParTranche -> lLimitTime : " + lLimitTime);
    
    for (var n = 0; n < _listItems.length; n++)
    {
        if(_listItems[n][currentTransport] == undefined)
            continue;
        
        var lTemp2Array = _listItems[n][currentTransport].split(", ");
        
        //log(baseActivityItemsList[n]);
        
        var lDuration = setDurationForItemTransport(_listItems[n]);
        
        //log("filtrerListParTranche -> idRepName : " + _listItems[n].idRepName + " / lDuration : " + lDuration)
        
        if (parseInt(lTemp2Array[currentCity])*2 + lDuration <= parseInt(currentTime))
        {
            if (parseInt(lTemp2Array[currentCity])*2 + lDuration > lLimitTime)
            {
                lTempArrayHigh.push(_listItems[n]);
            }
            else
            {
                lTempArrayLow.push(_listItems[n]);
            }
        } 
    }
    
    
    lTempArrayHigh = lTempArrayHigh.sort(function() {return 0.5 - Math.random()});
    
    //log("filtrerListParTranche -> lTempArrayHigh : " + lTempArrayHigh.length);
    
    lTempArrayLow = lTempArrayLow.sort(function (a,b) { return (parseInt((a[currentTransport].split(", "))[currentCity]) <= parseInt((b[currentTransport].split(", "))[currentCity])) ? -1 : 1;});
    
    //log("filtrerListParTranche -> lTempArrayLow : " + lTempArrayLow.length);
    
    lTempArray = lTempArrayHigh.concat(lTempArrayLow);
    

    if (lTempArrayHigh.length == 0)
    {
        lTempArray.reverse();
    }

    
    return lTempArray;
}


function filtrerListParVille()
{
    var lArrayInCity = [];
    var lArrayOutCity = [];
    
    for (var n = 0; n < baseActivityItemsList.length; n++)
    {
        if (baseActivityItemsList[n].city.indexOf(cityBtnArray[currentCity]) != -1)
            lArrayInCity.push(baseActivityItemsList[n]);
        else
            lArrayOutCity.push(baseActivityItemsList[n]);
    }
    
    lArrayInCity = lArrayInCity.sort(function() {return 0.5 - Math.random()});
    
    listItems = lArrayInCity.concat(getArrayForCloseItemsFromList(lArrayOutCity, cityGeoLoc[cityBtnArray[currentCity]]));
}


function filterListItemsByTransport(_costType)
{
    var tempList = [];
    var lTempArrayHigh = [];
    var lTempArrayLow = [];
    
    var tempNullList = [];
    
    log("filterListItemsByTransport -> tempBaseActivityItemsList");
    log(tempBaseActivityItemsList);
    
    tempBaseActivityItemsList = tempBaseActivityItemsList.sort(function (a,b) { return parseInt(a[_costType]) <= parseInt(b[_costType]) ? -1 : 1;});
    
    var lLimitTime;
    
    switch (currentTime)
    {
        case "60" :     lLimitTime = 0; break;
        case "120" :    lLimitTime = 60; break;
        case "240" :    lLimitTime = 110; break;
        case "18000" :  lLimitTime = 240; break;
    }
    
    for (var i = 0; i < tempBaseActivityItemsList.length; i++)
    {
        //log("filterListItemsByTransport -> tempBaseActivityItemsList[i][_costType] : " + tempBaseActivityItemsList[i][_costType]);
        
        
        if (tempBaseActivityItemsList[i][_costType] == -1 || tempBaseActivityItemsList[i][_costType] == null)
        {
            tempNullList.push(tempBaseActivityItemsList[i]);
        }
        else
        {
            var lDuration = setDurationForItemTransport(tempBaseActivityItemsList[i]);
            
            log("filterListItemsByTransport -> lDuration : " + lDuration);
            
            
            if (parseInt(tempBaseActivityItemsList[i][_costType])*2 + lDuration <= parseInt(currentTime))
            {
                if (parseInt(tempBaseActivityItemsList[i][_costType])*2 + lDuration > lLimitTime)
                {
                    lTempArrayHigh.push(tempBaseActivityItemsList[i]);
                }
                else
                {
                    lTempArrayLow.push(tempBaseActivityItemsList[i]);
                }
            }
            
            /*
            if (tempBaseActivityItemsList[i][_costType]*2 + lDuration <= parseInt(currentTime))
            {
                tempList.push(tempBaseActivityItemsList[i]);
            }
             */
            
        }
    }
    
    
    /*
    if (currentTime == 18000)
        for (var l = 0; l < tempNullList.length; l++)
            tempList.push(tempNullList[l]);
    */
    

    tempList = lTempArrayHigh.concat(lTempArrayLow);
    
    listItems = tempList;
    
    log("filterListItemsByTransport -> _costType : " + _costType);
    
    if (currentTime == 18000)
    {
        if (lTempArrayHigh.length == 0)
        {
            listItems.reverse();
        }

        listItems = tempList.concat(tempNullList);
    }
            
    tempArrayForSearchList = listItems;
     
}


function setDurationForItemTransport(_item)
{
    var _duration = duration;
    
    switch (_item.table)
    {
        case "Randonnee" :
            _duration = parseInt(_item.duration);
            break;
            
        case "Canyons" :
            _duration = parseInt(_item.approcheTime) + parseInt(_item.retourTime) + parseInt(_item.descenteTime);
            break;
            
        case "SitesEscalade" : {
            
            _duration = 45;
            
            if (_item.approche != null)
                _duration +=  parseInt(_item.approche) * 2;
            
            if (_item.dureeMoyenne != null)
                _duration +=  parseInt(_item.dureeMoyenne);
        }
            
            break;
    }
    
    return _duration;
}


function setBaseActivityItemsList(_type)
{
    switch (_type)
    {
        case "Monuments":				baseActivityItemsList = listItemsMonuments; break;
        case "Canyons":					baseActivityItemsList = listItemsCanyons; break;
        case "SitesEscalade":			baseActivityItemsList = listItemsSitesEscalade; break;
        case "Randonnee":               baseActivityItemsList = listItemsRandonnee; break;
        case "Petanque":                baseActivityItemsList = listItemsPetanque; break;
        case "Restos":                  baseActivityItemsList = listItemsRestos; break;
        case "Dormir":                  baseActivityItemsList = listItemsDormir; break;
        case "Shopping":                baseActivityItemsList = listItemsShopping; break;
        case "Loisirs":                 baseActivityItemsList = listItemsLoisirs; break;
            
            // make also changed in mapItem -> getTypeForMarker
            
        case "BonsPlans":
        {
            baseActivityItemsList = listItemsBonsPlans;
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                var lItem;
                
                lItem = clone(getItemInDataList("cafeAbbaye", "Sortir"));
                lItem.title_fr = "Couché de soleil au Café de l'Abbaye";
                lItem.title_en = "Sunset at the Café de l'Abbaye";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("caravelle", "Sortir"));
                lItem.title_fr = "Un verre en terrasse de la Caravelle";
                lItem.title_en = "A dring on Caravelle's terrace";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("fricheToitTerrasse", "Sortir"));
                lItem.title_fr = "Apero sur le toit de la Friche";
                lItem.title_en = "Aperitif on Friche's rooftop";
                lItem.type = "Cafe";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("hotelDieu", "Monuments"));
                lItem.title_fr = "Une pinte de Pietra à l'Hotel Dieu";
                lItem.title_en = "A pint of Pietra at the Hotel Dieu";
                lItem.type = "Cafe";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("moulinStVincent", "Monuments"));
                lItem.title_fr = "Produits du terroir au Moulin St Vincent";
                lItem.title_en = "Local products at Moulin St Vincent";
                lItem.type = "Shopping";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("clanCigales", "Restos"));
                lItem.title_fr = "Produits provençaux au Clan des Cigales";
                lItem.title_en = "Provencal products at the Clan des Cigales";
                lItem.type = "Shopping";
                baseActivityItemsList.push(lItem);
                
                
                baseActivityItemsList.push(getItemInDataList("polikarpov", "Sortir"));
            }
            */
        }
            break;
            
        case "SitesNaturels":
        {
            baseActivityItemsList = listItemsSitesNaturels;
            
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                var lItem;
                
                lItem = clone(getItemInDataList("chapelleBecLaCiotat", "Monuments"));
                lItem.type = "Massif";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("parcMugel", "Monuments"));
                lItem.type = "Foret";
                baseActivityItemsList.push(lItem);
                
                baseActivityItemsList.push(getItemInDataList("anseFiguerolles", "PlageBaignadePiscine"));
            }
             */
        }
            break;
            
        case "ExpositionsMusees":
        {
            baseActivityItemsList = listItemsExpositionsMusees;
            
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                var lItem;
                
                lItem = clone(getItemInDataList("vignelaure", "BonsPlans"));
                lItem.type = "Contemporain";
                baseActivityItemsList.push(lItem);
            }
             */
        }
            break;
            
        case "PlageBaignadePiscine":
        {
            baseActivityItemsList = listItemsPlageBaignadePiscine;
            
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                baseActivityItemsList.push(getItemInDataList("ilesDuFrioul", "SitesNaturels"));
                baseActivityItemsList.push(getItemInDataList("sormiou", "SitesNaturels"));
                baseActivityItemsList.push(getItemInDataList("sugiton", "SitesNaturels"));
                
                lItem = clone(getItemInDataList("lacBimont", "SitesNaturels"));
                lItem.type = "Lac";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("vallonSourn", "SitesNaturels"));
                lItem.type = "River";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("sillansLaCascade", "SitesNaturels"));
                lItem.type = "River";
                baseActivityItemsList.push(lItem);
                
                lItem = clone(getItemInDataList("cascadeMontaud", "Canyons"));
                lItem.type = "River";
                baseActivityItemsList.push(lItem);
            }
             */
        }
            break;
            
        case "Sortir":
        {
            baseActivityItemsList = listItemsSortir;
            
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                lItem = clone(getItemInDataList("mamaShelter", "Restos"));
                lItem.type = "Concert";
                baseActivityItemsList.push(lItem);
            }
             */
        }
            break;
            
        case "VieuxPortRD":             baseActivityItemsList = getListItemsFromArray(listItemsVieuxPortRDArray); break;
            
        case "NoIdea":                  baseActivityItemsList = getFullConcatListItems(); break;
    }
}


function getFullConcatListItems()
{
    return listItemsExpositionsMusees.concat(listItemsMonuments, listItemsSitesNaturels, listItemsPlageBaignadePiscine, listItemsCanyons, listItemsSitesEscalade, listItemsRandonnee, listItemsBonsPlans, listItemsPetanque, listItemsSortir, listItemsRestos, listItemsDormir, listItemsShopping, listItemsLoisirs);
}


function setBodyBackground()
{

	$("body").css("background-position", "center");
	$("body").css("background-repeat", "no-repeat");
	$("body").css("background-size", "cover");
	$("body").css("background-attachment", "fixed");

    //$("body").addClass('bgGrayLightToGray');
    //$("body").addClass('bgWhiteToGrayLight');
    //$("body").addClass('bgWhiteToUltraLightGray');
}


function getSizeImage(_arg, _item)
{
    /*
     smallSizeImage = (isMobile == true)?"320":"160";
     mediumSizeImage = (isMobile == true)?"320":"480";
     fullSizeImage = (isMobile == true)?"320":"800";
     */
    
    var lSizeImage;
    
    switch (_arg)
    {
        case "smallSizeImage" :
        {
            if (isApp)
                lSizeImage = 480;
            else
                lSizeImage = 160;
        }
            break;
            
        case "mediumSizeImage" :
        {
            if (isApp)
                lSizeImage = 480;
            else
                lSizeImage = 480;
        }
            break;
            
        case "fullSizeImage" :
        {
            if (isApp)
                lSizeImage = 480;
            else
                lSizeImage = 1200
                }
            break;
    }
    
    return lSizeImage;
}


function setBgImage(_currentTable, _arg)
{
    var nameImage;
    
    switch (_currentTable)
    {
        case "Home" :               nameImage = "Home3"; break;
        case "AgencesReceptives" :  nameImage = "fond"; break;
        case "Campings" :           nameImage = "fond"; break;
        case "Guides" :             nameImage = "fond1"; break;
        case "LocationVelo" :       nameImage = "fond"; break;
        case "MoniteursEscalade" :  nameImage = "fond2"; break;
        case "OfficesTourisme" :    nameImage = "fond"; break;
        case "MetroTram" :			nameImage = "fond"; break;
        case "PrivateSpace" :       nameImage = "fond"; break;
		case "Contact" :			nameImage = "fond"; break;
        case "Parkings" :			nameImage = "fond"; break;
        case "Massifs" :			nameImage = "fond"; break;
		case "Circuit" :			nameImage = "fond"; break;
        case "Restaurants" :		nameImage = "fond"; break;
        case "Hebergements" :		nameImage = "fond"; break;
        default:                    nameImage = "Home3"; break;
    }
	
	var extension = "";
	
	if (isLikeMobile)
		extension = "_small";
    
    var lImage = 'pictures/' + _currentTable + '/' + nameImage + extension + '.jpg';
    
    //'pictures/" + currentTable + "/" + nameImage + extension + ".jpg'
    
    if (_arg == "photoSwipeHome")
        return lImage;
    
    $("#bgImage").css("background-image", "url('" + lImage + "')");
}


function setHomeBgImage(_currentActivity, _arg)
{
    //alert(currentActivity);
    
    var nameImage;
    
    switch (_currentActivity)
    {
		
		case -1 :						nameImage = "Home3"; break;
        case "NoIdea" :                 nameImage = "NoIdea"; break;
        case "BonsPlans" :              nameImage = "BonsPlans"; break;
        case "ExpositionsMusees" :      nameImage = "ExpositionsMusees_v1"; break;
        case "Monuments" :              nameImage = "Monuments"; break;
        case "SitesNaturels" :          nameImage = "SitesNaturels"; break;
        case "PlageBaignadePiscine" :   nameImage = "PlageBaignadePiscine"; break;
        case "Canyons" :                nameImage = "Canyons"; break;
        case "SitesEscalade" :          nameImage = "SitesEscalade_v1"; break;
        case "Randonnee" :              nameImage = "Randonnee"; break;
        case "Petanque" :               nameImage = "Petanque"; break;
        case "Sortir" :                 nameImage = "Sortir"; break;
        case "Restos" :                 nameImage = "Restos"; break;
        case "Shopping" :               nameImage = "Shopping"; break;
        case "Dormir" :                 nameImage = "Dormir"; break;
        case "Loisirs" :                nameImage = "Loisirs"; break;
        default:                        nameImage = "Home3"; break;
    }
    
    var captionImage;
    
    switch (_currentActivity)
    {
		case -1 :						captionImage = "Installation Champs harmoniques - MP2013"; break;
        case "NoIdea" :                 captionImage = "Le Vallon des Auffes"; break;
        case "BonsPlans" :              captionImage = "Le marché aux poissons"; break;
        case "ExpositionsMusees" :      captionImage = "Musée Granet"; break;
        case "Monuments" :              captionImage = "Vieille Charité"; break;
        case "SitesNaturels" :          captionImage = "Îles du Riou"; break;
        case "PlageBaignadePiscine" :   captionImage = "Plage des Catalans"; break;
        case "Canyons" :                captionImage = "Trou de Jeannette"; break;
        case "SitesEscalade" :          captionImage = "Buoux"; break;
        case "Randonnee" :              captionImage = "Sainte Victoire"; break;
        case "Petanque" :               captionImage = "Petanque"; break;
        case "Sortir" :                 captionImage = "Soirée Borderline"; break;
        case "Restos" :                 captionImage = "L'Esprit de la Violette"; break;
        case "Shopping" :               captionImage = "Les parfums de la Compagnie Marseillaise"; break;
        case "Dormir" :                 captionImage = "Hôtel Mistral - Pointe route, Prado"; break;
        case "Loisirs" :                captionImage = "Funny zoo - Parc Longchamps"; break;
        default:                        captionImage = "Marseille Provence"; break;
    }
    
	var extension = "";
	
	if (getXsize() < 600 || (isIpad && !isNetWorkAvalaible))
		extension = "_small";
    
    var lStartUrl = "";
    
    if (isIpad && isNetWorkAvalaible)
        lStartUrl = urlWeb;
    
    var lImage = lStartUrl + 'pictures/' + currentTable + '/' + nameImage + extension + '.jpg';
    
    
    //log ("setHomeBgImage -> lImage : " + lImage);
    
    //******************
    
    if (_arg == "photoSwipeHome")
        return {"image" : lImage, "caption" : captionImage};
    
    if (isLikeMobile)
    {
        if (currentActivity == -1)
        {
            $("#bgImage").css("background-image", "none");
            setHomePicturesSlider();
            return;
        }
        else
        {            
            //log("setHomePicturesSlider -> mPhotoSwipeHome : " + mPhotoSwipeHome);
            
            if (mPhotoSwipeHome != null)
            {
                var photoSwipeInstance = lPhotoSwipe.getInstance($(mPhotoSwipeHome).attr('id'));
                lPhotoSwipe.unsetActivateInstance(photoSwipeInstance);
                lPhotoSwipe.detatch(photoSwipeInstance);
                
                mPhotoSwipeHome = null;
                mDiapoArrayHome = [];
                
                mIndexPhotoSwipe = 0;
                
                $("#bgImage").removeClass("ps-active");
            }
        }
    }
    
    $("#bgImage").css("background-image", "url('" + lImage + "')");
}


function setPhotoSwipeHome (window, _photoSwipe, _diapoArray)
{
    var options =
    {
    slideshowDelay : 2500,
    slideSpeed : 500,
    autoStartSlideshow: true,
    preventHide: true,
    minUserZoom: 1.0,
    captionAndToolbarHide: true,
    enableMouseWheel: false,
    margin: 0,
    imageScaleMethod: "zoom",
    zIndex: '5001',
    target: window.document.querySelectorAll('#bgImage')[0],
    getImageSource: function(obj){return obj.url;},
    getImageCaption: function(obj){return obj.caption;}
    };
    
    mPhotoSwipeHome = _photoSwipe.attach(_diapoArray, options);
    
    mPhotoSwipeHome.addEventHandler(_photoSwipe.EventTypes.onTouch, function(e){
                                
                                //log(e);
                                
                                if ((e.action == "swipeUp" || e.action == "swipeDown") && !mPhotoSwipeHome.isZoomActive())
                                {
                                var lHeight = e.action == "swipeUp" ? 240 : - 200;
                                $("body").animate({scrollTop:window.pageYOffset + lHeight}, 500, 'easeInCubic', function(){
                                                  bugScrollPositionFixed();
                                                  mPhotoSwipeHome.carousel.show(mIndexPhotoSwipeHome);
                                                  });
                                }
                                });
    
    setEventHandlerForPhotoSwipeFull(mPhotoSwipeHome, _photoSwipe);
    
    preparePopUpForInfoGesturePhotoSwipe(mPhotoSwipeHome, _photoSwipe);
    
    mPhotoSwipeHome.addEventHandler(_photoSwipe.EventTypes.onDisplayImage, function(e){
                                   mIndexPhotoSwipe = e.index;
                                    
                                    
                                    if (currentTable == "Home" && homeStatus == "Home")
                                    {
                                        setAndAdjustTitleLabel(mDiapoArrayHome[e.index].caption.toUpperCase());
                                    }
                                    
                                    if (currentTable == "Restaurants")
                                    {
                                        var lItem = getItemInDataList(getKeyInArrayForIndex(myRestoArray, e.index));
                                    }
                                    
                                   });
    
    mPhotoSwipeHome.show(mIndexPhotoSwipe);
    
    log("setPhotoSwipeHome -> mPhotoSwipeHome : " + mPhotoSwipeHome);
};


function setHomePicturesSlider()
{
    //log("setHomePicturesSlider -> mPhotoSwipeHome : " + mPhotoSwipeHome + " / isNetWorkAvalaible : " + isNetWorkAvalaible);
    
    //******************** build array *********************
    
    var lImage;
    var lListItems;
    var lStartUrl = "";
    var lSizeImage;
    
    if (isIpad && isNetWorkAvalaible)
        lStartUrl = urlWeb;
    
    if (currentTable == "Home" || currentTable == "PrivateSpace")
    {
        if (currentTable == "Home")
        {
            for (var i = 0; i < activityBtnArray.length; i++)
            {
                if (activityBtnArray[i] != 'VieuxPortRD')
                {
                    //iPad url set in setHomeBgImage
                    lImage = setHomeBgImage(activityBtnArray[i], 'photoSwipeHome');
                    
                    mDiapoArrayHome.push({ url: lImage.image, caption: lImage.caption});
                }
            }
            
            for (var i = 0; i < photoArray.length; i++)
            {
                var lUrl = lStartUrl + "pictures/Home/" + photoArray[i].image;

                if (isApp && lStartUrl == "")
                    lUrl = lUrl.replace(".jpg", "_small.jpg");
                
                //log ("setHomePicturesSlider photoArray -> lUrl : " + lUrl);
                
                mDiapoArrayHome.push({ url:lUrl , caption: photoArray[i].caption});
            }
        }

        
        var lIndex = currentTable == "Home" ? 0 : 1;
        
        for (var i = 0; i < activityBtnArray.length; i++)
        {
            if (activityBtnArray[i] != 'Home' && activityBtnArray[i] != 'NoIdea' && activityBtnArray[i] != 'VieuxPortRD')
            {
                lListItems = window["listItems" + activityBtnArray[i]];
                
                if (isIpad && isNetWorkAvalaible)
                    lSizeImage = "800";
                else
                    lSizeImage = getSizeImage('smallSizeImage', lListItems[lIndex]);
                
                if (lListItems[lIndex].isUpdate)
                    lStartUrl = urlWeb;
                
                lImage = lStartUrl + "pictures/" + activityBtnArray[i] + "/" + lListItems[lIndex].idRepName + "/" + lSizeImage + "/" + lListItems[lIndex].tabDiapo[0];
                
                //log ("setHomePicturesSlider activityBtnArray -> lUrl : " + lImage);
                
                mDiapoArrayHome.push({ url:lImage, caption: titleForItem(lListItems[lIndex])});
            }
        }
    }
    else
    if (currentTable == "Circuit")
    {
        if (isIpad && isNetWorkAvalaible)
            lImage = lStartUrl + "pictures/Circuit/fond.jpg";
        else
            lImage = "pictures/Circuit/fond_small.jpg";
        
        mDiapoArrayHome.push({ url: lImage, caption:"Rive droite du Vieux port"});

        //***************************************************************
        
        lListItems = getListItemsFromArray(listItemsVieuxPortRDArray);

        for (var i = 0; i < lListItems.length; i++)
        {
            if (!$.isArray(lListItems[i]))
            {
                if (isIpad && isNetWorkAvalaible)
                    lSizeImage = "800";
                else
                    lSizeImage = getSizeImage('smallSizeImage', lListItems[i]);
                
                lImage = "pictures/" + lListItems[i].table + "/" + lListItems[i].idRepName + "/" + lSizeImage + "/" + lListItems[i].tabDiapo[0];
                
                if (lListItems[i].isUpdate)
                    lStartUrl = urlWeb;
                
                mDiapoArrayHome.push({ url: lStartUrl + lImage, caption: titleForItem(lListItems[i])});
            }
        }
    }
    else
    if (isTablePracticalLink)
    {
        for (var prop in myRestoArray)
        {
            if (myRestoArray.hasOwnProperty(prop))
            {
                var lItem = getItemInDataList(prop);
                
                //log("setHomePicturesSlider -> prop : " + prop + " / lItem : " + lItem.idRepName);
                
                var lUrl = lStartUrl + "pictures/" + lItem.table + "/" + lItem.idRepName + "/" + getSizeImage('mediumSizeImage') + "/" + lItem.mainImage;
                
                mDiapoArrayHome.push({ url:lUrl , caption: lItem["title_" + currentLang]});
            }
        }
    }
    
    //******************** launch *********************
    
    setPhotoSwipeHome (window, lPhotoSwipe, mDiapoArrayHome);
    
    //hasBeenResized = false;
}



function showPopUpBrowserIncompatible()
{
    var _html;
    
    var _xSize = 277;
    var _ySize = 320;
    var _top;
    var _left;
    
    //log ("xSize : " + _xSize + " / ySize : " + _ySize + " / window.pageYOffset : " + window.pageYOffset);
    
    _top = window.pageYOffset + (($(window).height() - _ySize) / 2) + 20;
    
    _left = window.pageXOffset + ($(window).width() - _xSize) / 2;
    
    if (_top <= 0)
        _top = 8;
    
    _html = '<div style="padding:10px;">Ce site utilise des technologies modernes issues des standards W3C qui ne sont pas respectées par Internet Explorer.<br><br>'+
    'Nous vous recommandons vivement d\'utiliser les navigateurs Chrome ou Safari.<br><br>' +
    '<a href="http://www.google.com/chrome/" style="text-decoration:underline; width:100%; text-align:center; color:#cccccc;">Installer Google Chrome</a><br><br>' +
    '<a href="http://support.apple.com/kb/dl1531" target="_blank" style="text-decoration:underline; width:100%; text-align:center; color:#cccccc;">Installer Apple Sarafi pour PC</a><br><br>' +
    '<a href="javascript:neverShowPopUpBrowserIncompatibleAgain();" style="text-decoration:underline; width:100%; text-align:center; color:#cccccc; font-weight:bold;">Ne plus afficher cette fenêtre</a>';
    
    var html =
    '<div id="popUpBrowserIncompatible" style="width:' + _xSize + 'px; height:' + _ySize + 'px; background-color:#2E2A2A; border:#cccccc solid 5px;' +
    ' position:absolute; top:' + _top + 'px; left:' + _left + 'px; z-index:10; color:#ffffff; font-size:1.2em; z-index:1000;" class="corner">'+
    '<h2 class="colorMP2013" style="text-align:center; color:#ffffff; padding:10px 0px;">' + commonLabel[currentLang].browserIncompatible + '</h2>' +
    _html +
    '</div>';
    
    var btn =
    '<a id="popUpBtnBrowserIncompatible" href="javascript:deletePopUpBtnBrowserIncompatible();" style="top:' + (_top - 18) + 'px; left:' + (_left - 18) + 'px; position:absolute; z-index:1001;">' +
    '<img src="Assets/croix_off.png" style="position:relative; top:10px; left:10px;" />' +
    '</a>';
    
    $("body").append(html);
    $("body").append(btn);
}


function deletePopUpBtnBrowserIncompatible()
{
	$("#popUpBrowserIncompatible").remove();
	$("#popUpBtnBrowserIncompatible").remove();
	
	isPopUpFilter2013Opened = false;
}

function neverShowPopUpBrowserIncompatibleAgain()
{
    if(typeof(Storage) !== "undefined")
    {
        localStorage.neverShowPopUpBrowserIncompatibleAgain = "true";
        deletePopUpBtnBrowserIncompatible();
    }
}
