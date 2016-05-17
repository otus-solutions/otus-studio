describe('NavigationFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        mockNavigationProperties();

        inject(function(_$injector_) {
            factory = _$injector_.get('NavigationFactory');
        });
    });

    describe('create method', function() {

        var navigation;

        it('should return an object that extends StudioObject', function() {
            navigation = factory.create(Mock.ORIGIN, Mock.DESTINATION);

            expect(navigation.extents).toEqual(Mock.STUDIO_OBJECT);
        });

        it('should return an object of Navigation type', function() {
            navigation = factory.create(Mock.ORIGIN, Mock.DESTINATION);

            expect(navigation.objectType).toEqual(Mock.NAVIGATION);
        });

        it('should return an object with a valid origin defined', function() {
            navigation = factory.create(Mock.ORIGIN, Mock.DESTINATION);

            expect(navigation.origin).toBeDefined();
        });

        describe('when destination exists', function() {

            it('should return an object with an array of routes with size equal to one', function() {
                navigation = factory.create(Mock.ORIGIN, Mock.DESTINATION);

                expect(navigation.listRoutes().length).toBe(1);
            });

        });

        describe('when destination does not exists', function() {

            it('should return an object with an array of routes with size equal to zero', function() {
                navigation = factory.create(Mock.ORIGIN);

                expect(navigation.listRoutes().length).toBe(0);
            });

        });

    });

    function mockNavigationProperties() {
        Mock.STUDIO_OBJECT = 'StudioObject';
        Mock.NAVIGATION = 'Navigation';
        Mock.ORIGIN = 'ORIGIN';
        Mock.DESTINATION = 'DESTINATION';
    }

});
