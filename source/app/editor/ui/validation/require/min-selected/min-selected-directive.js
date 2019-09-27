(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusMinSelectedValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.MinSelectedValidatorWidgetFactory'
  ];

  function Directive(MinSelectedValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/min-selected/min-selected-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = MinSelectedValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());
