function prevNextItemDetail(index)
{
	//log(index); index= 1 -> next // index= 0 -> prev
    
    if (isModalPopUp)
        showModalPopUp();
	
    if (currentTable == "Home")
    {
        resetAllOptionSlider();
        
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

function showDetail (n)
{
    //dbTest = window.sqlitePlugin.openDatabase({name: "test"});
    //dbTest = window.sqlitePlugin.openDatabase({name: smallSpatialDbName.replace(".db", "")});
    
	homeStatus = "Detail";
    isOptionsVisible = false;
    hasToShowUserPosition = false;
    
    if (currentYoffset != -1)
        listItemYoffset = window.pageYOffset;
    

	$("#backBtn").css("visibility", "visible");
	$("#mainMenu").css("display", "none");
	
	currentItemDetail = n;
	var lItem = listItems[currentItemDetail];
        
    //****************************************************************
	
	log("HHHHHHHH showDetail ->  lat lon" + lItem.latitude + "," + lItem.longitude + " | lat lon routing : " + lItem.latitudeRouting + "," + lItem.longitudeRouting);
	
	isLocalizedMapAlredayLaunched = false;
    
    //**************************************************************************************************
    
    if (isLikeMobile)
    {
        $("#titleDetail").css("display", "none");
    }
    else
    {
        setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
        
        if (currentTable == "Circuit")
            $("#titleDetail").html((n + 1) + " - " + titleForItem(lItem));
        else
            $("#titleDetail").html(titleForItem(lItem));
        
        /*
        if (isAndroid)
            setLoadingAnimation(1);
         */
    }
	
	fillDetailsWithItem(lItem);

    
	//******************** URL **********************
	
	var lActivity = currentActivity != -1 ? "&" + currentActivity : "";
	var lCity = currentCity != -1 ? "&" + cityBtnArray [currentCity] : "";			
	//window.location.href = window.location.href.toString().split("#")[0] + "#" + currentLang + lActivity + lCity + "&" + lItem.idRepName;
	
	//************************* TRANSITIONS	*************************
	
	if (isLikeMobile == false)
	{
		if (currentTable == "Home")
		{	
			$("#itemDetail").css("display", "inline-block");
			
			setImageOrDiaporama();
			
			$("#itemListOptions").fadeOut(0);
			$("#itemListBottomBtn").fadeOut(0);
			$("#itemList").fadeOut(0);
			
			$("#leftHomeSelectionBlock").animate({
												 left: "-" + $(this).width() + "px"
												 }, 500, 'linear', function()
												 {
												 $("#leftHomeOptionBlock").fadeIn(300);
												 
												 setAllOptionItemsSlider();
												 
												 $("#leftHomeSelectionBlock").css("display", "none");
												 $("#leftHomeSelectionBlock").css("left", "0px");
												 
												 $("#prevNextDetail").css("display", "block");
												 });
			
			
			/**************** gestion of map view ****************/
			
			if (isMapOptionVisible == true)
			{
				$("#optionMapBtn").fadeIn(0);
			}
			
		}
		else
		{
			$("#itemListOptions").css("display", "none");
			$("#itemList").css("display", "none");
			$("#itemDetail").css("display", "inline-block");
            $("#itemListBottomBtn").css("display", "none");
			
			setImageOrDiaporama();
			
			$("#optionRelativeToItemDetail").fadeIn();
            
            if (currentTable == "Circuit")
            {
                setTimeout(function(){
                           $("#prevNextDetail").css("display", "block");
                           },500);
            }
		}
		
		$("#showMapBtn").fadeOut();
		$("#mainMenu").css("display", "none");
	}
	else
	{
        if (currentTable == "Home" || currentTable == "Circuit" || currentTable == "PrivateSpace")
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
                                                   
                                                   if (currentTable == "Circuit")
                                                        setAndAdjustTitleLabel((n + 1) + " - " + titleForItem(listItems[currentItemDetail]));
                                                   else
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
                                                   
                                                   
                                                   if (localStorage.tipDiapo == undefined || localStorage.tipDiapo == "false")
                                                   {
                                                        setTimeout(function(){
                                                              showLittleModalPopUp("tipDiapo");
                                                              }, 1000);
                                                   }
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
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('showDetail');
        
        gaTrackEvent('showDetail', 'idRepName : ' + lItem.idRepName + ' / table : ' + lItem.table, 'currentTable : ' + currentTable, 0);
    }        
}


function animateItemListToLeftWhenIsLikeMobile(n)
{
    log("##### itemList -> height : " + $("#itemList").css('height'));
    
	$("#itemList").animate({
						   left: "-" + $("body").width() + "px",
						   }, 500, 'linear', function()
						   {
                           
                           if (currentTable == "Circuit")
                                setAndAdjustTitleLabel((n + 1) + " - " + titleForItem(listItems[currentItemDetail]));
                           else
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
	
    
	if (currentTable == "Home")
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
    
    
    if (currentTable == "Circuit")
	{
        $("#bgImage").animate({
                              left: "-" + $("body").width() + "px"
                              }, 200, 'linear', function()
                              {
                              $("#bgImage").css('display', 'none');
                              $("#bgImage").css('left', '0px');
                              });
    }
}


function hideDetails()
{
	homeStatus = "List";
	currentItemDetail = -1;
    
    if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
        hasToShowUserPosition = true;
    
    mPhotoSwipe.destroyZoomPanRotate();
    
	if (currentTable == "Home" || currentTable == "Circuit" 
        || currentTable == "PrivateSpace")
	{
		if (isLikeMobile == false)
		{
            $("#prevNextDetail").css("display", "none");
            
            if (currentTable == "Home")
            {
                
                
                if (isIpad == true)
                    $("#optionMapBtn").css("display", "none");
                else
                    $("#optionMapBtn").fadeOut(0);
                
                $("#leftHomeOptionBlock").fadeOut(200, function()
                                                  {
                                                                                                
                                                    setAndAdjustTitleLabel(titleLabel[currentLang]);

                                                  $("#leftHomeSelectionBlock").fadeIn(200);
                                                  
                                                  //if (currentActivity == "MP2013" || currentActivity == "Expo")
                                                  $("#itemListOptions").fadeIn(200);
                                                  
                                                  $("#itemList").fadeIn(200);
                                                  
                                                  $("#showMapBtn").fadeIn(200);
                                                  
                                                  resetAllOptionSlider();
                                                  
                                                  $("#itemDetail").css("display", "none");
                                                  

                                                  });
            }
            else
            {
                setAndAdjustTitleLabel(menuLabel[currentLang].circuitMenu);
                
                $("#itemList").fadeIn(200);
                
                $("#showMapBtn").fadeIn(200);
                
                $("#itemDetail").css("display", "none");
            }
		}
		else
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
                                
                             if (currentTable != "Circuit" && currentTable != "PrivateSpace")
                                 $("#itemListOptions").fadeIn(0);
                                             
                             $("#itemList").fadeIn(0);
                             
                             setTimeout(function(){
                                        
                                    $("body").animate({scrollTop:listItemYoffset}, _duration, 'linear',function(){
                                                          
                                            setTimeout(function(){
                                                       
                                                       var lDuration = 500;
                                                     
                                                       $("#showMapBtn").fadeIn(lDuration);
                                                     
                                                       if (currentTable != "Circuit" && currentTable != "PrivateSpace")
                                                            $("#itemListOptions").animate({opacity:'1'}, lDuration, 'linear');
                                                       
                                                       $("#itemListBottomBtn").animate({opacity:'1'}, lDuration, 'linear');
                                                       
                                                       if (currentTable == "Home")
                                                            setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                                       else
                                                            setAndAdjustTitleLabel(menuLabel[currentLang].circuitMenu);

                                                       $("#itemList").animate({opacity:'1'}, lDuration, 'linear', function(){
                                                                            
                                                                displayItemListBottomBtn();
                                                                bugScrollPositionFixed();
                                                                $("#itemDetail").css('display', 'none');
                                                                $("#itemDetail").css('left', '0px');
                                                                              
                                                                if (isAndroid)
                                                                    removeLoadingAnimation();
                                                                            
                                                        });
                                                       
                                                       resetAllOptionSlider();
                                                       
                                            }, 100);
                                    })
                                                        
                            }, 300);

                        });          
            });
			
		} 
	}
	else
	{
		$("#itemDetail").css('display', 'none');
		$("#itemList").css('display', 'inline-block');
		
		//if (currentActivity == "MP2013" || currentActivity == "Expo")
        $("#itemListOptions").css('display', 'inline-block');
        
        $("body").animate({scrollTop:listItemYoffset}, 200, 'linear');
	}
	
	var lActivity = currentActivity != -1 ? "&" + currentActivity : "";
	var lCity = currentCity != -1 ? "&" + cityBtnArray [currentCity] : "";			
	//window.location.href = window.location.href.toString().split("#")[0] + "#" + currentLang + lActivity + lCity;
	
	//myMediumSlider.alreadyLaunched = false;
}


