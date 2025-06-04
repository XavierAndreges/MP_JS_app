/***************** started var ************************/

var GOOGLE_MAP_KEY = window.GOOGLE_MAP_KEY || '';
var urlPictures = "../pictures" ;

var isProd = false;
var isMobileTest = false;
var isProdWeb = false;

var version = 2.0;
var currentLang = "fr";
var isApp = false;
var isAppScreen = false;

var isGoogleSelected = false;
var isNetWorkAvalaible = null;

var spatialiteToPhp = false;
var isTestSpatialite = false;

var userLocationOnSimulator = true;

var isDemoWeb = false;
var isMobileWeb = true;

var mNbImageDiapo = 1;

var nbTimesToOpenSettingsOnHome = 7;
var nbTimesToVote = 10;
var nbTimesToUpdate = 4;

var fuckingFourPixels = 4;

var isImageOffLine = true;
var mListFullConcat = null;

//******* CHECK userLocation **********

var gaPlugin;

var urlWeb = "http://www.lajouquasse.fr/marseilleprovence/";

var ipAdress = "http://localhost:8888/mp/";

var lDataFolderAndroid = "file:///data/data/com.andrej.marseilleprovence/databases";

/*
 All tiles db must be copied to lDataFolderAndroid;
 Pre populated db must be place at assets root folder
 Spatial db must be copied to sdcard0
 */

// Arles -> Aix : 90mn
// transportBonus : vieuxPort / goudes / routeDuFeu

var tilesURL;

// localHost
var IGNkey = "pj1ri1lkrn18htuhjfz5lvgi";

var mUrlToAppleStore = "https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8";
var mUrlToAppleStoreTest = "https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8";

var mUrlToPlayStore = "https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence";

// www.marseilleprovence.net
//var IGNkey = "4taf9lpjkm05624dg6mf1vs6";

// intranet home
//var IGNkey= "wcx79kcu0xhvkvff2u8s0w8q";

// mobile developpement
//var IGNkey = "mh34xkoe33blwr6s1f2uhuja";

var mUserLocationTestArray = {
    "CCI" : {"type" : "userLocation", "latitude" :43.295818, "longitude" :5.375721},
    "Manu" : {"type" : "userLocation", "latitude" :43.297401, "longitude" :5.394845},
    "JPBrun" : {"type" : "userLocation", "latitude" :43.291963, "longitude" :5.386021},
    "StCharles" : {"type" : "userLocation", "latitude" : 43.302157, "longitude" : 5.380511},
    "parcMugel" : {"type" : "userLocation", "latitude" : 43.162149, "longitude" : 5.603113},
    "approcheSemaphore" : {"type" : "userLocation", "latitude" : 43.170741, "longitude" : 5.590464},
    "Jouques" : {"type" : "userLocation", "latitude" : 43.637855, "longitude" : 5.63818},
    "randoMarseilleveyre" : {"type" : "userLocation", "latitude" : 43.210062, "longitude" : 5.355228},
    "Lyon" : {"type" : "userLocation", "latitude" : 45.720096, "longitude" : 5.079223},
    "aix" : {"type" : "userLocation", "latitude" : 43.523426, "longitude" : 5.442142},
}


var mNameUserLocationTest = "JPBrun";

var activityPicto = '<img class="activityPicto" src="Assets/engine/gris/Activity.png" />';
var cityPicto = '<img class="activityPicto" src="Assets/engine/gris/Cible.png"  />';
var transportPicto = '<img class="activityPicto" src="Assets/engine/gris/Transport.png" />';
var timePicto = '<img class="activityPicto" src="Assets/engine/gris/Time.png" />';

var userLocation = null;
var userChoosePosition = null;

var mUserLocationTimeOut = -1;
var mUserLocationTimer = -1;
var kTimeOutUserLocation = 10000;
var kAgeUserLocation = 600000;
var mTimer = -1;

var nodeFrom;
var previousNodeFrom;

var isMobile;
var isLikeMobile;
var isIpad = false;
var isAndroid = false;
var isIOS = false;

var isRestrictedAndroid = false;
var isOnModeHomeBtnAtBottom = false;

var mCurrentTitle;
var mModalPopUpTitle;

var mSwiperHome = null;
var mSwiperCircuits = null;
var mCircuitsArray = null;

