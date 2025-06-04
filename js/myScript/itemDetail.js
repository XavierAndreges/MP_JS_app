function fillDetailsWithItem (_item)
{
    //********** FAVORITE BTN **************
    
    if(getItemsInFavoritesArray(_item.idRepName) != -1)
	{
        $("#iconFavorite").attr("src", "Assets/icon_favorite_remove.png");
    }
	else
	{
		$("#iconFavorite").attr("src", "Assets/icon_favorite_add.png");
	}
    
    $("#favoriteDetailLink").attr("href", "javascript:addOrRemoveFavorite('" + _item.idRepName + "', '" + _item.table + "')");
	
	//********** DIAPO BTN **************
    
    if(_item.tabDiapo == undefined)
        $("#diaporamaBtn").css("display", "none");
    else
		$("#diaporamaBtn").css("display", "inline-block");
    
    //************ IGN BTN ************
    
    if (_item.table == "Randonnee" || (_item.table == "SitesEscalade" && _item.approcheIGN != null)
        || (_item.table == "Canyons" && _item.traceIGN != null)
        )
    {
        $("#btnIGNdetail").css("display", "inline-block");
        
        if (currentActivity == "Randonnee" || currentActivity == "Canyons")
            $("#spanIGNdetail").html(commonLabel[currentLang].traceIGN);
        
        if (currentActivity == "SitesEscalade")
            $("#spanIGNdetail").html(commonLabel[currentLang].accesIGN);
    }
    else
    {
        $("#btnIGNdetail").css("display", "none");
    }
    
    //************ infos BTN ************
    
    if (infosByLangForItem(_item) != null)
    {
        $("#infosBtn").css("display", "inline-block");
    }
    else
    {
        $("#infosBtn").css("display", "none");
    }
    
    //********** TEXT **************
    
    $("#blocTextDetail").html('');
    
    
	if (_item.type == "MP2013")
	{
        $("#blocTextDetail").html(getBlockTextForMP2013(_item));
	}
    else
    {
        $("#blocTextDetail").html(getBlockTextForMyItem(_item));
    }
}


function readMoreTextDetail()
{
    if (isMapVisible)
        $("#textDetailSpanMap").html(textByLangForItem(tempSelectedItem));
    else
        $("#textDetailSpan").html(textByLangForItem(listItems[currentItemDetail]));
    
    $("#readMoreTextDetailLink").remove();
}



function getBlockTextForMyItem(_item)
{
    var lHtml = "";
    var lType = "";
    
    log("getBlockTextForMyItem - > _item : ");
    log(_item);
    
    
    lHtml += getMacaronHtml(_item, 'macaron2');
    
    lHtml += '<div class="technicalInfosDetail">';
    
    /**************** title ********************/
    
    if (currentLang != "fr" && _item.title_en != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].frenchTitle + '</span> : ' + _item.title_fr + '</p>';
    
    
    /**************** type ********************/
    
    if (_item.table == "Restos")
    {
        lType = _item["type_" + currentLang];
    }
    else
    {
        var typeArray = _item.type.split(", ");
        var lType = "";
        
        for (var i = 0; i < typeArray.length; i++)
        {
            if (i == 0)
                lType = ("" + typeLabel[currentLang][typeArray[i]]);
            else
                lType += (" / " + typeLabel[currentLang][typeArray[i]]);
        }
    }
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + detailLang[currentLang].type + '</span> : ' + lType.toLowerCase() + '</p>';
    
    /**************** massif ********************/
    
    if (_item.mountains != undefined && _item.mountains != "")
    {
        lHtml += '<p  style="font-weight:bold;"><span class="labelDetailText">' + detailLang[currentLang].massif + '</span> : ' + _item.mountains + '</p>';
    }
    
    /**************** city ********************/
    
    lHtml += '<p  style="font-weight:bold;"><span class="labelDetailText">' + detailLang[currentLang].city + '</span> : ' + setCities(_item) + '</p>';
    
    /**************** promo ********************/
    
    if (_item["promo_" + currentLang])
        lHtml += '<p  style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].promo + '</span> : ' + _item["promo_" + currentLang] + '</p>';
    
    /**************** Technical infos ******************/
    
    if (_item.table == "Randonnee")
    {
        lHtml += getTechnicalTextForRandonnee(_item);
    }
    else
    if (_item.table == "SitesEscalade")
    {
        lHtml += getTechnicalTextForSitesEscalade(_item);
    }
    else
    if (_item.table == "Petanque")
    {
        lHtml += getTechnicalTextForPetanque(_item);
    }
    else
    if (_item.table == "Canyons")
    {
        lHtml += getTechnicalTextForCanyons(_item);
    }
    else
    if (_item.table == "PlageBaignadePiscine" || currentActivity == "PlageBaignadePiscine")
    {
        lHtml += getTechnicalTextForPlageBaignadePiscine(_item);
    }
    else
    if (_item.table == "Restos")
    {
        lHtml += getTechnicalTextForRestos(_item);
    }
    else
    if (_item.table == "Dormir")
    {
        lHtml += getTechnicalTextForDormir(_item);
    }
    
    lHtml += '</div>';
    
    /**************** text ********************/
    
    //log("textByLangForItem(_item) : " + textByLangForItem(_item).length);
    
    if (textByLangForItem(_item) != undefined && (textByLangForItem(_item).length < 1000 || _item.table != "Randonnee" || isIpad))
    {
        //<span class="labelDetailText">' + detailLang[currentLang].presentation + '</span> :
        
        lHtml += '<p style="text-align:justify;">' + textByLangForItem(_item) + '</p>';
    }
    else
    {
        var lText = resumeByLangForItem(_item);
        
        var idtextDetailSpan = (isMapVisible ? "textDetailSpanMap" : "textDetailSpan");
        
        //<span class="labelDetailText">' + detailLang[currentLang].presentation + '</span> :
        
        lHtml += '<p style="text-align:justify;"><span id="'+ idtextDetailSpan + '">' + lText + ' <a id="readMoreTextDetailLink" href="javascript:readMoreTextDetail()">' + detailLang[currentLang].readMore + '</a></span></p>';
    }
    
    /**************** link ********************/
    
    if (_item.link != undefined)
    {
        lHtml += '<p><span class="labelDetailText">' + detailLang[currentLang].moreInfo + '</span> : ' +
        setLink(_item.link, _item.link) +
        '</p>';
    }
    
    if (_item.table == "SitesEscalade"
        //&& _item.isUpdate
        )
    {
        lHtml += detailLabel[currentLang].isUpdateNextVersion;
    }
    
    /************* ACCES MASSIF *****************/
    
    if (_item.mountains == undefined || (_item.mountains != undefined && massifArray.indexOf(_item.mountains) == -1))
        $("#accessMassifBtn").css("display", "none");
    else
        $("#accessMassifBtn").css("display", "inline-block");
    
    return lHtml;
}



