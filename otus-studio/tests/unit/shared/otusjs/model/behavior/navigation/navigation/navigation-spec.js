describe('Navigation', function() {
    var Mock = {};
    var navigation;

    beforeEach(function() {
        module('otusjs');

        mockNavigationProperties();

        inject(function(_$injector_) {
            mockRoute(_$injector_);

            factory = _$injector_.get('NavigationFactory');
        });

        mockJson();

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
            navigation.removeRoute(Mock.route.name);

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

    describe('toJson method', function() {

        beforeEach(function() {
            navigation.addRoute(Mock.route);
        });

        it('should return a well formatted json based on TimeQuestion', function() {
            expect(navigation.toJson()).toEqual(Mock.json);
        });

    });


    function mockNavigationProperties() {
        Mock.STUDIO_OBJECT = 'StudioObject';
        Mock.ORIGIN = 'ORIGIN';
        Mock.TO = 'TO';
        Mock.ROUTE_NAME = Mock.ORIGIN + '-' + Mock.TO + '-' + 0;
    }

    function mockRoute($injector) {
        Mock.route = $injector.get('RouteFactory').create(Mock.ORIGIN, Mock.ORIGIN, Mock.TO);
    }

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'Navigation',
            index: null,
            origin: Mock.ORIGIN,
            routes: [Mock.route.toJson()]
        }).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
    }

});
