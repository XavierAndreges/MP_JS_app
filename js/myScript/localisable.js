Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};


if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }

function clone(obj)
{
    if(obj == null || typeof(obj) != 'object')
        return obj;
    
    var temp = new obj.constructor();
    
    for(var key in obj)
        temp[key] = clone(obj[key]);
    
    return temp;
}


function compareArray(arr1, arr2)
{
    if (arr1.length !== arr2.length)
        return false;
    
    for (var i = 0, len = arr1.length; i < len; i++)
    {
        if (arr1[i] !== arr2[i])
        {
            return false;
        }
    }
    
    return true;
}


var Latinise={};Latinise.latin_map={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}


var commonLabel = {
    "fr" : {
        "noFavorite" : "Aucun favori",
        "remove" : "Supprimer",
        "date" : "Date",
        "selectDate" : "Sélectionnez une date",
        "selectFilter" : "Sélectionnez un filtre",
        "selectType" : "Sélectionnez un genre",
		"loader" : "Chargement en cours...",
		"noGeoloc" : "Désolé, la geolocation n'est pas accessible.",
        "mapItinary" : "Carte / itinéraire",
		"filters" : "Filtres",
        "browserIncompatible" : "Navigateur incompatible",
		"showDetails" : "Afficher le détail",
		"changeDate" : "Changer la date",
        "showMyPosition" : "Afficher ma position",
        "myPosition" : "Ma position",
        "showDrivingRoute" : "En voiture",
        "showWalkingRoute" : "A pied",
        "duration" : "Durée",
        "distance" :  "Distance",
        "denivele" :  "Dénivelé positif",
        "altitudeMax" :  "Altitude maximum",
		"favorite" : "Favori",
        "correspondance" : "Corresp.",
        "infosTransport" : "Infos transport",
        "infosPratiques" : "Infos pratiques",
        "information" : "Information",
        "selectItemsToDisplay" : "Sélectionner les éléments à afficher",
        "allItems" : "Tous",
        "settings" : "Paramètres",
        "information" : "Information",
        "dispoVelo" : "Vélos / places",
        "numberDispoVelo" : "Vélos disponibles",
        "numberDispoPlace" : "Places disponibles",
        "arroundMe" : "Autour de moi",
        "cotationMediane" : "Cotation mediane",
        "cotationMax" : "Cotation maximum",
        "cotationMin" : "Cotation minimum",
        "longueurMax" : "Longueur maximum",
        "marcheApproche" : "Marche d'approche",
        "dureeMoyenne" : "Durée moyenne",
        "orientation" : "Orientation",
        "traceIGN" : "Tracé IGN",
        "accesIGN" : "Accès IGN",
        "allLevels" : "Tous niveaux",
        "Research" : "Recherche",
        "showOnlyParkingRelai" : "Afficher uniquement les parkings relais MPM",
        "showAllParkings" : "Afficher tous les parkings",
        "startVisit" : "Commencer la visite",
        "map" : "Carte",
        "noBusInfo" : "Désolé, les transports en commun semblent mal adaptés pour effectuer cette sortie. Préférez un véhicule individuel.",
        "downloadFullSpatialBd" : "L'itinéraire demandé se situe en dehors de Marseille et nécessite le téléchargement d'un nouveau fichier sur votre appareil.",
        "cancel" : "Annuler",
        "ok" : "OK",
        "download" : "Télécharger",
        "downloading" : "Téléchargement",
        "downloadRandoTiles" : "Télécharger la carte \"randonnée\"",
        "deleteRandoTiles" : "Supprimer la carte \"randonnée\"",
        "stop" : "Pause",
        "confirmedDeleteTilesRando" : "Êtes-vous certain(e) de vouloir supprimer la carte randonnée ?",
        "carefull" : "Attention",
        "downloadFullSQLite" : "Télécharger la base \"itinéraires\"",
        "deleteFullSQLite" : "Supprimer la base \"itinéraires\"",
        "confirmedDeleteFullSQLite" : "Êtes-vous certain(e) de vouloir supprimer les données \"itinéraires\" élargies ?",
        "deleteAllPictures" : "Supprimer toutes les images",
        "downloadAllPictures" : "Télécharger les images",
        "confirmedDeleteAllPictures" : "Êtes-vous certain(e) de vouloir supprimer toutes les images téléchargées ?",
        "selectNoNetwork" : "Passer en mode hors connexion",
        "selectNetwork" : "Passer en mode connexion",
        "chooseGoogle" : "Choisir la carte Google",
        "chooseLeaflet" : "Choisir la carte personnalisée",
        "chooseImageOffLine" : "Choisir les images \"offline\"",
        "chooseImageInLine" : "Choisir les images \"en ligne\"",
        "connectionNeeded" : "Votre connexion internet semble très lente ou inexistante. Vous ne pourrez accèder à toutes les fonctionnalités de cette page.",
        "connectionOut" : "Votre connexion internet semble très lente ou inexistante. Le téléchargement n'est pas possible.",
        "downloadMPTiles_8_16" : "Télécharger la carte \"routière\"",
        "deleteMPTiles_8_16" : "Supprimer la carte \"routière\"",
        "confirmedDeleteMPTiles_8_16" : "Êtes-vous certain(e) de vouloir supprimer la carte \"routière\" ?",
        "downloadAixSmall_17_19" : "Télécharger la carte \"Aix\"",
        "deleteAixSmall_17_19" : "Supprimer la carte \"Aix\"",
        "confirmedDeleteAixSmall_17_19" : "Êtes-vous certain(e) de vouloir supprimer la carte \"Aix\" ?",
        "nc" : "NC",
        "displayNextResult" : "Afficher le résultat suivant",
        "displayNextResults" : "Afficher les résultats suivants",
        "seeResults" : "Voir les résultats",
        "infoZoomPhotoSwipe" : "Pour quitter le mode zoom, double-cliquez sur la photo.",
        "downloadSqliteDb" : "Pour les itinéraires sur la carte personnalisée, vous devez télécharger un fichier supplémentaire (77 Mo)<br><br>Sinon, choisissez la carte Google depuis Menu -> Paramètres.",
        "noConnectionandNoSpatialSqlite" : "Désolé, mais vous n'êtes pas connecté à internet et vous n'avez pas téléchargé notre base d'itinéraires hors connexion.",
        "downloadFailed" : "Désolé mais votre téléchargement a échoué",
        "deleteFavorite" : "Êtes-vous sûr(e) de vouloir supprimer cet article de vos favoris ?",
        "NoIdeaHome" : "Je ne sais pas de quoi j'ai envie",
        "closestOne" : "Le plus proche",
        "yourOpinion" : "Votre avis",
        "yourOpinionText" : "Vous connaissez désormais un peu mieux notre application.<br><br>Voudriez-vous donner votre avis et noter celle-ci ?",
        "never" : "Jamais",
        "later" : "Plus tard",
        "noLocationInIGNBound" : "Désolé, votre position n'est pas couverte par la carte. Approchez vous du point de départ.",
        "noLocationInBound" : "Désolé, votre position n'est pas couverte par la carte personnalisée.<br><br>Essayez de vous rapprocher de Marseille, sinon utilisez la carte Google depuis Menu -> Paramètres.",
        "spatialItemNotInBound" : "Désolé, cet article est trop éloigné pour être traité hors connexion<br><br>Pour obtenir tout de même un itinéraire, choississez la carte Google depuis Menu -> Paramètres.",
        "openSettingsOnHome" : "Pour une plus grande autonomie ou bénéficier des itinéraires hors connexion, nous vous recommandons d'installer des fichiers supplémentaires.<br><br>Profitez également du wifi pour télécharger toutes les images !<br>",
        "noMoreDisplay" : "Ne plus afficher ce message",
        "tip" : "Conseil",
        "tipGoogle" : "Par défaut, l'application affiche la carte personnalisée.<br><br>Vous pouvez malgré tout choisir d'utiliser la carte Google depuis Menu -> Paramètres.",
        "tipSearch" : "Le moteur de recherche permet de croiser les options.<br><br>Les icônes sous le titre permettent d'y accèder plus rapidement.",
        "tipMenu" : "Un glissement sur le titre pour ouvrir le menu, un clic pour remonter en haut d'une page.",
        "tipFavorite" : "Pour supprimer un favori, faîtes glisser votre doigt horizontalement.",
        "tipMassifDb" : "Cliquez sur l'icône de gauche pour afficher les cartes IGN ou cliquez sur l'icône de droite pour bénéficier de niveaux de zoom plus élevés",
        "tipRandoMap" : "Zoomez sur un massif pour faire apparaître l'icône de téléchargement.",
        "tipDiapo" : "Cette image fonctionne comme un diaporama.<br><br>- Slide gauche ou droite pour faire défiler<br><br>- 1 click pour lancer le mode plein écran<br><br>- Double-click pour zoomer",
        "tipFullTilesTraces" : "Nous vous conseillons également d'installer la carte globale Marseille/Istres/Aix-en-Provence/La Ciotat en niveau de zoom moyen (8 à 15).<br>Pour cela, allez dans Menu -> Paramètres.<br>",
        "downloadMassifDb" : "Vous êtes sur le point de télécharger la carte détaillée du massif comprenant les zooms de 13 à 17, souhaitez-vous continuer ?",
        "exitApp" : "Vous êtes sur le point de quitter l'application.<br><br> Souhaitez-vous continuer ?",
        "exitAppIosIGN" : "Vous êtes sur le point de quitter l'application pour afficher le site www.marseilleProvence.net.<br><br>Si Safari a déjà une fenêtre ouverte en lien avec notre site, veuillez la fermer.<br><br> Souhaitez-vous continuer ?",
        "onlyApp" : "Désolé, cette fonctionalité n'existe pour l'instant que dans l'appli mobile",
        "yes" : "Oui",
        "no" : "Non",
        "topo" : "Topo(s)",
        "restoCircuitSelection" : "<strong>Sélection de restaurants :</strong><br>retournez sur la liste pour le détail",
        "hotelsCircuitSelection" : "<strong>Sélection d'hébergements : </strong><br>retournez sur la liste pour le détail",
        "Petanque" : "Petanque",
        "Trier" : "Filtrer",
        "diaporama" : "Diaporama",
        "frenchTitle" : "Titre en français",
        "itineraryWithNetWork" : "Itinéraires hors connexion",
        "updatedItem" : " nouvel article a été ajouté ou mis à jour. Souhaitez-vous le consulter ?",
        "updatedItems" : " nouveaux articles ont été ajoutés ou mis à jour. Souhaitez-vous les consulter ?",
        "Metro" : "Métro",
        "visiteGuidee" : "Visite guidée",
        "triActivated" : "Filtres",
        "from" : "à partir de",
        "introCellPartner" : "Ce circuit vous est proposé par",
        "category" : "Categorie",
        "bar" : "Bar",
        "roomService" : "Service en chambre",
        "piscine" : "Piscine",
        "parking" : "Parking",
        "ascenseur" : "Ascenseur",
        "wifi" : "Wifi",
        "television" : "Télévision",
        "telephone" : "Téléphone",
        "close" : "A voir / A faire",
        "speciality" : "Spécialité",
        "specialities" : "Specialités",
        "conprendo" : "ok, j'ai compris",
        "promo" : "Promotion",
        "formAvis" : "Vos observations sur ",
        "checkBoxMainStation" : "Retenir comme station principale",
    },
    "en" : {
        "noFavorite" : "No favourite item",
        "remove" : "Delete",
        "date" : "Date",
        "selectDate" : "Select a date",
        "selectFilter" : "Select a filter",
        "selectType" : "Select a type",
		"loader" : "Loading...",
		"noGeoloc" : "Sorry, geolocation is not available",
        "mapItinary" : "Map / itinerary",
		"filters" : "Filters",
        "browserIncompatible" : "Incompatible browser",
		"showDetails" : "Show details",
		"changeDate" : "Change the date",
        "showMyPosition" : "Show my position",
        "myPosition" : "My position",
        "showDrivingRoute" : "Driving route",
        "showWalkingRoute" : "Walking route",
        "duration" : "Duration",
        "distance" :  "Distance",
        "denivele" :  "Variation in height",
        "altitudeMax" :  "Maximum altitude",
		"favorite" : "Favourite",
        "correspondance" : "Connection",
        "infosTransport" : "Transport Infos",
        "infosPratiques" : "Pratical infos",
        "information" : "Information",
        "selectItemsToDisplay" : "Select items to display",
        "allItems" : "All",
        "settings" : "Settings",
        "information" : "Information",
        "dispoVelo" : "Bikes / places",
        "numberDispoVelo" : "Available bikes",
        "numberDispoPlace" : "Free places",
        "arroundMe" : "Arround me",
        "cotationMediane" : "Medium grade",
        "cotationMax" : "Maximum grade",
        "cotationMin" : "Minimum grade",
        "longueurMax" : "Maximum length",
        "marcheApproche" : "Walking time",
        "dureeMoyenne" : "Average duration",
        "orientation" : "Orientation",
        "traceIGN" : "IGN route",
        "accesIGN" : "IGN access",
        "allLevels" : "All levels",
        "Research" : "Research",
        "showOnlyParkingRelai" : "Only show car parks with connections",
        "showAllParkings" : "Show all the car parks",
        "startVisit" : "Start the visit",
        "map" : "Map",
        "noBusInfo" : "Sorry, public transports seem not to be adapted for this item. Please, take an individual vehicule.",
        "downloadFullSpatialBd" : "The requested route is located out of Marseille. You need to download a new file on your device.",
        "cancel" : "Cancel",
        "ok" : "OK",
        "download" : "Download",
        "downloading" : "Downloading",
        "downloadRandoTiles" : "Download the hiking map",
        "deleteRandoTiles" : "Remove the hiking map",
        "stop" : "Stop",
        "confirmedDeleteTilesRando" : "Do you confim removing the hiking map?",
        "carefull" : "Carefull",
        "downloadFullSQLite" : "Download routing datas",
        "deleteFullSQLite" : "Delete routing datas",
        "confirmedDeleteFullSQLite" : "Do you confim removing all the routing datas?",
        "deleteAllPictures" : "Remove all the pictures",
        "downloadAllPictures" : "Download the pictures : ",
        "confirmedDeleteAllPictures" : "Do you confim removing all the downloaded pcitures ?",
        "selectNoNetwork" : "Switch to NO connection mode",
        "selectNetwork" : "Switch to connection mode",
        "chooseGoogle" : "Choose the Google map",
        "chooseLeaflet" : "Choose the customized map",
        "chooseImageOffLine" : "Choose pictures \"offline\"",
        "chooseImageInLine" : "Choose pictures \"inline\"",
        "connectionNeeded" : "Your internet network seems to be very slow or disconnected. You won't be able to have access to all the features of this page.",
        "connectionOut" : "Your internet network seems to be very slow or disconnected. The download is not possible.",
        "downloadMPTiles_8_16" : "Download the routing map",
        "deleteMPTiles_8_16" : "Delete the routing map",
        "confirmedDeleteMPTiles_8_16" : "Do you confim removing the routing map?",
        "downloadAixSmall_17_19" : "Download the map \"Aix\"",
        "deleteAixSmall_17_19" : "Delete the map \"Aix\"",
        "confirmedDeleteAixSmall_17_19" : "Do you confim removing the routing map?",
        "nc" : "Unknown",
        "displayNextResult" : "Display the next result",
        "displayNextResults" : "Display the next results",
        "seeResults" : "Show the items",
        "infoZoomPhotoSwipe" : "To exit the zoom mode, double-tap on the picture.",
        "downloadSqliteDb" : "The routing service on the customized map requires to donwload a new file (77 Mo). <br><br>Otherwise, choose the Google map from Menu -> Settings !",
        "noConnectionandNoSpatialSqlite" : "Sorry, but you're not connected to a network and you didn't donwload the Itinerary data base.",
        "downloadFailed" : "Sorry but your download failed",
        "deleteFavorite" : "Do you confim removing this item from your favourites?",
        "NoIdeaHome" : "I don't know what I want",
        "closestOne" : "The closest one",
        "yourOpinion" : "Your opinion",
        "yourOpinionText" : "You know this application much better now.<br>Would you like to give your opinion about it?",
        "never" : "Never",
        "later" : "Later",
        "noLocationInIGNBound" : "Sorry, your location is not in the map zone. Please move closer to the starting point.",
        "noLocationInBound" : "Sorry, your location is not in the customized map zone.<br><br>Try to get closer to Marseille, otherwise choose the Google map from  Menu -> Settings.",
        "spatialItemNotInBound" : "Sorry, this item is too far to be treated without network<br><br>If you still want a route, choose the Google map from Menu -> Parameters.",
        "openSettingsOnHome" : "For a larger autonomy or to have access to routing service without network, please install more files.<br><br>Take advantage of the wifi to download all the images!<br>",
        "noMoreDisplay" : "Don't display this message",
        "tip" : "Advice",
        "tipGoogle" : "By default, the application uses the customized map.<br><br>Otherwise, you may choose the Google map from Menu -> Parameters.",
        "tipSearch" : "The search engine allows you to select multiple criterias<br><br>The icons under the title gives a quicker access.",
        "tipMenu" : "Slide on the title to open the menu, or tap to get the top ot the page.",
        "tipFavorite" : "To delete an item from your favourites, give a horizontal slide on it.",
        "tipMassifDb" : "Click on the left icon to switch on the IGN map or click on the right icon to get higher zoom levels access.",
        "tipRandoMap" : "zoom on a massif zone to make appear its download icon.",
        "tipDiapo" : "This image works as a slideshow.<br><br>- Slide left or right to show pictures<br><br>- 1 tap for the full screen mode<br><br>- Double-tap to zoom",
        "downloadMassifDb" : "You're about to download the detailed map of this massif including zooms from 13 to 17, do you confirm?",
        "tipFullTilesTraces" : "We also suggest you to install the global map Marseille/Istres/Aix-en-Provence/La Ciotat with medium zoom levels (8 to 15).<br>To proceed, go to Menu -> Parameters.<br>",
        "exitApp" : "You're going to exit the application.<br><br> Do you confirm?",
        "exitAppIosIGN" : "You're going to exit the application to access to the web site www.marseilleProvence.net.<br><br>If Safari has already a window opened on that site, please close it.<br><br>Would you like to go on?",
        "onlyApp" : "Sorry, this functionality exist only in the mobile app",
        "yes" : "Yes",
        "no" : "No",
        "topo" : "Topo(s)",
        "restoCircuitSelection" : "<strong>Restaurants selection:</strong><br>back to the list for détails",
        "hotelsCircuitSelection" : "<strong>Accomodation selection:</strong><br>back to the list for détails",
        "Petanque" : "Boules",
        "Trier" : "Filters",
        "diaporama" : "Slideshow",
        "frenchTitle" : "Title in french",
        "itineraryWithNetWork" : "Routing without network",
        "updatedItem" : " new article have been added or updated. Would you like to display it?",
        "updatedItems" : " new articles have been added or updated. Would you like to display them?",
        "Metro" : "Tube",
        "visiteGuidee" : "Guided tour",
        "triActivated" : "Filters",
        "from" : "from",
        "introCellPartner" : "This tour is suggested by",
        "category" : "Category",
        "piscine" : "Swimming pool",
        "bar" : "Bar",
        "roomService" : "Room service",
        "parking" : "Car park",
        "ascenseur" : "Lift",
        "wifi" : "Wifi",
        "television" : "Television",
        "telephone" : "Phone",
        "close" : "A voir / A faire",
        "speciality" : "Speciality",
        "specialities" : "Specialities",
        "conprendo" : "ok, I understood",
        "promo" : "Discout",
        "formAvis" : "Your observation about",
        "checkBoxMainStation" : "Mark as my main station",
    }
}