function setNextResultForItemList()
{
    log("setNextResultForItemList -> listItems.length : " + listItems.length + " | indexItemList : " + indexItemList);
    
    if (homeStatus == "List")
    {
    //************ index **************
    
    var lNbNextResult = listItems.length - indexItemList;
    
    if (lNbNextResult >= 10)
        indexItemList += 10;
    else
        indexItemList += lNbNextResult;
    
    //************ get Height for scroll **************
    
    var lHeight = $("#itemList").height() - 25;
    
    if (isTablePracticalLink)
        lHeight = $("#itemList").height() + $("#bgImage").height() - 65;
    }
    else
    {
        if (lastIndexItemList > 0)
            indexItemList = lastIndexItemList;
        else
            indexItemList = 10;
    }
    
    //************ write list **************
    
    setItemList();
    
    var lDuration = 0;
    
    if (isTablePracticalLink)
        lDuration = Math.floor(indexItemList / 10);
    
    if (indexItemList > 10 && homeStatus == "List")
    {
        displayNextResultsItemListBtn();
        
        setTimeout(function(){
                   
                   $("body").animate({scrollTop:lHeight}, 500, 'linear', function(){
                                     
                                     setTimeout(bugScrollPositionFixed, 100);
                                     
                                     });
                   }, 300 + lDuration * 100);
    }
    
    log("setNextResultForItemList 2 -> listItems.length : " + listItems.length + " | indexItemList : " + indexItemList);
    
}


