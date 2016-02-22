(function() {

    angular
        .module('editor.engine.memory.cache')
        .factory('MDbFactory', MDbFactory);

    MDbFactory.$inject = ['Loki'];

    function MDbFactory(Loki) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(Loki) {
            return new EditorDb(Loki);
        }

        return self;
    }

    function EditorDb(Loki) {
        var self = this,
            editorDb = null;

        /* Public interface */
        self.addDataState = addDataState;

        init();

        function init() {
            editorDb = new Loki('editor-db.json');
            editorDb.addCollection('dataStates');
        }

        function addDataState(state) {
            editorDb.insert(state);
            console.log(editorDb);
        }
    }

}());
