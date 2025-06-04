function setGoogleMapAPI()
{
    if (!isLoadingAnimation)
        setLoadingAnimation(0.5);
    
	var script = document.createElement("script");
	script.type = "text/javascript";
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_MAP_KEY + "&loading=async&language=fr&libraries=marker,geometry&map_ids=7c970f25b619b6c618369bac&callback=googleMapReady";
	document.body.appendChild(script);
}


function googleMapReady()
{
   log(" googleMapReady /  homeStatus   : " + homeStatus);
    
	isGoogleMapAPIalreadyLaunched = true;

	if (isMapVisible == true)
	{
		log("setGoogleMapAPI global map");
		log(" mapStatus 1   : " + mapStatus + " / listItemsMap : " + listItemsMap);
		setGlobalMap();
	}
	else
    if (homeStatus == "List" || homeStatus == "Home")
    {        
        launchDistanceMatrixServiceRequest();
        
        log("setGoogleMapAPI List mainSelection");
    }
    else
    {
        getTimeAndDistanceFromGoogleMatrix(requested_type, requested_n, requested_transport);
       log("setGoogleMapAPI options");
    }
}


function setMapItemMenu(_type)
{
	$("#carousel-image-and-text").html('<ul id="menuTouchcarousel" class="touchcarousel-container"></ul>');
	
	btnMarkers = [];
	btnTypeMarkers = [];
	btnTypeName = [];
    
    if (_type == "Loisirs")
    {
        btnMarkers = [false, false, false];
        btnTypeMarkers = ["Club", "Guide", "ParcLoisir"];
    }
    else
    if (_type == "BonsPlans")
    {
        btnMarkers = [false, false, false, false, false];
        btnTypeMarkers = ["Service", "Transport", "Visite", "Atelier", "Hebergement"];
    }
    else
    if (_type == "Shopping")
    {
        btnMarkers = [false, false, false, false, false, false];
        btnTypeMarkers = ["Artisanat", "Mode", "Alimentation", "Cave", "ViePratique", "Loisir", "Culture"];
    }
    else
    if (_type == "SitesNaturels")
    {
        btnMarkers = [false, false, false, false, false, false, false];
        btnTypeMarkers = ["Calanque", "Ile", "River", "Littoral", "Massif", "Parc", "Plongee"];
    }
    else
    if (_type == "Canyons")
    {
        btnMarkers = [false, false, false,false];
        btnTypeMarkers = ["Debutant", "Initie", "Sportif", "Expert"];
    }
	else
	if (_type == "ExpositionsMusees")
    {
        btnMarkers = [false, false, false, false, false, false, false, false];
        btnTypeMarkers = ["Civilisation", "Historique", "Classique", "Moderne", "Contemporain", "Science", "Tribal", "Street"];
    }
    else
    if (_type == "SitesEscalade")
    {
        btnMarkers = [false, false, false, false];
        btnTypeMarkers = ["Bloc", "Couennes", "GVE", "TA"];
    }
	else
	if (_type == "PlageBaignadePiscine")
    {
        btnMarkers = [false, false, false, false, false, false];
        btnTypeMarkers = ["Lac", "Plage", "Calanque", "Piscine_olympique", "Ile", "River"];
    }
	else
	if (_type == "Monuments")
    {
        btnMarkers = [false, false, false];
        btnTypeMarkers = ["Architecture", "Monument", "Quartier"];
    }
	else
	if (_type == "Randonnee")
    {
        btnMarkers = [false, false, false];
        btnTypeMarkers = ["Familial", "Classique", "Technique"];
    }
    else
    if (_type == "Sortir")
    {
        btnMarkers = [false, false, false, false, false, false];
        btnTypeMarkers = ["Agenda", "Cafe", "Concert", "Disco", "Festival", "Spectacle", "Cinema"];
    }
    else
    if (_type == "Dormir")
    {
        btnMarkers = [false, false, false, false, false];
        btnTypeMarkers = ["ChambreHote", "Gite", "Hotel", "Residence", "AubergeJeunesse"];
    }


    //**************************** CAROUSSEL OPTION ******************************
    
	if (mapStatus != "Itinary" && !isAppScreen)
	{
		if (btnMarkers.length > 0)
		{
			$("#carousel-image-and-text").css("display", "inline-block");
			
			for (var i = 0; i < btnTypeMarkers.length; i++)
			{
				if (currentTable == "Index" && (homeStatus == "Detail" || homeStatus == "Close"))
				{
					var bg = 'background-image:url(\'Assets/background/map' + btnTypeMarkers[i] +'.png\')';
					
					$("#menuTouchcarousel").append('<li class="touchcarousel-item">'+
												   '<a href="javascript:lessMarkers('+ i +')" id="lessBtnMap" class="lessBtnMap cornerLeft" style="' + bg + '"> - </a>'+
												   '<a href="javascript:showOrHideMarkers('+ i +')" class="item-block" style="' + bg + '">'+
												   optionLabel[currentLang][btnTypeMarkers[i]] + '</a>'+
												   '<a href="javascript:moreMarkers('+ i +')" id="moreBtnMap" class="moreBtnMap cornerRight" style="' + bg + '"> + </a>'+
												   '</li>');
				}
				else
				{
					var bg = 'background-image:url(\'Assets/background/map' + i +'.png\')';
					
					$("#menuTouchcarousel").append('<li class="touchcarousel-item">'+
												   '<a href="javascript:showOrHideMarkers('+ i +')" class="item-block corner" style="' + bg + '">'+
												   //'<div class="iconColor"></div>'+
												   typeLabel[currentLang][btnTypeMarkers[i]] + '</a>'+
												   '</li>');
				}
				
			}
			
			
			$("#carousel-image-and-text").append('<script type="text/javascript">'+
												 'jQuery(function($) { $("#carousel-image-and-text").touchCarousel({'+
												 'pagingNav: false, snapToItems: false, itemsPerMove: 2, scrollToLast: false, loopItems: false,scrollbar: false});});</script>');
			
			setIconColor();
		}
	}
}


function setGlobalMap()
{
    /*
    if (isApp && isLeafletMap && isGoogleSelected)
    {
        map.remove();
        
        map = null;
        isLeafletMap = false;
        isGoogleMap = false;
    }
    else
    if (isApp && isGoogleMap && !isGoogleSelected)
    {
        $("#mapList").remove();
        $('<div id="mapList" class="corner"></div>').insertAfter("#carousel-image-and-text");
        
        map = null;
        isLeafletMap = false;
        isGoogleMap = false;
    }
    */
    
    log("setGlobalMap - > isGoogleMapAPIalreadyLaunched : " +  isGoogleMapAPIalreadyLaunched);
    
    if ((!isApp || (isApp && isGoogleSelected) || (isApp && isRestrictedAndroid)) && !isGoogleMapAPIalreadyLaunched)
    {
        log("setGlobalMap -> setGoogleMapAPI");
        
        setGoogleMapAPI();
    }
    else
    {
        log("setGlobalMap -> initializeMap");
        
        initializeMap();
    }
}



function addLatLng(event)
{
    var tempArray = polylineVieuxPortRDcoordsArray;
    
    var lString = event.latLng.jb + ',' + event.latLng.kb;
    
    tempArray.push(lString);
    
    log(tempArray);
    
    var path = polyline.getPath();
   log("path : ");
   log(path);
    path.push(event.latLng);
}


function getZoomForOSM(lat, lon)
{
    var lZoom;
    
    /*
    log ("@@@@@@ lat " + lat + " / lon : " + lon);
    
    log ("@@@@@@ getZoomForOSM -> lon > AixSmall_10_16[0] : " + (lon > AixSmall_10_16[0] ? 1 : 0));
    log ("@@@@@@ getZoomForOSM -> lon < AixSmall_10_16[2] : " + (lon < AixSmall_10_16[2] ? 1 : 0));
    log ("@@@@@@ getZoomForOSM -> lat > AixSmall_10_16[1] : " + (lat > AixSmall_10_16[1] ? 1 : 0));
    log ("@@@@@@ getZoomForOSM -> lat < AixSmall_10_16[3] : " + (lat < AixSmall_10_16[3] ? 1 : 0));
    */
    
    // ******************* isMarseilleProvenceTiles_8_16_installed *********************

    if (mapStatus != "IGN")
    {
        if (lon > boundBoxAixSmall_10_16[0] && lon < boundBoxAixSmall_10_16[2] && lat > boundBoxAixSmall_10_16[1] && lat < boundBoxAixSmall_10_16[3])
        {
            if (AixSmall_17_19_db)
                lZoom = 19;
            else
                lZoom = 16;
        }
        else
        if (marseilleProvenceTilesDb)
        {
            if (lon > boundBoxMarseille_17[0] && lon < boundBoxMarseille_17[2] && lat > boundBoxMarseille_17[1] && lat < boundBoxMarseille_17[3])
                lZoom = 17;
            else
            if (lon > boundBoxMarseille_10_12[0] && lon < boundBoxMarseille_10_12[2] && lat > boundBoxMarseille_10_12[1] && lat < boundBoxMarseille_10_12[3])
                lZoom = 16;
            else
            {
                lZoom = 12
            }
        }
        else
        if (lon > boundBoxMarseille_19[0] && lon < boundBoxMarseille_19[2] && lat > boundBoxMarseille_19[1] && lat < boundBoxMarseille_19[3])
            lZoom = 19;
        else
        if (lon > boundBoxMarseille_18[0] && lon < boundBoxMarseille_18[2] && lat > boundBoxMarseille_18[1] && lat < boundBoxMarseille_18[3])
            lZoom = 18;
        else
        if (lon > boundBoxMarseille_17[0] && lon < boundBoxMarseille_17[2] && lat > boundBoxMarseille_17[1] && lat < boundBoxMarseille_17[3])
            lZoom = 17;
        else
        if (lon > boundBoxMarseille_16[0] && lon < boundBoxMarseille_16[2] && lat > boundBoxMarseille_16[1] && lat < boundBoxMarseille_16[3])
            lZoom = 16;
        else
        if (lon > boundBoxMarseille_13_15[0] && lon < boundBoxMarseille_13_15[2] && lat > boundBoxMarseille_13_15[1] && lat < boundBoxMarseille_13_15[3])
            lZoom = 13;
        else
        if (lon > boundBoxMarseille_10_12[0] && lon < boundBoxMarseille_10_12[2] && lat > boundBoxMarseille_10_12[1] && lat < boundBoxMarseille_10_12[3])
            lZoom = 12;
        else
        {
            if (isIpad)
                lZoom = 9;
            else
                lZoom = 8;
        }
        
    }
    else
    if (mapStatus == "IGN")
    {
        lZoom = 15;
    }

    
    log("getZoomForOSM -> lZoom : " + lZoom);
    
    return lZoom;
}


function modifyZoomMax()
{
    var lZoom = getZoomForOSM(map.getCenter().lat, map.getCenter().lng);
    
    //!isIpad
    
    /***** usefull if !marseilleProvenceTilesDb pour afficher tileMissing to download ****/
    /*
    if (lZoom < 13)
        lZoom = 12;
    */
    /************************************************************************************/
    
   map.options.maxZoom = lZoom;
    
   log("modifyZoomMax : " + map.getMaxZoom() + " / getZoom : " + map.getZoom());
}


function moveForAndroid ()
{
    
    
    var lDuration = 1500;
    
    log("moveForAndroid -> getZoom : " + map.getZoom());
    

    
    setTimeout(function(){
               
               var lDiffLat = 0.00001;
               var lDiffLon = 0.00001;
               
               if (map.getZoom() <= 9)
               {
               lDiffLat = 0.005;
               lDiffLon = 0.005;
               }
               else
               if (map.getZoom() <= 10)
               {
               lDiffLat = 0.001;
               lDiffLon = 0.001;
               }
               else
               if (map.getZoom() <= 12)
               {
               lDiffLat = 0.0005;
               lDiffLon = 0.0005;
               }
               else
               if (map.getZoom() <= 16)
               {
               lDiffLat = 0.0001;
               lDiffLon = 0.0001;
               }
               
               log("moveForAndroid -> lDiffLat : " + lDiffLat + " / lDuration : " + lDuration);

               //var lPosition = {"latitude" : map.getCenter().lat - 0.00001, "longitude" : map.getCenter().lng - 0.00001};
               
               var lPosition = {"latitude" : map.getCenter().lat - lDiffLat, "longitude" : map.getCenter().lng - lDiffLon};

               map.panTo([parseFloat(lPosition.latitude), parseFloat(lPosition.longitude)]);
               
               }, lDuration);
}


