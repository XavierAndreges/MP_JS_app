function clearItemList()
{
    $("#itemList").html('');
    listItems = [];
    indexItemList = 0;
    lastIndexItemList = 0;
    $("#itemListOptions").css("display", "none");
    $("#itemListBottomBtn").css("display", "none");
    $("#searchForm").val(commonLabel[currentLang].Research + "...");
    currentItemDetail = -1;
}


function switchSmallBig(_type)
{
    log("switchSmallBig -> type " + _type);
    
    if (_type == "Small")
    {
        $("#switchSmall").css("background-image", "url('Assets/switchSmall_on.png')");
        $("#switchBig").css("background-image", "url('Assets/switchBig_off.png')");
    }
    else
    {
        $("#switchSmall").css("background-image", "url('Assets/switchSmall_off.png')");
        $("#switchBig").css("background-image", "url('Assets/switchBig_on.png')");
    }
    
    $("#itemList").html('');
    indexItemList = 10;
    lastIndexItemList = 0;
    
    mSwitchSmallBig = _type;
    
    setItemList(_type);
    
    displayOrNotNextResultsBtn();
}


function setNextResultForItemList()
{
    //log("setNextResultForItemList -> listItems.length : " + listItems.length + " | lastIndexItemList : " + lastIndexItemList + " / indexItemList : " + indexItemList);
    
    if (homeStatus == "List")
    {
        //************ index **************
        
        var lNbNextResult = listItems.length - indexItemList;
        
        if (lNbNextResult >= 10)
            indexItemList += 10;
        else
            indexItemList += lNbNextResult;
    }
    else
    {
        if (lastIndexItemList > 0)
            indexItemList = lastIndexItemList;
        else
            indexItemList = 10;
    }
    
    //************ write list **************
    
    setItemList(mSwitchSmallBig);
    
    //log("setNextResultForItemList 2 -> listItems.length : " + listItems.length + " | indexItemList : " + indexItemList);
}


function setItemList(_type)
{
	log ("setItemList -> listItems.length : " + listItems.length + " / lastIndexItemList : " + lastIndexItemList + " / indexItemList : " + indexItemList + " / isNetWorkAvalaible : " + isNetWorkAvalaible + " / isImageOffLine : " + isImageOffLine);
    
    //alert("setItemList");
	
	//$("#itemList").html('');
    
    if (listItems.length <= indexItemList)
    {
        indexItemList = listItems.length;
    }
    /*
    else
    if ((currentActivity != "NoIdea" && !isTablePracticalLink)
        || (currentActivity == "NoIdea" && getActivatedCriterias().length > 0))
    {
        if (isImageOffLine || !isNetWorkAvalaible)
        {
            //nothing to do
        }
        else
            indexItemList = listItems.length;
    }
    */
    
    if (lastIndexItemList == 0)
        $("#itemList").append("<div id='hackItemListMarginBottom'></div>");
    
	for (var n = lastIndexItemList; n < indexItemList; n++)
	{
        //log("setItemList -> listItems[n]");
        //log(listItems[n]);
  
        if ($.isArray(listItems[n]))
        {               
			itemCellForSlider(n);
        }
        else
		if (!isTablePracticalLink)
		{
			if (currentTable == "Index" && listItems[n].type == "MP2013")
			{
				$("#itemList").append(htmlForMP2013Cell(n));          
			}
			else
			{										  
				$("#itemList").append(getMyCellBlock(null, n, _type));
                
                if (isProd && homeStatus == "Home")
                {
                    gaTrackEvent('HomePage', listItems[n].idRepName, 'itemsHome', 0);
                }
			}
		}
		else
		{
            if (listItems[n].type == "VeloMPM")
                $("#itemList").append(itemCellforVeloMPM(n));
            else
            if (listItems[n].type == "MetroTram")
                $("#itemList").append(itemCellforMetroTram(n));
            else
            if (listItems[n].type == "cdt:MassifMontagne")
                $("#itemList").append(itemCellforMassifs(n));
            else
                $("#itemList").append(itemCellforPracticalTable(n));
		}

        
        if (n == indexItemList - 1)
        {
            setItemListIsDone(_type);
        }
	}
    
    
    if (listItems.length == 0)
    {
        log("setItemList -> listItems.length == 0 ");
        //log ("currentTransport : " + currentTransport + " / currentActivity : " + currentActivity);
        var text;
        
        if (currentActivity == "MyFavorites")
        {
            text = commonLabel[currentLang].noFavorite;
            
            $("#showMapBtn").css("display", "none");
        }
        else
            //if (currentActivity != "MP2013" && currentActivity != "Expo" && currentTransport != -1)
            if (currentTransport != -1 && !isTrierOptionsOpened)
            {
                //if (currentActivity == "MP2013" || currentActivity == "Expo")
                text = "<strong>" + noResultsLabel[currentLang] + "</strong><br><br>" + noTimeTransportLabel[currentLang].modifyCriteria;
            }
        /*
         else
         if ((currentActivity == "MP2013" || currentActivity == "Expo") && currentCity != -1)
         {
         text = noTimeTransportLabel[currentLang].notAvailable;
         }
         */
            else
            {
                text = noResultsLabel[currentLang];
            }
        
        
        $("#itemList").append('<div class="noItemListResult corner">'+
                              text +
                              '</div>');
        
        $("#itemListBottomBtn").css("display", "none");
        
        removeLoadingAnimation();
    }
}


function setItemListIsDone(_type)
{
    if (currentActivity == "Classics" || currentActivity == "Favorites" || currentActivity == "MyFavorites")
    {
        $("#trierBtnItemList").css("display", "none");
    }
    else
    {
        $("#trierBtnItemList").css("display", "inline-block");
    }
    //******************************  resize block text *********************************
    
    setSizeToBlockTextAtList();
    
    setSizeAndMarginForList(_type);
    
    setTimeout(function()
               {
               /*
               if (currentActivity == "MyFavorites")
                setEventGestureToDeleteFavorites();
               */
               
               if (currentTable == "Massifs" && window["massifs"] !== undefined)
                setStatusForMassifs();
               
               setTimeout(ajdustTitleIfTooLarge, 50);
               
               setTimeout(ajdustCityIfTooLarge, 100);
               
               setTimeout(ajdustHeightCell, 150);
               
               setTimeout(removeLoadingAnimation, 200);
               
               }, 50);
    
    
    if (indexItemList <= 10)
    {
        setTimeout(launchPicturesForList, 300);
    }
    else
    {
        setTimeout(launchScrollForList, 300);
    }

    
    if (isProd || isProdWeb)
    {
        if (currentTable == "Index")
        {
            gaTrackPage('setItemList');
            
            gaTrackEvent('setItemList', 'Activity : ' + currentActivity + ' / City : ' + cityBtnArray[currentCity], 'Time : ' + currentTime + ' / Transport : ' + currentTransport, 0);
        }
    }
}


function launchPicturesForList()
{
    log("launchPicturesForList -> lastIndexItemList: " + lastIndexItemList + " / indexItemList : " + indexItemList);
    
    if (currentTable == "Index")
        setFilePictureForList();

    setTimeout(function()
            {
               lastIndexItemList = indexItemList;
               
               displayOrNotNextResultsBtn();
               
            }, 500);
}



function setItemListForHome()
{
    if (spatialiteToPhp)
        return;
        
        
    $("#itemList").fadeIn(1000);
    
    listItems = [];
    
    for (var i = 0; i < mItemsHomeArray.length && i < 10; i++)
    {
        listItems.push(getItemInDataList(mItemsHomeArray[i]));
        
        if (isProd || isProdWeb)
        {
            gaTrackEvent('vignettes', 'idRepName : ' + mItemsHomeArray[i], 'currentItem : home ', 0);
        }
    }
    
    indexItemList = 10;
    
    //************** small is used for specify class
    
    if (getXsize() <= 550)
        setItemList("Small");
    else
        setItemList();
}



function reverseOrderListItems()
{
    listItems = clone(listItems).reverse();
    
    $("#itemList").html('');
    
    indexItemList = 10;
    lastIndexItemList = 0;
    
    setItemList();
    
    if (btnReverseStatus == "up")
    {
        btnReverseStatus = "down";
    }
    else
    {
        btnReverseStatus = "up";
    }
    
    $("#reverseListItem").css("background-image", "url(Assets/btn_reverse_" + btnReverseStatus + ".png)");
}



function setFontSizeAndMarginTopForList()
{
    //********************** font *********************
    
    if (getXsize() <= mSizeLimitForSmall)
    {
        $(".blocTextList").css("font-size", "1.05em");
        $(".blocTextList").css("margin-top", "-20px");
    }
    else
    if (getXsize() > 680)
    {
        $(".blocTextList").css("font-size", "16px");
        $(".blocTextList").css("margin-top", "-24px");
    }
    else
    if (getXsize() > 550)
    {
        $(".blocTextList").css("font-size", "13px");
        $(".blocTextList").css("margin-top", "-22px");
    }
    else
    {
        $(".blocTextList").css("font-size", "12px");
        $(".blocTextList").css("margin-top", "-20px");
    }
}


