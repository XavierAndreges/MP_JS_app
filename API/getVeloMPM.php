<?php

require ('mpIdentifier.php');

header('Content-type: text/html');

header('Access-Control-Allow-Origin: *');

try
	{
        if (isset($_GET['number']))
        {
            $velo = file_get_contents('http://www.levelo-mpm.fr/service/stationdetails/marseille/'.$_GET['number']);
            
            $number = "<number>".$_GET['number']."</number>";
            
            echo substr_replace($velo, $number, -11, 0);
        }
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}

?>