function initializeMap()
{
    log("@@@@@@@@@ initializeMap -> currentActivity : " + currentActivity + " / isLeafletMap : " + isLeafletMap + " / hasToShowUserPosition : " + hasToShowUserPosition);
    
    //**************************** VAR INIT *********************************

    if (homeStatus == "List" && (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition"))
        hasToShowUserPosition = true;
    
    if (mIsCloserItemActivated)
        mPasMenuItemsMap = 5;
    else
        mPasMenuItemsMap = 10;
    
    //**************************** MAP INIT *********************************
    
	//log(" mapStatus 2   : " + mapStatus + " / listItemsMap : " + listItemsMap);
	//log(" zommMap  5 : " + zoomMap + " / centerPoint : " + centerPoint);

    if (isApp && !isGoogleSelected && (!isRestrictedAndroid || currentTable == "routingMap"))
    {
        if (!isLeafletMap)
        {
            map = L.map('mapList', {zoomControl:false});

           log("####### initializeMap -> map : " + map + " | localStorage.isSmallSQLiteForSpatialiteInstalled : " + localStorage.isSmallSQLiteForSpatialiteInstalled)

            if (isMobile && localStorage.isFullSQLiteForSpatialiteInstalled && isIOS)
            {
                openSpatialDb();
            }
            
            if (isAndroid)
                map.on('zoomend', moveForAndroid);
            else
                map.on('moveend', function(){log("map.getZoom() : " + map.getZoom());});
            
            isLeafletMap = true;
            
            map.on('click', function(e) {
                   if (isCellPartnerVisible)
                     showCellPartner();
                   });
        }
    }
    else
    {
        if(!isGoogleMap)
        {
            var myOptions = {
/*
            navigationControl: false,
            streetViewControl: false,
            mapTypeControl: false,
 */
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            
            map = new google.maps.Map(document.getElementById("mapList"), myOptions);
            
            isGoogleMap = true;
            
            //google.maps.event.addListener(map, 'dragend', moveEndModify);
        }
    }
	
    //************** MENU ***************
    
    setMapItemMenu(currentActivity);
    
    
    // *************** layer **************
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        /*
        if (!marseilleProvenceTilesDb)
        {
            log(" initializeMap -> classic tiles");
            
            mTileLayer = new L.TileLayer.MBTiles ('custom'
                                                  , {
                                                  minZoom: 8,
                                                  maxZoom: 17,
                                                  scheme: 'tms',
                                                  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
                                                  });
            
            map.addLayer(mTileLayer);
        }
        else
         */
        
        {
            log(" initializeMap -> new L.TileLayer.MBTiles");
            
            mTileLayer = new L.TileLayer.MBTiles ('custom'
                                     , {
                                     minZoom: 8,
                                     maxZoom: 19,
                                     scheme: 'tms',
                                     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
                                     });
            
            map.addLayer(mTileLayer);
        }
    }
    
    //************** setListItemsMap ***************
    
    if (currentTable == "routingMap" || mapStatus == "ChoosePosition")
    {
        var lat = 43.2953;
        var lon = 5.37416;

        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            var lZoom;
            
            if (mCurrentMapCenter)
            {
                lat = mCurrentMapCenter.lat;
                lon = mCurrentMapCenter.lng;
                
                lZoom = mCurrentMapZoom;
                
                mCurrentMapZoom = null;
                mCurrentMapCenter = null;
            }
            else
            {
                lZoom = getZoomForOSM(lat, lon);
            }
            
            map.setView([lat, lon], lZoom);
        }
        else
        {
            map.setZoom(isMobile==false?16:15);
            map.panTo(new google.maps.LatLng(lat,lon));
            
            //******************** we load infobox cause it needs google API *************************
            
            $.ajax({
                   url: "js/infobox.js",
                   dataType: "script"
                   });
        }
        
        if (isGoogleMap)
        {
            var lDuration = isGoogleMapAPIalreadyLaunched ? 300 : 1000;
            setTimeout(removeLoadingAnimation, lDuration);
        }
        else
        {
            removeLoadingAnimation();
        }
        
        return;
    }
    else
    {
        setListItemsMap();
    }
    
    //************** set zoom and center ***************
    
    setZoomAndCenter();
    
    
    //*************** load infobox and set Markers *****************
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        setMapMarker(listItemsMap);
        
        if (hasToShowUserPosition)
        {
            if (userLocation)
                placeMarker(userLocation, 1000);
            
            if (userChoosePosition)
                placeMarker(userChoosePosition, 1001);
        }
    }
    else
    {
        //******************** we load infobox cause it needs google API *************************
        $.ajax({
               url: "js/infobox.js",
               dataType: "script",
               success: function()  {
               
               log("initializeMap -> infobox.js success");
               
               setMapMarker(listItemsMap);
               
               if (hasToShowUserPosition)
               {
                    if (userLocation)
                        placeMarker(userLocation, 1000);
               
                    if (userChoosePosition)
                        placeMarker(userChoosePosition, 1001);
               }
               
               }
               });
    }
    
    //******************** Circuits  ********************
    
    if (mapStatus == "Circuits")
    {
        setPolylineFromGPX(listItems[currentItemDetail]);
    }
    
    //******************** Massifs  ********************
    
    if (currentTable == "Massifs" && massifs != undefined)
    {
        createMassifPolygon();
    }
    
    //******************** VieuxPortRD  ********************
    
    if (currentActivity == "VieuxPortRD" && mapStatus == undefined)
    {
        createPolylineForMap(polylineVieuxPortRDcoordsArray);
    }
    
    //************** remove loading animation ***************
    
    if (isGoogleMap)
    {
        log("initializeMap -> isGoogleMap removeLoadingAnimation");
        var lDuration = isGoogleMapAPIalreadyLaunched ? 300 : 1000;
        setTimeout(removeLoadingAnimation, lDuration);
    }
    else
    {
        log("initializeMap -> removeLoadingAnimation");
        removeLoadingAnimation();
    }
}



//******************** event to record position if click  ***************

/*
 google.maps.event.addListener(map, 'click', addLatLng);
 setTimeout(function(){
 var lPoint = new google.maps.LatLng(parseFloat(listItems[currentItemDetail].latitude),
 parseFloat(listItems[currentItemDetail].longitude));
 map.setCenter(lPoint);
 map.setZoom(18)}, 500);
 */



function setListItemsMap()
{
    if (currentTable == "Index"
        && (homeStatus == "Detail" || homeStatus == "Close")
        && (mapStatus == undefined || (mapStatus != undefined && mapStatus.indexOf('geoloc:') == -1)))
    {
        log("fffffffff setListItemsMap -> single");
        
        if (mapStatus == "Itinary")
        {
            if (currentCity == -1 && listItems[currentItemDetail].duplicateItems)
            {
                listItemsMap = setDuplicateItems([listItems[currentItemDetail]]);
            }
            else
            {
                listItemsMap = [listItems[currentItemDetail]];
            }
        }
        else
        {
            listItemsMap = setListItemsMapForDetailClose();
        }
        
        if (listItems[currentItemDetail].associatedMapItems)
        {
            var lArray = jQuery.parseJSON(listItems[currentItemDetail].associatedMapItems);
            
            for (var i = 0; i < lArray.length; i++)
            {
                listItemsMap.push(lArray[i]);
            }
        }
        
    }
    else
    if (mapStatus != undefined && mapStatus.indexOf('geoloc:') != -1)
    {
        if (!isTablePracticalLink)
        {
            //******** -> listItemsMap set in showOptionsMap
            
            log("fffffffff setListItemsMap set in showOptionsMap");
                
            if (homeStatus == "Close")
                listItemsMap.push(listItems[currentItemDetail]);
        }
        else
        {
            log("setListItemsMap -> isTablePracticalLink & geoloc");
                
            listItemsMap.push(getPracticalItemsByGeoloc());
        }
    }
    else
    if (mapStatus == "Circuits")
    {
        var CircuitArray = jQuery.parseJSON(listItems[currentItemDetail].CircuitArray);
        
        for (var i = 0; i < CircuitArray.length; i++)
        {
            var value = CircuitArray[i].split(",");
            
            var lTtem = getItemInDataList(value[0], value[1]);
            
            listItemsMap.push(lTtem);
        }
    }
    else
    if (currentTable == "Massifs")
    {
        listItemsMap = listItems;
    }
    else
    if (homeStatus == "List"
        && (currentActivity == "NoIdea" || cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition"
            || isTablePracticalLink || mIsCloserItemActivated))
    {
        if (listItems.length < 40)
        {
            listItemsMap = listItems;
        }
        else
        {
            if (listItems.length >= mPasMenuItemsMap)
                mIndexListItemsMap = mPasMenuItemsMap;
            else
                mIndexListItemsMap = listItems.length;
            
            listItemsMap = listItems.slice(0, mIndexListItemsMap);
            
            setMenuOnTitleBarAndPlusOrMinusButtons();
        }
    }
    else
    {
        listItemsMap = getBaseActivityItemsList(currentActivity);
    }
}


