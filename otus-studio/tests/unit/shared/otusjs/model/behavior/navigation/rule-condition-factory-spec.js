describe('RuleConditionFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleConditionFactory');
        });

        ruleCondition = factory.create('QUESTION_ID');
    });

    describe('create method', function() {

        it('should return a defined object', function() {
            expect(ruleCondition).toBeDefined();
        });

        it('should return a RuleCondition object with extends value equal to "StudioObject"', function() {
            expect(ruleCondition.extends).toBe('StudioObject');
        });

        it('should return a RuleCondition object with objectType value equal to "RuleCondition"', function() {
            expect(ruleCondition.objectType).toBe('RuleCondition');
        });

        it('should return a RuleCondition object with a valid when value', function() {
            expect(ruleCondition.when).toBeDefined();
        });

    });

});