var lPhotoSwipe = null;

var mIndexPhotoSwipeHome = 0;
var mIndexPhotoSwipe = 0;
var mIndexPhotoSwipeMap = 0;
var mIndexPhotoSwipeFull = 0;

var mCurrentDiapoHome = 0;

var mPhotoSwipeHome = null;
var mPhotoSwipe = null;
var mPhotoSwipeFull = null;
var mPhotoSwipeMap = null;
var mDiapoArrayHome = [];
var mDiapoArray = [];
var mDiapoArrayFull = [];
var mDiapoArrayMap = [];

var isHackToPreventClickFromCloseBtnPhotoSwipe = false;

var scrollTimer = null;
var mTimeLoad1 = 0;
var mTimeLoad2 = 0;

var isLoadingAnimation = false;

var mSizeLimitForSmall = 450;

var xSize;
var ySize;
var currentYoffset = 0;
var listItemYoffset = 0;
var detailYoffset = 0;
var menuYoffset = 0;
var currentMapYoffset = 0;

var lSizeListMainMenu = 240;
var lBorderListMainMenu = 5;

var refreshAllTimeOut = -1;
var itemListOut = -1;
var optionsTimeOut = -1;
var picturesTimeOut = -1;
var searchTimeOut = -1;
var mapIsInitializedTimeOut = -1;

var isModalPopUp = false;
var isLittleModalPopUp = false;
var isPopUpDispoVeloMPMOpened = false;
var isTransparentDivToTap = false;

var test = 0;

/********************* menu **********************/

var xStart, xEnd;
var menuIsOpened = false;
var animationOnProcess = false;

/*************** search engine *********************/

var baseActivityItemsList = [];
var tempBaseActivityItemsList = [];
var tempArrayForSearchList = [];
var currentActivityItemList = [];

var lGoogleDistanceArray = [];
var distanceMatrixService = null;
var lastLimitGoogleDistanceArray = 0;

var piedTimeListItems = [];
var veloTimeListItems = [];
var motoTimeListItems = [];
var autoTimeListItems = [];

var isCellShowTime = false;
var currentActivity = -1;
var currentCity = -1;
var currentTransport = -1;
var currentTime = -1;

var kDefaultCurrentTime = "60";

var duration = 30;

var baseDate = new Date();
var currentDate = new Date(baseDate.getUTCFullYear(), baseDate.getMonth(), baseDate.getUTCDate(), 0, 0, 0, 0);
/*
currentDate.setHours(0);
currentDate.setMinutes(0);
currentDate.setSeconds(0, 0);
*/
var currentSousType = -1;
var currentFilter = "";

var isDatePickerOptionOpened = false;
var isDatePickerOpened = false;
var isSousTypeMP2013Opened = false;
var isPopUpFilter2013Opened = false;
var isBigExpo = false;
var isFree = false;
var isFreeMode = false;

var tableArray = ["SitesNaturels", "PlageBaignadePiscine", "SitesEscalade", "Canyons", "ExpositionsMusees", "Monuments", "Randonnee", "BonsPlans", "Petanque", "Sortir", "Restos", "Dormir", "Loisirs", "Shopping", "Circuits"];

var cityBtnArray = ['Marseille', 'Aix', 'Arles', 'Jouques', 'Geoloc', 'ChoosePosition'];
var transportBtnArray = ['pied', 'velo', 'moto', 'auto', 'bus'];
var timeBtnArray = ['60', '120', '240', '18000'];

var cityGeoLoc = {
	"Marseille" : {"latitude" : 43.302157, "longitude" : 5.380511},
	"Aix" : {"latitude" : 43.523395, "longitude" : 5.44232},
	"Arles" : {"latitude" : 43.684826, "longitude" : 4.632046},
    "Jouques" : {"latitude" : 43.637085, "longitude" : 5.638688},
	"Aubagne" : {"latitude" : 43.295887, "longitude" : 5.566539}
}

var selectedTab = -1;

var voyelleArray = ["a", "e", "i", "o", "u", "é", "è", "h"];

var macaronList = ["Local", "BioLocal", "NoCarbone", "BioFrais", "Maison", "Marche", "Velo", "TukTuk", "Segway", "Voiture", "Moto", "AllLive", "Mer", "Terre", "Trotinette", "Roller", "Scooter", "Cheval", "Parapente", "Voilier", "Kayak", "Paddle", "Planche"];