function setZoomAndCenter()
{
    log("setZoomAndCenter -> mapStatus : " + mapStatus);
    
    var lat;
    var lon;
    
	if (currentTable == "Index"
        && (homeStatus == "Detail" || homeStatus == "Close")
        && listItemsMap.length == 1)
	{
        lat = parseFloat(listItems[currentItemDetail].latitude);
        lon = parseFloat(listItems[currentItemDetail].longitude);
        
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            log("getZoomForOSM(lat, lon) : " + getZoomForOSM(lat, lon));
            
            map.setView([lat, lon], getZoomForOSM(lat, lon));
            
            currentSelectedGooglePoint = {"latitude" : lat, "longitude" : lon};
        }
        else
        {
            log("initializeMap -> single");
            
            map.setZoom(isMobile==false?16:18);
            
            var lPoint = new google.maps.LatLng(lat,lon);
            
            map.panTo(lPoint);
            
            currentSelectedGooglePoint = new google.maps.LatLng(lat,lon);
        }
	}
	else
    if (currentTable == "LocationVelo" && mapStatus == "VeloMPM")
    {
        if (userLocation)
        {
            lat = userLocation.latitude;
            lon = userLocation.longitude;
        }
        else
        {
            lat = listItemsMap[0].latitude;
            lon = listItemsMap[0].longitude;
        }
        
        if (listItemsMap.length > 1)
            setFitBounds();
        else
        {
            if (isApp && !isGoogleSelected && !isRestrictedAndroid)
            {
                map.setView([lat, lon], getZoomForOSM(lat, lon));
            }
            else
            {
                map.setZoom(isMobile==false?16:15);
                map.panTo(new google.maps.LatLng(lat,lon));
            }
        }
    }
    else
    if (mIsCloserItemActivated || (mapStatus != undefined && mapStatus.indexOf('geoloc:') != -1))
    {
        if (mIsCloserItemActivated)
        {
            lat = listItemsMap[0].latitude;
            lon = listItemsMap[0].longitude;
        }
        else
        {
            var coord = mapStatus.substring(7, mapStatus.length);
            var coordArray = coord.split(',');
            
            lat = parseFloat(coordArray[0]);
            lon = parseFloat(coordArray[1]);
        }
        
        
        if (!isApp || (isApp && isGoogleSelected))
        {
            if (currentTable == "Massifs")
                map.setZoom(isMobile==false?12:11);
            else
                map.setZoom(isMobile==false?18:17);
        }
        
        log("mapStatus geoloc & hasToShowUserPosition : " + hasToShowUserPosition);
        
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            if (homeStatus == "Close")
            {
                setFitBounds();
            }
            else
            if (hasToShowUserPosition)
            {
                if (marseilleProvenceTilesDb || isTablePracticalLink)
                {
                    map.fitBounds([[lat,lon], [parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]]);
                    
                    if (map.getZoom() > 16)
                        map.setZoom(16);
                }
                else
                {
                    var midLat = ((parseFloat(userLocation.latitude) - lat) / 2) + lat;
                    var midLon = ((parseFloat(userLocation.longitude) - lon) / 2) + lon;
                    
                    map.setView([midLat,midLon], getZoomForOSM(midLat, midLon));
                }
            }
            else
            {
                map.setView([lat, lon], getZoomForOSM(lat, lon));
            }
            
            currentSelectedGooglePoint = {"latitude" : lat, "longitude" : lon};
        }
        else
        {
            var lPoint = new google.maps.LatLng(lat,lon);
            
            if (homeStatus == "Close")
            {
                setFitBounds();
            }
            else
            if (hasToShowUserPosition)
            {
                var lBounds = new google.maps.LatLngBounds();
                
                var userPoint = new google.maps.LatLng(parseFloat(userLocation.latitude),
                                                       parseFloat(userLocation.longitude));
                
                lBounds.extend(lPoint);
                lBounds.extend(userPoint);
                
                map.fitBounds(lBounds);
            }
            else
            {
                map.panTo(lPoint);
            }
            
            currentSelectedGooglePoint = lPoint;
        }
    }
    else
    {
        /************ hack **************/
        
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            var lZoom2;
            
            log("mCurrentMapCenter : " + mCurrentMapCenter + " / mCurrentMapZoom : " + mCurrentMapZoom);
            
            if (mCurrentMapCenter)
            {
                lat = mCurrentMapCenter.lat;
                lon = mCurrentMapCenter.lng;
                
                lZoom2 = mCurrentMapZoom;
                
                mCurrentMapZoom = null;
                mCurrentMapCenter = null;
            }
            else
            {
                lat = 43.2953;
                lon = 5.37416;
                
                lZoom2 = getZoomForOSM(lat, lon);
            }

            map.setView([lat, lon], lZoom2);
        }
        
        /********************************/
        
        setFitBounds();
        
        /***** usefull if !marseilleProvenceTilesDb for iPad to have all items on good tiles when first show ****/
        /*
         if (!marseilleProvenceTilesDb)
         {
         var _lZoom = getZoomForOSM(map.getCenter().lat, map.getCenter().lng);
         
         if (map.getZoom() > _lZoom)
         map.setZoom(_lZoom);
         }
         */
    }
}


function setMenuOnTitleBarAndPlusOrMinusButtons()
{
    var bg = 'background-image:url(\'Assets/background/pinkBtn.png\')';
    
    var lHtml =
    '<div id="titleMenuBtnMap">'+
    '<a href="javascript:lessMarkers(\'titleMenu\')" id="lessBtnMapTitleMenu" class="lessBtnMapTitleMenu cornerLeft" style="' + bg + '"> - </a>'+
    '<a href="javascript:openOrCloseMenu(\'titleMapMenu\')" class="item-block" style="' + bg + '" id="titleMenuBtnMapLabel">'+ mIndexListItemsMap + ' / ' + listItems.length + '</a>'+
    '<a href="javascript:moreMarkers(\'titleMenu\')" id="moreBtnMapTitleMenu" class="moreBtnMapTitleMenu cornerRight" style="' + bg + '"> + </a>'+
    '</div>';
    
    //$("#mobileTitle2Label").html(lHtml);
    
    setAndAdjustTitleLabel(lHtml);
    
    $("#mobileTitle2Label").attr("onclick", "");
    isMapTitleMenuAndButtonsForNoIdeaAndGeoloc = true;
}


function setFitBounds(_array, _arg)
{
    //log("setFitBounds -> start");
    
    var lMapArray = [];
    
    if (_array)
        lMapArray = _array;
    else
        lMapArray = listItemsMap;
    
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        var boundsArray = [];
        
        if (_arg == 'titleMenu')
        {
            var lCentralPoint = map.getCenter();
            
            boundsArray.push([parseFloat(lCentralPoint.latitude), parseFloat(lCentralPoint.longitude)]);
            
            boundsArray.push([parseFloat(lMapArray[lMapArray.length - 1].latitude), parseFloat(lMapArray[lMapArray.length - 1].longitude)]);
        }
        else
        {
            for (var i = 0; i < lMapArray.length; i++)
            {
                var lPoint;
                
                if ($.isArray(lMapArray[i]) && lMapArray[i].length > 0)
                {
                    boundsArray.push([parseFloat(lMapArray[i][0].latitude), parseFloat(lMapArray[i][0].longitude)]);
                }
                else
                {
                    boundsArray.push([parseFloat(lMapArray[i].latitude), parseFloat(lMapArray[i].longitude)]);
                }
            }
        }
        
        if (hasToShowUserPosition)
        {
            if (userLocation)
                boundsArray.push([parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]);
            
            if (userChoosePosition)
                boundsArray.push([parseFloat(userChoosePosition.latitude), parseFloat(userChoosePosition.longitude)]);
        }
        
        map.fitBounds(boundsArray);
    }
    else
    {
        var lBounds = new google.maps.LatLngBounds();
        
        if (_arg == 'titleMenu')
        {
            var lCentralPoint = map.getCenter();
            
            lBounds.extend(lCentralPoint);
            
            var lLastPoint = new google.maps.LatLng(parseFloat(lMapArray[lMapArray.length - 1].latitude),
                                                             parseFloat(lMapArray[lMapArray.length - 1].longitude));
            
            lBounds.extend(lLastPoint);
        }
        else
        {
            for (var i = 0; i < lMapArray.length; i++)
            {
                var lPoint;
                
                if ($.isArray(lMapArray[i]) && lMapArray[i].length >0)
                {
                    lPoint = new google.maps.LatLng(parseFloat(lMapArray[i][0].latitude),
                                                    parseFloat(lMapArray[i][0].longitude));
                }
                else
                {
                    lPoint = new google.maps.LatLng(parseFloat(lMapArray[i].latitude),
                                                    parseFloat(lMapArray[i].longitude));
                }
                
                lBounds.extend(lPoint);
            }
        }
        
        if (hasToShowUserPosition)
        {
            if (userLocation)
            {
                lPoint = new google.maps.LatLng(parseFloat(userLocation.latitude),
                                            parseFloat(userLocation.longitude));
            
                lBounds.extend(lPoint);
            }
            
            if (userChoosePosition)
            {
                lPoint = new google.maps.LatLng(parseFloat(userChoosePosition.latitude),
                                                parseFloat(userChoosePosition.longitude));
                
                lBounds.extend(lPoint);
            }
        }

        map.fitBounds(lBounds);
    }
    
    log("setFitBounds -> end");
}


function createMassifPolygon()
{
    log("createMassifPolygon -> massifs.length : " + listItemsMassifs.length);
    
    var lMassifs = massifs.data;
    
    for (var n = 0; n < lMassifs.length; n++)
    {
        var coords = lMassifs[n].polygon;
        
        coords = coords.substring(2, coords.length - 2);
        
        var coordsArray = coords.split("),(");
        
        var polyGonArray = [];
        
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            for (var i = 0; i < coordsArray.length; i++)
            {
                var LatLngArray = coordsArray[i].split(",");
                
                polyGonArray.push(new L.LatLng(parseFloat(LatLngArray[0]), parseFloat(LatLngArray[1])));
            }
            
            var poligon = new L.Polygon(polyGonArray, {color: accessMassifLabel["fr"]["color" + lMassifs[n].status]});
            
            map.addLayer(poligon);
        }
        else
        {
            for (var i = 0; i < coordsArray.length; i++)
            {
                var LatLngArray = coordsArray[i].split(",");
                
                polyGonArray.push(new google.maps.LatLng(parseFloat(LatLngArray[0]), parseFloat(LatLngArray[1])));
            }
            
            var poligon = new google.maps.Polygon({
                                                  paths: polyGonArray,
                                                  strokeColor: accessMassifLabel["fr"]["color" + lMassifs[n].status],
                                                  strokeOpacity: 0.8,
                                                  strokeWeight: 3,
                                                  fillColor: accessMassifLabel["fr"]["color" + lMassifs[n].status],
                                                  fillOpacity: 0.5
                                                  });
            
            poligon.setMap(map);
        }
    }
}


function createPolygonForCities()
{
    var polylineArray;
    
    var lCityArray;
    
    log("cityBoundsArray : " + JSON.stringify(cityBoundsArray));
    
    for (var i = 0; i < cityBoundsArray.length; i++)
    {
        polylineArray = [];
        
        lCityArray = cityBoundsArray[i].split(",");
        
        log("lCityArray : " + JSON.stringify(lCityArray));
        
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            polylineArray.push(new L.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[0])));
            polylineArray.push(new L.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[2])));
            polylineArray.push(new L.LatLng(parseFloat(lCityArray[3]), parseFloat(lCityArray[2])));
            polylineArray.push(new L.LatLng(parseFloat(lCityArray[3]), parseFloat(lCityArray[0])));
            polylineArray.push(new L.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[0])));
            
            polyline = L.polyline(polylineArray, {color: 'blue'});
            map.addLayer(polyline);
        }
        else
        {
            polylineArray.push(new google.maps.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[0])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[2])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lCityArray[3]), parseFloat(lCityArray[2])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lCityArray[3]), parseFloat(lCityArray[0])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lCityArray[1]), parseFloat(lCityArray[0])));
            
            polyline = new google.maps.Polyline({
                                                path: polylineArray,
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 0.8,
                                                strokeWeight: 3
                                                });
            
            polyline.setMap(map);
        }
    }
}


function createPolylineForMap(_array)
{
    var polylineArray = [];
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        for (var n = 0; n < _array.length; n++)
        {
            var coordsArray = _array[n].split(",");
            
            polylineArray.push(new L.LatLng(parseFloat(coordsArray[0]), parseFloat(coordsArray[1])));
        }
        
        polyline = L.polyline(polylineArray, {color: 'blue'});
        map.addLayer(polyline);
        
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());
        
        removeLoadingAnimation();
        
        setTimeout(function(){
                   
                   if (isIpad)
                   {
                        var lCenter = map.getCenter();
                        map.panTo([map.getCenter().lat - 0.0001, map.getCenter().lng - 0.0001]);
                   }
                   
                   }, 2000);
    }
    else
    {
        for (var n = 0; n < _array.length; n++)
        {
            var coordsArray = _array[n].split(",");
            
            polylineArray.push(new google.maps.LatLng(parseFloat(coordsArray[0]), parseFloat(coordsArray[1])));
        }
        
        polyline = new google.maps.Polyline({
                                                       path: polylineArray,
                                                       strokeColor: '#FF0000',
                                                       strokeOpacity: 0.8,
                                                       strokeWeight: 3
                                                       });
        
        polyline.setMap(map);
    }
}


