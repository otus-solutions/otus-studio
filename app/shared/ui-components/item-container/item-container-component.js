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
    '$mdDialog',
    'DialogService',
    'WorkspaceService',
    '$window',
    '$mdSelect'
  ];

  function Controller(RemoveSurveyItemEventFactory, $mdDialog, DialogService, WorkspaceService, $window, $mdSelect) {
    var self = this;

    var DELETE_MSG = 'A exclusão de uma questão pode afetar as rotas do questionário, assim como apaga-lás! <br><br><b>Deseja realmente excluir esta questão?</b>';
    var DELETE_TITLE = 'ATENÇÃO';

    self.changeState = changeState;
    self.deleteSurveyItem = deleteSurveyItem;
    self.scrollSurveyItem = scrollSurveyItem;

    self.$onInit = function() {
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

    function remove(answer){
      if(answer){
        RemoveSurveyItemEventFactory.create().execute(self.item);
        $mdDialog.cancel();
      }
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function deleteSurveyItem() {
      var data = {
        header: "Excluir Questão "+self.item.customID,
        title: DELETE_TITLE,
        text: DELETE_MSG,
        type: 'confirm',
        dialogDimensions: {
          width: '800px'
        },
        buttons : [
          {message:"CANCELAR",class: "md-primary md-layoutTheme-theme"},
          {message:"SIM",class: "md-primary md-raised md-layoutTheme-theme", action: remove}
        ]
      };
      DialogService.show(data);

    }

    function scrollSurveyItem() {
      var data = {
        url: 'app/editor/ui/survey-item-editor/survey-item-order/survey-item-order-change-template.html',
        header: "Excluir Questão "+self.item.customID,
        ctrl: 'SurveyItemOrderChangeController',
        item: self.item,
        questions: WorkspaceService.getSurvey().getItems(),
        title: DELETE_TITLE,
        text: DELETE_MSG,
        type: 'confirm',
        dialogDimensions: {
          width: '500px'
        },
        // buttons : [
        //   {message:"CANCELAR",class: "md-primary md-layoutTheme-theme"},
        //   {message:"Salvar",class: "md-primary md-raised md-layoutTheme-theme", action: remove}
        // ]
      };
      DialogService.show(data);

    }

    $window.addEventListener('click',function(e){
      $mdSelect.hide();
    });


  }

}());
