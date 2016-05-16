describe('NavigationRemove', function() {
    var Mock = {};
    var updateObject;

    var ORIGIN_1 = 'ORIGIN_1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);
            mockQuestions(_$injector_);
            mockNavigationFactory(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory');
        });
    });

    describe('setManager method', function() {

        it('should set a reference to NavigationManager', function() {
            var updateObject = factory.create(Mock.questionOne);

            updateObject.setManager(Mock.navigationManager);

            expect(updateObject.manager).toBeDefined();
        });

    });

    describe('execute method', function() {

        beforeEach(function() {
            Mock.survey.addQuestion(Mock.questionOne);
            Mock.survey.addQuestion(Mock.questionTwo);
            Mock.survey.addQuestion(Mock.questionThree);
        });

        it('when a question is removed then should remove the respective navigation', function() {
            Mock.survey.removeQuestion(Mock.questionOne.templateID);

            var updateObject = factory.create(Mock.questionOne);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            expect(Mock.navigationManager.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
        });

        it('when the last question is removed then should remove the navigation of previous question', function() {
            Mock.survey.removeQuestion(Mock.questionThree.templateID);

            var updateObject = factory.create(Mock.questionThree);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            expect(Mock.navigationManager.existsNavigationTo(Mock.questionTwo.templateID)).toBe(false);
        });

    });

    function mockSurvey($injector) {
        Mock.SurveyFactory = $injector.get('SurveyFactory', {
            SurveyIdentityFactory: $injector.get('SurveyIdentityFactory'),
            SurveyMetaInfoFactory: $injector.get('SurveyMetaInfoFactory'),
            SurveyUUIDGenerator: $injector.get('SurveyUUIDGenerator'),
            NavigationManagerFactory: mockNavigationManagerFactory($injector),
            NavigationAddFactory: $injector.get('NavigationAddFactory')
        });

        Mock.survey = Mock.SurveyFactory.create('Survey Test', 'ST');
    }

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
    }

    function mockNavigationManagerFactory($injector) {
        Mock.NavigationManagerFactory = $injector.get('NavigationManagerFactory');
        Mock.navigationManager = $injector.get('NavigationManagerFactory').create();

        spyOn(Mock.NavigationManagerFactory, 'create').and.returnValue(Mock.navigationManager);

        return Mock.NavigationManagerFactory;
    }

    function mockNavigationFactory($injector) {
        Mock.navigationFactory = $injector.get('NavigationFactory');
    }

});