function setPolylineFromGPX(_item)
{
    var points = [];
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        $(_item.gpx).find("trkpt").each(function() {
                                        var lat = $(this).attr("lat");
                                        var lon = $(this).attr("lon");
                                        points.push(new L.LatLng(parseFloat(lat), parseFloat(lon)));
                                        });
        
        var poly = L.polyline(points, {color: '#FF00AA'});
        
        map.addLayer(poly);
        
        // zoom the map to the polyline
        map.fitBounds(poly.getBounds());
        
        removeLoadingAnimation();
        
        setTimeout(function(){
                   
                   if (isIpad)
                   {
                   var lCenter = map.getCenter();
                   map.panTo([map.getCenter().lat - 0.0001, map.getCenter().lng - 0.0001]);
                   }
                   
                   }, 2000);
    }
    else
    {
        
        var bounds = new google.maps.LatLngBounds ();
        
        //log("setPolylineFromGPX -> _item.gpx : " + _item.gpx);
        
        $(_item.gpx).find("trkpt").each(function() {
                                        var lat = $(this).attr("lat");
                                        var lon = $(this).attr("lon");
                                        var p = new google.maps.LatLng(lat, lon);
                                        points.push(p);
                                        bounds.extend(p);
                                        });
        
        var poly = new google.maps.Polyline({
                                            // use your own style here
                                            path: points,
                                            strokeColor: "#FF00AA",
                                            strokeOpacity: .7,
                                            strokeWeight: 4
                                            });
        
        poly.setMap(map);
        
        // fit bounds to track
        map.fitBounds(bounds);
    }
}



function setIconColor ()
{
	var iconArray = $(".iconColor");
	
	for (var i = 0; i < iconArray.length; i++)
	{
		//$(iconArray[i]).css("background-color", "#" + btnTypeColor[i]);
		$(iconArray[i]).css("background-image", "url(Assets/background/map" + i + ".png)");
	}
}


function setListItemsMapForVieuxPortRD()
{
    var lArray = [];
    
    for (var i = 0; i < listItems.length; i++)
    {
        if ($.isArray(listItems[i]))
        {
            var lSplitArray = listItemsVieuxPortRDArray[i].split(",")[0].split("-");
            
            var lType;
            
            if (listItemsVieuxPortRDArray[i].split(",")[1].indexOf('Restaurant') != -1)
                lType = "cdt:Restaurant";
            
            if (listItemsVieuxPortRDArray[i].split(",")[1].indexOf('Hotel') != -1)
                lType = "cdt:Hotel";
            
            
            var lItem = {
                "latitude" : lSplitArray[0],
                "longitude" : lSplitArray[1],
                "type" : lType
            }
            
            lArray.push(lItem);
        }
        else
        {
            lArray.push(listItems[i]);
        }
    }
    
    return lArray;
}


function setListItemsMapForDetailClose ()
{
	var nbOptionsToFirstDisplay = 5;
	
	var lArray = [];
	
	
	lArray.push(listItems[currentItemDetail]);
	
	for (var l = 0; l < optionsCategoriesArray.length; l++)
	{		
		if (optionsCategoriesArray[l].length > 0)
		{
			for (var i = 0; i < optionsCategoriesArray[l].length && i < nbOptionsToFirstDisplay; i++)
			{
				//log(optionsCategoriesArray[l][i]);
				
				lArray.push(optionsCategoriesArray[l][i]);
			}
		}
	}
	
    /*
    //**************** Metro tram velo parkings *****************
    
    if (listItems[currentItemDetail].city.toLowerCase().indexOf('marseille') != -1)
    {
        var metroTramArray = getArrayForCloseItemsFromList(listItemsMetroTram, listItems[currentItemDetail]);
        
        lArray.push(metroTramArray[0]);
        lArray.push(metroTramArray[1]);
        
        var veloMPMArray = getArrayForCloseItemsFromList(listItemsVeloMPM, listItems[currentItemDetail]);
        
        lArray.push(veloMPMArray[0]);
        lArray.push(veloMPMArray[1]);
    }
    
    
    var parkingsArray = getArrayForCloseItemsFromList(listItemsParkings, listItems[currentItemDetail]);
    
    if (calculDistanceBetweenItems(parkingsArray[0], listItems[currentItemDetail]) < 4)
        lArray.push(parkingsArray[0]);
    */
    
    //**************************************************

	//log("lArray.length : " + lArray.length);
	//log(lArray);
	
	return lArray;
}


function setMapMarker(_listItems)
{	
	markerArray = [];
    
    var index = 0;
	
    for (var i = 0; i < _listItems.length; i++)
    {
        placeMarker(_listItems[i], i);
    }
    
    log("setMapMarker -> end");
}


function showAllMarkers()
{
    for (var i = 0; i < listItemsMap.length; i++)
    {
        markerArray[i].setVisible(true);
    }
    
    for (var i = 0; i < btnMarkers.length; i++)
    {
        btnMarkers[i] = false;
    }
    
    if (getXsize() <= 768)
    {
        deletePopUpMapSettings();
    }
}


function showOrHideMarkers (btn)
{
    removeAllInfowindow();
    
	var carouselArray;
    
    if (getXsize() <= 768)
    {
        carouselArray = $("#btnPopUpSettingsMapMoreOrLeft .itemBlockMobile");
        deletePopUpMapSettings();
    }
    else
        carouselArray = $("#carousel-image-and-text .item-block");
    
	$(carouselArray).css("color", "#ffffff");
	
	if (btnMarkers[btn] == true)
	{		
		showAllMarkers();
	}
	else
	{
		for (var i = 0; i < listItemsMap.length; i++)
		{
			if (currentTable == "Index" && (homeStatus == "Detail" || homeStatus == "Close"))
			{
				if (listItemsMap[i] != listItems[currentItemDetail])
					markerArray[i].setVisible(false); 
				
				if (btnTypeMarkers[btn] == "Items" && tableArray.indexOf(listItemsMap[i].table) != -1 && listItemsMap[i] != listItems[currentItemDetail])
					markerArray[i].setVisible(true); 	
				
				if (btnTypeMarkers[btn] == "MP2013" && listItemsMap[i].type == "MP2013")
					markerArray[i].setVisible(true); 					
				
				
				if (btnTypeMarkers[btn] == "Restaurants" && (listItemsMap[i].type.indexOf("cdt:Restaurant") != -1
															 || listItemsMap[i].type == "Bars"))
					markerArray[i].setVisible(true); 
				
				
				if (btnTypeMarkers[btn] == "Hotels" && (listItemsMap[i].type == "cdt:Hotel"
														|| listItemsMap[i].type == "cdt:ChambreHote" || listItemsMap[i].type == "cdt:Camping"
														|| listItemsMap[i].type == "cdt:AireStationnementCampingCar"))
					markerArray[i].setVisible(true); 
				
				
				if (btnTypeMarkers[btn] == "Services" && (listItemsMap[i].type == "cdt:OTSI"
														  || listItemsMap[i].type == "cdt:LocationMaterielSportLoisir" || listItemsMap[i].type == "cdt:GuidesServiceGuides"
														  || listItemsMap[i].type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1
														  || listItemsMap[i].type.indexOf("cdt:MoniteurEscalade") != -1
														  || listItemsMap[i].type.indexOf("cdt:Agence") != -1))
					markerArray[i].setVisible(true); 
			}
            else
				if (homeStatus == "List" && currentActivity == -1)
				{
					if (listItemsMap[i].table.indexOf(btnTypeMarkers[btn]) != -1)
					{
						markerArray[i].setVisible(true);
					}
					else
					{
						markerArray[i].setVisible(false);
					}
				}
				else
				{
					if (listItemsMap[i].type.indexOf(btnTypeMarkers[btn]) != -1)
					{
						markerArray[i].setVisible(true); 
					}
					else
					{
						markerArray[i].setVisible(false);
					}
				}
		}
		
		$(carouselArray[btn]).css("color", "grey");
		
		for (var b = 0; b < btnMarkers.length; b++)
		{
			btnMarkers[b] = false;
		}
		
		btnMarkers[btn] = true;
	}
}


function lessMarkers(_i)
{
    if (_i == 'titleMenu')
    {
        if (mIndexListItemsMap - mPasMenuItemsMap >= 0)
            mIndexListItemsMap -= mPasMenuItemsMap;
        else
            mIndexListItemsMap = 0;
        
        for (var i = listItemsMap.length -1; i >= mIndexListItemsMap; i--)
        {
            if (isLeafletMap)
                map.removeLayer(markerArray[i]);
            else
                markerArray[i].setMap(null);
            
            
            markerArray.remove(i);
            listItemsMap.remove(i);
        }
        
        $("#titleMenuBtnMapLabel").html(mIndexListItemsMap + ' / ' + listItems.length);
        
        if (mIndexListItemsMap > 0)
            setFitBounds();
    }
    else
    {
        var tempArray;
        
        for (var n = (markerArray.length -1); n > -1; n--)
        {
            if (_i == 0 && tableArray.indexOf(listItemsMap[n].table) != -1 && listItemsMap[n] != listItems[currentItemDetail])
            {
                markerArray[n].setMap(null);
                markerArray.remove(n);
                listItemsMap.remove(n);
                indexMapItems--;
                return;
            }
            
            if (_i == 0 && listItemsMap[n].type == "MP2013")
            {
                markerArray[n].setMap(null);
                markerArray.remove(n);
                listItemsMap.remove(n);
                indexMapMP2013--;
                return;
            }
            
            if (_i == 1 && (listItemsMap[n].type.indexOf("cdt:Restaurant") != -1 || listItemsMap[n].type == "Bar"))
            {
                markerArray[n].setMap(null);
                markerArray.remove(n);
                listItemsMap.remove(n);
                indexMapRestaurants--;
                //log("i : " + _i + " / index : " + indexMapRestaurants);
                return;
            }
            
            if (_i == 2 && (listItemsMap[n].type == "cdt:Hotel" || listItemsMap[n].type == "cdt:Camping"
                            || listItemsMap[n].type == "cdt:AireStationnementCampingCar"
                            || listItemsMap[n].type == "cdt:ChambreHote"))
            {
                markerArray[n].setMap(null);
                markerArray.remove(n);
                listItemsMap.remove(n);
                indexMapHotels--;
                return;
            }
            
            if (_i == 3 && (listItemsMap[i].type == "cdt:OTSI" || listItemsMap[i].type == "cdt:LocationMaterielSportLoisir"
                            || listItemsMap[i].type == "cdt:GuidesServiceGuides" || listItemsMap[i].type.indexOf("cdt:AccompagnateurMoyenneMontagne")!= -1
                            || listItemsMap[i].type.indexOf("cdt:MoniteurEscalade") != -1 || listItemsMap[i].type.indexOf("cdt:Agence")!= -1))
            {
                markerArray[i].setMap(null);
                markerArray.remove(n);
                listItemsMap.remove(n);
                indexMapServices--;
                return;
            }
        }
    }
}


function moreMarkers(_i)
{
    if (_i == 'titleMenu')
    {
        if (listItems.length >= mIndexListItemsMap + mPasMenuItemsMap)
            mIndexListItemsMap += mPasMenuItemsMap;
        else
            mIndexListItemsMap += listItems.length - mIndexListItemsMap;
        
        for (var i = listItemsMap.length; i < mIndexListItemsMap; i++)
        {
            listItemsMap.push(listItems[i]);
            placeMarker(listItems[i], i);
        }
        
        $("#titleMenuBtnMapLabel").html(mIndexListItemsMap + ' / ' + listItems.length);
        
        setFitBounds();
        
    }
    else
    {
        var index;
        
        switch(_i)
        {
            case 0 :index = ++indexMapItems; break;
            case 1 :index = ++indexMapMP2013; break;
            case 2 :index = ++indexMapRestaurants; break;
            case 3 :index = ++indexMapHotels; break;
            case 4 :index = ++indexMapServices; break;
        }
        
        //log("i : " + _i + " / index : " + index);
        
        //log(optionsCategoriesArray[_i]);
        
        listItemsMap.push(optionsCategoriesArray[_i][index]);
        
        placeMarker(optionsCategoriesArray[_i][index], (listItemsMap.length -1));
    }
}


