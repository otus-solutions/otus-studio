(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyItemSettings', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-settings/survey-item-settings.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    '$scope',
    '$element',
    'SurveyItemSettingsWidgetFactory',
    'UUIDService'
  ];

  function Controller($scope, $element, SurveyItemSettingsWidgetFactory, UUIDService) {
    var self = this;

    self.$onInit = function() {
      $scope.uuid = UUIDService.generateUUID();
      $scope.widget = SurveyItemSettingsWidgetFactory.create($scope, $element, self.item);
    }

  }

}());
