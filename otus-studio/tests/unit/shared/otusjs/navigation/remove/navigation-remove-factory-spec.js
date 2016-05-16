describe('NavigationRemoveFactory', function() {
    var Mock = {};
    var updateObject;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory');
        });

        updateObject = factory.create(Mock.question);
    });

    describe('create method', function() {

        it('should return an object with question property defined', function() {
            expect(updateObject.question).toBeDefined();
        });

    });

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', 'ORIGIN_1');
    }

});