/******************** slider *************************/

var homeSlider;

var requested_n;
var requested_type;
var requested_transport;
var requested_id;

var optionSliderItems;
var optionSliderItems = [];

//var listItemsRestaurants = [];
var optionSliderRestaurants;
var optionSliderRestaurantsArray = [];

//var listItemsHotels = [];
var optionSliderHotels;
var optionSliderHotelsArray = [];

//var listItemsBars = [];
var optionSliderBars;
var optionSliderBarsArray = [];

//var listItemsMP2013 = [];
var optionSliderMP2013;
var optionSliderMP2013Array = [];

var optionSliderServices;
var optionSliderServicesArray = [];

var optionsCategoriesArray = [];

var optionSliderOfficesTourisme;
var optionSliderGuides;
var optionSliderMoniteursEscalade;
var optionSliderAgences;
var optionSliderLocationVelo;
var optionSliderCampings;
var optionSliderCampingscar;
var optionSliderGites;

var redColor = "#876B54";


var myReduceSlider;
var myMediumSlider;
var myDiapoSLider;
var myDiapoSLiderMap;
var myReduceSliderMap;

/********************* table & items **************************/

var currentTable;

var currentItemDetail = -1;
var listItems = [];
var baseListItems = [];
var favoritesItemsArray = [];
var closeArray = [];

var tempSelectedItem = null;

var closeLinkArray = null;


var activityBtnArray = ['Index', 'NoIdea', 'Monuments', 'BonsPlans', 'ExpositionsMusees', 'SitesNaturels', 'PlageBaignadePiscine', 'Randonnee', 'Canyons', 'SitesEscalade', 'Petanque', 'Sortir', 'Restos', 'Dormir', 'Loisirs', 'Shopping', 'Circuits', 'Classics', 'Favorites', 'MyFavorites', 'BestViews'];


var mActivityWhereSousTypeIsRegular = ["ExpositionsMusees", "Petanque", "Restos", "Circuits"];

var mHomeDiapo= [];

var mDiapoArrayHome = [];

var diapoHomeArray0 = [
{"image" : "majorAuLoin.jpg", "caption" : "Villa méditerranée / La Major", "itemToLink" : ""},
{"image" : "vautubiereVillemus.jpg", "caption" : "Lavande de Villemus - Vautubière", "itemToLink" : ""},
{"image" : "paddlePointeRouge.jpg", "caption" : "Paddle - Pointe Rouge", "itemToLink" : ""},
{"image" : "vueReformesNotreDame.jpg", "caption" : "Les Réformés - Notre Dame", "itemToLink" : ""},
{"image" : "Morgiou.jpg", "caption" : "Calanque de Morgiou", "itemToLink" : "Randonnee,belvedereLuminy"},
{"image" : "terrainDesPeintres.jpg", "caption" : "Terrain des peintres - Aix", "itemToLink" : "SitesNaturels,terrainDesPeintres"},
{"image" : "graphPanier.jpg", "caption" : "Graph en face de la Vieille Charité", "itemToLink" : ""},
{"image" : "mamoCorbusier.jpg", "caption" : "MAMO - Le Corbusier", "itemToLink" : ""},
{"image" : "vtt.jpg", "caption" : "VTT - Sainte Victoire", "itemToLink" : ""},
{"image" : "fakir.jpg", "caption" : "Spectacle de rue - Vieux port", "itemToLink" : ""},
{"image" : "windSurf.jpg", "caption" : "Plage du Prado", "itemToLink" : ""},
];


var diapoHomeArray1 = [];
var diapoHomeArray2 = [];
var diapoHomeArray3 = [];

var listItemsClassics = [];
var listItemsFavorites = [];
var listItemsMyFavorites = [];
var listItemsBestViews = [];


