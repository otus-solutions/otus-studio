describe('RemoveRouteEvent', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('RemoveRouteEventFactory', {
                RemoveRouteService: mockRemoveRouteService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call RemoveRouteService.execute with route parameter', function() {
            event.execute(Mock.route);

            expect(Mock.RemoveRouteService.execute).toHaveBeenCalledWith(Mock.route);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.route);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.route);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

    });

    function mockRemoveRouteService($injector) {
        Mock.route = $injector.get('RouteFactory').create('Rota 1', 'QST0', 'QST1');
        Mock.RemoveRouteService = $injector.get('RemoveRouteService');
        spyOn(Mock.RemoveRouteService, 'execute');
        return Mock.RemoveRouteService;
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
