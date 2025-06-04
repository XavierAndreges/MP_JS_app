var PlageBaignadePiscineTrierOptions = ["toilette", "douche", "secours", "eauPotable", "sable", "galet", "beachVolley"];
var CanyonsTrierOptions = ["Debutant", "Initie", "Sportif", "Expert"];
var SitesNaturelsTrierOptions = ["Calanque", "Ile", "River", "Littoral", "Massif", "Parc", "Plongee"];
var MonumentsTrierOptions = ["Architecture", "Attraction", "Monument", "Quartier"];
var ExpositionsMuseesTrierOptions = ["Civilisation", "Historique", "Classique", "Moderne", "Contemporain", "Science"];
var SortirTrierOptions = ["Agenda", "Cafe", "Concert", "Festival", "Spectacle"];
var BonsPlansTrierOptions = ["Service", "Transport", "Visite", "Atelier"];
var ShoppingTrierOptions = ["Artisanat", "Mode", "Alimentation", "Cave", "ViePratique", "Loisir"];
var PetanqueTrierOptions = ["ouvertNuit", "eclairage", "club", "eauPotable", "vueMer"];
var NoIdeaTrierOptions = ["classics", "favorites", "vieuxPort", "laPlaine", "Calanques", "isUpdate"];
var LoisirsTrierOptions = ["Club", "Guide", "ParcLoisir"];
var DormirTrierOptions = ["ChambreHote", "Gite", "Hotel", "Residence"];

var RestosTrierOptions = ["10", "15", "20", "25"];
var sousCritereRestosTrierOptions = ["vueMer", "ruePietonne", "dimanche", "lundi", "midi", "soir", "takeAway"];

var RandonneeTrierOptions = ["Familial", "Classique", "Technique"];
var MassifsRandonneeTrierOptions = ["Calanques", "bleue", "Sainte-Victoire", "Sainte-Baume", "Garlaban", "Etoile"];

var SitesEscaladeTrierOptions = ["GVE",  "Bloc"];
var MassifsEscaladeTrierOptions = ["Calanques", "Cyr"];
var CotationEscaladeTrierOptions = ["4", "5", "6", "7"];
var OrientationEscaladeTrierOptions = ["Nord", "Sud", "Est", "Ouest"];
var DiversEscaladeTrierOptions = ["vueMer", "noMistral"];

var RestaurantsTrierOptions = ["classics", "favorites", "Traditionnelle_Actuelle", "Gastronomique", "Bio_Végétarien", "Pizza", "rapide", "Poisson", "Crêpes_Salades_Sandwiches_Restauration", "Fondues_Fromages", "Kasher", "Méditerranéenne_Provençale", "Italienne", "Espagnole", "Corse", "Maghreb_Syrienne_Marocaine_Algérienne", "Orientale_Armenienne_Turque_Libanaise", "Indienne_Pakistanaise", "Asiatique_Japonaise_Vietnamienne_Chinoise", "Exotique_Antilles_Réunion_Créole", "Amérique"];

//Bienvenue à la Ferme Bed & Breakfast Accueil paysan

var HebergementsTrierOptions = ["Hotel", "ChambreHote", "GiteEtMeuble", "Residence"];
var blockCategoryTrierOptions = ["1", "2", "3", "4", "5"];
var ChambreHoteTrierOptions = ["soleil", "Gîtes", "Clévacances", "Breakfast", "paysan"];
var DiversHebergementsTrierOptions = ["Gay", "Handicap"];

var classicsArray = ["bonneMere", "mucem", "vieilleCharite", "palaisLongchamps", "panier", "leCorbusier", "abbayeVictor", "sugiton", "ilesDuFrioul", "Callelongue", "abricotier", "rocherGoudesFaceSud", "belvedereLuminy", "enVauPortPin", "sommetMarseilleveyre", "cantini", "museeHistoire", "trouSouffleur", "petanqueCoursJu", "prophetes", "anseMalmousque", "CarrieresLumieres", "routeDesCretes", "vallonAuffes", "marieSainteBaume", "saintPons", "PrieureRougeFacile"];

var favoritesArray = ["MOAA", "croixDeProvenceJaune", "marseilleveyreFaceOuest", "anseFiguier", "borderline", "petanqueTholonet", "calanqueAnthenors", "anseArene", "savonnerieLicorne", "campDesMilles", "museeMarine", "museeMonticelli", "louPitchoun", "Jeannette", "anseColombet", "callelongueDemiLuneMarseilleveyre", "grotteChampignons", "cretSaintMichel", "campagnePastre", "coteBleue", "torrentFauge", "ileMaire", "brasserieLaPlaine", "navettesMaritimes", "saladin"];

var classicsRestoArray = ["Restaurant de la Nautique", "Le Petit Nice - Passédat", "Le Petit Pavillon", "La Tasca", "Chez Zé", "Le Carillon chez Carmen",  "Le Mas", "Au bord de l'eau", "El Santo Cachon", "Pizzeria Jeannot", "O Pakistan"];

var AgencesReceptivesTrierOptions = ["voyage", "evenementielle", "operator"];
var CampingsTrierOptions = ["2", "3", "4"];
var ParkingsTrierOptions = ["parkingRelais"];
var MoniteursEscaladeTrierOptions = ["MoniteurEscalade"];

