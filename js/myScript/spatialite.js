var fs;				// file system object

var ftSpatial = null;
var ftCustom = null;
var ftRando = null;
var ftMassif = null;
var ftAixSmall_17_19 = null;

var fullSpatialDbName = "MarseilleProvenceOSM.db";
var smallSpatialDbName = "MarseilleOSM.db";

var pacaTilesName = "pacaTiles.db";
var MPtilesDb_8_16_name = "MarseilleProvenceTiles_8_16.db";
var MPtilesRandoDb_8_15_name = "marseilleProvenceRando_8_15.db";


var fullBoundBoxMP = [4.9050207,43.0799304,5.7759888,43.5539641];
var smallBoundBoxMP = [5.1880,43.1929,5.5436,43.3721];

var fullSpatialiteDb = null;
var smallSpatialiteDb = null;
var marseilleProvenceTilesDb = null;
var pacaTilesDb = null;
var mpTilesRandoDb = null;
var AixSmall_17_19_db = null;

var nodeFrom = null;
// Vieux port = 25097;
// JP Brun = 27123;
var nodeTo = null;
var dbSpatial = null;
var spatialNetWork;

var typeBoundingBox = null;

//= "roads_car";

var diffLocation = 0.00335;
var lonFrom;
var latFrom;
var lonTo;
var latTo;

var nbOctetsTilesDb = 57030656 + 12840960;

/*
 var lonFrom = 5.386037;
 var latFrom = 43.291982;
 var lonTo = 5.384277;
 var latTo = 43.290459;
 */

var lAndroidDbName;

function launchSpatialiteRequest()
{
    log("LLLLLLLLLLL -> launchSpatialiteRequest / dbSpatial : " + dbSpatial);
    
    //***********  normally has been set in transition *******************
    
    log("localStorage.isSmallSQLiteForSpatialiteInstalled : " + localStorage.isSmallSQLiteForSpatialiteInstalled);
    log("typeBoundingBox : " + typeBoundingBox);
    
    if (!localStorage.isSmallSQLiteForSpatialiteInstalled)
        return;
    
    //*********** set DB *******************
    
    
    if (!typeBoundingBox)
    {
        setRightDBAccordingToPosition();
        return;
    }
    
    switch (typeBoundingBox)
    {
        case "smallBoundBoxMP" : {
            lAndroidDbName = "MarseilleOSM";
            dbSpatial = smallSpatialiteDb;
        };
            break;
            
        case "fullBoundBoxMP" :
        {
            if (!localStorage.isFullSQLiteForSpatialiteInstalled || localStorage.isFullSQLiteForSpatialiteInstalled == "false")
            {
                showLittleModalPopUp(fullSpatialDbName);
                return;
            }
            else
            {
                lAndroidDbName = "MarseilleProvenceOSM";
                dbSpatial = fullSpatialiteDb;
            }
        };
            break;
            
        case "none" :
        {
            removeLoadingAnimation();
            showLittleModalPopUp("", commonLabel[currentLang].spatialItemNotInBound);
            return;
        };
            break;
    }
    
    
    if (isIOS)
        log("dbSpatial : " + JSON.stringify(dbSpatial));
    
    
    //************************************************************************

    if ((userLocation || userChoosePosition) && !nodeFrom)
        querySpatialDbForCloserNode('nodeFrom');
    
    /*
    if (typeBoundingBox == "fullBoundBoxMP" && listItems[currentItemDetail].node != undefined && listItems[currentItemDetail].node != null)
        nodeTo = parseFloat(listItems[currentItemDetail].node);
    else
     */
    if (nodeFrom && !nodeTo)
        querySpatialDbForCloserNode('nodeTo');
    
    log("nodeFrom : " + nodeFrom + " / nodeTo : " + nodeTo);
    
    if (!nodeFrom || !nodeTo)
        return;
    
    querySpatialDbForRouting();
}


function getPhoneGapPath()
{
    var path = window.location.pathname;
    var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
    
    return phoneGapPath.substring(0, path.lastIndexOf('/') + 1);
}


function successMetadata()
{
    log("The metadata was successfully set.");
}

function failMetadata()
{
    alert("There was an error in setting the metadata");
}


function copyAndOpenCustomTile(_name)
{
    var lDownloadURL = ((isProd || isMobileTest) ? ('file://' + getPhoneGapPath()) : ipAdress) + "tilesCustom/" + _name;
    
    log('copyFiles -> lDownloadURL : ' + lDownloadURL);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('copyFiles -> file system retrieved : ' + _name);
                             
                             var lFt = new FileTransfer();
                             
                             lFt.download(lDownloadURL, fileSystem.root.nativeURL + '/' + _name, function (entry)
                                                {
                                                log('copyFiles -> download complete: ' + entry.fullPath);

                                                localStorage[_name] = "true";
                                          
                                                var lName = _name.replace(".db", "")

                                                window[lName] = window.sqlitePlugin.openDatabase({name: lName});
                                          
                                                //*************** skip backup to iCloud ***************
                                          
                                                if (isIOS)
                                                    entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                          
                                                }, function (error)
                                                {
                                                log('copyFiles -> error with download :' + error);
                                                log(JSON.stringify(error));
                                                });
                             /*
                             lFt.onprogress = function(progressEvent)
                             {
                             log(JSON.stringify(progressEvent));
                             }
                             */
                             
                             });
}


function downloadMassifDb(_name)
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    /*********************** connectionOut *****************/
    
    if (!isNetWorkAvalaible)
    {
        showLittleModalPopUp("connectionOut");
        return;
    }
    
    /*********************** lPathToDownload *****************/
    
    var lSizeBD = Math.ceil(parseInt(massifDbSizeArray[_name]) / (1024*1024));
    
    showLittleModalPopUp("progressBar", commonLabel[currentLang].downloading + " - " + lSizeBD + "Mo", "ftMassif");
    
    var downloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + "massifDb/" + _name + "_13_17.db";
    
    log('>>>>>> downloadMassifDb | downloadURL : ' + downloadURL);
    
    //*********************************************************/
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
    {
            log('file system retrieved for downloadMassifDb');
            //log("fileSystem : " + JSON.stringify(fileSystem));
    
            if (!ftMassif)
                ftMassif = new FileTransfer();
                             
            var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
            
            ftMassif.download(downloadURL, lPathToStore + "/" + _name + "_13_17.db", function (entry)
                              {
                              log('download complete: ' + entry.fullPath);
                              
                              localStorage[_name + "_13_17"] = true;
                              
                              openTilesRandoDb();
                              
                              if (currentTable != "randoMap")
                              {
                                $("#bntDonwload").remove();
                                isDownloadBtn = false;
                              }

                                mCurrentMapZoom = map.getZoom();
                                mCurrentMapCenter = map.getCenter();

                              //*************** skip backup to iCloud ***************
                              
                              if (isIOS)
                                entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                              
                              //*************** set new map layer **********************
                              
                              setTimeout(setNewRandoMap, 2000);
                              
                              }, function (error)
                              {
                                if (isLittleModalPopUp)
                                    showLittleModalPopUp();
                             
                                log('error with download : ' + error);
                             
                                showLittleModalPopUp('downloadFailed');
                             
                                removeLoadingAnimation();
                             });
                             
                             
            ftMassif.onprogress = function(progressEvent)
            {
                //log(JSON.stringify(progressEvent));
                var perCent = progressEvent.loaded * (isAndroid ? 0.5 : 1) / progressEvent.total * 100;
                $("#progressBar").width(perCent + "%");
            }
                            
                             
    });
    
    if (isProd)
    {
        gaTrackPage('downloadMassifDb');
        
        gaTrackEvent('downloadMassifDb', '_name : ' + _name, 'idRepName : ' + listItems[currentItemDetail].idRepName, 0);
    }
}


