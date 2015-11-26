angular
    .module('Home')
    .controller('HomeCtrl', ['$http', '$scope',
        function($http, $scope) {
    	const $HTTP_GET_URL_LOGGED_USER = window.location.origin + '/studio/session/rest/register/loggedUser';

    	$scope.loggedUser = {};
    	
    	 $http.get($HTTP_GET_URL_LOGGED_USER).then(function(response) {
             $scope.loggedUser = response.data.data;
         });

    	$scope.isAdmin = function (loggedUser){
    		return loggedUser.admin;
    	};
    	
    	$scope.isNotAdmin = function (loggedUser){
    		return !(loggedUser.admin);
    	};    	
    	
}]);
