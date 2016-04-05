describe('RouteBuilderFactory', function() {

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            factory = _$injector_.get('RouteBuilderFactory');
        });
    });

    describe('create method', function() {

        it('should return a RouterBuilder', function() {
            var builder = factory.create();

            expect(builder).toBeDefined();
        });

    });

});
