function accessListViewFromActivity(_activity)
{
    currentActivity = _activity;
    
    listItems = getBaseActivityItemsList(_activity);
    
    currentActivityItemList = listItems;
    
    $("#mainContainer").css("height", "auto");
    $("#mainContainer").css("top", "59px");
    $("#mobileTitle2").css("display", "inline-block");
    $("#bgImage").css("display", "none");
    $("#diapoHome").css("display", "none");
    $("#leftHomeSelectionBlock").css("display", "none");
    $("#itemList").css("display", "inline-block");
    
    $("#trierBtnItemList").css("display", "inline-block");
    $("#itemListOptions").css("display", "inline-block");
    $("#backBtn").css("visibility", "visible");
    $("#showMapBtn").css("display", "inline-block");
    $("#mainMenu").css("display", "none");
    
    makeTitleForHomeStatusAsList();
    
    setItemList();
    
    resetTrierOptions();
    
    displayOrNotNextResultsBtn();
}


function accessDetailViewFromUrl(_table, _idRepName)
{
    if (mPhotoSwipeHome)
    {
        mPhotoSwipeHome.stop();
        
        $("#bgImageTitle").css("display", "none");
        $("#trianglePlus").css("display", "none");
    }
    
    $("#itemList").html("");
    indexItemList = 10;
    lastIndexItemList = 0;
    
    currentActivity = _table;
    
    listItems = getBaseActivityItemsList(_table);
    
    currentActivityItemList = listItems;
    
    $("#mainContainer").css("height", "auto");
    $("#mainContainer").css("top", "59px");
    $("#mobileTitle2").css("display", "inline-block");
    $("#bgImage").css("display", "none");
    $("#diapoHome").css("display", "none");
    $("#leftHomeSelectionBlock").css("display", "none");
    $("#itemList").css("display", "none");
    $("#itemList").css("opacity", "0");
    
    for (var i = 0; i < listItems.length; i++)
    {
        if (_idRepName == listItems[i].idRepName)
            currentItemDetail = i;
    }
    
    setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
    
    showDetail(currentItemDetail, "noOffset");
}


function prevNextItemDetail(index)
{
	//log(index); index= 1 -> next // index= 0 -> prev
    
    if (isModalPopUp)
        showModalPopUp();
	
    if (currentTable == "Index")
    {
        resetAllOptionSlider();
        
        $("#closeLinkTitle").css("display", "none");
        $("#closeLinkBlock").html("");
        $("#closeLinkBlock").css("display", "none");
        
        $("#leftHomeOptionBlock").fadeOut(0);
        
        previousMapStatus = null
        isGoogleMap = false;
        isLeafletMap = false;
    }
    
    var lDuration = 200;
    if  (window.pageYOffset == 0 || window.pageYOffset == 1)
        lDuration = 0;
    
    var lYsizeItem = $(".itemHome").outerHeight();
    
    currentYoffset = -1;

	if (index == 0)
	{
        listItemYoffset -= lYsizeItem;
        
        if (currentTable == "Circuit")
        {
            var n = currentItemDetail;
            
            if (n == 0)
                n = listItems.length;
            
            while ($.isArray(listItems[n - 1]))
            {
                --n;
            }
            
            currentItemDetail = n;
        }
        else
        {
            if (currentItemDetail == 0)
            {
                currentItemDetail = listItems.length;
            
                listItemYoffset = $("#itemList .itemHome").length * lYsizeItem;
            }
        }

    
        
        
        $("body").animate({scrollTop:0}, lDuration, 'linear', function(){
                          $("#itemDetail").fadeOut(300, function(){
                                                   var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
                                                   $("#mainContainer").css("height", lHeight + "px");
                                                   showDetail(--currentItemDetail);
                                                   })
                          });
	}
	
	if (index == 1) 
	{
        listItemYoffset += lYsizeItem;
        
        if (currentTable == "Circuit")
        {
            var n = currentItemDetail;
            
            while ($.isArray(listItems[n + 1]))
            {
                ++n;
                
                if (n == listItems.length - 1)
                    n = -1;
            }
            
            currentItemDetail = n;
        }
        else
        {
            if (currentItemDetail == listItems.length - 1)
            {
                currentItemDetail = -1;
                
                listItemYoffset = 0;
            }
		}
        
        $("body").animate({scrollTop:0}, lDuration, 'linear', function(){
                          $("#itemDetail").fadeOut(300, function(){
                                                   var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
                                                   $("#mainContainer").css("height", lHeight + "px");
                                                   showDetail(++currentItemDetail);
                                                   })
                          });
	}
}

//var dbTest;

function showDetail (n, _isOffset)
{
    //dbTest = window.sqlitePlugin.openDatabase({name: "test"});
    //dbTest = window.sqlitePlugin.openDatabase({name: smallSpatialDbName.replace(".db", "")});
    
    currentItemDetail = n;
	var lItem = listItems[currentItemDetail];
    
    if (isProd)
    {
        gaTrackEvent("Detail", lItem.idRepName, lItem.table, 0);
    }
    
    
    //****************************************************************
    
    if (lItem.table == "Circuits")
    {
        if (isMapVisible)
            resetMap();

        setAndAdjustTitleLabel(titleForItem(lItem) + " - " + tableLabel[currentLang].Circuits);
        
        showMap("Circuits");
        
        previousMapStatus = "Circuits";
        
        return;
    }
    
    //****************************************************************
    
    //previousHomeStatus = homeStatus;
    homeStatus = "Detail";
	
    isOptionsVisible = false;
    hasToShowUserPosition = false;
    
    if (currentYoffset != -1 && _isOffset == null)
        listItemYoffset = window.pageYOffset;
    
    

	$("#backBtn").css("visibility", "visible");
	$("#mainMenu").css("display", "none");
	

        
    //****************************************************************
	
	log("HHHHHHHH showDetail ->  lat lon" + lItem.latitude + "," + lItem.longitude + " | lat lon routing : " + lItem.latitudeRouting + "," + lItem.longitudeRouting + " / _isOffset : " + _isOffset);
	
	isLocalizedMapAlredayLaunched = false;
    
    //************************************ INFOS *******************************************************
    

    //setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());

	
	fillDetailsWithItem(lItem);

    
	//******************** URL **********************
	
    var lActivity = currentActivity != -1 ? "&currentActivity=" + currentActivity : "";
    var lCity = currentCity != -1 ? "&currentCity=" + cityBtnArray [currentCity] : "";
    window.location.href = window.location.href.toString().split("#")[0] + "#currentLang=" + currentLang + lActivity + lCity + "&idRepName=" + lItem.idRepName;
	
	//************************* TRANSITIONS	*************************
	

    if (currentTable == "Index")
    {
        var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
        
        var lDuration = 500;
        
        //************** prev next ***********
        
        if ($("#itemList").css("opacity") == 0)
            lDuration = 0;
        
        //************************************
        
        $("#itemListOptions").animate({opacity:'0'}, lDuration, 'linear');
        $("#itemListBottomBtn").animate({opacity:'0'}, lDuration, 'linear');
        
        $("#itemList").animate({opacity:'0'}, lDuration, 'linear', function(){
                               
               setTimeout(function(){
                          
                          $("body").animate({scrollTop:0}, 0, 'linear', function(){
                                            
                                    bugScrollPositionFixed();
                                    
                                    setTimeout(function(){
                                               
                                               $("#itemListOptions").css('display', 'none');
                                               $("#itemListBottomBtn").css('display', 'none');
                                               $("#itemList").css('display', 'none');
                                               
                                               $("#mainContainer").css("height", lHeight + "px");
                                    }, 200);
                                    
                                    setTimeout(function(){
                                               
                                                setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
                                               
                                               $("#showMapBtn").css("display", "none");
                                               
                                                $("#prevNextDetail").css("display", "block");
                                               
                                               $("#itemDetail").fadeIn(500, function(){
                                                                       
                                                                       /*
                                                                       if (isAndroid)
                                                                        removeLoadingAnimation();
                                                                       */
                                                                       
                                                                       $("#mainContainer").css("height", "auto");
                                                                       
                                                                       
                                                                       
                                                                       });
                                               setImageOrDiaporama();
                                               
                                               setCloseLinkArray(lItem);                                               
                                               
                                               setTimeout(function(){
                                                          
                                                          if (localStorage.tipMenu == undefined || localStorage.tipMenu == "false")
                                                            showLittleModalPopUp("tipMenu");
                                                          
                                                          }, 500);
                                    }, 250);
                            });
                          
                }, 50);
                               
        });
    }
    else
    {
        $("body").animate({scrollTop:0}, 400, 'linear', function(){
                          animateItemListToLeftWhenIsLikeMobile(n);
                          });
    }
}


