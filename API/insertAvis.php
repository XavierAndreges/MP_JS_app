<?php

require ('mpIdentifier.php');

header('Access-Control-Allow-Origin: *');

//API/insertAvis.php?table=Randonnee&idRepName=capSugiton&shortName=Cap%20Sugiton&date=1440248946&done=en intégralité&pathQuality=peu marqué&temperature=chaude&windForce=violent&note=4&observation=hlhlkhlhllkjlkjlkjlj;

//API/insertAvis.php?table=PlageBaignadePiscine&idRepName=capSugiton&date=1440248946

try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    
    if (isset($_POST['table']) && in_array($_POST["table"], $tableArray))
    {
        if ($_POST['table'] == "Randonnee")
            setAvisForRandonnee($PDOMySQL);
        else
        if ($_POST['table'] == "PlageBaignadePiscine")
            setAvisForPlageBaignadePiscine($PDOMySQL);
        else
        if ($_POST['table'] == "SitesNaturels")
            setAvisForSitesNaturels($PDOMySQL);
        else
        if ($_POST['table'] == "Slackline")
            setAvisForSlackline($PDOMySQL);
        else
        if ($_POST['table'] == "ChangeWorld")
            //${'setAvisFor'.$_POST['table']}($PDOMySQL);
            setAvisForChangeWorld($PDOMySQL);
    }
    
}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}
    
    
    function setAvisForChangeWorld($PDOMySQL)
    {
        echo var_dump($_POST);
        
        //***************** cas spéciaux ***************
        
        $pseudo = "1 utilisateur";
        $note = NULL;
        $observation = NULL;
        
        if (isset($_POST['pseudo']))
            $pseudo = $_POST['pseudo'];
        
        if (isset($_POST['note']))
            $note = $_POST['note'];
        
        if (isset($_POST['observation']))
            $observation = $_POST['observation'];
        
        //***************** requete POST ***************
        
        if (isset($_POST['idRepName']))
        {
            $itemSQL = 'INSERT INTO ChangeWorldAvis (idRepName, title_fr, title_en, shortTitle, pseudo, date, dateString, note, observation)
            VALUES ("'.$_POST['idRepName'].'", "'.$_POST['title_fr'].'", "'.$_POST['title_en'].'", "'.$_POST['shortTitle'].'", "'.$pseudo.'", "'.$_POST['dateForm'].'", "'.$_POST['date'].'", "'.$note.'", "'.$observation.'")';
            
            $PDOreq	= $PDOMySQL -> query($itemSQL);
            
            echo "pseudo : ".$_POST['pseudo']."<br />";
            
            echo 'insert '.$_POST['idRepName'].' IN ChangeWorldAvis';
        }
    }


function setAvisForPlageBaignadePiscine($PDOMySQL)
{
    echo var_dump($_POST);
    
    //***************** cas spéciaux ***************
    
    $pseudo = "1 utilisateur";
    $pavillon = NULL;
    $wave = NULL;
    $frequentation = NULL;
    $temperature = NULL;
    $wind = NULL;
    $clean = NULL;
    $note = NULL;
    $observation = NULL;
    
    if (isset($_POST['pseudo']))
        $pseudo = $_POST['pseudo'];
    
    if (isset($_POST['pavillon']))
        $pavillon = $_POST['pavillon'];
    
    if (isset($_POST['wave']))
        $wave = $_POST['wave'];
    
    if (isset($_POST['frequentation']))
        $frequentation = $_POST['frequentation'];
    
    if (isset($_POST['temperature']))
        $temperature = $_POST['temperature'];
    
    if (isset($_POST['wind']))
        $wind = $_POST['wind'];
    
    if (isset($_POST['clean']))
        $clean = $_POST['clean'];

    if (isset($_POST['note']))
        $note = $_POST['note'];
    
    if (isset($_POST['observation']))
        $observation = $_POST['observation'];
    
    //***************** requete POST ***************
    
    if (isset($_POST['idRepName']))
    {
        $itemSQL = 'INSERT INTO PlageBaignadePiscineAvis (idRepName, title_fr, title_en, shortTitle, pseudo, date, dateString, pavillon, wave, frequentation, temperature, clean, wind, note, observation)
                    VALUES ("'.$_POST['idRepName'].'", "'.$_POST['title_fr'].'", "'.$_POST['title_en'].'", "'.$_POST['shortTitle'].'", "'.$pseudo.'", "'.$_POST['dateForm'].'", "'.$_POST['date'].'", "'.$pavillon.'", "'.$wave.'", "'.$frequentation.'", "'.$temperature.'", "'.$clean.'", "'.$wind.'", "'.$note.'", "'.$observation.'")';
        
        $PDOreq	= $PDOMySQL -> query($itemSQL);
        
        
        
        echo "pseudo : ".$_POST['pseudo']."<br />";
                         
        echo 'insert '.$_POST['idRepName'].' IN PlageBaignadePiscineAvis';
    }
}


