xdescribe('Map', function() {

  var Mocks = {};
  var factory = {};
  var map = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      mockNodeFactory(_$injector_);
      mockEdgeFactory(_$injector_);

      factory = _$injector_.get('otusjs.studio.navigationBuilder.MapFactory', Mocks);
      map = factory.create();
    });
  });

  describe('createNode method', function() {

    it('should call NodeFactory.create with options', function() {
      spyOn(Mocks.NodeFactory, 'create');

      var options = {id: 'N1', label: 'Node 1'};
      map.createNode(options);

      expect(Mocks.NodeFactory.create).toHaveBeenCalledWith(options);
    });

  });

  describe('createEdge method', function() {

    it('should call EdgeFactory.create with options', function() {
      spyOn(Mocks.EdgeFactory, 'create');

      var options = {id: 'E1', source: 'N1', target: 'N2'};
      map.createEdge(options);

      expect(Mocks.EdgeFactory.create).toHaveBeenCalledWith(options);
    });

  });

  describe('addNode method', function() {

    it('should put the node in node list', function() {
      map.addNode(map.createNode({id: 'N1', label: 'Node 1'}));

      expect(map.nodes().length).not.toBe(0);
    });

    it('should not put the node in node list if already exist', function() {
      map.addNode(map.createNode({id: 'N1', label: 'Node 1'}));
      map.addNode(map.createNode({id: 'N2', label: 'Node 1'}));
      map.addNode(map.createNode({id: 'N1', label: 'Node 1'}));

      expect(map.nodes().length).toBe(2);
    });

  });

  describe('addEdge method', function() {

    it('should put the node in node list', function() {
      map.addNode(map.createNode({id: 'N1', label: 'Node 1'}));
      map.addNode(map.createNode({id: 'N2', label: 'Node 2'}));

      map.addEdge(map.createEdge({id: 'E1', source: 'N1', target: 'N2'}));
      expect(map.edges().length).not.toBe(0);
    });

    it('should not add edge if source node does not exist', function() {
      map.addNode(map.createNode({id: 'N2', label: 'Node 2'}));

      map.addEdge(map.createEdge({id: 'E1', source: 'N1', target: 'N2'}));
      expect(map.edges().length).toBe(0);
    });

    it('should not add edge if target node does not exist', function() {
      map.addNode(map.createNode({id: 'N1', label: 'Node 1'}));

      map.addEdge(map.createEdge({id: 'E1', source: 'N1', target: 'N2'}));
      expect(map.edges().length).toBe(0);
    });

  });

  function mockNodeFactory($injector) {
    Mocks.NodeFactory = $injector.get('otusjs.studio.navigationBuilder.NodeFactory');
  }

  function mockEdgeFactory($injector) {
    Mocks.EdgeFactory = $injector.get('otusjs.studio.navigationBuilder.EdgeFactory');
  }

});
