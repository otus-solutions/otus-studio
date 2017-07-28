(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusQuestionItem', {
      templateUrl: 'app/editor/ui/survey-item/question/question.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'SurveyItemWidgetFactory',
  ];

  function Controller($scope, $element, SurveyItemWidgetFactory) {
    var self = this;

    self.$onInit = function() {
      $scope.widget = SurveyItemWidgetFactory.create($scope, $element, self.item);
    }
  }

}());
