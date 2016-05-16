describe('NavigationRemoveFactory', function() {
    var Mock = {};
    var updateObject;

    var REMOVE = 'REMOVE';
    var ORIGIN_1 = 'ORIGIN_1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);
            mockQuestion(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory');
        });

        updateObject = factory.create(Mock.question);
    });

    describe('create method', function() {

        it('should return an object with type property defined', function() {
            expect(updateObject.type).toBeDefined();
        });

        it('should return an object with type property equal to method parameter', function() {
            expect(updateObject.type).toBe(REMOVE);
        });

    });

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', ORIGIN_1);
    }

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

});
