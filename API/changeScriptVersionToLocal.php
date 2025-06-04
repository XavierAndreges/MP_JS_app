<?php

try
	{
        $version = "1_1";
        
        //*************** change version *******************
        
        $oldJS = '<script type="text/javascript" src="js/script_v'.$version.'.js"></script>';
        
        $newJS = '<script type="text/javascript" src="js/myScript/var.js"></script><script type="text/javascript" src="js/myScript/model.js"></script><script type="text/javascript" src="js/myScript/popUp.js"></script><script type="text/javascript" src="js/myScript/mainScript.js"></script><script type="text/javascript" src="js/myScript/ImageManager.js"></script><script type="text/javascript" src="js/myScript/photoSwipe.js"></script><script type="text/javascript" src="js/myScript/localisable.js"></script><script type="text/javascript" src="js/myScript/language.js"></script><script type="text/javascript" src="js/myScript/distance.js"></script><script type="text/javascript" src="js/myScript/menu.js"></script><script type="text/javascript" src="js/myScript/transitions.js"></script><script type="text/javascript" src="js/myScript/trier.js"></script><script type="text/javascript" src="js/myScript/itemList.js"></script><script type="text/javascript" src="js/myScript/itemDetail.js"></script><script type="text/javascript" src="js/myScript/mapItems.js"></script><script type="text/javascript" src="js/myScript/mapIGN.js"></script><script type="text/javascript" src="js/myScript/SliderReduceScreen.js"></script><script type="text/javascript" src="js/myScript/SliderMediumScreen.js"></script><script type="text/javascript" src="js/myScript/sliderFullScreen.js"></script><script type="text/javascript" src="js/myScript/HtmlSliderReduceScreen.js"></script><script type="text/javascript" src="js/myScript/spatialite.js"></script><script type="text/javascript" src="js/myScript/dataMP13.js"></script><script src="js/myScript/randoGeoJSON.js"></script><script src="js/myScript/canyonsGeoJSON.js"></script><script src="js/myScript/escaladeGeoJSON.js"></script><script type="text/javascript" src="js/myScript/dataCDT.js"></script><script type="text/javascript" src="js/myScript/dataMPM.js"></script>';
        
        /*
        //*************** change version *******************
        
        $oldCSS = '<link rel="stylesheet" href="CSS/mini/'.$version.'" />';
        
        $newCSS = '<link rel="stylesheet" href="CSS/common.css" /><link rel="stylesheet" href="CSS/itemList.css" /><link rel="stylesheet" href="CSS/itemDetail.css" /><link rel="stylesheet" href="CSS/map.css" /><link rel="stylesheet" href="CSS/media_queries.css" /><link rel="stylesheet" href="CSS/gradient.css" />';
        */
        
        $page =  array("index.html", "Circuit.html", "LocationVelo.html", "AgencesReceptives.html", "Campings.html", "Guides.html", "MoniteursEscalade.html", "OfficesTourisme.html", "Contact.html", "MetroTram.html", "Parkings.html", "Massifs.html", "routingMap.html", "randoMap.html", "Restaurants.html", "Hebergements.html");
        
        
        foreach ($page as $html)
        {
            $str = file_get_contents('../'.$html);
            $str = str_replace($oldJS, $newJS, $str);
            //$str = str_replace($oldCSS, $newCSS, $str);
            file_put_contents('../'.$html, $str);
        }
        
        /*
        $str = file_get_contents('../index.html');
        $str = str_replace($oldJS, $newJS, $str);
        $str = str_replace($oldCSS, $newCSS, $str);
        file_put_contents('../index.html', $str);
        
        $str = file_get_contents('../LocationVelo.html');
        $str = str_replace($oldJS, $newJS, $str);
        $str = str_replace($oldCSS, $newCSS, $str);
        file_put_contents('../LocationVelo.html', $str);
        */
        
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}


?>