describe('RemoveAnswerOptionEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RemoveAnswerOptionEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of RemoveAnswerOptionEvent', function() {
            expect(event.constructor.name).toBe('RemoveAnswerOptionEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
