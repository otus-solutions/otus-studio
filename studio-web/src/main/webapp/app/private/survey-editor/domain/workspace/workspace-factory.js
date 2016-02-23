(function() {
    'use strict';

    angular
        .module('editor.domain')
        .factory('WorkspaceFactory', WorkspaceFactory);

    function WorkspaceFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(workSession) {
            return new Workspace(workSession);
        }

        return self;
    }

    function Workspace(workSession) {
        var self = this;

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
