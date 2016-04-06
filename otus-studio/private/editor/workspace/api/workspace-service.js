(function() {
    'use strict';

    angular
        .module('editor.workspace')
        .service('WorkspaceService', WorkspaceService);

    WorkspaceService.$inject = [
        'WorkspaceFactory',
        'SurveyProjectFactory',
        'SurveyLoaderService',
        'CrossSessionDatabaseService',
        'SurveyExportService'
    ];

    function WorkspaceService(WorkspaceFactory, SurveyProjectFactory, SurveyLoaderService, CrossSessionDatabaseService, SurveyExportService) {
        var self = this,
            questionIdCounter = -1,
            observers = [];

        /* Public interface */
        self.initializeWorkspace = initializeWorkspace;
        self.startNewWork = startNewWork;
        self.loadWork = loadWork;
        self.closeWork = closeWork;
        self.saveWork = saveWork;
        self.getQuestionId = getQuestionId;
        self.exportWork = exportWork;
        self.getSurvey = getSurvey;

        /* Observable interface */
        self.registerObserver = registerObserver;

        function initializeWorkspace(ownerWorkSession) {
            self.workspace = WorkspaceFactory.create(ownerWorkSession);
            questionIdCounter = -1;
            notifyObservers({
                type: 'NEW_PROJECT'
            });
        }

        function startNewWork(initializationData) {
            var survey = SurveyLoaderService.newSurvey(initializationData.name, initializationData.acronym, initializationData.version);
            importProject(SurveyProjectFactory.create(survey, self.workspace.sessions.workspaceOwner));
        }

        function loadWork() {
            var survey = SurveyLoaderService.newSurvey();
            importProject(SurveyProjectFactory.create(survey, self.workspace.sessions.workspaceOwner));
        }

        function closeWork() {
            saveProject();
            self.workspace.project.close('now');
        }

        function saveWork() {
            CrossSessionDatabaseService.saveSurveyTemplateRevision(self.workspace.project.survey, self.workspace.sessions.workspaceOwner);
        }

        function exportWork() {
            console.log(self.workspace.project.survey);
            return SurveyExportService.exportSurvey(self.workspace.project.survey);
        }

        function getQuestionId() {
            return ++questionIdCounter;
        }

        function getSurvey() {
            return self.workspace.project.survey;
        }

        function importProject(project) {
            self.workspace.importProject(project);
            self.workspace.loadProjectConfiguration();
        }

        /* Observable interface */
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
