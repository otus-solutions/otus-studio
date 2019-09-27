(function () {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.NavigationBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.MapFactory',
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.navigationInspector.NavigationInspectorService',
    'otusjs.studio.navigationBuilder.navigationRoutePriority.NavigationRoutePriorityService'
  ];

  function service(moduleScope, MapFactory, RouteBuilderService, NavigationInspectorService, NavigationRoutePriorityService) {
    var self = this;
    var _survey = null;
    var _navigationMap = {};
    var _activeServiceMode = null;

    /* Public methods */
    self.nodes = nodes;
    self.edges = edges;
    self.setSurvey = setSurvey;
    self.activateRouteCreatorMode = activateRouteCreatorMode;
    self.editRoutePriorityState = editRoutePriorityState;
    self.activateNavigationInspectorMode = activateNavigationInspectorMode;
    self.deactiveMode = deactiveMode;
    self.reloadMapData = reloadMapData;

    function nodes(ids) {
      return _navigationMap.nodes(ids);
    }

    function edges() {
      return _navigationMap.edges();
    }

    function setSurvey(survey) {
      _survey = survey;
      _loadTemplateNavigations(survey.NavigationManager.getNavigationList());
    }

    function activateRouteCreatorMode() {
      deactiveMode();
      _activeServiceMode = RouteBuilderService;
      _activeServiceMode.activate(_survey);
    }

    function activateNavigationInspectorMode(activate) {
      deactiveMode();
      if (activate) {
        _activeServiceMode = NavigationInspectorService;
        _activeServiceMode.activate(_survey);
      }
    }

    function editRoutePriorityState(activate) {
      deactiveMode();
      if (activate) {
        _activeServiceMode = NavigationRoutePriorityService;
        _activeServiceMode.activate(_survey);
      }
    }

    function deactiveMode() {
      if (_activeServiceMode) {
        return _activeServiceMode.deactivate();
      }
    }

    function reloadMapData() {
      _loadTemplateNavigations(_survey.NavigationManager.getNavigationList());
    }

    function _loadTemplateNavigations(templateNavigations) {
      _navigationMap = MapFactory.create();
      _addNodes(templateNavigations);
      _addEdges(templateNavigations);
      moduleScope.store('map', _navigationMap);
    }

    function getCustomIDs() {
      return _survey.SurveyItemManager.getItemList();
    }

    function _addNodes(templateNavigations) {
      var items = getCustomIDs();
      templateNavigations.forEach(function (navigation, index) {
        var options = {};
        options.id = navigation.origin;
        if (index > 1 && index < (items.length + 2)) {
          options.label = items[index - 2].customID;
        }
        options.index = navigation.index;
        options.isOrphan = navigation.isOrphan();
        options.isMyRootOrphan = navigation.hasOrphanRoot();
        var group = _inGroup(navigation.origin)
        if (group) {
          options.inGroup = true;
          options.positionInGroup = group.position;
        } else {
          options.inGroup = false;
          options.positionInGroup = undefined;
        }
        _navigationMap.createNode(options);
      });
    }

    function _addEdges(templateNavigations) {
      templateNavigations.forEach(function (navigation) {
        navigation.routes.forEach(function (route) {
          var options = {};
          options.source = route.origin;
          options.target = route.destination;
          options.isFromOrphan = navigation.isOrphan();

          if (route.isDefault) {
            _navigationMap.createEdgeForDefaultPath(options);
          } else {
            _navigationMap.createEdgeForAlterantivePath(options);
          }
        });
      });
    }

    function _inGroup(identity) {
      var result = undefined;
      _survey.SurveyItemGroupManager.getSurveyItemGroupList().some(function (groups) {
        return groups.members.some(function (member) {
          if (member.id === identity) {
            result = member;
            return;
          }
        });
      });
      return result;
    }
  }
})();
