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

    this.neighbors = [];

    this.id = options.id;
    this.label = options.label;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.size = options.size || '10';
    this.color = options.color || '#000';

    /* Public methods */
    this.connect = connect;
    this.notify = notify;
    this.update = update;

    function connect(newNeighbor) {
      this.neighbors.push(newNeighbor);
      newNeighbor.update(this);
    }

    function notify() {
      this.neighbors.forEach(function(neighbor) {
        neighbor.update(this);
      });
    }

    function update(sourceNode) {
      if (this.x - sourceNode.x > 1) {
        this.x = sourceNode.x + 1;
      }

      if (sourceNode.neighbors.length > 1) {
        var thisNode = this;
        sourceNode.neighbors.some(function(node) {
          if (node.id !== thisNode.id) {
            --node.y;
          } else {
            return false;
          }
        });
        ++thisNode.y;
      }
    }
  }
}());
