<?php

require ("mpIdentifier.php");


try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $table = "";
    $idRepName = "";
    
    if (isset($_GET["table"]) && in_array($_GET["table"], $tableArray))
        $table = $_GET["table"];
    
    //if (isset($_GET["idRepName"]) && (ctype_alpha($_GET["idRepName"]) || in_array($_GET["idRepName"], $numIdRepNameArray)))
        $idRepName = $_GET["idRepName"];
    
    //echo($table." / ".$idRepName."<br><br>");
    
    //$itemSQL= "select * from ".$table." where idRepName='".$idRepName."'";
    //$PDOreq	= $PDOMySQL -> query($itemSQL);
    
    $itemSQL= "select * from ".$table." where idRepName= :idRepName";
    $PDOreq	= $PDOMySQL -> prepare($itemSQL, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $PDOreq->execute(array(':idRepName' => $idRepName));
 
    
    while($item = $PDOreq -> fetch(PDO::FETCH_OBJ))
    {
        //var_dump($item);
        
        $tabDiapo = array();
        
        $sqlPicture = "select name from Pictures where idRepName='".$idRepName."'";
        
        $PDOreq	= $PDOMySQL -> query($sqlPicture);
        $pictureArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        for ($l = 0; $l < count($pictureArray); $l++)
        {
            array_push($tabDiapo, $pictureArray[$l]["name"]);
        }
        
        $item->tabDiapo = $tabDiapo;

        echo json_encode($item);
    }
    
    
}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}






?>