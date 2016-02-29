(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('QuestionPropertiesController', QuestionPropertiesController);

    QuestionPropertiesController.$inject = ['WorkspaceService'];

    function QuestionPropertiesController(WorkspaceService) {
        var self = this;

        self.question = {};
        self.question.oid = WorkspaceService.workspace.selectedQuestion.oid;
    }

}());
