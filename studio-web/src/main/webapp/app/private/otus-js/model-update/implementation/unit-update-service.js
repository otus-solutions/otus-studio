(function() {
    'use strict';

    angular
        .module('otusjs')
        .service('UnitUpdateService', UnitUpdateService);

    function UnitUpdateService() {
        var self = this,
            observers = [];

        /* Public interface */
        self.update = update;
        self.registerObserver = registerObserver;

        function update(updateWork) {
            var question = updateLabelValue(updateWork);
            notifyObservers(question, updateWork.type);
        }

        function updateLabelValue(updateWork) {
            var targetPath = updateWork.target.split('.'),
                selectedQuestion = targetPath[2],
                questionToUpdate = updateWork.survey.question[selectedQuestion];

            questionToUpdate.unit.ptBR.plainText = updateWork.data.plainText || updateWork.data.value;
            questionToUpdate.unit.ptBR.formattedText = updateWork.data.formattedText;

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