var canyonLabel = {
    "fr" : {
        "approcheTime" : "Marche d'approche",
        "descenteTime" : "Descente",
        "retourTime" : "Marche retour",
        "longueur" : "Longueur",
        "denivele" : "Dénivelé",
        "cascadeMax" : "Cascade max",
        "corde" : "Corde (1 brin)",
    },
    "en" : {
        "approcheTime" : "Walking there",
        "descenteTime" : "Duration",
        "retourTime" : "Walking back",
        "longueur" : "Length",
        "denivele" : "Variation in height",
        "cascadeMax" : "Cascade max",
        "corde" : "Rope (1 length)",
    }
}


var accessMassifLabel = {
    "fr" : {
        "titleBtn" : "Accès réglementé du 01/06 au 30/09",
        "title" : "Du 1er juin au 30 septembre la fréquentation des massifs est réglementée.",
        "p1" : "L'accès des personnes aux massifs, la circulation et le stationnement des véhicules sont définis par 3 niveaux de danger météorologique :",
        "p2" : "- ORANGE : accès autorisé<br>- ROUGE : accès autorisé uniquement le matin de 6h à 11h<br>- NOIR : accès interdit",
        "p3": "Information au <a href=\"0811201313\" target=\"_blank\" style=\"font-weight:bold; text-decoration:underline;\" class=\"textColorGray\">0811 20 13 13</a> (coût d’un appel local) ou sur internet : <a href=\"http://www.bouches-du-rhone.gouv.fr/files/massif/\" target=\"_blank\" style=\"font-weight:bold; text-decoration:underline;\" class=\"textColorGray\"> www.bouches-du-rhône.pref.gouv.fr</a>",
        "1" : "Accès autorisé",
        "2" : "Accès autorisé le matin de 6h à 11h",
        "3" : "Accès interdit",
        "color1" : "orange",
        "color2" : "red",
        "color3" : "black",
        "listVilles" : "Liste villes",
        "villesConcernees" : "les villes concernées",
        "massifsRules" : "La réglementation",
    },
    "en" : {
        "titleBtn" : "Limited access from 01/06 to 30/09",
        "title" : "From June 1st to September 30th, the access to the mountains is limited.",
        "p1" : "People's access to the mountains, the traffic and the car parks are ruled by 3 different levels of meteological danger:",
        "p2" : "- ORANGE : authorized access<br>- RED : authorized access only in the morning from 6am to 11am<br>- BLACK : forbidden access",
        "p3": "Information by calling <a href=\"0811201313\" target=\"_blank\" style=\"font-weight:bold; text-decoration:underline;\" class=\"textColorGray\">0811 20 13 13</a> (local price) or internet : <a href=\"http://www.bouches-du-rhone.gouv.fr/files/massif/\" target=\"_blank\" style=\"font-weight:bold; text-decoration:underline;\" class=\"textColorGray\"> www.bouches-du-rhône.pref.gouv.fr</a>",
        "1" : "Authorized Access",
        "2" : "Authorized Access only from 6am to 11am",
        "3" : "Forbidden access",
        "listVilles" : "List cities",
        "villesConcernees" : "the related cities",
        "massifsRules" : "The rules",
    }
}


