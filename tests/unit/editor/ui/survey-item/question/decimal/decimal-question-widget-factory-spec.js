describe('DecimalQuestionWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        mockElement();

        inject(function(_$injector_) {
            mockWidgetScope(_$injector_);
            factory = _$injector_.get('DecimalQuestionWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.element);
        });

        describe('Interface definition', function() {

            it('should create an object with getClassName method defined', function() {
                expect(widget.getClassName()).toEqual('DecimalQuestionWidget');
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

            it('should create an object with getNavigation method defined', function() {
                expect(widget.getParent()).toEqual(Mock.parentWidget);
                expect(widget.getParent).toBeDefined();
            });

            it('should create an object with getItem() method defined', function() {
                expect(widget.getItem()).toEqual(Mock.question);
                expect(widget.getItem).toBeDefined();
            });

            it('should create an object with getTemplate() method defined', function() {
                expect(widget.getTemplate()).toEqual('<decimal-question></decimal-question>');
                expect(widget.getTemplate).toBeDefined();
            });

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
        mockQuestion($injector);

        Mock.parentWidget = {
            getItem: function() {
                return Mock.question;
            }
        };

        return Mock.parentWidget;
    }

    function mockQuestion($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('DecimalQuestion', 'Q1');
        return Mock.question;
    }

});