function getTypeForMarker(_item, i)
{
    //log("getTypeForMarker -> currentActivity : " + currentActivity + " / homeStatus : " + homeStatus + " / mapStatus : " + mapStatus);
    //log("getTypeForMarker -> _item.table : " + _item.table + " / _item.type : " + _item.type + " / _item.duplicateItems : " + _item.duplicateItems);
    
    var lType;
    
    //******************************************* detail item ******************************************************
    
    if (_item.status && _item.status == "associatedMapItems")
    {
        lType = _item.type;
    }
    else
    if (currentTable == "Index" && homeStatus == "Detail" && currentCity == -1 && listItems[currentItemDetail].duplicateItems)
    {
        var lTable = _item.table;
        var _lType = _item.type;
            
        lType = lTable + '_' + _lType;
    }
    else
    if (listItems && _item == listItems[currentItemDetail] && currentActivity != "Circuits")
    {
        if (_item.table == "Monuments" || _item.table == "Sortir" || _item.table == "SitesNaturels" || _item.table == "PlageBaignadePiscine")
        {
            lType = _item.type + 'Selected2';
        }
        else
        {
            lType = _item.table + 'Selected2';
        }
    }
    
    //******************************************* List except NoIdea ******************************************************
    
    else
    if (tableArray.indexOf(_item.table) != -1 && currentTable == "Index"
        && (homeStatus == "List" || mapStatus == "closeMap" || mapStatus == "Circuits"))
    {
        if (_item.table == "SitesEscalade")
        {
            var lTypeArray = _item.type.split(", ");
            
            lType = "SitesEscalade";
            
            for (var t = 0; t < lTypeArray.length; t++)
                lType += "_" + lTypeArray[t];
        }
        else
        if (_item.table == "Restos")
        {
            lType = "Restos";
        }
        else
        {
            var lTable = _item.table;
            var _lType = _item.type;
            
            if (_item.table == "ExpositionsMusees")
            {
                if (_item.type.indexOf("Moderne") != -1)
                    _lType = "Moderne";
                
                if (_item.type.indexOf("Contemporain") != -1)
                    _lType = "Contemporain";
            }
            else
            if (_item.table == "Circuits")
            {
                if (_item.macaron == "Bateau" || _item.macaron == "Moto"
                    || _item.macaron == "TukTuk" || _item.macaron == "Voiture")
                    _lType = 'pink';
                else
                    _lType = 'green';
            }
                
            lType = lTable + '_' + _lType;
        }
    }
    
    //******************************************* practical item ******************************************************
    
    else
    {
		if (_item.type.indexOf("cdt:Restaurant") != -1)
		{
			lType = 'Restaurants';
		}
        else
        if (_item.type.indexOf("cdt:Agence")!= -1)
        {
            lType = 'Agences';
        }
        else
        if (_item.type.indexOf("cdt:AccompagnateurMoyenneMontagne")!= -1)
        {
            if (_item.type.indexOf("cdt:MoniteurEscalade") != -1)
                lType = 'MoniteursEscalade';
            else
                lType = 'AccompagnateurMontagne';
        }
        else
        if (_item.type == "MetroTram")
        {
            if (_item.line.indexOf("M") != -1)
                lType = 'Metro';
            else
                lType = 'Tram';
        }
        else
        {
            lType = praticalTypeArray[_item.type];
        }
        
        //******************************************* closer item & geoloc ******************************************************

        if (mIsCloserItemActivated && i == 0)
        {
            lType = lType + 'Selected2';
        }
        else
        if (mapStatus != undefined && mapStatus.indexOf('geoloc:') != -1)
        {
            var coord = mapStatus.substring(7, mapStatus.length);
            var coordArray = coord.split(',');
            
            if (parseFloat(_item.latitude) == parseFloat(coordArray[0]) && parseFloat(_item.longitude) == parseFloat(coordArray[1]))
                lType = lType + 'Selected2';
        }
    }
    
    //log("getTypeForMarker ->  lType : " + lType);

    return lType;
}


function placeMarker(_item, i, _selected)
{    
    var marker;
    var lIcon;
    var lIconUrl;
    var lShadowUrl;
    var lTypeForMarker;
    
    var lat = parseFloat(_item.latitude);
    var lon = parseFloat(_item.longitude);
    
    if (_item.type != "userLocation" && _item.type != "ChoosePosition")
    {
        if (_selected == "Selected2")
            lTypeForMarker = _item.table + 'Selected2';
        else
            lTypeForMarker = getTypeForMarker(_item, i);
    
        lIconUrl = 'Assets/pin/' + lTypeForMarker + '.png';
        lShadowUrl = 'Assets/pin/marker-shadow.png';
    }
    
     //******************************* LEAFLET ********************************
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        //**************** pinIMAGE & pinSHADOW ***********************
        
        if (_item.type == "userLocation" || _item.type == "ChoosePosition")
        {
            var lNamePin = _item.type == "userLocation" ? "pin_blue" :  "pin_red";
            
            lIconUrl = 'Assets/' + lNamePin + '.png';
            lShadowUrl = 'Assets/pin/Shadow_user_lite.png';
            lIconSize = [40, 40];
            lIconAnchor = [20, 40];
            
            lat = _item.type == "userLocation" ? parseFloat(userLocation.latitude) : parseFloat(userChoosePosition.latitude);
            lon = _item.type == "userLocation" ? parseFloat(userLocation.longitude) : parseFloat(userChoosePosition.longitude);
        }
        else
        if (lTypeForMarker.indexOf("Selected2") != -1)
        {
            lIconSize = [38, 61];
            lIconAnchor = [19, 61];
        }
        else
        {
            lIconSize = [30, 47];
            lIconAnchor = [15, 47];
        }

        //log("placeMarker -> lIconUrl : " + lIconUrl + " / lIconSize : " + JSON.stringify(lIconSize));
        
        //log("placeMarker -> lIconAnchor : " + JSON.stringify(lIconAnchor));
        
        var popupAnchor;
        
        if (isIOS)
            popupAnchor = getXsize() > 550 ? [118, 195] : [118, 145] ;
        else
            popupAnchor = [0, -75];
        
        lIcon = L.icon({
                       iconUrl:      lIconUrl,
                       shadowUrl:    lShadowUrl,
                       iconSize:     lIconSize,
                       shadowSize:   [40, 40],
                       iconAnchor:   lIconAnchor,
                       shadowAnchor: [12, 42],
                       popupAnchor:  popupAnchor
                       });
        
        
        //**************** marker ***********************
        
        marker = L.marker([lat, lon], {icon: lIcon}).addTo(map).bindPopup(getBoxContentForPopUp(i), {closeButton:false, autoPanPadding: [20,20]});
        
        if (_item.type == "userLocation")
        {
            if (userMarker)
            {
                log("placeMarker -> userLocation : userMarker.remove");
                    
                map.removeLayer(userMarker);
            }
            
            userMarker = marker;
                    
            log("placeMarker -> userLocation : save userMarker");

            return;
        }        
        

        marker.on("click", function()
          {
                  
          if (isCircuitsSwiperVisible)
          {
                  if (i == 0 && mIndexLastSelectedCircuitMarker == -1)
                    actionOnCircuitsSwiperMove(0);
                  else
                    mSwiperCircuits.swipeTo(i);
          }
          else
          {
              nodeTo = null;
              
              tempSelectedItem = listItemsMap[i];
                  
              setFileForOnePictureForUnicId(tempSelectedItem, "popUpCell");
                  
                  //****************
              
              if (listItemsMap[i].latitudeRouting != null)
                  currentSelectedGooglePoint = {"latitude" : listItemsMap[i].latitudeRouting, "longitude" : listItemsMap[i].longitudeRouting};
              else
                currentSelectedGooglePoint = {"latitude" : marker.getLatLng().lat, "longitude" : marker.getLatLng().lng};
                  
              log("marker.onClick -> : " + listItemsMap[i].idRepName + " / i : " + i);
              
              if ((i != 1000 || i != 1001) && listItemsMap[i].type == "VeloMPM")
              {
                $.ajax(
                {
                     url: (isApp?urlWeb:'') + 'API/getVeloMPM.php?number=' + listItemsMap[i].number,
                     success: 	function(data, textStatus, request)
                     {
                     var xmlDoc = $.parseXML(data);
                     $("#dispoVeloMap").html(xmlDoc.getElementsByTagName('available')[0].firstChild.nodeValue);
                     $("#dispoPlaceMap").html(xmlDoc.getElementsByTagName('free')[0].firstChild.nodeValue);
                     }
                });
              }
          
              if (listItemsMap[i].type != "VeloMPM")
              {
                    clearTimeout(infoBoxTimeOut);
                    infoBoxTimeOut = setTimeout(function(){
                                       marker.closePopup();
                                       }, 5000);
              }
            }
        });

        
    }
    
    //******************************* GOOGLE ********************************
    
    else
    {
        //**************** pinImage ***********************
        
        if (_item.type == "userLocation" || _item.type == "ChoosePosition")
        {
            var lNamePin = _item.type == "userLocation" ? "pin_blue" :  "pin_red";
            
            pinImage = new google.maps.MarkerImage('Assets/' + lNamePin + '.png',null, null,
                                                   new google.maps.Point(20, 40),
                                                   new google.maps.Size(40, 40)
                                                   );
            
            lat = _item.type == "userLocation" ? parseFloat(userLocation.latitude) : parseFloat(userChoosePosition.latitude);
            lon = _item.type == "userLocation" ? parseFloat(userLocation.longitude): parseFloat(userChoosePosition.longitude);;
        }
        else
        if (_selected == "Selected2")
            pinImage = 'Assets/pin/' + _item.table + 'Selected2.png';
        else
            pinImage = 'Assets/pin/' + lTypeForMarker + '.png';
        
        //log("placeMarker -> pinImage : " + pinImage);
        
        //**************** marker ***********************

        var location = new google.maps.LatLng(lat, lon);
            
        marker = new google.maps.Marker({
                                            position: location,
                                            map: map,
                                            icon: pinImage,
                                            });
        
        if (_item.type == "userLocation")
        {
            if (userMarker)
            {
                log("placeMarker -> userLocation : userMarker.remove");
                
                userMarker.setMap(null);
            }
            
            userMarker = marker;
            
            log("placeMarker -> userLocation : save userMarker");
        }
        
        //**************** attachSecretMessage ***********************

        attachSecretMessage(marker, i);
    }
    
    
    //******************* push in array ******************
    
    if (_item.type != "userLocation")
    {
        if (_selected)
            markerArray.splice(i, 1, marker);
        else
            markerArray.push(marker);
    }
}