function animateItemListToLeftWhenIsLikeMobile(n)
{
    log("##### itemList -> height : " + $("#itemList").css('height'));
    
	$("#itemList").animate({
						   left: "-" + $("body").width() + "px",
						   }, 500, 'linear', function()
						   {
                           
                            setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
                           
						   $("#showMapBtn").css("display", "none");
						   $("#prevNextDetail").css("display", "block");
                           
                           //$("#itemList").css('display', 'none');
                           
                           $("#itemList").fadeOut(0, function(){
                                                  $("#itemList").css('left', '0px');
                                                  $("#itemDetail").css('display', 'inline-block');
                                                  $("#itemDetail").css('left', '0px');
                                                  setImageOrDiaporama();
                                                  }
                                                  );
						   });
	
    
	if (currentTable == "Index")
	{
		$("#itemListOptions").animate({
									  left: "-" + $("body").width() + "px"
									  }, 500, 'linear', function()
									  {
									  $("#itemListOptions").css("display", "none");
									  $("#itemListOptions").css("left", "0px");
									  
									  });
        
        
        $("#itemListBottomBtn").animate({
									  left: "-" + $("body").width() + "px"
									  }, 500, 'linear', function()
									  {
									  $("#itemListBottomBtn").css("display", "none");
									  $("#itemListBottomBtn").css("left", "0px");
									  
									  });
	}
	else
	{
		$("#itemListOptions").css("display", "none");
        $("#itemListBottomBtn").css("display", "none");
	}
}


function hideDetails()
{
	homeStatus = "List";
	currentItemDetail = -1;
    
    if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
        hasToShowUserPosition = true;
    
    if (mPhotoSwipe)
        mPhotoSwipe.destroyZoomPanRotate();
    
	if (currentTable == "Index")
	{

        $("body").animate({scrollTop:1}, 300, 'linear', function(){
                          
                $("#prevNextDetail").fadeOut(400);
        
                $("#itemDetail").animate({left: $("body").width() + "px"}, 400, 'linear', function()
                {
                        var _duration = 0;
                                         
                        if (isAndroid)
                        {
                            _duration = 0;
                            setLoadingAnimation(1);
                        }
                            
                         $("#itemListOptions").fadeIn(0);
                                         
                         $("#itemList").fadeIn(0);
                         
                         setTimeout(function(){
                                    
                                $("body").animate({scrollTop:listItemYoffset}, _duration, 'linear',function(){
                                                      
                                        setTimeout(function(){
                                                   
                                                   var lDuration = 500;
                                                 
                                                   $("#showMapBtn").fadeIn(lDuration);
                                                 
                                                    $("#itemListOptions").animate({opacity:'1'}, lDuration, 'linear');
                                                   
                                                   $("#itemListBottomBtn").animate({opacity:'1'}, lDuration, 'linear');
                                                   
                                                   if (currentTable == "Index")
                                                        setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                                   else
                                                        setAndAdjustTitleLabel(menuLabel[currentLang].circuitMenu);

                                                   $("#itemList").animate({opacity:'1'}, lDuration, 'linear', function(){
                                                            
                                                            if (previousHomeStatus == "Home")
                                                                setItemList();
                                                            else
                                                                displayOrNotNextResultsBtn();
                                                                          
                                                            bugScrollPositionFixed();
                                                                          
                                                            $("#itemDetail").css('display', 'none');
                                                            $("#itemDetail").css('left', '0px');
                                                                          
                                                            $("#closeLinkTitle").css("display", "none");
                                                            $("#closeLinkBlock").html("");
                                                            $("#closeLinkBlock").css("display", "none");
                                                                          
                                                            if (isAndroid)
                                                                removeLoadingAnimation();
                                                                          
                                                              if (currentActivity == "MyFavorites")
                                                              {
                                                                    currentActivity = -1;
                                                                    setMainSelectionItemsList('MyFavorites');
                                                              }
                                                                          
                                                            listItemYoffset = 0;
                                                                        
                                                    });
                                                   
                                                   resetAllOptionSlider();
                                                   
                                        }, 100);
                                })
                                                    
                        }, 300);

                    });          
        });
	}
	else
	{
		$("#itemDetail").css('display', 'none');
		$("#itemList").css('display', 'inline-block');
		
		//if (currentActivity == "MP2013" || currentActivity == "Expo")
        $("#itemListOptions").css('display', 'inline-block');
        
        $("body").animate({scrollTop:listItemYoffset}, 200, 'linear');
	}
	
    var lActivity = currentActivity != -1 ? "&currentActivity=" + currentActivity : "";
    var lCity = currentCity != -1 ? "&currentCity=" + cityBtnArray [currentCity] : "";
    window.location.href = window.location.href.toString().split("#")[0] + "#currentLang=" + currentLang + lActivity + lCity;
	
	//myMediumSlider.alreadyLaunched = false;
}


function launchScrollForList()
{
    log("launchScrollForList -> lastIndexItemList: " + lastIndexItemList);
    
    var lDuration = 0;
    
    if (isTablePracticalLink)
        lDuration = Math.floor(indexItemList / 10);

    //************ get Height for scroll **************
    
    var lHeight = $("#" + lastIndexItemList).offset().top - $("#mobileTitle2").outerHeight();
    
    //******************************************************
    
    setTimeout(function(){
               
               $("body").animate({scrollTop:lHeight}, 500, 'linear', function(){
                                      
                                      launchPicturesForList();
                                      
                                      setTimeout(bugScrollPositionFixed, 100);
                                      
                                      });
               }, 300 + lDuration * 100);
}


function showList(_animation)
{
    if (menuIsOpened)
        return;
    
    
    if (listItems.length > 0)
    {
        homeStatus = "List";
        
        if (_animation)
            animateLeftHomeSelectionBlockToLeft();
        else
            leftHomeSelectionBlockToLeft();
    }
    else
    {
        removeLoadingAnimation();
        
        if (currentActivity == -1 && currentCity == -1 & currentTime == -1)
            return;
        else
            showLittleModalPopUp("noItemListResult");
    }
}


function leftHomeSelectionBlockToLeft ()
{
    $("#bgImage").fadeOut(500);
    
    $("#diapoHome").fadeOut(500);
    
    
    //********************************************
    
    $("#leftHomeSelectionBlock").fadeOut(500, function()
                                         {
                                                actionsWhenItemListAppears()
                                         });
 
}


