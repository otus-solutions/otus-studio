(function() {
  'use strict';

  angular
    .module('ui.components')
    .component('itemContainer', {
      templateUrl: 'app/shared/ui-components/item-container/item-container-template.html',
      controller: Controller,
      bindings: {
        item: "<",
        position: "<"
      },
      transclude: {
        headerSlot: 'itemContainerHeader',
        bodySlot: 'itemContainerBody'
      }
    });

  Controller.$inject = [
    'RemoveSurveyItemEventFactory',
    '$mdDialog',
    'DialogService'
  ];

  function Controller(RemoveSurveyItemEventFactory, $mdDialog, DialogService) {
    var self = this;

    const DELETE_MSG = 'A exclusão de uma questão pode afetar as rotas do questionário, assim como apaga-lás! <br><br><b>Deseja realmente excluir esta questão?</b>';
    const DELETE_TITLE = 'ATENÇÃO';

    self.changeState = changeState;
    self.deleteSurveyItem = deleteSurveyItem;

    self.$onInit = function() {
      self.css = {};
      self.template = {};
      self.event = {};
      self.isToShow = false;
      self.template.icon = 'expand_more';
    }

    function changeState() {
      console.log(self.position)
      self.isToShow = !self.isToShow;
      self.template.icon = (self.isToShow) ? 'expand_less' : 'expand_more';
    }

    function remove(answer){
      if(answer){
        RemoveSurveyItemEventFactory.create().execute(self.item);
        $mdDialog.cancel();
      }
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
          {message:"SIM",class: "md-warn md-raised", action: remove}
        ]
      };
      DialogService.show(data).then(function (answer) {
        remove(answer);
      })

    }


  }

}());
