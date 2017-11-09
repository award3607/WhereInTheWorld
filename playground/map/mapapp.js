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
		zoom: 5,
		center: {lat: 39.0997, lng: -94.5786}
	});
	displayResults();
}

function displayResults() {
    console.log("Hopefully adventure");
	ref.orderByChild("destType").equalTo("adventure").once("value", processResults, gotErr);
}

function processResults(data) {
	var markers = data.val();
    console.log(markers);
    //create array of keys
	var keys = Object.keys(markers);
    //keys = keys.slice(0, 4);
	// console.log(markers);
	keys.forEach(function(key) {
		// console.log(markers[key]);
		displayMarker(markers[key]);
	});
}

function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}


function gotErr(err) {
	console.log("Error: " + err);
}

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
		$("body").append("<script src=\"https://widgets.skyscanner.net/widget-server/js/loader.js\" async></script>");
	});
}


// var trip = {
// 	transportation: "car",
// 	rentalCar: true,
// 	numPeople: 4,
// 	budgetPerPerson: 500,
// 	days: 4,
// 	needHotel: true
// 	totalBudget: this.numPeople * this.budgetPerPerson
// 	//rental car cost: do we get a per day rate, or do we get total for the number of days?
// 	//hotel cost: do we get a per day rate, or total for number of days
// }

// function makeWindow(dest) {
// 	//build infowindow's content string
// 	var contentString = "<div data-skyscanner-widget='LocationWidget' data-locale='en-US' data-destination-iata-code='MCI'>" + 
// 						"</div>" + 
// 						"<script src='https://widgets.skyscanner.net/widget-server/js/loader.js' async></script>";
// 	var w = new google.map.InfoWindow({
// 		content: 
// 	})

// 	return w;
// }


//KU Edwards Campus: 38.899146, -94.724889
//Kansas City: 39.0997, -94.5786
//Denver: 39.761849, -104.880625
//San Francisco: 37.727239, -123.032229
//New York: 40.664274, -73.9385
//Austin: 30.307182, -97.755996