(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SurveyTemplateManagerService', SurveyTemplateManagerService);

    SurveyTemplateManagerService.$inject = ['CrossSessionDatabaseService', '$mdToast', 'SurveyExportService'];

    function SurveyTemplateManagerService(CrossSessionDatabaseService, $mdToast, SurveyExportService) {
        var self = this;

        self.surveyTemplatesList = [];
        self.selectedSurveyTemplatesList = [];

        self.initializeSurveyTemplateList = initializeSurveyTemplateList;
        self.selectSurveyTemplate = selectSurveyTemplate;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;
        self.hasSelectedSurveyTemplate = hasSelectedSurveyTemplate;
        self.exportSelectedSurveyTemplate = exportSelectedSurveyTemplate;
        self.removeOfSelectedSurveyTemplatesList = removeOfSelectedSurveyTemplatesList;
        self.hasOnlyOneSelectedSurveyTemplate = hasOnlyOneSelectedSurveyTemplate;

        function initializeSurveyTemplateList() {
            var promise = CrossSessionDatabaseService.getAllSurveyTemplatesByContributor();
            promise.then(function(value) {
                self.surveyTemplatesList = value;
            });
        }

        function selectSurveyTemplate(template) {
            if (self.hasSelectedSurveyTemplate()) {
                if (isOnTheList(template)) {
                    self.removeOfSelectedSurveyTemplatesList(template);
                } else {
                    self.selectedSurveyTemplatesList.push(template);
                }
            } else {
                self.selectedSurveyTemplatesList.push(template);
            }
        }

        function hasSelectedSurveyTemplate() {
            return self.selectedSurveyTemplatesList.length !== 0;
        }

        function hasOnlyOneSelectedSurveyTemplate() {
            return self.selectedSurveyTemplatesList.length === 1;
        }

        function deleteSelectedSurveyTemplate() {
            self.selectedSurveyTemplatesList.forEach(function(template) {
                CrossSessionDatabaseService.deleteSurveyTemplate(template.template_oid);
                removeOfSurveyTemplatesList(template);
            });

            $mdToast.show($mdToast.simple().textContent('Template(s) removido com sucesso!'));
        }

        function exportSelectedSurveyTemplate(template) {
            return SurveyExportService.exportSurvey(JSON.stringify(template.template));
        }

        function removeOfSelectedSurveyTemplatesList(template) {
            self.selectedSurveyTemplatesList.splice(getSelectedTemplateIndex(template), 1);
        }

        function removeOfSurveyTemplatesList(template) {
            self.surveyTemplatesList.splice(getTemplateIndex(template), 1);
        }

        /* Private methods TEMPLATES LIST*/
        function getTemplateIndex(template) {
            return self.surveyTemplatesList.indexOf(template);
        }

        /* Private methods SELECTED LIST*/
        function getSelectedTemplateIndex(template) {
            return self.selectedSurveyTemplatesList.indexOf(template);
        }

        function isOnTheList(template) {
            return getSelectedTemplateIndex(template) >= 0 ? true : false;
        }

    }

})();
