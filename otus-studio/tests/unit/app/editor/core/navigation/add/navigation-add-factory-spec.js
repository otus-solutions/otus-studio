describe('NavigationAddFactory', function() {
    var Mock = {};
    var updateObject;

    var ADD = 'ADD';
    var ORIGIN_1 = 'ORIGIN_1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);

            factory = _$injector_.get('NavigationAddFactory');
        });

        updateObject = factory.create(Mock.survey);
    });

    describe('create method', function() {

        it('should return an object with type property defined', function() {
            expect(updateObject.type).toBeDefined();
        });

        it('should return an object with questionContainer property defined', function() {
            expect(updateObject.questionContainer).toBeDefined();
        });

        it('should return an object with type property equal to method parameter', function() {
            expect(updateObject.type).toBe(ADD);
        });

    });

    function mockQuestions($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', ORIGIN_1);
    }

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

});
