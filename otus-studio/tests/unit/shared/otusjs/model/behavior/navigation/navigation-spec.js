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

    describe('addDestination method', function() {

        it('should push a new destination in destination list', function() {
            navigation.addDestination(jasmine.any(Object));

            expect(navigation.listDestinations().length).toBe(1);
        });

    });

    describe('removeDestination method', function() {

        beforeEach(function() {
            navigation.addDestination(Mock.destination);
        });

        it('should remove the destination from destination list by the "to" identifier', function() {
            navigation.removeDestination(Mock.TO);

            expect(navigation.listDestinations().length).toBe(0);
        });

    });

    function mockNavigationProperties() {
        Mock.STUDIO_OBJECT = 'StudioObject';
        Mock.ORIGIN = 'ORIGIN';
        Mock.TO = 'TO';

        Mock.destination = {
            to: Mock.TO
        };
    }

});
