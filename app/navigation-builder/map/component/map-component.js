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
      self.toolsCtrl = new ToolsController(NavigationBuilderService);
      moduleScope.onEvent(moduleScope.NBEVENTS.MAP_CONTAINER_READY, _renderMap);
    }

    function _renderMap() {
      var nodes = NavigationBuilderService.nodes();
      var edges = NavigationBuilderService.edges();

      GraphLayerService.initialize();
      GraphLayerService.loadData(nodes, edges);
      GraphLayerService.render();
    }
  }

  function ToolsController(NavigationBuilderService) {
    var self = this;
    self.routePriorityButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.addRouteButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.inspectButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.modificationButtonRoutePriority = false;
    self.modificationButtonInspect = false;

    /* Public methods */
    self.addRoute = addRoute;
    self.editRoutePriority = editRoutePriority;
    self.inspect = inspect;
    self.changeModificationButtonClass = changeModificationButtonClass;

    function editRoutePriority() {
      self.modificationButtonRoutePriority = !self.modificationButtonRoutePriority;
      self.modificationButtonInspect = false;
      _setSelected();
      NavigationBuilderService.editRoutePriorityState(self.modificationButtonRoutePriority);
    }

    function addRoute() {
      self.modificationButtonRoutePriority = !self.modificationButtonRoutePriority;
      self.modificationButtonInspect = !self.modificationButtonInspect;
      self.modificationButtonRoutePriority = false;
      self.modificationButtonInspect = false;
      _setSelected();
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function inspect() {
      self.modificationButtonInspect = !self.modificationButtonInspect;
      self.modificationButtonRoutePriority = false;
      _setSelected();
      NavigationBuilderService.activateNavigationInspectorMode(self.modificationButtonInspect);
    }

    function _setSelected() {
      self.routePriorityButtonClass = changeModificationButtonClass(self.modificationButtonRoutePriority);
      self.inspectButtonClass = changeModificationButtonClass(self.modificationButtonInspect);
      if (self.modificationButtonRoutePriority) {
        self.routePriorityButtonClass = changeModificationButtonClass(self.modificationButtonRoutePriority);
        self.inspectButtonClass = changeModificationButtonClass(false);
      } else if (self.modificationButtonInspect) {
        self.routePriorityButtonClass = changeModificationButtonClass(false);
        self.inspectButtonClass = changeModificationButtonClass(self.modificationButtonInspect);
      }
    }

    function changeModificationButtonClass(selectedState) {
      if (!selectedState) {
        return ['md-fab', 'md-raised', 'md-mini'];
      } else {
        return ['md-fab', 'md-no-focus', 'md-mini'];
      }
    }
  }
})();
