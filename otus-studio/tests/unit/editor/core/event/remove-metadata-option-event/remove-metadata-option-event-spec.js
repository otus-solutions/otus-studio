describe('RemoveMetadataOptionEvent', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSingleSelectionQuestionWidget(_$injector_);

            factory = _$injector_.get('RemoveMetadataOptionEventFactory', {
                RemoveMetadataOptionService: mockRemoveMetadataOptionService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call RemoveMetadataOptionService.execute with question parameter', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.RemoveMetadataOptionService.execute).toHaveBeenCalledWith(Mock.question);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

    });

    function mockSingleSelectionQuestionWidget($injector) {
        Mock.question = $injector.get('QuestionFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.questionWidget = $injector.get('QuestionWidgetFactory').create(Mock.question);
    }

    function mockRemoveMetadataOptionService($injector) {
        Mock.RemoveMetadataOptionService = $injector.get('RemoveMetadataOptionService');
        spyOn(Mock.RemoveMetadataOptionService, 'execute');
        return Mock.RemoveMetadataOptionService;
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
