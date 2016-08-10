<?php
    $username = "root";
    $password = "*****";
    $database = "yelp-dataset";
    $localhost = "127.0.0.1";
    
    $stateQuery = "SELECT DISTINCT state FROM businessReviews WHERE state LIKE '__'";
    $seasonQuery = "SELECT DISTINCT season FROM businessReviews";
?>
