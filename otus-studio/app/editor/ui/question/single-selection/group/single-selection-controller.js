(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SingleSelectionController', SingleSelectionController);

    SingleSelectionController.$inject = [
        '$scope',
        '$element',
        'SingleSelectionContentService'
    ];

    function SingleSelectionController($scope, $element, SingleSelectionContentService) {
        var self = this;

        $scope.answerOptions = [];
        SingleSelectionContentService.init($scope, $element);
    }

}());
