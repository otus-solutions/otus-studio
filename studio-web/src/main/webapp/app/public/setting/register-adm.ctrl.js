angular.module('RegisterModule', ['ngMaterial', 'ui.mask', 'ngMessages'])
.controller('SystemConfigCtrl', function ($q, $scope, $http, $window, $mdDialog) {

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
            .finally(function () {
                $window.location.href = window.location.origin + '/studio/'
            });
    }

    $scope.register = function (systemConf) {
        $scope.isLoading = true;
        $scope.validateEmailService(systemConf).then(function () {
            $http.post(window.location.origin + '/studio/session/rest/system/config', systemConf).then(function (response) {
                    $scope.isLoading = false;
                    confirmAlertToNavigate();
                },
                function () {
                    $scope.isLoading = false;
                });
        }, function () {
            $scope.isLoading = false;
        });
    }

    $scope.validateEmailService = function (systemConf) {
        var deferred = $q.defer();

        if (systemConf.emailSender.email && systemConf.emailSender.password && systemConf.emailSender.passwordConfirm) {

            $http.post(window.location.origin + '/studio/session/rest/system/validation/emailService', systemConf).then(function (response) {
                if (response.data.data) {
                    $scope.resetValidationEmail();
                    deferred.resolve(true);

                } else {
                    $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', false);
                    $scope.initialConfigSystemForm.$setValidity('emailService', false);
                    deferred.reject(false);
                }
            });

            return deferred.promise;
        }
    }

    $scope.resetValidationEmail = function () {
        $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', true);
        $scope.initialConfigSystemForm.$setValidity('emailService', true);
    }


    $scope.matchPassword = function () {
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

    $scope.matchPasswordEmailSender = function () {
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
    
   
}).config(['$mdThemingProvider', function($mdThemingProvider){
	
	$mdThemingProvider.theme('layoutTheme')
		.primaryPalette('blue', {
		'default' : '500',
		'hue-1' : '200'
	}).accentPalette('blue-grey', {
		'default' : '900'
	}).warnPalette('red');

	
	$mdThemingProvider.theme('layoutTheme');
}]);

