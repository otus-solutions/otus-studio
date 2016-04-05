describe('Rule', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        mockConditionName();

        inject(function(_$injector_) {
            mockRules(_$injector_);

            factory = _$injector_.get('RouteConditionFactory');
        });

        condition = factory.create(Mock.CONDITION_NAME);
    });

    describe('addRule method', function() {

        it('should put a condition in conditions map', function() {
            condition.addRule(Mock.ruleA);

            expect(condition.rules.length).toBe(1);
        });

        it('should not put a condition twice', function() {
            condition.addRule(Mock.ruleA);
            condition.addRule(Mock.ruleA);

            condition.addRule(Mock.ruleB);
            condition.addRule(Mock.ruleB);

            expect(condition.rules.length).toBe(2);
        });

    });

    describe('removeRule method', function() {

        beforeEach(function() {
            condition.addRule(Mock.ruleA);
            condition.addRule(Mock.ruleB);
        });

        it('should remove the condition from conditions map', function() {
            condition.removeRule(Mock.ruleA);

            expect(condition.rules.length).toBe(1);
        });

        it('should remove exactly the specified condition from conditions map', function() {
            condition.removeRule(Mock.ruleB);

            expect(condition.rules[0].answer.equal).toBeDefined();
        });

    });

    describe('toJson method', function() {
        var json;

        beforeEach(function() {
            condition.addRule(Mock.ruleA);
            condition.addRule(Mock.ruleB);
            json = condition.toJson();
        });

        it('result a json version with name attribute', function() {
            expect(json.name).toBeDefined();
            expect(json.name).toEqual(Mock.CONDITION_NAME);
        });

        it('result a json version with rules attribute', function() {
            expect(json.rules).toBeDefined();
            expect(json.rules[0]).toEqual(Mock.ruleA.toJson());
            expect(json.rules[1]).toEqual(Mock.ruleB.toJson());
        });

    });

    function mockConditionName() {
        Mock.CONDITION_NAME = 'CONDITION_NAME';
    }

    function mockRules($injector) {
        Mock.QUESTION_ID = 'QUESTION_ID';
        Mock.QUESTION_2ID = 'QUESTION_2ID';

        ruleFactory = $injector.get('RuleFactory');

        Mock.ruleA = ruleFactory.create(Mock.QUESTION_ID);
        Mock.ruleA.equal(1, 10);

        Mock.ruleB = ruleFactory.create(Mock.QUESTION_2ID);
        Mock.ruleB.equal([10, 20]);
    }

});
