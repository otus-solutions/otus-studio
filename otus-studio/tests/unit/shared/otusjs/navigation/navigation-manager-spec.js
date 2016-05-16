describe('NavigationManager', function() {
    var Mock = {};
    var factory;
    var manager;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);
            mockQuestions(_$injector_);
            mockNavigationFactory(_$injector_);
            mockAddUpdate(_$injector_);

            factory = _$injector_.get('NavigationManagerFactory');
        });

        manager = factory.create();
    });

    describe('updateNavigation method', function() {

        var manager;

        beforeEach(function() {
            manager = factory.create();
        });

    });

    describe('createNavigationTo method', function() {

        beforeEach(function() {
            spyOn(Mock.navigationFactory, 'create').and.callThrough();
            manager.createNavigationTo(Mock.questionOne.templateID);
        });

        it('should call NavigationFactory.create', function() {
            expect(Mock.navigationFactory.create).toHaveBeenCalledWith(Mock.questionOne.templateID);
        });

        it('should add a new Navigation in the navigationList', function() {
            expect(manager.getNavigationListSize()).toBeGreaterThan(0);
        });

    });

    describe('removeNavigationOf method', function() {

        beforeEach(function() {
            manager.createNavigationTo(Mock.questionOne.templateID);
            manager.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove a navigation of navigationList', function() {
            manager.removeNavigationOf(Mock.questionOne.templateID);

            expect(manager.getNavigationListSize()).toBe(1);
        });

        it('should remove the correct navigation of navigationList', function() {
            manager.removeNavigationOf(Mock.questionOne.templateID);

            expect(manager.getNavigationListSize()).toBe(1);
            expect(manager.existsNavigationTo(Mock.questionTwo.templateID)).toBe(true);
        });

        it('should return the index of removed navigation', function() {
            var removedIndex = manager.removeNavigationOf(Mock.questionOne.templateID);

            expect(removedIndex).toBeDefined();
        });

    });

    describe('removeNavigationByIndex method', function() {

        beforeEach(function() {
            manager.createNavigationTo(Mock.questionOne.templateID);
            manager.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove a navigation of index', function() {
            manager.removeNavigationByIndex(0);

            expect(manager.getNavigationListSize()).toBe(1);
            expect(manager.existsNavigationTo(Mock.questionOne.templateID)).toBe(false);
            expect(manager.existsNavigationTo(Mock.questionTwo.templateID)).toBe(true);
        });

    });

    describe('removeLastNavigation method', function() {

        beforeEach(function() {
            manager.createNavigationTo(Mock.questionOne.templateID);
            manager.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should remove the last navigation present in navigation list', function() {
            manager.removeLastNavigation();

            expect(manager.getNavigationListSize()).toBe(1);
            expect(manager.existsNavigationTo(Mock.questionOne.templateID)).toBe(true);
            expect(manager.existsNavigationTo(Mock.questionTwo.templateID)).toBe(false);
        });

    });

    describe('existsNavigationTo method', function() {

        it('should return true when navigation exists', function() {
            manager.createNavigationTo(Mock.questionOne);

            expect(manager.existsNavigationTo(Mock.questionOne)).toBe(true);
        });

        it('should return false when navigation not exists', function() {
            manager.createNavigationTo(Mock.questionOne);

            expect(manager.existsNavigationTo(Mock.questionTwo)).toBe(false);
        });

    });

    describe('getNavigationByOrigin method', function() {

        beforeEach(function() {
            manager.createNavigationTo(Mock.questionOne.templateID);
            manager.createNavigationTo(Mock.questionTwo.templateID);
        });

        it('should return the navigation when exists', function() {
            var returnedNavigation = manager.getNavigationByOrigin(Mock.questionOne.templateID);

            expect(returnedNavigation.origin).toEqual(Mock.questionOne.templateID);
        });

    });

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
        Mock.questionFour = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q4');
    }

    function mockNavigationFactory($injector) {
        Mock.navigationFactory = $injector.get('NavigationFactory');
    }

    function mockAddUpdate($injector) {
        Mock.NavigationAddFactory = $injector.get('NavigationAddFactory');
        Mock.addUpdate = Mock.NavigationAddFactory.create(Mock.survey.questionContainer);
    }

});
