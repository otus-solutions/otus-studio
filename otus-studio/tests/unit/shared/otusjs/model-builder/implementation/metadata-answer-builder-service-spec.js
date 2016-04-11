describe('MetadataBuilderService', function(){
	var Mock = {};
	var work = 'work';
	var nextOID = 'nextOID';

	beforeEach(function() {
		module('otusjs');

		mockSurvey();

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerBuilderService', {
				MetadataAnswerFactory : mockMetadataAnswerFactory(_$injector_)
			});
		});

	});

	describe('getWorkResult', function() {

		it('should return true', function() {
			service.runValidations();

			var work = service.getWorkResult();

			expect(work.result).toBe(true);
		});
	});

	describe('When an add option work is executed', function() {

		it('should return newOption', function() {
			mockNewSurvey();
			mockAddDataWork();

			service.execute(Mock.BuildWork);

			expect(Mock.BuildWork.type.data).toBeDefined();
			expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
		});

		it('the option should be added', function() {
			mockNewSurvey();
			mockAddDataWork();

			service.execute(Mock.BuildWork);

			var count = Object.keys(Mock.survey.question.A0.metadata.option).length;
			expect(count).toEqual(1);
		});



		it('should calls the MetadataAnswerFactory.create method', function() {
			mockAddDataWork();
			spyOn(Mock.MetadataAnswerFactory, 'create');

			service.execute(Mock.BuildWork);

			expect(Mock.MetadataAnswerFactory.create).toHaveBeenCalled();
		});

	});

	describe('When an remove option work is executed', function() {

		it('Should return optionToRemove', function() {
			mockRemoveData();

			service.execute(Mock.BuildWork);

			expect(Mock.BuildWork.type.data).toBeDefined();
			expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
		});

		it('the option should be removed from options', function() {
			mockRemoveData();

			service.execute(Mock.BuildWork);

			var count = Object.keys(Mock.survey.question.A0.metadata.option).length;
			expect(count).toEqual(0);
		});

	});

	describe('When an update option work is executed', function() {

		it('Should return optionToUpdate', function() {
			mockUpdateOption();

			service.execute(Mock.BuildWork);
			expect(Mock.BuildWork.type.data).toBeDefined();
			expect(Mock.BuildWork.type.data.objectType).toEqual('MetadataAnswer');
		});

		it('the data should be updated', function() {
			var label = Mock.survey.getQuestionContainer().A0.metadata.option.fake.label;
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
			'survey' : Mock.survey,
			'type' : workType,
			'target' : 'survey.question.A0'
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
			'survey' : Mock.survey,
			'type' : workType,
			'target' : 'survey.question.A0'
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
			'survey' : Mock.survey,
			'type' : workType,
			'target' : 'survey.question.A0.metadata.option.fake',
			'data' : {
				plainText : 'plain',
				value: '',
				formattedText : 'formatted'
			}
    	};
    }

    function mockSurvey() {
    	Mock.survey = {
    		question: {
    			A0: {
    				metadata: {
	    				option: {
	    					fake: {
	    						objectType: 'MetadataAnswer',
	    						label:  {
	    							ptBR :{
	    								plainText : '',
	    								formattedText : ''
	    							}
	    						}
	    					}
	    				}
	    			}
    			}
    		},
			getQuestionContainer: function () {
				return this.question;
			}
    	};
    }

     function mockNewSurvey() {
    	Mock.survey = {
    		question: {
    			A0: {
    				metadata: {
	    				option: {

	    				}
	    			}
    			}
    		},
			getQuestionContainer: function () {
				return this.question;
			}
    	};
    }

});
