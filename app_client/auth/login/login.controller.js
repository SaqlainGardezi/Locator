(function(){
	angular
		.module('locatorApp')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject=['$location', 'authentication'];
	function loginCtrl($location, authentication){
		var vm=this;

		vm.pageHeader={
			title: 'Sign in to Locator'
		};

//	InstantiateCredentials
		vm.credentials={
			email:"",
			password:""
		};

		vm.returnPage=$location.search().page || '/';

		vm.onSubmit=function(){
			var formError="";
			if (!vm.credentials.email || !vm.credentials.password) {
				vm.formError="All fields are required. Try Again";
				return false;
			}else{
				vm.doLogin();
			}
		};

		vm.doLogin=function(){
			vm.formError="";
			authentication
				.login(vm.credentials)
				.then(function(){
					$location.search('page', null);
					$location.path(vm.returnPage);
				}, function(err){
					vm.formError=err;
				});
		};
	}

})();