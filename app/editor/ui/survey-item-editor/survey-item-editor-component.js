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
    '$element',
    'RemoveSurveyItemEventFactory'
  ];

  function Controller(SurveyItemEditorWidgetFactory, UUIDService, $scope, $element, RemoveSurveyItemEventFactory) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getItem = getItem;
    self.deleteSurveyItem = deleteSurveyItem;
    self.getQuestionId = getQuestionId;

    function getItem() {
      return self.item;
    }

    function getQuestionId() {
      return self.getItem().templateID;
    }

    function deleteSurveyItem() {
      RemoveSurveyItemEventFactory.create().execute(self.item);
    }


    function onInit() {
      // $scope.uuid = UUIDService.generateUUID();
      // $scope.widget = SurveyItemEditorWidgetFactory.create($scope, $element, self.item);
    }

  }

}());
