(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('RemoveMetadataOptionService', RemoveMetadataOptionService);

    function RemoveMetadataOptionService() {
        var self = this;

        self.execute = execute;

        function execute(question) {
            question.metadata.removeLastOption();
        }
    }

}());
