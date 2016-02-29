angular
    .module('passwordControl', [])
    .directive('stPassword', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

                scope.$watch(function () {
                    return ngModel.$modelValue;

                }, function (value) {
                    if (regex.test(value) && value.length >= 6 && value.length <= 32) {
                        ngModel.$setValidity('passwordPattern', true);
                    } else {
                        ngModel.$setValidity('passwordPattern', false);
                    }
                });
            }
        };
    })
    .directive('stPasswordMatch', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
              stPasswordMatch:'='
            },
            link: function (scope, element, attrs, ngModel) {

                scope.$watch(function () {
                    return scope.stPasswordMatch;

                }, function (value) {
                    compare(value, ngModel.$modelValue);
                });

                scope.$watch(function () {
                    return ngModel.$modelValue;

                }, function (value) {
                    compare(scope.stPasswordMatch, value);
                });


                function compare(password, passToCompare){
                    if(password != passToCompare){
                        ngModel.$setValidity('passwordMatch', false);
                    }else{
                        ngModel.$setValidity('passwordMatch', true);
                    }
                }
            }
        };
    });
