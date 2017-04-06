(function(){

	angular
		.module('locatorApp')
		.controller('locationDetailCtrl', locationDetailCtrl);

	locationDetailCtrl.$inject=['$routeParams','$location', '$uibModal', 'locatorData', 'authentication'];
	function locationDetailCtrl($routeParams,$location, $uibModal, locatorData, authentication){
		var vm=this;
		vm.locationid=$routeParams.locationid;
		vm.isLoggedIn=authentication.isLoggedIn;
		vm.currentPath=$location.path();
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
				vm.popupReviewForm=function(){

				
					var uibModalInstance = $uibModal.open({
						templateUrl: '/reviewModal/reviewModal.view.html',
						controller: 'reviewModalCtrl as vm',
						resolve : {
							locationData : function () {
								//console.log("name is " + vm.data.location.data.name);
								return {
									locationid : vm.locationid,
									locationName : vm.data.location.data.name
								};
								console.log("location name is " + locationName);
					}

					}

					});

					//console.log("location data has name ::" + );
					uibModalInstance.result.then(function (data) {
						vm.data.location.data.reviews.push(data.data);

					});

			};

	}
})();