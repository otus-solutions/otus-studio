(function() {

    angular
        .module('surveyComponents')
        .service('SurveyComponentsService', SurveyComponentsService);

    function SurveyComponentsService() {
        var self = this;

        /* Public interface */
        self.TEXT_QUESTION_DIRECTIVE = '<text-question></text-question>';
    }

}());
