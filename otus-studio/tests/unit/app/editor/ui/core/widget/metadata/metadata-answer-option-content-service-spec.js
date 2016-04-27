describe('MetadataGroupContentService', function(){
	var Mock = {};
	var metadataAnswerOptions = [{oid : "oid", questionOID : "questionOID"}];
	var scope = {};
	var metadataGroup = {find : function(){}, last : function(){}, remove : function(){}};
	
	/*@BeforeScenario*/
	beforeEach(function() {
		module('editor.ui');

		inject(function(_$injector_) {
			service = _$injector_.get('MetadataGroupContentService', {
				'WidgetService' : mockWidgetService(_$injector_),
				'MetadataOptionWidgetFactory' : mockMetadataOptionWidgetFactory(_$injector_)
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
			spyOn(metadataGroup, 'find').and.returnValue(metadataGroup);
			spyOn(metadataGroup, 'last').and.returnValue(metadataGroup);
			spyOn(metadataGroup, 'remove');
			scope['metadataAnswerOptions'] = metadataAnswerOptions;
			scope['lastOptionIndex'] = {};
			spyOn(scope, 'lastOptionIndex');

			service.unloadOption(metadataGroup, scope);

			expect(scope.lastOptionIndex).toEqual(-1);
		});

	});

	function mockWidgetService($injector) {
		Mock.WidgetService = $injector.get('WidgetService');
		return Mock.WidgetService;
	}

	function mockMetadataOptionWidgetFactory($injector) {
		Mock.MetadataOptionWidgetFactory = $injector.get('MetadataOptionWidgetFactory');
		return Mock.MetadataOptionWidgetFactory;
	}


});