var praticalTypeArray = {
    "cdt:Restaurant" : "Restaurants",
    "cdt:Hotel" : "Hotels",
    "cdt:ChambreHote" : "Gite",
    "cdt:GiteEtMeuble" : "MeubleTourisme",
    "cdt:Camping" : "Campings",
    "cdt:AireStationnementCampingCar" : "CampingsCar",
    "cdt:ParkingPublic" : "Parkings",
    "cdt:OTSI" : "OT",
    "cdt:GuidesServiceGuides" : "Guides",
    "cdt:Agence" : "Agences",
    "cdt:ParcAcrobatiqueForestier" : "ParcAccro",
    "cdt:AccompagnateurMoyenneMontagne" : "AccompagnateurMontagne",
    "cdt:MoniteurEscalade" : "MoniteursEscalade",
    "cdt:LocationMaterielSportLoisir" : "LocationVelo",
    "cdt:MassifMontagne" : "Massif",
    "cdt:Residence" : "Residence",
    "VeloMPM" : "VeloMPM",
};


var cityBoundsArray = ["5.3387,43.2421,5.4305,43.3218", "5.4403,43.5230,5.4563,43.5331"];
cityBoundsArray["Marseille"] = "5.2824,43.2282,5.4557,43.3629";
cityBoundsArray["Aix"] = "5.4255,43.5098,5.4726,43.5371";


var massifArray = ["Calanques", "Sainte-Victoire", "Garlaban", "Sainte-Baume", "Côte bleue", "Alpilles", "Etoile", "Cap Canaille", "Arbois", "Monts du Concors"];

var massifArrayCdtId = {
    "Calanques" : 1,
    "Sainte-Victoire" : 8,
    "Garlaban" : 5,
    "Sainte-Baume" : 3,
    "Côte bleue" : 9,
    "Alpilles" : 16,
    "Etoile" : 4,
    "Cap Canaille" : 26,
    "Arbois" : 19,
    "Monts du Concors" : 8
};

var massifDbArray = {
    "Calanques" : "calanques",
    "Sainte-Victoire" : "sainteVictoire",
    "Garlaban" : "garlaban",
    "Sainte-Baume" : "sainteBaume",
    "Côte bleue" : "coteBleue",
    "Alpilles" : "alpilles",
    "Etoile" : "etoile",
    "Cap Canaille" : "capCanaille",
    "Arbois" : "arbois",
    "Monts du Concors" : "concors"
};

var massifNameArray = {
    "calanques" : "Calanques",
    "coteBleue" : "Côte bleue",
    "sainteBaume" : "Sainte-Baume",
    "etoile" : "Etoile",
    "sainteVictoire" : "Sainte-Victoire",
    "garlaban" : "Garlaban",
    "capCanaille" : "Cap Canaille",
    "concors" : "Monts du Concors",
};

var outMpZoneArray = ["Trompines", "OulesFreissinieres", "Riolan", "Sauze"];

var outMpZoneBounds = {
    "Trompines" : "6.1262,43.5240,6.1508,43.5363",
    "OulesFreissinieres" : "6.4402,44.7254,6.4542,44.7343",
    "Riolan" : "6.9353,43.8647,6.9661,43.8830",
    "Sauze" : "6.4168,44.4437,6.4351,44.4535",
    "cretesSainteBaume" : "5.7568,43.3054,5.8234,43.3655"
};

var bgColorArray = ["bgHotelsGradient", "bgRestaurantsGradient", "bgServicesGradient", "bgGrayLightToGray", "bgMP2013Gradient", "mauveGradient", "bgGreenGradient", "yellowGradient"];

var newBgColorArray = ["bgRestaurantsGradient", "bgMP2013Gradient", "mauveGradient", "bgGreenGradient", "yellowGradient", "bgGrayLightToGray", "bgServicesGradient", "bgHotelsGradient"];

var bgColorNoIdeaArray = {
    "Randonnee" : "bgHotelsGradient",
    "PlageBaignadePiscine" : "bgRestaurantsGradient",
    "ExpositionsMusees" : "bgGrayLightToGray",
    "Monuments" : "bgMP2013Gradient",
    //"BonsPlans" : "mauveGradient",
    "BonsPlans" : "bgGrayLightToGray",
    //"SitesNaturels" : "bgGreenGradient",
    "SitesNaturels" : "bgGrayLightToGray",
    "Canyons" : "orangeGradient",
    "SitesEscalade" : "bgRedSelectedGradient",
    "Petanque" : "yellowGradient",
    "Sortir" : "turquoiseGradient",
    "Restos" : "mauveGradient",
    "Dormir" : "bgGrayLightToGray",
    "Loisirs" : "bgGrayLightToGray",
    "Shopping" : "bgGrayLightToGray",
    "Circuits" : "bgGrayLightToGray",
};

