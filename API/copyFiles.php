<?php
    
    //$destination_V1_4 = '/Applications/MAMP/htdocs/MarseilleProvence/platforms/ios/www/';
    
    $destination = '/Users/xavier/Documents/MarseilleProvenceApp/platforms/ios/www/';
    
    //$destination = '/Applications/MAMP/htdocs/MarseilleProvence/platforms/android/assets/www/';
    
    //$destination = '/Applications/MAMP/htdocs/PlayMobile/platforms/android/assets/www/';
    
    $version = "2";
    
    //*********************** HTML ***************************
    
    $originHTML = "/Applications/MAMP/htdocs/mp";
    
    $destinationHTML = $destination;
    
    //var_dump($files);
    
    $htmlFileArray=  array("index.html", "LocationVelo.html", "AgencesReceptives.html", "Campings.html", "Guides.html", "MoniteursEscalade.html", "OfficesTourisme.html", "Contact.html", "MetroTram.html", "Parkings.html", "Massifs.html", "routingMap.html", "randoMap.html");
    
    
    $oldCordova = '<!--<script type="text/javascript" src="js/cordova.js"></script><script type="text/javascript" src="js/GAPlugin.js"></script>-->';
    
    $newCordova = '<script type="text/javascript" src="cordova.js"></script><script type="text/javascript" src="js/GAPlugin.js"></script>';
    
    foreach ($htmlFileArray as $html)
    {
        copy($originHTML.'/'.$html, $destinationHTML.'/'.$html);
        
        $str = file_get_contents($destinationHTML.'/'.$html);
        $str = str_replace($oldCordova, $newCordova, $str);
        file_put_contents($destinationHTML.'/'.$html, $str);
    }
    
    //*************** changeScriptVersionToApp *******************
    
    
    $oldJS = '<script type="text/javascript" src="js/myScript/var.js"></script><script type="text/javascript" src="js/myScript/model.js"></script><script type="text/javascript" src="js/myScript/popUp.js"></script><script type="text/javascript" src="js/myScript/mainScript.js"></script><script type="text/javascript" src="js/myScript/ImageManager.js"></script><script type="text/javascript" src="js/myScript/photoSwipe.js"></script><script type="text/javascript" src="js/myScript/localisable.js"></script><script type="text/javascript" src="js/myScript/language.js"></script><script type="text/javascript" src="js/myScript/distance.js"></script><script type="text/javascript" src="js/myScript/menu.js"></script><script type="text/javascript" src="js/myScript/transitions.js"></script><script type="text/javascript" src="js/myScript/trier.js"></script><script type="text/javascript" src="js/myScript/itemList.js"></script><script type="text/javascript" src="js/myScript/itemDetail.js"></script><script type="text/javascript" src="js/myScript/mapItems.js"></script><script type="text/javascript" src="js/myScript/mapIGN.js"></script><script type="text/javascript" src="js/myScript/SliderReduceScreen.js"></script><script type="text/javascript" src="js/myScript/SliderMediumScreen.js"></script><script type="text/javascript" src="js/myScript/sliderFullScreen.js"></script><script type="text/javascript" src="js/myScript/HtmlSliderReduceScreen.js"></script><script type="text/javascript" src="js/myScript/spatialite.js"></script><script type="text/javascript" src="js/myScript/dataMP13.js"></script><script src="js/myScript/randoGeoJSON.js"></script><script src="js/myScript/canyonsGeoJSON.js"></script><script src="js/myScript/escaladeGeoJSON.js"></script><script type="text/javascript" src="js/myScript/dataCDT.js"></script><script type="text/javascript" src="js/myScript/dataMPM.js"></script>';
    
    $newJS = '<script type="text/javascript" src="js/mini/localisable_v'.$version.'.js"></script><script type="text/javascript" src="js/mini/script_v'.$version.'.js"></script>';
    
    
    //*************** html *******************
    
    foreach ($htmlFileArray as $html)
    {
        $str = file_get_contents($destination.'/'.$html);
        $str = str_replace($oldJS, $newJS, $str);
        file_put_contents($destination.'/'.$html, $str);
    }
    
    //*********************** JS ***************************
    
    $originJS = "/Applications/MAMP/htdocs/mp/js/myScript/";
    
    $destinationJS = $destination;
    
    //var_dump($files);
    
    $jsFileArray=  array("distance.js", "HtmlSliderReduceScreen.js", "itemList.js", "itemDetail.js", "language.js", "mapItems.js", "popUp.js", "mapIGN.js", "menu.js", "mainScript.js", "ImageManager.js", "photoSwipe.js", "transitions.js", "trier.js", "var.js", "model.js", "sliderFullScreen.js", "SliderMediumScreen.js", "SliderReduceScreen.js", "spatialite.js", "dataCDT.js", "dataMP13.js", "dataMPM.js", "canyonsGeoJSON.js", "escaladeGeoJSON.js", "randoGeoJSON.js");
    
    $str = "";
    
    foreach ($jsFileArray as $js)
    {
        $str = $str.file_get_contents($originJS.$js);
    }

    //$str2 = str_replace(array("\r\n","\r","\t","\n",'  ','    ','     '), '', $str);
    
    file_put_contents($destinationJS.'/js/mini/script_v'.$version.'.js', $str);
    
    copy($originJS.'/localisable.js', $destinationJS.'/js/mini/localisable_v'.$version.'.js');
    
    //*********************** CSS ***************************
    
    $originCSS = "/Applications/MAMP/htdocs/mp/CSS/";
    
    $destinationCSS = $destination.'CSS/';
    
    $cssFileArray = array("common.css", "itemList.css", "itemDetail.css", "map.css", "media_queries.css", "gradient.css");
    
    foreach ($cssFileArray as $CSS)
    {
        copy($originCSS.'/'.$CSS, $destinationCSS.'/'.$CSS);
    }
    
    
    /*
    //*********************** CSS ***************************
    
    $originCSS = "/Applications/MAMP/htdocs/mp/CSS/myCSS";
    
    $destinationCSS = $destination.'CSS/mini';
    
    $cssFileArray = array("common.css", "itemList.css", "itemDetail.css", "map.css", "media_queries.css", "gradient.css");
    
    $str = "";
    
    foreach ($cssFileArray as $CSS)
    {
        $str = $str.file_get_contents($originCSS.'/'.$CSS);
    }
    
    //$str2 = str_replace(array("\r\n","\r","\t","\n",'  ','    ','     '), '', $str);
    
    file_put_contents($destinationCSS.'/MyStyle_v'.$version.'.css', $str);
    */
    
    
    /*
    
    //*********************** JS ***************************
    
    $originJS = "/Applications/MAMP/htdocs/mp/js/myScript";
    
    $destinationJS  = $destination.'js/myScript';
    
    //var_dump($files);
    
    $jsFileArray =  array("distance.js", "itemList.js", "language.js", "localisable.js", "mainScript.js", "mapIGN.js", "mapItems.js", "menu.js", "model.js", "spatialite.js", "transitions.js", "var.js", "escaladeGeoJSON.js", "canyonsGeoJSON.js", "randoGeoJSON.js", "dataMP13.js", "dataCDT.js", "dataMPM.js", "HtmlSliderReduceScreen.js", "SliderMediumScreen.js", "SliderReduceScreen.js");
    
    foreach ($jsFileArray as $JS)
    {
        copy($originJS.'/'.$JS, $destinationJS.'/'.$JS);
    }
    
    
    
    
    
    */
    
    return;
    
    //*********************** photoswipe ***************************
    
    $origin = "/Applications/MAMP/htdocs/mp/jquery";
    
    $destinationPhotoswipe = $destination.'jquery';
    
    $FileArray = array("code.photoswipe-3.0.5.js");
    
    foreach ($FileArray as $file)
    {
        copy($origin.'/'.$file, $destinationPhotoswipe.'/'.$file);
    }

    
    //*********************** get structure directory ***************************
    
    
    /*
    $myDir = "tilesTracesFull";
    
    $lArray = array();
    
    function listFolders($dir)
    {
        $dh = scandir($dir);
        
        $return = array();
        
        foreach ($dh as $folder)
        {
            if ($folder != '.' && $folder != '..' && $folder != '.DS_Store')
            {
                if (is_dir($dir . '/' . $folder))
                {
                    $return[] = array($folder => listFolders($dir . '/' . $folder));
                }
                else
                {
                    $return[] = $folder;
                }
            }
        }
        return $return;
    }
    
    
    $lArray = listFolders($myDir);

    
    echo json_encode($lArray);
     */
?>