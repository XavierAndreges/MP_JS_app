var ftPicture = null;


function getSizeImage()
{
    var lSizeImage;

    if (getXsize() >= 1000)
        lSizeImage = 1200;
    else
    if (getXsize() >= 700)
        lSizeImage = 800;
    else
    if (getXsize() >= 480)
        lSizeImage = 480;
    else
    if (getXsize() >= 320)
        lSizeImage = 320;
    else
        lSizeImage = 160;

    
    return lSizeImage;
}


function isPictureInLocalStorage(_item)
{
    if (localStorage[_item.idRepName + "Image"] && localStorage[_item.idRepName + "Image"] != "false")
        return true;
    else
        return false;
    
    //if (!localStorage[listItems[i].idRepName + "Image"] || localStorage[listItems[i].idRepName + "Image"] == "false")
}


function downloadAllPicture()
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
    
    showLittleModalPopUp("progressBar", commonLabel[currentLang].downloadAllPictures, "ftPicture");
    
    //*********************************************************/
    
    setTimeout(function(){
    
               setFolderMetadata(LocalFileSystem.PERSISTENT, "myPictures", "com.apple.MobileBackup", 1);
               
               if (!ftPicture)
                    ftPicture = new FileTransfer();
               
               log("downloadAllPicture -> ftPicture : " + JSON.stringify(ftPicture));
    
               window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem)
                    {
                        log('file system retrieved for downloadAllPicture');
                                        
                        downloadNextImage(fileSystem, 0);
                    });
    }, 500);
}


function downloadNextImage(fileSystem, _i)
{
    var i = _i;
    
    var lList = mListFullConcat;
    
    if (i < lList.length)
    {
        if (localStorage[lList[i].idRepName + "Image"] == "ok")
        {
            downloadNextImage(fileSystem, ++i);
            return;
        }
    }
    else
    {
        $("#nbOffLineImages").html(parseInt(localStorage["nbOffLineImages"]));
        showLittleModalPopUp();
        removeLoadingAnimation();
        
        return;
    }
               
    var lURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + urlPictures + "/" + lList[i].table + "/" + lList[i].idRepName + "/480/" + lList[i].mainImage;
               
    log('>>>>>> downloadPicture -> lURL : ' + lURL);
               
    var lPathToStore = isAndroid ? fileSystem.root.fullPath :  fileSystem.root.nativeURL;
    
    lPathToStore += '/myPictures/' + lList[i].idRepName + '.jpg';
    
    ftPicture.download(lURL, lPathToStore, function (entry)
    {
            localStorage["nbOffLineImages"] = parseInt(localStorage["nbOffLineImages"]) + 1;
                       
            //log("downloadAllPicture -> localStorage[nbOffLineImages] : " + localStorage["nbOffLineImages"]);
                       
            var perCent = parseInt(localStorage["nbOffLineImages"]) / lList.length * 100;
            $("#progressBar").width(perCent + "%");
                       
            log('download complete : ' + entry.fullPath);
                       
            localStorage[lList[i].idRepName + "Image"] = "ok";
                           
            //*************** skip backup to iCloud ***************
                           
            if (isIOS)
                entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                       
            //*************** next picture ***************
                       
            if (++i < lList.length)
                downloadNextImage(fileSystem, i);
            else
            {
                $("#nbOffLineImages").html(parseInt(localStorage["nbOffLineImages"]));
                showLittleModalPopUp();
                removeLoadingAnimation();
            }
                           
    }, function (error)
    {
                           
            log('error with download', error);
            showLittleModalPopUp('downloadFailed');
    });
}



function removeAllPictures()
{
    if (isLittleModalPopUp)
        showLittleModalPopUp();
    
    var lList = getFullConcatListItems();
    
    for (var t = 0; t < lList.length; t++)
    {
        localStorage[lList[t].idRepName + "Image"] = "false";
    }
    
    localStorage["nbOffLineImages"] = 0;
    
    $("#nbOffLineImages").html(0);
    
    removeFolder("myPictures");
}


function List_List_List_List_List_List_List_List_List_List_List_List_List_List_List_List(){}


