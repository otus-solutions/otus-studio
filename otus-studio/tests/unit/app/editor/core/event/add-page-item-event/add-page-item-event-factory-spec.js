describe('AddPageItemEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddPageItemEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddPageItemEvent', function() {
            expect(event.constructor.name).toBe('AddPageItemEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