function getTechnicalTextForRandonnee(_item)
{
    var lHtml = "";
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].duration + '</span> : ' + setDuration(_item.duration) + '</p>';
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].distance + '</span> : ' + setDistance(_item.distance) + '</p>';
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].denivele + '</span> : ' + setDistance(_item.denivele) + '</p>';
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].altitudeMax + '</span> : ' + _item.altitudeMax + 'm</p>';
    
    return lHtml;
}


function getTechnicalTextForSitesEscalade(_item)
{
    var lHtml = "";
    
    if (_item.cotationMediane != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].cotationMediane + '</span> : ' + _item.cotationMediane + '</p>';
    
    if (_item.cotationMax != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].cotationMax + '</span> : ' + _item.cotationMax + '</p>';
    
    if (_item.cotationMin != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].cotationMin + '</span> : ' + _item.cotationMin + '</p>';
    
    if (_item.longueurMax != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].longueurMax + '</span> : ' + _item.longueurMax + 'm</p>';
    
    if (_item.approche != 0)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].marcheApproche + '</span> : ' + setDuration(_item.approche) + '</p>';
    
    if (_item.dureeMoyenne != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].dureeMoyenne + '</span> : ' + setDuration(_item.dureeMoyenne) + '</p>';
    
    if (_item.orientation != null)
    {
        var lArray = _item.orientation.split(",");
        
        var lOrientationHtml = "";
        
        for (var i = 0; i < lArray.length; i++)
        {
            var lArray2 = lArray[i].replace(" ", "").split("-");
            
            log("getBlockTextForMyItem -> lArray2 : " + JSON.stringify(lArray2));
            
            if (i > 0)
                lOrientationHtml += ", ";
            
            for (var l = 0; l < lArray2.length; l++)
            {
                if (l == 1)
                    lOrientationHtml += "-";
                
                lOrientationHtml += typeLabel[currentLang][lArray2[l]];
            }
        }
        
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang].orientation + '</span> : ' + lOrientationHtml + '</p>';
    }
    
    var lVueMer = (_item.vueMer && _item.vueMer == 1) ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].vueMer + '</span> : ' + lVueMer + '</p>';
    
    var lNoMistral = (_item.noMistral && _item.noMistral == 1) ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].noMistral + '</span> : ' + lNoMistral + '</p>';
    
    lHtml += checkForTopo(_item);
    
    return lHtml;
}