function setSizeAndMarginForList(_type)
{
    setFontSizeAndMarginTopForList();
    
    //**************** we retrieve small to act on specified class
    
    var Small = _type == "Small" ? "Small" : "";
    
    if (mSwitchSmallBig == "Small")
        Small = "Small";
    
    
    var lNeedToSize = getXsize() > mSizeLimitForSmall ? true : false;
    

    //*************************************************
    
    //log("setSizeAndMarginForList -> homeStatus : " + homeStatus + " / type : " + _type + " / mSwitchSmallBig : " + mSwitchSmallBig + " / Small : " + Small);
    
    if (lNeedToSize)
    {
        if (Small == "Small")
        {
            setSizeAndMarginForListWhenSizeIsFixed(Small);
        }
        else
        {
            if (getXsize() <= 800 || homeStatus == "Home")
                setSizeAndMarginForListBy2Columns();
            else
                setSizeAndMarginForListBy3Columns();
        }
    }
}


function setSizeAndMarginForListBy3Columns()
{
    //log ("********* 3 columns ********* setSizeAndMarginForListBy3Columns");
    
    var lXmargin = 10;
    
    $("#itemList").css("width", (getXsize() - (2 * lXmargin)) + "px");
    
    $("#itemList").css("margin-left", (1 * lXmargin) + "px");
    
    $("#itemList").css("margin-right", (1 * lXmargin) + "px");
    
    
    
    $(".itemHome").css("width", (($("#itemList").width() / 3) - (2 * lXmargin)) + "px");
    
    $(".itemHome").css("margin-left", lXmargin + "px");
    
    $(".itemHome").css("margin-right", lXmargin + "px");
    
    $(".mainVisualList").css("width", $(".itemHome").width() + "px");
    
    $(".itemHome").css("height", ($(".itemHome").width() * 0.97) + "px");
    
    $(".mainVisualList").css("height", $(".itemHome").width() * 0.735 + "px");
}



function setSizeAndMarginForListBy2Columns()
{
    log ("********* 2 columns ********* setSizeAndMarginForListBy2Columns");
    
    var lXmargin = 15;
    
    $("#itemList").css("width", (getXsize() - (2 * lXmargin)) + "px");
    
    $("#itemList").css("margin-left", (1 * lXmargin) + "px");
    
    $("#itemList").css("margin-right", (1 * lXmargin) + "px");
    
    

    $(".itemHome").css("width", (($("#itemList").width() / 2) - (2 * lXmargin)) + "px");
    
    $(".itemHome").css("margin-left", lXmargin + "px");
    
    $(".itemHome").css("margin-right", lXmargin + "px");
    
    $(".mainVisualList").css("width", $(".itemHome").width() + "px");
    
    if (getXsize() < getYsize())
    {
        $(".itemHome").css("height", ($(".itemHome").width() * 1) + "px");
        
        $(".mainVisualList").css("height", $(".itemHome").width() * 0.735 + "px");
    }
    else
    {
        var lCoefItem = 1;
        var lCoefVisual = 0.6;
        
        if (getXsize() >= 768)
        {
            lCoefItem = 0.67;
            lCoefVisual = 0.5;
        }
        else
        if (getXsize() >= 700)
        {
            lCoefItem = 0.80;
            lCoefVisual = 0.55;
        }
        else
        if (getXsize() >= 550)
        {
            lCoefItem = 0.7;
            lCoefVisual = 0.55;
        }
        
        $(".itemHome").css("height", ($(".itemHome").width() * lCoefItem) + "px");
        
        $(".mainVisualList").css("height", ($(".itemHome").width() * lCoefVisual) + "px");
    }
}


function setSizeAndMarginForListWhenSizeIsFixed(Small)
{
    if (currentTable != "Index")
        return;
    
    log("********* SizeIsFixed  ********* setSizeAndMarginForListWhenSizeIsFixed -> Small : " + Small + " / itemHome width : " +  $(".itemHome" + Small).width());
    
    var lCellSize = $(".itemHome" + Small).width() + parseInt($(".itemHome" + Small).css("margin-left").replace('px', '')) + parseInt($(".itemHome" + Small).css("margin-right").replace('px', ''));
    
    var lListSize = $("#itemList").width();
    
    var nbCell = Math.floor(lListSize / lCellSize);
    
    $("#itemList").css("width", lCellSize * nbCell + parseInt($(".itemHome" + Small).css("margin-right").replace('px', '')) + "px");
    
    $("#itemList").css("margin-left", (getXsize() - lCellSize * nbCell) / 2 + "px");
    
    $("#itemList").css("margin-right", (getXsize() - lCellSize * nbCell) / 2 + "px");
    
    log("setSizeAndMarginForListWhenSizeIsFixed -> lCellSize : " + lCellSize + " / lListSize : " + lListSize + " / nbCell : " + nbCell);
}


function setSizeToBlockTextAtList()
{
    //return;
    
    var lWidth;
    

    if (currentTable != "Index")
    {
        if (getXsize() > 945)
        {
            $(".itemPractical").css("width", "30%");
            lWidth = 30;
        }
        else
        if (getXsize() > 625)
        {
            $(".itemPractical").css("width", "47%");
            lWidth = 30;
        }
        else
        {
            $(".itemPractical").css("width", "98%");
            lWidth = 35;
        }
        
        log("setSizeToBlockTextAtList -> " + $(".itemPractical").width());
    }
    else
        lWidth = 15;
    
    
    if (currentTable == "Index")
    {
        if (getXsize() <= mSizeLimitForSmall)
            $(".blocTextListSmall").css("width", $("#itemList").width() - $(".mainVisualListSmall").width() - lWidth + "px");
        else
            $(".blocTextListSmall").css("width", $(".itemHomeSmall").width() + "px");
    }
    else
    {
        var lBonusWidth = 0;
        
        if (getXsize() <= 400)
        {
            lBonusWidth = 0;
        }
        else
        if (getXsize() >= 800)
            lBonusWidth = 10;
        else
            lBonusWidth = 30;
        
        $(".blocTextOptionList").css("width", $(".itemPractical").width() - $(".mainVisualPractical").width() - lWidth - lBonusWidth);
    }
}


function ajdustHeightCell()
{
    if (getXsize () <= mSizeLimitForSmall && currentTable == "Index" && homeStatus == "List" && mSwitchSmallBig == "Big")
    {
        for (var i = 0; i < indexItemList; i++)
        {
            var titleCell = $('#titleCellText' + i).outerHeight();
            
            //log("ajdustHeightCell -> titleCell : " + titleCell);
            
            if (getXsize() < mSizeLimitForSmall && titleCell > 20)
            {
                $('#' + i).css('height', '246px');
            }
            
        }
    }
}


function ajdustCityIfTooLarge()
{
    for (var t = 0; t < indexItemList; t++)
    {
        var cityText = $('#cityLabelCell' + t);
        
        while ($(cityText).outerHeight() > 22)
        {
            $(cityText).text(function (index, text)
                             {
                             return text.replace(/\W*\s(\S)*$/, '...');
                             });
        }
    }
}


function ajdustTitleIfTooLarge()
{
    for (var i = 0; i < indexItemList; i++)
    {
        //************** Home ******************
        
        if (currentTable == "Index" && (currentActivity == "MP2013" || currentActivity == "Expo" || currentCity != -1))
        {
            var titleText = $('#titleCellMP2013_' + i + ' p');
            
            while ($(titleText).outerHeight() > 40)
            {
                $(titleText).text(function (index, text)
                                  {
                                  return text.replace(/\W*\s(\S)*$/, '...');
                                  });
            }
            
            var dateText = $('#dateCellMP2013_' + i + ' p');
            
            while ($(dateText).outerHeight() > (isLikeMobile ? 20 : 40))
            {
                $(dateText).text(function (index, text)
                                 {
                                 return text.replace(/\W*\s(\S)*$/, '...');
                                 });
            }
            
            var cityText = $('#cityCellMP2013_' + i + ' p');
            
            while ($(cityText).outerHeight() > (isLikeMobile ? 20 : 40))
            {
                $(cityText).text(function (index, text)
                                 {
                                 return text.replace(/\W*\s(\S)*$/, '...');
                                 });
            }
            
            
            if (isCellShowTime && (
                                   ($(titleText).outerHeight() >=30 && $(dateText).outerHeight() >= 30)
                                   || ($(titleText).outerHeight() >=30 && $(cityText).outerHeight() >= 30)
                                   || ($(cityText).outerHeight() >=30 && $(dateText).outerHeight() >= 30)
                                   )
                )
            {
                while ($(dateText).outerHeight() > 20)
                {
                    $(dateText).text(function (index, text)
                                     {
                                     return text.replace(/\W*\s(\S)*$/, '...');
                                     });
                }
            }
            
            
            if (isCellShowTime && isLikeMobile && getXsize() > 570 && $(titleText).outerHeight() >=30)
            {
                while ($(titleText).outerHeight() > 20)
                {
                    $(titleText).text(function (index, text)
                                      {
                                      return text.replace(/\W*\s(\S)*$/, '...');
                                      });
                }
            }
            
        }
        
        if (currentTable == "Index" && currentActivity == "Canyons")
        {
            var mountainsText = $('#mountainsCellText' + i);
            
            while ($(mountainsText).height() > 20)
            {
                $(mountainsText).text(function (index, text)
                                   {
                                   return text.replace(/\W*\s(\S)*$/, '...');
                                   });
            }
        }
        
        
        //************** isIpad ******************
        
        
        if (isIpad  && currentTable == "Index")
        {
            var resumeText = $('#resumeCellText' + i);
            
            var limitHeightResume = 45;
            
            if (currentActivity == "Canyons" || currentActivity == "SitesEscalade" || currentActivity == "Randonnee")
                limitHeightResume = 30;
            
            while ($(resumeText).outerHeight() > limitHeightResume)
            {
                $(resumeText).text(function (index, text)
                                   {
                                   return text.replace(/\W*\s(\S)*$/, '...');
                                   });
            }
        }
        
        
        
        //************** Circuit ******************
        
        
        if (isIpad  && currentTable == "Index")
        {
            var heightTitleText = $('#titleCellText' + i).height();
            
            //log("§§§§§§§§ ajdustTitleIfTooLarge -> titleCellText : " + $('#titleCellText' + i).height());
            
            var limitHeightResume;
            /*
            if (heightTitleText <= 15)
                limitHeightResume = 75;
            else
            if (heightTitleText > 15 && heightTitleText <= 31)
                limitHeightResume = 69;
            if (heightTitleText <= 15)
                limitHeightResume = 75;
            else
             */
            if (heightTitleText <= 35)
                limitHeightResume = 69;
            else
                limitHeightResume = 50;
            
            var resumeText = $('#resumeCellText' + i);
            
            while ($(resumeText).outerHeight() > (isLikeMobile ? limitHeightResume : 60))
            {
                $(resumeText).text(function (index, text)
                                 {
                                 return text.replace(/\W*\s(\S)*$/, '...');
                                 });
            }
        }
        

        //************** isTablePracticalLink ******************
        
        if (isTablePracticalLink && (currentTable != "OfficesTourisme" && currentTable != "Guides"))
        {
            var practicalTitleText = $('#practicalTitleCell_' + i);
            
            while ($(practicalTitleText).outerHeight() > 30)
            {
                $(practicalTitleText).text(function (index, text)
                                           {
                                           return text.replace(/\W*\s(\S)*$/, '...');
                                           });
            }
        }
        
        
        if (currentTable == "AgencesReceptives" && $('#practicalTypeCell_' + i).outerHeight() > 20)
        {
            var practicalTitleText = $('#practicalTitleCell_' + i);
            
            while ($(practicalTitleText).outerHeight() > 20)
            {
                $(practicalTitleText).text(function (index, text)
                                           {
                                           return text.replace(/\W*\s(\S)*$/, '...');
                                           });
            }
        }
        
        

    }
}


