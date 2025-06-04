var mDonneesForm;


function getAvisForTable()
{
    var myUrl = 'API/getAvis.php';
    
    var myData = "table=" + currentTable;
    
    $.ajax(
           {
           url: myUrl,
           type : 'GET',
           dataType : 'html',
           data : myData,
           success: 	function(data) {
           
           log("getAvisForTable -> data : " + data);
           
           var s = document.createElement('script');
           s.setAttribute('type', 'text/javascript');
           s.text = data;
           document.getElementsByTagName("head")[0].appendChild(s);
           
           setTimeout(launchLastObservedAvisForTable, 200);
           
           
           }
           });
}


function launchLastObservedAvisForTable()
{
    var lArray = window["listAvis" + currentTable];
    
    if (lArray.length > 0)
    {
        var lHtml =
        '<div id="last' + currentTable + '" class="lastRubriqueAvis">' +
        '<a class="avisRubriqueTitle" style="color:#515e71; text-decoration:none;">' + formLabel[currentLang]["last" + currentTable] + ' : </a>' +
        '<div class="avisRubriqueItem">' + getLastObservedAvis(currentTable) + '</div>' +
        '</div>';
        
        $("#lastAvisBlock").append(lHtml);
    }
}


function getAvisFull()
{
    var myUrl = 'API/getAvis.php';
    
    $.ajax(
           {
           url: myUrl,
           type : 'GET',
           dataType : 'html',
           success: 	function(data) {
           
           //log("getAvisFull -> data : " + data);
           
           var s = document.createElement('script');
           s.setAttribute('type', 'text/javascript');
           s.text = data;
           document.getElementsByTagName("head")[0].appendChild(s);
           
           setTimeout(launchLastObservedAvisAtHome, 200);
           
           
           }
           });
}


function launchLastObservedAvisAtHome()
{
    for (var i = 0; i < tableAvisArray.length; i++)
    {
        if (tableAvisArray[i].length > 0)
        {
            var lHtml =
            '<div id="last' + tableAvisArray[i] + '" class="lastRubriqueAvis">' +
            '<a href="detail.php?lang=' + currentLang + '&table=' + tableAvisArray[i] + '" class="avisRubriqueTitle" style="color:#515e71; text-decoration:none;">- ' + formLabel[currentLang]["last" + tableAvisArray[i]] + ' (+)</a>' +
            '<div class="avisRubriqueItem">' + getLastObservedAvis(tableAvisArray[i], 'Home') + '</div>' +
            '</div>';
            
            $("#lastAvisBlock").append(lHtml);
        }
    }
}


function getLastObservedAvis(_table, _type)
{
    var lListItems = window["listAvis" + _table];
    
    var lHtml = "";
    
    var limit = currentPage == "index" ? 3 : 20;
    
    for (var i = 0; i  < limit && i < lListItems.length; i++)
    {
        var date = new Date(lListItems[i].date*1000);
        
        //getAvisWords('pavillon') + ' <span class="avisResponse">' + getAvisResponse(lListItems[i], 'pavillon', _table)  + '</span>, ' + getAvisWords('wind') + ' <span class="avisResponse">' + getAvisResponse(lListItems[i], 'wind', _table) + '</span>'
        
        var lTitle = lListItems[i]["shortTitle"] ? lListItems[i]["shortTitle"] : getTitle(lListItems[i], currentLang);
        
        var lTitleLink = '<a href="detail.php?lang=' + currentLang + '&table=' + _table + '&id=' + lListItems[i].idRepName + '&avis=1">' + lTitle + '</a>';

        var lDate = _type == "Home" ? getVeryShortDateForm(date) : getShortDateForm(date);
        
        lHtml +=  lTitleLink + ' ' + getConditions(lListItems[i], _table) + ' ' + getAvisWords('le') + ' ' + getVeryShortDateForm(date);
        
        if (i  < (limit -1) && i < lListItems.length - 1)
            lHtml += ' | ';
    }
    
    return lHtml;
}


