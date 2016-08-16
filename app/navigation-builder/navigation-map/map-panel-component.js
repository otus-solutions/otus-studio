(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .component('otusNavigationMapPanel', {
      template: `
      <otus-navigation-map layout="column" flex></otus-navigation-map>
      `,
      controller: controller
    });

  controller.$inject = [
    '$scope',
    '$element'
  ];

  function controller($scope, $element) {
    var self = this;
  }

})();
