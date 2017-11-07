var baseurl = "http://api.hotwire.com/v1/search/hotel";
var hotelSearch = {
	"dest": "Atlanta",
	"startdate": "11/24/2017",
	"enddate": "11/27/2017",
	"rooms": "1",
	"adults": "1",
	"children": "0"
};
var carbaseurl = "http://api.hotwire.com/v1/search/car";
var carSearch = {
	"dest":"Atlanta",
	"startdate":"11/24/2017",
	"enddate":"11/27/2017",
	"pickuptime":"10:00",
	"dropofftime":"01:30"
};

function generateSearchurl(options) {

	var url = baseurl + "?apikey=4hjyj79mhvxkvswbx5mur2xp&format=json&";
	Object.keys(options).forEach(function(key) {
		url += key + "=" + options[key] + "&";
	});
	var last = url.lastIndexOf("&")
	return url.substring(0, last);
}

function requestHotel(options) {
	var searchurl = generateSearchurl(options);
	console.log(searchurl);
	var proxy = "https://cors-anywhere.herokuapp.com/"
	var queryURL = proxy + searchurl

	$.ajax({
			url: queryURL,
			method: "GET",
			dataType: 'json',
   			crossDomain: true
		})
		.done(function(response) {

			console.log(response);

		});
}
requestHotel(hotelSearch);

function generateSearchurlcars(options){
	var carurl = carbaseurl + "?apikey=4hjyj79mhvxkvswbx5mur2xp&format=json&";
	Object.keys(options).forEach(function(key) {
		carurl += key + "=" + options[key] + "&";
	});
	var last = carurl.lastIndexOf("&")
	return carurl.substring(0, last);
}

function requestCar(options){
var searchurlcar = generateSearchurlcars(options);
	console.log(searchurlcar);
	var proxy = "https://cors-anywhere.herokuapp.com/"
	var queryURLcar = proxy + searchurlcar

	$.ajax({
			url: queryURLcar,
			method: "GET",
			dataType: 'json',
   			crossDomain: true
		})
		.done(function(response) {

			console.log(response);

		});

}
requestCar(carSearch);