(function() {

    angular
        .module('editor.engine.ui')
        .directive('surveyPage', surveyPage);

    surveyPage.$inject = ['$compile', '$templateRequest', '$templateCache', 'WidgetService'];

    function surveyPage() {
        var ddo = {
            controller: SurveyPageController
        };

        return ddo;
    }

    /*
     * Directive's controller implementation
     */
    function SurveyPageController($scope, $compile, $templateRequest, $templateCache, $element, WidgetService) {
        const QUESTION_EDITOR_TEMPLATE_URL = 'private/survey-editor/ui/template/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.addQuestion = addQuestion;

        function addQuestion(question) {
            var widget = WidgetService.getWidgetForModel(question);
            requestEditorWidget(widget);
        }

        function requestEditorWidget(questionWidget) {
            loadTemplate(QUESTION_EDITOR_TEMPLATE_URL, questionWidget, appendEditorWidget);
        }

        function appendEditorWidget(editorWidget) {
            $element.append(editorWidget);
        }

        function loadTemplate(templateUrl, scopeData, callback) {
            $templateRequest(templateUrl).then(function(html) {
                $scope.questionWidget = scopeData;
                var template = compileTemplate(html);
                if (callback) callback(template);
            });
        }

        function compileTemplate(html) {
            return $compile(html)($scope);
        }

        function element(data) {
            return angular.element(data);
        }
    }

}());
