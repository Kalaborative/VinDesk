$(document).ready(function(){
	var resultText;
	setInterval(function() {
		var idLength = $('#vinID').val().length;
		if (idLength > 0) {
			$("#submitBtn").show();
		} else {
			$("#submitBtn").hide();
		}
	}, 10);
	$("#myForm").submit(function(e) {
		e.preventDefault();
		$(".lds-ripple").show();
		$.ajax({
			url: '/checkvin',
			type: 'post',
			data: $("#myForm").serialize()
		}).done(function(response) {
			console.log(response['data']);
			$(".lds-ripple").hide();
			var year = response['data'][8]['Value'];
			var model = response['data'][5]['Value'];
			var make = response['data'][7]['Value'];
			var series = response['data'][10]['Value'];
			var trim = response['data'][11]['Value'];
			if (!series) {
				resultText = year + " " + model + " " + make + " " + trim;
			} else {
				resultText = year + " " + model + " " + make + " " + series;
			}
			function allExists(value) {
				return value;
			}

			var myArray = [year, model, make];
			var foundMatch = myArray.every(allExists);
			if (!foundMatch) {
				$("#results").html('No match found.');
				$("#instantData").html("");
				$("#previewImg").fadeOut('fast');
				$("#moreInfo").fadeOut('fast');
			} else {
				$("#results").html("⭐️ Car Found: " + resultText);

				var origin = response['data'][13]['Value'];
				var manufacturer = response['data'][6]['Value'];
				var vehicleType = response['data'][12]['Value'];
				var doors = response['data'][23]['Value'];

				var t1 = '<tr><th scope="row">Made In</th><td>' + origin + '</td></tr>';
				var t2 = '<tr><th scope="row">Manufacturer</th><td>' + manufacturer + '</td></tr>';
				var t3 = '<tr><th scope="row">Type</th><td>' + vehicleType + '</td></tr>';
				var t4 = '<tr><th scope="row">Doors</th><td>' + doors + '</td></tr>';

				$("#instantData").html(t1 + t2 + t3 + t4);
				$("#previewImg").fadeIn('slow');
				setTimeout(function() {
					$("#moreInfo").fadeIn('slow');
				}, 3000);
			}
		});
	});
	$("#previewImg").click(function() {
		$(".lds-ripple").show();
		$('.modal-body').html('Generating...');
		var payload = {'query': resultText};
		$.ajax({
			url: '/retrieveImg',
			type: 'post',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'json'
		}).done(function(response) {
			$(".lds-ripple").hide();
			var src = response['src'];
			$('.modal-body').html('<img src="' + src + '" style="max-width: 100%; max-height: 100%">');
		}).fail(function(){
			$(".lds-ripple").hide();
			$('.modal-body').html("Image could not be retrieved.");
		});
	});
});