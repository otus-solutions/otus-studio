describe('NavigationAdd', function() {
    var Mock = {};
    var updateObject;

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            // mockSurvey(_$injector_);
            // mockQuestions(_$injector_);

            factory = _$injector_.get('NavigationAddFactory', {
                NavigationContainerService: mockNavigationContainerService(_$injector_)
            });

            updateObject = factory.create([]);
        });
    });

    describe('execute method', function() {

        fit('should not create a navigation to first question', function() {
            updateObject.execute();

            expect(Mock.NavigationContainerService.createNavigationTo).not.toHaveBeenCalled();
        });

        fit('should create a navigation when survey has at least one question', function() {
            updateObject.execute();

            expect(Mock.NavigationContainerService.createNavigationTo).toHaveBeenCalled();
        });

        it('should not create a navigation to the last question', function() {
            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.questionThree.templateID)).toBe(false);
        });

    });

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
    }

    function mockNavigationContainerService($injector) {
        Mock.NavigationContainerService = $injector.get('NavigationContainerService');

        spyOn(Mock.NavigationContainerService, 'createNavigationTo');

        return Mock.NavigationContainerService;
    }

});
