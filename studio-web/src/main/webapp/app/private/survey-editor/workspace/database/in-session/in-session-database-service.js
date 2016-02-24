(function() {
    'use strict';

    angular
        .module('editor.workspace.database')
        .service('InSessionDatabaseService', InSessionDatabaseService);

    InSessionDatabaseService.$inject = ['InSessionDatabaseFactory'];

    function InSessionDatabaseService(InSessionDatabaseService) {
        var self = this,
            isdb = null;

        /* Public interface */
        self.storeEdit = storeEdit;

        init();

        function init() {
            isdb = InSessionDatabaseService.create();
        }

        function storeEdit(edit) {
            isdb.userEdits.store(edit);
        }
    }

}());
