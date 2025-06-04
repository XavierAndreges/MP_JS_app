function resetPhotoSwipeHome()
{
    if (!mPhotoSwipeHome)
        return;
    
    var photoSwipeInstance = lPhotoSwipe.getInstance($(mPhotoSwipeHome).attr('id'));
    lPhotoSwipe.unsetActivateInstance(photoSwipeInstance);
    lPhotoSwipe.detatch(photoSwipeInstance);
    
    mPhotoSwipeHome = null;
    mDiapoArrayHome = [];
    
    if (!hasBeenResized)
        mIndexPhotoSwipeHome = 0;
    
    $("#bgImage").removeClass("ps-active");
}



function resetPhotoSwipeFull()
{
    var photoSwipeInstance = lPhotoSwipe.getInstance($(mPhotoSwipeFull).attr('id'));
    lPhotoSwipe.unsetActivateInstance(photoSwipeInstance);
    lPhotoSwipe.detatch(photoSwipeInstance);
    
    mPhotoSwipeFull = null;
    mDiapoArrayFull = [];
}


function setHomePicturesSlider(_number)
{
    log("setHomePicturesSlider -> mPhotoSwipeHome : " + mPhotoSwipeHome + " / isNetWorkAvalaible : " + isNetWorkAvalaible + " / _number : " + _number);
    
    if (spatialiteToPhp)
        return;
    
    if (mPhotoSwipeHome != null)
    {
        resetPhotoSwipeHome();
    }
    
    //******************** build array *********************
    
    var lImage;
    var lListItems;
    var lStartUrl = "";
    var lSizeImage;
    
    mCurrentDiapoHome = _number == null ? 0  : _number;
    
    if (isIpad && isNetWorkAvalaible)
        lStartUrl = urlWeb;

    if (currentTable == "Index")
    {
        for (var i = 0; i < 1; i++)
        {
            var lItem = getItemInDataList(mDiapoListAtStart[i]);
            
            var lTitle = tableLabel[currentLang][lItem.table] + " / " + titleForItem(lItem);
            
             if (i == 0)
             {
                 $("#bgImageTitle p").html(lTitle);
             }
            
            var lUrl = urlPictures + "/Index/" + mDiapoListAtStart[i] + ".jpg";
            
            mDiapoArrayHome.push({ url: lUrl, caption: lTitle , itemToLink: lItem.table + "," + lItem.idRepName});
        }
        
        if (isNetWorkAvalaible)
        {
            for (var i = 0; i < mHomeDiapo.length; i++)
            {
                var lItem = getItemInDataList(mHomeDiapo[i]);
                
                var lTitle = tableLabel[currentLang][lItem.table] + " / " + titleForItem(lItem);
                
                var lStartUrl = (isProd || isMobileTest) ? urlWeb : ipAdress;
                
                var lUrl = lStartUrl + urlPictures + "/" + lItem.table + "/" + lItem.idRepName + "/" + getSizeImage()  + "/" + lItem.mainImage;
                
                mDiapoArrayHome.push({ url: lUrl, caption: lTitle , itemToLink: lItem.table + "," + lItem.idRepName});
            }
        }
        
        for (var i = 1; i < mDiapoListAtStart.length; i++)
        {
            var lItem = getItemInDataList(mDiapoListAtStart[i]);
            
            var lTitle = tableLabel[currentLang][lItem.table] + " / " + titleForItem(lItem);

            var lUrl = urlPictures + "/Index/" + mDiapoListAtStart[i] + ".jpg";
            
            mDiapoArrayHome.push({ url: lUrl, caption: lTitle , itemToLink: lItem.table + "," + lItem.idRepName});
        }
    }
    
    //******************** launch *********************
    
    setPhotoSwipeHome (window, lPhotoSwipe, mDiapoArrayHome);
    
    hasBeenResized = false;
}



