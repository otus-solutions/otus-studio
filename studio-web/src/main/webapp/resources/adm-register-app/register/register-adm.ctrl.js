angular.module('RegisterAdm', ['ngMaterial', 'ui.mask']).controller('SystemConfigCtrl', function($scope, $http, $window, $mdDialog) {

    $scope.systemConf = {};
    $scope.systemConf.user = {};
    $scope.systemConf.emailSender = {};

    function confirmAlertToNavigate() {
        alert = $mdDialog.alert()
            .title('Informação')
            .content('Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.')
            .ok('ok');

        $mdDialog
            .show(alert)
            .finally(function() {
                $window.location.href = window.location.origin + '/studio/'
            });
    }

    $scope.register = function(systemConf) {
    	$http.post(window.location.origin + '/studio/session/rest/system/config', systemConf).then(function(response) {
    		confirmAlertToNavigate();
      },
      function(response){
    	  alert("Erro: Entre em contato com a equipe de desenvolvimento.");
      });
    }
    		
//        $http.post(window.location.origin + '/studio/session/rest/register/adm', systemConf.user).then(function(response) {
//                //confirmAlertToNavigate();
//            },
//            function(response) {
//                console.log(systemConf.user)
//                console.log("Error!!!")
//            });
//
//        $http.post(window.location.origin + '/studio/session/rest/register/email', systemConf.emailSender).then(function(response) {
//                confirmAlertToNavigate();
//            },
//            function(response) {
//                console.log(systemConf.emailSender)
//                console.log("Error!!!")
//            });

//    }

    $scope.matchPassword = function() {
        if ($scope.systemConf.user.password && $scope.systemConf.user.passwordConfirm) {
            if ($scope.systemConf.user.password != $scope.systemConf.user.passwordConfirm) {
                $scope.initialConfigSystemForm.password.$setValidity('password', false);
                $scope.initialConfigSystemForm.$setValidity('password', false);
            } else {
                $scope.initialConfigSystemForm.password.$setValidity('password', true);
                $scope.initialConfigSystemForm.$setValidity('password', true);
            }
        }
    }

    $scope.matchPasswordEmailSender = function() {
        if ($scope.systemConf.emailSender.password && $scope.systemConf.emailSender.passwordConfirm) {
            if ($scope.systemConf.emailSender.password != $scope.systemConf.emailSender.passwordConfirm) {
                $scope.initialConfigSystemForm.emailSenderPassword.$setValidity('emailSenderPassword', false);
                $scope.initialConfigSystemForm.$setValidity('emailSenderPassword', false);
            } else {
                $scope.initialConfigSystemForm.emailSenderPassword.$setValidity('emailSenderPassword', true);
                $scope.initialConfigSystemForm.$setValidity('emailSenderPassword', true);
            }
        }
    }


});