function setEventGestureToDeleteFavorites()
{
    var lArray = $("#itemList .itemHome");
    
    log("setEventGestureToDeleteFavorites -> $(#itemList .itemHome) : " + $("#itemList .itemHome").length);
    
    for (var i = 0; i < lArray.length; i++)
    {
        $(lArray[i]).hammer().on("swipe", function(event) {
                                  //log("******* setScrollBarAndRollOverForListItem -> swipe : ");
                                 log(event);
                                    if (event.gesture.direction == "left" || event.gesture.direction == "right")
                                 {
                                    var lHref = $(event.currentTarget.attributes[1]).val();
                                    lHref = lHref.replace("javascript:showDetail(", "");
                                    lHref = lHref.replace(")", "");
                                 
                                 setTimeout(function(){
                                    showLittleModalPopUp("deleteFavorite", lHref);
                                            }, 300);
                                 }
                                  });
    };
}


function itemCellForSlider(n)
{
	log("setItemList : isArray");
	
	var lSplitArray = listItemsVieuxPortRDArray[n].split(",");
	
	$("#itemList").append('<div id="' + lSplitArray[1] + 'SliderItems" class="itemHomeSlider corner" style="display:inline-block;"></div>');
	
	var lItemWidth = $(".itemHome").width() - 2*15;
	
	var lItemHeight = $(".itemHome").height();
	
    
    //***************** baseItem ****************
    
    var myPoint;
    
    if (n < listItems.length - 1)
    {
        var previousItem = listItems[n - 1];
        
        myPoint = {
            "latitude" : previousItem.latitude,
            "longitude" : previousItem.longitude
        }
    }
    else
    {
        var _lSplitArray = listItemsVieuxPortRDArray[n - 1].split(",");
        var lCoordsArray = _lSplitArray[0].split("-");
         
        myPoint = {
        "latitude" : lCoordsArray[0],
        "longitude" : lCoordsArray[1]
        }
    }

    
    //********************************************
    
    
    var lType;
    
    if (lSplitArray[1].indexOf("Restaurants") != -1)
        lType = "Restaurants";
    
    if (lSplitArray[1].indexOf("Hotels") != -1)
        lType = "Hotels";
	
	window[lSplitArray[1] + "TourSlider"] = new HtmlSliderReduceScreen (lSplitArray[1] + "SliderItems",
																		lSplitArray[1] + "TourSlider",
																		(lItemWidth + 2*15),
																		listItems[n],
																		lItemWidth,
																		lItemHeight,
																		lType,
																		myPoint,
                                                                        parseInt(n)
																		);
	
	window[lSplitArray[1] + "TourSlider"].intClickNext = 0;
	
	window[lSplitArray[1] + "TourSlider"].init();
}



function itemCellforMetroTram(n)
{
    var pictoName;
    
    if (listItems[n].line.indexOf("M") != -1)
        pictoName = 'Metro';
    else
        pictoName = 'Tram';
    
    var correspondance = "";
    
    if (listItems[n].correspondance != "")
    {
        correspondance = '<div style="color:#2E2A2A;">' + commonLabel[currentLang].correspondance + ' : ' + listItems[n].correspondance + '</div>';
    }
    
	return  '<div id="' + n + '" class="itemPractical bgWhiteToUltraLightGray corner" href="#">'+
	'<img src="Assets/pictos/gray/' + pictoName +'.png" class="mainVisualPractical" id="mainVisualList' + n + '"/>' +
	'<div class="blocTextOptionList">' +
	'<div class="gradientTypeLabel">' +  titleForItem(listItems[n]) + '</div>' +
    '<div style="color:#2E2A2A; font-weight:bold;">' + listItems[n].line + '</div>' +
    correspondance +
    '<div>' +
	'<a href="javascript:showMap(\'geoloc:' + listItems[n].latitude + ',' + listItems[n].longitude + '\');" class="linkCoordonnees" style="display:inline-block;">' +
    '<img src="Assets/icon_geoloc3.png" width="15" height="15" style="float:left; margin-right:10px;"/>' +
    '<span style="margin-top:2px; float:left; ">' + commonLabel[currentLang].mapItinary + '<span>' +
    '</a>' +
    '</div>'+
	'</div>'+
	'</div>';
}



function itemCellforVeloMPM(n)
{
	return  '<div id="' + n + '" class="itemPractical bgWhiteToUltraLightGray corner" href="#">'+
	'<img src="Assets/pictos/' + listItems[n].type +'.png" class="mainVisualPractical" id="mainVisualList' + n + '"/>' +
	'<div class="blocTextOptionList">' +
	'<div class="gradientTypeLabel" style="font-size:1.2em; ">' +  listItems[n].name.slice(4, listItems[n].name.length).replace('-', '') + '</div>' +
    '<div>' +
	'<a href="javascript:showMap(\'geoloc:' + listItems[n].latitude + ',' + listItems[n].longitude + '\');" class="linkCoordonnees" style="display:inline-block;">' +
    '<img src="Assets/icon_geoloc3.png" width="15" height="15" style="float:left; margin-right:5px; margin-top:4px;"/>' +
    '<span style="margin-top:6px; float:left; ">' + commonLabel[currentLang].mapItinary + '<span>' +
    '</a>' +
    '</div>'+
    '<div>' +
    '<a href="javascript:showPopUpDispoForVeloMPM(' + listItems[n].number + ', \'' + listItems[n].name + '\');" class="linkCoordonnees" style="display:inline-block;">' +
    '<img src="Assets/icon_info.png" width="15" height="15" style="float:left; margin-right:5px; margin-top:4px;"/>' +
    '<span style="margin-top:5px; float:left; ">' + commonLabel[currentLang].dispoVelo + '<span>' +
    '</a>' +
    '</div>'+
	'</div>'+
	'</div>';
}


function itemCellforMassifs(n)
{
	return  '<div id="' + n + '" class="itemPractical bgWhiteToUltraLightGray corner" href="#">'+
	'<img src="Assets/pictos/gray/Massifs.png" class="mainVisualPractical" id="mainVisualList' + n + '"/>' +
	'<div class="blocTextOptionList">' +
	'<div class="gradientTypeLabel" style="font-size:1.2em; ">' +  listItems[n].raisonsociale + '</div>' +
    '<div id="massifs' + listItems[n].id + '" style="color:#b8266e; margin-top:4px; font-weight:bold; font-size:1.2em;" onclick="javascript:showModalPopUp(\'accesMassif\');">' +
    commonLabel[currentLang].loader +
    '</div>'+
    
    '<a href="javascript:showMap(\'geoloc:' + listItems[n].latitude + ',' + listItems[n].longitude + '\');" class="linkCoordonnees" style="display:inline-block; margin-right:10px;">' +
    '<img src="Assets/icon_geoloc3.png" width="15" height="15" style="float:left; margin-right:4px; margin-top:4px;"/>' +
    '<span style="margin-top:6px; float:left; ">' + commonLabel[currentLang].map + '<span>' +
    '</a>' +
    
    '<a href="javascript:showModalPopUp(\'Massifs:' + listItems[n].id + '\', \'bgGrayLightToGray\');" class="linkCoordonnees" style="display:inline-block;">' +
    '<img src="Assets/icon_info.png" width="15" height="15" style="float:left; margin-right:4px; margin-top:4px;"/>' +
    '<span style="margin-top:6px; float:left; ">' + accessMassifLabel[currentLang].listVilles + '<span>' +
    '</a>' +
    
	'</div>'+
	'</div>';
}

