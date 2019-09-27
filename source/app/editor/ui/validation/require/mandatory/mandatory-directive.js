(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMandatoryValidator', otusMandatoryValidator);

    otusMandatoryValidator.$inject = [
        'MandatoryValidatorWidgetFactory'
    ];

    function otusMandatoryValidator(MandatoryValidatorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/require/mandatory/mandatory-validator.html',
            link: function linkFunc(scope, element) {
                scope.widget = MandatoryValidatorWidgetFactory.create(scope, element);
            }

        };

        return ddo;
    }

}());
