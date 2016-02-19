(function() {

    angular
        .module('spec')
        .service('AnswerOptionUpdateService', AnswerOptionUpdateService);

    AnswerOptionUpdateService.$inject = ['QuestionAnswerOptionFactory'];

    function AnswerOptionUpdateService(QuestionAnswerOptionFactory) {
        var self = this,
            observers = [],
            nextOID = -1;

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(updateWork) {
            var answerOption = null;

            if (updateWork.type == 'ADD_DATA') {
                answerOption = addOption(updateWork);
            } else if (updateWork.type == 'REMOVE_DATA') {
                answerOption = removeOption(updateWork);
            } else if (updateWork.type == 'SET_VALUE') {
                updateOption(updateWork);
            }

            notifyObservers(answerOption, updateWork.type);
        }

        function addOption(updateWork) {
            var newOption = QuestionAnswerOptionFactory.create(++nextOID),
                selectedQuestion = extractQuestionReference(updateWork.target);

            updateWork.survey.question[selectedQuestion].option[nextOID] = newOption;

            return newOption;
        }

        function removeOption(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                questionToRemove = updateWork.survey.question[selectedQuestion];

            delete updateWork.survey.question[selectedQuestion];
            return questionToRemove;
        }

        function updateOption(updateWork) {
            var selectedQuestion = updateWork.target.split('.')[2],
                selectedOption = updateWork.target.split('.')[4],
                optionToUpdate = updateWork.survey.question[selectedQuestion].option[selectedOption];

            optionToUpdate.label.ptBR.plainText = updateWork.data.plainText || updateWork.data.value;
            optionToUpdate.label.ptBR.formattedText = updateWork.data.formattedText;
        }

        function extractQuestionReference(target) {
            return target.split('.')[2];
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
