describe('NodeFactory', function() {

  var Mock = {};
  var factory = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockNodeOptions();

    inject(function(_$injector_) {
      factory = _$injector_.get('otusjs.studio.navigationBuilder.NodeFactory');
    });
  });

  describe('create method', function() {

    var node = {};

    beforeEach(function() {
      node = factory.create(Mock.options);
    });

    it('should return an object property id defined', function() {
      expect(node.id).toBeDefined();
    });

    it('should return an object property label defined', function() {
      expect(node.label).toBeDefined();
    });

    it('should return an object property x defined', function() {
      expect(node.x).toBeDefined();
    });

    it('should return an object property y defined', function() {
      expect(node.y).toBeDefined();
    });

    it('should return an object property size defined', function() {
      expect(node.size).toBeDefined();
    });

    it('should return an object property color defined', function() {
      expect(node.color).toBeDefined();
    });

  });

  function mockNodeOptions() {
    Mock.options = {};
    Mock.options.id = 'value';
    Mock.options.label = 'value';
    Mock.options.x = 0;
    Mock.options.y = 0;
    Mock.options.size = 'value';
    Mock.options.color = 'value';
  }

});
