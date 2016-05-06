(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('RemoveQuestionService', RemoveQuestionService);

    function RemoveQuestionService() {
        var self = this;

        self.execute = execute;

        function execute(question, survey) {
            survey.removeQuestion(question);
        }
    }

}());
