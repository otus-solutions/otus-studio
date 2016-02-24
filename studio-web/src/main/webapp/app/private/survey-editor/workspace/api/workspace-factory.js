(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .factory('WorkspaceFactory', WorkspaceFactory);

    WorkspaceFactory.$inject = ['InSessionDatabaseService'];

    function WorkspaceFactory(InSessionDatabaseService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(workSession) {
            return new Workspace(workSession, InSessionDatabaseService);
        }

        return self;
    }

    function Workspace(workSession, InSessionDatabaseService) {
        var self = this;
        self.isdb = InSessionDatabaseService;

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

        }
    }

}());
