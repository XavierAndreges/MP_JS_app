
/*
function setTabBarMenuBtnWithPosition(_pos)
{
	var _array = $("#tabBarMenu a");
	var _blockArray = $("#listMainMenu .blockMenuDetail");
	
	for (var t = 0; t < _array.length; t++)
	{
		if (t == _pos)
		{
			$(_array[t]).css('background-color', '#285090');
			
			$(_array[t]).mouseenter(function(){
									$(this).css('background-color', '#285090');
									}).mouseleave(function(){
												  $(this).css('background-color', '#285090');
												  });
			
			$(_blockArray[t]).fadeIn(0);
			
		}
		else
		{
			$(_array[t]).css('background-color', '#767878');
			
			$(_array[t]).mouseenter(function(){
									$(this).css('background-color', '#285090');
									}).mouseleave(function(){
												  $(this).css('background-color', '#767878');
												  });
			
			$(_blockArray[t]).fadeOut(0);
		}
	}
	
	switch (_pos)
	{
		case 1: 
			break;
			
		case 2:
			break;
	}
}
*/

function setTabBarMenuBtnWithPosition(_pos)
{
	var _array = $("#tabBarMenu a");
	var _blockArray = $("#listMainMenu .blockMenuDetail");
	
	for (var t = 0; t < _array.length; t++)
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

            
			$(_blockArray[t]).fadeIn(0);
			
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
			
			$(_blockArray[t]).fadeOut(0);
		}
	}
}


function setConnectedMode(_type)
{
    isGoogleSelected = _type;
    
    localStorage.isGoogleSelected = _type;
    
    var textNoNetwork = isGoogleSelected ? commonLabel[currentLang].chooseLeaflet: commonLabel[currentLang].chooseGoogle;
    
    $("#btnMenuConnectedMode div").html(textNoNetwork);
    
    var actionNoNetwork = isGoogleSelected ? "javascript:setConnectedMode(false)" : "javascript:setConnectedMode(true)";
    
    $("#btnMenuConnectedMode").attr("href", actionNoNetwork);
    
    log("TTTTTTTTT setConnectedMode -> isGoogleSelected : " + isGoogleSelected);
    
    openOrCloseMenu();
    
    resetItemListRouting();
    
    if (isMapVisible && mapStatus != "IGN")
    {
        resetMap();
        
        setTimeout(function(){

                   showMap3(mapStatus);
                   
                   isMapVisible = true;
                   
                   }, 250);
    }
}


function setSizeForMenu()
{
    if (isAndroid && getXsize() >= 500)
    {
        lSizeListMainMenu += 50;
        
        $("#mainMenu").css("width", lSizeListMainMenu + (2 * lBorderListMainMenu) + $("#btnMainMenu").width() + "px");
        $("#mainMenu").css("left", -1 * (lSizeListMainMenu + (2 * lBorderListMainMenu)) + "px");
        
        $("#listMainMenu").css("width", lSizeListMainMenu + "px");
        
        $("#mainMenu .blockMenuDetail a").css("width", lSizeListMainMenu - (2 * lBorderListMainMenu) + "px");
        
        $(".tabBarMenuBtnDetail").css("width", ((lSizeListMainMenu - 12) / 2) + "px");
    }
}


