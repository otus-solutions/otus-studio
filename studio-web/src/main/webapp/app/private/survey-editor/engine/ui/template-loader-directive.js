(function() {

    angular
        .module('editor.engine.ui')
        .directive('templateLoader', templateLoader);

    templateLoader.$inject = ['$compile', '$templateRequest', '$templateCache', 'SurveyQuestionEditorService'];

    function templateLoader($compile, $templateRequest, $templateCache, SurveyQuestionEditorService) {
        var ddo = {
            restrict: 'A',
            require: '^surveyPage',
            scope: {
                control: '='
            },
            link: function linkImpl(scope, element, attrs, surveyPageDirectiveController, transcludeFn) {
                scope.internalControl = scope.control || {};

                scope.internalControl.addCalendar = function addCalendar() {
                    var question = SurveyQuestionEditorService.createCalendarQuestion();
                    addQuestion(question);
                };

                scope.internalControl.addNumeric = function addNumeric() {
                    var question = SurveyQuestionEditorService.createNumericQuestion();
                    addQuestion(question);
                };

                scope.internalControl.addSingleSelection = function addSingleSelection() {
                    var question = SurveyQuestionEditorService.createSingleSelectionQuestion();
                    addQuestion(question);
                };

                scope.internalControl.addText = function addText() {
                    var question = SurveyQuestionEditorService.createTextQuestion();
                    addQuestion(question);
                };

                scope.internalControl.addTime = function addTime() {
                    var question = SurveyQuestionEditorService.createTimeQuestion();
                    addQuestion(question);
                };

                function addQuestion(question) {
                    surveyPageDirectiveController.addQuestion(question);
                }
            }
        };

        return ddo;
    }

}());
