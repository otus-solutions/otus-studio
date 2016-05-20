describe('QuestionSettingsWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveQuestionEventFactory(_$injector_);

            factory = _$injector_.get('QuestionSettingsWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.element);
        })

        describe('Type properties definition', function() {

            it('should create an object with className equal to QuestionSettingsWidget', function() {
                expect(widget.className).toBe('QuestionSettingsWidget');
            });

        });

        describe('Interface definition', function() {

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

            it('should create an object with getQuestion method defined', function() {
                expect(widget.getQuestion()).toEqual(Mock.question);
                expect(widget.getQuestion).toBeDefined();
            });

            it('should create an object with navigationButton method defined', function() {
                expect(widget.navigationButton).toBeDefined();
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
                $parent: {
                    $parent: {
                        widget: mockParentWidget($injector)
                    }
                }
            },
            $on: function() {}
        };

        spyOn(Mock.scope, '$on');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        Mock.parentWidget = {
            getQuestion: function() {
                return mockQuestion($injector);
            }
        };

        return Mock.parentWidget;
    }

    function mockQuestion($injector) {
        Mock.question = $injector.get('QuestionFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockRemoveQuestionEventFactory($injector) {
        Mock.RemoveQuestionEventFactory = $injector.get('RemoveQuestionEventFactory');
        return Mock.RemoveQuestionEventFactory;
    }

});
