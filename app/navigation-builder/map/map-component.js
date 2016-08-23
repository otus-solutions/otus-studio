(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/map/map-template.html',
      controller: component
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.MapVisualHandlerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService',
    'otusjs.studio.navigationBuilder.messenger.InstructorService'
  ];

  function component(scopeService, MapVisualHandlerService, NavigationBuilderService, NavigationMessengerService) {
    var self = this;

    self.showMessenger = true;

    /* Component cicle methods */
    self.$onInit = onInit;

    function onInit() {
      _initializeComponents();
      _initializeModuleEvents();
    }

    function _initializeComponents() {
      self.routeMenuCtrl = new routeMenuController(NavigationBuilderService);
    }

    function _initializeModuleEvents() {
      scopeService.onEvent(scopeService.NBEVENTS.MAP_CONTAINER_READY, function(event, data) {
        MapVisualHandlerService.loadMapView(new sigma('map-view'));
        _renderMap();
      });
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();
      MapVisualHandlerService.loadMapData(nodes, edges);
      MapVisualHandlerService.drawMap();
    }
  }

  function routeMenuController(NavigationBuilderService) {
    var self = this;

    _init();

    /* Public methods */
    self.click = click;
    self.addRoute = addRoute;

    function click() {
      self.isOpen = !self.isOpen;
    }

    function addRoute() {
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function _init() {
      self.isOpen = false;
    }
  }
})();
