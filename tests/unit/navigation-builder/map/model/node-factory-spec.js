describe('NodeFactory', function () {

  var Mock = {};
  var factory = {};

  beforeEach(function () {
    angular.mock.module('studio');

    _mockToNodeFactory();

    inject(function (_$injector_) {
      factory = _$injector_.get(
        'otusjs.studio.navigationBuilder.NodeFactory');
    });
  });

  describe('create method', function () {

    var node = {};

    beforeEach(function () {
      node = factory.create(Mock.options);
    });

    it('should return an object property id defined', function () {
      expect(node.id).toBeDefined();
    });

    it('should return an object property label defined', function () {
      expect(node.label).toBeDefined();
    });

    it('should return an object property x defined', function () {
      expect(node.x).toBeDefined();
    });

    it('should return an object property y defined', function () {
      expect(node.y).toBeDefined();
    });

    it('should return an object property size defined', function () {
      expect(node.size).toBeDefined();
    });

    it('should return an object property color defined', function () {
      expect(node.color).toBeDefined();
    });

  });

  describe('orderNavigationByPriorityInMap method', function () {
    var node = {};

    beforeEach(function () {
      node = factory.create(Mock.options);
      node.connectOut(Mock.neighbor_1, false);
      node.connectOut(Mock.neighbor_2, false);
    });

    it('when list is not modification then should return elements in original positions', function () {

      expect(node.outNeighbors[0].id).toEqual('FORM2');
      expect(node.outNeighbors[1].id).toEqual('END NODE');
    });

    it('when list is modification then should return elements in positions defined', function () {
      node.orderNavigationByPriorityInMap(0, 0 + 1);

      expect(node.outNeighbors[0].id).toEqual('END NODE');
      expect(node.outNeighbors[1].id).toEqual('FORM2');
    });
  });

  function _mockToNodeFactory() {
    Mock.options = {
      color: "#616161",
      id: "FORM1",
      index: 2,
      isMyRootOrphan: false,
      isOrphan: false,
      label: "FORM1a"
    };

    Mock.neighbor_1 = {
      id: 'FORM2',
      connectIn: function () { }
    };
    Mock.neighbor_2 = {
      id: 'END NODE',
      connectIn: function () { }
    };
  }

});
