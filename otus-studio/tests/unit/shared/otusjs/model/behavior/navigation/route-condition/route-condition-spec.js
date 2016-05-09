describe('RouteCondition', function() {
    var Mock = {};
    var condition;

    beforeEach(function() {
        module('otusjs');

        mockConditionName();

        inject(function(_$injector_) {
            mockRules(_$injector_);

            factory = _$injector_.get('RouteConditionFactory');
        });

        mockJson();

        condition = factory.create(Mock.CONDITION_NAME);
    });

    describe('addRule method', function() {

        xit('should put a condition in conditions map', function() {
            condition.addRule(Mock.ruleA);

            expect(condition.listRules().length).toBe(1);
        });

        xit('should not put a condition twice', function() {
            condition.addRule(Mock.ruleA);
            condition.addRule(Mock.ruleA);

            condition.addRule(Mock.ruleB);
            condition.addRule(Mock.ruleB);

            expect(condition.listRules().length).toBe(2);
        });

    });

    describe('removeRule method', function() {

        beforeEach(function() {
            condition.addRule(Mock.ruleA);
            condition.addRule(Mock.ruleB);
        });

        xit('should remove the condition from conditions map', function() {
            condition.removeRule(Mock.ruleA);

            expect(condition.listRules().length).toBe(1);
        });

        xit('should remove exactly the specified condition from conditions map', function() {
            condition.removeRule(Mock.ruleB);

            expect(condition.listRules()[0].getAnswer().equal).toBeDefined();
        });

    });

    describe('toJson method', function() {

        beforeEach(function() {
            condition.addRule(Mock.ruleA);
        });

        xit('should return a well formatted json based on RouteCondition', function() {
            expect(condition.toJson()).toEqual(Mock.json);
        });

    });

    function mockConditionName() {
        Mock.CONDITION_NAME = 'CONDITION_NAME';
    }

    function mockRules($injector) {
        Mock.QUESTION_ID = 'QUESTION_ID';
        Mock.QUESTION_2ID = 'QUESTION_2ID';

        ruleFactory = $injector.get('RuleFactory');

        Mock.ruleA = ruleFactory.create(Mock.QUESTION_ID);
        Mock.ruleA.equal(1, 10);

        Mock.ruleB = ruleFactory.create(Mock.QUESTION_2ID);
        Mock.ruleB.equal([10, 20]);
    }

    function mockJson() {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'RouteCondition',
            name: Mock.CONDITION_NAME,
            rules: [Mock.ruleA.toJson()]
        }).replace(/"{/g, '{').replace(/\}"/g, '}').replace(/\\/g, '');
    }

});