function animateLeftHomeSelectionBlockToLeft()
{
	$("#leftHomeSelectionBlock").animate({
										 left: "-" + $("body").width() + "px"
										 }, 500, 'linear', function()
										 {
                                         
                                         $("#mobileTitle2").css("left", "0px");
                                         
                                         $("#leftHomeSelectionBlock").css("display", "none");
										 $("#leftHomeSelectionBlock").css("left", "0px");
                                         
                                         $("#itemList").css("left", "0px");
                                         
                                         actionsWhenItemListAppears();
                                         
										 });

		
		$("#bgImage").animate({
							  left: "-" + $("body").width() + "px"
							  }, 500, 'linear', function()
							  {
							  $("#bgImage").css('display', 'none');
							  $("#bgImage").css('left', '0px');
							  });
    
    $("#diapoHome").animate({
                          left: "-" + $("body").width() + "px"
                          }, 500, 'linear', function()
                          {
                          $("#diapoHome").css('display', 'none');
                          $("#diapoHome").css('left', '0px');
                          });
}



function actionsWhenItemListAppears()
{
    $("#mainContainer").css("height", "auto");
    $("#mainContainer").css("top", "59px");
    
    //***************** Title ******************
    
    $("#mobileTitle2").css("display", "inline-block");
    
    setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
    
    setNextResultForItemList();
    
    //********************************************
    
    
    if (window[currentActivity + "TrierOptions"] && window[currentActivity + "TrierOptions"].length > 0)
        $("#trierBtnItemList").css("display", "inline-block");
    else
        $("#trierBtnItemList").css("display", "none");
    
    
    $("#itemListOptions").css("display", "inline-block");
    
    $("#backBtn").css("visibility", "visible");
    $("#showMapBtn").css("display", "inline-block");
    $("#mainMenu").css("display", "none");
    
    $("#itemList").css("display", "inline-block");
    
    if (localStorage.tipSearch == undefined || localStorage.tipGoogle == "tipSearch")
    {
        setTimeout(function(){
                   showLittleModalPopUp("tipSearch");
                   }, 1000);
    }
}


function animateBackFromItemList()
{
    $("#mobileTitle2").animate({
								  left: $("body").width() + "px"
								  }, 500, 'linear', function()
								  {
                                        $("#mobileTitle2").css("display", "none");
                                        $("#mobileTitle2").css("left", "0px");
								  });
    
    $("#itemListOptions").animate({
								  left: $("body").width() + "px"
								  }, 500, 'linear', function()
								  {
                                        $("#itemListOptions").css("display", "none");
                                        $("#itemListOptions").css("left", "0px");
								  
								  });
    
    $("#itemListBottomBtn").animate({
                                    left: $("body").width() + "px"
                                    }, 500, 'linear', function()
                                    {
                                        $("#itemListBottomBtn").css("display", "none");
                                        $("#itemListBottomBtn").css("left", "0px");
                                    });
    
	$("#itemList").animate({
						   left: $("body").width() + "px"
						   }, 500, 'linear', function()
						   {

                                $("body").animate({scrollTop:1}, 300, 'linear', function(){
                                             
                                                  $("#itemList").css('display', 'none');
                                                  $("#itemList").css('left', '0px');
                                             
                                                  actionsWhenHomeAppears();
                                             
                                });
						   });
}


function backFromItemList()
{
    $("#mobileTitle2").fadeOut(1000);
    
    $("#itemList").fadeOut(1000, function()
                           {
                                $("body").animate({scrollTop:0}, 0, 'linear', function()
                                             {
                                                  actionsWhenHomeAppears();
                                             });
                           });

    $("#itemListOptions").fadeOut(1000);
    
    $("#itemListBottomBtn").fadeOut(1000);
}



function actionsWhenHomeAppears()
{
    $("#leftHomeSelectionBlock").css("display", "inline-block");
    
    $("#bgImage").css("display", "inline-block");
    
    $("#diapoHome").css("display", "inline-block");
    
    $("#mainContainer").css("top", "0px");
    
    $("#backBtn").css("visibility", "hidden");
    $("#showMapBtn").css("display", "none");
    $("#mainMenu").css("display", "inline-block");
    
    listItemYoffset = 0;
    
    if (homeStatus == "List" || homeStatus == "Detail" || currentActivity == "Circuits")
    {
        resetHomeAsStart();
    
        //setTimeout(setSizeForMainSelectionItemTitle,50);
    }
    else
    {
        
        $("body").animate({scrollTop:currentYoffset}, 500, 'linear',function()
                          {
                               bugScrollPositionFixed();
                               homeStatus = "Home";
                               previousHomeStatus = "Home";
                          });
    }
}


function showOptionsMap(_arg, _type, _onTour)
{
    log("|||||||| showOptionsMap -> _type : " + _type + " / _onTour : " + _onTour);
    
    if (_onTour == undefined)
    {
        listItemsMap = window["optionSlider" + _type + "Array"];
    }
    else
    {
        listItemsMap = listItems[_onTour];
    }
    
    
    showMap(_arg);
}


function showMap(_arg)
{
    //log("showMap -> isApp : " + isApp + " / isGoogleSelected : " + isGoogleSelected + " / homeStatus : " + homeStatus + " / cityBtnArray[currentCity] : " + cityBtnArray[currentCity]);
    
    deletePopUp();

    if (isModalPopUp)
        showModalPopUp();
    
    
    if (spatialiteToPhp)
    {
        getCloserNodeFromSingleItemToSpatialiteToPhp('walks_nodes', 'small');
        getCloserNodeFromSingleItemToSpatialiteToPhp('walks_nodes', 'full');
        

        getCloserNodeFromSingleItemToSpatialiteToPhp('roads_nodes', 'small');
        getCloserNodeFromSingleItemToSpatialiteToPhp('roads_nodes', 'full');

        
        return;
    }
    
    //************************************ getInsideBound -> LIST & Geoloc ***********************************
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid && homeStatus == "List" && cityBtnArray[currentCity] == "Geoloc"
        && getInsideBound(boundBoxPaca, userLocation.latitude, userLocation.longitude, 0) == false)
    {
        showLittleModalPopUp("", commonLabel[currentLang].noLocationInBound);
        return;
    }
    
    //************************** settings ***************************
    
    if (!_arg)
        currentSelectedGooglePoint = null;
    
    mCurrentTitle = $("#mobileTitle2Label").html();
    
    currentMapYoffset = window.pageYOffset;
    
    var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
    
    //**************************** arg for velo MPM & location velo ************************
    
    var arg = _arg;
    
    if (currentTable == "LocationVelo")
    {        
        if (listItems[0].type == "VeloMPM")
        {
            if (_arg == undefined)
            {
                arg = "VeloMPM";
            }
        }
        else if (_arg == undefined)
        {
            arg = "LocationVelo";
        }
    }
    
    log("showMap -> arg : " + arg + " / homeStatus : " + homeStatus);

    
    if (homeStatus == "List")
    {
        var lDuration = 500;
        
        if (isAndroid)
            setLoadingAnimation(1);
        
        $("#bgImage").animate({opacity:'0'}, lDuration, 'linear');
        $("#itemListOptions").animate({opacity:'0'}, lDuration, 'linear');
        $("#itemListBottomBtn").animate({opacity:'0'}, lDuration, 'linear');
        
        
        $("#itemList").animate({opacity:'0'}, lDuration, 'linear', function(){
                               
            if (!isAndroid)
                setLoadingAnimation(1);
                                                 
            setTimeout(function(){
                                   
                $("body").animate({scrollTop:0}, 0, 'linear', function(){
                        
                    bugScrollPositionFixed("showMap");
                    
                    setTimeout(function(){
                                  
                                $("#bgImage").css('display', 'none');
                                $("#itemListOptions").css('display', 'none');
                                $("#itemListBottomBtn").css('display', 'none');
                                $("#itemList").css('display', 'none');
                               
                               }, 200);
                                
                    setTimeout(function(){
                                  showMap2(arg)
                               }, 250);
                });
                       
            }, 50);
                              
        });
    }
    else
    if (homeStatus == "Detail" || homeStatus == "Close")
    {
        var lDuration = 300;
        
        if (currentMapYoffset == 0 || currentMapYoffset == 1)
            lDuration = 0;
        
        $("body").animate({scrollTop:0}, lDuration, 'linear', function(){
                          
                          bugScrollPositionFixed("showMap");
                          
                          setTimeout(function(){

                                     if (homeStatus == "Detail")
                                        $("#itemDetail").css('display', 'none');
                                     else
                                     if (homeStatus == "Close")
                                        $("#leftHomeOptionBlock").css('display', 'none');
                                     
                                     }, 200);
                          
                          setTimeout(function(){
                                     showMap2(arg)
                                     }, 250);
                          });
    }
    else
    // if(homeStatus == "Home")
    {
        setTimeout(function()
        {
            $("#bgImage").fadeOut(0);
            
            if (currentTable == "Index")
            {
                $("#leftHomeSelectionBlock").css("display", "none");
                
                $("#leftHomeOptionBlock").css("display", "none");
                
                $("#itemList").css("display", "none");
                
                $("#diapoHome").css("display", "none");
            }
            
            showMap2(arg);
            
            animateCloseMenu();
        }, 500);
    }
}
	

