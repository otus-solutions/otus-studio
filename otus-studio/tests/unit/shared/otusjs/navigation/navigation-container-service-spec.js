describe('NavigationContainerService', function() {
    var Mock = {};
    var service;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestions(_$injector_);

            service = _$injector_.get('NavigationContainerService', {
                NavigationFactory: mockNavigationFactory(_$injector_)
            });
        });
    });

    describe('init method', function() {

        it('should clear the array of navigations', function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
            service.createNavigationTo(Mock.questionThree.templateID);
            service.createNavigationTo(Mock.questionFour.templateID);

            expect(service.getNavigationListSize()).toBe(4);
            service.init();
            expect(service.getNavigationListSize()).toBe(0);
        });

    });

    describe('getNavigationList method', function() {

        it('should return an array', function() {
            var returnedValue = service.getNavigationList();

            expect(Array.isArray(returnedValue)).toBe(true);
        });

    });

    describe('getNavigationListSize method', function() {

        it('should return zero when navigation Array is empty', function() {
            expect(service.getNavigationListSize()).toBe(0);
        });

        it('should return the number of added navigations', function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
            service.createNavigationTo(Mock.questionThree.templateID);
            service.createNavigationTo(Mock.questionFour.templateID);
            expect(service.getNavigationListSize()).toBe(4);

            service.removeNavigationOf(Mock.questionFour.templateID);
            expect(service.getNavigationListSize()).toBe(3);
        });

    });

    describe('getNavigationByOrigin method', function() {

        beforeEach(function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should return the navigation when exists', function() {
            var returnedNavigation = service.getNavigationByOrigin(Mock.questionOne.templateID);

            expect(returnedNavigation.origin).toEqual(Mock.questionOne.templateID);
        });

        it('should return undefined when navigation not exists', function() {
            var returnedNavigation = service.getNavigationByOrigin('Q4');

            expect(returnedNavigation).toBeUndefined();
        });

    });

    describe('existsNavigationTo method', function() {

        it('should return true when navigation exists', function() {
            service.createNavigationTo(Mock.questionOne);

            expect(service.existsNavigationTo(Mock.questionOne)).toBe(true);
        });

        it('should return false when navigation not exists', function() {
            service.createNavigationTo(Mock.questionOne);

            expect(service.existsNavigationTo(Mock.questionTwo)).toBe(false);
        });

    });

    describe('createNavigationTo method', function() {

        beforeEach(function() {
            spyOn(Mock.NavigationFactory, 'create').and.callThrough();

            service.createNavigationTo(Mock.questionOne.templateID);
        });

        it('should call NavigationFactory.create', function() {
            expect(Mock.NavigationFactory.create).toHaveBeenCalledWith(Mock.questionOne.templateID);
        });

        it('should add a new Navigation in the navigationList', function() {
            expect(service.getNavigationListSize()).toBeGreaterThan(0);
        });

    });

    describe('removeNavigationOf method', function() {

        beforeEach(function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove a navigation of navigationList', function() {
            service.removeNavigationOf(Mock.questionOne.templateID);

            expect(service.getNavigationListSize()).toBe(1);
        });

        it('should remove the correct navigation of navigationList', function() {
            service.removeNavigationOf(Mock.questionOne.templateID);

            expect(service.getNavigationListSize()).toBe(1);
            expect(service.existsNavigationTo(Mock.questionTwo.templateID)).toBe(true);
        });

    });

    describe('removeNavigationByIndex method', function() {

        beforeEach(function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove a navigation of index', function() {
            service.removeNavigationByIndex(0);

            expect(service.getNavigationListSize()).toBe(1);
            expect(service.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
            expect(service.existsNavigationTo(Mock.questionTwo.templateID)).toBe(true);
        });

    });

    describe('removeCurrentLastNavigation method', function() {

        beforeEach(function() {
            service.createNavigationTo(Mock.questionOne.templateID);
            service.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove the last navigation present in navigation list', function() {
            service.removeCurrentLastNavigation();

            expect(service.getNavigationListSize()).toBe(1);
            expect(service.existsNavigationTo(Mock.questionOne.templateID)).toBe(true);
            expect(service.existsNavigationTo(Mock.questionTwo.templateID)).toBe(false);
        });

    });

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
        Mock.questionFour = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q4');
    }

    function mockNavigationFactory($injector) {
        Mock.NavigationFactory = $injector.get('NavigationFactory');
        return Mock.NavigationFactory;
    }

});
