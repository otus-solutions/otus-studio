describe('NavigationRemove', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
            mockQuestionContainer(_$injector_);

            factory = _$injector_.get('NavigationRemoveFactory', {
                NavigationRemoveFactory: mockNavigationContainerService(_$injector_)
            });
        });
    });

    describe('execute method', function() {

        it('should remove the navigation when the respective question is removed', function() {
            var updateObject = factory.create(Mock.questionOne.templateID);

            updateObject.execute();

            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
        });

        it('should call NavigationContainerService.removeNavigationOf when navigation exists', function() {
            spyOn(Mock.NavigationContainerService, 'existsNavigationTo').and.returnValue(true);
            spyOn(Mock.NavigationContainerService, 'removeNavigationOf');

            var updateObject = factory.create(Mock.questionOne.templateID);
            updateObject.execute();

            expect(Mock.NavigationContainerService.removeNavigationOf).toHaveBeenCalledWith(Mock.questionOne.templateID);
        });

        it('should not call NavigationContainerService.removeNavigationOf when navigation not exists', function() {
            spyOn(Mock.NavigationContainerService, 'existsNavigationTo').and.returnValue(false);
            spyOn(Mock.NavigationContainerService, 'removeNavigationOf');

            var updateObject = factory.create(Mock.questionOne.templateID);
            updateObject.execute();

            expect(Mock.NavigationContainerService.removeNavigationOf).not.toHaveBeenCalled();
        });

        it('should remove the navigation of previous question when the last question is removed', function() {
            updateObject = factory.create(Mock.questionTwo.templateID);

            updateObject.execute();

            expect(Mock.NavigationContainerService.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
        });

        it('should call NavigationContainerService.removeCurrentLastNavigation when navigation not exists', function() {
            spyOn(Mock.NavigationContainerService, 'existsNavigationTo').and.returnValue(false);
            spyOn(Mock.NavigationContainerService, 'removeCurrentLastNavigation');

            var updateObject = factory.create(Mock.questionTwo.templateID);
            updateObject.execute();

            expect(Mock.NavigationContainerService.removeCurrentLastNavigation).toHaveBeenCalled();
        });

        it('should not call NavigationContainerService.removeCurrentLastNavigation when navigation exists', function() {
            spyOn(Mock.NavigationContainerService, 'existsNavigationTo').and.returnValue(true);
            spyOn(Mock.NavigationContainerService, 'removeCurrentLastNavigation');

            var updateObject = factory.create(Mock.questionOne.templateID);
            updateObject.execute();

            expect(Mock.NavigationContainerService.removeCurrentLastNavigation).not.toHaveBeenCalled();
        });

    });

    function mockQuestionContainer($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');

        Mock.questionContainer = [Mock.questionOne, Mock.questionTwo];
    }

    function mockNavigationContainerService($injector) {
        Mock.NavigationContainerService = $injector.get('NavigationContainerService');
        Mock.NavigationContainerService.manageNavigation(Mock.questionContainer);

        return Mock.NavigationContainerService;
    }

});
