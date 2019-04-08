(function () {
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
      var initialNodes = ['BEGIN NODE', 'END NODE'];
      var node;
      if (initialNodes.indexOf(options.id) > -1) {
        node = _createInitialNode(options);
      } else {
        options.color = options.isOrphan ? '#571616' : '#616161';
        node = new Node(options);
      }
      return node;
    }

    function _createInitialNode(options) {
      options.color = '#A30';
      options.y = 0;
      options.label = options.id === 'BEGIN NODE' ? 'Início' : 'Fim';
      options.isDisabled = options.id === 'BEGIN NODE' ? true : false;
      return new Node(options);
    }

    function createForDefaultPath(options) {
      options.y = 0;
      options.color = options.isOrphan ? '#571616' : '#448AFF';
      options.isDefault = true;
      return new Node(options);
    }

    function createForAlterantivePath(options) {
      options.color = options.isOrphan ? '#571616' : '#616161';
      options.isDefault = false;
      return new Node(options);
    }

    return self;
  }

  function Node(options) {
    this.defaultNextNode = null;
    this.inNeighbors = [];
    this.outNeighbors = [];

    this.isDisabled = options.isDisabled || false;
    this.index = options.index;
    this.id = options.id;
    this.label = options.label;
    this.x = options.x || 0;
    this.y = _calculateInitialY();
    this.size = options.size || '10';
    this.color = options.color || '#000';
    this.isDefault = _isDefault();
    this.isOrphan = options.isOrphan || false;

    /* Public methods */
    this.connectIn = connectIn;
    this.connectOut = connectOut;
    this.updatePosition = updatePosition;
    this.isMyDefaultNext = isMyDefaultNext;
    this.orderNavigationByPriorityInMap = orderNavigationByPriorityInMap;

    //TODO: OS-2 correction for bug of duplicated node caused by multiple calls on this function - line 77 & 91
    function connectIn(newNeighbor, isDefaultConnection) {
      var isFound = this.inNeighbors.filter(function (neighbor) {
        return neighbor.id == newNeighbor.id
      });

      if (isFound.length == 0) {
        this.inNeighbors.push(newNeighbor);
      }
      if (!this.isDefault) {
        this.isDefault = newNeighbor.isDefault && isDefaultConnection;
      }
      this.updatePosition(newNeighbor);
    }

    function connectOut(newNeighbor, isDefaultConnection) {
      var isFound = this.outNeighbors.filter(function (neighbor) {
        return neighbor.id == newNeighbor.id
      });

      if (isFound.length == 0) {
        this.outNeighbors.push(newNeighbor);
      }

      if (isDefaultConnection) {
        this.defaultNextNode = newNeighbor;
      }

      newNeighbor.connectIn(this, isDefaultConnection);
    }

    function updatePosition(inNeighbor) {
      var defaultRouteCount = 0;
      var myDefaultParentY;

      this.inNeighbors.forEach(function (neighbor) {
        if (neighbor.isMyDefaultNext(this)) {
          if (!myDefaultParentY) {
            myDefaultParentY = neighbor.y;
          }
          ++defaultRouteCount;
        }
      }, this);

      if (options.isMyRootOrphan) {
        this.y = 1;
      } else if (this.isDefault) {
        this.y = 0;
      } else if (defaultRouteCount > 0) {
        this.y = myDefaultParentY;
      } else {
        var inCount = this.inNeighbors.length;
        this.y = ((inCount) / (!(inCount % 2) ? 1 : 2)) * (-1);
      }
    }

    function isMyDefaultNext(node) {
      return this.defaultNextNode && this.defaultNextNode.id === node.id;
    }

    function orderNavigationByPriorityInMap(oldPosition, newPosition) {
      var aux = this.outNeighbors[newPosition];
      this.outNeighbors[newPosition] = this.outNeighbors[oldPosition];
      this.outNeighbors[oldPosition] = aux;
      return this.outNeighbors;
    }

    function _calculateInitialY() {
      if (options.isOrphan || options.isMyRootOrphan) {
        return 1;
      } else {
        return options.y || 0;
      }
    }

    function _isDefault() {
      if (options.index === 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}());
