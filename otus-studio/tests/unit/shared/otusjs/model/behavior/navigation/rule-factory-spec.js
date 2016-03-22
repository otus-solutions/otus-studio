describe('RuleFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RuleFactory');
        });

        rule = factory.create('RULE_NAME');
    });

    describe('create method', function() {

        it('should return a defined object', function() {
            expect(rule).toBeDefined();
        });

        it('should return a Rule object with extends value equal to "StudioObject"', function() {
            expect(rule.extends).toBe('StudioObject');
        });

        it('should return a Rule object with objectType value equal to "Rule"', function() {
            expect(rule.objectType).toBe('Rule');
        });

        it('should return a Rule object with a name value', function() {
            expect(rule.name).toEqual('RULE_NAME');
        });

        it('should return a Rule object with a valid conditions map', function() {
            expect(rule.condition).toBeDefined();
        });

    });

});
