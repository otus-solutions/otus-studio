(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('editor.ui.SurveyItemGroupService', Service);

  function Service() {
    var self = this;

    self.questionItemReference = {};
    self.surveyItemsRegistry = surveyItemsRegistry;
    self.getValidItemsByTemplateID = getValidItemsByTemplateID;

    function surveyItemsRegistry(id, fun) {
      self.questionItemReference[id] = fun;
    }

    function getValidItemsByTemplateID(templateId) {
      let stateComponent = {};
      let itemsValidCanditates = self.fakeModelList_getItemsValidCandidates(templateId);

      if(!itemsValidCanditates.length){
        stateComponent.status = "invalidateGroup";
        _setStateComponent(templateId, stateComponent);
      }else{
        itemsValidCanditates.forEach(function (id, index) {
          if(index < 1)stateComponent.status = "editorGroup";
          else stateComponent.status = "validateGroup";
          _setStateComponent(id,stateComponent);
        });
      }
    }

    function _setStateComponent(id, stateComponent){
      self.questionItemReference[id].call(stateComponent)
    }

    self.fakeModelList_getItemsValidCandidates = function (templateId) {
      switch (templateId) {
        case "FDR1":
          return [
            'FDR1',
            'FDR3'
          ];
          break;

        case "FDR3":
          return [
            'FDR3',
            'FDR4',
            'FDR5',
            'FDR6',
          ];
          break;

        default:
          return [];
          break;
      }
    };
    return self;
  }
}());
