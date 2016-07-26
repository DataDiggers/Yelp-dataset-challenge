
var stateVal, seasonVal;

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
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(33.4794817, -112.0736806),
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  var infoWindow = new google.maps.InfoWindow;

  // Change this depending on the name of your PHP file
  downloadUrl("generate-xml.php", function(data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
      var name = markers[i].getAttribute("name");
      var point = new google.maps.LatLng(
          parseFloat(markers[i].getAttribute("latitude")),
          parseFloat(markers[i].getAttribute("longitude")));

      var address = markers[i].getAttribute("fulladdress");
      var state = markers[i].getAttribute("state");
      var html = "<b>" + name + "</b> <br/>" + address;
      var icon = customIcons[state] || {};
      var marker = new google.maps.Marker({
        map: map,
        position: point,
        icon: icon.icon
      });
      bindInfoWindow(marker, map, infoWindow, html);
    }
  });
}

function bindInfoWindow(marker, map, infoWindow, html) {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
    console.log(marker.icon);
    console.log(marker.position);
  
    google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  
  request.open("GET", "generate-xml.php?drpdwnStateVal="+getState()+"&drpdwnSeasonVal="+getSeason(), true);
  request.send(null);
}

function getState(){
    return stateVal = document.getElementById('stateValues').value;
}

function getSeason(){
    return seasonVal = document.getElementById('seasonValues').value;
}

function doNothing() {}





/*
 * New codeon click of Recommend button
 */
function getRecommendations(){
    var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  
  request.open("GET", "generate-xml.php?drpdwnStateVal="+getState()+"&drpdwnSeasonVal="+getSeason(), true);
  request.send(null);
  
}