//pizza chez noel, le clan des cigales, resto bas cours julien, ummaguma, part des anges, Sur le pouce, Le cercle rouge, "Mama shelter"


var trierOptionsJSON =
{
    "NoIdea" : {
        "Calanques" : "off",
        "vieuxPort" : "off",
        "laPlaine" : "off",
        "classics" : "off",
        "favorites" : "off",
        "isUpdate" : "off",
    },
    "Dormir" : {
        "ChambreHote" : "off",
        "Gite" : "off",
        "Hotel" : "off",
        "Residence" : "off",
    },
    "PlageBaignadePiscine" : {
        "toilette" : "off",
        "secours" : "off",
        "douche" : "off",
        "eauPotable" : "off",
        "sable" : "off",
        "galet" : "off",
        "beachVolley" : "off",
    },
    "ExpositionsMusees" : {
        "Civilisation" : "off",
        "Historique" : "off",
        "Classique" : "off",
        "Moderne" : "off",
        "Contemporain" : "off",
        "Science" : "off",
    },
    "Petanque" : {
        "ouvertNuit" : "off",
        "eclairage" : "off",
        "club" : "off",
        "eauPotable" : "off",
        "vueMer" : "off",
    },
    "SitesNaturels" : {
        "Calanque" : "off",
        "Massif" : "off",
        "Littoral" : "off",
        "Ile" : "off",
        "Parc" : "off",
        "River" : "off",
        "Plongee" : "off"
    },
    "Monuments" : {
        "Architecture" : "off",
        "Attraction" : "off",
        "Monument" : "off",
        "Quartier" : "off"
    },
    "Canyons" : {
        "Debutant" : "off",
        "Initie" : "off",
        "Sportif" : "off",
        "Expert" : "off"
    },
    "Sortir" : {
        "Cafe" : "off",
        "Concert" : "off",
        "Spectacle" : "off",
        "Agenda" : "off",
        "Festival" : "off",
    },
    "Restos" : {
        "10" : "off",
        "15" : "off",
        "20" : "off",
        "25" : "off",
        "vueMer" : "off",
        "ruePietonne" : "off",
        "takeAway" : "off",
        "dimanche" : "off",
        "lundi" : "off",
        "midi" : "off",
        "soir" : "off",
    },
    "BonsPlans" : {
        "Service" : "off",
        "Transport" : "off",
        "Visite" : "off",
        "Atelier" : "off",
        "Hebergement" : "off",
    },
    "Randonnee" : {
        "Familial" : "off",
        "Classique" : "off",
        "Technique" : "off",
        "Calanques" : "off",
        "bleue" : "off",
        "Sainte-Victoire" : "off",
        "Sainte-Baume" : "off",
        "Garlaban" : "off",
        "Etoile" : "off",
    },
    "SitesEscalade" : {
        "Bloc" : "off",
        "Couennes" : "off",
        "GVE" : "off",
        "TA" : "off",
        "Calanques" : "off",
        "Sainte-Victoire" : "off",
        "Cyr" : "off",
        "Garlaban" : "off",
        "4" : "off",
        "5" : "off",
        "6" : "off",
        "7" : "off",
        "vueMer" : "off",
        "noMistral" : "off",
        "Nord" : "off",
        "Sud" : "off",
        "Est" : "off",
        "Ouest" : "off",
    },
    "Restaurants" : {
        "Traditionnelle_Actuelle" : "off",
        "Gastronomique" : "off",
        "Méditerranéenne_Provençale" : "off",
        "Italienne" : "off",
        "Espagnole" : "off",
        "Corse" : "off",
        "Pizza" : "off",
        "Provençale" : "off",
        "Maghreb_Syrienne_Marocaine_Algérienne" : "off",
        "Orientale_Armenienne_Turque_Libanaise" : "off",
        "Indienne_Pakistanaise" : "off",
        "Asiatique_Japonaise_Vietnamienne_Chinoise" : "off",
        "Exotique_Antilles_Réunion_Créole" : "off",
        "Amérique" : "off",
        "Bio_Végétarien" : "off",
        "Poisson" : "off",
        "Kasher" : "off",
        "Crêpes_Salades_Sandwiches_Restauration" : "off",
        "Fondues_Fromages" : "off",
        "classics" : "off",
        "favorites" : "off",
        "rapide" : "off",
    },
    "Hebergements" : {
        "1" : "off",
        "2" : "off",
        "3" : "off",
        "4" : "off",
        "5" : "off",
        "Gay" : "off",
        "Handicap" : "off",
        "ChambreHote" : "off",
        "soleil" : "off",
        "Gîtes" : "off",
        "Clévacances" : "off",
        "GiteEtMeuble" : "off",
        "Hotel" : "off",
        "Breakfast" : "off",
        "Residence" : "off",
        "paysan" : "off",
    },
    "AgencesReceptives" : {
        "voyage" : "off",
        "evenementielle" : "off",
        "operator" : "off",
    },
    "Campings" : {
        "2" : "off",
        "3" : "off",
        "4" : "off",
    },
    "Parkings" : {
        "parkingRelais" : "off",
    },
    "MoniteursEscalade" : {
        "MoniteurEscalade" : "off",
    },
    "Shopping" : {
        "Artisanat" : "off",
        "Mode" : "off",
        "Alimentation": "off",
        "Cave" : "off",
        "ViePratique" : "off",
        "Loisir" : "off",
    },
    "Loisirs" : {
        "Club" : "off",
        "Guide" : "off",
        "ParcLoisir" : "off"
    },
    "Restaurants" : {
        "Traditionnelle_Actuelle" : "off",
        "Gastronomique" : "off",
        "Méditerranéenne_Provençale" : "off",
        "Italienne" : "off",
        "Espagnole" : "off",
        "Corse" : "off",
        "Pizza" : "off",
        "Provençale" : "off",
        "Maghreb_Syrienne_Marocaine_Algérienne" : "off",
        "Orientale_Armenienne_Turque_Libanaise" : "off",
        "Indienne_Pakistanaise" : "off",
        "Asiatique_Japonaise_Vietnamienne_Chinoise" : "off",
        "Exotique_Antilles_Réunion_Créole" : "off",
        "Amérique" : "off",
        "Bio_Végétarien" : "off",
        "Poisson" : "off",
        "Kasher" : "off",
        "Crêpes_Salades_Sandwiches_Restauration" : "off",
        "Fondues_Fromages" : "off",
        "classics" : "off",
        "favorites" : "off",
        "rapide" : "off",
    },
    "Hebergements" : {
        "1" : "off",
        "2" : "off",
        "3" : "off",
        "4" : "off",
        "5" : "off",
        "Gay" : "off",
        "Handicap" : "off",
        "ChambreHote" : "off",
        "soleil" : "off",
        "Gîtes" : "off",
        "Clévacances" : "off",
        "GiteEtMeuble" : "off",
        "Hotel" : "off",
        "Breakfast" : "off",
        "Residence" : "off",
        "paysan" : "off",
    },
    "AgencesReceptives" : {
        "voyage" : "off",
        "evenementielle" : "off",
        "operator" : "off",
    },
    "Campings" : {
        "2" : "off",
        "3" : "off",
        "4" : "off",
    },
    "Parkings" : {
        "parkingRelais" : "off",
    },
    "MoniteursEscalade" : {
        "MoniteurEscalade" : "off",
    },

}



