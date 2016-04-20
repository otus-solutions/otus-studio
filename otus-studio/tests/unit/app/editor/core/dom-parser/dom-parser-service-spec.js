describe('DomParser', function() {
    var inputTextParser;
    var divEditableParser;
    var componentInputDummy = '<input editing-source="" es-processor="survey-navigation-save" es-type="pre-input-text" es-id="survey-navigation-name" es-target="survey-navigation-name" aria-label="Name" class="md-input" id="input">';
    var componentPreInputDummy = '<input editing-source="" es-processor="survey-navigation-save" es-type="pre-input-text" es-id="survey-navigation-name" es-target="survey-navigation-name" aria-label="Name" class="md-input" id="pre_input">';
    var componentDivDummy = '<div editing-source="" es-processor="survey-navigation-save" es-type="div-editable" es-id="survey-navigation-name" es-target="survey-navigation-name" aria-label="Name" class="md-input" id="div_editable">';

    beforeEach(function() {
        module('otusjs');
        module('studio');

        inject(function(_$injector_) {
            service = _$injector_.get('DomParser', {
                InputTextParser: mockInputTextParser(_$injector_),
                DivEditableParser: mockDivEditableParser(_$injector_)
            });
        });
    });

    describe('should parse dom types', function() {
        it('input text', function() {
            var parsed = service.parse({type: 'input-text', component: componentInputDummy});
            expect('input').toEqual(parsed.id);
        });

        it('pre input text', function() {
            var parsed = service.parse({type: 'input-text', component: componentPreInputDummy});
            expect('pre_input').toEqual(parsed.id);
        });

        it('div editable', function() {
            var parsed = service.parse({type: 'input-text', component: componentDivDummy});
            expect('div_editable').toEqual(parsed.id);
        });
    });

    function mockInputTextParser($injector) {
        inputTextParser = $injector.get('InputTextParser');
        return inputTextParser;
    }

    function mockDivEditableParser($injector) {
        divEditableParser = $injector.get('DivEditableParser');
        return divEditableParser;
    }

});
