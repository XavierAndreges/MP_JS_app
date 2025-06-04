function setLink(_link, _text, _class)
{    
    var lLink;
    
    if (_class == null)
        _class = "";
    
    //log("setLink 2 -> _link : " + _link + " / _text : " + _text + " / _class : " + _class);
    
    lLink = '<a class="' + _class + '" onclick="showLittleModalPopUp(\'exitApp\', null, \'' + _link  + '\');">' + _text + '</a>';
    
    //log("setLink -> lLink : " + lLink);
    
    return lLink;
}


function openLink(_link)
{
    if (_link == "killApp")
    {
        navigator.app.exitApp();
        return;
    }
    
    var lLink = _link;

    log("openLink -> lLink : " + lLink);
    
    if (isApp)
    {
        if (isAndroid)
            navigator.app.loadUrl(lLink, {openExternal : true});
        else
            window.open(lLink, '_system');
    }
    else
        window.open(lLink, '_blank');
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    setGAtrackEventForWebSite(_link);
}


function getCloserItemsFromList(list, _base, _type)
{
    var lArray = [];
    
    var nbRayon = 10; // 1 rayon = 500m
    
    var nbVelo = 0;
    var nbParking = 0;
    var nbMetroTram = 0
    
    //************* test if item is in city bound ***************
    
    var isInCity = false;
    
    for (var i = 0; i < cityBoundsArray.length; i++)
    {
        if (getInsideBound(cityBoundsArray[i].split(","), _base.latitude, _base.longitude, 0) == true)
            isInCity = true;
    }
    
    //************* set the nbRayon ***************
    
    if (_type)
    {
        switch (_type)
        {
            case "Items" : nbRayon = isInCity ? 1 : 10; break;
            case "Restaurants" : nbRayon = isInCity ? 0.5 : 10; break;
            case "Hotels" : nbRayon = isInCity ? 0.5 : 10; break;
            case "Services" : nbRayon = isInCity ? 2 : 10; break;
            default : nbRayon = 10;
        }
    }
    else
    if (currentTable == "Restaurants" && isInCity)
        nbRayon = 1;
    
    log("getCloserItemsFromList -> nbRayon : " + nbRayon);
    
    //************* push items ***************
    
    for (var i = 0; i < list.length; i++)
    {
        var lNbRayon;
        
        if (_base.idRepName == "EtangBonde" || _base.idRepName == "BuouxEscalade")
            lNbRayon = 40;
        else
        if (_base.idRepName == "MACMarseille")
            lNbRayon = 3;
        else
        if (_type == "Items" && list[i].city.indexOf("Aix") != -1)
            lNbRayon = 10;
        else
            lNbRayon = nbRayon;
                
        if (isItemVeryClose(list[i], _base, lNbRayon))
        {
            if (_type == "Items" && list[i].idRepName == _base.idRepName)
                continue;
            
            lArray.push(list[i]);
        }
    }
    
    log("getCloserItemsFromList -> lArray : " + lArray.length);
    
    //************* Metro tram parking ***************
    
    var lServiceArray = [];
    var lServiceArrayFinal = [];
    
    if (_type == "Services")
    {
        var _lServiceArray = listItemsMetroTram.concat(listItemsVeloMPM, listItemsParkings);
    
        for (var i = 0; i < _lServiceArray.length; i++)
        {
            if (isItemVeryClose(_lServiceArray[i], _base, 1))
            {
                lServiceArray.push(_lServiceArray[i]);
            }
        }
        
        lServiceArray = lServiceArray.sort(function (a,b) { return ((calculDistanceBetweenItems(a, _base) <= calculDistanceBetweenItems(b, _base)) ? -1 : 1)});
        
        for (var i = 0; i < lServiceArray.length; i++)
        {
             if (lServiceArray[i].type == "VeloMPM")
             {
                 if (nbVelo > 0)
                    continue;
                 else
                     lServiceArrayFinal.push(lServiceArray[i]);
                 
                 ++nbVelo;
             }
             else
             if (lServiceArray[i].type == "MetroTram")
             {
                 if (nbMetroTram > 0)
                    continue;
                 else
                     lServiceArrayFinal.push(lServiceArray[i]);
                 
                 ++nbMetroTram;
             }
             else
             if (lServiceArray[i].type == "cdt:ParkingPublic")
             {
                 if (nbParking > 0)
                     continue;
                 else
                     lServiceArrayFinal.push(lServiceArray[i]);
                 
                 ++nbParking;
             }
        }
        
        if (lServiceArrayFinal.length > 3)
            lServiceArrayFinal = lServiceArrayFinal.slice(0,4);
        else
            lServiceArrayFinal = lServiceArrayFinal.slice(0, lServiceArrayFinal.length);
        
        lArray = lArray.concat(lServiceArrayFinal);
    }
    
    //************* sort ***************
    
    lArray = lArray.sort(function (a,b) { return ((calculDistanceBetweenItems(a, _base) <= calculDistanceBetweenItems(b, _base)) ? -1 : 1)});
    
    if (lArray.length > 10)
        lArray = lArray.slice(0, 10);
    
    return lArray;
}


function isItemVeryClose(_item, _base, _rayon)
{
    //1° de latitude = 111,11km -> 0.5 km = 0.0045;
    // 1° de londitude à 43° de latitude = 111,11 * cos 43 = 111,11 * 0.731 = 81.221 km -> 0.5 km = 0.0061;
    
	//Rayon de 500m en longitude
	var long500 = 0.0061;
	
	//Rayon de 500m en latitude
	var lat500 = 0.0045;
    
    var nbRayon = _rayon;

	var longMin = parseFloat(_base.longitude) - long500*nbRayon;
	var longMax = parseFloat(_base.longitude) + long500*nbRayon;
	var latMin = parseFloat(_base.latitude) - lat500*nbRayon;
	var latMax = parseFloat(_base.latitude) + lat500*nbRayon;
	
	//log(list);
	//log('_base.latitude : ' + _base.latitude + ' / _base.longitude : ' + _base.longitude);
	//log('latMax : ' + latMax + ' / latMin ' + latMin + ' / longMax : ' + longMax + ' / longMin : ' + longMin);
    
	if (_item.longitude < longMax && _item.longitude > longMin && _item.latitude < latMax && _item.latitude > latMin)
	{
		return true;
	}
	else
	{
		return false;
	}
}


function getArrayForCloseItemsFromList(list, _base, _distanceMax)
{
    //log("getArrayForCloseItemsFromList : ");
    //log("getArrayForCloseItemsFromList : " + list);
    
    
	var tempArray = [];
	var temp2Array = [];
	
    /*
    if (_distanceMax == null)
    {
     //Rayon de 500m en longitude
     var long500 = 0.0061;
     
     //Rayon de 500m en latitude
     var lat500 = 0.0045;
        
        var nbRayon = 300;
        
        var longMin = parseFloat(_base.longitude) - long500*nbRayon;
        var longMax = parseFloat(_base.longitude) + long500*nbRayon;
        var latMin = parseFloat(_base.latitude) - lat500*nbRayon;
        var latMax = parseFloat(_base.latitude) + lat500*nbRayon;
        
        //log(list);
        //log('_base.latitude : ' + _base.latitude + ' / _base.longitude : ' + _base.longitude);
        //log('latMax : ' + latMax + ' / latMin ' + latMin + ' / longMax : ' + longMax + ' / longMin : ' + longMin);
        
        
        for (var i = 0; i < list.length; i++)
        {
            if (list[i] != listItems[currentItemDetail]
                && parseFloat(list[i].longitude) < longMax && parseFloat(list[i].longitude) > longMin && parseFloat(list[i].latitude) < latMax && parseFloat(list[i].latitude) > latMin)
            {
                tempArray.push(list[i]);
            }
        }
    }
    else
     */
    
    if (_distanceMax != null && _distanceMax != "options")
    {
        for (var i = 0; i < list.length; i++)
        {            
            if (calculDistanceBetweenItems(list[i], _base) < _distanceMax)
            {
                tempArray.push(list[i]);
            }
        }
    }
    else
        tempArray = list;
    
    //log("tempArray 1");
	//log(tempArray);
	
    
    tempArray.sort(function (a,b) { return ((calculDistanceBetweenItems(a, _base) <= calculDistanceBetweenItems(b, _base)) ? -1 : 1)});
	
    //log("tempArray 2");
	//log(tempArray);
    
    var lIndexToStart = 0;
    var lLimit = tempArray.length;
    
    if (_distanceMax == "options" && tempArray.length >= 19)
        lLimit = 20;
    
    //********* To exclude the currentItemDetail **************
    
    if (tableArray.indexOf(_base.table) != -1)
    {
        lIndexToStart++;
        
        if (_distanceMax == "options" && tempArray.length >= 20)
            lLimit++;
    }
    
    //***************************************************
	
	for (var i = lIndexToStart; i < lLimit; i++)
	{
		temp2Array.push(tempArray[i]);
	}
	
    //log("getArrayForCloseItemsFromList -> temp2Array : ");
	//log(temp2Array);
	
	return temp2Array;
}



function filterMP2013WithBase(_base)
{
	return tempArray2 = getArrayForCloseItemsFromList(filterMP2013(), listItems[currentItemDetail]);
}


