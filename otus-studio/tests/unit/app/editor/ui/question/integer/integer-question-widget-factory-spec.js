describe('IntegerQuestionWidgetFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');
        mockQuestion();

        inject(function(_$injector_) {
            factory = _$injector_.get('QuestionWidgetFactory');
        });

        integerQuestionWidget = factory.create(Mock.question);
    });

    describe('IntegerQuestionWidgetFactory', function() {
        //testa se o create está sendo chamado
        it('should returned an object defined', function() {
            expect(integerQuestionWidget).toBeDefined();
        });

        //scenario name
        it('should return a object with correct name', function() {
            expect(integerQuestionWidget.name).toEqual('IntegerQuestion');
        });

        //scenario parentWidget
        it('should return a object parentWidget', function() {
            expect(integerQuestionWidget.parentWidget.className).toBe('QuestionWidget');
        });

        //scenario template
        it('should return a object template equal to decimal-question', function() {
            expect(integerQuestionWidget.template).toEqual('<integer-question></integer-question>');
        });

        //Scenario question
        it('should return a object question equal to parentWidget.question', function() {
            expect(integerQuestionWidget.question).toEqual(Mock.question);
        });

    });

    function mockQuestion() {
        Mock.question = {
            objectType: 'IntegerQuestion'
        };
    }

});
