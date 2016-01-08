(function() {

    angular
        .module('StudioApp', ['ngMessages', 'ngMaterial', 'ui.mask', 'passwordControl'])
        .controller(
            'RegisterUserCtrl', ['$scope', '$http', '$mdDialog', '$window',
                function($scope, $http, $mdDialog, $window) {

                    var self = this;

                    const $HTTP_POST_URL_CREATE = window.location.origin + '/studio/session/rest/register/user';

                    /* Public interface */
                    self.register = register;

                    function register(user) {
                        $http.post($HTTP_POST_URL_CREATE, user).then(function(response) {
                            confirmAlertRegister();
                        });
                    }

                    /* Private implementations */
                    function confirmAlertRegister() {
                        alert = $mdDialog.alert().title('Informação').content('Sua liberação está pendente de aprovação.').ok('ok');
                        $mdDialog
                            .show(alert)
                            .finally(function() {
                                $window.location.href = window.location.origin + '/studio/'
                            });
                    }
                }
            ]).config(['$mdThemingProvider', function($mdThemingProvider){

            	$mdThemingProvider.theme('layoutTheme')
            		.primaryPalette('blue', {
            		'default' : 'A200',
            		'hue-1' : '200'
            	}).accentPalette('blue-grey', {
            		'default' : '900'
            	}).warnPalette('red');


            	$mdThemingProvider.theme('layoutTheme');
            }]);

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
                                        if (response.data.data) {
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
