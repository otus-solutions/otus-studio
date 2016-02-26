(function() {
    'use strict';

    angular
        .module('editor.workspace')
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
        self.loadWork = loadWork;
        self.importProject = importProject;
        self.closeProject = closeProject;
        self.saveProject = saveProject;
        self.getQuestionId = getQuestionId;
        self.existsWorkInProgress = existsWorkInProgress;
        self.registerObserver = registerObserver;

        function initializeWorkspace(ownerWorkSession) {
            self.workspace = WorkspaceFactory.create(ownerWorkSession);
            questionIdCounter = -1;
            notifyObservers({
                type: 'NEW_PROJECT'
            });
        }

        function startNewProject() {
            var survey = SurveyLoaderService.newSurvey();
            importProject(SurveyProjectFactory.create(survey, self.workspace.workSessions.workspaceOwner));
        }

        function loadWork() {
            var survey = SurveyLoaderService.newSurvey();
            importProject(SurveyProjectFactory.create(survey, self.workspace.workSessions.workspaceOwner));
        }

        function importProject(project) {
            self.workspace.importProject(project);
            self.workspace.loadProjectConfiguration();
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

        function existsWorkInProgress() {
            return workInProgress;
        }

        function notifyObservers(update) {
            observers.forEach(function(observer) {
                observer.update(update);
            });
        }

        function registerObserver(observer) {
            observers.push(observer);
        }
    }

}());