function getTechnicalTextForPetanque(_item)
{
    var lHtml = "";
    
    //************** lOuvertNuit ***************
    
    var ouvertNuit = _item.ouvertNuit == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    
    if (_item.ouvertNuit == null)
        ouvertNuit = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].ouvertNuit + '</span> : ' + ouvertNuit + '</p>';
    
    //************** eclairage ***************
    
    var eclairage = _item.eclairage == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    
    if (_item.eclairage == null)
        eclairage = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].eclairage + '</span> : ' + eclairage + '</p>';
    
    //************** club ***************
    
    var club = _item.club == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    
    if (_item.club == null)
        club = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].club + '</span> : ' + club + '</p>';
    
    //************** club ***************
    
    var eauPotable = _item.eauPotable == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    
    if (_item.eauPotable == null)
        club = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].eauPotable + '</span> : ' + eauPotable + '</p>';
    
    //************** lVueMer ***************
    
    var lVueMer = _item.vueMer ? commonLabel[currentLang].yes : commonLabel[currentLang].no;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].vueMer + '</span> : ' + lVueMer + '</p>';
    
    
    return lHtml;
}


function getTechnicalTextForRestos(_item)
{
    var lHtml = "";
    
    var lInfo = commonLabel[currentLang].nc;
    
    //************** Specialite ***************
    
    
    if (_item["speciality_" + currentLang])
    {
        var lLabel = "";
        
        lInfo = _item["speciality_" + currentLang];
        
        if (_item["speciality_" + currentLang].indexOf(",") != -1)
            lLabel = commonLabel[currentLang].specialities;
        else
            lLabel = commonLabel[currentLang].speciality;
        
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + lLabel + '</span> : ' + lInfo + '</p>';
    }
    
    
    //************** Prix moyen ***************
    
    if (_item.prixMoyen)
        lInfo = _item.prixMoyen + "€";
    else
        lInfo = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].prixMoyen + '</span> : ' + lInfo + '</p>';
    
    //************** vin ***************
    
    if (_item.vin)
        lInfo = _item.vin == 0 ? commonLabel[currentLang].no.toLowerCase() : commonLabel[currentLang].from + " " + _item.vin + "€";
    else
        lInfo = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].vin + '</span> : ' + lInfo + '</p>';
    
    //************** pichet ***************
    
    if (_item.pichet)
        lInfo = _item.pichet == 0 ? commonLabel[currentLang].no.toLowerCase() : _item.pichet + "€";
    else
        lInfo = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].pichet + '</span> : ' + lInfo + '</p>';
    
    //************** terrasse ***************
    
    if (_item.terrasse)
        lInfo = _item.terrasse == 1 ? commonLabel[currentLang].yes.toLowerCase() : commonLabel[currentLang].no.toLowerCase();
    else
        lInfo = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].terrasse + '</span> : ' + lInfo + '</p>';
    
    //************** ruePietonne ***************
    
    if (_item.terrasse == 1 && _item.ruePietonne == 1)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].ruePietonne + '</span> : ' + commonLabel[currentLang].yes.toLowerCase() + '</p>';
    
    
    
    //************** lVueMer ***************
    
    if (_item.vueMer)
        lInfo = _item.vueMer == 1 ? commonLabel[currentLang].yes.toLowerCase() : commonLabel[currentLang].no.toLowerCase();
    else
        lInfo = commonLabel[currentLang].nc;
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].vueMer + '</span> : ' + lInfo + '</p>';
    
    //************** lVueMer ***************
    
    if (_item.takeAway)
        lInfo = _item.takeAway == 1 ? commonLabel[currentLang].yes.toLowerCase() : commonLabel[currentLang].no.toLowerCase();
    else
        lInfo = commonLabel[currentLang].nc;

    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].takeAway + '</span> : ' + lInfo + '</p>';
    
    
    return lHtml;
}



