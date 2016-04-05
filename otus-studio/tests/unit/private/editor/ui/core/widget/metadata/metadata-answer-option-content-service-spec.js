describe('MetadataAnswerOptionContentService', function(){
	var Mock = {};
	var metadataAnswerOptions = [{oid : "oid", questionOID : "questionOID"}];
	var scope = {};
	var metadataQuestion = {find : function(){}, last : function(){}, remove : function(){}};
	
	/*@BeforeScenario*/
	beforeEach(function() {
		module('editor.ui');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataAnswerOptionContentService', {
				'WidgetService' : mockWidgetService(_$injector_),
				'MetadataAnswerOptionWidgetFactory' : mockMetadataAnswerOptionWidgetFactory(_$injector_)
			});
		});
	});

	describe('LoadOption', function() {
		//renomear
		it('should return a new loadOption', function() {
			var widget = {value : ''};
			spyOn(Mock.WidgetService, 'getMetadataAnswerOptionWidget').and.returnValue(widget);
			spyOn(metadataAnswerOptions, 'push');
			scope['metadataAnswerOptions'] = metadataAnswerOptions;
			scope['lastOptionIndex'] = {};
			spyOn(scope, 'lastOptionIndex');

			service.loadOption(metadataAnswerOptions, scope);

			expect(Mock.WidgetService.getMetadataAnswerOptionWidget).toHaveBeenCalled();
			expect(metadataAnswerOptions.push).toHaveBeenCalledWith(widget);
			expect(scope.lastOptionIndex).toEqual(0);

		});

		//renomear
		it('should return a object unloadOption', function() {
			spyOn(metadataQuestion, 'find').and.returnValue(metadataQuestion);
			spyOn(metadataQuestion, 'last').and.returnValue(metadataQuestion);
			spyOn(metadataQuestion, 'remove');
			scope['metadataAnswerOptions'] = metadataAnswerOptions;
			scope['lastOptionIndex'] = {};
			spyOn(scope, 'lastOptionIndex');

			service.unloadOption(metadataQuestion, scope);

			expect(scope.lastOptionIndex).toEqual(-1);
		});

	});

	function mockWidgetService($injector) {
		Mock.WidgetService = $injector.get('WidgetService');
		return Mock.WidgetService;
	}

	function mockMetadataAnswerOptionWidgetFactory($injector) {
		Mock.MetadataAnswerOptionWidgetFactory = $injector.get('MetadataAnswerOptionWidgetFactory');
		return Mock.MetadataAnswerOptionWidgetFactory;
	}


});