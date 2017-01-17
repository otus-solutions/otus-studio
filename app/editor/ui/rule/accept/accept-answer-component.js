(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusAcceptAnswer', {
      templateUrl: 'app/editor/ui/rule/accept/accept-answer.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'AddFillingRulesEventFactory'
  ];

  function Controller(AddFillingRulesEventFactory) {

    var self = this;
    self.whoAmI = 'accept';
    self.data;

    /* Public methods */
    self.$onInit = onInit;
    self.updateData = updateData;

    function onInit() {
      self.data = self.item.fillingRules.options.accept.data.reference;
    }

    function updateData() {
      if (self.data) {
        AddFillingRulesEventFactory.create().execute(self.item, self.whoAmI);
      } else {
        //RemoveFillingRulesEventFactory.create().execute(self, self.whoAmI);
      }
    }
  }

}());
