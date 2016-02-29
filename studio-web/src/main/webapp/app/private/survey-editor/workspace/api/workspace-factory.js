(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('WorkspaceFactory', WorkspaceFactory);

    WorkspaceFactory.$inject = ['InSessionDatabaseFactory'];

    function WorkspaceFactory(InSessionDatabaseFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(workSession) {
            var inSessionDatabase = InSessionDatabaseFactory.create();
            return new Workspace(workSession, inSessionDatabase);
        }

        return self;
    }

    function Workspace(workSession, inSessionDatabase) {
        var self = this;

        /* Public interface */
        self.importProject = importProject;
        self.attachWorkeSession = attachWorkeSession;
        self.loadProjectConfiguration = loadProjectConfiguration;

        init();

        function init() {
            self.isdb = inSessionDatabase;
            self.sessions = {
                workspaceOwner: workSession
            };
        }

        function importProject(projectToImport) {
            Object.defineProperty(self, 'project', {
                value: projectToImport,
                writable: false
            });
        }

        function attachWorkeSession(workSession) {
            self.sessions[workSession.owner.username] = workSession;
        }

        function loadProjectConfiguration() {

        }
    }

}());