function setPhotoSwipeHome (window, _photoSwipe, _diapoArray)
{
    var options =
    {
        slideshowDelay : 2500,
        slideSpeed : 1000,
    autoStartSlideshow: true,
    preventHide: true,
    minUserZoom: 1.0,
    captionAndToolbarHide: true,
    enableMouseWheel: false,
    margin: 0,
    imageScaleMethod: "zoom",
    zIndex: '5001',
    target: window.document.querySelectorAll('#bgImage')[0],
    getImageSource: function(obj){return obj.url;},
    getImageCaption: function(obj){return obj.caption;}
    };
    
    mPhotoSwipeHome = _photoSwipe.attach(_diapoArray, options);
    
    mPhotoSwipeHome.addEventHandler(_photoSwipe.EventTypes.onTouch, function(e){
                                    
                                    //log(e);
                                    
                                    if ((e.action == "swipeUp" || e.action == "swipeDown") && !mPhotoSwipeHome.isZoomActive())
                                    {
                                    var lHeight = e.action == "swipeUp" ? 240 : - 200;
                                    $("body").animate({scrollTop:window.pageYOffset + lHeight}, 500, 'easeInCubic', function(){
                                                      bugScrollPositionFixed();
                                                      mPhotoSwipeHome.carousel.show(mIndexPhotoSwipeHome);
                                                      });
                                    }
                                    });
    
    launchPhotoSwipeFullWhenTap(mPhotoSwipeHome, _photoSwipe);
    
    setPopUpPhotoSwipeWhenZoom(mPhotoSwipeHome, _photoSwipe);
    
    mPhotoSwipeHome.addEventHandler(_photoSwipe.EventTypes.onDisplayImage, function(e)
                                    {
                                    mIndexPhotoSwipeHome = e.index;
                                    
                                    if (currentTable == "Index")
                                    {
                                        if (mDiapoArrayHome[mIndexPhotoSwipeHome].itemToLink != "")
                                        {
                                            $("#trianglePlus").fadeIn();
                                            $("#bgImageTitle").fadeIn();
                                    
                                            $("#bgImageTitle p").html(mDiapoArrayHome[mIndexPhotoSwipeHome].caption);
                                    
                                            var mValueArray = mDiapoArrayHome[mIndexPhotoSwipeHome].itemToLink.split(",");
                                    
                                            $("#bgImageTitle").attr("href", "javascript:accessDetailViewFromUrl('" + mValueArray[0] + "', '" + mValueArray[1] + "')");
                                        
                                            $("#trianglePlus").attr("href", "javascript:accessDetailViewFromUrl('" + mValueArray[0] + "', '" + mValueArray[1] + "')");
                                    
                                            if (isProd)
                                            {
                                                gaTrackEvent('HomePage', mValueArray[1], 'diapoHome', 0);
                                            }
                                        }
                                        else
                                        {
                                            $("#trianglePlus").fadeOut();
                                        }
                                    }
                                    
                                    
                                    
                                    
                                    });
    
    mPhotoSwipeHome.show(mIndexPhotoSwipeHome);
    
    log("setPhotoSwipeHome -> mPhotoSwipeHome : " + mPhotoSwipeHome);
};



function setPopUpPhotoSwipeWhenZoom(_instance, _photoswipe)
{
    _instance.addEventHandler(_photoswipe.EventTypes.onBeforeZoomPanRotateShow, function(e)
                              {
                              log('onBeforeZoomPanRotateShow');
                              
                              
                              if (localStorage.isPopUpInfoZoomAlreadySeen)
                              return;
                              
                              
                              clearTimeout(refreshAllTimeOut);
                              refreshAllTimeOut = setTimeout(function()
                                                             {
                                                             
                                                             if (_instance == mPhotoSwipe || _instance == mPhotoSwipeMap)
                                                             showLittleModalPopUp("photoSwipeInfoZoom", commonLabel[currentLang].infoZoomPhotoSwipe);
                                                             else
                                                             alert(commonLabel[currentLang].infoZoomPhotoSwipe);
                                                             
                                                             localStorage.isPopUpInfoZoomAlreadySeen = "true";
                                                             
                                                             }, 2000);
                              
                              });
}


function launchPhotoSwipeFullWhenTap (_instance, _photoswipe)
{
    _instance.addEventHandler(_photoswipe.EventTypes.onTouch, function(e){
                              
                              //log('onTouch - e.action = ' + e.action);
                              
                              if (homeStatus == "Home")
                                mIndexPhotoSwipeFull = mIndexPhotoSwipeHome;
                              else
                                mIndexPhotoSwipeFull = mIndexPhotoSwipe;
                              
                              if (e.action == "tap")
                              setDetailsPicturesSliderFull();
                              
                              });
}


