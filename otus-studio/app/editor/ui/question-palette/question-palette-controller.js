(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusQuestionPaletteController', OtusQuestionPaletteController);

    OtusQuestionPaletteController.$inject = [
        '$scope',
        '$element',
        'WorkspaceService'
    ];

    function OtusQuestionPaletteController($scope, $element, WorkspaceService) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');
    }

})();
