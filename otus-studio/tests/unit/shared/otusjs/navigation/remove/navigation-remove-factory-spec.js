describe('NavigationRemoveFactory', function() {
    var Mock = {};
    var updateObject;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory');
        });

        updateObject = factory.create(Mock.question.templateID);
    });

    describe('create method', function() {

        it('should return an object with execute method defined', function() {
            expect(updateObject.execute).toBeDefined();
            expect(updateObject.execute).toEqual(jasmine.any(Function));
        });

    });

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', 'ORIGIN_1');
    }

});