function filterMP2013()
{
	log("currentDate : " + currentDate + " /  currentSousType : " + currentSousType + " / currentFilter : " + currentFilter);
	
	var tempArray = [];
	var tempArrayBigExpo = [];
	var tempArrayBigExpo = [];
	
	var tempArray2 = [];
	var tempArray2Name = [];
	var nb = 0;
	var oneDay = 24*60*60*1000;
	
	
	if (isBigExpo)
	{
		tempArray = listItemsMP2013;
		
		for (var i = 0; i < tempArray.length && nb < 26; i++)
		{
			var date_start = getTimestamp(tempArray[i].date_start);
			var date_end = getTimestamp(tempArray[i].date_end);
			
			if (tempArray[i].soustype.indexOf(currentSousType) != -1
				&& date_end - date_start >= oneDay*30 && date_end - date_start < oneDay*150 && date_end - currentDate.getTime() >= 0)
			{
				var isOk = false;
				
				switch (currentFilter)
				{
					case "nocturne" :
					{
						if (tempArray[i].date_fr.indexOf(currentFilter) != -1 || tempArray[i].moreInfo.indexOf(currentFilter) != -1)
							isOk = true;
					};
						break;
                        
						
					case "free" :
					{
						if (tempArray[i].isFree == "true")
							isOk = true;
					}
						break;
						
					case "endIn7days" :
					{
						if (date_end - currentDate.getTime() >= 0 && date_end - currentDate.getTime() < oneDay*7)
							isOk = true;
					}
						break;
						
					case "endIn14days" :
					{
						if (date_end - currentDate.getTime() >= 0 && date_end - currentDate.getTime() < oneDay*14)
							isOk = true;
					}
						break;
						
					case "" :
					{
						isOk = true;
					}
						break;
				}
				
				if (isFree && tempArray[i].isFree == "false")
					isOk = false;
				
				if (isOk)
				{
					tempArray2.push(tempArray[i]);
					nb++;
				}
			}
		}
        
		if (currentFilter == "endIn14days")
			tempArray2.sort(function (a,b) { return getTimestamp(a.date_end) <= getTimestamp(a.date_end) ? -1 : 1});
	}
	else
	{
		if (currentActivity != -1 && currentSousType != -1)
		{
            log("1");
            
			for (var n = 0; n < listItemsMP2013.length; n++)
			{
				if (listItemsMP2013[n].soustype.indexOf(currentSousType) != -1 && (currentCity == -1 || cityBtnArray[currentCity] == "Geoloc"))
				{
					if (isFree && listItemsMP2013[n].isFree == "true")
						tempArray.push(listItemsMP2013[n]);
					
					if (!isFree)
						tempArray.push(listItemsMP2013[n]);
				}
				else
                    if (listItemsMP2013[n].soustype.indexOf(currentSousType) != -1 && cityBtnArray[currentCity] != "Geoloc"
                        && listItemsMP2013[n].city.indexOf(cityBtnArray[currentCity]) != -1)
                    {
                        if (isFree && listItemsMP2013[n].isFree == "true")
                            tempArray.push(listItemsMP2013[n]);
                        
                        if (!isFree)
                            tempArray.push(listItemsMP2013[n]);
                    }
			}
		}
		else
            if (currentActivity != -1 && currentSousType == -1 && currentCity != -1)
            {
                log("2");
                
                for (var n = 0; n < listItemsMP2013.length; n++)
                {
                    if (cityBtnArray[currentCity] != "Geoloc" && listItemsMP2013[n].city.indexOf(cityBtnArray[currentCity]) != -1)
                    {
                        if (isFree && listItemsMP2013[n].isFree == "true")
                            tempArray.push(listItemsMP2013[n]);
                        
                        if (!isFree)
                            tempArray.push(listItemsMP2013[n]);
                    }
                    else
                    {
                        if (isFree && listItemsMP2013[n].isFree == "true")
                            tempArray.push(listItemsMP2013[n]);
                        
                        if (!isFree)
                            tempArray.push(listItemsMP2013[n]);
                    }
                }
            }
            else
            {
                log("3");
                
                tempArray = listItemsMP2013;
            }
        
        log("tempArray : " + tempArray.length);
		
		//*********** to get items of the day *****************
		
		for (var i = 0; i < tempArray.length && nb < 26; i++)
		{
			var date_start = getTimestamp(tempArray[i].date_start);
			var date_end = getTimestamp(tempArray[i].date_end);
			
			//log("date_start : " + date_start);
			
			var itemIsBigExpo = false;
			
			if (tempArray[i].soustype.indexOf("Arts et Beaux-arts") != -1
				&& date_end - date_start >= oneDay*30 && date_end - date_start < oneDay*150 && date_end - currentDate.getTime() >= 0)
			{
				itemIsBigExpo = true;
			}
			
			if (!itemIsBigExpo && date_start >= currentDate.getTime() && date_start < (currentDate.getTime() + oneDay))
			{
				if (isFree && tempArray[i].isFree == "true")
				{
					tempArray2.push(tempArray[i]);
					tempArray2Name.push(tempArray[i].name_fr);
					nb++;
				}
                
				if (!isFree)
				{
					tempArray2.push(tempArray[i]);
					tempArray2Name.push(tempArray[i].name_fr);
					nb++;
				}
			}
		}
		
		
		//*********** to get items closed the end *****************
		
		for (var i = 0; i < tempArray.length && nb < 26; i++)
		{
			var isInArray = false;
			var date_start = getTimestamp(tempArray[i].date_start);
			var date_end = getTimestamp(tempArray[i].date_end);
			
			var itemIsBigExpo = false;
			
			if (tempArray[i].soustype.indexOf("Arts et Beaux-arts") != -1
				&& date_end - date_start >= oneDay*30 && date_end - date_start < oneDay*150 && date_end - currentDate.getTime() >= 0)
			{
				itemIsBigExpo = true;
			}
			
			if (!itemIsBigExpo && date_end - currentDate.getTime() >= 0 && date_end - currentDate.getTime() < oneDay*7 && $.inArray(tempArray[i].name_fr, tempArray2Name) == -1)
			{
				if (isFree && tempArray[i].isFree == "true")
				{
					tempArray2.push(tempArray[i]);
					nb++;
					isInArray = true;
				}
				
				if (!isFree)
				{
					tempArray2.push(tempArray[i]);
					nb++;
					isInArray = true;
				}
			}
			
			if (!itemIsBigExpo && date_end - currentDate.getTime() >= 0 && date_end - currentDate.getTime() < oneDay*30
				&& $.inArray(tempArray[i].name_fr, tempArray2Name) == -1 && !isInArray)
			{
				if (isFree && tempArray[i].isFree == "true")
				{
					tempArray2.push(tempArray[i]);
					nb++;
					isInArray = true;
				}
				
				if (!isFree)
				{
					tempArray2.push(tempArray[i]);
					nb++;
					isInArray = true;
				}
			}
			
			if (!itemIsBigExpo && tempArray2.length < 26 && date_start >= currentDate.getTime() + oneDay
				&& $.inArray(tempArray[i].name_fr, tempArray2Name) == -1 && !isInArray)
			{
				if (isFree && tempArray[i].isFree == "true")
				{
					tempArray2.push(tempArray[i]);
					nb++;
				}
				
				if (!isFree)
				{
					tempArray2.push(tempArray[i]);
					nb++;
				}
				
			}
		}
	}
	
	log("nb filter MP2013 : " + tempArray2.length);
	
	return tempArray2;
}


function launchMP2013WithSousType(_soustype)
{
	currentSousType = _soustype;
    
    if (currentSousType != "")
		$("#btnTypeMP2013").html(typeMP2013Label[currentLang].genres + "*");
	else
		$("#btnTypeMP2013").html(typeMP2013Label[currentLang].genres);
    
	setMainSelectionItemsList("MP2013");
	
	if (isLikeMobile)
	{
		setItemList();
	}
}


function launchBigExpoFilter(_filter)
{
	currentFilter = _filter;
	setMainSelectionItemsList("Expo");
	
	log("currentFilter : " + currentFilter)
	
	if (currentFilter != "")
		$("#btnFilterMP2013").html(commonLabel[currentLang].filters + "*");
	else
		$("#btnFilterMP2013").html(commonLabel[currentLang].filters);
	
	if (isLikeMobile)
	{
		setItemList();
	}
}


function launchFreeMP2013()
{
	isFree = !isFree;
	
	isFreeMode = true;
	
	if (isBigExpo)
		setMainSelectionItemsList("Expo");
	else
		setMainSelectionItemsList("MP2013");
	
	isFreeMode = false;
	
	if (isFree)
		$("#btnFreeMP2013").html(detailLang[currentLang].free.capitalize() + " *");
	else
		$("#btnFreeMP2013").html(detailLang[currentLang].free.capitalize());
	
	if (isLikeMobile)
	{
		setItemList();
	}
}


function getTimestamp(str)
{
	var d = str.match(/\d+/g); // extract date parts
	return +new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5]); // build Date object
}


function getUnixTimeStamp(d)
{
    return Math.round(+new Date(d)/1000);
}



function initDatePicker()
{
    $.datepicker.setDefaults($.datepicker.regional[currentLang]);
    
    $("#datepicker").datepicker({
                                onSelect: function(date)
                                {
                                    var lDateForm = $("#datepicker").datepicker("getDate");
                                    lDateForm.setHours(0);
                                    lDateForm.setMinutes(0);
                                    
                                    log("currentDate : " + currentDate + "/ datePicker : " + $("#datepicker").datepicker("getDate"));
                                
                                    $("#dateForm").val(getLocaleShortDateString(lDateForm));
                                    
                                    $("#datepicker").fadeOut();
                                    
                                    mDateForm = lDateForm.getUnixTime();
                                    
                                    log("initDatePicker : mDateForm : " + mDateForm);
                                    
                                    /*
                                    var todayDate = new Date();
                                    todayDate.setHours(0);
                                    todayDate.setMinutes(0);

                                    if (currentDate.getYear() == todayDate.getYear()
                                        && currentDate.getMonth() == todayDate.getMonth()
                                        && currentDate.getUTCDate() == todayDate.getUTCDate())
                                    */

                                },
                                maxDate : 0
                                });
    
    $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    
    $( "#datepicker" ).datepicker( "setDate", currentDate);
}


