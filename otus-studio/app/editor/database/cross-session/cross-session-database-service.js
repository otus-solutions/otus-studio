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
        self.getAllTemplatesRevision = getAllTemplatesRevision;
        self.getAllTemplatesRevisionByAuthor = getAllTemplatesRevisionByAuthor;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore('survey_template', function(store) {
                var entry = {};
                entry.template_oid = template.oid;
                entry.contributor = session.owner;
                entry.template = JSON.parse(template.toJson());
                store.upsert(entry).then(function(e) {});
            });
        }

        function getAllTemplatesRevision() {
            $indexedDB.openStore('survey_template', function(store) {
                store.getAll().then(function(templates) {
                    //console.log(templates);
                });
            });
        }

        function getAllTemplatesRevisionByAuthor() {
            $indexedDB.openStore('survey_template', function(store) {
                var criteria = store.query();
                criteria = criteria.$eq('user');
                criteria = criteria.$index('contributor_idx');

                store.eachWhere(criteria).then(function (e) {
                    console.log(e);
                    //https://github.com/bramski/angular-indexedDB
                });
            });
        }

        init();
        function init() {
            self.getAllTemplatesRevisionByAuthor();
        }


    }

}());
