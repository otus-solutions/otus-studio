(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridText', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-text-question/grid-text/grid-text-component.html',
      bindings: {
        gridText: '<',
      }
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function() {

    };
  }

}());
