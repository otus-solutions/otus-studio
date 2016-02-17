(function() {

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$compile',
        '$element',
        '$templateRequest',
        '$templateCache',
        'WidgetService',
        'SurveyQuestionsUpdateService'
    ];

    function SurveyPageController($scope, $compile, $element, $templateRequest, $templateCache, WidgetService, SurveyQuestionsUpdateService) {
        const QUESTION_EDITOR_TEMPLATE_URL = 'private/survey-editor/ui/template/question-editor-template.html';
        $scope.widgetTemplateList = [];

        var self = this;

        /* Public interface */
        self.addQuestion = addQuestion;
        self.update = update;

        SurveyQuestionsUpdateService.registerObserver(self);

        function update(question) {
            addQuestion(question);
        }

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
                $scope.questionIndex = scopeData.questionIndex;
                $scope.questionWidget = scopeData;
                $scope.widgetTemplateList[$scope.questionIndex] = scopeData.template;
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
