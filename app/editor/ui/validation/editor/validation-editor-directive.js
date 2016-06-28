(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusValidationEditor', otusValidationEditor);

    otusValidationEditor.$inject = [
        'UUIDService'
    ];

    function otusValidationEditor(UUIDService){
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/editor/validation-editor.html',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                //TODO
                //validation factory
            }
        };

        return ddo;
    }
}());