function showTrierOptions()
{
    if (!isTrierOptionsOpened)
    {
        var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
        
        if (!isTrierOptionsActivated)
        {
            if (isTablePracticalLink)
                currentActivityItemList = listItems;
            
            var lHtml = "";
            
            //********************** BLOCKS *********************
            
            for (var i = 0; i < window[lCurrentTableOrActivity + "TrierOptions"].length; i++)
            {
                lHtml += getHtmlForTrierOptions(window[lCurrentTableOrActivity + "TrierOptions"][i], lCurrentTableOrActivity);
            }
            
            $("#trierOptions").html(lHtml);
            
            
            //********************** SOUS BLOCKS *********************
            
            
            if (lCurrentTableOrActivity == "Randonnee")
            {
                setHtmlForBlock("MassifsRandonnee");
            }
            
            
            if (lCurrentTableOrActivity == "SitesEscalade")
            {
                setHtmlForBlock("MassifsEscalade");
                setHtmlForBlock("CotationEscalade");
                setHtmlForBlock("OrientationEscalade");
                setHtmlForBlock("DiversEscalade");
            }

            
            if (lCurrentTableOrActivity == "Hebergements")
            {
                //********************** blockCategoryHtml *********************
                
                var blockCategoryHtml = '<div id="blockCategory" style="width:100%; background-color:#f1f1f1; border-top:#767878 solid 1px; padding:5px 0px; display:inline-block;"></div>';
                
                $("#trierOptions").append(blockCategoryHtml);
                
                lHtml = "";
                
                for (var l = 0; l < blockCategoryTrierOptions.length; l++)
                {
                    lHtml += getHtmlForTrierOptions(blockCategoryTrierOptions[l]);
                }
                
                $("#blockCategory").append(lHtml);
                
                //********************** block sous type ChambreHote *********************
                
                var blockChambreHoteHtml = '<div id="blockChambreHote" style="width:100%; background-color:#f1f1f1; border-top:#767878 solid 1px; padding:5px 0px; display:inline-block;"></div>';
                
                $("#trierOptions").append(blockChambreHoteHtml);
                
                lHtml = "";
                
                for (var l = 0; l < ChambreHoteTrierOptions.length; l++)
                {
                    lHtml += getHtmlForTrierOptions(ChambreHoteTrierOptions[l]);
                }
                
                $("#blockChambreHote").append(lHtml);
                
                //********************** block divers hebergement *********************
                
                var blockDiversHebergementsHtml = '<div id="blockDiversHebergements" style="width:100%; background-color:#f1f1f1; border-top:#767878 solid 1px; padding:5px 0px; display:inline-block;"></div>';
                
                $("#trierOptions").append(blockDiversHebergementsHtml);
                
                lHtml = "";
                
                for (var l = 0; l < DiversHebergementsTrierOptions.length; l++)
                {
                    lHtml += getHtmlForTrierOptions(DiversHebergementsTrierOptions[l]);
                }
                
                $("#blockDiversHebergements").append(lHtml);
            }
        }
        
        //****************************************************************
        
        $("#trierOptions").css("display", "inline-block");
        
        var nbItem = window[lCurrentTableOrActivity + "TrierOptions"].length;
        
        switch (lCurrentTableOrActivity)
        {
            case "Randonnee" : nbItem += MassifsRandonneeTrierOptions.length; break;
                
            case "SitesEscalade" : nbItem += (MassifsEscaladeTrierOptions.length + CotationEscaladeTrierOptions.length
                                              + OrientationEscaladeTrierOptions.length + DiversEscaladeTrierOptions.length + 4); break;
                
            case "Hebergements" : nbItem += (blockCategoryTrierOptions.length + ChambreHoteTrierOptions.length + DiversHebergementsTrierOptions.length + 3);
                //case "Hebergements" : nbItem += DiversHebergementsTrierOptions.length; break;
        }
        
        var lHeight = Math.ceil(nbItem / 2) * 30;
        
        $("#trierOptions").animate({height: lHeight + "px"}, 500, 'linear', function()
                                   {
                                        isTrierOptionsOpened = true;
                                   
                                        $("#trierBtnItemList").css("background-image", "url(Assets/background/bodyWhiteBtn.png)");
                                        $("#trierBtnItemList").css("color", "#767878");
                                   
                                        if (isTablePracticalLink)
                                            $("body").animate({scrollTop: $("#bgImage").height() + "px"}, 500, 'linear');
                                   });
        
        if (isProd || isProdWeb)
        {
            gaTrackPage('showTrierOptions');
        }
        
    }
    else
    {
        
        
        $("#trierOptions").animate({height:"0px"}, 500, 'linear', function()
                                   {

                                        $("#trierOptions").css("display", "block");

                 
                                        $("#trierOptions").animate({height: "0px"}, 500, 'linear', function(){
                                                                 
                                                                                   
                                                                 $("#trierOptions").css("display", "none");
                                                                 
                                                                 isTrierOptionsOpened = false;
                                                                 
                                                                 });
                                   
                                   
                                   
                                        if (getActivatedCriterias().length > 0)
                                        {
                                            isTrierOptionsActivated = true;
                                   
                                            setAndAdjustTitleLabel(makeTitleForHomeStatusAsList());
                                   
                                            $("#trierBtnItemList").css("background-image", "url(Assets/background/mauveBtn.png)");
                                            $("#trierBtnItemList").css("color", "#ffffff");
                                            $("#trierBtnItemList").html(commonLabel[currentLang].triActivated);

                                        }
                                   /*
                                        else
                                            $("body").animate({scrollTop:"0px"}, 500, 'linear');
                                    */
                                   });
    }
}


