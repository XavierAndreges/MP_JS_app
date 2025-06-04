
function toRad(Value) {
	return parseFloat(Value) * Math.PI / 180;
}


function calculDistanceBetweenItems(_item, _base)
{
	//log("lat : " + _item.latitude + " / long : " + _item.longitude);
	
	var R = 6371; // km
	
	var dLat = toRad((_item.latitude - _base.latitude));
	var dLon = toRad((_item.longitude - _base.longitude));
	var lat1 = toRad(_base.latitude);
	var lat2 = toRad(_item.latitude);
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	
    //log("calculDistanceBetweenItems : " + (R * c));
    
	return d = R * c;
}


function getTimeAndDistanceFromGoogleMatrix(_type, n, _typeTransport)
{	
	requested_transport = _typeTransport;
	requested_n = n;
	requested_type = _type
	
    log("getTimeAndDistanceFromGoogleMatrix : requested_type / requested_n / requested_transport")
	log(requested_type + ' / ' + requested_n + ' / ' + requested_transport);
	
	if (isGoogleMapAPIalreadyLaunched == false)
	{
		setGoogleMapAPI();
	}
	else
	{
		var marseille = new google.maps.LatLng(43.296269, 5.369911);
		var aix = new google.maps.LatLng(43.526398,5.445571);
		
		var bec = new google.maps.LatLng(43.1606, 5.60483);
		var pons = new google.maps.LatLng(43.2928, 5.65407);
		
		var lItem;
        
        var currentRequestedId = requested_transport + '_' + requested_type + '_' + requested_n;
        
        switch (requested_transport)
        {
            case "pied" :
                $("#" + currentRequestedId).html(commonLabel[currentLang].loader);
                break;
                
            case "velo" :
                $("#" + currentRequestedId).html(commonLabel[currentLang].loader);
                break;
                
            case "moto" :
                $("#" + currentRequestedId).html(commonLabel[currentLang].loader);
                break;
                
            case "auto" :
                $("#" + currentRequestedId).html(commonLabel[currentLang].loader);
                break;
        }
		
		switch (requested_type)
		{
			case "Restaurants" :
				lItem = optionSliderRestaurantsArray[requested_n];
				break;
				
			case "Services" :
				lItem = optionSliderServicesArray[requested_n];
				break;
				
			case "Hotels" :
				lItem = optionSliderHotelsArray[requested_n];
				break;
				
			case "MP2013" :
				lItem = optionSliderMP2013Array[requested_n];
				break;
		}
		
        log("getTimeAndDistanceFromGoogleMatrix : lItem");
		log(lItem);
		
		var lTravelMode;
		
		switch (requested_transport)
		{
			case "pied" :
				lTravelMode = google.maps.TravelMode.WALKING;
				break;
				
			case "velo" :
				lTravelMode = google.maps.TravelMode.WALKING;
				break;
				
			case "moto" :
				lTravelMode = google.maps.TravelMode.DRIVING;
				break;
				
			case "auto" :
				lTravelMode = google.maps.TravelMode.DRIVING;
				break;
		}
		
		var service = new google.maps.DistanceMatrixService();
		
		service.getDistanceMatrix(
								  {
								  //origins: [marseille, aix],
								  origins: setLatLongItemsWithArray([listItems[currentItemDetail]]),
								  destinations: setLatLongItemsWithArray([lItem]),
								  travelMode: lTravelMode,
								  avoidHighways: false,
								  avoidTolls: false
								  }, callbackTimeAndDistanceFromGoogleMatrix);
	}
}


function setLatLongItemsWithArray(_array)
{
	var lItemArray = [];
	
	for (var i = 0; i < _array.length; i++)
	{
		var item = new google.maps.LatLng(parseFloat(_array[i].latitude), parseFloat(_array[i].longitude));
		lItemArray.push(item);
	}
	
	return lItemArray;
}


function launchDistanceMatrixServiceRequest()
{
    setTimeout(function(){

               if (!isLoadingAnimation)
                    setLoadingAnimation(0.5);
               
               if (isLittleModalPopUp)
                    showLittleModalPopUp();
               
               if (currentActivity == "NoIdea")
                    showLittleModalPopUp("progressBar", commonLabel[currentLang].downloading, "homeSearch");
               
               }, 400);
    
    lGoogleDistanceArray = setLatLongItemsWithArray(tempBaseActivityItemsList);
    
    lastLimitGoogleDistanceArray = 0;
    
    log("launchDistanceMatrixServiceRequest -> lastLimitGoogleDistanceArray : " + lastLimitGoogleDistanceArray)
    
    if (currentTransport == "pied" || currentTransport == "velo")
        getTimeAndDistanceForWalking(0);
    
    if (currentTransport == "auto" || currentTransport == "moto")
        getTimeAndDistanceForDriving(0);
}


