(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddAnswerOptionService', AddAnswerOptionService);

    AddAnswerOptionService.$inject = [
        'WorkspaceService',
        'AnswerOptionFactory'
    ];

    function AddAnswerOptionService(WorkspaceService, AnswerOptionFactory) {
        var self = this;

        self.execute = execute;

        function execute(question) {
            var answerOption = AnswerOptionFactory.create(question.option.length, question.templateID);
            question.addOption(answerOption);
            return answerOption;
        }
    }

}());
