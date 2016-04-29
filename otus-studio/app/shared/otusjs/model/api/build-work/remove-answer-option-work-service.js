(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('RemoveAnswerOptionService', RemoveAnswerOptionService);

    function RemoveAnswerOptionService() {
        var self = this;

        self.execute = execute;

        function execute(question) {
            question.removeLastOption();
        }
    }

}());