function callbackTimeAndDistanceFromGoogleMatrix(response, status)
{
	log("status : " + status);
	
	if (status == google.maps.DistanceMatrixStatus.OK)
	{
		var origins = response.originAddresses;
		var destinations = response.destinationAddresses;
		
		for (var i = 0; i < origins.length; i++)
		{
			var results = response.rows[i].elements;
			
			for (var j = 0; j < results.length; j++)
			{
				var element = results[j];
				var distance = element.distance.text;
				var durationText = element.duration.text;
				var distanceValue = element.distance.value;
				//var durationValue = element.duration.value;
				var durationValue = Math.ceil(element.duration.value/60);
				var from = origins[i];
				var to = destinations[j];
				
				log("from : " + from + " to : " + to + " / distance : " + distance + " / duration : " + durationText);
				
				var currentRequestedId = requested_transport + '_' + requested_type + '_' + requested_n;
				
				switch (requested_transport)
				{
					case "pied" :
						$("#" + currentRequestedId).html(durationValue + " mn");
						break;
						
					case "velo" :
						$("#" + currentRequestedId).html(Math.ceil(distanceValue*60/17000) + " mn");
						break;
						
					case "moto" :
						$("#" + currentRequestedId).html(durationValue + " mn");
						break;
						
					case "auto" :
						$("#" + currentRequestedId).html((durationValue + 10) + " mn");
						break;
				}
			}
		}
	}
}


function getTimeAndDistanceForWalking(_index)
{
     log("getTimeAndDistanceForWalking -> lArray");
    
    if (!isLikeMobile)
        $("#itemList").html('<div class="noItemListResult corner">'+
                        commonLabel[currentLang].loader +
                        '</div>');
    
    if(!distanceMatrixService)
        distanceMatrixService = new google.maps.DistanceMatrixService();
    
    var lLimitGoogleDistanceArray;
    
    var nbItems = lGoogleDistanceArray.length - _index;
    
    if (nbItems > 19)
        lLimitGoogleDistanceArray = _index + 20;
    else
        lLimitGoogleDistanceArray = _index + nbItems;
    
    var lArray = lGoogleDistanceArray.slice(_index, lLimitGoogleDistanceArray);
    
    log(lArray);
    
    var originsArray = [];
    
    if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
    {
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        originsArray = [new google.maps.LatLng(parseFloat(lUserPosition.latitude), parseFloat(lUserPosition.longitude))];
    }
    else
        originsArray = [new google.maps.LatLng(parseFloat(cityGeoLoc[cityBtnArray[currentCity]].latitude), parseFloat(cityGeoLoc[cityBtnArray[currentCity]].longitude))];
        
    distanceMatrixService.getDistanceMatrix(
                              {
                              origins: originsArray,
                              destinations: lArray,
                              travelMode: google.maps.TravelMode.WALKING,
                              avoidHighways: false,
                              avoidTolls: false
                              }, callbackTimeAndDistanceForWalking);
}