var practicalLabel = {
	"fr" : {
        "AccompagnateurMoyenneMontagne" : "Guide de moyenne montagne",
        "MoniteurEscalade" : "Moniteur d'escalade",
        "AccompagnateurMoniteur" : "Guide & Moniteur d'escalade",
        "locationSport" : "Location materiel sport et loisir",
        "serviceGuide" : "Guide touristique",
        "VeloMPM" : "Vélos en libre service",
        "Camping" : "Camping",
		"CampingCar" : "Parking pour camping-car",
        "Parking" : "Parking",
        "AgenceReceptive" : "Agence de voyage/réceptive",
        "rentalShops" : "Magasins de location",
        "stations" : "Stations",
        "lignes" : "Lignes",
        "InfosDetailInHomeRestos" : "Retrouvez le détail de nos restaurants favoris<br> en page d'accueil (J'ai envie de quoi ? Restaurants)."
    },
    "en" : {
        "AccompagnateurMoyenneMontagne" : "Mountain guide",
        "MoniteurEscalade" : "Climbing instructor",
        "AccompagnateurMoniteur" : "Guide & Climbing instructor",
        "locationSport" : "Sports and recreation equipment rental",
        "serviceGuide" : "Touristic guide",
        "VeloMPM" : "Bike station",
        "Camping" : "Campsite",
		"CampingCar" : "Motorhome parking area",
        "Parking" : "Car park",
        "AgenceReceptive" : "Travel agency",
        "rentalShops" : "Rental Stores",
        "stations" : "Stations",
        "lignes" : "Lines",
        "InfosDetailInHomeRestos" : "Find more details about our favorite restaurants<br>at the Home page (What do i want? Restaurants)."
    }
}


