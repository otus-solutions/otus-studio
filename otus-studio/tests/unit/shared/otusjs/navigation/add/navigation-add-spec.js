describe('NavigationAdd', function() {
    var Mock = {};
    var updateObject;

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
            mockQuestionContainer(_$injector_);

            factory = _$injector_.get('NavigationAddFactory', {
                NavigationContainerService: mockNavigationContainerService(_$injector_)
            });
        });
    });

    describe('execute method', function() {

        it('should not create a navigation when survey has not question', function() {
            updateObject = factory.create(Mock.questionContainerWithOneQuestion);

            updateObject.execute();

            expect(Mock.NavigationContainerService.createNavigationTo).not.toHaveBeenCalled();
        });

        it('should create a navigation when survey has at least one question', function() {
            updateObject = factory.create(Mock.questionContainerWithTwoQuestions);

            updateObject.execute();

            expect(Mock.NavigationContainerService.createNavigationTo).toHaveBeenCalled();
        });

        it('should create a navigation to last added question', function() {
            updateObject = factory.create(Mock.questionContainerWithTwoQuestions);

            updateObject.execute();

            expect(Mock.NavigationContainerService.createNavigationTo).toHaveBeenCalledWith(Mock.questionOne.templateID);
        });

        it('should not create a navigation to the last question', function() {
            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.questionTwo.templateID)).toBe(false);
        });

    });

    function mockQuestionContainer($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');

        Mock.questionContainerWithOneQuestion = [Mock.questionOne];
        Mock.questionContainerWithTwoQuestions = [Mock.questionOne, Mock.questionTwo];
    }

    function mockNavigationContainerService($injector) {
        Mock.NavigationContainerService = $injector.get('NavigationContainerService');

        spyOn(Mock.NavigationContainerService, 'createNavigationTo');

        return Mock.NavigationContainerService;
    }

});
