(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .directive('surveyTemplatesExport', surveyTemplatesExport);

    surveyTemplatesExport.$inject = ['SurveyTemplateManagerService'];

    function surveyTemplatesExport(SurveyTemplateManagerService) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    console.log(SurveyTemplateManagerService.exportSelectedSurveyTemplate());
                    var downloadElement = document.createElement('a');
                    downloadElement.setAttribute('href', SurveyTemplateManagerService.exportSelectedSurveyTemplate());
                    downloadElement.setAttribute('download', 'surveyTemplate.json');
                    downloadElement.setAttribute('target', '_blank');
                    downloadElement.click();
                });
            }
        };
        return ddo;
    }

}());
