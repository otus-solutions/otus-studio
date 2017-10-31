describe('MapFactory', function() {

  var factory = {};

  beforeEach(function() {
    angular.mock.module('otusjs.studio.navigationBuilder');

    inject(function(_$injector_) {
      factory = _$injector_.get(
        'otusjs.studio.navigationBuilder.MapFactory');
    });
  });

  describe('create method', function() {

    var map = {};

    beforeEach(function() {
      map = factory.create();
    });

    it('should return with a list of nodes', function() {
      expect(map.nodes()).toEqual(jasmine.any(Array));
    });

    it('should return with a list of edges', function() {
      expect(map.edges()).toEqual(jasmine.any(Array));
    });

  });

});
