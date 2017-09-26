(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('integerQuestion', {
      templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question-template.html',
      bindings: {
        item: '<'
      }
    });
}());