function showMap2(_arg)
{
    log("showMap 2");
    
    var lHeight;

    if (_arg == "ChoosePosition")
        setAndAdjustTitleLabel(cityLabel[currentLang].ChoosePositionOnMap);
    
    //********************* Mobile title & map size ***********************
    
    if (currentTable == "Index" && homeStatus == "Home")
    {
        $("#mainContainer").css("height", "auto");
        $("#mainContainer").css("top", "59px");
        
        $("#mobileTitle2").css("display", "inline-block");
        
        setAndAdjustTitleLabel($("#mobileTitle2Label").html());
    }
    
    /*
    if (currentActivity == "Circuits")
    {
        $("#mobileTitle2Label").css("visibility", "hidden");
        $("#mobileTitle2").css("background-color", "transparent");
        $("#mobileTitle2").css("border-bottom", "0px dotted #a9a9a9");
        
        $("#mainContainer").css("top", "0px");
        
        lHeight = getYsize();
        
    }
    else
     */
    lHeight = getYsize() - $("#mobileTitle2").outerHeight();

    
    $("#mapList").css("height", lHeight + fuckingFourPixels + "px");
    $("#mainContainer").css("height", lHeight + "px");
    
    $("#blockMap").css("display", "inline-block");
    
    
    //********************* VAR ***********************
    
    isMapVisible = true;
    
    mapStatus = _arg;
    
    previousMapStatus = _arg;
    
    if (mapStatus == "Circuits")
        isCircuitsSwiperVisible = true;
    
    
	//********************* btn ***********************
	
    if (currentTable == "routingMap" || currentTable == "randoMap")
    {
        $("#mobileTitle2Right").css("display", "inline-block");
        $("#showUserPosition").css("display", "inline-block");
        
        $("#backBtn").css("visibility", "hidden");
        $("#mainMenu").css("display", "inline-block");
    }
    else
    {
        $("#backBtn").css("visibility", "visible");
        
        $("#showMapBtn").css("display", "none");
        $("#mainMenu").css("display", "none");
        $("#prevNextDetail").css("display", "none");
	}
      
    if (homeStatus == "List" && isGoogleMap && !isLikeMobile)
        $("#showSettings").css("display", "inline-block");
    else
        $("#showUserPosition").css("display", "inline-block");
    
    if (mapStatus == "ChoosePosition")
    {
        $("#showUserPosition").css("display", "none");
        setTimeout(function(){$("#backBtn").css("visibility", "visible");}, 500);
    }
    
    
    //******************* NEXT **********************
    
    showMap3(_arg);
    
    if (!$("#loadingAnimation"))
    {
        log("second loadingAnimation");
        setLoadingAnimation(0);
    }
    
    //******************* GA **********************
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('showMap');
        
        var lInfo = homeStatus;
        
        if (homeStatus == "List" && currentTable == "Index")
            lInfo += " : " + currentActivity;
        else
        if (homeStatus == "Detail" || homeStatus == "Close")
            lInfo += " : " + listItems[currentItemDetail].idRepName;
        
        gaTrackEvent('showMap', 'map : ' + (isLeafletMap ? 'Leaflet' : 'Google') + ' / mapStatus : ' + mapStatus, 'currentTable : ' + currentTable + " / " + lInfo , 0);
    }
}


