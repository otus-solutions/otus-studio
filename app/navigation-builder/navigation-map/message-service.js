(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.MessageService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.log = log;

    function log(message) {
      console.log(message);
    }
  }
})();
