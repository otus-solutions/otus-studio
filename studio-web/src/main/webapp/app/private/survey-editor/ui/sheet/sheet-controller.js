(function() {

    angular
        .module('editor.ui')
        .controller('SheetController', SheetController);

    SheetController.$inject = ['SurveyEditorService', '$compile', '$templateRequest', '$templateCache', '$scope'];

    function SheetController(SurveyEditorService, $compile, $templateRequest, $templateCache, $scope) {
        var self = this;

        /* Public interface */
        self.questionList = questionList;

        function questionList() {
            loadTemplate('shared/survey-components/questions/text/text-question-template.html', function(template) {
                console.log(template);
            });

            return SurveyEditorService.currentQuestionList;
        }

        function loadTemplate(templateUrl, callback) {
            $templateRequest(templateUrl).then(function(html) {
                var compileResult = $compile(html)($scope),
                    template = angular.element(compileResult);

                callback(template);
            });
        }

        function addTextQuestion() {
            SheetController.addTextQuestion();
        }
    }

}());