function setMainMenu ()
{
    //********************* tab bar menu
    
    var lTabBar = "";
    
    if (isApp || !isProd)
    {
        lTabBar =
        '<div id="tabBarMenu" style="width:100%; display:inline-block; margin:10px 0px;">'+
        '<a id="tabBarMenu0" class="tabBarMenuBtnDetail" href="javascript:setTabBarMenuBtnWithPosition(0)">'+
        'Navigation'+
        '</a>'+
        '<a id="tabBarMenu1" class="tabBarMenuBtnDetail" href="javascript:setTabBarMenuBtnWithPosition(1)">'+
        commonLabel[currentLang]['settings'] +
        '</a>'+
        '</div>';
    }
    
    
    //************* MODE HORS CONNEXION  *****************
    
    var lHtmlConnected = "";
    
    if (isApp && !isRestrictedAndroid)
    {
        //*********************** isGoogleSelected *************************
        
        var textNoNetwork = isGoogleSelected ? commonLabel[currentLang].chooseLeaflet : commonLabel[currentLang].chooseGoogle;
    
        var actionNoNetwork = isGoogleSelected ? "javascript:setConnectedMode(false)" : "javascript:setConnectedMode(true)";
    
        lHtmlConnected = '<a href="' + actionNoNetwork + ';" class="" id="btnMenuConnectedMode"><div class="textBlockMenuDetail">' + textNoNetwork + '</div></a>';
    }
    
    
    //****************************** DOWNLOAD **********************************
    
    var lDownloads = "";
    
    if (isApp && !isRestrictedAndroid)
    {
        //************* TELECHARGEMENT ROUTIERE  *****************
        
        var textMPTiles_8_16 = localStorage.isMarseilleProvenceTiles_8_16_installed == "true" ? commonLabel[currentLang].deleteMPTiles_8_16 : commonLabel[currentLang].downloadMPTiles_8_16;
        
        var actionMPTiles_8_16 = localStorage.isMarseilleProvenceTiles_8_16_installed == "true" ? "javascript:showLittleModalPopUp('confirmedDeleteMPTiles_8_16')" : "javascript:MPtilesDb_8_16_toDownload()";
        
        //************* TELECHARGEMENT AIX  *****************
        
        var textAixSmall_17_19 = localStorage.isAixSmall_17_19_installed == "true" ? commonLabel[currentLang].deleteAixSmall_17_19 : commonLabel[currentLang].downloadAixSmall_17_19;
        
        var actionAixSmall_17_19 = localStorage.isAixSmall_17_19_installed == "true" ? "javascript:showLittleModalPopUp('confirmedDeleteAixSmall_17_19')" : "javascript:AixSmall_17_19_toDownload()";
        
        //************* TELECHARGEMENT RANDO  *****************
        
        var textDownloadMapRando = localStorage.isFullTilesTracesDownloaded == "true" ? commonLabel[currentLang].deleteRandoTiles : commonLabel[currentLang].downloadRandoTiles;
        
        var actionDownloadMapRando = localStorage.isFullTilesTracesDownloaded == "true" ? "javascript:showLittleModalPopUp('confirmedDeleteTilesRando')" : "javascript:MpTilesRandoDb_8_15_ToDownload()";
        
        //************* TELECHARGEMENT ITINERAIRE  *****************
        
        var textFullSQLite = localStorage.isFullSQLiteForSpatialiteInstalled == "true" ? commonLabel[currentLang].deleteFullSQLite : commonLabel[currentLang].downloadFullSQLite;
        
        var actionFullSQLite = localStorage.isFullSQLiteForSpatialiteInstalled == "true" ? "javascript:showLittleModalPopUp('confirmedDeleteFullSQLite');" : "javascript:smallCopySQLiteDB()";
        
        //*********************** isImageOffLine *************************
        
        var textImageOffLine = isImageOffLine == true ? commonLabel[currentLang].chooseImageInLine : commonLabel[currentLang].chooseImageOffLine;
        
        var actionImageOffLine  = "javascript:reverseImageOffLine()";
        
        //************* ALL PICTURES  *****************
        
        var nbOffLineImages = parseInt(localStorage["nbOffLineImages"]) ;
        
        log("setMainMenu -> nbOffLineImages : " + localStorage["nbOffLineImages"]);
        
        var textDownloadAllPictures = commonLabel[currentLang].downloadAllPictures + ' <span id="nbOffLineImages">' + nbOffLineImages + '</span> / <span>' + mListFullConcat.length + '</span>';
        
        var actionDownloadAllPictures = "javascript:downloadAllPicture()";
        
        //************* DELETE PICTURES  *****************
        
        var textDeletePictures = commonLabel[currentLang].deleteAllPictures;
        
        var actionAllPictures = "javascript:showLittleModalPopUp('confirmedDeleteAllPictures');";
        
        
        //************* HTML  *****************
        
        lDownloads =
        '<a href="' + actionMPTiles_8_16 + ';" class="" id="btnMenuTilesDb_8_16"><div class="textBlockMenuDetail">' + textMPTiles_8_16 + '</div></a>' +
        '<a href="' + actionAixSmall_17_19 + ';" class="" id="btnAixSmall_17_19"><div class="textBlockMenuDetail">' + textAixSmall_17_19 + '</div></a>' +
        '<a href="' + actionDownloadMapRando + ';" class="" id="btnMenuRandoTiles"><div class="textBlockMenuDetail">' + textDownloadMapRando + '</div></a>' +
        '<a href="' + actionFullSQLite + ';" class="" id="btnMenuFullSQLite"><div class="textBlockMenuDetail">' + textFullSQLite + '</div></a>' +
        /*'<a href="' + actionImageOffLine + '" class="" id="btnMenuImageOffLine"><div class="textBlockMenuDetail">' + textImageOffLine + '</div></a>' +*/
        '<a href="' + actionDownloadAllPictures + ';" class="" id="btnMenuFullSQLite"><div class="textBlockMenuDetail">' + textDownloadAllPictures + '</div></a>' +
        '<a href="' + actionAllPictures + ';" class="" id="btnMenuFullSQLite"><div class="textBlockMenuDetail">' + textDeletePictures + '</div></a>' +
        '</div>';
    }
    
    //**************** LANG WHEN PROD **********************
    
    var lLangOption;
    
    if (currentLang == "en")
        lLangOption = '<a href="javascript:changeLanguage(\'fr\')" class=""><div class="textBlockMenuDetail">Français</div></a>';
    else
        lLangOption = '<a href="javascript:changeLanguage(\'en\')" class=""><div class="textBlockMenuDetail">English</div></a>';
    
    //******************** settings **********************
    
    var lSettings =
    
        //**************** blockMenuDetail **********************
        '<div id="blockMenuDetail1" class="blockMenuDetail" style="display:none;">'+
        
        //************* Langues *****************
        lLangOption +
        
        //************* settings *****************
        lHtmlConnected +
        
        //************
        //'<p class="TitleBlockMenuDetail">' + menuLabel[currentLang]['tabBarMenu1'] + '</p>' +
        
        //************* download  *****************
        lDownloads;
    
    
    //**********************************************************************************************************
    
    
	$("#listMainMenu").html(//**************** menu *********************
                            lTabBar +
                            
                            //************* blockMenuDetail *****************
							'<div id="blockMenuDetail0" class="blockMenuDetail" style="display:none;">'+
                            
							//************* Home *****************
							'<a href="javascript:setMenuAction(\'Index\')" id="homeMenu" class="" >'+
							'<img src="Assets/pictos/gray/Home.png" width="30" height="30" />' +
							'<div class="textBlockMenuDetail">' + menuLabel[currentLang].home + '</div></a>'+
                            
                            //************* routingMap *****************
							'<a href="javascript:setMenuAction(\'routingMap\')" id="routingMapMenu" class="">' +
                            '<img src="Assets/pictos/gray/RoutingMap.png" width="30" height="30" style="opacity:1;"/>' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['routingMapMenu'] +'</div></a>'+
                            
                            //************* randoMap *****************
							'<a href="javascript:setMenuAction(\'randoMap\')" id="randoMapMenu" class="">' +
                            '<img src="Assets/pictos/gray/RandoMap.png" width="30" height="30" style="opacity:1;"/>' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['randoMapMenu'] +'</div></a>'+
                            
                            //************* Massifs *****************
							'<a href="javascript:setMenuAction(\'Massifs\')" id="massifsMenu" class="">'+
                            '<img src="Assets/pictos/gray/Massifs.png" width="30" height="30" style="opacity:1;" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['massifsMenu'] +'</div></a>'+
                            
                            //************* vélo *****************
							'<a href="javascript:setMenuAction(\'LocationVelo\')" id="veloMenu" class="">'+
                            '<img src="Assets/pictos/gray/LocationVelo.png" width="30" height="30" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['veloMenu'] +'</div></a>' +
                            
                            //************* Métro *****************
							'<a href="javascript:setMenuAction(\'MetroTram\')" id="metroTramMenu" class="">'+
                            '<img src="Assets/pictos/gray/Tramway.png" width="30" height="30" style="opacity:1;" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['metroTramMenu'] +'</div></a>' +
                            
                            //************* parkings *****************
							'<a href="javascript:setMenuAction(\'Parkings\')" id="parkingMenu" class="">'+
                            '<img src="Assets/pictos/gray/Car.png" width="30" height="30" style="opacity:1;"/>' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['parkingMenu'] +'</div></a>' +
                            
                            //************* Camping *****************
							'<a href="javascript:setMenuAction(\'Campings\')" id="campingMenu" class="">' +
                            '<img src="Assets/pictos/gray/Campings.png" width="30" height="30" style="opacity:1;"/>' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['campingMenu'] +'</div></a>'+
                            
                            //************* OT *****************
							'<a href="javascript:setMenuAction(\'OfficesTourisme\')" id="OTMenu" class="">' +
                            '<img src="Assets/pictos/gray/OfficesTourisme.png" width="30" height="30" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['OTMenu'] + '</div></a>' +
                            
                            //************* Guides *****************
							'<a href="javascript:setMenuAction(\'Guides\')" id="guidesMenu" class="">'+
                            '<img src="Assets/pictos/gray/Guides.png" width="30" height="30" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['guidesMenu'] +'</div></a>'+
                            
                            //************* Agences *****************
							'<a href="javascript:setMenuAction(\'AgencesReceptives\')" id="agencesMenu" class="">' +
                            '<img src="Assets/pictos/gray/AgencesReceptives.png" width="30" height="30" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['agencesMenu'] +'</div></a>'+
                            
                            //************* Escalade *****************
							'<a href="javascript:setMenuAction(\'MoniteursEscalade\')" id="moniteursMenu" class="">'+
                            '<img src="Assets/pictos/gray/MoniteursEscalade.png" width="30" height="30" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['moniteursMenu'] +'</div></a>'+
                            
                            //************* Contact *****************
							'<a href="javascript:setMenuAction(\'Contact\')" id="contactMenu" class="">' +
                            '<img src="Assets/pictos/gray/Contact.png" width="27" height="27" style="margin-left:2px;" />' +
                            '<div class="textBlockMenuDetail">' + menuLabel[currentLang]['contactMenu'] +'</div></a>'+
                            
                            //********end********
							'</div>'+
                            
                            lSettings);
                            ;
    
	
    if (isApp)
        setTabBarMenuBtnWithPosition(0);
    else
        $("#blockMenuDetail0").css("display", "inline-block");
    
	$("#btnMainMenu").css("background-image", "url('Assets/menu.png')");
	
    /*
    if (!isMobile && !isIpad)
	{


        $("#btnMainMenu").hammer().on("tap", function(event) {
                                  openOrCloseMenu();
                                  });

        
        var el1 = document.getElementById('btnMainMenu');
        
        
        
        var hammertime1 = new Hammer(el1, {
                                     drag_min_distance: 0,
                                     drag_block_horizontal: true,
                                     drag_block_vertical: false,
                                     transform: false,
                                     hold: false,
                                     prevent_default: !isMobile
                                     });
        
        hammertime1 = Hammer(el1).on("drag", function(ev) {
                                     //$("#mainMenu").css("z-index", "100");
                                     
                                     //alert("menu.target.id : " + menu.target.id);
                                     
                                     log(ev);
                                     
                                     var lGesture = ev.gesture;
                                     
                                     //log(menu.x);
                                     
                                     if(lGesture.target.id != undefined && lGesture.target.id == "btnMainMenu")
                                     {
                                     //log(ev);
                                     var left = lGesture.touches[0].pageX - $("#listMainMenu").width() - lGesture.target.clientWidth/2;
                                     
                                     if (left <= 0 && left >= -250)
                                     {
                                     $("#mainMenu").css ("left", left +'px');
                                     }
                                     }
                                     });
        
        
        hammertime1 = Hammer(el1).on("dragstart", function(ev)
                                     {
                                     //$("#mainMenu").css("z-index", "100");
                                     
                                     var lGesture = ev.gesture;
                                     
                                     //alert("menu.target.id : " + menu.target.id);
                                     
                                     if(animationOnProcess == false && lGesture.target.id != undefined && lGesture.target.id == "btnMainMenu")
                                     {
                                     xStart = lGesture.touches[0].pageX;
                                     //log("xStart : " + xStart);
                                     
                                     animationOnProcess = true;
                                     }
                                     
                                     });
        
        
        hammertime1 = Hammer(el1).on("dragend", function(ev)
                                     {
                                     
                                     var lGesture = ev.gesture;
                                     
                                     //log("xEnd : " + lGesture.touches[0].x);
                                     
                                     if (animationOnProcess == true)
                                     {
                                     xEnd = lGesture.touches[0].pageX;
                                     
                                     //log("xEnd - xStart : " + (xEnd -  xStart));
                                     
                                     var diff = xEnd - xStart;
                                     
                                     if (menuIsOpened == false)
                                     {
                                     if (diff < 30)
                                     {
                                     $("#mainMenu").animate({
                                                            left: "-250px"
                                                            }, 300, 'linear', function()
                                                            {
                                                            //$("#mainMenu").css("z-index", "0");
                                                            });
                                     }
                                     else
                                     {
                                     $("#mainMenu").animate({
                                                            left: "0px"
                                                            }, 300, 'linear', function()
                                                            {
                                                            menuIsOpened = true;
                                                            //$("#btnMainMenu").removeClass("menuBtnClosed");
                                                            //$("#btnMainMenu").addClass("menuBtnOpened");
                                                            });
                                     }
                                     }
                                     else
                                     {
                                     //log(Math.abs(diff) )
                                     if (Math.abs(diff) < 50)
                                     {
                                     $("#mainMenu").animate({
                                                            left: "0px"
                                                            }, 300, 'linear', function(){
                                                            });
                                     }
                                     else
                                     {
                                     $("#mainMenu").animate({
                                                            left: "-250px"
                                                            }, 300, 'linear', function()
                                                            {
                                                            menuIsOpened = false;
                                                            //$("#mainMenu").css("z-index", "0");
                                                            //$("#btnMainMenu").removeClass("menuBtnOpened");
                                                            //$("#btnMainMenu").addClass("menuBtnClosed");
                                                            });
                                     }
                                     }
                                     
                                     animationOnProcess = false; 
                                     }        
                                     
                                     
                                     });	
         }
	else
     */
	{
		$("#btnMainMenu").click(openOrCloseMenu);
	}
}


