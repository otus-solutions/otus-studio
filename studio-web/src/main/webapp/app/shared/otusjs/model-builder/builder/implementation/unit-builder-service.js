(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('UnitBuilderService', UnitBuilderService);

    function UnitBuilderService() {
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

            questionToUpdate.unit.ptBR.plainText = work.data.plainText || work.data.value;
            questionToUpdate.unit.ptBR.formattedText = work.data.formattedText;

            return questionToUpdate;
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
