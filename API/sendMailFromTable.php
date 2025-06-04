<?php
    
    require ('mpIdentifier.php');
    require ('sendMail.php');
    
try {
    $PDOMySQL = new PDO( MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $PDOMySQL -> setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $mailToAvoid = array();
    
    //"info@ot-cassis.com", "infos@aixenprovencetourism.com", "tourismeciotat@wanadoo.fr", "info@marseille-tourisme.com", "tourisme@jouques.fr"
    
    $table = "Restaurants";
    
    //$table = "testMail";
    
    $sql = "select * from ".$table;
    
    //$sql = "select * from Guides WHERE mail like 'marseillecalanques@sfr.fr'";
    
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    
    echo "count : ".count($itemArray);
    
    //var_dump($itemArray);
    
    $numberMailSent = 0;
    
    // Campings : ok
    // Guides : ok
    // ChambreHote : ok
    // Hotels : ok
    // LocationDeVacancesClassees : ok
    // LocationVelo : ok
    // MoniteursEscalade : ok
    // OfficesTourisme : ok
    // ParcAccro : ok
    // ResidencesDeTourisme : ok
    // ResidencesHoteliere : ok
    // Restaurants :
    

    
    $limiteBasse = 1800;
    $limitehaute = 2000;
 
    for ($i = $limiteBasse; $i < $limitehaute && $i < count($itemArray); $i++)
    {
        
        if (in_array($itemArray[$i]['mail'], $mailToAvoid))
            continue;
        
        //=====Définition du sujet
        
        $sujet = "Application Marseille Provence - diffusion gratuite";
        
        //=====Définition du sujet
        
        $mail = str_replace(" ", ";", $itemArray[$i]['mail']);
        //$mail = "xavier.andreges@yahoo.fr;andreges.xavier@wanadoo.fr";
        
        //=====Déclaration des messages au format texte et au format HTML.
        
    
        $message_txt =
        "Bonjour,\n\n".
        
        "l'application Marseille Provence - Nature & Culture dans laquelle vous êtes référencé passe désormais en diffusion gratuite.\n\n".
        "Merci à toutes celles et ceux qui ont soutenu le projet lors de sa diffusion payante.\n\n".
        "L'application est aujourd'hui bien classée sur les différentes plateformes de téléchargement.\n\n".
        "Sur iPhone, elle se positionne comme le premier guide touristique marseillais et se situe dans le top 10 pour les mots clés 'Marseille' ou 'Provence'.\n\n".
        "Si vous souhaitez une mise en avant plus importante dans l'application, n'hésitez pas à prendre contact :\n".
        "contact@marseilleprovence.net\n\n".
        "Très cordialement\n\n".
        "Plus d’infos : http://www.marseilleprovence.net.\n\n".
        "Like FB : https://www.facebook.com/marseilleprovenceguide.\n\n".
        "L'appli sur App store : https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\n".
        "L'appli sur Google Play : https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\n";
        
        if ($i == 0)
            echo "</br></br>".$message_txt."</br></br>";
        
        
        //************
        

        $message_html =
        "<html>".
        "<head>".
        "<title></title>".
        "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>".
        "</head>".
        "<body>".
        "<table width=\"600px\">".

        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Bonjour,</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "l'application Marseille Provence - Nature & Culture dans laquelle vous êtes référencé passe désormais en diffusion gratuite.</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Merci à toutes celles et ceux qui ont soutenu le projet lors de sa diffusion payante.</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "L'application est aujourd'hui bien classée sur les différentes plateformes de téléchargement.</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Sur iPhone, elle se positionne comme le premier guide touristique marseillais et se situe dans le top 10 pour les mots clés 'Marseille' ou 'Provence'.</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Si vous souhaitez une mise en avant plus importante dans l'application, n'hésitez pas à prendre contact :<br>contact@marseilleprovence.net<br><br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Très cordialement</br></br>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Plus d’infos : <a href=\"http://www.marseilleprovence.net\" target=\"_blank\">".
        "www.marseilleprovence.net.</br></br>".
        "</a>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "Like FB : <a href=\"https://www.facebook.com/marseilleprovenceguide\" target=\"_blank\">".
        "https://www.facebook.com/marseilleprovenceguide.</br></br>".
        "</a>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\">".
        "L'appli sur App store".
        "</a>".
        
        "</td></tr>".
        
        "<tr width=\"600px\"><td width=\"600px\">".
        
        "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
        "L'appli sur Google Play".
        "</a>".
        
        "</td></tr>".
        
        /*
        "<tr width=\"600px\" height=\"100px\"><td width=\"600px\" height=\"100px\">".
        
        "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\" style=\"margin-right:40px;\">".
        "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/AppStore_en.png\" width=\"200\" />".
        "</a>".
        
        "</td></tr>".
        
        "<tr width=\"600px\" height=\"100px\"><td width=\"600px\" height=\"100px\">".
        
        "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
        "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/android_en.png\" width=\"200\" />".
        "</a>".
        
        "</td></tr>".
*/

        /*
        "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".
        
        "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_recto.jpg\">".
        
        "</td></tr>".

        
        "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".

         "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_verso.jpg\">".
        
        "</td></tr>".
        */
        
        "</table>".
        
        "</body></html>";
        
        
        if ($i == 0)
            echo "</br></br>".$message_html."</br></br>";
        
        
        //*********************************   SEND MAIL  ***********************************
        
        if ($mail != NULL && $mail != "")
        {
            $sentMail = sendMailWithMessageTxtAndHtml ($message_txt, $message_html, $mail, $sujet);
            //$sentMail = "mail";
            $numberMailSent++;
        }
        else
            $sentMail = "vide";
        
        echo ("</br>number ".$i. " : ".$mail." / sentMail : ".$sentMail);
        
        if ($i == ($limitehaute - 1) || $i == (count($itemArray) - 1))
        {
            echo "</br></br>DONE -> numberMailSent : ".$numberMailSent;
            
            $sentMail = sendMailWithMessageTxtAndHtml ($message_txt, $message_html, "xavier.andreges@yahoo.fr", $sujet." - $table $limiteBasse");
            echo ("</br>Vérif xavier.andreges@yahoo.fr / sentMail : ".$sentMail);
        }
    }
}
catch( PDOException $e)
{
    echo $e -> getMessage();
}
    
    
    // Campings : ok
    // Guides : ok
    // ChambreHote : ok
    // Hotel : ok -> 194 / 180
    // LocationDeVacancesClassees : ok -> 129 + 139 + 150 + 159 + 152 + 138
    // MoniteursEscalade : ok
    // ParcAccro : ok
    // LocationVelo : ok
    // ResidencesDeTourisme : ok
    // ResidencesHoteliere : ok
    // Restaurant : ok ->  85 + 110 + 108 + 114 + 114 + 120 + 106 + 111
    
    
    /*
    
    $message_txt =
    "Bonjour,\n\n".
    
    "je vous informe de la sortie d’une application mobile intitulée «Marseille Provence - Nature & Culture» dans laquelle votre structure est référencée.\n\n".
    "Disponible sur iOS et Android, elle propose des topos pour la randonnée, l’escalade et la descente de canyons.\n\n".
    "Elle fournit des idées de sorties touristiques et des bons plans la baignade, l'apéro, dîner, danser…\n\n".
    "Vous trouverez également des services en temps réel comme la disponibilité du Vélo ou l’accès aux massifs.\n\n".
    "Je vous invite à télécharger et tester l'application pour vous rendre compte des services qu'elle pourrait rendre à vos visiteurs.\n\n".
    "Au délà des informations touristique bien renseignées avec des fiches personnalisées et pratiques, le côté nature peut s'avérer très pertinent pour toutes demandes liées aux sites naturels ou de baignade et à la pratique de la randonnée, de l'escalade, du canyoning et de la pétanque.\n\n".
    "Je peux vous faire parvenir un code promo pour une installation sur iOS (iPhone, iPad, iPod) et ainsi que des flyers pour une diffusion dans vos locaux.\n\n".
    "Merci pour l'attention portée à ce projet.\n\n".
    "Dans l'attente des vos réactions.\n\n".
    "Très cordialement.\n\n".
    "Xavier Andrèges\n".
    "contact@marseilleprovence.net\n\n".
    "Plus d’infos : http://www.marseilleprovence.net.\n\n".
    "Like FB : https://www.facebook.com/marseilleprovenceguide.\n\n".
    "L'appli sur App store : https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\n".
    "L'appli sur Google Play : https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\n";
    
    if ($i == 0)
    echo "</br></br>".$message_txt."</br></br>";
    
    
    $message_html =
    "<html>".
    "<head>".
    "<title></title>".
    "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>".
    "</head>".
    "<body>".
    "<table width=\"600px\">".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Bonjour,</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "je vous informe de la sortie d’une application mobile intitulée «Marseille Provence, entre nature et culture» dans laquelle votre établissement est référencé.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Disponible sur iOS et Android, elle propose des topos pour la randonnée, l’escalade et la descente de canyons..</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Elle fournit des idées de sorties touristiques et des bons plans la baignade, l'apéro, dîner, danser….</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Vous trouverez également des services en temps réel comme la disponibilité du Vélo ou l’accès aux massifs.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Je vous invite à télécharger et tester l'application pour vous rendre compte des services qu'elle pourrait rendre à vos visiteurs.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Au délà des informations touristique bien renseignées avec des fiches personnalisées et pratiques, le côté nature peut s'avérer très pertinent pour toutes demandes liées aux sites naturels ou de baignade et à la pratique de la randonnée, de l'escalade, du canyoning et de la pétanque.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Je peux vous faire parvenir un code promo pour une installation sur iOS (iPhone, iPad, iPod) et ainsi que des flyers pour une diffusion dans vos locaux.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Merci pour l'attention portée à ce projet.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Dans l'attente des vos réactions.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Très cordialement.</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Xavier ANDREGES".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "contact@marseilleprovence.net / 06 16 49 27 14</br></br>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Plus d’infos : <a href=\"http://www.marseilleprovence.net\" target=\"_blank\">".
    "www.marseilleprovence.net.</br></br>".
    "</a>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "Like FB : <a href=\"https://www.facebook.com/marseilleprovenceguide\" target=\"_blank\">".
    "https://www.facebook.com/marseilleprovenceguide.</br></br>".
    "</a>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\">".
    "L'appli sur App store".
    "</a>".
    
    "</td></tr>".
    
    "<tr width=\"600px\"><td width=\"600px\">".
    
    "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
    "L'appli sur Google Play".
    "</a></br></br>".
    
    "</td></tr>".
    
    "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".
    
    "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_recto.jpg\">".
    
    "</td></tr>".
    
    "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".
    
    "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_verso.jpg\">".
    
    "</td></tr>".
    
    "</table>".
    
    "</body></html>";
    
    */
    
    
    
    //****************************** etablissement *************
    
    /*
     $message_txt =
     "Bonjour,\n\n".
     
     "je vous informe de la sortie d’une application mobile intitulée «Marseille Provence, entre nature et culture» dans laquelle votre établissement est référencé.\n\n".
     "Disponible sur iOS et Android, elle propose des topos pour la randonnée, l’escalade et la descente de canyons.\n\n".
     "Elle fournit des idées de sorties touristiques et des bons plans la baignade, l'apéro, dîner, danser…\n\n".
     "Vous trouverez également des services en temps réel comme la disponibilité du Vélo ou l’accès aux massifs.\n\n".
     "La prochaine mise à jour comportera un diaporama pour illustrer votre rubrique. Pour apparaître dessus, vous pouvez me faire parvenir des photos libres de droit.\n\n".
     "Et si vous trouvez le projet intéressant, n'hésitez pas à le faire savoir sur votre site, votre compte Twitter ou votre page facebook.\n\n".
     "Plus d’infos : http://www.marseilleprovence.net.\n\n".
     "Like FB : https://www.facebook.com/marseilleprovenceguide.\n\n".
     "Merci par avance.\n\n".
     "Très cordialement.\n\n".
     "Xavier Andrèges\n".
     "contact@marseilleprovence.net\n\n".
     "NB: il existe des flyers présentant les services rendus par l’appli, je peux vous en envoyer sur demande.\n\n".
     "L'appli sur App store : https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\n".
     "L'appli sur Google Play : https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\n";
     
     if ($i == 0)
     echo "</br></br>".$message_txt."</br></br>";
     
     
     //************
     
     
     $message_html =
     "<html>".
     "<head>".
     "<title></title>".
     "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>".
     "</head>".
     "<body>".
     "<table width=\"600px\">".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Bonjour,</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "je vous informe de la sortie d’une application mobile intitulée «Marseille Provence, entre nature et culture» dans laquelle votre établissement est référencé.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Disponible sur iOS et Android, elle propose des topos pour la randonnée, l’escalade et la descente de canyons..</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Elle fournit des idées de sorties touristiques et des bons plans la baignade, l'apéro, dîner, danser….</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Vous trouverez également des services en temps réel comme la disponibilité du Vélo ou l’accès aux massifs.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "La prochaine mise à jour comportera un diaporama pour illustrer votre rubrique. Pour apparaître dessus, vous pouvez me faire parvenir des photos libres de droit..</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Et si vous trouvez le projet intéressant, n'hésitez pas à le faire savoir sur votre site, votre compte Twitter ou votre page facebook.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Plus d’infos : <a href=\"http://www.marseilleprovence.net\" target=\"_blank\">".
     "www.marseilleprovence.net.</br></br>".
     "</a>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Like FB : <a href=\"https://www.facebook.com/marseilleprovenceguide\" target=\"_blank\">".
     "https://www.facebook.com/marseilleprovenceguide.</br></br>".
     "</a>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Merci par avance.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Très cordialement.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Xavier ANDREGES".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "contact@marseilleprovence.net</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "NB : il existe des flyers présentant les services rendus par l’appli, je peux vous en envoyer sur demande.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\">".
     "L'appli sur App store".
     "</a>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
     "L'appli sur Google Play".
     "</a></br></br>".
     
     "</td></tr>".
    
    "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".
    
    "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_recto.jpg\">".
    
    "</td></tr>".
    
    "<tr width=\"480px\" height=\"720px\"><td width=\"480px\" height=\"720px\">".
    
    "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_verso.jpg\">".
    
    "</td></tr>".
    
    "</table>".
    
    "</body></html>";
*/
    
    
    
    /* ****************** MoniteursEscalade **************************
     
     $message_txt =
     "Bonjour,\n\n".
     
     
     "je souhaitais vous informer de la sortie d’une application mobile intitulée « Marseille Provence, entre nature et culture » dans laquelle vous êtes référencés, sous la rubrique «Marcher et Grimper».\n\n".
     "Disponible sur iOS et Android, l’application propose des topos pour la randonnée, l’escalade et la descente de canyons, ainsi que des services pratiques comme l’accès aux massifs ou les cartes hors connexion.\n\n".
     "Niveau culture, l’application passe en revue le patrimoine de la Capitale Européenne de la Culture 2013 et fournit des bons plans pour profiter au mieux de l’été.\n\n".
     " L’application peut s’avérer très utile pour vos clients, et peut-être même pour vous.\n".
     "Vous trouverez plus d’infos sur le site http://www.marseilleprovence.net.\n\n".
     "Il existe des flyers présentant les services rendus par l’appli, je peux vous en faire parvenir.\n\n".
     "Par ailleurs, la prochaine mise à jour comportera un diaporama de photos à la rubrique «Marcher et Grimper».\n\n".
     "Vous pouvez me faire parvenir des visuels libres de droit si vous souhaitez apparaître dans ce diaporama, visuels que je pourrais également utiliser pour mieux vous présenter.\n\n".
     "Je vous remercie de l’attention portée à ce projet, et dans l’attente de vos retours, je vous prie d’agréer mes plus cordiales salutations.\n\n".
     "Xavier Andrèges\n".
     "contact@marseilleprovence.net\n\n".
     "L'appli sur App store : https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\n".
     "L'appli sur Google Play : https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\n";
     
     echo "</br></br>".$message_txt."</br></br>";
     
     
     //************
     
     
     $message_html =
     "<html>".
     "<head>".
     "<title></title>".
     "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>".
     "</head>".
     "<body>".
     "<table width=\"600px\">".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Bonjour,</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "je souhaitais vous informer de la sortie d’une application mobile intitulée «Marseille Provence, entre nature et culture» dans laquelle vous êtes référencés, sous la rubrique «Marcher et Grimper».</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Disponible sur iOS et Android, l’application propose des topos pour la randonnée, l’escalade et la descente de canyons, ainsi que des services pratiques comme l’accès aux massifs ou les cartes hors connexion.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Niveau culture, l’application passe en revue le patrimoine de la Capitale Européenne de la Culture 2013 et fournit des bons plans pour profiter au mieux de l’été.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "L’application peut s’avérer très utile pour vos clients, et peut-être même pour vous.</br>Vous trouverez plus d’infos sur le site <a href=\"http://www.marseilleprovence.net\" target=\"_blank\">".
     "www.marseilleprovence.net.</br></br>".
     "</a>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Il existe des flyers comme celui en pièce jointe, je peux vous en faire parvenir.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Par ailleurs, la prochaine mise à jour comportera un diaporama de photos à la rubrique «Marcher et Grimper».Vous pouvez me faire parvenir des visuels libres de droit si vous souhaitez apparaître dans ce diaporama, visuels que je pourrais également utiliser pour mieux vous présenter.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Je vous remercie de l’attention portée à ce projet, et dans l’attente de vos retours, je vous prie d’agréer mes plus cordiales salutations.</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "Xavier ANDREGES</br></br>".
     "contact@marseilleprovence.net</br></br>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\">".
     "L'appli sur App store</br></br>".
     "</a>".
     
     "</td></tr>".
     
     "<tr width=\"600px\"><td width=\"600px\">".
     
     "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
     "L'appli sur Google Play</br></br>".
     "</a>".
     
     "</td></tr>".
     
     
     "</table>".
     
     "<table width=\"480px\">".
     
     "<tr width=\"480px\">".
     
     "<br><br>".
     "<a href=\"https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8\" target=\"_blank\" style=\"margin-right:40px;\">".
     "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/AppStore_en.png\" width=\"200\" />".
     "</a>".
     
     "<a href=\"https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence\" target=\"_blank\">".
     "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/android_en.png\" width=\"200\" />".
     "</a>".
     
     "</br></br>".
     
     "<td>".
     "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_recto.jpg\">".
     "</td>".
     
     "<br><br>".
     
     "<td>".
     "<img src=\"http://www.lajouquasse.fr/marseilleprovence/AssetsWeb/Fly_verso.jpg\">".
     "</td>".
     
     "</td></tr></table></body></html>";
     
     
     
     echo "</br></br>".$message_htm
     
     */
    
?>


