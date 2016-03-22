describe('NavigationFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('NavigationFactory', {
                'UUID': mockUUID(_$injector_)
            });
        });
    });

    describe('create method', function() {

        beforeEach(function() {
            navigation = factory.create('ORIGIN_OID');
        });

        it('should call UUID.generateUUID', function() {
            expect(Mock.UUID.generateUUID).toHaveBeenCalled();
        });

        it('should return a defined object', function() {
            expect(navigation).toBeDefined();
        });

        it('should return a Navigation object with extends value equal to "StudioObject"', function() {
            expect(navigation.extends).toBe('StudioObject');
        });

        it('should return a Navigation object with objectType value equal to "Navigation"', function() {
            expect(navigation.objectType).toBe('Navigation');
        });

        it('should return a Navigation object with a valid oid value', function() {
            expect(navigation.oid).toBeDefined();
        });

        it('should return a Navigation object with a valid origin value', function() {
            expect(navigation.origin).toBeDefined();
        });

        it('should return a Navigation object with a valid destinations value', function() {
            expect(navigation.destinations).toEqual({});
        });

    });

    function mockUUID($injector) {
        Mock.UUID = $injector.get('UUID');

        spyOn(Mock.UUID, 'generateUUID').and.callThrough();

        return Mock.UUID;
    }

});
