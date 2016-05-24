describe('RemoveRouteEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RemoveRouteEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of RemoveRouteEvent', function() {
            expect(event.constructor.name).toBe('RemoveRouteEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
