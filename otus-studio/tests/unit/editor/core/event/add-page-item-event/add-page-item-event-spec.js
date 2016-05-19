describe('AddPageItemEvent', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            factory = _$injector_.get('AddPageItemEventFactory', {
                AddPageItemService: mockAddPageItemService(_$injector_),
                SheetContentService: mockSheetContentService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddPageItemService.execute with pageItemType parameter', function() {
            event.execute(Mock.pageItem.objectType);

            expect(Mock.AddPageItemService.execute).toHaveBeenCalledWith(Mock.pageItem.objectType);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.pageItem.objectType);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.pageItem.objectType);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

    });

    function mockAddPageItemService($injector) {
        Mock.pageItem = $injector.get('PageItemFactory').create('TextItem', 'SSQ');
        Mock.AddPageItemService = $injector.get('AddPageItemService');
        spyOn(Mock.AddPageItemService, 'execute');
        return Mock.AddPageItemService;
    }

    function mockSheetContentService($injector) {
        Mock.SheetContentService = $injector.get('SheetContentService');
        spyOn(Mock.SheetContentService, 'loadItem');
        return Mock.SheetContentService;
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
