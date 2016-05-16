describe('SurveyFactory', function() {
    var Mock = {};
    var survey;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_),
                'NavigationManagerFactory': mockNavigationManagerFactory(_$injector_)
            });

            survey = factory.create(jasmine.any(String), jasmine.any(String));
        });
    });

    describe('SurveyFactory.create()', function() {

        it('should return a Survey that extends from StudioObject', function() {
            expect(survey.extents).toBe('StudioObject');
        });

        it('should return a Survey object type', function() {
            expect(survey.objectType).toBe('Survey');
        });

        it('should return a Survey with a SurveyMetaInfo object type', function() {
            expect(survey.metainfo.objectType).toBe('SurveyMetaInfo');
        });

        it('should return a Survey with an OID', function() {
            expect(survey.oid).toBeDefined();
        });

        it('should return a Survey with a SurveyIdentity object type', function() {
            expect(survey.identity.objectType).toBe('SurveyIdentity');
        });

        it('should return a Survey with a literal object in question property', function() {
            expect(survey.questionContainer instanceof Object).toEqual(true);
        });

        it('should return a Survey with a navigation manager', function() {
            expect(survey.navigationManager).toBeDefined();
        });

        it('should call SurveyUUIDGenerator.generateSurveyUUID()', function() {
            spyOn(Mock.SurveyUUIDGenerator, 'generateSurveyUUID');

            factory.create(jasmine.any(String), jasmine.any(String));

            expect(Mock.SurveyUUIDGenerator.generateSurveyUUID).toHaveBeenCalled();
        });

        it('should call NavigationManagerFactory.create()', function() {
            spyOn(Mock.NavigationManagerFactory, 'create');

            factory.create(jasmine.any(String), jasmine.any(String));

            expect(Mock.NavigationManagerFactory.create).toHaveBeenCalled();
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

    function mockNavigationManagerFactory($injector) {
        Mock.NavigationManagerFactory = $injector.get('NavigationManagerFactory');
        return Mock.NavigationManagerFactory;
    }

});
