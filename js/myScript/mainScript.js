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
		//log("setPrimaryVarWithUserAgentAndxSize-> isIpad : " + isIpad);
	}
    
    if (/Android/i.test(navigator.userAgent) && /Gingerbread|Honeycomb|Froyo|Eclair|Donut|Android 2.2/i.test(navigator.userAgent))
    {
        isRestrictedAndroid = true;
        //log("isRestrictedAndroid = true");
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
    
    localstorageToRetrieveAtStart();
    
    //************************* PhotoSwipe **********************************

    if (currentTable == "Index")
        lPhotoSwipe = window.Code.PhotoSwipe;
    
    
    mListFullConcat = getFullConcatListItems();
}


function localstorageToRetrieveAtStart()
{
    if (localStorage.currentLang)
        currentLang = localStorage.currentLang;
    
    //**********************  listItems to update ******************
    
    if (localStorage.itemsToPush && localStorage.itemsToPush != "false")
    {
        var lItemArray = jQuery.parseJSON(localStorage.itemsToPush);
        
        for (var i = 0; i < lItemArray.length; i++)
        {
            // because updated item can alreay been in listItem
            removeItemFromDataList(lItemArray[i].idRepName, lItemArray[i].table);
            
            window["listItems" + lItemArray[i].table].push(lItemArray[i]);
        }
    }
    
    //**********************  listItems to delet ******************

    if (localStorage.itemsToDelete && localStorage.itemsToDelete != "false")
    {
        var lItemArray = jQuery.parseJSON(localStorage.itemsToDelete);
        
        //************* remove and add item in listItems ***********
        
        for (var i = 0; i < lItemArray.length; i++)
        {
            var lIdRepname = lItemArray[i].split(",")[0];
            var lTable = lItemArray[i].split(",")[1];
            
            var lListItems = window["listItems" + lTable];
            
            for (var t = 0; t < lListItems.length; t++)
            {
                if (lListItems[t].idRepName == lIdRepname)
                {
                    lListItems.remove(t);
                }
            }
        }
    }
    
    
    //************************* order list *************************
    
    for (var i = 0; i < activityBtnArray.length; i++)
    {
        if (localStorage["order" + activityBtnArray[i]] && localStorage["order" + activityBtnArray[i]] != "false")
        {
            window["order" + activityBtnArray[i]] = jQuery.parseJSON(localStorage["order" + activityBtnArray[i]]);
        }
    }
    
    //************************* diapoHomeArray **********************************
    
    if (localStorage.diapoHomeArray)
        mHomeDiapo = jQuery.parseJSON(localStorage.diapoHomeArray);
    
    //************************* itemsHomeArray **********************************
    
    if (localStorage.itemsHomeArray)
        mItemsHomeArray = jQuery.parseJSON(localStorage.itemsHomeArray);
    
    //************************* myRestoArray **********************************
    
    if (!localStorage.myRestoArray)
        localStorage.myRestoArray = JSON.stringify(myRestoArray);
    else
        myRestoArray = jQuery.parseJSON(localStorage.myRestoArray);
    
    //************************* closeLinkArray **********************************
    
    if (localStorage.closeLinkArray)
        closeLinkArray = jQuery.parseJSON(localStorage.closeLinkArray);
    
    //************************* classicsArray **********************************
    
    if (localStorage.classicsArray)
        classicsArray = jQuery.parseJSON(localStorage.classicsArray);
    
    //************************* classicsArray **********************************
    
    if (localStorage.favoritesArray)
        favoritesArray = jQuery.parseJSON(localStorage.favoritesArray);
    
    //************************* bestViewsArray **********************************
    
    if (localStorage.bestViewsArray)
        bestViewsArray = jQuery.parseJSON(localStorage.bestViewsArray);
    
    //************************* isImageOffLine **********************************
    
    if (!localStorage["isImageOffLine"])
        localStorage["isImageOffLine"] = isImageOffLine;
    else
        isImageOffLine = jQuery.parseJSON(localStorage["isImageOffLine"]);
    
    if (!localStorage["nbOffLineImages"])
        localStorage["nbOffLineImages"] = 0;
    
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
}



