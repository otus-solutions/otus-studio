(function() {

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'SurveyPageContentService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService'
    ];

    function SurveyPageController($scope, $element, SurveyPageContentService, SurveyQuestionsUpdateService, LabelUpdateService) {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            // TODO: transformar essa implementação de observer para o 'modo angular' de tratar eventos
            SurveyQuestionsUpdateService.registerObserver(self);
            LabelUpdateService.registerObserver(self);
            SurveyPageContentService.init($scope, $element);
        }

        function update(data, updateType) {
            if (updateType == 'ADD_DATA')
                addQuestion(data);
            else if (updateType == 'REMOVE_DATA')
                removeQuestion(data);
            else if (updateType == 'SET_DATA')
                updateQuestion(data);
        }

        function addQuestion(question) {
            SurveyPageContentService.loadQuestion(question);
        }

        function removeQuestion(question) {
            SurveyPageContentService.unloadQuestion(question);
        }

        function updateQuestion(question) {
            var targetExpression = '[es-id="survey-editor-question-' + question.oid + '-label"]';
            var targetLabel = UIUtils.jq(surveyPage.find(targetExpression)[0]);
            targetLabel.text(question.label.ptBR.plainText);
        }
    }

}());
