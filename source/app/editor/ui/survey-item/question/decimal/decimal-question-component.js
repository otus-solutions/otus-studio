(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('decimalQuestion', {
      templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question-template.html',
      bindings: {
        item: '<'
      }
    });

}());
