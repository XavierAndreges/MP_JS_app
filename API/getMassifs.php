<?php

require ('mpIdentifier.php');

header('Content-type: application/javascript');

header('Access-Control-Allow-Origin: *');

try
	{
        //$massifs = file_get_contents('http://enviedebalade.playadz.com/js/map_web.js');
        
        $massifs = file_get_contents('http://balade.myprovence-apps.com/js/map_web.js');
        
        preg_match("#var massifs.*#", $massifs, $match);
        
        echo $match[0];
        
        //echo json_encode($massifs);
	}
catch( PDOException $e)
	{
	    echo $e -> getMessage( );
	}

?>