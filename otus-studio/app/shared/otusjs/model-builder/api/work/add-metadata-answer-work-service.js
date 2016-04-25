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
            var parentQuestion = data.context;
            var survey = WorkspaceService.getSurvey();
            var newMetadataOption = MetadataAnswerFactory.create(parentQuestion.metadata.option.length, parentQuestion.templateID);
            parentQuestion.metadata.addOption(newMetadataOption);
            return newMetadataOption;
        }
    }

}());
