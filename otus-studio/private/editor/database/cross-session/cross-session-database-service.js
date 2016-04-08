(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('CrossSessionDatabaseService', CrossSessionDatabaseService);

    CrossSessionDatabaseService.$inject = [
        '$indexedDB',
        'InsertHelperService'
    ];

    function CrossSessionDatabaseService($indexedDB, InsertHelperService) {
        var self = this;

        /* Public interface */
        self.saveSurveyTemplateRevision = saveSurveyTemplateRevision;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore('survey_template', function(store) {
                var entry = {
                    'template_oid': template.getOID(),
                    'contributor': session.owner,
                    template: InsertHelperService.cloneObject(template)
                };

                store.upsert(entry).then(function(e) {
                });
            });
        }
    }

}());
