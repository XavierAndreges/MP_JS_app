<?php

require ('mpIdentifier.php');


//API/setNodesForSpatialDb.php?idRepName=MuseeGranet&node=333&type=nodeWalk&table=ExpositionsMusees


try
	{
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		/*
        $time1 = time();
        echo $time1.'<br><br>';
		*/
        $table = $_GET['table'];
        $type = $_GET['type'];
        $idRepName = $_GET['idRepName'];
        $node= $_GET['node'];

        
        $itemSQL= "select * from ".$table." where idRepName='".$idRepName."'";
        $PDOreq	= $PDOMySQL -> query($itemSQL);
        
        $updateSQL= "UPDATE ".$table." SET ".$type."=".$node." where idRepName='".$idRepName."'";
        $PDOreq2 = $PDOMySQL -> query($updateSQL);
        
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}

?>