<?php
    
    $state = $_GET["drpdwnStateVal"];
    $season = $_GET["drpdwnSeasonVal"];
    $category = $_GET["drpdwnCategoryVal"];
    
    require("config.php");

    // Start XML file, create parent node
    $dom = new DOMDocument("1.0");
    $node = $dom->createElement("markers");
    $parnode = $dom->appendChild($node);

    // Opens a connection to a MySQL server
    $connection=mysql_connect ($localhost, $username, $password);
    if (!$connection) {  die('Not connected : ' . mysql_error());}

    // Set the active MySQL database
    $db_selected = mysql_select_db($database, $connection);
    if (!$db_selected) {
      die ('Can\'t use db : ' . mysql_error());
    }

    if($category != "Select"){
    // Select all the rows from table satisfying the given condition
    $query = "SELECT bs.business_id, bs.name, season, 
                    bs.latitude, bs.longitude, bs.state, 
                    bs.city,bc.categories, bc.stars, 
                    bc.review_count, bc.full_address
                FROM 
                    businessCategories bc JOIN businessSeasons bs
                    ON bc.business_id = bs.business_id 
                WHERE bc.state='".$state."' AND season='".$season."' 
                AND bc.categories LIKE '%".$category."%' LIMIT 200";
    } else {
        $query = "SELECT * FROM businessSeasons where state= '".$state."' AND season='".$season."' LIMIT 200";
    }
    
    //$query = "SELECT * FROM businessSeasons where state= 'PA' AND season='Summer' LIMIT 200";
    
    $result = mysql_query($query);
    if (!$result) {
      die('Invalid query: ' . mysql_error());
    }

    header("Content-type: text/xml");
    
    // Iterate through the rows, adding XML nodes for each
    while ($row = @mysql_fetch_assoc($result)){
      // ADD TO XML DOCUMENT NODE
      $node = $dom->createElement("marker");
      $newnode = $parnode->appendChild($node);
      $newnode->setAttribute("name",$row['name']);
      $newnode->setAttribute("latitude", $row['latitude']);
      $newnode->setAttribute("longitude", $row['longitude']);
      $newnode->setAttribute("fulladdress", $row['full_address']);
      $newnode->setAttribute("state", $row['state']);
      $newnode->setAttribute("city", $row['city']);
      $newnode->setAttribute("stars", $row['stars']);
      $newnode->setAttribute("reviewCount", $row['review_count']);
      $newnode->setAttribute("category", $row['categories']);
    }

    echo $dom->saveXML();
?>