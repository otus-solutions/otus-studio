(function() {

    angular
        .module('spec')
        .service('SurveyQuestionsUpdateService', SurveyQuestionsUpdateService);

    SurveyQuestionsUpdateService.$inject = ['QuestionFactory'];

    function SurveyQuestionsUpdateService(QuestionFactory) {
        var self = this,
            observers = [],
            nextOIDNumber = -1;

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(updateWork) {
            var question = null;

            if (updateWork.type == 'ADD_DATA') {
                question = addQuestion(updateWork);
            } else if (updateWork.type == 'REMOVE_DATA') {
                question = removeQuestion(updateWork);
            } else if (updateWork.type == 'SET_VALUE') {
                updateQuestion(updateWork);
            }

            notifyObservers(question, updateWork.type);
        }

        function addQuestion(updateWork) {
            var nextOID = updateWork.survey.identity.acronym + (++nextOIDNumber),
                newQuestion = QuestionFactory.create(updateWork.model, nextOID);

            updateWork.survey.question[nextOID] = newQuestion;

            return newQuestion;
        }

        function removeQuestion(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                questionToRemove = updateWork.survey.question[selectedQuestion];

            delete updateWork.survey.question[selectedQuestion];
            return questionToRemove;
        }

        function updateQuestion(updateWork) {
            // var selectedQuestion = updateWork.target.split('.')[2],
            //     questionToUpdate = updateWork.survey.question[selectedQuestion];
            //
            // questionsToUpdate.label.ptBR.text = updateWork.data.value;
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