var parkingRelaiArray = ["Parking La Rose", "Parking Frais Vallon", "Parking Saint Just", "Parking Bougainville", "Parking Fourragère", "Parking Louis Armand", "Parking Timone", "Parking Blancarde"];
var isParkingRelaiActivated = false;

var isPopUpAccesMassifOpened = false;


var infoTrafficVieuxPortArray = ["abbayeVictor", "fortNicolas", "palaisPharo", "panier", "vieuxPort", "fortSaintJean", "petitTrain", "mairieMarseille", "boutiqueSanton", "tuktuk", "museeMarine", "caravelle", "unicBar", "polikarpov", "marchePoisson", "ferryBoat"];

var infoTrafficGoudesArray = ["portGoudes", "blocBergerie", "callelongueDemiLuneMarseilleveyre", "sommetMarseilleveyre", "anseColombet", "petanqueMarseilleveyre", "stMichelSudGoudes", "lapinodrome", "rocherGoudesFaceSud"];

var infoTrafficRouteDuFeuArray = ["sormiou", "colSormiou", "aiguilleSugiton", "collineLun", "aiguilleSugitonSO", "abricotier"];


var myRestoArray = {
    "restoLaGrotte" : "2ef374f1-dff3-4e8b-8f41-3f59a05710d7",
    "barMarine" : "225c1fa2-38c1-4c81-ab33-76725e3e97dd",
    "clanCigales" : "fe01ecb2-0fee-4b55-a6e3-d8d80a7c950e",
    "enNour" : "enNour",
    "clubHouse" : "4926bd7d-a3db-4bc7-b816-2962015fdd05",
    "chezToinou" : "7b85eb07-1a39-4f98-84c4-01b88ac81a4b",
    "dosHermanas" : "70e4f550-1f3d-4a26-ac74-ef16f65c1f4e",
    "lesOndines" : "lesOndines",
    "mamaAfrica" : "0933013b-6a32-4d0f-a17c-b976be82536f",
    "mamaShelter" : "301e2d30-4dcb-443e-82d7-a56c5db0cddc",
    "partDesAnges" : "partDesAnges",
    "soleilEgypte" : "soleilEgypte",
    "surLePouce" : "surLePouce",
};

/*************** display & navigation **************************/

var homeStatus = "Home"; // List / Detail / Map / Close
var previousHomeStatus = "Home"; // List / Detail / Map / Close
var isMapOptionVisible =  null;
var isMapVisible = false;
var mapStatus; // List / otpions / itinary / Circuits
var isOptionsVisible = false;
var isTargetOnMapVisible = false;
var mSwitchSmallBig = "Big";
var isCellPartnerVisible = false;
var isCircuitsSwiperVisible = false;

var btnReverseStatus = "up";

var isGoogleMapAPIalreadyLaunched = false;
var isGoogleMap = false;
var isLeafletMap = false;
var isPopMapAlreadyLaunched = false;


var isHtmlReduceSliderAlreadyLaunched = false;
var isMenuTouchcarouselAlreadyLaunched = false;
var isLocalizedMapAlredayLaunched = false;
var isTablePracticalLink = false;

var smallSizeImage;
var mediumSizeImage;
var fullSizeImage;

var isTrierOptionsOpened = false;
var isTrierOptionsActivated = false;

var isMapTitleMenuAndButtonsForNoIdeaAndGeoloc = false;

var mIndexListItemsMap = 0;
var mPasMenuItemsMap = 10;

var indexMapItems = 4;
var indexMapRestaurants = 4;
var indexMapMP2013 = 4;
var indexMapHotels = 4;
var indexMapServices = 4;

var indexItemList = 0;
var lastIndexItemList = 0;

var hasBeenResized = false;

var mCurrentLeftBtn;

/******************** map ************************/

var mapIGN = null;

var previousMapStatus = null;

var StyleMapIGN;
var isIGNmapAPIalreadyLaunched = false;

var isPopUpMapSettingsOpened = false;

var map = null;
var localizedMap;

var currentSelectedGooglePoint = null;
var hasToShowUserPosition = false;
var directionsDisplay = null;
var typeOfDisplayDirection = null;

var mWatchPosition = null;

var mCurrentMapZoom = null;
var mCurrentMapCenter = null;