function setFilePictureForList()
{
    log ("setFilePictureForList");
    
    function readDataUrlForList(file)
    {
        //log ("readDataUrl -> file : " + JSON.stringify(file));
        
        var reader = new FileReader();
        
        reader.onloadend = function(evt)
        {
            //log("evt.target.result : " + JSON.stringify(evt.target.result));
            
            $("#mainVisualList" + file.name.replace(".jpg", "")).css("background-image", "url('" + evt.target.result + "')");
        };
        
        reader.readAsDataURL(file);
    }
    
    
    function gotFileEntryForList(fileEntry)
    {
        //log ("gotFileEntryForListItems -> fileEntry : " + JSON.stringify(fileEntry));
        
        fileEntry.file(readDataUrlForList, fail);
    }
    
    
    var getFilePictureForList = function (fileSystem, _idRepName)
    {
        var lPathToStore = isAndroid ? fileSystem.root.fullPath : "";
        
        lPathToStore += '/myPictures/' + _idRepName + '.jpg';
        
        //log ("getFilePictureForList -> lPathToStore : " + lPathToStore);
        //log ("getFilePictureForList -> fileSystem : " + JSON.stringify(fileSystem.root));
        
        if (isIOS)
            fileSystem.root.getFile(lPathToStore, null, gotFileEntryForList, fail);
        else
            window.resolveLocalFileSystemURI(lPathToStore, gotFileEntryForList, fail);
        
    }
    
    
    var downloadPictureForList = function (fileSystem, _item)
    {
        var lURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + urlPictures + "/" + _item.table + "/" + _item.idRepName + "/480/" + _item.mainImage;
        
        log('>>>>>> downloadPictureForList -> lURL : ' + lURL);
        
        setFolderMetadata(LocalFileSystem.PERSISTENT, "myPictures", "com.apple.MobileBackup", 1);
        
        if (!ftPicture)
            ftPicture = new FileTransfer();
        
        var lPathToStore = isAndroid ? fileSystem.root.fullPath :  fileSystem.root.nativeURL;
        
        lPathToStore += '/myPictures/' + _item.idRepName + '.jpg';
        
        ftPicture.download(lURL, lPathToStore, function (entry)
                           {
                           localStorage["nbOffLineImages"] = parseInt(localStorage["nbOffLineImages"]) + 1;
                           
                           log("downloadPictureForList -> localStorage[nbOffLineImages] : " + localStorage["nbOffLineImages"]);
                           
                           localStorage[_item.idRepName + "Image"] = "ok";
                           
                           getFilePictureForList(fileSystem, _item.idRepName);
                           
                           log('download complete: ' + entry.fullPath);
                           
                           //*************** skip backup to iCloud ***************
                           
                           if (isIOS)
                           entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                           
                           }, function (error)
                           {
                           log('error with download', error);
                           });
        
    }
    
    log("@@@@@@ setFilePictureForList -> lastIndexItemList : " + lastIndexItemList + " / indexItemList : " + indexItemList);
    
    var onTestFile = function(fileSystem)
    {
        //log("downloadPictureForList onTestFile-> fileSystem.root : " + JSON.stringify(fileSystem.root));
        
        for (var i = lastIndexItemList; i < indexItemList; i++)
        {
            if (!isPictureInLocalStorage(listItems[i]))
                downloadPictureForList(fileSystem, listItems[i]);
            else
                getFilePictureForList(fileSystem, listItems[i].idRepName);
        }
    }
    
    
    if (currentActivity == "BestViews" && isNetWorkAvalaible)
    {
        for (var i = lastIndexItemList; i < indexItemList; i++)
        {
            setBackgroundPictures(listItems[i], "mainVisualList" + listItems[i].idRepName);
        }
    }
    else
    if (!isMobileWeb && (isApp || !isNetWorkAvalaible))
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onTestFile, fail);
    }
    else
    {
        for (var i = lastIndexItemList; i < indexItemList; i++)
        {
            setBackgroundPictures(listItems[i], "mainVisualList" + listItems[i].idRepName);
        }
    }
}


function _detail_detail_detail_detail_detail_map_map_map_map_map_map_map_(){}


