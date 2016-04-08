(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .directive('surveyTemplateExport', surveyTemplateExport);

    surveyTemplateExport.$inject = ['WorkspaceService'];

    function surveyTemplateExport(WorkspaceService) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    var downloadElement = document.createElement('a');
                    downloadElement.setAttribute('href', WorkspaceService.exportWork());
                    downloadElement.setAttribute('download', 'surveyTemplate.json');
                    downloadElement.setAttribute('target', '_blank');
                    downloadElement.click();
                });
            }
        };
        return ddo;
    }

}());
