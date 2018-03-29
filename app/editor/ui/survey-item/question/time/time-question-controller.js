(function() {
  'use strict';

  angular
    .module('editor.ui')
    .controller('TimeQuestionController', Controller);

    Controller.$inject = [
      'AddOptionItemEventFactory',
      'UpdateOptionItemEventFactory',
      'RemoveOptionItemEventFactory'
    ]

    function Controller(AddOptionItemEventFactory, UpdateOptionItemEventFactory, RemoveOptionItemEventFactory) {
      var self = this;

      self.$onInit = onInit;
      self.updateOption = updateOption;
      self.getItem = getItem;

      function onInit() {

        self.button = true;
        self.disabledButton = 'disabledButton';
        if (self.item.isQuestion()) {
          if (self.item.options == undefined) {
            self.questionOptions = false;
          } else {
            self.questionOptions = self.item.options;
            console.log(self.questionOptions.data.disabledButton);
            if(!self.questionOptions.data.disabledButton){
              updateOption(self.disabledButton, !self.button);

            }
          }
        }
      }

      function updateOption(name, value) {
        //TODO Fazer implementação
        console.log(self.item);
        if (self.questionOptions) {
          if(name !== null && name !== undefined && value !== null && value !== undefined){
            AddOptionItemEventFactory.create().execute(self.item, name, value);
            getItem().options.data = self.questionOptions.data;
            UpdateOptionItemEventFactory.create().execute();

          }
        } else {
          // getItem().options = [];//TODO REMOVER
          RemoveOptionItemEventFactory.create().execute(self, name);
        }

      }


      function getItem() {
        return self.item;
      }

    }

}());
