(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusExtractionValue', {
      templateUrl: 'app/editor/ui/base/extraction-value/extraction-value.html',
      controller: Controller,
      bindings: {
        option: '<',
        checkFunction: '&'
      }
    });

  Controller.$inject = ['$element', 'otusjs.studio.editor.ui.ExtractionValueService'];

  function Controller($element, ExtractionValueService) {
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
      $element.children()[0].innerText = _option.extractionValue;
      $element.on('focusout', _execute);
    }

    function _execute(event) {
      ExtractionValueService.execute(event, _option, _checkFunction);
    }
  }

})();
