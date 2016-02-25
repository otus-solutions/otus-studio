(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('LabelBuilderService', LabelBuilderService);

    function LabelBuilderService() {
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
            var question = updateLabelValue(work);
            notifyObservers(question, work.type);
        }

        function updateLabelValue(work) {
            var targetPath = work.target.split('.'),
                selectedQuestion = targetPath[2],
                questionToUpdate = work.survey.question[selectedQuestion];

            questionToUpdate.label.ptBR.plainText = work.data.plainText || work.data.value;
            questionToUpdate.label.ptBR.formattedText = work.data.formattedText;

            return questionToUpdate;
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
