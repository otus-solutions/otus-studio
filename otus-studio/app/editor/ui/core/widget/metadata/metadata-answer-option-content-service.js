(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('MetadataAnswerOptionContentService', MetadataAnswerOptionContentService);

    MetadataAnswerOptionContentService.$inject = [
        'WidgetService'
    ];

    function MetadataAnswerOptionContentService(WidgetService) {
        var self = this;
        var scope;
        var metadataGroup;

        /* Public interface */
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
            scope.lastOptionIndex = scope.metadataAnswerOptions.length - 1;
        }

        function unloadOption(metadataQuestion, scope) {
            metadataQuestion.find('[radio-container]').last().remove();
            scope.metadataAnswerOptions.splice(-1);
            scope.lastOptionIndex = scope.metadataAnswerOptions.length - 1;
        }
    }

}());
