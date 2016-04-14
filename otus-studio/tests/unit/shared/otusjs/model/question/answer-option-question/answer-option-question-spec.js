describe('AnswerOption', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);
            mockJson(_$injector_);

            factory = _$injector_.get('AnswerOptionFactory');
        });
    });

    describe('toJson method', function() {

        it('should return a well formatted json based on CalendarQuestion', function() {
            var option = factory.create(1, Mock.TEMPLATE_ID);

            expect(option.toJson()).toEqual(Mock.json);
        });

    });

    function mockQuestion($injector) {
        Mock.TEMPLATE_ID = 'TPL_ID';
        Mock.Question = $injector.get('QuestionFactory').create('calendar-question', Mock.TEMPLATE_ID);
    }

    function mockJson($injector) {
        Mock.json = JSON.stringify({
            extents: 'StudioObject',
            objectType: 'AnswerOption',
            value: 1,
            dataType: 'Integer',
            label: {
                ptBR: $injector.get('LabelFactory').create(),
                enUS: $injector.get('LabelFactory').create(),
                esES: $injector.get('LabelFactory').create()
            },
            parentQuestionID: Mock.TEMPLATE_ID = 'TPL_ID'
        });
    }

});