//#aa6a44

function getMassifsData(_arg)
{
    $.ajax(
           {
           url: (isApp?urlWeb:'') + 'API/getMassifs.php',
           success: 	function(data, textStatus, request)
           {
           //log("Massifs -> data : " + data);
           
           var s = document.createElement('script');
           s.setAttribute('type', 'text/javascript');
           s.text = data;
           document.getElementsByTagName("head")[0].appendChild(s);
           
           if (_arg)
           setTimeout(setStatusForMassifs, 1000);
           }
           });
}


function setStatusForMassifs()
{
    if (massifs)
        log('setStatusForMassifs -> massifs.data.length : ' + massifs.data.length);
    else
        return;
    
    for (var i = 0; i < massifs.data.length; i++)
    {
        var lStatus = massifs.data[i].status_tomorrow != null ? massifs.data[i].status_tomorrow : massifs.data[i].status;
        
        $("#massifs" + massifs.data[i].id).html(">>> " + accessMassifLabel[currentLang][lStatus]);
    }
}


function getMassifWithId(_id)
{
    var lMassif = null;
    
    for (var i = 0; i < listItemsMassifs.length; i++)
    {
        if (listItemsMassifs[i].id == _id)
            lMassif = listItemsMassifs[i];
    }
    
    log("getMassifWithId -> lMassif : " + JSON.stringify(lMassif));
    
    return lMassif;
}


function getCDTmassifWithId(_id)
{
    var lMassif = null;
    
    for (var i = 0; i < massifs.data.length; i++)
    {
        if (massifs.data[i].id == _id)
            lMassif = massifs.data[i];
    }
    
    return lMassif;
}


function itemCellforPracticalTable(n)
{
	var lType = getTypeLabelForPracticalItem(listItems[n]);
    
    //*********************** BACKGROUND ******************************
    
    var pictoName = getPictoNameForPracticalItem(listItems[n]);
    
    var lPicturesUrl = 'Assets/pictos/gray/' + pictoName +'.png';
    
    var lBg = '';

    for (var prop in myRestoArray)
    {
        if (myRestoArray.hasOwnProperty(prop) && myRestoArray[prop] == listItems[n].entityid)
        {
            lPicturesUrl = urlPictures + "/Restos/" + prop + "/480/Image.jpg";
            //lBg = 'style="background-image:url(\'' + urlPictures + '/Restos/' + prop + '/480/Image.jpg\'); background-size:100% auto;"';
            break;
        }
    }
    
    
    //*********************** LINKS ******************************
    
    var links;
    
    var lNameMap;
    
    if ( currentTable == "OfficesTourisme" || currentTable == "AgencesReceptives"
        || currentTable == "Campings" || currentTable == "Parkings" || currentTable == "Guides"
        || listItems[n].type.indexOf("cdt:MoniteurEscalade") != -1
        || listItems[n].type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1)
        lNameMap = commonLabel[currentLang].map;
    else
        lNameMap = commonLabel[currentLang].mapItinary;
    
    //*********************** HTML ******************************
    
    links = '<a href="javascript:showMap(\'geoloc:' + listItems[n].latitude + ',' + listItems[n].longitude + '\');" class="linkCoordonnees" style="display:inline-block; margin-right:20px;">' +
    '<img src="Assets/icon_geoloc3.png" width="15" height="15" style="float:left; margin-right:7px; margin-top:4px;"/>' +
    '<span style="margin-top:6px; float:left; ">' + lNameMap + '<span>' +
    '</a>' +
    '<a href="javascript:showPopUpCoordonnees(\'' + listItems[n].type + '\', ' + n + ');" class="linkCoordonnees" style="display:inline-block;">' +
    '<img src="Assets/icon_contact3.png" width="15" height="15" style="float:left; margin-right:7px; margin-top:4px; "/>' +
    '<span style="margin-top:6px; float:left; ">' + optionLabel[currentLang].contact + '<span>' +
    '</a>';
    
    //*********************** DISTANCE ******************************
    
    var distanceLabel = "";
    
    if (mIsCloserItemActivated)
    {
        var distanceString = setDistance(calculDistanceBetweenItems(listItems[n], userLocation) * 1000);
    
        var lLeft = isIpad ? 630 : 10;
    
        distanceLabel = "<p class=\"timeLabel\" style=\"padding:0px 5px; background-color:#876B54; font-size:1em; font-weight:bold; position:absolute; top:10px; left: " + lLeft + "px;\">" + distanceString + "</p>";
    }
    
    //*********************** HTML ******************************
    
	return  '<div id="' + n + '" class="itemPractical bgWhiteToUltraLightGray corner" href="#"' + lBg + '>'+
	'<img class="mainVisualPractical" id="mainVisualList' + n + '" style="background-image:url(' + lPicturesUrl + '); background-size:auto 100%;"/>' +
	'<div class="blocTextOptionList">' + 
	'<div id="practicalTitleCell_' + n + '" class="gradientTypeLabel">' +  listItems[n].raisonsociale + '</div>' +
	'<div id="practicalTypeCell_' + n + '" style="color:#b8266e; font-weight:bold;">' + lType + '</div>' +
	'<div style="color:#000000;"><span style="font-style:italic;">' + setCities(listItems[n]) + '</span></div>' +
    links +
	'</div>'+
    distanceLabel +
	'</div>';	
}


function htmlForMP2013Cell(n, _textFav)
{
    var image;

    if (listItems[n].isSmallImage == "false")
        image = 'Assets/smallMP2013.jpg';
    else
        image = 'MP2013/small_' + listItems[n].idRepName +'.jpg';
	
	//*****************
	
	var type;
	
	if (isBigExpo)
		type = '<div class="gradientTypeLabel Ellipsis">' +  listItems[n].place + '</div>';
	else
		type = '<div class="gradientTypeLabel Ellipsis">' +  listItems[n].soustype + '</div>';
	
	//*****************
    
	var cities = "";
	
	if (_textFav == undefined)
	{
        var lPlace = listItems[n].place;
        
        if (lPlace.toLowerCase().indexOf("mucem") != -1)
            lPlace = "MUCEM";
        
		if (isBigExpo)
			cities = '<div id="cityCellMP2013_' + n +'" style="font-style:italic; color:#2E2A2A;"><p>' + setCities(listItems[n]) + '</p></div>';
		else
			cities = '<div id="cityCellMP2013_' + n +'" style="font-style:italic; color:#2E2A2A;"><p>' + lPlace +  ' / ' + setCities(listItems[n]) + '</p></div>';
	}
	
	//*******************
	
	var lDate = '<div id="dateCellMP2013_' + n +'" style="font-weight:bold; width:100%; color:#ffffff; max-height:45px; overflow:hidden; color:#2E2A2A;"><p>' + listItems[n].date_fr + '</p></div>';
		
    
    //********
	
	var lTextFav = ""
	
	if (_textFav != undefined)
		lTextFav = _textFav;
    
    
     //******** show time **************
    
    var timeLabel = "";
    
    if (isCellShowTime == true)
	{
        var timeString;
        
        if (cityBtnArray[currentCity] == "Geoloc" || currentActivity == "MP2013" || currentActivity == "Expo")
        {
            timeString = setDuration(window[currentTransport + "TimeListItems"][listItems[n].index]);
        }
        else
        {
            var tempArray = listItems[n][currentTransport].split(", ");
            timeString = setDuration(tempArray[currentCity]);
        }
        

        timeLabel = "<p class=\"timeLabel\" style=\"padding:0px 5px; background-color:#876B54; font-size:1em; font-weight:bold; position:relative;\">" + timeString + "</p>";
	}
    
    return  '<a id="' + n + '" class="itemHome corner bgWhiteToUltraLightGray" href="javascript:showDetail(' + n + ')">'+
	'<div class="mainVisualList"' +
	'style="background-image:url(\'' + image + '\');' +
	'background-size:100% auto; background-repeat:no-repeat; background-color:#000000;">' +
    timeLabel +
	'</div>' +
	'<div class="blocTextList">' +
	type +
	'<div id="titleCellMP2013_' + n +'" style="font-weight:bold; width:100%; max-height:45px; overflow:hidden; color:#9E0047;"><p>' + listItems[n].name_fr.toUpperCase() + '</p></div>' +
	cities + 
	lDate +
	lTextFav +
	'</div></a>';
}


function getMyCellBlock (_item, n, _type)
{
    var lItem = _item == null ? listItems[n] : _item;
    
    //***************************** type Small *************************
    
    var Small = _type == "Small" ? "Small" : "";
    
    if (_type == "CloseItem")
        Small = "Small";
    
    //***************************** id *************************
    
    var lId = "";
    
    if (_type == "CloseItem")
        lId = "CloseItem";
    
    //***************************** link *************************
    
    var lLink = "";

    if (homeStatus == "Home")
        lLink = 'accessDetailViewFromUrl(\'' + lItem.table + '\', \'' + lItem.idRepName + '\')';
    else
    if (_type == "CloseItem")
        lLink = 'showCloseItem(' + n + ')';
    else
        lLink = 'showDetail(' + n + ')';
    

    //*************************************************************
    
    return  '<a class="itemHome' + Small + '" id="' + n + '" href="javascript:' + lLink + '">'+
            '<div id="mainVisualList' + lItem.idRepName + lId + '" class="mainVisualList' + Small + '">' +
            getSousTypePastilleInCell(lItem, _type) +
            getPastilleInCell(n) +
            getMacaronHtml(lItem, 'macaron' + Small + '') +
            '</div>' +
            '<div class="blocTextList' + Small + '">' +
                '<div class="gradientTypeLabel">' +  getTypeInCell(lItem) + '</div>' +
                getTitleInCell(lItem, n) +
                getCityInCell(lItem, n) +
                //getCotationInCell(lItem) +
                getMountainsInCell(lItem, n) +
            '</div></a>';
}


