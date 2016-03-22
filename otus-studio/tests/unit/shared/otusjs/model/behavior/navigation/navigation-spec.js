describe('Navigation', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        /* Mock*/
        mockDestinations();

        inject(function(_$injector_) {
            factory = _$injector_.get('NavigationFactory');
        });

        navigation = factory.create('ORIGIN_OID');
    });

    describe('addDestination method', function() {

        it('should put a destination in destinations map', function() {
            expect(navigation.getDestinationsCount()).toBe(0);

            navigation.addDestination(jasmine.any(Object));

            expect(navigation.getDestinationsCount()).toBe(1);
        });

    });

    describe('removeDestination method', function() {

        beforeEach(function() {
            navigation.addDestination(Mock.destinationA);
            navigation.addDestination(Mock.destinationB);
        });

        it('should remove the destination from destinations map', function() {
            navigation.removeDestination(Mock.destinationA.oid);

            expect(navigation.getDestinationsCount()).toBe(1);
        });

    });

    function mockDestinations() {
        Mock.destinationA = {
            oid: 'A'
        };

        Mock.destinationB = {
            oid: 'B'
        };
    }

});
