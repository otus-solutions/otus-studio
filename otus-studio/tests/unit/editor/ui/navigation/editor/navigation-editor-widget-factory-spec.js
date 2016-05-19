describe('NavigationWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);
            mockNavigation(_$injector_);
            mockWidgetScope(_$injector_);
            mockParentWidget(_$injector_);
            mockNavigationManagerService(_$injector_);
            mockRouteEditorWidgetFactory(_$injector_);

            factory = _$injector_.get('NavigationWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.parentWidget, Mock.NavigationManagerService, Mock.RouteEditorWidgetFactory);
        });

        describe('Property definition', function() {

            it('should create an object with className equal to NavigationWidget', function() {
                expect(widget.className).toBe('NavigationWidget');
            });

            it('should create an object with parentWidget defined', function() {
                expect(widget.parentWidget).toBeDefined();
            });

            it('should create an object with question defined', function() {
                expect(widget.question).toBeDefined();
            });

            it('should create an object with navigation defined', function() {
                expect(widget.navigation).toBeDefined();
            });

            it('should create an object with routeWidgets defined', function() {
                expect(widget.routeWidgets).toBeDefined();
            });

            it('should create an object with routeCreatorWidget equal to null', function() {
                expect(widget.routeCreatorWidget).toBe(null);
            });

            it('should create an object with css defined', function() {
                expect(widget.css).toBeDefined();
            });

            it('should create an object with addRoute method defined', function() {
                expect(widget.addRoute).toBeDefined();
            });

            it('should create an object with removeRoute method defined', function() {
                expect(widget.removeRoute).toBeDefined();
            });

            it('should create an object with getRouteName method defined', function() {
                expect(widget.getRouteName).toBeDefined();
            });

        });

        describe('Scope events', function() {

            it('should create a listener to event "questionPallete.question.add"', function() {
                expect(Mock.scope.$on).toHaveBeenCalledWith('questionPallete.question.add', jasmine.any(Function));
            });

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
        Mock.RouteEditorWidgetFactory = {
            create: function(route, navigation) {
                return {

                };
            }
        };

        return Mock.parentWidget;
    }

});
