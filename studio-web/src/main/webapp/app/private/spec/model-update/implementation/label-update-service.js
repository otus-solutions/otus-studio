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
            var targetPath = editingEvent.target.split('.');

            targetPath.forEach(function(path) {
                var model = extractModel(path),
                    index = extractModelIndex(path);

                if (model == 'questions') questionIndex = index;
                else if (model == 'labels') labelIndex = index;
                else if (model == 'content') contentIndex = index;

            });

            survey.questions[questionIndex].labels[labelIndex].content[contentIndex].text = editingEvent.state.domData.value;
        }

        function extractModel(modelName) {
            return modelName.replace(/\[.\]/, '');
        }

        function extractModelIndex(modelName) {
            var index = modelName.replace(/(.*\[)/, '');
            index = index.replace(/(\])/, '');
            return parseInt(index);
        }
    }

}());