function getTechnicalTextForCanyons(_item)
{
    var lHtml = "";
    
    if (_item.approcheTime != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].approcheTime + '</span> : ' + setDuration(_item.approcheTime) + '</p>';
    
    if (_item.descenteTime != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].descenteTime + '</span> : ' + setDuration(_item.descenteTime) + '</p>';
    
    if (_item.retourTime != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].retourTime + '</span> : ' + setDuration(_item.retourTime) + '</p>';
    
    if (_item.longueur != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].longueur + '</span> : ' + _item.longueur + 'm</p>';
    
    if (_item.denivele != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].denivele + '</span> : ' + _item.denivele + 'm</p>';
    
    if (_item.cascadeMax != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].cascadeMax + '</span> : ' + _item.cascadeMax + 'm</p>';
    
    if (_item.corde != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + canyonLabel[currentLang].corde + '</span> : ' + _item.corde + 'm</p>';
    
    return lHtml;
}


function getTechnicalTextForPlageBaignadePiscine(_item)
{
    var lHtml = "";
    
    if (_item.toilette != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].toilette + '</span> : ' + (_item.toilette == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.douche != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].douche + '</span> : ' + (_item.douche == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.eauPotable != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].eauPotable + '</span> : ' + (_item.eauPotable == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.sable != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].sable + '</span> : ' + (_item.sable == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.galet != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].galet + '</span> : ' + (_item.galet == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.secours != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].secours + '</span> : ' + (_item.secours == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    if (_item.beachVolley != null)
        lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang].beachVolley + '</span> : ' + (_item.beachVolley == 1 ? commonLabel[currentLang].yes : commonLabel[currentLang].no).toLowerCase()  + '</p>';
    
    return lHtml;
}



function getTechnicalTextForDormir(_item)
{
    var lHtml = "";
    
    var lInfo = commonLabel[currentLang]['nc'];
    
    //************** Prix moyen ***************
    
    if (_item.category)
        lInfo = typeLabel[currentLang][_item.category + "*"];
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['category'] + '</span> : ' + lInfo + '</p>';
    
    //************** lVueMer ***************
    
    if (_item.vueMer)
        lInfo = _item.vueMer == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang]['vueMer'] + '</span> : ' + lInfo + '</p>';
    
    //************** terrasse ***************
    
    if (_item.terrasse)
        lInfo = _item.terrasse == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + typeLabel[currentLang]['terrasse'] + '</span> : ' + lInfo + '</p>';
    
    //************** piscine ***************
    
    if (_item.piscine)
        lInfo = _item.piscine == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['piscine'] + '</span> : ' + lInfo + '</p>';
    
    //************** bar ***************
    
    if (_item.bar)
        lInfo = _item.bar == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['bar'] + '</span> : ' + lInfo + '</p>';
    
    //************** roomService ***************
    
    if (_item.roomService)
        lInfo = _item.roomService == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['roomService'] + '</span> : ' + lInfo + '</p>';
    
    
    //************** parking ***************
    
    if (_item.parking)
        lInfo = _item.parking == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['parking'] + '</span> : ' + lInfo + '</p>';
    
    
    //************** ascenseur ***************
    
    if (_item.ascenseur)
        lInfo = _item.ascenseur == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['ascenseur'] + '</span> : ' + lInfo + '</p>';
    
    
    //************** wifi ***************
    
    if (_item.wifi)
        lInfo = _item.wifi == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['wifi'] + '</span> : ' + lInfo + '</p>';
    
    
    //************** television ***************
    
    if (_item.television)
        lInfo = _item.television == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['television'] + '</span> : ' + lInfo + '</p>';
    
    
    //************** telephone ***************
    
    if (_item.telephone)
        lInfo = _item.telephone == 1 ?(commonLabel[currentLang]['yes']).toLowerCase() :(commonLabel[currentLang]['no']).toLowerCase();
    else
        lInfo = commonLabel[currentLang]['nc'];
    
    lHtml += '<p style="font-weight:bold;"><span class="labelDetailText">' + commonLabel[currentLang]['telephone'] + '</span> : ' + lInfo + '</p>';
    
    
    return lHtml;
}



function getBlockTextForMP2013(_item)
{
	var lHtml = "";
	
	lHtml += '<p><span class="labelDetailText">' + detailLang[currentLang].place + '</span> : ' + _item.city + ' / ' + _item.place  + '</p>';
	
	lHtml +='<p><span class="labelDetailText">' + detailLang[currentLang].type + '</span> : ' + _item.soustype + '</p>';
	lHtml +='<p><span class="labelDetailText">' + commonLabel[currentLang].date + '</span> : ' + _item.date_fr + '</p>';
	
	var tarif = "";
	
	if (_item.isFree == "true")
		tarif = detailLang[currentLang].free;
	else
	{
		var _2prices = false;
		
		if (_item.PrixMax != "" && _item.PrixMin != "")
			_2prices = true;
		
		if (_2prices)
		{
			var plein = detailLang[currentLang].priceMax + " " + _item.PrixMax.replace(".0", "€");
			var reduit = detailLang[currentLang].priceMin + " " + _item.PrixMin.replace(".0", "€");
			var trait = " / ";
			tarif = plein + trait + reduit;
		}
		else
		{
			if (_item.PrixMax != "")
				tarif = _item.PrixMax.replace(".0", "€");
			else
				tarif = _item.PrixMin.replace(".0", "€");
		}
		
		if (tarif == "")
			tarif = detailLang[currentLang].notFree;
	}
	
	if (_item.moreInfo != "")
	{
		lHtml +='<p><span class="labelDetailText">' + detailLang[currentLang].moreInfo + '</span> : ' + _item.moreInfo + '</p>';
	}
	
	lHtml +='<p><span class="labelDetailText">' + detailLang[currentLang].tarif + '</span> : ' + tarif + '</p>';
	
	lHtml +='<p><span class="labelDetailText">' + detailLang[currentLang].presentation + '</span> : ' + textByLangForItem(_item) + '</p>';
	
	if (_item.ResaPhone != "" || _item.ResaWeb != "" || _item.ResaMail != "")
	{
		var contact = _item.ResaName;
		
		if (_item.ResaPhone != "")
			contact += "<br>" + _item.ResaPhone;
		
		if (_item.ResaMail != "")
			contact += "<br>" + _item.ResaMail;
		
		if (_item.ResaWeb != "")
			contact += "<br>" + _item.ResaWeb;
		
		lHtml +='<p><span class="labelDetailText">' + detailLang[currentLang].reservation + '</span> : ' + contact + '</p>';
	}
	
	return lHtml;
}


