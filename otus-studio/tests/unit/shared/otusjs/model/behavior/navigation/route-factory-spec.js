describe('RouteFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        /* Mock*/
        mockOrigin();
        mockDestination();
        mockRoutName();

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteFactory');
        });
    });

    describe('create method', function() {

        beforeEach(function() {
            route = factory.create(Mock.ORIGIN, Mock.DESTINATION);
        });

        it('should return a defined object', function() {
            expect(route).toBeDefined();
        });

        it('should return a Route object with extends value equal to "StudioObject"', function() {
            expect(route.getExtents()).toBe('StudioObject');
        });

        it('should return a Route object with objectType value equal to "Route"', function() {
            expect(route.getObjectType()).toBe('Route');
        });

        it('should return a Route object with a valid origin value', function() {
            expect(route.getOrigin()).toEqual(Mock.ORIGIN);
        });

        it('should return a Route object with a valid destination value', function() {
            expect(route.getDestination()).toEqual(Mock.DESTINATION);
        });

        it('should return a Route object with a valid name value', function() {
            expect(route.getName()).toEqual(Mock.ROUTE_NAME);
        });

        it('should return a Route object with a defined condition set', function() {
            expect(route.getConditionSet()).toBeDefined();
        });

    });

    function mockOrigin() {
        Mock.ORIGIN = 'ORIGIN_ID';
    }

    function mockDestination() {
        Mock.DESTINATION = 'DESTINATION_ID';
    }

    function mockRoutName() {
        Mock.ROUTE_NAME = Mock.ORIGIN + '-' + Mock.DESTINATION;
    }

});
