describe('AddSurveyItemEvent', function() {
    var Mock = {};
    var event;

    beforeEach(function() {
        module('studio');

        var factory;

        inject(function(_$injector_) {
            factory = _$injector_.get('AddSurveyItemEventFactory', {
                AddSurveyItemService: mockAddSurveyItemService(_$injector_),
                SheetContentService: mockSheetContentService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddSurveyItemService.execute with questionType parameter', function() {
            event.execute(Mock.item.objectType);

            expect(Mock.AddSurveyItemService.execute).toHaveBeenCalledWith(Mock.item.objectType, Mock.WorkspaceService.getSurvey());
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.item.objectType);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.item.objectType);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

    });

    function mockAddSurveyItemService($injector) {
        Mock.item = $injector.get('SurveyItemFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.AddSurveyItemService = $injector.get('AddSurveyItemService');
        spyOn(Mock.AddSurveyItemService, 'execute');
        return Mock.AddSurveyItemService;
    }

    function mockSheetContentService($injector) {
        Mock.SheetContentService = $injector.get('SheetContentService');
        spyOn(Mock.SheetContentService, 'loadQuestion');
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

        spyOn(Mock.WorkspaceService, 'getSurvey');
        spyOn(Mock.WorkspaceService, 'saveWork');
        spyOn(Mock.WorkspaceService.workspace.isdb.userEdits, 'store');

        return Mock.WorkspaceService;
    }

});