function getConditions(_item, _table)
{
    var lConditions = _item.note ? '(' + _item.note + '/5)' : '';
    
    if (_table == "PlageBaignadePiscine" && (_item.note || _item.pavillon || _item.wave))
    {
        lConditions = '(';
        
        lConditions += _item.pavillon ? getAvisWords('pavillon') + ' ' + getAvisResponse(_item, 'pavillon', _table) : '';
        
        lConditions += _item.wave ? ', ' + getAvisWords('wave') + ' ' + getAvisResponse(_item, 'wave', _table) : '';
        
        lConditions += _item.note ? ', ' + _item.note + '/5' : '';
        
        lConditions += ')';
    }
    else
    if (_table == "Randonnee" && (_item.orientation))
    {
        lConditions = '(';
        
        lConditions += _item.orientation ? getAvisWords('orientation') + ' ' + getAvisResponse(_item, 'orientation', _table) : '';
        
        lConditions += _item.note ? ', ' + _item.note + '/5' : '';
        
        lConditions += ')';
    }
    else
    if (_table == "SitesNaturels" && (_item.access))
    {
        lConditions = '(';
        
        lConditions += _item.access ? getAvisWords('access') + ' ' + getAvisResponse(_item, 'access', _table) : '';
        
        lConditions += _item.note ? ', ' + _item.note + '/5' : '';
        
        lConditions += ')';
    }
    else
    if (_table == "Slackline" && (_item.deroulement))
    {
        lConditions = '(';
        
        lConditions += _item.deroulement ? getAvisWords('deroulement') + ' ' + getAvisResponse(_item, 'deroulement', _table) : '';
        
        lConditions += _item.note ? ', ' + _item.note + '/5' : '';
        
        lConditions += ')';
    }
    return lConditions;
}


function getAvisForItem()
{
    var myUrl = 'API/getAvis.php';
    
    var myData = "table=" + mCurrentItem.table + "&idRepName=" + mCurrentItem.idRepName;
    
    $.ajax(
           {
           url: myUrl,
           type : 'GET',
           dataType : 'html',
           data : myData,
           success: 	function(data) { 
               
               log("getAvisForItem -> data : " + data);
               
               var s = document.createElement('script');
               s.setAttribute('type', 'text/javascript');
               s.text = data;
               document.getElementsByTagName("head")[0].appendChild(s);
               
               var lHTML = ""
               
               for (var i = 0; i < listAvis.length; i++)
               {
                   var date = new Date(listAvis[i].date*1000);
           
                    var lNote = "";
           
                   if (listAvis[i].note)
                       lNote = ', ' + getAvisWords('interest') + ' <strong>' + listAvis[i].note + '</strong>/5';
                   
                   lHTML += '<div class="avisCell">';
                   
                   lHTML += '<div class="avisIntro">' + getAvisWords('observedBy') + ' <strong> ' + listAvis[i].pseudo + '</strong>, ' + getAvisWords('le') + ' <strong>' + getShortDateForm(date) + '</strong>' + lNote + '</div>';
                   
                   lHTML += window["getCellForAvis" + mCurrentItem.table](listAvis[i]);
                   
                   lHTML += '<div class="avisText">' + listAvis[i].observation + '</div>';
                   
                   lHTML += '</div>';
               }
               
               $("#cellBlock").html(lHTML);
           }
    });
}


function getCellForAvisChangeWorld(_item)
{
    return "";
}


function getCellForAvisSlackline(_item)
{
    var lHtml =
    '<div class="avisQuestions">' +
    getAvisWords('installation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'installation')  + '</span> / ' +
    getAvisWords('frequentation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'frequentation') + '</span>' +
    '<br>' +
    getAvisWords('deroulement') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'deroulement') + '</span>' +
    '<br>' +
    '</div>';
    
    return lHtml;
}



function getCellForAvisSitesNaturels(_item)
{
    var lHtml =
    '<div class="avisQuestions">' +
    getAvisWords('access') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'access')  + '</span> / ' +
    getAvisWords('frequentation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'frequentation') + '</span>' +
    '<br>' +
    getAvisWords('clean') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'clean') + '</span>' +
    '<br>' +
    '</div>';
    
    return lHtml;
}


