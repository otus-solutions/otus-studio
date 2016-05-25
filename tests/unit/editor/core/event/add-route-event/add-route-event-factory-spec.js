describe('AddRouteEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddRouteEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddRouteEvent', function() {
            expect(event.constructor.name).toBe('AddRouteEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
