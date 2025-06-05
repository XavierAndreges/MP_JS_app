<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set up error logging
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/error.log');

// Function to log errors
function logError($message, $error = null) {
    $logMessage = date('Y-m-d H:i:s') . " - " . $message;
    if ($error) {
        $logMessage .= " - Error: " . $error->getMessage();
    }
    error_log($logMessage);
}

// Check if required files exist
$requiredFiles = ['mpIdentifier.php', 'closeLinkArray.php', 'getDiapoHomeArray.php', 'getOrdersList.php'];
foreach ($requiredFiles as $file) {
    if (!file_exists($file)) {
        logError("Required file missing: " . $file);
        header('HTTP/1.1 500 Internal Server Error');
        die('Required file missing: ' . $file);
    }
}

// Load required files
try {
    require ('mpIdentifier.php');
    require ('closeLinkArray.php');
    require ('getDiapoHomeArray.php');
    require ('getOrdersList.php');
} catch (Exception $e) {
    logError("Error loading required files", $e);
    header('HTTP/1.1 500 Internal Server Error');
    die('Error loading required files');
}

header('Content-type: application/javascript');
header('Access-Control-Allow-Origin: *');

try {
    // Validate required GET parameters
    if (!isset($_GET['version'])) {
        logError("Missing required parameter: version");
        header('HTTP/1.1 400 Bad Request');
        die('Missing required parameter: version');
    }

    if (!isset($_GET['versionItemsToPush'])) {
        logError("Missing required parameter: versionItemsToPush");
        header('HTTP/1.1 400 Bad Request');
        die('Missing required parameter: versionItemsToPush');
    }

    // Validate database connection parameters
    if (!defined('MYSQL_DSN') || !defined('MYSQL_USER') || !defined('MYSQL_PASSWORD')) {
        logError("Database configuration missing");
        header('HTTP/1.1 500 Internal Server Error');
        die('Database configuration error');
    }

    $PDOMySQL = new PDO(MYSQL_DSN, MYSQL_USER, MYSQL_PASSWORD, array(
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ));

    global $versionItemsToPush;
    global $version;
    
    /*
    $url = "http://www.marseilleprovence.net";
    $smallSize = "160";
    $mediumSize = "320";
    
    $pictures = array();
     */
    
    //init version - dont't change
    $version = 1.2;
    
    if (isset($_GET['version']))
        $version = (float) $_GET['version'];

    //************
    
    $update = array();
    
    $update['version'] = 2.0;
    
    $update['title_fr'] = "Nouvelle version 2.0 disponible";
    $update['title_en'] = "New version 2.0 available";


    $update['message_fr'] = "Nouvelles fonctionnalités, nouveau design !<br>La mise à jour sera nécessaire pour continuer à recevoir tous les nouveaux articles.<br>Soutaitez-vous l'installer maintenant ?";
    $update['message_en'] = "New features, new design !<br> The update ot the app will be necessary to keep receiving all the new articles.<br>Do you want to install it now?";
    
    $update['itemsToPush'] = getItemsToUpdateByVersion($PDOMySQL, $version);
        
    $update['versionItemsToPush'] = $versionItemsToPush;
    
    $update['orderItemsArray'] = getOrderItemsArray($version);
    
    $update['closeLinkArray'] = $closeLinkArray;
    
    
    if ($version >= 2)
    {
        if (count(getDiapoHomeArray()) > 0)
            $update['diapoHomeArray'] = getDiapoHomeArray();
        
        if (count(getItemsHomeArray()) > 0)
            $update['itemsHomeArray'] = getItemsHomeArray();
        
        if (count(getClassics()) > 0)
            $update['classicsArray'] = getClassics();
        
        if (count(getFavorites()) > 0)
            $update['favoritesArray'] = getFavorites();
        
        if (count(getBestViews()) > 0)
            $update['bestViewsArray'] = getBestViews();
        
        if (count(getItemsToDelete()) > 0)
            $update['itemsToDelete'] = getItemsToDelete();
        
        if (count(getOrderListArray()) > 0)
            $update['orderListArray'] = getOrderListArray();
    }
    else
    {
        $update['diapoHomeArray1'] = getDiapoHomeArray1();
        
        $update['diapoHomeArray2'] = getDiapoHomeArray2();
        
        $update['diapoHomeArray3'] = getDiapoHomeArray3();
        
        $update['myRestoArray'] = getRestosArray();
    }

    echo 'var updateData = '.json_encode($update).';';
    
} catch (PDOException $e) {
    logError("Database error", $e);
    header('HTTP/1.1 500 Internal Server Error');
    die('Database error occurred');
} catch (Exception $e) {
    logError("General error", $e);
    header('HTTP/1.1 500 Internal Server Error');
    die('An error occurred');
}


