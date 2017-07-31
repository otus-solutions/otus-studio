(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyTemplateHeader', {
      templateUrl: 'app/editor/ui/survey-template-header/survey-template-header-template.html',
      controller: Controller,
      bindings: {
        identity: '<'
      }
    });

  function Controller() {
    var self = this;

    self.$onInit = function() {
      self.name = self.identity.name;
      self.acronym = self.identity.acronym;
    };
  }

}());
