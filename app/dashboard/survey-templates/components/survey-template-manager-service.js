(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateManagerService', SurveyTemplateManagerService);

    SurveyTemplateManagerService.$inject = [
        'CrossSessionDatabaseService',
        'SurveyExportService'
    ];

    function SurveyTemplateManagerService(CrossSessionDatabaseService, SurveyExportService) {
        var self = this;
        self.surveyTemplates = [];

        self.initializeSurveyTemplateList = initializeSurveyTemplateList;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.exportSurveyTemplate = exportSurveyTemplate;

        function initializeSurveyTemplateList() {
            var promise = CrossSessionDatabaseService.getAllSurveyTemplatesByContributor();
            promise.then(function(value) {
                self.surveyTemplates = value;
            });
        }

        function deleteSurveyTemplate(template) {
            CrossSessionDatabaseService.deleteSurveyTemplate(template.template_oid);
            removeOfSurveyTemplatesList(template);
        }

        function exportSurveyTemplate(template) {
            return SurveyExportService.exportSurvey(JSON.stringify(template.template));
        }

        /* Private methods */
        function getTemplateIndex(template) {
            return self.surveyTemplates.indexOf(template);
        }

        function removeOfSurveyTemplatesList(template) {
            self.surveyTemplates.splice(getTemplateIndex(template), 1);
        }
    }

})();
