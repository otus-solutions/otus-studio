(function() {
    'use strict';

    angular
        .module('editor.engine.database.cache')
        .service('MDbService', MDbService);

    MDbService.$inject = ['MDbFactory'];

    function MDbService(MDbFactory) {
        var self = this,
            editorDb = null;

        /* Public interface */
        self.store = store;

        init();

        function init() {
            editorDb = MDbFactory.create();
        }

        function store(data) {
            editorDb.store(data);
        }
    }

}());
