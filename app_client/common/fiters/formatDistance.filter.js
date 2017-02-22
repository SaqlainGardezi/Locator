(function(){

angular
	.module('locatorApp')
	.filter('formatDistance', formatDistance);

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
		if (distance==0) {
			return distance + "  Km";
		}
		
		else{
			
			return "?";

		}
	};
};

})();