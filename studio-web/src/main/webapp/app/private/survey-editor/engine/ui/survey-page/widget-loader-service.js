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
            var modelWidget = WidgetService.getWidgetForModel(model);
            loadEditorWidget(modelWidget, scope, callback);
        }

        function loadEditorWidget(modelWidget, scope, callback) {
            loadTemplate(QUESTION_EDITOR_TEMPLATE_URL, modelWidget, scope, function(template) {
                if (callback) callback(template);
            });
        }

        function loadTemplate(templateUrl, data, scope, callback) {
            $templateRequest(templateUrl).then(function(html) {
                scope.questionOID = data.oid;
                scope.questionWidget = data;
                scope.widgetTemplateList[scope.questionOID] = data.template;
                var template = compileTemplate(html, scope);
                if (callback) callback(template);
            });
        }

        function compileTemplate(html, scope) {
            return $compile(html)(scope);
        }
    }

}());
