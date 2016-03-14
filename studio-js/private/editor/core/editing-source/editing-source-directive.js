(function() {
    'use strict';

    angular
        .module('editor.core')
        .directive('editingSource', directiveDefinition);

    function directiveDefinition() {
        var ddo = {
            controller: 'EditingSourceController',
            link: linkImpl
        };

        return ddo;
    }

    function linkImpl(scope, element, attr, controller) {
        controller.catchEditingSourceComponent();
        controller.attachTriggers();
    }

}());
