describe('Rule', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        mockWhen();
        mockAnswer();

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleFactory');
        });

        rule = factory.create(Mock.WHEN);
    });

    describe('within method', function() {

        var POSSIBLE_VALUES = [1, 2, 3];

        beforeEach(function() {
            rule.within(POSSIBLE_VALUES);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "within" property', function() {
            expect(rule.answer.within).toBe(POSSIBLE_VALUES);
        });

    });

    describe('equal method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            rule.equal(POSSIBLE_VALUE);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "equal" property', function() {
            expect(rule.answer.equal).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greater method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            rule.greater(POSSIBLE_VALUE);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "greater" property', function() {
            expect(rule.answer.greater).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greaterEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.greaterEqual(POSSIBLE_VALUE);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "greaterEqual" property', function() {
            expect(rule.answer.greaterEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lower method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.lower(POSSIBLE_VALUE);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "lower" property', function() {
            expect(rule.answer.lower).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lowerEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.lowerEqual(POSSIBLE_VALUE);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "lowerEqual" property', function() {
            expect(rule.answer.lowerEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('between method', function() {

        var POSSIBLE_RANGE = [1, 10];

        it('should attach the condition to rule.answer', function() {
            rule.between(1, 10);
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "between" property', function() {
            rule.between([1, 10]);

            expect(rule.answer.between).toEqual(POSSIBLE_RANGE);
        });

        it('should set the array values to "between" property', function() {
            rule.between(1, 10);

            expect(rule.answer.between).toEqual(POSSIBLE_RANGE);
        });

    });

    describe('contains method', function() {

        beforeEach(function() {
            rule.contains(Mock.ANSWER);
        });

        it('should attach the condition to rule.answer', function() {
            expect(rule.answer).toBeDefined();
        });

        it('should set the array values to "contains" property', function() {
            expect(rule.answer.contains).toBe(Mock.ANSWER);
        });

    });

    describe('toJson method', function() {
        var json;

        beforeEach(function() {
            rule.contains(Mock.ANSWER);
            json = rule.toJson();
        });

        it('result a json version with when attribute', function() {
            expect(json.when).toBeDefined();
            expect(json.when).toEqual(Mock.WHEN);
        });

        it('result a json version with answer attribute', function() {
            expect(json.when).toBeDefined();
            expect(json.answer.contains).toBeDefined();
            expect(json.answer.contains).toEqual(Mock.ANSWER);
        });

    });

    function mockWhen() {
        Mock.WHEN = 'QUESTION_ID';
    }

    function mockAnswer() {
        Mock.ANSWER = 'ANSWER';
    }

});