function setAvisForRandonnee($PDOMySQL)
{
    //***************** cas spéciaux ***************
    
    $pseudo = "1 utilisateur";
    $done = NULL;
    $orientation = NULL;
    $frequentation = NULL;
    $temperature = NULL;
    $wind = NULL;
    $observation = NULL;
    
    if (isset($_POST['pseudo']))
        $pseudo = $_POST['pseudo'];
    
    if (isset($_POST['done']))
        $done = $_POST['done'];
    
    if (isset($_POST['orientation']))
        $orientation = $_POST['orientation'];
    
    if (isset($_POST['frequentation']))
        $frequentation = $_POST['frequentation'];
    
    if (isset($_POST['temperature']))
        $temperature = $_POST['temperature'];
    
    if (isset($_POST['wind']))
        $wind = $_POST['wind'];
    
    if (isset($_POST['note']))
        $note = $_POST['note'];
    
    if (isset($_POST['observation']))
        $observation = $_POST['observation'];
    
    //***************** requete POST ***************
    
    if (isset($_POST['idRepName']))
    {
        $itemSQL = 'INSERT INTO RandonneeAvis (idRepName, title_fr, title_en, shortTitle, pseudo, date, dateString, done, orientation, frequentation, temperature, wind, note, observation)
                    VALUES ("'.$_POST['idRepName'].'", "'.$_POST['title_fr'].'", "'.$_POST['title_en'].'", "'.$_POST['shortTitle'].'", "'.$pseudo.'", "'.$_POST['dateForm'].'", "'.$_POST['date'].'", "'.$done.'", "'.$orientation.'", "'.$frequentation.'", "'.$temperature.'", "'.$wind.'", "'.$note.'", "'.$observation.'")';
        
        $PDOreq	= $PDOMySQL -> query($itemSQL);
        
        echo var_dump($_POST);
        
        echo "pseudo : ".$_POST['pseudo']."<br />";
                         
        echo 'insert '.$_POST['idRepName'].' IN RandonneeAvis';
    }
}
    
    
    
    function setAvisForSitesNaturels($PDOMySQL)
    {
        //***************** cas spéciaux ***************
        
        $pseudo = "1 utilisateur";
        $done = NULL;
        $access = NULL;
        $frequentation = NULL;
        $clean = NULL;
        $observation = NULL;
        
        if (isset($_POST['pseudo']))
            $pseudo = $_POST['pseudo'];
        
        if (isset($_POST['done']))
            $done = $_POST['done'];
        
        if (isset($_POST['access']))
            $access = $_POST['access'];
        
        if (isset($_POST['frequentation']))
            $frequentation = $_POST['frequentation'];
        
        if (isset($_POST['clean']))
            $clean = $_POST['clean'];
        
        if (isset($_POST['note']))
            $note = $_POST['note'];
        
        if (isset($_POST['observation']))
            $observation = $_POST['observation'];
        
        //***************** requete POST ***************
        
        if (isset($_POST['idRepName']))
        {
            $itemSQL = 'INSERT INTO SitesNaturelsAvis (idRepName, title_fr, title_en, shortTitle, pseudo, date, dateString, access, frequentation, clean, note, observation)
            VALUES ("'.$_POST['idRepName'].'", "'.$_POST['title_fr'].'", "'.$_POST['shortTitle'].'", "'.$_POST['title_en'].'", "'.$pseudo.'", "'.$_POST['dateForm'].'", "'.$_POST['date'].'", "'.$access.'", "'.$frequentation.'", "'.$clean.'", "'.$note.'", "'.$observation.'")';
            
            $PDOreq	= $PDOMySQL -> query($itemSQL);
            
            echo var_dump($_POST);
            
            echo "pseudo : ".$_POST['pseudo']."<br />";
            
            echo 'insert '.$_POST['idRepName'].' IN SitesNaturelsAvis';
        }
    }


    function setAvisForSlackline($PDOMySQL)
    {
        //***************** cas spéciaux ***************
        
        $pseudo = "1 utilisateur";
        $installation = NULL;
        $frequentation = NULL;
        $clean = NULL;
        $observation = NULL;
        $deroulement = NULL;
        
        if (isset($_POST['pseudo']))
            $pseudo = $_POST['pseudo'];
        
        if (isset($_POST['installation']))
            $installation = $_POST['installation'];
        
        if (isset($_POST['frequentation']))
            $frequentation = $_POST['frequentation'];
        
        if (isset($_POST['note']))
            $note = $_POST['note'];
        
        if (isset($_POST['observation']))
            $observation = $_POST['observation'];
        
        if (isset($_POST['deroulement']))
            $deroulement = $_POST['deroulement'];
        
        //***************** requete POST ***************
        
        if (isset($_POST['idRepName']))
        {
            $itemSQL = 'INSERT INTO SlacklineAvis (idRepName, title_fr, title_en, shortTitle, pseudo, date, dateString, installation, frequentation, note, observation, deroulement)
            VALUES ("'.$_POST['idRepName'].'", "'.$_POST['title_fr'].'", "'.$_POST['title_en'].'", "'.$_POST['shortTitle'].'", "'.$pseudo.'", "'.$_POST['dateForm'].'", "'.$_POST['date'].'", "'.$installation.'", "'.$frequentation.'", "'.$clean.'", "'.$observation.'", "'.$deroulement.'")';
            
            $PDOreq	= $PDOMySQL -> query($itemSQL);
            
            echo var_dump($_POST);
            
            echo "pseudo : ".$_POST['pseudo']."<br />";
            
            echo 'insert '.$_POST['idRepName'].' IN SlacklineAvis';
        }
    }


?>