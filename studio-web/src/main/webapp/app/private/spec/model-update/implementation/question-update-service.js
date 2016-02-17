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
                question = removeQuestion(editingEvent.target, survey);
            }
            notifyObservers(question, editingEvent.type);
        }

        function addQuestion(questionType, survey) {
            var nextOID = survey.identity.acronym + Object.keys(survey.question).length,
                newQuestion = QuestionFactory.create(questionType, nextOID);

            survey.question[newQuestion.oid] = newQuestion;
            return newQuestion;
        }

        function removeQuestion(target, survey) {
            var selectedQuestion = target.split('.')[2];
                questionToRemove =survey.question[selectedQuestion];

            delete survey.question[selectedQuestion];
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
    }

}());
