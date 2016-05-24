describe('AddAnswerOptionEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddAnswerOptionEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddAnswerOptionEvent', function() {
            expect(event.constructor.name).toBe('AddAnswerOptionEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
