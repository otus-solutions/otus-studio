describe('AddQuestionEvent', function() {
    var Mock = {};
    var event;

    beforeEach(function() {
        module('studio');

        var factory;

        inject(function(_$injector_) {
            factory = _$injector_.get('AddQuestionEventFactory', {
                AddQuestionService: mockAddQuestionService(_$injector_),
                SheetContentService: mockSheetContentService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddQuestionService.execute with questionType parameter', function() {
            event.execute(Mock.question.objectType);

            expect(Mock.AddQuestionService.execute).toHaveBeenCalledWith(Mock.question.objectType);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.question.objectType);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.question.objectType);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

    });

    function mockAddQuestionService($injector) {
        Mock.question = $injector.get('QuestionFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.AddQuestionService = $injector.get('AddQuestionService');
        spyOn(Mock.AddQuestionService, 'execute');
        return Mock.AddQuestionService;
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

        spyOn(Mock.WorkspaceService, 'saveWork');
        spyOn(Mock.WorkspaceService.workspace.isdb.userEdits, 'store');

        return Mock.WorkspaceService;
    }

});
