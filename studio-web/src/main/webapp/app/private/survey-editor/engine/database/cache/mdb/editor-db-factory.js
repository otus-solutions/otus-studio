(function() {
    'use strict';

    angular
        .module('editor.engine.database.cache')
        .factory('EditorDbFactory', EditorDbFactory);

    EditorDbFactory.$inject = ['Loki'];

    function EditorDbFactory(Loki) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new EditorDb(Loki);
        }

        return self;
    }

    function EditorDb(Loki) {
        var self = this,
            instance = null;

        const DATA_STATE_COLLECTION = 'dataStates';

        /* Public interface */
        self.store = store;

        init();

        function init() {
            instance = new Loki('editor-db.json');
            self[DATA_STATE_COLLECTION] = instance.addCollection(DATA_STATE_COLLECTION);
        }

        function store(state) {
            self[DATA_STATE_COLLECTION].insert(state);
        }
    }

}());
