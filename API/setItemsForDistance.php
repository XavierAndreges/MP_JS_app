<?php

require ('mpIdentifier.php');


//setItemsForDistance.php?idRepName=becdelaigle&closeCity=Arles&pied=333&velo=666&type=walking&table=SitesNaturels
//setItemsForDistance.php?idRepName=petanqueCoursJu&closeCity=Arles&pied=333&velo=666&type=walking&table=Petanque


try
	{
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		/*
        $time1 = time();
        echo $time1.'<br><br>';
		*/
        
        $table = NULL;
        $type = NULL;
        $idRepName = NULL;
        $closeCity = NULL;
        $timeForBus = NULL;
        
        if (isset($_GET['table']))
            $table = $_GET['table'];
        
        if (isset($_GET['type']))
            $type = $_GET['type'];
        
        if (isset($_GET['idRepName']))
            $idRepName = $_GET['idRepName'];
        
        if (isset($_GET['closeCity']))
        {
            if ($_GET['closeCity'] == "Aix")
                $closeCity = "Aix en Provence";
            else
                $closeCity = $_GET['closeCity'];
        }
        else
            $closeCity = "Marseille, Aix en Provence, Arles, Jouques";
        
        if (isset($_GET['pied']))
        {
            $pied = $_GET['pied'];
            $velo = $_GET['velo'];
        }
        
        if (isset($_GET['moto']))
        {
            $moto = $_GET['moto'];
            $auto = $_GET['auto'];
        }
        
        if (isset($_GET['timeForBus']))
            $timeForBus = $_GET['timeForBus'];

        
        $itemSQL= "select * from ".$table." where idRepName='".$idRepName."'";
        $PDOreq	= $PDOMySQL -> query($itemSQL);
        
        while($item = $PDOreq -> fetch(PDO::FETCH_OBJ))
        {
            //var_dump($item);
            
            if ($timeForBus != NULL)
            {
                $timeForBus = $item -> bus.", ".$timeForBus;
                
                $updateSQL= "UPDATE ".$table." SET bus='".$timeForBus."' where idRepName='".$idRepName."'";
                
                echo($table.' / '.$idRepName.' / '.$timeForBus);
            }
            else
            {
                if ($item -> closeCity != null)
                {
                    if (strpos($item -> closeCity, $closeCity) === FALSE)
                        $_closeCity = $item -> closeCity.", ".$closeCity;
                    else
                        $_closeCity = $item -> closeCity;
                }
                else
                {
                    $_closeCity = $closeCity;
                }
                
                if ($type == "walking")
                {
                    
                    if($item -> pied != null)
                    {
                        $_pied = $item -> pied.", ".$pied;
                    }
                    else
                    {
                        $_pied = $pied;
                    }
                    
                    if($item -> velo != null)
                    {
                        $_velo = $item -> velo.", ".$velo;
                    }
                    else
                    {
                        $_velo = $velo;
                    }
                    
                    $updateSQL= "UPDATE ".$table." SET closeCity='".$_closeCity."', pied='".$_pied."', velo='".$_velo."' where idRepName='".$idRepName."'";
                }
                else
                {
                    if($item -> moto != null)
                    {
                        $_moto = $item -> moto.", ".$moto;
                    }
                    else
                    {
                        $_moto = $moto;
                    }
                    
                    if($item -> auto != null)
                    {
                        $_auto = $item -> auto.", ".$auto;
                    }
                    else
                    {
                        $_auto = $auto;
                    }
                    
                    $updateSQL= "UPDATE ".$table." SET closeCity='".$_closeCity."', moto='".$_moto."', auto='".$_auto."' where idRepName='".$idRepName."'";
                }
                
                echo($table.' / '.$idRepName.' / '.$_closeCity);
            }

            $PDOreq2 = $PDOMySQL -> query($updateSQL);

        }
        

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

?>