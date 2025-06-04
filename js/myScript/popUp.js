function showModalPopUp(_title, _bgColor)
{
    if (menuIsOpened && !isModalPopUp)
        return;
    
    if (isHackToPreventClickFromCloseBtnPhotoSwipe)
        return;
    
    if ((_title == "transportHome" || _title == "timeHome")
        &&(cityBtnArray[currentCity] == "Geoloc" || cityBtnArray[currentCity] == "ChoosePosition")
        &&  !isNetWorkAvalaible)
    {
        var lUserPosition = cityBtnArray[currentCity] == "Geoloc" ? userLocation : userChoosePosition;
        
        if (localStorage.isFullSQLiteForSpatialiteInstalled != "true")
        {
            showLittleModalPopUp(null, commonLabel[currentLang].noConnectionandNoSpatialSqlite);
            return;
        }
        else
            if (!getInsideBound(boundBoxMarseille_10_12, lUserPosition.latitude, lUserPosition.longitude, 0))
            {
                showLittleModalPopUp(null, popUpResearchLabel[currentLang].noPositionInBound);
                return;
            }
            else
                if (currentActivity == "NoIdea")
                {
                    showLittleModalPopUp(null, popUpResearchLabel[currentLang].NoIdea);
                    return;
                }
        
        
    }
    
    if (isLeafletMap)
        removeAllLeafletPopUp();
    
    if (mPhotoSwipeHome)
        mPhotoSwipeHome.stop();
    
    //******************************************************************
    
    var lTitle = "";
    var lHtml = "";
    
    var bgColor;
    
    /*
    if (_bgColor == null)
        bgColor = "colorMP2013";
    else
        bgColor = _bgColor;
    */
    
    //log("showModalPopUp -> _title : " + _title + " | bgColor : " + bgColor);
    
	if (!isModalPopUp)
	{
        if (isProd || isProdWeb)
        {
            gaTrackPage('showModalPopUp : ' + _title);
            
            if (_title == "infosTransport" || _title == "infosPratiques")
                gaTrackEvent('showModalPopUp', 'idRepName : ' + listItems[currentItemDetail].idRepName, 'table : ' + listItems[currentItemDetail].table, 0);
        }
        
        
        //********************************************************************************
        
        mModalPopUpTitle = $("#mobileTitle2Label").html();
        
        if (_title == "Coordonnees")
        {
            lTitle = optionLabel[currentLang].contact;
            
            lHtml += '<div class="textModalPopUp">' + setAddressForItem(tempSelectedItem) + setPhoneMailSiteForItem(tempSelectedItem) + '</div>';
        }
        else
        if (_title.indexOf("Massifs") != -1)
        {
            var lId = _title.replace("Massifs:", "");
            
            var lMassif = getMassifWithId(lId);
            
            lTitle = lMassif.raisonsociale + " : " + accessMassifLabel[currentLang].villesConcernees;
            
            lHtml += MassifsHtmlPopUp(lMassif);
        }
        else
        if (_title == "Practical")
        {
            lTitle = titleForItem(tempSelectedItem);
            
            lHtml += '<div class="textModalPopUp">' + fillCompleteInfoWithMapItem(tempSelectedItem, null) + getBlockTimeToGo() + '</div>';
        }
        else
        if (_title == "Map")
        {
            lTitle = titleForItem(tempSelectedItem);
            
            lHtml += MapHtmlPopUp();
        }
        else
        if (_title == "accesMassif")
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml += accesMassifHtmlPopUp();
        }
        else
        if (_title == "infosTransport")
        {
            lTitle = commonLabel[currentLang].infosTransport;
            
            lHtml += infosTransportHtmlPopUp();
        }
        else
        if (_title == "infosPratiques")
        {
            lTitle = commonLabel[currentLang].infosPratiques;
            
            lHtml += InfosPratiquesHtmlPopUp();
        }
        else
        if (_title == "datePicker")
        {
            lTitle = commonLabel[currentLang].selectDate;
            
            lHtml += datePickerHtmlPopUp();
        }
        else
        if (_title == "typeMP2013")
        {
            lTitle = commonLabel[currentLang].selectType;
            
            lHtml += TypeMP2013HtmlPopUp();
        }
        else
        if (_title == "expoFilter")
        {
            lTitle = commonLabel[currentLang].selectFilter;
            
            lHtml += ExpoFilterHtmlPopUp();
        }
        
        switch (_title)
        {
            case "activityHome" :   {lTitle = selectionBlockLang[currentLang].activityTitle; lHtml += activityHomeHtmlPopUp();} break;
            case "cityHome" :       {lTitle = selectionBlockLang[currentLang].cityTitle; lHtml += cityHomeHtmlPopUp();} break;
            case "transportHome" :  {lTitle = selectionBlockLang[currentLang].transportTitle; lHtml += transportHomeHtmlPopUp();} break;
            case "timeHome" :       {lTitle = selectionBlockLang[currentLang].timeTitle; lHtml += timeHomeHtmlPopUp();} break;
        }
        
        
        if (getXsize() < 768)
        {
            currentYoffset = window.pageYOffset;
            
            //*********** init top & left ******************
            
            var lTop = $("#mobileTitle2").outerHeight();
            
            //********************** old absolute value ************************
            //$("#modalPopUp").css("top", getYsize() + currentYoffset + "px");
            
            $("#modalPopUp").css("left", "0px");
            $("#modalPopUp").css("display", "inline-block");
            $("#modalPopUp").css("width", "100%");
            $("#modalPopUp").css("top", getYsize() + "px");
            
            /********* TEST ****************
             $("#modalPopUp").css("height", "300px");
             $("#modalPopUp").css("background-color", "#000000");
             $("#modalPopUp").append(lHtml);
             $("#modalPopUp").append(lHtml);
             return;
             */
            
            $("#modalPopUp").css("min-height", (getYsize() - lTop) + "px");
            
            $("#modalPopUp").css("line-height", "150%");
            
            //*********** content ******************
            

            $("#modalPopUp").append(lHtml);
            
            
            //************************
            
            //log("modalPopUp -> lTop : " + lTop + " / currentYoffset : " + currentYoffset + " / getYsize() : " + getYsize());
            
            //************************************
            
            currentYoffset = window.pageYOffset;
            
            $("body").animate({scrollTop:0}, isIpad ? 400 : 200, 'linear', function()
                              {
                              $("#modalPopUp").animate({
                                                       top: lTop + "px"
                                                       //********** old absolute value ************
                                                       //top: currentYoffset + lTop + "px"
                                                       }, isIpad ? 600 : 300, 'linear', function()
                                                       {
                                                       
                                                       $("#mainContainer").css("display", "none");
                                                       
                                                       //************************
                                                       
                                                       if (_title == "activityHome" || _title == "cityHome" || _title == "transportHome" || _title == "timeHome")
                                                            setBorderAndBgForBtnSousTypePopUp(_title);
                                                       
                                                       $("#mobileTitle2").css("display", "inline-block");
                                                       
                                                       setAndAdjustTitleLabel(lTitle);
                                                       
                                                       //************************
                                                       
                                                       $("#backBtn").css("visibility", "visible");
                                                       $("#mainMenu").css("display", "none");
                                                       
                                                       $("#mobileTitle2Right").css("display", "none");
                                                       
                                                       bugScrollPositionFixed();
                                                       
                                                       });
                              });
		}
        else
        {
            var _xSize = 500;
            
            if (_title == "datePicker" || _title == "typeMP2013" || _title == "expoFilter")
                _xSize = 277;
            
            var _left = window.pageXOffset + ($(window).width() - _xSize) / 2;
            
            var _html =
            '<div id="popUp" class="corner" style="width:' + _xSize + 'px; left:' + _left + 'px;">'+
            '<div id="titlePopUp">' + lTitle + '</div>' +
            lHtml +
            '</div>';
            
            var _btn =
            '<a id="popUpBtn" href="javascript:showModalPopUp();" style="left:' + (_left - 18) + 'px;">' +
            '<img src="Assets/cross.png" />' +
            '</a>';
            
            $("body").append(_html);
            $("body").append(_btn);
            
            
            var _ySize = $("#popUp").outerHeight() - 10;
            
            if (_title == "datePicker")
                _ySize = 270;
            
            if (_title == "Map")
            {
                if (getYsize() <= 530)
                    _ySize = getYsize() - 30;
                else
                    _ySize = 500;
                
                $("#blockTextItemMapDetail").css("height", _ySize - $("#titlePopUp").outerHeight() - 10  + "px");
            }
            
            //************************
            
            var _top = window.pageYOffset + (($(window).height() - _ySize) / 2) + 20;
            
            if (_top <= 0)
                _top = 8;
            
            $("#popUp").css("top", _top + "px");
            $("#popUp").css("height", _ySize + "px");
            $("#popUpBtn").css("top", (_top - 18) + "px");
            
            
            //************************
            
            if (_title == "activityHome" || _title == "cityHome" || _title == "transportHome" || _title == "timeHome")
                setBorderAndBgForBtnSousTypePopUp(_title);
            
            
            if (!/Chrome|Safari/i.test(navigator.userAgent))
            {
                $("#blockTextItemMapDetail").mCustomScrollbar({scrollInertia:0,
                                                              scrollButtons:{enable:true}
                                                              });
            }
            
            setTransparentDivToTapAndClose();
        }
        
    
        
        if (_title == "datePicker")
            initDatePicker();
        
        isModalPopUp = true;
        
        if (_title == "datePicker" || _title == "typeMP2013" || _title == "expoFilter")
        {
            isDatePickerOpened = true;
        }
	}
    //************************* Delete pop up *********************
	else
	{
        if (getXsize() < 768)
        {
            if (_title == "activityHome" || _title == "cityHome" || _title == "transportHome" || _title == "timeHome")
            {
                $("#backBtn").css("visibility", "hidden");
                $("#mainMenu").css("display", "inline-block");
            }
            
            log("showMadPopUp delete -> homeStatus : " + homeStatus + " / mapStatus : " + mapStatus);
            
            var lTimeAnimation = (homeStatus == "Home" ? 300 : 300);
            
            if (isIpad)
                lTimeAnimation = lTimeAnimation * 2;
            
            //******************************************************************
            
            if (currentTable == "Index" && homeStatus == "Home")
                $("#mobileTitle2").css("display", "none");
            
            $("#mainContainer").css("display", "inline-block");
            
            setTimeout(function(){
                       
                       if (homeStatus == "Detail" || homeStatus == "Close")
                       {
                            if (mPhotoSwipe)
                                mPhotoSwipe.carousel.show(mIndexPhotoSwipe);
                       }
                       
                       
                       
                       //************************** animate *********************************
                       
                       $("#modalPopUp").animate({
                                                top: getYsize() + "px"
                                                //*************** old absolute value ************
                                                //top: currentYoffset + getYsize() + "px"
                                                }
                                                , lTimeAnimation, 'linear', function()
                                                {
                                                //*********** content ******************
                                                
                                                var divArray = $("#modalPopUp div");
                                                
                                                for (var i = 0; i < divArray.length; i++)
                                                {
                                                $(divArray[i]).css("display", "none");
                                                }
                                                
                                                //**************** gestion back bar item right *************************
                                                
                                                if (homeStatus == "Home" || (isTablePracticalLink && !isMapVisible))
                                                {
                                                $("#backBtn").css("visibility", "hidden");
                                                
                                                $("#mainMenu").css("display", "inline-block");
                                                }
                                                
                                                
                                                $("#mobileTitle2Right").css("display", "inline-block");
                                                
                                                //************************************
                                                
                                                $("#modalPopUp").css("display", "none");
                                                $("#modalPopUp").html("");
                                                
                                                if (homeStatus != "Home")
                                                $("body").animate({scrollTop:currentYoffset}, 300, 'linear', bugScrollPositionFixed);
                                                
                                                
                                                $(".textModalPopUp").remove();
                                                $("#datepicker").remove();
                                                $("#blockTextItemMapDetail").remove();
                                                
                                                });
                       }, 200);
        }
        else
        {
            $("#popUp").remove();
            $("#popUpBtn").remove();
        }
        
        
        //***************** Title ******************
        
        if (isTablePracticalLink)
            setAndAdjustTitleLabel(mModalPopUpTitle);
        else
        if (homeStatus == "List" && !isMapVisible)
        /********************* used for pop up mainSlectionList ****************/
            setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
        else
            setAndAdjustTitleLabel(mModalPopUpTitle);

        
        $("#mobileTitle2").css("background-color", "#fff");
        
        $("#mobileTitle2").css("color", "#a6537c");
        
        //***************** userChoosePosition ******************
        
        if (userChoosePosition == "GO")
            setTimeout(function(){
                       showMap('ChoosePosition');
                       userChoosePosition = null;
                       }, 200);
        
        //***************** reset ******************
        
        isModalPopUp = false;
        isDatePickerOpened = false;
        
        closeTransparentDivToTap();
	}
}