function getBlockLinkDetail(_item)
{
    var iconFavorite;
    
    if(getItemsInFavoritesArray(_item.idRepName) != -1)
    {
        iconFavorite = "icon_favorite_remove.png";
    }
    else
    {
        iconFavorite = "icon_favorite_add.png";
    }
    
    var lFavorite = '<a href="javascript:addOrRemoveFavorite(\'' + _item.idRepName + '\', \'' + _item.table + '\')" class="btnLinkDetail left">' +
    '<img id="iconFavoriteMap" src="Assets/' + iconFavorite + '" width="24" height="24" />' +
    '<span >' + commonLabel[currentLang].favorite + '</span>' +
    '</a>';
    
    var lDiapo = "";
    
    if (_item.tabDiapo != undefined)
    {
        lDiapo =
        //'<a href="javascript:myDiapoSLiderMap.showFullScreenSlider(0)" class="btnLinkDetail right">' +
        '<a id="diapoBtnMap" href="javascript:setDetailsPicturesSliderFull(\'map\')" class="btnLinkDetail right">' +
        '<img src="Assets/icon_diapo4.png" width="28" height="28" />' +
        '<span>Diaporama</span>' +
        '</a>';
    }
    
    return '<div id="blockLinkDetail" class="bgWhiteToUltraLightGray" style="font-size:0.9em">' + lFavorite + lDiapo + '</div>';
}


function getBlockTimeToGo()
{
    if (currentItemDetail == -1 || listItems[currentItemDetail].idRepName == tempSelectedItem.idRepName
        || (currentCity == -1 && listItems[currentItemDetail].duplicateItems))
        return "";
    
    var _htmlTimeToGo = "";
    
    var _htmlTimeToGoChoices =
    '<div style="display:inline-block; margin:10px 0px 0px 0px; width:100%; clear:both;"><a style="float:left; font-size:1em; color:#2E2A2A; text-decoration:underline;" href="javascript:getSingleTimeAndDistanceFromGoogleMatrix(\'' + tempSelectedItem.idRepName + '\', ' + tempSelectedItem.latitude + ', ' + tempSelectedItem.longitude + ', \'pied\')">' + transportItems[currentLang].pied + '</a><div style="float:left; margin-left:10px; padding-top:0px;" id="pied_' + tempSelectedItem.idRepName + '"></div></div>'+
    '<div style="display:inline-block; margin:10px 0px 0px 0px;width:100%;  clear:both;"><a style="float:left; font-size:1em; color:#2E2A2A; text-decoration:underline;" href="javascript:getSingleTimeAndDistanceFromGoogleMatrix(\'' + tempSelectedItem.idRepName + '\', ' + tempSelectedItem.latitude + ', ' + tempSelectedItem.longitude + ', \'velo\')">' + transportItems[currentLang].velo + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="velo_' + tempSelectedItem.idRepName + '"></div></div>'+
    '<div style="display:inline-block; margin:10px 0px 0px 0px;width:100%;  clear:both;"><a style="float:left; font-size:1em; color:#2E2A2A; text-decoration:underline;" href="javascript:getSingleTimeAndDistanceFromGoogleMatrix(\'' + tempSelectedItem.idRepName + '\', ' + tempSelectedItem.latitude + ', ' + tempSelectedItem.longitude + ', \'moto\')">' + transportItems[currentLang].moto + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="moto_' + tempSelectedItem.idRepName + '"></div></div>'+
    '<div style="display:inline-block; margin:10px 0px 0px 0px;width:100%;  clear:both;"><a style="float:left; font-size:1em; color:#2E2A2A; text-decoration:underline;" href="javascript:getSingleTimeAndDistanceFromGoogleMatrix(\'' + tempSelectedItem.idRepName + '\', ' + tempSelectedItem.latitude + ', ' + tempSelectedItem.longitude + ', \'auto\')">' + transportItems[currentLang].auto + '</a><div style="float:left; margin-left:10px; padding-top:2px;" id="auto_' + tempSelectedItem.idRepName + '"></div>';
    
    _htmlTimeToGo =
    '<div class="gradientTypeLabel" style="text-align:left; color:#ffffff; margin-top:30px;">Combien de temps pour s\'y rendre depuis ' + titleForItem(listItems[currentItemDetail]) + ' ?</div>' +
    _htmlTimeToGoChoices;
    
    return _htmlTimeToGo;
}


