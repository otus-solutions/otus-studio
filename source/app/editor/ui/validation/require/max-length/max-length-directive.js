(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMaxLengthValidator', otusMaxLengthValidator);

    otusMaxLengthValidator.$inject = [
        'MaxLengthValidatorWidgetFactory'
    ];

    function otusMaxLengthValidator(MaxLengthValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/max-length/max-length-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MaxLengthValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());
