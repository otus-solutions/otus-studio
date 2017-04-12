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
    'LoadSurveyItemService',
    'PageAnchorService',
    '$timeout'
  ];

  function AddSurveyItemEventFactory($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout) {
    var self = this;

    /* Public interface */
    self.create = create;

    function create() {
      return new AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout);
    }

    return self;
  }

  function AddSurveyItemEvent($rootScope, WorkspaceService, WidgetService, SheetContentService, AddSurveyItemService, LoadSurveyItemService, PageAnchorService, $timeout) {
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
      var newItem = LoadSurveyItemService.execute(itemToLoad, WorkspaceService.getSurvey());
      //copy data from itemToLoad to newItem
      if (itemToLoad.customID) {
        newItem.customID = itemToLoad.customID;
        newItem.templateID = itemToLoad.templateID;
      } else {
        newItem.customID = newItem.templateID;
      }

      if (newItem.isQuestion()) {
        newItem.label = itemToLoad.label;
        newItem.metadata.options = itemToLoad.metadata.options;
        newItem.fillingRules.options = itemToLoad.fillingRules.options;

        if (itemToLoad.objectType === 'SingleSelectionQuestion' || itemToLoad.objectType === 'CheckboxQuestion') {
          newItem.options = itemToLoad.options;
        }

        if(itemToLoad.objectType === 'AutocompleteQuestion') {
          newItem.dataSources = itemToLoad.dataSources;
        }

        if (itemToLoad.objectType === 'DecimalQuestion' || itemToLoad.objectType === 'IntegerQuestion') {
          newItem.unit = itemToLoad.unit;
        }
      } else {
        if (itemToLoad.objectType === 'ImageItem') {
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
