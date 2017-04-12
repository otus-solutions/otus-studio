(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService', service);

  service.$inject = [
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
    'otusjs.studio.navigationBuilder.routeBuilder.DataService',
    'otusjs.studio.navigationBuilder.routeBuilder.ModuleEventService',
    'otusjs.studio.navigationBuilder.routeBuilder.UiEventsService'
  ];

  function service(moduleScope, DataService, ModuleEventService, UiEventsService) {
    var self = this;
    var _isNewRoute;

    /* Public methods */
    // Service management
    self.activate = activate;
    self.deactivate = deactivate;
    // Route editor
    self.createCondition = createCondition;
    self.deleteCondition = deleteCondition;
    self.isNewRoute = isNewRoute;
    self.saveRouteBuilding = saveRouteBuilding;
    self.selectCondition = selectCondition;
    self.selectedCondition = selectedCondition;
    self.selectedRoute = selectedRoute;
    self.startRouteBuilding = startRouteBuilding;
    self.cancelRouteBuilding = cancelRouteBuilding;
    self.deleteRoute = deleteRoute;
    // Rule editor
    self.createRule = createRule;
    self.deleteRule = deleteRule;
    self.getAnswerListForRule = getAnswerListForRule;
    self.getOperatorListForRule = getOperatorListForRule;
    self.getWhenListForRule = getWhenListForRule;
    self.updateRule = updateRule;

    //-----------------------------------------------------
    // Service management
    //-----------------------------------------------------

    function activate(survey) {
      DataService.activate(survey);
      UiEventsService.activate();
      ModuleEventService.activate();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_ON);
    }

    function deactivate() {
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_MODE_OFF);
      DataService.deactivate();
      ModuleEventService.deactivate();
      UiEventsService.deactivate();
    }

    //-----------------------------------------------------
    // Route editor
    //-----------------------------------------------------

    function createCondition() {
      DataService.createCondition();
    }

    function isNewRoute() {
      return _isNewRoute;
    }

    function deleteCondition(index) {
      DataService.deleteCondition(index);
    }

    function saveRouteBuilding() {
      DataService.apply();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_BUILD_SAVED);
    }

    function deleteRoute() {
      DataService.deleteRoute();
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_DELETED);
    }

    function selectCondition(index) {
      DataService.selectCondition(index);
    }

    function selectedCondition() {
      return DataService.selectedCondition();
    }

    function selectedRoute() {
      return DataService.selectedRoute();
    }

    function startRouteBuilding(origin, destination) {
      if (DataService.routeExists(origin, destination)) {
        DataService.useCurrentRouteData();
        _isNewRoute = false;
      } else {
        DataService.initializeRouteData();
        DataService.createCondition();
        _isNewRoute = true;
      }
      DataService.selectCondition(0);
    }

    function cancelRouteBuilding() {
      moduleScope.emit(moduleScope.NBEVENTS.ROUTE_BUILD_CANCELED);
    }

    //-----------------------------------------------------
    // Rule editor
    //-----------------------------------------------------

    function createRule(when, operator, answer, isCustom) {
      if (when.type == 'CheckboxQuestion' && answer instanceof Object && !answer.isMetadata) {
        isCustom = true;
        answer = answer.option.customOptionID;
        DataService.createRule(when, operator, answer, isCustom);
      } else {
        DataService.createRule(when, operator, answer, isCustom);
      }
    }

    function deleteRule(ruleIndex) {
      DataService.deleteRule(ruleIndex);
    }

    function getAnswerListForRule(question) {
      return DataService.listAvailableAnswer(question);
    }

    function getOperatorListForRule(itemType) {
      return DataService.listAvailableOperator(itemType);
    }

    function getWhenListForRule() {
      return DataService.listAvailableWhen();
    }

    function updateRule(ruleIndex, when, operator, answer, isCustom) {
      DataService.updateRule(ruleIndex, when, operator, answer, isCustom);
    }
  }
})();
