describe('AddRouteEvent', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddRouteEventFactory', {
                AddRouteService: mockAddRouteService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddRouteService.execute with route parameter', function() {
            event.execute(Mock.route);

            expect(Mock.AddRouteService.execute).toHaveBeenCalledWith(Mock.route);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.route);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.route);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

        it('should return an instance of Route', function() {
            var route = event.execute(Mock.route);

            expect(route.constructor.name).toBe('Route');
        });

    });

    function mockAddRouteService($injector) {
        Mock.route = $injector.get('RouteFactory').create('Rota 1', 'QST0', 'QST1');
        Mock.AddRouteService = $injector.get('AddRouteService');
        spyOn(Mock.AddRouteService, 'execute').and.returnValue(Mock.route);
        return Mock.AddRouteService;
    }

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        Mock.WorkspaceService.workspace = {
            isdb: {
                userEdits: {
                    store: function(object) {}
                }
            }
        };

        spyOn(Mock.WorkspaceService, 'saveWork');
        spyOn(Mock.WorkspaceService.workspace.isdb.userEdits, 'store');

        return Mock.WorkspaceService;
    }

});
