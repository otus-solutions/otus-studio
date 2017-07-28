(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyItemEditor', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'SurveyItemEditorWidgetFactory',
    'UUIDService',
    '$scope',
    '$element'
  ];

  function Controller(SurveyItemEditorWidgetFactory, UUIDService, $scope, $element) {
    var self = this;

    self.$onInit = function onInit() {
      $scope.uuid = UUIDService.generateUUID();
      $scope.widget = SurveyItemEditorWidgetFactory.create($scope, $element, self.item);
    }

  }

}());