function setNewRandoMap()
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    if (gpxLayer)
    {
        map.removeLayer(gpxLayer);
        gpxLayer = null;
    }
    
    map.removeLayer(mRandoTileLayer);
    mRandoTileLayer = null;

    setLeafletMapForGPX();
}


function smallCopySQLiteDB()
{    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    /*********************** connectionOut *****************/
    
    if (!isNetWorkAvalaible)
    {
        showLittleModalPopUp("connectionOut");
        return;
    }
    
    var smallSpatialDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + "MarseilleOSM.db";
    
    log('>>>>>> smallCopySQLiteDB | smallSpatialDbToDownloadURL : ' + smallSpatialDbToDownloadURL);
    
    //*********************************************************/
    
    showLittleModalPopUp("progressBar", commonLabel[currentLang].itineraryWithNetWork + " - 77 Mo<br><br>Marseille<br>La Ciotat<br>Aix-en-Provence<br>Istres", "ftSpatial");

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved.');
     
                             if (!ftSpatial)
                                ftSpatial = new FileTransfer();
                             
                             log('smallCopySQLiteDB -> fileSystem : ' + JSON.stringify(fileSystem));
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
                             
                             log('smallCopySQLiteDB -> lPathToStore : ' + lPathToStore);
     
                             ftSpatial.download(smallSpatialDbToDownloadURL, lPathToStore + '/' + smallSpatialDbName, function (entry)
                                         {
                                         log('download complete: ' + entry.fullPath);
                                         
                                         localStorage.isSmallSQLiteForSpatialiteInstalled = "true";
                                                
                                         //*************** skip backup to iCloud ***************
                                                
                                         if (isIOS)
                                            entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                         
                                         //*************** download next part ***************
                                                
                                         fullSpatialDbToDownLoad();
                                         
                                         }, function (error)
                                         {
                                                
                                                if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                                
                                                log('error with download', error);
                                                showLittleModalPopUp('downloadFailed');
                                                
                                                removeLoadingAnimation();
                                        });
                             
                             ftSpatial.onprogress = function(progressEvent)
                             {
                             //log(JSON.stringify(progressEvent));
                             var perCent = (progressEvent.loaded * (isAndroid ? 0.5 : 1)) / (21124096 + 56418304) * 100;
                             $("#progressBar").width(perCent + "%");
                             }
                             
                             });

}


function fullSpatialDbToDownLoad()
{
    log('fullSpatialDbToDownLoad ANDROID TEST lPathToStore = fileSystem.root.nativeURLfor  -> requesting file system...');
    
    var fullSpatialDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + "MarseilleProvenceOSM.db";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved for fullSpatialDbToDownLoad');
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
     
                             ftSpatial.download(fullSpatialDbToDownloadURL, lPathToStore + '/' + fullSpatialDbName, function (entry)
                                         {
                                         log('download complete: ' + entry.fullPath);
     
                                         localStorage.isFullSQLiteForSpatialiteInstalled = "true";
                                         
                                         if (isIOS)
                                                openSpatialDb();
                                         
                                         if (isLittleModalPopUp)
                                                showLittleModalPopUp();
                                         
                                         removeLoadingAnimation();
                                         
                                         $("#btnMenuFullSQLite").html(commonLabel[currentLang].deleteFullSQLite);
                                         $("#btnMenuFullSQLite").attr("href", "javascript:showLittleModalPopUp('confirmedDeleteFullSQLite')");
                                                
                                         //*************** skip backup to iCloud ***************
                                                
                                         if (isIOS)
                                                entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});

                                         }, function (error)
                                         {
                                         log('error with download', error);
                                         
                                         if (isLittleModalPopUp)
                                            showLittleModalPopUp();
                                         
                                         showLittleModalPopUp('downloadFailed');
                                                
                                         removeLoadingAnimation();
                                         
                                         });
                             
                             ftSpatial.onprogress = function(progressEvent)
                             {
                                //log(JSON.stringify(progressEvent));
                                var perCent = ((progressEvent.loaded * (isAndroid ? 0.5 : 1)) + 21124096) / (56418304 + 21124096) * 100;
                                $("#progressBar").width(perCent + "%");
                             }
                             
                             });

    
    if (isProd)
    {
        gaTrackPage('downloadSpatialDb');
    }
}


function MPtilesDb_8_16_toDownload()
{
    localStorage.checkHomePopUp = "never";
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    /*********************** connectionOut *****************/
    
    if (!isNetWorkAvalaible)
    {
        showLittleModalPopUp("connectionOut");
        return;
    }
    
    //*********************************************************/
    
    showLittleModalPopUp("progressBar", "Zoom 8 > 16 - 70 Mo<br>Marseille<br>La Ciotat<br>Aix-en-Provence<br>Istres", "ftCustom");
    
    var marseilleProvenceTilesDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + MPtilesDb_8_16_name;
    
    log('>>>>>> MPtilesDb_8_16_toDownload | marseilleProvenceTilesDbToDownloadURL : ' + marseilleProvenceTilesDbToDownloadURL);
    

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved for MPtilesDb_8_16_toDownload');
                             
                             if (!ftCustom)
                                ftCustom = new FileTransfer();
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
     
                             ftCustom.download(marseilleProvenceTilesDbToDownloadURL, lPathToStore + '/' + MPtilesDb_8_16_name, function (entry)
                                         {
                                         log('download complete: ' + entry.fullPath);
                                               
                                         //*************** skip backup to iCloud ***************
                                               
                                         if (isIOS)
                                            entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                               
                                         //*************** download next part ***************
                                         
                                         PacaTilesDb_8_12_ToDownload();
                                         
                                         }, function (error)
                                         {
                                               
                                         if (isLittleModalPopUp)
                                               showLittleModalPopUp();
                                               
                                         log('error with download', error);
                                         showLittleModalPopUp('downloadFailed');
     
                                            removeLoadingAnimation();
                                         });
                             
                             ftCustom.onprogress = function(progressEvent)
                             {
                             //log(JSON.stringify(progressEvent));
                             var perCent = progressEvent.loaded * (isAndroid ? 0.5 : 1) / (progressEvent.total + 12840960) * 100;
                             $("#progressBar").width(perCent + "%");
                             }
                             
                             });
    
    if (isProd)
    {
        gaTrackPage('MPtilesDb_8_16_toDownload');
    }
}


