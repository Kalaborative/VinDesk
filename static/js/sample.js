$(document).ready(function(){
	$("#houseCard").click(function() {
		$('#results').append('<li>You clicked house!</li>');
	});
	$("#carCard").click(function() {
		$('#results').append('<li>You clicked car!</li>');
	});
	$("#setLocation").click(function () { //user clicks button
	    if ("geolocation" in navigator){ //check geolocation available 
	        //try to get user current location using getCurrentPosition() method
	        navigator.geolocation.getCurrentPosition(function(position){ 
	                $("#results").html("Found your location <br />Lat : "+position.coords.latitude+" </br>Lang :"+ position.coords.longitude);
	        });
	    }else{
	        console.log("Browser doesn't support geolocation!");
	    }
	});
});