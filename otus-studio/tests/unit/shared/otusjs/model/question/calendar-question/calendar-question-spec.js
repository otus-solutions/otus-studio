describe('CalendarQuestion', function() {
    var Mock = {};

    beforeEach(function() {
        module('otusjs');

        inject(function(_$injector_) {
            mockQuestion(_$injector_);
            mockJson(_$injector_);

            factory = _$injector_.get('QuestionFactory');
        });
    });

    describe('toJson method', function() {

        it('should return a well formatted json based on CalendarQuestion', function() {
            var question = factory.create('CalendarQuestion', Mock.TEMPLATE_ID);

            expect(question.toJson()).toEqual(Mock.json);
        });

    });

    function mockQuestion($injector) {
        Mock.TEMPLATE_ID = 'TPL_ID';
        Mock.Question = $injector.get('QuestionFactory').create('CalendarQuestion', Mock.TEMPLATE_ID);
    }

    function mockJson($injector) {
        Mock.json = JSON.stringify({
            extents: 'Question',
            objectType: 'CalendarQuestion',
            templateID: Mock.TEMPLATE_ID,
            dataType: 'LocalDate',
            label: {
                ptBR: $injector.get('LabelFactory').create(),
                enUS: $injector.get('LabelFactory').create(),
                esES: $injector.get('LabelFactory').create()
            },
            metadata: $injector.get('MetadataGroupFactory').create()
        });
    }

});
