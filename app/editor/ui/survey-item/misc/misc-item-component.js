(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('miscItem', {
      templateUrl: 'app/editor/ui/survey-item/misc/misc.html',
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
