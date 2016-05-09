describe('RemoveMetadataOptionEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RemoveMetadataOptionEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of RemoveMetadataOptionEvent', function() {
            expect(event.constructor.name).toBe('RemoveMetadataOptionEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
