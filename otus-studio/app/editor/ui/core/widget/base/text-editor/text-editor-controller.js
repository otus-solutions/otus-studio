(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusTextEditorController', OtusTextEditorController);

    OtusTextEditorController.$inject = [
        '$scope',
        '$element',
        'OtusTextEditorWidgetFactory'
    ];

    function OtusTextEditorController($scope, $element, OtusTextEditorWidgetFactory) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');

        self.component = OtusTextEditorWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
