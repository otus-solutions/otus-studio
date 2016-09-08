(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .factory('otusjs.studio.navigationBuilder.NodeFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.createForDefaultPath = createForDefaultPath;
    self.createForAlterantivePath = createForAlterantivePath;

    function create(options) {
      return new Node(options);
    }

    function createForDefaultPath(options) {
      options.y = 0;
      options.color = options.isOrphan ? '#571616' : '#448AFF';
      options.isDefault = true;
      return new Node(options);
    }

    function createForAlterantivePath(options) {
      options.x = -1;
      options.color = options.isOrphan ? '#571616' : '#616161';
      options.isDefault = false;
      return new Node(options);
    }

    return self;
  }

  function Node(options) {
    this.inNeighbors = [];
    this.outNeighbors = [];

    this.index = options.index;
    this.id = options.id;
    this.label = options.label;
    this.x = options.x || 0;
    this.y = options.x || 0;
    this.size = options.size || '10';
    this.color = options.color || '#000';
    this.isDefault = options.isDefault || false;
    this.isOrphan = options.isOrphan || false;

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
