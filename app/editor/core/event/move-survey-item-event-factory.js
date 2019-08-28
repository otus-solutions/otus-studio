(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('MoveSurveyItemEventFactory', MoveSurveyItemEventFactory);

    MoveSurveyItemEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'MoveSurveyItemService',
    ];

    function MoveSurveyItemEventFactory($rootScope, WorkspaceService, MoveSurveyItemService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new MoveSurveyItemEvent($rootScope, WorkspaceService, MoveSurveyItemService);
        }

        return self;
    }

    function MoveSurveyItemEvent($rootScope, WorkspaceService, MoveSurveyItemService) {
        var self = this;

        self.execute = execute;

        function execute(item, position) {
            MoveSurveyItemService.execute(WorkspaceService.getSurvey(), item, position);
            $rootScope.$broadcast('item.move', item);
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
