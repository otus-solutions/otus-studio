angular.module('RegisterAdm', ['ngMaterial']).controller('DemoCtrl', AppCtrl);
  function AppCtrl ($scope, $log) {

      $scope.user = {
          name: '',
          email: '',
          phone: '',
          sobrenome : '',
          password: '',
          passwordConfirm : '',
          clientEmail: ''
      };
  };