function getIndexImageForPhotoSwipeHome(_instance, _photoswipe)
{
    _instance.addEventHandler(_photoswipe.EventTypes.onDisplayImage, function(e){
                              mIndexPhotoSwipe = e.index;
                              });
}

function getIndexImageForPhotoSwipeFull(_instance, _photoswipe)
{
    _instance.addEventHandler(_photoswipe.EventTypes.onDisplayImage, function(e){
                              mIndexPhotoSwipeFull = e.index;
                              });
}


function setDetailsPicturesSlider(_index)
{
    mIndexPhotoSwipe = _index;
    
    if (mPhotoSwipe != null)
    {
        var photoSwipeInstance = lPhotoSwipe.getInstance($(mPhotoSwipe).attr('id'));
        lPhotoSwipe.unsetActivateInstance(photoSwipeInstance);
        lPhotoSwipe.detatch(photoSwipeInstance);
        
        mPhotoSwipe = null;
        mDiapoArray = [];
    }
    
    mDiapoArray = setArrayForPhotoSwipe(listItems[currentItemDetail], 'mediumSizeImage');
    
    setPhotoSwipeDetail (window, lPhotoSwipe, mDiapoArray);
    
    hasBeenResized = false;
}



function setPhotoSwipeDetail (window, PhotoSwipe, _diapoArray)
{
    var options =
    {
    preventHide: true,
    minUserZoom: 1.0,
    captionAndToolbarHide: true,
    enableMouseWheel: false,
    margin: 0,
    imageScaleMethod: "zoom",
    zIndex: '5001',
    target: window.document.querySelectorAll('#mainVisual')[0],
    getImageSource: function(obj){return obj.url;},
    getImageCaption: function(obj){return obj.caption;}
    };
    
    mPhotoSwipe = PhotoSwipe.attach(_diapoArray, options);
    
    
    mPhotoSwipe.addEventHandler(PhotoSwipe.EventTypes.onTouch, function(e){
                                
                                //log(e);
                                
                                if ((e.action == "swipeUp" || e.action == "swipeDown") && !mPhotoSwipe.isZoomActive())
                                {
                                var lHeight = e.action == "swipeUp" ? 240 : - 200;
                                $("body").animate({scrollTop:window.pageYOffset + lHeight}, 500, 'easeInCubic', function(){
                                                  bugScrollPositionFixed();
                                                  mPhotoSwipe.carousel.show(mIndexPhotoSwipe);
                                                  });
                                }
                                });
    
    launchPhotoSwipeFullWhenTap(mPhotoSwipe, PhotoSwipe);
    
    setPopUpPhotoSwipeWhenZoom(mPhotoSwipe, PhotoSwipe);
    
    getIndexImageForPhotoSwipeHome(mPhotoSwipe, PhotoSwipe);
    
    mPhotoSwipe.show(mIndexPhotoSwipe);
};


function setArrayForPhotoSwipe(_item)
{
    log ("setArrayForPhotoSwipe -> isNetWorkAvalaible : " + isNetWorkAvalaible);
    
    var lArray = [];
    
    var lUrlWeb = (isProd || isMobileTest) ? urlWeb : "";
    
    var lImageUrl = lUrlWeb + urlPictures + "/" + _item['table'] + "/" + _item.idRepName + "/" + getSizeImage() + "/";
    
    /*
    var lNbImageDiapo = _item.table == "SitesEscalade" ? 2 : mNbImageDiapo;
    
    var limitNbImage = (isNetWorkAvalaible || isMobileWeb) ? _item.tabDiapo.length : lNbImageDiapo;
    
    if ((!isNetWorkAvalaible || isApp) && lNbImageDiapo > _item.tabDiapo.length)
        limitNbImage = _item.tabDiapo.length;
    
    for (var i = 0; i < limitNbImage; i++)
    {
        if ((isIpad && isNetWorkAvalaible) || _item.isUpdate)
            lUrl = lUrlWeb;
        else
            if (i >= lNbImageDiapo)
                lUrl = isApp ? lUrlWeb : '';
        
        //log("setDetailsPicturesSliderFull -> url : " + lUrl + lImageUrl + _item.tabDiapo[i]);
        
        lArray.push({ url: lUrl + lImageUrl + _item.tabDiapo[i], caption: ''});
    }
    */
    
    for (var i = 0; i < _item.tabDiapo.length; i++)
    {
        lArray.push({ url: lImageUrl + _item.tabDiapo[i], caption: ''});
    }
    
    return lArray;
}


