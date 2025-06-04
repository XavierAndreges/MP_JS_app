<?php

function getItem($PDOMySQL, $table, $idRepName)
{
    $sql = "select * from ".$table." WHERE idRepName='".$idRepName."'";
    $PDOreq	= $PDOMySQL -> query($sql);
    $itemArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);
    
    //var_dump($itemArray).'<br/>';

    if ($table != "Circuits")
    {
        $tabDiapo = array();
            
        $sqlPicture = "select name from Pictures where idRepName='".$idRepName."'";
        $PDOreq	= $PDOMySQL -> query($sqlPicture);
        $pictureArray = $PDOreq -> fetchAll(PDO::FETCH_ASSOC);

        for ($l = 0; $l < count($pictureArray); $l++)
        {
            array_push($tabDiapo, $pictureArray[$l]['name']);
        }
            
        $itemArray[0]["tabDiapo"] = $tabDiapo;

        //echo 'var listItems'.$table.' = '.json_encode($itemArray).';';
    }
    
    return $itemArray[0];
}

?>