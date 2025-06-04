<?php
echo "Version de PHP : " . phpversion() . "\n";
echo "Extensions chargées : \n";
print_r(get_loaded_extensions()); 