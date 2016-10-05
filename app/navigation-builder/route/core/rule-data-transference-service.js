(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleDataTransferenceService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.trasfereceDataToViewport = trasfereceDataToViewport;
    self.trasfereceDataToDatabase = trasfereceDataToDatabase;
    self.buildObjectCustomAnswer = buildObjectCustomAnswer;

    function trasfereceDataToViewport(when) {
      return RouteBuilderService.getAnswerListForRule(when.item);
    }

    function trasfereceDataToDatabase() {

    }

    function buildObjectCustomAnswer(answer) {
      return [{
        answer: answer
      }];
    }

  }

})();
