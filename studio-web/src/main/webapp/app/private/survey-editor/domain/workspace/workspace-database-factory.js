(function() {
    'use strict';

    angular
        .module('editor.domain')
        .factory('WorkspaceDatabaseFactory', WorkspaceDatabaseFactory);

    WorkspaceDatabaseFactory.$inject = ['EditorDbFactory'];

    function WorkspaceDatabaseFactory(EditorDbFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            var database = new WorkspaceDatabase();
            database.editordb = EditorDbFactory.create();
            return database;
        }

        return self;
    }

    function WorkspaceDatabase() {
        var self = this;
    }

}());
