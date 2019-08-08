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

    function click(id) {
      //aqui será retorno do model como os itens validos para formar um grupo de surveys
      //para chamar associação inicial
      self.fakeModelList_getItemsValidCandidates(id).forEach(function (id) {
        self.questionItemReference[id].call();
      });
    }

    self.fakeModelList_getItemsValidCandidates = function (templateID) {
      return [
        'FDR3',
        'FDR4',
        // 'FDR5',
        'FDR6',
      ];
    };

    return self;
  }

}());
