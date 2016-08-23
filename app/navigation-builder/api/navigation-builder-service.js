(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.model.MapFactory',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.NavigationInspectorService'
  ];

  function service(MapFactory, RouteBuilderService, NavigationInspectorService) {
    var self = this;
    var _survey = {};
    var _navigationMap = {};
    var _activeServiceMode = null;

    self.mapData = null;

    /* Public methods */
    self.navigationMap = navigationMap;
    self.nodes = nodes;
    self.edges = edges;
    self.setSurvey = setSurvey;
    self.selectNode = selectNode;
    self.selectedNode = selectedNode;
    self.selectedNavigation = selectedNavigation;
    self.selectedNodeFamily = selectedNodeFamily;
    self.selectedEdges = selectedEdges;
    self.activateRouteCreatorMode = activateRouteCreatorMode;
    self.activateNavigationInspectorMode = activateNavigationInspectorMode;
    self.deactiveMode = deactiveMode;

    function navigationMap() {
      return _navigationMap;
    }

    function nodes() {
      return _navigationMap.nodes();
    }

    function edges() {
      return _navigationMap.edges();
    }

    function setSurvey(survey) {
      _survey = survey;
      _loadTemplateNavigations(survey.NavigationManager.getNavigationList());
    }

    function selectNode(node) {
      _activeServiceMode.selectNode(node);
    }

    function selectedNode() {
      return _activeServiceMode.selectedNode();
    }

    function selectedNavigation() {
      return _activeServiceMode.selectedNavigation();
    }

    function selectedNodeFamily() {
      return _activeServiceMode.selectedNodeFamily();
    }

    function selectedEdges() {
      return _activeServiceMode.selectedEdges();
    }

    function activateRouteCreatorMode() {
      _activeServiceMode = RouteBuilderService;
      _activeServiceMode.activate(_survey);
    }

    function activateNavigationInspectorMode() {
      _activeServiceMode = NavigationInspectorService;
    }

    function deactiveMode() {
      return _activeServiceMode.end();
    }

    function _addNodes(templateNavigations) {
      templateNavigations.forEach(function(navigation) {
        var nodeOptions = { id: navigation.origin, label: navigation.origin };
        var node = _navigationMap.createNode(nodeOptions);
        node.navigation = navigation;
        _navigationMap.addNode(node);
      });
    }

    function _addEdges(templateNavigations) {
      templateNavigations.forEach(function(navigation) {

        navigation.routes.forEach(function(route) {
          var edgeOptions = {};
          edgeOptions.id = navigation.origin;
          edgeOptions.source = route.origin;
          edgeOptions.target = route.destination;
          var edge = _navigationMap.createEdge(edgeOptions);
          edge.route = route;
          _navigationMap.addEdge(edge);
        });

      });
    }

    function _loadTemplateNavigations(templateNavigations) {
      _navigationMap = MapFactory.create();
      _addNodes(templateNavigations);
      _addEdges(templateNavigations);
    }
  }
})();
