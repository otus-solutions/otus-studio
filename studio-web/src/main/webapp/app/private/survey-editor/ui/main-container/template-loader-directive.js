(function() {

    angular
        .module('editor.ui')
        .directive('templateLoader', templateLoader);

    templateLoader.$inject = ['$compile', '$templateRequest', '$templateCache'];

    function templateLoader($compile, $templateRequest, $templateCache) {
        var ddo = {
            restrict: 'A',
            require: '^surveyPage',
            scope: {
                control: '='
            },
            link: linkImpl
        };

        return ddo;
    }

    /*
     * Link function implementation
     */
    function linkImpl(scope, element, attrs, surveyPageController, $compile) {
        scope.internalControl = scope.control || {};

        scope.internalControl.addText = function addText() {
            surveyPageController.addQuestion('private/survey-editor/ui/template/question-editor-template.html');
        };

        scope.internalControl.addCheckbox = function addCheckbox() {
            surveyPageController.addQuestion('private/studio/edit/survey/question/checkbox-question-template.html');
        };
    }

}());
