(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplateToolbar', {
            templateUrl: 'app/dashboard/survey-form/components/survey-template-toolbar-template.html',
            controller: SurveyTemplateToolbarController,
        });

    SurveyTemplateToolbarController.$inject = ['SurveyTemplateManagerService'];

    function SurveyTemplateToolbarController(SurveyTemplateManagerService) {
        var self = this;
        self.SurveyTemplateManagerService = SurveyTemplateManagerService;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;

        function deleteSelectedSurveyTemplate() {
            SurveyTemplateManagerService.deleteSelectedSurveyTemplate();
        }
    }

})();
