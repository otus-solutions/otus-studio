describe('RuleFactory', function() {
    var Mock = {};
    var routeCondition;

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteConditionFactory');
        });

        routeCondition = factory.create('RULE_NAME');
    });

    describe('create method', function() {

        xit('should return a defined object', function() {
            expect(routeCondition).toBeDefined();
        });

        xit('should return a RouteCondition object with extends value equal to "StudioObject"', function() {
            expect(routeCondition.extents).toBe('StudioObject');
        });

        xit('should return a RouteCondition object with objectType value equal to "RouteCondition"', function() {
            expect(routeCondition.objectType).toBe('RouteCondition');
        });

        xit('should return a RouteCondition object with a name value', function() {
            expect(routeCondition.name).toEqual('RULE_NAME');
        });

        xit('should return a RouteCondition object with a valid conditions map', function() {
            expect(routeCondition.listRules()).toBeDefined();
        });

    });

});
