describe('Label suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var actual;

    beforeEach(inject(function(_LabelFactory_) {
        actual = _LabelFactory_.create();
    }));

    describe('LabelFactory.create()', function() {
        it('should return an Survey that extends from StudioObject', function() {
            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an Label object type', function() {
            expect(actual.objectType).toBe('Label');
        });

        xit('should return an Label with oid', function() {
        });

        it('should return an Label with plainText equal to empty String', function() {
            expect(actual.plainText.length).toBe(0);
        });

        it('should return an Label with formattedText equal to empty String', function() {
            expect(actual.formattedText.length).toBe(0);
        });
    });

});
