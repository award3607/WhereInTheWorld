var hotelUrl = "http://api.hotwire.com/v1/search/hotel";

var hotelOptions = {
	"dest": "Atlanta",
	"startdate": "11/24/2017",
	"enddate": "11/27/2017",
	"rooms": "1",
	"adults": "1",
	"children": "0"
};

var carUrl = "http://api.hotwire.com/v1/search/car";

var carOptions = {
	"dest":"Atlanta",
	"startdate":"11/24/2017",
	"enddate":"11/27/2017",
	"pickuptime":"10:00",
	"dropofftime":"13:30"
};

var airUrl = "http://api.hotwire.com/v1/tripstart/air";

var airOptions = {
		// "distance": "300",
	"startdate": "10/15/2017",
	"enddate": "11/1/2017",
	"origin": "Kansas City",
	"dest": "Atlanta"
	// "price": "1000"
}

function generateSearchUrl(baseUrl, options) {

	var url = baseUrl + "?apikey=4hjyj79mhvxkvswbx5mur2xp&format=jsonp";
	Object.keys(options).forEach(function(key) {
		url += "&" + key + "=" + options[key];
	});
	return url;
}	

function requestData(apiUrl, options) {
	var searchUrl = generateSearchUrl(apiUrl, options);
	console.log(searchUrl);

	$.ajax({
			url: searchUrl,
			method: "GET",
			dataType: 'jsonp',
   			crossDomain: true
		})
		.done(function(response) {

			console.log(response.Result);
            var result = response.Result[0];
            console.log(result.TotalPrice, result.DeepLink);
            var $h = $("<div>").html("<a href=" + result.DeepLink + ">" + result.TotalPrice +"</a>");
            $("body").append($h);
		});
}

$("#submit").on("click", function() {
	event.preventDefault();
	var destType = $("#dest-type").val().trim();
	var tripLength = $("#trip-length").val().trim();
	var numAdults = parseInt($("#trip-adults").val().trim());
	var numChildren = parseInt($("#trip-children").val().trim());
	console.log(destType, tripLength, numAdults, numChildren);
	requestData(hotelUrl, hotelOptions);
	requestData(carUrl, carOptions);
	requestData(airUrl, airOptions);
	displayResults(destType);
});

$("#reset").on("click", function() {
	event.preventDefault();
	$("#dest-type").val("");
	$("#trip-length").val("");
	$("#trip-adults").val("");
	$("#trip-children").val("");
	clearMarkers();
});

var config = {
	apiKey: "AIzaSyAis8sLxqMEv00Zmy1h00LwK3GfXul3i0g",
	authDomain: "whereintheworld-1509580469553.firebaseapp.com",
	databaseURL: "https://whereintheworld-1509580469553.firebaseio.com",
	projectId: "whereintheworld-1509580469553",
	storageBucket: "",
	messagingSenderId: "601646874065"
};

firebase.initializeApp(config);
var ref = firebase.database().ref();
var map;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: {lat: 39.0997, lng: -94.5786}
	});
}

function displayResults(dest) {
    console.log("Hopefully: " + dest);
	ref.orderByChild("destType").equalTo(dest).once("value", processResults, gotErr);
}

function processResults(data) {
	var markers = data.val();
    // console.log(markers);
    //create array of keys
	var keys = Object.keys(markers);
    keys = shuffle(keys);
    console.log(keys);
	// console.log(markers);
	keys.forEach(function(key) {
		// console.log(markers[key]);
		displayMarker(markers[key]);
	});
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function gotErr(err) {
	console.log("Error: " + err);
}

var markerArr = [];

function displayMarker(destination) {
	var marker = new google.maps.Marker({
		position: {lat: parseFloat(destination.destLat), lng: parseFloat(destination.destLng)},
		map: map,
		title: destination.destCity + ", " + destination.destState,
		animation: google.maps.Animation.DROP
	});
	var w = new google.maps.InfoWindow({
		content: destination.destCity + ", " + destination.destState
	});
	marker.addListener("click", function() {
		w.open(map, marker);
	});
	markerArr.push(marker);
}

function clearMarkers() {
	markerArr.forEach(function(marker) {
		marker.setMap(null);
	});
	markerArr = [];
}

$(document).ready(function() {
	initMap();
});









