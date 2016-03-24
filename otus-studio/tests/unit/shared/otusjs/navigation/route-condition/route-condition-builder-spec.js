describe('RouteConditionBuilderFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteConditionBuilderFactory', {
                'RuleFactory': mockRuleFactory(_$injector_)
            });
        });

        mockQuestionID();
        mockQuestionAnswer();
        mockAnswerRange();
        mockRule();

        builder = factory.create();
    });

    describe('build method', function() {

        it('should return an object with name property defined', function() {
            var conditions = builder.question(Mock.QUESTION_ID).build();

            expect(conditions[0].name).toEqual('0');
        });

        it('should return an object with when property defined', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].when).toEqual(Mock.QUESTION_ID);
        });

    });

    describe('question method', function() {

        xit('should call RuleFactory.create with question id', function() {
            spyOn(Mock.RuleFactory, 'create');

            builder.question(Mock.QUESTION_ID);

            expect(Mock.RuleFactory.create).toHaveBeenCalledWith(Mock.QUESTION_ID);
        });

    });

    describe('answer interface', function() {

        beforeEach(function() {
            builder.question(Mock.QUESTION_ID);
        });

        it('isEqualTo method should call Rule.equal with question answer', function() {
            spyOn(Mock.Rule, 'equal');

            builder.answer.isEqualTo(Mock.ANSWER);

            expect(Mock.Rule.equal).toHaveBeenCalledWith(Mock.ANSWER);
        });

        it('isGreaterThan method should call Rule.greater with question answer', function() {
            spyOn(Mock.Rule, 'greater');

            builder.answer.isGreaterThan(Mock.ANSWER);

            expect(Mock.Rule.greater).toHaveBeenCalledWith(Mock.ANSWER);
        });

        it('isGreaterEqualTo method should call Rule.greaterEqual with question answer', function() {
            spyOn(Mock.Rule, 'greaterEqual');

            builder.answer.isGreaterEqualTo(Mock.ANSWER);

            expect(Mock.Rule.greaterEqual).toHaveBeenCalledWith(Mock.ANSWER);
        });

        it('isLowerThan method should call Rule.lower with question answer', function() {
            spyOn(Mock.Rule, 'lower');

            builder.answer.isLowerThan(Mock.ANSWER);

            expect(Mock.Rule.lower).toHaveBeenCalledWith(Mock.ANSWER);
        });

        it('isLowerEqualTo method should call Rule.lowerEqual with question answer', function() {
            spyOn(Mock.Rule, 'lowerEqual');

            builder.answer.isLowerEqualTo(Mock.ANSWER);

            expect(Mock.Rule.lowerEqual).toHaveBeenCalledWith(Mock.ANSWER);
        });

        it('isBetween method should call Rule.between with question answer range', function() {
            spyOn(Mock.Rule, 'between');

            builder.answer.isBetween(Mock.ANSWER_RANGE);

            expect(Mock.Rule.between).toHaveBeenCalledWith(Mock.ANSWER_RANGE, undefined);
        });

        it('isBetween method should call Rule.between with question range start and range end', function() {
            spyOn(Mock.Rule, 'between');

            builder.answer.isBetween(Mock.ANSWER_RANGE[0], Mock.ANSWER_RANGE[1]);

            expect(Mock.Rule.between).toHaveBeenCalledWith(Mock.ANSWER_RANGE[0], Mock.ANSWER_RANGE[1]);
        });

        it('contains method should call Rule.contains with question answer', function() {
            spyOn(Mock.Rule, 'contains');

            builder.answer.contains(Mock.ANSWER);

            expect(Mock.Rule.contains).toHaveBeenCalledWith(Mock.ANSWER);
        });

    });

    describe('and interface', function() {

        it('should be defined', function() {
            expect(builder.and).toBeDefined();
        });

        it('should have question method defined', function() {
            expect(builder.and().question).toBeDefined();
        });

        it('should have answer interface defined', function() {
            expect(builder.and().answer).toBeDefined();
        });

        it('should have and interface undefined', function() {
            expect(builder.and().and).toBeUndefined();
        });

    });

    describe('or interface', function() {

        it('should be defined', function() {
            expect(builder.or).toBeDefined();
        });

        it('should have question method defined', function() {
            expect(builder.or().question).toBeDefined();
        });

        it('should have answer interface defined', function() {
            expect(builder.or().answer).toBeDefined();
        });

        it('should have and interface undefined', function() {
            expect(builder.or().or).toBeUndefined();
        });

    });

    function mockRuleFactory($injector) {
        Mock.RuleFactory = $injector.get('RuleFactory');
        return Mock.RuleFactory;
    }

    function mockRule() {
        Mock.Rule = Mock.RuleFactory.create(Mock.QUESTION_ID);
        spyOn(Mock.RuleFactory, 'create').and.returnValue(Mock.Rule);
    }

    function mockQuestionID() {
        Mock.QUESTION_ID = 'QID';
    }

    function mockQuestionAnswer() {
        Mock.ANSWER = 'ANSWER';
    }

    function mockAnswerRange() {
        Mock.ANSWER_RANGE = [1, 10];
    }

});
