<?php
require_once 'mpIdentifier.php';

try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => true
    ];
    
    $pdo = new PDO(MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, $options);
    echo "Connexion à la base de données réussie !\n";
    echo "Version du serveur : " . $pdo->getAttribute(PDO::ATTR_SERVER_VERSION) . "\n";
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage() . "\n";
} 