describe('PreAddDataEventFactory', function() {
    var mocks = {};

    beforeEach(function() {
        module('otusjs');
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('PreAddDataEventFactory', {
                EditorEngineService: mock('EditorEngineService', _$injector_),
                WorkspaceService: mock('WorkspaceService', _$injector_)
            });
        });
    });

    it('should fetch related events', function() {
        mocks.WorkspaceService.workspace = createWorkspace();

        spyOn(mocks.WorkspaceService.workspace.isdb.userEdits, 'fetchEventBy').and.returnValue([]);
        spyOn(mocks.EditorEngineService, 'edit');

        PreAddDataEvent = factory.create({
            id: 'id'
        });
        PreAddDataEvent.forward();

        expect(mocks.WorkspaceService.workspace.isdb.userEdits.fetchEventBy).toHaveBeenCalled();
    });

    it('should persist event', function() {
        mocks.WorkspaceService.workspace = createWorkspace();

        spyOn(mocks.WorkspaceService.workspace.isdb.userEdits, 'fetchEventBy').and.returnValue([]);
        spyOn(mocks.WorkspaceService.workspace.isdb.userEdits, 'storeUnique');
        spyOn(mocks.EditorEngineService, 'edit');

        PreAddDataEvent = factory.create({
            id: 'id'
        });
        PreAddDataEvent.forward();

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