function showMap3(_arg)
{
    log("showMap 3 -> _arg : " + _arg);
    
    //********************** Btn switch to ign *******************
    
    if (currentTable == "routingMap" || currentTable == "randoMap" || isTablePracticalLink)
    {
        isSwitchBtn = false;
    }
    else
    {
        isSwitchBtn = true;
        
        var lTop = 8;
        var lLeft = 8;

        var lOnClick = "";
        
        if (_arg == "IGN")
        {
            var lLink = urlWeb + "IGN.html#" + listItems[currentItemDetail].table + "&" + listItems[currentItemDetail].idRepName;
            lOnClick = 'showLittleModalPopUp(\'exitApp\', null, \''+ lLink + '\');';
        }
        
        var lBtnSwitchHtml = '<div id="btnSwitch" style="display:inline-block; position:absolute; top:' + lTop + 'px; left:' + lLeft + 'px; z-index: 500; width:44px; height:44px; background-image:url(Assets/btn_switch.png); background-size:100% 100%; opacity:0.7;" onclick="javascript:' + lOnClick + '"></div>';
    }
    
    //********************** select map *******************
    
    if (_arg == "IGN")
    {
        if (isApp)
        {
            /*
             if (previousMapStatus == "IGN")
             {
             $("#mapList").remove();
             $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
             $("#mapList").css("height", getYsize() - $("#mobileTitle2").outerHeight());
             }
             */
            openTilesRandoDb();
            openTilesDb();
            
            
            //********************** Btn Download db *******************
            
            var lBtnDownloadHtml = "";
            
            if (currentTable != "randoMap")
            {
                var lDbName = massifDbArray[listItems[currentItemDetail].mountains];
                
                if (!isRestrictedAndroid && (massifBoundsArray[lDbName] && localStorage[lDbName + "_13_17"] != "true")
                || (!massifBoundsArray[lDbName] && localStorage[listItems[currentItemDetail].idRepName + "_13_17"] != "true"))
                {
                    if (!massifBoundsArray[lDbName])
                        lDbName = listItems[currentItemDetail].idRepName;
                    
                    lBtnDownloadHtml = getHtmlForBtnDonwload(lDbName);
                    
                    isDownloadBtn = true;
                }
            }
            else
            {
                lBtnDownloadHtml = getHtmlForBtnDonwload('currentMassif');
                isDownloadBtn = true;
            }
            
            
            //********************** wait for open db and launch leaflet *******************
            
            setTimeout(function(){
                       
                       setLeafletMapForGPX();

                       log("showMap 3 -> isDownloadBtn : " + isDownloadBtn + " isSwitchBtn : " + isSwitchBtn);
                       
                       if (isDownloadBtn)
                       {
                            $(lBtnDownloadHtml).insertBefore("#mapList");
                       
                            if (currentTable != "randoMap")
                                $("#bntDonwload").css("display", "inline-block");
                       }
                       
                       if (isSwitchBtn)
                            $(lBtnSwitchHtml).insertBefore("#mapList");
                       
                       }, 500);  
        }
        else
        {
            //mapIGN = null;
            
            /*
             if (previousMapStatus != "IGN")
             {
             $("#mapList").remove();
             $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
             $("#mapList").css("height", getYsize() - $("#mobileTitle2").outerHeight());
             }
             */
            
            if (!isIGNmapAPIalreadyLaunched)
            {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://cdn.jsdelivr.net/npm/ignf-geoportal-sdk@2.1.0/dist/GpSdk.js";
                
                script.onload = function() {
                    isIGNmapAPIalreadyLaunched = true;
                    // Configuration IGN
                    Gp.Services.getConfig({
                        apiKey: IGNkey,
                        callbackSuffix: "",
                        timeOut: 20000,
                        onSuccess: function () {
                            console.log("Configuration IGN chargée !");
                            loadIGN();
                        },
                        onFailure: function (error) {
                            console.error("Erreur de chargement IGN :", error);
                        }
                    });
                };
                
                document.body.appendChild(script);
            }
            else
            {
                if (isGoogleMap)
                    initMapIGN();
                else
                    setMapIGN();
            }
        }
    }
    else
	{
        log("showMap3 -> previousMapStatus : " + previousMapStatus);
        
        /*
         if (previousMapStatus == "IGN")
         {
         $("#mapList").remove();
         $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
         $("#mapList").css("height", getYsize() - $("#mobileTitle2").outerHeight());
         
         isGoogleMap = false;
         }
         */
        
        if (isGoogleMap && !isMapVisible)
        {
            /*
            $("#mapList").remove();
            $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
            $("#mapList").css("height", lHeight + "px");
            
            isGoogleMap = false;
             */
        }
        
        setGlobalMap();
        
        //*************** TARGET BTN ******************
        
        if ((currentTable == "Index" && ((homeStatus == "List" && currentActivity == "NoIdea" && mapStatus != "Circuits") || mapStatus == "ChoosePosition")) || isTablePracticalLink)
        {
            var lTop = mapStatus == "ChoosePosition" ? 8 : 8 + $("#mobileTitle2").outerHeight();
            var lLeft = getXsize() - 44 - 4;
            
            var lBtnTargetHtml = '<div id="btnTarget" style="top:' + lTop + 'px;" onclick="javascript:showTargetOnMap();"></div>';
            
            $(lBtnTargetHtml).insertBefore("#mainContainer");
            
            isTargetBtn = true;
            
            if (mapStatus == "ChoosePosition")
                showTargetOnMap();
        }
        
        
        //*************** MACARON TRANSPORT ******************
        
        if (mapStatus == "Circuits" && listItems[currentItemDetail].partner)
        {
            //*********** macaron *********
            
            
            var lMacaron = 'background-image:url(Assets/macaron/macaron' + listItems[currentItemDetail].macaron + '.png);';
            
            var lMacaronPartnerHtml = '<div id="macaronPartner" style="' + lMacaron + '" onclick="javascript:showCellPartner();"></div>';
            
            $(lMacaronPartnerHtml).insertBefore("#mapList");
            
            
            //*********** cell *********
            
            var lItem = getItemInDataList(listItems[currentItemDetail].partner);
            
            var lLink = 'javascript:showPopUpItem(\''+ lItem.table + '\', \'' + lItem.idRepName + '\');'
            
            var lBorder = "";
            
            if (listItems[currentItemDetail].macaron == "Bateau" || listItems[currentItemDetail].macaron == "Moto" || listItems[currentItemDetail].macaron == "TukTuk" || listItems[currentItemDetail].macaron == "Voiture")
                lBorder = 'borderPink';
            else
                lBorder = 'borderGreen';
            
            
            var lCellPartnerHtml =
            '<div id="cellPartner" onclick="' + lLink + '" class="' + lBorder + '">' +
                '<div id="introCellPartner">' + commonLabel[currentLang].introCellPartner + '</div>' +
                '<div id="titleCellPartner">' + titleForItem(lItem) + '</div>' +
            '</div>';
            
            $(lCellPartnerHtml).insertBefore("#mapList");
            
            isCellPartnerVisible = true;
            
            setFileForOnePictureForUnicId(lItem, "cellPartner");
            
            //***************** swiper ********************
            
            setTimeout(function(){
                       
                       
            var CircuitArray = jQuery.parseJSON(listItems[currentItemDetail].CircuitArray);
            
            var lSlideHtml = "";
            
            mCircuitsArray = [];

            for (var i = 0; i < CircuitArray.length; i++)
            {
                var value = CircuitArray[i].split(",");
                
                lItem = getItemInDataList(value[0], value[1]);
                       
                var lLink = 'javascript:showPopUpItem(\''+ lItem.table + '\', \'' + lItem.idRepName + '\', null);';
                
                lSlideHtml +=
                '<div id="swiperMap' + lItem.idRepName + '" class="swiper-slide swiper-slide_map" onclick="' + lLink + '">' +
                '<div class="introCellCircuitsSwiper">' + getTypeInCell(lItem) + '</div>' +
                '<div class="titleCellCircuitsSwiper">' + titleForItem(lItem) + '</div>' +
                '</div>';
                
                mCircuitsArray.push(lItem);
            }
            
            var lSwiperHtml =
            '<div id="circuitsSwiper">' +
            '<div class="swiper-container_map">' +
            '<div class="swiper-wrapper">' +
            lSlideHtml +
            '</div>' +
            '</div>';
            
            $(lSwiperHtml).insertBefore("#mapList");
            
            
            var lBtnSwiperHml =
            '<div id="circuitsBtnSwiper">' +
            '<a href="javascript:showCircuitsSwiper();">' +
            '<img src="Assets/btn_swiper_off.png" id="btnSwiperOffOn" />' +
            '<a>' +
            '</div>';
            
            $(lBtnSwiperHml).insertBefore("#mapList");
                       
            isCircuitsSwiperVisible = true;
            
            
            mSwiperCircuits = new Swiper('.swiper-container_map', {
                                         spaceBetween: 10,
                                         resistanceRatio: 0.1,
                                         onSlideChangeEnd : function(swiper){
                                            actionOnCircuitsSwiperMove();
                                         },
                                         onClick: function(swiper, event) {
                                            actionOnCircuitsSwiperMove();
                                         }
                                    });
            
            setFilePictureForMapSwiper();
                       
                       
            }, 1000);

        }
        
        
        //********** used for test ***********
        
        //$(getHtmlForBtnDonwload('currentMassif')).insertBefore("#mapList");
        
        //******************* TIP GOOGLE **********************
        
        if (currentTable != "routingMap" && currentTable != "randoMap" && (localStorage.tipGoogle == undefined || localStorage.tipGoogle == "false"))
        {
            setTimeout(function(){
                   showLittleModalPopUp("tipGoogle");
                   }, 1000);
        }
	}
}


function getHtmlForBtnDonwload(_arg)
{
    var lTop = 8;
    var lLeft = getXsize() - 44 - 4;
    
    return '<div id="bntDonwload" style="top:' + lTop + 'px; left:' + lLeft + 'px;" onclick="javascript:showLittleModalPopUp(\'downloadMassifDb\', null, \'' + _arg + '\');"></div>';
}


