<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <title>Seasonal Trends</title>

        <link rel='stylesheet' type='text/css' href='resources/styles.css'>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWVVO7YafOX8F-yza4zVOR3zugQEekbGY"
        type="text/javascript"></script>
        <script type="text/javascript" src="resources/script.js"></script>
    </head>

    <body onload="load()" id="bgAnimation">
        <form>
            <div id="filters">

                <?php
                //Configuration details
                require("config.php");

                // Opens a connection to a mySQL server
                @mysql_connect($localhost, $username, $password)
                        or die('Not connected : ' . mysql_error());

                // Set the active mySQL database
                mysql_select_db($database)
                        or die('Can\'t use db : ' . mysql_error());

                echo "<h4>Seasonal Trends </h4>"; // Header
                
                echo "<label>*Location </label><select id=stateValues "
                . "name=drpdwnStateVal onchange=getState()>"; // list box select command

                echo "<option value=Select>Select</option>";
                
                echo "<option value=AZ>Arizona</option>";
                echo "<option value=IL>Illinios</option>";
                echo "<option value=NC>North Carolina</option>";
                echo "<option value=NV>Nevada</option>";
                echo "<option value=ON>Ontario</option>";
                echo "<option value=PA>Pittusburgh</option>";
                echo "<option value=QC>Quebec</option>";
                echo "<option value=SC>South Carolina</option>";
                echo "<option value=WI>Wisconsin</option>";
                
                echo "</select>"; // Closing of list box
                
                $result_seasons = mysql_query($seasonQuery);
                if (!$result_seasons) {
                    die('Invalid query: ' . mysql_error());
                }

                echo "<br><br><label>*Season </label><select id=seasonValues "
                . "name=drpdwnSeasonVal onchange=getSeason()>"; // list box select command

                echo "<option value=Select>Select</option>";
                while ($row = mysql_fetch_row($result_seasons)) {//Array or records stored in $row
                    echo "<option value=$row[0]>$row[0]</option>";
                }
                echo "</select><br><br>"; // Closing of list box

                echo "<label> Category </label><select id=categoryValues "
                . "name=drpdwnCategoryVal onchange=getCategory()>"; // list box select command

                echo "<option value=Select>Select</option>";
                
                echo "<option value=Automotive>Automotive</option>";
                echo "<option value=Bars>Bars</option>";
                echo "<option value=Education>Education</option>";
                echo "<option value=Fitness>Fitness</option>";
                echo "<option value=Food>Food</option>";
                echo "<option value=Golf>Golf</option>";
                echo "<option value=Grocery>Grocery</option>";
                echo "<option value=Gym>Gym</option>";
                echo "<option value=Hair Salons>Hair Salons</option>";
                echo "<option value=Health & Medical>Health & Medical</option>";
                echo "<option value=Nightlife>Nightlife</option>";
                echo "<option value=Pets>Pets</option>";
                echo "<option value=Pubs>Pubs</option>";
                echo "<option value=Restaurants>Restaurants</option>";
                echo "<option value=Shopping>Shopping</option>";
                echo "<option value=Veterinarians>Veterinarians</option>";
                
                echo "</select><br><br>"; // Closing of list box
                // Select all the rows in the markers table
                $query = $initialQuery;
                $result = mysql_query($query);
                if (!$result) {
                    die('Invalid query: ' . mysql_error());
                }
                ?>

                <input type="button" name="recommend" value="Show Trends" id="btnRecommend" 
                       onclick="getRecommendations()"/><br><br><span id=stateSeasonValidation></span>

            </div>
            <div id="map"></div>

        </form>
    </body>
</html>