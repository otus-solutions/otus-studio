(function() {
    'use strict';

    angular
        .module('editor.database')
        .service('CrossSessionDatabaseService', CrossSessionDatabaseService);

    CrossSessionDatabaseService.$inject = [
        '$q',
        '$indexedDB'
    ];

    function CrossSessionDatabaseService($q, $indexedDB) {
        var self = this,
            STORE_NAME = 'survey_template',
            INDEX = 'contributor_idx';

        /* Public interface */
        self.saveSurveyTemplateRevision = saveSurveyTemplateRevision;
        self.getAllSurveyTemplates = getAllSurveyTemplates;
        self.getAllSurveyTemplatesByContributor = getAllSurveyTemplatesByContributor;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.insertSurveyTemplate = insertSurveyTemplate;
        self.findSurveyTemplateByOID = findSurveyTemplateByOID;

        function saveSurveyTemplateRevision(template, session) {
            $indexedDB.openStore(STORE_NAME, function(store) {
                var entry = {};
                entry.template_oid = template.oid;
                entry.contributor = session.owner;
                entry.template = JSON.parse(template.toJson());
                store.upsert(entry).then(function(e) {});

            });
        }

        function insertSurveyTemplate(template, session) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                var parsedTemplate = JSON.parse(template);
                var entry = {};
                entry.template_oid = parsedTemplate.oid;
                entry.contributor = session.owner;
                entry.template = parsedTemplate;
                store.insert(entry).then(function(success) {
                    defer.resolve(success);
                }, function(error) {
                    defer.reject(error);
                });
            });
            return defer.promise;
        }

        function getAllSurveyTemplates() {
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
                criteria = criteria.$eq('visitor');
                criteria = criteria.$index(INDEX);

                store.eachWhere(criteria).then(function(templates) {
                    defer.resolve(templates);
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
         * Returns a User + UUID Template + Repository in Base64
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

        function findSurveyTemplateByOID(oid) {
            var defer = $q.defer();
            $indexedDB.openStore(STORE_NAME, function(store) {
                store.find(oid).then(function(template) {
                    defer.resolve(template);
                });
            });
            return defer.promise;
        }
    }

}());
