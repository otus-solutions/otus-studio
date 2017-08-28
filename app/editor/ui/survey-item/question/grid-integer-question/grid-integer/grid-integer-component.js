(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('gridInteger', {
      controller: Controller,
      templateUrl: 'app/editor/ui/survey-item/question/grid-integer-question/grid-integer/grid-integer-template.html',
      bindings: {
        gridInteger: '<',
      }
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.$onInit = function () {

    };
  }

}());
