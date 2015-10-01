angular.module('RegisterAdm', ['ngMaterial', 'ui.mask']).controller('RegisterAdmCtrl', function($scope, $http) {
  $scope.user = {
      name: '',
      email: '',
      phone: '',
      surname: '',
      password: '',
      passwordConfirm : ''
  };


  /**
   * REST URL: /register/adm
   */
  $scope.register = function () {
    $http.post('session/rest/register/adm', $scope.user).then(function(response){
        console.log("Sucess!!!")
    },
    function(response){
        console.log("Error!!!")
    });
  }
});
