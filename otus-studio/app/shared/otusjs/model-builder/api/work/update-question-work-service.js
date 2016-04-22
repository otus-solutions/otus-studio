(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('UpdateQuestionService', UpdateQuestionService);

    UpdateQuestionService.$inject = [
        'WorkspaceService',
        'QuestionFactory'
    ];

    function UpdateQuestionService(WorkspaceService, QuestionFactory) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var survey = WorkspaceService.getSurvey();
            survey.updateQuestion(data.ngModel);
            return data;
        }
    }

}());
