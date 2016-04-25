(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('AddAnswerOptionService', AddAnswerOptionService);

    AddAnswerOptionService.$inject = [
        'WorkspaceService',
        'AnswerOptionFactory'
    ];

    function AddAnswerOptionService(WorkspaceService, AnswerOptionFactory) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var parentQuestion = data.context;
            var answerOption = AnswerOptionFactory.create(parentQuestion.option.length, parentQuestion.templateID);
            parentQuestion.addOption(answerOption);
            return answerOption;
        }
    }

}());
