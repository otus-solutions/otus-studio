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

        beforeEach(function() {
            navigation = factory.create(Mock.ORIGIN);
        });

        it('should return an object that extends StudioObject', function() {
            expect(navigation.getExtents()).toEqual(Mock.STUDIO_OBJECT);
        });

        it('should return an object of Navigation type', function() {
            expect(navigation.getObjectType()).toEqual(Mock.NAVIGATION);
        });

        it('should return an object with a valid origin defined', function() {
            expect(navigation.getOrigin()).toBeDefined();
        });

        it('should return an object with an array of destinations', function() {
            expect(navigation.listRoutes()).toBeDefined();
        });

    });

    function mockNavigationProperties() {
        Mock.STUDIO_OBJECT = 'StudioObject';
        Mock.NAVIGATION = 'Navigation';
        Mock.ORIGIN = 'ORIGIN';
    }

});