function resetTrierOptions()
{
    $("#trierOptions").html('');
    $("#trierOptions").css("display", "block");
    $("#trierOptions").css("height", "0px");
    
    $("#trierBtnItemList").css("background-image", "url(Assets/background/bodyWhiteBtn.png)");
    $("#trierBtnItemList").css("color", "#767878");
    
    $("#trierBtnItemList").html(commonLabel[currentLang].Trier);
    
    isTrierOptionsOpened = false;
    isTrierOptionsActivated = false;
    
    doucheCheckbox = "off";
    $("#trierOptions").html('');
    
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    for (var prop in trierOptionsJSON[lCurrentTableOrActivity])
    {
        if (trierOptionsJSON[lCurrentTableOrActivity].hasOwnProperty(prop))
            trierOptionsJSON[lCurrentTableOrActivity][prop] = "off";
    }
}


function setHtmlForBlock(_type)
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    var lBlockHtml = '<div id="block' + _type + '" style="width:100%; background-color:#f1f1f1; border-top:#767878 solid 1px; padding:5px 0px; display:inline-block;"></div>';
    
    $("#trierOptions").append(lBlockHtml);
    
    lHtml = "";
    
    for (var l = 0; l < window[_type + 'TrierOptions'].length; l++)
    {
        lHtml += getHtmlForTrierOptions(window[_type + 'TrierOptions'][l], lCurrentTableOrActivity);
    }
    
    $("#block" + _type).append(lHtml);
}


function getTrierLabel(_type, _currentTableOrActivity)
{
    var lLabel = "";
    
    if (_type == "classics" || _type == "favorites")
        lLabel = '<span class="textColorMauve">' +  typeLabel[currentLang][_type] + '</span>';
    else
    if (_type == "isUpdate")
        lLabel = '<span class="textColorItems">' +  typeLabel[currentLang][_type] + '</span>';
    else
    if (_currentTableOrActivity)
    {
        switch (_currentTableOrActivity)
        {
            case "Randonnee" :
            {
                lLabel = _type;
                
                if (_type == "bleue")
                    lLabel = "Côte bleue";
            }
                break;
                
            case "SitesEscalade" :
            {
                lLabel = _type;
                
                if (_type == "Cyr")
                    lLabel = "Mont St Cyr";
                else
                if (_type == "4" || _type == "5" || _type == "6" || _type == "7")
                    lLabel = detailLang[currentLang].medLevel + " " + _type;
                else
                if (_type == "vueMer" || _type == "noMistral")
                    lLabel = typeLabel[currentLang][_type];
                else
                if (_type == "Nord" || _type == "Sud" || _type == "Est" || _type == "Ouest")
                {
                    if (currentLang == "fr")
                        lLabel = "Face " + typeLabel[currentLang][_type].toLowerCase();
                    else
                        lLabel = typeLabel[currentLang][_type] + " face";
                }
            }
                break;
                
            case "MoniteursEscalade" :
            {
                lLabel = practicalLabel[currentLang].MoniteurEscalade;
            }
                break;
                
            default : { lLabel = typeLabel[currentLang][_type];} break;
        }
    }
    else
        lLabel = typeLabel[currentLang][_type];
    
    return lLabel;
}



