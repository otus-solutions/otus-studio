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

        xit('should return an object with name property defined', function() {
            var conditions = builder.question(Mock.QUESTION_ID).build();

            expect(conditions[0].name).toEqual('0');
        });

        it('should return an object with when property defined', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].when).toBeDefined();
        });

        xit('should return an object with when property equal to question', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].when).toEqual(Mock.QUESTION_ID);
        });

        xit('should return an object with answer property defined', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer).toBeDefined();
        });

    });

    describe('answer interface', function() {

        beforeEach(function() {
            builder.question(Mock.QUESTION_ID);
        });

        xit('isEqualTo method should call Rule.equal with question answer', function() {
            spyOn(Mock.Rule, 'equal');

            builder.answer.isEqualTo(Mock.ANSWER);

            expect(Mock.Rule.equal).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('should set answer with equal operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.equal).toBeDefined();
        });

        xit('should set equal operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.equal).toEqual(5);
        });

        xit('isGreaterThan method should call Rule.greater with question answer', function() {
            spyOn(Mock.Rule, 'greater');

            builder.answer.isGreaterThan(Mock.ANSWER);

            expect(Mock.Rule.greater).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('isGreaterThan method should set answer with greater operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isGreaterThan(5)
                            .build();

            expect(conditions[0].rules[0].answer.greater).toBeDefined();
        });

        xit('isGreaterThan method should set greater operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isGreaterThan(5)
                            .build();

            expect(conditions[0].rules[0].answer.greater).toEqual(5);
        });

        xit('isGreaterEqualTo method should call Rule.greaterEqual with question answer', function() {
            spyOn(Mock.Rule, 'greaterEqual');

            builder.answer.isGreaterEqualTo(Mock.ANSWER);

            expect(Mock.Rule.greaterEqual).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('isGreaterEqualTo method should set answer with greaterEqual operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isGreaterEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.greaterEqual).toBeDefined();
        });

        xit('isGreaterEqualTo method should set greaterEqual operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isGreaterEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.greaterEqual).toEqual(5);
        });

        xit('isLowerThan method should call Rule.lower with question answer', function() {
            spyOn(Mock.Rule, 'lower');

            builder.answer.isLowerThan(Mock.ANSWER);

            expect(Mock.Rule.lower).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('isLowerThan method should set answer with lower operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isLowerThan(5)
                            .build();

            expect(conditions[0].rules[0].answer.lower).toBeDefined();
        });

        xit('isLowerThan method should set lower operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isLowerThan(5)
                            .build();

            expect(conditions[0].rules[0].answer.lower).toEqual(5);
        });

        xit('isLowerEqualTo method should call Rule.lowerEqual with question answer', function() {
            spyOn(Mock.Rule, 'lowerEqual');

            builder.answer.isLowerEqualTo(Mock.ANSWER);

            expect(Mock.Rule.lowerEqual).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('isLowerEqualTo method should set answer with lowerEqual operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isLowerEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.lowerEqual).toBeDefined();
        });

        xit('isLowerEqualTo method should set lowerEqual operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isLowerEqualTo(5)
                            .build();

            expect(conditions[0].rules[0].answer.lowerEqual).toEqual(5);
        });

        xit('isBetween method should call Rule.between with question answer range', function() {
            spyOn(Mock.Rule, 'between');

            builder.answer.isBetween(Mock.ANSWER_RANGE);

            expect(Mock.Rule.between).toHaveBeenCalledWith(Mock.ANSWER_RANGE, undefined);
        });

        xit('isBetween method should call Rule.between with question range start and range end', function() {
            spyOn(Mock.Rule, 'between');

            builder.answer.isBetween(Mock.ANSWER_RANGE[0], Mock.ANSWER_RANGE[1]);

            expect(Mock.Rule.between).toHaveBeenCalledWith(Mock.ANSWER_RANGE[0], Mock.ANSWER_RANGE[1]);
        });

        xit('isBetween method should set answer with between operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isBetween(5, 10)
                            .build();

            expect(conditions[0].rules[0].answer.between).toBeDefined();
        });

        xit('isBetween method should set between operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .isBetween(5, 10)
                            .build();

            expect(conditions[0].rules[0].answer.between).toEqual([5, 10]);
        });

        xit('contains method should call Rule.contains with question answer', function() {
            spyOn(Mock.Rule, 'contains');

            builder.answer.contains(Mock.ANSWER);

            expect(Mock.Rule.contains).toHaveBeenCalledWith(Mock.ANSWER);
        });

        xit('isLowerEqualTo method should set answer with contains operator', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .contains('Value to compare')
                            .build();

            expect(conditions[0].rules[0].answer.contains).toBeDefined();
        });

        xit('isLowerEqualTo method should set contains operator with value equal to parameter', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID)
                            .answer
                            .contains('Value to compare')
                            .build();

            expect(conditions[0].rules[0].answer.contains).toEqual('Value to compare');
        });

    });

    describe('and interface', function() {

        xit('should be defined', function() {
            expect(builder.and).toBeDefined();
        });

        xit('should have question method defined', function() {
            expect(builder.question(Mock.QUESTION_ID).and().question).toBeDefined();
        });

        xit('should have answer interface defined', function() {
            expect(builder.question(Mock.QUESTION_ID).and().answer).toBeDefined();
        });

        xit('should have and interface undefined', function() {
            expect(builder.question(Mock.QUESTION_ID).and().and).toBeUndefined();
        });

        xit('should return an object with answer property defined', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID).answer.isGreaterThan(13)
                            .and()
                            .answer.isLowerThan(17)
                            .build();

            expect(conditions[0].rules.length).toEqual(2);
        });

        xit('should return an object with first rule having when property equal to Mock.QUESTION_ID', function() {
            var conditions = builder
                            .question(Mock.QUESTION_ID).answer.isGreaterThan(13)
                            .and()
                            .answer.isLowerThan(17)
                            .build();

            expect(conditions[0].rules[0].when).toEqual(Mock.QUESTION_ID);
        });

        it('should return an object with second rule having when property equal to Mock.QUESTION_2ID', function() {
            // builder.question(Mock.QUESTION_ID).answer.isGreaterThan(13);
            builder = factory.create();
            builder.question(Mock.QUESTION_2ID).answer.contains(17);

            var conditions = builder.build();

            expect(conditions[0].rules[0].when).toEqual(Mock.QUESTION_2ID);
        });

    });

    describe('or interface', function() {

        xit('should be defined', function() {
            expect(builder.or).toBeDefined();
        });

        xit('should have question method defined', function() {
            expect(builder.question(Mock.QUESTION_ID).or().question).toBeDefined();
        });

        xit('should have answer interface defined', function() {
            expect(builder.question(Mock.QUESTION_ID).or().answer).toBeDefined();
        });

        xit('should have and interface undefined', function() {
            expect(builder.question(Mock.QUESTION_ID).or().or).toBeUndefined();
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
        Mock.QUESTION_2ID = 'Q2ID';
    }

    function mockQuestionAnswer() {
        Mock.ANSWER = 'ANSWER';
    }

    function mockAnswerRange() {
        Mock.ANSWER_RANGE = [1, 10];
    }

});
