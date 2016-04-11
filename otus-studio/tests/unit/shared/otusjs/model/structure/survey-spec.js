describe('Survey', function() {
    var Mock = {};
    var survey;

    beforeEach(function() {
        module('otusjs');
        module('utils');


        inject(function(_$injector_) {
            mockNavigation(_$injector_);

            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_)
            });

            survey = factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));
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

    describe('SurveyFactory.toJson()', function() {

        it('should return a json complete survey state', function() {
            var json = survey.toJson();

            console.log(json);
            // expect(survey.listNavigations().length).toBe(0);
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

    function mockNavigation($injector) {
        Mock.ORIGIN = 'ORIGIN';

        Mock.navigation = $injector.get('NavigationFactory').create(Mock.ORIGIN);
    }

});
