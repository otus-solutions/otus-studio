(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('SingleSelectionContentService', SingleSelectionContentService);

    SingleSelectionContentService.$inject = [
        'WidgetService'
    ];

    function SingleSelectionContentService(WidgetService) {
        var self = this;
        var scope;
        var question;

        self.init = init;
        self.loadOption = loadOption;
        self.unloadOption = unloadOption;

        function init(scopeReference, questionReference) {
            scope = scopeReference;
            question = questionReference;
        }

        function loadOption(option) {
            var widget = WidgetService.getQuestionAnswerOptionWidget(option);
            scope.answerOptions.push(widget);
        }

        function unloadOption() {
            scope.answerOptions.splice(-1);
        }
    }

}());
