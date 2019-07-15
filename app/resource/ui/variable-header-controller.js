(function () {
  'use strict';

  angular
    .module('resource.ui')
    .controller('studioVariableHeaderCtrl', Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;
    /* Public methods */

    self.variables = [1, 2];


  }
}());
