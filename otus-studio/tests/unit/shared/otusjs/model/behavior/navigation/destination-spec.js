describe('Destination', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');

        /* Mock*/
        mockRules();

        inject(function(_$injector_) {
            factory = _$injector_.get('DestinationFactory');
        });

        destination = factory.create('POSITION_OID');
    });

    describe('addRule method', function() {

        it('should put a rule in rules map', function() {
            expect(destination.getRulesCount()).toBe(0);

            destination.addRule(jasmine.any(Object));

            expect(destination.getRulesCount()).toBe(1);
        });

    });

    describe('removeRule method', function() {

        beforeEach(function() {
            destination.addRule(Mock.ruleA);
            destination.addRule(Mock.ruleB);
        });

        it('should remove the rule from rules map', function() {
            destination.removeRule(Mock.ruleA.name);

            expect(destination.getRulesCount()).toBe(1);
        });

    });

    function mockRules() {
        Mock.ruleA = {
            name: 'A'
        };

        Mock.ruleB = {
            name: 'B'
        };
    }

});
