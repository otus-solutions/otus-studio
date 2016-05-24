describe('QuestionEditorWidget', function() {
    var Mock = {};
    var widget;

    beforeEach(function() {
        module('studio');

        inject(function(_$injector_) {
            mockElement();
            mockWidgetScope(_$injector_);
            mockRemoveQuestionEventFactory(_$injector_);

            var factory = _$injector_.get('QuestionEditorWidgetFactory');
            widget = factory.create(Mock.scope, Mock.element, Mock.question);
        });
    });

    describe('deleteQuestion method', function() {

        beforeEach(function() {
            widget.deleteQuestion();
        });

        it('should call RemoveQuestionEventFactory.create method', function() {
            expect(Mock.RemoveQuestionEventFactory.create).toHaveBeenCalled();
        });

        it('should call RemoveQuestionEvent.execute method', function() {
            expect(Mock.RemoveQuestionEvent.execute).toHaveBeenCalled();
        });

        it('should call scope.$root.$broadcast method', function() {
            expect(Mock.scope.$root.$broadcast).toHaveBeenCalled();
        });

        it('should fire "questionEditorWidget.delete." + templateID event', function() {
            expect(Mock.scope.$root.$broadcast).toHaveBeenCalledWith('questionEditorWidget.delete.' + Mock.question.templateID);
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
            question: mockQuestion($injector)
        };

        return Mock.parentWidget;
    }

    function mockQuestion($injector) {
        Mock.question = $injector.get('SurveyItemFactory').create('IntegerQuestion', 'Q1');
        return Mock.question;
    }

    function mockRemoveQuestionEventFactory($injector) {
        Mock.RemoveQuestionEventFactory = $injector.get('RemoveQuestionEventFactory');
        Mock.RemoveQuestionEvent = $injector.get('RemoveQuestionEventFactory').create();

        spyOn(Mock.RemoveQuestionEventFactory, 'create').and.returnValue(Mock.RemoveQuestionEvent);
        spyOn(Mock.RemoveQuestionEvent, 'execute');

        return Mock.RemoveQuestionEventFactory;
    }

});
