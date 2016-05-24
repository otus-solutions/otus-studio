describe('RemoveAnswerOptionEventFactory', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSingleSelectionQuestionWidget(_$injector_);

            factory = _$injector_.get('RemoveAnswerOptionEventFactory', {
                RemoveAnswerOptionService: mockRemoveAnswerOptionService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call RemoveAnswerOptionService.execute with question parameter', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.RemoveAnswerOptionService.execute).toHaveBeenCalledWith(Mock.question);
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
        Mock.question = $injector.get('SurveyItemFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.questionWidget = $injector.get('QuestionWidgetFactory').create(Mock.question);
    }

    function mockRemoveAnswerOptionService($injector) {
        Mock.RemoveAnswerOptionService = $injector.get('RemoveAnswerOptionService');
        spyOn(Mock.RemoveAnswerOptionService, 'execute');
        return Mock.RemoveAnswerOptionService;
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