function setOrientationChange()
{
    if (isModalPopUp)
        showModalPopUp();
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    if (isTransparentDivToTap)
        closeTransparentDivToTap();
    
    launchResize();
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


function setSizeForBgImage()
{
    var lHeight;
    
    if (getYsize() > getXsize())
    {
        lHeight = getXsize() * 0.735;
    }
    else
    {
        if (currentTable == "Index" && homeStatus == "Home")
        {
            lHeight = getYsize() - $("#leftHomeSelectionBlock").height();
        }
        else
            lHeight = getYsize() * 0.9;
    }
    
    if (homeStatus == "Home")
        $("#bgImage").css("height", lHeight + "px");
    else
        $("#mainVisual").css("height", lHeight + "px");
    
    /*
    if (getXsize() > 480)
    {
        if (getYsize() >= 945)
            $("#bgImage").css("height", "580px");
        else
        if (getYsize() >= 768)
            $("#bgImage").css("height", "480px");
        else
        if (getYsize() >= 548)
            $("#bgImage").css("height", "320px");
        else
            $("#bgImage").css("height", "230px");
    }
    else
    {
        if (getYsize() > 500)
            $("#bgImage").css("height", "240px");
        else
        if (getYsize() > 416)
            $("#bgImage").css("height", "220px");
        else
            $("#bgImage").css("height", "210px");
    }
    */
    
    //log("getYsize : " + getYsize() + " / bgImage -> size H : " + $("#bgImage").height());
}



function setPositionForTrianglePlus()
{
    if (currentTable != "Index")
        return;
    
    var lLeft = $("#bgImage").offset().left + $("#bgImage").width() - $("#trianglePlus").width();
    
    $("#trianglePlus").css("left", lLeft + "px");
    
    var lTop = $("#bgImage").height() - $("#trianglePlus").height();
    
    $("#trianglePlus").css("top", lTop + 3 + "px");
}


function setSizeForMainSelectionItemTitle()
{
    //******************* mainHomeTitle **************************
    
    /*
    var lHeight = (getYsize() - $("#bgImage").outerHeight() - $("#diapoCategory").outerHeight() - $("#diapoHome").outerHeight())/2;
    
    if (lHeight < 59)
        lHeight = 80;
    
    //log("^^^^^^ setSizeForMainSelectionItemTitle -> getYsize() : " + getYsize() + " / $(#mobileTitle2).outerHeight() : " + $("#mobileTitle2").outerHeight() + " /  $(#bgImage).outerHeight() : " + $("#bgImage").outerHeight());
    */
    
    var lHeight;
    
    
    if (getYsize() > getXsize())
    {
        $(".mainHomeTitle").css("width", "50%");
        
        lHeight = getXsize() / 2 * 0.5;
    }
    else
    {
        $(".mainHomeTitle").css("width", "25%");
        
        lHeight = getXsize() / 4 * 0.5;
    }
    
    
    var lPictoHeight = lHeight * 1;
    
    $(".enginePicto").css("height", lPictoHeight + "px");
    
    $(".enginePicto").css("width", "auto");
    
    var lPaddingTop = Math.round((lHeight - lPictoHeight) / 2);
    
    $(".mainHomeTitle").css("padding-top", lPaddingTop + "px");
    
    $(".mainHomeTitle").css("padding-bottom", lPaddingTop + "px");
    
    $(".mainHomeTitle").css("height", (lHeight - (lPaddingTop * 2)) + "px");
    
    $("#leftHomeSelectionBlock").css("height", (lHeight - (lPaddingTop * 2)) + "px");
    
    
    
    
    /*
    var lArray = $("#leftHomeSelectionBlock .mainHomeTitle");
    
    for (var i = 0; i < lArray.length; i++)
    {
        $(lArray[i]).css("padding-top", "0px");
        
        var lTextHeight = $("#" + $(lArray[i]).attr("id") + " p").outerHeight();
        
        var lPaddingTop = Math.round((lHeight - lTextHeight) / 2);
        
        $(lArray[i]).css("padding-top", lPaddingTop + "px");
        
        var pixel = 1;

        $(lArray[i]).css("height", (pixel + lHeight - lPaddingTop) + "px");
    }
    
    
    log("setSizeForMainSelectionItemTitle -> lHeight : " + lHeight);
    
    
    $("#mainContainer").css("height", ($("#leftHomeSelectionBlock").outerHeight() - fuckingFourPixels ) + "px");
    
    */
    
}

/*
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
    
    $("#bgImage").css("height", "280px");
}
*/


function launchResize()
{
    log("launchResize");
    
    log("getXsize : " + getXsize() + " / getYsize() : " + getYsize());
    
    
    hasBeenResized = true;
    

    //*********** bug fixed, also in show detail *****************
    
    fixedIosBugForTextDetailFontSize();
    
    //************************************************************
    
    if (homeStatus == "Close" && !isMapVisible)
    {
        $("#leftHomeOptionBlock").css("display", "none");
    }
    
    bugScrollPositionFixed();
    
    setTimeout(function(){
               
               //************ Bg Image **************
               
               setSizeForBgImage();
               
               /*
               resetPhotoSwipeHome();
               
               setHomePicturesSlider(mCurrentDiapoHome);

               setPositionForTrianglePlus();
               */
               
                //***********************************
               
               if (!isRestrictedAndroid)
               {
                    $("#listMainMenu").css("height", (getYsize() - 30) + "px");
               }
               
               if (menuIsOpened)
               {
                    var lNewSize = getYsize() - $("#mobileTitle2").outerHeight() - $("#bgImage").height();
                    $("#mainContainer").css("height", lNewSize + "px");
               }
               
               $("#mobileTitle2").css('width', getXsize() + 'px');

               if (currentTable == "Index" && homeStatus == "List" && !isModalPopUp)
                    setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
               else
                    setAndAdjustTitleLabel($("#mobileTitle2Label").html());
               
               //******************************  resize block text itemList *********************************
               
               if (getXsize() <= mSizeLimitForSmall)
               {
               $("#itemList").css("width", "92%");
               $("#itemList").css("margin-left", "4%");
               $("#itemList").css("margin-right", "4%");
               
               // Remettre CSS d'origine
               
               $(".itemHome").css("width", "100%");
               $(".itemHome").css("height", "230px");
               $(".itemHome").css("margin-left", "0%");
               $(".itemHome").css("margin-right", "0%");
               
               $(".mainVisualList").css("width", "100%");
               $(".mainVisualList").css("height", "180px");
               }
               else
               {
               $("#itemList").css("width", "auto");
               $("#itemList").css("margin-left", "0%");
               $("#itemList").css("margin-right", "0%");
               }
               
               if (currentTable == "Index" && homeStatus == "Home")
               {
                    if (mSwiperHome)
                    {
                        mSwiperHome.destroy(true, true);
                        mSwiperHome = null;
               
                        $(".diapoCategoryArrowLeft").css("display", "none");
                        $(".diapoCategoryArrowRight").css("display", "none");
                    }
               
                    setSizeForMainSelectionItemTitle();
               
                    if (getXsize() < getYsize())
                    {
                        setSwiperHome();
                    }
               
               
                    //setPositionForTrianglePlus();

                    //*********** we rewrite to get the small class when portrait < 400
               
                    clearItemList();
               
                    setItemListForHome();
               }

               setSizeToBlockTextAtList();
               
               setTimeout(function(){

                          setSizeAndMarginForList();

                          if (getXsize() <= mSizeLimitForSmall && (mSwitchSmallBig == "Small" || homeStatus == "Home"))
                          {
                            $(".pastilleSousType").css('display', 'none');
                            $(".pastilleSousType2").css('display', 'none');
                          /*
                                $(".pastilleSousType").css('visibility', 'hidden');
                                $(".pastilleSousType2").css('visibility', 'hidden');
                           */
                          }
                          else
                          if (currentActivity == "ExpositionsMusees" || currentActivity == "Petanque"
                              || currentActivity == "Circuits")
                          {
                          $(".pastilleSousType").css('display', 'none');
                          $(".pastilleSousType2").css('display', 'none');
                          /*
                           $(".pastilleSousType").css('visibility', 'hidden');
                           $(".pastilleSousType2").css('visibility', 'hidden');
                           */
                          }
                          else
                          if (currentActivity == "Restos")
                          {
                            $(".pastilleSousType").css('display', 'none');
                            $(".pastilleSousType2").css('display', 'inline-block');
                          /*
                                $(".pastilleSousType").css('visibility', 'hidden');
                                $(".pastilleSousType2").css('visibility', 'hidden');
                           */
                          }
                          else
                          {
                            $(".pastilleSousType").css('display', 'inline-block');
                            $(".pastilleSousType2").css('display', 'inline-block');
                          /*
                                $(".pastilleSousType").css('visibility', 'visible');
                                $(".pastilleSousType2").css('visibility', 'visible');
                           */
                          }

                          }, 500);
               
               
               if (getXsize () <= mSizeLimitForSmall && currentTable == "Index" && homeStatus == "List" && mSwitchSmallBig == "Big")
                    ajdustHeightCell();
               
               
               var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
               
               if (isMapVisible)
               {
                    $("#mapList").css("height", lHeight + fuckingFourPixels + "px");
                    $("#mainContainer").css("height", lHeight + "px");
               }
               else
               if (isModalPopUp)
               {
                    $("#modalPopUp").css("height", lHeight + "px");
               }
               else
               if (isTransparentDivToTap)
               {
                    $("#TransparentDivToTapAndClose").css("height", getYsize() + "px");
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


function actionWhenBackButtonOnAndroid()
{
    if (menuIsOpened)
        animateCloseMenu();
    else
    if (isModalPopUp)
        showModalPopUp();
    else
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    else
    if (mPhotoSwipeFull)
    {
        var photoSwipeInstance = window.Code.PhotoSwipe.getInstance($(mPhotoSwipeFull).attr('id'));
        photoSwipeInstance.hide();
    }
    else
    if (currentTable == "Index" && homeStatus == "Home")
        navigator.app.exitApp();
    else
    if ((isTablePracticalLink && homeStatus == "List")
        || homeStatus == "Home")
        showLittleModalPopUp('exitApp', null, 'killApp');
    else
        back();
    
    log("backbutton -> Android");
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
    
    var lUrl = ( (isProd || isMobileTest) ? urlWeb : "" ) + 'API/getUpdate.php?version=' + version + '&versionItemsToPush=' + lVersionItemsToPush;

    log("checkUpdate -> lUrl : " + lUrl);
    
    $.ajax(
           {
           
           url: lUrl,
           
           success: 	function(data, textStatus, request) {
           
               //log(data);
               
               var s = document.createElement('script');
               s.setAttribute('type', 'text/javascript');
               s.text = data;
               document.getElementsByTagName("head")[0].appendChild(s);

               //************* ModalPopUp LastVersion ***********
           
               if (updateData.version > version)
               {
                   //log("nbTimesForLastVersion : " + localStorage.nbTimesForLastVersion);
                   
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
           
                checkUpdateForItemsToPush();
           
                //************* itemsToDelete ***********
           
                checkUpdateForItemsToDelete();
           
                //************* list order ***********
           
                checkUpdateForListToOrder();
           
                //******************* diapoHomeArray ********************
           
                if (updateData.diapoHomeArray)
                {
                    var firstUpdateOrChange = false;
           
                    if (!localStorage.diapoHomeArray && mPhotoSwipeHome)
                    {
                        mPhotoSwipeHome.stop();
                        resetPhotoSwipeHome();
           
                        firstUpdateOrChange = true;
                    }
           
                    var isUpdateChanged = false;
           
                    if (!compareArray(mHomeDiapo, updateData.diapoHomeArray))
                    {
                        firstUpdateOrChange = true;
                    }
           
                    mHomeDiapo = updateData.diapoHomeArray;
                    localStorage.diapoHomeArray = JSON.stringify(updateData.diapoHomeArray);
           
                    if (firstUpdateOrChange)
                        setHomePicturesSlider();
                }

                //******************* itemsHomeArray ********************
         
                if (updateData.itemsHomeArray)
                {
                    if (!compareArray(mItemsHomeArray, updateData.itemsHomeArray))
                    {
                       mItemsHomeArray = updateData.itemsHomeArray;
                       localStorage.itemsHomeArray = JSON.stringify(mItemsHomeArray);
                       
                       if (currentTable == "Index" && homeStatus == "Home")
                       {
                            clearItemList();
           
                            setLoadingAnimation(0, 'listHome');
           
                            setTimeout(function(){
                      
                                        removeLoadingAnimation();
                                       
                                        setItemListForHome();
                                       
                                       //clearTimeout(itemListOut);
                      
                            }, 1000);
                       }
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

           
               //******************* closeLinkArray ********************
               
               if (updateData.closeLinkArray)
               {
                    closeLinkArray = updateData.closeLinkArray
                    localStorage.closeLinkArray = JSON.stringify(closeLinkArray);
               }
           
                //******************* classicsArray ********************
           
                if (updateData.classicsArray)
                {
                    classicsArray = updateData.classicsArray
                    localStorage.classicsArray = JSON.stringify(classicsArray);
                }
           
           
                //******************* favoritesArray ********************
           
                if (updateData.favoritesArray)
                {
                    favoritesArray = updateData.favoritesArray
                    localStorage.favoritesArray = JSON.stringify(favoritesArray);
                }
           
           
                //******************* bestViewsArray ********************
           
                if (updateData.bestViewsArray)
                {
                    bestViewsArray = updateData.bestViewsArray
                    localStorage.bestViewsArray = JSON.stringify(bestViewsArray);
                }
           
               //******************* diapoHomeArray1 ********************
               
               if (updateData.diapoHomeArray1)
               {
                    diapoHomeArray1 = updateData.diapoHomeArray1
                    localStorage.diapoHomeArray1 = JSON.stringify(diapoHomeArray1);
               }
           
               //******************* diapoHomeArray2 ********************
               
               if (updateData.diapoHomeArray2)
               {
                    diapoHomeArray2 = updateData.diapoHomeArray2
                    localStorage.diapoHomeArray2 = JSON.stringify(diapoHomeArray2);
               }
               
               //******************* diapoHomeArray3 ********************
               
               if (updateData.diapoHomeArray3)
               {
                    diapoHomeArray3 = updateData.diapoHomeArray3
                    localStorage.diapoHomeArray3 = JSON.stringify(diapoHomeArray3);
               }
           }
    });
}


function checkUpdateForListToOrder()
{
    if (updateData.orderListArray)
    {
        var lGlobalArray = updateData.orderListArray;
        
        for (var prop in lGlobalArray)
        {
            if (lGlobalArray.hasOwnProperty(prop) && lGlobalArray[prop].length > 0)
            {
                window["order" + prop] = lGlobalArray[prop];
                
                localStorage["order" + prop] = JSON.stringify(lGlobalArray[prop]);
                
                //log("checkUpdateForListToOrder -> order prop : " + prop + " / " + JSON.stringify(window["order" + prop]));
            }
        }
    }
}


function checkUpdateForItemsToDelete()
{
    var itemsToDeleteInLocalStorage = null;
    
    if (localStorage.itemsToDelete)
        itemsToDeleteInLocalStorage = jQuery.parseJSON(localStorage.itemsToDelete);

    if (updateData.itemsToDelete && updateData.itemsToDelete.length > 0
        && (!itemsToDeleteInLocalStorage || compareArray(itemsToDeleteInLocalStorage, updateData.itemsToDelete)))
    {
        var lItemArray = updateData.itemsToDelete;
        
        //************* remove and add item in listItems ***********
        
        for (var i = 0; i < lItemArray.length; i++)
        {
            var lIdRepname = lItemArray[i].split(",")[0];
            var lTable = lItemArray[i].split(",")[1];
            
            var lListItems = window["listItems" + lTable];
            
            for (var t = 0; t < lListItems.length; t++)
            {
                if (lListItems[t].idRepName == lIdRepname)
                {
                    lListItems.remove(t);
                }
            }
        }
        
        //************* items to save in localstorage ***********
        
        localStorage.itemsToDelete = JSON.stringify(updateData.itemsToDelete);
    }
}



function checkUpdateForItemsToPush()
{
    if (updateData.itemsToPush && updateData.itemsToPush.length > 0)
    {
        //log("checkUpdateForItemsToPush -> ok");
        
        var lItemArray = updateData.itemsToPush;

        //************* remove and add item in listItems ***********
        
        for (var i = 0; i < lItemArray.length; i++)
        {
            // because updated item can already been in listItem
            removeItemFromDataList(lItemArray[i].idRepName, lItemArray[i].table);
            
            window["listItems" + lItemArray[i].table].push(lItemArray[i]);
            
            /******************* image in local reset at null *****************/
            
            if (localStorage[lItemArray[i].idRepName + "Image"] = "ok"
                && parseInt(localStorage["nbOffLineImages"]) > 0)
            {
                localStorage["nbOffLineImages"] = parseInt(localStorage["nbOffLineImages"]) - 1;
            }
            
            localStorage[lItemArray[i].idRepName + "Image"] = "false";
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
                        lStorageArray.remove(lIndexToRemove);
                }
            }
            
            //******** then we save all items in localstorage *******
            
            localStorage.itemsToPush = JSON.stringify(lStorageArray.concat(lItemArray));
            
        }
        else
            localStorage.itemsToPush = JSON.stringify(lItemArray);
        
        //************* versionItemsToPush ***********
        
        localStorage.versionItemsToPush = parseInt(updateData.versionItemsToPush);
        
        //log("checkUpdateForItemsToPush -> localStorage.versionItemsToPush : " + localStorage.versionItemsToPush);
        
        //************* pop up ***********
        
        
        log("checkUpdateForItemsToPush -> listItems.length 2 : " + getFullConcatListItems().length);
        
        setTimeout(function()
                   {
                        if (!isLittleModalPopUp && localStorage.startApp == "ok")
                            showLittleModalPopUp('updatedItems', null, updateData.itemsToPush.length);
                   
                   }, 500);
    }
}


function onBodyLoad(table)
{
    //clearLocalStorage();
    
    //******************** NEW VERSION ****************
    

    if (version > 1.2 && localStorage.version2 == undefined)
    {
        localStorage.versionItemsToPush = "0";
        localStorage.itemsToPush = "false";
        localStorage.nbTimesForLastVersion = "false";
        
        localStorage.version2 = "installed";
    }

    
    //******************** VAR ****************
    
    currentTable = table;
    
    if (currentTable == "OfficesTourisme" || currentTable == "Guides" || currentTable == "ParcAccro"
        || currentTable == "AgencesReceptives" || currentTable == "MoniteursEscalade" || currentTable == "Campings"
        || currentTable == "LocationVelo" || currentTable == "MetroTram" || currentTable == "Parkings"
        || currentTable == "Massifs" || currentTable == "Hebergements")
    {
        isTablePracticalLink = true;
    }
    
    setPrimaryVarWithUserAgentAndxSize();
    
    
    //******************** deviceready ****************
    
    $("body").css("overflow", "auto");
    
    if (isApp)
    {
        if (isAndroid)
            document.addEventListener('deviceready', onDeviceReady, false);
        else
            onDeviceReady();
    }
    else
        $( document ).ready(function() {
                            $("body").animate({scrollTop:1}, 200, 'linear', onDeviceReady);
                            });
}




   
function onDeviceReady()
{
    log("onDeviceReady");

    //********************** connection and background ***********************
    
    setEventGestureToOpenMenu();
    
    if (isApp)
    {
        /*
        if (isAndroid && currentTable == "Index")
            navigator.splashscreen.show();
        */
        
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
            document.addEventListener("backbutton", function(){actionWhenBackButtonOnAndroid();}, false);
        
        
        
        //******************* Google analytics *********************
        
        if (!isMobileWeb)
        {
            gaPlugin = window.plugins.gaPlugin;
            gaPlugin.init(gaPluginSuccess, gaPluginError, "UA-39619730-2", 10);
            
            gaTrackPage("currentTable : " + currentTable);
        }
    }

    //******************* Get Google Maps API Key *********************
    $.ajax({
        url: 'API/inject_config.php',
        type: 'GET',
        success: function(data) {
            if (data && data.GOOGLE_MAP_KEY) {
                window.GOOGLE_MAP_KEY = data.GOOGLE_MAP_KEY;
            } else {
                log("Failed to load Google Maps API Key");
            }
        },
        error: function(xhr, status, error) {
            log("Error loading Google Maps API Key: " + error);
        }
    });
    
    //************* DISPLAY *****************

    //log("rut1");
    
    firstStepOfLocalizedItems();
    
    if (currentTable == "Index")
    {
        // because fixed in other pages
        $("#mainMenu").css("position", "absolute");
        
        setSizeForMainSelectionItemTitle();
        
    }
    else
    {
        $("#mobileTitle2").css("display", "inline-block");
        $("#mainContainer").css("top", "59px");
        $("#bgImage").css("top", "59px");
        
        setAndAdjustTitleLabel($("#mobileTitle2Label").html());
    }

    setTitleAndMetaInHead2();
    
    $("#itemListBottomBtn").css("display", "none");
    
    setSizeForBgImage();
    
    //log("rut1b");
    
    //******************** BG Image / DIAPO *********************
    

    if (currentTable == "Index")
    {
        //setPositionForTrianglePlus();
        
        setHomePicturesSlider();
        
        //setBgImage(currentTable);
        
        if (getXsize() < getYsize())
        {
            setSwiperHome();
        }
    }
    else
    if (isTablePracticalLink || currentTable == "Contact")
    {
        setBgImage(currentTable);
    }

    //log("rut1c");
    

    //********************* MAP *************************

	$("#blockMap").css("display", "none");
	
	if (currentTable == "Index" || currentTable == "Contact"
        || currentTable == "routingMap" || currentTable == "randoMap")
	{
		$("#showMapBtn").css("display", "none");
	}
    
    //********************* LAUNCH APP *************************
    
    $("body").animate({scrollTop:1}, 0, 'linear', getMyDatas);
}


function getMyDatas()
{
    if (isTablePracticalLink
        || currentTable == "Contact"
        || currentTable == "routingMap" || currentTable == "randoMap"
        || currentTable == "Index" && !isMobileWeb
        )
    {
        launchItemsWithData();
    }
    else
    {
        log("@@@@@@ onDeviceReady -> getHomeTest");
        
        $.ajax(
               {
               url: ( (isApp) ? ipAdress : "" ) + 'API/getHome.php',
               success: 	function(data, textStatus, request)
               {
               //log(request.getAllResponseHeaders());
               launchItemsWithData(data);
               }
               });
    }
}



function launchItemsWithData(data)
{
    
	if (currentTable == "Index")
	{
		homeClass = "itemHome";
	}
	else
	{
		homeClass = "item";
	}
    
    //********* DATA **********
    
	setListItemsFromData(data);
    
    //************** DISPLAY **********
			
	if (currentTable == "Index")
	{
		//************* URL TO RETRIEVE CATEFORY OR ITEMS **********************
		
		launchScenarioFromUrlValues();
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
            
            if (currentTable == "LocationVelo" || currentTable == "MoniteursEscalade"
                || currentTable == "MetroTram" || currentTable == "Parkings")
            {
                setItemListMenuBtnWithPosition(0);
            }
            else
            {
                setNextResultForItemList();
            }
            
            previousHomeStatus = "list";
            homeStatus = "List";
        }

        $("#mainContainer").css("min-height", getYsize() - $("#mobileTitle2").outerHeight() + "px");
        
        $("#itemList").css("display", "inline-block");
	}
    
    
    //**************************** massif ********************************
    
    if (currentTable == "Index")
        setTimeout(getMassifsData, 15000);
    else
    if (currentTable == "Massifs")
        getMassifsData("Massifs");
    
    
    //************** action **********
    
    actionsWhenEverythingLaunched();
    

    //************** MAIN MENU **********
    /*
    setTimeout(function() {

               if (!isRestrictedAndroid)
               {
                    $("#listMainMenu").css("height", (getYsize() - 30) + "px");
                    $("#listMainMenu").css("overflow", "scroll");
               }
               
               
               }, 500);
    */
    //******************** UPDATE NEW VERSION ***************

    
    if (currentTable == "Index")
    {
        var newDuration = isAndroid ? 2000 : 2000;
        
        setTimeout(checkUpdate, newDuration);
    }
    
    //*******************************************************
    
    log("Everything fine at launch");
}


function setListItemsFromData(data)
{
    /*log("setListItemsFromData -> data typeOf TATA : " + typeof(data));
    console.dir(data);*/

    if (isTablePracticalLink)
	{
        listItems = window["listItems" + currentTable];
        
        if (currentTable == "Massifs")
        {
            listItems.sort(function (a,b) { return (parseInt(a.position) <= parseInt(b.position) ? -1 : 1)});
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
    }
}


function actionsWhenEverythingLaunched()
{
    log("actionsWhenEverythingLaunched -> diapoHomeArray1 : " + diapoHomeArray1.length);
    
    $("#splashScreen").fadeOut(0);
    
    setSizeForMenu();
    
    if (!isRestrictedAndroid)
    {
        $("#listMainMenu").css("height", (getYsize() - 30) + "px");
        $("#listMainMenu").css("overflow", "scroll");
        
        
    }
    
    if (!localStorage.startApp)
    {
        setTimeout(function(){
                   
                   if (isLittleModalPopUp)
                        showLittleModalPopUp();
                   
                   showLittleModalPopUp("startApp");
                   
                   }, 0);
    }
    
    if (isApp)
    {
        /*
        if (isAndroid && currentTable == "Index")
            navigator.splashscreen.hide();
        */
        
        if (localStorage.startApp == "ok")
            setTimeout(checkHomePopUp, 500);
        
        if (currentTable == "LocationVelo" || currentTable == "Massifs")
            testConnectionForPopUp();
    }

    setTimeout(function()
    {
        if (isApp)
        {
            if (!isMobileWeb)
            {
                //******************* open and copy Db *********************

                
                //******** isAndroid will open spatial in launchSpatialRequest by jsqliteplugin.java *************
                
                if (isIOS)
                    openSpatialDb();

                
                openTilesDb();
                

                
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

            }
            
        }
               
    }, 10000);
}

               
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



function launchScenarioFromUrlValues()
{
    // currentCity is a number because use to set time from data
    
    var urlPart = window.location.href.toString().split("#");
    
    var tempCurrentActivity = -1;
    var tempCurrentCity = -1;
    var tempIdRepName = -1;
    
    if (urlPart[1])
    {
        var urlPart1 = urlPart[1].split("&")
    
        for (var i = 0; i < urlPart1.length; i++)
        {
            if (urlPart1[i].indexOf("currentLang=") != -1)
            {
                var urlPart2 = urlPart1[i].split("=");
                
                currentLang = urlPart2[1];
            }

            if (urlPart1[i].indexOf("currentActivity=") != -1)
            {
                var urlPart2 = urlPart1[i].split("=");
                
                tempCurrentActivity = urlPart2[1];
            }
            
            if (urlPart1[i].indexOf("currentCity=") != -1)
            {
                var urlPart2 = urlPart1[i].split("=");
                
                if (urlPart2[1] != "Geoloc" && urlPart2[1] != "ChoosePosition")
                    tempCurrentCity = cityBtnArray.indexOf(urlPart2[1]);
            }
            
            if (urlPart1[i].indexOf("idRepName=") != -1)
            {
                var urlPart2 = urlPart1[i].split("=");
                
                tempIdRepName = urlPart2[1];
            }
        }
    }
    
    //************* ACTIONS **********************
    
    if (tempIdRepName != -1)
    {
        accessDetailViewFromUrl(tempCurrentActivity, tempIdRepName);
    }
    else
    if (tempCurrentActivity != -1)
    {
        currentActivity = tempCurrentActivity;
        
        baseActivityItemsList = getBaseActivityItemsList(currentActivity);
        
        listItems = clone(baseActivityItemsList);
        
        currentActivityItemList = listItems;
        
        showList();
    }
    else
    {
        //***** also set in checkUpdate when is loaded ******************
        
        setItemListForHome();

    }
    
}



function setContainerHomeForBtnAtBottom()
{
    if (currentTable == "Index" && isMobile
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
        
        var lList = getBaseActivityItemsList(currentActivity);
        
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
                
                isCellShowTime = false;
                listItems = tempBaseActivityItemsList;
                setListItemAndScrollBar();
                
                return -1;
            }
            else
            {
                currentTransport = _type;
            }
        }
        
        if (timeBtnArray.indexOf(_type) != -1)
        {
            if (_type == currentTime)
            {
                currentTime = -1;
                currentTransport = -1;
                
                isCellShowTime = false;
                listItems = tempBaseActivityItemsList;
                setListItemAndScrollBar();
                
                return -1;
            }
            else
            {
                currentTime = _type;
            }
        }
        
        //********************** var & animation ***********************
        
        
        if (currentTransport == -1)
        {
            currentTransport = "pied";
        }
        
        if (currentTime == -1)
        {
            currentTime = kDefaultCurrentTime;
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


function setMainSelectionItemsList(_type, _arg)
{
    log("setMainSelectionItemsList -> oldCurrentActivity : " + currentActivity + " / _type : " + _type + " /  + currentCity : " + currentCity + " / currentTransport : " + currentTransport + " / currentTime : " + currentTime);
    
    if (mPhotoSwipeHome)
        mPhotoSwipeHome.stop();
    
    
    if (cityBtnArray.indexOf(_type) != -1 && (cityBtnArray[_type] == "Geoloc" || cityBtnArray[_type] == "ChoosePosition"))
    {
            currentCity = -1;
    }
    else
    if ((activityBtnArray.indexOf(_type) != -1 && _type == currentActivity)
        || (cityBtnArray.indexOf(_type) != -1 && _type == cityBtnArray[currentCity])
        || (transportBtnArray.indexOf(_type) != -1 && _type == currentTransport)
        || (timeBtnArray.indexOf(_type) != -1 && _type == currentTime))
    {
        if (isModalPopUp)
            showModalPopUp();
        
        return;
    }
    else
    if (_type == "NoMatterCity" || _type == "NoMatterTransport" || _type == "NoMatterTime")
    {
        if (_type == "NoMatterCity" && currentCity != -1)
        {
            currentCity = -1;
            currentTransport = -1;
            currentTime = -1;
         
            var lTempType = currentActivity;
            currentActivity = -1;
            
            setMainSelectionItemsList(lTempType);
                 
            return;
        }
        else
        if ((_type == "NoMatterCity" && currentCity == -1)
            || (_type == "NoMatterTransport" && currentTransport == -1)
            || (_type == "NoMatterTime" && currentTime == -1))
        {
            if (isModalPopUp)
                showModalPopUp();
            
            return;
        }
        else
        if ((_type == "NoMatterTransport" && currentTransport != -1)
            || (_type == "NoMatterTime" && currentTime != -1))
        {
            currentTransport = -1;
            currentTime = -1;
            
            var lTempType = currentCity;
            currentCity = -1;
            
            setMainSelectionItemsList(cityBtnArray[lTempType]);
            
            return;
        }

     }
    
    
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
    
    if (_type == "MyFavorites" && getBaseActivityItemsList("MyFavorites").length == 0)
    {
        showLittleModalPopUp("noFavorites");
        currentActivity = -1;
        return;
    }
    else
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
	
	if (activityBtnArray.indexOf(_type) != -1)
	{

        currentActivity = _type;
        
        baseActivityItemsList = getBaseActivityItemsList(currentActivity);
        
        //*****************************
        
        if (currentCity != -1)
        {
            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
            {
                var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
                listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
                
                currentTransport = -1;
                
                currentTime = -1;
                
                isCellShowTime = false;
                
            }
            else
            {
                listItems = getArrayForCloseItemsFromList(baseActivityItemsList, cityGeoLoc[cityBtnArray[currentCity]]);
                
                if (currentTransport != -1)
                {
                    setItemListForHome();
                    
                    isCellShowTime = true;
                }
                else
                {
                    isCellShowTime = false;
                }
            }
        }
        else
        {
            if (currentActivity == "NoIdea")
            {
                listItems = baseActivityItemsList.sort(function() {return 0.5 - Math.random()});
            }
            else
                listItems = baseActivityItemsList;
                
            
            if (currentTransport == -1)
            {
                isCellShowTime = false;
            }
            else
            {
                currentCity = 0;
                setAndOrderListItems();
            }
        }

	}
	
	/************************************ CITY *******************************************/
	
	if (_type == "Marseille" || _type == "Aix" || _type == "Arles" || _type == "Jouques" || _type == "Geoloc" || _type == "ChoosePosition")
	{        
        //************************
        
        if (cityBtnArray[currentCity] == "ChoosePosition")
            userChoosePosition = null;
        
        if (cityBtnArray[currentCity] == "Geoloc")
            userLocation = null;
        
        //************************
        

        currentCity = _type;
        
        switch (_type)
        {
            case "Marseille":       currentCity = 0; break;
            case "Aix":             currentCity = 1; break;
            case "Arles":           currentCity = 2; break;
            case "Jouques":         currentCity = 3; break;
            case "Geoloc":          currentCity = 4; break;
            case "ChoosePosition":  currentCity = 5; break;
        }
        
        
        if (currentActivity == -1)
        {
            currentActivity = "NoIdea";
        }

        baseActivityItemsList = getBaseActivityItemsList(currentActivity);

                 
        if (_type == "Geoloc" || _type == "ChoosePosition")
        {
            var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
            listItems = getArrayForCloseItemsFromList(baseActivityItemsList, lUserPosition);
    

            isCellShowTime = false;
            
            currentTransport = -1;
            
            if (isAppScreen)
                currentTime = -1;
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

    
	/************************************ LEVEL 3 *******************************************/

	
	if (_type == "pied" || _type == "velo" || _type == "moto" || _type == "auto" || _type == "bus")
	{
        if (currentTransport != -1 && currentTransport == _type)
		{
            currentTransport = -1;
            currentTime = -1;
            
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
            
            if (currentActivity == -1)
            {
                currentActivity = "NoIdea";
            }
            
            baseActivityItemsList = getBaseActivityItemsList(currentActivity);
            
            
            if(currentCity == -1)
            {
                currentCity = 0;
            }
            
            if (currentTime == -1)
            {
                currentTime = kDefaultCurrentTime;
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
            
            if (currentActivity == -1)
            {
                currentActivity = "NoIdea";
            }
            
            baseActivityItemsList = getBaseActivityItemsList(currentActivity);
            
            if(currentCity == -1)
            {
                currentCity = 0;
            }
            
            if (currentTransport == -1)
            {
                currentTransport = "bus";
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
            
            setAndOrderListItems();
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
    
    if (isModalPopUp)
    {
        showModalPopUp();
    }
    
    setTimeout(function(){
               
               if (homeStatus == "Home")
               {
                    showList();
               }
               else if (homeStatus == "List")
               {               
                    setNextResultForItemList();
                    $("#itemListOptions").css("display", "inline-block");
               }
               else
               if (currentTable == "Index" && listItems.length == 0)
               {
                   var text = noResultsLabel[currentLang] + "<br><br>" + noTimeTransportLabel[currentLang].modifyCriteria;
               
                    showLittleModalPopUp(null, text, null);
               }
               
     }, 1000);


    //**************************************************************

    var lActivity = currentActivity != -1 ? "&currentActivity=" + currentActivity : "";
    var lCity = currentCity != -1 ? "&currentCity=" + cityBtnArray [currentCity] : "";
    window.location.href = window.location.href.toString().split("#")[0] + "#currentLang=" + currentLang + lActivity + lCity;
    
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
        
        var lDuration = getDurationForItemTransport(_listItems[n]);
        
        //log("filtrerListParTranche -> idRepName : " + _listItems[n].idRepName + " / lDuration : " + lDuration)
        
        if (parseInt(lTemp2Array[currentCity])*2 + lDuration <= parseInt(currentTime))
        {
            /*
            if (parseInt(lTemp2Array[currentCity])*2 + lDuration > lLimitTime)
            {
                lTempArrayHigh.push(_listItems[n]);
            }
            else
             */
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
    
/*
    if (lTempArrayHigh.length == 0)
    {
        lTempArray.reverse();
    }
*/
    
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
    
    //************************** then we order / coucou it's me Xavier ****************************
    
    var lIndex;
    var lItem;
    
    var lListOrder = window["order" + currentActivity];
    
    if (currentTransport == -1 && lListOrder && lListOrder.length > 0)
    {
        for (var i = 0; i < lListOrder.length; i++)
        {
            for (var n = 0; n < lArrayInCity.length; n++)
            {
                if (lArrayInCity[n].idRepName == lListOrder[i] && lArrayInCity[n].city == cityBtnArray[currentCity])
                {
                    lIndex = n;
                    lItem = clone(lArrayInCity[n]);
                    
                    lArrayInCity.splice(lIndex, 1);
                    
                    lArrayInCity.splice(i, 0, lItem);
                }
            }
        }
    }
    
    
    //*********************** we can also order by items ****************
    
    if (currentTransport == -1 && localStorage.orderItemsArray)
    {
        var orderItemsArray = jQuery.parseJSON(localStorage.orderItemsArray);
        
        for (var prop in orderItemsArray)
        {
            if (orderItemsArray.hasOwnProperty(prop) && prop == currentActivity && orderItemsArray[prop].length > 0)
            {
                var lOrderArray = orderItemsArray[prop];
                
                for (var i = 0; i < lOrderArray.length; i++)
                {
                    var lIdRepname = lOrderArray[i][0];
                    var lFinalPosition = lOrderArray[i][1];
                    
                    if (lFinalPosition == -1)
                        lFinalPosition = lTempList.length - 1;
                    
                    for (var t = 0; t < lArrayInCity.length; t++)
                    {
                        if (lArrayInCity[t].idRepName == lIdRepname && lArrayInCity[t].city == cityBtnArray[currentCity])
                        {
                            lIndex = t;
                            lItem = clone(lArrayInCity[t]);
                            
                            lArrayInCity.splice(lIndex, 1);
                            
                            lArrayInCity.splice(lFinalPosition, 0, lItem);
                        }
                    }
                }
            }
        }
    }
    
    
    //**********************************************************************************************
    
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
            var lDuration = getDurationForItemTransport(tempBaseActivityItemsList[i]);
            
            log("filterListItemsByTransport -> lDuration : " + lDuration);
            
            
            if (parseInt(tempBaseActivityItemsList[i][_costType])*2 + lDuration <= parseInt(currentTime))
            {
                /*
                if (parseInt(tempBaseActivityItemsList[i][_costType])*2 + lDuration > lLimitTime)
                {
                    lTempArrayHigh.push(tempBaseActivityItemsList[i]);
                }
                else
                 */
                {
                    lTempArrayLow.push(tempBaseActivityItemsList[i]);
                }
            }
            
        }
    }
    
    

    tempList = lTempArrayHigh.concat(lTempArrayLow);
    
    listItems = tempList;
    
    log("filterListItemsByTransport -> _costType : " + _costType);
    
    if (currentTime == 18000)
    {
        /*
        if (lTempArrayHigh.length == 0)
        {
            listItems.reverse();
        }
         */
        
        listItems = tempList.concat(tempNullList);
    }
            
    tempArrayForSearchList = listItems;
     
}


function getDurationForItemTransport(_item)
{
    var _duration = duration;
    
    switch (_item.table)
    {
        case "Circuits" :
            _duration = parseInt(_item.duration);
            break;
            
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
            
        case "BonsPlans" :
        {
            if (_item.type == "Visite")
                _duration +=  60;
        }
            
        case "Sortir" :
        {
            if (_item.type == "Concert")
                _duration +=  120;
            else
            if (_item.type == "Spectacle")
                _duration +=  90;
            else
            if (_item.type == "Disco")
                _duration +=  90;
            else
            if (_item.type == "Agenda")
                _duration +=  180;
        }
            
            break;
    }
    
    return _duration;
}


function getBaseActivityItemsList(_type)
{
    var lItem;
    var lTempList = [];
    
    switch (_type)
    {
        case "NoIdea":                  lTempList = getFullConcatListItems(); break;
            
        case "Monuments":				lTempList = listItemsMonuments; break;
        case "Canyons":					lTempList = listItemsCanyons; break;
        case "SitesEscalade":			lTempList = listItemsSitesEscalade; break;
        case "Randonnee":               lTempList = listItemsRandonnee; break;
        case "Petanque":                lTempList = listItemsPetanque; break;
        case "Restos":                  lTempList = listItemsRestos; break;
        case "Dormir":                  lTempList = listItemsDormir; break;
        case "Shopping":                lTempList = listItemsShopping; break;
        case "Loisirs":                 lTempList = listItemsLoisirs; break;
        case "Circuits":                lTempList = listItemsCircuits; break;
        case "BonsPlans":               lTempList = listItemsBonsPlans; break;
        case "SitesNaturels":           lTempList = listItemsSitesNaturels; break;
            
            
            // make also changed in mapItem -> getTypeForMarker

        case "ExpositionsMusees":
        {
            lTempList = listItemsExpositionsMusees;
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                lItem = clone(getItemInDataList("vignelaure", "Shopping"));
                lItem.type = "Contemporain";
                lItem.mainImage = "Image8.jpg";
                lTempList.push(lItem);
            }
             */
        }
            break;
            
        case "PlageBaignadePiscine":
        {
            lTempList = listItemsPlageBaignadePiscine;
            
            /*
            if (!spatialiteToPhp && !isMobileWeb && !isTestSpatialite)
            {
                lTempList.push(getItemInDataList("ilesDuFrioul", "SitesNaturels"));
                lTempList.push(getItemInDataList("sormiou", "SitesNaturels"));
                lTempList.push(getItemInDataList("sugiton", "SitesNaturels"));
                
                lItem = clone(getItemInDataList("vallonSourn", "SitesNaturels"));
                lItem.type = "River";
                lTempList.push(lItem);
                
                lItem = clone(getItemInDataList("sillansLaCascade", "SitesNaturels"));
                lItem.type = "River";
                lTempList.push(lItem);
                
                lItem = clone(getItemInDataList("cascadeMontaud", "Canyons"));
                lItem.type = "River";
                lTempList.push(lItem);
            }
             */
        }
            break;
            
        case "Sortir":
        {
            lTempList = listItemsSortir;
            /*
            var lReserveArray = clone(lTempList).reverse();
            
            if (!spatialiteToPhp && !isTestSpatialite)
            {
                lItem = clone(getItemInDataList("mamaShelter", "Restos"));
                lItem.table = "Sortir";
                lItem.type = "Concert";
                lReserveArray.push(lItem);
            }
            
            lTempList = lReserveArray.reverse();
             */
            
        }
            break;

            
        case "MyFavorites" : {
            
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
                    lTempList.push(favoritesItemsArray[f]);
            }
            
            listItemsMyFavorites = lTempList;
            
        }; break;
            
            
        case "Classics" : {
            
            for (var i = 0; i < classicsArray.length; i++)
            {
                lTempList.push(getItemInDataList(classicsArray[i]));
            }
            
            listItemsClassics = lTempList;
            
        }; break;
            
            
        case "Favorites" : {
            
            for (var i = 0; i < favoritesArray.length; i++)
            {
                lTempList.push(getItemInDataList(favoritesArray[i]));
            }
            
            listItemsFavorites = lTempList;
            
        }; break;
            
            
        case "BestViews" : {
            
            for (var i = 0; i < bestViewsArray.length; i++)
            {
                lTempList.push(getItemInDataList(bestViewsArray[i].split(", ")[0]));
            }
            
            listItemsBestViews = lTempList;
            
        }; break;
    }
    
    
    //**************** first order *************
    
     if (_type != "Circuits" && _type != "Classics" && _type != "Favorites" && _type != "BestViews" && _type != "MyFavorites")
     {
         lTempList = clone(lTempList).reverse();
     }
    
    
    /************* looking after duplicate Items ******************/
    
    if (_type != "NoIdea" && (currentCity != -1 || isMapVisible))
    {
        lTempList = setDuplicateItems(lTempList);
    }
    
    //*********************** we order by fix list ****************
    
    var lIndex;
    var lItem;
    
    var lListOrder = window["order" + _type];

    
    if (currentCity == -1 && lListOrder && lListOrder.length > 0)
    {
        //log("getBaseActivityItemsList -> lListOrder _type : " + _type + " / " + JSON.stringify(lListOrder));
        
        for (var i = 0; i < lListOrder.length; i++)
        {
            for (var t = 0; t < lTempList.length; t++)
            {
                if (lTempList[t].idRepName == lListOrder[i])
                {
                    lIndex = t;
                    lItem = clone(lTempList[t]);
                    
                    lTempList.splice(lIndex, 1);
                    
                    lTempList.splice(i, 0, lItem);
                }
            }
        }
    }
    
     //*********************** we can also order by items ****************
    
    if (currentCity == -1 && localStorage.orderItemsArray)
    {
        var orderItemsArray = jQuery.parseJSON(localStorage.orderItemsArray);
        
        for (var prop in orderItemsArray)
        {
            if (orderItemsArray.hasOwnProperty(prop) && prop == currentActivity && orderItemsArray[prop].length > 0)
            {
                var lOrderArray = orderItemsArray[prop];
                
                for (var i = 0; i < lOrderArray.length; i++)
                {
                    var lIdRepname = lOrderArray[i][0];
                    var lFinalPosition = lOrderArray[i][1];
                    
                    if (lFinalPosition == -1)
                        lFinalPosition = lTempList.length - 1;
                    
                    for (var t = 0; t < lTempList.length; t++)
                    {
                        if (lTempList[t].idRepName == lIdRepname)
                        {
                            lIndex = t;
                            lItem = clone(lTempList[t]);
                            
                            lTempList.splice(lIndex, 1);
                            
                            lTempList.splice(lFinalPosition, 0, lItem);
                        }
                    }
                }
            }
        }
    }
    
    
    
    /************************************************************/
    
    
    
    return clone(lTempList);
}


function getFullConcatListItems()
{
    //return listItemsExpositionsMusees.concat(listItemsPetanque);
    
    var lTempList = listItemsExpositionsMusees.concat(listItemsMonuments, listItemsSitesNaturels, listItemsPlageBaignadePiscine, listItemsCanyons, listItemsSitesEscalade, listItemsRandonnee, listItemsBonsPlans, listItemsPetanque, listItemsSortir, listItemsRestos, listItemsDormir, listItemsShopping, listItemsLoisirs, listItemsCircuits);
    
    return setDuplicateItems(lTempList);
}


function setDuplicateItems(_listArray)
{
    var lDuplicateArray = [];
    
    for (var i = 0; i < _listArray.length; i++)
    {
        if (_listArray[i].duplicateItems)
        {
            //log("******** duplicateItems -> _listArray[i].duplicateItems : " +JSON.stringify(_listArray[i].duplicateItems));
            
            var lItemsArray = jQuery.parseJSON(_listArray[i].duplicateItems);
            
            for (var t = 0; t < lItemsArray.length; t++)
            {
                var lItem = clone(_listArray[i]);
                
                for (var prop in lItemsArray[t])
                {
                    if (lItemsArray[t].hasOwnProperty(prop))
                    {
                        lItem[prop] = lItemsArray[t][prop];
                    }
                }
                
                lDuplicateArray.push(lItem);
                
                //log("******** duplicateItems -> lItem : " +JSON.stringify(lItem));
            }
        }
    }
    
    return _listArray.concat(lDuplicateArray);
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


function setBgImage(_currentTable, _arg)
{
    /*
     
    var nameImage;
    
    switch (_currentTable)
    {
        case "Index" :              nameImage = "Sugiton"; break;
        case "AgencesReceptives" :  nameImage = "fond"; break;
        case "Campings" :           nameImage = "fond"; break;
        case "Guides" :             nameImage = "fond1"; break;
        case "LocationVelo" :       nameImage = "fond"; break;
        case "MoniteursEscalade" :  nameImage = "fond2"; break;
        case "OfficesTourisme" :    nameImage = "fond"; break;
        case "MetroTram" :			nameImage = "fond"; break;
		case "Contact" :			nameImage = "fond"; break;
        case "Parkings" :			nameImage = "fond"; break;
        case "Massifs" :			nameImage = "fond"; break;
        case "Restaurants" :		nameImage = "fond"; break;
        case "Hebergements" :		nameImage = "fond"; break;
        default:                    nameImage = "Sugiton"; break;
    }
	
	var extension = "_small";
    
    var lImage = urlPictures + '/' + _currentTable + '/' + nameImage + extension + '.jpg';
    
    if (_arg == "photoSwipeHome")
        return lImage;
    */
    
    var lImage = urlPictures + '/Index/pages/' + _currentTable + '.jpg';
    
    $("#bgImage").css("background-image", "url('" + lImage + "')");
}


function setHomeBgImage(_currentActivity, _arg)
{
    //alert(currentActivity);
    
    var nameImage;
    
    switch (_currentActivity)
    {
            
        case "Index" :					nameImage = "Sugiton"; break;
        case "NoIdea" :                 nameImage = "NoIdea"; break;
        case "BonsPlans" :              nameImage = "BonsPlans"; break;
        case "ExpositionsMusees" :      nameImage = "ExpositionsMusees_v1"; break;
        case "Monuments" :              nameImage = "major"; break;
        case "SitesNaturels" :          nameImage = "SitesNaturels"; break;
        case "PlageBaignadePiscine" :   nameImage = "PlageBaignadePiscine"; break;
        case "Canyons" :                nameImage = "Canyons"; break;
        case "SitesEscalade" :          nameImage = "SitesEscalade_v1"; break;
        case "Randonnee" :              nameImage = "Randonnee"; break;
        case "Petanque" :               nameImage = "Petanque"; break;
        case "Sortir" :                 nameImage = "Sortir"; break;
        case "Restos" :                 nameImage = "Restos"; break;
        case "Shopping" :               nameImage = "Shopping"; break;
        case "Circuits" :               nameImage = "Circuits"; break;
        case "Dormir" :                 nameImage = "Dormir"; break;
        case "Loisirs" :                nameImage = "Loisirs"; break;
        case "Classics" :               nameImage = "Classics"; break;
        case "Favorites" :              nameImage = "Favorites"; break;
        case "MyFavorites" :            nameImage = "MyFavorites"; break;
        case "BestViews" :              nameImage = "MucemFortMajor"; break;
        default:                        nameImage = "Sugiton"; break;
    }
    
    var captionImage;
    
    switch (_currentActivity)
    {
        case "Index" :					captionImage = "Installation Champs harmoniques - MP2013"; break;
        case "NoIdea" :                 captionImage = "Le Vallon des Auffes"; break;
        case "BonsPlans" :              captionImage = "Le marché aux poissons"; break;
        case "ExpositionsMusees" :      captionImage = "Musée Granet"; break;
        case "Monuments" :              captionImage = "Cathédrale La Major"; break;
        case "SitesNaturels" :          captionImage = "Calanques de Marseilleveyre"; break;
        case "PlageBaignadePiscine" :   captionImage = "Plage des Catalans"; break;
        case "Canyons" :                captionImage = "Trou de Jeannette"; break;
        case "SitesEscalade" :          captionImage = "Buoux"; break;
        case "Randonnee" :              captionImage = "Sainte Victoire"; break;
        case "Petanque" :               captionImage = "Petanque"; break;
        case "Sortir" :                 captionImage = "Soirée Borderline"; break;
        case "Restos" :                 captionImage = "L'Esprit de la Violette"; break;
        case "Shopping" :               captionImage = "Les parfums de la Compagnie Marseillaise"; break;
        case "Dormir" :                 captionImage = "Hôtel Mistral - Pointe route, Prado"; break;
        case "Circuits" :               captionImage = "Circuits en tuktuk"; break;
        case "Loisirs" :                captionImage = "Funny zoo - Parc Longchamps"; break;
        case "Classics" :               captionImage = "Parc Borely"; break;
        case "Favorites" :              captionImage = "Lac de Peirou"; break;
        case "MyFavorites" :            captionImage = "La Vautubière - Jouques"; break;
        default:                        captionImage = "Marseille Provence"; break;
    }
    
    var itemToLink = "";
    
    switch (_currentActivity)
    {
        case "Index" :					itemToLink = ""; break;
        case "NoIdea" :                 itemToLink = "Monuments,vallonAuffes"; break;
        case "BonsPlans" :              itemToLink = "Shopping,marchePoisson"; break;
        case "ExpositionsMusees" :      itemToLink = "ExpositionsMusees,MuseeGranet"; break;
        case "Monuments" :              itemToLink = "Monuments,major"; break;
        case "SitesNaturels" :          itemToLink = "Randonnee,calanqueMarseilleVeyre"; break;
        case "PlageBaignadePiscine" :   itemToLink = "PlageBaignadePiscine,PlageCatalans"; break;
        case "Canyons" :                itemToLink = "Canyons,Jeannette"; break;
        case "SitesEscalade" :          itemToLink = "SitesEscalade,BuouxEscalade"; break;
        case "Randonnee" :              itemToLink = "SitesNaturels,paysSainteVictoire"; break;
        case "Petanque" :               itemToLink = "Petanque,petanqueCoursJu"; break;
        case "Sortir" :                 itemToLink = "Sortir,borderline"; break;
        case "Restos" :                 itemToLink = "Restos,espritViolette"; break;
        case "Shopping" :               itemToLink = "Shopping,cieMarseillaise"; break;
        case "Circuits" :               itemToLink = "BonsPlans2,tuktuk"; break;
        case "Dormir" :                 itemToLink = "Dormir,hotelMistral"; break;
        case "Loisirs" :                itemToLink = "Loisirs,funnyZoo"; break;
        case "Classics" :               itemToLink = "SitesNaturels,parcBorely"; break;
        case "Favorites" :              itemToLink = "PlageBaignadePiscine,lacPeirou"; break;
        case "MyFavorites" :              itemToLink = ""; break;
        default:                        itemToLink = ""; break;
    }
    
    /*
	var extension = "";
	
	if (getXsize() < 600 || (isIpad && !isNetWorkAvalaible))
		extension = "_small";
    
    var lStartUrl = "";
    
    if (isIpad && isNetWorkAvalaible)
        lStartUrl = urlWeb;
     
     var lImage = lStartUrl + 'pictures/' + currentTable + '/' + nameImage + extension + '.jpg';
    */
    
    var lImage = urlPictures + '/Index/' + nameImage + '.jpg';
    
    
    //log ("setHomeBgImage -> lImage : " + lImage);
    
    //******************
    
    if (_arg == "photoSwipeHome")
        return {"image" : lImage, "caption" : captionImage, "itemToLink" : itemToLink};
    

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
            resetPhotoSwipeHome();
        }
    }
    
    $("#bgImage").css("background-image", "url('" + lImage + "')");
}



function setSwiperHome()
{
    $(".diapoCategoryArrowLeft").css("display", "inline-block");
    $(".diapoCategoryArrowRight").css("display", "inline-block");
    
    mSwiperHome = new Swiper('.swiper-container_home', {
                             spaceBetween: 0,
                             resistanceRatio: 0.1,
                             slidesPerView: 2,
                             prevButton: '.diapoCategoryArrowLeft',
                             nextButton: '.diapoCategoryArrowRight',
                             loop: true,
                             });
    
    var lTop = ($("#leftHomeSelectionBlock").height() / 2) - ($(".diapoCategoryArrowLeft").height() / 2);
    $(".diapoCategoryArrowLeft").css("top", lTop + "px");
    $(".diapoCategoryArrowRight").css("top", lTop + "px");
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
