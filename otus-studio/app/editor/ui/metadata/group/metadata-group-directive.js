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
            templateUrl: 'app/editor/ui/metadata/group/metadata-group.html',
            link: function(scope, element, attrs, controller) {
                console.log(scope);
                scope.widget = MetadataGroupWidgetFactory.create(scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
