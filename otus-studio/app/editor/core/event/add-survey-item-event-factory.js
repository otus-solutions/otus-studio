(function() {
    'use strict';

    angular
        .module('editor.core')
        .factory('AddSurveyItemEventFactory', AddSurveyItemEventFactory);

    AddSurveyItemEventFactory.$inject = [
        '$rootScope',
        'WorkspaceService',
        'WidgetService',
        'SheetContentService',
        'AddSurveyItemService'
    ];

    function AddSurveyItemEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService);
        }

        return self;
    }

    function AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService) {
        var self = this;

        self.execute = execute;

        function execute(itemType) {
            var item = AddSurveyItemService.execute(itemType);
            SheetContentService.loadQuestion(item);
            $rootScope.$broadcast('item.add', item);
            WorkspaceService.workspace.currentItem = item;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
