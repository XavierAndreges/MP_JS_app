<?php

require ('mpIdentifier.php');

try
{
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    //echo $_GET['title'].isset($_GET['title']);

    if (isset($_GET['title']) && isset($_GET['email']))
    {
        $sql = "select * from EmailReceivedDocSitesNaturels WHERE title='".$_GET['title']."' AND email='".$_GET['email']."'" ;
		$PDOreq	= $PDOMySQL -> query($sql);
		$response = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
        
        //var_dump($response).'<br/>';
        
        if (count($response) > 0 && $response[0]['dateRead'] == null)
        {
            $sql = "UPDATE EmailReceivedDocSitesNaturels SET dateRead = CURRENT_DATE() WHERE email='" . $_GET['email'] . "'";
        
            //echo $sql;
        
            $PDOreq = $PDOMySQL -> exec($sql);
        
            //var_dump($PDOreq	).'<br/>';
        }
    }

}
catch( PDOException $e)
{
    echo $e -> getMessage( );
}

?>