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
        self.load = load;

        function execute(itemType) {
            var item = AddSurveyItemService.execute(itemType, WorkspaceService.getSurvey());
            SheetContentService.loadQuestion(item);
            $rootScope.$broadcast('item.add', item);
            WorkspaceService.workspace.currentItem = item;
            WorkspaceService.workspace.isdb.userEdits.store(self);
            WorkspaceService.saveWork();
        }

        function load(itemToLoad) {
            var newItem = AddSurveyItemService.execute(itemToLoad.objectType, WorkspaceService.getSurvey());
            //copy data from itemToLoad to newItem
            if (newItem.isQuestion()) {
                newItem.label = itemToLoad.label;
                newItem.metadata.options = itemToLoad.metadata.options;
                newItem.fillingRules.options = {};

                if(itemToLoad.objectType === 'SingleSelectionQuestion' || itemToLoad.objectType === 'CheckboxQuestion') {
                    newItem.options = itemToLoad.options;
                }

                if(itemToLoad.objectType === 'DecimalQuestion' || itemToLoad.objectType === 'IntegerQuestion') {
                    newItem.unit = itemToLoad.unit;
                }
            } else {
                if(itemToLoad.objectType === 'ImageItem') {
                    newItem.url = itemToLoad.url;
                    newItem.footer = itemToLoad.footer;
                } else {
                    newItem.value = itemToLoad.value;
                }
            }

            SheetContentService.loadQuestion(newItem);
            $rootScope.$broadcast('item.add', newItem);
            WorkspaceService.workspace.currentItem = newItem;
        }
    }

}());
