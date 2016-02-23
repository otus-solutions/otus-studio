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

    function WorkspaceService(WorkspaceFactory, SurveyProjectFactory, SurveyLoaderService, SurveyPageController) {
        var self = this,
            questionIdCounter = -1,
            observers = [];

        /* Public interface */
        self.initializeWorkspace = initializeWorkspace;
        self.startNewProject = startNewProject;
        self.importProject = importProject;
        self.closeProject = closeProject;
        self.saveProject = saveProject;
        self.getQuestionId = getQuestionId;
        self.registerObserver = registerObserver;

        function initializeWorkspace(ownerWorkSession) {
            // MemoryService.getLiveCache().resetAll();
            console.log('Initializing workspace...');
            self.workspace = WorkspaceFactory.create(ownerWorkSession);
            questionIdCounter = -1;
            notifyObservers(null, 'NEW_PROJECT');
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

        function getQuestionId() {
            return ++questionIdCounter;
        }

        function notifyObservers(question, updateType) {
            observers.forEach(function(observer) {
                observer.update(question, updateType);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());