function getTitleInCell(lItem, n)
{
    return '<div id="titleCellText' + n + '" class="titleLabelCell" >' + titleForItem(lItem).toUpperCase() + '</div>';
}


function getTypeInCell(lItem)
{
    //var mActivityWhereSousTypeIsRegular = ["ExpositionsMusees", "Petanque", "Restos", "Circuits"];
    
    var type2;
    
    if (lItem.table == "Circuits")
	{
		type2 = typeLabel[currentLang][lItem.type] + " - " + setDistance(lItem.distance);
	}
    else
    if (currentActivity == -1 || currentActivity == "NoIdea")
    {
        type2 = tableLabel[currentLang][lItem.table];
    }
    else
    if (lItem.table == "Restos")
    {
        type2 = lItem["type_" + currentLang];
    }
    else
    {
        var typeArray = lItem.type.split(", ");
        
        var type = "";
        
        for (var i = 0; i < typeArray.length; i++)
        {
            if (i == 0)
                type = typeLabel[currentLang][typeArray[i]];
            else
                type += " / " + typeLabel[currentLang][typeArray[i]];
        }
        
        if (lItem.table == "Randonnee")
            type += " - " + setDuration(lItem.duration);
        
        if (lItem.table == "Canyons")
            type += ' - ' + setDuration(lItem.descenteTime) + ' - ' + lItem.cascadeMax + 'm';
        
        
        type2 = type;
    }
    
    return type2;
}


function getSousTypePastilleInCell(_item, _type)
{
    var display = "inline-block";
    
    if (getXsize() <= mSizeLimitForSmall && (mSwitchSmallBig == "Small" || homeStatus == "Home" || homeStatus == "Detail"))
    {
        display = "none";
    }
    
    var pastille = "";
    
    //var mActivityWhereSousTypeIsRegular = ["ExpositionsMusees", "Petanque", "Restos", "Circuits"];
    
    if (_type && _type == "CloseItem" && mActivityWhereSousTypeIsRegular.indexOf(_item.table) != -1)
    {
        pastille += '<div class="pastilleSousType" style="display:' + display + ';"><img src="Assets/pastilles/blanc/' + _item.table +'.png" /></div>';
    }
    else
    if (mActivityWhereSousTypeIsRegular.indexOf(currentActivity) != -1)
    {
        display = "none";
        
        pastille += '<div class="pastilleSousType" style="display:' + display + ';"></div>';
    }
    else
    if (currentActivity == "SitesEscalade")
    {
        var lArray = _item.type.split(", ");
        
        for (var i = 0; i < lArray.length; i++)
        {
            pastille += '<div class="pastilleSousType" style="display:' + display + ';"><img src="Assets/pastilles/blanc/' + lArray[i] + '.png" /></div>';
        }
        
        if (_item.cotationMediane)
            pastille += '<div class="pastilleSousType2" style="display:' + display + ';"><span class="pastilleCotationMediane">' + _item.cotationMediane + '</span></div>';
    }
    else
    if (currentActivity == -1 || currentActivity == "NoIdea")
    {
        pastille += '<div class="pastilleSousType" style="display:' + display + ';"><img src="Assets/pastilles/blanc/' + _item.table +'.png" /></div>';
    }
    else
    if ((currentActivity == "MyFavorites" || currentActivity == "Favorites" || currentActivity == "Classics" || currentActivity == "BestViews")
        && mActivityWhereSousTypeIsRegular.indexOf(_item.table) != -1)
    {
        pastille += '<div class="pastilleSousType" style="display:' + display + ';"><img src="Assets/pastilles/blanc/' + _item.table +'.png" /></div>';
    }
    else
    {
        pastille += '<div class="pastilleSousType" style="display:' + display + ';"><img src="Assets/pastilles/blanc/' + _item.type +'.png" /></div>';
    }
    
    
    if (//currentActivity != "NoIdea" &&
        currentActivity != "Circuits"
        && currentActivity != "ExpositionsMusees"
        && _item.soustype)
    {
        var lArray = _item.soustype.split(", ");
        
        for (var i = 0; i < lArray.length; i++)
        {
            if (macaronList.indexOf(lArray[i]) == -1)
            {
                
                if (mActivityWhereSousTypeIsRegular.indexOf(currentActivity) != -1)
                {
                    if (getXsize() <= mSizeLimitForSmall && mSwitchSmallBig == "Small")
                        display = "none";
                    else
                        display = "inline-block";
                }
                
                if (currentActivity == "BestViews" && lArray[i].indexOf("Vue") != -1)
                    continue;
                
                pastille += '<div class="pastilleSousType2" style="display:' + display + ';"><img src="Assets/pastilles/noir/' + lArray[i] + '.png" /></div>';
            }
        }
    }
    
    
    return pastille;
}


function getCityInCell(lItem, n)
{
    var lCityToDisplay = '<div class="cityLabelCell" id="cityLabelCell' + n + '">' + setCities(lItem) + '</div>';
    
    if (currentActivity == "Canyons" || currentActivity == "SitesEscalade" || currentActivity == "Randonnee")
    {
        lCityToDisplay = "";
    }
    
    return lCityToDisplay;
}


function getCotationInCell(lItem)
{
    var html = "";
    
    if (currentActivity == "SitesEscalade")
    {
        var cotation = "";
        
        if (lItem.cotationMediane != null)
            cotation = commonLabel[currentLang].cotationMediane + " : " + lItem.cotationMediane;
        else
            cotation = commonLabel[currentLang].allLevels;
        
        html = '<div class="cityLabelCell">' + cotation + '</div>'
    }
    
    return html;
}


function getMountainsInCell(lItem, n)
{
    var lMountains = "";
    
    if (currentActivity== "Canyons" || currentActivity == "SitesEscalade"
        || currentActivity == "Randonnee")
    {
        var lDepartment = "";
        
        if (lItem.table == "Canyons" && lItem.department != undefined)
        {
            if (lItem.department.length == 1)
                lDepartment = " (0" + lItem.department + ")";
            else
                lDepartment = " (" + lItem.department + ")";
        }
        
        if (lItem.mountains)
            lMountains += '<div id="mountainsCellText' + n + '" class="mountainsLabelCell">'  + lItem.mountains +  lDepartment + '</div>';
    }
    
    
    return lMountains;
}



function getPastilleInCell(n)
{
	var timeLabel = "";
	
	if (isCellShowTime)
	{
        var timeString = "";
        
        if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
        {
            if (((currentTransport == "pied" || currentTransport == "velo") && (listItems[n].costWalk == -1 || listItems[n].costWalk == null))
                || ((currentTransport == "auto" || currentTransport == "moto") && (listItems[n].costCar == -1  || listItems[n].costCar == null)))
                timeString = commonLabel[currentLang].nc;
            else
            {
                var lCoef = 1;
                
                if (isApp && !isRestrictedAndroid && !isNetWorkAvalaible)
                    lCoef = 0.45;
                
                if (currentTransport == "pied")
                    timeString = setDuration(listItems[n].costWalk);
                
                if (currentTransport == "velo")
                    timeString = setDuration(Math.round(listItems[n].costWalk*5/17));
                
                if (currentTransport == "auto")
                    timeString = setDuration(listItems[n].costCar * lCoef);
                
                if (currentTransport == "moto")
                {
                    var lCost;
                    
                    listItems[n].costCar - 5 < 0 ? lCost = 0 : lCost = listItems[n].costCar * lCoef - 5;
                    
                    timeString = setDuration(lCost);
                }
            }
        }
        else
        {
            if (listItems[n][currentTransport])
            {
                var tempArray = listItems[n][currentTransport].split(", ");
                timeString = setDuration(tempArray[currentCity]);
            }
        }
            
        timeLabel = '<p class="timeLabel" >' + timeString + '</p>';
	}
    
    return timeLabel;
}



function getMacaronHtml(_item, _class)
{
    if (homeStatus == "List" && isCellShowTime && getXsize() <= mSizeLimitForSmall)
        return "";
    
    var lMacaron = "";
    
    if (_item['macaron'])
    {
        var lMacaronArray = _item['macaron'].split(", ");
        
        for (var i = 0; i < lMacaronArray.length; i++)
        {
            var lLang = "";
            
            var mListMacaronWithLang = ["NoCarbone", "BioFrais", "Maison", "NoGluten", "Ecolo", "UltraFrais", "Promo", "HomeFresh"];
            
            if (mListMacaronWithLang.indexOf(lMacaronArray[i]) != -1)
                lLang = "_" + currentLang;
            
            var classMacaron = homeStatus == "Detail" ? _class : _class + i;
            
            if (homeStatus == "Detail" && i == 1)
                continue;

            lMacaron += '<div class="' + classMacaron + '" style="background-image:url(Assets/macaron/macaron' + lMacaronArray[i] + lLang + '.png);"></div>';
        }
    }
    
    return lMacaron;
}