var metaLabel = {
    "fr" : {
        "titleHome" : "Marseille Provence entre nature et culture",
    },
    "en" : {
        "titleHome" : "Marseille Provence, Nature and Culture",
    }
}


var infoTimeTransportLabel = {
	"fr" : {
        "Marseille" : "la gare Saint Charles, Marseille",
        "Aix" : "la gare routière d'Aix-en-Provence",
		"Arles" : "la gare SCNF d'Arles",
        "Jouques" : "Jouques",
        "Geoloc" : "ma position"
    },
    "en" : {
        "Marseille" : "Marseille Saint Charles station",
        "Aix" : "Aix-en-Provence bus station",
		"Arles" : "Arles station",
        "Jouques" : "Jouques",
        "Geoloc" : "my position"

    }
}



var menuLabel = {
    "fr" : {
        "home" : "Accueil",
        "monumentsMenu" : "Monuments - patrimoine",
        "sitesNaturelsMenu" : "Sites naturels",
        "baignadeMenu" : "Plage - Baignade - Piscine",
        "escaladeMenu" : "Sites d'escalade",
        "parcAccroMenu" : "Parcs acrobatiques forestiers",
        "canyonsMenu" : "Canyons",
        "SitesNaturelsRemarquablesMenu" : "Encore plus de sites naturels...",
        "expoMenu" : "Expositions - musées",
        "OTMenu" : "Pour vous informer",
        "agencesMenu" : "Pour vous accueillir",
        "guidesMenu" : "Pour vous accompagner",
        "moniteursMenu" : "Pour marcher ou grimper",
        "veloMenu" : "Pour louer un vélo",
        "parkingMenu" : "Pour stationner",
        "campingMenu" : "Pour planter sa tente",
        "campingCarMenu" : "Pour garer son camping car",
        "hotelMenu" : "Pour vous héberger",
        "restoMenu" : "Pour vous restaurer",
        "barMenu" : "Pour boire un verre",
        "myFavorites" : "Mes favoris",
        "siteMapMenu" : "Plan du site",
        "metroTramMenu" : "Pour se déplacer",
        "contactMenu" : "Contact / Copyright",
        "massifsMenu" : "Accès aux massifs",
		"circuitMenu" : "Ma visite du Vieux port",
        "routingMapMenu" : "Carte routière",
        "randoMapMenu" : "Carte rando",
    },
    "en" : {
        "home" : "Home",
        "monumentsMenu" : "Monuments - tourism",
        "sitesNaturelsMenu" : "Natural sites",
        "baignadeMenu" : "Beach - swimming pool",
        "escaladeMenu" : "Rock Climbing",
        "parcAccroMenu" : "Tree Climbing",
        "canyonsMenu" : "Canyons",
        "SitesNaturelsRemarquablesMenu" : "More natural sites...",
        "expoMenu" : "Exhibitions - Museums",
        "OTMenu" : " Where to get informed",
        "agencesMenu" : "Who to welcome you",
        "guidesMenu" : "Who to guide you",
        "moniteursMenu" : "Who to climb/walk with",
        "veloMenu" : "Where to rent a bike",
        "parkingMenu" : "Where to park a vehicule",
        "campingMenu" : "Where to set up your tent",
        "campingCarMenu" : "Where to park your motor home",
        "hotelMenu" : " Where to sleep ",
        "restoMenu" : " Where to eat",
        "barMenu" : "Where to have a drink",
        "myFavorites" : "My favourites",
        "siteMapMenu" : "Site map",
        "metroTramMenu" : "Which public transports",
        "contactMenu" : "Contact / Copyright",
        "massifsMenu" : "Legal massif access",
        "circuitMenu" : "My Old Port visit",
        "routingMapMenu" : "Driving map",
        "randoMapMenu" : "Hiking map",
    }
}


var detailLang = {
    "fr": {
        "city": "Commune",
        "place" : "Lieu",
        "massif": "Massif",
        "level": "Cotation",
        "medLevel": "Cotation med.",
        "type": "Type",
        "presentation": "Description",
        "addFavorite" : "Ajout aux favoris",
        "removeFavorite" : "Suppr. des favoris",
        "tarif" : "Tarif",
        "free" : "gratuit",
        "notFree" : "payant - Prix NC",
        "priceMax" : "plein",
        "priceMin" : "réduit",
        "reservation" : "Réservation",
        "moreInfo" : "Infos complémentaires",
        "transportCommun" : "Transport en commun",
        "readMore" : "Lire la suite..."
    },
	"en": {
        "city": "City",
        "place" : "Place",
        "massif": "Mountains",
        "level": "Grade",
        "medLevel": "Med. grade",
        "type": "Type",
        "presentation": "Description",
        "addFavorite" : "Add to favourites",
        "removeFavorite" : "Delete from favourites",
        "tarif" : "Price",
        "free" : "free",
        "notFree" : "Unknown charge",
        "priceMax" : "full",
        "priceMin" : "reduced",
        "reservation" : "Booking",
        "moreInfo" : "Additionnal infos",
		"transportCommun" : "Public transport",
        "readMore" : "Read more...",
    }
};


var selectionBlockLang =
{
    "fr": {
        "NoMatter" : "Aucune importance",
        "activityTitle": "J'ai envie de quoi ?",
        "activityTitleSelected": "J'ai envie<br>de ",
        "activityTitleSelectedVoyelle": "J'ai envie<br>d'",
        "cityTitle": "Je pars d'où ?",
        "cityTitleSelected": "Je pars<br>de ",
        "cityTitleSelectedVoyelle": "Je pars<br>d'",
        "cityTitleSelectedUne": "Je pars d'une<br>",
        "transportTitle": "Je me déplace comment ?",
        "transportTitleSelected": "Je me déplace<br>",
        "timeTitle": "J'ai combien de temps ?",
        "timeTitleSelected": "J'ai "
    },
	"en": {
        "NoMatter" : "No matter",
        "activityTitle": "What do I want?",
        "activityTitleSelected": "I want to do<br>",
        "activityTitleSelectedVoyelle": "I want",
        "cityTitle": "Where from?",
        "cityTitleSelected": "From ",
        "cityTitleSelectedVoyelle": "From ",
        "cityTitleSelectedUne": "From a<br>",
        "transportTitle": "How do I move?",
        "transportTitleSelected": "I move<br>",
        "timeTitle": "How long?",
        "timeTitleSelected": "I'v got "
    }
};


var cityLabel = {
    "fr" : {
        "Marseille" : "Marseille",
        "Aix" : "Aix-en-Provence",
        "Arles" : "Arles",
        "Jouques" : "Jouques",
        "Geoloc" : "Ici",
        "MarseilleStCharles" : "Marseille - gare Saint Charles",
        "AixGareRoutiere" : "Aix-en-Provence - gare routière",
        "ArlesMairie" : "Arles - hôtel de ville",
        "ChoosePosition" : "Position sélectionnée",
        "ChoosePositionOnMap" : "Choisir une position sur la carte",
    },
    "en" : {
        "Marseille" : "Marseille",
        "Aix" : "Aix-en-Provence",
        "Arles" : "Arles",
        "Jouques" : "Jouques",
        "Geoloc" : "Here",
        "MarseilleStCharles" : "Marseille - Saint Charles station",
        "AixGareRoutiere" : "Aix-en-Provence - bus station",
        "ArlesMairie" : "Arles - cityhall",
        "ChoosePosition" : "Selected position",
        "ChoosePositionOnMap" : "Choose a position on the map",
    }
}


var fromCityLabel = {
    "fr" : {
        "Marseille" : "De Marseille St Charles",
        "Aix" : "Depuis Aix (gare)",
        "Arles" : "Depuis Arles centre",
        "Jouques" : "Depuis Jouques centre",
    },
    "en" : {
        "Marseille" : "From Marseille station",
        "Aix" : "From Aix bus station",
        "Arles" : "From Arles centre",
        "Jouques" : "From Jouques centre",
    }
}