function getLocaleShortDateString(d)
{
	var f={"ar-SA":"dd/MM/yy","bg-BG":"dd.M.yyyy","ca-ES":"dd/MM/yyyy","zh-TW":"yyyy/M/d","cs-CZ":"d.M.yyyy","da-DK":"dd-MM-yyyy","de-DE":"dd.MM.yyyy","el-GR":"d/M/yyyy","en-US":"M/d/yyyy","fi-FI":"d.M.yyyy","fr-FR":"dd/MM/yyyy","he-IL":"dd/MM/yyyy","hu-HU":"yyyy. MM. dd.","is-IS":"d.M.yyyy","it-IT":"dd/MM/yyyy","ja-JP":"yyyy/MM/dd","ko-KR":"yyyy-MM-dd","nl-NL":"d-M-yyyy","nb-NO":"dd.MM.yyyy","pl-PL":"yyyy-MM-dd","pt-BR":"d/M/yyyy","ro-RO":"dd.MM.yyyy","ru-RU":"dd.MM.yyyy","hr-HR":"d.M.yyyy","sk-SK":"d. M. yyyy","sq-AL":"yyyy-MM-dd","sv-SE":"yyyy-MM-dd","th-TH":"d/M/yyyy","tr-TR":"dd.MM.yyyy","ur-PK":"dd/MM/yyyy","id-ID":"dd/MM/yyyy","uk-UA":"dd.MM.yyyy","be-BY":"dd.MM.yyyy","sl-SI":"d.M.yyyy","et-EE":"d.MM.yyyy","lv-LV":"yyyy.MM.dd.","lt-LT":"yyyy.MM.dd","fa-IR":"MM/dd/yyyy","vi-VN":"dd/MM/yyyy","hy-AM":"dd.MM.yyyy","az-Latn-AZ":"dd.MM.yyyy","eu-ES":"yyyy/MM/dd","mk-MK":"dd.MM.yyyy","af-ZA":"yyyy/MM/dd","ka-GE":"dd.MM.yyyy","fo-FO":"dd-MM-yyyy","hi-IN":"dd-MM-yyyy","ms-MY":"dd/MM/yyyy","kk-KZ":"dd.MM.yyyy","ky-KG":"dd.MM.yy","sw-KE":"M/d/yyyy","uz-Latn-UZ":"dd/MM yyyy","tt-RU":"dd.MM.yyyy","pa-IN":"dd-MM-yy","gu-IN":"dd-MM-yy","ta-IN":"dd-MM-yyyy","te-IN":"dd-MM-yy","kn-IN":"dd-MM-yy","mr-IN":"dd-MM-yyyy","sa-IN":"dd-MM-yyyy","mn-MN":"yy.MM.dd","gl-ES":"dd/MM/yy","kok-IN":"dd-MM-yyyy","syr-SY":"dd/MM/yyyy","dv-MV":"dd/MM/yy","ar-IQ":"dd/MM/yyyy","zh-CN":"yyyy/M/d","de-CH":"dd.MM.yyyy","en-GB":"dd/MM/yyyy","es-MX":"dd/MM/yyyy","fr-BE":"d/MM/yyyy","it-CH":"dd.MM.yyyy","nl-BE":"d/MM/yyyy","nn-NO":"dd.MM.yyyy","pt-PT":"dd-MM-yyyy","sr-Latn-CS":"d.M.yyyy","sv-FI":"d.M.yyyy","az-Cyrl-AZ":"dd.MM.yyyy","ms-BN":"dd/MM/yyyy","uz-Cyrl-UZ":"dd.MM.yyyy","ar-EG":"dd/MM/yyyy","zh-HK":"d/M/yyyy","de-AT":"dd.MM.yyyy","en-AU":"d/MM/yyyy","es-ES":"dd/MM/yyyy","fr-CA":"yyyy-MM-dd","sr-Cyrl-CS":"d.M.yyyy","ar-LY":"dd/MM/yyyy","zh-SG":"d/M/yyyy","de-LU":"dd.MM.yyyy","en-CA":"dd/MM/yyyy","es-GT":"dd/MM/yyyy","fr-CH":"dd.MM.yyyy","ar-DZ":"dd-MM-yyyy","zh-MO":"d/M/yyyy","de-LI":"dd.MM.yyyy","en-NZ":"d/MM/yyyy","es-CR":"dd/MM/yyyy","fr-LU":"dd/MM/yyyy","ar-MA":"dd-MM-yyyy","en-IE":"dd/MM/yyyy","es-PA":"MM/dd/yyyy","fr-MC":"dd/MM/yyyy","ar-TN":"dd-MM-yyyy","en-ZA":"yyyy/MM/dd","es-DO":"dd/MM/yyyy","ar-OM":"dd/MM/yyyy","en-JM":"dd/MM/yyyy","es-VE":"dd/MM/yyyy","ar-YE":"dd/MM/yyyy","en-029":"MM/dd/yyyy","es-CO":"dd/MM/yyyy","ar-SY":"dd/MM/yyyy","en-BZ":"dd/MM/yyyy","es-PE":"dd/MM/yyyy","ar-JO":"dd/MM/yyyy","en-TT":"dd/MM/yyyy","es-AR":"dd/MM/yyyy","ar-LB":"dd/MM/yyyy","en-ZW":"M/d/yyyy","es-EC":"dd/MM/yyyy","ar-KW":"dd/MM/yyyy","en-PH":"M/d/yyyy","es-CL":"dd-MM-yyyy","ar-AE":"dd/MM/yyyy","es-UY":"dd/MM/yyyy","ar-BH":"dd/MM/yyyy","es-PY":"dd/MM/yyyy","ar-QA":"dd/MM/yyyy","es-BO":"dd/MM/yyyy","es-SV":"dd/MM/yyyy","es-HN":"dd/MM/yyyy","es-NI":"dd/MM/yyyy","es-PR":"dd/MM/yyyy","am-ET":"d/M/yyyy","tzm-Latn-DZ":"dd-MM-yyyy","iu-Latn-CA":"d/MM/yyyy","sma-NO":"dd.MM.yyyy","mn-Mong-CN":"yyyy/M/d","gd-GB":"dd/MM/yyyy","en-MY":"d/M/yyyy","prs-AF":"dd/MM/yy","bn-BD":"dd-MM-yy","wo-SN":"dd/MM/yyyy","rw-RW":"M/d/yyyy","qut-GT":"dd/MM/yyyy","sah-RU":"MM.dd.yyyy","gsw-FR":"dd/MM/yyyy","co-FR":"dd/MM/yyyy","oc-FR":"dd/MM/yyyy","mi-NZ":"dd/MM/yyyy","ga-IE":"dd/MM/yyyy","se-SE":"yyyy-MM-dd","br-FR":"dd/MM/yyyy","smn-FI":"d.M.yyyy","moh-CA":"M/d/yyyy","arn-CL":"dd-MM-yyyy","ii-CN":"yyyy/M/d","dsb-DE":"d. M. yyyy","ig-NG":"d/M/yyyy","kl-GL":"dd-MM-yyyy","lb-LU":"dd/MM/yyyy","ba-RU":"dd.MM.yy","nso-ZA":"yyyy/MM/dd","quz-BO":"dd/MM/yyyy","yo-NG":"d/M/yyyy","ha-Latn-NG":"d/M/yyyy","fil-PH":"M/d/yyyy","ps-AF":"dd/MM/yy","fy-NL":"d-M-yyyy","ne-NP":"M/d/yyyy","se-NO":"dd.MM.yyyy","iu-Cans-CA":"d/M/yyyy","sr-Latn-RS":"d.M.yyyy","si-LK":"yyyy-MM-dd","sr-Cyrl-RS":"d.M.yyyy","lo-LA":"dd/MM/yyyy","km-KH":"yyyy-MM-dd","cy-GB":"dd/MM/yyyy","bo-CN":"yyyy/M/d","sms-FI":"d.M.yyyy","as-IN":"dd-MM-yyyy","ml-IN":"dd-MM-yy","en-IN":"dd-MM-yyyy","or-IN":"dd-MM-yy","bn-IN":"dd-MM-yy","tk-TM":"dd.MM.yy","bs-Latn-BA":"d.M.yyyy","mt-MT":"dd/MM/yyyy","sr-Cyrl-ME":"d.M.yyyy","se-FI":"d.M.yyyy","zu-ZA":"yyyy/MM/dd","xh-ZA":"yyyy/MM/dd","tn-ZA":"yyyy/MM/dd","hsb-DE":"d. M. yyyy","bs-Cyrl-BA":"d.M.yyyy","tg-Cyrl-TJ":"dd.MM.yy","sr-Latn-BA":"d.M.yyyy","smj-NO":"dd.MM.yyyy","rm-CH":"dd/MM/yyyy","smj-SE":"yyyy-MM-dd","quz-EC":"dd/MM/yyyy","quz-PE":"dd/MM/yyyy","hr-BA":"d.M.yyyy.","sr-Latn-ME":"d.M.yyyy","sma-SE":"yyyy-MM-dd","en-SG":"d/M/yyyy","ug-CN":"yyyy-M-d","sr-Cyrl-BA":"d.M.yyyy","es-US":"M/d/yyyy"};
	
	var l=navigator.language?navigator.language:navigator['userLanguage'],y=d.getFullYear(),m=d.getMonth()+1,d=d.getDate();
	f=(l in f)?f[l]:"dd/MM/yyyy";
	function z(s){s=''+s;return s.length>1?s:'0'+s;}
	f=f.replace(/yyyy/,y);f=f.replace(/yy/,String(y).substr(2));
	f=f.replace(/MM/,z(m));f=f.replace(/M/,m);
	f=f.replace(/dd/,z(d));f=f.replace(/d/,d);
	return f;
}


function getLocalShortDate(d)
{
    var lang = window.navigator.userLanguage || window.navigator.language;

    var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
    };
    
    return d.toLocaleDateString(lang, options);
}

function getShortDateForm(d)
{
    var month = $.datepicker.regional[currentLang].monthNamesShort[d.getMonth()];
    
    return d.getDate() + ' ' + month.toLowerCase() + ' ' + d.getFullYear();
}


function getVeryShortDateForm(d)
{
    var month = $.datepicker.regional[currentLang].monthNamesShort[d.getMonth()];
    
    return d.getDate() + ' ' + month.toLowerCase();
}


function showPopUpDatePickerOption()
{
	isDatePickerOptionOpened = true;
    
    showModalPopUp("datePicker");
}


function getLocationForMainSelectionList()
{    
    log("getLocationForMainSelectionList -> navigator.geolocation : " + navigator.geolocation + " / currentCity : " + currentCity + " / mUserLocationTimer : " + mUserLocationTimer);
	
    if (mUserLocationTimer == -1)
    {
        mUserLocationTimer = (new Date()).getTime();
        
        setLoadingAnimation(0.5, 'home');
        
        //********************************************
        
        //$("#itemList").html('');
        
        currentCity = -1;
        currentTime = -1;
        
        
        //************* reset cost *********************
        
        resetItemListRouting();
    }
    
    if (userLocationOnSimulator)
    {
        usePositionForMainSelectionItemsList();
    }
    else
    if (navigator.geolocation)
    {
        setTimeout(function()
                   {
                    log("getLocationForMainSelectionList");
               
                   /*
                   if (isAndroid)
                        watchPosition('Home');
                   else
                    */
                        navigator.geolocation.getCurrentPosition(usePositionForMainSelectionItemsList, getCurrentPositionFailed, {enableHighAccuracy: true, timeout: 15000, maximumAge: kAgeUserLocation});
                   }
                   ,200);
    }
    else
    {
        $("#itemList").html('<div class="noItemListResult corner">'+
                              commonLabel[currentLang].noGeoloc +
                              '</div>');
        
        removeLoadingAnimation();
    }
}


function getCurrentPositionFailed(error)
{
    log("getCurrentPositionFailed -> error : " + JSON.stringify(error));
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            log("An unknown error occurred.");
            break;
    }
    
    log("getCurrentPositionFailed -> mTimer : " + mTimer);
    
    if (mTimer != -1)
        return;
    
    mUserLocationTimer = -1;
    
    if (isModalPopUp)
        showModalPopUp();
    
    removeLoadingAnimation();
    
    userLocation = null;
    
    clearWatchPosition();
    
    setTimeout(function(){
               showLittleModalPopUp("gpsFailed");
               }, 500);
}


function usePositionForMainSelectionItemsList(position)
{
    var lTimer2 = (new Date()).getTime();
    
    log ("usePositionForMainSelectionItemsList -> position : " + JSON.stringify(position) + " / diff : " + (lTimer2 - mUserLocationTimer));
    
    if (lTimer2 - mUserLocationTimer >= 6000 || userLocationOnSimulator)
    {
        removeLoadingAnimation();
        
        if (userLocationOnSimulator)
            userLocation = mUserLocationTestArray[mNameUserLocationTest];
        else
            userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        
        log ("usePositionForMainSelectionItemsList -> final userLocation : " + JSON.stringify(userLocation));
        
        setMainSelectionItemsList('Geoloc');
        
        mUserLocationTimer = -1;
    }
    else
    {
        setTimeout(getLocationForMainSelectionList, 1000);
    }
}


