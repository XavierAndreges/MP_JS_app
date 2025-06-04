<?php
session_start () ;
	
	// Définition des données de configuration.
    define( 'MYSQL_DSN',		'mysql:host=localhost;dbname=marseilleProvence');
    define( 'MYSQL_USER',		'root');
    define( 'MYSQL_PASSWORD',	'root');
	
	// Création et configuration de la connexion.
	$bd = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	$bd -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	

$dom = new DOMDocument();

//$dom -> load('data13.xml');
$dom -> load('veloMPM.xml');
    
$carto = $dom -> documentElement;

$nbElement = 0;
    
$markers = $carto -> childNodes -> item(1);
    

foreach ($markers -> childNodes as $marker)
{
	if ($marker -> nodeType !== XML_ELEMENT_NODE) continue ;
    
    $name = $marker -> getAttribute('name');
    $number = $marker -> getAttribute('number');
    $address = $marker -> getAttribute('address');
    $lat = $marker -> getAttribute('lat');
    $lng = $marker -> getAttribute('lng');
    
    
    echo $name." / ".$lat." / ".$lng."<br>";

    
    /*
    if ($nbElement == 5)
        break;
    */

    
    try
    {

        $bd -> exec("INSERT INTO  `marseilleProvence`.`VeloMPM` (`name`, `number`, `address`, `latitude`, `longitude`, `type`) VALUES ('".addslashes($name)."', '".addslashes($number)."', '".addslashes($address)."' ,  '".addslashes($lat)."', '".addslashes($lng)."' , 'VeloMPM')");
    }
    catch( PDOException $e)
    {
        echo 'error connexion : ';
		echo $e;
		echo '<br>';
    }
    
    echo "<br><br>";
    $nbElement++;
}
    
    echo 'nbElement : '.$nbElement ;
    
?>
