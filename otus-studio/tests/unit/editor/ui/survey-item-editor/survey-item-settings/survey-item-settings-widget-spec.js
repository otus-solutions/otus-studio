describe('SurveyItemSettingsWidgetFactory', function() {
    var Mock = {};
    var widget;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveSurveyItemEventFactory(_$injector_);

            var factory = _$injector_.get('SurveyItemSettingsWidgetFactory');
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
            getSurveyItem: function() {
                return mockSurveyItem($injector);
            }
        };

        return Mock.parentWidget;
    }

    function mockSurveyItem($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerSurveyItem', 'Q1');
        return Mock.question;
    }

    function mockRemoveSurveyItemEventFactory($injector) {
        Mock.RemoveSurveyItemEventFactory = $injector.get('RemoveSurveyItemEventFactory');
        return Mock.RemoveSurveyItemEventFactory;
    }

});
