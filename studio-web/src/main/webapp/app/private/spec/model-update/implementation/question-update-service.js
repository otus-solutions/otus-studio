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

        function update(updateWork) {
            var question = null;

            if (updateWork.type == 'ADD_DATA') {
                question = addQuestion(updateWork);
            } else {
                question = removeQuestion(updateWork);
            }
            notifyObservers(question, updateWork.type);
        }

        function addQuestion(updateWork) {
            var nextOID = updateWork.survey.identity.acronym + Object.keys(updateWork.survey.question).length,
                newQuestion = QuestionFactory.create(updateWork.model, nextOID);

            updateWork.survey.question[newQuestion.oid] = newQuestion;

            return newQuestion;
        }

        function removeQuestion(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                questionToRemove = updateWork.survey.question[selectedQuestion];

            delete updateWork.survey.question[selectedQuestion];
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
