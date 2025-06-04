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
        
        
        setPrivateListItemWithTable ($PDOMySQL, "Randonnee");
        setPrivateListItemWithTable ($PDOMySQL, "SitesNaturels");
		setPrivateListItemWithTable ($PDOMySQL, "Canyons");
        setPrivateListItemWithTable ($PDOMySQL, "SitesEscalade");
        setPrivateListItemWithTable ($PDOMySQL, "Canyons");
          
		//setCdtListItemWithTable ($PDOMySQL, "Bars");
        
/*
        setCdtListItemWithTable ($PDOMySQL, "AgencesReceptives");
        setCdtListItemWithTable ($PDOMySQL, "Guides");
        setCdtListItemWithTable ($PDOMySQL, "LocationVelo");
        setCdtListItemWithTable ($PDOMySQL, "MoniteursEscalade");
        setCdtListItemWithTable ($PDOMySQL, "OfficesTourisme");
        setCdtListItemWithTable ($PDOMySQL, "Campings");
        setCdtListItemWithTable ($PDOMySQL, "CampingsCar");
		setCdtListItemWithTable ($PDOMySQL, "Parkings");
        setCdtListItemWithTable ($PDOMySQL, "Hotels");
        setCdtListItemWithTable ($PDOMySQL, "Restaurants");
        setCdtListItemWithTable ($PDOMySQL, "ParcAccro");
        setCdtListItemWithTable ($PDOMySQL, "Massifs");
        setCdtListItemWithTable ($PDOMySQL, "ChambreHote");
        setCdtListItemWithTable ($PDOMySQL, "LocationDeVacancesClassees");
        setCdtListItemWithTable ($PDOMySQL, "ResidencesDeTourisme");
        setCdtListItemWithTable ($PDOMySQL, "ResidencesHoteliere");
*/

        
        //selectDistinctTypedecuisine($PDOMySQL);

        
        //setVeloMPMListItemWithTable($PDOMySQL, "VeloMPM");

/*
		$sql = "select * from MP2013 WHERE date_end > NOW() ORDER BY date_start ASC" ;
		$PDOreq	= $PDOMySQL -> query($sql);
		$itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
		for ($i = 0;  $i < count($itemArray);  $i++)
		{
			$itemArray[$i]['table'] = "MP2013";
		}
        
        
		echo 'var listItemsMP2013 = '.json_encode($itemArray).';';
 */
        
        
        /*
        $sql = "select * from MetroTramFull" ;
		$PDOreq	= $PDOMySQL -> query($sql);
		$itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
		for ($i = 0;  $i < count($itemArray);  $i++)
		{
			$itemArray[$i]['type'] = "MetroTram";
		}
        
        
		echo 'var listItemsMetroTram = '.json_encode($itemArray).';';
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
    
    $sql = "select * from ".$table;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
    
    for ($i = 0;  $i < count($itemArray);  $i++)
    {
		$itemArray[$i]['table'] = $table;
		
        $tabDiapo = array();
        
        $sqlPicture = "select name from Pictures where idRepName='".$itemArray[$i]['idRepName']."'";
        $PDOreq	= $PDOMySQL -> query($sqlPicture);
        $pictureArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        

        for ($l = 0; $l < count($pictureArray); $l++)
        {
            array_push($tabDiapo, $pictureArray[$l]['name']);
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

/*
function setCdtListItemWithTable($PDOMySQL, $table)
{
    $sql = "select * from ".$table." ORDER BY ville ASC" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
	
    
    echo 'var listItems'.$table.' = '.json_encode($itemArray).';';
}
*/

function setCdtListItemWithTable($PDOMySQL, $table)
{
    $listArray = array();
    
    $sql = "select * from ".$table." WHERE ville='Marseille' ORDER BY raisonsociale ASC" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray1 = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    
    $sql = "select * from ".$table." WHERE ville!='Marseille' ORDER BY ville ASC" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray2 = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);

    $listArray = array_merge($itemArray1, $itemArray2);
	
    
    echo 'var listItems'.$table.' = '.json_encode($listArray).';';
}


function selectDistinctTypedecuisine($PDOMySQL)
{
    $sql = "SELECT DISTINCT typedecuisine from Restaurants ORDER BY typedecuisine ASC" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($itemArray).'<br/>';
    
    echo json_encode($itemArray);
}


function setVeloMPMListItemWithTable($PDOMySQL, $table)
{
    $sql = "select * from ".$table;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
	
    
    echo 'var listItems'.$table.' = '.json_encode($itemArray).';';
}


?>