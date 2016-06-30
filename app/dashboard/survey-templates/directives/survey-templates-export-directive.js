(function() {
    'use strict';

    angular
        .module('surveyTemplates')
        .directive('surveyTemplatesExport', surveyTemplatesExport);

    surveyTemplatesExport.$inject = [
        'SurveyTemplateManagerService',
        '$mdToast',
        '$timeout',
        'SelectedSurveyTemplatesManagementService'
    ];

    function surveyTemplatesExport(SurveyTemplateManagerService, $mdToast, $timeout, SelectedSurveyTemplatesManagementService) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    SelectedSurveyTemplatesManagementService.selectedSurveyTemplates.forEach(function(template) {
                        var downloadElement = document.createElement('a');
                        downloadElement.setAttribute('href', SurveyTemplateManagerService.exportSurveyTemplate(template));
                        downloadElement.setAttribute('download', 'surveyTemplate.json');
                        downloadElement.setAttribute('target', '_blank');
                        downloadElement.click();
                    });
                    $timeout(function() {
                        $mdToast.show($mdToast.simple().textContent('Template(s) exportado(s) com sucesso!'));
                    }, 1000);

                });
            }
        };
        return ddo;
    }

}());
