(function() {

    angular
        .module('spec')
        .service('LabelUpdateService', LabelUpdateService);

    function LabelUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;

        function update(editingEvent, survey) {
            updateLabelValue(editingEvent, survey);
        }

        function updateLabelValue(editingEvent, survey) {
            var targetPath = editingEvent.target.split('.'),
                selectedQuestion = targetPath[2];

            survey.question[selectedQuestion].label.ptBR.plainText = editingEvent.state.domData.textContent;
            survey.question[selectedQuestion].label.ptBR.formattedText = editingEvent.state.domData.innerHTML;
        }
    }

}());