function activityHomeHtmlPopUp()
{
    var lHtml =
    '<div id="activityHomeMobile" style="width:100%;">' +
    
    '<a href="javascript:setMainSelectionItemsList(\'NoIdea\')" class="btnSousTypePopUp" id="NoIdeaBtnMobile">' + tableLabel[currentLang].NoIdea + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Circuits\')" class="btnSousTypePopUp" id="CircuitsBtnMobile">' + tableLabel[currentLang].Circuits + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Monuments\')" class="btnSousTypePopUp" id="MonumentsBtnMobile">' + tableLabel[currentLang].Monuments + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'PlageBaignadePiscine\')" class="btnSousTypePopUp" id="PlageBaignadePiscineBtnMobile">' + tableLabel[currentLang].PlageBaignadePiscine + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Restos\')" class="btnSousTypePopUp" id="RestosBtnMobile">' + tableLabel[currentLang].Restos + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Sortir\')" class="btnSousTypePopUp" id="SortirBtnMobile">' + tableLabel[currentLang].Sortir + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'SitesNaturels\')" class="btnSousTypePopUp" id="SitesNaturelsBtnMobile">' + tableLabel[currentLang].SitesNaturels + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'ExpositionsMusees\')" class="btnSousTypePopUp" id="ExpositionsMuseesBtnMobile">' + tableLabel[currentLang].ExpositionsMusees + '</a>' +
    
    
    '<a href="javascript:setMainSelectionItemsList(\'Shopping\')" class="btnSousTypePopUp" id="ShoppingBtnMobile">' + tableLabel[currentLang].Shopping + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Randonnee\')" class="btnSousTypePopUp" id="RandonneeBtnMobile">' + tableLabel[currentLang].Randonnee + '</a>' +

    
    '<a href="javascript:setMainSelectionItemsList(\'Dormir\')" class="btnSousTypePopUp" id="DormirBtnMobile">' + tableLabel[currentLang].Dormir + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Loisirs\')" class="btnSousTypePopUp" id="SortirBtnMobile">' + tableLabel[currentLang].Loisirs + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'SitesEscalade\')" class="btnSousTypePopUp" id="SitesEscaladeBtnMobile">' + tableLabel[currentLang].SitesEscalade + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'BonsPlans\')" class="btnSousTypePopUp" id="BonsPlansBtnMobile">' + tableLabel[currentLang].BonsPlans + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Canyons\')" class="btnSousTypePopUp" id="CanyonsBtnMobile">' + tableLabel[currentLang].Canyons + '</a>' +
    
    '<a href="javascript:setMainSelectionItemsList(\'Petanque\')" class="btnSousTypePopUp" id="PetanqueBtnMobile">' + tableLabel[currentLang].Petanque + '</a>' +
    
    '</div>';
    
    return lHtml;
}


