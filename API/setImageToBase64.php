<?php

require ("mpIdentifier.php");

try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $urlImage = "../pictures/BonsPlans/aspttVoile/480/Image.jpg";
    
    //echo "<img src=\"".$urlImage."\" />";
    
    $dataToSave = base64_encode(file_get_contents("../pictures/BonsPlans/aspttVoile/480/Image.jpg"));
    
    //$dataToSave = base64_encode(file_get_contents('filename'));
    
    //echo "<br><br>".$dataToSave;
    
    echo $dataToSave;
    
}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}






?>