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

    describe('from new instance', function() {

        describe('listRoutes method', function() {

            var navigation;

            beforeEach(function() {
                navigation = factory.create(Mock.ORIGIN);
            });

            it('should return an array of routes with size equal to 0', function() {
                expect(navigation.listRoutes().length).toBe(0);
            });

            it('should return a clone of original array of routes', function() {
                var clone = navigation.listRoutes();

                clone.push(jasmine.any(Object));

                expect(clone.length).not.toBe(navigation.listRoutes().length);
            });

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