var tableLabel = {
	"fr" : {
        "BonsPlans" : "Bons plans",
        "Petanque" : "Terrain de boules",
        "Sortir" : "Sortir",
        "Restos" : "Restaurants",
        "Dormir" : "Hébergements",
        "Loisirs" : "Sports & loisirs",
        "Shopping" : "Shopping",
        "NoIdea" : "Aucune idée",
		"SitesNaturels" : "Sites naturels",
		"SitesEscalade" : "Escalade",
		"Canyons" : "Canyoning",
		"Monuments" : "Patrimoine",
		"SitesNaturelsRemarquables" : "Tous les sites",
		"ExpositionsMusees" : "Galeries / Musées",
		"PlageBaignadePiscine" : "Baignade",
		"MP2013" : "Événements MP2013",
        "Expo" : "Expositions MP2013",
        "Randonnee" : "Randonnées",
        "VieuxPortRD" : "Circuit vieux port - rive droite",
        "Circuits" : "Circuits géolocalisés",
        "Classics" : "Les classiques",
        "Favorites" : "Les coups de coeur",
        "MyFavorites" : "Mes favoris",
        "BestViews" : "Les plus belles vues facilement accessible",
        "ChangeWorld" : "Citoyenneté",
        "Slackline" : "Slackline"
	},
	"en" : {
        "BonsPlans" : "Top tips",
        "Petanque" : "Petanque ground",
        "Sortir" : "Going out",
        "Restos" : "Restaurants",
        "Dormir" : "Accomodation",
        "Loisirs" : "Sports & hobbies",
        "Shopping" : "Shopping",
        "NoIdea" : "No idea",
		"SitesNaturels" : "Natural sites",
		"SitesEscalade" : "Climbing",
		"Canyons" : "Canyoneering",
		"Monuments" : "Heritage",
		"SitesNaturelsRemarquables" : "All natural sites",
		"ExpositionsMusees" : "Galleries / Museums",
		"PlageBaignadePiscine" : "Swimming",
		"MP2013" : "Program MP2013",
        "Expo" : "Expositions MP2013",
        "Randonnee" : "Hiking",
        "VieuxPortRD" : "Old Port - right side tour",
        "Circuits" : "Geolocated tours",
        "Classics" : "The classics",
        "Favorites" : "Our favorites",
        "MyFavorites" : "My favourites",
        "BestViews" : "The most beautiful views easily accessible",
        "ChangeWorld" : "Citizenship",
        "Slackline" : "Slackline"
	}
};


var transportItems =
{
    "fr": {
        "pied": "A pied",
        "velo": "Vélo",
        "auto": "Auto",
        "moto": "Moto",
		"bus": "bus/train"
    },
	"en": {
        "pied": "On foot",
        "velo": "Bike",
        "auto": "Car",
        "moto": "Moto",
		"bus": "Bus/train"
    }
};


var timeItems =
{
    "fr": {
        "demiJour": "1/2 journée",
        "jour": "1 journée et +",
        "jourSmall": "1 jour"
    },
	"en": {
        "demiJour": "1/2 day",
        "jour": "1 day and more",
        "jourSmall": "1 day"
    }
};


var detailLabel =
{
    "fr": {
        "close": "A proximité",
        "toDoToSee": "A Voir / A faire",
        "presentation": "Présentation",
		"geoloc": "Itinéraire",
        "textComing" : "Texte en cours d'écriture",
        "vieuxPortInfosTraffic" : "D'une manière générale, éviter de circuler en voiture autour du Vieux port et sur le bas de la Canebière.",
        "goudesInfosTraffic" : "En période de forte affluence (même en hiver le weekend lors de belles journées ensoillées), la traversée de Montredon ou des Goudes en voiture est généralement très problématique. Il est fortement recommandé de vous déplacer en deux roues, ou de privilégier tout déplacement avant 11h pour l'aller, et avant 17h ou après 20h pour le retour. En plein été, les embouteillages peuvent apparaître encore plus tôt et les massifs seront toujours interdits d'accès après 11h.",
        "routeDuFeuInfosTraffic" : "La route (du feu) menant à la calanque est réglementée pour les voitures, mini-bus et camping-cars.<br>Du 31 mars au 31 mai, l'accès est interdit les weekends et jours fériées.<br>Du 1er juin au 30 septembre, l'accès est interdit tous les jours.<br>Les motos sont autorisées à circuler ainsi que les voitures ayant un lassez-passer. Il faut pour cela être résidant ou justifier d'une réservation à un restautant.<br>De grands parkings permettent de laisser son véhicule pour continuer à pied, comptez alors 1h de marche.",
        "introVieuxPortRD" : "<br>Le vieux port de Marseille est le quartier le plus emblématique de la ville.<br> <br>Nous vous proposons un circuit pédestre pour visiter les principaux sites touristiques de sa rive droite : Hôtel de Ville, Vieille charité, Mucem...<br> <br>Ce parcours d'une journée comprend deux arrêts pour vous restaurer midi et soir dans les établissements de votre choix, ainsi qu'une sélection d'hébergement à proximité.",
        "isUpdateNextVersion" : "<br><em>Merci de noter que les photos de cet article ne seront disponibles hors connexion qu'à la prochaine mise à jour sur le store. Pensez à faire une capture d'écran si besoin.</em>",
		
    },
	"en": {
		"close": "Nearby",
        "toDoToSee": "To do / to see",
        "presentation": "Presentation",
		"geoloc": "Route",
        "textComing" : "The translation is coming soon",
        "vieuxPortInfosTraffic" : "In general, avoid driving around the Old Port and the bottom of the Canebière.",
        "goudesInfosTraffic" : "In peak times (even in winter during the weekend when the sun is shinning), crossing Montredon or the Goudes by car is usually very problematic. It is strongly recommended that you move with a bycicle or a motorbyke, otherwise move before 11am to go, and before 5pm or after 8pm for the return. In midsummer, keep in mind that the traffic jams may appear earlier and the massif will always denied access after 11am.",
        "routeDuFeuInfosTraffic" : "The (fire) road leading to the creek is restricted for cars, minibuses and motorhomes.<br>From March 31 to May 31, access is denied on weekends and holidays. <br>From June 1 to September 30, access is denied every day. <br>Motorcycles are still allowed, and also people who have a pass. This requires to be resident or to justify a booking in a restautant.<br>Large car parks allow you to let your vehicle to continue on foot, then count 1 hour walk.",
        "introVieuxPortRD" : "<br>The old port of Marseille is the most iconic part of the city.<br> <br>We suggest you a walking tour to visit the main attractions of the right bank: Town Hall, Old charity Mucem ...<br> <br>This tour has two stops for eating lunch and dinner in the places of your choice, and a selection of accommodation nearby.",
        "isUpdateNextVersion" : "<br><em>Please note that the photos for this article will be available without connection only in the next update on the store. Think about a screenshot in necessary.</em>",
    },
};


var optionLabel =
{
    "fr": {
        "rayon": "dans un rayon de",
		"Items" : "centres d'intérêt",
		"MP2013" : "événements",
		"Restaurants" : "restaurants",
		"Bars" : "bars/pubs",
		"Hotels" : "hébergements",
        "Hebergements" : "hébergements",
		"webSite" : "Site web",
		"contact" : "Coordonnées",
		"timeToGo" : "Combien de temps pour s'y rendre ?",
		"OfficesTourisme" : "offices de tourisme",
		"Guides" : "guides touristiques",
		"AgencesReceptives" : "Agences de voyage/réceptives",
		"Campings" : "Campings",
		"CampingsCar" : "Parking pour camping-car",
		"Gites" : "Gîtes",
		"MoniteursEscalade" : "Marcher & grimper",
		"ParcAccro" : "Parcs acrobatiques forestiers",
		"LocationVelo" : "Location de vélo",
        "Parkings" : "Parkings",
        "MetroTram" : "Métro / tramway",
		"Services" : "services",
        "SiteMap" : "Plan du site",
        "Massifs" : "Conditions d'accès aux massifs forestiers"
    },
	"en": {
		"rayon": "within",
		"Items" : "points of interest",
		"MP2013" : "events",
		"Restaurants" : "restaurants",
		"Bars" : "bars/pubs",
		"Hotels" : "Accomodation",
        "Hebergements" : "Accomodation",
		"webSite" : "Web site",
		"contact" : "Contacts",
		"timeToGo" : "How long to get there?",
		"OfficesTourisme" : "tourist offices",
		"Guides" : "tourist guides",
		"AgencesReceptives" : "Travel agencies",
		"Campings" : "Campsites",
		"CampingsCar" : "Motorhomes parking areas",
		"Gites" : "B&B",
		"MoniteursEscalade" : "Walk & climb",
		"ParcAccro" : "Climbing trees",
		"LocationVelo" : "Bike rental",
        "Parkings" : "Car parks",
        "MetroTram" : "Tube / trolleybus",
		"Services" : "services",
        "SiteMap" : "Site map",
        "Massifs" : "Possible access to mountains"
    }
};


