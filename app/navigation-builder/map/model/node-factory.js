(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.NodeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;

    function create(options) {
      return new Node(options);
    }

    return self;
  }

  function Node(options) {
    var self = this;
    self.id = options.id;
    self.label = options.label;
    self.x = options.x || 0;
    self.y = options.y || 0;
    self.size = options.size || '10';
    self.color = options.color || '#000';
  }
}());
