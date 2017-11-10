//global constants
const hotelUrl = "http://api.hotwire.com/v1/search/hotel";
const carUrl = "http://api.hotwire.com/v1/search/car";
const firebaseConfig = {
	apiKey: "AIzaSyAis8sLxqMEv00Zmy1h00LwK3GfXul3i0g",
	authDomain: "whereintheworld-1509580469553.firebaseapp.com",
	databaseURL: "https://whereintheworld-1509580469553.firebaseio.com",
	projectId: "whereintheworld-1509580469553",
	storageBucket: "",
	messagingSenderId: "601646874065"
};
const hotwireKey = "4hjyj79mhvxkvswbx5mur2xp";

//global variables
var destsArr = [];

// var hotelOptions = {
// 	"dest": "Daytona Beach",
// 	"startdate": "11/24/2017",
// 	"enddate": "11/27/2017",
// 	"rooms": "1",
// 	"adults": "1",
// 	"children": "0"
// };

// var carOptions = {
// 	"dest":"Atlanta",
// 	"startdate":"11/24/2017",
// 	"enddate":"11/27/2017",
// 	"pickuptime":"10:00",
// 	"dropofftime":"13:30"
// };


var ref;
var map;
var markerArr = [];

//listeners section
$(document).ready(function() {
	firebase.initializeApp(firebaseConfig);
	ref = firebase.database().ref();
	initMap();
});

$("#submit").on("click", function() {
	event.preventDefault();
	var destType = $("#dest-type").val().trim();
	var tripLength = $("#trip-length").val().trim();
	var numAdults = parseInt($("#trip-adults").val().trim());
	var numChildren = parseInt($("#trip-children").val().trim());
	//console.log(destType, tripLength, numAdults, numChildren);

	var promiseDests = displayResults(destType);
	$.when(promiseDests).done(function() {
		console.log("Firebase calls complete");
		// console.log(destsArr);
		destsArr.forEach(function(dest) {
			var hotelOptions = buildHotelOptions(dest, tripLength, numAdults, numChildren);
			var carOptions = buildCarOptions(dest, tripLength);

			var promiseHotel = requestData(hotelUrl, hotelOptions);
			var promiseCar = requestData(carUrl, carOptions);
			$.when(promiseHotel, promiseCar).done(function() {
				// console.log("Hotel response? ");
				var hotelResult = promiseHotel.responseJSON.Result[0];
				// console.log(hotelResult);
				// console.log("Car response? ");
				var carResult = promiseCar.responseJSON.Result[0]
				// console.log(carResult);
				console.log("Hotwire API calls complete");
				//displayResultRow needs to go in here.
				displayResultRow(dest, hotelResult, carResult);
			});
		});
	});
});

$("#reset").on("click", function() {
	event.preventDefault();
	$("#dest-type").val("");
	$("#trip-length").val("");
	$("#trip-adults").val("");
	$("#trip-children").val("");
	clearMarkers();
	destsArr = [];
	$("tbody").empty();
});


//Hotwire API section
function buildHotelOptions(destination, days, adults, children) {
	var startD = moment().add(7, "days");
	var endD = startD.clone().add(days, "days");
	//console.log(startD.format("MM/DD/YYYY"), endD.format("MM/DD/YYYY"));
	var options = {
		//"dest": "Daytona Beach",
		"dest": destination.destLat + "," + destination.destLng,
		"startdate": startD.format("MM/DD/YYYY"),
		"enddate": endD.format("MM/DD/YYYY"),
		"rooms": "1",
		"adults": adults,
		"children": children
	};
	return options;
}

function buildCarOptions(destination, days) {
	var startD = moment().add(7, "days");
	var endD = startD.clone().add(days, "days");
	var options = {
		//"dest": "Atlanta",
		"dest": destination.destLat + "," + destination.destLng,
		"startdate": startD.format("MM/DD/YYYY"),
		"enddate": endD.format("MM/DD/YYYY"),
		"pickuptime":"10:00",
		"dropofftime":"13:30"
	};
	return options;
}

function generateSearchUrl(baseUrl, options) {

	var url = baseUrl + "?apikey=" + hotwireKey + "&format=jsonp";
	Object.keys(options).forEach(function(key) {
		url += "&" + key + "=" + options[key];
	});
	return url;
}	

function requestData(apiUrl, options) {
	var searchUrl = generateSearchUrl(apiUrl, options);
	//console.log(searchUrl);

	return $.ajax({
			url: searchUrl,
			method: "GET",
			dataType: 'jsonp',
   			crossDomain: true
		})
		.done(function(response) {

			// console.log(response.Result);
            var result = response.Result[0];
            // console.log(result.TotalPrice, result.DeepLink);
            // var $h = $("<div>").html("<a href=" + result.DeepLink + ">" + result.TotalPrice +"</a>");
            // $("#results").append($h);
            // displayResultRow(destsArr[0], result.TotalPrice, result.DeepLink);
		});
}

function displayResultRow(destination, hotelData, carData) {
	var $row = $("<tr>");
    $row.append($("<td>").text(destination.destCity + ", " + destination.destState))
        .append($("<td>").html("<a href='" + hotelData.DeepLink + "' target='_blank'>$" + hotelData.TotalPrice + "</a>"))
        .append($("<td>").html("<a href='" + carData.DeepLink + "' target='_blank'>$" + carData.TotalPrice + "</a>"));
    $("tbody").append($row);
}


//Google Maps section
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: {lat: 39.0997, lng: -94.5786}
	});
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
	});
	markerArr.push(marker);
}

function clearMarkers() {
	markerArr.forEach(function(marker) {
		marker.setMap(null);
	});
	markerArr = [];
}


//Firebase section
function displayResults(dest) {
    //console.log("Hopefully: " + dest);
	return ref.orderByChild("destType").equalTo(dest).once("value", processResults, gotErr);
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
		destsArr.push(markers[key]);
		displayMarker(markers[key]);
	});
}


//Utility functions section
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






