(function() {
  'use strict';

  angular
    .module('ui.components')
    .component('itemContainer', {
      templateUrl: 'app/shared/ui-components/item-container/item-container-template.html',
      controller: 'itemContainerCtrl as $ctrl',
      bindings: {
        item: "<",
        position: "<"
      },
      transclude: {
        headerSlot: 'itemContainerHeader',
        bodySlot: 'itemContainerBody'
      }
    })
    .controller('itemContainerCtrl', Controller);

  Controller.$inject = [
    'RemoveSurveyItemEventFactory',
    'MoveSurveyItemEventFactory',
    '$mdDialog',
    'DialogService',
    'WorkspaceService',
    '$window',
    '$mdSelect',
    '$rootScope',
    '$timeout'
  ];

  function Controller(RemoveSurveyItemEventFactory, MoveSurveyItemEventFactory, $mdDialog, DialogService, WorkspaceService, $window, $mdSelect, $rootScope, $timeout) {
    var self = this;

    var DELETE_MSG = 'A exclusão de uma questão pode afetar as rotas do questionário, assim como apaga-lás! <br><br><b>Deseja realmente excluir esta questão?</b>';
    var DELETE_TITLE = 'ATENÇÃO';

    self.changeState = changeState;
    self.deleteSurveyItem = deleteSurveyItem;
    self.moveSurveyItem = moveSurveyItem;

    self.$onInit = function() {
      _clearQuestionSelected();
      self.css = {};
      self.template = {};
      self.event = {};
      self.isToShow = false;
      self.template.icon = 'expand_more';
    }

    function changeState() {
      self.isToShow = !self.isToShow;
      self.template.icon = (self.isToShow) ? 'expand_less' : 'expand_more';
    }

    function _removeQuestion(answer){
      if(answer){
        RemoveSurveyItemEventFactory.create().execute(self.item);
        _clearQuestionSelected(0);
        $mdDialog.cancel();
      }
    }

    function _moveQuestion(item, position){
      if(item){
        MoveSurveyItemEventFactory.create().execute(item, position);
        $rootScope.$broadcast("surveyItemSelected", WorkspaceService.getSurvey().getItems().indexOf(self.item));
        _clearQuestionSelected(2000);
        $mdDialog.cancel();
      }
    }

    function _clearQuestionSelected(time) {
      $timeout(function () {
        $rootScope.$broadcast("clearSurveyItemSelected");
      }, time);
    }

    function deleteSurveyItem() {
      var data = {
        header: "Excluir Questão "+self.item.customID,
        title: DELETE_TITLE,
        text: DELETE_MSG,
        dialogDimensions: {
          width: '800px'
        },
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme"},
          {message:"SIM",class: "md-primary md-raised md-layoutTheme-theme", action: _removeQuestion}
        ]
      };
      $rootScope.$broadcast("surveyItemSelected", WorkspaceService.getSurvey().getItems().indexOf(self.item));
      DialogService.show(data);
    }

    function moveSurveyItem() {
      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-order/survey-item-order-change-template.html',
        header: "Excluir Questão "+self.item.customID,
        ctrl: 'SurveyItemOrderChangeController',
        item: self.item,
        position: WorkspaceService.getSurvey().getItems().indexOf(self.item) + 1,
        questions: WorkspaceService.getSurvey().getItems(),
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme"},
          {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: _moveQuestion}
        ]
      };
      $rootScope.$broadcast("surveyItemSelected", WorkspaceService.getSurvey().getItems().indexOf(self.item));
      DialogService.show(data);
    }

    $window.addEventListener('click',function(e){
      $mdSelect.hide();
    });
  }

}());
