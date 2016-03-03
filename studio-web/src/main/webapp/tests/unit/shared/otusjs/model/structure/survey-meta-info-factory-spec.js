describe('SurveyMetaInfo suite:', function() {
    beforeEach(module('otusjs.modelBuilder'));
    beforeEach(module('otusjs.model'));

    var SurveyMetaInfoFactory,
        OIDHashGenerator,
        actual;

    beforeEach(inject(function(_SurveyMetaInfoFactory_, _OIDHashGenerator_) {
        SurveyMetaInfoFactory = _SurveyMetaInfoFactory_;
        OIDHashGenerator = _OIDHashGenerator_;
        actual = _SurveyMetaInfoFactory_.create();
    }));

    describe('SurveyMetaInfoFactory.create()', function() {
        it('should call Date.now()', function() {
            spyOn(Date, 'now');

            SurveyMetaInfoFactory.create();

            expect(Date.now).toHaveBeenCalled();
        });

        it('should call OIDHashGenerator.generateHash(now.toString())', function() {
            spyOn(OIDHashGenerator, 'generateHash');

            SurveyMetaInfoFactory.create();

            expect(OIDHashGenerator.generateHash).toHaveBeenCalledWith(jasmine.any(String));
        });

        it('should return an SurveyMetaInfo that extends from StudioObject', function() {
            expect(actual.extends).toBe('StudioObject');
        });

        it('should return an SurveyMetaInfo object type', function() {
            expect(actual.objectType).toBe('SurveyMetaInfo');
        });

        xit('should return an OIDHash', function() {
            var now = new Date(Date.now());
            jasmine.clock().mockDate(now);

            var expected = OIDHashGenerator.generateHash(now.toString());
            var actual = SurveyMetaInfoFactory.create();

            expect(actual.oid).toBe(expected);
        });

        xit('should return an SurveyMetaInfo with a creation date time', function() {
            var now = new Date(Date.now());
            jasmine.clock().mockDate(now);

            var actual = SurveyMetaInfoFactory.create();
            expect(actual.creationDatetime).toEqual(now);
        });
    });

});
