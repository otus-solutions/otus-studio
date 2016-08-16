(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderAPI', service);

  service.$inject = [
    'NBEVENTS',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function service(NBEVENTS, NavigationBuilderService) {
    var self = this;

    self.NBEVENTS = NBEVENTS;

    /* Public methods */
    self.loadTemplateNavigations = loadTemplateNavigations;

    function loadTemplateNavigations(templateNavigations) {
      NavigationBuilderService.loadTemplateNavigations(templateNavigations);
    }
  }
}());