function setFileForOnePictureForUnicId(_item, _id)
{
    log ("setFileForOnePictureForUnicId -> _item : " + _item.idRepName + " / _id : " + _id);
    
    function readDataUrlForMapItem(file)
    {
        log ("readDataUrl -> file : " + JSON.stringify(file));
        
        var reader = new FileReader();
        
        reader.onloadend = function(evt)
        {
            //log("evt.target.result : " + JSON.stringify(evt.target.result));
            
            $("#" + _id).css("background-image", "url('" + evt.target.result + "')");
        };
        
        reader.readAsDataURL(file);
    }
    
    
    function gotFileEntryForMapItem(fileEntry)
    {
        log ("gotFileEntryForListItems -> fileEntry : " + JSON.stringify(fileEntry));
        
        fileEntry.file(readDataUrlForMapItem, fail);
    }
 
    
    var getFilePictureForMapItem = function (fileSystem, _idRepName)
    {
        var lPathToStore = isAndroid ? fileSystem.root.fullPath : "";
        
        lPathToStore += '/myPictures/' + _idRepName + '.jpg';
        
        log ("getFilePictureForList -> lPathToStore : " + lPathToStore);
        log ("getFilePictureForList -> fileSystem : " + JSON.stringify(fileSystem.root));
        
        if (isIOS)
            fileSystem.root.getFile(lPathToStore, null, gotFileEntryForMapItem, fail);
        else
            window.resolveLocalFileSystemURI(lPathToStore, gotFileEntryForMapItem, fail);
        
    }
    
    
    var downloadPictureForMapItem = function (fileSystem, _item)
    {
        var lURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + urlPictures + "/" + _item.table + "/" + _item.idRepName + "/480/" + _item.mainImage;
        
        log('>>>>>> downloadPictureForMapItem -> lURL : ' + lURL);
        
        setFolderMetadata(LocalFileSystem.PERSISTENT, "myPictures", "com.apple.MobileBackup", 1);
        
        if (!ftPicture)
            ftPicture = new FileTransfer();
        
        var lPathToStore = isAndroid ? fileSystem.root.fullPath :  fileSystem.root.nativeURL;
        
        lPathToStore += '/myPictures/' + _item.idRepName + '.jpg';
        
        ftPicture.download(lURL, lPathToStore, function (entry)
                           {
                           localStorage["nbOffLineImages"] = parseInt(localStorage["nbOffLineImages"]) + 1;
                           
                           log("downloadPictureForList -> localStorage[nbOffLineImages] : " + localStorage["nbOffLineImages"]);
                           
                           localStorage[_item.idRepName + "Image"] = "ok";
                           
                           getFilePictureForMapItem(fileSystem, _item.idRepName);
                           
                           log('download complete: ' + entry.fullPath);
                           
                           //*************** skip backup to iCloud ***************
                           
                           if (isIOS)
                           entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                           
                           }, function (error)
                           {
                           log('error with download', error);
                           //showLittleModalPopUp('downloadFailed');
                           });
        
    }

    
    var onTestFile = function(fileSystem)
    {
        if (!isPictureInLocalStorage(_item))
            downloadPictureForMapItem(fileSystem, _item);
        else
            getFilePictureForMapItem(fileSystem, _item.idRepName);
    }
    
    if(isNetWorkAvalaible && isCircuitsSwiperVisible && _id == "popUpCell")
        setBackgroundPictures(_item, _id);
    else
    if (!isMobileWeb && (isApp || !isNetWorkAvalaible))
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onTestFile, fail);
    else
        setBackgroundPictures(_item, _id);
}



function setFilePictureForMapSwiper()
{
    log ("setFilePictureForMapSwiper");
    
    function readDataUrlForMapItem(file)
    {
        //log ("readDataUrl -> file : " + JSON.stringify(file));
        
        var reader = new FileReader();
        
        reader.onloadend = function(evt)
        {
            //log("evt.target.result : " + JSON.stringify(evt.target.result));
            
            $("#swiperMap" + file.name.replace(".jpg", "")).css("background-image", "url('" + evt.target.result + "')");
        };
        
        reader.readAsDataURL(file);
    }
    
    
    function gotFileEntryForMapItem(fileEntry)
    {
        //log ("gotFileEntryForListItems -> fileEntry : " + JSON.stringify(fileEntry));
        
        fileEntry.file(readDataUrlForMapItem, fail);
    }
    
    
    var getFilePictureForMapItem = function (fileSystem, _idRepName)
    {
        var lPathToStore = isAndroid ? fileSystem.root.fullPath : "";
        
        lPathToStore += '/myPictures/' + _idRepName + '.jpg';
        
        //log ("getFilePictureForList -> lPathToStore : " + lPathToStore);
        //log ("getFilePictureForList -> fileSystem : " + JSON.stringify(fileSystem.root));
        
        if (isIOS)
            fileSystem.root.getFile(lPathToStore, null, gotFileEntryForMapItem, fail);
        else
            window.resolveLocalFileSystemURI(lPathToStore, gotFileEntryForMapItem, fail);
        
    }
    
    
    var downloadPictureForMapItem = function (fileSystem, _item)
    {
        var lURL = ((isProd || isMobileTest) ? urlWeb : ipAdress) + urlPictures + "/" + _item.table + "/" + _item.idRepName + "/480/" + _item.mainImage;
        
        log('>>>>>> downloadPictureForMapItem -> lURL : ' + lURL);
        
        setFolderMetadata(LocalFileSystem.PERSISTENT, "myPictures", "com.apple.MobileBackup", 1);
        
        if (!ftPicture)
            ftPicture = new FileTransfer();
        
        var lPathToStore = isAndroid ? fileSystem.root.fullPath :  fileSystem.root.nativeURL;
        
        lPathToStore += '/myPictures/' + _item.idRepName + '.jpg';
        
        ftPicture.download(lURL, lPathToStore, function (entry)
                           {
                           localStorage["nbOffLineImages"] = parseInt(localStorage["nbOffLineImages"]) + 1;
                           
                           log("downloadPictureForList -> localStorage[nbOffLineImages] : " + localStorage["nbOffLineImages"]);
                           
                           localStorage[_item.idRepName + "Image"] = "ok";
                           
                           getFilePictureForMapItem(fileSystem, _item.idRepName);
                           
                           log('download complete: ' + entry.fullPath);
                           
                           //*************** skip backup to iCloud ***************
                           
                           if (isIOS)
                           entry.setMetadata(successMetadata, failMetadata, { "com.apple.MobileBackup": 1});
                           
                           }, function (error)
                           {
                           log('error with download', error);
                           //showLittleModalPopUp('downloadFailed');
                           });
        
    }
    
    
    var onTestFile = function(fileSystem)
    {
        for (var i = 0; i < mCircuitsArray.length; i++)
        {
            if (!isPictureInLocalStorage(mCircuitsArray[i]))
                downloadPictureForMapItem(fileSystem, mCircuitsArray[i]);
            else
                getFilePictureForMapItem(fileSystem, mCircuitsArray[i].idRepName);
        }
    }
    
    if (!isMobileWeb && (isApp || !isNetWorkAvalaible))
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onTestFile, fail);
    }
    else
    {
        for (var i = 0; i < mCircuitsArray.length; i++)
        {
            setBackgroundPictures(mCircuitsArray[i], "swiperMap" + mCircuitsArray[i].idRepName);
        }
    }
}



