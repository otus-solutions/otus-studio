describe('NavigationWidgetFactory', function() {
    var Mock = {};
    var widget;

    var ROUTE_NAME = 'Route 1';

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);
            mockNavigation(_$injector_);
            mockRoute(_$injector_);
            mockWidgetScope(_$injector_);
            mockParentWidget(_$injector_);
            mockNavigationManagerService(_$injector_);
            mockRouteEditorWidgetFactory(_$injector_);

            var factory = _$injector_.get('NavigationWidgetFactory');
            widget = factory.create(Mock.scope, Mock.parentWidget, Mock.NavigationManagerService, Mock.RouteEditorWidgetFactory);
        });
    });

    describe('addRoute method', function() {

        beforeEach(function() {
            widget.addRoute(Mock.route);
        });

        it('should call RouteEditorWidgetFactory.create with a route and navigation', function() {
            expect(Mock.RouteEditorWidgetFactory.create).toHaveBeenCalledWith(Mock.route, Mock.navigation);
        });

        it('should add the route widget in the array', function() {
            expect(widget.routeWidgets.length).toBeGreaterThan(0);
        });

    });

    describe('removeRoute method', function() {

        beforeEach(function() {
            widget.addRoute(Mock.route);
            widget.removeRoute('Q1');
        });

        it('should call RouteEditorWidgetFactory.create with a route and navigation', function() {
            expect(Mock.RouteEditorWidgetFactory.create).toHaveBeenCalledWith(Mock.route, Mock.navigation);
        });

        it('should remove the route widget from array', function() {
            expect(widget.routeWidgets.length).toBe(0);
        });

    });

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockNavigation($injector) {
        Mock.navigation = $injector.get('NavigationFactory').create(Mock.question.objectType, Mock.question.templateID);
        return Mock.navigation;
    }

    function mockRoute($injector) {
        Mock.route = $injector.get('RouteFactory').create(ROUTE_NAME, Mock.question.templateID, 'DESTINATION');
        return Mock.route;
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            $on: function() {

            }
        };

        spyOn(Mock.scope, '$on');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        Mock.parentWidget = {
            question: Mock.question
        };

        return Mock.parentWidget;
    }

    function mockNavigationManagerService($injector) {
        Mock.NavigationManagerService = $injector.get('NavigationManagerService');

        spyOn(Mock.NavigationManagerService, 'getNavigationByOrigin').and.returnValue(Mock.navigation);

        return Mock.NavigationManagerService;
    }

    function mockRouteEditorWidgetFactory($injector) {
        Mock.routeEditorWidget = {
            name: function () {
                return Mock.question.templateID;
            }
        };
        Mock.RouteEditorWidgetFactory = {
            create: function(route, navigation) {}
        };

        spyOn(Mock.RouteEditorWidgetFactory, 'create').and.returnValue(Mock.routeEditorWidget);

        return Mock.parentWidget;
    }

});
