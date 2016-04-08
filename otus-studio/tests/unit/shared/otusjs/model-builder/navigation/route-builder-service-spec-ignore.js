describe('RouteBuilderService', function() {

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            service = _$injector_.get('RouteBuilderService');
        });
    });

    describe('createRoute method', function() {

        it('should return a RouterBuilder', function() {
            var object = service.createRoute();

            expect(object).toBeDefined();
        });

    });

});
