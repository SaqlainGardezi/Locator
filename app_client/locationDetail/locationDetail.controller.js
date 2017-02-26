(function(){

	angular
		.module('locatorApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject=['$routeParams', 'locatorData'];
	function locationDetailCtrl($routeParams, locatorData){
		var vm=this;
		vm.locationid=$routeParams.locationid;
		locatorData.locationById(vm.locationid)
			.then(function(data){

				var arr = $.map(data, function(value) { return value; });
				console.log("Is it array???   " + Array.isArray(arr) );
				vm.message=arr.length > 0 ? " locations found" : "No locations found"; 
				vm.data={locations:arr};


				
				vm.pageHeader={
					title: vm.data.location.name
				};
			},
			function(e){
				console.log(e);
			});
		vm.pageHeader={
			title: vm.locationid
		};
	}
})();