(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('timeQuestion', {
      controller: 'TimeQuestionController as $ctrl',
      templateUrl: 'app/editor/ui/survey-item/question/time/time-question-template.html',
      bindings: {
        item: '<'
      }
    });


}());
