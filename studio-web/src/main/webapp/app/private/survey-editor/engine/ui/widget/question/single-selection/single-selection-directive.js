(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .directive('singleSelectionQuestion', singleSelectionQuestion);

    singleSelectionQuestion.$inject = [
        'editor.engine.ui.mpath'
    ];

    function singleSelectionQuestion(mpath) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'SingleSelectionController',
            templateUrl: mpath.getWidgetPath('single-selection'),
            link: function(scope, element, attrs, controller) {
                scope.widget = scope.$parent.$parent.widget;
            }
        };

        return ddo;
    }

}());
