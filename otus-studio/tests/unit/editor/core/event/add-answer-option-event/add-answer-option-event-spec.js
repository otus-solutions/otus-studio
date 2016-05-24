describe('AddAnswerOptionEventFactory', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockSurveyItemWidget(_$injector_);

            factory = _$injector_.get('AddAnswerOptionEventFactory', {
                AddAnswerOptionService: mockAddAnswerOptionService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call AddAnswerOptionService.execute with question parameter', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.AddAnswerOptionService.execute).toHaveBeenCalledWith(Mock.item);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
        });

        it('should return an instance of AnswerOption', function() {
            var option = event.execute(Mock.itemWidget);

            expect(option.constructor.name).toBe('AnswerOption');
        });

    });


    function mockElement() {
        Mock.element = {};
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            uuid: 'uuid',
            $parent: {
                widget: mockParentWidget($injector)
            },
            $on: function() {}
        };

        spyOn(Mock.scope, '$on');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        Mock.parentWidget = {
            getItem: function() {
                return Mock.item;
            }
        };

        return Mock.parentWidget;
    }

    function mockSurveyItemWidget($injector) {
        Mock.item = $injector.get('SurveyItemFactory').create('SingleSelectionQuestion', 'SSQ');
        Mock.itemWidget = $injector.get('SurveyItemWidgetFactory').create(Mock.scope, Mock.element, Mock.item);
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

    function mockAddMetadataAnswerService($injector) {
        Mock.AddMetadataAnswerService = $injector.get('AddMetadataAnswerService');
        spyOn(Mock.AddMetadataAnswerService, 'execute').and.callThrough();
        return Mock.AddMetadataAnswerService;
    }

    function mockAddAnswerOptionService($injector) {
        Mock.AddAnswerOptionService = $injector.get('AddAnswerOptionService');
        spyOn(Mock.AddAnswerOptionService, 'execute').and.callThrough();
        return Mock.AddAnswerOptionService;
    }

});
