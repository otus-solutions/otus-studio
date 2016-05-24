describe('AddAnswerOptionEventFactory', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockSingleSelectionQuestionWidget(_$injector_);

            factory = _$injector_.get('AddMetadataAnswerEventFactory', {
                AddAnswerOptionService: mockAddMetadataAnswerService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddMetadataAnswerService.execute with question parameter', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.AddMetadataAnswerService.execute).toHaveBeenCalledWith(Mock.question);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.questionWidget);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

        it('should return an instance of MetadataAnswer', function() {
            var option = event.execute(Mock.questionWidget);

            expect(option.constructor.name).toBe('MetadataAnswer');
        });

    });

    function mockSingleSelectionQuestionWidget($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.questionWidget = $injector.get('QuestionWidgetFactory').create(Mock.question);
    }

    function mockAddMetadataAnswerService($injector) {
        Mock.AddMetadataAnswerService = $injector.get('AddMetadataAnswerService');
        spyOn(Mock.AddMetadataAnswerService, 'execute').and.callThrough();
        return Mock.AddMetadataAnswerService;
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
