(function() {
  'use strict';

  angular
    .module('preview')
    .service('StopPlayerStepService', Service);

  Service.$inject = [
    'DashboardStateService'
  ];

  function Service(DashboardStateService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      DashboardStateService.goToFormTemplates();
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
