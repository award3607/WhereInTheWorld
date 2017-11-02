function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var edwardsCampus = {lat: 38.899146, lng: -94.724889};
    var kansasCityMo = {lat: 39.0997, lng: -94.5786};
    var denverCo = {lat: 39.761849, lng: -104.880625};
    var sanFranciscoCa = {lat: 37.727239, lng: -123.032229};
    var newYorkNy = {lat: 40.664274, lng: -73.9385};
    var austinTx = {lat: 30.307182, lng: -97.755996};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: edwardsCampus
    });
    var marker0 = new google.maps.Marker({
	  position: edwardsCampus,
	  map: map
	});
	var marker1 = new google.maps.Marker({
	  position: kansasCityMo,
	  map: map
	});
	var marker2 = new google.maps.Marker({
	  position: denverCo,
	  map: map
	});
	var marker3 = new google.maps.Marker({
	  position: sanFranciscoCa,
	  map: map
	});
	var marker4 = new google.maps.Marker({
	  position: newYorkNy,
	  map: map
	});
	var marker5 = new google.maps.Marker({
	  position: austinTx,
	  map: map
	});
}



//KU Edwards Campus: 38.899146, -94.724889
//Kansas City: 39.0997, -94.5786
//Denver: 39.761849, -104.880625
//San Francisco: 37.727239, -123.032229
//New York: 40.664274, -73.9385
//Austin: 30.307182, -97.755996
