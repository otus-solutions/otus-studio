(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusRouteEditor', {
      templateUrl: 'app/navigation-builder/route/editor/route-editor.html',
      controller: component,
      bindings: {
        originNode: '<',
        destinationNode: '<'
      }
    });

  component.$inject = [
    '$scope',
    '$element',
    'NBEVENTS',
    'otusjs.studio.navigationBuilder.NavigationBuilderService'
  ];

  function component($scope, $element, NBEVENTS, NavigationBuilderService) {
    var self = this;
    var _conditionCounter = 1;

    self.selectedRoute = {};
    self.routeConditions = {};

    /* Public methods */
    self.$onInit = onInit;
    self.addCondition = addCondition;

    function onInit() {
      if (self.originNode) {
        self.routeConditions = self.originNode.navigation.routes[0].conditions;
      }
    }

    function addCondition() {
      self.routeConditions[_conditionCounter] = {
        name: 'CONDIÇÃO ' + _conditionCounter,
        rules: []
      };
      ++_conditionCounter;
    }

    function selectCondition(condition) {
      self.selectedCondition = condition;
    }
  }
})();
