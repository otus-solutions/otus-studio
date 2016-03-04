describe('SurveyIdentity suite:', function() {
    var Mock = {},
        factory;

    var NAME = 'Identity Name',
        ACRONYM = 'ACRONYM',
        VERSION = 'A';

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('SurveyIdentityFactory');
        });

        surveyIdentity = factory.create(NAME, ACRONYM, VERSION);
    });

    describe('SurveyIdentityFactory.create()', function() {

        it('should return an SurveyIdentity that extends from StudioObject', function() {
            expect(surveyIdentity.extends).toBe('StudioObject');
        });

        it('should return an SurveyIdentity object type', function() {
            expect(surveyIdentity.objectType).toBe('SurveyIdentity');
        });

        xit('should return an Unit with oid', function() {
        });

        it('should return an SurveyIdentity with name', function() {
            expect(surveyIdentity.name).toBe(NAME);
        });

        it('should return an SurveyIdentity with acronym', function() {
            expect(surveyIdentity.acronym).toBe(ACRONYM);
        });

        it('should return an SurveyIdentity with acronym', function() {
            expect(surveyIdentity.version).toBe(VERSION);
        });

        it('should return an SurveyIdentity with recommendedTo equal to empty String', function() {
            expect(surveyIdentity.recommendedTo.length).toBe(0);
        });

        it('should return an SurveyIdentity with description equal to empty String', function() {
            expect(surveyIdentity.description.length).toBe(0);
        });

        it('should return an SurveyIdentity an empty array of keywords', function() {
            expect(surveyIdentity.keywords.length).toBe(0);
        });

    });

});
