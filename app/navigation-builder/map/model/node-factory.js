(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.NodeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;

    function create(options, isDefault) {
      return new Node(options, isDefault);
    }

    return self;
  }

  function Node(options, isDefault) {
    var self = this;

    this.inNeighbors = [];
    this.outNeighbors = [];

    this.index = options.index;
    this.id = options.id;
    this.label = options.label;
    this.x = options.x || 0;
    this.y = isDefault ? 0 : -1;
    this.size = options.size || '10';
    this.color = options.color || '#000';
    this.isDefault = isDefault;

    /* Public methods */
    this.connectIn = connectIn;
    this.connectOut = connectOut;
    this.updatePosition = updatePosition;

    function connectIn(newNeighbor) {
      this.inNeighbors.push(newNeighbor);
      this.updatePosition(newNeighbor);
    }

    function connectOut(newNeighbor) {
      this.outNeighbors.push(newNeighbor);
      newNeighbor.connectIn(this);
    }

    function updatePosition(inNeighbor) {
      this.x = inNeighbor.x + 1;
    }
  }
}());
