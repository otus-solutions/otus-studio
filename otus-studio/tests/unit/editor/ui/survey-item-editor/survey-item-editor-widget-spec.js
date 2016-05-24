describe('SurveyItemEditorWidget', function() {
    var Mock = {};
    var widget;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveSurveyItemEventFactory(_$injector_);

            var factory = _$injector_.get('SurveyItemEditorWidgetFactory');
            widget = factory.create(Mock.scope, Mock.element, Mock.question);
        });
    });

    describe('deleteSurveyItem method', function() {

        beforeEach(function() {
            widget.deleteSurveyItem();
        });

        it('should call RemoveSurveyItemEventFactory.create method', function() {
            expect(Mock.RemoveSurveyItemEventFactory.create).toHaveBeenCalled();
        });

        it('should call RemoveSurveyItemEvent.execute method', function() {
            expect(Mock.RemoveSurveyItemEvent.execute).toHaveBeenCalled();
        });

    });

    function mockElement() {
        Mock.element = {
            remove: function() {}
        };
    }

    function mockWidgetScope($injector) {
        Mock.scope = {
            class: '',
            uuid: 'uuid',
            $parent: {
                widget: mockParentWidget($injector)
            },
            $root: {
                $broadcast: function(){}
            },
            $on: function() {}
        };

        spyOn(Mock.scope, '$on');
        spyOn(Mock.scope.$root, '$broadcast');

        return Mock.scope;
    }

    function mockParentWidget($injector) {
        Mock.parentWidget = {
            getItem: mockSurveyItem($injector)
        };

        return Mock.parentWidget;
    }

    function mockSurveyItem($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockRemoveSurveyItemEventFactory($injector) {
        Mock.RemoveSurveyItemEventFactory = $injector.get('RemoveSurveyItemEventFactory');
        Mock.RemoveSurveyItemEvent = $injector.get('RemoveSurveyItemEventFactory').create();

        spyOn(Mock.RemoveSurveyItemEventFactory, 'create').and.returnValue(Mock.RemoveSurveyItemEvent);
        spyOn(Mock.RemoveSurveyItemEvent, 'execute');

        return Mock.RemoveSurveyItemEventFactory;
    }

});
