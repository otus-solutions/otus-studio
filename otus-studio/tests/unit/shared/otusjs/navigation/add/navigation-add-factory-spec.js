describe('NavigationAddFactory', function() {
    var Mock = {};
    var updateObject;

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
             mockSurvey(_$injector_);

            factory = _$injector_.get('NavigationAddFactory');
        });

        updateObject = factory.create(Mock.survey.questionContainer);
    });

    describe('create method', function() {

        it('should return an object with questionContainer property defined', function() {
            expect(updateObject.questionContainer).toBeDefined();
        });

    });

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

});
