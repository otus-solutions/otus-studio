describe('NavigationRemove', function() {
    var Mock = {};
    var updateObject;

    var ORIGIN_1 = 'ORIGIN_1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory', {
                NavigationRemoveFactory: mockNavigationContainerService(_$injector_)
            });
        });

        updateObject = factory.create(Mock.question);
    });

    describe('execute method', function() {

        it('when a question is removed then should remove the respective navigation', function() {
            updateObject.execute();

            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.question.templateID)).toBe(false);
        });

        it('when the last question is removed then should remove the navigation of previous question', function() {
            updateObject.execute();

            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.question.templateID)).toBe(false);
        });

    });

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
    }

    function mockNavigationContainerService($injector) {
        Mock.NavigationContainerService = $injector.get('NavigationContainerService');
        return Mock.NavigationContainerService;
    }

});