function getBoxContentForPopUp(number)
{
    if (!listItemsMap[number]) {
        log("getBoxContentForPopUp -> Element not found in listItemsMap:", number);
        return;
    }

    if (currentTable == "Index" && (homeStatus == "Detail" || homeStatus == "Close")
        && listItemsMap[number].status && listItemsMap[number].status == "associatedMapItems")
        return;
    

    if (listItems[currentItemDetail] && listItems[currentItemDetail].table == "Circuits"
        && mapStatus == "Circuits" && isCircuitsSwiperVisible
        && isApp && !isGoogleSelected && !isRestrictedAndroid)
        return;

    
    var width = 250;
	var lWidth = 170 - 45;
	
    var boxContent;
	
	//*************** bg color / init in var ****************
	
	colorType = "bgGrayLightToGray";
    
    //*************** itinéraire ****************
    
    var linksForRoute = '' ;
    
    if (currentTable != "Massifs")
    {
        linksForRoute = '<div id="linksForRouteMap">'+
        '<a class="genericWhiteBtn corner" href="javascript:setRouteDirectionFromUserLocation(null, \'walking\');" style="width:48%; float:left; margin:0 2% 0 0;">' + commonLabel[currentLang].showWalkingRoute + '</a>' +
        '<a class="genericWhiteBtn corner" href="javascript:setRouteDirectionFromUserLocation(null, \'driving\');" style="width:48%; float:left; margin:0 0 2% 0;">' + commonLabel[currentLang].showDrivingRoute + '</a>'+
        '</div>';
    }
    
    //********* user pin **********
	
    if (number == 1000)
    {
        width = 100;
        
        titleBubble = commonLabel[currentLang].myPosition;
		
		boxContent = '<div class="corner ' + colorType + '" style="display:inline-block; font-size:1.1em; width:'+ width + 'px; padding:10px; color:#ffffff;"><strong>' + titleBubble + '</strong></div>';
    }
    else
    if (number == 1001)
    {
        width = 100;
        
        titleBubble = cityLabel[currentLang].ChoosePosition;
        
        boxContent = '<div class="corner ' + colorType + '" style="display:inline-block; font-size:1.1em; width:'+ width + 'px; padding:10px; color:#ffffff;"><strong>' + titleBubble + '</strong></div>';
    }
    else
    if (currentActivity == "VieuxPortRD"
        && (listItemsMap[number].type == "cdt:Restaurant" || listItemsMap[number].type == "cdt:Hotel")
        && mapStatus == undefined)
    {
        width = 180;
        
        if (listItemsMap[number].type == "cdt:Restaurant")
        {
            colorType = "bgRestaurantsGradient";
            titleBubble = commonLabel[currentLang].restoCircuitSelection;
        }
        
        if (listItemsMap[number].type == "cdt:Hotel")
        {
            colorType = "bgHotelsGradient";
            titleBubble = commonLabel[currentLang].hotelsCircuitSelection;
        }
        
        boxContent = '<div class="corner ' + colorType + '" style="display:inline-block; font-size:1.1em; width:'+ width + 'px; padding:10px; color:#ffffff;"><strong>' + titleBubble + '</strong></div>';
    }
    else
    {
        if (tableArray.indexOf(listItemsMap[number].table) != -1)
        {
            //var lStartUrl = listItemsMap[number].isUpdate ? urlWeb : "";
            
            var lStartUrl = urlWeb;
            
             //********************** bubble value ****************************
            
            titleBubble = titleForItem(listItemsMap[number]);
            
            ///////// type /////////
            

            if (listItemsMap[number].table == "Restos")
                typeBubble = listItemsMap[number]["type_" + currentLang];
            else
            {
                var typeArray = listItemsMap[number].type.split(", ");
                
                var _tempType = "";
                
                for (var i = 0; i < typeArray.length; i++)
                {
                    if (i == 0)
                        _tempType = typeLabel[currentLang][typeArray[i]];
                    else
                        _tempType += ", " + typeLabel[currentLang][typeArray[i]];
                }
                
                typeBubble = _tempType;
                
                if (listItemsMap[number].table == "Randonnee" || listItemsMap[number].table == "SitesEscalade" || listItemsMap[number].table == "Canyons")
                    typeBubble = tableLabel[currentLang][listItemsMap[number].table] + "<br><i>" + _tempType + "</i>";
            }
            
            ///////// ///////// /////////

            pictoBubble = "";
            
            //********************** colorType ****************************
            
            if (listItemsMap[number].idRepName == listItems[currentItemDetail])
            {
                colorType = "bgRedSelectedGradient";
            }
            else
            if (listItemsMap[number].table == "Petanque" || listItemsMap[number].table == "Restos")
            {
                colorType = bgColorNoIdeaArray[listItemsMap[number].table];
            }
            else
            {
                setMapItemMenu(listItemsMap[number].table);
                
                if (listItemsMap[number].table == "Circuits" && mapStatus != "Circuits")
                {
                    if (listItemsMap[number].soustype == "Marche" || listItemsMap[number].soustype == "Velo" || listItemsMap[number].soustype == "Segway")
                        colorType = "bgGreenGradient";
                    else
                        colorType = "bgRestaurantsGradient";
                }
                else
                if (listItemsMap[number].table == "Restos")
                    colorType = "mauveGradient";
                else
                if (listItemsMap[number].table == "BonsPlans" || listItemsMap[number].table == "Shopping"
                    || listItemsMap[number].table == "Loisirs" || listItemsMap[number].table == "SitesNaturels"
                    || listItemsMap[number].table == "Sortir" || listItemsMap[number].table == "Dormir"
                    || listItemsMap[number].table == "Monuments")
                {
                    colorType = newBgColorArray[btnTypeMarkers.indexOf(listItemsMap[number].type)];
                }
                else
                if (btnTypeMarkers.indexOf(listItemsMap[number].type) == -1)
                    colorType = "bgGrayLightToGray";
                else
                    colorType = bgColorArray[btnTypeMarkers.indexOf(listItemsMap[number].type)];
            }
            
            
            //********************** Macaron ****************************
            
            var lMacaron = getMacaronHtml(listItemsMap[number], 'macaronPin');
            
            //********************** link ****************************
            
            var lLink = 'javascript:showPopUpItem(\''+ listItemsMap[number].table + '\', \'' + listItemsMap[number].idRepName + '\', \'' + colorType + '\');';
            
            if (listItemsMap[number].table == "Circuits" && mapStatus != "Circuits")
                lLink = 'javascript:showDetail(' + number + ')';
            
            //********************** boxContent ****************************
            
            var lMarginGoogle = (isApp && !isGoogleSelected && !isRestrictedAndroid) ? "popUpCellMarginForGoogle" : "";
            //class="' + lMarginGoogle + '"
            boxContent =
            '<div id="popUpCell"  style="background-image:url(' + pictoBubble + ')">' +
            '<div onclick="' + lLink + '" id="clickPopUpCell"></div>' +
            '<div class="introPopUpCell ' + colorType + '">' + typeBubble + '</div>' +
            '<div class="titlePopUpCell">' + titleBubble + '</div>' +
            lMacaron +
            '<a href="javascript:setRouteDirectionFromUserLocation(null, \'walking\');" id="btnWalkPopUp"><img src="Assets/btn_walk.png" /></a>'+
            '<a href="javascript:setRouteDirectionFromUserLocation(null, \'driving\');" id="btnCarPopUp"><img src="Assets/btn_car.png" /></a>'+
            '</div>';
        }
        else
        {
            setBubbleValueForPractical(number);
            
            //***************** chevron **************
            
            var lTitleModalPopUp = "Practical";
            
            if (currentTable == "Massifs")
                lTitleModalPopUp = "Massifs:" + listItemsMap[number].id;
            
            var chevron = "";
            
            if ((number != 1000 || number != 1001) && listItemsMap[number].type != "VeloMPM" && listItemsMap[number].type != "MetroTram")
                chevron = '<a href="javascript:showModalPopUp(\'' + lTitleModalPopUp + '\', \'' + colorType + '\');" style="float:left; width:14px; padding-left:6px; margin-top:15px;"><img src="Assets/chevron2.png" width="14" height="22" /></a>';
            
            
            //***************** Velo MPM ajax dispo **************
            
            var dispoHtml = "";
            
            if ((number != 1000 || number != 1001) && listItemsMap[number].type == "VeloMPM")
                dispoHtml = '<div style="clear:both; padding-top:5px; padding-bottom:-15px;" class="textModalPopUp">' + commonLabel[currentLang].numberDispoVelo + ' : <span style="font-weight:bold" id="dispoVeloMap"> ... </span></div><div>' +
                commonLabel[currentLang].numberDispoPlace + ' : <span style="font-weight:bold" id="dispoPlaceMap"> ... </span></div>';
            
			
            //******************* box content ***************
            
            
			boxContent = '<div onclick="javascript:showModalPopUp(\'' + lTitleModalPopUp + '\', \'' + colorType + '\');" class="corner ' + colorType + '" style="display:inline-block; font-size:1.1em; width:'+ width + 'px; padding:8px; border:#2E2A2A solid 1px;">' +
            '<img src="Assets/pictos/' + pictoBubble + '.png" width="40" height="40" style="float:left;  border:#2E2A2A solid 0px; margin-right:10px;" />'+
            '<div style="float:left; text-align:left; color:#ffffff; width:' + (width - 20 - 40 - 10 - 22) + 'px;"><strong>' + titleBubble + '</strong><br>' + typeBubble + '</div>' +
            chevron +
            dispoHtml +
            linksForRoute + '</div>';
        }
    }
    
    return boxContent;
}


function attachSecretMessage(marker, number)
{
    var lContent = getBoxContentForPopUp(number);
    
	//******************* CONTENT & OPTIONS ******************
    
    var myOptions = {
    content: lContent
        ,disableAutoPan: false
        ,maxWidth: 0
        ,pixelOffset: new google.maps.Size(0, -110)
        ,zIndex: null
        ,boxStyle: {
        padding:'0px 20px 0px 0px'
        }
        ,closeBoxMargin: null
        ,closeBoxURL: ""
        ,infoBoxClearance: new google.maps.Size(1, 1)
        ,isHidden: false
        ,pane: "floatPane"
        ,enableEventPropagation: true
    };
    
    //http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.5/docs/reference.html#InfoBox
    
    var infowindow = new InfoBox(myOptions);

	
	//******************* EVENTS ******************
    
    
    google.maps.event.addListener(marker, 'click', function()
                                  {

                          if (isCircuitsSwiperVisible)
                          {
                                  if (number == 0 && mIndexLastSelectedCircuitMarker == -1)
                                    actionOnCircuitsSwiperMove(0);
                                  else
                                    mSwiperCircuits.swipeTo(number);
                          }
                          else
                          {
                                  removeAllInfowindow();
                                  
                                  infowindow.open(map, marker);
                                  
                                  tempSelectedItem = listItemsMap[number];
                                  
                                  var lDuration = isPopMapAlreadyLaunched ? 0 : 1000;
                                  
                                    setTimeout(function(){
                                             setFileForOnePictureForUnicId(tempSelectedItem, "popUpCell");
                                               isPopMapAlreadyLaunched = true;
                                             }, lDuration);
                                  
                                  //****************************************
                                  

                                  log("attachSecretMessage - > tempSelectedItem : " + listItemsMap[number].idRepName);
                                  log(tempSelectedItem);
                                  
                                  if (listItemsMap[number].latitudeRouting != null)
                                        currentSelectedGooglePoint = new google.maps.LatLng(listItemsMap[number].latitudeRouting,listItemsMap[number].longitudeRouting);
                                  else
                                        currentSelectedGooglePoint = marker.getPosition();
                                  
                                  if ((number != 1000 || number != 1001) && listItemsMap[number].type == "VeloMPM")
                                  {
                                  $.ajax(
                                         {
                                         url: (isApp?urlWeb:'') + 'API/getVeloMPM.php?number=' + listItemsMap[number].number,
                                         success: 	function(data, textStatus, request)
                                         {
                                         var xmlDoc = $.parseXML(data);
                                         $("#dispoVeloMap").html(xmlDoc.getElementsByTagName('available')[0].firstChild.nodeValue);
                                         $("#dispoPlaceMap").html(xmlDoc.getElementsByTagName('free')[0].firstChild.nodeValue);
                                         }
                                         });
                                  }
                                  /*
                                  if (listItemsMap[number].type != "VeloMPM")
                                  {
                                        clearTimeout(infoBoxTimeOut);
                                        infoBoxTimeOut = setTimeout(removeAllInfowindow, 5000);
                                  }
                                  */
                            }
                                  
                                  
                                  
                                  });
    
    google.maps.event.addListener(map, 'click', function(){
                                  
                                  if (isCellPartnerVisible)
                                        showCellPartner();
                                  
                                  infowindow.close();
                                  
                                  });
    
    infoWindowArray.push(infowindow);
}


