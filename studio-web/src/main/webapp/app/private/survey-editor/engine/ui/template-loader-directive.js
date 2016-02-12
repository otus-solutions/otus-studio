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
                    surveyPageDirectiveController.addQuestion(question);
                };

                scope.internalControl.addText = function addText() {
                    var question = SurveyQuestionEditorService.createTextQuestion();
                    surveyPageDirectiveController.addQuestion(question);
                };
            }
        };

        return ddo;
    }

}());
