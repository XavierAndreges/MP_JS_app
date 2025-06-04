<?php

require ('mpIdentifier.php');



try
	{
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $table = NULL;
        $idRepName = NULL;
        
        if (isset($_GET['table']))
            $table = $_GET['table'];
        
        if (isset($_GET['idRepName']))
            $idRepName = $_GET['idRepName'];

        if ($idRepName == NULL || $idRepName == "")
        {
            $sql = "select * from ".$table."" ;
            $PDOreq	= $PDOMySQL -> query($sql);
            $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        }
        else
        {
            $sql = "select * from ".$table." WHERE idRepName='".$idRepName."'" ;
            $PDOreq	= $PDOMySQL -> query($sql);
            $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        }
 
        //var_dump($canyon).'<br/>';
 
        echo 'listItems = '.json_encode($itemArray).';';
        
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}


?>