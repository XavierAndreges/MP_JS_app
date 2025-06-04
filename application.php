<?php
    
    require ('API/mpIdentifier.php');
    require ('phpFiles/start.php');
    /*require ('phpFiles/setHome.php');*/
    require ('phpFiles/localisable.php');
    
?>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<html>
    <head>
        <title>Marseille Provence entre nature et culture</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta charset="UTF-8" />
        
        <meta name="description" content="Marseille Provence entre nature et culture, un guide numérique et une application mobile pour parcourir la région...Marseille Provence, from nature to culture, a digital guide and a mobile app to explore the region." />
        
        <meta name="Keywords" content="Marseille, Provence, Aix-en-Provence, mobile, app, application, iOS, Android, smartphone, iPhone nature, culture, musée, expo, expositions, randonnée, site naturel, escalade, canyoning, transport, tourisme, guide, topo, vélo, accès aux massifs, tourism, hike, climb, canyoneering, topo, calanques, vélo, travel" />
     
		
        <link rel="stylesheet" href="CSS/common.css" />
        <link rel="stylesheet" href="CSS/web/webIndex.css" />


        <link rel="stylesheet" href="CSS/gradient.css" />

        <script type="text/javascript" src="jquery/jquery.js"></script>
        <script type="text/javascript" src="js/web/varIndex.js"></script>
        <script src="js/idangerous.swiper.js"></script>

        <link rel="stylesheet" href="CSS/idangerous.swiper.css">

        <!--[if gte IE 9]>
             <style type="text/css">
             .gradient {
                filter: none;
             }         
             </style>
        <![endif]-->
            
		<script type="text/javascript">
            
			var _gaq = _gaq || [];

                if (isProdWeb)
                {
                    _gaq.push(['_setAccount', 'UA-39619730-1']);
                    _gaq.push(['_trackPageview']);
                }

                (function() {
                 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                 })();
            
		</script>
        
        <style type="text/css">

        </style>

        
    </head>
    
    
    <body id="body" onload="onBodyLoad()">


<a id="IconCorner" <?php echo 'href="index.php?lang='.$currentLang.'"' ?>><img src="AssetsWeb/btn_home.png" width="44" height="44" /></a>


        <div id="mainContainerWeb">

<!--

            <br><br>
            
            <img src="AssetsWeb/IconCorner.png" width="176" />
            
            <br><br>
            
            <img src="AssetsWeb/title.png" width="320" />

            
            <div id="demoBlock">
                
                
                <a class="corner" href="https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8" target="_blank" style="margin-right:10px;">
                    <img src="AssetsWeb/AppStore.png" width="200" />
                </a>
                
                
                <a class="corner" href="https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence" target="_blank">
                    <img src="AssetsWeb/GooglePlay.png" width="200" />
                </a>
  
                
            </div>




<div id="grayColorsBlock">

<div id="" class="grayLightBgColor">
</div>

<div id="" class="ultraLightBgColor">
</div>

<div id="" class="grayLightBgColor">
</div>

<div id="" class="ultraLightBgColor">
</div>

