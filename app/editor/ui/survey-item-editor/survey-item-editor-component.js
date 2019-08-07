(function() {
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
    '$scope',
    '$mdDialog',
    'DialogService',
  ]

  function Controller($scope, $mdDialog, DialogService) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.getItem = getItem;
    self.getQuestionId = getQuestionId;
    self.getStyle = getStyle;
    self.editorSurveyItemGroup = editorSurveyItemGroup;

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
      if(self.index == position){
        return {"background-color":"#E88024"}
      }
      return {}
    }

    function editorSurveyItemGroup() {

      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
        //header: "Excluir Questão "+self.item.customID,
        //ctrl: 'SurveyItemOrderChangeController',
        //item: self.item,
        //position: WorkspaceService.getSurvey().getItems().indexOf(self.item) + 1,
        //questions: WorkspaceService.getSurvey().getItems(),
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme"},
          {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme"}
          //{message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: _moveQuestion}
        ]
      };
      DialogService.show(data)
    }
  }

}());
