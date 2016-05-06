describe('DecimalQuestionFactory', function() {
    var Mock = {};
    var question,
    TEMPLATE_ID = 'TEMPLATE_ID',
    QUESTION_ID = 'QUESTION_ID';

    beforeEach(function() {
        module('otusjs.model');

        inject(function(_$injector_) {
            factory = _$injector_.get('DecimalQuestionFactory', {
                'UnitFactory': mockUnitFactory(_$injector_)
            });

            question = factory.create(TEMPLATE_ID, QUESTION_ID);
        });
    });

    describe('DecimalQuestion', function() {
        it('should returned an object defined', function() {
            expect(question).toBeDefined();
        });

        xit('returned object should have extends equal to objectType', function() {
            expect(question.extends).toBe('Question');
        });

        it('returned object should have objectType equal to DecimalQuestion', function() {
            expect(question.objectType).toBe('DecimalQuestion');
        });

        it('returned object should have templateID equal to templateID', function() {
            expect(question.templateID).toBe(TEMPLATE_ID);
        });

        it('returned object should have dataType equal to Decimal', function() {
            expect(question.dataType).toBe('Decimal');
        });
    });

    function mockUnitFactory($injector) {
        Mock.UnitFactory = $injector.get('UnitFactory');
        return Mock.UnitFactory;
    }
});