function showCloserItem(position)
{
    if (userLocationOnSimulator)
        position = "ok";
        
    if (position && isApp && !isGoogleSelected)
    {
        if (userLocationOnSimulator)
            userLocation = mUserLocationTestArray[mNameUserLocationTest];
        else
            userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        
        if (getInsideBound(boundBoxPaca, userLocation.latitude, userLocation.longitude, 0) == false)
        {
            showLittleModalPopUp("", commonLabel[currentLang].noLocationInBound);
            return;
        }
    }
    
    //************************************************************
    
    if (position == null && navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showCloserItem, getCurrentPositionFailed, {enableHighAccuracy: true, timeout: kTimeOutUserLocation, maximumAge: kAgeUserLocation});
    }
    else
    {
		if (userLocationOnSimulator)
            userLocation = mUserLocationTestArray[mNameUserLocationTest];
        else
            userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        
        hasToShowUserPosition = true;
        
        mIsCloserItemActivated = true;
            
        listItems.sort(function (a,b) { return ((calculDistanceBetweenItems(a, userLocation) <= calculDistanceBetweenItems(b, userLocation)) ? -1 : 1)});
        
        $("#itemList").html('');
        lastIndexItemList = 0;
        indexItemList = 10;
        
        setItemList();
    }
}


function getUserLocationForIGN ()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(setUserLocationForMapIGN, getCurrentPositionFailed, {enableHighAccuracy: true, timeout: kTimeOutUserLocation, maximumAge: kAgeUserLocation});
    }
}


function setUserLocationForMapIGN(position)
{
    deletePopUpMapSettings();
    
    if (userLocationOnSimulator)
        userLocation = mUserLocationTestArray[mNameUserLocationTest];
    else
        userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
    
    //alert ("setUserLocationForMapIGN : " + userLocation);
    
    setIGNuserPositionmarker();
}


function setRouteDirectionFromUserLocation(position, _type)
{
    //alert (position);
    
    log("++++++++++++ setRouteDirectionFromUserLocation -> position : " + position + " / _type : " + _type + " / userChoosePosition : " + JSON.stringify(userChoosePosition) + " / userLocation : " + JSON.stringify(userLocation) + " / userMarker : " + userMarker);
    
    if (position)
        log("position.coords.latitude : " + position.coords.latitude + " / position.coords.longitude : " + position.coords.longitude);
    
    
    if (isLeafletMap && localStorage.isFullSQLiteForSpatialiteInstalled != "true")
    {
        showLittleModalPopUp("downloadSqliteDb");
        return;
    }
    
    
    if (userLocationOnSimulator)
        userLocation = mUserLocationTestArray[mNameUserLocationTest];
    else
    {
        if (!userChoosePosition && !position)
        {
            getUserPosition(_type);
            return;
        }
        else
        if (position)
            userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
    }
    
    if (isLeafletMap)
    {

        var _lat;
        var _lon;
        
        if (userLocationOnSimulator)
        {
            _lat = mUserLocationTestArray[mNameUserLocationTest].latitude;
            _lon = mUserLocationTestArray[mNameUserLocationTest].longitude;
        }
        else
        {
            if (homeStatus == "List" && userChoosePosition && !userLocation)
            {
                _lat = userChoosePosition.latitude;
                _lon = userChoosePosition.longitude;
            }
            else
            {
                _lat = userLocation.latitude;
                _lon = userLocation.longitude;
            }
            
        }
  
        if (getInsideBound(boundBoxMarseille_10_12, _lat, _lon, 0) == false)
        {
            showLittleModalPopUp("", commonLabel[currentLang].noLocationInBound);
            return;
        }

        
        if(!isLoadingAnimation)
            setLoadingAnimation(0);
        
        removeAllLeafletPopUp();
        
        nodeTo = null;
        nodeFrom = null;
        typeBoundingBox = null;
        lAndroidDbName = null;
        
        log("setRouteDirectionFromUserLocation : polyline " + polyline);
        
        if (polyline)
        {
            map.removeLayer(polyline);
            polyline = null;
        }
        
    }
    
    
    var lType = _type;
    
    if (typeOfDisplayDirection)
        lType = typeOfDisplayDirection;

    deletePopUpMapSettings();
    
    if (position)
        showUserPosition(position, "route");
    
    log("setRouteDirectionFromUserLocation -> 1");
    
    //********************* launch query ******************************
    
    if (isApp && !isGoogleSelected && !isRestrictedAndroid)
    {
        if (homeStatus == "List" && userChoosePosition && !userLocation)
        {
            lonFrom = userChoosePosition.longitude;
            latFrom = userChoosePosition.latitude;
        }
        else
        {
            lonFrom = userLocation.longitude;
            latFrom = userLocation.latitude;
        }
        
        lonTo = parseFloat(currentSelectedGooglePoint.longitude);
        latTo = parseFloat(currentSelectedGooglePoint.latitude);
        
        log("setRouteDirectionFromUserLocation -> lonTo : " + lonTo + " / latTo : " + latTo);
        
        var suffix = getSuffixForRightDb(tempSelectedItem);
        
        nodeTo = lType =='driving'? tempSelectedItem[suffix + 'NodeCar'] : tempSelectedItem[suffix + 'NodeWalk'];
        
        log("setRouteDirectionFromUserLocation -> lType : " + lType + " / nodeTo : " + nodeTo + " / isFullSQLiteForSpatialiteInstalled : " + localStorage.isFullSQLiteForSpatialiteInstalled);

        /*
        
        log("setRouteDirectionFromUserLocation -> fullBoundBoxMP : " + JSON.stringify(fullBoundBoxMP));
        */
        
        spatialNetWork = lType == 'driving' ? 'roads_car' : 'roads_walk';
        
        launchSpatialiteRequest();
    }
    else
    {
        //******** origin & destination ************
        
        var origin;
        
        if (homeStatus == "List" && userChoosePosition && !userLocation)
        {
            origin = userChoosePosition.latitude + ", " + userChoosePosition.longitude;
        }
        else
        {
            origin = userLocation.latitude + ", " + userLocation.longitude;
        }
        
        var destination = currentSelectedGooglePoint;
        
        
        //******** directionsDisplay ************
        
        if(directionsDisplay != null)
        {
            directionsDisplay.setMap(null);
            directionsDisplay = null;
        }
        
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions( { suppressMarkers: true } );
        
        
        //******** directionsService ************
        
        if(origin && destination)
        {
            var request =
            {
                origin      : origin,
                destination : destination,
                travelMode  : lType == 'driving' ? google.maps.DirectionsTravelMode.DRIVING : google.maps.DirectionsTravelMode.WALKING // Type de transport
            }
            
            var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
            
            directionsService.route(request, function(response, status)
                                    {
                                    if(status == google.maps.DirectionsStatus.OK)
                                    {
                                    directionsDisplay.setDirections(response);
                                    }
                                    });
        }
        
    }
    
    
    if (isProd || isProdWeb)
        gaTrackEvent('setRouteDirectionFromUserLocation', 'tempSelectedItem : ' + tempSelectedItem.idRepName, 'lType : ' + lType + ' / map : ' + (isLeafletMap ? 'Leaflet' : 'Google'), 0);
}


function getUserPosition(_type)
{
    log("++++++++++++ getUserPosition -> _type : " + _type);
    
    if (userLocationOnSimulator)
    {
        showUserPosition();
    }
    else
    {
        if (navigator.geolocation)
        {
            if (_type == null)
                navigator.geolocation.getCurrentPosition(showUserPosition, getCurrentPositionFailed, {enableHighAccuracy: true, timeout: kTimeOutUserLocation, maximumAge: kAgeUserLocation});
            else
            {
                typeOfDisplayDirection = _type;
                navigator.geolocation.getCurrentPosition(setRouteDirectionFromUserLocation, getCurrentPositionFailed, {enableHighAccuracy: true, timeout: kTimeOutUserLocation, maximumAge: kAgeUserLocation});
            }
        }
    }
}


function getInsideBound(_array, _latitude, _longitude, _diff)
{
    var _isInsideBound;
    
    var lat = parseFloat(_latitude);
    var lon = parseFloat(_longitude);
    
    var lDiff = _diff;
    
    /******************* TEST ******************
     
     lDiff = 0.011;
     
     if (listItems[currentItemDetail].latitudeRouting)
     {
     lat = parseFloat(listItems[currentItemDetail].latitudeRouting) - lDiff;
     lon = parseFloat(listItems[currentItemDetail].longitudeRouting) - lDiff;
     }
     else
     {
     lat = parseFloat(listItems[currentItemDetail].latitude) - lDiff;
     lon = parseFloat(listItems[currentItemDetail].longitude) - lDiff;
     }
     
     userLocation = {"type" : "userLocation", "latitude" : lat, "longitude" : lon};
     
     ******************* TEST ******************/
    
    /*
     log("showUserPosition -> lon1 : " + (lon > parseFloat(_array[0]) ? 1 : 0));
     log("showUserPosition -> lon2 : " + (lon < parseFloat(_array[2]) ? 1 : 0));
     log("showUserPosition -> lat1 : " + (lat > parseFloat(_array[1]) ? 1 : 0));
     log("showUserPosition -> lat2 : " + (lat < parseFloat(_array[3]) ? 1 : 0));
     */
    
    if (lon > (parseFloat(_array[0] - lDiff)) && lon < (parseFloat(_array[2]) + lDiff) && lat > (parseFloat(_array[1]) - lDiff) && lat < (parseFloat(_array[3]) + lDiff))
    {
        _isInsideBound = true;
    }
    else
        _isInsideBound = false;
    
    //log("isInsideBound -> " + _isInsideBound);
    
    return _isInsideBound;
}


