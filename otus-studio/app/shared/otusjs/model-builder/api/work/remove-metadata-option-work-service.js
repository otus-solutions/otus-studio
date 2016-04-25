(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .service('RemoveMetadataOptionService', RemoveMetadataOptionService);

    RemoveMetadataOptionService.$inject = [
        'WorkspaceService',
        'MetadataAnswerFactory'
    ];

    function RemoveMetadataOptionService(WorkspaceService, MetadataAnswerFactory) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var parentQuestion = data.context;
            parentQuestion.metadata.removeLastOption();
        }
    }

}());
