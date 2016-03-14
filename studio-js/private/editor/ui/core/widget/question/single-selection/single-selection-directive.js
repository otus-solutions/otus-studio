(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('singleSelectionQuestion', singleSelectionQuestion);

    singleSelectionQuestion.$inject = [
        'editor.ui.mpath'
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