function cityHomeHtmlPopUp()
{
    var lHtml =
    '<div id="cityHomeMobile" style="width:100%;">' +
    '<a href="javascript:getLocationForMainSelectionList();" class="btnSousTypePopUp" id="GeolocBtnMobile">'+ cityLabel[currentLang].Geoloc + '</a>' +
    '<a href="javascript:setMainSelectionChoosePosition()" class="btnSousTypePopUp" id="ChoosePositionBtnMobile">'+ cityLabel[currentLang].ChoosePositionOnMap + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'Marseille\')" class="btnSousTypePopUp" id="MarseilleBtnMobile">'+ cityLabel[currentLang].Marseille + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'Aix\')" class="btnSousTypePopUp" id="AixBtnMobile">'+ cityLabel[currentLang].Aix + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'Jouques\')" class="btnSousTypePopUp" id="JouquesBtnMobile">'+ cityLabel[currentLang].Jouques + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'NoMatterCity\')" class="btnSousTypePopUp" id="NoMatterCityBtnMobile">'+ selectionBlockLang[currentLang].NoMatter + '</a>' +
    '</div>';
    
    return lHtml;
}



function transportHomeHtmlPopUp()
{
    var lHtml =
    '<div id="transportHomeMobile" style="width:100%;">' +
    '<a href="javascript:setMainSelectionItemsList(\'pied\')" class="btnSousTypePopUp" id="piedBtnMobile">' + transportItems[currentLang].pied + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'velo\')" class="btnSousTypePopUp" id="veloBtnMobile">' + transportItems[currentLang].velo + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'auto\')" class="btnSousTypePopUp" id="autoBtnMobile">' + transportItems[currentLang].auto + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'bus\')" class="btnSousTypePopUp" id="busBtnMobile">' + transportItems[currentLang].bus + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'NoMatterTransport\')" class="btnSousTypePopUp" id="NoMatterTransportBtnMobile">'+ selectionBlockLang[currentLang].NoMatter + '</a>' +
    '</div>';
    
    return lHtml;
}