function getTypeLabelForPracticalItem(_item)
{
    var lType = "";
    
    if (_item.type.indexOf("cdt:MoniteurEscalade") != -1 || _item.type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1)
	{
        if (_item.type.indexOf("cdt:MoniteurEscalade") != -1)
            lType = practicalLabel[currentLang].AccompagnateurMoniteur;
        else
            lType = practicalLabel[currentLang].AccompagnateurMoyenneMontagne;
    }
    else
    if (_item.type.indexOf("cdt:Camping")!= -1)
    {
        if (currentTable == "Index")
            lType = practicalLabel[currentLang].Camping;
        
        lType += _item.classementcamping;
    }
    else
    if (_item.type == "cdt:AireStationnementCampingCar")
    {
        lType = practicalLabel[currentLang].CampingCar;
    }
    else
    if (_item.type.indexOf("cdt:ParkingPublic")!= -1)
    {
        if (parkingRelaiArray.indexOf(_item.raisonsociale) != -1)
            lType = typeLabel[currentLang].parkingRelais;
        else
            lType = practicalLabel[currentLang].Parking;
    }
    else
    if (_item.type == "cdt:OTSI")
    {
        if (currentTable == "Index")
            lType = "Information";
    }
    else
    if (_item.type == "cdt:LocationMaterielSportLoisir")
    {
        if (currentTable == "Index")
            lType = practicalLabel[currentLang].locationSport;
    }
    else
    if (_item.type == "cdt:GuidesServiceGuides")
    {
        if (currentTable == "Index")
            lType = practicalLabel[currentLang].serviceGuide;
    }
    else
    if (_item.type == "VeloMPM")
    {
        lType = practicalLabel[currentLang].VeloMPM;
    }
    else
    if (_item.type == "MetroTram")
    {
        if (_item.line.indexOf("M") != -1)
            lType = commonLabel[currentLang].Metro;
        else
            lType = "Tramway";
    }
    else
    if (_item.type.indexOf("cdt:Restaurant") != -1)
    {
        lType = _item.typedecuisine;
    }
    else
    if (_item.type.indexOf("cdt:AgenceDeVoyageReceptive") != -1)
    {
        if (currentTable == "Index")
            lType += practicalLabel[currentLang].AgenceReceptive;
        else
        {
            lType = typeLabel[currentLang].receptive;
            
            var lTypeArray = _item.type.split(" ");
            
            for (var i = 0; i < lTypeArray.length; i++)
            {
                if (lTypeArray[i] == "cdt:AgenceDeVoyage")
                    lType += " - " + typeLabel[currentLang].voyage;
                
                if (lTypeArray[i] == "cdt:AgenceEvenementielle")
                    lType += " - " + typeLabel[currentLang].evenementielle;
                
                if (lTypeArray[i] == "cdt:TourOperator")
                    lType += " - " + typeLabel[currentLang].operator;
            }
        }
    }
    else
    if (_item.type.indexOf("cdt:Hotel") != -1 || _item.type.indexOf("cdt:Residence") != -1)
    {
        var lOption = "";
        
        if (_item.label.indexOf("Gay friendly") != -1)
            lOption = " - Gay friendly";
        
        if (_item.label.indexOf("Handicap") != -1)
            lOption += " - Handicap";
        
        var lSoustype = _item.soustype;
        
        if (currentLang != "fr")
        {
            if (_item.type.indexOf("cdt:Hotel") != -1)
                lSoustype = typeLabel[currentLang].Hotel;
            else
                lSoustype = typeLabel[currentLang].Residence;
        }
        
        lType = lSoustype + ' ' + _item.classement + lOption;
    }
    else
    if (_item.type.indexOf("cdt:ChambreHote") != -1 || _item.type.indexOf("cdt:GiteEtMeuble") != -1)
    {
        var lOption = "";
        
        if (_item.label.indexOf("Bed & Breakfast") != -1)
            lOption += " - Bed & Breakfast";
        
        if (_item.label.indexOf("Accueil paysan") != -1)
            lOption +=  " - " + typeLabel[currentLang].paysan;
        
        if (_item.label.indexOf("Bienvenue à la Ferme") != -1)
            lOption += " - " + typeLabel[currentLang].Ferme;
        
        if (_item.label.indexOf("Fleur de soleil") != -1)
            lOption += " - Fleur de soleil";
        
        if (_item.label.indexOf("Gîtes de France") != -1)
            lOption += " - Gîtes de France " + _item.labelnotation;
        
        if (_item.label.indexOf("Gay friendly") != -1)
            lOption += " - Gay friendly";
        
        if (_item.label.indexOf("Handicap") != -1)
            lOption += " - Handicap";
        
        if (_item.label.indexOf("Clévacances") != -1)
            lOption += " - Clévacances " + _item.labelnotation;
        
        if (_item.type.indexOf("cdt:GiteEtMeuble") != -1)
            lOption += " " + _item.classement;
        
        var lSoustype = _item.soustype;
        
        if (currentLang != "fr")
        {
            if (_item.type.indexOf("cdt:ChambreHote") != -1)
                lSoustype = typeLabel[currentLang].ChambreHote;
            else
                lSoustype = typeLabel[currentLang].GiteEtMeuble;
        }
        
        lType = lSoustype + lOption;
    }
    
    return lType;
}


function getPictoNameForPracticalItem(_item)
{
    var pictoName = currentTable;
    
    if (_item.type.indexOf("cdt:MoniteurEscalade") != -1 || _item.type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1)
	{
        if (_item.type.indexOf("cdt:MoniteurEscalade") != -1)
            pictoName = "MoniteursEscalade";
        else
            pictoName = "AccompagnateurMontagne";
    }
    else
    if (_item.type.indexOf("cdt:ParcAcrobatiqueForestier")!= -1)
    {
        pictoName = "ParcAccro";
    }
    else
    if (_item.type.indexOf("cdt:AireStationnementCampingCar")!= -1)
    {
        pictoName = "CampingsCar";
    }
    else
    if (_item.type.indexOf("cdt:Hotel") != -1 || _item.type.indexOf("cdt:Residence") != -1)
    {
        if (_item.type.indexOf("cdt:Hotel") != -1)
            pictoName = "Hotels";
        else
            pictoName = "Residence";
    }
    else
    if (_item.type.indexOf("cdt:ChambreHote") != -1 || _item.type.indexOf("cdt:GiteEtMeuble") != -1)
    {
        if(_item.type.indexOf("cdt:ChambreHote") != -1)
            pictoName = "Gite";
        else
        if(_item.type.indexOf("cdt:GiteEtMeuble") != -1)
            pictoName = "MeubleTourisme";
    }
    
    return pictoName;
}



function setMainInfosForOptionCell (_type, _item, n, _onTour)
{
	var html;
    
    var lTitleColor = "textColor" + _type;
    
    //*********************** MAIL ***************************
    
	var mail;
	
	if (_item.adresseweb == undefined || _item.adresseweb == null || _item.adresseweb == "")
	{
		mail = "";
	}
	else
	{
		mail = '<span style="text-decoration:underline;">' +  optionLabel[currentLang].webSite + '</span> / ';
	}
    
    //************************** MAP  ****************************
    
    var lMapLink = '<a href="javascript:showOptionsMap(\'geoloc:' + _item.latitude + ',' + _item.longitude + '\' , \''+ _type +'\', ' + _onTour + ');" class=""> / ' +
    '<span style="text-decoration:underline;">' + commonLabel[currentLang].map + '</span>' +
    '</a>';
    
    //***********************************************************
	
	if (_type == "Items")
    {
        var typeArray = _item.type.split(", ");
        var type = "";
        
        for (var i = 0; i < typeArray.length; i++)
        {
            if (i == 0)
                type = ("" + typeLabel[currentLang][typeArray[i]]);
            else
                type += (" / " + typeLabel[currentLang][typeArray[i]]);
        }
        
        var type2;
        
        if (_item.table == "Canyons" || _item.table == "SitesEscalade" || _item.table == "PlageBaignadePiscine" || _item.table == "Randonnee")
            type2 = tableLabel[currentLang][_item.table];
        else
            type2 = type;
        
        var lPlaceLabel = "";
        var lEllipsis = ""
        
        if (getXsize() > 400)
        {
            lPlaceLabel = '<div class="sizeForOptionItemLabelWithImage Ellipsis textColorGrayLight" style="font-style:italic;">' + _item.city + '</div>';
            lEllipsis = "lEllipsis";
        }
        
        return	'<div class="optionItemTitle sizeForOptionItemLabelWithImage ' + lEllipsis + ' ' + lTitleColor + '">' + titleForItem(_item) + '</div>' +
        '<div class="sizeForOptionItemLabelWithImage Ellipsis textColorGrayLight">' + type2 +'</div>' +
        lPlaceLabel;
    }
	else
    if (_type == "MP2013")
    {
        var lPlaceLabel = "";
        
        if (getXsize() > 400)
            lPlaceLabel = '<div class="sizeForOptionItemLabelWithImage Ellipsis textColorGrayLight" style="font-style:italic;">' +  _item.place + ' / ' + _item.city + '</div>';
        
        return	'<div id="optionTitleMP2013'+ _item.idRepName +'" class="optionItemTitle sizeForOptionItemLabelWithImage textColorMP2013">' +  _item.name_fr + '</div>' +
        '<div class="sizeForOptionItemLabelWithImage Ellipsis textColorGrayLight">' +  _item.soustype + '</div>' +
        lPlaceLabel;
    }
    else
    {
        var lTypeLabel = getTypeLabelForPracticalItem(_item);
    
        //********************** TITLE ***********************
        
        var lTitle = "";
        
        if (_item.type == "MetroTram")
                lTitle = "STATION " + _item.title;
        else
        if (_item.type == "VeloMPM")
            lTitle = "STATION " + _item.name.slice(4, _item.name.length).replace('-', '');
        else
            lTitle = _item.raisonsociale;
        
        //********************** HTML ***********************
        
        return	'<div class="optionItemTitle sizeForOptionItemLabel Ellipsis ' + lTitleColor + '">' +  lTitle + '</div>' +
        '<div class="sizeForOptionItemLabel Ellipsis textColorGrayLight">' +  lTypeLabel + '</div>' +
        '<div class="sizeForOptionItemLabel Ellipsis linkOptionsCoordonnees">' +
        setLink(_item.adresseweb, mail) +
        //'<a href="' + _item.adresseweb + '" target="_blank">' +  mail + '</a>' +
        '<a href="javascript:showPopUpCoordonnees(\'' + _type + '\', ' + n + ', ' + _onTour + ');">' + '<span style="text-decoration:underline;">' + optionLabel[currentLang].contact + '</span></a>'+
        lMapLink +
        '</div>';
    }
}