var marker;
var markers = {};
var userMarker = null;

var markerArray = [];
var infoWindowArray = [];

var mIndexLastSelectedCircuitMarker = -1;

var polyline = null;
var gpxLayer = null;
var mTileLayer = null;
var mRandoTileLayer = null;

var listItemsMap = [];
var mIsCloserItemActivated = false;

var isSwitchBtn = false;
var isDownloadBtn = false;
var isTargetBtn = false;

var mCurrentMassif = null;

var pinImage;
var pinShadow;
var lIconSize;
var lIconAnchor;

var titleBubble;
var typeBubble;
var pictoBubble;

var btnMarkers;
var btnTypeName;
var btnTypeColor = ["909909", "0FF0FF", "CC3CC3", "6C36C3", "636636", "F9CF9C", "999999", "060060", "09F09F", "FE7569"];
var btnTypeMarkers = [];

var infoBoxTimeOut = -1;

var boundBoxMarseille_19 = [5.3654,43.2912,5.3878,43.2980];
var boundBoxMarseille_18 = [5.3632,43.2908,5.388,43.3061];
var boundBoxMarseille_17 = [5.3454,43.2607,5.405,43.3075];
var boundBoxMarseille_16 = [5.337,43.2237,5.4551,43.3182];
/*
 var boundBoxMarseille_15 = [5.2789,43.1835,5.5034,43.3485];
 var boundBoxMarseille_14 = [5.1472,43.1538,5.6224,43.3918];
 var boundBoxMarseille_13 = [5.1465,43.1295,5.7762,43.5545];
 */
var boundBoxMarseille_13_15 = [5.3282,43.2002,5.4579,43.3227];
var boundBoxMarseille_10_12 = [4.9050207,43.0799304,5.7759888,43.5539641];
var boundBoxPaca = [3.697,42.743,8.174,45.302];


var boundBoxAixSmall_10_16 = [5.4363,43.5205,5.4672,43.5331];


var vieuxPortArea = [5.3532,43.2906,5.3764,43.2982];
var laPlaineArea = [5.3828,43.2902,5.3896,43.2962];




//var polylineVieuxPortRDcoordsArray = ["43.29527,5.374224", "43.296051,5.373634", "43.296257,5.372685", "43.296031,5.370292"];
/*var polylineVieuxPortRDcoordsArray = ["43.29527,5.374224", "43.296051,5.373634", "43.296257,5.372685", "43.296031,5.370292", "43.29690558465196,5.370281338691711", "43.29769033906253,5.370082855224609", "43.29761225450028,5.369428396224976", "43.29753026560202,5.369176268577576", "43.29745608507497,5.368993878364563", "43.29739361719256,5.368875861167908", "43.297557595247056,5.36882221698761", "43.297635679879484,5.368226766586304", "43.29770595596295,5.367470383644104", "43.29776061508279,5.367556214332581", "43.297799657281196,5.367701053619385", "43.29791678372598,5.367910265922546", "43.29892406183762,5.36882758140564", "43.29910755644103,5.368967056274414", "43.29927933812105,5.369036793708801"];
*/

