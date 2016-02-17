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
            var nextOID = Object.keys(survey.question).length,
                newQuestion = QuestionFactory.create(questionType, nextOID);

            survey.question[newQuestion.oid] = newQuestion;
            return newQuestion;
        }

        function removeQuestion(oid, survey) {
            var questionToRemove = survey.questions.filter(function(entry) {
                return entry.oid == oid;
            });

            var indexToRemove = survey.questions.indexOf(questionToRemove[0]);
            survey.question.splice(indexToRemove, 1);
            return questionToRemove;
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
