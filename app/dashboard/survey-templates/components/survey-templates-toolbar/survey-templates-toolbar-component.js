(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesToolbar', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-templates-toolbar/survey-templates-toolbar-template.html',
            controller: SurveyTemplatesToolbarController,
        });

    SurveyTemplatesToolbarController.$inject = ['SurveyTemplateManagerService'];

    function SurveyTemplatesToolbarController(SurveyTemplateManagerService) {
        var self = this;
        self.SurveyTemplateManagerService = SurveyTemplateManagerService;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;
        self.exportSelectedSurveyTemplate = exportSelectedSurveyTemplate;

        function deleteSelectedSurveyTemplate() {
            SurveyTemplateManagerService.deleteSelectedSurveyTemplate();
        }

        function exportSelectedSurveyTemplate() {
            SurveyTemplateManagerService.exportSelectedSurveyTemplate();
        }
    }

})();
