(function() {
    'use strict';

    angular
        .module('otusjs')
        .service('AnswerOptionUpdateService', AnswerOptionUpdateService);

    AnswerOptionUpdateService.$inject = ['AnswerOptionFactory'];

    function AnswerOptionUpdateService(AnswerOptionFactory) {
        var self = this,
            observers = [];

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(updateWork) {
            var answerOption = null;

            if (updateWork.type.isAddData()) {
                answerOption = addOption(updateWork);
            } else if (updateWork.type.isRemoveData()) {
                answerOption = removeOption(updateWork);
            } else if (updateWork.type.isUpdateData()) {
                answerOption = updateOption(updateWork);
            }

            notifyObservers(answerOption, updateWork.type);
        }

        function addOption(updateWork) {
            var selectedQuestion = extractQuestionReference(updateWork.target);
            var nextOID = Object.keys(updateWork.survey.question[selectedQuestion].option).length;

            var newOption = AnswerOptionFactory.create(nextOID, selectedQuestion);
            updateWork.survey.question[selectedQuestion].option[nextOID] = newOption;

            return newOption;
        }

        function removeOption(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                indexToRemove = Object.keys(updateWork.survey.question[selectedQuestion].option).length - 1,
                questionToRemove = updateWork.survey.question[selectedQuestion].option[indexToRemove];

            delete updateWork.survey.question[selectedQuestion].option[indexToRemove];
            return questionToRemove;
        }

        function updateOption(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                selectedOption = updateWork.target.split('.')[4],
                optionToUpdate = updateWork.survey.question[selectedQuestion].option[selectedOption];

            optionToUpdate.label.ptBR.plainText = updateWork.data.plainText || updateWork.data.value;
            optionToUpdate.label.ptBR.formattedText = updateWork.data.formattedText;
            return optionToUpdate;
        }

        function extractQuestionReference(target) {
            return target.split('.')[2];
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
