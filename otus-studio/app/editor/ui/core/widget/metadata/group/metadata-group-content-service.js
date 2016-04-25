(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('MetadataGroupContentService', MetadataGroupContentService);

    MetadataGroupContentService.$inject = [
        'WidgetService'
    ];

    function MetadataGroupContentService(WidgetService) {
        var self = this;
        var scope;
        var metadataGroup;

        self.init = init;
        self.loadOption = loadOption;
        self.unloadOption = unloadOption;

        function init(scopeReference, metadataGroupReference) {
            scope = scopeReference;
            metadataGroup = metadataGroupReference;
        }

        function loadOption(option) {
            var widget = WidgetService.getMetadataAnswerOptionWidget(option);
            scope.metadataAnswerOptions.push(widget);
        }

        function unloadOption() {
            scope.metadataAnswerOptions.splice(-1);
        }
    }

}());
