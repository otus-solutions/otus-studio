(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('studioSheet', {
      templateUrl: 'app/editor/ui/sheet/sheet.html',
      controller: Controller,
      bindings: {
        template: '<'
      }
    });

  Controller.$inject = [
    'WorkspaceService',
    '$window'
  ];

  function Controller(WorkspaceService, $window) {
    var self = this;

    self.$onInit = function () {
      $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
    }

    self.$onDestroy = function() {
      WorkspaceService.closeWork();
      $window.sessionStorage.removeItem('surveyTemplate_OID');
    }

  }

})();