var polylineVieuxPortRDcoordsArray = ["43.29527,5.374224", "43.296051,5.373634", "43.296257,5.372685", "43.296031,5.370292", "43.29690558465196,5.370281338691711", "43.29769033906253,5.370082855224609", "43.29761225450028,5.369428396224976", "43.29753026560202,5.369176268577576", "43.29745608507497,5.368993878364563", "43.29739361719256,5.368875861167908", "43.297557595247056,5.36882221698761", "43.297635679879484,5.368226766586304", "43.29770595596295,5.367470383644104", "43.29776061508279,5.367556214332581", "43.297799657281196,5.367701053619385", "43.29791678372598,5.367910265922546", "43.29892406183762,5.36882758140564", "43.29910755644103,5.368967056274414", "43.29927933812105,5.369036793708801", "43.29939255759937,5.367816388607025", "43.300089438366484,5.3678297996521", "43.300210464464406,5.367872714996338", "43.300183136011725,5.368224084377289", "43.30099517622196,5.368352830410004", "43.30106935243132,5.367663502693176", "43.300272929452916,5.367499887943268", "43.30020460836843,5.36781907081604", "43.300099198544615,5.367765426635742", "43.2998493374915,5.367770791053772", "43.299568242579376,5.366673767566681", "43.29941988640738,5.36657452583313", "43.29869566884491,5.366402864456177", "43.29871323756711,5.36607563495636", "43.298830362252055,5.365356802940369", "43.29888697243561,5.3650349378585815", "43.29933594788656,5.364715754985809", "43.29948430426336,5.364801585674286", "43.299529201516584,5.364954471588135", "43.29992937122183,5.365029573440552", "43.29996841202768,5.364595055580139", "43.29956238642157,5.364538729190826", "43.299523345354984,5.364659428596497", "43.29933594788656,5.364624559879303", "43.29892406183762,5.364796221256256", "43.298592208488955,5.364646017551422", "43.29852583760187,5.364592373371124", "43.29836967052295,5.364350974559784", "43.296796264825915,5.3629374504089355", "43.29679236054278,5.3628623485565186", "43.296870446157875,5.362803339958191", "43.296882158991494,5.362717509269714", "43.296940723125736,5.362556576728821", "43.297623967191,5.362009406089783", "43.29711251092749,5.36058247089386", "43.29687825471388,5.36081850528717", "43.295917794802925,5.361805558204651", "43.295773334072955,5.3615641593933105", "43.295515646513415,5.3618645668029785", "43.295503933416576,5.362218618392944", "43.29576552537509,5.363227128982544", "43.29567572527738,5.3634631633758545", "43.29570305575592,5.363602638244629", "43.297026617087276,5.3646862506866455", "43.297167170580806,5.364890098571777", "43.29725696847602,5.365120768547058", "43.29728820249545,5.365405082702637", "43.29727648974005,5.3656089305877686", "43.297245255714586,5.365796685218811", "43.297495,5.365705", "43.29566,5.366381", "43.295828,5.367283"];


var listItemsVieuxPortRDArray = ["marchePoisson,Shopping,0", "mairieMarseille,Monuments,4", "hotelDieu,Monuments,2", "vieilleCharite,Monuments,15", "43.299732-5.367859,RestaurantsOnMidi,2", "major,Monuments,5", "villaMediterrannee,Monuments,5", "mucem,ExpositionsMusees,1", "fortSaintJean,Monuments,1", "43.297495-5.365705,RestaurantsOnNight,5", "43.295828-5.367283,HotelsOnNight,5"];

var RestaurantsOnMidiTourSlider;
var RestaurantsOnNightTourSlider;
var HotelsOnNightTourSlider;

var mDiapoListAtStart = ["sugiton", "parcBorely", "raskassKayak", "chateauIf", "jouquesCircuit", "plongeeMugel", "josephSec", "blocFiguerolles",  "belvedereLuminy", "MOAA", "Jeannette", "graffsCoursJu", "routeDesCretes",  "vallonAuffes", "fortSaintJean", "calanqueMarseilleVeyre",  "sangleDessusDessous"];

var mItemsHomeArray = ["routeDesVinsJouques", "cieMarseillaise", "espace361", "capCanailleCassisLaCiotat",
                       //"borderline",
                       "marseilleEnFace", "pierreClarac", "calanqueAnthenors", "poneysCie", "blocFiguerolles"];

var classicsArray = ["sugiton", "mucem", "hotelDieu", "marchePoisson", "sormiou", "panierCircuit", "ilesDuFrioul", "bonneMere", "vallonAuffes", "villaMediterrannee", "saintPons", "capSugiton", "major", "enVauPortPin", "vieilleCharite", "vieuxPortRiveGaucheCircuit", "fortSaintJean", "portGoudes", "belvedereLuminy", "leCorbusier", "sentierDouanier", "parcBorely", "niolon", "petitTrain", "museeHistoire", "niolon", "palaisLongchamps", "becdelaigle", "sillansLaCascade", "grandBarGoudes", "trouSouffleur", "CarrieresLumieres", "marieSainteBaume", "abbayeVictor", "cantini", "MuseeGranet", "pavillonVendome", "glanum", "estaque"];