function getItemsToUpdateByVersion($PDOMySQL, $version)
{
    global $versionItemsToPush;
    
    $listOfUpdateItems = array();
    
    //echo 'version : '.$version.'<br/>';
    
    $updateItems0 = array(getItem($PDOMySQL, "PlageBaignadePiscine", "plageLegionnaire"),
                          getItem($PDOMySQL, "PlageBaignadePiscine", "plageLaRedonne"),
                          getItem($PDOMySQL, "BonsPlans", "partDesAnges"),
                          getItem($PDOMySQL, "ExpositionsMusees", "galerieSaintLaurent"),
                          getItem($PDOMySQL, "SitesNaturels", "niolon"));
    
    
    $updateItems1 = array(getItem($PDOMySQL, "PlageBaignadePiscine", "lacPeirou"),
                          getItem($PDOMySQL, "Monuments", "glanum"),
                          getItem($PDOMySQL, "PlageBaignadePiscine", "lacVinsSurCaramy"),
                          getItem($PDOMySQL, "SitesNaturels", "portRedonne"),
                          getItem($PDOMySQL, "PlageBaignadePiscine", "plageDuMonaco"),
                          getItem($PDOMySQL, "PlageBaignadePiscine", "plagePiemanson"));
    
    $updateItems2 = array(getItem($PDOMySQL, "Canyons", "cuvesDestel"),
                          getItem($PDOMySQL, "Canyons", "pirates"));
    
    
    $updateItems3 = array(getItem($PDOMySQL, "SitesNaturels", "belvedereOppedette"),
                          getItem($PDOMySQL, "Canyons", "cascadeMontaud"),
                          getItem($PDOMySQL, "SitesNaturels", "colorado"),
                          getItem($PDOMySQL, "Canyons", "ravinBalene"),
                          getItem($PDOMySQL, "SitesNaturels", "vallonSourn"),
                          getItem($PDOMySQL, "Randonnee", "extremeBecSormiou"),
                          getItem($PDOMySQL, "SitesEscalade", "corrensChateauvert"));
    
    $updateItems4 = array(getItem($PDOMySQL, "ExpositionsMusees", "galerieBaumes"),
                          getItem($PDOMySQL, "BonsPlans", "baumes"));
    
    $updateItems5 = array(getItem($PDOMySQL, "Randonnee", "jouquesVillage"),
                          getItem($PDOMySQL, "Monuments", "moulinStVincent"));
    
    $updateItems6 = array(getItem($PDOMySQL, "Canyons", "cascadeSillans"),
                          getItem($PDOMySQL, "SitesNaturels", "sillansLaCascade"));
    
    $updateItems7 = array(getItem($PDOMySQL, "ExpositionsMusees", "beauxArtsMarseille"),
                          getItem($PDOMySQL, "BonsPlans", "realPlantain"),
                          getItem($PDOMySQL, "ExpositionsMusees", "pavillonVendome"),
                          getItem($PDOMySQL, "Canyons", "bramefan"));
    
    
    $updateItems8 = array(getItem($PDOMySQL, "Canyons", "mainmorte"),
                          getItem($PDOMySQL, "BonsPlans", "velosEnVille"));

    $updateItems9 = array(getItem($PDOMySQL, "BonsPlans", "barMarine"),
                          getItem($PDOMySQL, "BonsPlans", "clanCigales"),
                          getItem($PDOMySQL, "BonsPlans", "poteriePeyrolles"),
                          getItem($PDOMySQL, "BonsPlans", "vignelaure"));

    $updateItems10 = array(getItem($PDOMySQL, "BonsPlans", "vignelaure"));
    
    $updateItems11 = array(getItem($PDOMySQL, "SitesEscalade", "escampons"));
    
    $updateItems12 = array(getItem($PDOMySQL, "BonsPlans", "clubHouse"),
                           getItem($PDOMySQL, "Monuments", "artRevolution"));
    
    $updateItems13 = array(getItem($PDOMySQL, "BonsPlans", "snorkelingDune"),
                           getItem($PDOMySQL, "SitesEscalade", "lePrado"));
    
    $updateItems14 = array(getItem($PDOMySQL, "BonsPlans", "clanCigales"));
    
    $updateItems15 = array(getItem($PDOMySQL, "BonsPlans", "auPetitQuartDheure"));
    
    $updateItems16 = array(getItem($PDOMySQL, "BonsPlans", "bonneSaison"),
                          getItem($PDOMySQL, "Restos", "bistroVenitien"),
                          getItem($PDOMySQL, "Restos", "espritViolette"),
                          getItem($PDOMySQL, "Restos", "grandBarGoudes"));
    
    $updateItems17 = array(getItem($PDOMySQL, "BonsPlans", "aspttVoile"),
                           getItem($PDOMySQL, "BonsPlans", "pastreAventure"),
                           getItem($PDOMySQL, "Monuments", "rueArc"),
                           getItem($PDOMySQL, "Sortir", "demoisellesDuCinq"));
    
    $updateItems18 = array(getItem($PDOMySQL, "Restos", "bistroVenitien"),
                           getItem($PDOMySQL, "Restos", "jacquouLeCroquant"));
    
    $updateItems19 = array(getItem($PDOMySQL, "BonsPlans", "glissePourTous"),
                           getItem($PDOMySQL, "Sortir", "3c"));
    
    $updateItems20 = array(getItem($PDOMySQL, "BonsPlans", "rueStFerreol"),
                           getItem($PDOMySQL, "SitesNaturels", "plongeeLaVesse"),
                           getItem($PDOMySQL, "SitesNaturels", "terrainDesPeintres"));
    
    $updateItems21 = array(getItem($PDOMySQL, "BonsPlans", "fietje"),
                           getItem($PDOMySQL, "ExpositionsMusees", "atelierCezanne"),
                           getItem($PDOMySQL, "Monuments", "josephSec"),
                           getItem($PDOMySQL, "Monuments", "promenadeTorse"),
                           getItem($PDOMySQL, "Restos", "longchampsPalace"),
                           getItem($PDOMySQL, "SitesNaturels", "roquesHautes"));
    
    $updateItems22 = array(getItem($PDOMySQL, "BonsPlans", "indianForestAix"),
                           getItem($PDOMySQL, "Monuments", "fontainePlaceAlbertas"),
                           getItem($PDOMySQL, "Randonnee", "morgiouCretes"),
                           getItem($PDOMySQL, "Randonnee", "sormiouCretes"),
                           getItem($PDOMySQL, "SitesEscalade", "altissimo"),
                           getItem($PDOMySQL, "SitesEscalade", "DallesLuiDai"));
    
    $updateItems23 = array(getItem($PDOMySQL, "BonsPlans", "pierreClarac"),
                           getItem($PDOMySQL, "BonsPlans", "massageEtSens"),
                           getItem($PDOMySQL, "ExpositionsMusees", "espace361"),
                           getItem($PDOMySQL, "Sortir", "livingArts"));
    
    $updateItems24 = array(getItem($PDOMySQL, "Restos", "clanCigales"));
    
    $updateItems25 = array(getItem($PDOMySQL, "BonsPlans", "cieMarseillaise"),
                           getItem($PDOMySQL, "BonsPlans", "hotelDuSud"),
                           getItem($PDOMySQL, "BonsPlans", "proxipousse"),
                           getItem($PDOMySQL, "BonsPlans", "PSMaix"),
                           getItem($PDOMySQL, "BonsPlans", "raskassKayak"),
                           getItem($PDOMySQL, "Restos", "trottoirsMarseillais"),
                           getItem($PDOMySQL, "Randonnee", "BimontRoquesHautes"),
                           getItem($PDOMySQL, "Randonnee", "calanqueMarseilleVeyre"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "lacPeyrolles"));
    
    $updateItems26 = array(getItem($PDOMySQL, "BonsPlans", "cieMarseillaise"));
    
    //********************* 1.4 ************************
    
    $updateItems27 = array(getItem($PDOMySQL, "SitesNaturels", "grotteEmigres"),
                           getItem($PDOMySQL, "Loisirs", "rochersEscaladePrado"),
                           getItem($PDOMySQL, "Loisirs", "skiLugeLure"),
                           getItem($PDOMySQL, "Loisirs", "sangleDessusDessous"),
                           getItem($PDOMySQL, "Loisirs", "skateParkPrado"),
                           getItem($PDOMySQL, "Randonnee", "skiRandoLure"),
                           getItem($PDOMySQL, "Randonnee", "candelleOeilDeVerre"),
                           getItem($PDOMySQL, "Restos", "maisonRaviolis"),
                           getItem($PDOMySQL, "Shopping", "descenteAccoules"),
                           getItem($PDOMySQL, "Dormir", "hotelPeron"),
                           getItem($PDOMySQL, "Dormir", "hotelMistral"),
                           getItem($PDOMySQL, "Monuments", "egliseSaintEspritAix"),
                           getItem($PDOMySQL, "Monuments", "secondeNatureDock"),
                           getItem($PDOMySQL, "Monuments", "mucemArchitecture"),
                           getItem($PDOMySQL, "Monuments", "mazarinQuatreDauphins"),
                           getItem($PDOMySQL, "Monuments", "murVegetalAix"),);
    
    $updateItems28 = array(getItem($PDOMySQL, "Circuits", "panierCircuit"));
    
    $updateItems29 = array(getItem($PDOMySQL, "Monuments", "conservatoireDariusMilhaud"),
                           getItem($PDOMySQL, "Sortir", "embobineuse"),
                           getItem($PDOMySQL, "Circuits", "aixCentreCircuit"),
                           getItem($PDOMySQL, "Restos", "maisonRaviolis"),
                           getItem($PDOMySQL, "Shopping", "cieMarseillaise"),
                           getItem($PDOMySQL, "Loisirs", "glissePourTous"));
    
    $updateItems30 = array(getItem($PDOMySQL, "Circuits", "aixCentreCircuit"),
                           getItem($PDOMySQL, "Dormir", "hotelMarseille"),
                           getItem($PDOMySQL, "Monuments", "rotondeCoursMirabeau"),
                           getItem($PDOMySQL, "Restos", "laCita"),
                           getItem($PDOMySQL, "Restos", "laPause"),
                           getItem($PDOMySQL, "Randonnee", "capCanailleCassisLaCiotat"),
                           getItem($PDOMySQL, "Sortir", "babelMed"),
                           getItem($PDOMySQL, "Sortir", "hotelGallifetConcert"),);
    
    $updateItems31 = array(getItem($PDOMySQL, "Circuits", "vieuxPortJolietteCircuit"));
    
    $updateItems32 = array(getItem($PDOMySQL, "Loisirs", "poneysCie"),
                           getItem($PDOMySQL, "Loisirs", "altissimoPortesOuvertes"));
    
    $updateItems33 = array(getItem($PDOMySQL, "Shopping", "descenteAccoules"));
    
    $updateItems34 = array(getItem($PDOMySQL, "Restos", "barTreizeCoins"),
                           getItem($PDOMySQL, "Dormir", "hotelLutetia"),
                           getItem($PDOMySQL, "Dormir", "aubergeBonneveine"));
    
    $updateItems35 = array(getItem($PDOMySQL, "Loisirs", "poneysCie"));
    
    $updateItems36 = array(getItem($PDOMySQL, "Monuments", "graffsCoursJu"),
                           getItem($PDOMySQL, "Monuments", "Jouques"),
                           getItem($PDOMySQL, "Circuits", "laPlaineCircuit"),
                           getItem($PDOMySQL, "Circuits", "panierCircuit"),
                           getItem($PDOMySQL, "Circuits", "routeDesVinsJouques"));
    
    $updateItems37 = array(getItem($PDOMySQL, "Restos", "auBordDeLeau"),
                           getItem($PDOMySQL, "Shopping", "gahliaNoir"),
                           getItem($PDOMySQL, "Shopping", "farafiArtisanat"),
                           getItem($PDOMySQL, "ExpositionsMusees", "farafi"),
                           getItem($PDOMySQL, "SitesNaturels", "plongeeMugel"),
                           getItem($PDOMySQL, "Monuments", "hotelDeVilleAix"),
                           getItem($PDOMySQL, "Sortir", "scatClub"),
                           getItem($PDOMySQL, "Circuits", "panierCircuit"),
                           getItem($PDOMySQL, "Circuits", "aixCentreCircuit"));
    
    $updateItems38 = array(getItem($PDOMySQL, "Restos", "marseilleEnFace"),
                           getItem($PDOMySQL, "Shopping", "licorneRiveGauche"),
                           getItem($PDOMySQL, "Loisirs", "glissePourTous"),
                           getItem($PDOMySQL, "SitesNaturels", "ilesDuFrioul"),
                           getItem($PDOMySQL, "Monuments", "chateauIf"),
                           getItem($PDOMySQL, "Circuits", "laPlaineCircuit"),
                           getItem($PDOMySQL, "Circuits", "vieuxPortRiveGaucheCircuit"));
    
    $updateItems39 = array(getItem($PDOMySQL, "Shopping", "domaineStBacchi"),
                           getItem($PDOMySQL, "BonsPlans", "receptionStBacchi"),
                           getItem($PDOMySQL, "Shopping", "poteriePeyrolles"),
                           getItem($PDOMySQL, "Circuits", "routeDesVinsJouques"));
    
    $updateItems39 = array(getItem($PDOMySQL, "Shopping", "domaineStBacchi"),
                           getItem($PDOMySQL, "BonsPlans", "receptionStBacchi"),
                           getItem($PDOMySQL, "Shopping", "poteriePeyrolles"),
                           getItem($PDOMySQL, "Circuits", "routeDesVinsJouques"));
    
    $updateItems40 = array(getItem($PDOMySQL, "BonsPlans", "savonnerieLicorne"));
    
    $updateItems41 = array(getItem($PDOMySQL, "BonsPlans", "receptionStBacchi"));
    
    $updateItems42 = array(getItem($PDOMySQL, "Monuments", "palaisPharo"),
                           getItem($PDOMySQL, "Monuments", "abbayeVictor"),
                           getItem($PDOMySQL, "Monuments", "leCorbusier"),
                           getItem($PDOMySQL, "Sortir", "fricheToitTerrasse"));
    
    
    $updateItems43 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"));
    
    $updateItems44 = array(getItem($PDOMySQL, "Sortir", "charlieJazz"));
    
    $updateItems45 = array(getItem($PDOMySQL, "Sortir", "deltaFestival"),
                           getItem($PDOMySQL, "Sortir", "mimiFestival"));
    
    $updateItems46 = array(getItem($PDOMySQL, "Sortir", "borderlineAperoBateau"),
                           getItem($PDOMySQL, "Sortir", "borderlineChassolHusbands"),
                           getItem($PDOMySQL, "Sortir", "jazzCinqContinents"),
                           getItem($PDOMySQL, "Sortir", "marseilleRockIsland"),
                           getItem($PDOMySQL, "Sortir", "kisskissAgenda"),
                           getItem($PDOMySQL, "Sortir", "deltaFestival"));
    
    $updateItems47 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"));
    
    $updateItems48 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"),
                           getItem($PDOMySQL, "Shopping", "poteriePeyrolles"),
                           getItem($PDOMySQL, "Circuits", "routeDesVinsJouques"));
    
    $updateItems40 = array(getItem($PDOMySQL, "BonsPlans", "savonnerieLicorne"));
    
    $updateItems41 = array(getItem($PDOMySQL, "BonsPlans", "receptionStBacchi"));
    
    $updateItems42 = array(getItem($PDOMySQL, "Monuments", "palaisPharo"),
                           getItem($PDOMySQL, "Monuments", "abbayeVictor"),
                           getItem($PDOMySQL, "Monuments", "leCorbusier"),
                           getItem($PDOMySQL, "Sortir", "fricheToitTerrasse"));
    
    
    $updateItems43 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"));
    
    $updateItems44 = array(getItem($PDOMySQL, "Sortir", "charlieJazz"));
    
    $updateItems45 = array(getItem($PDOMySQL, "Sortir", "deltaFestival"),
                           getItem($PDOMySQL, "Sortir", "mimiFestival"));
    
    $updateItems46 = array(getItem($PDOMySQL, "Sortir", "borderlineAperoBateau"),
                           getItem($PDOMySQL, "Sortir", "borderlineChassolHusbands"),
                           getItem($PDOMySQL, "Sortir", "jazzCinqContinents"),
                           getItem($PDOMySQL, "Sortir", "marseilleRockIsland"),
                           getItem($PDOMySQL, "Sortir", "kisskissAgenda"),
                           getItem($PDOMySQL, "Sortir", "deltaFestival"));
    
    $updateItems47 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"));
    
    $updateItems48 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"),
                           getItem($PDOMySQL, "Shopping", "royaumePoterie"));
    
    $updateItems49 = array(getItem($PDOMySQL, "Shopping", "lesBaigneuses"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "abricotierPlage"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "baieDesSinges"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "eauxSalees"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "leRouet"));
    
    $updateItems50 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"));
    
    $updateItems51 = array(getItem($PDOMySQL, "Sortir", "kisskissAgenda"),
                           getItem($PDOMySQL, "Sortir", "whiteRabbit"));
    
    $updateItems52 = array(getItem($PDOMySQL, "PlageBaignadePiscine", "plageBestouan"),
                           getItem($PDOMySQL, "Monuments", "egliseStLaurent"),
                           getItem($PDOMySQL, "Monuments", "notreDameAllauch"),
                           getItem($PDOMySQL, "SitesNaturels", "capCouronne"),
                           getItem($PDOMySQL, "SitesNaturels", "tableOrientationMeyrargues"));
    
    $updateItems53 = array(getItem($PDOMySQL, "Sortir", "jardinsSuspendusRooftop"),
                           getItem($PDOMySQL, "Sortir", "docksSummerParty"),
                           getItem($PDOMySQL, "BonsPlans", "stadeVelodromeOT"),
                           getItem($PDOMySQL, "Loisirs", "trolib"));
    
    $updateItems54 = array(getItem($PDOMySQL, "Sortir", "cabaretAleatoire"),
                           getItem($PDOMySQL, "Sortir", "hotelGallifetConcert"),
                           getItem($PDOMySQL, "Sortir", "planBmucem"),
                           getItem($PDOMySQL, "SitesNaturels", "grotteCallelongue"),
                           getItem($PDOMySQL, "SitesNaturels", "plongeeMejean"),
                           getItem($PDOMySQL, "SitesNaturels", "pierresTombeesCassis"),
                           getItem($PDOMySQL, "PlageBaignadePiscine", "calanqueAnthenors"),
                           getItem($PDOMySQL, "BonsPlans", "stadeVelodromeOT"));
    
    $updateItems55 = array(getItem($PDOMySQL, "Sortir", "cabaretAleatoire"),
                           getItem($PDOMySQL, "Loisirs", "wakeboardPeyrolles"),
                           getItem($PDOMySQL, "Shopping", "bouleBleue"));
    
    $updateItems56 = array(getItem($PDOMySQL, "SitesEscalade", "traverseeMugel"),
                           getItem($PDOMySQL, "SitesEscalade", "razoCallelongue"),
                           getItem($PDOMySQL, "SitesEscalade", "psychoblocDiable"),
                           getItem($PDOMySQL, "Shopping", "domaineRevelette"),
                           getItem($PDOMySQL, "Sortir", "marsatac"),
                           getItem($PDOMySQL, "Loisirs", "atelierDeLaMer"),
                           getItem($PDOMySQL, "Sortir", "acontraluz"),
                           getItem($PDOMySQL, "Sortir", "cinePleinAir"));
    
    $updateItems57 = array(getItem($PDOMySQL, "Sortir", "acontraluz"),
                           getItem($PDOMySQL, "Sortir", "cinePleinAir"));
    
    $updateItems58 = array(getItem($PDOMySQL, "SitesNaturels", "anseArnetteSlack"));
    
    $updateItems59 = array(getItem($PDOMySQL, "Shopping", "royaumePoterie"));
    
    $updateItems60 = array(getItem($PDOMySQL, "Sortir", "acontraluz"));
    
    $updateItems61 = array(getItem($PDOMySQL, "BonsPlans", "septembreEnMer"));
    
    $updateItems62 = array(getItem($PDOMySQL, "Shopping", "lynnDalaga"));
    
    $updateItems63 = array(getItem($PDOMySQL, "Loisirs", "urbanElements"),
                           getItem($PDOMySQL, "Loisirs", "cassisPaddleNui"));
    
    $updateItems64 = array(getItem($PDOMySQL, "Loisirs", "colorRun"));
    
    


    if ($version == 1.2)
    {
        $listOfUpdateItems = array($updateItems0, $updateItems1, $updateItems2, $updateItems3, $updateItems4, $updateItems5, $updateItems6, $updateItems7, $updateItems8, $updateItems9, $updateItems10, $updateItems11, $updateItems12, $updateItems13, $updateItems14, $updateItems15);
    
    }
    else if ($version == 1.3)
    {
        $listOfUpdateItems = array($updateItems15, $updateItems16, $updateItems17, $updateItems18, $updateItems19, $updateItems20, $updateItems21, $updateItems22, $updateItems23, $updateItems24, $updateItems25, $updateItems26);
    }
    else if ($version == 1.4)
    {
        $listOfUpdateItems = array($updateItems27, $updateItems28, $updateItems29, $updateItems30, $updateItems31, $updateItems32, $updateItems33, $updateItems34, $updateItems35, $updateItems36, $updateItems37, $updateItems38, $updateItems39, $updateItems40, $updateItems41, $updateItems42, $updateItems44, $updateItems45, $updateItems46, $updateItems47, $updateItems49, $updateItems50, $updateItems51, $updateItems52, $updateItems53, $updateItems54, $updateItems55, $updateItems56, $updateItems57, $updateItems58, $updateItems59, $updateItems60, $updateItems61, $updateItems62, $updateItems63, $updateItems64, $updateItems65, $updateItems66);
    }
    else if ($version == 2.0)
    {
        $listOfUpdateItems = array($updateItems43, $updateItems44, $updateItems45, $updateItems46, $updateItems47, $updateItems48, $updateItems49, $updateItems50, $updateItems51, $updateItems52, $updateItems53, $updateItems54, $updateItems55, $updateItems56, $updateItems57, $updateItems58, $updateItems59, $updateItems60, $updateItems61, $updateItems62, $updateItems63, $updateItems64, $updateItems65, $updateItems66);
    }

    //echo 'listOfUpdateItems : '.count($listOfUpdateItems).'<br/>';
    
    //*******************************************************************
    
    $versionItemsToPush = (int) $_GET['versionItemsToPush'];

    $itemsArray = array();
    
    for ($i = $versionItemsToPush; $i < count($listOfUpdateItems); $i++)
    {
        for ($n = 0; $n < count($listOfUpdateItems[$i]); $n++)
        {
            $listOfUpdateItems[$i][$n]["isUpdate"] = true;
            
            $listOfUpdateItems[$i][$n]["time"] = time();
            
            array_push($itemsArray, $listOfUpdateItems[$i][$n]);
        }
    }
    
    $versionItemsToPush = count($listOfUpdateItems);
    
    return $itemsArray;
}



