(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusMaxSelectedValidator', Directive);

  Directive.$inject = [
    'otusjs.studio.editor.ui.validation.MaxSelectedValidatorWidgetFactory'
  ];

  function Directive(MaxSelectedValidatorWidgetFactory) {
    var ddo = {
      scope: {},
      restrict: 'E',
      templateUrl: 'app/editor/ui/validation/require/max-selected/max-selected-validator.html',
      link: function linkFunc(scope, element) {
        scope.widget = MaxSelectedValidatorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());