function callbackTimeAndDistanceForWalking(response, status)
{
    log("callbackTimeAndDistanceForWalking - > response :");
    log(response);
    log(status);
    
    if (status == google.maps.DistanceMatrixStatus.OK)
    {
        piedTimeListItems = [];
        veloTimeListItems = [];
        
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        
        for (var i = 0; i < origins.length; i++)
        {
            var results = response.rows[i].elements;
            
            for (var j = 0; j < results.length; j++)
            {
                var pied;
                //var velo;
                
                if (results[j].status != "OK")
                {
                    pied = -1;
                    velo = -1;
                }
                else
                {
                    var element = results[j];
                    var distanceText = element.distance.text;
                    var distanceValue = element.distance.value;
                    var durationText = element.duration.text;
                    var durationValue = element.duration.value/60;
                    var from = origins[i];
                    var to = destinations[j];
                    
                    pied =  Math.round(durationValue);
                    //velo = Math.round(distanceValue*60/17000);
                }
                
                //log(" to : " + to + " / distance : " + distanceText + " / à pied : " + durationText + " : " + Math.round(durationValue) + " / velo : " + Math.round(distanceValue*60/17000));
                
                //piedTimeListItems.push(pied);
                //veloTimeListItems.push(velo);
                
                tempBaseActivityItemsList[lastLimitGoogleDistanceArray++].costWalk = pied;
            }
        }
        
        //log(piedTimeListItems);
        //log(veloTimeListItems);
        
        log("lastLimitGoogleDistanceArray : " + lastLimitGoogleDistanceArray + " | tempBaseActivityItemsList : " + tempBaseActivityItemsList.length);
        
        if (lastLimitGoogleDistanceArray < tempBaseActivityItemsList.length)
        {
            var lDuration = 0;
            
            if (lastLimitGoogleDistanceArray >= 100)
                lDuration = 2000;
            
            if (!isLoadingAnimation)
                setLoadingAnimation(0.5);
            
            if (currentActivity == "NoIdea")
            {
                var perCent = lastLimitGoogleDistanceArray / tempBaseActivityItemsList.length * 100;
                $("#progressBar").width(perCent + "%");
            }
            
            setTimeout(function(){
                       getTimeAndDistanceForWalking(lastLimitGoogleDistanceArray);
                       }, lDuration);
        }
        else
        {
            $("#itemList").html("");
            isCellShowTime = true;
            filterListItemsByTransport('costWalk');
            setListItemAndScrollBar();
            
            if (isLittleModalPopUp)
                showLittleModalPopUp();
            
            removeLoadingAnimation();
        }
    }
    else
    {
        log("callbackTimeAndDistanceForDriving : end or Not ok");
        removeLoadingAnimation();
        
        if (isLittleModalPopUp)
            showLittleModalPopUp();
    }
}


function getTimeAndDistanceForDriving(_index)
{
    log("getTimeAndDistanceForDriving");
    
    if (!isLikeMobile)
        $("#itemList").html('<div class="noItemListResult corner">'+
                        commonLabel[currentLang].loader +
                        '</div>');
    
    if(!distanceMatrixService)
        distanceMatrixService = new google.maps.DistanceMatrixService();
    
    var lLimitGoogleDistanceArray;
    
    var nbItems = lGoogleDistanceArray.length - _index;
    
    if (nbItems > 19)
        lLimitGoogleDistanceArray = _index + 20;
    else
        lLimitGoogleDistanceArray = _index + nbItems;
    
    var lArray = lGoogleDistanceArray.slice(_index, lLimitGoogleDistanceArray);
    
    log(lArray);
    
    var originsArray = [];
    
    if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
    {
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        originsArray = [new google.maps.LatLng(parseFloat(lUserPosition.latitude), parseFloat(lUserPosition.longitude))];
    }
    else
        originsArray = [new google.maps.LatLng(parseFloat(cityGeoLoc[cityBtnArray[currentCity]].latitude), parseFloat(cityGeoLoc[cityBtnArray[currentCity]].longitude))];
    
    distanceMatrixService.getDistanceMatrix(
                              {
                              origins: originsArray,
                              destinations: lArray,
                              travelMode: google.maps.TravelMode.DRIVING,
                              avoidHighways: false,
                              avoidTolls: false
                              }, callbackTimeAndDistanceForDriving);
}


