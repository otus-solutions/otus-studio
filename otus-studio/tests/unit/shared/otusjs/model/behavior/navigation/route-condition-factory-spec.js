describe('RuleFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteConditionFactory');
        });

        routeCondition = factory.create('RULE_NAME');
    });

    describe('create method', function() {

        it('should return a defined object', function() {
            expect(routeCondition).toBeDefined();
        });

        it('should return a RouteCondition object with extends value equal to "StudioObject"', function() {
            expect(routeCondition.extends).toBe('StudioObject');
        });

        it('should return a RouteCondition object with objectType value equal to "RouteCondition"', function() {
            expect(routeCondition.objectType).toBe('RouteCondition');
        });

        it('should return a RouteCondition object with a name value', function() {
            expect(routeCondition.name).toEqual('RULE_NAME');
        });

        it('should return a RouteCondition object with a valid conditions map', function() {
            expect(routeCondition.rules).toBeDefined();
        });

    });

});
