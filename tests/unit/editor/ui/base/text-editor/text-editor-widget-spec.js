describe('OtusTextEditorWidgetFactory', function() {
    var Mock = {};
    var factory, widget;

    beforeEach(function() {
        module('studio');

        mockElement();

        inject(function(_$injector_) {
            mockWidgetScope(_$injector_);

            factory = _$injector_.get('OtusTextEditorWidgetFactory', {
                UpdateQuestionEventFactory: mockUpdateQuestionEventFactory(_$injector_)
            });
        });

        widget = factory.create(Mock.scope, Mock.element);
    });

    describe('Interface definition', function() {

        it('should create an object with getClassName method defined', function() {
            expect(widget.getClassName()).toEqual('OtusTextEditorWidget');
            expect(widget.getClassName).toBeDefined();
        });

        it('should create an object with getUUID method defined', function() {
            expect(widget.getUUID()).toEqual(Mock.scope.uuid);
            expect(widget.getUUID).toBeDefined();
        });

        it('should create an object with getElement method defined', function() {
            expect(widget.getElement()).toEqual(Mock.element);
            expect(widget.getElement).toBeDefined();
        });

        it('should create an object with getParent method defined', function() {
            expect(widget.getParent()).toEqual(Mock.parentWidget);
            expect(widget.getParent).toBeDefined();
        });

        it('should create an object with getItem() method defined', function() {
            expect(widget.getItem()).toEqual(Mock.item);
            expect(widget.getItem).toBeDefined();
        });

    });

    function mockElement() {
        Mock.element = {
            children: function children() {
                return [Mock.element];
            },
            on: function on(eventName, callback) {}
        };
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
        mockItem($injector);

        Mock.parentWidget = {
            getItem: function() {
                return Mock.item;
            }
        };

        return Mock.parentWidget;
    }

    function mockItem($injector) {
        Mock.item = $injector.get('SurveyItemFactory').create('DecimalQuestion', 'Q1');
        return Mock.item;
    }

    function mockUpdateQuestionEventFactory($injector) {
        Mock.UpdateQuestionEventFactory = $injector.get('UpdateQuestionEventFactory');
        return Mock.UpdateQuestionEventFactory;
    }

});
