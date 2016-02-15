(function() {

    angular
        .module('spec')
        .service('SurveyQuestionsUpdateService', SurveyQuestionsUpdateService);

    function SurveyQuestionsUpdateService() {
        var self = this;

        /* Public interface */
        self.update = update;

        /* Public interface implementation */
        function update(editingEvent, survey) {
            // console.log(editingEvent);
            // console.log(survey);
            // console.log('questions updated!');
        }
    }

}());
