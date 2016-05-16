describe('NavigationManagerService', function() {
    var Mock = {};
    var service;

    beforeEach(function() {
        module('utils');
        module('otusjs');

        inject(function(_$injector_) {
            // mockSurvey(_$injector_);
            mockQuestions(_$injector_);

            service = _$injector_.get('NavigationManagerService', {
                NavigationAddFactory: mockNavigationAddFactory(_$injector_),
                NavigationRemoveFactory: mockNavigationRemoevFactory(_$injector_)
            });
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

    function mockNavigationAddFactory($injector) {
        Mock.NavigationAddFactory = $injector.get('NavigationAddFactory');
        Mock.NavigationAdd = $injector.get('NavigationAddFactory').create([]);

        spyOn(Mock.NavigationAddFactory, 'create').and.returnValue(Mock.NavigationAdd);
        spyOn(Mock.NavigationAdd, 'execute');

        return Mock.NavigationAddFactory;
    }

    function mockNavigationRemoevFactory($injector) {
        Mock.NavigationRemoveFactory = $injector.get('NavigationRemoveFactory');
        Mock.NavigationRemove = $injector.get('NavigationRemoveFactory').create([]);

        spyOn(Mock.NavigationRemoveFactory, 'create').and.returnValue(Mock.NavigationRemove);
        spyOn(Mock.NavigationRemove, 'execute');

        return Mock.NavigationRemoveFactory;
    }

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('Survey Test', 'ST');
    }

    function mockQuestions($injector) {
        Mock.questionOne = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        Mock.questionTwo = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q2');
        Mock.questionThree = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q3');
        Mock.questionFour = $injector.get('QuestionFactory').create('CalendarQuestion', 'Q4');
    }

});
