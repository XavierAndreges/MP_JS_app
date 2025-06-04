<?php

require ('mpIdentifier.php');

try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $sql = "select * from AgencesReceptives" ;
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);            
    
    //JSON_PRETTY_PRINT
    echo 'listItems = '.json_encode($itemArray).';';
    
    //var_dump($SN).'<br/>';
}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}

?>