function setBlocksDisplayNone()
{
    switch (homeStatus)
    {
        case "List" :
        {
            $("#itemListOptions").css("display", "none");
            $("#itemListBottomBtn").css("display", "none");
            $("#itemList").css("display", "none");
        };
            break;
            
        case "Detail" :
        {
            $("#itemDetail").css("display", "none");
            $("#itemDetail").css("left", "0px");
            
            $("#prevNextDetail").css("display", "none");
        };
            break;
            
        case "Close" :
        {
            $("#leftHomeOptionBlock").css("display", "none");
            
            $("#showMapBtn").css("display", "none");
        };
            break;
    }
    
    $("#mobileTitle2").css("display", "none");
    
    $("#itemList").css("opacity", "1");
    $("#bgImage").css("opacity", "1");
    $("#itemListOptions").css("opacity", "1");
    $("#itemListOptions").css("itemListBottomBtn", "1");
    
    //homeStatus = "Home";
}



function changeLanguage(lang)
{
	currentLang = lang;
    
    localStorage.currentLang = lang;
    
    var urlPart = window.location.href.toString().split("#");
    window.location.href = urlPart[0] + "#currentLang=" + currentLang;
    
    var lType = currentTable;
    
    
    if (currentTable == "Index")
    {
        lType = "Index";
        
        closeTransparentDivToTap();
        
        animateCloseMenu();
        
        resetPhotoSwipeHome();
        
        var lDuration = homeStatus == "Home" ? 400 : 2000;

        setTimeout(function(){
                   setHomePicturesSlider(mCurrentDiapoHome);
                   }, lDuration);
        
        
        setTimeout(function(){
        
            firstStepOfLocalizedItems();
            
            if (homeStatus == "Home")
            {
                resetHomeAsStart();
            }
            else
            {
                setMenuAction(lType);
            }
                   
        }, 800);
        
        
    }
    else
    {
        setTitleAndMetaInHead2();
        
        firstStepOfLocalizedItems();
        
        setMenuAction(lType);
        
        $("#itemList").html('');
        indexItemList = 10;
        lastIndexItemList = 0;
        
        resetItemListArray();
        
        setItemList();
    }
    
    if (isProd || isProdWeb)
        gaTrackPage('changeLanguage : ' + currentLang);
}


