(function () {
  'use strict';

  angular
    .module('resource.ui')
    .component('studioStaticVariable', {
      controller: 'studioStaticVariableCtrl as $ctrl',
      templateUrl: 'app/resource/ui/static-variable/static-variable-template.html'
    });
}());