function backFromMap()
{
    log("backFromMap -> currentMapYoffset : " + currentMapYoffset + " / homeStatus : " + homeStatus + " / mapStatus : " + mapStatus);
    
	$("#blockMap").animate({
						   left: $("body").width() + "px"
						   }, 500, 'linear', function()
						   {
                           
                           $("#blockMap").css("display", "none");
                           $("#blockMap").css("left", "0px");
                           
                           if (homeStatus == "List" && isAndroid)
                            setLoadingAnimation(1);
                           
                           /*
                           indexMapItems = 4;
                           indexMapRestaurants = 4;
                           indexMapMP2013 = 4;
                           indexMapHotels = 4;
                           indexMapServices = 4;
                           */
                           

                            if (homeStatus == "List" || previousMapStatus == "Circuits")
                            {
                                setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                            }
                            else
                            {
                                setAndAdjustTitleLabel(mCurrentTitle);
                            }
                           
                           log("backFromMap animate -> previousMapStatus : " + previousMapStatus);
                       
                            if (homeStatus == "List" || previousMapStatus == "Circuits")
                            {

                                    if (isTablePracticalLink)
                                        $("#bgImage").fadeIn(0);
                               
                                    $("#itemListOptions").fadeIn(0);
                                    $("#itemList").fadeIn(0);

                                    setSizeToBlockTextAtList();
    
    
                                var lDuration = isAndroid ? 500 : 300;

                                   setTimeout(function(){
                                              
                                        lDuration = isAndroid ? 300 : 0;
                                              
                                        $("body").animate({scrollTop:currentMapYoffset}, lDuration, 'linear',function(){
                                                          
                                                bugScrollPositionFixed();
                                                          
                                                setTimeout(function(){

                                                        lDuration = 500;
                                                           
                                                        
                                                        $("#showMapBtn").fadeIn(lDuration);
                                                        
                                                        $("#bgImage").animate({opacity:'1'}, lDuration, 'linear');
       
                                                        $("#itemListOptions").animate({opacity:'1'}, lDuration, 'linear');
                                                        $("#itemListBottomBtn").animate({opacity:'1'}, lDuration, 'linear');
                                                       
                                                        $("#itemList").animate({opacity:'1'}, lDuration, 'linear', function()
                                                        {
                                                            if (previousMapStatus == "Circuits")
                                                                setItemList();
                                                            else
                                                                displayOrNotNextResultsBtn();               
                                                                               
                                                            $("#mainContainer").css("height", "auto");
                                                                               
                                                            previousMapStatus = null;
                                                            homeStatus = "List";
                                                                               
                                                            setTimeout(removeLoadingAnimation, 50);
                                                        });

                                                }, 200);
                                        })
                                              
                                    }, lDuration);
                            }
                           else
                           if (previousMapStatus == "ChoosePosition")
                           {
                                $("#itemList").fadeIn(0);
                           
                                if (currentTable == "Index" && homeStatus == "Home")
                                    $("#mobileTitle2").fadeOut(0);
                           
                                actionsWhenHomeAppears();
                           }
                            else
                            if (homeStatus == "Detail" || homeStatus == "Close")
                            {
                                log("backFromMap Detail -> homeStatus : " + homeStatus);
                       
                                if (homeStatus == "Detail")
                                {
                                    $("#itemDetail").fadeIn(0);
                                    $("#prevNextDetail").fadeIn(0);
                           
                                    if (mPhotoSwipe)
                                        mPhotoSwipe.carousel.show(mIndexPhotoSwipe);
                                }        
                                else
                                if (homeStatus == "Close")
                                    $("#leftHomeOptionBlock").fadeIn(0);

                           
                                setTimeout(function(){
                                           
                                    var lDuration = 300;
                               
                                    if (currentMapYoffset == 0 || currentMapYoffset == 1)
                                        lDuration = 0;
                           
                                    $("body").animate({scrollTop:currentMapYoffset}, lDuration, 'linear',function()
                                    {
                                            bugScrollPositionFixed();
                                            $("#mainContainer").css("height", "auto");
                                    });
                                           
                                }, 200);
                            }
                    });

    resetMap();
}


function resetMap()
{
    listItemsMap = [];
    mCircuitsArray = null;
    
    if (mapStatus == "Circuits")
    {
        $("#macaronPartner").remove();
        
        isCellPartnerVisible = false;
        $("#cellPartner").remove();
    
        $("#circuitsSwiper").remove();
        $("#circuitsBtnSwiper").remove();
        isCircuitsSwiperVisible = false;
        
        mIndexLastSelectedCircuitMarker = -1;
    }
    
    mCloserItem = null;
    
    typeOfDisplayDirection = null;
    pinImage = null;
    pinShadow = null;
    
    if (mWatchPosition)
        clearWatchPosition();
    
    if (userChoosePosition && userLocation)
        userLocation = null;
    
    if (isTargetBtn)
    {
        $("#btnTarget").remove();
        isTargetBtn = false;
    }
    
    if (isTargetOnMapVisible)
    {
        $("#targetOnMap").remove();
        
        $("#btnTarget").css("background-image", "url(Assets/btn_target.png)");
        
        isTargetOnMapVisible = false;
    }
    
    //*************************************************************************************
    
    if (isLeafletMap)
    {
        log("resetMap -> isLeafletMap : " + isLeafletMap);
        
        isLeafletMap = false;
        
        removeAllOSMmarquers();
        userMarker = null;
        nodeTo = null;
        nodeFrom = null;
        typeBoundingBox = null;
        mMassif_13_17 = null;
        
        if (polyline)
        {
            map.removeLayer(polyline);
            polyline = null;
        }
        
        if (gpxLayer)
        {
            map.removeLayer(gpxLayer);
            gpxLayer = null;
            
            map.removeLayer(mRandoTileLayer);
            mRandoTileLayer = null;
        }
        
        if (mTileLayer)
        {
            map.removeLayer(mTileLayer);
            mTileLayer = null;
        }
        
        map.remove();
        map = null;
        
        removeLoadingAnimation();
        
        log("resetMap 3 -> isDownloadBtn : " + isDownloadBtn + " isSwitchBtn : " + isSwitchBtn);
        
        if (isDownloadBtn)
        {
            $("#bntDonwload").remove();
            isDownloadBtn = false;
        }
        
        if (isSwitchBtn)
        {
            $("#btnSwitch").remove();
            isSwitchBtn = false;
        }
    }
    else
    {
        if (isGoogleMapAPIalreadyLaunched)
        {
            removeAllGoogleMarkers();
            
            if (polyline)
            {
                polyline.setMap(null);
                polyline = null;
            }
        }
        
        $("#mapList").remove();
        $("#blockMap").html('<div id="mapList" class="corner"></div>');
        $("#mapList").css("height", (getYsize() - $("#mobileTitle2").outerHeight()) + "px");
        
        isGoogleMap = false;
    }
    
    mapStatus = null;
    isMapVisible = false;
    hasToShowUserPosition = false;
    
    if (isMapTitleMenuAndButtonsForNoIdeaAndGeoloc)
    {
        $("#mobileTitle2Label").attr("onclick", "openOrCloseMenu('title');");
        isMapTitleMenuAndButtonsForNoIdeaAndGeoloc = false;
    }
}


