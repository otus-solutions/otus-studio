(function () {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusSurveyItemEditor', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
      controller: 'otusSurveyItemEditorCtrl as $ctrl',
      bindings: {
        item: '<',
        position: '<'
      }
    }).controller('otusSurveyItemEditorCtrl', Controller);

  Controller.$inject = [
    '$scope'
  ];

  function Controller($scope) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getItem = getItem;
    self.getQuestionId = getQuestionId;
    self.getStyle = getStyle;

    function onInit() {
      $scope.$on('surveyItemSelected', setIndex);
      $scope.$on('clearSurveyItemSelected', _clearIndex);
    }

    function setIndex($event, index) {
      self.index = index;
    }

    function _clearIndex($event) {
      delete self.index;
    }

    function getItem() {
      return self.item;
    }

    function getQuestionId() {
      return self.getItem().templateID;
    }

    function getStyle(position) {
      if (self.index == position) {
        return {"background-color": "#E88024"}
      }
      return {}
    }
  }
}());
