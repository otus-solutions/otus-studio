describe('Survey suite:', function() {
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');
        module('otusjs.modelBuilder');
        module('utils');

        inject(function(_$injector_) {
            /* @InjectMocks */
            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'UUID': mockUUID(_$injector_)
            });

            survey = factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));
        });
    });

    describe('SurveyFactory.create()', function() {

        it('should return an Survey that extends from StudioObject', function() {
            expect(survey.extends).toBe('StudioObject');
        });

        it('should return an Survey object type', function() {
            expect(survey.objectType).toBe('Survey');
        });

        it('should return an Survey with a SurveyMetaInfo object type', function() {
            expect(survey.metainfo.objectType).toBe('SurveyMetaInfo');
        });

        xit('should return an Unit with oid', function() {
        });

        it('should return an Survey with a not null SurveyMetaInfo', function() {
            expect(survey.metainfo).not.toBeNull();
        });

        it('should return an Survey with a not null SurveyIdentity', function() {
            expect(survey.identity).not.toBeNull();
        });

        it('should return an Survey with a SurveyIdentity object type', function() {
            expect(survey.identity.objectType).toBe('SurveyIdentity');
        });

        it('should return an Survey with a literal object in question property', function() {
            expect(survey.question).toEqual({});
        });

        it('should call UUID.generateUUID()', function() {
            spyOn(Mock.UUID, 'generateUUID');

            factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));

            expect(Mock.UUID.generateUUID).toHaveBeenCalled();
        });

    });

    function mockSurveyIdentityFactory($injector) {
        return $injector.get('SurveyIdentityFactory');
    }

    function mockSurveyMetaInfoFactory($injector) {
        return $injector.get('SurveyMetaInfoFactory');
    }

    function mockUUID($injector) {
        Mock.UUID = $injector.get('UUID');
        return Mock.UUID;
    }

});