function timeHomeHtmlPopUp()
{
    var lHtml =
    '<div id="timeHomeMobile" style="width:100%;">' +
    '<a href="javascript:setMainSelectionItemsList(\'60\')" class="btnSousTypePopUp" id="60BtnMobile">1h</a>' +
    /*'<a href="javascript:setMainSelectionItemsList(\'120\')" class="btnSousTypePopUp" id="120BtnMobile">2h</a>' +*/
    '<a href="javascript:setMainSelectionItemsList(\'240\')" class="btnSousTypePopUp" id="240BtnMobile">' + timeItems[currentLang].demiJour + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'18000\')" class="btnSousTypePopUp" id="18000BtnMobile">' + timeItems[currentLang].jour + '</a>' +
    '<a href="javascript:setMainSelectionItemsList(\'NoMatterTime\')" class="btnSousTypePopUp" id="NoMatterTimeBtnMobile">'+ selectionBlockLang[currentLang].NoMatter + '</a>' +
    '</div>';
    
    return lHtml;
}


function setBorderAndBgForBtnSousTypePopUp(_title)
{
    var lBGColor;
    
    /*
    switch (_title)
    {
        case "activityHome" : lBGColor = "#a6537c"; break;
        case "cityHome" : lBGColor = "#285090"; break;
        case "transportHome" : lBGColor = "#566531"; break;
        case "timeHome" : lBGColor = "#aa6a44"; break;
        default : lBGColor = "#a6537c"; break;
    }
    
    if (getXsize() < 768)
    {
        $("#mobileTitle2").css("background-color", lBGColor);
    
        $("#mobileTitle2").css("color", "#fff");
    }
    else
    {
        $("#titlePopUp").css("background-color", lBGColor);
        
        $("#titlePopUp").css("color", "#fff");
    }
        */
        
    addBorderDottedRightBtnPop(_title);
    
    $("#popUp").css("height", $("#popUp").height() - 5 + "px");
    
    setBgForSelectedHomeTitlebtn(_title);
}



function addBorderDottedRightBtnPop(_title)
{
    var lBtnArray = $("#" + _title + "Mobile a");
    
    for (var i = 0; i < lBtnArray.length; i++)
    {
        if (i%2 == 0)
        {
            $(lBtnArray[i]).css("width", $(lBtnArray[i]).width() - 2 + "px");
            $(lBtnArray[i]).addClass("borderDottedRightBtnPop");
        }
    }
}


function setBgForSelectedHomeTitlebtn(_title)
{
    var lBtnArray = $("#" + _title + "Mobile a");
    
    for (var i = 0; i < lBtnArray.length; i++)
    {
        if (_title == "activityHome")
        {
            if ($(lBtnArray[i]).attr("id") ==  (currentActivity + "BtnMobile"))
            {
                $(lBtnArray[i]).css("color", "#a6537c");
            }
        }
        else
        if (_title == "cityHome")
        {
            if ($(lBtnArray[i]).attr("id") ==  (cityBtnArray[currentCity] + "BtnMobile"))
            {
                $(lBtnArray[i]).css("color", "#a6537c");
            }
        }
        else
        if (_title == "transportHome")
        {
            if ($(lBtnArray[i]).attr("id") ==  (currentTransport + "BtnMobile"))
            {
                $(lBtnArray[i]).css("color", "#a6537c");
            }
        }
        else
        if (_title == "timeHome")
        {
            if ($(lBtnArray[i]).attr("id") ==  (currentTime + "BtnMobile"))
            {
                $(lBtnArray[i]).css("color", "#a6537c");
            }
        }
    }
}



