(function () {
  'use strict';

  angular
    .module('editor.ui')
    .service('editor.ui.SurveyItemGroupService', Service);

  function Service() {
    var self = this;

    self.cadastroDeCandidatos = {};
    self.click =click;
    self.onClick = onClick;

    function onClick(id, fun) {
      self.cadastroDeCandidatos[id] = fun;
      console.log(self.cadastroDeCandidatos)
    }

    function click(id) {
      self.getPossiveisCandidatosAoGrupo(id).forEach(function (id) {
        self.cadastroDeCandidatos[id].call();
      });
    }

    self.getPossiveisCandidatosAoGrupo = function (templateID) {
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
