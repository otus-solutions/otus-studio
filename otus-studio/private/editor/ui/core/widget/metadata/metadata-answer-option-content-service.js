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

        /* Public interface */
        self.loadOption = loadOption;
        self.unloadOption = unloadOption;
        // self.updateOption = updateOption;

        function loadOption(metadataAnswerOptions, scope) {
            var widget = WidgetService.getMetadataAnswerOptionWidget(metadataAnswerOptions);
            scope.metadataAnswerOptions.push(widget);
            scope.lastOptionIndex = scope.metadataAnswerOptions.length - 1;
        }

        function unloadOption(singleSelection, scope) {
            singleSelection.find('[radio-container]').last().remove();
            scope.metadataAnswerOptions.splice(-1);
            scope.lastOptionIndex = scope.metadataAnswerOptions.length - 1;
        }

        // function updateOption(singleSelection, answerOption) {
        //     var target = '[es-target="survey.question.' + answerOption.parentQuestion + '.option.' + answerOption.oid + '"]';
        //     singleSelection.find(target).text(answerOption.label.ptBR.plainText);
        // }
    }

}());