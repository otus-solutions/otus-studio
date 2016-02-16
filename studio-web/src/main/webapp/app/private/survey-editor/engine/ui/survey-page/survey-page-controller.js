(function() {

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'WidgetLoaderService',
        'SurveyQuestionsUpdateService'
    ];

    function SurveyPageController($scope, $element, WidgetLoaderService, SurveyQuestionsUpdateService) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            // TODO: transformar essa implementação de observer para o 'modo angular' de tratar eventos
            SurveyQuestionsUpdateService.registerObserver(self);
        }

        function update(question, updateType) {
            if (updateType == 'ADD_DATA')
                addQuestion(question);
            else
                removeQuestion();
        }

        function addQuestion(question) {
            WidgetLoaderService.loadWidget(question, $scope, appendToPage);
        }

        function removeQuestion(questionIndex) {
            angular.element($element.children()[0]).remove();
        }

        function appendToPage(widget) {
            $element.append(widget);
        }
    }

}());
