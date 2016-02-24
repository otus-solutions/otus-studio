(function() {
    'use strict';

    angular
        .module('editor.workspace.database')
        .factory('InSessionDatabaseFactory', InSessionDatabaseFactory);

    InSessionDatabaseFactory.$inject = ['Loki'];

    function InSessionDatabaseFactory(Loki) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new InSessionDatabase(Loki);
        }

        return self;
    }

    function InSessionDatabase(Loki) {
        var self = this,
            instance = null;

        const USER_EDITS_COLLECTION = 'userEdits';

        init();

        function init() {
            instance = new Loki('in-session-db.json');
            self[USER_EDITS_COLLECTION] = new Collection(instance.addCollection(USER_EDITS_COLLECTION));
        }
    }

    function Collection(collectionReference) {
        var self = this,
            collection;

        /* Public interface */
        self.store = store;

        init();

        function init() {
            collection = collectionReference;
        }

        function store(data) {
            collection.insert(data);
        }
    }

}());
