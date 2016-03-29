(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('metadataQuestion', metadataQuestion);

    metadataQuestion.$inject = [
        'editor.ui.mpath'
    ];

    function metadataQuestion(mpath) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'MetadataController',
            templateUrl: mpath.getWidgetPath('metadata'),
            link: function(scope, element, attrs, controller) {
                scope.widget = scope.$parent.$parent.widget;
            }
        };

        return ddo;
    }

}());
