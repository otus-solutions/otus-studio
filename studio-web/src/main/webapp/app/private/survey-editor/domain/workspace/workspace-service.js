(function() {
    'use strict';

    angular
        .module('editor.domain')
        .service('WorkspaceService', WorkspaceService);

    WorkspaceService.$inject = [
        'WorkspaceFactory',
        'SurveyProjectFactory',
        'SurveyLoaderService'
    ];

    function WorkspaceService(WorkspaceFactory, SurveyProjectFactory, SurveyLoaderService) {
        var self = this;

        /* Public interface */
        self.initializeWorkspace = initializeWorkspace;
        self.startNewProject = startNewProject;
        self.importProject = importProject;
        self.closeProject = closeProject;
        self.saveProject = saveProject;

        function initializeWorkspace(ownerWorkSession) {
            // MemoryService.getLiveCache().resetAll();
            console.log('Initializing workspace...');
            self.workspace = WorkspaceFactory.create(ownerWorkSession);
            console.log('Workspace intialized.');
        }

        function startNewProject() {
            console.log('Starting new project...');
            var survey = SurveyLoaderService.newSurvey();
            importProject(SurveyProjectFactory.create(survey, self.workspace.workSessions.workspaceOwner));
            console.log('New project created.');
        }

        function importProject(project) {
            self.workspace.importProject(project);
            console.log('Loading project configuration...');
            self.workspace.loadProjectConfiguration();
            console.log('Project configuration loaded.');
        }

        function closeProject() {
            saveProject();
            self.workspace.project.close('now');
        }

        function saveProject() {

        }
    }

}());
