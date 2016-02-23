(function() {
    'use strict';

    angular
        .module('editor.engine.ui')
        .service('AnswerOptionContentService', AnswerOptionContentService);

    AnswerOptionContentService.$inject = [
        'WidgetService'
    ];

    function AnswerOptionContentService(WidgetService) {
        var self = this;

        /* Public interface */
        self.loadOption = loadOption;
        self.unloadOption = unloadOption;

        function loadOption(model, scope) {
            var widget = WidgetService.getQuestionAnswerOptionWidget(model);
            scope.answerOptions.push(widget);
            scope.lastOptionIndex = scope.answerOptions.length - 1;
        }

        function unloadOption(singleSelection, scope) {
            singleSelection.find('[radio-container]').last().remove();
            scope.answerOptions.splice(-1);
            scope.lastOptionIndex = scope.answerOptions.length - 1;
        }
    }

}());
