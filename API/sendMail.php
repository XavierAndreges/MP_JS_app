<?php
    
    //toto
    //header('Access-Control-Allow-Origin: *');

/*
if (isset($_POST['idRepName']))
        $val = "oui";
else
    $val = "non";
    
    echo "is POST : ".$val;
 
 http://localhost:8888/mp/API/sendMail.php?table=Randonnee&idRepName=skiRandoLure

*/

    if (isset($_POST['idRepName']))
    {
        $link = 'http://www.lajouquasse.fr/marseilleprovence/API/getAvis.php?table='.$_POST['table'].'&idRepName='.$_POST['idRepName'].'&date='.$_POST['dateForm'];
        
        $linkPause = $link.'&moderation=0';
        
        $linkDelete = $link.'&moderation=-1';
        
        $myMessage_html = "Table : ".$_POST['table']." / name : ".$_POST['idRepName']." / date : ".$_POST['date']." / pseudo : ".$_POST['pseudo'].
        "<br><br>Commentaire: ".$_POST['observation'].
        "<br><br><br><br><a href=".$linkPause." target=\"_blank\">Suspendre cet avis</a>".
        "<br><br><br><br><a href=".$linkDelete." target=\"_blank\">Supprimer cet avis</a>";
        
        $myMessage_txt = "Table : ".$_POST['table']." / name : ".$_POST['idRepName']." / date : ".$_POST['date']." / pseudo : ".$_POST['pseudo'].
        "\n\nCommentaire : ".$_POST['observation'].
        "\n\n\n\n Suspendre cet avis : ".$linkPause.
        "\n\n\n\n Supprimer cet avis : ".$linkDelete;
        
        echo 'sendMail message : '.$message;
        
        $sent = sendMailWithMessageTxtAndHtml ($myMessage_txt, $myMessage_html, 'xavier.andreges@yahoo.fr', 'Moderation observation');
        
        echo '<br><br>sendMail End : '.$sent;
    }
    else
    if (isset($_POST['plantageVeloMPM']))
    {
        $sent = sendMailWithMessageTxtAndHtml ("zut alors !", "zut alors !", 'xavier.andreges@yahoo.fr', 'Plantage Velo MPM');
        
        echo '<br><br>sendMail End : '.$sent;
    }
    
        
function sendMailWithMessageTxtAndHtml ($message_txt, $message_html, $mail, $sujet)
{
            
    //*********************************   BETTER WAY ***********************************
    
    //$lFromMail = 'xavier@c4ms-mac-mini.c4mprod.com';
    $lFromMail = 'marseillhb@60gp.ovh.net';
    
    $lReplyTomail = 'xavier.andreges@yahoo.fr'; // Déclaration de l'adresse de destination.
    
    //$mail = 'xavier.andreges@c4mprod.com';
    //$mail = 'andreges.xavier@wanadoo.fr';
    
    
    if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) // On filtre les serveurs qui rencontrent des bogues.
    {
        $passage_ligne = "\r\n";
    }
    else
    {
        $passage_ligne = "\n";
    }
    
    
    //=====Création de la boundary
    $boundary = "-----=".md5(rand());
    //==========
    
    
    //=====Création du header de l'e-mail.
    $header = "From: \"XA\"<".$lFromMail.">".$passage_ligne;
    $header.= "Reply-to: \"XA\"<".$lReplyTomail.">".$passage_ligne;
    
    //$header.= "Disposition-Notification-To: \"XA\"<".$lReplyTomail.">".$passage_ligne;
    //$header.= "Return-receipt-to: \"XA\"<".$lReplyTomail.">".$passage_ligne;
    //$header.= "X-Confirm-Reading-To: \"XA\"<".$lReplyTomail.">".$passage_ligne;
    
    $header.= "MIME-Version: 1.0".$passage_ligne;    
    //$header.= "Content-type:text/html; charset=utf-8".$passage_ligne;
    $header.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
    //==========
    
    //=====Création du message.
    $message = $passage_ligne."--".$boundary.$passage_ligne;
    
    //=====Ajout du message au format HTML

    $message.= "Content-Type: text/html; charset=UTF-8".$passage_ligne;
    $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
    $message.= $passage_ligne.$message_html.$passage_ligne;

    
    //==========
    $message.= $passage_ligne."--".$boundary.$passage_ligne;

    //=====Ajout du message au format texte.

    $message.= "Content-Type: text/plain; charset=\"UTF-8\"".$passage_ligne;
    $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
    $message.= $passage_ligne.$message_txt.$passage_ligne;

    
    //==========
    $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
    $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
    
    //==========
    
    //=====Envoi de l'e-mail.
    return mail($mail, $sujet, $message, $header, $sujet);
    
    //mail('andreges.xavier@wanadoo.fr', $sujet,$message_txt,$header);
    //==========
    

    
    //============================================================
    
    // SMALL WAY
    
    //$message = "Line 1\nLine 2\nLine 3";
    
    // In case any of our lines are larger than 70 characters, we should use wordwrap()
    //$message = wordwrap($message_html, 70);
    
    // Send
    //mail('xavier.andreges@c4mprod.com; andreges.xavier@wanadoo.fr', 'RCToulon 83', $message, $header);
    //mail('andreges.xavier@wanadoo.fr', 'RCToulon 68',  $message, $header);
    
    //========================================



}
    
?>