var typeLabel =
{
	"fr" : {
		"Religieux" : "Édifice religieux",
		"Militaire" : "Bâtiment militaire",
		"Architecture" : "Architecture",
		"Centre" : "Centre ville",
        "Quartier" : "Quartier",
        "Parc" : "Parc & forêt",
        "Monument" : "Monument",
		"Palais" : "Palais, chateau",
        "Attraction" : "Attraction",
		"Lac" : "Lac",
        "River" : "Lac & rivière",
		"Plage" : "Plage",
		"Calanque" : "Calanque",
		"Piscine" : "Piscine",
		"Classique" : "Classique",
		"Moderne" : "Moderne",
		"Contemporain" : "Contemporain",
		"Street" : "Street art",
		"Cinetique" : "Art cinétique",
		"Antique" : "Antiquité",
		"Archeologie" : "Archéologie",
		"Multimedia" : "Multimédia",
        "Photographie" : "Photographie",
		"Tribal" : "Art tribal",
		"Couennes" : "Couennes",
		"GVE" : "GVE",
		"TA" : "TA",
        "Bloc" : "Bloc",
		"Sportif" : "Sportif",
		"Expert" : "Expert",
		"Initie" : "Initié",
		"Debutant" : "Débutant",
		"Familial" : "Familial",
		"Littoral" : "Littoral",
		"Massif" : "Massif",
		"Foret" : "Forêt",
		"Ile" : "Île",
        "Plongee" : "Plongée",
        "Technique" : "Technique",
        "Civilisation" : "Civilisation",
        "Historique" : "Historique",
        "Science" : "Science",
        "Shopping" : "Commerce",
        "Petanque" : "Terrain de boules",
        "Cafe" : "Bar / Café",
        "Restaurant" : "Restaurant",
        "Spectacle" : "Spectacle",
        "Transport" : "Transport",
        "Disco" : "Discothèque",
        "Cinema" : "Cinema",
        "Agenda" : "Agenda",
        "Festival" : "Festival",
        "Concert" : "Concert, soirée",
        "Service" : "Service",
        "toilette" : "Toilettes",
        "douche" : "Douches",
        "eauPotable" : "Eau potable",
        "sable" : "Plage de sable",
        "galet" : "Plage de galets",
        "secours" : "Plage surveillée",
        "beachVolley" : "Beach-volley",
        "eauDouce" : "Eau douce",
        "Traditionnelle_Actuelle" : "Traditionnelle",
        "Gastronomique" : "Gastronomique",
        "Méditerranéenne_Provençale" : "Méditerranéenne",
        "Italienne" : "Italienne",
        "Espagnole" : "Espagnole",
        "Corse" : "Corse",
        "Pizza" : "Pizza",
        "Provençale" : "Provençale",
        "Asiatique_Japonaise_Vietnamienne_Chinoise" : "Asiatique",
        "Maghreb_Syrienne_Marocaine_Algérienne" : "Maghreb",
        "Orientale_Armenienne_Turque_Libanaise" : "Orientale",
        "Indienne_Pakistanaise" : "Indienne",
        "Exotique_Antilles_Réunion_Créole" : "Exotique",
        "Amérique" :  "Amérique du Sud",
        "Bio_Végétarien" : "Bio/végétarien",
        "Poisson" : "Fruits de mer",
        "Kasher" : "Kasher",
        "Crêpes_Salades_Sandwiches_Restauration" : "Crêpes/salades",
        "Fondues_Fromages" : "Fondue/Fromage",
        "rapide" : "Fast Food",
        "1":"Categorie 1*",
        "2":"Categorie 2*",
        "3":"Categorie 3*",
        "4":"Categorie 4*",
        "5":"Categorie 5*",
        "1*":"1*",
        "2*":"2*",
        "3*":"3*",
        "4*":"4*",
        "5*":"5*",
        "Gay" : "Gay friendly",
        "Handicap" : "Handicap",
        "ChambreHote" : "Chambre d'hôte",
        "soleil" : "Fleur de soleil",
        "Gîtes" : "Gîtes de France",
        "Gite" : "Gîte",
        "Clévacances" : "Clévacances",
        "GiteEtMeuble" : "Location",
        "Residence" : "Residence",
        "Hotel" : "Hôtel",
        "AubergeJeunesse" : "Auberge de jeunesse",
        "Breakfast" : "Bed & Breakfast",
        "paysan" : "Accueil Paysan",
        "Ferme" : "Bienvenue à la ferme",
        "vueMer" : "Vue mer",
        "noMistral" : "Abrité du Mistral",
        "ouvertNuit" : "Accessible 24/24",
        "eclairage" : "éclairage",
        "club" : "Club",
        "Calanques" : "Les Calanques",
        "bestOf" : "Best of",
        "vieuxPort" : "Vieux port",
        "laPlaine" : "La Plaine",
        "classics" : "Classiques",
        "favorites" : "Coups de coeur",
        "Nord" : "Nord",
        "Sud" : "Sud",
        "Est" : "Est",
        "Ouest" : "Ouest",
        "eco" : "Plans routards",
        "chic" : "Plans chics",
        "isUpdate" : "Articles récents",
        "voyage" : "Voyage",
        "receptive" : "Agence réceptive",
        "evenementielle" : "Evénementielle",
        "operator" : "Tour operateur",
        "parkingRelais" : "Parking relais MPM",
        "prixMoyen" : "Budget moyen (un plat)",
        "vin" : "Vin en bouteille",
        "pichet" : "Vin au pichet",
        "terrasse" : "Terrasse",
        "takeAway" : "Vente à emporter",
        "Bouillabaisse" : "Bouillabaisse",
        "Aioli" : "Aïoli",
        "10" : "- de 10€",
        "15" : "de 10 à 15€",
        "20" : "de 16 à 21€",
        "20" : "de 16 à 21€",
        "25" : "+ de 21€",
        "dimanche" : "Le dimanche",
        "lundi" : "Le lundi",
        "midi" : "Le midi",
        "soir" : "Le soir",
        "ruePietonne" : "Rue Piétonne",
        "Hebergement" : "Hébergement",
        "Loisir" : "Sport & Loisir",
        "Market" : "Marché",
        "Alimentation" : "Alimentation",
        "Artisanat" : "Artisanat",
        "Culture" : "Culture",
        "ViePratique" : "Vie pratique",
        "Mode" : "Mode",
        "Cave" : "Cave",
        "Circuit" : "Circuit",
        "Boucle" : "Boucle",
        "Club" : "Club",
        "Guide" : "Guide",
        "ParcLoisir" : "Parc loisir",
        "Visite" : "Visite",
        "Atelier" : "Atelier",
        "Slackline" : "Slackline",
        "Waterline" : "Waterline",
        "Longline" : "Longline",
        "Highline" : "Highline",
        "MiseEau" : "Mise à l'eau",
        "Solidarite" : "Solidarité",
        "Environnement" : "Environnement",
	},
	"en" : {
		"Religieux" : "Religious building",
		"Militaire" : "Military building",
		"Architecture" : "Architecture",
		"Centre" : "Town centre",
        "Quartier" : "District",
        "Parc" : "Park & forest",
        "Monument" : "Monument",
		"Palais" : "Palace, castle",
        "Attraction" : "Attraction",
		"Lac" : "Lake",
        "River" : "Lake & river",
		"Plage" : "Beach",
		"Calanque" : "Creek",
		"Piscine" : "Swimming-pool",
		"Classique" : "Classical",
		"Moderne" : "Modern",
		"Contemporain" : "Contemporary",
		"Street" : "Street art",
		"Cinetique" : "Cinetic art",
		"Antique" : "Antiquity",
		"Archeologie" : "Archaeology",
		"Multimedia" : "Multimedia",
        "Photographie" : "Photography",
		"Tribal" : "Tribal art",
		"Couennes" : "1-Pitch",
		"GVE" : "Multi-Pitch",
		"TA" : "TC",
        "Bloc" : "Bouldering",
		"Sportif" : "Sporty",
		"Expert" : "Expert",
		"Initie" : "Initiated",
		"Debutant" : "Beginner",
		"Familial" : "Family",
		"Littoral" : "Coastline",
		"Massif" : "Mountains",
		"Foret" : "Forest",
		"Ile" : "Island",
        "Plongee" : "Diving",
        "Technique" : "Technical",
        "Civilisation" : "Civilization",
        "Historique" : "Historic",
        "Science" : "Science",
        "Shopping" : "Shopping",
        "Petanque" : "Petanque ground",
        "Cafe" : "Bar & Coffee",
        "Restaurant" : "Restaurant",
        "Spectacle" : "Show",
        "Transport" : "Transport",
        "Disco" : "Nightclub",
        "Cinema" : "Cinema",
        "Agenda" : "Agenda",
        "Festival" : "Festival",
        "Concert" : "Concert, party",
        "Service" : "Service",
        "toilette" :  "Toilet",
        "douche" : "Shower",
        "eauPotable" : "drinking water",
        "sable" : "Sand beach",
        "galet" : "Pebble beach",
        "secours" : "Lifeguard",
        "beachVolley" : "Beach-volley",
        "eauDouce" : "Freshwater",
        "Traditionnelle_Actuelle" : "Traditionnal",
        "Gastronomique" : "Gastronomic",
        "Méditerranéenne_Provençale" : "Mediterranean",
        "Italienne" : "Italian",
        "Espagnole" : "Spanish",
        "Corse" : "Corsica",
        "Pizza" : "Pizza",
        "Asiatique_Japonaise_Vietnamienne_Chinoise" : "Asian",
        "Maghreb_Syrienne_Marocaine_Algérienne" : "Maghreb",
        "Orientale_Armenienne_Turque_Libanaise" : "Oriental",
        "Indienne_Pakistanaise" : "Indian",
        "Exotique_Antilles_Réunion_Créole" : "Exotic",
        "Amérique" :  "South America",
        "Bio_Végétarien" : "Bio/vegetarian",
        "Poisson" : "Fish/seafood",
        "Kasher" : "Kosher",
        "Crêpes_Salades_Sandwiches_Restauration" : "pancakes/salads",
        "Fondues_Fromages" : "Fondue/Cheese",
        "rapide" : "Fast Food",
        "1":"Category 1*",
        "2":"Category 2*",
        "3":"Category 3*",
        "4":"Category 4*",
        "5":"Category 5*",
        "1*":"1*",
        "2*":"2*",
        "3*":"3*",
        "4*":"4*",
        "5*":"5*",
        "Gay" : "Gay friendly",
        "Handicap" : "Handicap",
        "ChambreHote" : "B & B",
        "soleil" : "Fleur de soleil",
        "Gîtes" : "Gîtes de France",
        "Gite" : "Self-catering",
        "Clévacances" : "Clévacances",
        "GiteEtMeuble" : "Self-catering",
        "Residence" : "Residence",
        "Hotel" : "Hotel",
        "AubergeJeunesse" : "Youth hostel",
        "Breakfast" : "Bed & Breakfast",
        "paysan" : "Farmer house",
        "Ferme" : "Farmer house",
        "vueMer" : "Sea view",
        "noMistral" : "Mistral Protected",
        "ouvertNuit" : "Access 24/24",
        "eclairage" : "Lights",
        "club" : "Club",
        "Calanques" : "The Calanques",
        "bestOf" : "Best of",
        "vieuxPort" : "Old port",
        "laPlaine" : "La Plaine",
        "classics" : "The classics",
        "favorites" : "The favorites",
        "Nord" : "North",
        "Sud" : "South",
        "Est" : "East",
        "Ouest" : "West",
        "eco" : "Cheap tips",
        "chic" : "Chic tips",
        "isUpdate" : "Recent articles",
        "voyage" : "Travel",
        "receptive" : "Incoming",
        "evenementielle" : "Event",
        "operator" : "Tour operator",
        "parkingRelais" : "Car Park with connection MPM",
        "prixMoyen" : "Average price (a dish)",
        "vin" : "Bottle of wine",
        "pichet" : "Pichet of wine",
        "terrasse" : "Terrace",
        "takeAway" : "Take away",
        "Bouillabaisse" : "Bouillabaisse",
        "Aioli" : "Aïoli",
        "10" : "less than 10€",
        "15" : "from 10 to 15€",
        "20" : "from 16 to 21€",
        "25" : "more than 21€",
        "dimanche" : "On sunday",
        "lundi" : "On monday",
        "midi" : "For lunch",
        "soir" : "For diner",
        "ruePietonne" : "Pedestrian street",
        "Hebergement" : "Accomodation",
        "Loisir" : "Sport & Hobby",
        "Market" : "Market",
        "Alimentation" : "Food",
        "Artisanat" : "Craft",
        "Culture" : "Culture",
        "ViePratique" : "Practical",
        "Mode" : "Fashion",
        "Cave" : "Cellar",
        "Circuit" : "Tour",
        "Boucle" : "Loop",
        "Club" : "Club",
        "Guide" : "Guide",
        "ParcLoisir" : "Hobbies parc",
        "Visite" : "Visit",
        "Atelier" : "Workshop",
        "Slackline" : "Slackline",
        "Waterline" : "Waterline",
        "Longline" : "Longline",
        "Highline" : "Highline",
        "MiseEau" : "Sea ramp",
        "Solidarite" : "Solidarity",
        "Environnement" : "Environment",
	}
};