function showResultsHome(_animation)
{
    if (menuIsOpened)
        return;
    
    if (listItems.length > 0 || (listItems.length >= 0 && currentTable == "Circuit"))
    {
        if (isAppScreen)
            $("#itemListBottomBtn").css("display", "inline-block");
        
        if (currentTable != "Circuit")
            setNextResultForItemList();
        
        //$("body").animate({scrollTop:1}, 300, 'linear', animateLeftHomeSelectionBlockToLeft);
        
        setTimeout(function()
                   {
                        if (_animation)
                            animateLeftHomeSelectionBlockToLeft();
                        else
                            leftHomeSelectionBlockToLeft();
                   }, 50);
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
    
    /*
    $("#bgImage").animate({opacity:"0"}, 500, 'linear', function(){
                      
                      $("#bgImage").fadeOut(0);
                      
                      });
     */
    
    //********************************************
    
    $("#leftHomeSelectionBlock").fadeOut(500, function()
                    {
                                         $("#mainContainer").css("top", "59px");
                                         
                                         $("#mobileTitle2").css("display", "inline-block");
                                         
                                         if (currentTable == "Home")
                                         setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                         else
                                         setAndAdjustTitleLabel(tableLabel[currentLang]["VieuxPortRD"]);
                                         
                                         
                                         $("#backBtn").css("visibility", "visible");
                                         $("#showMapBtn").css("display", "inline-block");
                                         $("#mainMenu").css("display", "none");
                                         
                                         
                                         
                                         $("#itemListOptions").css("display", "inline-block");
                                         $("#itemList").css("display", "inline-block");
                                         
                                         
                                         
                                         displayItemListBottomBtn();
                                         
                                         if (currentTable == "Circuit")
                                         {
                                             $("#itemListOptions").css("display", "none");

                                             listItems = getListItemsFromArray(listItemsVieuxPortRDArray);
                                             currentActivity = "VieuxPortRD";
                                             setItemList();
                                         
                                             $("body").animate({scrollTop:0}, 0, 'linear');
                                         }
                                         
                                         if (isLikeMobile)
                                         {
                                         homeStatus = "List";
                                         
                                         setTimeout(function(){
                                                    
                                                    if (localStorage.tipMenu == undefined || localStorage.tipMenu == "false")
                                                        showLittleModalPopUp("tipMenu");
                                                    
                                                    }, 1000);
                                         }
                                         });
 
}


function animateLeftHomeSelectionBlockToLeft()
{
	$("#leftHomeSelectionBlock").animate({
										 left: "-" + $("body").width() + "px"
										 }, 500, 'linear', function()
										 {
                                         
                                         $("#mainContainer").css("top", "59px");
                                         
                                         //***************** Title ******************
                                         
                                         $("#mobileTitle2").css("display", "inline-block");
                                         $("#mobileTitle2").css("left", "0px");
                                         
                                         if (currentTable == "Home")
                                            setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                         else
                                            setAndAdjustTitleLabel(tableLabel[currentLang]["VieuxPortRD"]);
                                         
                                        //********************************************
                                         
										 $("#leftHomeSelectionBlock").css("display", "none");
										 $("#leftHomeSelectionBlock").css("left", "0px");
										 
										 //if (currentActivity == "MP2013" || currentActivity == "Expo")
                                         $("#itemListOptions").css("display", "inline-block");
                                         
										 
										 $("#backBtn").css("visibility", "visible");
										 $("#showMapBtn").css("display", "inline-block");
										 $("#mainMenu").css("display", "none");
										 
                                         
                                         
                                         $("#itemList").css("display", "inline-block");
										 $("#itemList").css("left", "0px");
                                         
                                         displayItemListBottomBtn();
                                         
                                         if (currentTable == "Circuit")
                                         {
                                         
                                         listItems = getListItemsFromArray(listItemsVieuxPortRDArray);
                                         currentActivity = "VieuxPortRD";
                                         setItemList();
                                         
                                         $("#itemListOptions").css("display", "none");

                                         
                                         }

										 if (isLikeMobile)
										 {
											homeStatus = "List";
											
                                            setTimeout(function(){
                                                    
                                                    if (localStorage.tipMenu == undefined || localStorage.tipMenu == "false")
                                                       showLittleModalPopUp("tipMenu");
                                                    
                                                    }, 500);
										 }
			 
                                         /*
										 if (currentActivity == "MP2013" || currentActivity == "Expo")
										 {
											$("#itemListOptions").fadeIn(100);
										 
											if (currentActivity == "Expo")
											{
												$("#btnTypeMP2013").fadeOut(0);
												$("#btnFilterMP2013").fadeIn(100);
											}
											else
											{
												$("#btnTypeMP2013").fadeIn(100);
												$("#btnFilterMP2013").fadeOut(0);
											}
										 }
										 else
										 {
											$("#itemListOptions").fadeOut(0);
										 }
										 */
                                         
										 });

		
		$("#bgImage").animate({
							  left: "-" + $("body").width() + "px"
							  }, 500, 'linear', function()
							  {
							  $("#bgImage").css('display', 'none');
							  $("#bgImage").css('left', '0px');
							  });
}


function animateBackFromItemList()
{
    $("#mobileTitle2").animate({
								  left: $("body").width() + "px"
								  }, 500, 'linear', function()
								  {
                                        $("#mainContainer").css("top", "0px");
                               
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
                                             
                                if (currentTable == "Home")
                                    setAndAdjustTitleLabel(titleMobileLabel[currentLang]);
                                else
                                setAndAdjustTitleLabel(menuLabel[currentLang].circuitMenu);
                           
                               $("#itemList").css('display', 'none');
                               $("#itemList").css('left', '0px');
                                                 
                               $("#leftHomeSelectionBlock").fadeIn(1000);
                               
                               $("#checkResultBtnHome").fadeIn(1000);
                               
                               $("#bgImage").fadeIn(1000);
                               $("#backBtn").css("visibility", "hidden");
                               $("#showMapBtn").css("display", "none");
                               $("#mainMenu").css("display", "inline-block");
                               
                               
                               if (currentTable == "Home")
                               {
                                   if (isAppScreen)
                                   {
                                    setTextForMainSelectionItemTitle();
                                    setTimeout(setSizeForMainSelectionItemTitle,50);
                                   }
                                   else
                                    resetMainHomeTitleCSS();
                               }
                               else
                               if (currentTable == "Circuit")
                               {
                                    mPhotoSwipeHome.carousel.show(mIndexPhotoSwipe);
                               }
                               
                               homeStatus = "Home";
                                             
                            });
						   });
}


