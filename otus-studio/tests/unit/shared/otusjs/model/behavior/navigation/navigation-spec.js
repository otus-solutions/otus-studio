describe('Navigation', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        mockNavigationProperties();

        inject(function(_$injector_) {
            factory = _$injector_.get('NavigationFactory');
        });

        navigation = factory.create(Mock.ORIGIN);
    });

    describe('addRoute method', function() {

        it('should push a new route in route list', function() {
            navigation.addRoute(jasmine.any(Object));

            expect(navigation.listRoutes().length).toBe(1);
        });

    });

    describe('removeDestination method', function() {

        beforeEach(function() {
            navigation.addRoute(Mock.route);
        });

        it('should remove the route from route list by the "to" identifier', function() {
            navigation.removeRoute(Mock.TO);

            expect(navigation.listRoutes().length).toBe(0);
        });

    });

    function mockNavigationProperties() {
        Mock.STUDIO_OBJECT = 'StudioObject';
        Mock.ORIGIN = 'ORIGIN';
        Mock.TO = 'TO';

        Mock.route = {
            to: Mock.TO
        };
    }

});