function getCellForAvisRandonnee(_item)
{
    var lHtml =
        '<div class="avisQuestions">' +
        getAvisWords('done') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'done')  + '</span> | ' +
        getAvisWords('orientation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'orientation')  + '</span> | ' +
        getAvisWords('frequentation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'frequentation') + '</span>' +
        '<br>' +
        getAvisWords('temperature') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'temperature') + '</span> | ' +
        getAvisWords('wind') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'wind') + '</span>' +
        '<br>' +
        '</div>';
    
    return lHtml;
}


function getCellForAvisPlageBaignadePiscine(_item)
{ 
    var lHtml = 
        '<div class="avisQuestions">' +
        getAvisWords('pavillon') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'pavillon')  + '</span> | ' +
        getAvisWords('temperatureWater') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'temperature') + '</span>' +
        '<br>' +
        getAvisWords('wave') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'wave') + '</span> | ' +
        getAvisWords('wind') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'wind') + '</span>' +
        '<br>' +
        getAvisWords('frequentation') + ' : <span class="avisResponse">' + getAvisResponse(_item, 'frequentation') + '</span> | '+
        getAvisWords('clean') + ' : <span class="avisResponse">' +  getAvisResponse(_item, 'clean') + '</span>' + 
        '</div>';
    
    return lHtml;
}


function getAvisWords(_type)
{
    return avisWords[currentLang][_type] ;
}

function getAvisResponse(_item, _type, _table)
{
    var lTable = _table;
    
    if (!_table)
        lTable = mCurrentItem.table;
    
    if (!_item[_type])
        return "NC";
    else
        return avisResponse[lTable][_type][_item[_type]][currentLang];
}

function setAvisResponse(_type, _num, _table)
{
    var lTable = _table;
    
    if (!_table)
        lTable = mCurrentItem.table;
    
    return avisResponse[lTable][_type][_num][currentLang];
}

var avisWords =
{
    'fr' : {
        'observedBy' : 'Observé par',
        'le' : 'le',
        'interest' : 'intérêt',
        'processing' : 'En cours...',
        'wait' : 'Traitement en cours...',
        'pavillon' : 'pavillon',
        'wave' : 'vagues',
        'wind' : 'vent',
        'frequentation' : 'affluence',
        'temperature' : 'température',
        'temperatureWater' : 'température de l\’eau',
        'clean' : 'propreté',
        'done' : 'parcouru',
        'orientation' : 'chemin',
        'access' : 'accès',
        'installation' : 'installation',
        'deroulement' : 'déroulement',
    },
    'en' : {
        'observedBy' : 'Observed by',
        'le' : 'the',
        'interest' : 'interest',
        'processing' : 'Wait...',
        'wait' : 'Please wait...',
        'pavillon' : 'pavillon',
        'wave' : 'waves',
        'wind' : 'wind',
        'frequentation' : 'affluence',
        'temperature' : 'temperature',
        'temperatureWater' : 'water temperature',
        'clean' : 'cleanliness',
        'done' : 'done',
        'orientation' : 'path',
        'access' : 'access',
        'installation' : 'installation',
        'deroulement' : 'proceedings',
    }
}