function resetHomeAsStart()
{
    currentActivity = -1;
    currentCity = -1;
    currentTransport = -1;
    currentTime = -1;

    isCellShowTime = false;
    
    mSwitchSmallBig = "Big";

    resetItemListRouting();
    
    $("#bgImageTitle").css("display", "inline-block");
    $("#trianglePlus").css("display", "inline-block");
    
    
    if (mPhotoSwipeHome)
    {
        setTimeout(function(){mPhotoSwipeHome.play();}, 2000);
    }
    else
    if (homeStatus == "Home")
    {
        resetPhotoSwipeHome();
        setHomePicturesSlider(mCurrentDiapoHome);
    }
    
    homeStatus = "Home";
    previousHomeStatus = "Home";
    
    clearItemList();
    
    $("#itemList").css("display", "inline-block");
    
    setItemListForHome();

    //******************** URL **********************

    window.location.href = window.location.href.toString().split("#")[0] + "#currentLang=" + currentLang;
}



function actionsAfterResetHomeAsStart()
{
    $("#mainContainer").css("top", "0px");
    $("#mobileTitle2").fadeOut(0);
    $("#diapoHome").fadeIn(0);
    
    //setTextForMainSelectionItemTitle();
    setTimeout(setSizeForMainSelectionItemTitle,50);

    setHomePicturesSlider();
    
    var urlPart = window.location.href.toString().split("#");
    window.location.href = urlPart[0] + "#currentLang=" + currentLang;
}


