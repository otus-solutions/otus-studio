(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('QuestionBuilderService', QuestionBuilderService);

    QuestionBuilderService.$inject = ['QuestionFactory', 'QuestionNavigationFactory'];

    function QuestionBuilderService(QuestionFactory, QuestionNavigationFactory) {
        var self = this,
            observers = [],
            questionLinkedList = QuestionNavigationFactory.create(),
            workResult = null;

        /* Public interface */
        self.runValidations = runValidations;
        self.execute = execute;
        self.getWorkResult = getWorkResult;

        /* Observable interface */
        self.registerObserver = registerObserver;

        // TODO: Implement validator to run here
        function runValidations(work) {
            workResult = true;
        }

        function getWorkResult() {
            return {
                result: workResult
            };
        }

        function execute(work) {
            var question = null;

            if (work.type.isAddData()) {
                question = addQuestion(work);
            } else if (work.type.isRemoveData()) {
                question = removeQuestion(work);
            } else if (work.type.isUpdateData()) {
                updateQuestion(work);
            }

            notifyObservers(question, work.type);
        }

        function addQuestion(work) {
            var newQuestion = QuestionFactory.create(work.model, work.questionId);
            work.survey.question[work.questionId] = newQuestion;
            questionLinkedList.addAtEnd(newQuestion);

            return newQuestion;
        }

        function removeQuestion(work) {
            var selectedQuestion = work.target.split('.')[2],
                questionToRemove = work.survey.question[selectedQuestion];

            delete work.survey.question[selectedQuestion];
            return questionToRemove;
        }

        function updateQuestion(work) {
            if (work.id == 'survey-questions-move-back-question') {
                var targetQuestion = work.target;
                var indexToMove = work.survey.question[getQuestionOID(targetQuestion)];
            } else if (work.id == 'survey-questions-move-forward-question') {

            }
            // var selectedQuestion = work.target.split('.')[2],
            //     questionToUpdate = work.survey.question[selectedQuestion];
            //
            // questionsToUpdate.label.ptBR.text = work.data.value;
        }

        function notifyObservers(question, work) {
            work.data = question;
            observers.forEach(function(observer) {
                observer.update(work);
            });
        }

        function registerObserver(observer) {
            var registered = observers.filter(function (o) {
                if (o.identifier === observer.identifier) {
                    return o;
                }
            });

            if (registered.length === 0)
                observers.push(observer);
        }

        function getQuestionOID(target) {
            return target.split('.')[2];
        }
    }

}());
