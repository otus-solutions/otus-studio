(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusAcceptAnswer', {
      templateUrl: 'app/editor/ui/rule/accept-answer/accept-answer.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'AddFillingRulesEventFactory',
    'RemoveFillingRulesEventFactory',
    'UpdateFillingRulesEventFactory'
  ];

  function Controller(AddFillingRulesEventFactory, RemoveFillingRulesEventFactory, UpdateFillingRulesEventFactory) {

    var self = this;
    var whoAmI = 'accept';

    /* Public methods */
    self.data;
    self.$onInit = onInit;
    self.updateData = updateData;
    self.getItem = getItem;

    function onInit() {
      if (self.item.fillingRules.options.accept == undefined) {
        self.data = false;
      } else {
        self.data = self.item.fillingRules.options.accept.data.reference;
        updateData();
      }
    }

    function updateData() {
      if (self.data) {
        AddFillingRulesEventFactory.create().execute(self.item, whoAmI);
        _getRuleType().data.reference = self.data;
        UpdateFillingRulesEventFactory.create().execute();
      } else {
        RemoveFillingRulesEventFactory.create().execute(self, whoAmI);
      }
    }

    function _getRuleType() {
      return self.item.fillingRules.options.accept;
    }

    function getItem() {
      return self.item;
    }

  }

}());
