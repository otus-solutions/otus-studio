(function() {

    angular
        .module('editor.engine.ui')
        .service('AnswerOptionContentService', AnswerOptionContentService);

    AnswerOptionContentService.$inject = [
        'editor.engine.ui.mpath',
        '$compile',
        '$templateRequest',
        '$templateCache',
        'WidgetService'
    ];

    function AnswerOptionContentService(mpath, $compile, $templateRequest, $templateCache, WidgetService) {
        var self = this;

        /* Public interface */
        self.loadOptionWidget = loadOptionWidget;

        function loadOptionWidget(model, scope, callback) {
            var widget = WidgetService.getQuestionAnswerOptionWidget(model);
            if (callback) callback(widget);
        }
    }

}());
