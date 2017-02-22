(function(){	// Open immediately-invoked function expression

angular
	.module('locatorApp')
	.controller('homeCtrl', homeCtrl);

homeCtrl.$inject=['$scope', 'locatorData', 'geolocation'];
function homeCtrl($scope, locatorData, geolocation){
	var vm=this;
	
	vm.pageHeader={
		title:'Locator App',
		strapline: 'Find awesome places to work with wifi near you!'
	};

	vm.sidebar={
		content: "Looking for  wifi or seat nearby...? Looking for  wifi or seat nearby...? Go and get it, A quick brown fox jumpas over the lazy dog"
	};

	vm.message = "Checking your location";
	
	vm.getData = function (position) {
		var lat = position.coords.latitude,
		lng = position.coords.longitude;
		vm.message = "Searching for nearby places";
			locatorData.locationByCoords(lat,lng)
			.then(function(data) {
				var arr = $.map(data, function(value) { return value; });
				console.log("Is it array???   " + Array.isArray(arr) );
				vm.message=arr.length > 0 ? " locations found" : "No locations found"; 
				vm.data={locations:arr};
				console.log("data is here : " + arr);
				vm.message="";
		  }, function(e) {
		  		vm.message="Sorry something went wrong";
		  	});




	};

	vm.showError = function (error) {
		$scope.$apply(function() {
			vm.message = error.message;
			switch(error.code) {
			        case error.PERMISSION_DENIED:
			            vm.message = "User denied the request for Geolocation."
			            break;
			        case error.POSITION_UNAVAILABLE:
			            vm.message = "Location information is unavailable."
			            break;
			        case error.TIMEOUT:
			            vm.message = "The request to get user location timed out."
			            break;
			        case error.UNKNOWN_ERROR:
			            vm.message = "An unknown error occurred."
			            break;
   			 }



		});
	};

	vm.noGeo = function () {
		$scope.$apply(function() {
			vm.message = "Geolocation is not supported by this browser.";
		});
	};
	geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
}

})();	// Close and invoke IIFE