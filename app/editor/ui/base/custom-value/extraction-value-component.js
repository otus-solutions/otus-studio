(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusCustomValue', {
      templateUrl: 'app/editor/ui/base/custom-value/custom-value.html',
      controller: Controller,
      bindings: {
        option: '<',
        checkFunction: '&'
      }
    });

  Controller.$inject = ['$element', 'CustomValueService'];

  function Controller($element, CustomValueService) {
    var _checkFunction;
    var _option;

    self = this;
    self.$onInit = onInit;
    self.$postLink = postLink;

    function onInit() {
      _checkFunction = self.checkFunction;
      _option = self.option;
    }

    function postLink() {
      $element.children()[0].innerText = _option.customValue;
      $element.on('focusout', _execute);
    }

    function _execute(event) {
      CustomValueService.execute(event, _option, _checkFunction);
    }
  }

})();