function setBubbleValueForPractical(number)
{
    titleBubble = titleForItem(listItemsMap[number]);
    
    switch (listItemsMap[number].type)
    {
        case "cdt:ParcAcrobatiqueForestier" : {
            typeBubble = "Accrobranche";
            pictoBubble = "ParcAccro";
        }
            break;
            
        case "cdt:Hotel" :
        {
            var lOption = "";
            
            if (listItemsMap[number].label.indexOf("Gay friendly") != -1)
                lOption = " - Gay friendly";
            
            if (listItemsMap[number].label.indexOf("Handicap") != -1)
                lOption += " - Handicap";
            
            typeBubble = listItemsMap[number].soustype + ' ' + listItemsMap[number].classement + lOption;
            pictoBubble = "Hotels";
        }
            break;
            
        case "cdt:Residence" :
        {
            var lOption = "";
            
            if (listItemsMap[number].label.indexOf("Gay friendly") != -1)
                lOption = " - Gay friendly";
            
            if (listItemsMap[number].label.indexOf("Handicap") != -1)
                lOption += " - Handicap";
            
            typeBubble = listItemsMap[number].soustype + ' ' + listItemsMap[number].classement + lOption;
            pictoBubble = "Residence";
        }
            break;
            
        case "cdt:ChambreHote" :
        {
            var lOption = "";
            
            if (listItemsMap[number].label.indexOf("Bed & Breakfast") != -1)
                lOption += " - Bed & Breakfast";
            
            if (listItemsMap[number].label.indexOf("Accueil paysan") != -1 || listItemsMap[number].label.indexOf("Bienvenue à la Ferme") != -1)
                lOption += " - Accueil paysan";
            
            if (listItemsMap[number].label.indexOf("Fleur de soleil") != -1)
                lOption += " - Fleur de soleil";
            
            if (listItemsMap[number].label.indexOf("Gîtes de France") != -1)
                lOption += " - Gîtes de France " + listItemsMap[number].labelnotation;;
            
            if (listItemsMap[number].label.indexOf("Gay friendly") != -1)
                lOption += " - Gay friendly";
            
            if (listItemsMap[number].label.indexOf("Handicap") != -1)
                lOption += " - Handicap";
            
            if (listItemsMap[number].label.indexOf("Clévacances") != -1)
                lOption += " - Clévacances " + listItemsMap[number].labelnotation;
            
            typeBubble = listItemsMap[number].soustype + lOption;
            
            pictoBubble = "Gite";
        }
            break;     
           
        case "cdt:GiteEtMeuble" :
        {
            var lOption = "";
            
            if (listItemsMap[number].label.indexOf("Gîtes de France") != -1)
                lOption += " - Gîtes de France ";
            
            if (listItemsMap[number].label.indexOf("Clévacances") != -1)
                lOption += " - Clévacances ";
            
            typeBubble = listItemsMap[number].soustype + lOption + listItemsMap[number].classement;
            
            pictoBubble = "MeubleTourisme";
        }
            break;
            
        case "cdt:Camping" : {
            typeBubble = listItemsMap[number].soustype + ' ' + listItemsMap[number].classementcamping;
            pictoBubble = "Campings";
        }
            break;
            
        case "cdt:ParkingPublic" : {
            typeBubble = listItemsMap[number].ville;
            pictoBubble = "Parkings";
        }
            break;
            
        case "cdt:AireStationnementCampingCar" : {
            typeBubble = "";
            pictoBubble = "CampingsCar";
        }
            break;
            
        case "cdt:OTSI" : {
            typeBubble = listItemsMap[number].soustype;
            pictoBubble = "OfficesTourisme";
        }
            break;
            
        case "cdt:LocationMaterielSportLoisir" : {
            typeBubble = "Location materiel sport et loisir";
            pictoBubble = "LocationVelo";
        }
            break;
            
        case "cdt:GuidesServiceGuides" : {
            typeBubble = "Service de guide";
            pictoBubble = "Guides";
        }
            break;
            
        case "cdt:MassifMontagne" : {
            var lMassif = getCDTmassifWithId(listItemsMap[number].id);
            var lStatus = lMassif.status_tomorrow != null ? lMassif.status_tomorrow : lMassif.status;
            typeBubble = accessMassifLabel[currentLang][lStatus];
            
            pictoBubble = "Massifs";
        }
            break;
            
        case "VeloMPM" : {
            typeBubble = "";
            pictoBubble = "VeloMPM";
        }
            break;
            
        case "MetroTram" : {
            typeBubble = listItemsMap[number].line;
            
            if (listItemsMap[number].correspondance != "")
                typeBubble += "<br>" +  commonLabel[currentLang].correspondance + " : " + listItemsMap[number].correspondance;
            
            if (listItemsMap[number].line.indexOf("M") != -1)
                pictoBubble = "Metro";
            else
                pictoBubble = "Tram";
        }
            break;
    }
    
    if (listItemsMap[number].type.indexOf("cdt:Restaurant") != -1)
    {
        typeBubble = listItemsMap[number].typedecuisine;
        pictoBubble = "Restaurants";
    }
    
    if (listItemsMap[number].type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1)
    {
        typeBubble = "Accompagnateur en moyenne montagne";
        pictoBubble = "AccompagnateurMontagne";
    }
    
    if (listItemsMap[number].type.indexOf("cdt:MoniteurEscalade") != -1)
    {
        typeBubble = "Moniteurs d'escalade";
        pictoBubble = "MoniteursEscalade";
    }
    
    if (listItemsMap[number].type.indexOf("cdt:Agence") != -1)
    {
        typeBubble = "Agence de voyage";
        pictoBubble = "AgencesReceptives";
    }
    
    //******************* BG COLOR ******************
    
    if (listItemsMap[number].type.indexOf("cdt:Restaurant") != -1)
        colorType = "bgRestaurantsGradient";
    
    if (listItemsMap[number].type == "cdt:MassifMontagne")
        colorType = "bgGrayLightToGray";
    
    if (listItemsMap[number].type == "cdt:Hotel" || listItemsMap[number].type == "cdt:ChambreHote" || listItemsMap[number].type == "cdt:Camping"
        || listItemsMap[number].type == "cdt:AireStationnementCampingCar" || currentTable == "Hebergements")
        colorType = "bgHotelsGradient";
    
    if (listItemsMap[number].type == "cdt:OTSI" || listItemsMap[number].type == "cdt:LocationMaterielSportLoisir" || listItemsMap[number].type == "cdt:GuidesServiceGuides"
        || listItemsMap[number].type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1
        || listItemsMap[number].type.indexOf("cdt:MoniteurEscalade") != -1
        || listItemsMap[number].type.indexOf("cdt:Agence") != -1 || listItemsMap[number].type == "cdt:ParcAcrobatiqueForestier")
        colorType = "bgServicesGradient";
    
    if (listItemsMap[number].type == "MetroTram" || listItemsMap[number].type == "VeloMPM" || listItemsMap[number].type == "cdt:ParkingPublic")
        colorType = "bgRedSelectedGradient";
    
    if (mapStatus != undefined && mapStatus.indexOf('geoloc:') != -1)
    {
        var coord = mapStatus.substring(7, mapStatus.length);
        var coordArray = coord.split(',');
        
        if (parseFloat(listItemsMap[number].latitude) == parseFloat(coordArray[0]) && parseFloat(listItemsMap[number].longitude) == parseFloat(coordArray[1]))
        {
            colorType = "bgRedSelectedGradient";
        }
    }
}


function getPracticalItemsByGeoloc(_type)
{
    var lItem;
    
    var coord = mapStatus.substring(7, mapStatus.length);
    var coordArray = coord.split(',');
    
    for (var i = 0; i < listItems.length; i++)
    {
        if (parseFloat(listItems[i].latitude) == parseFloat(coordArray[0]) && parseFloat(listItems[i].longitude) == parseFloat(coordArray[1]))
        {
            lItem = listItems[i];
        }
    }
    
    log("getPracticalItemsByGeoloc -> lItem : " + JSON.stringify(lItem));
    
    return lItem;
}



function removeAllLeafletPopUp()
{
    for (var i = 0; i < markerArray.length; i++)
    {
        markerArray[i].closePopup();
    }
}


function removeAllInfowindow()
{
    for (var i = 0; i < infoWindowArray.length; i++)
    {
        infoWindowArray[i].close();
    }
}


function removeAllOSMmarquers()
{
    for(i=0; i < markerArray.length; i++)
    {
        map.removeLayer(markerArray[i]);
    }
    
    markerArray = [];
    
    if (userMarker)
        map.removeLayer(userMarker);
}


function removeAllGoogleMarkers()
{
    for (var n = 0; n < markerArray.length; n++)
    {
        markerArray[n].setMap(null);
    }
    
    markerArray = [];
    
    if (userMarker)
        userMarker.setMap(null);
}


//************ used only for circuits ****************

function openInfoWindow(number)
{
    var marker = markerArray[number];
    
    var lContent = getBoxContentForPopUp(number);
    
    //******************* CONTENT & OPTIONS ******************
    
    var myOptions = {
    content: lContent
        ,disableAutoPan: false
        ,maxWidth: 0
        //,pixelOffset: new google.maps.Size(0, -110)
        ,pixelOffset: new google.maps.Size(15, -40)
        ,zIndex: null
        ,boxStyle: {
            padding:'0px 20px 0px 0px'
        }
        ,closeBoxMargin: null
        ,closeBoxURL: ""
        ,infoBoxClearance: new google.maps.Size(1, 1)
        ,isHidden: false
        ,pane: "floatPane"
        ,enableEventPropagation: true
    };
    
    //http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.5/docs/reference.html#InfoBox
    
    var infowindow = new InfoBox(myOptions);
    
    
    //******************* EVENTS ******************
    
    removeAllInfowindow();
    
    infowindow.open(map, marker);
    
    infoWindowArray.push(infowindow);
    
    tempSelectedItem = listItemsMap[number];
    
    setFileForOnePictureForUnicId(tempSelectedItem, "popUpCell");

    clearTimeout(infoBoxTimeOut);
    infoBoxTimeOut = setTimeout(removeAllInfowindow, 5000);
    
    
    google.maps.event.addListener(map, 'click', function(){
                                  infowindow.close();
                                  });
}




function setHTMLforMapDetail ()
{
	$("#itemMapDetail").html(	'<img src="Assets/croix_off.png" id="map_croix_off" onclick="MapCloseDetail()">'+
								'<div id="blockTextItemMapDetail">'+
								
									'<p id="titleMap"></p>'+
									'<p id="massifMap"></p>'+
									'<p id="cityMap"></p>'+
									'<p id="typeMap"></p>'+
									'<p id="presentationMap"></p>'+
									'<div id="diaporamaReduceMap"></div>'+
								'</div>'+
								'<div id="optionRelativeToItemMapDetail">'+
								'</div>');	
}


function MapCloseDetail()
{
	$("#itemMapDetail").css("display", "none");
}


function setMapImageOrDiaporama(_item)
{
	if (_item.type == "MP2013")
	{
		$("#diaporamaReduceMap").html('');
        $("#diaporamaReduceMap").attr("style", "background-image:none");
		
		var image;
		
		if (_item.isMediumImage == "false")
			image = 'Assets/mediumMP2013.jpg';
		else
			image = 'MP2013/medium_' + _item.idRepName +'.jpg';
		
		$("#diaporamaReduceMap").attr("style", "background-image:url('" + image + "'); background-size:100% auto; background-position:center; background-repeat:no-repeat;");
	}
    else
    if (isApp && !isNetWorkAvalaible)
    {
        setFileForOnePictureForUnicId(_item, "diaporamaReduceMap");
        
        $("#diapoBtnMap").css("display", "none");
    }
	else
    {
        setDetailsPicturesSliderMap(_item);
        
        $("#diapoBtnMap").css("display", "inline-block");
    }
}


function setPhotoSwipeDiapoMap (window, PhotoSwipe, _diapoArray)
{
    var options =
    {
    preventHide: true,
    minUserZoom: 1.0,
    captionAndToolbarHide: true,
    enableMouseWheel: false,
    margin: 0,
    imageScaleMethod: 'zoom',
    zIndex: '5001',
    target: window.document.querySelectorAll('#diaporamaReduceMap')[0],
    getImageSource: function(obj){return obj.url;},
    getImageCaption: function(obj){return obj.caption;}
    };
    
    mPhotoSwipeMap = PhotoSwipe.attach(_diapoArray, options);
    
    mPhotoSwipeMap.addEventHandler(PhotoSwipe.EventTypes.onTouch, function(e){
                                
                                log(e);
                                
                                if ((e.action == "swipeUp" || e.action == "swipeDown") && !mPhotoSwipeMap.isZoomActive())
                                {
                                var lHeight = e.action == "swipeUp" ? 240 : - 200;
                                $("body").animate({scrollTop:window.pageYOffset + lHeight}, 500, 'easeInCubic', function(){
                                                  bugScrollPositionFixed();
                                                  mPhotoSwipeMap.carousel.show(mIndexPhotoSwipeMap);
                                                  });
                                }
                                });
    
    mPhotoSwipeMap.addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function(e){
                              mIndexPhotoSwipeMap = e.index;
                              });
    
    setPopUpPhotoSwipeWhenZoom(mPhotoSwipeMap, PhotoSwipe);
    
    mPhotoSwipeMap.show(0);
};


