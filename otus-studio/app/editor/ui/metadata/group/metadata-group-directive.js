(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusMetadataGroup', otusMetadataGroup);

    otusMetadataGroup.$inject = [
        'MetadataGroupWidgetFactory'
    ];

    function otusMetadataGroup(MetadataGroupWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'MetadataGroupController',
            templateUrl: 'app/editor/ui/metadata/group/metadata-group.html',
            link: function(scope, element, attrs, controller) {
                scope.widget = MetadataGroupWidgetFactory.create(scope.$parent.$parent.widget.question);
            }
        };

        return ddo;
    }

}());
