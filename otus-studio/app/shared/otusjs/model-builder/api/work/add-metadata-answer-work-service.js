(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('AddMetadataAnswerService', AddMetadataAnswerService);

    AddMetadataAnswerService.$inject = [
        'WorkspaceService',
        'MetadataAnswerFactory'
    ];

    function AddMetadataAnswerService(WorkspaceService, MetadataAnswerFactory) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var survey = WorkspaceService.getSurvey();
            var newMetadataOption = MetadataAnswerFactory.create(data.currentQuestion.metadata.option.length, data.currentQuestion.templateID);
            data.currentQuestion.metadata.addOption(newMetadataOption);
            return newMetadataOption;
        }
    }

}());
