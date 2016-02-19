(function() {

    angular
        .module('editor.engine.ui')
        .controller('SurveyPageController', SurveyPageController);

    SurveyPageController.$inject = [
        '$scope',
        '$element',
        'WidgetLoaderService',
        'SurveyQuestionsUpdateService',
        'LabelUpdateService',
        'UIUtils'
    ];

    function SurveyPageController($scope, $element, WidgetLoaderService, SurveyQuestionsUpdateService,
        LabelUpdateService, UIUtils) {

        var self = this,
            surveyPage = null;

        /* Public interface */
        self.update = update;

        /* Initialization */
        init();

        function init() {
            // TODO: transformar essa implementação de observer para o 'modo angular' de tratar eventos
            SurveyQuestionsUpdateService.registerObserver(self);
            LabelUpdateService.registerObserver(self);
            surveyPage = UIUtils.jq($element);
        }

        function update(data, updateType) {
            if (updateType == 'ADD_DATA')
                addQuestion(data);
            else if (updateType == 'REMOVE_DATA')
                removeQuestion(data);
            else if (updateType == 'SET_VALUE')
                updateQuestion(data);
        }

        function addQuestion(question) {
            WidgetLoaderService.loadWidget(question, $scope, appendToPage);
        }

        function removeQuestion(question) {
            UIUtils.jq($element).find('[question-target="' + question.oid + '"]').remove();
        }

        function updateQuestion(question) {
            var targetExpression = '[es-id="survey-editor-question-' + question.oid + '-label"]';
            var targetLabel = UIUtils.jq(surveyPage.find(targetExpression)[0]);
            targetLabel.text(question.label.ptBR.plainText);
        }

        function appendToPage(widget) {
            $element.append(widget);
        }
    }

}());
