<?php

require ('mpIdentifier.php');

try
	{
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		/*
        $time1 = time();
        echo $time1.'<br><br>';
		*/

        setPrivateListItemWithTable ($PDOMySQL, "SitesNaturels");
		setPrivateListItemWithTable ($PDOMySQL, "Monuments");
		setPrivateListItemWithTable ($PDOMySQL, "Canyons");
        setPrivateListItemWithTable ($PDOMySQL, "SitesEscalade");
        setPrivateListItemWithTable ($PDOMySQL, "ExpositionsMusees");
        setPrivateListItemWithTable ($PDOMySQL, "Petanque");
        setPrivateListItemWithTable ($PDOMySQL, "Sortir");
        //setListItemWithTable ($PDOMySQL, "ParcAccro");

        setPrivateListItemWithTable ($PDOMySQL, "PlageBaignadePiscine");
        /*
        setListItemWithTable ($PDOMySQL, "AgencesReceptives");
        setListItemWithTable ($PDOMySQL, "Guides");
        setListItemWithTable ($PDOMySQL, "LocationVelo");
        setListItemWithTable ($PDOMySQL, "MoniteursEscalade");
        setListItemWithTable ($PDOMySQL, "OfficesTourisme");
        setListItemWithTable ($PDOMySQL, "Campings");
        setListItemWithTable ($PDOMySQL, "CampingsCar");
        setListItemWithTable ($PDOMySQL, "Gites");
        setListItemWithTable ($PDOMySQL, "GitesDeFrance");
        
        */
		
		setCdtListItemWithTable ($PDOMySQL, "Restaurants");
		setCdtListItemWithTable ($PDOMySQL, "Bars");
		setCdtListItemWithTable ($PDOMySQL, "Hotels");
		
		/*
        $time2 = time();
        echo '<br><br>'.$time2.'<br><br>';
        
        echo '<br><br>'.($time2 - $time1);
		 */
        
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}


function setPrivateListItemWithTable($PDOMySQL, $table)
{
    $sql = "select * from ".$table."" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
	
	$finalArray = array();
	
	foreach ($itemArray as $item)
	{
		$item['table'] = $table;

		//var_dump($item);
		//echo $item["idRepName"];
		
		$sqlPicture = "select * from Pictures where idRepName='".$item['idRepName']."'" ;	
		$PDOreq	= $PDOMySQL -> query($sqlPicture);
		$pictures = $PDOreq -> fetchAll(PDO::FETCH_COLUMN, 0);
		$item['tabDiapo'] = $pictures;

		array_push($finalArray, $item);
	}
    
    echo 'listItems'.$table.' = '.json_encode($finalArray).';';
}


function setCdtListItemWithTable($PDOMySQL, $table)
{
    $sql = "select * from ".$table."" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
	
    
    echo 'listItems'.$table.' = '.json_encode($itemArray).';';
}


function getOptionsWithCityAndTable($PDOMySQL, $city, $table)
{
    $cityArray = explode(", ",$city);
    
    //var_dump($cityArray);
    
    $optionsToAddArray= array();
    
    
    for ($n = 0;  $n < count($cityArray);  $n++)
    {
        $sqlOptions= "select * from ".$table." where ville = '".addslashes($cityArray[$n])."'" ;
        $PDOreq	= $PDOMySQL -> query($sqlOptions);
        $OptionsArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        //echo "cityArray /<strong>".$cityArray[$n]."</strong>/cityArray - ".count($OptionsArray)."<br/>";
        
        if (count($OptionsArray) > 0)
        {
            foreach ($OptionsArray as $OptionsItem)
            {
                if (!in_array($OptionsItem, $optionsToAddArray))
                {
                    //echo $OptionsItem["raisonsociale"].'<br/>';
                    array_push($optionsToAddArray, $OptionsItem);
                }
            }
            
            
        }
        //echo '<br/>';
    }
    
    return $optionsToAddArray;
}

?>