function setAddressForItem(_item)
{
	return	'<div class="gradientTypeLabel" style="font-size:1.2em; font-weight:bold; color:#ffffff;">' +  _item.raisonsociale + '</div>' +
	'<div>' + _item.numro + ' ' + _item.typedevoie + ' ' + _item.voie + ' ' + _item.codepostal + ' ' + _item.ville + '</div>';
}


function setPhoneMailSiteForItem(_item)
{
	var tempHtml = '';
	
	if (_item.tlphone != undefined && _item.tlphone != "" && _item.tlphone != "00 00 00 00 00")
	{
		var firstNumber = '(' + _item.tlphone.substr(0,1) + ')';
		var phoneNumber = _item.tlphone.replace("0", firstNumber);
		
		tempHtml += '<div><a onclick="javascript:setGAtrackEventForPhoneCall(\'practicalItem\')" href="tel:' + _item.tlphone + '">Tél. +00 33 ' + phoneNumber + '</a></div>';
	}
	
	if (_item.mail != undefined)
	{
		var mailArray = _item.mail.split(" ");
		for (var nMail = 0; nMail < mailArray.length; nMail++)
		{
			tempHtml += '<div><a class="optionLink" onclick="javascript:setGAtrackEventForMail(\'practicalItem\')" href="mailto:' + mailArray[nMail] +'" target="_blank">'  + mailArray[nMail] + '</a></div>';
		}
	}
	
	if (_item.adresseweb != undefined)
	{
		var webArray = _item.adresseweb.split(" ");
		for (var nWeb = 0; nWeb < webArray.length; nWeb++)
		{
			tempHtml += '<div>' + setLink(webArray[nWeb], webArray[nWeb], 'optionLink') + '</a></div>';
            
            //'" <a class="optionLink" href="' + webArray[nWeb] + '" target="_blank">' + webArray[nWeb] +
		}
	}
	
	return tempHtml;
}


function setCities(_item)
{
    //log("@@@@@ setCities -> _item : ");
    //log(_item);

    var cityToDisplay = "";
	
	if (isTablePracticalLink)
	{
        if (_item.ville)
        {
            cityArray = _item.ville.split(", ");
            cityToDisplay = _item.ville;
        }
	}
	else
    if (_item.city)
    {
        cityToDisplay = _item.city;
        
        if (currentTable == "Index"
            && ((homeStatus == "List" || homeStatus == "Detail") && currentCity == -1)
            && _item.duplicateItems && !isMapVisible)
        {
            var lItemsArray = jQuery.parseJSON(_item.duplicateItems);
            
            for (var t = 0; t < lItemsArray.length; t++)
            {
                for (var prop in lItemsArray[t])
                {
                    if (lItemsArray[t].hasOwnProperty(prop) && prop == "city")
                    {
                        if (t < lItemsArray.length)
                            cityToDisplay += ", ";
                        
                        cityToDisplay += lItemsArray[t][prop];
                    }
                }
            }
        }
    }
	
    //log("@@@@@ setCities -> cityToDisplay : " + cityToDisplay);
    /*
    if (homeStatus == "List")
    {
        var cityArray = cityToDisplay.split(", ");
        
        cityToDisplay = cityArray[0];
        
        if (getXsize() > 320 && cityArray.length > 1)
        {
            cityToDisplay += ", " + cityArray[1];
        }
        
        if (getXsize() > 320 && cityArray.length > 2)
        {
            if (mSwitchSmallBig == "Big")
                cityToDisplay += ", " + cityArray[2] + "...";
            else
                cityToDisplay += "... ";
        }
    }
     */

    return cityToDisplay;
}


function titleForItem(_item)
{
    //log("titleForItem -> _item : ");
    //log(_item);
    
	var title;
	
	if (_item.type == "MP2013")
    {
		title = _item.name_fr;
	}
    else
    if (_item.type == "MetroTram")
    {
        title = _item.title;
    }
    else
    if (_item.type == "VeloMPM")
    {
        title = _item.name;
    }
    else
	if (_item.type != "MP2013" && _item.table && tableArray.indexOf(_item.table) != -1)
    {
		switch(currentLang)
        {
            case "fr":
            {
                title = _item.title_fr;
            }
                break;
                
            case "en":
            {
                title = _item.title_en ? _item.title_en : _item.title_fr;
            }
                break;
                
            default:
                title = _item.title_fr;
                break;
        }
	}
    else
		title = _item.raisonsociale;
	
	return title;
}


function textByLangForItem(_item)
{
    var text = "";
    
    if (_item['text_' + currentLang] == null)
    {
        text = "<it>" + detailLabel[currentLang].textComing + "</it><br><br>";
        
        if (_item['text_fr'])
            text += _item['text_fr'];
    }
    else
        text = _item['text_' + currentLang];
        
	return text;
}


function infosByLangForItem(_item)
{
	var text = _item['infos_' + currentLang];
    
    if (!text)
    {
        if (_item['infos_fr'])
            text = _item['infos_fr'];
        else
            text = "";
    }
    
    text = text.replace('href="', 'onclick="javascript:setGAtrackEventForPhoneCall()" href="tel:');
    
    text = text.replace(/:<\/strong>/g, '</strong>');
    text = text.replace(/: <\/strong>/g, '</strong>');
    
    if (currentLang == "fr")
    {
        text = text.replace('tél.', '');
    }
    else
    {
        text = text.replace('call', '');
        text = text.replace('Opening hours', 'Opening times');
    }

	return text;
}


function transportByLangForItem(_item)
{
	var text = _item['transport_' + currentLang];

    if (text)
    {
        var lNameArray = ["métro", "bus", "La Fourragère", "Vieux port", "Estrangin Prefecture", "Catalan", "Pharo Catalans Foch", "Saint Victor", "Notre Dame de la Garde", "Rond point du Prado", "Fort Saint Nicolas", "Frais Vallon", "Réformés Canebière",  "Blancarde Foch", "Longchamps", "Le Pharo", "Place de Lenche", "Église Saint-Laurent", "Les Goudes", "Place Bargemon", "Fort Saint Jean", "Hôtel de ville", "Haïfa-Marie-Louise", "Littoral Major", "Bougainville", "Joliette", "Plage des Corbières", "Corbières Base nautique", "La Mayanelle", "Parc Paysager"];
        
        for (var i = 0; i < lNameArray.length; i++)
        {
            text = text.replace(lNameArray[i], lNameArray[i].toUpperCase());
        }
    }
    
    if (!text)
    {
        if (_item['transport_fr'])
        {
            text = "<it>" + detailLabel[currentLang].textComing + "</it><br><br>";
        
            text += _item['transport_fr'];
        }
        else
            text = "";
    }
    
    if (infoTrafficVieuxPortArray.indexOf(_item.idRepName) != -1 || _item.transportBonus == "vieuxPort")
        text += '<br><br><span style="font-weight:normal; font-style:italic">' + detailLabel[currentLang].vieuxPortInfosTraffic + '</span>';
    else
    if (infoTrafficGoudesArray.indexOf(_item.idRepName) != -1 || _item.transportBonus == "goudes")
        text += '<br><br><span style="font-weight:normal; font-style:italic">' + detailLabel[currentLang].goudesInfosTraffic + '</span>';
    else
    if (infoTrafficRouteDuFeuArray.indexOf(_item.idRepName) != -1 || _item.transportBonus == "routeDuFeu")
        text += '<br><br><span style="font-weight:normal; font-style:italic">' + detailLabel[currentLang].routeDuFeuInfosTraffic + '</span>';
    
	
	return text;
}


function resumeByLangForItem(_item)
{
    if (_item.text_fr == null)
        return detailLabel[currentLang].textComing;
    
    if (_item['resume_' + currentLang])
        return _item['resume_' + currentLang];
    
    if (_item['text_' + currentLang])
        return _item['text_' + currentLang].split('<br><br>')[0];
    else
        return _item['text_fr'].split('<br><br>')[0];
}


