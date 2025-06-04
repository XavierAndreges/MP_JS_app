/*
var __Geoportal$timer = null;

function checkApiLoading(retryClbk,clss)
{
    if (__Geoportal$timer!=null) {
        //clearTimeout: cancels the timer "__Geoportal$timer" before its end
        //clearTimeout: annule le minuteur "__Geoportal$timer" avant sa fin
        window.clearTimeout(__Geoportal$timer);
         __Geoportal$timer= null;
    }

    var f;
    for( var i=0, l= clss.length; i<l; i++) {
        try {
            eval('var f='+clss[i]);
        } catch (e) {
            f= undefined;
        }
        if (typeof(f)==='undefined') {
             __Geoportal$timer= window.setTimeout(retryClbk, 300);
            return false;
        }        
    }
    return true;
}
*/



function setLeafletMapForGPX()
{
    log("setLeafletMapForGPX");
    
    var lItem = listItems[currentItemDetail];
    
    //log("setLeafletMapForGPX -> outMpZoneArray : " + outMpZoneArray.indexOf(lItem.idRepName));
    
    if (!isLeafletMap)
    {
        map = L.map('mapList', {zoomControl:false});
        isLeafletMap = true;
    }
    
    var lTileURL;
    var lMinZoom;
    var lMaxZoom;
    
    if (!isRestrictedAndroid && (currentTable == "randoMap"
        ||(localStorage.isFullTilesTracesDownloaded == "true" || mMassif_13_17)
         && (outMpZoneArray.indexOf(lItem.idRepName) == -1 || localStorage[lItem.idRepName + "_13_17"] == "true")
         )
        )
    {
        log("sssssss setLeafletMapForGPX -> localStorage.isFullTilesTracesDownloaded : true ");
        
        log("setLeafletMapForGPX -> new L.TileLayer.MBTiles");
        
        var lMin = (localStorage.isFullTilesTracesDownloaded == "true" || currentTable == "randoMap") ? 8 : 13;
        
        var lMax = (mMassif_13_17 || currentTable == "randoMap") ? 17 : 15;
        
        mRandoTileLayer = new L.TileLayer.MBTiles ('custom'
                                              , {
                                              minZoom: lMin,
                                              maxZoom: lMax,
                                              scheme: 'tms',
                                              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
                                              });
        
        map.on('moveend', moveEndModify);
    }
    else
    {
        log("sssssss setLeafletMapForGPX -> localStorage.isFullTilesTracesDownloaded : false or undefined");
        
        var folderName = getMassifNameIfInsideBound();
        
        if (folderName == -1 || (folderName != "calanques" && folderName != "coteBleue"))
        {
            if (lItem.idRepName == "trouSouffleur"
                || lItem.idRepName == "Jeannette"
                || lItem.idRepName == "pirates"
                || lItem.idRepName == "maisonVigie")
            {
                folderName = "Canyons/louPitchoun";
            }
            else
            if (lItem.idRepName == "PrieureRougeFacile"
                || lItem.idRepName == "croixDeProvenceJaune")
            {
                folderName = "Randonnee/croixDeProvenceJaune";
            }
            else
            if (lItem.idRepName == "cretesSainteBaume"
                || lItem.idRepName == "marieSainteBaume")
            {
                folderName = "Randonnee/stPilonGrotteOeufs";
            }
            else
            {
                folderName = lItem.table + '/' + lItem.idRepName;
            }
        }        
        
        //**************************************
            
        lTileURL = tilesURL + 'tilesTraces/' + folderName;
        lMinZoom = 15;
        lMaxZoom = 15;
        
        log("sssssss setLeafletMapForGPX -> lTileURL : " + lTileURL);
        
        var lTileMissing = outMpZoneArray.indexOf(lItem.idRepName) != -1 ? "tileMissingEmpty.png" : "tileMissingIGN.png";
        
        mRandoTileLayer = L.tileLayer( lTileURL + '/{z}/{x}/{y}.png'
                                      , {
                                      minZoom: lMinZoom,
                                      maxZoom: lMaxZoom,
                                      errorTileUrl:'Assets/' + lTileMissing,
                                      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
                                      });
    }
    
    map.addLayer(mRandoTileLayer);
    
    if (isAndroid)
        map.on('zoomend', moveForAndroid);
    
    if (currentTable == "randoMap")
    {
        if (mCurrentMapCenter && mCurrentMapZoom)
        {
            if(localStorage.isFullTilesTracesDownloaded != "true")
                mCurrentMapZoom = 13;
                
            map.setView([mCurrentMapCenter.lat,mCurrentMapCenter.lng], mCurrentMapZoom);
            
            mCurrentMapZoom = null;
            mCurrentMapCenter = null;
        }
        else
            map.setView([43.2953,5.37416], 9);
        
        createMassifPolygonForRandoMap();
    }
    else
    {
        //*********** setView ***************
        
        var lat, lon, lat2, lon2;
        
        if (lItem.table == "Randonnee"
            || lItem.table == "SitesEscalade" && lItem.approcheIGN)
        {
            lat = parseFloat(lItem.latitudeRouting);
            lon = parseFloat(lItem.longitudeRouting);
            
            lat2 = parseFloat(lItem.latitude);
            lon2 = parseFloat(lItem.longitude);
        }
        else
        if (lItem.table == "Canyons"
            || lItem.table == "SitesEscalade" && lItem.traceIGN)
        {
            lat = parseFloat(lItem.latitude);
            lon = parseFloat(lItem.longitude);
            
            lat2 = parseFloat(lItem.latitudeEnd);
            lon2 = parseFloat(lItem.longitudeEnd);
        }
        
        
        if(localStorage.isFullTilesTracesDownloaded == "true")
        {
            map.fitBounds([[lat,lon], [lat2, lon2]]);
        }
        else
        {
            var midLat = ((lat2 - lat) / 2) + lat;
            var midLon = ((lon2 - lon) / 2) + lon;
            
            map.setView([midLat,midLon], 15);
        }
        
        //*********** GPS by geoJSON ***************
        
        var lColor;
        var lData;
        
        if (lItem.table == "Randonnee")
        {
            lColor = "blue";
            
            var myStyle = {
                "color": lColor,
            };
            
            gpxLayer = L.geoJson(null, {style:myStyle});
            
            map.addLayer(gpxLayer);
            
            log("setLeafletMapForGPX -> lItem.isUpdate : " + lItem.isUpdate);
            
            lData = lItem.traceGeoJSON ?  jQuery.parseJSON(lItem.traceGeoJSON) : window[lItem.idRepName + "GeoJSON"];
            
            gpxLayer.addData(lData);
        }
        else
        if (lItem.table == "Canyons"
            || lItem.table == "SitesEscalade" && lItem.traceIGN)
        {
            lData = lItem.approcheGeoJSON.length > 3 ?  jQuery.parseJSON(lItem.approcheGeoJSON) : window["approche" + lItem.idRepName.capitalize() + "GeoJSON"];
            
            L.geoJson(lData, {
                      style: {"color": "red"}
                      }).addTo(map);
            
            lData = lItem.descenteGeoJSON.length > 3 ?  jQuery.parseJSON(lItem.descenteGeoJSON) : window["descente" + lItem.idRepName.capitalize() + "GeoJSON"];
            
            L.geoJson(lData, {
                      style: {"color": "blue"}
                      }).addTo(map);
            
            lData = lItem.retourGeoJSON.length > 3 ?  jQuery.parseJSON(lItem.retourGeoJSON) : window["retour" + lItem.idRepName.capitalize() + "GeoJSON"];
            
            L.geoJson(lData, {
                      style: {"color": "#000000"}
                      }).addTo(map);
        }
        else
        if (lItem.table == "SitesEscalade" && lItem.approcheIGN)
        {
            lData = lItem.approcheGeoJSON.length > 3 ?  jQuery.parseJSON(lItem.approcheGeoJSON) : window["approche" + lItem.idRepName.capitalize() + "GeoJSON"];
            
            L.geoJson(lData, {
                      style: {"color": "red"}
                      }).addTo(map);
        }
        

        //*********** markers ***************

        var LeafIcon = L.Icon.extend({
                                     options: {
                                     shadowUrl: 'Assets/pin/marker-shadow.png',
                                     iconSize:     [42, 42],
                                     shadowSize:   [42, 42],
                                     iconAnchor:   [19, 42],
                                     shadowAnchor: [10, 42],
                                     }
                                     });
        
        var lIconUrl1 = 'Assets/pin_green.png';
        var lIcon1 = new LeafIcon({iconUrl: lIconUrl1});
        var marker1 = L.marker([lat, lon], {icon: lIcon1}).addTo(map);
        markerArray.push(marker1);
        
        var lIconUrl2 = 'Assets/pin_red.png';
        var lIcon2 = new LeafIcon({iconUrl: lIconUrl2});
        var marker2 = L.marker([lat2, lon2], {icon: lIcon2}).addTo(map);
        markerArray.push(marker2);
    }
    
    removeLoadingAnimation();
    
    if (currentTable == "randoMap" && (localStorage.tipRandoMap === undefined || localStorage.tipRandoMap == "false"))
    {
        setTimeout(function(){
                   
                   if  (isLittleModalPopUp)
                        showLittleModalPopUp();
                   
                   showLittleModalPopUp("tipRandoMap");
                   
                   }, 1500);
    }
}