function callbackTimeAndDistanceForDriving(response, status)
{
    log("callbackTimeAndDistanceForDriving -> response : " + JSON.stringify(response) + " / status : " + JSON.stringify(status));

    
    if (status == google.maps.DistanceMatrixStatus.OK)
    {
        motoTimeListItems = [];
        autoTimeListItems = [];
        
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        
        for (var i = 0; i < origins.length; i++)
        {
            var results = response.rows[i].elements;
            
            for (var j = 0; j < results.length; j++)
            {
                //var moto;
                var auto;
                
                if (results[j].status != "OK")
                {
                    //moto = -1;
                    auto = -1;
                }
                else
                {
                    var element = results[j];
                    var distanceText = element.distance.text;
                    var distanceValue = element.distance.value;
                    var durationText = element.duration.text;
                    var durationValue = element.duration.value/60;
                    var from = origins[i];
                    var to = destinations[j];
                }
                
                
                //moto = Math.round(durationValue);
                auto = Math.round(durationValue+5);
                
                //log(" to : " + to + " / distance : " + distanceText + " / à moto : " + durationText + " - " + Math.round(durationValue) + " / en auto : " + Math.round(durationValue+5));
                
                //motoTimeListItems.push(moto);
                //autoTimeListItems.push(auto);
                
                tempBaseActivityItemsList[lastLimitGoogleDistanceArray++].costCar = auto;
            }
        }
        
        //log(motoTimeListItems);
        //log(autoTimeListItems);
        
        log("lastLimitGoogleDistanceArray : " + lastLimitGoogleDistanceArray + " | tempBaseActivityItemsList : " + tempBaseActivityItemsList.length);
        
        if (lastLimitGoogleDistanceArray < tempBaseActivityItemsList.length)
        {
            var lDuration = 0;

            if (lastLimitGoogleDistanceArray >= 100)
                lDuration = 2000;
            
            log("callbackTimeAndDistanceForDriving : isLoadingAnimation : " + isLoadingAnimation);

            if (!isLoadingAnimation)
                setLoadingAnimation(0.5);
            
            if (currentActivity == "NoIdea")
            {
                var perCent = lastLimitGoogleDistanceArray / tempBaseActivityItemsList.length * 100;
                $("#progressBar").width(perCent + "%");
            }
            
            setTimeout(function(){
                       
                        getTimeAndDistanceForDriving(lastLimitGoogleDistanceArray);
                       
                       }, lDuration);
        }
        else
        {
            $("#itemList").html("");
            isCellShowTime = true;
            filterListItemsByTransport('costCar');
            setListItemAndScrollBar();
            
            if (isLittleModalPopUp)
                showLittleModalPopUp();
            
            removeLoadingAnimation();
        }
    }
    else
    {
        log("callbackTimeAndDistanceForDriving : end or Not ok");
        removeLoadingAnimation();
        
        if (isLittleModalPopUp)
            showLittleModalPopUp();
    }
}


function getSingleTimeAndDistanceFromGoogleMatrix(_id, _lat, _long, _typeTransport)
{
    requested_transport = _typeTransport;
    requested_id = _id;
    
	if (isGoogleMapAPIalreadyLaunched == false)
	{
		setGoogleMapAPI();
	}
	else
	{
        $("#" + _typeTransport + "_" + _id).html(commonLabel[currentLang].loader);
		
		
		var lTravelMode;
		
		switch (_typeTransport)
		{
			case "pied" :
				lTravelMode = google.maps.TravelMode.WALKING;
				break;
				
			case "velo" :
				lTravelMode = google.maps.TravelMode.WALKING;
				break;
				
			case "moto" :
				lTravelMode = google.maps.TravelMode.DRIVING;
				break;
				
			case "auto" :
				lTravelMode = google.maps.TravelMode.DRIVING;
				break;
		}
		
		var service = new google.maps.DistanceMatrixService();
        
        var lItem = new google.maps.LatLng(parseFloat(_lat), parseFloat(_long));
		
		service.getDistanceMatrix(
								  {
								  origins: setLatLongItemsWithArray([listItems[currentItemDetail]]),
								  destinations: [lItem],
								  travelMode: lTravelMode,
								  avoidHighways: false,
								  avoidTolls: false
								  }, callbackSingleTimeAndDistanceFromGoogleMatrix);
	}
}


function callbackSingleTimeAndDistanceFromGoogleMatrix(response, status)
{
	log("status : " + status);
    
    log (response);
	
	if (status == google.maps.DistanceMatrixStatus.OK)
	{
		var origins = response.originAddresses;
		var destinations = response.destinationAddresses;
		
		for (var i = 0; i < origins.length; i++)
		{
			var results = response.rows[i].elements;
			
			for (var j = 0; j < results.length; j++)
			{
				var element = results[j];
				var distance = element.distance.text;
				var durationText = element.duration.text;
				var distanceValue = element.distance.value;
				//var durationValue = element.duration.value;
				var durationValue = Math.ceil(element.duration.value/60);
				var from = origins[i];
				var to = destinations[j];
				
				log("from : " + from + " to : " + to + " / distance : " + distance + " / duration : " + durationText);
                
                var currentRequestedId = requested_transport + '_' + requested_id;
				
				switch (requested_transport)
				{
					case "pied" :
						$("#" + currentRequestedId).html(durationValue + " mn");
						break;
						
					case "velo" :
						$("#" + currentRequestedId).html(Math.ceil(distanceValue*60/17000) + " mn");
						break;
						
					case "moto" :
						$("#" + currentRequestedId).html(durationValue + " mn");
						break;
						
					case "auto" :
						$("#" + currentRequestedId).html((durationValue + 10) + " mn");
						break;
				}
			}
		}
	}
}
