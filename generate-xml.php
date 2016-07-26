<?php
    
    $state = $_GET["drpdwnStateVal"];
    $season = $_GET["drpdwnSeasonVal"];
    
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

    // Select all the rows in the markers table
    $query = "SELECT * FROM businessReviews where state='".$state."' AND season='".$season."'";
    
    //$query = "SELECT * FROM businessReviews where state= 'PA' LIMIT 10";
    
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
    }

    echo $dom->saveXML();
?>