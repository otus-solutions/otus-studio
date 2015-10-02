angular.module('RegisterAdm', ['ngMaterial', 'ui.mask']).controller('RegisterAdmCtrl', function($scope, $http, $window) {
 
	/**
   * REST URL: /register/adm
   */
  $scope.register = function (user) {
    $http.post('http://localhost:8080/studio/session/rest/register/adm', user).then(function(response){
    	console.log(user.name)
        console.log("Sucess!!!")
        $window.location.href = 'http://localhost:8080/studio/'
    },
    function(response){
    	console.log(user)
        console.log("Error!!!")
    });
  }
});
