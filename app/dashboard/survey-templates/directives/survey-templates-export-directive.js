(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .directive('surveyTemplatesExport', surveyTemplatesExport);

    surveyTemplatesExport.$inject = ['SurveyTemplateManagerService','$mdToast', '$timeout'];

    function surveyTemplatesExport(SurveyTemplateManagerService, $mdToast, $timeout) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    SurveyTemplateManagerService.selectedSurveyTemplatesList.forEach(function(template){
                        var downloadElement = document.createElement('a');
                        downloadElement.setAttribute('href', SurveyTemplateManagerService.exportSelectedSurveyTemplate(template));
                        downloadElement.setAttribute('download', 'surveyTemplate.json');
                        downloadElement.setAttribute('target', '_blank');
                        downloadElement.click();
                    });
                    $timeout(function(){
                        $mdToast.show($mdToast.simple().textContent('Template(s) exportados com sucesso!'));
                    }, 1000);

                });
            }
        };
        return ddo;
    }

}());
