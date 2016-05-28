(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesList', {
            templateUrl: 'app/dashboard/survey-form/components/survey-templates-list.html',
            controller: SurveyTemplateControllerList,
        });

    SurveyTemplateControllerList.$inject = ['SurveyTemplateManagerService'];

    function SurveyTemplateControllerList(SurveyTemplateManagerService) {
        var self = this;

        self.getSurveyTemplatesList = getSurveyTemplatesList;

        function getSurveyTemplatesList() {
            return SurveyTemplateManagerService.surveyTemplatesList;
        }

        self.$onInit = function() {
            SurveyTemplateManagerService.initializeSurveyTemplateList();
        };
    }

})();
