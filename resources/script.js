
var stateVal, seasonVal, categoryVal, map, infoWindow, starRating;

var customIcons = {
    AZ: {
        icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png'
    }
    /*,
     PA: {
     icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
     }*/
};

function load() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(33.4794817, -112.0736806),
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow;

    // Change this depending on the name of your PHP file
    downloadUrl("generate-xml.php", function (data) {
        getXmlMarkers(data);
    });
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
            "&drpdwnSeasonVal=" + getSeason() + "&drpdwnCategoryVal=" + getCategory(), true);
    request.send(null);
}

function getXmlMarkers(xmlhttp) {
    var xml = xmlhttp.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
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
        var icon = customIcons[state] || {};
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
        bindInfoWindow(marker, map, infoWindow, html);
    }
}

function bindInfoWindow(marker, map, infoWindow, html) {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);

        document.getElementById("tableData").style.display = 'block';
        document.getElementById("businessName").innerHTML = marker.business_name;
        document.getElementById("city").innerHTML = marker.city;
        document.getElementById("star_rating").style.width = applyRating(marker);
        document.getElementById("reviews").innerHTML = marker.reviewCount;
        document.getElementById("category").innerHTML = marker.category;
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
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            getXmlMarkers(xmlhttp)
        }
    }
    xmlhttp.open("GET", "generate-xml.php?drpdwnStateVal=" + getState() + "&drpdwnSeasonVal=" + getSeason(), true);
    xmlhttp.send();
}

function applyRating(marker) {
    starRating = marker.stars;
    var starVal = (starRating * 20) / 100;
    return (starVal * 100) + "%";
}







