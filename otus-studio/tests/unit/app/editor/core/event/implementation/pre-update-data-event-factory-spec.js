describe('PreUpdateDataEventFactory', function() {
    var mocks = {};

    beforeEach(function() {
        module('otusjs');
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('PreUpdateDataEventFactory', {
                EditorEngineService: mock('EditorEngineService', _$injector_),
                WorkspaceService: mock('WorkspaceService', _$injector_)
            });
        });
    });

    it('should persist event', function() {
        mocks.WorkspaceService.workspace = createWorkspace();
        spyOn(mocks.WorkspaceService.workspace.isdb.userEdits, 'storeUnique');

        PreUpdateEvent = factory.create({id:'id'});
        PreUpdateEvent.forward();

        expect(mocks.WorkspaceService.workspace.isdb.userEdits.storeUnique).toHaveBeenCalled();
    });

    function mock(mockName, $injector) {
        var factory = $injector.get(mockName);
        mocks[mockName] = factory;

        return factory;
    }

    function createWorkspace() {
        return {
            isdb: {
                userEdits: {
                    fetchEventBy: function() {},
                    storeUnique: function() {}
                }
            },
            project: {
                survey: {}
            }
        }
    }
});
