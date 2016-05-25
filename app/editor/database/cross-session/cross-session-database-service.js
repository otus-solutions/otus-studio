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
            var defer = $q.defer();
            $indexedDB.openStore('survey_template', function(store) {
                store.getAll().then(function(templates) {
                    defer.resolve(templates);
                });
            });
            return defer.promise;
        }

        function getAllTemplatesRevisionByAuthor() {
            var defer = $q.defer();
            $indexedDB.openStore('survey_template', function(store) {

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

        /**
         *
         * Returns a User + UUID Template + Repository in Base64
         *
         */
        function getAllKeys() {
            var defer = $q.defer();
            $indexedDB.openStore('survey_template', function(store) {
                store.getAllKeys().then(function(e) {
                    defer.resolve(e);
                });
            });
            return defer.promise;
        }

        //init();

        function init() {
            var promise = getAllTemplatesRevision();
            promise.then(function(value) {
                console.log(value);
            });
        }


    }

}());
