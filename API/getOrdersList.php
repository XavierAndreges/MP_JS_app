<?php

function getOrderItemsArray($version)
{
    if ($version == 2.0)
    {
        $orderItemsArray = array (
                                  "Sortir" => array (
                                                     array("cabaretAleatoire",0),
                                                     array("livingArts",1),
                                                     array("whiteRabbit",6),
                                                     array("mimiFestival",-1),
                                                     array("charlieJazz",-1),
                                                     array("marseilleRockIsland",-1),
                                                     array("babelMed", -1),
                                                     array("deltaFestival",-1),
                                                     array("borderlineChassolHusbands",-1),
                                                     array("kisskissAgenda", -1),
                                                     array("jazzCinqContinents",-1),
                                                     array("docksSummerParty",-1),
                                                     array("planBmucem",-1),
                                                     array("fricheToitTerrasse",-1),
                                                     array("hotelGallifetConcert",-1),
                                                     array("petitPavillonFiestas",-1),
                                                     array("marsatac",-1),
                                                     array("cinePleinAir",-1),
                                                     array("schpountz",-1),
                                                     array("jardinsSuspendusRooftop",-1),
                                                     array("borderlineAperoBateau",-1),
                                                     array("buvetteDisco",-1),
                                                     ),
                                  
                                  "SitesEscalade" => array (array("razoCallelongue", 0),
                                                            array("psychoblocDiable", 1),
                                                            array("traverseeMugel", 2),
                                                            array("altissimo", 3),
                                                            array("blocFiguerolles", 4)
                                                            ),
                                  
                                  "BonsPlans" => array (array("savonnerieLicorne", 2)),
                                  
                                  "Randonnee" => array (array("jouquesVillage", 4),
                                                        array("skiRandoLure", -1))
                                  );
    }
    else
    {
        $orderItemsArray = array (
                                  "SitesEscalade" => array (array("altissimo", 2),
                                                            array("areteAbeilles", 4)),
                                  
                                  "BonsPlans" => array (array("savonnerieLicorne", 2),),
                                  
                                  "Shopping" => array (array("licorneRiveGauche", 2)),
                                  
                                  "Randonnee" => array (array("skiRandoLure", 20))
                                  );
    }
    
    
    return $orderItemsArray;
}





function getDiapoHomeArray()
{
    return array ("domaineRevelette", "atelierDeLaMer", "bouleBleue", "lynnDalaga", "stadeVelodromeOT", "domaineStBacchi", "lesBaigneuses", "wakeboardPeyrolles", "auBordDeLeau", "farafi", "hotelMistral");
    
    //return array ();
}


function getItemsHomeArray()
{
    return array ("espace361", "routeDesVinsJouques", "cieMarseillaise", "grotteCallelongue", "raskassKayak",
                  "marseilleEnFace", "pierreClarac", "eauxSalees", "trolib", "capCanailleCassisLaCiotat");
    
    //return array ();
}


function getRestosArray()
{
    $myRestoArray = array ("barMarine" => "225c1fa2-38c1-4c81-ab33-76725e3e97dd",
                           "clanCigales" => "fe01ecb2-0fee-4b55-a6e3-d8d80a7c950e",
                           "clubHouse" => "4926bd7d-a3db-4bc7-b816-2962015fdd05",
                           "chezToinou" => "7b85eb07-1a39-4f98-84c4-01b88ac81a4b",
                           "dosHermanas" => "70e4f550-1f3d-4a26-ac74-ef16f65c1f4e",
                           "restoLaGrotte" => "2ef374f1-dff3-4e8b-8f41-3f59a05710d7",
                           "lesOndines" => "lesOndines",
                           "mamaAfrica" => "0933013b-6a32-4d0f-a17c-b976be82536f",
                           "mamaShelter" => "301e2d30-4dcb-443e-82d7-a56c5db0cddc",
                           "partDesAnges" => "partDesAnges",
                           "soleilEgypte" => "soleilEgypte",
                           "surLePouce" => "surLePouce",
                           "enNour" => "enNour",
                           );
    
    return $myRestoArray;
}


