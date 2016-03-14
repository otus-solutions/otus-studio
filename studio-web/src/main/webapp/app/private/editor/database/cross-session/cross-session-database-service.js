(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('CrossSessionDatabaseService', CrossSessionDatabaseService);

    CrossSessionDatabaseService.$inject = [
        '$indexedDB'
    ];

    function CrossSessionDatabaseService($indexedDB) {
        var self = this;

        /* Public interface */
        self.saveSurveyTemplate = saveSurveyTemplate;

        function saveSurveyTemplate(template) {
            $indexedDB.openStore('survey_template', function(store) {
                var entry = {
                    'template_oid': Date.now() + '-' + template.oid,
                    template: template
                };

                store.insert(entry).then(function(e) {
                    console.log('Survey armazenada localmente.');
                });
            });
        }
    }

}());
