describe('EditorToolbarController', function() {
    var Mock = {};

    /* @BeforeScenario */
    beforeEach(function() {
        module('editor.ui');
        module('editor.workspace');

        inject(function(_$injector_) {
            /* @InjectMocks */
            controller = _$injector_.get('EditorToolbarController', {
                'WorkspaceService': mockWorkspaceService(_$injector_)
            });
        });
    });

    describe('saveOfflineWork method', function() {

        xit('should call WorkspaceService.saveWork', function() {
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
