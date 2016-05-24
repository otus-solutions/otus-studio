describe('RemoveMetadataOptionEvent', function() {
    var Mock = {};
    var factory, event;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockSurveyItemWidget(_$injector_);

            factory = _$injector_.get('RemoveMetadataOptionEventFactory', {
                RemoveMetadataOptionService: mockRemoveMetadataOptionService(_$injector_),
                WorkspaceService: mockWorkspaceService(_$injector_)
            });
        });

        event = factory.create();
    });

    describe('execute method', function() {

        it('should call RemoveMetadataOptionService.execute with question parameter', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.RemoveMetadataOptionService.execute).toHaveBeenCalledWith(Mock.item);
        });

        it('should store yourself in userEdits', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.WorkspaceService.workspace.isdb.userEdits.store).toHaveBeenCalledWith(event);
        });

        it('should call Workspace.saveWork()', function() {
            event.execute(Mock.itemWidget);

            expect(Mock.WorkspaceService.saveWork).toHaveBeenCalledWith();
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
