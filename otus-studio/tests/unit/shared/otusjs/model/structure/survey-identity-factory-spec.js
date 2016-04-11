describe('SurveyIdentity', function() {
    var Mock = {},
        factory;

    var NAME = 'Identity Name',
        ACRONYM = 'ACRONYM',
        VERSION = 'A';

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyIdentityFactory');
        });

        surveyIdentity = factory.create(NAME, ACRONYM, VERSION);
    });

    describe('SurveyIdentityFactory.create()', function() {

        it('should return an SurveyIdentity that extends from StudioObject', function() {
            expect(surveyIdentity.extents).toBe('StudioObject');
        });

        it('should return an SurveyIdentity object type', function() {
            expect(surveyIdentity.objectType).toBe('SurveyIdentity');
        });

        it('should return an SurveyIdentity with name', function() {
            expect(surveyIdentity.name).toBe(NAME);
        });

        it('should return an SurveyIdentity with acronym', function() {
            expect(surveyIdentity.acronym).toBe(ACRONYM);
        });

        it('should return an SurveyIdentity with recommendedTo equal to empty String', function() {
            expect(surveyIdentity.recommendedTo.length).toBe(0);
        });

        it('should return an SurveyIdentity with description equal to empty String', function() {
            expect(surveyIdentity.description.length).toBe(0);
        });

        it('should return an SurveyIdentity an empty array of keywords', function() {
            expect(Array.isArray(surveyIdentity.keywords)).toBe(true);
        });

    });

});
