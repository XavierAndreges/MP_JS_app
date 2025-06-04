<?php
    
    $destination = '/Applications/MAMP/htdocs/MarseilleProvence/platforms/ios/www/';
    
    //$destination = '/Applications/MAMP/htdocs/MarseilleProvence/platforms/android/assets/www/';
    
    //$destination = '/Applications/MAMP/htdocs/PlayMobile/platforms/android/assets/www/';
    
    $version = "1_1";
    
    //$get_js = array($destination.'js/mini/localisable_v'.$version.'.js', $destination.'js/mini/script_v'.$version.'.js', $destination.'CSS/mini/MyStyle_v'.$version.'.css');
    
    $get_js = array($destination.'js/mini/script_v'.$version.'.js');
    
    
    function compress($buffer) {
        /* remove comments */
        $buffer = preg_replace("/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/", "", $buffer);
        /* remove tabs, spaces, newlines, etc. */
        $buffer = str_replace(array("\r\n","\r","\t","\n",'  ','    ','     '), '', $buffer);
        /* remove other spaces before/after ) */
        $buffer = preg_replace(array('(( )+\))','(\)( )+)'), ')', $buffer);
        
        return $buffer;
    }
    
    
    foreach($get_js as $js)
    {
        $js = trim($js);
        
        if(file_exists($js))
        {
            echo "/*".$js."*/";
            ob_start("compress");
            echo file_get_contents($js) . "\n\r";
            ob_end_flush();
        }
    }
    
?>