var avisResponse =
{
    'Randonnee' :
    {
        'done' :
        {
            0 : {
                'fr' : 'en partie',
                'en' : 'partly'
            },
            1 : {
                'fr' : 'en intégralité',
                'en' : 'in entirety'
            }
        },
        'orientation' :
        {
            0 : {
                'fr' : 'correct',
                'en' : 'correct'
            },
            1 : {
                'fr' : 'délicate',
                'en' : 'delicate'
            },
            2 : {
                'fr' : 'difficile',
                'en' : 'difficult'
            },
            3 : {
                'fr' : 'impraticable',
                'en' : 'impraticable'
            }
        },
        'frequentation' :
        {
            0 : {
                'fr' : 'faible',
                'en' : 'light'
            },
            1 : {
                'fr' : 'moyenne',
                'en' : 'correct'
            },
            2 : {
                'fr' : 'forte',
                'en' : 'full'
            }
        },
        'temperature' :
        {
            0 : {
                'fr' : 'glaciale',
                'en' : 'freezing'
            },
            1 : {
                'fr' : 'fraiche',
                'en' : 'fresh'
            },
            2 : {
                'fr' : 'douce',
                'en' : 'good'
            },
            3 : {
                'fr' : 'chaude',
                'en' : 'warm'
            },
            4 : {
                'fr' : 'écrasante',
                'en' : 'very hot'
            }
        },
        'wind' :
        {
            0 : {
                'fr' : 'inexistant',
                'en' : 'none'
            },
            1 : {
                'fr' : 'léger',
                'en' : 'light'
            },
            2 : {
                'fr' : 'soutenu',
                'en' : 'sustained'
            },
            3 : {
                'fr' : 'violent',
                'en' : 'violent'
            }
        },
    },
    'PlageBaignadePiscine' :
    {
        'pavillon' :
        {
            0 : {
                'fr' : 'vert',
                'en' : 'green'
            },
            1 : {
                'fr' : 'orange',
                'en' : 'orange'
            },
            2 : {
                'fr' : 'rouge',
                'en' : 'red'
            }
        },
        'wave' :
        {
            0 : {
                'fr' : 'petites',
                'en' : 'small'
            },
            1 : {
                'fr' : 'formées',
                'en' : 'formed'
            },
            2 : {
                'fr' : 'fortes',
                'en' : 'big'
            }
        },
        'wind' :
        {
            0 : {
                'fr' : 'inexistant',
                'en' : 'none'
            },
            1 : {
                'fr' : 'léger',
                'en' : 'light'
            },
            2 : {
                'fr' : 'soutenu',
                'en' : 'sustained'
            },
            3 : {
                'fr' : 'violent',
                'en' : 'violent'
            }
        },
        'temperature' :
        {
            0 : {
                'fr' : 'glaciale',
                'en' : 'freezing'
            },
            1 : {
                'fr' : 'fraiche',
                'en' : 'fresh'
            },
            2 : {
                'fr' : 'douce',
                'en' : 'good'
            },
            3 : {
                'fr' : 'chaude',
                'en' : 'warm'
            },
            4 : {
                'fr' : 'écrasante',
                'en' : 'very hot'
            }
        },
        'frequentation' :
        {
            0 : {
                'fr' : 'faible',
                'en' : 'light'
            },
            1 : {
                'fr' : 'moyenne',
                'en' : 'correct'
            },
            2 : {
                'fr' : 'forte',
                'en' : 'full'
            }
        },
        'clean' :
        {
            0 : {
                'fr' : 'déplorable',
                'en' : 'deplorable'
            },
            1 : {
                'fr' : 'un peu limite',
                'en' : 'not so good'
            },
            2 : {
                'fr' : 'acceptable',
                'en' : 'acceptable'
            },
            3 : {
                'fr' : 'impeccable',
                'en' : 'impeccable'
            }
        },
    },
    'SitesNaturels' :
    {
        'access' :
        {
            0 : {
                'fr' : 'normal',
                'en' : 'normal'
            },
            1 : {
                'fr' : 'délicat',
                'en' : 'delicate'
            },
            2 : {
                'fr' : 'impossible',
                'en' : 'impossible'
            }
        },
        'frequentation' :
        {
            0 : {
                'fr' : 'faible',
                'en' : 'light'
            },
            1 : {
                'fr' : 'moyenne',
                'en' : 'correct'
            },
            2 : {
                'fr' : 'forte',
                'en' : 'full'
            }
        },
        'clean' :
        {
            0 : {
                'fr' : 'déplorable',
                'en' : 'deplorable'
            },
            1 : {
                'fr' : 'un peu limite',
                'en' : 'not so good'
            },
            2 : {
                'fr' : 'acceptable',
                'en' : 'acceptable'
            },
            3 : {
                'fr' : 'impeccable',
                'en' : 'impeccable'
            }
        },
    }
    ,
    'Slackline' :
    {
        'installation' :
        {
            0 : {
                'fr' : 'évidente',
                'en' : 'easy'
            },
            1 : {
                'fr' : 'délicate',
                'en' : 'delicate'
            },
            2 : {
                'fr' : 'compliquée',
                'en' : 'complicated'
            }
        },
        'frequentation' :
        {
            0 : {
                'fr' : 'faible',
                'en' : 'light'
            },
            1 : {
                'fr' : 'moyenne',
                'en' : 'correct'
            },
            2 : {
                'fr' : 'forte',
                'en' : 'full'
            }
        },
        'deroulement' :
        {
            0 : {
                'fr' : 'OK',
                'en' : 'OK'
            },
            1 : {
                'fr' : 'problématique',
                'en' : 'problematic'
            }
        }
    }
}



