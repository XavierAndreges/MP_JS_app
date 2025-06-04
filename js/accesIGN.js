function log()
{
    if (typeof(console) !== "undefined" && console.log !== undefined && !isProd && !isProdWeb)
    {
        try
        {
            console.log.apply(console, arguments);
        }
        catch (e)
        {
            var log = Function.prototype.bind.call(console.log, console);
            log.apply(console, arguments);
        }
    }
}

function scrollTopWebMobile()
{
    $(window).scroll(function()
                     {
                     if (scrollTimer)
                     {
                     clearTimeout(scrollTimer);
                     }
                     
                     scrollTimer = setTimeout(function()
                                              {
                                              if (window.pageYOffset == 0)
                                              {
                                              $("body").animate({scrollTop:1}, 200, 'linear');
                                              }
                                              }
                                              , 1000);
                     
                     });
}


function getYsize()
{
    var ySize;
    
    if (/IE/i.test(navigator.userAgent))
        ySize = document.documentElement.offsetHeight;
    else
        ySize = window.innerHeight;
    
    return ySize;
}


function getXsize()
{
    var xSize;
    
    if (/IE/i.test(navigator.userAgent))
        xSize = document.documentElement.offsetWidth;
    else
        xSize = window.innerWidth;
    
    return xSize;
}

function setLoadingAnimation(_opacity, _arg)
{
    var lHeight;
    var lTop;
    var lBgColor;
    var lTimeOut;
    var lOpacity;
    var lMarginHeight;
    var lElement;
    
    if (_opacity != null)
        lOpacity = _opacity;
    else
        lOpacity = 1;
    
    if (_arg == 'full')
    {
        lHeight = getYsize();
        lTop = 0;
        lBgColor = "#2E2A2A";
        lTimeOut = 100000 * 6 * 5;
        lMarginHeight = (lHeight - 64) / 2;
        lElement = '<img src="Assets/cross.png" width="64" height="64" style="margin-top:' + lMarginHeight + 'px;" onclick="removeLoadingAnimation()" />';
    }
    else
    {
        lHeight = getYsize() - $("#mobileTitle2").outerHeight();
        lTop = $("#mobileTitle2").outerHeight();
        lBgColor = 'rgba(224, 224, 224, ' + lOpacity + ')';
        lTimeOut = 10000;
        lMarginHeight = (lHeight - 16) / 2;
        lElement = '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />';
    }
    
    var _html =
    '<div id="loadingAnimation" style="width:100%; height:' + lHeight + 'px; background-color:' + lBgColor + '; position:absolute; left:0px; top:' + lTop + 'px; z-index:5004; text-align:center;">'+ lElement + '</div>';
    
    $("body").append(_html);
    
    refreshAllTimeOut = setTimeout(removeLoadingAnimation, lTimeOut);
}


function setChargingPageAnimation()
{
    var lHeight = getYsize();
    var lMarginHeight = (lHeight - 16) / 2;
    
    var _html =
    '<div id="loadingAnimation" style="width:100%; height:' + lHeight + 'px; background-color:rgba(0, 0, 0, 1); position:absolute; left:0px; top:0px; z-index:5001; text-align:center;">'+
    '<img src="Assets/loader.gif" width="16" height="16" style="margin-top:' + lMarginHeight + 'px;" />' +
    '</div>';
    
    $("body").append(_html);
}


function removeLoadingAnimation()
{
    if ($("#loadingAnimation"))
        $("#loadingAnimation").remove();
    
    clearTimeout(refreshAllTimeOut);
}


if (/IE/i.test(navigator.userAgent))
{
	window.attachEvent("orientationchange", function()
                       {
                       launchResize();
					   });
}
else
{
	window.addEventListener("orientationchange", function()
                            {
                            launchResize();
							}, false);
}


function launchResize()
{
    setTimeout(function(){
               
               $("#mobileTitle2").css('width', getXsize() + 'px');

               setAndAdjustTitleLabel($("#mobileTitle2Label").html());
               
               var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
               
               if (isMapVisible)
               {
                    $("#mapList").css("height", lHeight + "px");
                    $("#mainContainer").css("height", lHeight + "px");
               }

               
               }, 500);
}


function onBodyLoad()
{
    setLoadingAnimation(0);
    
    //*********************** HEIGHT ***********************
    
    var lHeight = getYsize() - $("#mobileTitle2").outerHeight();
    
    $("#mapList").css("height", lHeight + "px");
    
    $("#mainContainer").css("height", lHeight + "px");
    
    $("#blockMap").css("display", "inline-block");
    $("#showUserPosition").css("display", "inline-block");
    
    //*********************** onDeviceReady ***********************
    
    $( document ).ready(function() {
                        $("body").animate({scrollTop:1}, 500, 'linear', onDeviceReady)
                        });
}


function onDeviceReady()
{
    scrollTopWebMobile();
    
    isApp = false;
    isLikeMobile = true;
    isMobile = true;
    isAppScreen = true;
    
    isMapVisible = true;
    mapStatus = "IGN";
    isIGNmapAPIalreadyLaunched = true;
    
    //*********************** URL ************************
    
    // http://localhost:8888/mp/IGN.html#Randonnee&0
    
    var baseUrlArray = window.location.href.toString().split("#");
    
    var urlArray = baseUrlArray[1].split("&");
    
    log("urlArray -> " + JSON.stringify(urlArray));
    
    currentActivity = urlArray[0];
    currentItemDetail = getIndexInDataList(urlArray[1]);
    
    log("currentActivity : " + currentActivity + " / currentItemDetail : " + currentItemDetail);
    
    listItems = window["listItems" + currentActivity];
    
    setAndAdjustTitleLabel(listItems[currentItemDetail].title_fr);
    
    loadIGN();
}