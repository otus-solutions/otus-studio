(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusAcceptValidator', {
      templateUrl: 'app/editor/ui/event/accept/accept-validator.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [];

  function Controller(scope) {

    var self = this;
    self.isDisabled = false;

    /* Public methods */
    self.updateData = updateData;

    function updateData() {
      if (self.isDisabled) {
        self.item.fillingRules.options.accept = true;
      } else {
        delete self.item.fillingRules.options.accept;
      }
    }

  }

}());