var titleLabel = {
    "fr": "Marseille Provence",
	"en": "Marseille Provence",
};


var titleMobileLabel = {
    "fr": "Marseille Provence",
	"en": "Marseille Provence",
};


var titleMenuLabel = {
    "fr": "Mon programme MP2013",
	"en": "My program MP2013",
};


var noResultsLabel =
{
	"fr" : "Aucun résultat pour cette recherche.",
	"en" : "No result for this research.",
}


var noTimeTransportLabel =
{
	"fr" : {
        "modifyCriteria" : "Essayez de modifier votre mode de transport ou d'augmenter la durée.",
        "notAvailable" : "Le calcul des temps de trajet en bus/train n'est pas possible à partir de votre position.<br>Voulez-vous choisir un autre point de départ ?",
    },
	"en" : {
        "modifyCriteria" : "Try to change your type of transport or the duration.",
        "notAvailable" : "The estimation of the transport time by bus/train is not possible from your location.<br>Would you like to choose another starting point?",
    }
}

var popUpResearchLabel =
{
	"fr" : {
        "NoIdea" : "Merci de choisir une activité précise avant de lancer une requête hors connexion.",
        "noPositionInBound" : "Désolé, la position de départ est trop éloignée de Marseille pour être traitée hors connexion.",
    },
	"en" : {
        "NoIdea" : "Please, choose an activity before to launch a request without connection.",
        "noPositionInBound" : "Sorry, your starting point is too far from Marseille to be treated without a connection.",
    }
}


var info_transport =
{
    "fr" : '- Les horaires précis des bus, métros, tramways... :<br>lLinkLepilote' +
    '<br><br>'+
    '- les trains régionaux :<br>lLinkSNCF' +
    '<br><br>' +
    '- La ligne de bus Aix-Marseille :<br>lLinkBusAixMarseille' +
    '<br><br>' +
    '- La navette Marseille-Aéroport :<br>lLinkBusAeroport' +
    '<br><br>' +
    '- Les aéroports de Marseille :<br>' +
    'lLinkAeroport<br>' +
    'lLinkMp2<br>',
    "en" : '- All transports in the dpt. Bouches-du-Rhône, traffic, schedules :<br>lLinkLepilote' +
    '<br><br>'+
    '- Local trains :<br>lLinkSNCF' +
    '<br><br>' +
    '- Shuttle Aix-Marseille :<br>lLinkBusAixMarseille' +
    '<br><br>' +
    '- Shuttle Marseille-Airport :<br>lLinkBusAeroport' +
    '<br><br>' +
    '- Marseille airports:<br>' +
    'lLinkAeroport<br>' +
    'lLinkMp2<br>',
};