function MassifsHtmlPopUp(lMassif)
{
    var lHtml = "";
    
    var lCities = "";
    
    if (lMassif != null)
    {
        lCities = lMassif.ville;
    }
    
    log("lMassif.ville : " + lMassif.ville);
    
    lHtml += '<div class="textModalPopUp">' + lCities + '</div>';
    
    return lHtml;
}


function MapHtmlPopUp()
{
    var lHtml = "";
    
    var lText;
    
    if (tempSelectedItem.type == "MP2013")
        lText = getBlockTextForMP2013(tempSelectedItem)
        else
            lText = getBlockTextForMyItem(tempSelectedItem);
    
    lHtml += '<div id="blockTextItemMapDetail" style="padding-top:10px;">'+
    '<div id="diaporamaReduceMap"></div>'+
    getBlockLinkDetail(tempSelectedItem) +
    lText +
    getBlockTimeToGo() +
    '</div>';
    
    return lHtml;
}


function infosTransportHtmlPopUp()
{
    var lHtml = "";
    
    var lTransportText = transportByLangForItem(listItems[currentItemDetail]);
    
    if (lTransportText != "")
        lHtml += '<div class="textModalPopUp" style="font-weight:bold;">' + lTransportText + '</div>';
    
    if (listItems[currentItemDetail].bus == null && listItems[currentItemDetail].transport == undefined)
        lHtml += '<div class="textModalPopUp" style="font-weight:bold;">' + commonLabel[currentLang].noBusInfo + '</div>';
    
    /************* hack ot open navigator *******************/
    
    var lInfo = info_transport[currentLang];
    
    lInfo = lInfo.replace('lLinkLepilote', setLink('http://www.lepilote.fr', 'www.lepilote.fr', 'myBoldFont'));
    
    lInfo = lInfo.replace('lLinkSNCF', setLink('http://www.sncf-voyage.fr', 'www.sncf-voyage.fr', 'myBoldFont'));
    
    lInfo = lInfo.replace('lLinkBusAixMarseille', setLink('http://www.navetteaixmarseille.com', 'www.navetteaixmarseille.com', 'myBoldFont'));
    
    lInfo = lInfo.replace('lLinkBusAeroport', setLink('http://www.navettemarseilleaeroport.com', 'www.navettemarseilleaeroport.com', 'myBoldFont'));
    
    lInfo = lInfo.replace('lLinkAeroport', setLink('http://www.marseille.aeroport.fr', 'ww.marseille.aeroport.fr', 'myBoldFont'));
    
    lInfo = lInfo.replace('lLinkMp2', setLink('http://www.mp2.aeroport.fr', 'www.mp2.aeroport.fr', 'myBoldFont'));
    
    /*******************************************************/
    
    lHtml += '<div class="textModalPopUp">' + lInfo + '</div>';
    
    return lHtml;
}


function accesMassifHtmlPopUp()
{
    var lHtml = "";
    
    var lStatusHtml = "";
    
    var p3 = '<p>' + accessMassifLabel[currentLang].p3 + '</p>';
    
    if (currentTable == "Index" && typeof massifs != "undefined")
    {
        var lMassif = getCDTmassifWithId(massifArrayCdtId[listItems[currentItemDetail].mountains]);
        var lStatus = lMassif.status_tomorrow != null ? lMassif.status_tomorrow : lMassif.status;
        lTitle = accessMassifLabel[currentLang][lStatus];
        
        lStatusHtml = '<p class="accessMassifStatus">' + lTitle + '</p>';
        
        p3 = "";
    }
    
    lHtml += '<div style="padding:10px; line-height:130%;">'+
    lStatusHtml +
    '<p>' + accessMassifLabel[currentLang].title + '</p>' +
    '<br>' +
    '<p>' + accessMassifLabel[currentLang].p1 + '</p>' +
    '<br>' +
    '<p>' + accessMassifLabel[currentLang].p2 + '</p>' +
    '<br>' +
    p3 +
    '</div>';
    
    return lHtml;
}


function InfosPratiquesHtmlPopUp()
{
    var lHtml = "";
    
    var lMail = "";
    
    if (listItems[currentItemDetail].mail)
        lMail = '<br><a onclick="javascript:setGAtrackEventForMail()" href="mailto:' + listItems[currentItemDetail].mail + '">' + listItems[currentItemDetail].mail + '</a>';
    
    var lInfos = infosByLangForItem(listItems[currentItemDetail]) + lMail;
    
    var lGeoloc = '<div id="geolocInfo"><strong>Latitude, longitude</strong><br>' + listItems[currentItemDetail].latitude + ', ' +  listItems[currentItemDetail].longitude + '</div>';
    
    if (listItems[currentItemDetail].duplicateItems)
    {
        var lItemsArray = jQuery.parseJSON(listItems[currentItemDetail].duplicateItems);
        
        for (var t = 0; t < lItemsArray.length; t++)
        {
            for (var prop in lItemsArray[t])
            {
                if (lItemsArray[t].hasOwnProperty(prop) && prop == ("infos_" + currentLang))
                {
                    lInfos += '<div style="width:100%; display:inline-block;border-top: #515e71 solid 1px; margin:10px 0px; height:1px; "></div>' + lItemsArray[t][prop];
                }
            }
        }
        
        lGeoloc = "";
    }
    
    var lSautDeLigne = lInfos == "" ? '' : '<br><br>';
    
    lHtml +=
    '<div class="textModalPopUp">' +
    lInfos +
    lSautDeLigne +
    lGeoloc +
    '</div>';
    
    return lHtml;
}


