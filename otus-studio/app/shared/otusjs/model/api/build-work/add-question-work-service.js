(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddQuestionService', AddQuestionService);

    AddQuestionService.$inject = [
        'WorkspaceService',
        'QuestionFactory'
    ];

    function AddQuestionService(WorkspaceService, QuestionFactory) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var survey = WorkspaceService.getSurvey();
            var newQuestion = QuestionFactory.create(data.ngModel, survey.identity.acronym + survey.questionsCount());
            survey.addQuestion(newQuestion);
            return newQuestion;
        }
    }

}());
