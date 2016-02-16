(function() {

    angular
        .module('spec')
        .service('SurveyQuestionsUpdateService', SurveyQuestionsUpdateService);

    SurveyQuestionsUpdateService.$inject = ['QuestionFactory'];

    function SurveyQuestionsUpdateService(QuestionFactory) {
        var self = this,
            observers = [];

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(editingEvent, survey) {
            var question = null;

            if (editingEvent.type == 'ADD_DATA') {
                question = addQuestion(editingEvent.source.model, survey);
            } else {
                question = extractModelIndex(editingEvent.target);
                removeQuestion(question, survey);
            }
            notifyObservers(question, editingEvent.type);
        }

        function addQuestion(questionType, survey) {
            var nextOID = survey.questions.length,
                newQuestion = QuestionFactory.create(questionType, nextOID);

            survey.questions.push(newQuestion);
            return newQuestion;
        }

        function removeQuestion(questionIndex, survey) {
            var removedQuestion = survey.questions[questionIndex];
            survey.questions.splice(questionIndex, 1);
            return removedQuestion;
        }

        function notifyObservers(question, updateType) {
            observers.forEach(function(observer) {
                observer.update(question, updateType);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }

        function extractModelIndex(modelName) {
            var index = modelName.replace(/(.*\[)/, '');
            index = index.replace(/(\])/, '');
            return parseInt(index);
        }
    }

}());