function moveEndModify()
{
    log("moveEndModify -> ZoomMax : " + map.getMaxZoom() + " / getZoom : " + map.getZoom());
    
    if (currentTable == "randoMap")
    {
        if (map.getZoom() <= 10)
        {
            $("#bntDonwload").css("display", "none");
            return;
        }
        
        if (isMapCenterInsideMassifBound())
        {
            if(window[mCurrentMassif + "_13_17"])
            {
                $("#bntDonwload").css("display", "none");
                map.options.maxZoom = 17;
            }
            else
            {
                $("#bntDonwload").css("display", "inline-block");
                map.options.maxZoom = 15;
            }
        }
        else
        {
            $("#bntDonwload").css("display", "none");
            map.options.maxZoom = 15;
        }
    }
}


function getMassifNameIfInsideBound()
{
    var lItem = listItems[currentItemDetail];
    
    var lInsideMassifName = -1;
    
    for (var prop in massifBoundsArray)
    {
        if (massifBoundsArray.hasOwnProperty(prop))
        {
            var lArray = massifBoundsArray[prop].split(",");
            
            if (getInsideBound(lArray, lItem.latitude, lItem.longitude, 0) == true)
            {
                lInsideMassifName = prop;
                
                break;
            }
        }
    }
    
    log("getMassifNameIfInsideBound -> lInsideMassifName : " + lInsideMassifName);
    
    return lInsideMassifName;
}


