describe('NavigationWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockNavigation(_$injector_);
            mockNavigationManagerService(_$injector_);
            mockRouteEditorWidgetFactory(_$injector_);

            factory = _$injector_.get('NavigationWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.element, Mock.NavigationManagerService, Mock.RouteEditorWidgetFactory);
        });

        describe('Type properties definition', function() {

            it('should create an object with className equal to NavigationWidget', function() {
                expect(widget.className).toBe('NavigationEditorWidget');
            });

            it('should create an object with css defined', function() {
                expect(widget.css).toBeDefined();
            });

        });

        describe('Interface definition', function() {

            it('should create an object with getUUID method defined', function() {
                expect(widget.getUUID()).toEqual(Mock.scope.uuid);
                expect(widget.getUUID).toBeDefined();
            });

            it('should create an object with getElement method defined', function() {
                expect(widget.getElement()).toEqual(Mock.element);
                expect(widget.getElement).toBeDefined();
            });

            it('should create an object with getNavigation method defined', function() {
                expect(widget.getParent()).toEqual(Mock.parentWidget);
                expect(widget.getParent).toBeDefined();
            });

            it('should create an object with getNavigation method defined', function() {
                expect(widget.getNavigation()).toEqual(Mock.navigation);
                expect(widget.getNavigation).toBeDefined();
            });

            it('should create an object with getItem() method defined', function() {
                expect(widget.getItem()).toEqual(Mock.question);
                expect(widget.getItem).toBeDefined();
            });

            it('should create an object with addRoute method defined', function() {
                expect(widget.addRoute).toBeDefined();
            });

            it('should create an object with removeRoute method defined', function() {
                expect(widget.removeRoute).toBeDefined();
            });

            it('should create an object with listRoutes method defined', function() {
                expect(widget.listRouteWidgets).toBeDefined();
            });

        });

        describe('Scope events', function() {

            it('should create a listener to event "question.add"', function() {
                expect(Mock.scope.$on).toHaveBeenCalledWith('item.add', jasmine.any(Function));
            });

            it('should create a listener to event "item.delete"', function() {
                expect(Mock.scope.$on).toHaveBeenCalled();
            });

        });

    });

    function mockElement() {
        Mock.element = {};
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            uuid: 'uuid',
            $parent: {
                widget: mockParentWidget($injector)
            },
            $on: function() {}
        };

        spyOn(Mock.scope, '$on');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        mockQuestion($injector);

        Mock.parentWidget = {
            getItem: function() {
                return Mock.question;
            }
        };

        return Mock.parentWidget;
    }

    function mockQuestion($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockNavigation($injector) {
        Mock.navigation = $injector.get('NavigationFactory').create(Mock.question.objectType, Mock.question.templateID);
        return Mock.navigation;
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
