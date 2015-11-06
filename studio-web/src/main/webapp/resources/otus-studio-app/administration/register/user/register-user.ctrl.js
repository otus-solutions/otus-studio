(function() {

    angular
        .module('StudioApp', ['ngMessages', 'ngMaterial', 'ui.mask'])
        .controller(
            'RegisterUserCtrl', ['$scope', '$http', '$mdDialog',
                function($scope, $http, $mdDialog) {

                    var self = this;

                    const $HTTP_POST_URL_CREATE = window.location.origin + '/studio/session/rest/register/user';

                    /* Public interface */
                    self.register = register;
                    self.matchPassword = matchPassword;

                    /* Public implementations */
                    function matchPassword() {
                        if ($scope.user.password && $scope.user.passwordConfirm) {
                            if ($scope.user.password != $scope.user.passwordConfirm) {
                                $scope.registerUserForm.password.$setValidity('password', false);
                                $scope.registerUserForm.$setValidity('password', false);
                            } else {
                                $scope.registerUserForm.password.$setValidity('password', true);
                                $scope.registerUserForm.$setValidity('password', true);
                            }
                        }
                    }

                    function register(user) {
                        console.log(self);
                        $http.post($HTTP_POST_URL_CREATE, user).then(function(response) {
                            confirmAlertRegister();
                        });
                    }

                    /* Private implementations */
                    function confirmAlertRegister() {
                        alert = $mdDialog.alert().title('Informação').content('Sua liberação esta pendente de aprovação').ok('ok');
                    }
                }
            ]);

    angular
        .module('StudioApp')
        .directive(
            'unique', ['$http', '$q',
                function($http, $q) {

                    const $HTTP_POST_URL_VALIDATE = window.location.origin + '/studio/session/rest/register/user/email/exists';

                    return {
                        restrict: 'A',
                        require: 'ngModel',
                        link: function(scope, element, attrs, ctrl) {
                            ctrl.$asyncValidators.emailInUse = function(modelValue, viewValue) {
                                var deferred = $q.defer();

                                $http.get($HTTP_POST_URL_VALIDATE, {
                                    params: {
                                        email: modelValue
                                    }
                                }).then(
                                    function(response) {
                                        var emailExists = (response.data.data === 'true');
                                        if (emailExists) {
                                            deferred.reject();
                                        } else {
                                            deferred.resolve();
                                        }
                                    },
                                    function(error) {
                                        console.log('erro');
                                    });

                                return deferred.promise;
                            };
                        }
                    };
                }
            ]);
})();
