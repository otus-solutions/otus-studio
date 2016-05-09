describe('AddQuestionEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddQuestionEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddQuestionEvent', function() {
            expect(event.constructor.name).toBe('AddQuestionEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
