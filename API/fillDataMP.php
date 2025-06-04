<?php
session_start () ;
	
	// Définition des données de configuration.
    define( 'MYSQL_DSN',		'mysql:host=localhost;dbname=marseilleProvence');
    define( 'MYSQL_USER',		'root');
    define( 'MYSQL_PASSWORD',	'root');
	
	// Création et configuration de la connexion.
	$bd = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	$bd -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	

$dom = new DOMDocument();

//$dom -> load('data13.xml');
$dom -> load('cdt_Evenement4.xml');
    
$export = $dom -> documentElement;
//

$nbElement = 0;
    
$nbText_en = 0;
    
$JSONtheme_fr = "";
$JSONtheme_en = "";
    

foreach ($export -> childNodes as $object)
{
	if ($object -> nodeType !== XML_ELEMENT_NODE) continue ;
    
    $name_fr = "";
    $nameOwner_fr = "";
    
    $theme_fr = "";
    $theme_en = "";
    $theme_de = "";
    $theme_es = "";
    
    $place = "";
    $placeVille = "";
    $placeLatitude = "";
    $placeLongitude = "";
    
    $text_fr = "";
    $text_en = "";
    $text_de = "";
    $text_es = "";
    
    $date_fr = "";
    $date_start = "";
    $date_end = "";
    $moreInfo = "";
    
    $isFree= "";
    $PrixMin = "";
    $PrixMax = "";
    $ResaName = "";
    $ResaPhone = "";
    $ResaMail = "";
    $ResaWeb = "";
    
    $ImageMin = "";
    $ImageMinType = "";
    
    $ImageMax = "";
    $ImageMaxType = "";
    
    $isSmallImage = "false";
    $isMediumImage = "false";
    
    /********** NomAnnonce_fr ***************/
    
    $InformationGenerales = $object -> childNodes -> item(1);
    $NomAnnonce = $InformationGenerales -> childNodes -> item(1);
    $name_fr = $NomAnnonce -> childNodes -> item(1) -> nodeValue;
    
    
    $n = 0;
    $en = 0;
    $de = 0;
    
    foreach ($InformationGenerales -> childNodes as $fils2)
    {
        if ($fils2 -> nodeType !== XML_ELEMENT_NODE) continue ;
        
         /********** type ***************/
        
        if ($fils2 -> tagName == "cdt:ThemeEvenement")
        {
            $themeNiv2 = $fils2 -> childNodes -> item(3);
            
            $cdtTheme = $themeNiv2 -> childNodes -> item(1);
            
            foreach ($cdtTheme -> childNodes as $themeLang)
            {
                if ($themeLang -> nodeType !== XML_ELEMENT_NODE) continue ;
                
                
                if ($themeLang -> tagName == "fr")
                {
                    if ($n == 0)
                        $theme_fr = $themeLang -> nodeValue;
                    
                    if ($n > 0 && strpos($theme_fr, $themeLang -> nodeValue) === FALSE)
                        $theme_fr = $theme_fr.", ".$themeLang -> nodeValue;
                    
                    
                    if (strpos($JSONtheme_fr, $themeLang -> nodeValue) === FALSE)
                        $JSONtheme_fr =  $JSONtheme_fr.", ".$themeLang -> nodeValue;
                    
                    
                    $n++;
                }
                
                if ($themeLang -> tagName == "en")
                {
                    if ($en == 0)
                        $theme_en = $themeLang -> nodeValue;
                    
                    if ($en > 0 && strpos($theme_en, $themeLang -> nodeValue) === FALSE)
                        $theme_en = $theme_en.", ".$themeLang -> nodeValue;
                    
                    
                    if (strpos($JSONtheme_en, $themeLang -> nodeValue) === FALSE)
                        $JSONtheme_en =  $JSONtheme_en.", ".$themeLang -> nodeValue;
                    
                    
                    $en++;
                }
                
                if ($themeLang -> tagName == "de")
                {
                    if ($de == 0)
                        $theme_de = $themeLang -> nodeValue;
                    
                    if ($de > 0 && strpos($theme_de, $themeLang -> nodeValue) === FALSE)
                        $theme_de = $theme_de.", ".$themeLang -> nodeValue;
                    
                    
                    if (strpos($JSONtheme_de, $themeLang -> nodeValue) === FALSE)
                        $JSONtheme_de =  $JSONtheme_de.", ".$themeLang -> nodeValue;
                    
                    
                    $de++;
                }
                
                if ($themeLang -> tagName == "es")
                {
                    if ($es == 0)
                        $theme_de = $themeLang -> nodeValue;
                    
                    if ($es > 0 && strpos($theme_es, $themeLang -> nodeValue) === FALSE)
                        $theme_es = $theme_es.", ".$themeLang -> nodeValue;
                    
                    
                    if (strpos($JSONtheme_es, $themeLang -> nodeValue) === FALSE)
                        $JSONtheme_es =  $JSONtheme_es.", ".$themeLang -> nodeValue;
                    
                    
                    $es++;
                }
            }
        }
        
         /********** Organisateur ***************/
        
        if ($fils2 -> tagName == "cdt:Organisateur")
        {
            $cdtInformationsGenerales = $fils2 -> childNodes -> item(1);
            
            $cdtNomAnnonce = $cdtInformationsGenerales -> childNodes -> item(1);
            
            foreach ($cdtNomAnnonce -> childNodes as $itemLang)
            {
                if ($itemLang -> nodeType !== XML_ELEMENT_NODE) continue ;

                if ($itemLang -> tagName == "fr")
                {
                    $nameOwner_fr = $itemLang -> nodeValue;
                }
            }
        }
        
        /********** LieuEvenement ***************/
  
        
        if ($fils2 -> tagName == "cdt:LieuEvenement")
        {
            foreach ($fils2 -> childNodes as $filsEvenement)
            {
                if ($filsEvenement -> nodeType !== XML_ELEMENT_NODE) continue ;
                
                if ($filsEvenement -> tagName == "cdt:LieuLibre")
                {
                    $cdtVille1 = $filsEvenement -> childNodes -> item(1);
                    $cdtVille2 = $cdtVille1 -> childNodes -> item(1);
                    
                    $placeVille = $cdtVille2 -> childNodes -> item(1) -> nodeValue;
                    $placeLatitude = $cdtVille2 -> childNodes -> item(3) -> nodeValue;
                    $placeLongitude = $cdtVille2 -> childNodes -> item(5) -> nodeValue;
                    
                    
                    $nomLieu = $filsEvenement -> childNodes -> item(3);
                    
                    foreach ($nomLieu -> childNodes as $itemLang)
                    {
                        if ($itemLang -> nodeType !== XML_ELEMENT_NODE) continue ;
                        
                        if ($itemLang -> tagName == "fr")
                        {
                            $place = $itemLang -> nodeValue;
                        }
                    }
                }
                
                if ($filsEvenement -> tagName == "cdt:LieuAnnonce")
                {
                    foreach ($filsEvenement -> childNodes as $placeAnnonce)
                    {
                        if ($placeAnnonce -> nodeType !== XML_ELEMENT_NODE) continue ;
                        
                        if ($placeAnnonce -> tagName == "cdt:InformationsGenerales")
                        {
                            foreach ($placeAnnonce -> childNodes as $InformationsGenerales)
                            {
                                if ($InformationsGenerales -> nodeType !== XML_ELEMENT_NODE) continue ;
                                
                                if ($InformationsGenerales -> tagName == "cdt:Adresse")
                                {
                                    foreach ($InformationsGenerales -> childNodes as $Adresse)
                                    {
                                        if ($Adresse -> nodeType !== XML_ELEMENT_NODE) continue ;
                                        
                                        if ($Adresse -> tagName == "cdt:Ville")
                                        {                                            
                                            $cdtVille2 = $Adresse -> childNodes -> item(1);
                                            
                                            $placeVille = $cdtVille2 -> childNodes -> item(1) -> nodeValue;
                                        }
                                    }
                                }
                            }
                            
                            $nomLieu = $placeAnnonce -> childNodes -> item(1);

                            foreach ($nomLieu -> childNodes as $itemLang)
                            {
                                if ($itemLang -> nodeType !== XML_ELEMENT_NODE) continue ;
                                
                                if ($itemLang -> tagName == "fr")
                                {
                                    $place = $itemLang -> nodeValue;
                                }
                            }
                        }
                        
                        if ($placeAnnonce -> tagName == "cdt:SituationGeographique")
                        {
                            $placeLatitude = $placeAnnonce -> childNodes -> item(1) -> nodeValue;
                            $placeLongitude = $placeAnnonce -> childNodes -> item(3) -> nodeValue;
                        }
                    }
                }
            }
        }
    }
    

    foreach ($object -> childNodes as $fils1)
    {
        if ($fils1 -> nodeType !== XML_ELEMENT_NODE) continue;
        
        /********** DescriptifValorisant ***************/
        
        if ($fils1 -> tagName == "cdt:ProgrammeDescriptif")
        {
            $cdtDescriptifValorisant = $fils1 -> childNodes -> item(1);
            
            foreach ($cdtDescriptifValorisant -> childNodes as $cdtDescriptifValorisant_lang)
            {
                if ($cdtDescriptifValorisant_lang -> nodeType !== XML_ELEMENT_NODE) continue ;

                if ($cdtDescriptifValorisant_lang -> tagName == "fr")
                {
                    $text_fr = $cdtDescriptifValorisant_lang -> nodeValue;
                }
                
                if ($cdtDescriptifValorisant_lang -> tagName == "en")
                {
                    $text_en = $cdtDescriptifValorisant_lang -> nodeValue;
                    $nbText_en++;
                }
                
                if ($cdtDescriptifValorisant_lang -> tagName == "de")
                {
                    $text_de = $cdtDescriptifValorisant_lang -> nodeValue;
                }
                
                if ($cdtDescriptifValorisant_lang -> tagName == "es")
                {
                    $text_es = $cdtDescriptifValorisant_lang -> nodeValue;
                }
            }
            
        }
        
        /********** Date ***************/
        
        if ($fils1 -> tagName == "cdt:PeriodesEtDates")
        {
            foreach ($fils1 -> childNodes as $filsDate)
            {
                if ($filsDate -> nodeType !== XML_ELEMENT_NODE) continue ;
                
                if ($filsDate -> tagName == "cdt:DateEnClair")
                {
                    foreach ($filsDate -> childNodes as $itemLang)
                    {
                        if ($itemLang -> nodeType !== XML_ELEMENT_NODE) continue ;
                        
                        if ($itemLang -> tagName == "fr")
                        {
                            $date_fr = $itemLang -> nodeValue;
                        }
                    }
                }
                
                
                if ($filsDate -> tagName == "cdt:Definitions")
                {
                    foreach ($filsDate -> childNodes as $item)
                    {
                        if ($item -> nodeType !== XML_ELEMENT_NODE) continue ;
                        
                        if ($item -> tagName == "cdt:Debut")
                        {
                            $date_start = $item -> nodeValue;
                        }
                        
                        if ($item -> tagName == "cdt:Fin")
                        {
                            $date_end = $item -> nodeValue;
                        }
                        
                        if ($item -> tagName == "cdt:Description")
                        {
                            $moreInfo = $item -> nodeValue;
                        }
                    }
                }
            }
        }
        
         /********** Tarifs ***************/
        
        if ($fils1 -> tagName == "cdt:Tarification")
        {
            $cdtGratuit= $fils1 -> childNodes -> item(1);
            
            $isFree = $cdtGratuit -> nodeValue;
            
            if ($isFree != NULL && $isFree == "false" && $fils1 -> childNodes -> item(3) != NULL)
            {
                $Tarifs = $fils1 -> childNodes -> item(3);
                
                foreach ($Tarifs -> childNodes as $filsDate)
                {
                    if ($filsDate -> nodeType !== XML_ELEMENT_NODE) continue ;
                    
                    if ($filsDate -> tagName == "cdt:PrixMin")
                    {
                        $PrixMin = $filsDate -> nodeValue;
                    }
                    
                    if ($filsDate -> tagName == "cdt:PrixMax")
                    {
                        $PrixMax = $filsDate -> nodeValue;
                    }
                }
            }
        }
        
        
        /********** Réservations ***************/
        
        if ($fils1 -> tagName == "cdt:Reservation")
        {
            $cdtInformationsReservation = $fils1 -> childNodes -> item(1);
            
            if ($cdtInformationsReservation != NULL)
            {
                foreach ($cdtInformationsReservation -> childNodes as $filsDate)
                {
                    if ($filsDate -> nodeType !== XML_ELEMENT_NODE) continue ;
                    
                    if ($filsDate -> tagName == "cdt:NomOrganisme")
                    {
                        $ResaName = $filsDate -> nodeValue;
                    }
                    
                    if ($filsDate -> tagName == "cdt:Telephone")
                    {
                        $ResaPhone = $filsDate -> nodeValue;
                    }
                    
                    if ($filsDate -> tagName == "cdt:Mail")
                    {
                        $ResaMail = $filsDate -> nodeValue;
                    }
                    
                    if ($filsDate -> tagName == "cdt:AdresseWeb")
                    {
                        $ResaWeb = $filsDate -> nodeValue;
                    }
                }
            }
        }
        
        
        /********** Images ***************/
        
        
        if ($fils1 -> tagName == "cdt:InformationsGestion")
        {
            foreach ($fils1 -> childNodes as $filsDate)
            {
                if ($filsDate -> nodeType !== XML_ELEMENT_NODE) continue ;
                
                if ($filsDate -> tagName == "cdt:Ressources")
                {
                    foreach ($filsDate -> childNodes as $itemLang)
                    {
                        if ($itemLang -> nodeType !== XML_ELEMENT_NODE) continue ;
                        
                        if ($itemLang -> tagName == "jcr:mimeType")
                        {
                            $ImageMinType = utf8_decode($itemLang -> nodeValue);
                        }
                        
                        if ($itemLang -> tagName == "jcr:data")
                        {
                            $ImageMin = $itemLang -> nodeValue;
                        }
                        
                        if ($itemLang -> tagName == "cdt:FormatWeb")
                        {
                            foreach ($itemLang -> childNodes as $itemLang2)
                            {
                                if ($itemLang2 -> nodeType !== XML_ELEMENT_NODE) continue ;
                                
                                if ($itemLang2 -> tagName == "jcr:mimeType")
                                {
                                    $ImageMaxType = utf8_decode($itemLang2 -> nodeValue);
                                }
                                
                                if ($itemLang2 -> tagName == "jcr:data")
                                {
                                    $ImageMax = $itemLang2 -> nodeValue;
                                }
                            }
                        }
                    }
                }
            }      
        }        
    }
    
    echo "<strong>Nom Annonce : ".$name_fr."</strong><br>";
    
    echo "Theme_fr : <i>".utf8_decode($theme_fr)."</i><br>";
    echo "nomOrganisateur_fr : <i>".$nameOwner_fr."</i><br>";
    echo "Lieu : <i>".$place."</i><br>";
    echo "Lieu Ville : <i>".$placeVille."</i><br>";
    
    echo "Lieu Latitude : <i>".$placeLatitude."</i><br>";
    echo "Lieu Longitude : <i>".$placeLongitude."</i><br>";
    
    echo "DescriptifValorisant_fr : <i>".utf8_decode($text_fr)."</i><br>";
    
    if ($text_en != "")
        echo "DescriptifValorisant_en : <i>".utf8_decode($text_en)."</i><br>";
    
    if ($text_de != "")
        echo "DescriptifValorisant_de : <i>".utf8_decode($text_de)."</i><br>";
    
    if ($text_es != "")
        echo "DescriptifValorisant_en : <i>".utf8_decode($text_es)."</i><br>";
    
    echo "Date_fr : <i>".$date_fr."</i><br>";
    echo "Date_start : <i>".$date_start."</i><br>";
    echo "Date_end : <i>".$date_end."</i><br>";
    
    if ($moreInfo != "")
        echo "moreInfo : <i>".$moreInfo."</i><br>";
    
    if ($isFree != "")
        echo "Gratuit : <i>".$isFree."</i><br>";
    
    if ($isFree != null && $isFree == "false")
    {
        echo "PrixMin : <i>".$PrixMin."</i><br>";
        echo "PrixMax : <i>".$PrixMax."</i><br>";
        echo "ResaName : <i>".$ResaName."</i><br>";
        echo "ResaPhone : <i>".$ResaPhone."</i><br>";
        echo "ResaMail : <i>".$ResaMail."</i><br>";
        echo "ResaWeb : <i>".$ResaWeb."</i><br>";
    }
    
    
    
    if ($ImageMin != "")
    {
        echo "<img src=\"data:".$ImageMinType.";base64,".$ImageMin."\" />";
        echo "MP2013_new/small/small_".$nbElement.".jpg";
        

        $OUTPUT = "MP2013_new/small/small_".$nbElement.".jpg";
        $bin = base64_decode($ImageMin);
        file_put_contents($OUTPUT, $bin);

        $isSmallImage = "true";
    }
    
    if ($ImageMax != "")
    {
        echo "<img src=\"data:".$ImageMaxType.";base64,".$ImageMax."\" />";
        echo "MP2013_new/medium/medium_".$nbElement.".jpg";

        $OUTPUT = "MP2013_new/medium/medium_".$nbElement.".jpg";
        $bin = base64_decode($ImageMax);
        file_put_contents($OUTPUT, $bin);

        $isMediumImage = "true";
    }
    
    /*
    if ($nbElement == 5)
        break;
    */

    
    try
    {
		// préparation de la requéte

        //echo $temp_date_start = substr($date_start, 0, 10);
        //echo "<br><br>";
        
        $temp_date_start = strtotime(substr($date_start, 0, 10));
        $temp_date_end = strtotime(substr($date_end, 0, 10));
        
        //echo $temp_date_start;
        //echo "<br><br>";

        $bd -> exec("INSERT INTO  `marseilleProvence`.`MP2013` (`idRepName`, `name_fr`, `type`, `soustype` , `nameOwner_fr`, `place`, `city` ,`latitude` ,`longitude` , `date_fr` ,`date_start` ,`date_end` , `moreInfo`, `isFree`, `PrixMin`, `PrixMax`, `ResaName`, `ResaPhone`, `ResaMail`, `ResaWeb`, `text_fr`, `text_en`, `text_de`, `text_es`, `isSmallImage`, `isMediumImage`) VALUES ('".$nbElement."', '".addslashes($name_fr)."', 'MP2013',  '".addslashes($theme_fr)."' ,  '".addslashes($nameOwner_fr)."', '".addslashes($place)."' , '".addslashes($placeVille)."', '".$placeLatitude."' , '".$placeLongitude."' , '".addslashes($date_fr)."' , FROM_UNIXTIME(".$temp_date_start.") , FROM_UNIXTIME(".$temp_date_end."), '".addslashes($moreInfo)."', '".addslashes($isFree)."', '".addslashes($PrixMin)."', '".addslashes($PrixMax)."', '".addslashes($ResaName)."', '".addslashes($ResaPhone)."', '".addslashes($ResaMail)."', '".addslashes($ResaWeb)."' , '".addslashes($text_fr)."', '".addslashes($text_en)."', '".addslashes($text_de)."', '".addslashes($text_es)."', '".addslashes($isSmallImage)."', '".addslashes($isMediumImage)."')");        
    }
    catch( PDOException $e)
    {
        echo 'error connexion : ';
		echo $e;
		echo '<br>';
    }
     
    
    echo "<br><br>";
    $nbElement++;
}
    
    echo 'nbElement : '.$nbElement ;
    
    echo "<br><br>".utf8_decode($JSONtheme_fr);
    echo "<br><br>".utf8_decode($JSONtheme_en);
    echo "<br><br>".utf8_decode($JSONtheme_de);
    echo "<br><br>".utf8_decode($JSONtheme_es);
     
?>