function setDuration(time)
{
    var lTimeString;
    
    if (time < 60)
    {
        lTimeString = (time == 0 ? 1 : Math.floor(time)) + "mn";
    }
    else
    {
        var hours = Math.floor(time/60);
        var min = Math.floor(time - hours*60);
        
        if (min == 0)
        {
            lTimeString = hours + "h";
        }
        else
        {
            lTimeString = hours + "h" + ((min < 10) ? "0" + min : min);
        }
    }
    
    return lTimeString;
}


function setDistance(meters)
{
    var lString;
    
    if (meters < 1000)
    {
        lString = Math.ceil(meters) + "m";
    }
    else
    {
        var nbKm = Math.floor(meters/1000);
        
        var nbMetersLeft = meters - nbKm * 1000;
        
        nbMetersLeft = Math.floor(nbMetersLeft / 100);
        
        if (nbMetersLeft > 0)
            nbKm += nbMetersLeft/10;
        
        lString = nbKm + "km";
    }
    
    return lString;
}


function setItemListMenuBtnWithPosition(_pos)
{
    $("#itemList").html('');
	listItems = [];
    indexItemList = 0;
    lastIndexItemList = 0;
    $("#itemListBottomBtn").css("display", "none");
    $("#searchForm").val(commonLabel[currentLang].Research + "...");
    
    
    //****************
    
    
	var _array = $("#itemListOptions a");
	
	for (var t = 0; t < 2; t++)
	{
		if (t == _pos)
		{
            $(_array[t]).removeClass("bgGradientGrayLight");
			$(_array[t]).addClass("bgGradientBlue");
			
            
			$(_array[t]).mouseenter(function(){
									$(this).removeClass("bgGradientGrayLight");
									$(this).addClass("bgGradientBlue");
									}).mouseleave(function(){
												  $(this).removeClass("bgGradientGrayLight");
                                                  $(this).addClass("bgGradientBlue");
												  });
		}
		else
		{
			$(_array[t]).addClass("bgGradientGrayLight");
			
			$(_array[t]).mouseenter(function(){
                                    $(this).removeClass("bgGradientGrayLight");
									$(this).addClass("bgGradientBlue");
									}).mouseleave(function(){
												  $(this).removeClass("bgGradientBlue");
                                                  $(this).addClass("bgGradientGrayLight");
												  });
        }
	}
    
    if (currentTable == "MetroTram")
    {
        if (_pos == 0)
        {
            $("#itemList").css("display", "inline-block");
            
            $("#planRTM").css("display", "none");

            $("#searchForm").css("display", "inline-block");
            $("#closeBtnItemList").css("display", "inline-block");
            $("#showMapBtn").css("display", "inline-block");
            
            listItems = listItemsMetroTram;
        }
        else
        {
            $("#itemListBottomBtn").css("display", "none");
            
            $("#planRTM").css("display", "inline-block");
            
            $("#itemList").css("display", "none");

            $("#searchForm").css("display", "none");
            $("#closeBtnItemList").css("display", "none");
            $("#showMapBtn").css("display", "none");
        }
    }
    
    if (currentTable == "MoniteursEscalade")
    {
        if (_pos == 0)
        {
            listItems = listItemsMoniteursEscalade;
            
            $("#trierOptions").css("display", "inline-block");
            $("#trierBtnItemList").css("display", "inline-block");
        }
        else
        {
            listItems = listItemsParcAccro;
            
            $("#trierOptions").css("display", "none");
            $("#trierBtnItemList").css("display", "none");
            
            if (isTrierOptionsOpened)
                resetTrierOptions();
        }
    }
    
    if (currentTable == "LocationVelo")
    {
        if (_pos == 0)
        {
            listItems = listItemsVeloMPM;
        }
        else
        {
            listItems = listItemsLocationVelo;  
        }
    }
    
    if (currentTable == "Parkings")
    {
        if (_pos == 0)
        {
            listItems = listItemsParkings;
            
            $("#trierOptions").css("display", "inline-block");
            $("#trierBtnItemList").css("display", "inline-block");
        }
        else
        {
            listItems = listItemsCampingsCar;
            
            $("#trierOptions").css("display", "none");
            $("#trierBtnItemList").css("display", "none");
            
            if (isTrierOptionsOpened)
                resetTrierOptions();
        }
    }
    
    selectedTab = _pos;
    
    setNextResultForItemList();
}


function setFilteredItemList()
{
    clearTimeout(searchTimeOut);
    
    searchTimeOut = setTimeout(function(){
        
        $("#itemList").html('');
                   
        listItems = [];
        resetItemListArray();
                               
        indexItemList = 0;
        lastIndexItemList = 0;
                                   
        var tempArray = [];
        
        
        
        if (isTablePracticalLink)
        {
            for (var i = 0; i < listItems.length; i++)
            {
        
               if (currentTable == "LocationVelo" && selectedTab == 0)
               {
                   if (listItems[i].name.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1)
                   {
                       tempArray.push(listItems[i]);
                   }
               }
               else
                   if (currentTable == "MetroTram")
                   {
                       if (titleForItem(listItems[i]).toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1)
                       {
                           tempArray.push(listItems[i]);
                       }
                   }
                else
                {
                    if ((listItems[i].raisonsociale.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1
                        || listItems[i].ville.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1)
                        )
                    {
                        tempArray.push(listItems[i]);
                    }
                }
            }            
        }
        else
        {
            var nbItem = 0;
            
            /*
            if (currentActivity == "MP2013" || currentActivity == "Expo")
            {
                for (var i = 0; i < listItemsMP2013.length; i++)
                {
                    if (nbItem < 26 && (listItemsMP2013[i].name_fr.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1
                            || listItemsMP2013[i].nameOwner_fr.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1
                            || listItemsMP2013[i].place.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1))
                    {
                        tempArray.push(listItemsMP2013[i]);
                        nbItem++;
                    }
                }   
            }
            else
            */
            {
                for (var i = 0; i < listItems.length; i++)
                {
                    if (titleForItem(listItems[i]).toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1
                        || listItems[i].city.toLowerCase().latinise().indexOf($("#searchForm").val().toLowerCase().latinise()) != -1)
                    {
                        tempArray.push(listItems[i]);
                        nbItem++;
                    }
                }
            }
            

        }
                               
       if (isProdWeb || isProd)
       {
                clearTimeout(searchTimeOut);            
                searchTimeOut = setTimeout(function(){    
                                    gaTrackEvent('searchForm', 'currentTable : ' + currentTable + ' / currentActivity : ' + currentActivity + ' / currentCity : ' + currentCity, $("#searchForm").val(), 0)
                                  }, 2000);
       }
        
        listItems = tempArray;
                               
        if (isTrierOptionsOpened)
            if (getActivatedCriterias().length > 0)
               listItems.sort(function() {return 0.5 - Math.random()});
                               
        setNextResultForItemList();
                               
     }, 500);
}


$(document).ready(function(){
                  $("#searchForm").focus(function()
                                     {
                                     if($(this).val() == commonLabel[currentLang].Research + "...")
                                     {
                                     $(this).val("");
                                     }
                                     });
                  
                  $("#searchForm").blur(function()
                                    {
                                    if($(this).val() == "")
                                    {
                                    $(this).val(commonLabel[currentLang].Research + "...");
                                    }
                                    });
                  });



function resetItemListArray()
{
    log("resetItemListArray -> currentTable : " + currentTable + " / selectedTab : " + selectedTab);
    
    var isTrierOptionAtOn = false;
    
    if (isTrierOptionsOpened)
        if (getActivatedCriterias().length > 0)
            isTrierOptionAtOn = true;
    
    if (isTablePracticalLink && !isTrierOptionAtOn)
    {
        if (currentTable == "MoniteursEscalade")
        {
            switch (selectedTab)
            {
                case 0:     listItems = listItemsMoniteursEscalade;  break;
                case 1:     listItems = listItemsParcAccro;       break;
            }
        }
        else
        if (currentTable == "LocationVelo")
        {
            switch (selectedTab)
            {
                case 0:     listItems = listItemsVeloMPM; break;
                case 1:     listItems = listItemsLocationVelo; break;
            }
        }
        else
        if (currentTable == "Parkings")
        {
            switch (selectedTab)
            {
                case 0:     listItems = listItemsParkings; break;
                case 1:     listItems = listItemsCampingsCar; break;
            }
        }
        else
        {
            listItems = window["listItems" + currentTable];
        }
    }
    else
    {
        if (!isTrierOptionAtOn && currentTime == -1)
            listItems = baseActivityItemsList;
        else
            listItems = tempArrayForSearchList;
    }
}


function resetItemListRouting()
{
    var lList = getFullConcatListItems();
    
    for (var i = 0; i < lList.length; i++)
    {
        lList[i].costWalk = null;
        lList[i].costCar = null;
    }
}


function showParkingRelai()
{
    if (!isParkingRelaiActivated)
    {
        var tempArray = [];
        
        for (var i = 0; i < listItemsParkings.length; i++)
        {
            if (parkingRelaiArray.indexOf(listItemsParkings[i].raisonsociale) != -1)
                tempArray.push(listItemsParkings[i]);
        }
        
        //log("showParkingRelai -> lenght : " + tempArray.length);
        
        listItems = tempArray;
    }
    else
    {
        listItems = listItemsParkings;
    }

    setItemList();
    
    $("#parkingRelaiBtn").html(isParkingRelaiActivated?commonLabel[currentLang].showOnlyParkingRelai:commonLabel[currentLang].showAllParkings);
    
    isParkingRelaiActivated = !isParkingRelaiActivated;
}