function checkForTopo(_item)
{
    var lHtml = "";
    
    if (_item.mountains == "Calanques" || _item.mountains == "Cap Canaille")
    {
        lHtml =
        '<p><span class="labelDetailText">' + commonLabel[currentLang].topo + '</span> : '
        + '<a href="javascript:showLittleModalPopUp(\'exitApp\', null, \'http://www.topo-calanques.com\')">topo-calanques.com</a> | <a href="javascript:showLittleModalPopUp(\'exitApp\', null, \'http://www.vtopo.fr\')">vtopo.fr</a>'
        + '</p>';
    }
    else
        if (_item.mountains == "Garlaban" || _item.mountains == "Mont Sainte Croix" || _item.mountains == "Côte bleue")
        {
            lHtml =
            '<p><span class="labelDetailText">' + commonLabel[currentLang].topo + '</span> : '
            + '<a href="javascript:showLittleModalPopUp(\'exitApp\', null, \'http://www.topo-calanques.com\')">topo-calanques.com</a>'
            + '</p>';
        }
    
    
    return lHtml;
}


function setImageOrDiaporama()
{
    setSizeForBgImage();
    
	if (listItems[currentItemDetail].type == "MP2013")
	{
		$("#mainVisual").html('');
        $("#mainVisual").attr("style", "background-image:none");
        
        var lStartUrl = listItems[currentItemDetail].isUpdate ? urlWeb : "";
        
        var image = lStartUrl + urlPictures + "/" + listItems[currentItemDetail]['table'] + "/" + listItems[currentItemDetail].idRepName + "/" + getSizeImage()  + "/Image.jpg";
        
        //log("ZZZZZZ  setImageOrDiaporama -> image : " + image);
        
		$("#mainVisual").attr("style", "background-image:url('" + image + "'); background-size:100% auto; background-repeat:no-repeat;");
	}
	else
    if (isApp && !isNetWorkAvalaible)
    {
        $("#mainVisual").css("background-image", "none");
        
        setFileForOnePictureForUnicId(listItems[currentItemDetail], "mainVisual")
        
        $("#diaporamaBtn").css("display", "none");
    }
    else
    {
		setDetailsPicturesSlider(0);
        
        $("#diaporamaBtn").css("display", "inline-block");
    }
}


function resetAllOptionSlider()
{
	/**************** reset Options *********************/
	
	var optionArray = $("#leftHomeOptionBlock div");
    
	for (var i = 0; i < optionArray.length; i++)
	{
		$(optionArray[i]).html('');
		$(optionArray[i]).css("display", "none");
	}
	
	optionsCategoriesArray = [];
}


function setAllOptionItemsSlider()
{
	/****************************************************/
	
	isMapOptionVisible = false;
	
	if (setHomeSliderWithType("Items") == true)
	{
		$("#homeSliderItems").fadeIn(500);
		isMapOptionVisible = true;
	};
	
    /*
     if (setHomeSliderWithType("MP2013") == true)
     {
     $("#homeSliderMP2013").fadeIn(400);
     isMapOptionVisible = true;
     };
     */
    
	if (listItems[currentItemDetail].table != "Restos" && setHomeSliderWithType("Restaurants") == true)
	{
		$("#homeSliderRestaurants").fadeIn(500);
		isMapOptionVisible = true;
	};
	
    
    if (setHomeSliderWithType("Hotels") == true)
	{
		$("#homeSliderHotels").fadeIn(700);
		isMapOptionVisible = true;
	};
    
    
    if (setHomeSliderWithType("Services") == true)
	{
		$("#homeSliderServices").fadeIn(800);
		isMapOptionVisible = true;
	};
    
    setTimeout(removeLoadingAnimation, 0);
}


