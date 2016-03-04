describe('Label suite:', function() {

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('LabelFactory');
        });

        label = factory.create();
    });

    describe('LabelFactory.create()', function() {

        it('should return an Survey that extends from StudioObject', function() {
            expect(label.extends).toBe('StudioObject');
        });

        it('should return an Label object type', function() {
            expect(label.objectType).toBe('Label');
        });

        xit('should return an Label with oid', function() {
        });

        it('should return an Label with plainText equal to empty String', function() {
            expect(label.plainText.length).toBe(0);
        });

        it('should return an Label with formattedText equal to empty String', function() {
            expect(label.formattedText.length).toBe(0);
        });

    });

});
