// Service
var locatorData=function($http){
	return $http.get('/api/locations?lng=-0.9690884&lat=51.455041&maxDistance=20000');
};

// controller
var locationListCtrl=function($scope, locatorData){
	locatorData
			.then(function(data) {
			$scope.data={locations: data};
			console.log($scope.data.name);
		  }, function(e) {
		  	console.log("Error is " + e);
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