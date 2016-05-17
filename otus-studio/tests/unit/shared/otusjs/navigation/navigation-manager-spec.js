describe('NavigationManagerService', function() {
    var Mock = {};
    var service;

    beforeEach(function() {
        module('utils');
        module('otusjs');

        inject(function(_$injector_) {
            mockQuestions(_$injector_);

            service = _$injector_.get('NavigationManagerService', {
                NavigationContainerService: mockNavigationContainerService(_$injector_),
                NavigationAddFactory: mockNavigationAddFactory(_$injector_),
                NavigationRemoveFactory: mockNavigationRemoveFactory(_$injector_)
            });
        });
    });

    describe('init method', function() {

        it('should be defined in service', function() {
            expect(service.init).toBeDefined();
        });

        it('should call NavigationContainerService.init method', function() {
            service.init();

            expect(Mock.NavigationContainerService.init).toHaveBeenCalled();
        });

    });

    describe('getNavigationList method', function() {

        it('should be defined in service', function() {
            expect(service.getNavigationList).toBeDefined();
        });

        it('should call NavigationContainerService.getNavigationList method', function() {
            service.getNavigationList();

            expect(Mock.NavigationContainerService.getNavigationList).toHaveBeenCalled();
        });

        it('should return an array', function() {
            var returnedValue = service.getNavigationList();

            expect(returnedValue).toEqual(jasmine.any(Array));
        });

    });

    describe('getNavigationByOrigin method', function() {

        it('should be defined in service', function() {
            expect(service.getNavigationByOrigin).toBeDefined();
        });

        it('should call NavigationContainerService.getNavigationByOrigin method with origin', function() {
            service.getNavigationByOrigin(Mock.questionOne.templateID);

            expect(Mock.NavigationContainerService.getNavigationByOrigin).toHaveBeenCalledWith(Mock.questionOne.templateID);
        });

        xit('should return a navigation when exists', function() {
            var returnedValue = service.getNavigationByOrigin(Mock.questionOne.templateID);

            expect(returnedValue).toBeDefined();
        });

        it('should return undefined when navigation not exists', function() {
            var returnedValue = service.getNavigationByOrigin('Q5');

            expect(returnedValue).toBeUndefined();
        });

    });

    describe('addNavigation method', function() {

        it('should call NavigationAddFactory.create method', function() {
            service.addNavigation();

            expect(Mock.NavigationAddFactory.create).toHaveBeenCalled();
        });

        it('should call NavigationAdd.execute method', function() {
            service.addNavigation();

            expect(Mock.NavigationAdd.execute).toHaveBeenCalled();
        });

    });

    describe('removeNavigation method', function() {

        it('should call NavigationRemoveFactory.create method', function() {
            service.removeNavigation();

            expect(Mock.NavigationRemoveFactory.create).toHaveBeenCalled();
        });

        it('should call NavigationRemove.execute method', function() {
            service.removeNavigation(Mock.questionOne);

            expect(Mock.NavigationRemove.execute).toHaveBeenCalled();
        });

    });

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
    }

    function mockNavigationContainerService($injector) {
        Mock.NavigationContainerService = $injector.get('NavigationContainerService');
        Mock.NavigationContainerService.manageNavigation([Mock.questionOne, Mock.questionTwo, Mock.questionThree]);

        spyOn(Mock.NavigationContainerService, 'getNavigationList').and.callThrough();
        spyOn(Mock.NavigationContainerService, 'getNavigationByOrigin').and.callThrough();
        spyOn(Mock.NavigationContainerService, 'init');

        return Mock.NavigationContainerService;
    }

    function mockNavigationAddFactory($injector) {
        Mock.NavigationAddFactory = $injector.get('NavigationAddFactory');
        Mock.NavigationAdd = $injector.get('NavigationAddFactory').create([]);

        spyOn(Mock.NavigationAddFactory, 'create').and.returnValue(Mock.NavigationAdd);
        spyOn(Mock.NavigationAdd, 'execute');

        return Mock.NavigationAddFactory;
    }

    function mockNavigationRemoveFactory($injector) {
        Mock.NavigationRemoveFactory = $injector.get('NavigationRemoveFactory');
        Mock.NavigationRemove = $injector.get('NavigationRemoveFactory').create([]);

        spyOn(Mock.NavigationRemoveFactory, 'create').and.returnValue(Mock.NavigationRemove);
        spyOn(Mock.NavigationRemove, 'execute');

        return Mock.NavigationRemoveFactory;
    }

});
