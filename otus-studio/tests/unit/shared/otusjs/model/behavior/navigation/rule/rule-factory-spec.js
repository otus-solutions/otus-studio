describe('RuleFactory', function() {
    var Mock = {};
    var rule;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleFactory');
        });

        rule = factory.create('QUESTION_ID');
    });

    describe('create method', function() {

        it('should return a defined object', function() {
            expect(rule).toBeDefined();
        });

        it('should return a RuleCondition object with extends value equal to "StudioObject"', function() {
            expect(rule.getExtents()).toBe('StudioObject');
        });

        it('should return a RuleCondition object with objectType value equal to "RuleCondition"', function() {
            expect(rule.getObjectType()).toBe('Rule');
        });

        it('should return a RuleCondition object with a valid when value', function() {
            expect(rule.getWhen()).toBeDefined();
        });

    });

});