function getHtmlForTrierOptions(_type, _currentTableOrActivity)
{
    var _lLabel = getTrierLabel(_type, _currentTableOrActivity);
    
    var lWidth = 46;
    
    if (_currentTableOrActivity == "Parkings")
        lWidth = 60;
    
    return '<div class="" style="width:' +  lWidth + '%; float:left; margin:7px 2%;" onclick="javascript:trierListItemsParOptionsActivity(\'' + _type + '\')">'+
        '<div id="' + _type + 'Checkbox" style="width:15px; height:15px; float:left; background-image:url(Assets/checkbox_off.png); background-size:100% 100%; margin-left:10px;"></div>' +
    '<div style="float:left; font-weight:bold; margin-left: 5px;" class="textColorMP2013">' + _lLabel + '</div>' +
    '</div>'
}


function resetCategoryBlockOptionsToOff()
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;

    for (var l = 0; l < blockCategoryTrierOptions.length; l++)
    {
        var lType = blockCategoryTrierOptions[l];
        
        trierOptionsJSON[lCurrentTableOrActivity][lType] = "off";
        
        $("#" + lType + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_'+ trierOptionsJSON[lCurrentTableOrActivity][lType] + '.png)');
    }
}

function resetChambreHoteBlockOptionsToOff()
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    for (var l = 0; l < ChambreHoteTrierOptions.length; l++)
    {
        var lType = ChambreHoteTrierOptions[l];
        
        trierOptionsJSON[lCurrentTableOrActivity][lType] = "off";
        
        $("#" + lType + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_'+ trierOptionsJSON[lCurrentTableOrActivity][lType] + '.png)');
    }
}


function getActivatedCriterias()
{
    var _lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    var lTempArray = [];
    
    for (var l = 0; l < window[_lCurrentTableOrActivity + "TrierOptions"].length; l++)
    {
        lType = window[_lCurrentTableOrActivity + "TrierOptions"][l];
        
        if (trierOptionsJSON[_lCurrentTableOrActivity][lType] == "on")
        {
            lTempArray.push(lType);
        }
    }
    
    //******************************************* Hebergements ******************************************
    
    if (_lCurrentTableOrActivity == "Randonnee")
    {
        for (var l = 0; l < MassifsRandonneeTrierOptions.length; l++)
        {
            lType = MassifsRandonneeTrierOptions[l];
            
            if (trierOptionsJSON[_lCurrentTableOrActivity][lType] == "on")
                lTempArray.push(lType);
        }
    }
    
    //******************************************* Hebergements ******************************************
    
    if (_lCurrentTableOrActivity == "SitesEscalade")
    {
        addItemIfTypeIsOn("MassifsEscalade", _lCurrentTableOrActivity, lTempArray);
        
        addItemIfTypeIsOn("CotationEscalade", _lCurrentTableOrActivity, lTempArray);
        
        addItemIfTypeIsOn("OrientationEscalade", _lCurrentTableOrActivity, lTempArray);
        
        addItemIfTypeIsOn("DiversEscalade", _lCurrentTableOrActivity, lTempArray);
    }
    
    //******************************************* Hebergements ******************************************
    
    if (_lCurrentTableOrActivity == "Hebergements")
    {
        for (var l = 0; l < blockCategoryTrierOptions.length; l++)
        {
            lType = blockCategoryTrierOptions[l];
            
            if (trierOptionsJSON[_lCurrentTableOrActivity][lType] == "on")
                lTempArray.push(lType);
        }
        
        for (var l = 0; l < ChambreHoteTrierOptions.length; l++)
        {
            lType = ChambreHoteTrierOptions[l];
            
            if (trierOptionsJSON[_lCurrentTableOrActivity][lType] == "on")
                lTempArray.push(lType);
        }
        
        for (var l = 0; l < DiversHebergementsTrierOptions.length; l++)
        {
            lType = DiversHebergementsTrierOptions[l];
            
            if (trierOptionsJSON[_lCurrentTableOrActivity][lType] == "on")
                lTempArray.push(lType);
        }
    }
    
    return lTempArray;
}


function addItemIfTypeIsOn(_name, __currentTableOrActivity, _tempArray)
{
    for (var l = 0; l < window[_name + "TrierOptions"].length; l++)
    {
        lType = window[_name + "TrierOptions"][l];
        
        if (trierOptionsJSON[__currentTableOrActivity][lType] == "on")
            _tempArray.push(lType);
    }
}

/*
function setCheckBoxToOfforOn(_type)
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    if (trierOptionsJSON[lCurrentTableOrActivity][_type] == "off")
        trierOptionsJSON[lCurrentTableOrActivity][_type] = "on";
    else
        trierOptionsJSON[lCurrentTableOrActivity][_type] = "off";
    
    $("#" + _type + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_'+ trierOptionsJSON[lCurrentTableOrActivity][_type] + '.png)');
    
    
    log("trierOptionsJSON : " + JSON.stringify(trierOptionsJSON[lCurrentTableOrActivity]));
}
*/

