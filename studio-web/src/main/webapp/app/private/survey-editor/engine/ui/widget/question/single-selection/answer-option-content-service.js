(function() {

    angular
        .module('editor.engine.ui')
        .service('AnswerOptionContentService', AnswerOptionContentService);

    AnswerOptionContentService.$inject = [
        'WidgetService'
    ];

    function AnswerOptionContentService(WidgetService) {
        var self = this;

        /* Public interface */
        self.loadOptionWidget = loadOptionWidget;

        function loadOptionWidget(model, scope) {
            return WidgetService.getQuestionAnswerOptionWidget(model);
        }
    }

}());
