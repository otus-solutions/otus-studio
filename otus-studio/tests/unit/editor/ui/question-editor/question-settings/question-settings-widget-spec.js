describe('QuestionSettingsWidgetFactory', function() {
    var Mock = {};
    var widget;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveQuestionEventFactory(_$injector_);

            var factory = _$injector_.get('QuestionSettingsWidgetFactory');
            widget = factory.create(Mock.scope, Mock.element);
        });
    });

    describe('create method', function() {

        describe('Interface definition', function() {

            xit('should create an object with getUUID method defined', function() {
                expect(widget.getUUID()).toEqual(Mock.scope.uuid);
                expect(widget.getUUID).toBeDefined();
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