function setCheckBoxToOfforOn(_type)
{
    if (currentTable == "Monuments" || currentTable == "ExpositionsMusees" || currentTable == "BonsPlans" || currentTable == "Shopping"
        || currentTable == "Sortir" || currentTable == "SitesNaturels" || currentTable == "ExpositionsMusees"
        || currentTable == "Canyons" || currentTable == "Petanque" || currentTable == "Dormir" || currentTable == "Loisirs"
        || (currentTable == "Randonnee" && RandonneeTrierOptions.indexOf(_type) != -1)
        || (currentTable == "SitesEscalade" && SitesEscaladeTrierOptions.indexOf(_type) != -1)
        || (currentTable == "Restos" && RestosTrierOptions.indexOf(_type) != -1))
    {
        loopIntoArrayToSetVarAndCheckBox(window[currentTable + "TrierOptions"], _type);
    }
    /*
     else
     if (currentTable == "Restos" && sousCritereRestosTrierOptions.indexOf(_type) != -1)
     {
     loopIntoArrayToSetVarAndCheckBox(window["sousCritereRestosTrierOptions"], _type);
     }
     */
    else
        if (currentTable == "Randonnee" && MassifsRandonneeTrierOptions.indexOf(_type) != -1)
        {
            loopIntoArrayToSetVarAndCheckBox(window["MassifsRandonneeTrierOptions"], _type);
        }
        else
            if (currentTable == "SitesEscalade" && DiversEscaladeTrierOptions.indexOf(_type) == -1)
            {
                if (MassifsEscaladeTrierOptions.indexOf(_type) != -1)
                    loopIntoArrayToSetVarAndCheckBox(window["MassifsEscaladeTrierOptions"], _type);
                else
                    if (CotationEscaladeTrierOptions.indexOf(_type) != -1)
                        loopIntoArrayToSetVarAndCheckBox(window["CotationEscaladeTrierOptions"], _type);
                    else
                        if (OrientationEscaladeTrierOptions.indexOf(_type) != -1)
                            loopIntoArrayToSetVarAndCheckBox(window["OrientationEscaladeTrierOptions"], _type);
            }
            else
            {
                if (trierOptionsJSON[currentTable][_type] == "off")
                    trierOptionsJSON[currentTable][_type] = "on";
                else
                    trierOptionsJSON[currentTable][_type] = "off";
                
                $("#" + _type + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_'+ trierOptionsJSON[currentTable][_type] + '.png)');
            }
    
    
    log("trierOptionsJSON : " + JSON.stringify(trierOptionsJSON[currentTable]));
}


function loopIntoArrayToSetVarAndCheckBox(_array, _type)
{
    for (var l = 0; l < _array.length; l++)
    {
        var lType = _array[l];
        
        if (lType == _type)
        {
            if (trierOptionsJSON[currentTable][lType] == "off")
                trierOptionsJSON[currentTable][lType] = "on";
            else
                trierOptionsJSON[currentTable][lType] = "off";
        }
        else
            trierOptionsJSON[currentTable][lType] = "off";
        
        $("#" + lType + "Checkbox").css('backgroundImage', 'url(Assets/checkbox_'+ trierOptionsJSON[currentTable][lType] + '.png)');
    }
}


function trierListItemsParOptionsActivity(_type)
{
    $("#itemList").html('');
    lastIndexItemList = 0;
    indexItemList = 10;
    
    $("#itemListBottomBtn").css("display", "none");
    
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    var lArray = [];
    
    //*************************** set to off/on + img ************************
    
    setCheckBoxToOfforOn(_type);
    
    //*************************** verify if an option is selected ************************
    
    var lActivatedCriteriasArray = getActivatedCriterias();
    
    var lType;
    
    log("lActivatedCriteriasArray : " + JSON.stringify(lActivatedCriteriasArray));
    
    
    //*************************** select items or reset all list ************************
    
    var lIsInsideArray;
    var lCouldFindIt;
    
    if (_type && lActivatedCriteriasArray.length > 0)
    {
        log("currentActivityItemList -> " + currentActivityItemList.length);
        
        for (var n = 0; n < currentActivityItemList.length; n++)
        {
            lIsInsideArray = true;

            //log ("*************** _type : " + _type);
            
            for (var t = 0; t < lActivatedCriteriasArray.length; t++)
            {
                lType = lActivatedCriteriasArray[t];
                
                lCouldFindIt = switchForTestCouldFindIt(lType, n);
                
                if (!lCouldFindIt)
                    lIsInsideArray = false;
            }
            
            /*
            log ("currentActivityItemList[n] : " + currentActivityItemList[n].idRepName);
            log("lCouldFindIt : " + lCouldFindIt);
            log("lIsInsideArray : " + lIsInsideArray);
            */
            
            if (lIsInsideArray)
                lArray.push(currentActivityItemList[n]);
        }
        
        if (_type == "isUpdate")
            listItems = lArray.sort(function (a,b) { return (parseInt(a.time) <= parseInt(b.time) ? 1 : -1)});
        else
            listItems = lArray.sort(function() {return 0.5 - Math.random()});
        
        tempArrayForSearchList = listItems;
        
        
        if (isProd || isProdWeb)
        {
            gaTrackPage('trierListItems');
            
            if (currentTable == "Home")
                gaTrackEvent('trierListItems', _type + ' / ' + currentActivity, 'currentTable : ' + currentTable, 0);
            else
                gaTrackEvent('trierListItems', _type + ' / ' + currentTable, 'currentTable : ' + currentTable, 0);
        }
        
    }
    else
    {
        listItems = currentActivityItemList.sort(function() {return 0.5 - Math.random()});;
        tempArrayForSearchList = currentActivityItemList;
    }
    
    if ($("#searchForm").val() != (commonLabel[currentLang].Research + "...") && $("#searchForm").val() != "")
    {
        $("#itemList").css("min-height", getYsize() - window.pageYOffset + "px");
        setFilteredItemList();
    }
    else
    {
        setItemList();
    }
}


