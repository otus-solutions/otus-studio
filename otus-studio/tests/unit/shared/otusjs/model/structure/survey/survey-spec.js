describe('Survey', function() {
    var Mock = {};
    var survey;

    beforeEach(function() {
        module('otusjs');
        module('utils');

        mockDatetime();
        mockIdentityData();

        inject(function(_$injector_) {
            mockNavigation(_$injector_);

            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_)
            });

            mockJson();

            survey = factory.create(Mock.NAME, Mock.ACRONYM);
        });
    });

    describe('listNavigations method', function() {

        beforeEach(function() {
            survey.addNavigation(Mock.navigation);
        });

        it('should return an array of navigations', function() {
            expect(survey.listNavigations()).toEqual(jasmine.any(Array));
        });

    });

    describe('listNavigation method', function() {

        beforeEach(function() {
            survey.addNavigation(Mock.navigation);
        });

        it('should return a navigation by origin', function() {
            expect(survey.listNavigation(Mock.ORIGIN)).toEqual(Mock.navigation);
        });

    });

    describe('addNavigation method', function() {

        beforeEach(function() {
            survey.addNavigation(Mock.navigation);
        });

        it('should attach a new navigation in survey.navigation', function() {
            expect(survey.listNavigations().length).toBe(1);
        });

    });

    describe('removeNavigation method', function() {

        beforeEach(function() {
            survey.addNavigation(Mock.navigation);
        });

        it('should remove the navigation from survey.navigation by origin', function() {
            survey.removeNavigation(Mock.ORIGIN);

            expect(survey.listNavigations().length).toBe(0);
        });

    });

    describe('toJson method', function() {

        it('should return a well formatted json based on Survey', function() {
            expect(survey.toJson()).toEqual(Mock.json);
        });

    });

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

    function mockIdentityData() {
        Mock.NAME = 'NAME';
        Mock.ACRONYM = 'ACRONYM';
        Mock.VERSION = 'VERSION';
    }

    function mockNavigation($injector) {
        Mock.ORIGIN = 'ORIGIN';
        Mock.navigation = $injector.get('NavigationFactory').create(Mock.ORIGIN);
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
            questionContainer: {},
            navigationList: []
        });
    }

});