function PacaTilesDb_8_12_ToDownload()
{    
    var pacaTilesDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + pacaTilesName;
    
    log('>>>>>> PacaTilesDb_8_12_ToDownload | pacaTilesDbToDownloadURL : ' + pacaTilesDbToDownloadURL);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved for PacaTilesDb_8_12_ToDownload');
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
     
                             ftCustom.download(pacaTilesDbToDownloadURL, lPathToStore + '/' + pacaTilesName, function (entry)
                                         {
                                         log('download complete: ' + entry.fullPath);
     
                                         localStorage.isMarseilleProvenceTiles_8_16_installed = "true";
                                         
                                         openTilesDb();
                                         
                                         if (isLittleModalPopUp)
                                            showLittleModalPopUp();
                                               
                                         removeLoadingAnimation();
                                         
                                         $("#btnMenuTilesDb_8_16").html(commonLabel[currentLang].deleteMPTiles_8_16);
                                         $("#btnMenuTilesDb_8_16").attr("href", "javascript:showLittleModalPopUp('confirmedDeleteMPTiles_8_16')");
                                               
                                         if (isMapVisible)
                                         {
                                               if (mapStatus == "Circuits")
                                               {
                                                   $("#macaronPartner").remove();
                                                   
                                                   isCellPartnerVisible = false;
                                                   $("#cellPartner").remove();
                                                   
                                                   $("#circuitsSwiper").remove();
                                                   $("#circuitsBtnSwiper").remove();
                                                   isCircuitsSwiperVisible = false;
                                                   
                                                   mIndexLastSelectedCircuitMarker = -1;
                                               }
                                               
                                               mCurrentMapZoom = map.getZoom();
                                               mCurrentMapCenter = map.getCenter();
                                               
                                               showMap3(mapStatus);
                                         }
                                               
                                         //*************** skip backup to iCloud ***************
                                               
                                         if (isIOS)
                                             entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                         
                                         }, function (error)
                                         {
                                               
                                               if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                               
                                               log('error with download', error);
                                               showLittleModalPopUp('downloadFailed');
                                               
                                               removeLoadingAnimation();
                                         });
                             
                             ftCustom.onprogress = function(progressEvent)
                             {
                             //log(JSON.stringify(progressEvent));
                             var perCent = (57030656 + (progressEvent.loaded * (isAndroid ? 0.5 : 1))) / (progressEvent.total + 57030656) * 100;
                             $("#progressBar").width(perCent + "%");
                             }
                             
                             });
}


function MpTilesRandoDb_8_15_ToDownload()
{
    localStorage.checkHomePopUp = "never";
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    /*********************** connectionOut *****************/

    if (!isNetWorkAvalaible)
    {
        showLittleModalPopUp("connectionOut");
        return;
    }
    
    //*********************************************************/
    
    showLittleModalPopUp("progressBar", "Zoom 8 > 15 - 74 Mo<br><br>Marseille<br>La Ciotat<br>Aix-en-Provence<br>Istres", "ftRando");
    
    var mpTilesRandoDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + MPtilesRandoDb_8_15_name;
    
    log('>>>>>> MpTilesRandoDb_8_15_ToDownload | mpTilesRandoDbToDownloadURL : ' + mpTilesRandoDbToDownloadURL);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved for MpTilesRandoDb_8_15_ToDownload');
     
                             if (!ftRando)
                                ftRando = new FileTransfer();
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
     
                             ftRando.download(mpTilesRandoDbToDownloadURL, lPathToStore + '/' + MPtilesRandoDb_8_15_name, function (entry)
                                         {
                                         log('download complete: ' + entry.fullPath);
     
                                         localStorage.isFullTilesTracesDownloaded = "true";
                                         
                                         mpTilesRandoDb = window.sqlitePlugin.openDatabase({name: MPtilesRandoDb_8_15_name.replace(".db", "")});
                                         
                                         if (isLittleModalPopUp)
                                            showLittleModalPopUp();
                                              
                                         removeLoadingAnimation();
                                         
                                         $("#btnMenuRandoTiles").html(commonLabel[currentLang].deleteRandoTiles);
                                         $("#btnMenuRandoTiles").attr("href", "javascript:showLittleModalPopUp('confirmedDeleteTilesRando')");
                                              
                                              if (isMapVisible)
                                              {
                                                mCurrentMapZoom = map.getZoom();
                                                mCurrentMapCenter = map.getCenter();
                                              
                                                showMap3(mapStatus);
                                              }
                                              
                                         //*************** skip backup to iCloud ***************
                                              
                                         if (isIOS)
                                              entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                         
                                         }, function (error)
                                         {
                                              
                                              if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                              
                                              log('error with download', error);
                                              showLittleModalPopUp('downloadFailed');
                                              
                                              removeLoadingAnimation();
                                              
                                         }, true);
                             
                             ftRando.onprogress = function(progressEvent)
                             {
                             //log(JSON.stringify(progressEvent));
                             var perCent = progressEvent.loaded  * (isAndroid ? 0.5 : 1) / progressEvent.total * 100;
                             $("#progressBar").width(perCent + "%");
                             }
                             
                             });
    
    if (isProd)
    {
        gaTrackPage('MpTilesRandoDb_8_15_ToDownload');
    }
}


function AixSmall_17_19_toDownload()
{
    localStorage.checkHomePopUp = "never";
    
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    /*********************** connectionOut *****************/
    
    if (!isNetWorkAvalaible)
    {
        showLittleModalPopUp("connectionOut");
        return;
    }
    
    //*********************************************************/
    
    showLittleModalPopUp("progressBar", "Zoom 17 > 19 - 7 Mo<br>Aix-en-Provence", "ftAixSmall_17_19");
    
    var marseilleProvenceTilesDbToDownloadURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + "AixSmall_17_19.db";
    
    log('>>>>>> AixSmall_17_19_toDownload | marseilleProvenceTilesDbToDownloadURL : ' + marseilleProvenceTilesDbToDownloadURL);
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                             {
                             log('file system retrieved for AixSmall_17_19_toDownload');
                             
                             if (!ftAixSmall_17_19)
                                ftAixSmall_17_19 = new FileTransfer();
                             
                             var lPathToStore = isAndroid ? lDataFolderAndroid : fileSystem.root.nativeURL;
                             
                             ftAixSmall_17_19.download(marseilleProvenceTilesDbToDownloadURL, lPathToStore + '/' + "AixSmall_17_19.db", function (entry)
                                               {
                                               log('download complete: ' + entry.fullPath);
                                               
                                               localStorage.isAixSmall_17_19_installed = "true";
                                               
                                               openTilesDb();
                                               
                                               if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                               
                                               removeLoadingAnimation();
                                               
                                               $("#btnAixSmall_17_19").html(commonLabel[currentLang].deleteAixSmall_17_19);
                                               $("#btnAixSmall_17_19").attr("href", "javascript:showLittleModalPopUp('confirmedDeleteAixSmall_17_19')");
                                               
                                                   if (isMapVisible)
                                                   {
                                                        mCurrentMapZoom = map.getZoom();
                                                        mCurrentMapCenter = map.getCenter();
                                                   
                                                        showMap3(mapStatus);
                                                   }
                                               
                                               //*************** skip backup to iCloud ***************
                                               
                                               if (isIOS)
                                                    entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                                               
                                               }, function (error)
                                               {
                                               
                                               if (isLittleModalPopUp)
                                                    showLittleModalPopUp();
                                               
                                               log('error with download', error);
                                               showLittleModalPopUp('downloadFailed');
                                               
                                               removeLoadingAnimation();
                                               }
                             );
                             
                             ftAixSmall_17_19.onprogress = function(progressEvent)
                             {
                                //log(JSON.stringify(progressEvent));
                                var perCent = progressEvent.loaded  * (isAndroid ? 0.5 : 1) / progressEvent.total * 100;
                                $("#progressBar").width(perCent + "%");
                             }
                             
                             });
    
    if (isProd)
    {
        gaTrackPage('AixSmall_17_19_toDownload');
    }
}



function openSpatialDb()
{
    log ("openSpatialDb -> localStorage.isSmallSQLiteForSpatialiteInstalled : " + localStorage.isSmallSQLiteForSpatialiteInstalled);
    
    if (localStorage.isSmallSQLiteForSpatialiteInstalled == "true" && !smallSpatialiteDb)
        smallSpatialiteDb = window.sqlitePlugin.openDatabase({name: smallSpatialDbName.replace(".db", "")});
    
    log ("openSpatialDb -> localStorage.isFullSQLiteForSpatialiteInstalled : " + localStorage.isFullSQLiteForSpatialiteInstalled);
    
    if (localStorage.isFullSQLiteForSpatialiteInstalled == "true" && !fullSpatialiteDb)
        fullSpatialiteDb = window.sqlitePlugin.openDatabase({name: fullSpatialDbName.replace(".db", "")});
}


