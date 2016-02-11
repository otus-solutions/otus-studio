(function() {

    angular
        .module('editor.ui')
        .directive('surveyPage', surveyPage);

    surveyPage.$inject = ['$compile', '$templateRequest', '$templateCache', 'TextQuestionWidgetFactory'];

    function surveyPage() {
        var ddo = {
            controller: SurveyPageController
        };

        return ddo;
    }

    /*
     * Directive's controller implementation
     */
    function SurveyPageController($scope, $compile, $templateRequest, $templateCache, $element, TextQuestionWidgetFactory) {
        const QUESTION_EDITOR_TEMPLATE_URL = 'private/survey-editor/ui/template/question-editor-template.html';

        var self = this;

        /* Public interface */
        self.addQuestion = addQuestion;

        function addQuestion(question) {
            loadTemplate(TextQuestionWidgetFactory.TEMPLATE_URL, function(widgetTemplate) {
                var widget = TextQuestionWidgetFactory.create(question);
                widget.template = widgetTemplate[0].innerHTML;

                loadTemplate(QUESTION_EDITOR_TEMPLATE_URL, function(editorTemplate) {
                    $element.append(editorTemplate);
                }, widget);
            });
        }

        function loadTemplate(templateUrl, callback, data) {
            $templateRequest(templateUrl).then(function(html) {
                if (data) {
                    $scope.question = data;
                    $scope.questionHtml = data.template;
                }

                var compileResult = $compile(html)($scope),
                    template = angular.element(compileResult);

                callback(template);
            });
        }
    }

}());
