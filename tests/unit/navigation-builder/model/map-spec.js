describe('Map', function() {

  var factory = {};
  var map = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      factory = _$injector_.get('otusjs.studio.navigationBuilder.model.MapFactory');
      map = factory.create();
    });
  });

  describe('createNode method', function() {

    it('should return an instance of Node', function() {
      var object = map.createNode({id: 'N1', label: 'Node 1'});
      expect(object.constructor.name).toBe('Node');
    });

  });

  describe('createEdge method', function() {

    it('should return an instance of Edge', function() {
      var object = map.createEdge({id: 'E1', source: 'N1', target: 'N2'});
      expect(object.constructor.name).toBe('Edge');
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

});
