describe('RuleWhenBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.studio.navigationBuilder');

    mockQuestionItem();

    inject(function(_$injector_) {
      service = _$injector_.get('otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService');
    });
  });

  describe('build method', function() {

    var builded = {};

    beforeEach(function() {
      builded = service.build(Mock.questionItem);
    });

    it('should return an object with type property', function() {
      expect(builded.type).toBeDefined();
    });

    it('should return an object with icon property', function() {
      expect(builded.icon).toBeDefined();
    });

    it('should return an object with customID property', function() {
      expect(builded.customID).toBeDefined();
    });

    it('should return an object with label property', function() {
      expect(builded.label).toBeDefined();
    });

    it('should return an object with label property', function() {
      expect(builded.label).toBeDefined();
    });

  });

  function mockQuestionItem() {
    Mock.questionItem = {
        extents: 'SurveyItem',
        objectType: 'TextQuestion',
        templateID: 'CAD4',
        customID: 'CAD4',
        dataType: 'String',
        label: {
            ptBR: {
                extends: 'StudioObject',
                objectType: 'Label',
                oid: '',
                plainText: '4. Qual outro?',
                formattedText: '4. Qual outro?'
            },
            enUS: {
                extends: 'StudioObject',
                objectType: 'Label',
                oid: '',
                plainText: '',
                formattedText: ''
            },
            esES: {
                extends: 'StudioObject',
                objectType: 'Label',
                oid: '',
                plainText: '',
                formattedText: ''
            }
        },
        metadata: {
            extents: 'StudioObject',
            objectType: 'MetadataGroup',
            options: [{
                extends: 'StudioObject',
                objectType: 'MetadataAnswer',
                dataType: 'Integer',
                value: 1,
                label: {
                    ptBR: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: 'Não se aplica',
                        formattedText: 'Não se aplica'
                    },
                    enUS: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    },
                    esES: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    }
                }
            }, {
                extends: 'StudioObject',
                objectType: 'MetadataAnswer',
                dataType: 'Integer',
                value: 2,
                label: {
                    ptBR: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: 'Não quer responder',
                        formattedText: 'Não quer responder'
                    },
                    enUS: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    },
                    esES: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    }
                }
            }, {
                extends: 'StudioObject',
                objectType: 'MetadataAnswer',
                dataType: 'Integer',
                value: 3,
                label: {
                    ptBR: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: 'Não sabe responder',
                        formattedText: 'Não sabe responder'
                    },
                    enUS: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    },
                    esES: {
                        extends: 'StudioObject',
                        objectType: 'Label',
                        oid: '',
                        plainText: '',
                        formattedText: ''
                    }
                }
            }]
        },
        fillingRules: {
            extends: 'StudioObject',
            objectType: 'FillingRules',
            options: {
                mandatory: {
                    extends: 'StudioObject',
                    objectType: 'Rule',
                    validatorType: 'mandatory',
                    data: {
                        reference: true
                    }
                }
            }
        }
    };
  }

});
