var Geo = {};
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    alert('Geolocation is not supported');
}

function error() {
    alert("That's weird! We couldn't find you!");
}

function success(position) {
    console.log(Geo);
    Geo.lat = position.coords.latitude;
    Geo.lng = position.coords.longitude;
    var key = '41db49827f93dc54';
    var weather = "http://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/" + Geo.lat + "," + Geo.lng + ".json";
    $.ajax({
        url: weather,
        dataType: "jsonp",
        success: getInformation
    });
}

function getInformation(data){
	console.log(data);
	// get all the information
	var location = data['location']['city'] + ", " + data['location']['state'];
	console.log("You are near: " + location + ", " + data['location']['state']);
	var temp = Math.round(data['current_observation']['temp_f']);
	var img = data['current_observation']['icon_url'];
	var desc = data['current_observation']['weather'];
	var wind = data['current_observation']['wind_string'];
	//setting the HTML fields to the correct parameters
	$('#location').html(location);
	$('#temp').html(temp);
	$('#desc').html(desc);
	$('#wind').html(wind);
	//filling the image src attribute with the image url
	$('#img').attr('src', img);

}
function findWeather(str){
	console.log("the text entered was: " + str);
	
	// API key
    var key = '41db49827f93dc54';
	
	// decipher whether input value was zip code or city, state
	if(str.indexOf(',') != -1){
		var city = str.substring(0,str.indexOf(','));
		var state = str.substring(str.indexOf(',')+1);
		
		// format URL accordingly
		var weather = "http://api.wunderground.com/api/"+ key +"/forecast/geolookup/conditions/q/" + state + "/" + city + ".json";

		// send json request with city, state
		$.ajax({
			url: weather,
			dataType: "jsonp",
			success: getInformation
		});
	}
	document.getElementById('enteredLoc').value = "";
}