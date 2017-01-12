(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('acceptValidator', {
      controller: Controller,
      templateUrl: 'app/editor/ui/validation/require/accept/accept-validator.html'
    });

  Controller.$inject = [];

  function Controller() {

  }

}());
