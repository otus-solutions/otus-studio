(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('SurveyExportService', SurveyExportService);


    function SurveyExportService() {
        var self = this;

        /* Public interface */
        self.exportSurvey = exportSurvey;

        function exportSurvey(template) {
            return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(template));
        }
    }

}());