function setDetailsPicturesSliderMap(_item)
{
    mIndexPhotoSwipeMap = 0;
    
    if (mPhotoSwipeMap != null)
    {
        var photoSwipeInstance = lPhotoSwipe.getInstance($(mPhotoSwipeMap).attr('id'));
        lPhotoSwipe.unsetActivateInstance(photoSwipeInstance);
        lPhotoSwipe.detatch(photoSwipeInstance);
        
        mPhotoSwipeMap = null;
        mDiapoArrayMap = [];
    }
     
    mDiapoArrayMap = setArrayForPhotoSwipe(_item, 'mediumSizeImage');
    
    setPhotoSwipeDiapoMap (window, lPhotoSwipe, mDiapoArrayMap);
    
}


function fillCompleteInfoWithMapItem(_item, _type)
{
	var infoItem;

	if (_item.type == "MP2013")
	{
		infoItem =
		'<div class="optionMapItem">'+
		'<div class="optionItemTitle">' +  _item.name_fr + '</div>' +
		'<div style="">' +  _item.place + ' - ' + _item.city +'</div>' +
		'<a href="" target="_blank" style="color:#876B54; float:letf;">' +  _item.date_fr + ' / ' + _item.soustype + '</a>'+
		'<div style="padding:10px; font-size:1em">' +  _item.text_fr + '</div>' +
		'</div>';
	}
	else
	{
		infoItem =	'<div class="optionMapItem" style="background-image:url(\'Assets/pictos/' + _type + '.png\'); background-size:70px 70px">' +
		'<div>' + _item.numro + ' ' + _item.typedevoie + ' ' + _item.voie + ' ' + _item.codepostal + ' ' + _item.ville + '</div>' +
		setPhoneMailSiteForItem(_item) +
		'</div>';
	}
	
	return infoItem;
}


function fillOptionMapItemWithArrayAndType (itemArray, _type)
{
    for (var n = 0; n < itemArray.length ; n++)
    {
        //$("#optionRelativeToItemMapDetail").css('display', 'inline-block');
        
        $("#optionRelativeToItemMapDetail").append(fillCompleteInfoWithMapItem(itemArray[n], _type));
    }
}


function setOptionsForMapDetail(_item)
{
	$("#optionRelativeToItemMapDetail").html('');
	
	if (_item.OT != undefined)
    {
        fillOptionMapItemWithArrayAndType (_item.OT, "OfficesTourisme");
    }
	
    if (_item.Guides != undefined)
    {
        fillOptionMapItemWithArrayAndType (_item.Guides, "Guides");
    }
	
    if (_item.MoniteursEscalade != undefined)
    {
        fillOptionMapItemWithArrayAndType (_item.MoniteursEscalade, "MoniteursEscalade");
    }
	
	if (_item.Agences != undefined)
    {
        fillOptionMapItemWithArrayAndType (_item.Agences, "AgencesReceptives");
    }
    
    if (_item.LocationVelo != undefined)
    {
        fillOptionMapItemWithArrayAndType (_item.LocationVelo, "LocationVelo");
    }
}


function showTargetOnMap()
{
    if (!isTargetOnMapVisible)
    {
        var lWidthTarget = 48;
        var lHeightTarget = 48;
        
        var lTop = ($("#blockMap").height() - lHeightTarget) / 2;
        var lLeft = ($("#blockMap").width() - lWidthTarget) / 2;
        
        var lTargetOnMapHtml = '<div id="targetOnMap" onclick="javascript:showTargetOnMap();" style="display:inline-block; position:absolute; top:' + lTop + 'px; left:' + lLeft + 'px; z-index: 500; width:' + lWidthTarget + 'px; height:' + lHeightTarget + 'px; background-image:url(Assets/target.png); background-size:100% 100%; opacity:0.7;"></div>';
        
        $(lTargetOnMapHtml).insertBefore("#mapList");
        
        $("#btnTarget").css("background-image", "url(Assets/btn_target_on.png)");
        
        isTargetOnMapVisible = true;
    }
    else
    {
        $("#targetOnMap").remove();
        
        $("#btnTarget").css("background-image", "url(Assets/btn_target.png)");
        
        isTargetOnMapVisible = false;
        
        if (mapStatus == "ChoosePosition")
            choosePositionAndShowList();
        else
            showCloserItemsOnMap();
    }
}


function showCloserItemsOnMap()
{
    var lBase;
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        lBase = {"latitude" : map.getCenter().lat, "longitude" : map.getCenter().lng};
    else
        lBase = {"latitude" : map.getCenter().lat(), "longitude" : map.getCenter().lng()};
    
    log("showCloserItemsOnMap -> lBase : " + JSON.stringify(lBase));
    
    var lArray = getCloserItemsFromList(listItems, lBase);
    
    if (lArray.length > 9)
        lArray = lArray.slice(0, 10);
    
    log("showCloserItemsOnMap -> listItemsMap start : " + listItemsMap.length);
    
    listItemsMap = listItemsMap.concat(lArray);
    
    log("showCloserItemsOnMap -> listItemsMap final : " + listItemsMap.length);
    
    setMapMarker(listItemsMap);
    
    setFitBounds(lArray);
}


function showCellPartner()
{
    var lHeight = getXsize() > 550 ? "190px" : "170px";
    
    if (isCellPartnerVisible)
    {
        $("#introCellPartner").css("display", "none");
        $("#titleCellPartner").css("display", "none");
        
        $("#cellPartner").animate({
                                  width: "0px",
                                  height : "0px"
                                }, 500, 'linear', function()
                                {
                                  isCellPartnerVisible = false;
                                });
    }
    else
    {
        $("#cellPartner").animate({
                                  width: "240px",
                                  height : lHeight
                                  }, 500, 'linear', function()
                                  {
                                  isCellPartnerVisible = true;
                                  
                                  $("#introCellPartner").css("display", "inline-block");
                                  $("#titleCellPartner").css("display", "inline-block");
                                  
                                  });
    }
}


function actionOnCircuitsSwiperMove(_arg)
{
    log("onSlideChangeEnd -> index : " + mSwiperCircuits.activeIndex);
    
    var lNumber = _arg == null ? mSwiperCircuits.activeIndex : _arg;
    
    var lLat = mCircuitsArray[lNumber].latitude;
    var lLon = mCircuitsArray[lNumber].longitude;
    
    var lPan = 0.001;

    if (getXsize() < 400)
        lPan = 0.003;
    else
    if (getXsize() > getYsize())
        lPan = 0.01;
    
    
    //****************** remove ***********************
    
    log("onSlideChangeEnd -> mIndexLastSelectedCircuitMarker 1 : " + mIndexLastSelectedCircuitMarker);
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        map.panTo([lLat, lLon]);
        
        if (lNumber - 1 >= 0)
            map.removeLayer(markerArray[lNumber - 1]);

        map.removeLayer(markerArray[lNumber]);
        
        if (lNumber + 1 < markerArray.length)
            map.removeLayer(markerArray[lNumber + 1]);
        
        if (mIndexLastSelectedCircuitMarker != -1)
        {
            if (Math.abs(Math.abs(mIndexLastSelectedCircuitMarker) - Math.abs(lNumber)) > 1)
                map.removeLayer(markerArray[mIndexLastSelectedCircuitMarker]);
        }
        
        
    }
    else
    {
        map.panTo(new google.maps.LatLng(lLat,lLon));
        
        if (lNumber - 1 >= 0)
            markerArray[lNumber - 1].setMap(null);
        
        markerArray[lNumber].setMap(null);
        
        if (lNumber + 1 < markerArray.length)
            markerArray[lNumber + 1].setMap(null);
        
        if (mIndexLastSelectedCircuitMarker != -1)
        {
            if (Math.abs(Math.abs(mIndexLastSelectedCircuitMarker) - Math.abs(lNumber)) > 1)
                markerArray[mIndexLastSelectedCircuitMarker].setMap(null);
        }
    }
    
    
    //****************** Add ***********************
    
    

    if (lNumber - 1 >= 0)
        placeMarker(listItemsMap[lNumber - 1], lNumber - 1, "replace");
    
    placeMarker(listItemsMap[lNumber], lNumber, "Selected2");
    
    if (lNumber + 1 < markerArray.length)
        placeMarker(listItemsMap[lNumber + 1], lNumber + 1, "replace");
    
    if (mIndexLastSelectedCircuitMarker != -1)
    {
        if (Math.abs(Math.abs(mIndexLastSelectedCircuitMarker) - Math.abs(lNumber)) > 1)
            placeMarker(listItemsMap[mIndexLastSelectedCircuitMarker], mIndexLastSelectedCircuitMarker, "replace");
    }
    
    mIndexLastSelectedCircuitMarker = lNumber;
    
    log("onSlideChangeEnd -> mIndexLastSelectedCircuitMarker 2 : " + mIndexLastSelectedCircuitMarker);
    
    
    //****************** border ***********************
    
    var lSwipeArray = $(".swiper-slide_map");
    
    for (var i = 0; i < lSwipeArray.length; i++)
    {
        if (i == lNumber)
        {
            $(lSwipeArray[i]).css("border-top", "red solid 5px");
            $(lSwipeArray[i]).css("border-left", "red solid 5px");
            $(lSwipeArray[i]).css("border-right", "red solid 5px");
            
            //$(lSwipeArray[lNumber]).css("width", "308px");
            //$(lSwipeArray[lNumber]).css("height", "164px");
            
        }
        else
        {
            $(lSwipeArray[i]).css("border-top", "#000 solid 1px");
            $(lSwipeArray[i]).css("border-left", "#000 solid 1px");
            $(lSwipeArray[i]).css("border-right", "#000 solid 1px");
            
            //$(lSwipeArray[i]).css("width", "318px");
            //$(lSwipeArray[i]).css("height", "169px");
        }
    }
    
    setTimeout(function(){
               if (isCellPartnerVisible)
               showCellPartner();
               }, 1000);
}


function showCircuitsSwiper()
{
    if (isCircuitsSwiperVisible)
    {
        $(".introCellCircuitsSwiper").css("display", "none");
        $(".titleCellCircuitsSwiper").css("display", "none");
        
        $("#circuitsSwiper").animate({
                                     width : "0px",
                                     height : "0px"
                                  }, 500, 'linear', function()
                                  {
                                  isCircuitsSwiperVisible = false;
                                     
                                     $("#btnSwiperOffOn").attr("src", "Assets/btn_swiper_on.png");
                                  });
    }
    else
    {
        if (isApp && !isGoogleSelected && !isRestrictedAndroid)
            removeAllLeafletPopUp();
        else
            removeAllInfowindow();
        
        var lHeight = getXsize() > 700 ? "170px" : "120px";
        
        $("#circuitsSwiper").animate({
                                     width : "100%",
                                    height : lHeight,
                                     
                                  }, 500, 'linear', function()
                                  {
                                  isCircuitsSwiperVisible = true;
                                  
                                  $(".introCellCircuitsSwiper").css("display", "inline-block");
                                  $(".titleCellCircuitsSwiper").css("display", "inline-block");
                                     
                                  $("#btnSwiperOffOn").attr("src", "Assets/btn_swiper_off.png");
                                  
                                  });
    }
}


/*
 var map = ...;
 google.maps.event.addListener(map, 'click', function (event) {
 $('input.latitude').val(event.latLng.lat());
 $('input.longitude').val(event.latLng.lng());
 });

map.getCenter();
*/