function setPhotoSwipeDiapoFull (window, PhotoSwipe, _diapoArray)
{
    var lScaleImage = isMobile ? "zoom" : "fitNoUpscale";
    
    var options =
    {
        captionAndToolbarAutoHideDelay : homeStatus == "Home" ? 5000 : 5000,
        autoStartSlideshow : true,
        preventHide: false,
        minUserZoom: 1.0,
        captionAndToolbarHide: false,
        enableMouseWheel: true,
        margin: 0,
        imageScaleMethod: "fit",
        fadeOutSpeed : 500,
        zIndex: '5005',
        getImageSource: function(obj){return obj.url;},
        getImageCaption: function(obj){return obj.caption;}
    };
    
    mPhotoSwipeFull = PhotoSwipe.attach(_diapoArray, options);
    
    mPhotoSwipeFull.addEventHandler(PhotoSwipe.EventTypes.onHide, function(e)
                                {
                                    log('onHide');
                                    
                                    if (hasBeenResized)
                                    {
                                        if (homeStatus == "Detail")
                                        {
                                            setAndAdjustTitleLabel($("#mobileTitle2Label").html());
                                            setSizeToBlockTextAtList();
                                            setDetailsPicturesSlider(mIndexPhotoSwipeFull);
                                        }
                                    }
                                    
                                    if (homeStatus == "Home")
                                    {
                                        mPhotoSwipeHome.carousel.show(mIndexPhotoSwipeFull);
                                    }
                                    else
                                    if (homeStatus == "Detail")
                                    {
                                        if (mPhotoSwipe)
                                            mPhotoSwipe.carousel.show(mIndexPhotoSwipeFull);
                                    }
                                    
                                    if (isAndroid && isIpad)
                                        setTimeout(function(){isHackToPreventClickFromCloseBtnPhotoSwipe = false}, 1000);
                                    
                                    $("body").animate({scrollTop:currentYoffset}, 200, 'linear');
                                    
                                });
    
    getIndexImageForPhotoSwipeFull(mPhotoSwipeFull, PhotoSwipe);
    
    setPopUpPhotoSwipeWhenZoom(mPhotoSwipeFull, PhotoSwipe);
    
    mPhotoSwipeFull.show(mIndexPhotoSwipeFull);
    
    if (isAndroid && isIpad)
        isHackToPreventClickFromCloseBtnPhotoSwipe = true;
};







function setDetailsPicturesSliderFull(arg)
{
    if (menuIsOpened)
        return;
    
    currentYoffset = window.pageYOffset;
    
    $("body").animate({scrollTop:0}, 200, 'linear', function(){
                      
                      if (mPhotoSwipeFull != null)
                        resetPhotoSwipeFull();

                      if (homeStatus == "Home")
                      {
                          mDiapoArrayFull = mDiapoArrayHome;
                      }
                      else
                      {
                          var lItem;
                          
                          if (arg == null)
                            lItem = listItems[currentItemDetail];
                          else
                            lItem = tempSelectedItem;
                          
                          mDiapoArrayFull = setArrayForPhotoSwipe(lItem);
                      }
                      
                      setPhotoSwipeDiapoFull(window, lPhotoSwipe, mDiapoArrayFull);
                      
                      });
    
    
    if (isProd || isProdWeb)
    {
        gaTrackPage('setDetailsPicturesSliderFull');
        
        var lAction;
        
        if (homeStatus == "Home")
        {
            lAction = "Home"
        }
        else
        {
            if (arg == null)
                lAction = listItems[currentItemDetail].idRepName;
            else
                lAction = tempSelectedItem.idRepName
                }
        
        gaTrackEvent('setDetailsPicturesSliderFull', lAction, 'homeStatus : ' + homeStatus + ' / isMapVisible : ' + isMapVisible, 0);
    }
}




