describe('DecimalQuestionWidgetFactory', function(){
    var Mock = {},
        QUESTIONWIDGET = 'QUESTIONWIDGET';

    beforeEach(function() {
        module('studio');
        mockQuestion();

        inject(function(_$injector_){
            factory = _$injector_.get('QuestionWidgetFactory');
        });

        decimalQuestionWidget = factory.create(Mock.question);
    });

    describe('DecimalQuestionWidgetFactory', function() {
        it('should return a object with correct name', function() {
            expect(decimalQuestionWidget.name).toEqual('DecimalQuestion');
        });

        xit('should return a object parentWidget', function() {
            expect(decimalQuestionWidget.parentWidget).toBe(QUESTIONWIDGET);
        });

        it('should return a object template equal to decimal-question', function() {
            expect(decimalQuestionWidget.template).toEqual('<decimal-question></decimal-question>');
        });

    });

    function mockQuestion() {
        Mock.question = {
            objectType : 'DecimalQuestion'
        };
    }

});