function isMapCenterInsideMassifBound()
{
    var lInsideMassif = false;
    
    for (var prop in massifBoundsArray)
    {
        if (massifBoundsArray.hasOwnProperty(prop))
        {
            var lArray = massifBoundsArray[prop].split(",");
            
            var lCenter;
            
            //if (isApp && !isGoogleSelected && !isRestrictedAndroid)
                lCenter = {"latitude" : map.getCenter().lat, "longitude" : map.getCenter().lng};
            /*
            else
                lCenter = {"latitude" : map.getCenter().lat(), "longitude" : map.getCenter().lng()};
            */
            
            if (getInsideBound(lArray, lCenter.latitude, lCenter.longitude, 0) == true)
            {
                lInsideMassif = true;
                mCurrentMassif = prop;
                
                log("isMapCenterInsideMassifBound -> mCurrentMassif : " + mCurrentMassif);
                
                break;
            }
            else
                mCurrentMassif = null;
        }
    }
    
    log("isMapCenterInsideMassifBound -> lInsideMassif : " + lInsideMassif);
    
    return lInsideMassif;
}


function createMassifPolygonForRandoMap()
{
    var polylineArray;
    
    var lArray;
    
    for (var prop in massifBoundsArray)
    {
        polylineArray = [];
        
        lArray = massifBoundsArray[prop].split(",");
        
        log("createMassifPolygonForRandoMap : lArray -> " + JSON.stringify(lArray));
        
        //if (isApp && !isGoogleSelected && !isRestrictedAndroid)
        {
            polylineArray.push(new L.LatLng(parseFloat(lArray[1]), parseFloat(lArray[0])));
            polylineArray.push(new L.LatLng(parseFloat(lArray[1]), parseFloat(lArray[2])));
            polylineArray.push(new L.LatLng(parseFloat(lArray[3]), parseFloat(lArray[2])));
            polylineArray.push(new L.LatLng(parseFloat(lArray[3]), parseFloat(lArray[0])));
            polylineArray.push(new L.LatLng(parseFloat(lArray[1]), parseFloat(lArray[0])));
            
            var lColor = 'red';
            
            if (localStorage[prop + "_13_17"] == "true")
                lColor = 'blue';
            
            polyline = L.polyline(polylineArray, {color: lColor});
            
            map.addLayer(polyline);
        }
        /*
        else
        {
            polylineArray.push(new google.maps.LatLng(parseFloat(lArray[1]), parseFloat(lArray[0])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lArray[1]), parseFloat(lArray[2])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lArray[3]), parseFloat(lArray[2])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lArray[3]), parseFloat(lArray[0])));
            polylineArray.push(new google.maps.LatLng(parseFloat(lArray[1]), parseFloat(lArray[0])));
            
            polyline = new google.maps.Polyline({
                                                path: polylineArray,
                                                strokeColor: '#FF0000',
                                                strokeOpacity: 0.8,
                                                strokeWeight: 3
                                                });
            
            polyline.setMap(map);
        }
         */
    }
}


