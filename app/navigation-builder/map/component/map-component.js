(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      controller: 'otusNavigationMapCtrl as $ctrl',
      templateUrl: 'app/navigation-builder/map/component/map-template.html'
    }).controller('otusNavigationMapCtrl', Controller);

  Controller.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function Controller(moduleScope, GraphLayerService, NavigationBuilderService) {
    var self = this;
    // var _messageLayer = null;

    /* Public methods */
    self.$onInit = onInit;

    function onInit() {
      moduleScope.onEvent(moduleScope.NBEVENTS.MAP_CONTAINER_READY, _renderMap);
      self.toolsCtrl = new ToolsController(NavigationBuilderService, GraphLayerService);
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();

      GraphLayerService.initialize();
      GraphLayerService.loadData(nodes, edges);
      GraphLayerService.render();
    }
  }

  function ToolsController(NavigationBuilderService, GraphLayerService) {
    var self = this;
    self.routePriorityButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.addRouteButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.inspectButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.modificationButtonRoutePriority = false;
    self.modificationButtonInspect = false;
    self.isPressButtonAddRoute = false;

    /* Public methods */
    self.$onInit = onInit;
    self.addRoute = addRoute;
    self.editRoutePriority = editRoutePriority;
    self.inspect = inspect;
    self.resetDefaultToStatusButton = resetDefaultToStatusButton;

    onInit();

    function onInit() {
      GraphLayerService.resetDefaultToInteractionButton(resetDefaultToStatusButton);
    }

    function addRoute() {
      self.isPressButtonAddRoute = !self.isPressButtonAddRoute;
      self.modificationButtonRoutePriority = false;
      self.modificationButtonInspect = false;
      _setSelected();
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function editRoutePriority() {
      self.isPressButtonAddRoute = false;
      self.modificationButtonRoutePriority = !self.modificationButtonRoutePriority;
      self.modificationButtonInspect = false;
      _setSelected();
      NavigationBuilderService.editRoutePriorityState(self.modificationButtonRoutePriority);
    }

    function inspect() {
      self.isPressButtonAddRoute = false;
      self.modificationButtonRoutePriority = false;
      self.modificationButtonInspect = !self.modificationButtonInspect;
      _setSelected();
      NavigationBuilderService.activateNavigationInspectorMode(self.modificationButtonInspect);
    }

    function resetDefaultToStatusButton() {
      self.routePriorityButtonClass = _changeModificationButtonClass(false);
      self.inspectButtonClass = _changeModificationButtonClass(false);
      self.addRouteButtonClass = _changeModificationButtonClass(false);
      self.isPressButtonAddRoute = false;
      self.modificationButtonRoutePriority = false;
      self.modificationButtonInspect = false;
    }

    function _setSelected() {
      self.routePriorityButtonClass = _changeModificationButtonClass(self.modificationButtonRoutePriority);
      self.inspectButtonClass = _changeModificationButtonClass(self.modificationButtonInspect);
      self.addRouteButtonClass = _changeModificationButtonClass(self.isPressButtonAddRoute);
      if (self.isPressButtonAddRoute) {
        self.addRouteButtonClass = _changeModificationButtonClass(self.isPressButtonAddRoute);
        self.routePriorityButtonClass = _changeModificationButtonClass(false);
        self.inspectButtonClass = _changeModificationButtonClass(false);
      } else if (self.modificationButtonRoutePriority) {
        self.addRouteButtonClass = _changeModificationButtonClass(false);
        self.routePriorityButtonClass = _changeModificationButtonClass(self.modificationButtonRoutePriority);
        self.inspectButtonClass = _changeModificationButtonClass(false);
      } else if (self.modificationButtonInspect) {
        self.addRouteButtonClass = _changeModificationButtonClass(false);
        self.routePriorityButtonClass = _changeModificationButtonClass(false);
        self.inspectButtonClass = _changeModificationButtonClass(self.modificationButtonInspect);
      }
    }

    function _changeModificationButtonClass(selectedState) {
      if (!selectedState) {
        return ['md-fab', 'md-raised', 'md-mini'];
      } else {
        return ['md-fab', 'md-no-focus', 'md-mini'];
      }
    }
  }
})();
