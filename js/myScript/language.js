function firstStepOfLocalizedItems()
{
	$("#listMainMenu").html('');
    
    setMainMenu();
    
    setSizeForMenu();
    
    setMyPageWithLang();

    setHomeTitle();

    //alert($("#mobileTitle2Label").outerHeight());
}


function setHomeTitle()
{
    if (currentTable == "Index")
	{
		if (!isLikeMobile)
			setAndAdjustTitleLabel(titleLabel[currentLang]);
		else
        {
			setAndAdjustTitleLabel(titleMobileLabel[currentLang]);
        }
	}
    else
    if (currentTable == "Contact")
    {
        setAndAdjustTitleLabel(menuLabel[currentLang].contactMenu);
    }
    else
    if (currentTable == "routingMap" || currentTable == "randoMap")
        setAndAdjustTitleLabel(menuLabel[currentLang][currentTable + "Menu"].capitalize());
    else
    {
        setAndAdjustTitleLabel(optionLabel[currentLang][currentTable].capitalize());
    }
}



function setTextForMainSelectionItemTitle()
{
    if (currentActivity != -1)
    {
        var lText;
        var lTableLabel;
        
        if (currentActivity != "NoIdea")
            lTableLabel = tableLabel[currentLang][currentActivity].toLowerCase();
        
        if (currentActivity == "NoIdea")
        {
            lText = selectionBlockLang[currentLang].activityTitle;
            lTableLabel = "<br>" + tableLabel[currentLang][currentActivity];
        }
        else
        {
            lText = selectionBlockLang[currentLang].activityTitleSelected;
            
            if (currentLang == "fr" && voyelleArray.indexOf(lTableLabel.charAt(0)) != -1)
                lText = selectionBlockLang[currentLang].activityTitleSelectedVoyelle;
        }
        
        $("#activityHome").html("<p>" + lText + "<strong>" + lTableLabel + "</strong></p>");
    }
    else
    {
        $("#activityHome").html("<p>" + selectionBlockLang[currentLang].activityTitle + "</p>");
    }
    
    
    if (currentCity != -1)
    {
        var lLabel = cityLabel[currentLang][cityBtnArray[currentCity]];
        
        if (cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
            lLabel = lLabel.toLowerCase();
        
        var lText;
        
        if (cityBtnArray[currentCity] == "ChoosePosition")
            lText = selectionBlockLang[currentLang].cityTitleSelectedUne;
        else
        if (currentLang == "fr" && voyelleArray.indexOf(lLabel.toLowerCase().charAt(0)) != -1)
            lText = selectionBlockLang[currentLang].cityTitleSelectedVoyelle;
        else
            lText = selectionBlockLang[currentLang].cityTitleSelected;
        
        $("#cityHome").html("<p>" + lText + "<strong>" + lLabel + "</strong></p>");
    }
    else
    {
        $("#cityHome").html("<p>" + selectionBlockLang[currentLang].cityTitle + "</p>");
    }
    
    if (currentTransport != -1)
    {
        $("#transportHome").html("<p>" +selectionBlockLang[currentLang].transportTitleSelected + "<strong>" + setTextForTransport(currentTransport) + "</strong></p>");
    }
    else
    {
        $("#transportHome").html("<p>" +selectionBlockLang[currentLang].transportTitle + "</p>");
    }
    
    
    if (currentTime != -1)
    {
        var lLabel;
        
        if (currentTime == "240")
            lLabel = timeItems[currentLang].demiJour;
        else
            if (currentTime == "18000")
                lLabel = timeItems[currentLang].jour;
            else
                lLabel = setDuration(parseInt(currentTime));
        
        $("#timeHome").html("<p>" + selectionBlockLang[currentLang].timeTitleSelected + "<strong>" + lLabel + "</strong></p>");
    }
    else
    {
        $("#timeHome").html("<p>" + selectionBlockLang[currentLang].timeTitle + "</p>");
    }
}


function makeTitleForHomeStatusAsList()
{
    //log("makeTitleForHomeStatusAsList -> currentActivity : " + currentActivity + " / currentCity : " + currentCity + " / currentTransport : " + currentTransport + " / currentTime : " + currentTime);
    
    var lTitle = "";
    
    if (currentActivity != -1)
    {
        /*
        if (currentActivity == "NoIdea" &&  currentCity != -1)
            lTitle = "";
        else
         */
            lTitle += tableLabel[currentLang][currentActivity];
    }
    
    if (currentCity != -1)
    {
        if (lTitle.length > 0)
        {
            if (getXsize() >= 480)
                lTitle += " - ";
            else
                lTitle += '<br>';
        }
        
        if (cityBtnArray[currentCity] == "Geoloc")
            lTitle += commonLabel[currentLang].arroundMe;
        else
        if (cityBtnArray[currentCity] == "ChoosePosition")
            lTitle += cityLabel[currentLang].ChoosePosition;
        else
        if (currentTime != -1 && getXsize() <= 570)
            lTitle += fromCityLabel[currentLang][cityBtnArray[currentCity]];
        else
            lTitle += cityLabel[currentLang][cityBtnArray[currentCity]];
    }
    
    if (currentTransport != -1)
    {
        if (lTitle.length > 0)
        {
            if (getXsize() <= 570)
                lTitle += "<br>";
            else
                lTitle += " - ";
        }


        lTitle += setTextForTransport(currentTransport).toLowerCase();
        
        //currentTransport == "pied" ? lTitle += "à " + currentTransport : lTitle += "en " + currentTransport;
        
        if (currentTime != -1)
        {
            lTitle.length > 0 ? lTitle += " - " : "";
            
            if (currentTime == "18000")
                lTitle += timeItems[currentLang].jour;
            else
                lTitle += setDuration(parseInt(currentTime));
        }
    }
    
    if (lTitle == "")
    {
        setHomeTitle();
        return;
    }
    
    return lTitle;
}


function setTextForTransport(_type)
{
    var lLabel;
    
    if (currentLang == "fr")
    {
        if (_type == "pied")
        {
            lLabel = "à pied";
        }
        else
        {
            var ltransport = _type == "bus" ? "bus" : transportItems[currentLang][_type];
            lLabel = "en " + ltransport;
        }
    }
    else
    {
        if (_type == "pied")
        {
            lLabel = " " + transportItems[currentLang][_type];
        }
        else
        {
            var ltransport = _type == "bus" ? "bus" : transportItems[currentLang][_type];
            lLabel = "by " + ltransport;
        }
        
    }
    
    return lLabel;
}


function setAndAdjustTitleLabel(_title)
{
    $("#mobileTitle2Label").html(_title);
    
    var lHeight = $("#mobileTitle2Label").outerHeight();
    
    //log ("@@@@@@@@@@@@@@@@@@ setAndAdjustTitleLabel -> lHeight  : " + lHeight);
    
    if (getXsize() <= 550)
    {
        if (lHeight > 95)
            $("#mobileTitle2Label").css("font-size", "1em");
        else
        if (lHeight > 57)
            $("#mobileTitle2Label").css("font-size", "1.1em");
        else
            $("#mobileTitle2Label").css("font-size", "1.2em");
    }
    else
    {
        if (lHeight > 95)
            $("#mobileTitle2Label").css("font-size", "16px");
        else
        if (lHeight > 57)
            $("#mobileTitle2Label").css("font-size", "17px");
        else
            $("#mobileTitle2Label").css("font-size", "18px");
    }
    
    $("#mobileTitle2Label").css("margin-top", (($("#mobileTitle2").outerHeight() - $("#mobileTitle2Label").outerHeight())/2) - 12 + "px");
    
    $("#mobileTitle2Label").css("display", "inline-block");
}


function setTitleAndMetaInHead()
{
    if (currentTable == "Index")
        document.title = metaLabel[currentLang].titleHome;
    else
    if (currentTable == "routingMap" || currentTable == "randoMap")
        document.title = menuLabel[currentLang][currentTable + "Menu"].capitalize() + " - Marseille Provence";
    else
        document.title = optionLabel[currentLang][currentTable].capitalize() + " - Marseille Provence";
}


function setTitleAndMetaInHead2()
{
    if (currentActivity != -1)
        document.title = tableLabel[currentLang][currentActivity] + " - Marseille Provence";
}


function setMyPageWithLang()
{
    $("#trierBtnItemList").html(commonLabel[currentLang].Trier);
    
    $("#searchForm").val(commonLabel[currentLang].Research + "...");
    
    $("#closeBtnItemList").html(commonLabel[currentLang].closestOne);
    
    if (currentTable == "Massifs")
    {
        $("#massifRulesBtnItemList").html(accessMassifLabel[currentLang].massifsRules);
    }
    else
    if (currentTable == "MetroTram")
    {
        $("#metroTramBtnMenu0").html(practicalLabel[currentLang].stations);
        $("#metroTramBtnMenu1").html(practicalLabel[currentLang].lignes);
    }
    else
    if (currentTable == "LocationVelo")
    {
        $("#veloBtnMenu0").html(practicalLabel[currentLang].VeloMPM + " - Marseille");
        $("#veloBtnMenu1").html(practicalLabel[currentLang].rentalShops + " - Provence");
    }
    else
    if (currentTable == "Parkings")
    {
        $("#parkingsBtnMenu0").html(optionLabel[currentLang].Parkings);
        $("#parkingsBtnMenu1").html(optionLabel[currentLang].CampingsCar);
        
        $("#parkingRelaiBtn").html(commonLabel[currentLang].showOnlyParkingRelai);
    }
    else
    if (currentTable == "MoniteursEscalade")
    {
        $("#moniteursBtnMenu0").html(practicalLabel[currentLang].AccompagnateurMoniteur);
        $("#moniteursBtnMenu1").html(menuLabel[currentLang].parcAccroMenu);
    }
    else
    if (currentTable == "Contact")
    {
        $("#infosContact").html(contactLabel[currentLang]);
        
        var lBDRTLabel = partenariatDBRT[currentLang];
        var lLinkBDRT = setLink('http://data.visitprovence.com', 'data.visitprovence.com');
        lBDRTLabel = lBDRTLabel.replace("linkBDRT", lLinkBDRT);
        
        $("#partenariatBDRT").html(lBDRTLabel);
        
    }
    else
    if (currentTable == "Index")
    {        
        $("#closeLabel").html(detailLabel[currentLang].close);
        
        $("#spanMapdetail").html(commonLabel[currentLang].mapItinary);
        $("#addFavorite").html(commonLabel[currentLang].favorite);
        $("#transportBtn").html(commonLabel[currentLang].infosTransport);
        $("#spanInfosPratiquesdetail").html(commonLabel[currentLang].infosPratiques);
        $("#spanDiaporamadetail").html(commonLabel[currentLang].diaporama);
        $("#spanClosedetail").html(detailLabel[currentLang].close);
        $("#closeLinkTitle").html(detailLabel[currentLang].toDoToSee);
        
        $("#accessMassifBtn").html(accessMassifLabel[currentLang].titleBtn);
        
        $("#activityHome img").attr("src", "Assets/engine/450/Activity_" + currentLang + ".png");
        $("#cityHome img").attr("src", "Assets/engine/450/Cible_" + currentLang + ".png");
        $("#transportHome img").attr("src", "Assets/engine/450/Transport_" + currentLang + ".png");
        $("#timeHome img").attr("src", "Assets/engine/450/Time_" + currentLang + ".png");
        
        
        
    }
    

	

    /*
    if ($("#btnTypeMP2013").html().indexOf("*") != -1)
		$("#btnTypeMP2013").html(typeMP2013Label[currentLang].genres + "*");
	else
		$("#btnTypeMP2013").html(typeMP2013Label[currentLang].genres);
	
	if ($("#btnFilterMP2013").html().indexOf("*") != -1)
		$("#btnFilterMP2013").html(commonLabel[currentLang].filters + "*");
	else
		$("#btnFilterMP2013").html(commonLabel[currentLang].filters);
	
	
	if ($("#btnDateMP2013").html().indexOf("*") != -1)
		$("#btnDateMP2013").html(commonLabel[currentLang].date + "*");
	else
		$("#btnDateMP2013").html(commonLabel[currentLang].date);
	
	
	if ($("#btnFreeMP2013").html().indexOf("*") != -1)
		$("#btnFreeMP2013").html(detailLang[currentLang].free.capitalize() + "*");
	else
		$("#btnFreeMP2013").html(detailLang[currentLang].free.capitalize());
    */
}

/*
function displayOrNotNextResultsBtn()   // displayItemListBottomBtn
{
    var _int;
    
    var lNbNextResult = listItems.length - indexItemList;
    
    if (lNbNextResult >= 10)
        _int = 10;
    else
        _int = lNbNextResult;
    
    var lHtml = "";
    
    log("displayOrNotNextResultsBtn -> _int : " + _int);
    
    if (_int == 0)
    {
        $("#itemListBottomBtn").css("display", "none");
    }
    else
    {
        if (_int == 1)
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
}
*/