(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateManagerService', SurveyTemplateManagerService);

    SurveyTemplateManagerService.$inject = ['CrossSessionDatabaseService', '$mdToast'];

    function SurveyTemplateManagerService(CrossSessionDatabaseService, $mdToast) {
        var self = this;

        self.surveyTemplatesList = [];
        self.selectedSurveyTemplate = {};

        self.initializeSurveyTemplateList = initializeSurveyTemplateList;
        self.selectSurveyTemplate = selectSurveyTemplate;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;
        self.hasSelectedSurveyTemplate = hasSelectedSurveyTemplate;

        function initializeSurveyTemplateList() {
            var promise = CrossSessionDatabaseService.getAllSurveyTemplatesByContributor();
            promise.then(function(value) {
                self.surveyTemplatesList = value;
            });
        }

        function selectSurveyTemplate(template) {
            if (self.selectedSurveyTemplate.$$hashKey === template.$$hashKey) {
                cleanselectedSurveyTemplate();
            } else {
                self.selectedSurveyTemplate = template;
            }
        }

        function hasSelectedSurveyTemplate() {
            return Object.keys(self.selectedSurveyTemplate).length !== 0;
        }

        function deleteSelectedSurveyTemplate() {
            var idx = self.surveyTemplatesList.indexOf(self.selectedSurveyTemplate);
            if (idx >= 0) {
                self.surveyTemplatesList.splice(idx, 1);
                CrossSessionDatabaseService.deleteSurveyTemplate(self.selectedSurveyTemplate.template_oid);
            }
            cleanselectedSurveyTemplate();
            $mdToast.show($mdToast.simple().textContent('Template removido com sucesso!'));
        }

        /* Private methods */
        function cleanselectedSurveyTemplate() {
            self.selectedSurveyTemplate = {};
        }
    }

})();
