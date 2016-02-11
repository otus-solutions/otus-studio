(function() {

    angular
        .module('editor.ui')
        .directive('templateLoader', templateLoader);

    templateLoader.$inject = ['$compile', '$templateRequest', '$templateCache', 'TextQuestionFactory'];

    function templateLoader($compile, $templateRequest, $templateCache, TextQuestionFactory) {
        var ddo = {
            restrict: 'A',
            require: '^surveyPage',
            scope: {
                control: '='
            },
            link: function linkImpl(scope, element, attrs, surveyPageController, transcludeFn) {
                scope.internalControl = scope.control || {};

                scope.internalControl.addText = function addText() {
                    surveyPageController.addQuestion(TextQuestionFactory.create(1));
                };

                scope.internalControl.addCheckbox = function addCheckbox() {
                    surveyPageController.addQuestion('private/studio/edit/survey/question/checkbox-question-template.html');
                };
            }
        };

        return ddo;
    }

}());
