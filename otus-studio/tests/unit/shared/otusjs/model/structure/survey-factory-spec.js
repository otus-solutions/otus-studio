describe('SurveyFactory', function() {
    var Mock = {};
    var survey;

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyFactory', {
                'SurveyIdentityFactory': mockSurveyIdentityFactory(_$injector_),
                'SurveyMetaInfoFactory': mockSurveyMetaInfoFactory(_$injector_),
                'SurveyUUIDGenerator': mockSurveyUUIDGenerator(_$injector_)
            });

            survey = factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));
        });
    });

    describe('SurveyFactory.create()', function() {

        it('should return a Survey that extends from StudioObject', function() {
            expect(survey.getExtents()).toBe('StudioObject');
        });

        it('should return a Survey object type', function() {
            expect(survey.getObjectType()).toBe('Survey');
        });

        it('should return a Survey with a SurveyMetaInfo object type', function() {
            expect(survey.getMetaInfo().objectType).toBe('SurveyMetaInfo');
        });

        it('should return a Survey with an OID', function() {
            expect(survey.getOID()).toBeDefined();
        });

        it('should return a Survey with a SurveyIdentity object type', function() {
            expect(survey.getIdentity().objectType).toBe('SurveyIdentity');
        });

        it('should return a Survey with a literal object in question property', function() {
            expect(survey.getQuestionContainer()).toEqual({});
        });

        it('should call SurveyUUIDGenerator.generateSurveyUUID()', function() {
            spyOn(Mock.SurveyUUIDGenerator, 'generateSurveyUUID');

            factory.create(jasmine.any(String), jasmine.any(String), jasmine.any(String));

            expect(Mock.SurveyUUIDGenerator.generateSurveyUUID).toHaveBeenCalled();
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

});
