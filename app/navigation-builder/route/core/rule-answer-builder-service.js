(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.build = build;

    function build(item) {
      var answers = [];

      if (item.options) {
        answers = answers.concat(item.options.map(getAnswerOption));
      }

      if (item.metadata && item.metadata.options) {
        answers = answers.concat(item.metadata.options.map(getMetadataOption));
      }

      return answers;
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