function setMenuAction(_type)
{
    log("setMenuAction -> _type : " + _type + " / homeStatus : " + homeStatus);
    
    if (isModalPopUp)
        showModalPopUp();
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    animateCloseMenu();
    
    
    if ((currentTable == "Index" && _type == "index" && homeStatus == "Home")
        ||  (isTablePracticalLink && _type == currentTable && homeStatus == "List"))
    {
        if (currentTable == "Index")
            resetHomeAsStart();

        return;
    }
    
    
    if (isMapVisible)
    {
        resetMap();
        
        $("#showUserPosition").css("display", "none");
        $("#blockMap").css("display", "none");
        
        isMapVisible = false;
        mapStatus = null;
    }

    
    log("setMenuAction -> _type : " + _type + " / currentTable : " + currentTable + " / homeStatus : " + homeStatus) ;
    
    if (_type == currentTable)
    {
        if (currentTable == "Index")
        {
            setBlocksDisplayNone();
        
            setTimeout(actionsWhenHomeAppears,500);
        }
        else
        if (isTablePracticalLink)
        {
            $("#itemList").fadeIn(1000);
            
            $("#showMapBtn").fadeIn(500);
            
            homeStatus = "List";
        }
    }
    else
    {
        setTimeout(function(){
                   $("body").fadeOut(0);
                   }, 400);
        
        var lType = _type == "Index" ? "index" : _type;

        setTimeout(function(){
               window.location.href = lType + ".html#currentLang=" + currentLang;
               }, 900);
    }
}