function getClassics()
{
    $classicsArray =  array ("sugiton", "mucem", "hotelDieu", "marchePoisson", "savonnerieLicorne", "sormiou", "panierCircuit", "ilesDuFrioul", "bonneMere", "vallonAuffes", "villaMediterrannee", "saintPons", "capSugiton", "major", "enVauPortPin", "vieilleCharite", "vieuxPortRiveGaucheCircuit", "fortSaintJean", "portGoudes", "belvedereLuminy", "leCorbusier", "sentierDouanier", "parcBorely", "niolon", "petitTrain", "museeHistoire", "niolon", "palaisLongchamps", "becdelaigle", "sillansLaCascade", "grandBarGoudes", "trouSouffleur", "CarrieresLumieres", "marieSainteBaume", "abbayeVictor", "cantini", "MuseeGranet", "pavillonVendome", "glanum", "estaque");
    
    //$classicsArray =  array ();
    
    return $classicsArray;
}


function getFavorites()
{
    //$favoritesArray =  array ("artRevolution", "josephSec", "rueArc", "MOAA", "croixDeProvenceJaune", "marseilleveyreFaceOuest", "anseFiguier", "petanqueTholonet", "funnyZoo", "campDesMilles", "museeMarine", "museeMonticelli", "louPitchoun", "Jeannette", "cascadeSainteVictoire", "callelongueDemiLuneMarseilleveyre", "grotteChampignons", "cretSaintMichel", "campagnePastre", "coteBleue", "plongeeLaVesse", "ileMaire", "marchePuces", "vallonSourn", "extremeBecSormiou", "parcMugel", "bistroVenitien", "espace361", "proxipousse", "pierreClarac", "glissePourTous", "indianForestAix", "raskassKayak", "3c", "livingArts", "bonneSaison", "cieMarseillaise", "vignelaure");
    
    $favoritesArray =  array ();
    
    return $favoritesArray;
}


function getBestViews()
{
    $bestViewsArray = array ("palaisPharo, Image6.jpg", "routeDesCretes, Image2.jpg", "tableOrientationMeyrargues, Image1.jpg", "bonneMere, PC180029.JPG", "Jouques, Image0.jpg", "egliseStLaurent, Image2.jpg", "capCouronne, Image1.jpg", "marseilleEnFace, Image1.jpg", "terrainDesPeintres, Image.jpg", "sormiou, SDC16273.JPG", "notreDameAllauch, Image2.jpg", "mucemArchitecture, P1010075.JPG", "salinsDeGiraud, Image3.jpg", "plageBestouan, Image6.jpg", "abbayeVictor, Image0.jpg", "parcMugel, Image.jpg", "leCorbusier, Image1.jpg", "marseilleveyreFaceOuest, Image.jpg", "museeMonticelli, P4140164.JPG", "Callelongue, Image2.jpg", "hotelDieu, Image3.jpg", "belvedereOppedette, Image.jpg", "monumentMortOrient, Image3.jpg", "portRedonne, Image6.jpg");
    
    //$bestViewsArray = array ();
    
    return $bestViewsArray;
}


function getItemsToDelete()
{
    $itemsToDelete = ["borderline,Sortir"];
    
    //$itemsToDelete = [];
    
    return $itemsToDelete;
}


function getOrderListArray()
{
    //array("Monuments" => getOrderMonuments(), "Shopping" => getOrderShopping());
    
    return array("Shopping" => getOrderShopping());
}


function getOrderRestos()
{
    return array("bistroVenitien");
}
    
$getOrderRestos = "getOrderRestos";
    
    
function getOrderSlackline()
{
        return array("slackDuranne", "parcRavelle", "slackTorse", "slackRoquesHautes", "slackEcoleDanse", "slackBorely", "slackEvades", "slackDeffend", "slackPastre", "slackPastre", "samenaSlack", "anseArnetteSlack", "slackSillans");
}
    
$getOrderSlackline = "getOrderSlackline";


function getOrderMonuments()
{
    return array("mazarinQuatreDauphins", "chateauIf", "josephSec", "Jouques", "secondeNatureDock", "major");
}

function getOrderShopping()
{
    return array ("domaineRevelette", "cieMarseillaise", "domaineStBacchi", "lynnDalaga", "lesBaigneuses", "licorneRiveGauche", "gahliaNoir", "descenteAccoules", "bonneSaison", "brasserieLaPlaine", "farafiArtisanat", "vignelaure",  "royaumePoterie", "fietje");
}

?>