(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplateToolbar', {
            templateUrl: 'app/dashboard/survey-form/components/survey-template-toolbar-template.html',
            controller: SurveyTemplateToolbarController,
        });

    SurveyTemplateToolbarController.$inject = ['SurveyTemplateManager'];

    function SurveyTemplateToolbarController(SurveyTemplateManager) {
        var self = this;
        self.SurveyTemplateManager = SurveyTemplateManager;
        self.removeSelectedTemplate = removeSelectedTemplate;

        function removeSelectedTemplate() {
            SurveyTemplateManager.removeTemplate();
        }

    }

})();
