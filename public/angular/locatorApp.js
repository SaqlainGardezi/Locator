// Service for http het request to api
var locatorData=function($http){
	var locationByCoords=function(lat, lng){
		return $http.get('/api/locations?lng=' + lng +'&lat=' +lat+'&maxDistance=388933184558');
	};
	return{
		locationByCoords : locationByCoords
	};
	
};

//service got geolocation
var geolocation=function(){
	var getPosition=function(cbSuccess,cbError,cbNoGeo){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
		}
		else{
			cbNoGeo();
		}
	};
	return{
		getPosition : getPosition
	};
};

// controller
var locationListCtrl=function($scope, locatorData, geolocation){
	$scope.message="Checking your location";

	$scope.getData=function(position){
		var lat=position.coords.latitude,
			lng=position.coords.longitude;
		$scope.message="Searching for neaby places";
		locatorData.locationByCoords(lat,lng)
			.then(function(data) {

				
				arr = $.map(data, function(value,index) { return value; });


				 console.log("Is it array???   " + Array.isArray(arr) );
				 $scope.message=arr.length > 0 ? " locations found" : "No locations found"; 
				 $scope.data=arr;
				 console.log("data is here : " + arr);
				 $scope.message="";
		  }, function(e) {
		  		$scope.message="Sorry something went wrong";
		  	});
	};

	$scope.showError=function(error){
		$scope.$apply(function(){
			$scope.message=error.message;
		});
	};

	$scope.noGeo=function(){
		$scope.$apply(function(){
			$scope.message="Geo location not supported in your browser";
		});
	};
	geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};


// directive
var ratingStars=function(){
	return {
		scope:{
			thisRating: '=rating'
		},
		templateUrl: "/angular/rating-stars.html"
	};
};

var _isNumeric=function(n){
	return !isNaN(parseFloat(n)) && isFinite(n);
};

// filter
var formatDistance=function(){
	return function(distance){
		var numDistance,unit;
		if(distance && _isNumeric(distance)){
			if(distance>1){
				numDistance=parseFloat(distance).toFixed(1);
				unit="  km";
			}
			

			else{
				numDistance=parseInt(distance *1000, 10);
				unit="  m";
			}
			return numDistance + unit;
		}if (distance==0) {
			return distance + "  Km";
		}
		
		else{
			
			return "?";

		}
	};
};


angular.module('locatorApp', []);	// setter for module

angular
	.module('locatorApp')		// getter for module
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('locatorData', locatorData)
	.service('geolocation', geolocation);