function setHomeSliderWithType(_type)
{
	var list = [];
	
	switch (_type)
	{
		case "Items" :
			list = getFullConcatListItems();
			break;
			
		case "MP2013" :
			list = filterMP2013WithBase(listItems[currentItemDetail]);
			break;
			
		case "Restaurants" :
			list = listItemsRestaurants;
			break;
			
		case "Hotels" :
			list = listItemsHotels.concat(listItemsChambreHote, listItemsLocationDeVacancesClassees, listItemsCampings, listItemsCampingsCar, listItemsResidencesDeTourisme, listItemsResidencesHoteliere);
			break;
			
		case "Services" :
			list = listItemsOfficesTourisme.concat(listItemsAgencesReceptives, listItemsGuides, listItemsLocationVelo, listItemsMoniteursEscalade);
			break;
	}
	
    
	var temp2Array;
	
	if (_type != "MP2013")
    {
		//temp2Array = getArrayForCloseItemsFromList(list, listItems[currentItemDetail], "options");
        temp2Array = getCloserItemsFromList(list, listItems[currentItemDetail], _type);
	}
    else
		temp2Array = list;
	
	//log ("_type : " + _type + " temp2Array.length : " + temp2Array.length);
	//log (temp2Array);
	
	if (temp2Array.length > 0)
	{
		fillHomeSliderWithArrayAndType (temp2Array, _type);
		
		switch (_type)
		{
			case "Items" :{
				optionSliderItemsArray = temp2Array;
				optionsCategoriesArray.push(optionSliderItemsArray);
			}
				break;
				
			case "MP2013" :{
				optionSliderMP2013Array = temp2Array;
				optionsCategoriesArray.push(optionSliderMP2013Array);
			}
				break;
				
			case "Restaurants" : {
				optionSliderRestaurantsArray = temp2Array;
				optionsCategoriesArray.push(optionSliderRestaurantsArray);
			}
				break;
				
			case "Hotels" :{
				optionSliderHotelsArray = temp2Array;
				optionsCategoriesArray.push(optionSliderHotelsArray);
			}
				break;
                
			case "Services" :{
				optionSliderServicesArray = temp2Array;
				optionsCategoriesArray.push(optionSliderServicesArray);
			}
				break;
		}
		return true;
	}
	else
	{
		return false;
	}
	
}


function fillHomeSliderWithArrayAndType (itemArray, _type)
{
	var lItemWidth = $("#leftHomeOptionBlock").width() - 2*15;
	
	var lItemHeight = 140;
	
	var slider = new HtmlSliderReduceScreen ("homeSlider" + _type,
											 "optionSlider" + _type,
											 (lItemWidth + 2*15),
											 itemArray,
											 lItemWidth,
											 lItemHeight,
											 _type,
											 listItems[currentItemDetail]
											 );
	
	slider.intClickNext = 0;
	
	slider.init();
	
	switch (_type)
	{
			
		case "Items" :
			optionSliderItems = slider;
			break;
			
		case "Restaurants" :
			optionSliderRestaurants = slider;
			break;
			
		case "Hotels" :
			optionSliderHotels = slider;
			break;
			
		case "MP2013" :
			optionSliderMP2013 = slider;
			break;
			
		case "Services" :
			optionSliderServices = slider;
			break;
	}
}


