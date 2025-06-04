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
        
        global $pictureArray;
        
        $sqlPicture = "select * from Pictures";
        $PDOreq	= $PDOMySQL -> query($sqlPicture);
        $pictureArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        /*
        setPrivateListItemWithTable ($PDOMySQL, "Monuments");
        setPrivateListItemWithTable ($PDOMySQL, "Canyons");       
        setPrivateListItemWithTable ($PDOMySQL, "SitesEscalade");
        setPrivateListItemWithTable ($PDOMySQL, "SitesNaturels"); 
        setPrivateListItemWithTable ($PDOMySQL, "Randonnee");
        setPrivateListItemWithTable ($PDOMySQL, "BonsPlans");
        setPrivateListItemWithTable ($PDOMySQL, "ExpositionsMusees");
        setPrivateListItemWithTable ($PDOMySQL, "Petanque");
        setPrivateListItemWithTable ($PDOMySQL, "Sortir");
        */

         setPrivateListItemWithTable ($PDOMySQL, "PlageBaignadePiscine");

        
        
        //setListItemWithTable ($PDOMySQL, "ParcAccro");
		
		//setCdtListItemWithTable ($PDOMySQL, "Bars");
        
		
		/*
        setCdtListItemWithTable ($PDOMySQL, "Campings");
		setCdtListItemWithTable ($PDOMySQL, "CampingsCar");		
        setCdtListItemWithTable ($PDOMySQL, "AgencesReceptives");
        setCdtListItemWithTable ($PDOMySQL, "Guides");
        setCdtListItemWithTable ($PDOMySQL, "LocationVelo");
        setCdtListItemWithTable ($PDOMySQL, "MoniteursEscalade");
        setCdtListItemWithTable ($PDOMySQL, "OfficesTourisme");
        setCdtListItemWithTable ($PDOMySQL, "Gites");
        setCdtListItemWithTable ($PDOMySQL, "GitesDeFrance");
		setCdtListItemWithTable ($PDOMySQL, "Restaurants");
		setCdtListItemWithTable ($PDOMySQL, "Hotels");
		*/
    
		//setCdtListItemWithTable ($PDOMySQL, "MP2013");
		
        /*
		$sql = "select * from MP2013 WHERE date_end > NOW() ORDER BY date_start ASC" ;
		$PDOreq	= $PDOMySQL -> query($sql);
		$itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
		//var_dump($itemArray).'<br/>';
		
		for ($i = 0;  $i < count($itemArray);  $i++)
		{
			$itemArray[$i]['table'] = "MP2013";
		}

		echo 'var listItemsMP2013 = '.json_encode($itemArray).';';
		*/
		
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
    global $pictureArray;
    
    $sql = "select * from ".$table." WHERE actif=1" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($itemArray).'<br/>';
    
    for ($i = 0;  $i < count($itemArray);  $i++)
    {
		$itemArray[$i]['table'] = $table;
		
        $tabDiapo = array();
        
        for ($l = 0; $l < count($pictureArray); $l++)
        {
            if ($itemArray[$i]['idRepName'] == $pictureArray[$l]['idRepName'])
            {
                array_push($tabDiapo, $pictureArray[$l]['name']);
            }
        }
        
        $itemArray[$i]["tabDiapo"] = $tabDiapo;
    }
    
    echo 'var listItems'.$table.' = '.json_encode($itemArray).';';
	
    /*
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
     */
}


function setCdtListItemWithTable($PDOMySQL, $table)
{
    $sql = "select * from ".$table."" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
	
    
    echo 'var listItems'.$table.' = '.json_encode($itemArray).';';
}


?>