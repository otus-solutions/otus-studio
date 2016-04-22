describe('RouteBuilderService', function() {
    var Mock = {};
    var Fixture = {};
    var service;

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_, _$controller_) {
            initializeFixtures(_$injector_, _$controller_);
            mockSurvey();

            service = _$injector_.get('RouteBuilderService', {
                RouteFactory: Mock.RouteFactory
            });

            service.registerObserver(Fixture.NavigationController);
        });

        mockAddRouteWork();

    });

    describe('validation procedure', function() {

        beforeEach(function() {
            service.runValidations(jasmine.any(Object));
        });

        it('runValidations method should set work result to true', function() {
            expect(service.getWorkResult().result).toBe(true);
        });

    });

    describe('when adding route then', function() {

        beforeEach(function() {
            mockAddRouteWork();
            mockNewRoute();
            spyOn(Fixture.RouteFactory, 'create').and.returnValue(Mock.newRoute);
        });

        it('should call survey.listNavigation method', function() {
            spyOn(Mock.work.survey, 'listNavigation').and.returnValue(Mock.navigation);

            service.execute(Mock.work);

            expect(Mock.work.survey.listNavigation).toHaveBeenCalledWith(Mock.work.context);
        });

        it('should call RouteFactory.create method', function() {
            service.execute(Mock.work);

            expect(Fixture.RouteFactory.create).toHaveBeenCalledWith('THES0', null, 0);
        });

        it('should call navigation.addRoute method', function() {
            spyOn(Mock.navigation, 'addRoute');

            service.execute(Mock.work);

            expect(Mock.navigation.addRoute).toHaveBeenCalledWith(Mock.newRoute);
        });

        it('should call observer.update method', function() {
            spyOn(Fixture.NavigationController, 'update');

            service.execute(Mock.work);

            expect(Fixture.NavigationController.update).toHaveBeenCalledWith(Mock.work.type);
        });

    });

    function initializeFixtures($injector, $controller) {
        Fixture.BuildWorkFactory = $injector.get('BuildWorkFactory');
        Fixture.SurveyFactory = $injector.get('SurveyFactory');
        Fixture.QuestionFactory = $injector.get('QuestionFactory');
        Fixture.RouteFactory = $injector.get('RouteFactory');
        Fixture.NavigationFactory = $injector.get('NavigationFactory');
        Fixture.NavigationController = $controller('NavigationController');
    }

    function mockSurvey() {
        Mock.survey = Fixture.SurveyFactory.create('The Survey', 'THES');
        Mock.survey.questionContainer.THES0 = Fixture.QuestionFactory.create('text-question', 'THES0');
        Mock.survey.navigationList = [];

        Mock.navigation = Fixture.NavigationFactory.create('THES0');
        Mock.survey.navigationList.push(Mock.navigation);
    }

    function mockNewRoute() {
        Mock.newRoute = Fixture.RouteFactory.create(Mock.navigation.origin, null, Mock.navigation.listRoutes().length);
    }

    function mockAddRouteWork() {
        Mock.work = Fixture.BuildWorkFactory.create();
        Mock.work.survey = Mock.survey;
        Mock.work.context = 'THES0';
        Mock.work.type = {
            isPreAddData: function() {
                return true;
            }
        };
    }

});
