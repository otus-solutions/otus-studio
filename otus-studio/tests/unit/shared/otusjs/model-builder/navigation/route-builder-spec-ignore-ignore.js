describe('RouteBuilder', function() {
    var Mock = {};
    var ORIGIN = 'ORIGIN';
    var DESTINATION = 'DESTINATION';

    beforeEach(function() {
        module('otusjs');

        mockConditionName();
        mockQuestionID();

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteBuilderFactory', {
                'RouteFactory': mockRouteFactory(_$injector_)
            });
        });

        builder = factory.create();
    });

    describe('createRoute method', function() {
        var object = null;

        beforeEach(function() {
            object = builder.createRoute();
        });

        it('should return the routerBuilder with "from" function attached', function() {
            expect(builder.from).toBeDefined();
        });

        it('should return the routerBuilder itself', function() {
            expect(object).toEqual(builder);
        });

    });

    describe('from method', function() {
        var object = null;

        beforeEach(function() {
            object = builder.createRoute().from(ORIGIN);
        });

        it('should return the routerBuilder with "to" function attached', function() {
            expect(builder.to).toBeDefined();
        });

        it('should should return the routerBuilder itself', function() {
            expect(object).toEqual(builder);
        });

    });

    describe('to method', function() {
        var object = null;

        beforeEach(function() {
            object = builder.createRoute().from(ORIGIN).to(DESTINATION);
        });

        it('should call RouteFactory.create with origin and destination', function() {
            expect(Mock.RouteFactory.create).toHaveBeenCalledWith(ORIGIN, DESTINATION);
        });

        it('should return the routerBuilder with "getRoute" function attached', function() {
            expect(builder.build).toBeDefined();
        });

        it('should should return the routerBuilder itself', function() {
            expect(object).toEqual(builder);
        });

    });

    describe('build method', function() {

        var route;

        beforeEach(function() {
            route = builder.createRoute()
                .from(ORIGIN)
                .to(DESTINATION)
                .underCondition(Mock.CONDITION_A)
                .question(Mock.QUESTION_ID).answer.isEqualTo(5)
                .build();
        });

        it('should add a condition in condition set', function() {
            expect(route.conditionSet[Mock.CONDITION_A]).toBeDefined();
            expect(route.getConditionSetSize()).toEqual(1);
        });

        it('should add a condition in condition set with key equal to condition name', function() {
            expect(route.conditionSet[Mock.CONDITION_A].name).toEqual(Mock.CONDITION_A);
        });

        it('should add a rule in condition', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules.length).toEqual(1);
        });

        it('should add a rule in condition where "when" property should be defined', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[0].when).toBeDefined();
        });

        it('should add a rule in condition where "when" property should be defined with value equal to question method parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[0].when).toEqual(Mock.QUESTION_ID);
        });

        it('should add a rule in condition where answer should be compared with operator called', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[0].answer.equal).toBeDefined();
        });

        it('should add a rule in condition where answer should be compared against comparator parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[0].answer.equal).toEqual(5);
        });

    });

    describe('and operator', function() {

        var route;

        beforeEach(function() {
            route = builder.createRoute()
                .from(ORIGIN)
                .to(DESTINATION)
                .underCondition(Mock.CONDITION_A)
                .question(Mock.QUESTION_ID).answer.isGreaterThan(5)
                .and()
                .question(Mock.QUESTION_ID).answer.isLowerThan(15)
                .build();
        });

        it('should add another rule in condition', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules.length).toEqual(2);
        });

        it('should add another rule in condition where "when" property should be defined', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[1].when).toBeDefined();
        });

        it('should add another rule in condition where "when" property should be defined with value equal to question method parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[1].when).toEqual(Mock.QUESTION_ID);
        });

        it('should add another rule in condition where answer should be compared with operator called', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[1].answer.lower).toBeDefined();
        });

        it('should add another rule in condition where answer should be compared against comparator parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_A].rules[1].answer.lower).toEqual(15);
        });

    });

    describe('or operator', function() {

        var route;

        beforeEach(function() {
            route = builder.createRoute()
                .from(ORIGIN)
                .to(DESTINATION)
                .underCondition(Mock.CONDITION_A)
                .question(Mock.QUESTION_ID).answer.isEqualTo(5)
                .or()
                .underCondition(Mock.CONDITION_B)
                .question(Mock.QUESTION_2ID).answer.isEqualTo(3)
                .build();
        });

        it('should add another condition in condition set', function() {
            expect(route.conditionSet[Mock.CONDITION_B]).toBeDefined();
            expect(route.getConditionSetSize()).toEqual(2);
        });

        it('should add a condition in condition set with key equal to condition name', function() {
            expect(route.conditionSet[Mock.CONDITION_B].name).toEqual(Mock.CONDITION_B);
        });

        it('should add a rule in condition', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules.length).toEqual(1);
        });

    });

    describe('or operator with and operator', function() {

        var route;

        beforeEach(function() {
            route = builder.createRoute()
                .from(ORIGIN)
                .to(DESTINATION)
                .underCondition(Mock.CONDITION_A)
                .question(Mock.QUESTION_ID).answer.isEqualTo(5)
                .or()
                .underCondition(Mock.CONDITION_B)
                .question(Mock.QUESTION_2ID).answer.isEqualTo(3)
                .and()
                .question(Mock.QUESTION_2ID).answer.contains(3)
                .build();
        });

        it('should add another rule in condition', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules.length).toEqual(2);
        });

        it('should add another rule in condition where "when" property should be defined', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules[1].when).toBeDefined();
        });

        it('should add another rule in condition where "when" property should be defined with value equal to question method parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules[1].when).toEqual(Mock.QUESTION_2ID);
        });

        it('should add another rule in condition where answer should be compared with operator called', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules[1].answer.contains).toBeDefined();
        });

        it('should add another rule in condition where answer should be compared against comparator parameter', function() {
            expect(route.conditionSet[Mock.CONDITION_B].rules[1].answer.contains).toEqual(3);
        });

    });


    describe('json format of builded route', function() {

        var json;

        beforeEach(function() {
            var route = builder.createRoute()
                .from(ORIGIN)
                .to(DESTINATION)
                .underCondition(Mock.CONDITION_A)
                .question(Mock.QUESTION_ID).answer.isEqualTo(5)
                .or()
                .underCondition(Mock.CONDITION_B)
                .question(Mock.QUESTION_2ID).answer.isEqualTo(3)
                .and()
                .question(Mock.QUESTION_2ID).answer.contains(3)
                .build();

            json = route.toJson();
        });

        it('should have a name', function() {
            expect(json.name).toEqual(ORIGIN + '-' + DESTINATION);
        });

        it('should have a origin', function() {
            expect(json.origin).toEqual(ORIGIN);
        });

        it('should have a destination', function() {
            expect(json.destination).toEqual(DESTINATION);
        });

        it('should have the CONDITION_A', function() {
            expect(json.conditionSet.CONDITION_A).toBeDefined();
        });

        it('should have the CONDITION_A with when value equal to QID', function() {
            expect(json.conditionSet.CONDITION_A[0].when).toEqual(Mock.QUESTION_ID);
        });

        it('should have the CONDITION_A with answer defined to equal 5', function() {
            expect(json.conditionSet.CONDITION_A[0].answer.equal).toEqual(5);
        });

        it('should have the CONDITION_B', function() {
            expect(json.conditionSet.CONDITION_B).toBeDefined();
        });

        it('should have the CONDITION_B with when value equal to Q2ID', function() {
            expect(json.conditionSet.CONDITION_B[0].when).toEqual(Mock.QUESTION_2ID);
        });

        it('should have the CONDITION_B with answer defined to equal 5', function() {
            expect(json.conditionSet.CONDITION_B[0].answer.equal).toEqual(3);
        });

        it('should have the CONDITION_B with answer defined to contains 3', function() {
            expect(json.conditionSet.CONDITION_B[1].answer.contains).toEqual(3);
        });

    });

    function mockRouteFactory($injector) {
        Mock.RouteFactory = $injector.get('RouteFactory');
        spyOn(Mock.RouteFactory, 'create').and.callThrough();
        return Mock.RouteFactory;
    }

    function mockConditionName() {
        Mock.CONDITION_A = 'CONDITION_A';
        Mock.CONDITION_B = 'CONDITION_B';
    }

    function mockQuestionID() {
        Mock.QUESTION_ID = 'QID';
        Mock.QUESTION_2ID = 'Q2ID';
    }

});
