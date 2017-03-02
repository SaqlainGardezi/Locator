(function(){
//	Register new service
	angular
		.module('locatorApp')
		.service('authentication', authentication);
//	Inject window service
	authentication.$inject=['$http', '$window'];
	function authentication($http, $window){
//	SaveTokenToLocalStorage
		var saveToken=function(token){
			$window.localStorage['locator-token']=token;
		};
//	ReadValueFromLocalStorage
		var getToken=function(token){
			return $window.localStorage['locator-token'];
		};
//	RegisterUSer
		var register=function(user){
			return $http.post('/api/register', user).then(function(data){
				saveToken(data.token);
			});
		};
//	LoginUser
		var login=function(user){
			return $http.post('/api/login', user).then(function(data){
				saveToken(data.token);
			});
		};
//	LogoutUser
		var logout=function(){
			$window.localStorage.removeItem('locator-token');
		};
//	CheckIfUserIsLoggedIn
		var isLoggedIn=function(){
		//	GetTokenFromStorage
			var token=getToken();
		if (token) {
			//	GetPayLoadDecodeItParseToJSON
			var payload=JSON.parse($window.atob(token.split('.')[1]));

			// ValidateWhetherExpiryDateISPassed
			return payload.exp>date.now()/1000;
		}
		else{
			return false;
		}
		};
//	GettingUSerInfo
		var currentUser=function(){
			if (isLoggedIn) {
				var token=getToken();
				var payload=JSON.parse($window.atob(token.split('.')[1]));
				return{
					email: payload.email,
					name: payload.name
				};
			}
		};

//	ExposesMethodToApplication
			return{
				saveToken	:	saveToken,
				getToken	:	getToken,
				register	: 	register,
				login 		:	login,
				logout		: 	logout,
				isLoggedin	: 	isLoggedIn,
				currentUser	:	currentUser
			};
		
	}
})();