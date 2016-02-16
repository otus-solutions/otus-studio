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

        function update(question) {
            addQuestion(question);
        }

        function addQuestion(question) {
            WidgetLoaderService.loadWidget(question, $scope, appendToPage);
        }

        function appendToPage(widget) {
            $element.append(widget);
        }
    }

}());
