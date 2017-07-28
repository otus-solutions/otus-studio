(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyTemplateHeader', {
      templateUrl: 'app/editor/ui/survey-template-header/survey-template-header-template.html',
      controller: Controller
    });

  Controller.$inject = ['WorkspaceService'];

  function Controller(WorkspaceService) {
    var self = this;

    self.name = '';
    self.acronym = '';
    self.identity = {};

    self.$onInit = function() {
      self.identity = WorkspaceService.getSurvey().identity;
      self.name = self.identity.name;
      self.acronym = self.identity.acronym;
    };
  }

}());
