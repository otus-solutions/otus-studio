describe('VmMap', function() {
    var Mock = {};
    var vmMap;

    beforeEach(function() {
        module('studio');

        mockVms();

        inject(function(_$injector_) {
            var factory = _$injector_.get('VmMapFactory');
            vmMap = factory.create();
        });
    });

    describe('set method', function() {

        beforeEach(function() {
            vmMap.set(Mock.vm1);
        });

        it('should add a new value on the map when the key not already exist', function() {
            expect(vmMap.get('1')).toBeDefined();
        });

        it('should update a value on the map when the key already exist', function() {
            vmMap.set(Mock.vm2);
            var returnedVm = vmMap.get('1');
            expect(returnedVm.name).toEqual('vm2');
        });

    });

    describe('from get method', function() {

        beforeEach(function() {
            vmMap.set(Mock.vm1);
        });

        it('a not null object should be returned', function() {
            expect(vmMap.get(1)).not.toBe(null);
        });

        it('a not undefined object should be returned', function() {
            expect(vmMap.get('1')).not.toBeUndefined();
        });

    });

    function mockVms() {
        Mock.vm1 = {
            guid: function() {
                return '1';
            },
            value: {
                name: 'vm1'
            }
        };
        Mock.vm2 = {
            guid: function() {
                return '1';
            },
            value: {
                name: 'vm2'
            }
        };
    }

});
