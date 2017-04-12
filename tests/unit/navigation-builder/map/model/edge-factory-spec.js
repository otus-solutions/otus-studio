describe('EdgeFactory', function() {

  var Mock = {};
  var factory = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockEdgeOptions();

    inject(function(_$injector_) {
      factory = _$injector_.get('otusjs.studio.navigationBuilder.EdgeFactory');
    });
  });

  describe('create method', function() {

    var edge = {};

    beforeEach(function() {
      edge = factory.create(Mock.options);
    });

    it('should return an object property id defined', function() {
      expect(edge.id).toBeDefined();
    });

    it('should return an object property source defined', function() {
      expect(edge.source).toBeDefined();
    });

    it('should return an object property target defined', function() {
      expect(edge.target).toBeDefined();
    });

  });

  function mockEdgeOptions() {
    Mock.options = {};
    Mock.options.id = 'value';
    Mock.options.source = 'value';
    Mock.options.target = 'value';
  }

});
