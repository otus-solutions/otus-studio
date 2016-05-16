describe('NavigationAdd', function() {
    var Mock = {};

    var ORIGIN_1 = 'ORIGIN_1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);
            mockQuestions(_$injector_);
            mockNavigationManagerFactory(_$injector_);
            mockNavigationFactory(_$injector_);

            factory = _$injector_.get('NavigationAddFactory');
        });
    });

    describe('setManager method', function() {

        it('should set a reference to NavigationManager', function() {
            var updateObject = factory.create();

            updateObject.setManager(Mock.navigationManager);

            expect(updateObject.manager).toBeDefined();
        });

    });

    describe('execute method', function() {

        it('should not create a navigation to first question', function() {
            Mock.survey.addQuestion(Mock.questionOne);
            var updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);

            updateObject.execute();

            expect(updateObject.manager.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
        });

        it('should create a navigation when survey has at least one question', function() {
            Mock.survey.addQuestion(Mock.questionOne);
            var updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            Mock.survey.addQuestion(Mock.questionTwo);
            updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            expect(updateObject.manager.existsNavigationTo(Mock.questionOne.templateID)).toBe(true);
        });

        it('should not create a navigation to the last question', function() {
            Mock.survey.addQuestion(Mock.questionOne);
            var updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            Mock.survey.addQuestion(Mock.questionTwo);
            updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            Mock.survey.addQuestion(Mock.questionThree);
            updateObject = factory.create(Mock.survey.questionContainer);
            updateObject.setManager(Mock.navigationManager);
            updateObject.execute();

            expect(updateObject.manager.existsNavigationTo(Mock.questionThree.templateID)).toBe(false);
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

    function mockNavigationManagerFactory($injector) {
        Mock.navigationManager = $injector.get('NavigationManagerFactory').create();
    }

    function mockNavigationFactory($injector) {
        Mock.navigationFactory = $injector.get('NavigationFactory');
    }

});
