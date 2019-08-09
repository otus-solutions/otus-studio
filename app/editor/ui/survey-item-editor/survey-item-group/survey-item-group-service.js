(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('editor.ui.SurveyItemGroupService', Service);

  function Service() {
    var self = this;

    self.questionItemReference = {};
    self.click =click;
    self.surveyItemsRegistry = surveyItemsRegistry;

    function surveyItemsRegistry(id, fun) {
      self.questionItemReference[id] = fun;
      console.log(self.questionItemReference)
    }

    function click(templateId) {
      //aqui será retorno do model como os itens validos para formar um grupo de surveys
      //para chamar associação inicial
      self.fakeModelList_getItemsValidCandidates(templateId).forEach(function (id, index) {
        let stateComponent = {};
        if(index < 1)stateComponent.state = "editorGroup";
        else stateComponent.state = "validateGroup";

        self.questionItemReference[id].call(stateComponent);
      });
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
      console.log(templateId);
      return [
        'FDR3',
        'FDR4',
        'FDR5',
        'FDR6',
      ];
    };

    return self;
  }

}());
