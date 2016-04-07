describe('JsonCloner', function() {

    var Mock = {};

    beforeEach(function() {
        module('utils');

        mockObjectToClone();

        inject(function(_$injector_) {
            service = _$injector_.get('JsonClonerService');
        });
    });

    describe('clone method', function() {

        var jsonClone;

        beforeEach(function() {
            jsonClone = service.clone(Mock.original);
        });

        it('should return a json with stringProperty from Mock.original', function() {
            expect(jsonClone.search('stringProperty')).not.toBe(-1);
        });

        it('should return a json with stringProperty value from Mock.original', function() {
            expect(jsonClone.search('stringProperty value')).not.toBe(-1);
        });

        it('should return a json with integerProperty from Mock.original', function() {
            expect(jsonClone.search('integerProperty')).not.toBe(-1);
        });

        it('should return a json with integerProperty value from Mock.original', function() {
            expect(jsonClone.search(6846)).not.toBe(-1);
        });

        it('should return a json with integerProperty value from Mock.original', function() {
            expect(jsonClone).toBe(Mock.originalJson);
        });

    });

    function mockObjectToClone() {
        Mock.original = {
            stringProperty: 'stringProperty value',
            integerProperty: 6846,
            objectProperty: {
                otherStringProperty: 'otherStringProperty value',
                otherIntegerProperty: 684
            },
            arrayProperty: [{
                subObjectProperty: {
                    subArrayInt: [1, 2, 3, 4]
                }
            }, {
                subObjectProperty: {
                    subArrayStr: ['1', '2', '3', '4'],
                    subFunctionProperty: function(c) {
                        return c;
                    }
                }
            }],
            functionProperty: function(c) {
                return c;
            }
        };

        Mock.originalJson = JSON.stringify(Mock.original);
    }

});
