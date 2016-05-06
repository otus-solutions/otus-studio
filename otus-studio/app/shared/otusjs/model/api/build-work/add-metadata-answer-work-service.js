(function() {
    'use strict';

    angular
        .module('otusjs.model')
        .service('AddMetadataAnswerService', AddMetadataAnswerService);

    AddMetadataAnswerService.$inject = [
        'WorkspaceService',
        'MetadataAnswerFactory'
    ];

    function AddMetadataAnswerService(WorkspaceService, MetadataAnswerFactory) {
        var self = this;

        self.execute = execute;

        function execute(question) {
            var metadataOption = MetadataAnswerFactory.create(question.metadata.option.length, question.templateID);
            question.metadata.addOption(metadataOption);
            return metadataOption;
        }
    }

}());