function showUserPosition(position, _option)
{
    if (!userMarker)
        hasToShowUserPosition = false;
    
    //************************ filtre timer *************************
    
    var lTimer2 = (new Date()).getTime();
    
    if (mTimer == -1 || (mTimer != -1 && (lTimer2 - mTimer >= 5000)))
    {
        mTimer = (new Date()).getTime();
        
        //log("showUserPosition -> (new Date()).getTime() : " + (new Date()).getTime());
        //log("showUserPosition -> mTimer : " + mTimer);
    
        //************************ userLocationOnSimulator *************************
        
        if (!userLocationOnSimulator)
            log("showUserPosition -> position.coords.latitude : " + position.coords.latitude + " / position.coords.longitude : " + position.coords.longitude);
        
        //log("showUserPosition -> currentSelectedGooglePoint ->> ");
        log(currentSelectedGooglePoint);
        
        log("showUserPosition -> userMarker : " + userMarker + " / homeStatus : " + homeStatus + " / hasToShowUserPosition : " + hasToShowUserPosition);
        
        deletePopUpMapSettings();

        if (userLocationOnSimulator)
        {
            userLocation = mUserLocationTestArray[mNameUserLocationTest];
            
            if (hasToShowUserPosition)
            {
                var _lat = mUserLocationTestArray[mNameUserLocationTest].latitude - 0.001;
                var _lon = mUserLocationTestArray[mNameUserLocationTest].longitude - 0.001;
                
                userLocation = {"type" : "userLocation", "latitude" : _lat, "longitude" : _lon};
            }
        }
        else
            userLocation = {"type" : "userLocation", "latitude" : position.coords.latitude, "longitude" : position.coords.longitude};
        
        //log("showUserPosition -> userLocation : " + JSON.stringify(userLocation));
        
        /*******************  IGN on WEB   *****************/
        
        if (!isApp && mapStatus == "IGN")
        {
            $("#showUserPosition img").attr("src", "Assets/IconUserPosition_on.png");
            
            setIGNuserPositionmarker();            
            
            return;
        }
        
        /*******************  outMpZoneArray   *****************/
        
        if ((isApp && !isGoogleSelected && !isRestrictedAndroid) || (isApp && mapStatus == "IGN"))
        {
            var isInsideBound = false;
            
            /*******************  outMpZoneArray   *****************/
            
            if (mapStatus == "IGN" && currentTable != "randoMap")
            {
                log("showUserPosition -> IGN outZone : " + listItems[currentItemDetail].idRepName + " / mMassif_13_17 : " + mMassif_13_17);
                
                //var lBoundsArray = outMpZoneBounds[listItems[currentItemDetail].idRepName].split(",");
                
                var lBoundsArray;
                
                if (mMassif_13_17 && massifBoundsArray[massifDbArray[listItems[currentItemDetail].mountains]])
                    lBoundsArray = massifBoundsArray[massifDbArray[listItems[currentItemDetail].mountains]].split(",");
                else
                    lBoundsArray = listItems[currentItemDetail].bounds.split(",");
                
                log("showUserPosition -> outZone : " + JSON.stringify(lBoundsArray));
                
                isInsideBound = getInsideBound(lBoundsArray, userLocation.latitude, userLocation.longitude, 0.007);
                
                if (!isInsideBound)
                {
                    clearWatchPosition();
                    setTimeout(function(){
                               if (!isLittleModalPopUp)
                                    showLittleModalPopUp("", commonLabel[currentLang].noLocationInIGNBound);
                               }, 1000);
                    return;
                }
            }
            /*
            else
            if (currentTable == "randoMap")
            {
                if (getInsideBound(boundBoxMarseille_10_12, userLocation.latitude, userLocation.longitude, 0) == false)
                {
                    clearWatchPosition();
                    setTimeout(function(){
                               if (!isLittleModalPopUp)
                                showLittleModalPopUp("", commonLabel[currentLang].noLocationInBound);
                               }, 1000);
                    return;
                }
            }
             */
            else
            {            
                log("showUserPosition -> outZone Paca : " + JSON.stringify(boundBoxPaca));
                
                isInsideBound = getInsideBound(boundBoxPaca, userLocation.latitude, userLocation.longitude, 0);
                
                if (!isInsideBound)
                {
                    clearWatchPosition();
                    setTimeout(function(){
                               if (!isLittleModalPopUp)
                               showLittleModalPopUp("", commonLabel[currentLang].noLocationInBound);
                               }, 1000);
                    return;
                }
            }
            
            /************************** set and place userMarker *****************************/
            
            if (userMarker)
            {
                log("showUserPosition -> userMarker : remove");
                map.removeLayer(userMarker);
            }
            
            var lUserIcon = L.icon({
                                   iconUrl: 'Assets/pin_blue.png',
                                   shadowUrl: 'Assets/pin/Shadow_user_lite.png',
                                   iconSize:     [40, 40],
                                   shadowSize:   [40, 40],
                                   iconAnchor:   [20, 40],
                                   shadowAnchor: [12, 42],
                                   popupAnchor:  [0, -60]
                                   });
            
            userMarker = L.marker([userLocation.latitude, userLocation.longitude], {icon: lUserIcon}).addTo(map).bindPopup(getBoxContentForPopUp(1000), {closeButton:false});

            log("showUserPosition -> userMarker : addLayer");

            /************************** bounds and pan to *****************************/
            
            if ((currentSelectedGooglePoint || mapStatus == "IGN") && !hasToShowUserPosition && currentTable != "randoMap")
            {
                var lPointArray;
                
                if (mapStatus == "IGN")
                    lPointArray = [listItems[currentItemDetail].latitude, listItems[currentItemDetail].longitude];
                else
                    lPointArray = [currentSelectedGooglePoint.latitude, currentSelectedGooglePoint.longitude]
                    
                if (mapStatus == "IGN" && (!mMassif_13_17 || !massifBoundsArray[massifDbArray[listItems[currentItemDetail].mountains]]))
                {
                    map.panTo([parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]);
                    //log("showUserPosition -> panTo");
                }
                else
                {
                    map.fitBounds([lPointArray, [parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]]);
                    //log("showUserPosition -> fitBounds");
                }
            }
            else
            {
                if (homeStatus == "Detail" || hasToShowUserPosition
                    || currentTable == "routingMap" || currentTable == "randoMap")
                {
                    if (!hasToShowUserPosition)
                        map.setZoom(getZoomForOSM(parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)));
                        
                    map.panTo([parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]);
                }
                else
                {
                    log("not Detail not hasToShowUserPosition -> listItemsMap : " + listItemsMap[0].idRepName);
                    
                    var tempArray = [];
                    
                    tempArray = tempArray.concat(listItemsMap)
                    
                    tempArray.sort(function (a,b) { return ((calculDistanceBetweenItems(a, userLocation) <= calculDistanceBetweenItems(b, userLocation)) ? -1 : 1)});
                    
                    log("not Detail not hasToShowUserPosition 2 -> listItemsMap : " + listItemsMap[0].idRepName);
                    
                    var lat = tempArray[0].latitude;
                    var lon = tempArray[0].longitude;
                    
                    //map.options.maxZoom = getZoomForOSM(parseFloat(userLocation.latitude), parseFloat(userLocation.longitude));
                    
                    map.panTo([parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]);
                    
                    map.fitBounds([[lat,lon], [parseFloat(userLocation.latitude), parseFloat(userLocation.longitude)]]);
                    
                    if (map.getZoom() > map.options.maxZoom)
                        map.setZoom(map.options.maxZoom);
                }
            }
        }
        else
        {
            var lUserlocation = new google.maps.LatLng(parseFloat(userLocation.latitude), parseFloat(userLocation.longitude));
            
            var pinImage = new google.maps.MarkerImage('Assets/pin_blue.png', null, null,
                                                       new google.maps.Point(20, 40),
                                                       new google.maps.Size(40, 40)
                                                       );
            if (userMarker)
            {
                log("showUserPosition -> userMarker : remove");
                userMarker.setMap(null);
            }
            
            log("showUserPosition -> userMarker : add marker");
            
            
            userMarker = new google.maps.Marker({
                                                position: lUserlocation,
                                                map: map,
                                                icon: pinImage,
                                                shadow: pinShadow
                                                });
            
            attachSecretMessage(userMarker, 1000);
            
            if (currentSelectedGooglePoint && !hasToShowUserPosition)
            {
                var lBounds = new google.maps.LatLngBounds();
                
                lBounds.extend(lUserlocation);
                
                lBounds.extend(currentSelectedGooglePoint);
                
                map.fitBounds(lBounds);
                
                log("currentSelectedGooglePoint");
            }
            else
            {            
                log("not currentSelectedGooglePoint");
                
                if (homeStatus == "Detail" || hasToShowUserPosition
                    || currentTable == "routingMap" || currentTable == "randoMap")
                {
                    map.panTo(lUserlocation);
                    //map.setZoom(isMobile==false?15:14);
                }
                else
                {
                    log("not Detail not hasToShowUserPosition -> listItemsMap : " + listItemsMap[0].idRepName);
                    
                    var tempArray = [];
                    
                    tempArray = tempArray.concat(listItemsMap);
                    
                    tempArray.sort(function (a,b) { return ((calculDistanceBetweenItems(a, userLocation) <= calculDistanceBetweenItems(b, userLocation)) ? -1 : 1)});
                    
                    log("not Detail not hasToShowUserPosition 2 -> listItemsMap : " + listItemsMap[0].idRepName);
                    
                    var lBounds = new google.maps.LatLngBounds();
                    
                    var lat = tempArray[0].latitude;
                    var lon = tempArray[0].longitude;
                    
                    log("not Detail not hasToShowUserPosition -> lat : " + lat + " / lon : " + lon);
                    
                    var lItem = new google.maps.LatLng(lat, lon);
                    
                    lBounds.extend(lItem);
                    
                    lBounds.extend(lUserlocation);
                    
                    map.fitBounds(lBounds);
                }
            }
        }
        
        hasToShowUserPosition = true;
        
        $("#showUserPosition img").attr("src", "Assets/IconUserPosition_on.png");
    }
    else
        isTimerActive = true;
}


function watchPosition(_arg)
{
    log("watchPosition -> mWatchPosition : " + JSON.stringify(mWatchPosition) + " / _arg : " + _arg);
    
    if (!mWatchPosition)
    {
        if (userLocationOnSimulator)
        {
            mWatchPosition = "ok";
            showUserPosition();
        }
        else
        {
            if (_arg == "Home")
            {
                mWatchPosition = navigator.geolocation.watchPosition(usePositionForMainSelectionItemsList,
                                                                     getCurrentPositionFailed,
                                                                     {enableHighAccuracy: true, timeout: 15000, maximumAge: kAgeUserLocation});
            }
            else
            {
                mWatchPosition = navigator.geolocation.watchPosition(showUserPosition,
                                                      getCurrentPositionFailed,
                                                      {enableHighAccuracy: true, timeout: kTimeOutUserLocation, maximumAge: kAgeUserLocation});
            }
        }
        
        if (isProd || isProdWeb)
        {
            if ((homeStatus == "List" && cityBtnArray[currentCity] != "Geoloc") || homeStatus == "Detail" || homeStatus == "Close")
            {
                gaTrackPage('watchPosition');
                
                var lValue = "";
                
                if (homeStatus == "List" && !isTablePracticalLink)
                    lValue = currentActivity;
                else
                    if (homeStatus == "Detail" || homeStatus == "Close")
                        lValue = listItems[currentItemDetail].idRepName;
                
                gaTrackEvent('watchPosition', 'currentTable : ' + currentTable + ' / homeStatus : ' + homeStatus, lValue, 0);
            }
        }
    }
    else
    {
        clearWatchPosition();
    }
}


function clearWatchPosition()
{
    navigator.geolocation.clearWatch(mWatchPosition);
    
    mWatchPosition = null;
    
    $("#showUserPosition img").attr("src", "Assets/IconUserPosition.png");
    
    mTimer = -1;
    
    hasToShowUserPosition = null;
    
    //alert(" mWatchPosition : " + mWatchPosition + " / mTimer : " + mTimer);
}



