(function() {

    angular
        .module('editor.engine.ui')
        .service('WidgetLoaderService', WidgetLoaderService);

    WidgetLoaderService.$inject = [
        '$compile',
        '$templateRequest',
        '$templateCache',
        'WidgetService'
    ];

    function WidgetLoaderService($compile, $templateRequest, $templateCache, WidgetService) {
        const QUESTION_EDITOR_TEMPLATE_URL = 'private/survey-editor/ui/template/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.loadWidget = loadWidget;

        function loadWidget(model, scope, callback) {
            scope.widgetTemplateList = [];
            var questionWidget = WidgetService.getWidgetForModel(model);
            loadEditorWidget(questionWidget, scope, callback);
        }

        function loadEditorWidget(modelWidget, scope, callback) {
            var widget = WidgetService.getQuestionEditorWidget(modelWidget);
            loadTemplate(QUESTION_EDITOR_TEMPLATE_URL, widget, scope, function(widget) {
                if (callback) callback(widget.template);
            });
        }

        function loadTemplate(templateUrl, data, scope, callback) {
            $templateRequest(templateUrl).then(function(html) {
                scope.widget = data;
                scope.widget.template = compileTemplate(html, scope);
                scope.widgetTemplateList[data.questionId] = data.questionTemplate;
                if (callback) callback(scope.widget);
            });
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }
    }

}());
