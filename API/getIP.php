<?php
// Affiche l'adresse IP du serveur
echo "Adresse IP du serveur : " . $_SERVER['SERVER_ADDR'] . "\n";
echo "Adresse IP publique : " . file_get_contents('https://api.ipify.org') . "\n";
?> 