function showPopUpMapSettings()
{
	if (!isPopUpMapSettingsOpened)
	{
		var _html = "";
        
        var _title = ""
        
        var _top;
		var _left;
        
        var _xSize = 277;
        var _ySize;
        
        //******************** btnMarkers **********************
        
        if (btnMarkers != undefined && btnMarkers.length > 1 && isAppScreen)
        {
            _ySize = 50 + 60 + btnMarkers.length*30 + 30  + 75;
            
            _title = commonLabel[currentLang].selectItemsToDisplay;
            
            _html += '<div id="btnPopUpSettingsMapMoreOrLeft">';
            
            for (var i = 0; i < btnTypeMarkers.length; i++)
            {
                if (currentTable == "Index" && homeStatus == "Detail")
                {
                    var bg = 'background-image:url(\'Assets/background/map' + btnTypeMarkers[i] +'.png\')';
                    
                    if (btnMarkers[i] ==  true)
                    {
                        _html += '<a href="javascript:showOrHideMarkers('+ i +')" class="btnPopUpMapSettings corner" style="' + bg + '; width:80%; margin:0 0 10px 10%; opacity:0.2;">'+
                        optionLabel[currentLang][btnTypeMarkers[i]] + '</a>';
                    }
                    else
                    {
                        _html += '<a href="javascript:showOrHideMarkers('+ i +')" class="btnPopUpMapSettings corner" style="' + bg + '; width:80%; margin:0 0 10px 10%;">'+
                        optionLabel[currentLang][btnTypeMarkers[i]] + '</a>';
                    }
                }
                else
                {
                    var bg = 'background-image:url(\'Assets/background/map' + i +'.png\')';
                    
                    if (btnMarkers[i] ==  true)
                    {
                        _html += '<a href="javascript:showOrHideMarkers('+ i +')" class="btnPopUpMapSettings corner" style="' + bg + '; width:80%; margin:0 0 10px 10%; opacity:0.2;">'+
                        typeLabel[currentLang][btnTypeMarkers[i]] + '</a>';
                    }
                    else
                    {
                        _html += '<a href="javascript:showOrHideMarkers('+ i +')" class="btnPopUpMapSettings corner" style="' + bg + '; width:80%; margin:0 0 10px 10%;">'+ typeLabel[currentLang][btnTypeMarkers[i]] + '</a>';
                    }
                }
            }
            
            _html += '<a href="javascript:showAllMarkers()" class="btnPopUpMapSettings corner" style=" width:80%; margin:0 0 10px 10%; background-image:url(\'Assets/btnGrey.png\'); background-size:100% 100%; color:#2E2A2A;">'+
            commonLabel[currentLang].allItems + '</a>';
            
            _html += '</div>';
		}
        else
            //*********************** SETTINGS ***********************
        {
            _ySize = 50 +  44 + 55;
            
            _title = commonLabel[currentLang].settings;
            
            var lLink = "";
            
            if (mapStatus == "IGN")
                lLink = "getUserLocationForIGN()";
            else
                lLink = "getUserPosition(null)";
            
            _html += '<a href="javascript:' + lLink + '"  class="btnPopUpMapSettings bgRestaurantsGradient corner" style="width:80%; margin:0 0 10px 10%;">' + commonLabel[currentLang].showMyPosition + '</a>';
            
            if (currentTable == "Index" && homeStatus == "Detail" && mapStatus != "IGN")
            {
                _ySize += 44*2;
                
                _html += '<a href="javascript:getUserPosition(\'walking\')" class="btnPopUpMapSettings bgHotelsGradient corner" style="width:80%; margin:0 0 10px 10%;">' + commonLabel[currentLang].showWalkingRoute + '</a>'+
                '<a href="javascript:getUserPosition(\'driving\')" class="btnPopUpMapSettings bgServicesGradient corner" style="width:80%; margin:0 0 10px 10%;">' + commonLabel[currentLang].showDrivingRoute + '</a>';
            }
        }
        
		//log("xSize : " + _xSize + " / ySize : " + _ySize + " / window.pageYOffset : " + window.pageYOffset);
		
		_top = window.pageYOffset + (($(window).height() - _ySize) / 2) + 20;
		
		_left = window.pageXOffset + ($(window).width() - _xSize) / 2;
        
        if (_top <= 0)
            _top = 8;
        
		
		var html =
		'<div id="popUpMapSettings" style="width:' + _xSize + 'px; height:' + _ySize + 'px; background-color:#2E2A2A; border:#cccccc solid 5px;' +
		' position:absolute; top:' + _top + 'px; left:' + _left + 'px; z-index:10; color:#ffffff; font-size:1.2em;" class="corner">'+
		'<h2 class="bgMP2013Gradient" style="text-align:center; color:#ffffff; padding:10px 0px; margin-bottom:10px;">' + _title + '</h2>'+ 		_html +
        '<a href="javascript:deletePopUpMapSettings();" class="genericBlackBtn corner" style="margin:10px 0; width:40%; margin-left:30%;">Annuler</a>' +
		'</div>';
		
		
		$("body").append(html);
		
		isPopUpMapSettingsOpened = true;
	}
	else
	{
		deletePopUpMapSettings();
	}
}


function deletePopUpMapSettings()
{
    log("deletePopUpMapSettings");
    
	$("#popUpMapSettings").remove();
	
	isPopUpMapSettingsOpened = false;
}


function showPopUpCoordonnees(_type, n, _onTour)
{    
    switch (_type)
	{
		case "Restaurants" :
        {
            if (_onTour == null)
                tempSelectedItem = optionSliderRestaurantsArray[n];
            else
                tempSelectedItem = listItems[_onTour][n];
        }
			break;
			
		case "Services" :
			tempSelectedItem = optionSliderServicesArray[n];
			break;
			
		case "Hotels" :
        {
            if (_onTour == null)
                tempSelectedItem = optionSliderHotelsArray[n];
            else
                tempSelectedItem = listItems[_onTour][n];
        }
			break;
			
		case "MP2013" :
			tempSelectedItem = optionSliderMP2013Array[n];
			break;
			
		default :
		{   tempSelectedItem = listItems[n];
            
			_type = "MP2013";
		}
			break;
	}
    
    showModalPopUp("Coordonnees");
	
    if (isProd || isProdWeb)
        gaTrackEvent('showPopUpCoordonnees', 'tempSelectedItem : ' + tempSelectedItem.raisonsociale, '_type : ' + _type, 0);
}


function showPopUpTimeToGo(_type, n)
{
	/*
     var _html =
     '<a style="float:left; margin-right:10px;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'pied\')">' + transportItems[currentLang].pied + '</a><div style="float:left; margin-right:10px;" id="pied_' + _type + '_' + n + '"></div><div style="float:left; margin-right:10px;">/</div>'+
     '<a style="float:left; margin-right:10px;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'velo\')">' + transportItems[currentLang].velo + '</a><div style="float:left; margin-right:10px;" id="velo_' + _type + '_' + n + '"></div><div style="float:left; margin-right:10px;">/</div>'+
     '<a style="float:left; margin-right:10px;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'moto\')">' + transportItems[currentLang].moto + '</a><div style="float:left; margin-right:10px;" id="moto_' + _type + '_' + n + '"></div><div style="float:left; margin-right:10px;">/</div>'+
     '<a style="float:left; margin-right:10px;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'auto\')">' + transportItems[currentLang].auto + '</a><div style="float:left; margin-right:10px;" id="auto_' + _type + '_' + n + '"></div>';
     */
	
	$("#popUp").remove();
	$("#popUpBtn").remove();
	
	var _html =
	'<div style="display:inline-block; margin:10px 0px 0px 20px; width:100%; clear:both;"><a style="float:left; font-size:1.2em; color:#ffffff; text-decoration:underline;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'pied\')">' + transportItems[currentLang].pied + '</a><div style="float:left; margin-left:10px; padding-top:0px;" id="pied_' + _type + '_' + n + '"></div></div>'+
	'<div style="display:inline-block; margin:10px 0px 0px 20px;width:100%;  clear:both;"><a style="float:left; font-size:1.2em; color:#ffffff; text-decoration:underline;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'velo\')">' + transportItems[currentLang].velo + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="velo_' + _type + '_' + n + '"></div></div>'+
	'<div style="display:inline-block; margin:10px 0px 0px 20px;width:100%;  clear:both;"><a style="float:left; font-size:1.2em; color:#ffffff; text-decoration:underline;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'moto\')">' + transportItems[currentLang].moto + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="moto_' + _type + '_' + n + '"></div></div>'+
	'<div style="display:inline-block; margin:10px 0px 0px 20px;width:100%;  clear:both;"><a style="float:left; font-size:1.2em; color:#ffffff; text-decoration:underline;" href="javascript:getTimeAndDistanceFromGoogleMatrix(\'' + _type + '\', ' + n + ', \'auto\')">' + transportItems[currentLang].auto + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="auto_' + _type + '_' + n + '"></div>';
	
	var _xSize;
	var _ySize = 230;
	var _top;
	var _left;
	
	if ($(window).width() <= 480)
		_xSize = $(window).width() - 30;
	else
		_xSize = 450;
	
	_top = window.pageYOffset + (($(window).height() - _ySize) / 2) + 20;
	
	_left = window.pageXOffset + ($(window).width() - _xSize) / 2;
	
	
	var html =
	'<div id="popUp" style="width:' + _xSize + 'px; height:' + _ySize + 'px; background-color:#2E2A2A; border:#cccccc solid 5px;' +
	' position:absolute; top:' + _top + 'px; left:' + _left + 'px; z-index:10; color:#ffffff; font-size:1.2em;" class="corner">'+
	'<h2 class="color' + _type + '" style="text-align:center; color:#ffffff; padding:10px 0px;">Depuis ' + listItems[currentItemDetail].title + '</h2>' +
	_html +
	'</div>';
	
	var btn =
	'<a id="popUpBtn" href="javascript:deletePopUp();" style="top:' + (_top - 18) + 'px; left:' + (_left - 18) + 'px; position:absolute; z-index:200;">' +
	'<img src="Assets/croix_off.png" style="position:relative; top:10px; left:10px;" />' +
	'</a>';
	
	$("body").append(html);
	$("body").append(btn);
    
    if (isProd || isProdWeb)
        gaTrackEvent('showPopUpTimeToGo', '_type : ' + _type, ' from idRepName : ' + listItems[currentItemDetail].idRepName, 0);
}


function deletePopUp()
{
	$("#popUp").remove();
	$("#popUpBtn").remove();
}


function clearLocalStorage()
{
    localStorage.clear();
}


function getItemsInFavoritesArray (_idRepName)
{
    if (favoritesItemsArray.length > 0)
    {
        for (var i = 0; i < favoritesItemsArray.length; i++)
        {
            if (favoritesItemsArray[i].idRepName == _idRepName)
                return i;
        }
    }
    
    return -1;
}


function addOrRemoveFavorite(_idRepName, _table)
{
    log("nb fav 1 = " + favoritesItemsArray.length + " / _idRepName : " + _idRepName);
	
    var indexFav;
    
	if(typeof(Storage) !== "undefined")
    {
        indexFav = getItemsInFavoritesArray(_idRepName);
        
        log('indexFav : ' + indexFav);
        
        if (indexFav == -1)
        {
            favoritesItemsArray.push(getItemInDataList(_idRepName, _table));
            
            if (isModalPopUp)
                $("#iconFavoriteMap").attr("src", "Assets/icon_favorite_remove.png");
            else
                $("#iconFavorite").attr("src", "Assets/icon_favorite_remove.png");
        }
        else
        {
            favoritesItemsArray.remove(indexFav);
			
            if (isModalPopUp)
                $("#iconFavoriteMap").attr("src", "Assets/icon_favorite_add.png");
            else
                $("#iconFavorite").attr("src", "Assets/icon_favorite_add.png");
			
        }
        
        localStorage.favoritesItems = JSON.stringify(favoritesItemsArray);
    }
	
    if (isProd || isProdWeb)
        gaTrackEvent('addOrRemoveFavorite', '_idRepName : ' + _idRepName + ' / _table : ' + _table, indexFav == -1 ? 'Add' : 'Remove', 0);
    
    log("nb fav 2 = " + favoritesItemsArray.length);
}