function initMapIGN() {
    
    log("initMapIGN");
    
    //translate();
    
    // ----- Options
    
    var options = {
    mode:'normal',
    territory:'FXX'
    };
    
    log("initMapIGN -> IGNkey : " + IGNkey);
    
    mapIGN = new Geoportal.Viewer.Simple('mapList', OpenLayers.Util.extend(
                                                                            options,
                                                                            window.gGEOPORTALRIGHTSMANAGEMENT===undefined? {'apiKey':IGNkey} : gGEOPORTALRIGHTSMANAGEMENT)
                                        );
    
    
    if (!mapIGN) {
        OpenLayers.Console.error(OpenLayers.i18n('new.instance.failed'));
        log('new.instance.failed');
        return;
    }
    
    
    mapIGN.getMap().addControl(new Geoportal.Control.PanPanel(), new OpenLayers.Pixel(5,120));
    
    // ----- Layers

    mapIGN.addGeoportalLayers(['GEOGRAPHICALGRIDSYSTEMS.MAPS'],
                              {
                              'GEOGRAPHICALGRIDSYSTEMS.MAPS':{visibility:true},
                              global:{opacity:1.0}
                              }
                              );
    
/*
    var matrixIds= [];
    for (var i= 0; i<22; i++) {
        matrixIds[i]= {
        identifier:"EPSG:900913:" + i,
        topLeftCorner:new OpenLayers.LonLat(-20037508,20037508)
        };
    }
    
    var wmts_layer= new Geoportal.Layer.WMTS({
                                             name:'Vues satellite et aériennes',
                                             url:'http://tile.geobretagne.fr/gwc02/service/wmts',
                                             layer:'satellite',
                                             style:'_null',
                                             matrixSet:'EPSG:900913',
                                             matrixIds:matrixIds,
                                             tileOrigin:new OpenLayers.LonLat(-20037508,20037508),
                                             format:"image/jpeg",
                                             projection:new OpenLayers.Projection('EPSG:900913'),
                                             opacity:1,
                                             
                                             originators:[{
                                                          pictureUrl:'http://geobretagne.fr/accueil/static/logos/logo_geobretagne.png',
                                                          url:'http://geobretagne.fr/',
                                                          attribution:'GéoBretagne'
                                                          }]
                                             }
                                             );
    
    mapIGN.getMap().addLayer(wmts_layer);
*/
    
    StyleMapIGN = new OpenLayers.StyleMap({
                                             
                                             "default": new OpenLayers.Style({
                                                                             'pointRadius': 15,
                                                                             'strokeColor': '#ff00ff',
                                                                             'fillColor': '#ff00ff',
                                                                             'strokeWidth' : 8
                                                                             }),
                                             
                                             "select": new OpenLayers.Style({
                                                                            'pointRadius': 30,
                                                                            'strokeColor': '#ff00ff',
                                                                            'fillColor': '#ff00ff'
                                                                            })
                                             });
    
    setMapIGN();
    
    log("setMapIGN");
}


