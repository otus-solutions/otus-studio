(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMap', {
      templateUrl: 'app/navigation-builder/map/component/map-template.html',
      controller: component
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.GraphLayerService',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function component(moduleScope, GraphLayerService, NavigationBuilderService) {
    var self = this;
    // var _messageLayer = null;

    /* Publi methods */
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
    self.modificationButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.AddRouteButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.InspectButtonClass = ['md-fab', 'md-raised', 'md-mini'];
    self.modificationButtonRoutePriority = false;
    self.modificationButtonInspect = false;

    /* Public methods */
    self.addRoute = addRoute;
    self.editRoutePriority = editRoutePriority;
    self.inspect = inspect;
    self.changeModificationButtonStyle = changeModificationButtonStyle;

    function editRoutePriority() {
      self.modificationButtonRoutePriority = !self.modificationButtonRoutePriority;
      self.modificationButtonInspect = false;
      setSelected();
      NavigationBuilderService.editRoutePriorityState(self.modificationButtonRoutePriority);
    }

    function addRoute() {
      self.modificationButtonRoutePriority = !self.modificationButtonRoutePriority;
      self.modificationButtonInspect = !self.modificationButtonInspect;
      self.modificationButtonRoutePriority = false;
      self.modificationButtonInspect = false;
      setSelected();
      NavigationBuilderService.activateRouteCreatorMode();
    }

    function inspect() {
      self.modificationButtonInspect = !self.modificationButtonInspect;
      self.modificationButtonRoutePriority = false;
      setSelected();
      NavigationBuilderService.activateNavigationInspectorMode(self.modificationButtonInspect);
    }

    function setSelected(){
      self.modificationButtonClass = changeModificationButtonStyle(self.modificationButtonRoutePriority);
      self.InspectButtonClass = changeModificationButtonStyle(self.modificationButtonInspect);
      if(self.modificationButtonRoutePriority){
        self.modificationButtonClass = changeModificationButtonStyle(self.modificationButtonRoutePriority);
        self.InspectButtonClass = changeModificationButtonStyle(false);
      } else if(self.modificationButtonInspect){
        self.modificationButtonClass = changeModificationButtonStyle(false);
        self.InspectButtonClass = changeModificationButtonStyle(self.modificationButtonInspect);
      }
    }

    function changeModificationButtonStyle(selectedState) {
      if (!selectedState) {
        return  ['md-fab', 'md-raised', 'md-mini']
      } else {
        return  ['md-fab', 'md-no-focus', 'md-mini']
      }
    }
  }
})();