function openOrCloseMenu(_arg)
{
    if (_arg == "title" && menuIsOpened)
        return;

    if (isMapVisible)
    {
        if ((currentActivity == "NoIdea" || cityBtnArray[currentCity] == "Geoloc") && !_arg)
            return;
    }
    
	animationOnProcess = true;
    
    
    if (homeStatus == "Home" && isModalPopUp)
    {
        showModalPopUp();
        animateOpenMenu();
        return;
    }
    
    log("openOrCloseMenu -> window.pageYOffset : " + window.pageYOffset);
	
    if (menuIsOpened == false)
    {
        menuYoffset = window.pageYOffset;
        
        if (menuYoffset == 0 || menuYoffset == 1)
        {
            animateOpenMenu();
            
            if (isTablePracticalLink)
                $("#showMapBtn").fadeOut(300);
        }
        else
        {
            var lTimeAnimation = 300;
            
            if (homeStatus == "List")
            {
                var nbItemList = Math.floor(indexItemList / 10);
            
                lTimeAnimation += nbItemList*200;
            }
            
            $("body").animate({scrollTop:0}, lTimeAnimation, 'linear', function(){

                              bugScrollPositionFixed();

                              setTimeout(animateOpenMenu,150);
                              
                              });
        }   
    }
    else
    {        
        animateCloseMenu();
    }
};


