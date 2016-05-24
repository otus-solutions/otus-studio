(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddAnswerOptionEventFactory', AddAnswerOptionEventFactory);

    AddAnswerOptionEventFactory.$inject = [
        'AddAnswerOptionService',
        'WorkspaceService'
    ];

    function AddAnswerOptionEventFactory(AddAnswerOptionService, WorkspaceService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService);
        }

        return self;
    }

    function AddAnswerOptionEvent(AddAnswerOptionService, WorkspaceService) {
        var self = this;

        self.execute = execute;

        function execute(eventSource) {
            var option = AddAnswerOptionService.execute(eventSource.getItem());
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
            return option;
        }
    }

}());
