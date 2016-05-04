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

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "within" property', function() {
            expect(rule.getAnswer().within).toBe(POSSIBLE_VALUES);
        });

    });

    describe('equal method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            rule.equal(POSSIBLE_VALUE);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "equal" property', function() {
            expect(rule.getAnswer().equal).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greater method', function() {

        var POSSIBLE_VALUE = 'POSSIBLE_VALUE';

        beforeEach(function() {
            rule.greater(POSSIBLE_VALUE);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "greater" property', function() {
            expect(rule.getAnswer().greater).toBe(POSSIBLE_VALUE);
        });

    });

    describe('greaterEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.greaterEqual(POSSIBLE_VALUE);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "greaterEqual" property', function() {
            expect(rule.getAnswer().greaterEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lower method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.lower(POSSIBLE_VALUE);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "lower" property', function() {
            expect(rule.getAnswer().lower).toBe(POSSIBLE_VALUE);
        });

    });

    describe('lowerEqual method', function() {

        var POSSIBLE_VALUE = 2;

        beforeEach(function() {
            rule.lowerEqual(POSSIBLE_VALUE);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "lowerEqual" property', function() {
            expect(rule.getAnswer().lowerEqual).toBe(POSSIBLE_VALUE);
        });

    });

    describe('between method', function() {

        var POSSIBLE_RANGE = [1, 10];

        xit('should attach the condition to rule.getAnswer()', function() {
            rule.between(1, 10);
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "between" property', function() {
            rule.between([1, 10]);

            expect(rule.getAnswer().between).toEqual(POSSIBLE_RANGE);
        });

        xit('should set the array values to "between" property', function() {
            rule.between(1, 10);

            expect(rule.getAnswer().between).toEqual(POSSIBLE_RANGE);
        });

    });

    describe('contains method', function() {

        beforeEach(function() {
            rule.contains(Mock.ANSWER);
        });

        xit('should attach the condition to rule.getAnswer()', function() {
            expect(rule.getAnswer()).toBeDefined();
        });

        xit('should set the array values to "contains" property', function() {
            expect(rule.getAnswer().contains).toBe(Mock.ANSWER);
        });

    });

    describe('toJson method', function() {
        var json;

        beforeEach(function() {
            rule.contains(Mock.ANSWER);
            json = rule.toJson();
        });

        xit('result a json version with when attribute', function() {
            expect(json.when).toBeDefined();
            expect(json.when).toEqual(Mock.WHEN);
        });

        xit('result a json version with answer attribute', function() {
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
