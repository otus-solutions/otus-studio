describe('QuestionBuilderService', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            mockBuildWorkFactory(_$injector_);
            mockAddNavigationWork();

            service = _$injector_.get('RouteBuilderService');
        });

    });

    describe('validation procedure', function() {

        beforeEach(function() {
            service.runValidations(jasmine.any(Object));
        });

        it('runValidations method should set work result to true', function() {
            expect(service.getWorkResult().result).toBe(true);
        });

    });

    describe('execute procedure', function() {
        var work;

        beforeEach(function() {
            service.execute(jasmine.any(Object));
        });

        xit('runValidations method should set work result to true', function() {
            expect(service.getWorkResult().result).toBe(true);
        });

    });

    function mockBuildWorkFactory($injector) {
        Mock.BuildWorkFactory = $injector.get('BuildWorkFactory');
    }

    function mockAddNavigationWork() {
        var work = Mock.BuildWorkFactory.create();
        // console.log(work);
    }

});
