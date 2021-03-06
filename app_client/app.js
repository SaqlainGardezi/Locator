(function(){

angular.module('locatorApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

function config($routeProvider, $locationProvider){
	$routeProvider
		.when('/login', {
			templateUrl:'/auth/login/login.view.html',
			controller: 'loginCtrl',
			controllerAs: 'vm'
		})
		.when('/register', {
			templateUrl: '/auth/register/register.view.html',
			controller: 'registerCtrl',
			controllerAs: 'vm'
		})
		.when('/location/:locationid', {
      		templateUrl:'/locationDetail/locationDetail.view.html',
      		controller:'locationDetailCtrl',
      		controllerAs: 'vm'
      	})
		.when('/', {
			templateUrl:'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.when('/about', {
	        templateUrl: '/common/views/genericText.view.html',
	        controller: 'aboutCtrl',
	        controllerAs: 'vm'
      	})
      	
		.otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
}

angular
	.module('locatorApp')
	.config(['$routeProvider','$locationProvider', config]);

})();