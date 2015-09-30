function AppCtrl($scope, $log) {
  $scope.user = {
      name: '',
      email: '',
      phone: '',
      surname : '',
      password: '',
      passwordConfirm : '',
      clientEmail: ''
  };

  /**
   * REST URL: /register/adm
   */
  $scope.register = function () {
    console.log($scope.user);
  }
};

angular.module('RegisterAdm', ['ngMaterial']).controller('RegisterAdmCtrl', AppCtrl);