(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .service('SelectedSurveyTemplatesManagementService', SelectedSurveyTemplatesManagementService);

    function SelectedSurveyTemplatesManagementService() {
        var self = this;
        self.selectedSurveyTemplates = [];

        self.selectSurveyTemplate = selectSurveyTemplate;
        self.removeSurveyTemplate = removeSurveyTemplate;
        self.hasSelectedSurveyTemplate = hasSelectedSurveyTemplate;
        self.hasOnlyOneSelectedSurveyTemplate = hasOnlyOneSelectedSurveyTemplate;

        function selectSurveyTemplate(template) {
            self.selectedSurveyTemplates.push(template);
        }

        function removeSurveyTemplate(template) {
            self.selectedSurveyTemplates.splice(_getSelectedTemplateIndex(template), 1);
        }

        function hasSelectedSurveyTemplate() {
            return self.selectedSurveyTemplates.length !== 0;
        }

        function hasOnlyOneSelectedSurveyTemplate() {
            return self.selectedSurveyTemplates.length === 1;
        }

        /* Private methods */
        function _getSelectedTemplateIndex(template) {
            return self.selectedSurveyTemplates.indexOf(template);
        }
    }

})();
