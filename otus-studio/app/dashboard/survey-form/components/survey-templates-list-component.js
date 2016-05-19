(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesList', {
            templateUrl: 'app/dashboard/survey-form/components/survey-templates-list.html',
            controller: SurveyTemplateControllerList,
            controllerAs: 'controller'
        });

    SurveyTemplateControllerList.$inject = ['SurveyTemplateManager'];

    function SurveyTemplateControllerList(SurveyTemplateManager) {
        var self = this;

        self.SurveyTemplateManager = SurveyTemplateManager;
        self.listTemplates = listTemplates;

        function listTemplates() {
            return SurveyTemplateManager.templatesList;
        }

        self.$onInit = function() {
            SurveyTemplateManager.getAllTemplates();
        };

        function selectFormTemplate(template) {
            self.selectedFormTemplate = template;
        }

    }

})();
