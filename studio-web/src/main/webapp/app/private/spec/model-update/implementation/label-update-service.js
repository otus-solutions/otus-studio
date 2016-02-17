(function() {

    angular
        .module('spec')
        .service('LabelUpdateService', LabelUpdateService);

    function LabelUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;

        function update(updateWork) {
            updateLabelValue(updateWork);
        }

        function updateLabelValue(updateWork) {
            var targetPath = updateWork.target.split('.'),
                selectedQuestion = targetPath[2];

            updateWork.survey.question[selectedQuestion].label.ptBR.plainText = updateWork.data.plainText;
            updateWork.survey.question[selectedQuestion].label.ptBR.formattedText = updateWork.data.formattedText;
        }
    }

}());
