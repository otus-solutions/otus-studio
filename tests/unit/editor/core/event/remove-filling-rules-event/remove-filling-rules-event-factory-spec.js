describe('RemoveFillingRulesEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RemoveFillingRulesEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {
        it('should return an instance of RemoveFillingRulesEvent', function() {
            expect(event.constructor.name).toBe('RemoveFillingRulesEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });
    });
});