function datePickerHtmlPopUp()
{
    var lHtml = "";
    
    var lWidth;
    
    if (getXsize() <= 768)
        lWidth = 'padding-left:' + (getXsize() - 250 - 25)/2 + 'px; margin-top:15px;';
    else
        lWidth = "";
    
    lHtml += '<div id="datepicker" style="width:250px; height:250px; display:block;' + lWidth + '"></div>';
    
    return lHtml;
}


function TypeMP2013HtmlPopUp()
{
    var lHtml = "";
    
    var musiqueText = (currentSousType == "Musique"	? typeMP2013Label[currentLang].musique + " *" : typeMP2013Label[currentLang].musique);
    var danseText = (currentSousType == "Danse"	? typeMP2013Label[currentLang].danse + " *" : typeMP2013Label[currentLang].danse);
    var theatreText = (currentSousType == "Théâtre"	? typeMP2013Label[currentLang].theatre + " *" : typeMP2013Label[currentLang].theatre);
    var beauxArtsText = (currentSousType == "Arts et Beaux-arts"	? typeMP2013Label[currentLang].beauxArts + " *" : typeMP2013Label[currentLang].beauxArts);
    var artDeRueText = (currentSousType == "Art de la rue"	? typeMP2013Label[currentLang].artDeRue + " *" : typeMP2013Label[currentLang].artDeRue);
    var cinemaText = (currentSousType == "Cinéma - documentaire"	? typeMP2013Label[currentLang].cinema + " *" : typeMP2013Label[currentLang].cinema);
    var litteratureText = (currentSousType == "Littérature et poésie"	? typeMP2013Label[currentLang].litterature + " *" : typeMP2013Label[currentLang].litterature);
    
    var _zHtml =
    '<a href="javascript:launchMP2013WithSousType(\'\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + typeMP2013Label[currentLang].all + '</a>'+
    '<a href="javascript:launchMP2013WithSousType(\'Musique\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + musiqueText + '</a>'+
    '<a href="javascript:launchMP2013WithSousType(\'Danse\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + danseText + '</a>'+
    '<a href="javascript:launchMP2013WithSousType(\'Théâtre\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + theatreText + '</a>' +
    '<a href="javascript:launchMP2013WithSousType(\'Arts et Beaux-arts\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + beauxArtsText + '</a>' +
    '<a href="javascript:launchMP2013WithSousType(\'Art de la rue\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + artDeRueText + '</a>' +
    '<a href="javascript:launchMP2013WithSousType(\'Cinéma - documentaire\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + cinemaText + '</a>' +
    '<a href="javascript:launchMP2013WithSousType(\'Littérature et poésie\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + litteratureText + '</a>';
    
    lHtml += '<div class="textModalPopUp" style="padding:0px">' + _zHtml + '</div>';
    
    return lHtml;
}



function ExpoFilterHtmlPopUp()
{
    var lHtml = "";
    
    var nocturneText = (currentFilter == "nocturne"	? typeMP2013Label[currentLang].nightHour + " *" : typeMP2013Label[currentLang].nightHour);
    var endIn7daysText = (currentFilter == "endIn7days"	? typeMP2013Label[currentLang].endIn7days + " *" : typeMP2013Label[currentLang].endIn7days);
    var endIn14daysText =	(currentFilter == "endIn14days"	? typeMP2013Label[currentLang].endIn14days + " *" : typeMP2013Label[currentLang].endIn14days);
    var freeText =	(currentFilter == "free"	? detailLang[currentLang].free + " *" : detailLang[currentLang].free.capitalize());
    
    var _zHtml = '<a href="javascript:launchBigExpoFilter(\'\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + typeMP2013Label[currentLang].none + '</a>'+
    '<a href="javascript:launchBigExpoFilter(\'nocturne\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + nocturneText + '</a>'+
    '<a href="javascript:launchBigExpoFilter(\'endIn7days\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + endIn7daysText + '</a>'+
    '<a href="javascript:launchBigExpoFilter(\'endIn14days\')" class="btnSousTypeMP2013 bgWhiteToUltraLightGray">' + endIn14daysText + '</a>';
    
    lHtml += '<div class="textModalPopUp" style="padding:0px">' + _zHtml + '</div>';
    
    return lHtml;
}





function showPopUpItem(_table, _idRepName, _bgColor)
{
    if (isModalPopUp)
        showModalPopUp();
    
    tempSelectedItem = getItemInDataList(_idRepName, _table);
    
    showModalPopUp("Map", _bgColor);
    
    setMapImageOrDiaporama(tempSelectedItem);
}




