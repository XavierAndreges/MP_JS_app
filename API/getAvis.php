<?php

require ('mpIdentifier.php');

header('Access-Control-Allow-Origin: *');

//http://localhost:8888/mp/API/getAvis.php?table=Randonnee&idRepName=enVauSerpent&moderation=0&date=1440769027
    //http://localhost:8888/mp/API/getAvis.php?table=Randonnee&idRepName=capCanailleCassisLaCiotat&moderation=0&date=1440769027
    
    //API/getAvis.php?table=PlageBaignadePiscine&idRepName=anseMalmousque&moderation=0&date=1441144800

try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    /*************** custom controls ****************/
     
    if (isset($_GET["table"]) && !in_array($_GET["table"], $tableArray))
    {
        echo "Sorry ! ".$_GET["table"];
        return;
    }
    
    if (isset($_GET["idRepName"]) && (!ctype_alpha($_GET["idRepName"]) && !in_array($_GET["idRepName"], $numIdRepNameArray)))
    {
        echo "Sorry ! ".$_GET["idRepName"];
        return;
    }
    
    if (isset($_GET["moderation"]) && ($_GET["moderation"] != 0 && $_GET["moderation"] != 1 && $_GET["moderation"] != -1))
    {
        echo "Sorry ! ".$_GET["moderation"];
        return;
    }
    
    
    /*************** requests ****************/

    if (isset($_GET['table']) && isset($_GET['idRepName']) && isset($_GET['moderation']))
    {
        if (isset($_GET['moderation']) == 0)
            $sql = "UPDATE ".$_GET['table']."Avis SET actif=".$_GET['moderation']." WHERE idRepName LIKE '".$_GET['idRepName']."' AND date=".$_GET['date'];
        else
        if (isset($_GET['moderation']) == -1)
            $sql = "DELETE FROM ".$_GET['table']."Avis WHERE idRepName LIKE '".$_GET['idRepName']."' AND date=".$_GET['date'];
        
        echo $sql.'<br>';
        
        $PDOreq	= $PDOMySQL -> query($sql);
    }
    else
    if (isset($_GET['table']) && isset($_GET['idRepName']))
    {
        $sql = "select * from ".$_GET['table']."Avis WHERE actif = 1 AND idRepName LIKE '".$_GET['idRepName']."' ORDER BY date DESC";

        $PDOreq	= $PDOMySQL -> query($sql);
        $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        echo 'var listAvis = '.json_encode($itemArray).';';
    }
    else
    if (isset($_GET['table']))
    {
        $sql = "select * from ".$_GET['table']."Avis WHERE actif = 1 ORDER BY date DESC";
        
        $PDOreq	= $PDOMySQL -> query($sql);
        $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        echo 'var listAvis'.$_GET['table'].' = '.json_encode($itemArray).';';
    }
    else
    {
        for ($i = 0; $i < count($tableAvisArray); $i++)
        {
            $sql = "select * from ".$tableAvisArray[$i]."Avis WHERE actif = 1 ORDER BY date DESC";

            $PDOreq	= $PDOMySQL -> query($sql);
            $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
            
            echo 'var listAvis'.$tableAvisArray[$i].' = '.json_encode($itemArray).';';
        }
    }
 
}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}




?>