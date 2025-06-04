<?php
    
    require ('mpIdentifier.php');
    
    
    try {
		$PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $finalArray = array();
        
        $mail = 'andreges.xavier@wanadoo.fr; mdec@club-internet.fr; florieandreges@hotmail.com; joyezrenee@club-internet.fr;  marieme_dx@yahoo.fr; lakayette@yahoo.fr;  pascal.posseme@hotmail.fr; delphine-jarriges@hotmail.fr; contact@zeldesign.fr; contact@lamanufabrique.com; f_mulloni@hotmail.com; sarah.schroeder@hotmail.fr; jpleclere@clever-age.com; benoit.barthe@transamo.com;  ludo_hp@hotmail.fr; johnphy@free.fr; fran_tellier@yahoo.fr; ginger@voila.fr;ebouve@hotmail.com; alexaletiec@yahoo.fr; clairedesmazieres@hotmail.com';
        
        $finalArray = explode("; ",$mail);
        
        $site = "Montaiguet  Collines de Gardanne, Domaine de Roques Hautes - Domaine Louis Philibert, Lac du Bimont, L'Arbois, Massifs de sainte Victoire et Concors, Lac de Zola, La Trévaresse, Chaîne des Côtes, Grand Site Sainte Victoire";
        
        for ($i = 0;  $i < count($finalArray);  $i++)
        {
            $sql = "INSERT INTO EmailReceivedDocSitesNaturels (title, sitesNaturels, email) VALUES ('docSitesNaturels', '".addslashes($site)."', '".$finalArray[$i]."')" ;
                
            $PDOreq = $PDOMySQL -> exec($sql);
            
        }
        
        /*
        $sql = "select * from OfficesTourisme ORDER BY ville" ;
        $PDOreq	= $PDOMySQL -> query($sql);
        $OTarray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);

        foreach ($OTarray as $item)
        {
            $sqlSNR = "select * from SitesNaturelsRemarquables where title !='' AND type != '' AND longitude !='' AND latitude !='' AND ville LIKE '%".addslashes($item['ville'])."%';" ;
            $PDOreqSNR	= $PDOMySQL -> query($sqlSNR);
            $SNR = $PDOreqSNR -> fetchAll(PDO::FETCH_ASSOC);
            
            //var_dump($SNR); echo '<br/><br/>';
            
            if (count($SNR) > 0)
            {
                $sites = $SNR[0]['title'];
                
                for ($n = 1;  $n < count($SNR);  $n++)
                {
                    $sites.= ", ".$SNR[$n]['title'];
                }
                
                $item['sites'] = $sites;
                
                //echo $item['ville']." >> ".$item['raisonsociale']." >> ".$item["sites"].'<br/><br/>';
                
                array_push($finalArray, $item);
            }
        }
        
        var_dump($finalArray).'<br/>';


         for ($i = 0;  $i < count($finalArray);  $i++)
         {
             if ($finalArray[$i]['sites'] != "" && $finalArray[$i]['mail'] != "")
             {
                 $sql = "INSERT INTO EmailReceivedDocSitesNaturels (title, ville, sitesNaturels, email) VALUES ('docSitesNaturels', '".addslashes($finalArray[$i]['ville'])."', '".addslashes($finalArray[$i]['sites'])."', '".$finalArray[$i]['mail']."')" ;
                 
                 $PDOreq = $PDOMySQL -> exec($sql);
             }
         
         }     
         */
        
        
    }
    catch( PDOException $e)
    {
        echo $e -> getMessage( );
    }
    
    
    function testAndReplaceException ($cityArray, $m)
    {
        // travailler sur : Martigues VS Châteauneuf-les-Martigues VS Châteauneuf le Rouge
        
        if ($cityArray[$m] == "Bouc" && $cityArray[$m+1] == "Bel")
        {
            return "Bouc Bel Air";
        }
        
        if ($cityArray[$m] == "Air" && $cityArray[$m-1] == "Bel")
        {
            return "Bouc Bel Air";
        }
        
        if ($cityArray[$m] == "Puy" && $cityArray[$m+1] == "Sainte")
        {
            return "Puy Sainte Réparade";
        }
        
        if ($cityArray[$m] == "Mas" && $cityArray[$m+1] == "Blanc")
        {
            return "Mas Blanc des Alpilles";
        }
        
        if ($cityArray[$m] == "Châteauneuf" && $cityArray[$m+1] == "les")
        {
            return "Châteauneuf les Martigues";
        }
        
        if ($cityArray[$m] == "Châteauneuf" && $cityArray[$m+1] == "le")
        {
            return "Châteauneuf le Rouge";
        }
        
        return $cityArray[$m];
    }
    
    ?>