function getHtmlForm()
{
    $("#formAvis").load('getHtmlAvis.php?lang=' + currentLang + ' #form' + mCurrentItem.table, getHtmlFormSuccess);
}


function getHtmlFormSuccess()
{
    showModalPopUp("formAvis");
    
    initDatePicker();
}


function showDatePicker()
{
    log("showDatePicker");
    
     $("#datepicker").fadeIn();
    
    $("#dateForm").blur(); 
}


function hideDatePicker()
{
    log("hideDatePicker");
    
    $("#datepicker").fadeOut();
}



function postDataToInsertAvis()
{
    if ($("#pseudo").val() == "" || !mDateForm)
    {
        alert("Merci de donner un pseudo et une date.");
        return;
    }
    
    $("input[type=submit]").val(getAvisWords('processing'));
    
    //var donnees = $('input[name=pathQuality]:checked', '#formulaire').val();
    
    var myUrl = 'API/insertAvis.php';

    //var myData = "table=Randonnee&idRepName=capSugiton5&shortName=Cap Sugiton&date=1440248946&done=en intégralite&pathQuality=peu marqué&temperature=chaude&windForce=violent&note=4&opinion=hlhlkhlhllkjlkjlkjlj";
    
    var lShortTitle = mCurrentItem.shortTitle ? mCurrentItem.shortTitle : getTitle(mCurrentItem, "fr");

    var myData = "table=" + mCurrentItem.table + "&idRepName=" + mCurrentItem.idRepName + "&dateForm=" + mDateForm + "&title_fr=" + getTitle(mCurrentItem, "fr") + "&title_en=" + getTitle(mCurrentItem, "en") + "&shortTitle=" + lShortTitle;

    //var donnees = $('input[name=pathQuality]:checked', '#formulaire').val();

    mDonneesForm = $("#form" + mCurrentItem.table).serialize();

    console.log("postDataToInsertAvis : " + myData + "&" + JSON.stringify(mDonneesForm));

    $.ajax(
           {
           url: myUrl,
           type : 'POST',
           dataType : 'html',
           data : myData + '&' + mDonneesForm,
           success: 	function(data) { 
               console.log(data);

               if (isModalPopUp)
                   showModalPopUp();
           
                $("#cellBlock").html('<div id="waitAvis">' + getAvisWords('wait') + '</div>');
           
                var lBodyTop = $('#avisBlockDetail').offset().top;
           
                $('html,body').animate({scrollTop:lBodyTop - 10}, 500, 'easeOutCubic', function(){});
        
    
               getAvisForItem();

               sendMailAfterAvis();
           }
           });
}

        
function sendMailAfterAvis()
{
    var myUrl = 'API/sendMail.php';

    //var myData = "table=Randonnee&idRepName=capSugiton&shortName=CapSugiton&date=1440248946&";
    
    var myData = "table=" + mCurrentItem.table + "&idRepName=" + mCurrentItem.idRepName + "&dateForm=" + mDateForm;
    
    console.log("sendMailAfterAvis : " + myData + "&" + mDonneesForm);

    $.ajax(
           {
           url: myUrl,
           type : 'POST',
           dataType : 'html',
           data : myData + "&" + mDonneesForm,
           success: 	function(data) { 
               console.log("sendMailAfterAvis success : " + JSON.stringify(data));
           }
           });
}