function addToFavorite()
{
    if(typeof(Storage) !== "undefined")
    {
        favoritesItemsArray.push(listItems[currentItemDetail]);
        
        localStorage.favoritesItems = JSON.stringify(favoritesItemsArray);
    }
}


function RemoveFromFavoritePage(n)
{
    if (!isMobile)
        $("#removeFavoriteBtn" + n).live('click',function(event){
                                 event.stopPropagation(); event.preventDefault();
                                 });
    else
        showLittleModalPopUp();
    
    log("RemoveFromFavoritePage -> n : " + n);
    log("RemoveFromFavoritePage -> listItems[n].idRepName : " + listItems[n].idRepName);
    
    //*************
    
    favoritesItemsArray.remove(getItemsInFavoritesArray(listItems[n].idRepName));
    
    localStorage.favoritesItems = JSON.stringify(favoritesItemsArray);
    
    //****************************
    
    listItems = [];
    
    for (var f = 0; f < favoritesItemsArray.length; f++)
    {
        if (favoritesItemsArray[f] != -1)
            listItems.push(favoritesItemsArray[f]);
    }
    
    log("**** RemoveFromFavoritePage : ");
    log(listItems);
    
    /*
    if (isLikeMobile)
        setNextResultForItemList();
    else
     */
    
    lastIndexItemList = 0;
    $("#itemList").html('');
    setItemList();
}


function getListItemsFromArray(_array)
{
    var tempArray = [];
    
    var tempSliderArray = [];
    
    for (var i = 0; i < _array.length; i++)
    {
        var stringArray = _array[i].split(",");
        
        //log("getListItemsFromArray -> _array[i] : " + JSON.stringify(_array[i]));
        
        if (_array[i].indexOf("Restaurants") != -1 || _array[i].indexOf("Hotels") != -1)
        {
			var coordsArray = stringArray[0].split("-");
			
            var myPoint = {
                "latitude" : coordsArray[0],
                "longitude" : coordsArray[1]
            };
            
            var lSliderListItems;
            var lDistance;
            
            if (_array[i].indexOf("Restaurants") != -1)
            {
                lSliderListItems = listItemsRestaurants;
                
                if (_array[i].indexOf("OnMidi") != -1)
                    lDistance = 0.3;
                else
                    lDistance = 0.2;
            }
            
            if (_array[i].indexOf("Hotels") != -1)
            {
                lSliderListItems = listItemsHotels;
                lDistance = 0.65;
            }
            
            tempSliderArray = getArrayForCloseItemsFromList(lSliderListItems, myPoint, lDistance);
            
            tempArray.push(tempSliderArray);
        }
        else
        {
            tempArray.push(getItemInDataList(stringArray[0], stringArray[1]));
        }
    }
    
    //log("getListItemsFromArray");
    //log(tempArray);
    
    return tempArray;
}


function getItemInDataList(_idRepName, _table)
{
	var list = [];
	var item = -1;
    
    if (_table)
    {
        /*
        switch (_table)
        {
            case "Monuments":				list = listItemsMonuments; break;
            case "SitesNaturels":			list = listItemsSitesNaturels; break;
            case "PlageBaignadePiscine":	list = listItemsPlageBaignadePiscine; break;
            case "Canyons":					list = listItemsCanyons; break;
            case "ExpositionsMusees":		list = listItemsExpositionsMusees; break;
            case "Randonnee":				list = listItemsRandonnee; break;
            case "SitesEscalade":			list = listItemsSitesEscalade; break;
            case "BonsPlans":               list = listItemsBonsPlans; break;
            case "Petanque":                list = listItemsPetanque; break;
            case "Sortir":                  list = listItemsSortir; break;
            case "Restos":                  list = listItemsRestos; break;
            case "Dormir":                  list = listItemsDormir; break;
            case "Shopping":                list = listItemsShopping; break;
            case "Loisirs":                 list = listItemsLoisirs; break;
            case "Circuits":                list = listItemsCircuits; break;
        }
        */
        
        list = getBaseActivityItemsList(_table);

        
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].idRepName == _idRepName)
            {
                item = list[i];
                break;
            }
        }
    }
    else
    {
        for (var i = 0; i < tableArray.length; i++)
        {
            //list = window['listItems' + tableArray[i]];
            
            list = getBaseActivityItemsList(tableArray[i]);
            
            for (var t = 0; t < list.length; t++)
            {
                if (list[t].idRepName == _idRepName)
                {
                    item = list[t];
                    break;
                }
            }
        }
    }
	
	return item;
}

function getIndexInDataList(_idRepName)
{
    var list = getBaseActivityItemsList(currentActivity);
    
	var lIndex = -1;
    
	for (var i = 0; i < list.length; i++)
		if (list[i].idRepName == _idRepName)
			lIndex = i;
	
	return lIndex;
}


function removeItemFromDataList (_idRepName)
{
    var list = [];
    var result = -1;
    
    for (var t = 0; t < tableArray.length; t++)
    {
        list = window["listItems" + tableArray[t]];
        
        for (var i = 0; i < list.length; i++)
        {
            if (list[i].idRepName == _idRepName)
            {
                list.splice(i, 1);
                result = 1;
                break;
            }
        }
    }
    
    return result;
}


function addItemToDataList (_item)
{
    window["listItems" + _item.table].push(_item);
}


function getKeyInArrayForIndex(_array, _index)
{
    var i = 0;
    
    for (var prop in _array)
    {
        if (_array.hasOwnProperty(prop))
        {
            if (i == _index)
                return prop;
                
            i++;
        }
    }
}


function showPopUpDispoForVeloMPM(_number, _name)
{
	if (!isPopUpDispoVeloMPMOpened)
	{
        var _xSize = 277;
        var _ySize = 200;
        
		//log("xSize : " + _xSize + " / ySize : " + _ySize + " / window.pageYOffset : " + window.pageYOffset);
		
		var _top = window.pageYOffset + (($(window).height() - _ySize) / 2) + 20;
		
		var _left = window.pageXOffset + ($(window).width() - _xSize) / 2;
        
        if (_top <= 0)
            _top = 8;
        
        
        //*********** content **************
        
        var _title = _name;
        
        var _html = '<div class="textModalPopUp">' + commonLabel[currentLang].numberDispoVelo + ' : <span style="font-weight:bold" id="dispoVelo"> ... </span></div>' +
        '<div class="textModalPopUp">' + commonLabel[currentLang].numberDispoPlace + ' : <span style="font-weight:bold" id="dispoPlace"> ... </span></div>';
        
        
		var html =
		'<div id="popUpMapDispoVelo" style="width:' + _xSize + 'px; height:' + _ySize + 'px; border:#cccccc solid 5px;' +
		' position:absolute; top:' + _top + 'px; left:' + _left + 'px; z-index:10; color:#2E2A2A; font-size:1.2em;" class=" bgWhiteToUltraLightGray corner">'+
		'<h2 class="bgMP2013Gradient" style="text-align:center; color:#ffffff; padding:10px 0px; margin-bottom:10px;">' + _title + '</h2>'+ 		_html +
        '<a href="javascript:deletePopUpDispoForVeloMPM();" class="genericBlackBtn corner" style="margin:10px 0; width:40%; margin-left:30%;">Annuler</a>' +
		'</div>';
		
		
		$("body").append(html);
		
		isPopUpDispoVeloMPMOpened = true;
        
        var lLink = (isApp?urlWeb:"") + 'API/getVeloMPM.php?number=' + _number;
        
        $.ajax(
			   {
			   url: lLink,
			   success: 	function(data, textStatus, request)
               {
               var xmlDoc = $.parseXML(data);
               $("#dispoVelo").html(xmlDoc.getElementsByTagName('available')[0].firstChild.nodeValue);
               $("#dispoPlace").html(xmlDoc.getElementsByTagName('free')[0].firstChild.nodeValue);
               }
			   });
	}
	else
	{
		deletePopUpDispoForVeloMPM();
	}
}


function deletePopUpDispoForVeloMPM()
{
	$("#popUpMapDispoVelo").remove();
	
	isPopUpDispoVeloMPMOpened = false;
}


function linkToAppStore()
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    if (isAndroid)
        navigator.app.loadUrl('' + getLinkToAppStore()  + '', {openExternal : true});
    else
        window.open('' + getLinkToAppStore()  + '', '_system');
}


function getLinkToAppStore()
{
    var lUrl = isAndroid ? mUrlToPlayStore : mUrlToAppleStore;
    
    return lUrl;
}


function cancelDownload(_type)
{
    var ftCancel;
    
    switch (_type)
    {
        case "ftCustom" :               ftCancel = ftCustom; break;
        case "ftRando" :                ftCancel = ftRando; break;
        case "ftSpatial" :              ftCancel = ftSpatial; break;
        case "ftMassif" :               ftCancel = ftMassif; break;
        case "ftAixSmall_17_19" :       ftCancel = ftAixSmall_17_19; break;
        case "ftPicture" :              ftCancel = ftPicture; break;
    }
    
    log("cancelDownload -> ftCancel : " + _type + " - " + JSON.stringify(ftCancel));
    
    ftCancel.abort(
              function()
              {
                   log("!!!!!!!!!!!!!!!!!!! aborted ok");
                   ftCancel = null;
              },
              
              function()
              {
                   log("!!!!!!!!!!!!!!!!!!!! aborted error");
                   ftCancel = null;
              }
    );
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    removeLoadingAnimation();

    switch (_type)
    {
        case "ftCustom" :               deleteTilesDb_8_16();break;
        case "ftRando" :                deleteTilesRando();break;
        case "ftSpatial" :              deleteFullSQLite();break;
        case "ftMassif" :               deleteMassifDb(); break;
        case "ftAixSmall_17_19" :       deleteAixSmall_17_19(); break;
        case "ftPicture" :              $("#nbOffLineImages").html(parseInt(localStorage["nbOffLineImages"])); break;
    }
}