var favoritesArray = ["MOAA", "croixDeProvenceJaune", "pierreClarac", "marseilleveyreFaceOuest", "espace361", "anseFiguier", "livingArts", "petanqueTholonet", "cieMarseillaise", "campDesMilles", "vignelaure", "museeMarine", "bonneSaison", "louPitchoun", "raskassKayak", "Jeannette", "cascadeSainteVictoire", "bistroVenitien", "callelongueDemiLuneMarseilleveyre", "indianForestAix", "grotteChampignons", "glissePourTous", "cretSaintMichel", "proxipousse", "campagnePastre",  "3c", "coteBleue", "artRevolution", "plongeeLaVesse", "rueArc", "ileMaire", "marchePuces", "vallonSourn", "extremeBecSormiou", "parcMugel", "josephSec"];

var bestViewsArray = ["palaisPharo, Image6.jpg", "routeDesCretes, Image2.jpg", "bonneMere, PC180029.JPG", "jouquesCircuit, Image2.jpg", "marseilleEnFace, Image1.jpg", "terrainDesPeintres, Image.jpg", "sormiou, SDC16273.JPG", "mucemArchitecture, P1010075.JPG", "salinsDeGiraud, Image3.jpg",  "abbayeVictor, Image0.jpg", "parcMugel, Image.jpg", "leCorbusier, Image1.jpg", "marseilleveyreFaceOuest, Image.jpg", "museeMonticelli, P4140164.JPG", "Callelongue, Image2.jpg", "hotelDieu, Image3.jpg", "belvedereOppedette, Image.jpg", "monumentMortOrient, Image3.jpg"];

var orderNoIdea = [];

var orderMonuments = ["chateauIf", "josephSec", "graffsCoursJu", "Jouques", "secondeNatureDock", "leCorbusier", "mazarinQuatreDauphins", "artRevolution", "portGoudes", "murVegetalAix", "glanum", "rueArc", "estaque", "conservatoireDariusMilhaud", "chapelleBecLaCiotat", "hotelDeVilleAix", "vallonAuffes", "rotondeCoursMirabeau", "archiStFerreol", "fontainePlaceAlbertas", "vieilleCharite"];

var orderExpositionsMusees = ["espace361", "beauxArtsMarseille", "farafi", "museeMarine", "atelierCezanne", "MOAA", "campDesMilles", "mucem", "cantini"];

var orderShopping = ["cieMarseillaise", "domaineStBacchi", "licorneRiveGauche", "gahliaNoir", "descenteAccoules", "bonneSaison", "brasserieLaPlaine", "farafiArtisanat", "vignelaure",  "royaumePoterie", "fietje"];

var orderBonsPlans = [];

var orderCanyons = ["Jeannette",  "cirque14juillet", "cuvesDestel", "Encanaux", "Trompines", "trouSouffleur", "Folie", "cascadeSillans", "mainmorte", "bramefan", "louPitchoun", "ravinBalene"];

var orderCircuits = [];
var orderDormir = [];

var orderLoisirs = ["raskassKayak", "pierreClarac", "indianForestAix", "glissePourTous", "poneysCie", "pastreAventure", "snorkelingDune", "sangleDessusDessous", "altissimoLoisirs", "aspttVoile"];

var orderPetanque = [];

var orderPlageBaignadePiscine = ["anseArene", "prophetes", "calanqueMugel", "plageDuMonaco", "anseMalmousque", "calanqueAnthenors", "plagePiemanson", "PointeRouge", "lacVinsSurCaramy", "anseColombet", "lacPeyrolles", "plageLaRedonne", "EtangBonde"];

var orderRandonnee = [];
var orderRestos = [];

var orderSitesEscalade = ["aiguilleSugiton", "blocFiguerolles", "louSpigaou", "areteAbeilles", "blocBergerie", "stMichelSudGoudes", "cretSaintMichel", "blocBibemus"];

var orderSitesNaturels = ["sugiton", "ilesDuFrioul", "terrainDesPeintres", "grotteEmigres", "campagnePastre", "vallonSourn", "sillansLaCascade", "plongeeMugel", "lacBimont", "saintPons", "roquesHautes", "belvedereOppedette", "portRedonne", "marseilleveyreFaceOuest"];

var orderSortir = ["fricheToitTerrasse", "petitPavillonFiestas", "borderline", "hotelGallifetConcert", "cafeAbbaye", "livingArts", "auPetitQuartDheureSortir", "Molotov",  "embobineuse", "upercut", "3c", "trolleyBus", "scatClub"];


var itemsToDelete = [];












