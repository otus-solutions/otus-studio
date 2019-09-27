(function() {
  'use strict';

  angular
    .module('editor.ui')
    .service('otusjs.studio.editor.ui.ExtractionValueService', Service);

  Service.$inject = [
    'UpdateQuestionEventFactory',
    '$mdToast'
  ];

  function Service(UpdateQuestionEventFactory, $mdToast) {
    var self = this;

    self.execute = execute;

    function execute(event, option, checkFunction) {
      var newValue = removeAllBlankSpaces(event.target.innerText);

      if (newValue === option.extractionValue.toString() || isEmpty(newValue)) {
        updateView(event, option);
      } else {
        if (hasChanges(newValue, option)) {
          if (checkFunction({
              $event: {
                newValue: newValue
              }
            })) {
            option.setExtractionValue(newValue);
            UpdateQuestionEventFactory.create().execute(self);
            updateView(event, option);
          } else {
            $mdToast.show($mdToast.simple().textContent('O valor não pode ser repetido.'));
            updateView(event, option);
          }
        }
      }
    }

    function isEmpty(newValue) {
      return newValue === '';
    }

    function removeAllBlankSpaces(newValue) {
      return newValue.replace(/\s/g, '');
    }

    function updateView(event, option) {
      event.target.innerText = option.extractionValue;
    }

    function hasChanges(newValue, option) {
      return newValue !== option.extractionValue;
    }
  }

}());
