describe('MetadataBuilderService', function() {
    var Mock = {};
    var work = 'work';
    var nextOID = 'nextOID';

    beforeEach(function() {
        module('otusjs');
        module('utils');

        inject(function(_$injector_) {
            mockSurvey(_$injector_);
            mockNewSurvey(_$injector_);

            service = _$injector_.get('MetadataAnswerBuilderService', {
                MetadataAnswerFactory: mockMetadataAnswerFactory(_$injector_)
            });
        });

    });

    describe('getWorkResult', function() {

        xit('should return true', function() {
            service.runValidations();

            var work = service.getWorkResult();

            expect(work.result).toBe(true);
        });

    });

    describe('When an add option work is executed', function() {

        xit('should return newOption', function() {
            mockAddDataWork();

            service.execute(Mock.BuildWork);

            expect(Mock.BuildWork.type.data).toBeDefined();
            expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
        });

        xit('the option should be added', function() {
            mockAddDataWork();

            service.execute(Mock.BuildWork);

            var count = Object.keys(Mock.newSurvey.questionContainer.A0.metadata.option).length;
            expect(count).toEqual(1);
        });

        xit('should calls the MetadataAnswerFactory.create method', function() {
            mockAddDataWork();
            spyOn(Mock.MetadataAnswerFactory, 'create');

            service.execute(Mock.BuildWork);

            expect(Mock.MetadataAnswerFactory.create).toHaveBeenCalled();
        });

    });

    describe('When an remove option work is executed', function() {

        xit('Should return optionToRemove', function() {
            mockRemoveData();

            service.execute(Mock.BuildWork);

            expect(Mock.BuildWork.type.data).toBeDefined();
            expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
        });

        xit('the option should be removed from options', function() {
            mockRemoveData();

            service.execute(Mock.BuildWork);

            var count = Object.keys(Mock.survey.questionContainer.A0.metadata.option).length;
            expect(count).toEqual(0);
        });

    });

    describe('When an update option work is executed', function() {

        xit('Should return optionToUpdate', function() {
            mockUpdateOption();

            service.execute(Mock.BuildWork);
            expect(Mock.BuildWork.type.data).toBeDefined();
            expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
        });

        xit('the data should be updated', function() {
            var label = Mock.survey.questionContainerContainer.A0.metadata.option.fake.label;
            mockUpdateOption();

            service.execute(Mock.BuildWork);

            expect(label.ptBR.plainText).toEqual(Mock.BuildWork.data.plainText);
            expect(label.ptBR.formattedText).toEqual(Mock.BuildWork.data.formattedText);
        });

    });

    function mockMetadataAnswerFactory($injector) {
        Mock.MetadataAnswerFactory = $injector.get('MetadataAnswerFactory');
        return Mock.MetadataAnswerFactory;
    }

    /*Mock build work factory service*/
    function mockAddDataWork() {
        var workType = {
            isAddData: function() {
                return true;
            }
        };

        Mock.BuildWork = {
            'survey': Mock.survey,
            'type': workType,
            'target': 'survey.questionContainer.A0'
        };
    }

    function mockRemoveData() {
        var workType = {
            isAddData: function() {
                return false;
            },
            isRemoveData: function() {
                return true;
            }
        };

        Mock.BuildWork = {
            'survey': Mock.survey,
            'type': workType,
            'target': 'survey.questionContainer.A0'
        };
    }

    function mockUpdateOption() {
        var workType = {
            isAddData: function() {
                return false;
            },
            isRemoveData: function() {
                return false;
            },
            isUpdateData: function() {
                return true;
            }
        };

        Mock.BuildWork = {
            'survey': Mock.survey,
            'type': workType,
            'target': 'survey.questionContainer.A0.metadata.option.fake',
            'data': {
                plainText: 'plain',
                value: '',
                formattedText: 'formatted'
            }
        };
    }

    function mockSurvey($injector) {
        Mock.survey = $injector.get('SurveyFactory').create('The Survey', 'THES');
        Mock.survey.questionContainer.A0 = $injector.get('QuestionFactory').create('text-question', 'A0');
    }

    function mockNewSurvey($injector) {
        Mock.newSurvey = $injector.get('SurveyFactory').create('The Survey', 'THES');
        Mock.newSurvey.questionContainer.A0 = $injector.get('QuestionFactory').create('text-question', 'A0');
    }

});
