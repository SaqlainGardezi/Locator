// Service
var locatorData=function($http){
	return $http.get('/api/locations?lng=-0.9630884&lat=51.451041&maxDistance=99999999999999999999999');
};

// controller
var locationListCtrl=function($scope, locatorData){
	$scope.message="Searching for nearby places";
	locatorData
			.then(function(data) {
			$scope.message=data.length>0 ? "" : "No locations found"; 
			$scope.data={locations: data};
			console.log("data contains " + $scope.data);
		  }, function(e) {
		  	$scope.message="Sorry something went wrong";
		  });
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
	.service('locatorData', locatorData);