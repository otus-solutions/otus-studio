describe('Route', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        /* Mock*/
        mockOrigin();
        mockDestination();

        inject(function(_$injector_) {
            mockCondition(_$injector_);

            factory = _$injector_.get('RouteFactory');
        });

        route = factory.create(Mock.ORIGIN, Mock.DESTINATION);
    });

    describe('addCondition method', function() {

        it('should put a new condition in route object', function() {
            route.addCondition(Mock.FakeRouteCondition);

            expect(route.conditionSet).toBeDefined();
            expect(route.getConditionSetSize()).toBe(1);
        });

    });

    describe('removeCondition method', function() {

        beforeEach(function() {
            route.addCondition(Mock.FakeRouteCondition);
            route.addCondition(Mock.NoRealRouteCondition);
        });

        it('should remove the condition from route object', function() {
            route.removeCondition(Mock.FakeRouteCondition);

            expect(route.getConditionSetSize()).toBe(1);
        });

        it('should delete conditionSet attribute from route if the size of these set is zero', function() {
            route.removeCondition(Mock.FakeRouteCondition);
            route.removeCondition(Mock.NoRealRouteCondition);

            expect(route.conditionSet).toBeUndefined();
        });

    });

    describe('getConditionSetSize method', function() {

        it('should return zero when conditionSet is undefined', function() {
            expect(route.conditionSet).toBeUndefined();
            expect(route.getConditionSetSize()).toBe(0);
        });

        it('should return a integer equal to count of conditions added in set', function() {
            route.addCondition(Mock.FakeRouteCondition);
            route.addCondition(Mock.NoRealRouteCondition);

            expect(route.getConditionSetSize()).toBe(2);
        });

    });

    describe('from new instance', function() {

        describe('getConditionSet method', function() {

            it('should return an object of conditions with size equal to 0', function() {
                expect(Object.keys(route.getConditionSet()).length).toBe(1);
            });

            it('should return a clone of original object of conditions', function() {
                var clone = route.getConditionSet();

                clone.attribute = jasmine.any(Object);

                expect(Object.keys(clone).length).not.toBe(Object.keys(route.getConditionSet()).length);
            });

        });

    });

    describe('toJson method with undefined route condition set', function() {
        var json = null;

        beforeEach(function() {
            json = route.toJson();
        });

        it('should return and object with "name" property equal to Route.name', function() {
            expect(json.name).toEqual(route.name);
        });

        it('should return and object with "origin" property equal to Route.origin', function() {
            expect(json.origin).toEqual(route.origin);
        });

        it('should return and object with "destination" property equal to Route.destination', function() {
            expect(json.destination).toEqual(route.destination);
        });

        it('should return and object without "conditionSet" property', function() {
            expect(json.conditionSet).toBeUndefined();
        });

    });

    describe('toJson method with defined route condition set', function() {
        var json = null;

        beforeEach(function() {
            route.addCondition(Mock.FakeRouteCondition);
            route.addCondition(Mock.NoRealRouteCondition);

            json = route.toJson();
        });

        it('should return and object with "name" property equal to Route.name', function() {
            expect(json.name).toEqual(route.name);
        });

        it('should return and object with "origin" property equal to Route.origin', function() {
            expect(json.origin).toEqual(route.origin);
        });

        it('should return and object with "destination" property equal to Route.destination', function() {
            expect(json.destination).toEqual(route.destination);
        });

        it('should return and object with "conditionSet" equal to Route.conditionSet', function() {
            expect(json.conditionSet).toBeDefined();
        });

    });

    function mockOrigin() {
        Mock.ORIGIN = 'ORIGIN_ID';
    }

    function mockDestination() {
        Mock.DESTINATION = 'DESTINATION_ID';
    }

    function mockCondition($injector) {
        var conditionFactory = $injector.get('RouteConditionFactory');
        Mock.FakeRouteCondition = conditionFactory.create('Fake Condition');
        Mock.NoRealRouteCondition = conditionFactory.create('No Real Condition');
    }

});