function htmlForOptionCell(_item, _type, n, _onTour)
{
	var pictoName;
	var backgroundSize;
	
	if (_type == "Hebergements")
	{
		if (_item.type == "cdt:Camping")
			pictoName = "Campings";
		else
            if (_item.type == "cdt:Hotel")
                pictoName = "Hotels";
            else
                if (_item.type == "cdt:AireStationnementCampingCar")
                    pictoName = "CampingsCar";
                else
                    if (_item.type == "cdt:ChambreHote")
                        pictoName = "Gites";
                    else
                        if (_item.type == "cdt:GiteEtMeuble")
                            pictoName = "MeubleTourisme";
                        else
                            if (_item.type == "cdt:Residence")
                                pictoName = "Residence";
	}
	else
        if (_type == "Services")
        {
            if (_item.type == "cdt:OTSI")
                pictoName = "OfficesTourisme";
            else
                if (_item.type == "cdt:LocationMaterielSportLoisir")
                    pictoName = "LocationVelo";
                else
                    if (_item.type == "cdt:GuidesServiceGuides")
                        pictoName = "Guides";
                    else
                        if (_item.type.indexOf("cdt:AccompagnateurMoyenneMontagne") != -1)
                            pictoName = "AccompagnateurMontagne";
                        else
                            if (_item.type.indexOf("cdt:MoniteurEscalade") != -1)
                                pictoName = "MoniteursEscalade";
                            else
                                if (_item.type.indexOf("cdt:Agence") != -1)
                                    pictoName = "AgencesReceptives";
                                else
                                    if (_item.type == "VeloMPM")
                                        pictoName = "VeloMPM";
                                    else
                                        if (_item.type == "cdt:ParkingPublic")
                                            pictoName = "Parkings";
                                        else
                                            if (_item.type == "MetroTram")
                                            {
                                                if (_item.line.indexOf("M") != -1)
                                                    pictoName = "Metro";
                                                else
                                                    pictoName = "Tram";
                                            }
        }
        else
            if (_type == "Restaurants")
            {
                if (_item.type.indexOf("cdt:Restaurant") != -1)
                    pictoName = "Restaurants";
                else
                    if (_item.type == "Bar")
                        pictoName = "Bars";
            }
            else
            {
                pictoName = _type;
            }
	
	if (_type == "Items")
	{
        var lStartUrl = (isProd || isMobileTest) ? urlWeb : "";
        
		picto = 'background-image:url(' + lStartUrl + urlPictures + '/' + _item.table + '/'+ _item.idRepName + '/160/' + _item.mainImage + ')';
		
		return '<div class="optionItem">' +
		'<div class="visualOptionDiv" style="' + picto + '"></div>' +
		'<div class="blockTextOptionDiv">' + setMainInfosForOptionCell (_type, _item, n) + '</div>' +
		'<div class="linkInOptionsDiv">' +
		'<a href="javascript:showPopUpItem(\'' + _item.table + '\', \'' + _item.idRepName + '\', \'colorItems\')" style="text-decoration:underline;">' + commonLabel[currentLang].showDetails + '</a>' +
		'</div>' +
		'</div>';
	}
	else
        if (_type == "MP2013")
        {
            var image;
            
            if (_item.isSmallImage == "false")
                image = 'Assets/smallMP2013.jpg';
            else
                image = 'MP2013/small_' + _item.idRepName +'.jpg';
            
            picto = 'background-image:url(' + image + ')';
            
            return '<div class="optionItem">' +
            '<div class="visualOptionDiv" style="' + picto + '"></div>' +
            '<div class="blockTextOptionDiv">' + setMainInfosForOptionCell (_type, _item, n) + '</div>' +
            '<div class="linkInOptionsDiv">' +
            //'<a href="javascript:showPopUpDatePickerOption()" style="text-decoration:underline;">' + commonLabel[currentLang].changeDate + '</a> / ' +
            '<a href="javascript:showPopUpItem(\'' + _item.table + '\', \'' + _item.idRepName + '\')" style="text-decoration:underline;">' + commonLabel[currentLang].showDetails + '</a>' +
            '</div>' +
            '</div>';
        }
        else
        {
            if (isMobile)
                picto = "";
            else
                picto = 'background-image:url(\'Assets/pictos/gray/' + pictoName + '.png\');';
            
            var lLink = '<a href="javascript:showPopUpTimeToGo(\'' + _type + '\', ' + n + ')" style="display:block; margin-top:10px; text-decoration:underline;">' + optionLabel[currentLang].timeToGo + '</a>';
            
            backgroundSize = "background-size:70px 70px;";
            
            return '<div class="optionItem" style="' + picto + '; ' + backgroundSize + ';">' +
            setMainInfosForOptionCell (_type, _item, n, _onTour)  +
            lLink +
            '</div>';
        }	 
}


function setCloseLinkArray(_item)
{
    var loopHtml = "";

    closeArray = [];
    
    //*************************
    
    if (!closeLinkArray || !closeLinkArray[_item.table]) {
        console.log("closeLinkArray not initialized or table not found:", _item.table);
        return;
    }
    
    var ArrayLink = closeLinkArray[_item.table]["global"];
    
    if (ArrayLink && ArrayLink.length > 0)
    {
        for (var i = 0;  i< ArrayLink.length; i++)
        {
            var valueArray = ArrayLink[i].split(",");
            
            var lItem = getItemInDataList(valueArray[1], valueArray[0]);
            
            closeArray.push(lItem);
        }
    }
    
    //*************************

    ArrayLink = closeLinkArray[_item.table][_item.idRepName];
    
    if (ArrayLink && ArrayLink.length > 0)
    {
        for (var i = 0;  i< ArrayLink.length; i++)
        {
            var valueArray = ArrayLink[i].split(",");
            
            var lItem = getItemInDataList(valueArray[1], valueArray[0]);
            
            closeArray.push(lItem);
        }
    }
    
    //log ("setCloseLinkArray -> closeArray : " + JSON.stringify(closeArray));
    
    if (closeArray.length > 0)
    {
        $("#closeLinkTitle").css("display", "inline-block");
        $("#closeLinkBlock").css("display", "inline-block");
    }

    for (var i = 0; i < closeArray.length; i++)
    {
        if (closeArray[i] != -1)
            loopHtml += getMyCellBlock(closeArray[i], i, "CloseItem");
    }
    
    $("#closeLinkBlock").html(loopHtml);
    
    //*************************
    
    for (var i = 0; i < closeArray.length; i++)
    {
        if (closeArray[i] != -1)
        {
            setFileForOnePictureForUnicId(closeArray[i], "mainVisualList" + closeArray[i].idRepName + "CloseItem");
            
            if (isProd)
            {
                gaTrackEvent('DetailCloseLink', closeArray[i].idRepName, listItems[currentItemDetail].idRepName, 0);
            }
        }
    }
}
