describe('RouteBuilder', function() {
    var Mock = {};
    var ORIGIN = 'ORIGIN';
    var DESTINATION = 'DESTINATION';

    beforeEach(function() {
        module('otusjs');
        module('utils');

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
            expect(builder.getRoute).toBeDefined();
        });

        it('should should return the routerBuilder itself', function() {
            expect(object).toEqual(builder);
        });

    });

    function mockRouteFactory($injector) {
        Mock.RouteFactory = $injector.get('RouteFactory');
        spyOn(Mock.RouteFactory, 'create').and.callThrough();
        return Mock.RouteFactory;
    }

});
