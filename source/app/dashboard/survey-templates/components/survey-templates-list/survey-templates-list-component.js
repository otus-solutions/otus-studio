(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesList', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-templates-list/survey-templates-list.html',
            controller: SurveyTemplateControllerList,
        });

    SurveyTemplateControllerList.$inject = ['SurveyTemplateManagerService'];

    function SurveyTemplateControllerList(SurveyTemplateManagerService) {
        var self = this;

        self.getSurveyTemplatesList = getSurveyTemplatesList;

        function getSurveyTemplatesList() {
            return SurveyTemplateManagerService.surveyTemplates;
        }

        self.$onInit = function() {
            SurveyTemplateManagerService.initializeSurveyTemplateList();
        };
    }

})();
