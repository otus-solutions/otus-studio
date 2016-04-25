(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusQuestionEditorController', OtusQuestionEditorController);

    OtusQuestionEditorController.$inject = [
        '$scope',
        '$element',
        'OtusInputTextWidgetFactory',
        'WorkspaceService'
    ];

    function OtusQuestionEditorController($scope, $element, OtusInputTextWidgetFactory, WorkspaceService) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');

        self.component = OtusInputTextWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
