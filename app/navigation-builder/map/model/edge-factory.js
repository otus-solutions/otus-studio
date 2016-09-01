(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.EdgeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;

    function create(options) {
      return new Edge(options);
    }

    return self;
  }

  function Edge(options) {
    var self = this;
    self.id = options.source + '_' + options.target;
    self.source = options.source;
    self.target = options.target;
  }
}());
