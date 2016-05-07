describe('AddMetadataAnswerEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddMetadataAnswerEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddMetadataAnswerEvent', function() {
            expect(event.constructor.name).toBe('AddMetadataAnswerEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
