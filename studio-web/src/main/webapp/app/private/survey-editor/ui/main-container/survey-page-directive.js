(function() {

    angular
        .module('editor.ui')
        .directive('surveyPage', surveyPage);

    surveyPage.$inject = ['$compile', '$templateRequest', '$templateCache', 'TextQuestionWidgetFactory', 'SurveyComponentsService'];

    function surveyPage() {
        var ddo = {
            controller: SurveyPageController
        };

        return ddo;
    }

    /*
     * Directive's controller implementation
     */
    function SurveyPageController($scope, $compile, $templateRequest, $templateCache, $element, TextQuestionWidgetFactory, SurveyComponentsService) {
        const QUESTION_EDITOR_TEMPLATE_URL = 'private/survey-editor/ui/template/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.addQuestion = addQuestion;

        function addQuestion(question) {
            requestQuestionWidget(question, function(questionWidget) {
                requestEditorWidget(questionWidget);
            });
        }

        function requestQuestionWidget(question, callback) {
            loadTemplate(TextQuestionWidgetFactory.TEMPLATE_URL, function(widgetTemplate) {
                var widget = TextQuestionWidgetFactory.create(question);
                widget.template = widgetTemplate;
                callback(widget);
            });
        }

        function requestEditorWidget(questionWidget) {
            loadTemplate(QUESTION_EDITOR_TEMPLATE_URL, function(editorWidget) {
                $element.append(editorWidget);
            }, questionWidget);
        }

        function loadTemplate(templateUrl, callback, scopeData) {
            $templateRequest(templateUrl).then(function(html) {
                if (scopeData) {
                    $scope.question = scopeData;
                    if (scopeData.template) {
                        $scope.questionIndex = scopeData.model.oid;
                        $scope.questionHtml = '<text-question></text-question>';
                    }
                }

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
