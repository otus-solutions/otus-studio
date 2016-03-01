(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SurveyPropertiesController', SurveyPropertiesController);

    SurveyPropertiesController.$inject = ['WorkspaceService'];

    function SurveyPropertiesController(WorkspaceService) {
        var self = this;

        self.survey = {};
        self.survey.name = WorkspaceService.workspace.project.survey.identity.name;
        self.survey.acronym = WorkspaceService.workspace.project.survey.identity.acronym;
        self.survey.version = WorkspaceService.workspace.project.survey.identity.version;
        self.survey.recommendedTo = WorkspaceService.workspace.project.survey.identity.recommendedTo;
        self.survey.description = WorkspaceService.workspace.project.survey.identity.description;
        self.survey.keywords = WorkspaceService.workspace.project.survey.identity.keywords;
    }

}());
