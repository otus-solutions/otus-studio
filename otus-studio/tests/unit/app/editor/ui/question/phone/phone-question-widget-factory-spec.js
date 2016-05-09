describe('PhoneQuestionWidgetFactory', function() {
    var Mock = {};

    beforeEach(function() {
        module('studio');
        mockQuestion();

        inject(function(_$injector_) {
            factory = _$injector_.get('QuestionWidgetFactory');
        });

        phoneQuestion = factory.create(Mock.question);
    });

    describe('IntegerQuestionWidgetFactory', function() {
        it('should returned an object defined', function() {
            expect(phoneQuestion).toBeDefined();
        });

        it('should construct object correct', function functionName() {
            expect(phoneQuestion.name).toEqual('PhoneQuestion');
            expect(phoneQuestion.template).toEqual('<phone-question></phone-question>');
            expect(phoneQuestion.parentWidget.className).toBe('QuestionWidget');
        });

        xit('should call method create', function functionName() {
            expect(factory.create()).toHaveBeenCalled();
        });

    });

    function mockQuestion() {
        Mock.question = {
            objectType: 'PhoneQuestion'
        };
    }

});
