<?php
    $username = "root";
    $password = "M@sters15intern";
    $database = "yelp-dataset";
    $localhost = "127.0.0.1";
    
    $initialQuery = "SELECT * FROM businessSeasons where city='Phoenix' limit 5";
    //$stateQuery = "SELECT DISTINCT state FROM businessSeasons WHERE state LIKE '__' ORDER BY state";
    $seasonQuery = "SELECT DISTINCT season FROM businessSeasons";
?>