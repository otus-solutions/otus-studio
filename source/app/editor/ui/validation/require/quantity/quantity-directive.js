(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusQuantityValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.QuantityValidatorWidgetFactory'
  ];

  function Directive(QuantityValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/quantity/quantity-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = QuantityValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());
