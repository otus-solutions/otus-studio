describe('SurveyIdentity suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var SurveyIdentityFactory;

    beforeEach(inject(function(_SurveyIdentityFactory_) {
        SurveyIdentityFactory = _SurveyIdentityFactory_;
    }));

    describe('SurveyIdentityFactory.create()', function() {
        it('should return an SurveyIdentity that extends from StudioObject', function() {
            var actual = SurveyIdentityFactory.create();

            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an SurveyIdentity object type', function() {
            var actual = SurveyIdentityFactory.create();

            expect(actual.objectType).toBe('SurveyIdentity');
        });
    });

});
