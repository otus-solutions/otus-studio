(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('AnswerOptionBuilderService', AnswerOptionBuilderService);

    AnswerOptionBuilderService.$inject = ['AnswerOptionFactory'];

    function AnswerOptionBuilderService(AnswerOptionFactory) {
        var self = this,
            observers = [],
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
            var answerOption = null;

            if (work.type.isAddData()) {
                answerOption = addOption(work);
            } else if (work.type.isRemoveData()) {
                answerOption = removeOption(work);
            } else if (work.type.isUpdateData()) {
                answerOption = updateOption(work);
            }

            notifyObservers(answerOption, work.type);
        }

        function addOption(work) {
            var selectedQuestion = extractQuestionReference(work.target);
            var nextOID = Object.keys(work.survey.question[selectedQuestion].option).length;

            var newOption = AnswerOptionFactory.create(nextOID, selectedQuestion);
            work.survey.question[selectedQuestion].option[nextOID] = newOption;

            return newOption;
        }

        function removeOption(work) {
            var selectedQuestion = work.target.split('.')[2],
                indexToRemove = Object.keys(work.survey.question[selectedQuestion].option).length - 1,
                questionToRemove = work.survey.question[selectedQuestion].option[indexToRemove];

            delete work.survey.question[selectedQuestion].option[indexToRemove];
            return questionToRemove;
        }

        function updateOption(work) {
            var selectedQuestion = work.target.split('.')[2],
                selectedOption = work.target.split('.')[4],
                optionToUpdate = work.survey.question[selectedQuestion].option[selectedOption];

            optionToUpdate.label.ptBR.plainText = work.data.plainText || work.data.value;
            optionToUpdate.label.ptBR.formattedText = work.data.formattedText;
            return optionToUpdate;
        }

        function extractQuestionReference(target) {
            return target.split('.')[2];
        }

        function notifyObservers(question, work) {
            work.data = question;
            observers.forEach(function(observer) {
                observer.update(work);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());
