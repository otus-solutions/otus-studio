describe('Unit suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var actual;

    beforeEach(inject(function(_UnitFactory_) {
        actual = _UnitFactory_.create();
    }));

    describe('UnitFactory.create()', function() {
        it('should return an Survey that extends from StudioObject', function() {
            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an Unit object type', function() {
            expect(actual.objectType).toBe('Unit');
        });

        xit('should return an Unit with oid', function() {
        });

        it('should return an Unit with plainText equal to empty String', function() {
            expect(actual.plainText.length).toBe(0);
        });

        it('should return an Unit with formattedText equal to empty String', function() {
            expect(actual.formattedText.length).toBe(0);
        });
    });

});
