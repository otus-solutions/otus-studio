(function() {

    angular
        .module('surveyComponents')
        .service('SurveyComponentsService', SurveyComponentsService);

    function SurveyComponentsService() {
        var self = this,

            directiveTemplates = {
                'TextQuestion': '<text-question></text-question>'
            };

        /* Public interface */
        self.getDirectiveTemplate = getDirectiveTemplate;

        function getDirectiveTemplate(directive) {
            return directiveTemplates[directive];
        }
    }

}());