function openTilesDb()
{
    if (localStorage.isMarseilleProvenceTiles_8_16_installed == "true" && !marseilleProvenceTilesDb)
    {
        marseilleProvenceTilesDb = window.sqlitePlugin.openDatabase({name: MPtilesDb_8_16_name.replace(".db", "")});
        pacaTilesDb = window.sqlitePlugin.openDatabase({name: pacaTilesName.replace(".db", "")});
    }
    
    if (localStorage.isAixSmall_17_19_installed == "true" && !AixSmall_17_19_db)
    {
        AixSmall_17_19_db = window.sqlitePlugin.openDatabase({name: "AixSmall_17_19"});
    }
}


function openTilesRandoDb()
{
    if (localStorage.isFullTilesTracesDownloaded == "true" && !mpTilesRandoDb)
    {
        mpTilesRandoDb = window.sqlitePlugin.openDatabase({name: MPtilesRandoDb_8_15_name.replace(".db", "")});
    }
    
    if (currentTable == "randoMap")
    {
        for (var prop in massifBoundsArray)
        {
            if (massifBoundsArray.hasOwnProperty(prop) && localStorage[prop + "_13_17"] == "true")
            {
                window[prop + "_13_17"] = window.sqlitePlugin.openDatabase({name: prop + "_13_17"});
            }
        }
    }
    else
    {
        //*************************** open db itemDetail ****************************
        
        log("openTilesRandoDb -> localStorage[listItems[currentItemDetail].idRepName + '_13_17'] : " + localStorage[listItems[currentItemDetail].idRepName + '_13_17']);
        
        var lDbName = massifDbArray[listItems[currentItemDetail].mountains] + "_13_17";
        
        if (localStorage[lDbName] == "true")
        {
            mMassif_13_17 = window.sqlitePlugin.openDatabase({name:lDbName});
        }
        else
        if (localStorage[listItems[currentItemDetail].idRepName + '_13_17'] == "true")
        {
            mMassif_13_17 = window.sqlitePlugin.openDatabase({name: listItems[currentItemDetail].idRepName + '_13_17'});
        }
    }
}


function setRightDBAccordingToPosition()
{    
    //******************* SMALL **********************
    
    var _from = false;
    var _to = false;
    
    if (lonFrom > smallBoundBoxMP[0] && lonFrom < smallBoundBoxMP[2] && latFrom > smallBoundBoxMP[1] && latFrom < smallBoundBoxMP[3])
        _from = !_from;
    
    if (lonTo > smallBoundBoxMP[0] && lonTo < smallBoundBoxMP[2] && latTo > smallBoundBoxMP[1] && latTo < smallBoundBoxMP[3])
        _to = !_to;
    
    if (_from && _to)
    {
        log("<<<<<<< setRightDBAccordingToPosition -> smallBoundBoxMP");
        typeBoundingBox = "smallBoundBoxMP";
        launchSpatialiteRequest();
        return;
    }
    
    //******************* FULL **********************
    
    _from = false;
    _to = false;
    
    if (lonFrom > fullBoundBoxMP[0] && lonFrom < fullBoundBoxMP[2] && latFrom > fullBoundBoxMP[1] && latFrom < fullBoundBoxMP[3])
        _from = !_from;
    
    if (lonTo > fullBoundBoxMP[0] && lonTo < fullBoundBoxMP[2] && latTo > fullBoundBoxMP[1] && latTo < fullBoundBoxMP[3])
        _to = !_to;
    
    if (_from && _to)
    {
        log("<<<<<<< setRightDBAccordingToPosition -> fullBoundBoxMP");
        typeBoundingBox = "fullBoundBoxMP";
        launchSpatialiteRequest();
        return;
    }
    
    //******************* NONE **********************
    
    log("<<<<<<< setRightDBAccordingToPosition -> NONE");
    typeBoundingBox = "none";
    launchSpatialiteRequest();
    return;
}


// this one is used in Spatialite -> launchSpatialiteRequest

function querySpatialDbForCloserNode(_type)
{
    
    var lTypeNode = spatialNetWork == "roads_car" ? "roads_nodes" : "walks_nodes";
    
    var query;
    
    switch (_type)
    {
        case "nodeFrom" :
        {query = "select node_id, osm_id, AsText(Geometry), ((X(geometry)-X(loc))*(X(Geometry)-X(loc))) + ((Y(Geometry)-Y(loc))*(Y(Geometry)-Y(loc))) as distance from (select * from " + lTypeNode + " where X(geometry) >= " + (lonFrom - diffLocation) + " AND X(geometry) <= " + (lonFrom + diffLocation) + " AND Y(geometry) <= " + (latFrom + diffLocation) + " AND Y(geometry) >= " + (latFrom - diffLocation) + "), (SELECT MakePoint(" + lonFrom + "," + latFrom + ") as loc)  ORDER BY distance LIMIT 1;";
            log("querySpatialDbForCloserNode | _type : " + _type + " -> lonFrom : " + lonFrom + " / latFrom : " + latFrom);
        }
            break;
            
        case "nodeTo" :
        {
             query = "select node_id, osm_id, AsText(Geometry), ((X(geometry)-X(loc))*(X(Geometry)-X(loc))) + ((Y(Geometry)-Y(loc))*(Y(Geometry)-Y(loc))) as distance from (select * from " + lTypeNode + " where X(geometry) >= " + (lonTo - diffLocation) + " AND X(geometry) <= " + (lonTo + diffLocation) + " AND Y(geometry) <= " + (latTo + diffLocation) + " AND Y(geometry) >= " + (latTo - diffLocation) + "), (SELECT MakePoint(" + lonTo + "," + latTo + ") as loc)  ORDER BY distance LIMIT 1;";
            log("querySpatialDbForCloserNode | _type : " + _type + " -> lonTo : " + lonTo + " / latTo : " + latTo);
        }
            break;
    }
    
    if (isAndroid)
    {
        cordova.exec(function(s)
                     {
                         log('great success : ' + s);
                         
                         var lString = s.replace("[", "");
                         var lArray = lString.split(",");

                         window[_type] = lArray[0];
                         
                         launchSpatialiteRequest();
                     },
                     function(e)
                     {
                        log("querySpatialDbForCloserNode - > ERROR: " + e);
                     },
                     "jSQLitePlugin",
                     'closerNode',
                     [query, lAndroidDbName]
                     );
    }
    else
    {
        dbSpatial.transaction(function(tx)
                          {
                          tx.executeSql(query, [], function(tx, res)
                                        {
                                        log("res.rows.length: " + res.rows.length);
                                        
                                        log("res.rows.item(0): " + JSON.stringify(res.rows.item(0)));
                                        
                                        window[_type] = res.rows.item(0)['node_id'];
                                        
                                        launchSpatialiteRequest();
                                        
                                        }, function(e)
                                        {
                                        log("querySpatialDbForCloserNode - > ERROR: " + e.message);
                                        });
                          });
    }
}



