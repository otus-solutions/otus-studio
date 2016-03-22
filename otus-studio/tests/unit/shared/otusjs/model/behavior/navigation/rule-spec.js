describe('Rule', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        mockRuleConditions();

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleFactory');
        });

        rule = factory.create('RULE_NAME');
    });

    describe('addCondition method', function() {

        it('should put a condition in conditions map', function() {
            rule.addCondition(Mock.ruleConditionA);

            expect(rule.condition.length).toBe(1);
        });

        it('should not put a condition twice', function() {
            rule.addCondition(Mock.ruleConditionA);
            rule.addCondition(Mock.ruleConditionA);

            rule.addCondition(Mock.ruleConditionB);
            rule.addCondition(Mock.ruleConditionB);

            expect(rule.condition.length).toBe(2);
        });

    });

    describe('addCondition method', function() {

        beforeEach(function() {
            rule.addCondition(Mock.ruleConditionA);
            rule.addCondition(Mock.ruleConditionB);
        });

        it('should remove the condition from conditions map', function() {
            rule.removeCondition(Mock.ruleConditionA);

            expect(rule.condition.length).toBe(1);
        });

        it('should remove exactly the specified condition from conditions map', function() {
            rule.addCondition(Mock.ruleConditionB);

            expect(rule.condition[0].answer.equal).toBeDefined();
        });

    });

    function mockRuleConditions() {
        Mock.ruleConditionA = {
            answer: {
                equal: jasmine.any(Object)
            }
        };
        Mock.ruleConditionB = {
            answer: {
                within: jasmine.any(Object)
            }
        };
    }

});
