(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationBuilder', {
      controller: component,
      template: `<otus-navigation-map-panel layout="row" flex></otus-navigation-map-panel>`
    });

  component.$inject = [
    '$scope',
    '$element'
  ];

  function component($scope, $element) {
    var self = this;

    self.selectNode = selectNode;

    function selectNode(node) {
      self.selectedNode = node;
    }
  }
})();
