describe('Survey', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');
        module('utils');

        mockNavigation();

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_)
            });

            survey = factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));
        });
    });

    describe('listNavigations method', function() {

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

        it('should attach a new navigation in survey.navigation', function() {
            survey.addNavigation(jasmine.any(Object));

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

    function mockSurveyIdentityFactory($injector) {
        return $injector.get('SurveyIdentityFactory');
    }

    function mockSurveyMetaInfoFactory($injector) {
        return $injector.get('SurveyMetaInfoFactory');
    }

    function mockSurveyUUIDGenerator($injector) {
        Mock.SurveyUUIDGenerator = $injector.get('SurveyUUIDGenerator');
        return Mock.SurveyUUIDGenerator;
    }

    function mockNavigation() {
        Mock.ORIGIN = 'ORIGIN';

        Mock.navigation = {
            origin: Mock.ORIGIN
        };
    }

});
