describe('DecimalQuestionWidgetFactory', function(){
    var Mock = {},
        NAME = 'NAME',
        QUESTION_ID = 'QUESTION_ID';

    beforeEach(function() {
        module('editor.ui');

        inject(function(_$injector_) {
            factory = _$injector_.get('DecimalQuestionWidgetFactory', {
                'DecimalQuestionFactory': mockDecimalQuestionFactory(_$injector_)
            });
        });

        decimalQuestionWidget = factory.create(NAME, QUESTION_ID);
    });
});
