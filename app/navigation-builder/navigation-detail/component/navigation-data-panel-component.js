(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationDataPanel', {
      templateUrl: 'app/navigation-builder/navigation-detail/component/navigation-data-panel.html',
      controller: component,
      bindings: {
        navigation: '<'
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

    var ci = 1;

    self.selectedRoute = {};

    /* Public methods */
    self.$onInit = onInit;
    self.openRouteDetail = openRouteDetail;
    self.addCondition = addCondition;

    function onInit() {
      self.open = false;
    }

    function openRouteDetail(route) {
      self.selectedRoute = route;
      self.open = !self.open;
    }

    function addCondition() {
      self.selectedRoute.conditionSet[ci] = {
        name: 'CONDIÇÃO ' + ci
      };
      ++ci;
    }
  }
})();
