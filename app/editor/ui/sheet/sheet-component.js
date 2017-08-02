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
    '$window',
    'PageAnchorService'
  ];

  function Controller(WorkspaceService, $window, PageAnchorService) {
    var self = this;

    self.$onInit = function () {
      PageAnchorService.setUp(self.template.SurveyItemManager);
      $window.sessionStorage.setItem('surveyTemplate_OID', WorkspaceService.getSurvey().oid);
    }

    self.$onDestroy = function() {
      WorkspaceService.closeWork();
      $window.sessionStorage.removeItem('surveyTemplate_OID');
    }

  }

})();