function querySpatialDbForRouting()
{
    log("querySpatialDbForRouting");
    
    var lQuery = "select AsText(Geometry), cost from " + spatialNetWork + " where NodeFrom = " + nodeFrom + " and NodeTo = " + nodeTo + ";"
    
    if (isAndroid)
    {
        cordova.exec(
                     function(s)
                     {
                     log('great success : ' + s);
                     
                     var LINESTRING = s.replace("[LINESTRING(", "").replace(")", "").replace("]", "");
                     
                     var linestringArray = LINESTRING.split(", ");
                     
                     var cost = spatialNetWork == "roads_car" ? parseInt(linestringArray[linestringArray.length - 1])/30 : parseInt(linestringArray[linestringArray.length - 1])/60;
                     
                     log("Cost : " + cost);
                     
                     var lResultArray = [];
                     
                     for (var i = 0; i < linestringArray.length -1; i++)
                     {
                     var coorsArray = linestringArray[i].split(" ");
                     
                     lResultArray.push(coorsArray[1] + "," + coorsArray[0]);
                     }
                     
                     log("lResultArray : " + JSON.stringify(lResultArray));
                     
                     if (!polyline)
                        createPolylineForMap(lResultArray);
                     
                     },
                     function(e)
                     {
                        alert('error' + e)
                     },
                     "jSQLitePlugin",
                     'routing',
                     [lQuery, lAndroidDbName]
                     );
    }
    else
    {
        dbSpatial.transaction(function(tx)
                          {
                          tx.executeSql(lQuery, [], function(tx, res)
                                        {
                                        //log("res.rows.length: " + res.rows.length);
                                        
                                        log("res.rows.item(0): " + JSON.stringify(res.rows.item(0)));
                                        
                                        var Geometry = res.rows.item(0)['AsText(Geometry)'];
                                        
                                        var cost = spatialNetWork == "roads_car" ? parseInt(res.rows.item(0)['Cost'])/30 : parseInt(res.rows.item(0)['Cost']/60);
                                        
                                        log("Cost : " + setDuration(cost));
                                        
                                        var LINESTRING = Geometry.replace("LINESTRING(", "").replace(")", "");
                                        
                                        //log(LINESTRING);
                                        
                                        var lResultArray = [];
                                        
                                        var linestringArray = LINESTRING.split(", ");
                                        
                                        for (var i = 0; i < linestringArray.length -1; i++)
                                        {
                                        var coorsArray = linestringArray[i].split(" ");
                                        
                                        lResultArray.push(coorsArray[1] + "," + coorsArray[0]);
                                        }
                                        
                                        //log("lResultArray : " + JSON.stringify(lResultArray));
                                        
                                        createPolylineForMap(lResultArray);                                     
                                        
                                        /*
                                         var lArray = [];
                                         
                                         for (var i = 0; i < res.rows.length -1; i++)
                                         {
                                         lArray.push(res.rows.item(i));
                                         }
                                         
                                         log(JSON.stringify(lArray));
                                         */
                                        
                                        
                                        }, function(e)
                                        {
                                        log("ERROR: " + e.message);
                                        });
                          });
    }
}


// this one is used in mainScript -> testTimeOutSpatialiteDb

function getCloserNodeFromSpatialDb(_nodeNetwork, _lat, _lon, _var)
{
    var query = "select node_id, ((X(geometry)-X(loc))*(X(Geometry)-X(loc))) + ((Y(Geometry)-Y(loc))*(Y(Geometry)-Y(loc))) as distance from (select * from " + _nodeNetwork + " where X(geometry) >= " + (_lon - diffLocation) + " AND X(geometry) <= " + (_lon + diffLocation) + " AND Y(geometry) <= " + (_lat + diffLocation) + " AND Y(geometry) >= " + (_lat - diffLocation) + "), (SELECT MakePoint(" + _lon + "," + _lat + ") as loc)  ORDER BY distance LIMIT 1;";
    
    log("getCloserNodeFromSpatialDb | var : " + _var + " / _nodeNetwork : " + _nodeNetwork + " -> _lat : " + _lat + " / _lon : " + _lon);
    
    var lUserPosition = userLocation ? userLocation : userChoosePosition;
    
    if (_var == "nodeFrom")
    {
        if (isIOS)
            dbSpatial = getSpatialDbForSingleItem(lUserPosition);
        else
        if (isAndroid)
            lAndroidDbName = getSpatialDbForSingleItem(lUserPosition);
    }
    else
    if (spatialiteToPhp)
    {
        dbSpatial = getSpatialDbForSingleItem(lUserPosition);
    }
    else
    {
        if (isIOS)
            dbSpatial = getSpatialDbForSingleItem(tempBaseActivityItemsList[_var]);
        else
        if (isAndroid)
            lAndroidDbName = getSpatialDbForSingleItem(tempBaseActivityItemsList[_var]);
            
    }
   
    if (isIOS)
        log("getCloserNodeFromSpatialDb -> dbSpatial : " + JSON.stringify(dbSpatial));
    else
    if (isAndroid)
        log("getCloserNodeFromSpatialDb -> lAndroidDbName : " + lAndroidDbName);
        
    
    if (isAndroid)
    {
        cordova.exec(function(s)
                     {
                         log('great success : ' + s);
                         
                         var lString = s.replace("[", "");
                         var lArray = lString.split(",");
                         
                         var lNode = -1;
                         
                         if (s.length > 0)
                            lNode = lArray[0];
                         
                         if (_var == "nodeFrom")
                         {
                            nodeFrom = lNode;
                            log("@@@@ nodeFrom : " + nodeFrom);
                         }
                     },
                     function(e)
                     {
                        log("querySpatialDbForCloserNode - > ERROR: " + e);
                     },
                     "jSQLitePlugin",
                     'closerNode',
                     [query, lAndroidDbName]
                     );
    }
    else
    {
        dbSpatial.transaction(function(tx)
                                 {
                                 tx.executeSql(query, [], function(tx, res)
                                               {
                                               log("res.rows.length: " + res.rows.length + " / _var : " + _var);
                                               
                                               log("res.rows.item(0): " + JSON.stringify(res.rows.item(0)));
  
                                               var lNode = -1;
                                               
                                               if (res.rows.length > 0)
                                                    lNode = res.rows.item(0)['node_id'];
                                               
                                               if (_var == "nodeFrom")
                                               {
                                                    nodeFrom = lNode;
                                                    log("@@@@ nodeFrom : " + nodeFrom);
                                               }
                                               else
                                               {
                                                    var lIdRepName = tempBaseActivityItemsList[_var].idRepName;
                                               
                                                    log("res.rows -> tempBaseActivityItemsList : " + lIdRepName + " / _lat,_lon : " + _lat + "," + _lon);
                                               
                                               //******************* php spatialite **************
                                               
                                                if (spatialiteToPhp)
                                                {
                                                    var suffix = getSuffixForRightDb(tempBaseActivityItemsList[_var]);                           
                                                                                      
                                                    var lTypeNode = _nodeNetwork == "roads_nodes" ? suffix + 'NodeCar' : suffix + 'NodeWalk';
                                               
                                                    tempBaseActivityItemsList[_var][lTypeNode] = lNode;
                                               
                                               
                                                    var lUrl = ipAdress + 'API/setNodesForSpatialDb.php?idRepName=' + lIdRepName + '&node=' + lNode + '&type=' + lTypeNode + '&table=' + tempBaseActivityItemsList[_var].table;
                                               
                                                    log("lUrl : " + lUrl);
                                               
                                                    $.ajax(
                                                      {
                                                      url: lUrl,
                                                      success: 	function(data, textStatus, request)
                                                      {
                                                           log("setNodesForSpatialDb -> ajaxsuccess for " + lIdRepName);
                                                      },
                                                      error:function(xhr, textStatus, errorThrown)
                                                      {
                                                            log("setNodesForSpatialDb -> error");
                                                      }
                                                      });
                                                }
                                               
                                               }
                                               
                                               }, function(e)
                                               {
                                               log("getCloserNodeFromSpatialDb - > ERROR: " + e.message);
                                               });
                                 });
    }
}



