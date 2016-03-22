describe('RuleCondition', function() {

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleConditionFactory');
        });

        ruleCondition = factory.create('QUESTION_ID');
    });

    describe('within method', function() {

        var POSSIBLE_VALUES = [1, 2, 3];

        beforeEach(function() {
            ruleCondition.within(POSSIBLE_VALUES);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "within" property', function() {
            expect(ruleCondition.answer.within).toBe(POSSIBLE_VALUES);
        });

    });

    describe('equal method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            ruleCondition.equal(POSSIBLE_VALUE);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "equal" property', function() {
            expect(ruleCondition.answer.equal).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greater method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            ruleCondition.greater(POSSIBLE_VALUE);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "greater" property', function() {
            expect(ruleCondition.answer.greater).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greaterEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            ruleCondition.greaterEqual(POSSIBLE_VALUE);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "greaterEqual" property', function() {
            expect(ruleCondition.answer.greaterEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lower method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            ruleCondition.lower(POSSIBLE_VALUE);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "lower" property', function() {
            expect(ruleCondition.answer.lower).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lowerEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            ruleCondition.lowerEqual(POSSIBLE_VALUE);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "lowerEqual" property', function() {
            expect(ruleCondition.answer.lowerEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('between method', function() {

        var POSSIBLE_RANGE = [1, 10];

        it('should attach the condition to ruleCondition.answer', function() {
            ruleCondition.between(1, 10);
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "between" property', function() {
            ruleCondition.between([1, 10]);

            expect(ruleCondition.answer.between).toEqual(POSSIBLE_RANGE);
        });

        it('should set the array values to "between" property', function() {
            ruleCondition.between(1, 10);

            expect(ruleCondition.answer.between).toEqual(POSSIBLE_RANGE);
        });

    });

    describe('contains method', function() {

        var SHOULD_CONTAIN = 'text to search';

        beforeEach(function() {
            ruleCondition.contains(SHOULD_CONTAIN);
        });

        it('should attach the condition to ruleCondition.answer', function() {
            expect(ruleCondition.answer).toBeDefined();
        });

        it('should set the array values to "contains" property', function() {
            expect(ruleCondition.answer.contains).toBe(SHOULD_CONTAIN);
        });

    });

});
