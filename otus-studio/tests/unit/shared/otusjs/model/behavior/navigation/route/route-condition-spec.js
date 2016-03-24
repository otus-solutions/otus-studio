describe('Rule', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        mockRuleConditions();

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteConditionFactory');
        });

        routeCondition = factory.create('RULE_NAME');
    });

    describe('addRule method', function() {

        it('should put a condition in conditions map', function() {
            routeCondition.addRule(Mock.routeConditionConditionA);

            expect(routeCondition.rules.length).toBe(1);
        });

        it('should not put a condition twice', function() {
            routeCondition.addRule(Mock.routeConditionConditionA);
            routeCondition.addRule(Mock.routeConditionConditionA);

            routeCondition.addRule(Mock.routeConditionConditionB);
            routeCondition.addRule(Mock.routeConditionConditionB);

            expect(routeCondition.rules.length).toBe(2);
        });

    });

    describe('removeRule method', function() {

        beforeEach(function() {
            routeCondition.addRule(Mock.routeConditionConditionA);
            routeCondition.addRule(Mock.routeConditionConditionB);
        });

        it('should remove the condition from conditions map', function() {
            routeCondition.removeRule(Mock.routeConditionConditionA);

            expect(routeCondition.rules.length).toBe(1);
        });

        it('should remove exactly the specified condition from conditions map', function() {
            routeCondition.addRule(Mock.routeConditionConditionB);

            expect(routeCondition.rules[0].answer.equal).toBeDefined();
        });

    });

    function mockRuleConditions() {
        Mock.routeConditionConditionA = {
            answer: {
                equal: jasmine.any(Object)
            }
        };
        Mock.routeConditionConditionB = {
            answer: {
                within: jasmine.any(Object)
            }
        };
    }

});
