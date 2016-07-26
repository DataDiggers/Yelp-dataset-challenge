<?php
    $username = "root";
    $password = "M@sters15intern";
    $database = "dataset_yelp";
    $localhost = "127.0.0.1";
    
    $stateQuery = "SELECT DISTINCT state FROM businessReviews WHERE state LIKE '__'";
    $seasonQuery = "SELECT DISTINCT season FROM businessReviews";
?>