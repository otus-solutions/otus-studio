(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SurveyPropertiesController', SurveyPropertiesController);

    SurveyPropertiesController.$inject = ['WorkspaceService'];

    function SurveyPropertiesController(WorkspaceService) {
        var self = this;

        self.survey = {};
        self.survey.name = WorkspaceService.workspace.project.survey.getIdentity().name;
        self.survey.acronym = WorkspaceService.workspace.project.survey.getIdentity().acronym;
        self.survey.version = WorkspaceService.workspace.project.survey.getIdentity().version;
        self.survey.recommendedTo = WorkspaceService.workspace.project.survey.getIdentity().recommendedTo;
        self.survey.description = WorkspaceService.workspace.project.survey.getIdentity().description;
        self.survey.keywords = WorkspaceService.workspace.project.survey.getIdentity().keywords;
    }

}());