function getCloserNodeFromSingleItemToSpatialiteToPhp(_nodeNetwork, _suffix)
{
    var _lat = parseFloat(listItems[currentItemDetail].latitudeRouting);
    var _lon = parseFloat(listItems[currentItemDetail].longitudeRouting);
    
    var query = "select node_id, ((X(geometry)-X(loc))*(X(Geometry)-X(loc))) + ((Y(Geometry)-Y(loc))*(Y(Geometry)-Y(loc))) as distance from (select * from " + _nodeNetwork + " where X(geometry) >= " + (_lon - diffLocation) + " AND X(geometry) <= " + (_lon + diffLocation) + " AND Y(geometry) <= " + (_lat + diffLocation) + " AND Y(geometry) >= " + (_lat - diffLocation) + "), (SELECT MakePoint(" + _lon + "," + _lat + ") as loc)  ORDER BY distance LIMIT 1;";
    
    log("getCloserNodeFromSingleItemToSpatialiteToPhp  -> query : " + query);
    
    log("getCloserNodeFromSingleItemToSpatialiteToPhp 1 | _nodeNetwork : " + _nodeNetwork + " -> _lat : " + _lat + " / _lon : " + _lon);
    
    /*
    var _lUserLocation = {"latitude" : 43.302157, "longitude" : 5.380511};
    var _lUserChoosePosition = {"latitude" : 43.453348, "longitude" : 5.236003};

    var lUserPosition = _userPosition == "userLocation" ? _lUserLocation : _lUserChoosePosition;
*/
    
    dbSpatial = getSpatialDbForSingleItem(listItems[currentItemDetail]);
    
    if (_suffix == "small")
        dbSpatial = smallSpatialiteDb;
    else
        dbSpatial = fullSpatialiteDb;
    
    log("getCloserNodeFromSingleItemToSpatialiteToPhp 2 -> dbSpatial : " + JSON.stringify(dbSpatial));
    
    
        dbSpatial.transaction(function(tx)
                              {
                              tx.executeSql(query, [], function(tx, res)
                                            {
                                            log("res.rows.length: " + res.rows.length);
                                            
                                            log("res.rows.item(0): " + JSON.stringify(res.rows.item(0)));
                                            
                                            var lNode = -1;
                                            
                                            if (res.rows.length > 0)
                                            lNode = res.rows.item(0)['node_id'];
                                            
     
                                            var lIdRepName = listItems[currentItemDetail].idRepName;
                                            
                                            log("res.rows -> idRepName : " + lIdRepName + " / _lat,_lon : " + _lat + "," + _lon);
                                            
                                            var lTypeNode = _nodeNetwork == "roads_nodes" ? _suffix + 'NodeCar' : _suffix + 'NodeWalk';
                                            
                                            var lUrl = ipAdress + 'API/setNodesForSpatialDb.php?idRepName=' + lIdRepName + '&node=' + lNode + '&type=' + lTypeNode + '&table=' + listItems[currentItemDetail].table + "_new";
                                            
                                            log("lUrl : " + lUrl);
                                            
                                            $.ajax(
                                                   {
                                                   url: lUrl,
                                                   success: 	function(data, textStatus, request)
                                                   {
                                                   log("setNodesForSpatialDb -> ajaxsuccess for " + lIdRepName);
                                                   },
                                                   error:function(xhr, textStatus, errorThrown)
                                                   {
                                                   log("setNodesForSpatialDb -> error");
                                                   }
                                                   });
                                             
                                            
                                             
                                            })
                                            
                                            
                              }, function(e)
                                            {
                                            log("getCloserNodeFromSpatialDb - > ERROR: " + e.message);
                              }
                              );

}



function getCostForSpatialDbRouting(_spatialNetWork, _nodeFrom, _nodeTo, _var)
{
    log ("getCostForSpatialDbRouting -> _spatialNetWork : " + _spatialNetWork + " / _nodeFrom : " +  _nodeFrom + " / _nodeTo : " + _nodeTo + " / _var : " + _var);
    
    if (!localStorage.isFullSQLiteForSpatialiteInstalled || localStorage.isFullSQLiteForSpatialiteInstalled == "false")
    {
        dbSpatial = smallSpatialiteDb;
        lAndroidDbName = "MarseilleOSM";
    }
    else
    {
        if (isIOS)
            dbSpatial = getSpatialDbForBothUserAndItem(tempBaseActivityItemsList[_var]);
        else
        if (isAndroid)
            lAndroidDbName = getSpatialDbForBothUserAndItem(tempBaseActivityItemsList[_var]);
    }
    
    //log ("getCostForSpatialDbRouting -> dbSpatial : " + dbSpatial);
    
    var lQuery = "select cost from " + _spatialNetWork + " where NodeFrom = " + _nodeFrom + " and NodeTo = " + _nodeTo + ";"
    
    //log ("getCostForSpatialDbRouting -> lQuery : " + lQuery);
    
    if (isAndroid)
    {
        if (_nodeTo == -1)
        {
            _spatialNetWork == "roads_car" ? tempBaseActivityItemsList[_var]['costCar'] = -1 : tempBaseActivityItemsList[_var]['costWalk'] = -1;
        }
        else
        {
            cordova.exec(function(s)
                     {
                     
                         log('great success getCostForSpatialDbRouting : ' + s);
                         
                         var lCost = s.replace("[", "").replace("]", "");
                         
                         var cost = parseInt(lCost);
                         
                         if (cost == 0)
                            cost = -1;
                         else
                            cost = _spatialNetWork == "roads_car" ? parseInt(lCost/30) : parseInt(lCost/60);
                         
                         _spatialNetWork == "roads_car" ? tempBaseActivityItemsList[_var]['costCar'] = cost : tempBaseActivityItemsList[_var]['costWalk'] = cost;
                     
                     },
                     function(e)
                     {
                     log("querySpatialDbForCloserNode - > ERROR: " + e);
                     },
                     "jSQLitePlugin",
                     'cost',
                     [lQuery, lAndroidDbName]
                     );
        }
    }
    else
    {
        dbSpatial.transaction(function(tx)
                          {
                          tx.executeSql(lQuery, [], function(tx, res)
                                        {
                                        //log("res.rows.length: " + res.rows.length);
                                        
                                        log("@@@@@@@@@@@@ getCostForSpatialDbRouting -> tempBaseActivityItemsList : " + tempBaseActivityItemsList[_var].idRepName);
                                        log("getCostForSpatialDbRouting -> res.rows.item(0): " + JSON.stringify(res.rows.item(0)));
                                        
                                        
                                        var lCost = res.rows.item(0)['Cost'];
                                        
                                        var cost;
                                        
                                        if (lCost != null)
                                            cost = _spatialNetWork == "roads_car" ? parseInt(lCost/30) : parseInt(lCost/60);
                                        else
                                            cost = -1;
                                        
                                        log("Cost : " + setDuration(cost));
                                        
                                        _spatialNetWork == "roads_car" ? tempBaseActivityItemsList[_var]['costCar'] = cost : tempBaseActivityItemsList[_var]['costWalk'] = cost;
                                        
                                        var perCent = (_var + 1) / tempBaseActivityItemsList.length * 100;
                                        $("#progressBar").width(perCent + "%");
                                        
                                        }, function(e)
                                        {
                                        log("ERROR: " + e.message);
                                        });
                          });
    }
}


