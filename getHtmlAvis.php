<?php 

require ('phpFiles/localisable.php');
    
header('Access-Control-Allow-Origin: *');

if (isset($_GET['lang']))
    $currentLang = $_GET['lang'];
else
    $currentLang = 'fr';

?> 

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
<meta charset="utf-8">
		<title>Set Avis</title>
		
    <script type="text/javascript" src="jquery/jquery.js"></script>
    <script type="text/javascript" src="js/myScript/avis.js"></script>
        
        <link rel="stylesheet" href="CSS/form.css" />

	<script type="text/javascript">
	</script>
        
</head>

	<body onload="">
        
        
        <form id="formChangeWorld" action="javascript:postDataToInsertAvis()" method="POST" accept-charset="UTF-8">
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['pseudo']; ?></legend>
                <textarea name="pseudo" maxlength="50" rows="1" cols="40"></textarea>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['dateObservation']; ?></legend>
                <input type="text" name="date" id="dateForm" value="" onclick="javascript:showDatePicker();">
                <div id="datepicker"></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['note']; ?></legend>
                <input type="radio" name="note" id="" value="1"> <label for="radio">1</label>
                <input type="radio" name="note" id="" value="2"> <label for="radio">2</label>
                <input type="radio" name="note" id="" value="3"> <label for="radio">3</label>
                <input type="radio" name="note" id="" value="4"> <label for="radio">4</label>
                <input type="radio" name="note" id="" value="5"> <label for="radio">5</label>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['observation']; ?></legend>
                <textarea class="textAreaComment" name="observation" maxlength="1900" rows="5" cols="40"></textarea>
            </fieldset>

            <a><input type="submit" name="submit" value="<?php echo $formLabel[$currentLang]['submit']; ?>"/></a>

        </form>
        
        <br><br><br><br>
        
        
            <form id="formSlackline" action="javascript:postDataToInsertAvis()" method="POST" accept-charset="UTF-8">
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['pseudo']; ?></legend>
                <textarea name="pseudo" maxlength="50" rows="1" cols="40"></textarea>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['dateObservation']; ?></legend>
                <input type="text" name="date" id="dateForm" value="" onclick="javascript:showDatePicker();">
                <div id="datepicker"></div>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['installation']; ?></legend>
                <div><input type="radio" name="installation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['installation0']; ?></label></div>
                <div><input type="radio" name="installation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['installation1']; ?></label></div>
                <div><input type="radio" name="installation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['installation2']; ?></label></div>
            </fieldset>
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Affluence']; ?></legend>
                <div><input type="radio" name="frequentation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence0']; ?></label></div>
                <div><input type="radio" name="frequentation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence1']; ?></label></div>
               <div><input type="radio" name="frequentation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence2']; ?></label></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['deroulement']; ?></legend>
                <div><input type="radio" name="deroulement" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['deroulement0']; ?></label></div>
                <div><input type="radio" name="deroulement" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['deroulement1']; ?></label></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['note']; ?></legend>
                <input type="radio" name="note" id="" value="1"> <label for="radio">1</label>
                <input type="radio" name="note" id="" value="2"> <label for="radio">2</label>
                <input type="radio" name="note" id="" value="3"> <label for="radio">3</label>
                <input type="radio" name="note" id="" value="4"> <label for="radio">4</label>
                <input type="radio" name="note" id="" value="5"> <label for="radio">5</label>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['observation']; ?></legend>
                <textarea class="textAreaComment" name="observation" maxlength="1900" rows="5" cols="40"></textarea>
            </fieldset>

            <a><input type="submit" name="submit" value="<?php echo $formLabel[$currentLang]['submit']; ?>"/></a>

        </form>
        
        <br><br><br><br>

        
        <form id="formSitesNaturels" action="javascript:postDataToInsertAvis()" method="POST" accept-charset="UTF-8">
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['pseudo']; ?></legend>
                <textarea name="pseudo" maxlength="50" rows="1" cols="40"></textarea>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['dateObservation']; ?></legend>
                <input type="text" name="date" id="dateForm" value="" onclick="javascript:showDatePicker();">
                <div id="datepicker"></div>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Access']; ?></legend>
                <div><input type="radio" name="access" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Access0']; ?></label></div>
                <div><input type="radio" name="access" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Access1']; ?></label></div>
                <div><input type="radio" name="access" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Access2']; ?></label></div>
            </fieldset>
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Affluence']; ?></legend>
                <div><input type="radio" name="frequentation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence0']; ?></label></div>
                <div><input type="radio" name="frequentation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence1']; ?></label></div>
               <div><input type="radio" name="frequentation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence2']; ?></label></div>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Clean']; ?></legend>
                <div><input type="radio" name="clean" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean0']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean1']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean2']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean3']; ?></label></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['note']; ?></legend>
                <input type="radio" name="note" id="" value="1"> <label for="radio">1</label>
                <input type="radio" name="note" id="" value="2"> <label for="radio">2</label>
                <input type="radio" name="note" id="" value="3"> <label for="radio">3</label>
                <input type="radio" name="note" id="" value="4"> <label for="radio">4</label>
                <input type="radio" name="note" id="" value="5"> <label for="radio">5</label>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['observation']; ?></legend>
                <textarea class="textAreaComment" name="observation" maxlength="1900" rows="5" cols="40"></textarea>
            </fieldset>

            <a><input type="submit" name="submit" value="<?php echo $formLabel[$currentLang]['submit']; ?>"/></a>

        </form>
        
        <br><br><br><br>
        

        <form id="formRandonnee" action="javascript:postDataToInsertAvis()" method="POST" accept-charset="UTF-8">
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['pseudo']; ?></legend>
                <textarea name="pseudo" maxlength="50" rows="1" cols="40"></textarea>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['dateObservation']; ?></legend>
                <input type="text" name="date" id="dateForm" value="" onclick="javascript:showDatePicker();">
                <div id="datepicker"></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['done']; ?></legend>
                <input type="radio" name="done" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['done0']; ?></label>
                <input type="radio" name="done" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['done1']; ?></label>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Orientation']; ?></legend>
                <div><input type="radio" name="orientation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Orientation0']; ?></label></div>
                <div><input type="radio" name="orientation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Orientation1']; ?></label></div>
                <div><input type="radio" name="orientation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Orientation2']; ?></label></div>
                <div><input type="radio" name="orientation" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Orientation3']; ?></label></div>
            </fieldset>
    
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Affluence']; ?></legend>
                <div><input type="radio" name="frequentation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence0']; ?></label></div>
                <div><input type="radio" name="frequentation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence1']; ?></label></div>
               <div><input type="radio" name="frequentation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence2']; ?></label></div>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Temperature']; ?></legend>
                <div><input type="radio" name="temperature" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature0']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature1']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature2']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature3']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="4"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature4']; ?></label></div>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Vent']; ?></legend>
                <div><input type="radio" name="wind" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent0']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent1']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent2']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent3']; ?></label></div>
            </fieldset>

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['note']; ?></legend>
                <input type="radio" name="note" id="" value="1"> <label for="radio">1</label>
                <input type="radio" name="note" id="" value="2"> <label for="radio">2</label>
                <input type="radio" name="note" id="" value="3"> <label for="radio">3</label>
                <input type="radio" name="note" id="" value="4"> <label for="radio">4</label>
                <input type="radio" name="note" id="" value="5"> <label for="radio">5</label>
            </fieldset>
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['observation']; ?></legend>
                <textarea class="textAreaComment" name="observation" maxlength="1900" rows="5" cols="40"></textarea>
            </fieldset>

            <a><input type="submit" name="submit" value="<?php echo $formLabel[$currentLang]['submit']; ?>"/></a>

        </form>
        
        <br><br><br><br>
        
        <form id="formPlageBaignadePiscine" action="javascript:postDataToInsertAvis()" method="POST" accept-charset="UTF-8">
    
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['pseudo']; ?></legend>
                <textarea name="pseudo" maxlength="50" rows="1" cols="30"></textarea>
            </fieldset>
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['dateObservation']; ?></legend>
                <input type="text" name="date" id="dateForm" value="" onclick="javascript:showDatePicker();">
                <div id="datepicker"></div>
            </fieldset>

            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Pavillon']; ?></legend>
                <div><input type="radio" name="pavillon" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Pavillon0']; ?></label></div>
                <div><input type="radio" name="pavillon" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Pavillon1']; ?></label></div>
                <div><input type="radio" name="pavillon" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Pavillon2']; ?></label></div>
            </fieldset>
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['WaterTemp']; ?></legend>
                <div><input type="radio" name="temperature" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature0']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature1']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature2']; ?></label></div>
                <div><input type="radio" name="temperature" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Temperature3']; ?></label> </div>
            </fieldset>
            
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Vagues']; ?></legend>
                <div><input type="radio" name="wave" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Vagues0']; ?></label></div>
                <div><input type="radio" name="wave" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Vagues1']; ?></label></div>
                <div><input type="radio" name="wave" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Vagues2']; ?></label></div>
            </fieldset>
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Vent']; ?></legend>
                <div><input type="radio" name="wind" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent0']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent1']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent2']; ?></label></div>
                <div><input type="radio" name="wind" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Vent3']; ?></label></div>
            </fieldset>
            

            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Affluence']; ?></legend>
                <input type="radio" name="frequentation" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence0']; ?></label>
                <input type="radio" name="frequentation" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence1']; ?></label>
                <input type="radio" name="frequentation" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Affluence2']; ?></label>
            </fieldset>
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['Clean']; ?></legend>
                <div><input type="radio" name="clean" id="" value="0"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean0']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="1"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean1']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="2"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean2']; ?></label></div>
                <div><input type="radio" name="clean" id="" value="3"> <label for="radio"><?php echo $formLabel[$currentLang]['Clean3']; ?></label></div>
            </fieldset>

            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['note']; ?></legend>
                <input type="radio" name="note" id="" value="1"> <label for="radio">1</label>
                <input type="radio" name="note" id="" value="2"> <label for="radio">2</label>
                <input type="radio" name="note" id="" value="3"> <label for="radio">3</label>
                <input type="radio" name="note" id="" value="4"> <label for="radio">4</label>
                <input type="radio" name="note" id="" value="5"> <label for="radio">5</label>
            </fieldset>
            
            
            <fieldset>
                <legend><?php echo $formLabel[$currentLang]['observation']; ?></legend>
                <textarea class="textAreaComment" name="observation" maxlength="1900" rows="5" cols="40"></textarea>
            </fieldset>

            
            <input type="submit" name="submit" value="<?php echo $formLabel[$currentLang]['submit']; ?>" />

        </form>

	</body>
</html>
