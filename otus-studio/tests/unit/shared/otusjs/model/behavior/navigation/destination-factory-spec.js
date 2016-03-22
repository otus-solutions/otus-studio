describe('DestinationFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('DestinationFactory', {
                'UUID': mockUUID(_$injector_)
            });
        });

        destination = factory.create('POSITION_OID');
    });

    describe('create method', function() {

        it('should call UUID.generateUUID', function() {
            expect(Mock.UUID.generateUUID).toHaveBeenCalled();
        });

        it('should return a defined object', function() {
            expect(destination).toBeDefined();
        });

        it('should return a Destination object with extends value equal to "StudioObject"', function() {
            expect(destination.extends).toBe('StudioObject');
        });

        it('should return a Destination object with objectType value equal to "Destination"', function() {
            expect(destination.objectType).toBe('Destination');
        });

        it('should return a Destination object with a valid oid value', function() {
            expect(destination.oid).toBeDefined();
        });

        it('should return a Destination object with a valid position value', function() {
            expect(destination.position).toEqual('POSITION_OID');
        });

        it('should return a Destination object with a valid rule value', function() {
            expect(destination.rule).toBeDefined();
        });

    });

    function mockUUID($injector) {
        Mock.UUID = $injector.get('UUID');

        spyOn(Mock.UUID, 'generateUUID').and.callThrough();

        return Mock.UUID;
    }

});
