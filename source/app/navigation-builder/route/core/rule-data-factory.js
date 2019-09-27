(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.RuleDataFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.createNew = createNew;
    self.createFromRuleModel = createFromRuleModel;

    function createNew() {
      return new RuleData();
    }

    function createFromRuleModel() {
      return new RuleData();
    }

    return self;
  }

  function RuleData() {
    var self = this;
  }
}());
