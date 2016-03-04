describe('SurveyMetaInfoFactory', function() {
    var Mock = {},
        factory;

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');
        module('otusjs.modelBuilder');

        inject(function(_$injector_) {
            /* @InjectMocks */
            factory = _$injector_.get('SurveyMetaInfoFactory', {
                OIDHashGenerator: mockOIDHashGenerator(_$injector_)
            });
        });
    });

    describe('Dependencies uses', function() {

        it('Date.now() should be called in create() method', function() {
            spyOn(Date, 'now');

            factory.create();

            expect(Date.now).toHaveBeenCalled();
        });

        it('OIDHashGenerator.generateHash() should be called with a seed parameter', function() {
            spyOn(Mock.OIDHashGenerator, 'generateHash');

            factory.create();

            expect(Mock.OIDHashGenerator.generateHash).toHaveBeenCalledWith(jasmine.any(String));
        });

    });

    describe('SurveyMetaInfoFactory.create()', function() {

        it('should return an SurveyMetaInfo with creation date time equal to now date', function() {
            var now = new Date(Date.now());
            jasmine.clock().mockDate(now);

            var surveyMetaInfo = factory.create();

            expect(surveyMetaInfo.creationDatetime).toEqual(now);
        });

        it('should return an SurveyMetaInfo that extends from StudioObject', function() {
            var surveyMetaInfo = factory.create();

            expect(surveyMetaInfo.extends).toBe('StudioObject');
        });

        it('should return an SurveyMetaInfo object type', function() {
            var surveyMetaInfo = factory.create();

            expect(surveyMetaInfo.objectType).toBe('SurveyMetaInfo');
        });

        it('should return an SurveyMetaInfo with an OIDHash', function() {
            var expected = Mock.OIDHashGenerator.generateHash(jasmine.any(String)),
                surveyMetaInfo = factory.create();

            expect(surveyMetaInfo.oid).toBe(expected);
        });

    });

    function mockOIDHashGenerator($injector) {
        Mock.OIDHashGenerator = $injector.get('OIDHashGenerator');

        /* Overrides original behavior */
        Mock.OIDHashGenerator.generateHash = function(seed) {
            return 0;
        };

        return Mock.OIDHashGenerator;
    }

});
