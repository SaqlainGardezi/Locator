(function(){

angular
	.module('locatorApp')
	.service('geolocation', geolocation);

function geolocation(){
	var getPosition=function(cbSuccess, cbError, cbNoGeo){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(cbSuccess, cbError, {
			enableHighAccuracy : true,
			timeout : Infinity,
			maximumAge : 0
		});
		}
		else{
			cbNoGeo();
		}
	};
	return{
		getPosition: getPosition
	};
}


})();