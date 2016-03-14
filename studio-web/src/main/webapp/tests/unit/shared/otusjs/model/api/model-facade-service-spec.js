describe('ModelFacadeService', function() {
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('otusjs.model');
        module('otusjs.modelBuilder');

        inject(function(_$injector_) {
            /* @InjectMocks */
            service = _$injector_.get('ModelFacadeService', {
                QuestionFactory: mockQuestionFactory(_$injector_),
                LabelFactory: mockLabelFactory(_$injector_),
                UnitFactory: mockUnitFactory(_$injector_),
                SurveyFactory: mockSurveyFactory(_$injector_),
                SurveyIdentityFactory: mockSurveyIdentityFactory(_$injector_)
            });
        });
    });

    describe('Getting question factories', function() {

        it('getQuestionFactory should return a QuestionFactory', function() {
            var factory = service.getQuestionFactory();

            expect(factory).toBeDefined();
        });

        it('getLabelFactory should return a LabelFactory', function() {
            var factory = service.getLabelFactory();

            expect(factory).toBeDefined();
        });

        it('getUnitFactory should return a UnitFactory', function() {
            var factory = service.getUnitFactory();

            expect(factory).toBeDefined();
        });

        it('getSurveyFactory should return a SurveyFactory', function() {
            var factory = service.getSurveyFactory();

            expect(factory).toBeDefined();
        });

        it('getSurveyIdentityFactory should return a SurveyIdentityFactory', function() {
            var factory = service.getSurveyIdentityFactory();

            expect(factory).toBeDefined();
        });

    });

    function mockQuestionFactory($injector) {
        return $injector.get('QuestionFactory');
    }

    function mockLabelFactory($injector) {
        return $injector.get('LabelFactory');
    }

    function mockUnitFactory($injector) {
        return $injector.get('UnitFactory');
    }

    function mockSurveyFactory($injector) {
        return $injector.get('SurveyFactory');
    }

    function mockSurveyIdentityFactory($injector) {
        return $injector.get('SurveyIdentityFactory');
    }

});
