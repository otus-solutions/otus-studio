describe('EditorToolbarController', function() {
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('studio');

        inject(function(_$controller_, _$injector_) {
            /* @InjectMocks */
            controller = _$controller_('EditorToolbarController', {
                'WorkspaceService': mockWorkspaceService(_$injector_)
            });
        });
    });

    describe('saveOfflineWork method', function() {

        it('should call WorkspaceService.saveWork', function() {
            spyOn(Mock.WorkspaceService, 'saveWork');

            controller.saveOfflineWork();

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalled();
        });

    });

    function mockWorkspaceService($injector) {
        Mock.WorkspaceService = $injector.get('WorkspaceService');
        return Mock.WorkspaceService;
    }

});
