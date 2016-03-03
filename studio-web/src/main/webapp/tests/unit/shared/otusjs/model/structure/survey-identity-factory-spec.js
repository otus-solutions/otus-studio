describe('SurveyIdentity suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var name = 'Identity Name',
        acronym = 'ACRONYM',
        version = 'A',
        actual;

    beforeEach(inject(function(_SurveyIdentityFactory_) {
        actual = _SurveyIdentityFactory_.create(name, acronym, version);
    }));

    describe('SurveyIdentityFactory.create()', function() {
        it('should return an SurveyIdentity that extends from StudioObject', function() {
            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an SurveyIdentity object type', function() {
            expect(actual.objectType).toBe('SurveyIdentity');
        });

        xit('should return an Unit with oid', function() {
        });

        it('should return an SurveyIdentity with name', function() {
            expect(actual.name).toBe(name);
        });

        it('should return an SurveyIdentity with acronym', function() {
            expect(actual.acronym).toBe(acronym);
        });

        it('should return an SurveyIdentity with acronym', function() {
            expect(actual.version).toBe(version);
        });

        it('should return an SurveyIdentity with recommendedTo equal to empty String', function() {
            expect(actual.recommendedTo.length).toBe(0);
        });

        it('should return an SurveyIdentity with description equal to empty String', function() {
            expect(actual.description.length).toBe(0);
        });

        it('should return an SurveyIdentity an empty array of keywords', function() {
            expect(actual.keywords.length).toBe(0);
        });
    });

});