function getSpatialDbForSingleItem(_item)
{
    //log("getSpatialDbForSingleItem -> fullSpatialiteDb : " + fullSpatialiteDb + " / smallSpatialiteDb " + smallSpatialiteDb);
    
    //log("getSpatialDbForSingleItem -> item : " + JSON.stringify(_item));
    
    //log("getSpatialDbForSingleItem -> _item.latitudeRouting : " + _item.latitudeRouting);
    
    var lLat;
    var lLon;
    
    if (_item.latitudeRouting != undefined && _item.latitudeRouting != null)
    {
        lLat = _item.latitudeRouting;
        lLon = _item.longitudeRouting;
    }
    else
    {
        lLat = _item.latitude;
        lLon = _item.longitude;
    }

    
    if (lLon > smallBoundBoxMP[0] && lLon < smallBoundBoxMP[2] && lLat > smallBoundBoxMP[1] && lLat < smallBoundBoxMP[3])
    {
        if (isIOS)
            return smallSpatialiteDb;
        else
            if (isAndroid)
                return "MarseilleOSM";
    }
    else
    {
        if (isIOS)
            return fullSpatialiteDb;
        if (isAndroid)
            return "MarseilleProvenceOSM";
    }
}




function getSpatialDbForBothUserAndItem(_item)
{
    //log("getSpatialDbForBothUserAndItem -> fullSpatialiteDb : " + fullSpatialiteDb + " / smallSpatialiteDb " + smallSpatialiteDb);
    
    //log("getSpatialDbForBothUserAndItem -> item : " + JSON.stringify(_item));
    
    //log("getSpatialDbForBothUserAndItem -> _item.latitudeRouting : " + _item.latitudeRouting);
    
    var lLat;
    var lLon;
    
    if (_item.latitudeRouting != undefined && _item.latitudeRouting != null)
    {
        lLat = _item.latitudeRouting;
        lLon = _item.longitudeRouting;
    }
    else
    {
        lLat = _item.latitude;
        lLon = _item.longitude;
    }
    
    var lLatUser = userLocation ? userLocation.latitude : userChoosePosition.latitude;
    var lLonUser = userLocation ? userLocation.longitude : userChoosePosition.longitude;
    
    if (lLon > smallBoundBoxMP[0] && lLon < smallBoundBoxMP[2] && lLat > smallBoundBoxMP[1] && lLat < smallBoundBoxMP[3]
        && lLonUser > smallBoundBoxMP[0] && lLonUser < smallBoundBoxMP[2] && lLatUser > smallBoundBoxMP[1] && lLatUser < smallBoundBoxMP[3])
    {
        if (isIOS)
            return smallSpatialiteDb;
        else
        if (isAndroid)
            return "MarseilleOSM";
    }
    else
    {
        if (isIOS)
            return fullSpatialiteDb;
        if (isAndroid)
            return "MarseilleProvenceOSM";
    }
}


function getSuffixForRightDb(_item)
{
    var lLat;
    var lLon;
    
    if (_item.latitudeRouting != undefined && _item.latitudeRouting != null)
    {
        lLat = _item.latitudeRouting;
        lLon = _item.longitudeRouting;
    }
    else
    {
        lLat = _item.latitude;
        lLon = _item.longitude;
    }
    
    var lLatUser = userLocation ? userLocation.latitude : userChoosePosition.latitude;
    var lLonUser = userLocation ? userLocation.longitude : userChoosePosition.longitude;
    
    
    if (lLon > smallBoundBoxMP[0] && lLon < smallBoundBoxMP[2] && lLat > smallBoundBoxMP[1] && lLat < smallBoundBoxMP[3]
        && lLonUser > smallBoundBoxMP[0] && lLonUser < smallBoundBoxMP[2] && lLatUser > smallBoundBoxMP[1] && lLatUser < smallBoundBoxMP[3])
        return 'small';
    else
        return 'full';
}


function getSuffixForSpatialateToPhp(_item)
{
    var lLatUser = userLocation ? userLocation.latitude : userChoosePosition.latitude;
    var lLonUser = userLocation ? userLocation.longitude : userChoosePosition.longitude;
    
    if (lLonUser > smallBoundBoxMP[0] && lLonUser < smallBoundBoxMP[2] && lLatUser > smallBoundBoxMP[1] && lLatUser < smallBoundBoxMP[3])
        return 'small';
    else
        return 'full';
}


function MyTileLayerExtend() {
    
}


var pacaTiles_8_9;
var MarseilleCustom_10_12;
var MarseilleCustom_13;
var MarseilleCustom_14;
var MarseilleCustom_15;
var MarseilleCustom_16;
var MarseilleCustom_17;
var MarseilleCustom_18;
var MarseilleCustom_19;
var AixSmall_10_16;

var mTilesToCopyArray = ["pacaTiles_8_9.db", "MarseilleCustom_10_12.db", "MarseilleCustom_13_15.db", "MarseilleCustom_16.db", "MarseilleCustom_17.db", "MarseilleCustom_18.db", "MarseilleCustom_19.db", "AixSmall_10_16.db"];

/*
 pacaTiles_8_9 = window.sqlitePlugin.openDatabase({name: "pacaTiles_8_9"});
 MarseilleCustom_10_12 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_10_12"});
 MarseilleCustom_13 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_13"});
 MarseilleCustom_14 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_14"});
 MarseilleCustom_15 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_15"});
 MarseilleCustom_16 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_16"});
 MarseilleCustom_17 = window.sqlitePlugin.openDatabase({name: "MarseilleCustom_17"});
 */

/*
 localStorage["pacaTiles_8_9.db"] = true;
 localStorage["MarseilleCustom_10_12"] = true;
 localStorage["MarseilleCustom_13"] = true;
 localStorage["MarseilleCustom_14"] = true;
 localStorage["MarseilleCustom_15"] = true;
 localStorage["MarseilleCustom_16"] = true;
 localStorage["MarseilleCustom_17"] = true;
 */

var mMassif_13_17 = null;

var massifBoundsArray = {
    "calanques" : "5.3284,43.1932,5.5371,43.2481",
    "coteBleue" : "5.013,43.3178,5.3501,43.4064",
    //"coteBleueEst" : "5.1676,43.3173,5.3403,43.3720",
    "sainteBaume" : "5.615,43.2642,5.8388,43.3878",
    //"sainteBaumeOuest" : "5.6113,43.2644,5.7055,43.3798",
    //"etoile" : "5.3682,43.3547,5.5358,43.4296",
    "etoile" : "5.3768,43.3579,5.4932,43.4297",
    //"sainteVictoire" : "5.4948,43.5133,5.7376,43.5561",
    "sainteVictoire" : "5.4858,43.4937,5.7412,43.5756",
    //"garlaban" : "5.4764,43.2995,5.6077,43.3873",
    "garlaban" : "5.492,43.3093,5.6045,43.3712",
    //"capCanaille" : "5.5463,43.1549,5.626,43.2237",
    "capCanaille" : "5.5384,43.1566,5.6275,43.2219",
    "concors" : "5.5574,43.5821,5.7496,43.6897"
};

var calanques_13_17 = null;
var coteBleue_13_17 = null;
var sainteBaume_13_17 = null;
var etoile_13_17 = null;
var sainteVictoire_13_17 = null;
var garlaban_13_17 = null;
var capCanaille_13_17 = null;
var concors_13_17 = null;


var massifDbSizeArray = {
    "calanques" : "25172992",
    "coteBleue" : "56276992",
    //"coteBleueEst" : "16140288",
    "sainteBaume" : "60180480",
    //"sainteBaumeOuest" : "31403008",
    "etoile" : "35120128",
    "sainteVictoire" : "41075712",
    "garlaban" : "33129472",
    "capCanaille" : "12473344",
    "OulesFreissinieres" : "848896",
    "randoRocquefavour" : "1485824",
    "Riolan" : "2477056",
    "Sauze" : "1168384",
    "Trompines" : "851968",
    "Desteou" : "3416064",
    "cuvesDestel" : "616448",
    "citadelleColDesPortes" : "1283072",
    "concors" : "19917824",
};


