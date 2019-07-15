(function () {
  'use strict';

  angular
    .module('resource.ui')
    .component('studioVariableHeader', {
      controller: 'studioVariableHeaderCtrl as $ctrl',
      templateUrl: 'app/resource/ui/variable-header-template.html'
    });
}());