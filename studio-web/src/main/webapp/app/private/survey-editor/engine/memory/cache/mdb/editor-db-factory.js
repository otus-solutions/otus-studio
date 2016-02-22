(function() {

    angular
        .module('editor.engine.memory.cache')
        .factory('MDbFactory', MDbFactory);

    MDbFactory.$inject = ['Loki'];

    function MDbFactory(Loki) {
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
        self.addDataState = addDataState;

        init();

        function init() {
            instance = new Loki('editor-db.json');
            instance.addCollection(DATA_STATE_COLLECTION);
        }

        function addDataState(state) {
            instance.getCollection(DATA_STATE_COLLECTION).insert(state);
        }
    }

}());