var contactLabel =
{
    "fr" : '<span class="textColorRestaurants"><ins><strong>Contact :</strong></ins></span><br><br>Pour tous renseignements, suggérer un article ou signaler une erreur, merci d\'envoyer un mail à l\'adresse suivante :<br><div id="address"></div><br><span class="textColorRestaurants"><ins><strong>Copyright :</strong></ins></span><br><br>Application conçue et réalisée par <strong>Xavier Andrèges</strong>.<br><br>A l\'exception des bases Open data, l\'ensemble des données et images utilisées sont la propriété exclusive de Xavier Andrèges.<br>Toute reproduction, même partielle, est complètement interdite et fera l\'objet de poursuites conformément au droit sur la propriété intellectuelle.<br><br>',
    "en" : '<span class="textColorRestaurants"><ins><strong>Contact:</strong></ins></span><br><br>To ask for details, suggest an article or report an error, please send an email at the following afdress:<br><div id="address"></div><br><span class="textColorRestaurants"><ins><strong>Copyright:</strong></ins></span><br><br>Application deigned and produced by <strong>Xavier Andrèges</strong>.<br><br>With the exception of Open data bases, all data and images used are the exclusive property of Xavier Andrèges. <br> Any reproduction, even partial, is completely prohibited and will be prosecuted according to the law on property intellectual.<br><br>',
}

var partenariatDBRT =
{
    "fr" : '<span class="textColorRestaurants"><ins><strong>Partenariat :</strong></ins></span><br><br>Cette application est soutenue par <strong>Bouches-du-Rhône Tourisme</strong>.<br><br><img src="Assets/Bouches-du-Rhone-Tourisme.png" width="100" height="100" /><br><br>Les données libérées fournies par le service Open data de Bouches-du-Rhône Tourisme sont disponibles à l\'adresse suivante : linkBDRT<img src="Assets/data_visitprovence.jpg" style="width:280px; height: auto;"  /><br><br>Précisemment, les bases Open data exploitées sont les suivantes :<br>- Accompagnateur en montagne et guide d\'escalade<br>- Agences réceptives<br>- Campings car<br>- Campings<br>- Chambres d\'hôte<br>- Gites<br>- Services de guide<br>- Hôtels<br>- Location de vélo<br>- Parc acrobatiques forestiers<br>- Résidences de tourisme<br>- Résidences hôtelieres<br>- Restaurants<br>- Stations de métro et tramway<br><br>',
    "en" : '<span class="textColorRestaurants"><ins><strong>Partnership:</strong></ins></span><br><br>This application is supported by <strong>Bouches-du-Rhône Tourisme</strong>.<br><br><img src="Assets/Bouches-du-Rhone-Tourisme.png" width="100" height="100" /><br><br>Free data provided by the Open data Service of Bouches-du-Rhône Tourisme are available at the following address: linkBDRT<img src="Assets/data_visitprovence.jpg" style="width:280px; height: auto;"  /><br><br>Precisely, the Open Data bases used are as follows:<br>- Mountain guide & Climbing instructor<br>- Incoming agencies<br>- Motorhome parking area<br>- Campsites<br>- B & B<br>- Self-catering<br>- Touristic guide<br>- Hotels<br>- Bike rental stores<br>- Tree climbing parks<br>- Residences<br>- Restaurants<br>- Tube and tramway stations<br><br>',
}


var formLabel = {
    "fr" : {
        "lastObservations" : "Les dernières conditions observées",
        "lastPlageBaignadePiscine" : "Les dernières <strong>plages</strong> observées",
        "lastRandonnee" : "Les dernières <strong>randonnées</strong> observées",
        "lastSitesNaturels" : "Les derniers <strong>sites naturels</strong> observés",
        "lastSlackline" : "Les derniers sites de <strong>slackline</strong> observés",
        "lastChangeWorld" : "Les dernières <strong>actions citoyennes</strong> observées",
    },
    "en" : {
        "lastObservations" : "The last comments",
        "lastPlageBaignadePiscine" : "Latest observed <strong>beaches</strong>",
        "lastRandonnee" : "Latest observed <strong>hiking</strong>",
        "lastSitesNaturels" : "Latest observed <strong>natural sites</strong>",
        "lastSlackline" : "Latest observed <strong>slackline sites</strong>",
        "lastChangeWorld" : "Latest observed <strong>citizen actions</strong>",
    },
}

var popUpLabel = {
    "fr" : {
        "plantageVeloMPM" : "Désolé, le service n'est plus accessible pour quelques instants en raison d'un nombre trop important de requêtes.",
    },
    "en" : {
        "plantageVeloMPM" : "Sorry, the service is no longer available for a wile cause of two many requests.",
    },
}


//*************  DATE PICKER **********************

$.datepicker.regional['en'] = {
closeText: 'Done',
prevText: 'Prev',
nextText: 'Next',
currentText: 'Today',
monthNames: ['January','February','March','April','May','June',
             'July','August','September','October','November','December'],
monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
weekHeader: 'Wk',
dateFormat: 'mm/dd/yy',
firstDay: 1,
isRTL: false,
showMonthAfterYear: false,
    yearSuffix: ''};

$.datepicker.regional['fr'] =
{
clearText: 'Effacer', clearStatus: '',
closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
prevText: '<Préc', prevStatus: 'Voir le mois précédent',
nextText: 'Suiv>', nextStatus: 'Voir le mois suivant',
currentText: 'Courant', currentStatus: 'Voir le mois courant',
monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
             'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
monthNamesShort: ['Jan.','Fév.','Mars','Avr.','Mai','Juin',
                  'Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
weekHeader: 'Sm', weekStatus: '',
dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
dateFormat: 'dd/mm/yy', firstDay: 0,
    initStatus: 'Choisir la date', isRTL: false};


$.datepicker.regional['de'] =
{
renderer: $.ui.datepicker.defaultRenderer,
monthNames: ['Januar','Februar','März','April','Mai','Juni',
             'Juli','August','September','Oktober','November','Dezember'],
monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
                  'Jul','Aug','Sep','Okt','Nov','Dez'],
dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
dateFormat: 'dd.mm.yyyy',
firstDay: 1,
prevText: '&#x3c;zurück', prevStatus: '',
prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
nextText: 'Vor&#x3e;', nextStatus: '',
nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
currentText: 'heute', currentStatus: '',
todayText: 'heute', todayStatus: '',
clearText: '-', clearStatus: '',
closeText: 'schließen', closeStatus: '',
yearStatus: '', monthStatus: '',
weekText: 'Wo', weekStatus: '',
dayStatus: 'DD d MM',
defaultStatus: '',
isRTL: false
};


$.datepicker.regional['es'] =
{
renderer: $.ui.datepicker.defaultRenderer,
monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
             'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
                  'Jul','Ago','Sep','Oct','Nov','Dic'],
dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
dateFormat: 'dd/mm/yyyy',
firstDay: 1,
prevText: '&#x3c;Ant', prevStatus: '',
prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
nextText: 'Sig&#x3e;', nextStatus: '',
nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
currentText: 'Hoy', currentStatus: '',
todayText: 'Hoy', todayStatus: '',
clearText: '-', clearStatus: '',
closeText: 'Cerrar', closeStatus: '',
yearStatus: '', monthStatus: '',
weekText: 'Sm', weekStatus: '',
dayStatus: 'DD d MM',
defaultStatus: '',
isRTL: false
};



var typeMP2013Label =
{
    "fr" : {
        "genres" : "Genres",
        "all" : "Tous les genres",
        "musique" : "Musique",
        "danse" : "Danse",
        "theatre" : "Théâtre",
        "beauxArts" : "Arts et Beaux-arts",
        "artDeRue" : "Art de la rue",
        "cinema" : "Cinéma - documentaire",
        "litterature" : "Littérature et poésie",
		"nightHour" : "Ouvert en nocturne",
		"none" : "Aucun filtre",
		"endIn7days" : "Se termine dans la semaine",
		"endIn14days" : "Se termine dans les 15 jours"
    },
    "en" : {
        "genres" : "Types",
        "all" : "All types",
        "musique" : "Music",
        "danse" : "Dance",
        "theatre" : "Theater",
        "beauxArts" : "Arts and fine arts",
        "artDeRue" : "Street art",
        "cinema" : "Cinema - 7th art",
        "litterature" : "Litterature & Poetry",
		"nightHour" : "Open at night",
		"none" : "Any filters",
		"endIn7days" : "Will be closed in the week",
		"endIn14days" : "Will be closed in 2 weeks"
    }
}