function switchForTestCouldFindIt(lType, n)
{
    var lCouldFindIt = false;

    if (isTablePracticalLink)
    {
        lCouldFindIt = switchForTestCouldFindItForPracticalLink(lType, n);
    }
    else
    {
        lCouldFindIt = switchForTestCouldFindItForMyItems(lType, n);
    }
    
    return lCouldFindIt;
}


function switchForTestCouldFindItForPracticalLink(lType, n)
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    var lCouldFindIt = false;
    
    switch (lCurrentTableOrActivity)
    {
        case "AgencesReceptives" :
        {
            if (lType == "voyage" && currentActivityItemList[n].type.indexOf("cdt:AgenceDeVoyage ") != -1)
                lCouldFindIt = true;
            else
            if (lType == "evenementielle" && currentActivityItemList[n].type.indexOf("cdt:AgenceEvenementielle") != -1)
                lCouldFindIt = true;
            else
            if (lType == "operator" && currentActivityItemList[n].type.indexOf("cdt:TourOperator") != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Campings" :
        {
            if (currentActivityItemList[n]['classementcamping'].indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Parkings" :
        {
            if (parkingRelaiArray.indexOf(currentActivityItemList[n].raisonsociale) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "MoniteursEscalade" :
        {
            if (currentActivityItemList[n]['type'].indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Restaurants" :
        {
            if (lType == "classics"
                && window[lType + "RestoArray"].indexOf(currentActivityItemList[n]['raisonsociale']) != -1)
                lCouldFindIt = true;
            else
            if (lType == "favorites")
            {
                for (prop in myRestoArray)
                    if (myRestoArray[prop] == currentActivityItemList[n]['entityid'])
                        lCouldFindIt = true;
            }
            else
            {
                var lSousTypeArray = lType.split("_");
                
                for (var s = 0; s < lSousTypeArray.length; s++)
                {
                    if (currentActivityItemList[n]['typedecuisine'].indexOf(lSousTypeArray[s]) != -1)
                    {
                        lCouldFindIt = true;
                    }
                }
            }
        };
            break;
            
        case "Hebergements" :
        {
            lCouldFindIt = checkCriteriasHebergement(lType, n);
        };
            break;
    }
    
    return lCouldFindIt;
}


function checkCriteriasHebergement(lType, n)
{
    var lActivatedCriteriasArray = getActivatedCriterias();
    
    var lCouldFindIt = false;

    if (lActivatedCriteriasArray.indexOf(lType) != -1 && currentActivityItemList[n].type.indexOf(lType) != -1)
        lCouldFindIt = true;
    else
    if (lType == "1" || lType == "2" || lType == "3" || lType == "4" || lType == "5")
    {
        if (currentActivityItemList[n].type.indexOf("Hotel") != -1)
        {
            if (currentActivityItemList[n]['classement'].indexOf(lType) != -1)
                lCouldFindIt = true;
        }
        else
        if (currentActivityItemList[n]['classement'].indexOf(lType) != -1 || currentActivityItemList[n]['labelnotation'].indexOf(lType) != -1)
                lCouldFindIt = true;
    }
    else
    if (lType == "Gîtes" || lType == "soleil" || lType == "Clévacances" || lType == "Breakfast" || lType == "paysan" || lType == "Gay" || lType == "Handicap")
    {
        if (lType == "paysan")
        {
            if(currentActivityItemList[n]['label'].indexOf("paysan") != -1
               || currentActivityItemList[n]['label'].indexOf("Ferme") != -1
               )
                lCouldFindIt = true;
        }
        else
        if (currentActivityItemList[n]['label'].indexOf(lType) != -1)
            lCouldFindIt = true;
    }

    return lCouldFindIt;
}


function switchForTestCouldFindItForMyItems(lType, n)
{
    var lCurrentTableOrActivity = isTablePracticalLink ? currentTable : currentActivity;
    
    var lCouldFindIt = false;
    
    switch (lCurrentTableOrActivity)
    {
        case "Restos" :
        {
            lCouldFindIt = checkCriteriasRestos(lType, n);
        };
            break;
            
        case "PlageBaignadePiscine" :
        {
            if (currentActivityItemList[n][lType] == 1)
                lCouldFindIt = true;
        };
            break;
            
        case "Petanque" :
        {
            if (currentActivityItemList[n][lType] == 1)
                lCouldFindIt = true;
        };
            break;
            
        case "SitesNaturels" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Canyons" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Monuments" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "ExpositionsMusees" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Sortir" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "BonsPlans" :
        {
            if (currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
        };
            break;
            
        case "Randonnee" :
        {
            if (RandonneeTrierOptions.indexOf(lType) != -1 && currentActivityItemList[n].type.indexOf(lType) != -1)
                lCouldFindIt = true;
            else
            if (MassifsRandonneeTrierOptions.indexOf(lType) != -1 && currentActivityItemList[n].mountains.indexOf(lType) != -1)
                lCouldFindIt = true;
        }
            break;
            
        case "SitesEscalade" :
        {
            lCouldFindIt = checkCriteriasSitesEscalade(lType, n);
        }
            break;
            
        case "NoIdea" :
        {
            lCouldFindIt = checkCriteriasNoIdea(lType, n);
        };
            break;
    }
    
    return lCouldFindIt;
}



function checkCriteriasRestos(lType, n)
{
    log("checkCriteriasRestos -> lType : " + lType + " / n : " + n);
    
    var isCorrect = false;
    
    if (lType == "10" && currentActivityItemList[n].prixMoyen < 10)
        isCorrect = true;
    else
    if (lType == "15" && currentActivityItemList[n].prixMoyen >= 10 && currentActivityItemList[n].prixMoyen <= 15)
        isCorrect = true;
    else
    if (lType == "20" && currentActivityItemList[n].prixMoyen > 15 && currentActivityItemList[n].prixMoyen <= 21)
        isCorrect = true;
    else
    if (lType == "25" && currentActivityItemList[n].prixMoyen > 21)
        isCorrect = true;
    else
    if (lType == "vueMer" && currentActivityItemList[n].vueMer == 1)
        isCorrect = true;
    else
    if (lType == "ruePietonne" && currentActivityItemList[n].ruePietonne == 1)
        isCorrect = true;
    else
    if (lType == "takeAway" && currentActivityItemList[n].takeAway == 1)
        isCorrect = true;
    else
    if (lType == "dimanche" &&
        (!currentActivityItemList[n].soustypeOff ||
         (currentActivityItemList[n].soustypeOff && currentActivityItemList[n].soustypeOff.indexOf("dimanche") == -1)))
        isCorrect = true;
    else
    if (lType == "lundi" &&
        (!currentActivityItemList[n].soustypeOff ||
         (currentActivityItemList[n].soustypeOff && currentActivityItemList[n].soustypeOff.indexOf("lundi") == -1)))
        isCorrect = true;
    else
    if (lType == "midi" &&
        (!currentActivityItemList[n].soustypeOff ||
         (currentActivityItemList[n].soustypeOff && currentActivityItemList[n].soustypeOff.indexOf("midi") == -1)))
        isCorrect = true;
    else
    if (lType == "soir" &&
        (!currentActivityItemList[n].soustypeOff ||
         (currentActivityItemList[n].soustypeOff && currentActivityItemList[n].soustypeOff.indexOf("soir") == -1)))
        isCorrect = true;
    
    return isCorrect;
}



function checkCriteriasSitesEscalade (lType, n)
{
    var lCouldFindIt = false;
    
    if (SitesEscaladeTrierOptions.indexOf(lType) != -1 && currentActivityItemList[n].type.indexOf(lType) != -1)
        lCouldFindIt = true;
    else
    if (MassifsEscaladeTrierOptions.indexOf(lType) != -1 && currentActivityItemList[n].mountains.indexOf(lType) != -1)
        lCouldFindIt = true;
    else
    if (CotationEscaladeTrierOptions.indexOf(lType) != -1
        && currentActivityItemList[n].cotationMediane && currentActivityItemList[n].cotationMediane.indexOf(lType) != -1)
        lCouldFindIt = true;
    else
    if (OrientationEscaladeTrierOptions.indexOf(lType) != -1
        && currentActivityItemList[n].orientation && currentActivityItemList[n].orientation.indexOf(lType) != -1)
        lCouldFindIt = true;
    else
    if (DiversEscaladeTrierOptions.indexOf(lType) != -1
        && currentActivityItemList[n][lType] && currentActivityItemList[n][lType] == 1)
        lCouldFindIt = true;
    
    return lCouldFindIt;
}



function checkCriteriasNoIdea (lType, n)
{
    var lCouldFindIt = false;
    
    if ((lType == "classics" || lType == "favorites")
        && window[lType + "Array"].indexOf(currentActivityItemList[n]['idRepName']) != -1)
        lCouldFindIt = true;
    else
    if (lType == "vueMer" && currentActivityItemList[n]['vueMer'] && currentActivityItemList[n]['vueMer'] == 1)
        lCouldFindIt = true;
    else
    if (lType == "Calanques" && currentActivityItemList[n]['mountains'] && currentActivityItemList[n]['mountains'] == 'Calanques')
        lCouldFindIt = true;
    else
    if (lType == "vieuxPort" || lType == "laPlaine")
    {
        lCouldFindIt = getInsideBound(window[lType + "Area"], currentActivityItemList[n].latitude, currentActivityItemList[n].longitude, 0);
    }
    else
    if (lType == "isUpdate" && currentActivityItemList[n]['isUpdate'])
        lCouldFindIt = true;
    
     return lCouldFindIt;
}
