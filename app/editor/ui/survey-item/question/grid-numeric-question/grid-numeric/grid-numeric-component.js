(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridNumeric', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-numeric-question/grid-numeric/grid-numeric-template.html',
      bindings: {
        gridNumeric: '<',
      }
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function () {

    };
  }

}());
