(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.navigationInspector')
    .service('otusjs.studio.navigationBuilder.navigationInspector.UiEventsService', service);

    service.$inject = [
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
      'otusjs.studio.navigationBuilder.navigationInspector.DataService',
      'otusjs.studio.navigationBuilder.GraphLayerService'
    ];

  function service(moduleScope, DataService, GraphLayerService) {
    var self = this;

    /* Public methods */
    self.activate = activate;
    self.deactivate = deactivate;

    function activate() {
      GraphLayerService.eventService.onClickNode(_selectRouteNode);
    }

    function deactivate() {
      GraphLayerService.eventService.clearAllEventListeners();
    }

    function _selectRouteNode(event) {
      DataService.selectNode(event.data.node);
    }
  }
})();