function setMapIGN()
{
    var lItem = listItems[currentItemDetail];
    
    log ("setMapIGN -> mapIGN : " + mapIGN + " | traceIGN : " + lItem.traceIGN);
    
    var lName = "";
    
    //************************** APPROCHE ********************************
    
    if (lItem.table == "Randonnee")
        lName = lItem.idRepName;
    
    if (lItem.table == "SitesEscalade" && lItem.approcheIGN)
        lName = "approche" + lItem.idRepName.capitalize();
    
    if (lItem.table == "Canyons" && lItem.traceIGN)
        lName = lItem.idRepName + "/approche" + lItem.idRepName.capitalize();
    
    
    mapIGN.getMap().addLayer(
                             'GPX',
                             'Dansaires',
                             'ign/' + lItem.table + '/' + lName +'.gpx',
                             {
                             visibility:true,
                             styleMap:StyleMapIGN,
                             }
                             ,{
                             preventDefaultBehavior:true,
                             formatOptions:{
                             extractStyles:true
                             }
                             }
                             );
    
    //************************** ESCALADE ********************************
    
    if (lItem.table == "SitesEscalade" && lItem.traceIGN)
    {        
        lName = "retour" + lItem.idRepName.capitalize();
        
        var retourStyle = new OpenLayers.StyleMap({
                                                  
                                                  "default": new OpenLayers.Style({
                                                                                  'pointRadius': 15,
                                                                                  'strokeColor': '#cccccc',
                                                                                  'fillColor': '#cccccc',
                                                                                  'strokeWidth' : 8
                                                                                  }),
                                                  
                                                  "select": new OpenLayers.Style({
                                                                                 'pointRadius': 30,
                                                                                 'strokeColor': '#cccccc',
                                                                                 'fillColor': '#cccccc'
                                                                                 })
                                                  });
        
        mapIGN.getMap().addLayer(
                                 'GPX',
                                 'Dansaires',
                                 'ign/' + lItem.table + '/' + lName +'.gpx',
                                 {
                                 visibility:true,
                                 styleMap:retourStyle,
                                 }
                                 ,{
                                 preventDefaultBehavior:true,
                                 formatOptions:{
                                 extractStyles:true
                                 }
                                 }
                                 );
    }
    
    //************************** CANYONS ********************************
    
    if (lItem.table == "Canyons" && lItem.traceIGN)
    {
        lName = lItem.idRepName + "/descente" + lItem.idRepName.capitalize();
        
        var descenteStyle = new OpenLayers.StyleMap({
                                                      
                                                      "default": new OpenLayers.Style({
                                                                                      'pointRadius': 15,
                                                                                      'strokeColor': '#0061c2',
                                                                                      'fillColor': '#0061c2',
                                                                                      'strokeWidth' : 8
                                                                                      }),
                                                      
                                                      "select": new OpenLayers.Style({
                                                                                     'pointRadius': 30,
                                                                                     'strokeColor': '#0061c2',
                                                                                     'fillColor': '#0061c2'
                                                                                     })
                                                      });
        
        mapIGN.getMap().addLayer(
                                 'GPX',
                                 'Dansaires',
                                 'ign/' + lItem.table + '/' + lName +'.gpx',
                                 {
                                 visibility:true,
                                 styleMap:descenteStyle,
                                 }
                                 ,{
                                 preventDefaultBehavior:true,
                                 formatOptions:{
                                 extractStyles:true
                                 }
                                 }
                                 );
        
        lName = lItem.idRepName + "/retour" + lItem.idRepName.capitalize();
        
        var retourStyle = new OpenLayers.StyleMap({
                                                    
                                                    "default": new OpenLayers.Style({
                                                                                    'pointRadius': 15,
                                                                                    'strokeColor': '#cccccc',
                                                                                    'fillColor': '#cccccc',
                                                                                    'strokeWidth' : 8
                                                                                    }),
                                                    
                                                    "select": new OpenLayers.Style({
                                                                                   'pointRadius': 30,
                                                                                   'strokeColor': '#cccccc',
                                                                                   'fillColor': '#cccccc'
                                                                                   })
                                                    });
        
        mapIGN.getMap().addLayer(
                                 'GPX',
                                 'Dansaires',
                                 'ign/' + lItem.table + '/' + lName +'.gpx',
                                 {
                                 visibility:true,
                                 styleMap:retourStyle,
                                 }
                                 ,{
                                 preventDefaultBehavior:true,
                                 formatOptions:{
                                 extractStyles:true
                                 }
                                 }
                                 );
    }
    
    //******************* création du marqueur depart *******************
    
    var position_depart;
    
    if (lItem.table == "Randonnee" || (lItem.table == "SitesEscalade" && !lItem.traceIGN))
    {
        position_depart  = new OpenLayers.Geometry.Point(parseFloat(lItem.longitudeRouting), parseFloat(lItem.latitudeRouting));
    }
   
    if (lItem.table == "Canyons" || (lItem.table == "SitesEscalade" && lItem.traceIGN))
    {
        position_depart  = new OpenLayers.Geometry.Point(parseFloat(lItem.longitude), parseFloat(lItem.latitude));
    }
    
    
    position_depart.transform(OpenLayers.Projection.CRS84, mapIGN.projection);

    var lPoi_depart = new OpenLayers.Feature.Vector(position_depart,
                                             null,
                                             {
                                             externalGraphic:'Assets/pin_green.png',
                                             graphicWidth:42,
                                             graphicHeight:42,
                                             graphicXOffset:-17,
                                             graphicYOffset:-42
                                             }
                                             );
    
    //******************* création du marqueur arrivée *******************
    
    var position_arrivee;

    if (lItem.table == "Randonnee" || (lItem.table == "SitesEscalade" && !lItem.traceIGN))
    {
        position_arrivee = new OpenLayers.Geometry.Point(parseFloat(lItem.longitude), parseFloat(lItem.latitude));
    }
    
    if (lItem.table == "Canyons" || (lItem.table == "SitesEscalade" && lItem.traceIGN))
    {
        position_arrivee  = new OpenLayers.Geometry.Point(parseFloat(lItem.longitudeEnd), parseFloat(lItem.latitudeEnd));
    }
    
    position_arrivee.transform(OpenLayers.Projection.CRS84, mapIGN.projection);
    
    
    var lPoi_arrivee = new OpenLayers.Feature.Vector(position_arrivee,
                                                    null,
                                                    {
                                                    externalGraphic:'Assets/pin_red.png',
                                                    graphicWidth:42,
                                                    graphicHeight:42,
                                                    graphicXOffset:-17,
                                                    graphicYOffset:-42
                                                    }
                                                    );
    
    //******************* couche du marqueur *******************
    
    var couche = new OpenLayers.Layer.Vector(lItem.idRepName);
    
    couche.addFeatures([lPoi_depart]);
    couche.addFeatures([lPoi_arrivee]);
    
    mapIGN.getMap().addLayer(couche);
    
    //******************* centrage *******************


    mapIGN.getMap().setCenterAtLonLat(parseFloat(lItem.longitude), parseFloat(lItem.latitude), 15);
    
    log("setMapIGN / setMapIGN : " + lItem.idRepName);
    
    removeLoadingAnimation();
}


