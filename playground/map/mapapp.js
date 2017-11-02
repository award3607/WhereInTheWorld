function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}

//src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap



//KU Edwards Campus: 38.899146, -94.724889
//Kansas City: 39.0997, -94.5786
//Denver: 39.761849, -104.880625
//San Francisco: 37.727239, -123.032229
//New York: 40.664274, -73.9385
//Austin: 30.307182, -97.755996
