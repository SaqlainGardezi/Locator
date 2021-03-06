(function(){
	angular
		.module('locatorApp')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject=['$location', 'authentication'];
	function registerCtrl($location, authentication){
		var vm=this;

		vm.pageHeader={
			title: 'Create a new Locator Account'
		};

//	InstantiateCredentials
		vm.credentials={
			name: "",
			email:"",
			password:""
		};

		vm.returnPage=$location.search().page || '/';

		vm.onSubmit=function(){
			var formError="";
			if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
				vm.formError="All fields are required. Try Again";
				return false;
			}else{
				vm.doRegister();
			}
		};

		vm.doRegister=function(){
			vm.formError="";
			authentication
				.register(vm.credentials)
				.then(function(){
					$location.search('page', null);
					$location.path(vm.returnPage);
				}, function(err){
					vm.formError=err;
				});
		};
	}

})();