function backFromItemList()
{
    $("#mobileTitle2").fadeOut(1000);
    
    $("#itemList").fadeOut(1000, function()
                           {
                                if (currentTable == "Home")
                                    setAndAdjustTitleLabel(titleMobileLabel[currentLang]);
                                else
                                    setAndAdjustTitleLabel(menuLabel[currentLang].circuitMenu);
                           
                                $("body").animate({scrollTop:0}, 0, 'linear', function()
                                             {
                                                  $("#bgImage").fadeIn(1000, function(){
                                                                       });
                                                  
                                                  $("#mainContainer").css("top", "0px");
                                                  
                                                  $("#leftHomeSelectionBlock").fadeIn(1000);
                                                  $("#checkResultBtnHome").fadeIn(1000);
                                                  
                                                  $("#backBtn").css("visibility", "hidden");
                                                  $("#showMapBtn").css("display", "none");
                                                  $("#mainMenu").css("display", "inline-block");
                                                  
                                                  if (isAppScreen)
                                                  {
                                                  setTextForMainSelectionItemTitle();
                                                  setTimeout(setSizeForMainSelectionItemTitle,50);
                                                  }
                                                  else
                                                  resetMainHomeTitleCSS();
                                                  
                                                  homeStatus = "Home";
                                             });
                           });

    $("#itemListOptions").fadeOut(1000);
    $("#itemListBottomBtn").fadeOut(1000);
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
    
    if (currentTable == "Circuit" && homeStatus == "Home")
        return;
    
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

    //********************************** isLikeMobile ******************************
    
    if (isLikeMobile)
    {
        $("#mapList").css("height", lHeight + "px");
        
        if (homeStatus == "List")
        {
            var lDuration = 500;
            
            if (isAndroid)
                setLoadingAnimation(1);
            
            $("#bgImage").animate({opacity:'0'}, lDuration, 'linear');
            $("#itemListOptions").animate({opacity:'0'}, lDuration, 'linear');
            $("#itemListBottomBtn").animate({opacity:'0'}, lDuration, 'linear');
            
            if (currentTable == "Restaurants")
                $("#InfosDetailInHome").animate({opacity:'0'}, lDuration, 'linear');
            
            
            $("#itemList").animate({opacity:'0'}, lDuration, 'linear', function(){
                                   
                if (!isAndroid)
                    setLoadingAnimation(1);
                                                     
                setTimeout(function(){
                                       
                    $("body").animate({scrollTop:0}, 0, 'linear', function(){
                            
                        bugScrollPositionFixed();
                        
                        setTimeout(function(){
                                      
                                    $("#bgImage").css('display', 'none');
                                    $("#itemListOptions").css('display', 'none');
                                    $("#itemListBottomBtn").css('display', 'none');
                                    $("#itemList").css('display', 'none');
                                   
                                   if (currentTable == "Restaurants")
                                        $("#InfosDetailInHome").css('display', 'none');
                                   
                                    $("#mainContainer").css("height", lHeight + "px");
                                   
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
                              
                              bugScrollPositionFixed();
                              
                              setTimeout(function(){

                                         if (homeStatus == "Detail")
                                            $("#itemDetail").css('display', 'none');
                                         
                                         if (homeStatus == "Close")
                                            $("#leftHomeOptionBlock").css('display', 'none');
                                         
                                         $("#mainContainer").css("height", lHeight + "px");
                                         
                                         }, 200);
                              
                              setTimeout(function(){
                                         showMap2(arg)
                                         }, 250);
                              });
        }
        else
        {
            $("#bgImage").fadeOut(0);
            
            if (currentTable == "Home" || currentTable == "Circuit")
            {
                $("#leftHomeSelectionBlock").css("display", "none");
                
                $("#leftHomeOptionBlock").css("display", "none");
            }
            
            setBlocksDisplayNone();
            
            showMap2(arg);
            
            animateCloseMenu();
        }
	}
    //********************************** ! isLikeMobile ******************************
    else
    {

        $("#bgImage").fadeOut(0);
        
        $("#leftHomeSelectionBlock").fadeOut(0);
             
        $("#mainContainer").css("height", getYsize() + "px");
        
        $("body").animate({scrollTop:220}, 300, 'linear', function(){showMap2(arg)});
    }        
}
	

function showMap2(_arg)
{
    log("showMap 2");
    
    var lHeight;
	
	if (isLikeMobile)
    {
        if (_arg == "ChoosePosition")
            setAndAdjustTitleLabel(cityLabel[currentLang].ChoosePositionOnMap);
        
        //******************* size for next map ****************
        
		lHeight = getYsize() - $("#mobileTitle2").outerHeight();
    }
    else
    {
        if (!isTablePracticalLink)
        {
            if (homeStatus == "List")
                setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
            else
            if (homeStatus == "Detail")
                setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
        }
        
        if (homeStatus == "List")
        {
            $("#itemListOptions").css('display', 'none');
            $("#itemListBottomBtn").css('display', 'none');
            $("#itemList").css('display', 'none');
        }
        
        if (homeStatus == "Detail")
            $("#itemDetail").css('display', 'none');
        
        //******************* size for map and for next map ****************

        if (homeStatus == "List")
        {
            if (isTablePracticalLink)
                lHeight = getYsize() - 100 - 15;
            else
                lHeight = getYsize() - 125 - 30;
        }
        else
            if (homeStatus == "Detail")
            {
                if (_arg == "closeMap")
                    lHeight = getYsize() - 125 - 30;
                else
                if (_arg == "Itinary")
                    lHeight = getYsize() - 100 - 15;
                else
                if (_arg == "IGN")
                    lHeight = getYsize() - 100 - 15;
            }
        
        //log("showMap -> lHeight : " + lHeight);
        
        $("#mapList").css("height", lHeight + "px");
	}
    
    $("#blockMap").css("display", "inline-block");
    
    //********************* VAR ***********************
    
    isMapVisible = true;
    
    mapStatus = _arg;
    
    previousMapStatus = _arg;
    
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
        
        if (homeStatus == "List" && currentTable == "Home")
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
                
                if (isMobile)
                    script.src = "http://api.ign.fr/geoportail/api/js/2.0.3/GeoportalMobile.js";
                else
                    script.src = "http://api.ign.fr/geoportail/api/js/latest/GeoportalExtended.js";
                
                document.body.appendChild(script);
                
                isIGNmapAPIalreadyLaunched = true;
                
                loadIGN();
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
        log("previousMapStatus : " + previousMapStatus);
        
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
        
        if ((currentTable == "Home" && ((homeStatus == "List" && currentActivity == "NoIdea") || mapStatus == "ChoosePosition")) || isTablePracticalLink)
        {
            var lTop = mapStatus == "ChoosePosition" ? 8 : 8 + $("#mobileTitle2").outerHeight();
            var lLeft = getXsize() - 44 - 4;
            
            var lBtnTargetHtml = '<div id="bntTarget" style="display:inline-block; position:absolute; top:' + lTop + 'px; left:' + lLeft + 'px; z-index: 500; width:44px; height:44px; background-image:url(Assets/btn_target.png); background-size:100% 100%; opacity:0.7; z-index:5001;" onclick="javascript:showTargetOnMap();"></div>';
            
            $(lBtnTargetHtml).insertBefore("#mainContainer");
            
            isTargetBtn = true;
            
            if (mapStatus == "ChoosePosition")
                showTargetOnMap();
        }
        
        //********** used for test ***********
        //$(getHtmlForBtnDonwload('currentMassif')).insertBefore("#mapList");
        
        //******************* TIP GOOGLE **********************
        
        if (isApp && currentTable != "routingMap" && currentTable != "randoMap" && (localStorage.tipGoogle == undefined || localStorage.tipGoogle == "false"))
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
                           
                           if (!isLikeMobile)
                           {
                                if (homeStatus == "Home" && currentTable == "Circuit")
                                {
                                    $("#leftHomeSelectionBlock").fadeIn();
                                }
                                else
                                if (homeStatus == "List")
                                {
                                    $("#leftHomeSelectionBlock").fadeIn();
                                    $("#itemList").fadeIn();
                                    $("#itemListOptions").fadeIn();
                                    $("#showMapBtn").fadeIn();
                       
                                    /*
                                    if (currentActivity == "MP2013" || currentActivity == "Expo")
                                    {
                                        $("#itemListOptions").fadeIn();
                       
                                       if (currentActivity == "Expo")
                                       {
                                            $("#btnTypeMP2013").fadeOut(0);
                                            $("#btnFilterMP2013").fadeIn(100);
                                       }
                                       else
                                       {
                                            $("#btnTypeMP2013").fadeIn(100);
                                            $("#btnFilterMP2013").fadeOut(0);
                                       }
                                   }
                                    */
                                }
                                else
                                if (homeStatus == "Detail")
                                {
                                        $("#itemDetail").fadeIn();
                                        $("#prevNextDetail").fadeIn();
                                        $("#leftHomeOptionBlock").fadeIn();
                                        $("#optionMapBtn").fadeIn();
                           
                                        if (currentTable == "Circuit")
                                            $("#leftHomeSelectionBlock").fadeIn();
                                }
                                else
                                if (homeStatus == "Close")
                                {
                                    $("#leftHomeOptionBlock").fadeIn();
                                    $("#showMapBtn").css("display", "inline-block");
                                    $("#showMapBtn").attr("href", "javascript:showMap('isItinary')");
                                }

                                $("#carousel-image-and-text").css("display", "none");
                       
                                indexMapItems = 4;
                                indexMapRestaurants = 4;
                                indexMapMP2013 = 4;
                                indexMapHotels = 4;
                                indexMapServices = 4;
                           
                                $("body").animate({scrollTop:currentMapYoffset}, 500, 'linear', function(){
                                             $("#mainContainer").css("height", "auto");
                                             });
                           }
                           
                           if (isLikeMobile)
                           {
                                if (homeStatus == "List")
                                {
                                    //log("backFromMap -> mapStatus == ChoosePosition");
                                    setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                }
                                else
                                {
                                    //log("backFromMap -> setAndAdjustTitleLabel(mCurrentTitle) : " + mCurrentTitle);
                                    setAndAdjustTitleLabel(mCurrentTitle);
                                }
                           
                                if (homeStatus == "List")
                                {
                                        if (isTablePracticalLink)
                                            $("#bgImage").fadeIn(0);
                                   
                                       $("#itemListOptions").fadeIn(0);
                                       $("#itemList").fadeIn(0);
                           
                                        if (currentTable == "Restaurants")
                                            $("#InfosDetailInHome").fadeIn(0);
                           
                           
                                    var lDuration = isAndroid ? 500 : 300;

                                       setTimeout(function(){
                                                  
                                            lDuration = isAndroid ? 300 : 0;
                                                  
                                            $("body").animate({scrollTop:currentMapYoffset}, lDuration, 'linear',function(){
                                                              
                                                    bugScrollPositionFixed();
                                                              
                                                    setTimeout(function(){

                                                            lDuration = 500;
                                                               
                                                            if (currentTable == "PrivateSpace")
                                                            {
                                                               $("#backBtn").css("visibility", "hidden");
                                                               $("#mainMenu").fadeIn(lDuration);
                                                            }
                                                            
                                                            $("#showMapBtn").fadeIn(lDuration);
                                                            
                                                            $("#bgImage").animate({opacity:'1'}, lDuration, 'linear');
                                                            $("#itemListOptions").animate({opacity:'1'}, lDuration, 'linear');
                                                            $("#itemListBottomBtn").animate({opacity:'1'}, lDuration, 'linear');
                                                               
                                                            if (currentTable == "Restaurants")
                                                               $("#InfosDetailInHome").animate({opacity:'1'}, lDuration, 'linear');
                                                           
                                                            $("#itemList").animate({opacity:'1'}, lDuration, 'linear', function()
                                                            {                
                                                                displayItemListBottomBtn();
                                                                $("#mainContainer").css("height", "auto");
                                                                                   
                                                                setTimeout(removeLoadingAnimation, 50);
                                                            });

                                                    }, 200);
                                            })
                                                  
                                        }, lDuration);
                                }
                                else
                                if (homeStatus == "Detail" || homeStatus == "Close")
                                {
                                    log("backFromMap Detail -> homeStatus : " + homeStatus);
                           
                                    if (homeStatus == "Detail")
                                    {
                                        $("#itemDetail").fadeIn(0);
                                        $("#prevNextDetail").fadeIn(0);
                                        mPhotoSwipe.carousel.show(mIndexPhotoSwipe);
                                    }        
                           
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
                           }
                    });
	
    
    if (mapStatus == "ChoosePosition" && previousHomeStatus == "Home")
    {
        setTimeout(function(){
                   back();
                   previousHomeStatus = null;
                   }, 600);
    }
    
    
    mapStatus = null;
	isMapVisible = false;
    hasToShowUserPosition = false;
    
    if (isMapTitleMenuAndButtonsForNoIdeaAndGeoloc)
    {
        $("#mobileTitle2Label").attr("onclick", "menuOnClick('title');");
        isMapTitleMenuAndButtonsForNoIdeaAndGeoloc = false;
    }
    
    resetMap();
}


function resetMap()
{
    listItemsMap = [];
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
        $("#bntTarget").remove();
        isTargetBtn = false;
    }
    
    if (isTargetOnMapVisible)
    {
        $("#targetOnMap").remove();
        
        $("#bntTarget").css("background-image", "url(Assets/btn_target.png)");
        
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
                polyline.setMap(null)
                polyline = null;
            }
        }
        
        $("#mapList").remove();
        $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
        $("#mapList").css("height", (getYsize() - $("#mobileTitle2").outerHeight()) + "px");
        
        isGoogleMap = false;
    }
}


function back()
{
    log("ççççççççççç back -> homeStatus : " + homeStatus + " / isLikeMobile : " + isLikeMobile + " / isTablePracticalLink : " + isTablePracticalLink);
    
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
        
		backFromMap();
		
		if ((homeStatus == "List" || isTablePracticalLink) && !isLikeMobile)
		{
			$("#backBtn").css("visibility", "hidden");
			$("#mainMenu").css("display", "inline-block");
		}
        
        if (isTablePracticalLink && isLikeMobile)
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
		if (isLikeMobile == false || currentTable == "PrivateSpace")
		{
			$("#backBtn").css("visibility", "hidden");
			$("#mainMenu").css("display", "inline-block");
		}
		
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
    if (isLikeMobile)
    {
        $("body").animate({scrollTop:0}, 300, 'linear', function(){
                          
                          $("#leftHomeOptionBlock").animate({
                                                   left: $("body").width() + "px"
                                                   }, 500, 'linear', function()
                                                   {
                                                   
                                                   if (currentTable == "Circuit")
                                                    setAndAdjustTitleLabel((n + 1) + " - " + titleForItem(listItems[currentItemDetail]));
                                                   else
                                                    setAndAdjustTitleLabel(titleForItem(listItems[currentItemDetail]));
                                                   
                                                   $("#itemDetail").css("display", "inline-block");
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
}


function showCloseOptionsForItemDetail()
{
    if (currentTable == "Home")
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
    var lHeight;
    var lTop;
    var lBgColor;
    var lTimeOut;
    var lOpacity;
    var lMarginHeight;
    var lElement;
    
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
        lBgColor = 'rgba(224, 224, 224, ' + lOpacity + ')';
        lTimeOut = 10000;
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
    '<div id="loadingAnimation" style="width:100%; height:' + lHeight + 'px; background-color:' + lBgColor + '; position:absolute; left:0px; top:' + lTop + 'px; z-index:5004; text-align:center;">'+ lElement + '</div>';
    
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


function displayItemListBottomBtn()
{
    $("#itemList").css("display", "inline-block");
    
    var nbItem = $("#itemList a").length;
    
    if (isTablePracticalLink)
        nbItem = $("#itemList .itemPractical").length;
    
    log("displayItemListBottomBtn -> nbItem : " + nbItem + " / listItems.length : " + listItems.length);
    
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


function showNewArticles()
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    currentActivity = "NoIdea";
    
    listItems = getFullConcatListItems();
    currentActivityItemList = getFullConcatListItems();
    
    showResultsHome();
    
    makeTitleForHomeStatusAsList();
    
    //************ trier *************
    
    NoIdeaTrierOptions.isUpdate = "on";
    showTrierOptions();
    $("#isUpdateCheckbox").css('backgroundImage', 'url(Assets/checkbox_on.png)');
    trierListItemsParOptionsActivity('isUpdate');
}


function setMainSelectionChoosePosition()
{
    if (cityBtnArray[currentCity] == "ChoosePosition")
        setMainSelectionItemsList("ChoosePosition");
    else
    {
        userChoosePosition = "GO";
        
        previousHomeStatus = homeStatus;
        
        log("setMainSelectionChoosePosition -> previousHomeStatus : " + previousHomeStatus);
        
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
    
    resetActiveBtnWithArrayAndType(cityBtnArray, "ChoosePosition");
    
    back();
    
    setMainSelectionItemsList('ChoosePosition');
}


function bugScrollPositionFixed()
{
    //alert('bugScrollPositionFixed');
    
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
            $("#blocTextDetail p").css("font-size", "8px");
            $("#blocTextDetail p").css("line-height", "150%");
            
            $("#blockTextItemMapDetail p").css("font-size", "8px");
            $("#blockTextItemMapDetail p").css("line-height", "150%");
        }
        else
        {
            $("#blocTextDetail p").css("font-size", "1em");
            $("#blocTextDetail p").css("line-height", "150%");
            
            $("#blockTextItemMapDetail p").css("font-size", "1em");
            $("#blockTextItemMapDetail p").css("line-height", "150%");
            
            $("#splashScreen").css("display", "none");
        }
	}
}

                              
function setScrollToTop(_height, _arg)
{
    currentYoffset = window.pageYOffset;
    
    var lDistance;

    if (_height == 0 || _height == 1)
    {
        lDistance = currentYoffset;
    }
    else
    {
        lDistance = _height;
    }
    
    alert(lDistance);
    
    var lTimeAnimation = 500;
    
    if (homeStatus == "List" && _arg != "nextResult" && lDistance > 2000)
    {
        lTimeAnimation = 3000;
    }
    
    setTimeout(function(){
               $("body").animate({scrollTop:_height}, lTimeAnimation, 'linear', bugScrollPositionFixed);
        }, 300);
}