L.TileLayer.MBTiles = L.TileLayer.extend({
                                         options: {
                                         tms: true
                                         },
                                         myGetTileUrl:function(tilePoint, tile)
                                         {
                                         //log("MBTiles -> var z : " + tilePoint.z + " / var x : " + tilePoint.x + " / var y : " + tilePoint.y);
                                         
                                         // conversion tms -> zxy
                                         //coord.row = Math.pow(2, coord.zoom) - coord.row - 1;
                                         //var lY = Math.pow(2, tilePoint.z) - tilePoint.y - 1;
                                         
                                         var base64Prefix = 'data:image/png;base64,';
                                         
                                         var lQuery2 = "SELECT tile_data FROM images INNER JOIN map ON images.tile_id = map.tile_id WHERE zoom_level = " + tilePoint.z + " AND tile_column = " + tilePoint.x + " AND tile_row = " + tilePoint.y;
                                         
                                         //var lQuery2 = "SELECT tile_data FROM images INNER JOIN map ON images.tile_id = map.tile_id WHERE zoom_level = 8 AND tile_column = 131 AND tile_row = 162";
                                         
                                         //log ("lQuery2 : " + lQuery2);
                                         
                                         var lDb;
                                         
                                         var lat = map.getCenter().lat;
                                         var lon = map.getCenter().lng;
                                         
                                         log("L.TileLayer.MBTiles -> lat : " + lat + " / lon : " + lon);
                                         
                                         if (mapStatus == "IGN")
                                         {
                                            if (currentTable == "randoMap" && map.getZoom() >= 13 && mCurrentMassif && window[mCurrentMassif + "_13_17"])
                                            {
                                                    lDb = window[mCurrentMassif + "_13_17"];
                                            }
                                            else
                                            if (mMassif_13_17)
                                            {
                                                if (map.getZoom() >= 16 || (map.getZoom() >= 13 && localStorage.isFullTilesTracesDownloaded != "true"))
                                                    lDb = mMassif_13_17;
                                                else
                                                if (map.getZoom() < 13 && localStorage.isMarseilleProvenceTiles_8_16_installed == "true")
                                                    lDb = pacaTilesDb;
                                                else
                                                if (map.getZoom() < 10)
                                                    lDb = pacaTiles_8_9;
                                                else
                                                    lDb = mpTilesRandoDb;
                                            }
                                            else
                                             if (map.getZoom() >= 10 && map.getZoom() < 13)
                                             {
                                                if (localStorage.isMarseilleProvenceTiles_8_16_installed == "true")
                                                    lDb = pacaTilesDb;
                                                else
                                                    lDb = mpTilesRandoDb;
                                             }
                                            else
                                            if (map.getZoom() < 10)
                                                lDb = pacaTiles_8_9;
                                            else
                                                lDb = mpTilesRandoDb;
                                         }
                                         else
                                         {
                                            if (lon > boundBoxAixSmall_10_16[0] && lon < boundBoxAixSmall_10_16[2] && lat > boundBoxAixSmall_10_16[1] && lat < boundBoxAixSmall_10_16[3])
                                            {
                                                if (map.getZoom() >= 17 && localStorage.isAixSmall_17_19_installed == "true")
                                                    lDb = AixSmall_17_19_db;
                                                else
                                                    lDb = AixSmall_10_16;
                                            }
                                            else
                                             if (map.getZoom() <= 16 && localStorage.isMarseilleProvenceTiles_8_16_installed == "true")
                                             {
                                                 if (map.getZoom() < 13)
                                                    lDb = pacaTilesDb;
                                                 else
                                                    lDb = marseilleProvenceTilesDb;
                                             }
                                            else
                                             if (map.getZoom() < 10)
                                             {
                                                lDb = pacaTiles_8_9;
                                             }
                                             else
                                             if (map.getZoom() <= 12)
                                             {
                                                lDb = MarseilleCustom_10_12;
                                             }
                                             else
                                             if (map.getZoom() <= 15)
                                             {
                                                lDb = MarseilleCustom_13_15;
                                             }
                                             else
                                             {
                                                lDb = window["MarseilleCustom_" + map.getZoom()];
                                             }

                                         
                                         }
                                         
                                         log("JSON.stringify(lDb3)");
                                         log(JSON.stringify(lDb));
                                         
                                         try {
                                         lDb.transaction(function(tx)
                                                         {
                                                         tx.executeSql(lQuery2, [], function(tx, res)
                                                                       {
                                                                       //log("executeSql success");
                                                                       //log(JSON.stringify(res));
                                                                       
                                                                       if (res.rows.item(0))
                                                                       {
                                                                            //log("res.rows.item(0): " + JSON.stringify(res.rows.item(0).tile_data));
                                                                       
                                                                            tile.src = base64Prefix + res.rows.item(0).tile_data;
                                                                       }
                                                                       else
                                                                       {
                                                                            tile.src = getUrlForTileMissing();
                                                                       }
                                                                       
                                                                       //log("tile.src : " + tile.src);
                                                                       
                                                                       }, function(tx, e)
                                                                       {
                                                                       log("executeSql error");
                                                                       log(JSON.stringify(e));
                                                                       //log("ERROR: " + e.message);
                                                                       });
                                                         });
                                         }
                                         catch(e)
                                         {
                                            log("try transaction: " + e.message);
                                            tile.src = getUrlForTileMissing();
                                         }
                                         },
                                         _loadTile:function(tile,tilePoint)
                                         {
                                         tile._layer = this,
                                         
                                         tile.onload = this._tileOnLoad,
                                         
                                         tile.onerror = this._tileOnError,
                                         
                                         //function() { log('tile.onerror')},
                                         
                                         //t.src = 'file://Assets/tileMissingEmpty.png';
                                         
                                         this._adjustTilePoint(tilePoint),
                                         //t.src=this.getTileUrl(e);
                                         
                                         this.myGetTileUrl(tilePoint, tile);
                                         //log("_loadTile 2 : " + tile.src);
                                         
                                         }
                                         
                                         });



function getUrlForTileMissing()
{
    var lTitle;
    
    if (currentTable == "randoMap")
    {
        if(localStorage.isFullTilesTracesDownloaded == "true")
            lTitle = 'tileMissingEmpty.png';
        else
            lTitle = 'tileMissingIGN.png';
    }
    else
    if (mapStatus == "IGN")
    {
        if((localStorage.isFullTilesTracesDownloaded == "true" || mMassif_13_17)
           && (outMpZoneArray.indexOf(listItems[currentItemDetail].idRepName) == -1 || localStorage[listItems[currentItemDetail].idRepName + "_13_17"] == "true"))
        {
            lTitle = 'tileMissingEmpty.png';
        }
        else
           lTitle = outMpZoneArray.indexOf(listItems[currentItemDetail].idRepName) != -1 ? "tileMissingEmpty.png" : "tileMissingIGN.png";
    }
    else
    {
        if (localStorage.isMarseilleProvenceTiles_8_16_installed != "true")
            lTitle = 'tileMissing.png';
        else
            lTitle = 'tileMissingZoom.png';
    }
    
    //log(" getUrlForTileMissing -> mapStatus : " + mapStatus + " localStorage.isMarseilleProvenceTiles_8_16_installed : " + localStorage.isMarseilleProvenceTiles_8_16_installed + " / marseilleProvenceTilesDb : " + marseilleProvenceTilesDb + " lTitle : " + lTitle);
    
    return 'file:Assets/' + lTitle;
}