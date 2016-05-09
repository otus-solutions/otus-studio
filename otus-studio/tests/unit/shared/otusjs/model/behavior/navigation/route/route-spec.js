describe('Route', function() {
    var Mock = {};
    var route;

    beforeEach(function() {
        module('otusjs');

        mockOrigin();
        mockDestination();

        inject(function(_$injector_) {
            mockCondition(_$injector_);

            factory = _$injector_.get('RouteFactory');
        });

        mockJson();
        route = factory.create(Mock.ORIGIN, Mock.DESTINATION, 0);
    });

    describe('addCondition method', function() {

        xit('should put a new condition in route object', function() {
            route.addCondition(Mock.FakeRouteCondition);

            expect(route.getConditionSet()).toBeDefined();
            expect(route.getConditionSetSize()).toBe(1);
        });

    });

    describe('removeCondition method', function() {

        beforeEach(function() {
            route.addCondition(Mock.FakeRouteCondition);
            route.addCondition(Mock.NoRealRouteCondition);
        });

        xit('should remove the condition from route object', function() {
            route.removeCondition(Mock.FakeRouteCondition);

            expect(route.getConditionSetSize()).toBe(1);
        });

        xit('should delete conditionSet attribute from route if the size of these set is zero', function() {
            route.removeCondition(Mock.FakeRouteCondition);
            route.removeCondition(Mock.NoRealRouteCondition);

            expect(route.getConditionSet()).toEqual({});
        });

    });

    describe('getConditionSetSize method', function() {

        xit('should return zero when conditionSet is undefined', function() {
            expect(route.getConditionSetSize()).toBe(0);
        });

        xit('should return a integer equal to count of conditions added in set', function() {
            route.addCondition(Mock.FakeRouteCondition);
            route.addCondition(Mock.NoRealRouteCondition);

            expect(route.getConditionSetSize()).toBe(2);
        });

    });

    describe('from new instance', function() {

        describe('getConditionSet method', function() {

            xit('should return an object of conditions with size equal to 0', function() {
                expect(Object.keys(route.getConditionSet()).length).toBe(0);
            });

            xit('should return a clone of original object of conditions', function() {
                var clone = route.getConditionSet();

                clone.attribute = jasmine.any(Object);

                expect(Object.keys(clone).length).not.toBe(Object.keys(route.getConditionSet()).length);
            });

        });

    });

    describe('toJson method', function() {

        beforeEach(function() {
            route.addCondition(Mock.FakeRouteCondition);
        });

        xit('should return a well formatted json based on Route', function() {
            expect(route.toJson()).toEqual(Mock.json);
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

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'Route',
            name: Mock.ORIGIN,
            origin: Mock.ORIGIN,
            destination: Mock.DESTINATION,
            index: 0,
            conditionSet: {
                'Fake_Condition': Mock.FakeRouteCondition.toJson()
            }
        }).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
    }

});
