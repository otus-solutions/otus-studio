describe('DecimalQuestionWidgetFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');
        mockQuestion();

        inject(function(_$injector_) {
            factory = _$injector_.get('QuestionWidgetFactory');
        });

        decimalQuestionWidget = factory.create(Mock.question);
    });

    describe('DecimalQuestionWidgetFactory', function() {
        //testa se o create está sendo chamado
        it('should returned an object defined', function() {
            expect(decimalQuestionWidget).toBeDefined();
        });

        //scenario name
        it('should return a object with correct name', function() {
            expect(decimalQuestionWidget.name).toEqual('DecimalQuestion');
        });

        //scenario parentWidget
        it('should return a object parentWidget', function() {
            expect(decimalQuestionWidget.parentWidget.className).toBe('QuestionWidget');
        });

        //scenario template
        it('should return a object template equal to decimal-question', function() {
            expect(decimalQuestionWidget.template).toEqual('<decimal-question></decimal-question>');
        });

        //Scenario question
        it('should return a object question equal to parentWidget.question', function() {
            expect(decimalQuestionWidget.question).toEqual(Mock.question);
        });

    });

    function mockQuestion() {
        Mock.question = {
            objectType: 'DecimalQuestion'
        };
    }

});
