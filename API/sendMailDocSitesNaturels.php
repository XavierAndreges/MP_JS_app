<?php
    
    require ('mpIdentifier.php');
    require ('sendMail.php');
    
try {
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mailArray = array();
    
    
    //$sql = "select * from EmailReceivedDocSitesNaturels ORDER BY ville";
    $sql = "select * from EmailReceivedDocSitesNaturels WHERE ville IS NULL";
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    
    //var_dump($itemArray);
    $i = 0;
    
    foreach ($itemArray as $item)
    {
        //if (!in_array($item['email'], $mailArray) && $i < 1 && $item['email'] == "andreges.xavier@wanadoo.fr")
        //if (!in_array($item['email'], $mailArray) && $i < 1)
        if (!in_array($item['email'], $mailArray))
        {
            $i++;
            
            array_push($mailArray, $item['email']);
            
            $sitesArray = explode(",", $item['sitesNaturels']);
            
            //var_dump($sitesArray);
            
            //=====Définition du sujet.
            $sujet = "SALUT MES COBAYES PREFERES : TEST";
            
            
            //=====Déclaration des messages au format texte et au format HTML.
            
            $textSite = "";

            if (count($sitesArray) > 1)
            {
                $textSite = "les sites suivants seront représentés :\n";
                
                foreach ($sitesArray as $site)
                {
                    $textSite.= "- ".$site."\n";
                }
            }
            else
            {
                $textSite = "le site \"".$item['sitesNaturels']."\" sera représenté.\n";
            }
        
            $message_txt =
            "Madame, Monsieur,\n\n\n".
            
            
            "Je travaille actuellement au développement du site www.marseilleprovence.net.\n\n".
            
            "Celui-ci permettra l'accueil des touristes et nouveaux arrivants en leur présentant le territoire sous différents angles, avec notamment une interface ludique composée de critères de sélection autour des envies, des moyens, des déplacements… le tout accessible en plusieurs langues.\n\n".
            
            "Il existe ainsi une rubrique \"Sites naturels remarquables\", et à ce titre ".$textSite."\n\n".
            
            "Comme vous pouvez le voir sur les pièces jointes, chaque site se présentera sous la forme d'un texte et d'un visuel de présentation, d'un diaporama de photos, d'un plan d'accès accompagné de renseignements complémentaires…\n\n".
            
            "Ainsi, vous serait-il possible de m'envoyer, sous format numérique, les éléments de communication dont vous disposez , notamment :\n".
            "- texte de présentation (plusieurs langues possibles)\n".
            "- Photos libre de droit (avec les mentions légales)\n".
            "- Conditions et plans d'accès\n\n".
            
            "Je vous remercie par avance de l'attention que vous voudrez bien porter à ma demande, et dans l'attente, je vous prie de recevoir, Madame, Monsieur, mes très cordiales salutations.\n\n".
            
            "Xavier Andrèges\n".
            "xavier.andreges@yahoo.fr\n".
            "06 16 49 27 14\n\n";
            
            echo "</br></br>".$message_txt."</br></br>";
            
            
            //************
            
            $textSite = "";
            
        
            if (count($sitesArray) > 1)
            {
                $textSite = "les sites suivants seront représentés :</br>";
                
                foreach ($sitesArray as $site)
                {
                    $textSite.= "- ".$site."</br>";
                }
            }
            else
            {
                $textSite = "le site \"".$item['sitesNaturels']."\" sera représenté.</br>";
            }
            
            
            $message_html =
            "<html>".
            "<head>".
            "<title></title>".
            "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>".
            "</head>".
            "<body><table width=\"600px\">".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "A l'attention du chargé(e) de communication et/ou des relations presse</br></br></br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td>".
            
            "Madame, Monsieur,</br></br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Je travaille actuellement au développement du site www.marseilleprovence.net.</br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Celui-ci permettra l'accueil des touristes et nouveaux arrivants en leur présentant le territoire sous différents angles, avec notamment une interface ludique composée de critères de sélection autour des envies, des moyens, des déplacements… le tout accessible en plusieurs langues.</br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Il existe ainsi une rubrique \"Sites naturels remarquables\", et à ce titre<strong> ".$textSite."</strong> </br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Comme vous pouvez le voir sur les pièces jointes, chaque site se présentera sous la forme d'un texte et d'un visuel de présentation, d'un diaporama de photos, d'un plan d'accès accompagné de renseignements complémentaires…</br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Ainsi, vous serait-il possible de m'envoyer, sous format numérique, les éléments de communication dont vous disposez , notamment :</br>".
            "- texte de présentation (plusieurs langues possibles)</br>".
            "- Photos libre de droit (avec les mentions légales)</br>".
            "- Conditions et plans d'accès</br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Je vous remercie par avance de l'attention que vous voudrez bien porter à ma demande, et dans l'attente, je vous prie de recevoir, Madame, Monsieur, mes très cordiales salutations.</br></br>".
            
            "</td></tr>".
            "<tr width=\"600px\"><td width=\"600px\">".
            
            "Xavier Andrèges</br>".
            "andreges.xavier@wanadoo.fr</br>".
            "06 16 49 27 14</br></br>".
            
             "</td></tr></table>".
            
            "<table width=\"600px\">".
            
             "<tr width=\"600px\">".
            
            "<td>".
             "<img src=\"http://www.lajouquasse.fr/marseilleprovence/protoWeb/API/screen1.png\">".
            "</td>".
            
            "<td>".
             "<img src=\"http://www.lajouquasse.fr/marseilleprovence/protoWeb/API/screen2.png\">".
            "</td>".
            
            "<td>".
             "<img src=\"http://www.lajouquasse.fr/marseilleprovence/protoWeb/API/EmailReceived.php?title=docSitesNaturels&email=".$item['email']."\" WIDTH=\"1\" HEIGHT=\"1\" BORDER=\"0\">".
            "</td>".
            
            "</td></tr></table></body></html>";
            
            
            
            echo "</br></br>".$message_html."</br></br>";
            
            
            //*********************************   SEND MAIL  ***********************************
            
            
            //sendMailWithMessageTxtAndHtml ($message_txt, $message_html, $item['email'], $sujet);
            
        }
    }
}
catch( PDOException $e)
{
    echo $e -> getMessage();
}
?>