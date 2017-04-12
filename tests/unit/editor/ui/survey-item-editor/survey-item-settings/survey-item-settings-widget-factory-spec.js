describe('SurveyItemSettingsWidgetFactory', function() {
    var Mock = {};
    var factory;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveSurveyItemEventFactory(_$injector_);

            factory = _$injector_.get('SurveyItemSettingsWidgetFactory');
        });
    });

    describe('create method', function() {

        var widget;

        beforeEach(function() {
            widget = factory.create(Mock.scope, Mock.element);
        });

        describe('Type properties definition', function() {

            it('should create an object with className equal to SurveyItemSettingsWidget', function() {
                expect(widget.className).toBe('SurveyItemSettingsWidget');
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

            it('should create an object with getItem method defined', function() {
                expect(widget.getItem()).toEqual(Mock.question);
                expect(widget.getItem).toBeDefined();
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
            getItem: function() {
                return mockSurveyItem($injector);
            }
        };

        return Mock.parentWidget;
    }

    function mockSurveyItem($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockRemoveSurveyItemEventFactory($injector) {
        Mock.RemoveSurveyItemEventFactory = $injector.get('RemoveSurveyItemEventFactory');
        return Mock.RemoveSurveyItemEventFactory;
    }

});
