<?php
require_once __DIR__ . '/config.php';


header('Content-Type: application/json');

// Return the configuration as JSON
echo json_encode(getGoogleMapsApiKey());
?> 