<?php    
    // Configuration des environnements
    $prod = FALSE;
    
    // Chemin vers le fichier de configuration
    $configPath = __DIR__ . '/config.php';
    
    // Vérification de l'existence du fichier de configuration
    if (!file_exists($configPath)) {
        die("Erreur : Le fichier de configuration n'existe pas");
    }
    
    // Chargement de la configuration
    $config = require_once $configPath;
    
    // Configuration de la base de données
    if ($prod == TRUE)
    {
        // Configuration pour l'environnement de production (OVH vers GCP)
        define( 'MYSQL_DSN',        sprintf('mysql:host=%s;dbname=%s;charset=%s;port=%s',
            $config['db']['host'],
            $config['db']['dbname'],
            $config['db']['charset'],
            $config['db']['port']
        ));
        define( 'MYSQL_USER',       $config['db']['user']);
        define( 'MYSQL_PASSWORD',   $config['db']['password']);
    }
    else
    {
        // Configuration pour l'environnement de développement local
        define( 'MYSQL_DSN',        'mysql:host=localhost;dbname=mp;charset=utf8mb4;port=8889');
        define( 'MYSQL_USER',       'root');
        define( 'MYSQL_PASSWORD',   'root');
    }
    
    // Gestion des erreurs de connexion
    try {
        $pdo = new PDO(MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
    } catch (PDOException $e) {
        // Log l'erreur mais ne l'affiche pas à l'utilisateur
        error_log("Erreur de connexion à la base de données : " . $e->getMessage());
        die("Une erreur est survenue lors de la connexion à la base de données.");
    }
    
    $tableArray = ["Index", "NoIdea", "BonsPlans", "Shopping", "Monuments", "ExpositionsMusees", "SitesNaturels", "PlageBaignadePiscine", "Randonnee", "Canyons", "SitesEscalade", "Slackline", "VieuxPortRD", "Petanque", "Sortir", "Restos", "Circuits", "Loisirs", "Dormir", "ChangeWorld"];
    
    $numIdRepNameArray = ["cirque14juillet", "espace361", "comedie1619", "3c"];
    
    $tableAvisArray = ["PlageBaignadePiscine", "Randonnee", "SitesNaturels", "Slackline", "ChangeWorld"];

?>