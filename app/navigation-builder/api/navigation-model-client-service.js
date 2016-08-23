(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationModelClientService', service);

  service.$inject = [
    'otusjs.model.navigation.NavigationApiService'
  ];

  function service(NavigationApiService) {
    var self = this;

    /* Public methods */
    self.addRouteCondition = addRouteCondition;

    function addRouteCondition(conditionName) {
      NavigationApiService.addRouteCondition(conditionName);
    }
  }
})();
