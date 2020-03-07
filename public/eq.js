
// window.onbeforeunload = function(){
//   return 'Are you sure you want to leave?';
// };
var mapsKey = config.gmapskey
var geonamesKey= config.geonameskey
window.addEventListener('load',function(){

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&callback=initMap`;
  document.body.appendChild(script);
});



var geocoder
var map
var north
var south
var east
var west
var username = geonamesKey

var options ={
  zoom: 10,
  center: {lat: 25.6866, lng: -100.3161}
}


function initMap() {
 
  // The map, centered at Uluru
   map = new google.maps.Map(
      document.getElementById('map'), {options});

  //Geocoder   
  geocoder = new google.maps.Geocoder();

  document.getElementById('search').addEventListener('click', function() {
    codeAddress(geocoder, map);

  });
  
  }


  newSearch();
// New Search

function newSearch(){
 
  document.getElementById('search').addEventListener('click', function() {
    codeAddress(geocoder, map);
  });
}

// Deletes previous
 function deleteMarkers() {
        clearMarkers();
        markers = [];
  }


  function codeAddress (){
    var address = document.getElementById('location').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        var r = results[0].geometry.location
        map.setCenter(r);
        var v = results[0].geometry.viewport
        var ne  = {lat:v.Za.i, lng: v.Za.j}
        var sw  = {lat:v.Ua.i, lng: v.Ua.j}

        north = ne.lat
        south = sw.lat
        east = ne.lng
        west = ne.lng

        // console.log({
        //   "nort": north,
        //   "south": south,
        //   "east": east,
        //   "west": west
        // })

        geonamepi(map)
        
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


function geonamepi (map){
    url = `http://api.geonames.org/earthquakesJSON?north=${north}&south=${south}&east=${east}&west=${west}&username=${username}`
    fetch(url)
    .then(resultAPI=>resultAPI.json())
    .then(result => {
        console.log(result)
        result.earthquakes.map(earthquake => {
            var marker = new google.maps.Marker({
                map: map,
                position: {
                    lat: earthquake.lat,
                    lng: earthquake.lng
                }
              });
             
            
        })
    })
}
