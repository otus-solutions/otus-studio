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
        'AddSurveyItemService',
        'PageAnchorService',
        '$timeout'
    ];

    function AddSurveyItemEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, PageAnchorService, $timeout) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, PageAnchorService, $timeout);
        }

        return self;
    }

    function AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, PageAnchorService, $timeout) {
        var self = this;

        self.execute = execute;

        function execute(itemType) {
            var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
            SheetContentService.loadQuestion(item);
            $rootScope.$broadcast('item.add', item);
            WorkspaceService.workspace.currentItem = item;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }
    }

}());
