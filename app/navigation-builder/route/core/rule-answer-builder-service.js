(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.build = build;
    self.buildCustomAnswer = buildCustomAnswer;

    function build(item) {
      var answers = [];

      if (item.objectType !== 'SingleSelectionQuestion' && item.objectType !== 'CheckboxQuestion') {
        answers = answers.concat(_getCustomAnswer());
      } else if (item.options) {
        answers = answers.concat(item.options.map(getAnswerOption));
      } else if (item.options) {
        answers = answers.concat(item.options.map(getAnswerOption));
      }

      if (item.metadata && item.metadata.options) {
        answers = answers.concat(item.metadata.options.map(getMetadataOption));
      }
      return answers;
    }

    function _getCustomAnswer() {
      return [{
        isMetadata: false,
        option: {
          label: {
            ptBR: {
              plainText: ''
            },
            value: null
          }
        }
      }];
    }

    function buildCustomAnswer(ruleData) {
      if (ruleData.when.type === 'CalendarQuestion') {
        let date = new Date(ruleData.answer);
        let answer = date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear();
      }

      return {
        isMetadata: false,
        option: {
          label: {
            ptBR: {
              plainText: ruleData.answer
            },
            value: null
          }
        }
      };
    }

    function getAnswerOption(option) {
      return {
        isMetadata: false,
        option: option
      }
    }

    function getMetadataOption(option) {
      return {
        isMetadata: true,
        option: option
      }
    }
  }
})();
