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
	"dropofftime":"01:30"
};

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
            console.log(result.TotalPrice);
		});
}


requestData(hotelUrl, hotelOptions);
requestData(carUrl, carOptions);





