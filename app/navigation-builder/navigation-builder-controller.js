(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .controller('otusjs.studio.navigationBuilder.NavigationBuilderController', controller);

  controller.$inject = [
    '$scope',
    'otusjs.studio.navigationBuilder.NavigationBuilderScopeService'
  ];

  function controller($scope, NavigationBuilderScopeService) {
    var self = this;

    NavigationBuilderScopeService.initialize($scope);
  }
}());
