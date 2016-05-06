describe('PhoneQuestionWidgetFactory', function() {
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
    });

    function mockQuestion() {
        Mock.question = {
            objectType: 'DecimalQu estion'
        };
    }

});
