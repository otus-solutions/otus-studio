describe('MetadataAnswerOptionContentService', function(){
	var Mock = {};
	var widget;
	var metadataAnswerOptions;

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

	describe('loadOption', function() {
		it('should return a new load option', function() {
		//	var widget = Mock.WidgetService.getMetadataAnswerOptionWidget(); 
		//TODO
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