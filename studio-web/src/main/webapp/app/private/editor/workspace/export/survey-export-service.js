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
            /*
            Pegar template (String)
            Converter o template para json
            Testar se o resultado é uma do tipo json
            */
            var file = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template));
            return file;
        }
    }
}());
