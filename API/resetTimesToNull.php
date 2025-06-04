<?php

require ('mpIdentifier.php');


//API/setNodesForSpatialDb.php?idRepName=MuseeGranet&node=333&type=nodeWalk&table=ExpositionsMusees


try
	{
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
/*
        setNodeToNull ($PDOMySQL, "Canyons");
         setNodeToNull ($PDOMySQL, "Sortir");
         setNodeToNull ($PDOMySQL, "BonsPlans");
         setNodeToNull ($PDOMySQL, "ExpositionsMusees");
         setNodeToNull ($PDOMySQL, "Monuments");
         setNodeToNull ($PDOMySQL, "PlageBaignadePiscine");
        
         setNodeToNull ($PDOMySQL, "SitesEscalade");
         setNodeToNull ($PDOMySQL, "Randonnee");
         setNodeToNull ($PDOMySQL, "SitesNaturels");
         setNodeToNull ($PDOMySQL, "Petanque");
        setNodeToNull ($PDOMySQL, "Restos");
        setNodeToNull ($PDOMySQL, "Dormir");
        setNodeToNull ($PDOMySQL, "Shopping");
        setNodeToNull ($PDOMySQL, "Loisirs");
 */
        setNodeToNull ($PDOMySQL, "Circuits");

        
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}


function setNodeToNull ($PDOMySQL, $table)
{
    $sql = "select * from ".$table."" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    //var_dump($canyon).'<br/>';
    
    for ($i = 0;  $i < count($itemArray);  $i++)
    {
        $updateSQL= "UPDATE ".$table." SET closeCity=NULL, pied=NULL, velo=NULL, moto=NULL, auto=NULL  where idRepName='".$itemArray[$i]['idRepName']."'";
        $PDOreq2 = $PDOMySQL -> query($updateSQL);
    }
}


?>