function back()
{
    log("ççççççççççç back -> previousHomeStatus : " + previousHomeStatus + " / homeStatus : " + homeStatus + " / isLikeMobile : " + isLikeMobile + " / isTablePracticalLink : " + isTablePracticalLink);
    
    deletePopUp();
    
    if (isModalPopUp)
    {
        showModalPopUp();
        
        return;
    }
    else
	if (isMapVisible)
	{
        log("ççççççççççç back -> isMapVisible ");
        
		isItinary = false;
        
        $("#showUserPosition").css("display", "none");
        $("#showSettings").css("display", "none");
        
        //**************************************************
        
		backFromMap();
        
        if (isTablePracticalLink)
		{
            $("#backBtn").css("visibility", "hidden");
			$("#mainMenu").css("display", "inline-block");
		}
        
        if (homeStatus == "Close")
        {
            $("#showMapBtn").css("display", "inline-block");
        }
	}
	else
	if (homeStatus == "Detail")
	{
        if (currentActivity == "MyFavorites" && getBaseActivityItemsList("MyFavorites").length == 0)
        {
            homeStatus = "List";
            currentItemDetail = -1;
            
            if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
                hasToShowUserPosition = true;
            
            if (mPhotoSwipe)
                mPhotoSwipe.destroyZoomPanRotate();
            
            $("body").animate({scrollTop:1}, 300, 'linear', function(){
                              
                      $("#mobileTitle2").animate({
                                                 left: $("body").width() + "px"
                                                 }, 400, 'linear', function()
                                                 {
                                                 $("#mobileTitle2").css("display", "none");
                                                 $("#mobileTitle2").css("left", "0px");
                                                 });
                              
                      $("#prevNextDetail").fadeOut(400);
                      
                      $("#itemDetail").animate({left: $("body").width() + "px"}, 400, 'linear', function()
                                               {
                                               $("#itemList").css('opacity', '1');
                                               $("#itemListOptions").css('opacity', '1');
                                               
                                               $("#itemDetail").css('display', 'none');
                                               $("#itemDetail").css('left', '0px');
                                               
                                               $("#closeLinkTitle").css("display", "none");
                                               $("#closeLinkBlock").html("");
                                               $("#closeLinkBlock").css("display", "none");
                                               
                                               resetAllOptionSlider();
                                               
                                               setTimeout(actionsWhenHomeAppears,200);
                                               
                                               });          
            });
            
        }
        else
            hideDetails();
	}
    else
    if (homeStatus == "Close")
	{
		hideCloseItemBlock();
	}
	else
    {
        animateBackFromItemList();
    }
    
    mIndexPhotoSwipe = 0;
}


function showCloseItem(n)
{
    if (isModalPopUp)
        showModalPopUp();
    
    tempSelectedItem = closeArray[n];
    
    showModalPopUp("Map");
    
    setMapImageOrDiaporama(tempSelectedItem);
}


function showCloseItemBlock()
{
    if (isLikeMobile)
    {
        detailYoffset = window.pageYOffset;
        
        $("body").animate({scrollTop:0}, 300, 'easeOutCubic', function(){

                                                $("#itemDetail").animate({
                                                                                     left: "-" + $(this).width() + "px"
                                                                                     }, 500, 'linear', function()
                                                                                     {
                                                                         
                                                                                     setLoadingAnimation();
                                                                         
                                                                                     setAndAdjustTitleLabel(detailLabel[currentLang].close);
                                                                                     
                                                                                     $("#itemDetail").css("display", "none");
                                                                                     $("#itemDetail").css("left", "0px");
                                                                                     
                                                                                     $("#leftHomeOptionBlock").css("display", "inline-block");
                                                                                     $("#leftHomeOptionBlock").css("min-height", "360px");
                                                                                     
                                                                                     setTimeout(setAllOptionItemsSlider, 50);
                                                                                     
                                                                                     $("#prevNextDetail").css("display", "none");
                                                                                     
                                                                                     $("#showMapBtn").css("display", "inline-block");
                                                                                     $("#showMapBtn").attr("href", "javascript:showMap('closeMap')");
                                                                                     
                                                                                     homeStatus = "Close";
                                                                                     });

                                                                        });
        
    }
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('showCloseItemBlock');
        
        gaTrackEvent('showCloseItemBlock', 'idRepName : ' + listItems[currentItemDetail].idRepName + ' / table : ' + listItems[currentItemDetail].table, 'currentTable : ' + currentTable, 0);
    }
}


function hideCloseItemBlock()
{
    $("body").animate({scrollTop:0}, 300, 'linear', function(){
                      
                      $("#leftHomeOptionBlock").animate({
                                               left: $("body").width() + "px"
                                               }, 500, 'linear', function()
                                               {
                                               

                                                setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
                                               
                                               $("#itemDetail").css("display", "inline-block");
                                                    
                                               if (mPhotoSwipe)
                                                    mPhotoSwipe.carousel.show(mIndexPhotoSwipe);
                                               
                                               $("#leftHomeOptionBlock").css("display", "none");
                                               $("#leftHomeOptionBlock").css("left", "0px");
                                               
                                               $("#prevNextDetail").css("display", "inline-block");
                                               
                                               $("#showMapBtn").css("display", "none");
                                               $("#showMapBtn").attr("href", "javascript:showMap()");
                                               
                                               homeStatus = "Detail";
 
                                               setTimeout(function(){
                                                            $("body").animate({scrollTop:detailYoffset}, 400, 'easeInCubic'
                                                                              ,bugScrollPositionFixed
                                                                              );
                                                          }, 200);
                                               
                                               });
                      });
    
}


function showCloseOptionsForItemDetail()
{
    if (currentTable == "Index")
    {
        isOptionsVisible = true;
        
        $("#leftHomeOptionBlockMobile #closeLabel").html(commonLabel[currentLang].loader);
        
		
		$("#leftHomeOptionBlock").css("visibility", "hidden");
		$("#leftHomeOptionBlock").css("display", "inline-block");
		
         setTimeout(function(){setAllOptionItemsSlider();}, 100);
         
         setTimeout(function()
         {
                    $("#leftHomeOptionBlockMobile").remove();
					
                    $("#leftHomeOptionBlock").css("visibility", "visible");
					
					
                    $("#leftHomeOptionBlock").fadeIn(300, 'linear', function()
                                                     {
														//setHomeSliderWithType("MP2013");
														$("body").animate({scrollTop:getYsizeForHomeBtn() - 120}, 200, 'linear');
                                                     });
         
         }, 800);
    }
}


function setLoadingAnimation(_opacity, _arg)
{
    var lPosition = 'absolute';
    var lHeight;
    var lTop;
    var lBgColor;
    var lTimeOut;
    var lOpacity;
    var lMarginHeight;
    var lElement;
    var lZindex = 5004;
    
    if (_opacity != null)
        lOpacity = _opacity;
    else
        lOpacity = 1;

    if (_arg == 'full')
    {
        lHeight = getYsize();
        lTop = 0;
        lBgColor = "#2E2A2A";
        lTimeOut = 100000 * 6 * 5;
        lMarginHeight = (lHeight - 64) / 2;
        lElement = '<img src="Assets/cross.png" width="64" height="64" style="margin-top:' + lMarginHeight + 'px;" onclick="removeLoadingAnimation()" />';
    }
    else
    if (_arg == 'home')
    {
        lHeight = getYsize();
        lTop = 0;
        lBgColor = 'rgba(255, 255, 255, ' + lOpacity + ')';
        lTimeOut = 15000;
        lZindex = 5006;
        lMarginHeight = (lHeight - 16)/2;
        lElement = '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />';
    }
    else
    if (_arg == 'listHome')
    {
        lPosition = 'relative';
        lHeight = 100;
        lTop = 0;
        lBgColor = 'rgba(224, 224, 224, ' + lOpacity + ')';
        lTimeOut = 4000;
        lMarginHeight = (lHeight - 16)/2;
        lElement = '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />';
    }
    else
    {
        lHeight = getYsize() - $("#mobileTitle2").outerHeight();
        lTop = $("#mobileTitle2").outerHeight();
        lBgColor = 'rgba(224, 224, 224, ' + lOpacity + ')';
        lTimeOut = 10000;
        lMarginHeight = (lHeight - 16) / 2;
        lElement = '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />';
    }
    
    var _html =
    '<div id="loadingAnimation" style="width:100%; height:' + lHeight + 'px; background-color:' + lBgColor + '; position:' + lPosition + '; left:0px; top:' + lTop + 'px; z-index:' + lZindex + '; text-align:center;">'+ lElement + '</div>';
    
    $("body").append(_html);
    
    isLoadingAnimation = true;
    
    refreshAllTimeOut = setTimeout(removeLoadingAnimation, lTimeOut);
}


