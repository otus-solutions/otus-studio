(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .component('surveyTemplatesToolbar', {
            templateUrl: 'app/dashboard/survey-templates/components/survey-templates-toolbar/survey-templates-toolbar-template.html',
            controller: SurveyTemplatesToolbarController,
        });

    SurveyTemplatesToolbarController.$inject = [
        'SurveyTemplateManagerService',
        'SelectedSurveyTemplatesManagementService',
        '$mdToast',
        'DashboardStateService',
        '$window'
    ];

    function SurveyTemplatesToolbarController(SurveyTemplateManagerService, SelectedSurveyTemplatesManagementService, $mdToast, DashboardStateService, $window, ActivityFacadeService) {
        var self = this;

        self.SelectedSurveyTemplatesManagementService = SelectedSurveyTemplatesManagementService;
        self.deleteSelectedSurveyTemplate = deleteSelectedSurveyTemplate;
        self.openEditorForSelectedSurveyTemplate = openEditorForSelectedSurveyTemplate;

        function deleteSelectedSurveyTemplate() {
            SelectedSurveyTemplatesManagementService.selectedSurveyTemplates.forEach(function(template) {
                SurveyTemplateManagerService.deleteSurveyTemplate(template);
            });
            $mdToast.show($mdToast.simple().textContent('Template(s) removido(s) com sucesso!'));
        }

        function openEditorForSelectedSurveyTemplate() {
            var selectedSurveyTemplate = _getSelectedSurveyTemplate();

            $window.sessionStorage.setItem('surveyTemplate_OID', selectedSurveyTemplate.oid);
            DashboardStateService.goToEditorWithSurveyTemplate(selectedSurveyTemplate);
        }

        function _getSelectedSurveyTemplate() {
            return SelectedSurveyTemplatesManagementService.selectedSurveyTemplates[0].template;
        }
    }

})();
