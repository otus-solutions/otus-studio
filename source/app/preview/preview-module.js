(function () {
  'use strict';

  angular.module('preview', []).run(runner);

  runner.$inject = [
    '$injector'
  ];

  function runner($injector) {
    var application = $injector.get('PlayerService');
    application.setup();
  }

}());
