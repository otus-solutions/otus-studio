(function() {
    'use strict';

    angular
        .module('editor.engine.memory.cache')
        .service('MDbService', MDbService);

    MDbService.$inject = ['MDbFactory'];

    function MDbService(MDbFactory) {
        var self = this,
            editorDb = null;

        /* Public interface */
        self.storeData = storeData;

        init();

        function init() {
            editorDb = MDbFactory.create();
        }

        function storeData(data) {
            editorDb.addDataState(data);
        }
    }

}());
