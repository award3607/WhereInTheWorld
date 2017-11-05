// var destination = {
// 	city: ,
// 	state: ,
// 	latlng: {lat: , lng: },
// 	destinationType: ,
// 	adaCompliant: ,
// 	petFriendly: ,
// 	airport: 
// }


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

$("#submit-button").on("click", function() {
	var destCity = $("#dest-city").val().trim();
	var destState = $("#dest-state").val().trim();
	var destType = $("#dest-type").val().trim();
	var destLat = $("#dest-lat").val().trim();
	var destLng = $("#dest-lng").val().trim();
	var destAirport = $("#dest-airport").val().trim();
	if(destCity && destState && destLat && destLng && destAirport) {
		ref.push({
			destCity: destCity,
			destState: destState,
			destType: destType,
			destLat: destLat,
			destLng: destLng,
			destAirport: destAirport
		});
		$("#dest-city").val("");
		$("#dest-state").val("");
		$("#dest-type").val("");
		$("#dest-lat").val("");
		$("#dest-lng").val("");
		$("#dest-airport").val("");
	}
	else {
		console.log("Missing field");
	}
});

ref.on("child_added", function(snapshot) {
	displayDest(snapshot.val());
	}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});

function displayDest(data) {
	var $row = $("<tr>");
	$row.append($("<td>").text(data.destCity))
		.append($("<td>").text(data.destState))
		.append($("<td>").text(data.destType))
		.append($("<td>").text(data.destLat))
		.append($("<td>").text(data.destLng))
		.append($("<td>").text(data.destAirport));
	$("tbody").append($row);
}