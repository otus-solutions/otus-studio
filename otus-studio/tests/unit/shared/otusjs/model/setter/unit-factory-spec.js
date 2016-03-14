describe('Unit suite:', function() {

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('UnitFactory');
        });

        unit = factory.create();
    });

    describe('UnitFactory.create()', function() {

        it('should return an Survey that extends from StudioObject', function() {
            expect(unit.extends).toBe('StudioObject');
        });

        it('should return an Unit object type', function() {
            expect(unit.objectType).toBe('Unit');
        });

        xit('should return an Unit with oid', function() {
        });

        it('should return an Unit with plainText equal to empty String', function() {
            expect(unit.plainText.length).toBe(0);
        });

        it('should return an Unit with formattedText equal to empty String', function() {
            expect(unit.formattedText.length).toBe(0);
        });

    });

});
