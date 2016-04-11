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

        xit('should return a json with integerProperty value from Mock.original', function() {
            expect(jsonClone).toBe(Mock.originalJson);
        });

    });

    function mockObjectToClone() {
        Mock.original = new Obj();
        Mock.originalJson = JSON.stringify({
            stringProperty: 'stringProperty value',
            integerProperty: 6846,
            arrayProperty: [{
                name: 'name value',
                tSub: {
                    subName: 'tsub name value'
                }
            }, {
                name: 'name value',
                tSub: {
                    subName: 'tsub name value'
                }
            }, {
                name: 'name value',
                tSub: {
                    subName: 'tsub name value'
                }
            }, {
                name: 'name value',
                tSub: {
                    subName: 'tsub name value'
                }
            }],
            subObj: {
                name: 'name value',
                tSub: {
                    subName: 'tsub name value'
                }
            }
        });
    }

    function Obj() {
        var self = this;
        var stringProperty = 'stringProperty value';
        var integerProperty = 6846;
        var arrayProperty = [new SubObj(), new SubObj(), new SubObj(), new SubObj()];
        var subObj = new SubObj();

        self.getStringProperty = getStringProperty;
        self.getIntegerProperty = getIntegerProperty;
        self.getSubObj = getSubObj;
        self.getArrayProperty = getArrayProperty;

        function getStringProperty() {
            return stringProperty;
        }

        function getIntegerProperty() {
            return integerProperty;
        }

        function getSubObj() {
            return subObj;
        }

        function getArrayProperty() {
            return arrayProperty;
        }
    }

    function SubObj() {
        var self = this;
        var name = 'name value';
        var tSub = new TSubObj();

        self.getName = getName;
        self.getTSub = getTSub;

        function getName() {
            return name;
        }

        function getTSub() {
            return tSub;
        }
    }

    function TSubObj() {
        var self = this;
        var subName = 'tsub name value';

        self.getSubName = getSubName;

        function getSubName() {
            return subName;
        }
    }

});
