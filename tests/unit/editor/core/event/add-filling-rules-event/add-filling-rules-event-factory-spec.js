describe('AddFillingRulesEventFactory', function() {
  var factory, event;

  beforeEach(function() {
    angular.mock.module('studio');

    inject(function(_$injector_) {
      factory = _$injector_.get('AddFillingRulesEventFactory');
    });

    event = factory.create();
  });

  describe('create method', function() {
    it('should return an instance of AddFillingRulesEvent', function() {
      expect(event.constructor.name).toBe('AddFillingRulesEvent');
    });

    it('should return an object with execute method', function() {
      expect(event.execute).toBeDefined();
    });
  });
});