var mUserIGNLayer = null;


function setIGNuserPositionmarker()
{
    //alert('setIGNuserPositionmarker');
    
    var position = new OpenLayers.Geometry.Point(parseFloat(userLocation.longitude), parseFloat(userLocation.latitude));
    position.transform(OpenLayers.Projection.CRS84, mapIGN.projection);
    
    // création du marqueur
    var lPoi = new OpenLayers.Feature.Vector(position,
                                             null,
                                             {
                                             externalGraphic:'Assets/pin_blue.png',
                                             graphicWidth:42,
                                             graphicHeight:42,
                                             graphicXOffset:-17,
                                             graphicYOffset:-42
                                             }
                                             );
    
    if (mUserIGNLayer != undefined)
    {
        //alert('removeLayer');
        mapIGN.getMap().removeLayer(mUserIGNLayer);
        mUserIGNLayer = null;
    }
    
    // couche du marqueur
    mUserIGNLayer = new OpenLayers.Layer.Vector("UserLocation");
    mUserIGNLayer.addFeatures([lPoi]);
    mapIGN.getMap().addLayer(mUserIGNLayer);
    
    mapIGN.getMap().setCenterAtLonLat(parseFloat(userLocation.longitude), parseFloat(userLocation.latitude), 16);
}


function loadIGN()
{
    var typeViewer;
    
    if (isMobile)
        typeViewer = 'Geoportal.Viewer.Mobile';
    else
        typeViewer = 'Geoportal.Viewer.Default';
    
    /*
    if (checkApiLoading('loadIGN();',['OpenLayers','Geoportal','Geoportal.Viewer', typeViewer]) === false) {
        return;
    }
    */
    
    var lFileAutoConfig = null;
    
    if (isApp)
        lFileAutoConfig = 'js/autoconfigIGN.js';
    
    log("loadIGN -> mapStatus = IGN");

    
     Geoportal.GeoRMHandler.getConfig([IGNkey], null, lFileAutoConfig, {
            onContractsComplete: initMapIGN
     });
}
