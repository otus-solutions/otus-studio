describe('AddSurveyItemEventFactory', function() {
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddSurveyItemEventFactory');
        });

        event = factory.create();
    });

    describe('create method', function() {

        it('should return an instance of AddSurveyItemEvent', function() {
            expect(event.constructor.name).toBe('AddSurveyItemEvent');
        });

        it('should return an object with execute method', function() {
            expect(event.execute).toBeDefined();
        });

    });

});
