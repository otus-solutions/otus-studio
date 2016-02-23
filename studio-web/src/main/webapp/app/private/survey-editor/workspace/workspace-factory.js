(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('WorkspaceFactory', WorkspaceFactory);

    WorkspaceFactory.$inject = ['WorkspaceDatabaseFactory'];

    function WorkspaceFactory(WorkspaceDatabaseFactory) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(workSession) {
            return new Workspace(workSession, WorkspaceDatabaseFactory);
        }

        return self;
    }

    function Workspace(workSession, WorkspaceDatabaseFactory) {
        var self = this;
        self.database = WorkspaceDatabaseFactory.create();

        /* Public interface */
        self.importProject = importProject;
        self.attachWorkeSession = attachWorkeSession;
        self.loadProjectConfiguration = loadProjectConfiguration;

        init();

        function init() {
            self.workSessions = {
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
            self.workSessions[workSession.owner.username] = workSession;
        }

        function loadProjectConfiguration() {
            console.log('Loading...');
        }
    }

}());
