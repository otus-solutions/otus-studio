describe('Survey', function() {
    var Mock = {};
    var survey;
    var ORIGIN_1 = 'ORIGIN_1';
    var ORIGIN_2 = 'ORIGIN_2';

    beforeEach(function() {
        module('studio');

        mockDatetime();
        mockIdentityData();

        inject(function(_$injector_) {
            mockQuestions(_$injector_);

            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_),
                'NavigationManagerFactory': mockNavigationManagerFactory(_$injector_),
                'NavigationAddFactory': mockNavigationAddFactory(_$injector_),
                'NavigationRemoveFactory': mockNavigationRemoveFactory(_$injector_)
            });

            mockJson();

            survey = factory.create(Mock.NAME, Mock.ACRONYM);
        });
    });

    describe('question management', function() {

        describe('addQuestion method', function() {

            it('should add a question on survey', function() {
                survey.addQuestion(Mock.question);

                expect(survey.questionsCount()).toBeGreaterThan(0);
            });

            it('should call NavigationAddFactory.create with question container', function() {
                survey.addQuestion(Mock.question);

                expect(Mock.NavigationAddFactory.create).toHaveBeenCalledWith(survey.questionContainer);
            });

            it('should call NavigationManager.updateNavigation with new question ID', function() {
                survey.addQuestion(Mock.question);

                expect(Mock.NavigationManager.updateNavigation).toHaveBeenCalled();
            });

        });

        describe('removeQuestion method', function() {

            beforeEach(function() {
                survey.addQuestion(Mock.question);
                survey.removeQuestion(Mock.question.templateID);
            });

            it('should remove a question on survey', function() {
                expect(survey.questionsCount()).toBe(0);
            });

            it('should call NavigationRemoveFactory.create with question', function() {
                survey.removeQuestion(Mock.question);

                expect(Mock.NavigationRemoveFactory.create).toHaveBeenCalledWith(Mock.question);
            });

            it('should call NavigationManager.updateNavigation with new question ID', function() {
                survey.removeQuestion(Mock.question);

                expect(Mock.NavigationManager.updateNavigation).toHaveBeenCalled();
            });

        });

        describe('fetchQuestionById method', function() {

            beforeEach(function() {
                survey.addQuestion(Mock.question);
                survey.addQuestion(Mock.questionTwo);
            });

            it('should fetch the correct question on survey', function() {
                expect(survey.fetchQuestionById(Mock.questionTwo.templateID)).toBe(Mock.questionTwo);
                expect(survey.fetchQuestionById(Mock.questionTwo.templateID)).not.toBe(Mock.question);
            });
        });

    });

    function mockQuestions($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', ORIGIN_1);
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', ORIGIN_2);
    }

    function mockSurveyIdentityFactory($injector) {
        Mock.SurveyIdentityFactory = $injector.get('SurveyIdentityFactory');
        Mock.identity = Mock.SurveyIdentityFactory.create();
        return Mock.SurveyIdentityFactory;
    }

    function mockSurveyMetaInfoFactory($injector) {
        return $injector.get('SurveyMetaInfoFactory');
    }

    function mockSurveyUUIDGenerator($injector) {
        Mock.SurveyUUIDGenerator = $injector.get('SurveyUUIDGenerator');
        spyOn(Mock.SurveyUUIDGenerator, 'generateSurveyUUID').and.returnValue('0');
        return Mock.SurveyUUIDGenerator;
    }

    function mockNavigationAddFactory($injector) {
        Mock.NavigationAddFactory = $injector.get('NavigationAddFactory');

        spyOn(Mock.NavigationAddFactory, 'create');

        return Mock.NavigationAddFactory;
    }

    function mockNavigationRemoveFactory($injector) {
        Mock.NavigationRemoveFactory = $injector.get('NavigationRemoveFactory');

        spyOn(Mock.NavigationRemoveFactory, 'create');

        return Mock.NavigationRemoveFactory;
    }

    function mockNavigationManagerFactory($injector) {
        Mock.NavigationManagerFactory = $injector.get('NavigationManagerFactory');
        Mock.NavigationManager = Mock.NavigationManagerFactory.create(survey);

        spyOn(Mock.NavigationManagerFactory, 'create').and.returnValue(Mock.NavigationManager);
        spyOn(Mock.NavigationManager, 'updateNavigation');

        return Mock.NavigationManagerFactory;
    }

    function mockIdentityData() {
        Mock.NAME = 'NAME';
        Mock.ACRONYM = 'ACRONYM';
        Mock.VERSION = 'VERSION';
    }

    function mockDatetime() {
        Mock.now = Date.now();
        spyOn(Date, 'now').and.returnValue(Mock.now);
    }

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'Survey',
            oid: '0',
            identity: {
                extents: 'StudioObject',
                objectType: 'SurveyIdentity',
                name: Mock.NAME,
                acronym: Mock.ACRONYM,
                // version: Mock.VERSION,
                recommendedTo: '',
                description: '',
                keywords: []
            },
            metainfo: {
                extents: 'StudioObject',
                objectType: 'SurveyMetaInfo',
                creationDatetime: Mock.now,
                otusStudioVersion: ''
            },
            questionContainer: [],
            navigationList: []
        });
    }

});
