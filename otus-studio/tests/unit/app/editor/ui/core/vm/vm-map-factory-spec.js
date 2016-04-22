describe('VmMapFactory', function () {
    var vmMap;

    beforeEach(function () {
        module('studio');

        inject(function(_$injector_) {
            var factory = _$injector_.get('VmMapFactory');
            vmMap = factory.create();
        });
    });

    describe('from create method', function () {

        it('an object should be returned with method set', function () {
            expect(vmMap.set).toBeDefined();
        });

        it('an object should be returned with method get', function () {
            expect(vmMap.get).toBeDefined();
        });

    });

});
