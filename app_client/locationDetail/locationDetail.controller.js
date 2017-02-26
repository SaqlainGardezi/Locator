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
				vm.data={location:data};
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