function setChargingPageAnimation()
{
    var lHeight = getYsize();
    var lMarginHeight = (lHeight - 16) / 2;
    
    var _html =
    '<div id="loadingAnimation" style="width:100%; height:' + lHeight + 'px; background-color:rgba(0, 0, 0, 1); position:absolute; left:0px; top:0px; z-index:5001; text-align:center;">'+
    '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />' +
    '</div>';
    
    $("body").append(_html);
}


function removeLoadingAnimation()
{
    if ($("#loadingAnimation"))
        $("#loadingAnimation").remove();
    
    isLoadingAnimation = false;
    
    clearTimeout(refreshAllTimeOut);
}



function setTipForNoMorePopUp(_type)
{
    //log("setTipForNoMorePopUp -> _type : " + _type);

    showLittleModalPopUp();
    
    switch (_type)
    {
        case "tipSearch" :      localStorage[_type] = "ok"; break;
        case "tipMenu" :        localStorage.tipMenu = "ok"; break;
        case "tipGoogle" :      localStorage.tipGoogle = "ok"; break;
        case "tipFavorite" :    localStorage.tipFavorite = "ok"; break;
        case "tipMassifDb" :    localStorage.tipMassifDb = "ok"; break;
        case "tipRandoMap" :    localStorage.tipRandoMap = "ok"; break;
        case "tipDiapo" :       localStorage.tipDiapo = "ok"; break;
    }
    
}


function stopCheckHomePopUp()
{
    localStorage.checkHomePopUp = "never";
    showLittleModalPopUp();
}


function checkConnection()
{
    log('checkConnection');    
    
    var networkState = navigator.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    log('Connection type: ' + states[networkState]);
    
    if((states[networkState] == "No network connection") || (states[networkState] == "Unknown connection"))
    {
        isNetWorkAvalaible = false;
    }
    else
    {
        isNetWorkAvalaible = true;
    }
    
    return isNetWorkAvalaible;
}


function testConnectionForPopUp()
{
    var url = "http://www.google.com";
    
    $.ajax({
           type: "GET",
           data: "{}",
           url: url,
           cache: false,
           timeout: 5 * 1000,
           success:function(response)
           {
                isNetWorkAvalaible = true;
           },
           error:function(xhr, textStatus, errorThrown)
           {
           log("checkUpdate error : " +  textStatus);
           
                isNetWorkAvalaible = false;
           
                showLittleModalPopUp("connectionOut", null, "connectionNeeded");
           }
    });
}


function displayOrNotNextResultsBtn()
{
    $("#itemList").css("display", "inline-block");
    
    var nbItem = $("#itemList a").length;
    
    if (isTablePracticalLink)
        nbItem = $("#itemList .itemPractical").length;
    
    log("displayOrNotNextResultsBtn -> nbItem : " + nbItem + " / listItems.length : " + listItems.length);
    
    if (listItems.length - nbItem > 0 && nbItem > 0)
    {
        if (listItems.length - nbItem == 1)
        {
            lHtml = commonLabel[currentLang].displayNextResult;
        }
        else
        {
            lHtml = commonLabel[currentLang].displayNextResults;
        }
        
        $("#itemListBottomBtnNextResults").html(lHtml);
        
        $("#itemListBottomBtn").css("display", "inline-block");
    }
    else
        $("#itemListBottomBtn").css("display", "none");
}


function showNoIdeaItemsForCriteria(_type)
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    if (isModalPopUp)
        showModalPopUp();
    
    if (mPhotoSwipeHome)
        mPhotoSwipeHome.stop();
    
    currentActivity = "NoIdea";
    
    listItems = getBaseActivityItemsList(currentActivity);
    
    log("@@@@@@ showNoIdeaItemsForCriteria -> listItems.length : " + listItems.length);
    
    currentActivityItemList = listItems;
    
    log("@@@@@@@@ showNoIdeaItemsForCriteria -> currentActivityItemList.length : " + currentActivityItemList.length);
    
    //showList();
    
    $("#mainContainer").css("height", "auto");
    $("#mainContainer").css("top", "59px");
    $("#mobileTitle2").css("display", "inline-block");
    $("#bgImage").css("display", "none");
    $("#diapoHome").css("display", "none");
    $("#leftHomeSelectionBlock").css("display", "none");
    $("#itemList").css("display", "inline-block");
    
    $("#trierBtnItemList").css("display", "none");
    $("#itemListOptions").css("display", "inline-block");
    $("#backBtn").css("visibility", "visible");
    $("#showMapBtn").css("display", "inline-block");
    $("#mainMenu").css("display", "none");
    
    makeTitleForHomeStatusAsList();
    
    
    //************ trier *************
    
    NoIdeaTrierOptions[_type] = "on";
    showTrierOptions();
    $("#" + _type + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_on.png)');
    trierListItemsParOptionsActivity(_type);
}


function setMainSelectionChoosePosition()
{
    if (cityBtnArray[currentCity] == "ChoosePosition")
    {
        //setMainSelectionItemsList("ChoosePosition");
        currentCity = -1;
    }
    //else
    
    {
        userChoosePosition = "GO";
        
        previousHomeStatus = homeStatus;
        
        log("setMainSelectionChoosePosition -> previousHomeStatus : " + previousHomeStatus);
        
        //*********** action is done in showModalPopUp() ********************
        
        if (isModalPopUp)
            showModalPopUp();
    }
}


function choosePositionAndShowList()
{
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        userChoosePosition = {"latitude" : map.getCenter().lat, "longitude" : map.getCenter().lng, "type" : "ChoosePosition"};
    }
    else
    {
        userChoosePosition = {"latitude" : map.getCenter().lat(), "longitude" : map.getCenter().lng(), "type" : "ChoosePosition"};
    }
    
    log("choosePositionAndShowList -> userChoosePosition : " + JSON.stringify(userChoosePosition) + " / previousHomeStatus : " + previousHomeStatus);
    
    currentCity = -1;
    
    back();
    
    previousHomeStatus = null;
    
    setMainSelectionItemsList('ChoosePosition');
}


function bugScrollPositionFixed(_type)
{
    //log('bugScrollPositionFixed -> _type : ' + _type);
    
    $('#bugScrollPositionFixed').css('display', 'inline-block');
    $('#bugScrollPositionFixed').css('height', '200px');
    
    setTimeout(function(){
               $('#bugScrollPositionFixed').css('display', 'none');
               $('#bugScrollPositionFixed').css('height', '0px');
               }, 200);
     
}


function fixedIosBugForTextDetailFontSize()
{
    if (/iPhone|iPod/i.test(navigator.userAgent))
    {
        log("getXsize() : " + getXsize() + " / getYsize() : " + getYsize());
        
        if (getXsize() > getYsize())
        {
            $("#blocTextDetail p").css("font-size", "10px");
            $("#blocTextDetail p").css("line-height", "150%");
            
            $("#blockTextItemMapDetail p").css("font-size", "10px");
            $("#blockTextItemMapDetail p").css("line-height", "150%");
        }
        else
        {
            $("#blocTextDetail p").css("font-size", "16px");
            $("#blocTextDetail p").css("line-height", "150%");
            
            $("#blockTextItemMapDetail p").css("font-size", "16px");
            $("#blockTextItemMapDetail p").css("line-height", "150%");
            
            $("#splashScreen").css("display", "none");
        }
	}
}

                              
function setScrollToTop(_height, _arg)
{
    if (isModalPopUp)
        showModalPopUp();
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    var lTimeAnimation = 300;
    
    if (homeStatus == "List")
    {
        var nbItemList = Math.floor(indexItemList / 10);
        
        lTimeAnimation += nbItemList*200;
    }

    setTimeout(function(){
               $("body").animate({scrollTop:_height}, lTimeAnimation, 'linear', bugScrollPositionFixed);
        }, 300);
}