function getItem($PDOMySQL, $table, $idRepName) {
    try {
        // Validate input parameters
        if (empty($table) || empty($idRepName)) {
            logError("Invalid parameters in getItem: table or idRepName is empty");
            throw new Exception("Invalid parameters");
        }

        // Sanitize table name to prevent SQL injection
        $allowedTables = ['PlageBaignadePiscine', 'BonsPlans', 'ExpositionsMusees', 'SitesNaturels', 
                         'Monuments', 'Canyons', 'Randonnee', 'SitesEscalade', 'Restos', 'Loisirs', 
                         'Shopping', 'Dormir', 'Circuits', 'Sortir'];
        if (!in_array($table, $allowedTables)) {
            logError("Invalid table name: " . $table);
            throw new Exception("Invalid table name");
        }

        $sql = "SELECT * FROM " . $table . " WHERE idRepName = :idRepName";
        $stmt = $PDOMySQL->prepare($sql);
        $stmt->execute(['idRepName' => $idRepName]);
        $itemArray = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($itemArray)) {
            logError("No data found for table: " . $table . ", idRepName: " . $idRepName);
            return null;
        }

        $tabDiapo = array();
        
        $sqlPicture = "SELECT name FROM Pictures WHERE idRepName = :idRepName";
        $stmt = $PDOMySQL->prepare($sqlPicture);
        $stmt->execute(['idRepName' => $idRepName]);
        $pictureArray = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($pictureArray as $picture) {
            array_push($tabDiapo, $picture['name']);
        }
        
        $itemArray[0]["tabDiapo"] = $tabDiapo;
        
        return $itemArray[0];
    } catch (PDOException $e) {
        logError("Database error in getItem", $e);
        throw $e;
    } catch (Exception $e) {
        logError("Error in getItem", $e);
        throw $e;
    }
}

?>