function showLittleModalPopUp(_type, _title, _arg)
{
    //log("showLittleModalPopUp -> _type : " + _type + " / _title : " + _title + " / _arg : " + _arg + " / isLittleModalPopUp : " + isLittleModalPopUp);
    
	if (!isLittleModalPopUp)
	{
        var lHtml = "";
        
        var lTitle = commonLabel[currentLang].information;
        
        var bgColor = "colorMP2013";
        
        var btn = "";
        
        //**********************************************************
        
        
        if (_type == "startApp")
        {
            lTitle = "Langue / Language";
            
            btn =   '<a href="javascript:startAppAction(\'fr\');" class="genericMauveBtn corner" style="margin:10px 5%; width:40%;">FR</a>' +
            '<a href="javascript:startAppAction(\'en\');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">EN</a><br><br>';
        }
        else
        if (_type == "updatedItems")
        {
            if (_arg > 1)
                lHtml = _arg + commonLabel[currentLang].updatedItems;
            else
                lHtml = _arg + commonLabel[currentLang].updatedItem;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:showNoIdeaItemsForCriteria(\'isUpdate\');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "exitApp")
        {
            if (isIOS && mapStatus == "IGN")
                lHtml = commonLabel[currentLang].exitAppIosIGN;
            else
                lHtml = commonLabel[currentLang].exitApp;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:openLink(\'' + _arg + '\');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "downloadMassifDb")
        {
            var _lTitle = commonLabel[currentLang].download;
            
            for (var prop in massifNameArray)
            {
                if (massifBoundsArray.hasOwnProperty(prop) && prop == _arg)
                {
                    _lTitle = massifNameArray[prop];
                    
                    break;
                }
            }
            
            if (_arg == "currentMassif")
            {
                _arg = mCurrentMassif;
                _lTitle = massifNameArray[mCurrentMassif];
            }
            
            var lSizeBD = Math.ceil(parseInt(massifDbSizeArray[_arg]) / (1024*1024));
            
            var lTitle = _lTitle + " - " + lSizeBD + "Mo";
            
            lHtml = commonLabel[currentLang].downloadMassifDb;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:downloadMassifDb(\'' + _arg + '\');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].download + '</a>';
        }
        else
        if (_type == "tipSearch" || _type == "tipMenu" || _type == "tipGoogle" || _type == "tipFavorite"
            || _type == "tipMassifDb" || _type == "tipRandoMap" || _type == "tipDiapo")
        {
            lTitle = commonLabel[currentLang].tip;
            lHtml = commonLabel[currentLang][_type];
            
            /*
             if(!localStorage.isFullTilesTracesDownloaded || localStorage.isFullTilesTracesDownloaded != "true")
             lHtml += "<br><br>" + commonLabel[currentLang].tipFullTilesTraces;
             */
            
            btn += '<a href="javascript:setTipForNoMorePopUp(\'' + _type + '\');" class="genericBlackBtn corner" style="margin:10px 0; width:50%; margin-left:25%;">' + commonLabel[currentLang].conprendo + '</a>';
        }
        else
        if (_type == "openSettingsOnHome")
        {
            lTitle = commonLabel[currentLang].tip;
            
            lHtml = commonLabel[currentLang].openSettingsOnHome;
            
            btn = '<a href="javascript:openSettingsOnHome();" class="genericMP2013Btn corner" style="margin:10px 5% 10px 10%; width:38%;">' + commonLabel[currentLang].ok + '</a>' +
            '<a href="javascript:showLittleModalPopUp();" class="genericMauveBtn corner" style="margin:10px 10% 10px 0%; width:37%;">' + commonLabel[currentLang].later + '</a>';
            /*
            '<a href="javascript:stopCheckHomePopUp();" class="genericBlackBtn corner" style="margin:0px 0px 8px 0px; width:80%; margin-left:10%;">' + commonLabel[currentLang].noMoreDisplay + '</a>'
             */
        }
        else
        if (_type == "busOnGeoloc")
        {
            lHtml = noTimeTransportLabel[currentLang].notAvailable + '<br>';
            
            btn += '<div style="display:inline-block; width:100%;">'+
            '<a href="javascript:setMainSelectionItemsList(\'bus\', \'Marseille\')" class="btnSousTypePopUp mauveGradient" style="height:35px; padding-top:20px;">' + cityLabel[currentLang].MarseilleStCharles + '</a>' +
            '<a href="javascript:setMainSelectionItemsList(\'bus\',\'Aix\')" class="btnSousTypePopUp mauveGradient" style="height:35px; padding-top:20px;">' + cityLabel[currentLang].AixGareRoutiere + '</a>' +
            '<a href="javascript:setMainSelectionItemsList(\'bus\',\'Arles\')" class="btnSousTypePopUp mauveGradient" style="height:35px; padding-top:20px;">' + cityLabel[currentLang].ArlesMairie + '</a>' +
            '</div>';
            
            btn += '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 0; width:40%; margin-left:30%;">' + commonLabel[currentLang].cancel + '</a>';
        }
        else
        if (_type == "giveOpinionOnAppStore")
        {
            lTitle = commonLabel[currentLang].yourOpinion;
            
            lHtml = commonLabel[currentLang].yourOpinionText;
            
            btn = '<a href="javascript:linkToAppStore();" class="genericMP2013Btn corner" style="margin:10px 5% 10px 10%; width:38%;">' + commonLabel[currentLang].ok + '</a>' +
            '<a href="javascript:showLittleModalPopUp();" class="genericMauveBtn corner" style="margin:10px 10% 10px 0%; width:37%;">' + commonLabel[currentLang].later + '</a>'+
            '<a href="javascript:stopOpinionOnAppStore();" class="genericGrayBtn corner" style="margin:0px 0px 8px 0px; width:80%; margin-left:10%;">' + commonLabel[currentLang].noMoreDisplay + '</a>';
        }
        else
        if (_type == "noItemListResult")
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml = "<strong>" + noResultsLabel[currentLang] + "</strong><br><br>" + noTimeTransportLabel[currentLang].modifyCriteria;
        }
        else
        if (_type == "noFavorites")
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml = '<div style="display:inline-block; width:100%; text-align:center;">' + commonLabel[currentLang].noFavorite + '</div>';
        }
        else
        if (_type == "openWebsite")
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml = commonLabel[currentLang].deleteFavorite;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:RemoveFromFavoritePage(' + _title + ');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].remove + '</a>';
        }
        else
        if (_type == "deleteFavorite")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].deleteFavorite;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:RemoveFromFavoritePage(' + _title + ');" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].remove + '</a>';
        }
        else
        if (_type == "downloadFailed")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].downloadFailed;
        }
        else
        if (_type == "downloadSqliteDb")
        {
            lHtml = commonLabel[currentLang].downloadSqliteDb;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:smallCopySQLiteDB();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].download + '</a>';
        }
        else
        if (_type == "gpsFailed")
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml = '<div style="text-align:justify;">' + commonLabel[currentLang].noGeoloc + '</div>';
        }
        else
        if (_type == "connectionOut")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].connectionOut;
            
            if (_arg == "connectionNeeded")
                lHtml = commonLabel[currentLang].connectionNeeded;
        }
        else
        if (_type == "confirmedDeleteFullSQLite")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].confirmedDeleteFullSQLite;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:deleteFullSQLite();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "confirmedDeleteTilesRando")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].confirmedDeleteTilesRando;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:deleteTilesRando();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "confirmedDeleteMPTiles_8_16")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].confirmedDeleteMPTiles_8_16;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:deleteTilesDb_8_16();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "confirmedDeleteAixSmall_17_19")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].confirmedDeleteAixSmall_17_19;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:deleteAixSmall_17_19();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "confirmedDeleteAllPictures")
        {
            lTitle = commonLabel[currentLang].carefull;
            
            lHtml = commonLabel[currentLang].confirmedDeleteAllPictures;
            
            btn =   '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:removeAllPictures();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].ok + '</a>';
        }
        else
        if (_type == "progressBar")
        {
            lTitle = _title;
            
            lHtml = '<div id="progressBar" style="display:inline-block; height:20px; margin:10px 0% 0px 0%; background-color:#285090; background-repeat:no-repeat; background-size:100% 100%;"></div>';
            
            var lLabel = _arg == "ftPicture" ? commonLabel[currentLang].stop : commonLabel[currentLang].cancel;
            
            if (_arg != "noCancelBtn" && _arg != "homeSearch")
                btn = '<a href="javascript:cancelDownload(\'' + _arg + '\');" class="genericBlackBtn corner" style="margin:10px 30%; width:40%;">' + lLabel + '</a>';
            
            if (_arg != "homeSearch")
                setLoadingAnimation(0.5, "full");
        }
        else
        if (_type == fullSpatialDbName)
        {
            lTitle = commonLabel[currentLang].information;
            
            lHtml = commonLabel[currentLang].downloadFullSpatialBd;
            
            btn = '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].cancel + '</a>' +
            '<a href="javascript:smallCopySQLiteDB();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].download + '</a>';
        }
        else
        if (_type == "updateApp")
        {
            lTitle = updateData["title_" + currentLang];
            
            lHtml = updateData["message_" + currentLang];
            
            btn = '<a href="javascript:linkToAppStore();" class="genericMP2013Btn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].download + '</a>' +
            '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 5%; width:40%;">' + commonLabel[currentLang].later + '</a>';
            
        }
        else
        {
            //log("&&&&&&&& showLittleModalPopUp -> no type");
            
            if (_title)
                lHtml = _title;
            
            btn = '<a href="javascript:showLittleModalPopUp();" class="genericBlackBtn corner" style="margin:10px 0; width:40%; margin-left:30%;">' + commonLabel[currentLang].ok + '</a>';
        }
        
        var _xSize = 277;
        
        var _left = window.pageXOffset + (getXsize() - _xSize - 10) / 2;
        
        var _html =
        '<div id="littlePopUp" class="corner" style="width:' + _xSize + 'px; background-color:#fff; border:#515e71 solid 5px;' +
        ' position:fixed; left:' + _left + 'px; z-index:5005; color:#515e71; font-size:14px;">'+
        '<h2 id="contentLittlePopUp" style="text-align:center; background-color:#f1f1f1; color:#515e71; padding:10px">' + lTitle + '</h2>' +
		'<div class="textLittlePopUp">' + lHtml + '</div>' +
        btn +
        '</div>';
        
        
        //log("&&&&&&&& _html -> " + _html);
        //log($("body"));
        
        $("body").append(_html);
        
        var _ySize = $("#littlePopUp").outerHeight() - 10;
        
        var _top = ((getYsize() - _ySize) / 2);
        
        if (_top <= 0)
            _top = 8;
        
        $("#littlePopUp").css("top", _top + "px");
        $("#littlePopUp").css("height", _ySize + "px");        
		
		isLittleModalPopUp = true;
        
        setTransparentDivToTapAndClose();
	}
	else
	{
        $("#littlePopUp").remove();
        
        isLittleModalPopUp = false;
        
        closeTransparentDivToTap();
	}
}
