(function() {
    'use strict';

    angular
        .module('otusjs')
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

            if (updateWork.type.isAddData()) {
                question = addQuestion(updateWork);
            } else if (updateWork.type.isRemoveData()) {
                question = removeQuestion(updateWork);
            } else if (updateWork.type.isUpdateData()) {
                updateQuestion(updateWork);
            }

            notifyObservers(question, updateWork.type);
        }

        function addQuestion(updateWork) {
            var newQuestion = QuestionFactory.create(updateWork.model, updateWork.questionId);
            updateWork.survey.question[updateWork.questionId] = newQuestion;
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

        function notifyObservers(question, update) {
            update.data = question;
            observers.forEach(function(observer) {
                observer.update(update);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());
