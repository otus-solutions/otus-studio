describe('AnswerOptionWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        mockElement();
        mockOption();

        inject(function(_$injector_) {
            mockWidgetScope(_$injector_);
            factory = _$injector_.get('AnswerOptionWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.element, Mock.option);
        });

        describe('Interface definition', function() {

            it('should create an object with getClassName method defined', function() {
                expect(widget.getClassName()).toEqual('AnswerOptionWidget');
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
                expect(widget.getItem()).toEqual(Mock.option);
                expect(widget.getItem).toBeDefined();
            });

        });

    });

    function mockElement() {
        Mock.element = {};
    }

    function mockOption() {
        Mock.option = {};
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
        Mock.parentWidget = {};
        return Mock.parentWidget;
    }

});