function animateOpenMenu()
{
    log("animateOpenMenu -> menuIsOpened : " + menuIsOpened);
    
    if (menuIsOpened)
        return;
    
    if (mPhotoSwipeHome)
        mPhotoSwipeHome.stop();
    
    $("#nbOffLineImages").html(parseInt(localStorage["nbOffLineImages"]));
        
    //if (homeStatus != "Home")
    {
        $("#mainMenu").css("display", "inline-table");
    }
    
    var lTimeAnimation = 300;
    
    if (homeStatus == "List" && isLikeMobile)
    {
        var nbItemList = Math.floor(indexItemList / 10);
        
        lTimeAnimation += nbItemList*100;
    }
    
    $("#mobileTitle2Right").fadeOut(lTimeAnimation);
    
    $("#mainMenu").animate({
                           left: "0px"
                           }, lTimeAnimation, 'linear', function()
                           {
                           menuIsOpened = true;
                           animationOnProcess = false;
                           
                           //**************** set mainContainer for no scroll *****************
                           
                           setMainContainerSizeOverflowHidden(true);
                           
                           });
}


function animateCloseMenu()
{
    $("#listMainMenu").scrollTop(0);
    setTabBarMenuBtnWithPosition(0);
    
    $("#mainMenu").animate({
                           left: -1 * (lSizeListMainMenu + (2 * lBorderListMainMenu)) + "px"
                           }, 400, 'linear', function()
                           {
                           menuIsOpened = false;
                           animationOnProcess = false;
                           //$("#mainMenu").css("z-index", "0");
                           
                           
                           //**************** set mainContainer for scroll *****************
                           
                           
                            setMainContainerSizeOverflowHidden(false);
                        
/*
                           if (isLikeMobile && menuYoffset != 0 && menuYoffset != 1)
                           {
                                var lTimeAnimation = 300;
                           
                                if (homeStatus == "List" && isLikeMobile)
                                {
                                    var nbItemList = Math.floor(indexItemList / 10);
                           
                                    lTimeAnimation += nbItemList*200;
                                }
                           
                                setTimeout(function(){                                           
                                      $("body").animate({scrollTop:menuYoffset}, lTimeAnimation, 'linear', bugScrollPositionFixed);
                                      }, 100);
                           
                           }
           */                
                           if ((!isMapVisible &&
                               ((currentTable == "Index" && homeStatus == "Home")
                               || currentTable == "Contact"
                               || isTablePracticalLink))
                               || currentTable == "routingMap" || currentTable == "randoMap"
                               )
                           {
                                $("#mainMenu").css("display", "inline-block");
                           }
                           else
                           {
                                $("#mainMenu").css("display", "none");
                           }
                           
                           $("#mobileTitle2Right").fadeIn(300);
                           
                           //********************  right btn ************************
                           
                           if (isTablePracticalLink && isLikeMobile && !isMapVisible)
                                $("#showMapBtn").fadeIn(400);
                           
                           if (mPhotoSwipeHome)
                                mPhotoSwipeHome.play();
                           
                           });
}


