describe('NavigationManagerFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('NavigationManagerFactory');
        });
    });

    describe('create method', function() {

        var navigationManager;

        beforeEach(function() {
            navigationManager = factory.create(Mock.survey);
        });

        xit('should return an object with a navigation list', function() {
            var returnedList = navigationManager.getNavigationList();

            expect(Array.isArray(returnedList)).toBe(true);
        });

        xit('should return an object with a empty navigation list', function() {
            expect(navigationManager.getNavigationListSize()).toBe(0);
        });

    });

});