</div>
-->
            <!-- ******** homeColorsBlock ********** -->

            <div id="homeColorsBlock">

                <div id="pinkColorsBlock" class="pinkGradient">
                    <div id="pinkLabelColorsBlock" class="labelColorsBlock">
                        J'ai envie de quoi ?
                        <br><br>
                        <span style="color:#000000; font-size:1.2em;">What do I want ?</span>
                    </div>
                </div>
                
                <div id="blueColorsBlock" class="blueGradient">
                    <div id="blueLabelColorsBlock" class="labelColorsBlock">
                        Je pars d'où ?
                        <br><br>
                        <span style="color:#000000; font-size:1.2em;">From where?</span>
                    </div>
                </div>
                
                <div id="greenColorsBlock" class="greenGradient">
                    <div id="greenLabelColorsBlock" class="labelColorsBlock">
                        Je me déplace comment ?
                        <br><br>
                        <span style="color:#000000; font-size:1.2em;">How do I move?</span>
                    </div>
                </div>
                
                <div id="blueColorsBlock" class="orangeGradient">
                    <div id="orangeLabelColorsBlock" class="labelColorsBlock">
                        J'ai combien de temps ?
                        <br><br>
                        <span style="color:#000000; font-size:1.2em;">How long?</span>
                    </div>
                </div>
                
            </div>
        
            
            <!-- ******** grayColorsBlock ********** -->
            
            <div id="grayColorsBlock6">
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
            </div>
            
            <!-- ******** screenShotsBlock ********** -->
            
            <div id="screenShotsBlock0">
                
                <div id="screenShots01" class="screenShots">
                </div>
                
                <div id="screenShots02" class="screenShots">
                </div>
                
                <div id="screenShots03" class="screenShots">
                </div>
                
                <div id="screenShots04" class="screenShots">
                </div>
                
            </div>
            
            <!-- ******** grayColorsBlock ********** -->
            
            <div id="grayColorsBlock5">
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
            </div>
            
            <!-- ******** screenShotsBlock ********** -->
            
            <div id="screenShotsBlock">
                
                <div id="screenShots1" class="screenShots">
                </div>
                
                <div id="screenShots2" class="screenShots">
                </div>
                
                <div id="screenShots3" class="screenShots">
                </div>
                
                <div id="screenShots4" class="screenShots">
                </div>
                
            </div>
            
            <!-- ******** grayColorsBlock ********** -->
            
            <div id="grayColorsBlock2">
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
            </div>
            
            <!-- ******** textDetailBlock ********** -->
            
            <div id="textDetailBlock">
                
                <div id="textDetail1" class="textDetail pinkBgColor">
                    
                    <div id="titleLabelTextDetail1" class="titleLabelTextDetail">
                        Tourisme
                    </div>
                    
                    Monuments, musées, quartiers,
                    architecture, attractions,
                    <br>bars, commerces, spectacles...
  
                    <div class="separated"></div>
                    
                    Plus de 90 fiches détaillées :<br>
                    <span class="colorText">description, plan, horaires, tarifs, tansports...</span>
                    
                    <div class="separated"></div>
                    
                    Visite guidée du Vieux Port :
                    <br>
                    <span class="colorText">un parcours pas à pas avec options restauration et hébergement.</span>
                </div>
                
                <div id="textDetail2" class="textDetail blueBgColor">
                    
                    <div id="titleLabelTextDetail2" class="titleLabelTextDetail">
                        Plein air
                    </div>
                    
                    Sites naturels, parcs, randonnées, baignade, sites d'escalade, canyons
                    
                    <div class="separated"></div>
                    
                    Plus de 70 fiches détaillées :<br>
                    <span class="colorText">diaporama, cartes au 1:25000, topo des voies d'escalade...</span>
                    
                    <div class="separated"></div>
                    
                    Tracés géolocalisés :
                    <br>
                    <span class="colorText">parcours des randonnées, accès aux falaises, marches d'approche et de retour...</span>
                </div>
                
                <div id="textDetail3" class="textDetail greenBgColor">
                    
                    <div id="titleLabelTextDetail3" class="titleLabelTextDetail">
                        Mobilité
                    </div>
                    
                    Moteur de recherche multi-critères :
                    <br>
                    <span class="colorText"> mode de transport, temps disponible, localisation...</span>
                   
                    <div class="separated"></div>
                    
                    Internet non obligatoire :
                    <br>
                    <span class="colorText">cartes et calculs d'itinéraire accessibles même sans connexion.</span>
                    
                    <div class="separated"></div>
                    
                    Bases de données élargies :<br>
                    <span class="colorText">fichiers en téléchargement pour couvrir un vaste territoire autour de Marseille.</span>
                </div>
                
                <div id="textDetail4" class="textDetail orangeBgColor">
                    
                    <div id="titleLabelTextDetail4" class="titleLabelTextDetail">
                        Infos pratiques
                    </div>
                    
                    Pour se déplacer, se loger, s'informer, trouver un guide, garer son véhicule...
                    
                    <div class="separated"></div>
                    
                    Le <i>Vélo</i> en libre service :
                    <br>
                    <span class="colorText">
                    disponibilité en temps réel pour chaque station.
                    </span>
                    
                    <div class="separated"></div>
                    
                    Accès aux massifs :
                    <br>
                    <span class="colorText">
                    information en temps réel sur la réglementation en cours.
                    </span>
                    
                </div>
                
            </div>
            
            
            <!-- ******** grayColorsBlock3 ********** -->
            
            <div id="grayColorsBlock3">
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
            </div>
            
            <!-- ******** screenShotsBlock2 ********** -->
            
            <div id="screenShotsBlock2">
                
                <div id="screenShots5" class="screenShots">
                </div>
                
                <div id="screenShots6" class="screenShots">
                </div>
                
                <div id="screenShots7" class="screenShots">
                </div>
                
                <div id="screenShots8" class="screenShots">
                </div>
                
            </div>
            
            
            <!-- ******** grayColorsBlock3 ********** -->
            
            <div id="grayColorsBlock4">
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
                <div id="" class="grayLightBgColor">
                </div>
                
                <div id="" class="ultraLightBgColor">
                </div>
                
            </div>
            
            <!-- ******** Demo ********** -->
            
            <div id="demoBlock" style="width:320px;">
                
                <br><br>
                <a class="corner" href="https://itunes.apple.com/us/app/marseille-provence-nature/id819234937?mt=8" target="_blank">
                    <img src="AssetsWeb/AppStore_en.png" width="200" />
                </a>
                
                <br><br>
                <br><br>
                
                <a class="corner" href="https://play.google.com/store/apps/details?id=com.andrej.marseilleprovence" target="_blank">
                    <img src="AssetsWeb/android_en.png" width="200" />
                </a>
                
                <br><br>
                
                <br><br>
                
                <a class="corner" href="https://www.facebook.com/marseilleprovenceguide?ref_type=bookmark" target="_blank">
                    <img src="AssetsWeb/fbLike.png" width="200" />
                </a>
                
                <br><br>
                
                <br><br>
                
                <a href="mailto:contact@marseilleprovence.net"><strong>contact@marseilleprovence.net</strong></a>
                
                <br><br>
                
                
            </div>
            
            <!--
            <div id="demoBlock" style="width:320px;">
                
                <div id="" class="titleLabelText" style="color:#000000;">
                    
                    <div id="titleLabelTextDetail1" class="titleLabelTextDetail" style="font-size:3em">
                        Démo
                    </div>
                    
                    Nous vous proposons de simuler l'application à tavers une nouvelle fenêtre de votre navigateur.
                    <br><br>

                </div>
                
                 
                 <a id="openDemoBtn" class="corner" href="javascript:openDemo();">
                     Lancer la démo
                 </a>
                
                <br><br>
                <strong>Application disponible sous iOS et Android.</strong>
                <br><br>
                <a href="mailto:contact@marseilleprovence.net">contact@marseilleprovence.net</a> / ©DR
                <br><br>
                
                
            </div>

             -->
            
              
         <!-- end of mainContainer -->
            
        </div>
        
        
        <script type="text/javascript">
            
        </script>

    
    </body>
</html>
