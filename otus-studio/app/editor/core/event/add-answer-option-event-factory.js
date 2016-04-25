(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddAnswerOptionEventFactory', AddAnswerOptionEventFactory);

    AddAnswerOptionEventFactory.$inject = [
        'AddAnswerOptionService',
        'SingleSelectionContentService',
        'WorkspaceService'
    ];

    function AddAnswerOptionEventFactory(AddAnswerOptionService, SingleSelectionContentService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddAnswerOptionEvent(AddAnswerOptionService, SingleSelectionContentService, WorkspaceService);
        }

        return self;
    }

    function AddAnswerOptionEvent(AddAnswerOptionService, SingleSelectionContentService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(data) {
            var metadata = AddAnswerOptionService.execute(data);
            SingleSelectionContentService.loadOption(metadata);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
