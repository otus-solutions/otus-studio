(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('singleSelectionQuestion', singleSelectionQuestion);

    singleSelectionQuestion.$inject = [
        'SingleSelectionQuestionWidgetFactory'
    ];

    function singleSelectionQuestion(SingleSelectionQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'SingleSelectionController',
            templateUrl: 'app/editor/ui/core/widget/question/single-selection/group/single-selection.html',
            link: function(scope, element, attrs, controller) {
                // scope.widget = SingleSelectionQuestionWidgetFactory.create(scope.$parent.question);
            }
        };

        return ddo;
    }

}());
