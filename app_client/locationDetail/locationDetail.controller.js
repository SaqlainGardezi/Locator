(function(){

	angular
		.module('locatorApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject=['$routeParams', 'locatorData'];
	function locationDetailCtrl($routeParams, locatorData){
		var vm=this;
		vm.locationid=$routeParams.locationid;
	locatorData.locationById(vm.locationid)
			.then(function(data) {

			vm.data = { location: data };
			console.log("data is::: " +vm.data.location.name );
			vm.pageHeader = {
			title: vm.data.location.data.name
			};
			console.log(vm.data.location.data);
			},function (e) {
			console.log(e);
			});
	}
})();