function setBackgroundPictures(lItem, _id)
{
    var lStartUrl = "";
    
    if (isProd || isMobileTest)
        lStartUrl = urlWeb;
    
    var lImage = (isCircuitsSwiperVisible && _id == "popUpCell") ? lItem.tabDiapo[1] : lItem.mainImage;
    
    var lUrlImage;
    
    if (currentActivity == "BestViews")
    {
        var lIndex = getIndexInDataList(lItem.idRepName);
        
        lUrlImage = lStartUrl + urlPictures + "/" + lItem.table + "/" + lItem.idRepName + "/" + getSizeImage()  + "/" + bestViewsArray[lIndex].split(", ")[1];
    }
    else
    {
        lUrlImage = lStartUrl + urlPictures + "/" + lItem.table + "/" + lItem.idRepName + "/" + getSizeImage()  + "/" + lImage;
    }
    
    
    var lDuration = isMapVisible ? 100 : 0;
    
    setTimeout(function(){
               $("#" + _id).css("background-image", "url(" + lUrlImage + ")");
               //log("setBackgroundPictures -> lItem : " + lItem.idRepName + " / _id : " + _id + " / lUrlImage : " + lUrlImage);
        }, lDuration);
    
    
}



function fail(error)
{
    log("FS fail : " + error.code);
}



function setFolderMetadata(localFileSystem, subFolder, metadataKey, metadataValue)
{
    var onSetMetadataWin = function() {
        console.log("success setting metadata")
    }
    
    var onSetMetadataFail = function() {
        console.log("error setting metadata")
    }
    
    var onGetDirectoryWin = function(parent) {
        
        if (!isIOS)
            return;
        
        var data = {};
        data[metadataKey] = metadataValue;
        parent.setMetadata(successMetadata, failMetadata, data);
    }
    
    var onGetDirectoryFail = function() {
        console.log("error getting dir")
    }
    
    var onFSWin = function(fileSystem) {
        
        //log("setFolderMetadata -> fileSystem.root : " + JSON.stringify(fileSystem.root));
        
        fileSystem.root.getDirectory(subFolder, {create: true, exclusive: false}, onGetDirectoryWin, onGetDirectoryFail);
    }
    
    var onFSFail = function(error) {
        console.log(error.code);
    }
    
    window.requestFileSystem(localFileSystem, 0, onFSWin, onFSFail);
}


function removeFolder(subFolder)
{
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    
    function fail(evt) {
        log("removeFolder -> FILE SYSTEM FAILURE" + evt.target.error.code);
    }
    
    function onFileSystemSuccess(fileSystem)
    {
        fileSystem.root.getDirectory(
                                     subFolder,
                                     {create : true, exclusive : false},
                                     function(entry) {
                                     entry.removeRecursively(function() {
                                                             log("removeFolder -> Remove Recursively Succeeded for : " + subFolder);
                                                             }, fail);
                                     }, fail);
    }
}