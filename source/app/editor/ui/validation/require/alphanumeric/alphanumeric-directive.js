(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusAlphanumericValidator', otusAlphanumericValidator);

    otusAlphanumericValidator.$inject = [
        'AlphanumericValidatorWidgetFactory'
    ];

    function otusAlphanumericValidator(AlphanumericValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/alphanumeric/alphanumeric-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = AlphanumericValidatorWidgetFactory.create(scope, element);
            }
        };

        return ddo;

    }

}());
