
var stateVal, seasonVal, categoryVal, starRating;
var map, markers = [], infoWindow;

function load() {
    getMap();
    
    //Get data from xml file
    downloadUrl("generate-xml.php", function (data) {
        getXmlMarkers(data);
    });
}

function getMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(36.778259, -119.417931),
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow;
}

function downloadUrl(url, callback) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open("GET", "generate-xml.php?drpdwnStateVal=" + getState() +
            "&drpdwnSeasonVal=" + getSeason(), true);
    request.send(null);
}

function getXmlMarkers(xmlhttp) {
    var xml = xmlhttp.responseXML;
    markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
        var name = markers[i].getAttribute("name");
        var point = new google.maps.LatLng(
                parseFloat(markers[i].getAttribute("latitude")),
                parseFloat(markers[i].getAttribute("longitude")));

        var address = markers[i].getAttribute("fulladdress");
        var state = markers[i].getAttribute("state");
        var city = markers[i].getAttribute("city");
        var stars = markers[i].getAttribute("stars");
        var reviews = markers[i].getAttribute("reviewCount");
        var category = markers[i].getAttribute("category");

        var html = "<b>" + name + "</b> <br/>" + address;
        var icon = {};
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            icon: icon.icon,
            business_name: name,
            city: city,
            stars: stars,
            reviewCount: reviews,
            category: category
        });
        
        var html = "<b>" + name + "</b> <br/>" + address + "<br/>City: " 
                + city + "<br/>Reviews: <b>" + reviews + "</b><br/>Stars: " 
                + "<div class=rating-box><div class=rating id=star_rating>" + applyRating(marker) + "</div></div>";
        
        bindInfoWindow(marker, map, infoWindow, html);
    }
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function bindInfoWindow(marker, map, infoWindow, html) {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);

        document.getElementById("star_rating").style.width = applyRating(marker);
    });
}

function getState() {
    return stateVal = document.getElementById('stateValues').value;
}

function getSeason() {
    return seasonVal = document.getElementById('seasonValues').value;
}

function getCategory() {
    return categoryVal = document.getElementById('categoryValues').value;
}

function doNothing() {}

function getRecommendations() {
    getMap();
    
    if(validateFilters()){
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                getXmlMarkers(xmlhttp);
            }
        }

        if (getCategory() !== "Select") {
            xmlhttp.open("GET", "generate-xml.php?drpdwnStateVal=" + getState() +
                    "&drpdwnSeasonVal=" + getSeason() + "&drpdwnCategoryVal=" + getCategory(), true);
        } else {
            xmlhttp.open("GET", "generate-xml.php?drpdwnStateVal=" + getState() +
                    "&drpdwnSeasonVal=" + getSeason(), true);
        }
        xmlhttp.send();
    }   
}

function validateFilters(){
    if(getState() === "Select" && getSeason() === "Select"){
        alert("Please select a valid State and Season");
        return false;
    } else if(getState() === "Select"){
        alert("Please select a valid State");
        return false;
    } else if(getSeason() === "Select"){
        alert("Please select a valid Season");
        return false;
    } else{
        return true;
    }
}

function applyRating(marker) {
    starRating = marker.stars;
    var starVal = (starRating * 20) / 100;
    return (starVal * 100) + "%";
}