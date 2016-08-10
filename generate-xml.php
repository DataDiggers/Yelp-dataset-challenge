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

    // Select all the rows from table satisfying the given condition
    $query = "SELECT br.business_id, br.name as bname, bc.categories, br.date, season, 
                br.latitude, br.longitude, br.state, br.city,
                bc.stars, bc.review_count, bc.full_address
                FROM business bc JOIN businessReviews br
                ON bc.business_id = br.business_id 
                WHERE bc.state='".$state."' AND season='".$season."' 
                AND bc.categories LIKE '%".$category."%' LIMIT 100";

                //WHERE b_categories.categories LIKE '%{$category}%' AND
                //b_seasons.state='".$state."' AND season='".$season."' LIMIT 100";

                
                //b_categories.state='".$state."' AND season='".$season."' AND
                //b_categories.categories LIKE '%$category%' LIMIT 100";

    
    
                //b_categories.categories LIKE '%".$category."%' LIMIT 100";
 
    
   //b_seasons.state='ON' AND season='Spring' AND b_categories.categories LIKE '%Food%' LIMIT 100";
    
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
      $newnode->setAttribute("name",$row['bname']);
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