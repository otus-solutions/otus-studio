(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.AnswerSelectorService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.listAnswers = listAnswers;

    function listAnswers(item) {
      var answers = [];
      if (_isSingleSelectionQuestion(item.objectType)) {
        answers = answers.concat(item.options);
      }
      answers = answers.concat(item.metadata.options);
      return answers;
    }

    function _isSingleSelectionQuestion(itemType) {
      return (itemType === 'SingleSelectionQuestion');
    }
  }
})();
