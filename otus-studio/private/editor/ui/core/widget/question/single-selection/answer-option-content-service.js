(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('AnswerOptionContentService', AnswerOptionContentService);

    AnswerOptionContentService.$inject = [
        'WidgetService'
    ];

    function AnswerOptionContentService(WidgetService) {
        var self = this;

        /* Public interface */
        self.loadOption = loadOption;
        self.unloadOption = unloadOption;
        // self.updateOption = updateOption;

        function loadOption(answerOption, scope) {
            var widget = WidgetService.getQuestionAnswerOptionWidget(answerOption);
            scope.answerOptions.push(widget);
            scope.lastOptionIndex = scope.answerOptions.length - 1;
        }

        function unloadOption(singleSelection, scope) {
            singleSelection.find('[radio-container]').last().remove();
            scope.answerOptions.splice(-1);
            scope.lastOptionIndex = scope.answerOptions.length - 1;
        }

        // function updateOption(singleSelection, answerOption) {
        //     var target = '[es-target="survey.question.' + answerOption.parentQuestion + '.option.' + answerOption.oid + '"]';
        //     singleSelection.find(target).text(answerOption.label.ptBR.plainText);
        // }
    }

}());
