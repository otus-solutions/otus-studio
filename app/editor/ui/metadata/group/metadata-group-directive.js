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
            link: function(scope, element) {
                scope.widget = MetadataGroupWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
