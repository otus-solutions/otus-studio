describe('RuleAnswerBuilderService', function() {

  var Mock = {};
  var service = {};

  beforeEach(function() {
    angular.mock.module('studio');

    mockSingleSelectionQuestionItem();

    inject(function(_$injector_) {
      service = _$injector_.get(
        'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
      );
    });
  });

  describe('build method', function() {

    var builded = {};

    it('should return an array not empty if item type is valid',
      function() {
        builded = service.build(Mock.singleSelectionItem);
        expect(builded).toEqual(jasmine.any(Array));
      });

  });

  function mockSingleSelectionQuestionItem() {
    Mock.singleSelectionItem = {
      extents: 'SurveyItem',
      objectType: 'SingleSelectionQuestion',
      templateID: 'CAD3',
      customID: 'CAD3',
      dataType: 'Integer',
      label: {
        ptBR: {
          extends: 'StudioObject',
          objectType: 'Label',
          oid: '',
          plainText: '3. Seu gênero é:',
          formattedText: '3. Seu gênero é:'
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
      options: [{
        extents: 'StudioObject',
        objectType: 'AnswerOption',
        value: 1,
        dataType: 'Integer',
        label: {
          ptBR: {
            extends: 'StudioObject',
            objectType: 'Label',
            oid: '',
            plainText: 'Feminino',
            formattedText: 'Feminino'
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
        extents: 'StudioObject',
        objectType: 'AnswerOption',
        value: 2,
        dataType: 'Integer',
        label: {
          ptBR: {
            extends: 'StudioObject',
            objectType: 'Label',
            oid: '',
            plainText: 'Masculino',
            formattedText: 'Masculino'
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
        extents: 'StudioObject',
        objectType: 'AnswerOption',
        value: 3,
        dataType: 'Integer',
        label: {
          ptBR: {
            extends: 'StudioObject',
            objectType: 'Label',
            oid: '',
            plainText: 'Outro',
            formattedText: 'Outro'
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
      }],
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