function setMainContainerSizeOverflowHidden(_arg)
{
    if (_arg == true)
    {
        if (isRestrictedAndroid)
        {
            $("#mainMenu").css("position", "relative");
            
            $("#mobileTitle2").css("display", "none");
            $("#mainContainer").css("display", "none");
            
            if (currentTable == "Index" && homeStatus == "Home")
            {
                $("#bgImage").css("display", "none");
                $("#diapoHome").css("display", "none");
            }
            
            return;
        }        
        
        //****************************************************************************
        
        var lBgImageHeight = 0;
        
        if (!isMapVisible &&
            (isTablePracticalLink || currentTable == "Contact")
            )
        {
            lBgImageHeight = $("#bgImage").height();
        }
        else
        if (!isRestrictedAndroid && currentTable == "Index" && homeStatus == "Home")
        {
            lBgImageHeight = $("#bgImage").height();
        }
        
        
        var lNewSize = getYsize() - $("#mobileTitle2").outerHeight() - lBgImageHeight;
        
        
        //log("setMainContainerSizeOverflowHidden -> $(#mobileTitle).outerHeight() : " + $("#mobileTitle2").outerHeight() + " / $(#bgImage).height() : " + $("#bgImage").height() + " / getYsize() : " + getYsize() + " / lNewSize : " + lNewSize);
        
        $("#mainContainer").css("height", lNewSize + "px");
        $("#mainContainer").css("overflow", "hidden");
        
        setTransparentDivToTapAndClose();
    }
    else
    {
        if (isRestrictedAndroid)
        {
            $("#mainMenu").css("position", "fixed");
            
            $("#mobileTitle2").css("display", "inline-block");
           
            $("#mainContainer").css("display", "inline-block");
            
            if (currentTable == "Index" && homeStatus == "Home")
            {
                $("#bgImage").css("display", "inline-block");
                $("#diapoHome").css("display", "inline-block");
                setHomePicturesSlider();
            }
            
            return;
        }
        
        $("#mainContainer").css("height", "auto");
        $("#mainContainer").css("overflow", "visible");
        
        closeTransparentDivToTap();
    }
}


function reverseImageOffLine()
{
    isImageOffLine = !isImageOffLine;
    
    localStorage["isImageOffLine"] = isImageOffLine;
    
    if (isImageOffLine)
    {
        $("#btnMenuImageOffLine div").html(commonLabel[currentLang].chooseImageInLine);
    }
    else
    {
        $("#btnMenuImageOffLine div").html(commonLabel[currentLang].chooseImageOffLine);
    }
    
    
    log("reverseImageOffLine -> isImageOffLine : " + isImageOffLine);
}


function setTransparentDivToTapAndClose()
{
    var lHtml = '<div id="TransparentDivToTapAndClose" onclick="javascript:closeTransparentDivToTap()" style="height:' + getYsize() + 'px;"></div>';
    
    $("body").append(lHtml);
    
    isTransparentDivToTap = true;
}


function closeTransparentDivToTap()
{
    $("#TransparentDivToTapAndClose").remove();
    
    isTransparentDivToTap = false;
    
    if (menuIsOpened)
        animateCloseMenu();
    
    if (isModalPopUp)
        showModalPopUp();
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
}



function setEventGestureToOpenMenu()
{
    if (isAndroid)
    {
        var el1 = document.getElementById('mobileTitle2');
        
        
        
        var hammertime1 = new Hammer(el1, {
                                     drag_min_distance: 0,
                                     drag_block_horizontal: true,
                                     drag_block_vertical: false,
                                     transform: false,
                                     hold: false,
                                     prevent_default: false
                                     });
        
        hammertime1 = Hammer(el1).on("swipe", function(ev) {openOrCloseMenu();});
    }
    else
    {
        $("#mobileTitle2").hammer().on("swipe", function(event) {
                                       
                                       
                                       log("******* setEventGestureToOpenMenu -> swipe : ");
                                       
                                       log(event);
                                       
                                       if (event.gesture.direction == "left" || event.gesture.direction == "right")
                                       {
                                            openOrCloseMenu();
                                       }
                                       });
    }
}