function deleteMassifDb()
{
    var lDbName = massifDbArray[listItems[currentItemDetail].mountains];
    
    if (massifBoundsArray[lDbName])
        lDbName += "_13_17.db";
    else
        lDbName = listItems[currentItemDetail].idRepName + "_13_17.db";
    
    if (isAndroid)
    {
        window.resolveLocalFileSystemURI(lDataFolderAndroid + "/" + lDbName,
                                         function(fileEntry)
                                         {
                                             log("file" + lDbName + " exists and will be removed");
                                             
                                             fileEntry.remove();
                                             
                                             if (isLittleModalPopUp)
                                                showLittleModalPopUp();
                                         },
                                         function(){log("file " + lDbName + " not exists");}
                                         );
    }
    else
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             fs = fileSystem;
                             
                             log("deleteTiles -> file system retrieved :" + fs.root.fullPath + '/' + lDbName);
                             
                             fs.root.getFile(lDbName,
                                             {create: false},
                                             function (fileEntry)
                                             {
                                                 log("file" + lDbName + " exists and will be removed");
                                                 
                                                 fileEntry.remove();
                                                 
                                                 if (isLittleModalPopUp)
                                                 showLittleModalPopUp();
                                             },
                                             function ()
                                             {
                                                log("file " + lDbName + " not exists");
                                             }
                                             );
                             });
    }
}


function deleteTilesRando()
{
    if (isAndroid)
    {
        window.resolveLocalFileSystemURI(lDataFolderAndroid + "/" + MPtilesRandoDb_8_15_name,
                                         
                                         function(fileEntry)
                                         {
                                             log("file MPtilesRandoDb_8_15_name exists and will be removed");
                                             
                                             fileEntry.remove();
                                             
                                             localStorage.isFullTilesTracesDownloaded = "false";
                                             
                                             if (isLittleModalPopUp)
                                                showLittleModalPopUp();
                                             
                                             $("#btnMenuRandoTiles").html(commonLabel[currentLang].downloadRandoTiles);
                                             $("#btnMenuRandoTiles").attr("href", "javascript:MpTilesRandoDb_8_15_ToDownload()");
                                         
                                         },
                                         function(){log("file MPtilesRandoDb_8_15_name not exists");}
                                         );
    }
    else
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             fs = fileSystem;
                             
                             log("deleteTiles -> file system retrieved :" + fs.root.fullPath + '/' + MPtilesRandoDb_8_15_name);
                             
                             fs.root.getFile(MPtilesRandoDb_8_15_name,
                                                  {create: false},
                                                  function (fileEntry)
                                                  {
                                                  log("file MPtilesRandoDb_8_15_name exists and will be removed");
                                             
                                                  fileEntry.remove();
                                             
                                                  localStorage.isFullTilesTracesDownloaded = "false";
                                                  
                                                  if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                                  
                                                  $("#btnMenuRandoTiles").html(commonLabel[currentLang].downloadRandoTiles);
                                                  $("#btnMenuRandoTiles").attr("href", "javascript:MpTilesRandoDb_8_15_ToDownload()");
                                                  
                                                  },
                                                  function ()
                                                  {
                                                  log("file MPtilesRandoDb_8_15_name not exists");
                                                  }
                                                  );
                             });
    }
}



function deleteFullSQLite()
{
 /*
    if (isAndroid)
    {
        window.resolveLocalFileSystemURI("file:///storage/sdcard0/" + smallSpatialDbName,
                                     function(fileEntry)
                                     {
                                        log("file smallSpatialDbName exists and will be removed");
                                     
                                        //log("deleteFullSQLite -> resolveLocalFileSystemURI : " + JSON.stringify(fileEntry));
                                     
                                        fileEntry.remove();
                                     
                                        localStorage.isSmallSQLiteForSpatialiteInstalled = "false";
                                     },
                                     function(){log("file smallSpatialDbName not exists");});
        
        
        window.resolveLocalFileSystemURI("file:///storage/sdcard0/" + fullSpatialDbName,
                                         function(fileEntry)
                                         {
                                            log("file fullSpatialDbName exists and will be removed");
                                         
                                            fileEntry.remove();
                                         
                                            localStorage.isFullSQLiteForSpatialiteInstalled = "false";
                                         
                                            if (isLittleModalPopUp)
                                                showLittleModalPopUp();
                                         
                                            $("#btnMenuFullSQLite").html(commonLabel[currentLang].downloadFullSQLite);
                                            $("#btnMenuFullSQLite").attr("href", "javascript:smallCopySQLiteDB()");
                                         },
                                         function(){log("file fullSpatialDbName not exists");});
    }
    else
  */
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             //log("deleteFullSQLite -> file system retrieved.");
                             
                             fs = fileSystem;
                             
                             log("deleteFullSQLite -> fileSystem : " + JSON.stringify(fileSystem));
                             
                             fs.root.getFile(smallSpatialDbName,
                                             {create: false},
                                             function (fileEntry)
                                             {
                                                 log("file smallSpatialDbName exists and will be removed");
                                                 
                                                 fileEntry.remove();
                                                 
                                                 localStorage.isSmallSQLiteForSpatialiteInstalled = "false";
                                             
                                             },
                                             function ()
                                             {
                                                log("file smallSpatialDbName not exists");
                                             }
                                             );
                                 
                                 
                             fs.root.getFile(fullSpatialDbName,
                                             {create: false},
                                             function (fileEntry)
                                             {
                                                 log("file fullSpatialDbName exists and will be removed");
                                                 
                                                 fileEntry.remove();
                                                 
                                                 localStorage.isFullSQLiteForSpatialiteInstalled = "false";
                                                 
                                                 if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                                 
                                                 $("#btnMenuFullSQLite").html(commonLabel[currentLang].downloadFullSQLite);
                                                 $("#btnMenuFullSQLite").attr("href", "javascript:smallCopySQLiteDB()");
                                             
                                             },
                                             function ()
                                             {
                                                log("file fullSpatialDbName not exists");
                                             }
                                             );
                             });
    }
}


function deleteTilesDb_8_16()
{
    if (isAndroid)
    {
        window.resolveLocalFileSystemURI(lDataFolderAndroid + "/" + MPtilesDb_8_16_name,
                                         function(fileEntry)
                                         {
                                            log("file MPtilesDb_8_16_name exists and will be removed");
                                         
                                            //log("deleteFullSQLite -> resolveLocalFileSystemURI : " + JSON.stringify(fileEntry));
                                         
                                            fileEntry.remove();
                                         
                                            localStorage.isMarseilleProvenceTiles_8_16_installed = "false";
                                         
                                            if (isLittleModalPopUp)
                                                showLittleModalPopUp();
                                         
                                            $("#btnMenuTilesDb_8_16").html(commonLabel[currentLang].downloadMPTiles_8_16);
                                            $("#btnMenuTilesDb_8_16").attr("href", "javascript:MPtilesDb_8_16_toDownload()");
                                         },
                                         function(){log("file MPtilesDb_8_16_name not exists");}
                                         );
        
        
        window.resolveLocalFileSystemURI(lDataFolderAndroid + "/" + pacaTilesName,
                                         function(fileEntry)
                                         {
                                            log("file pacaTilesName exists and will be removed");
                                         
                                            fileEntry.remove();

                                         },
                                         function(){log("file pacaTilesName not exists");}
                                         );
    }
    else
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log("deleteTilesDb_8_16 -> file system retrieved.");
                             
                             fs = fileSystem;
                             
                             fs.root.getFile(MPtilesDb_8_16_name,
                                             {create: false},
                                             function (fileEntry)
                                             {
                                                 log("file MPtilesDb_8_16_name exists and will be removed");
                                                 
                                                 fileEntry.remove();
                                                 
                                                 localStorage.isMarseilleProvenceTiles_8_16_installed = "false";
                                                 
                                                 if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                                 
                                                 $("#btnMenuTilesDb_8_16").html(commonLabel[currentLang].downloadMPTiles_8_16);
                                                 $("#btnMenuTilesDb_8_16").attr("href", "javascript:MPtilesDb_8_16_toDownload()");
                                             
                                             },
                                             function ()
                                             {
                                                log("file MPtilesDb_8_16_name not exists");
                                             }
                                             );
                             
                                 
                             fs.root.getFile(pacaTilesName,
                                             {create: false},
                                             function (fileEntry)
                                             {
                                                log("file pacaTilesName exists and will be removed");
                                             
                                                fileEntry.remove();
                                             },
                                             function ()
                                             {
                                                log("file pacaTilesName not exists");
                                             }
                                             );
                             
                             });
    }
}



function deleteAixSmall_17_19()
{
    if (isAndroid)
    {
        window.resolveLocalFileSystemURI(lDataFolderAndroid + "/" + "AixSmall_17_19.db",
                                         function(fileEntry)
                                         {
                                         log("file deleteAixSmall_17_19 exists and will be removed");
                                         
                                         fileEntry.remove();
                                         
                                         localStorage.isAixSmall_17_19_installed = "false";
                                         
                                         if (isLittleModalPopUp)
                                            showLittleModalPopUp();
                                         
                                         $("#btnAixSmall_17_19").html(commonLabel[currentLang].downloadAixSmall_17_19);
                                         $("#btnAixSmall_17_19").attr("href", "javascript:AixSmall_17_19_toDownload()");
                                         
                                         },
                                         function(){log("file AixSmall_17_19 not exists");}
                                         );
    }
    else
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                                 {
                                 log("deleteTilesDb_8_16 -> file system retrieved.");
                                 
                                 fs = fileSystem;
                                 
                                 fs.root.getFile("AixSmall_17_19.db",
                                                 {create: false},
                                                 function (fileEntry)
                                                 {
                                                 log("file AixSmall_17_19 exists and will be removed");
                                                 
                                                 fileEntry.remove();
                                                 
                                                 localStorage.isAixSmall_17_19_installed = "false";
                                                 
                                                 if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                                 
                                                 $("#btnAixSmall_17_19").html(commonLabel[currentLang].downloadAixSmall_17_19);
                                                 $("#btnAixSmall_17_19").attr("href", "javascript:AixSmall_17_19_toDownload()");
                                                 
                                                 },
                                                 function ()
                                                 {
                                                 log("file AixSmall_17_19 not exists");
                                                 }
                                                 );
                                 
                                 });
    }
}



function giveOpinionOnAppStore()
{
    log("giveOpinionOnAppStore 1 -> giveOpinionOnAppStore : " + localStorage.giveOpinionOnAppStore);
    
    if (localStorage.giveOpinionOnAppStore == "never")
        return;
    
    if (localStorage.giveOpinionOnAppStore === undefined)
        localStorage.giveOpinionOnAppStore = "0";
    
    log("giveOpinionOnAppStore 2 -> giveOpinionOnAppStore : " + localStorage.giveOpinionOnAppStore);
    
    var lNb = parseInt(localStorage.giveOpinionOnAppStore) + 1;
    
    localStorage.giveOpinionOnAppStore = lNb;
    
    if (lNb%nbTimesToVote == 0)
        showLittleModalPopUp('giveOpinionOnAppStore');
}


function stopOpinionOnAppStore()
{
    localStorage.giveOpinionOnAppStore = "never";
    showLittleModalPopUp();
}


function openSettingsOnHome()
{
    animateOpenMenu();
    
    setTabBarMenuBtnWithPosition(1);
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    localStorage.checkHomePopUp = "never";
}


function startAppAction(_arg)
{
    localStorage.startApp = "ok";
    
    showLittleModalPopUp();
    
    if (_arg == "en")
    {
        changeLanguage('en');
    }

    setTimeout(checkHomePopUp, 500);
}