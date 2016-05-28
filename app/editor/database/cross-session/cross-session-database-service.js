(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('CrossSessionDatabaseService', CrossSessionDatabaseService);

    CrossSessionDatabaseService.$inject = [
        '$q',
        '$indexedDB',
        'InsertHelperService'
    ];

    function CrossSessionDatabaseService($q, $indexedDB, InsertHelperService) {
        var self = this;
        var STORE_NAME = 'survey_template';

        /* Public interface */
        self.saveSurveyTemplateRevision = saveSurveyTemplateRevision;
        self.getAllTemplatesRevision = getAllTemplatesRevision;
        self.getAllSurveyTemplatesByContributor = getAllSurveyTemplatesByContributor;
        self.deleteSurveyTemplate = deleteSurveyTemplate;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore(STORE_NAME, function(store) {
                var entry = {};
                entry.template_oid = template.oid;
                entry.contributor = session.owner;
                entry.template = JSON.parse(template.toJson());
                store.upsert(entry).then(function(e) {});
            });
        }

        function getAllTemplatesRevision() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.getAll().then(function(templates) {
                    defer.resolve(templates);
                });
            });
            return defer.promise;
        }

        function getAllSurveyTemplatesByContributor() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {

                var criteria = store.query();
                criteria = criteria.$eq('fagner');
                criteria = criteria.$index('contributor_idx');

                store.eachWhere(criteria).then(function(e) {
                    defer.resolve(e);
                    //console.log(e[0].template.identity.acronym);
                    //https://github.com/bramski/angular-indexedDB
                });
            });
            return defer.promise;
        }

        function deleteSurveyTemplate(templateOID) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.delete(templateOID).then(function() {
                    defer.resolve(true);
                });
            });
            return defer.promise;
        }

        /**
         *
         * Returns a User + UUID Template + Repository in Base64
         *
         */
        function getAllKeys() {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.getAllKeys().then(function(e) {
                    defer.resolve(e);
                });
            });
            return defer.promise;
        }

    }

}());
