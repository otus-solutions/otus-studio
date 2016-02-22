(function() {

    angular
        .module('otusjs')
        .service('LabelUpdateService', LabelUpdateService);

    function LabelUpdateService() {
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

            questionToUpdate.label.ptBR.plainText = updateWork.data.plainText || updateWork.data.value;
            questionToUpdate.label.ptBR.formattedText = updateWork.data.formattedText;

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
